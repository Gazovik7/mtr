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
  const { name, email, phone, message, source } = body;
  const headerOrigin = normalizeHeaderValue(req.headers.origin);
  const headerReferrer = normalizeHeaderValue(req.headers.referer || req.headers.referrer);
  const site = headerOrigin || headerReferrer || process.env.SITE_URL || 'unknown';

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (!phone) {
    return res.status(400).json({ error: 'Phone is required' });
  }
  if (!email) {
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
