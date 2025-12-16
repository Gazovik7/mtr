import React, { useState, useEffect, useRef } from 'react';
import { COPY } from './content/copy';

// --- Data Constants ---
const FAQS_LIST = COPY.faq as Array<{ q: string; a: string }>;

const SITE_URL = COPY.site.url;
const PLACEHOLDER_IMAGE = "/images/placeholder.jpg";
const PLACEHOLDER_IMAGE_ABS = `${SITE_URL}/images/placeholder.jpg`;
const MAIN_IMAGE_ABS = `${SITE_URL}/images/moscow.jpeg`;
const HERO_IMAGE = "/images/moscow.jpeg";
const PEOPLE_IMAGE = "/images/people-in-russia.jpeg";
const MOSCOW_2_IMAGE = "/images/moscow_2.jpeg";
const SPB_IMAGE = "/images/spb.png";
const NATURE_IMAGE = "/images/nature.png";
const CHURCH_IMAGE = "/images/church.png";

// --- Icons (SVG) ---
const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);
const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-gold-400"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
);
const FileTextIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="M8 15h8"/></svg>
);
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const AwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
);
const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
);
const SmallArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);
const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);
const ActivityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
);
const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
);
const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
);
const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
);
const PlaneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20"/><path d="M13 2a9 9 0 0 0-9 9H2l2.5 1.5L6 12a9 9 0 0 0 9 9l2.5-1.5L20 19h2a9 9 0 0 0-9-9z"/></svg>
);
const CreditCardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
);
const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
);
const AlertTriangleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
);
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M8 5v14l11-7z"/></svg>
);
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
);
const MinusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
);

// --- Utils ---

const scrollToSection = (e: React.MouseEvent, id: string) => {
  e.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Shared helper to send lead data to the Vercel API
const submitLead = async (payload: Record<string, unknown>) => {
  const res = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error('Lead submission failed');
  }
  const data = await res.json();
  if (!data?.ok || data?.delivered === false) {
    throw new Error('Lead delivery not configured or failed');
  }
  return data;
};

// --- Components ---

