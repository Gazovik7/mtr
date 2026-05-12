import { Resend } from 'resend';

const resend =
  process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== ''
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

const getRecipients = () =>
  (process.env.LEAD_EMAIL_TO || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

const canSendTelegram = () => process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID;
const normalizeHeaderValue = (value) => (Array.isArray(value) ? value[0] : value);

const ALLOWED_HOSTS = (process.env.ALLOWED_ORIGINS || 'sharedvaluesvisa.com,www.sharedvaluesvisa.com')
  .split(',')
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

const MIN_FORM_FILL_MS = 3000;

const isAllowedHost = (rawUrl) => {
  if (!rawUrl) return false;
  try {
    const host = new URL(rawUrl).hostname.toLowerCase();
    return ALLOWED_HOSTS.includes(host);
  } catch {
    return false;
  }
};

const isValidPhone = (raw) => {
  if (typeof raw !== 'string') return false;
  const trimmed = raw.trim();
  if (!/^[\d\s+()\-.]{7,25}$/.test(trimmed)) return false;
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
};

const isValidName = (raw) => {
  if (typeof raw !== 'string') return false;
  const trimmed = raw.trim();
  if (trimmed.length < 2 || trimmed.length > 80) return false;
  // Reject strings that look like random gibberish: a single long run of letters
  // with no spaces and mixed-case noise (e.g. "BaTdAqSMgMzEtiAHRCAMOBqQ").
  if (!/\s/.test(trimmed) && trimmed.length > 18) {
    const upper = (trimmed.match(/[A-Z]/g) || []).length;
    const lower = (trimmed.match(/[a-z]/g) || []).length;
    if (upper >= 4 && lower >= 4) return false;
  }
  return true;
};

const sendTelegram = async (payload) => {
  if (!canSendTelegram()) return null;
  const { name, email, phone, message, source, site } = payload;
  const textLines = [
    `New lead (${source || 'form'})`,
    `Site: ${site || 'unknown'}`,
    `Name: ${name || 'N/A'}`,
    `Email: ${email || 'N/A'}`,
    `Phone: ${phone || 'N/A'}`,
    `Message: ${message || 'N/A'}`,
  ];
  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
  const body = {
    chat_id: process.env.TELEGRAM_CHAT_ID,
    text: textLines.join('\n'),
    parse_mode: 'HTML',
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Telegram send failed with status ${res.status}`);
  }
  return res.json();
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const { name, email, phone, message, source, website, formStartedAt } = body;
  const headerOrigin = normalizeHeaderValue(req.headers.origin);
  const headerReferrer = normalizeHeaderValue(req.headers.referer || req.headers.referrer);
  const site = headerOrigin || headerReferrer || process.env.SITE_URL || 'unknown';

  // Layer: honeypot — bots typically auto-fill every field.
  if (typeof website === 'string' && website.trim() !== '') {
    return res.status(200).json({ ok: true, delivered: true });
  }

  // Layer: origin check — only accept submissions from the site itself.
  if (!isAllowedHost(headerOrigin) && !isAllowedHost(headerReferrer)) {
    return res.status(200).json({ ok: true, delivered: true });
  }

  // Layer: minimum fill time — bots submit near-instantly.
  if (typeof formStartedAt === 'number' && Number.isFinite(formStartedAt)) {
    const elapsed = Date.now() - formStartedAt;
    if (elapsed < MIN_FORM_FILL_MS) {
      return res.status(200).json({ ok: true, delivered: true });
    }
  } else {
    // No timestamp at all => not from our React form.
    return res.status(200).json({ ok: true, delivered: true });
  }

  if (!name || !isValidName(name)) {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (!phone || !isValidPhone(phone)) {
    return res.status(400).json({ error: 'Phone is required' });
  }
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const recipients = getRecipients();

  try {
    let emailResult = null;
    if (resend && recipients.length) {
      emailResult = await resend.emails.send({
        from: 'Leads <onboarding@resend.dev>',
        to: recipients,
        subject: `New lead (${source || 'form'}) - ${name || email || phone || 'No name'}`,
        text: [
          `Source: ${source || 'form'}`,
          `Name: ${name || 'N/A'}`,
          `Email: ${email || 'N/A'}`,
          `Phone: ${phone || 'N/A'}`,
          `Message: ${message || 'N/A'}`,
        ].join('\n'),
      });
    }

    let telegramResult = null;
    if (canSendTelegram()) {
      telegramResult = await sendTelegram({ name, email, phone, message, source, site });
    }

    const delivered = !!emailResult?.id || !!telegramResult?.ok;
    if (!delivered) {
      return res.status(500).json({ error: 'No delivery destination configured or delivery failed' });
    }

    return res.status(200).json({
      ok: true,
      emailed: !!emailResult?.id,
      telegram: !!telegramResult?.ok,
      delivered,
      to: recipients,
    });
  } catch (error) {
    console.error('[lead] send error', error);
    return res.status(500).json({ error: 'Failed to send lead' });
  }
}