const SchemaMarkup = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        "name": COPY.schema.organization.name,
        "url": SITE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": PLACEHOLDER_IMAGE_ABS
        },
        "description": COPY.schema.organization.description,
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": COPY.schema.organization.contactType,
          "email": COPY.site.contactEmail,
          "availableLanguage": COPY.schema.organization.availableLanguage
        }
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "url": SITE_URL,
        "name": COPY.schema.website.name,
        "publisher": {
          "@id": `${SITE_URL}/#organization`
        }
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        "url": SITE_URL,
        "name": COPY.schema.webpage.name,
        "inLanguage": COPY.schema.webpage.inLanguage,
        "description": COPY.schema.webpage.description,
        "isPartOf": { "@id": `${SITE_URL}/#website` },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": MAIN_IMAGE_ABS
        }
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        "mainEntity": FAQS_LIST.map(item => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a
          }
        }))
      },
      {
        "@type": "Product",
        "name": COPY.schema.product.name,
        "description": COPY.schema.product.description,
        "image": PLACEHOLDER_IMAGE_ABS,
        "sku": COPY.schema.product.sku,
        "offers": {
          "@type": "Offer",
          "price": COPY.schema.product.offer.price,
          "priceCurrency": COPY.schema.product.offer.priceCurrency,
          "availability": "https://schema.org/InStock",
          "url": COPY.site.links.guideUrl
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": COPY.schema.product.aggregateRating.ratingValue,
          "reviewCount": COPY.schema.product.aggregateRating.reviewCount
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": SITE_URL
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await submitLead({ source: 'consultation-modal', ...formData });
      alert(COPY.contactModal.alerts.success);
      setFormData({ name: '', email: '', phone: '', message: '' });
      onClose();
    } catch (error) {
      console.error(error);
      alert(COPY.contactModal.alerts.failure);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">
        <div className="absolute top-4 right-4 z-10">
          <button onClick={onClose} className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-slate-500">
            <XIcon />
          </button>
        </div>
        
        <div className="bg-royal-900 p-8 text-white">
          <h3 className="text-2xl font-serif font-bold mb-2">{COPY.contactModal.title}</h3>
          <p className="text-blue-200 text-sm font-light">{COPY.contactModal.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">{COPY.contactModal.labels.name}</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-royal-500 focus:bg-white outline-none transition-all"
              placeholder={COPY.contactModal.placeholders.name}
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">{COPY.contactModal.labels.email}</label>
            <input 
              required
              type="email" 
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-royal-500 focus:bg-white outline-none transition-all"
              placeholder={COPY.contactModal.placeholders.email}
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">{COPY.contactModal.labels.phone}</label>
            <input 
              type="tel" 
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-royal-500 focus:bg-white outline-none transition-all"
              placeholder={COPY.contactModal.placeholders.phone}
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">{COPY.contactModal.labels.message}</label>
            <textarea 
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-royal-500 focus:bg-white outline-none transition-all h-24 resize-none"
              placeholder={COPY.contactModal.placeholders.message}
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>
          <button type="submit" className="w-full py-4 bg-royal-800 text-white font-bold rounded-xl hover:bg-royal-900 transition-all shadow-lg hover:shadow-royal-900/20 uppercase tracking-widest text-sm flex items-center justify-center gap-2" disabled={isSubmitting}>
            {isSubmitting ? COPY.contactModal.submit.loading : COPY.contactModal.submit.idle} <ArrowRightIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Landing Page Sections ---

const Navbar = ({ onOpenModal }: { onOpenModal: () => void }) => (
  <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-sm transition-all duration-300 supports-[backdrop-filter]:bg-white/60">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-20 items-center">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-10 h-10 bg-royal-900 rounded-lg flex items-center justify-center text-gold-400 font-serif font-bold text-lg shadow-lg shadow-royal-900/20 group-hover:scale-105 transition-transform">{COPY.site.brand.mark}</div>
          <div className="flex flex-col">
              <span className="font-serif font-bold text-slate-900 tracking-tight leading-none text-lg">{COPY.site.brand.name}</span>
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">{COPY.site.brand.tagline}</span>
          </div>
        </div>
        <div className="hidden md:flex space-x-10 text-sm font-semibold text-slate-600">
          {COPY.navbar.links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id)}
              className="hover:text-royal-800 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-royal-800 after:transition-all hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </div>
        <button 
          onClick={onOpenModal}
          className="bg-royal-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-royal-800 transition-all shadow-lg hover:shadow-royal-900/30 hover:-translate-y-0.5 border border-transparent hover:border-royal-700"
        >
          {COPY.navbar.cta}
        </button>
      </div>
    </div>
  </nav>
);

const Hero = ({ onOpenModal }: { onOpenModal: () => void }) => (
  <section className="relative pt-24 pb-40 overflow-hidden bg-slate-50 min-h-[90vh] flex flex-col justify-center">
    {/* Photo Background with Overlay */}
    <div className="absolute inset-0 z-0">
        <img 
            src={HERO_IMAGE} 
            alt={COPY.images.heroBackgroundAlt} 
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/40 via-white/80 to-white"></div>
    </div>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm text-royal-800 text-xs font-bold mb-8 border border-royal-100 shadow-sm animate-fade-in-up">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-royal-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-royal-600"></span>
        </span>
        <span className="uppercase tracking-wider">{COPY.hero.badge}</span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 tracking-tight mb-6 leading-[1.1] drop-shadow-sm">
        {COPY.hero.title.prefix}{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-700 to-royal-900">{COPY.hero.title.highlight}</span>{' '}
        {COPY.hero.title.suffix}
      </h1>
      
      <h2 className="text-xl md:text-3xl font-medium text-slate-600 mb-10 max-w-4xl mx-auto font-serif italic">
        {COPY.hero.subtitle}
      </h2>
      
      <div className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 mb-12 space-y-6 text-left md:text-center leading-relaxed font-light">
        <p>{COPY.hero.paragraphs[0]}</p>
        <p>{COPY.hero.paragraphs[1]}</p>
        <p>
          {(() => {
            const phrase = 'moving to russia';
            const text = COPY.hero.paragraphs[2];
            const idx = text.toLowerCase().indexOf(phrase);
            if (idx === -1) return text;
            const before = text.slice(0, idx);
            const match = text.slice(idx, idx + phrase.length);
            const after = text.slice(idx + phrase.length);
            return (
              <>
                {before}
                <span className="font-semibold">{match}</span>
                {after}
              </>
            );
          })()}
        </p>
        <p className="font-serif font-bold text-royal-900 border-l-4 border-gold-400 pl-4 md:pl-0 md:border-none">
          {COPY.hero.highlightParagraph}
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-5 mb-14">
        <button 
          onClick={onOpenModal}
          className="px-10 py-4 bg-royal-900 text-white rounded-full font-bold hover:bg-royal-800 transition-all flex items-center justify-center gap-3 shadow-xl shadow-royal-900/20 hover:shadow-royal-900/30 hover:-translate-y-1 text-sm md:text-base tracking-wide group"
        >
          {COPY.hero.buttons.primary}
          <span className="group-hover:translate-x-1 transition-transform"><ArrowRightIcon /></span>
        </button>
        <a 
          href={COPY.site.links.guideUrl}
          className="px-10 py-4 bg-white text-royal-900 border border-slate-200 rounded-full font-bold hover:bg-slate-50 transition-all shadow-md hover:shadow-lg hover:-translate-y-1 text-sm md:text-base"
        >
          {COPY.hero.buttons.secondary}
        </a>
      </div>
      
      <div className="flex flex-col items-center gap-4 animate-float">
         <div className="flex items-center gap-1 bg-white px-4 py-2 rounded-full shadow-soft border border-slate-100">
              <div className="flex text-gold-400"><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></div>
              <span className="text-slate-900 font-bold ml-2 text-sm">{COPY.hero.socialProof.ratingText} <span className="text-slate-400 mx-2">|</span> {COPY.hero.socialProof.quote}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-semibold text-slate-600 mt-2">
              <span className="flex items-center gap-2">
                <div className="text-green-600 w-5 h-5 flex-shrink-0"><CheckCircleIcon /></div> 
                <span>{COPY.hero.socialProof.stats[0]}</span>
              </span>
              <span className="flex items-center gap-2">
                <div className="text-green-600 w-5 h-5 flex-shrink-0"><CheckCircleIcon /></div> 
                <span>{COPY.hero.socialProof.stats[1]}</span>
              </span>
          </div>
       </div>
    </div>
  </section>
);

const TrustSection = () => (
  <section className="py-24 bg-white relative z-20 -mt-10 rounded-t-[40px] shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.05)]" id="trust">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">{COPY.trust.title}</h2>
        <div className="w-24 h-1 bg-gold-400 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
         {/* Block 1 */}
         <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:shadow-royal-900/5 hover:border-royal-100 transition-all duration-300 group">
            <div className="w-14 h-14 bg-white text-royal-700 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
              <FileTextIcon />
            </div>
            <h3 className="font-serif font-bold text-slate-900 mb-4 text-lg">{COPY.trust.cards[0].title}</h3>
            <ul className="space-y-3 mb-8 text-sm text-slate-600 leading-relaxed">
              {COPY.trust.cards[0].bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2">
                  <span className="text-gold-500 mt-0.5">•</span> {bullet}
                </li>
              ))}
            </ul>
         </div>

         {/* Block 2 */}
         <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:shadow-royal-900/5 hover:border-royal-100 transition-all duration-300 group">
            <div className="w-14 h-14 bg-white text-royal-700 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
              <UsersIcon />
            </div>
            <h3 className="font-serif font-bold text-slate-900 mb-4 text-lg">{COPY.trust.cards[1].title}</h3>
            <ul className="space-y-3 mb-8 text-sm text-slate-600 leading-relaxed">
              {COPY.trust.cards[1].bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2">
                  <span className="text-gold-500 mt-0.5">•</span> {bullet}
                </li>
              ))}
            </ul>
            <a href="#testimonials" onClick={(e) => scrollToSection(e, 'testimonials')} className="text-royal-700 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all mt-auto group-hover:text-royal-900">
              {COPY.trust.cards[1].cta} <span className="transition-transform"><SmallArrowIcon /></span>
            </a>
         </div>

         {/* Block 3 */}
         <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:shadow-royal-900/5 hover:border-royal-100 transition-all duration-300 group">
            <div className="w-14 h-14 bg-white text-royal-700 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
              <AwardIcon />
            </div>
            <h3 className="font-serif font-bold text-slate-900 mb-4 text-lg">{COPY.trust.cards[2].title}</h3>
            <ul className="space-y-3 mb-8 text-sm text-slate-600 leading-relaxed">
              {COPY.trust.cards[2].bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2">
                  <span className="text-gold-500 mt-0.5">•</span> {bullet}
                </li>
              ))}
            </ul>
         </div>

         {/* Block 4 */}
         <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:shadow-royal-900/5 hover:border-royal-100 transition-all duration-300 group">
            <div className="w-14 h-14 bg-white text-royal-700 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
              <ShieldCheckIcon />
            </div>
            <h3 className="font-serif font-bold text-slate-900 mb-4 text-lg">{COPY.trust.cards[3].title}</h3>
            <ul className="space-y-3 mb-8 text-sm text-slate-600 leading-relaxed">
              {COPY.trust.cards[3].bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2">
                  <span className="text-gold-500 mt-0.5">•</span> {bullet}
                </li>
              ))}
            </ul>
            <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="text-royal-700 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all mt-auto group-hover:text-royal-900">
              {COPY.trust.cards[3].cta} <span className="transition-transform"><SmallArrowIcon /></span>
            </a>
         </div>
      </div>
    </div>
  </section>
);

const ProblemSection = () => {
  const [email, setEmail] = useState('');
  const [viewState, setViewState] = useState<'email' | 'quiz' | 'analyzing' | 'result'>('email');
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = COPY.problem.quiz.questions;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await submitLead({ source: 'quiz-email', email });
      setViewState('quiz');
    } catch (error) {
      console.error(error);
      alert(COPY.problem.quiz.alerts.emailFailure);
    }
  };

  const handleOptionClick = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setViewState('analyzing');
      setTimeout(() => setViewState('result'), 2000);
    }
  };

  const restart = () => {
    setViewState('email');
    setCurrentQuestion(0);
    setEmail('');
  };

  const painPoints = COPY.problem.painPoints;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column */}
          <div className="pr-4">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-8 leading-tight">
              {COPY.problem.title.prefix}<span className="italic text-royal-800">{COPY.problem.title.italic}</span>
            </h2>
            <p className="text-lg text-slate-600 mb-12 leading-relaxed font-light">
              {COPY.problem.intro}
            </p>
            
            <div className="space-y-8">
              {painPoints.map((item, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-red-50 text-red-500 font-bold text-lg mt-1 border border-red-100 group-hover:bg-red-500 group-hover:text-white transition-colors">
                    ✗
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-slate-900 text-lg group-hover:text-red-700 transition-colors">{item.title}</h3>
                    <p className="text-slate-600 mt-2 leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Interactive Quiz */}
          <div className="lg:sticky lg:top-32">
             <div className="bg-royal-900 rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-royal-900/40 text-white relative overflow-hidden border border-royal-800 min-h-[500px] flex flex-col transition-all duration-500">
                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-overlay filter blur-[80px] opacity-40 animate-pulse"></div>
                <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-purple-600 rounded-full mix-blend-overlay filter blur-[80px] opacity-40"></div>

                <div className="relative z-10 flex-grow flex flex-col">
                  
                  {/* Header Badge */}
                  <div className="flex justify-between items-start mb-6">
                     <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                        {COPY.problem.quiz.badge}
                     </div>
                     {viewState === 'quiz' && (
                         <div className="text-xs font-bold text-blue-300">
                             {currentQuestion + 1} / {questions.length}
                        </div>
                    )}
                  </div>

                  {/* VIEW: EMAIL INPUT */}
                  {viewState === 'email' && (
                     <div className="animate-fade-in my-auto">
                         <h3 className="text-3xl font-serif font-bold mb-4 leading-tight">
                            {COPY.problem.quiz.emailView.title} <br/><span className="text-gold-400">{COPY.problem.quiz.emailView.highlight}</span>
                         </h3>
                         <form onSubmit={handleEmailSubmit} className="space-y-5">
                             <p className="text-blue-100 font-light text-sm">
                                {COPY.problem.quiz.emailView.desc}
                             </p>
                             <div>
                                <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider mb-2">{COPY.problem.quiz.emailView.emailLabel}</label>
                                <input 
                                type="email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={COPY.problem.quiz.emailView.emailPlaceholder}
                                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-blue-300/50 focus:ring-2 focus:ring-gold-500 focus:bg-white/10 outline-none transition-all backdrop-blur-sm"
                                />
                             </div>
                            <button 
                                type="submit" 
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 border border-white/10"
                             >
                                {COPY.problem.quiz.emailView.submit} <ArrowRightIcon />
                             </button>
                             <p className="text-[10px] text-blue-300/60 text-center uppercase tracking-wider">
                                {COPY.problem.quiz.emailView.privacy}
                             </p>
                         </form>
                     </div>
                  )}

                  {/* VIEW: QUIZ QUESTIONS */}
                  {viewState === 'quiz' && (
                     <div className="animate-fade-in my-auto">
                        <div className="mb-8">
                            <div className="w-full bg-white/10 h-1.5 rounded-full mb-6">
                                <div 
                                    className="bg-gold-400 h-1.5 rounded-full transition-all duration-500 ease-out" 
                                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                                ></div>
                            </div>
                            <h3 className="text-2xl font-serif font-bold mb-2 leading-tight min-h-[3.5rem]">
                                {questions[currentQuestion].q}
                            </h3>
                        </div>
                        <div className="space-y-3">
                            {questions[currentQuestion].options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={handleOptionClick}
                                    className="w-full text-left px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/20 hover:border-white/30 text-white font-medium transition-all flex justify-between items-center group"
                                >
                                    {option}
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-gold-400"><ArrowRightIcon /></span>
                                </button>
                            ))}
                        </div>
                     </div>
                  )}

                  {/* VIEW: ANALYZING */}
                   {viewState === 'analyzing' && (
                       <div className="animate-fade-in my-auto text-center">
                           <div className="w-16 h-16 border-4 border-white/10 border-t-gold-400 rounded-full animate-spin mx-auto mb-6"></div>
                          <h3 className="text-xl font-bold mb-2">{COPY.problem.quiz.analyzing.title}</h3>
                          <p className="text-blue-200 text-sm">{COPY.problem.quiz.analyzing.desc}</p>
                       </div>
                   )}

                  {/* VIEW: RESULT */}
                   {viewState === 'result' && (
                     <div className="text-center animate-fade-in my-auto">
                       <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-400/30 shadow-lg animate-[bounce_1s_ease-in-out_1]">
                         <CheckCircleIcon />
                       </div>
                       <h4 className="text-2xl font-serif font-bold mb-2">{COPY.problem.quiz.result.title}</h4>
                       <div className="bg-white/10 rounded-xl p-4 mb-6 border border-white/10 backdrop-blur-sm text-left">
                           <p className="text-blue-100 text-sm mb-3">
                             {(() => {
                               const text = COPY.problem.quiz.result.summary;
                               const phrase = 'High Potential Candidate';
                               const idx = text.indexOf(phrase);
                               if (idx === -1) return text;
                               return (
                                 <>
                                   {text.slice(0, idx)}
                                   <strong className="text-white">{phrase}</strong>
                                   {text.slice(idx + phrase.length)}
                                 </>
                               );
                             })()}
                            </p>
                            <p className="text-blue-100 text-sm">
                              {COPY.problem.quiz.result.sentPrefix}{' '}
                              <span className="text-white font-semibold border-b border-white/20">{email}</span>.
                            </p>
                       </div>
                        
                        <a 
                          href={COPY.site.links.guideUrl}
                          target="_blank"
                          className="block w-full py-4 bg-gold-400 text-royal-900 font-bold rounded-xl hover:bg-gold-300 transition-all shadow-lg mb-4"
                        >
                          {COPY.problem.quiz.result.cta}
                        </a>

                       <button 
                         onClick={restart}
                         className="text-xs text-blue-300 hover:text-white transition-colors underline decoration-blue-300/50 underline-offset-4"
                        >
                          {COPY.problem.quiz.result.restart}
                        </button>
                     </div>
                   )}

                </div>
             </div>

             {/* Social Proof for Quiz */}
             <div className="mt-6 flex items-center justify-center gap-4 text-sm text-slate-500">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className={`w-9 h-9 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 shadow-sm`}>
                       {String.fromCharCode(64+i)}
                    </div>
                  ))}
                </div>
                <p><span className="font-bold text-slate-900">124 people</span> took the assessment today</p>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const SolutionSection = () => {
  const [activeTab, setActiveTab] = useState('basics');

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight mb-4">{COPY.solution.title}</h2>
           <p className="text-slate-500 font-medium tracking-widest uppercase text-sm">{COPY.solution.subtitle}</p>
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden max-w-5xl mx-auto">
          {/* Tabs Header */}
          <div className="flex flex-wrap border-b border-slate-100">
            {['basics', 'compare'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-6 text-sm md:text-base font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === tab 
                  ? 'bg-royal-900 text-white relative' 
                  : 'bg-white text-slate-500 hover:bg-slate-50 hover:text-royal-800'
                }`}
              >
                 {tab === 'basics' && COPY.solution.tabs.basics}
                 {tab === 'compare' && COPY.solution.tabs.compare}
                 {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-gold-500"></div>}
               </button>
             ))}
           </div>

          {/* Tab Content */}
          <div className="p-8 md:p-12 min-h-[400px]">
            
            {/* TAB 1: THE BASICS */}
            {activeTab === 'basics' && (
               <div className="animate-fade-in space-y-8">
                 <div className="max-w-3xl mx-auto text-center mb-12">
                   <h3 className="text-3xl font-serif font-bold text-slate-900 mb-6">{COPY.solution.basics.title}</h3>
                   <p className="text-slate-600 text-lg leading-relaxed">
                     {COPY.solution.basics.intro.prefix}
                     <span className="font-bold text-royal-800 bg-royal-50 px-2 py-0.5 rounded">{COPY.solution.basics.intro.highlight1}</span>
                     {COPY.solution.basics.intro.middle}
                     <span className="font-bold text-royal-800 bg-royal-50 px-2 py-0.5 rounded">{COPY.solution.basics.intro.highlight2}</span>
                     {COPY.solution.basics.intro.suffix}
                   </p>
                 </div>

                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-royal-50 to-white p-8 rounded-3xl border border-royal-100 shadow-sm">
                       <h4 className="font-bold text-royal-900 mb-6 flex items-center gap-3 text-lg">
                         <div className="p-2 bg-royal-100 rounded-lg text-royal-600"><AwardIcon /></div> {COPY.solution.basics.whyMatters.title}
                       </h4>
                       <ul className="space-y-4">
                         {COPY.solution.basics.whyMatters.bullets.map((item, i) => (
                           <li key={i} className="flex items-start gap-4">
                             <div className="mt-1 text-green-600 bg-green-100 rounded-full p-1"><CheckCircleIcon /></div>
                             <span className="text-slate-700 font-medium leading-relaxed">{item}</span>
                           </li>
                         ))}
                       </ul>
                    </div>
                    
                    {/* Enhanced Image Card */}
                    <div className="relative flex flex-col justify-end items-start p-8 rounded-3xl border border-slate-200 overflow-hidden min-h-[300px] group">
                      <img src={PEOPLE_IMAGE} alt={COPY.solution.basics.imageAlt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-royal-900/95 via-royal-900/50 to-royal-900/10"></div>
                       
                      <div className="relative z-10 text-white text-left">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white shadow-md mb-4 border border-white/20"><GlobeIcon /></div>
                        <h4 className="font-serif font-bold mb-2 text-xl">{COPY.solution.basics.imageCard.title}</h4>
                        <p className="text-blue-100 mb-6 text-sm leading-relaxed">{COPY.solution.basics.imageCard.desc}</p>
                        <a href="#eligibility" onClick={(e) => scrollToSection(e, 'eligibility')} className="text-gold-400 font-bold text-xs uppercase tracking-widest border-b border-gold-400/50 hover:border-gold-400 transition-all pb-1">{COPY.solution.basics.imageCard.cta}</a>
                      </div>
                    </div>
                 </div>
               </div>
             )}

            {/* TAB 2: COMPARE */}
            {activeTab === 'compare' && (
              <div className="animate-fade-in max-w-5xl mx-auto">
                 <div className="grid md:grid-cols-2 gap-8">
                     {/* Traditional */}
                     <div className="bg-slate-50 p-10 rounded-3xl border border-slate-200 opacity-80 hover:opacity-100 transition-opacity">
                        <h3 className="text-xl font-serif font-bold text-slate-500 mb-8 flex items-center gap-3">
                         <span className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm">VS</span> {COPY.solution.compare.leftTitle}
                        </h3>
                        <ul className="space-y-5">
                           {COPY.solution.compare.leftBullets.map((item, i) => (
                              <li key={i} className="flex items-start gap-3 text-slate-500">
                                 <span className="text-red-400 font-bold text-lg leading-none mt-0.5">✗</span>
                                 <span className="font-medium">{item}</span>
                              </li>
                           ))}
                        </ul>
                     </div>

                     {/* SVV */}
                     <div className="bg-white p-10 rounded-3xl border-2 border-royal-600 shadow-2xl shadow-royal-900/10 relative overflow-hidden transform md:-translate-y-2">
                       <div className="absolute top-0 right-0 bg-royal-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-widest shadow-lg">{COPY.solution.compare.recommendedLabel}</div>
                        <h3 className="text-2xl font-serif font-bold text-royal-900 mb-8 flex items-center gap-3">
                         <div className="p-2 bg-royal-100 rounded-lg text-royal-600"><StarIcon /></div> {COPY.solution.compare.rightTitle}
                        </h3>
                        <ul className="space-y-5">
                           {COPY.solution.compare.rightBullets.map((item, i) => (
                              <li key={i} className="flex items-start gap-3 text-slate-800 font-semibold">
                                 <span className="text-green-500 font-bold text-lg leading-none mt-0.5">✓</span>
                                 <span>{item}</span>
                              </li>
                           ))}
                        </ul>
                     </div>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const ApplicationProcessSection = () => {
    type ProcessContent = (typeof COPY.process.steps)[number]['content'];
    const steps = COPY.process.steps;
    const stepIcons = [FileTextIcon, BriefcaseIcon, PlaneIcon, FileTextIcon, CheckCircleIcon] as const;

    const renderStepContent = (content: ProcessContent) => {
      if (content.type === 'bullets') {
        return (
          <>
            <p className="font-semibold mb-3 text-royal-900">{content.heading}</p>
            <ul className="space-y-2 text-sm text-slate-600">
              {content.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2 items-start">
                  <span className="text-green-500 mt-0.5">✓</span> {bullet}
                </li>
              ))}
            </ul>
          </>
        );
      }

      if (content.type === 'ordered') {
        return (
          <div className="space-y-3">
            <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600 marker:text-royal-600 marker:font-bold">
              {content.steps.map((step) => (
                <li key={`${step.bold}-${step.text}`}>
                  <strong>{step.bold}</strong> {step.text}
                </li>
              ))}
            </ol>
            {content.note && (
              <div className="bg-amber-50 text-amber-800 text-xs p-3 rounded-lg border border-amber-100 italic">
                <strong>{content.note.bold}</strong> {content.note.text}
              </div>
            )}
          </div>
        );
      }

      if (content.type === 'numbered') {
        return (
          <div className="space-y-3">
            <ul className="space-y-3 text-sm text-slate-600">
              {content.items.map((item) => (
                <li key={`${item.number}-${item.bold}`} className="flex gap-3 items-start bg-slate-50 p-2 rounded">
                  <span className="text-royal-500 font-bold">{item.number}</span>{' '}
                  <span>
                    <strong>{item.bold}</strong> {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      }

      if (content.type === 'approval') {
        return (
          <div className="space-y-3">
            <p className="text-sm text-slate-500 italic">{content.intro}</p>
            <div className="flex flex-col gap-2 mt-4">
              <span className="font-bold text-sm text-royal-900">{content.whenApprovedLabel}</span>
              <div className="bg-gradient-to-r from-green-50 to-green-100 text-green-900 p-4 rounded-xl text-sm font-bold border border-green-200 flex items-center gap-3 shadow-sm">
                <div className="bg-white rounded-full p-1 text-green-600"><AwardIcon /></div>
                {content.badge}
              </div>
            </div>
          </div>
        );
      }

      return null;
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden">
             {/* Background Element */}
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#f0f4fa_1px,transparent_1px),linear-gradient(to_bottom,#f0f4fa_1px,transparent_1px)] bg-[size:4rem_4rem] -z-10 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="inline-block px-5 py-2 bg-royal-100 text-royal-800 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border border-royal-200">
                        {COPY.process.badge}
                    </div>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                        {COPY.process.title.line1} <br className="hidden md:block" /> {COPY.process.title.line2}
                    </h2>
                </div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 md:-translate-x-1/2"></div>

                    {steps.map((step, index) => (
                        <div key={index} className={`relative mb-16 last:mb-0 group`}>
                            
                            {/* Connector Dot */}
                            <div className="absolute left-6 md:left-1/2 w-14 h-14 bg-white border-4 border-royal-600 text-royal-600 rounded-full flex items-center justify-center transform -translate-x-1/2 z-10 shadow-lg font-serif font-bold text-2xl group-hover:scale-110 group-hover:border-gold-500 group-hover:text-gold-500 transition-all duration-300">
                                {index + 1}
                            </div>

                            <div className={`md:flex items-center justify-between ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                
                                {/* Timeline/Cost Info (Side) */}
                                <div className={`pl-20 md:pl-0 md:w-[45%] mb-6 md:mb-0 ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}>
                                    <div className="inline-block md:block">
                                        <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">{step.title}</h3>
                                        <div className="flex flex-col gap-1.5">
                                            <span className={`text-royal-700 font-bold flex items-center gap-2 text-sm ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                                                <ClockIcon /> {step.duration}
                                            </span>
                                            <span className={`text-slate-500 font-medium flex items-center gap-2 text-sm ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                                                <CreditCardIcon /> {COPY.process.estimatedCostPrefix} {step.cost}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Spacer for center line */}
                                <div className="hidden md:block w-[10%]"></div>

                                {/* Content Card */}
                                <div className={`pl-20 md:pl-0 md:w-[45%] ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16'}`}>
                                    <div className="bg-white p-8 rounded-3xl shadow-soft border border-slate-100 hover:shadow-xl hover:shadow-royal-900/5 hover:border-royal-100 transition-all duration-300 relative group-hover:-translate-y-1">
                                        {/* Mobile Step Icon */}
                                        <div className="absolute -left-3 -top-3 w-10 h-10 bg-royal-50 text-royal-600 rounded-lg flex items-center justify-center border border-royal-100 shadow-sm md:hidden">
                                            {(() => {
                                              const Icon = stepIcons[index] ?? FileTextIcon;
                                              return <Icon />;
                                            })()}
                                        </div>
                                        
                                        <div className="leading-relaxed">
                                            {renderStepContent(step.content)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Summary Footer */}
                <div className="mt-14 text-center bg-royal-900 rounded-[2.5rem] p-12 text-white shadow-2xl relative overflow-hidden border-4 border-white/10">
                     <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500 rounded-full mix-blend-overlay filter blur-[100px] opacity-30 animate-pulse"></div>
                     <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-8 uppercase tracking-[0.2em] text-gold-400">{COPY.process.summary.title}</h3>
                        <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-24">
                            <div className="text-center">
                                <div className="text-blue-200 text-xs uppercase font-bold mb-2 tracking-wider">{COPY.process.summary.timelineLabel}</div>
                                <div className="text-5xl md:text-6xl font-serif font-bold tracking-tight">{COPY.process.summary.timelineValue} <span className="text-3xl">{COPY.process.summary.timelineUnit}</span></div>
                            </div>
                            <div className="hidden md:block w-px bg-white/10"></div>
                             <div className="text-center">
                                <div className="text-blue-200 text-xs uppercase font-bold mb-2 tracking-wider">{COPY.process.summary.costLabel}</div>
                                <div className="text-5xl md:text-6xl font-serif font-bold text-green-400">{COPY.process.summary.costValue}</div>
                                <div className="text-xs text-blue-300 mt-3 font-light">{COPY.process.summary.costFootnote}</div>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </section>
    );
};

const TestimonialsSection = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const testimonials = COPY.testimonials.testimonials;

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden" id="testimonials">
      {/* Background decoration with Photo */}
      <div className="absolute inset-0 z-0">
            <img 
              src={PLACEHOLDER_IMAGE} 
              alt={COPY.images.testimonialsBackgroundAlt} 
              className="w-full h-full object-cover opacity-10"
            />
          <div className="absolute inset-0 bg-white/90 backdrop-blur-[2px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
         {/* Header */}
         <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight">{COPY.testimonials.title}</h2>
            <p className="mt-6 text-slate-600 max-w-2xl mx-auto text-lg font-light">{COPY.testimonials.subtitle}</p>
         </div>

         {/* Cards Grid */}
         <div className="grid md:grid-cols-3 gap-8 mb-20">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-soft border border-slate-100 flex flex-col h-full hover:shadow-2xl hover:shadow-royal-900/10 transition-all duration-300 relative group hover:-translate-y-2">
                 {/* Quote Icon Background */}
                 <div className="absolute top-8 right-8 text-slate-100 text-8xl font-serif leading-none select-none z-0 opacity-50 group-hover:text-royal-50 transition-colors">"</div>
                 
                 {/* Stars */}
                 <div className="flex gap-1 mb-6 text-gold-400 relative z-10">
                    {[1,2,3,4,5].map(s => <StarIcon key={s} />)}
                 </div>
                 
                 {/* Quote */}
                 <blockquote className="text-slate-700 italic mb-8 flex-grow relative z-10 leading-relaxed text-base font-light font-serif">
                   "{t.quote}"
                 </blockquote>

                 {/* Divider */}
                 <div className="border-t border-slate-100 my-6 w-full relative z-10"></div>

                 {/* Profile */}
                 <div className="flex justify-between items-end mb-6 relative z-10">
                    <div>
                       <div className="font-bold text-slate-900 text-xl flex items-center gap-3">
                         {t.name} <span className="text-2xl shadow-sm rounded-full overflow-hidden">{t.flag}</span>
                       </div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">
                          {t.origin} • {COPY.testimonials.shareBlock.approvedLabel} {t.date}
                        </div>
                    </div>
                 </div>
                 
                 {/* Metadata Tags */}
                 <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                    <span className="px-3 py-1 bg-slate-50 text-slate-600 text-xs rounded-full font-bold uppercase tracking-wide border border-slate-100">{t.type}</span>
                    <span className="px-3 py-1 bg-slate-50 text-slate-600 text-xs rounded-full font-bold uppercase tracking-wide border border-slate-100">{t.location}</span>
                 </div>
              </div>
            ))}
         </div>

         {/* Success Stats & Share CTA */}
         <div className="grid md:grid-cols-2 gap-8">
             {/* Success Block */}
              <div className="bg-royal-900 rounded-[2.5rem] p-12 text-white flex flex-col justify-center relative overflow-hidden shadow-2xl">
                 <div className="relative z-10">
                    <h3 className="text-3xl font-serif font-bold mb-4">{COPY.testimonials.successBlock.title}</h3>
                    <p className="text-blue-200 mb-8 font-light text-lg">{COPY.testimonials.successBlock.desc}</p>
                    <ul className="space-y-4 mb-8">
                       {COPY.testimonials.successBlock.bullets.map((bullet) => (
                         <li key={bullet} className="flex items-center gap-4 font-medium">
                           <span className="text-green-400 bg-green-500/20 p-1 rounded-full"><CheckCircleIcon /></span> {bullet}
                         </li>
                       ))}
                    </ul>
                 </div>
              </div>

             {/* Share Block */}
             <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-[2.5rem] p-12 text-white flex flex-col justify-center relative overflow-hidden shadow-2xl">
                 <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10">
                    <svg width="250" height="250" viewBox="0 0 24 24" fill="currentColor"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2-2z"/></svg>
                 </div>
                  <div className="relative z-10">
                    <h3 className="text-3xl font-serif font-bold mb-4">{COPY.testimonials.shareBlock.title}</h3>
                    <p className="text-blue-100 mb-8 font-light text-lg">{COPY.testimonials.shareBlock.desc}</p>
                    <button 
                      onClick={onOpenModal}
                      className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl shadow-lg hover:bg-blue-50 transition-colors flex items-center justify-center w-fit uppercase tracking-wide text-sm transform hover:-translate-y-1"
                    >
                       {COPY.testimonials.shareBlock.cta}
                    </button>
                 </div>
              </div>
         </div>
      </div>
    </section>
  );
};

const EligibilitySection = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const [country, setCountry] = useState('');
  const [sharesValues, setSharesValues] = useState<string | null>(null);
  const [validPassport, setValidPassport] = useState<string | null>(null);
  const [result, setResult] = useState<'qualified' | 'consult' | null>(null);

  // Full list of eligible countries (Representative based on decree)
  const eligibleList = COPY.eligibility.countries.fullEligibleList;

  const checkEligibility = () => {
    if (!country || !sharesValues || !validPassport) return;

    // Logic: Must be in list + Share Values + Valid Passport
    if (country !== COPY.eligibility.q1.other && sharesValues === 'yes' && validPassport === 'yes') {
        setResult('qualified');
    } else {
        setResult('consult');
    }
  };

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200" id="eligibility">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
           <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 uppercase tracking-tight">
             {COPY.eligibility.title.prefix}<span className="text-royal-600">{COPY.eligibility.title.highlight}</span>
           </h2>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white rounded-[2rem] shadow-2xl shadow-royal-900/10 border border-slate-100 overflow-hidden">
                <div className="bg-royal-900 p-8 text-white text-center border-b border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    <h3 className="text-lg font-bold uppercase tracking-[0.2em] text-gold-400 relative z-10">{COPY.eligibility.checkerTitle}</h3>
                </div>
                
                <div className="p-10 md:p-14 space-y-10">
                    {!result ? (
                        <>
                            {/* Q1 */}
                            <div>
                                <label className="block text-slate-800 font-bold mb-4 text-lg font-serif">{COPY.eligibility.q1.label}</label>
                                <div className="relative">
                                    <select 
                                        className="w-full p-5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:ring-2 focus:ring-royal-500 focus:bg-white outline-none transition-all appearance-none cursor-pointer font-medium"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                    >
                                        <option value="" disabled>{COPY.eligibility.q1.placeholder}</option>
                                        {eligibleList.map(c => <option key={c} value={c}>{c}</option>)}
                                        <option value={COPY.eligibility.q1.other}>{COPY.eligibility.q1.other}</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                                </div>
                            </div>

                             {/* Q2 */}
                             <div>
                                <label className="block text-slate-800 font-bold mb-4 text-lg font-serif">{COPY.eligibility.q2.label}</label>
                                <div className="flex gap-6">
                                    <button 
                                        onClick={() => setSharesValues('yes')}
                                        className={`flex-1 py-4 px-6 rounded-xl border-2 font-bold transition-all transform hover:-translate-y-1 ${sharesValues === 'yes' ? 'border-royal-600 bg-royal-50 text-royal-700 shadow-md' : 'border-slate-100 bg-slate-50 hover:border-slate-300 text-slate-500'}`}
                                    >
                                        {COPY.eligibility.q2.yes}
                                    </button>
                                    <button 
                                        onClick={() => setSharesValues('no')}
                                        className={`flex-1 py-4 px-6 rounded-xl border-2 font-bold transition-all transform hover:-translate-y-1 ${sharesValues === 'no' ? 'border-royal-600 bg-royal-50 text-royal-700 shadow-md' : 'border-slate-100 bg-slate-50 hover:border-slate-300 text-slate-500'}`}
                                    >
                                        {COPY.eligibility.q2.no}
                                    </button>
                                </div>
                            </div>

                             {/* Q3 */}
                             <div>
                                <label className="block text-slate-800 font-bold mb-4 text-lg font-serif">{COPY.eligibility.q3.label}</label>
                                <div className="flex gap-6">
                                    <button 
                                        onClick={() => setValidPassport('yes')}
                                        className={`flex-1 py-4 px-6 rounded-xl border-2 font-bold transition-all transform hover:-translate-y-1 ${validPassport === 'yes' ? 'border-royal-600 bg-royal-50 text-royal-700 shadow-md' : 'border-slate-100 bg-slate-50 hover:border-slate-300 text-slate-500'}`}
                                    >
                                        {COPY.eligibility.q3.yes}
                                    </button>
                                    <button 
                                        onClick={() => setValidPassport('no')}
                                        className={`flex-1 py-4 px-6 rounded-xl border-2 font-bold transition-all transform hover:-translate-y-1 ${validPassport === 'no' ? 'border-royal-600 bg-royal-50 text-royal-700 shadow-md' : 'border-slate-100 bg-slate-50 hover:border-slate-300 text-slate-500'}`}
                                    >
                                        {COPY.eligibility.q3.no}
                                    </button>
                                </div>
                            </div>

                            <button 
                                onClick={checkEligibility}
                                disabled={!country || !sharesValues || !validPassport}
                                className="w-full py-5 bg-royal-700 text-white font-bold rounded-xl hover:bg-royal-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-royal-700/30 text-lg uppercase tracking-widest transform hover:-translate-y-0.5"
                            >
                                {COPY.eligibility.checkButton}
                            </button>
                        </>
                    ) : (
                        <div className="animate-fade-in text-center">
                            {result === 'qualified' ? (
                                <div className="bg-green-50 border border-green-200 rounded-3xl p-10">
                                    <div className="w-24 h-24 bg-white text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm border border-green-100">
                                        <CheckCircleIcon />
                                    </div>
                                    <h3 className="text-3xl font-serif font-bold text-green-800 mb-4">{COPY.eligibility.result.qualified.title}</h3>
                                    <p className="text-green-700 mb-10 max-w-md mx-auto text-lg leading-relaxed">{COPY.eligibility.result.qualified.desc}</p>
                                    <a href={COPY.site.links.guideUrl} className="px-10 py-5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 w-full md:w-auto uppercase tracking-wide hover:-translate-y-1 inline-block">
                                        {COPY.eligibility.result.qualified.cta}
                                    </a>
                                    <button onClick={() => setResult(null)} className="block mt-6 text-sm text-green-600 hover:text-green-800 hover:underline w-full font-medium">{COPY.eligibility.result.qualified.again}</button>
                                </div>
                            ) : (
                                <div className="bg-amber-50 border border-amber-200 rounded-3xl p-10">
                                    <div className="w-24 h-24 bg-white text-amber-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm border border-amber-100">
                                        <span className="text-5xl font-serif font-bold">?</span>
                                    </div>
                                    <h3 className="text-3xl font-serif font-bold text-amber-800 mb-4">{COPY.eligibility.result.consult.title}</h3>
                                    <p className="text-amber-700 mb-10 max-w-md mx-auto text-lg leading-relaxed">{COPY.eligibility.result.consult.desc}</p>
                                    <button 
                                      onClick={onOpenModal}
                                      className="px-10 py-5 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 transition-all shadow-lg w-full md:w-auto uppercase tracking-wide hover:-translate-y-1"
                                    >
                                        {COPY.eligibility.result.consult.cta}
                                    </button>
                                    <button onClick={() => setResult(null)} className="block mt-6 text-sm text-amber-700 hover:text-amber-900 hover:underline w-full font-medium">{COPY.eligibility.result.consult.again}</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Countries List */}
        <div className="mb-20">
             <h3 className="text-2xl font-serif font-bold text-slate-900 mb-10 text-center">{COPY.eligibility.countries.title}</h3>
             <div className="grid md:grid-cols-3 gap-8 text-sm">
                
                 {/* Europe */}
                 <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-soft hover:shadow-lg transition-all">
                    <h4 className="font-bold text-royal-900 mb-6 border-b border-royal-100 pb-3 flex items-center gap-2">🇪🇺 {COPY.eligibility.countries.europeTitle}</h4>
                    <ul className="space-y-1 text-slate-600 columns-2 md:columns-3 font-medium text-xs">
                        {COPY.eligibility.countries.europe.map(c => <li key={c} className="flex items-center gap-2">✓ {c}</li>)}
                    </ul>
                 </div>

                 {/* Americas */}
                 <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-soft hover:shadow-lg transition-all h-fit">
                    <h4 className="font-bold text-royal-900 mb-6 border-b border-royal-100 pb-3 flex items-center gap-2">🌎 {COPY.eligibility.countries.americasTitle}</h4>
                    <ul className="space-y-2 text-slate-600 font-medium">
                        {COPY.eligibility.countries.americas.map(c => <li key={c} className="flex items-center gap-2">✓ {c}</li>)}
                    </ul>
                 </div>

                 {/* Asia Pacific */}
                 <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-soft hover:shadow-lg transition-all h-fit">
                    <h4 className="font-bold text-royal-900 mb-6 border-b border-royal-100 pb-3 flex items-center gap-2">🌏 {COPY.eligibility.countries.apacTitle}</h4>
                    <ul className="space-y-2 text-slate-600 font-medium">
                        {COPY.eligibility.countries.apac.map(c => <li key={c} className="flex items-center gap-2">✓ {c}</li>)}
                        <li className="mt-6 italic text-slate-400 text-xs">{COPY.eligibility.countries.apacFooter}</li>
                    </ul>
                 </div>

             </div>
             <p className="text-center text-xs text-slate-400 mt-6 max-w-3xl mx-auto leading-relaxed">
                 {COPY.eligibility.countries.note}
             </p>
             <div className="text-center mt-4">
                 <button 
                   onClick={onOpenModal}
                   className="text-royal-600 font-bold text-xs uppercase border-b-2 border-royal-200 hover:border-royal-600 transition-all pb-1 hover:text-royal-800 tracking-wider"
                  >
                    {COPY.eligibility.countries.ask}
                  </button>
             </div>
        </div>
      </div>
    </section>
  );
};

const PricingSection = ({ onOpenModal }: { onOpenModal: () => void }) => {
    return (
        <section className="py-24 bg-white border-t border-slate-100" id="pricing">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 uppercase tracking-tight">{COPY.pricing.title}</h2>
                    <p className="mt-6 text-slate-600 max-w-2xl mx-auto text-lg font-light">{COPY.pricing.subtitle}</p>
                </div>

                <div className="max-w-4xl mx-auto mb-10">
                     <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-royal-50 border border-royal-100 rounded-2xl px-6 py-4 shadow-soft">
                        <div className="text-sm md:text-base text-royal-900 font-semibold">{COPY.pricing.topBar.text}</div>
                        <button 
                          onClick={onOpenModal}
                          className="px-6 py-3 bg-royal-900 text-white rounded-full font-bold text-sm uppercase tracking-wide hover:bg-royal-800 transition-all shadow-md hover:-translate-y-0.5"
                        >
                            {COPY.pricing.topBar.cta}
                        </button>
                     </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
                    {/* Main Offer */}
                    <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-2xl shadow-royal-900/10 border-2 border-royal-600 overflow-hidden relative transform md:-translate-y-4">
                        <div className="absolute top-0 right-0 bg-gradient-to-l from-royal-600 to-royal-500 text-white text-xs font-bold px-6 py-2 rounded-bl-2xl uppercase tracking-widest shadow-md">{COPY.pricing.mainOffer.badge}</div>
                        <div className="p-10 md:p-12">
                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-20 h-20 bg-royal-50 text-royal-700 rounded-2xl flex items-center justify-center shrink-0 border border-royal-100">
                                    <BookOpenIcon />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-serif font-bold text-slate-900">{COPY.pricing.mainOffer.title}</h3>
                                    <p className="text-slate-600 mt-1 font-light text-lg">{COPY.pricing.mainOffer.desc}</p>
                                </div>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-10 mb-10">
                                <div>
                                    <h4 className="font-bold text-xs text-royal-900 uppercase tracking-widest mb-6 border-b border-royal-100 pb-2">{COPY.pricing.mainOffer.includedTitle}</h4>
                                    <ul className="space-y-4 text-sm text-slate-700">
                                        {COPY.pricing.mainOffer.included.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <span className="text-green-500 font-bold bg-green-50 rounded-full p-0.5 mt-0.5 text-xs">✓</span> <span className="leading-snug">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-gradient-to-b from-royal-50 to-white p-8 rounded-3xl border border-royal-100 flex flex-col justify-center text-center shadow-inner">
                                    <div className="text-slate-400 text-sm font-semibold mb-2 line-through">{COPY.pricing.mainOffer.priceBox.oldPrice}</div>
                                    <div className="text-6xl font-serif font-bold text-royal-900 mb-2">{COPY.pricing.mainOffer.priceBox.price}</div>
                                    <div className="text-green-700 font-bold text-xs mb-8 bg-green-100 py-1.5 px-4 rounded-full mx-auto w-fit border border-green-200 uppercase tracking-wide">{COPY.pricing.mainOffer.priceBox.saveLabel}</div>
                                    
                                    <a href={COPY.site.links.guideUrl} className="w-full py-5 bg-royal-700 text-white font-bold rounded-xl hover:bg-royal-800 transition-all shadow-lg hover:shadow-royal-700/30 flex items-center justify-center gap-3 uppercase tracking-wider text-sm mb-4 transform hover:-translate-y-1">
                                        {COPY.pricing.mainOffer.priceBox.cta}
                                    </a>
                                </div>
                            </div>

                            <div className="bg-gold-50/50 rounded-2xl p-6 border border-gold-200 mb-8">
                                <h4 className="font-bold text-gold-800 text-sm mb-4 uppercase tracking-wide flex items-center gap-2">🎁 {COPY.pricing.mainOffer.bonus.title}</h4>
                                <div className="grid sm:grid-cols-2 gap-3 text-sm text-slate-700">
                                    {COPY.pricing.mainOffer.bonus.items.map((item) => (
                                      <div key={item} className="flex items-center gap-2"><span className="text-gold-500 font-bold">+</span> {item}</div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 pt-6 border-t border-slate-100">
                                <div className="flex items-center gap-2 font-medium">
                                    <ShieldCheckIcon /> 
                                    <span>{COPY.pricing.mainOffer.guarantee}</span>
                                </div>
                                <div className="flex items-center gap-4 opacity-70 font-serif font-bold tracking-widest">
                                    {COPY.pricing.mainOffer.paymentMethods.map((method) => (
                                      <span key={method}>{method}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Alternatives */}
                    <div className="space-y-6 lg:mt-8">
                        <div className="bg-royal-900 text-white rounded-[2rem] p-8 shadow-2xl relative overflow-hidden border border-white/10">
                             <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500 rounded-full mix-blend-overlay filter blur-[60px] opacity-30"></div>
                             <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-4 text-gold-400 font-bold text-[10px] uppercase tracking-widest border border-gold-400/30 rounded-full px-3 py-1 w-fit">
                                    <ClockIcon /> {COPY.pricing.specialPricing.badge}
                                </div>
                                <h3 className="text-2xl font-serif font-bold mb-3">{COPY.pricing.specialPricing.title}</h3>
                                <p className="text-blue-200 text-sm mb-6 font-light">{COPY.pricing.specialPricing.desc}</p>
                                <div className="text-xs space-y-2 text-blue-300 border-t border-white/10 pt-4">
                                    <p className="uppercase tracking-widest font-bold text-[10px]">{COPY.pricing.specialPricing.why.title}</p>
                                    <ul className="list-disc pl-4 space-y-1">
                                        {COPY.pricing.specialPricing.why.bullets.map((bullet) => (
                                          <li key={bullet}>{bullet}</li>
                                        ))}
                                    </ul>
                                </div>
                             </div>
                        </div>

                        <div className="bg-white rounded-[2rem] shadow-soft border border-slate-100 p-8 hover:shadow-lg transition-all">
                            <h3 className="font-serif font-bold text-slate-900 flex items-center gap-3 mb-6 text-lg">
                                <div className="p-2 bg-royal-50 rounded-lg text-royal-600"><BriefcaseIcon /></div>
                                {COPY.pricing.premium.title}
                            </h3>
                            <div className="mb-4 text-xs font-semibold text-royal-700 bg-royal-50 border border-royal-100 rounded-full px-3 py-1 w-fit">{COPY.pricing.premium.note}</div>
                            <div className="space-y-6">
                                {COPY.pricing.premium.items.map((item, idx) => (
                                  <div key={item.title} className={idx === 0 ? '' : 'border-t border-slate-100 pt-4'}>
                                    <div className="flex justify-between items-baseline mb-1">
                                      <strong className="text-sm text-slate-800">{item.title}</strong>
                                      <span className="font-bold text-royal-800 font-serif">{item.price}</span>
                                    </div>
                                    <p className="text-xs text-slate-500">{item.desc}</p>
                                  </div>
                                ))}
                                <button 
                                  onClick={onOpenModal}
                                  className="w-full py-4 bg-royal-900 text-white font-bold rounded-xl hover:bg-royal-800 transition-all shadow-md hover:-translate-y-0.5 text-sm uppercase tracking-wide"
                                >
                                    {COPY.pricing.premium.cta}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const RequirementsSection = () => (
  <section className="py-20 bg-white relative overflow-hidden" id="requirements">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6">{COPY.requirements.title}</h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">{COPY.requirements.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
            { icon: <GlobeIcon />, title: COPY.requirements.items[0].title, text: COPY.requirements.items[0].text },
            { icon: <FileTextIcon />, title: COPY.requirements.items[1].title, text: COPY.requirements.items[1].text },
            { icon: <ShieldCheckIcon />, title: COPY.requirements.items[2].title, text: COPY.requirements.items[2].text },
            { icon: <HeartIcon />, title: COPY.requirements.items[3].title, text: COPY.requirements.items[3].text },
            { icon: <UsersIcon />, title: COPY.requirements.items[4].title, text: COPY.requirements.items[4].text },
            { icon: <ActivityIcon />, title: COPY.requirements.items[5].title, text: COPY.requirements.items[5].text }
        ].map((item, i) => (
            <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="text-royal-600 mb-4 w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm border border-slate-100">
                    {item.icon}
                </div>
                <h3 className="font-serif font-bold text-slate-900 mb-2 text-lg">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
            </div>
        ))}
      </div>
    </div>
  </section>
);

const BenefitsSection = () => (
  <section className="py-20 bg-royal-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-overlay filter blur-[100px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-overlay filter blur-[100px] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-white">{COPY.benefits.title}</h2>
              <p className="text-blue-200 max-w-2xl mx-auto text-lg">{COPY.benefits.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {COPY.benefits.items.map((item, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                      <h3 className="font-serif font-bold text-gold-400 mb-3 text-xl">{item.title}</h3>
                      <p className="text-blue-100 text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>
              ))}
          </div>
      </div>
  </section>
);

const GallerySection = () => (
    <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-12 text-center">{COPY.gallery.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 h-96 md:h-[600px]">
                <div className="col-span-2 md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group">
                    <img src={MOSCOW_2_IMAGE} alt={COPY.gallery.items[0].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                        <span className="text-white font-bold text-lg">{COPY.gallery.items[0].label}</span>
                    </div>
                </div>
                <div className="relative rounded-3xl overflow-hidden group">
                     <img src={SPB_IMAGE} alt={COPY.gallery.items[1].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                        <span className="text-white font-bold text-sm">{COPY.gallery.items[1].label}</span>
                    </div>
                </div>
                <div className="relative rounded-3xl overflow-hidden group">
                    <img src={NATURE_IMAGE} alt={COPY.gallery.items[2].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                        <span className="text-white font-bold text-sm">{COPY.gallery.items[2].label}</span>
                    </div>
                </div>
                <div className="col-span-2 relative rounded-3xl overflow-hidden group">
                    <img src={CHURCH_IMAGE} alt={COPY.gallery.items[3].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                        <span className="text-white font-bold text-sm">{COPY.gallery.items[3].label}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-slate-50" id="faq">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                     <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6">{COPY.faqSection.title}</h2>
                </div>
                <div className="space-y-4">
                    {FAQS_LIST.map((item, i) => {
                        const isOpen = openIndex === i;
                        const answerId = `faq-answer-${i}`;
                        return (
                            <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    aria-expanded={isOpen}
                                    aria-controls={answerId}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                                >
                                    <span className="font-bold text-slate-900 text-lg pr-8">{item.q}</span>
                                    <span className="text-royal-600">{isOpen ? <MinusIcon /> : <PlusIcon />}</span>
                                </button>
                                <div
                                    id={answerId}
                                    hidden={!isOpen}
                                    className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100"
                                >
                                    {item.a}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

const ComparisonSection = () => (
     <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-12 text-center">{COPY.comparison.title}</h2>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b-2 border-slate-100">
                            <th className="p-4 text-slate-400 font-medium uppercase text-xs tracking-wider">{COPY.comparison.headers[0]}</th>
                            <th className="p-4 font-bold text-royal-900 text-lg">{COPY.comparison.headers[1]}</th>
                            <th className="p-4 font-bold text-slate-500 text-lg">{COPY.comparison.headers[2]}</th>
                            <th className="p-4 font-bold text-green-600 text-lg">{COPY.comparison.headers[3]}</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-700">
                         {COPY.comparison.rows.map((row, i) => (
                             <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                  <td className="p-4 font-bold">{row.item}</td>
                                  <td className="p-4">{row.ru}</td>
                                  <td className="p-4 text-slate-500">{row.west}</td>
                                  <td className="p-4 text-green-600 font-bold">{row.save}</td>
                             </tr>
                          ))}
                    </tbody>
                </table>
            </div>
            <p className="text-center text-xs text-slate-400 mt-6">{COPY.comparison.footnote}</p>
        </div>
     </section>
);

const FinalCTASection = ({ onOpenModal }: { onOpenModal: () => void }) => (
    <section className="py-32 bg-royal-900 text-white relative overflow-hidden text-center">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
         <div className="max-w-4xl mx-auto px-4 relative z-10">
             <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">{COPY.finalCta.title}</h2>
             <p className="text-blue-200 text-xl mb-12 max-w-2xl mx-auto">{COPY.finalCta.desc}</p>
             <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <button onClick={onOpenModal} className="px-10 py-5 bg-white text-royal-900 font-bold rounded-full hover:bg-slate-100 transition-all shadow-xl hover:-translate-y-1 text-lg border border-white">
                      {COPY.finalCta.primary}
                  </button>
                  <a href={COPY.site.links.guideUrl} className="px-10 py-5 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-royal-900 transition-all hover:-translate-y-1 text-lg">
                      {COPY.finalCta.secondary}
                  </a>
              </div>
          </div>
     </section>
);

const Footer = () => (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-12">
            <div className="col-span-1 md:col-span-1">
                 <div className="flex items-center gap-2 mb-6 text-white font-serif font-bold text-xl">
                    <div className="w-8 h-8 bg-royal-700 rounded flex items-center justify-center text-gold-400">{COPY.site.brand.mark}</div>
                    {COPY.site.brand.footerName}
                  </div>
                 <p className="text-sm leading-relaxed mb-6">{COPY.footer.about}</p>
             </div>
             
             <div>
                <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">{COPY.footer.navigationTitle}</h4>
                <ul className="space-y-3 text-sm">
                    {COPY.footer.navigation.map((item) => (
                      <li key={item.href}><a href={item.href} className="hover:text-white transition-colors">{item.label}</a></li>
                    ))}
                </ul>
             </div>

             <div>
                <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">{COPY.footer.contactTitle}</h4>
                <ul className="space-y-3 text-sm">
                    <li>{COPY.site.contactEmail}</li>
                    <li>{COPY.site.location}</li>
                    <li className="pt-4">
                        <a href={COPY.site.links.guideUrl} className="inline-block px-4 py-2 bg-royal-800 text-white rounded-lg hover:bg-royal-700 transition-colors text-xs font-bold uppercase tracking-wide">
                            {COPY.footer.guideCta}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} {COPY.footer.copyright.prefix}</p>
        </div>
    </footer>
);

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-gold-200 selection:text-royal-900">
      <SchemaMarkup />
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <TrustSection />
      <ProblemSection />
      <SolutionSection />
      <ApplicationProcessSection />
      <RequirementsSection />
      <BenefitsSection />
      <GallerySection />
      <TestimonialsSection onOpenModal={() => setIsModalOpen(true)} />
      <EligibilitySection onOpenModal={() => setIsModalOpen(true)} />
      <FaqSection />
      <ComparisonSection />
      <PricingSection onOpenModal={() => setIsModalOpen(true)} />
      <FinalCTASection onOpenModal={() => setIsModalOpen(true)} />
      <Footer />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;
