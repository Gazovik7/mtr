import React, { useState, useEffect, useRef } from 'react';

// --- Data Constants ---
const FAQS_LIST = [
  { q: "Do I need to speak Russian?", a: "Not for the Shared Values Visa application itself. You can learn it after you arrive. There is no language exam required for the initial visa." },
  { q: "Can I work in Russia?", a: "Yes. Once you receive your Temporary Residence Permit (TRP), you have the full right to work in Russia without needing a separate work permit." },
  { q: "How long does the process take?", a: "Plan for 12-18 months end-to-end, including document prep, travel, and the TRP processing window inside Russia." },
  { q: "Is my family eligible?", a: "Yes, your spouse and minor children can be included in the process to move with you." },
  { q: "Do I have to renounce my current citizenship?", a: "No, Russia allows dual citizenship in many cases, and you do not need to give up your passport to get a TRP." }
];

const PLACEHOLDER_IMAGE = "/images/placeholder.jpg";
const PLACEHOLDER_IMAGE_ABS = "https://sharedvaluesvisa.com/images/placeholder.jpg";
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
        "@id": "https://sharedvaluesvisa.com/#organization",
        "name": "Shared Values Visa Assistance",
        "url": "https://sharedvaluesvisa.com",
        "logo": {
          "@type": "ImageObject",
          "url": PLACEHOLDER_IMAGE_ABS
        },
        "description": "Helping families and individuals find stability and tradition in Russia through the Shared Values Visa program."
      },
      {
        "@type": "WebSite",
        "@id": "https://sharedvaluesvisa.com/#website",
        "url": "https://sharedvaluesvisa.com",
        "name": "Shared Values Visa",
        "publisher": {
          "@id": "https://sharedvaluesvisa.com/#organization"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://sharedvaluesvisa.com/#faq",
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
        "name": "Shared Values Visa Guide",
        "description": "Complete step-by-step handbook for applying to Russian residency via Decree No. 702.",
        "image": PLACEHOLDER_IMAGE_ABS,
        "sku": "SVV-GUIDE-2025",
        "offers": {
          "@type": "Offer",
          "price": "99.00",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "https://movetorussia.com/get-access/"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "3500"
        }
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
      alert("Thank you for your inquiry. A specialist will contact you shortly.");
      setFormData({ name: '', email: '', phone: '', message: '' });
      onClose();
    } catch (error) {
      console.error(error);
      alert("We couldn't send your request. Please try again.");
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
          <h3 className="text-2xl font-serif font-bold mb-2">Schedule Consultation</h3>
          <p className="text-blue-200 text-sm font-light">Fill out the form below and our team will get back to you within 24 hours.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Full Name</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-royal-500 focus:bg-white outline-none transition-all"
              placeholder="John Doe"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Email Address</label>
            <input 
              required
              type="email" 
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-royal-500 focus:bg-white outline-none transition-all"
              placeholder="john@example.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Phone Number</label>
            <input 
              type="tel" 
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-royal-500 focus:bg-white outline-none transition-all"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">How can we help?</label>
            <textarea 
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-royal-500 focus:bg-white outline-none transition-all h-24 resize-none"
              placeholder="I have questions about..."
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>
          <button type="submit" className="w-full py-4 bg-royal-800 text-white font-bold rounded-xl hover:bg-royal-900 transition-all shadow-lg hover:shadow-royal-900/20 uppercase tracking-widest text-sm flex items-center justify-center gap-2" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Request Consultation'} <ArrowRightIcon />
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
          <div className="w-10 h-10 bg-royal-900 rounded-lg flex items-center justify-center text-gold-400 font-serif font-bold text-lg shadow-lg shadow-royal-900/20 group-hover:scale-105 transition-transform">SV</div>
          <div className="flex flex-col">
              <span className="font-serif font-bold text-slate-900 tracking-tight leading-none text-lg">Shared Values Visa</span>
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Official Pathway</span>
          </div>
        </div>
        <div className="hidden md:flex space-x-10 text-sm font-semibold text-slate-600">
          <a href="#trust" onClick={(e) => scrollToSection(e, 'trust')} className="hover:text-royal-800 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-royal-800 after:transition-all hover:after:w-full">Trust</a>
          <a href="#eligibility" onClick={(e) => scrollToSection(e, 'eligibility')} className="hover:text-royal-800 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-royal-800 after:transition-all hover:after:w-full">Eligibility</a>
          <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="hover:text-royal-800 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-royal-800 after:transition-all hover:after:w-full">FAQ</a>
        </div>
        <button 
          onClick={onOpenModal}
          className="bg-royal-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-royal-800 transition-all shadow-lg hover:shadow-royal-900/30 hover:-translate-y-0.5 border border-transparent hover:border-royal-700"
        >
          Schedule Free Consultation
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
            alt="Moscow St Basil's Cathedral" 
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
        <span className="uppercase tracking-wider">Applications Open for 2025</span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 tracking-tight mb-6 leading-[1.1] drop-shadow-sm">
        Russia <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-700 to-royal-900">Shared Values</span> Visa
      </h1>
      
      <h2 className="text-xl md:text-3xl font-medium text-slate-600 mb-10 max-w-4xl mx-auto font-serif italic">
        "Join Thousands of Westerners Building a New Life in Russia"
      </h2>
      
      <div className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 mb-12 space-y-6 text-left md:text-center leading-relaxed font-light">
        <p>
          You're looking for a place where traditional values still matter. Where family is sacred, faith flourishes, and moral principles aren't mocked. Where your children can grow up with clear values instead of confusion.
        </p>
        <p>
          The Shared Values Visa (SVV) is a legally-backed pathway to Russia for citizens of 47 countries who reject "destructive neoliberal ideology" and are seeking an alternative way of life.
        </p>
        <p className="font-serif font-bold text-royal-900 border-l-4 border-gold-400 pl-4 md:pl-0 md:border-none">
          Not theory. Not politics. A real path to permanent residence, work, and family life in a country where your values are shared by millions.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-5 mb-14">
        <button 
          onClick={onOpenModal}
          className="px-10 py-4 bg-royal-900 text-white rounded-full font-bold hover:bg-royal-800 transition-all flex items-center justify-center gap-3 shadow-xl shadow-royal-900/20 hover:shadow-royal-900/30 hover:-translate-y-1 text-sm md:text-base tracking-wide group"
        >
          Schedule Free Consultation
          <span className="group-hover:translate-x-1 transition-transform"><ArrowRightIcon /></span>
        </button>
        <a 
          href="https://movetorussia.com/get-access/" 
          className="px-10 py-4 bg-white text-royal-900 border border-slate-200 rounded-full font-bold hover:bg-slate-50 transition-all shadow-md hover:shadow-lg hover:-translate-y-1 text-sm md:text-base"
        >
          Get Your Visa Guide
        </a>
      </div>
      
      <div className="flex flex-col items-center gap-4 animate-float">
         <div className="flex items-center gap-1 bg-white px-4 py-2 rounded-full shadow-soft border border-slate-100">
             <div className="flex text-gold-400"><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></div>
             <span className="text-slate-900 font-bold ml-2 text-sm">(4.9/5) <span className="text-slate-400 mx-2">|</span> "Trusted by 3,500+ applicants"</span>
         </div>
         <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-semibold text-slate-600 mt-2">
             <span className="flex items-center gap-2">
               <div className="text-green-600 w-5 h-5 flex-shrink-0"><CheckCircleIcon /></div> 
               <span>92% approved on first application</span>
             </span>
             <span className="flex items-center gap-2">
               <div className="text-green-600 w-5 h-5 flex-shrink-0"><CheckCircleIcon /></div> 
               <span>Full journey: ~18 months</span>
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
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Why Trust Us with Your Most Important Decision?</h2>
        <div className="w-24 h-1 bg-gold-400 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
         {/* Block 1 */}
         <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:shadow-royal-900/5 hover:border-royal-100 transition-all duration-300 group">
            <div className="w-14 h-14 bg-white text-royal-700 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
              <FileTextIcon />
            </div>
            <h3 className="font-serif font-bold text-slate-900 mb-4 text-lg">Based on Presidential Decree</h3>
            <ul className="space-y-3 mb-8 text-sm text-slate-600 leading-relaxed">
               <li className="flex items-start gap-2"><span className="text-gold-500 mt-0.5">•</span> Decree No. 702 (Sep 19, 2024)</li>
               <li className="flex items-start gap-2"><span className="text-gold-500 mt-0.5">•</span> Signed personally by President Vladimir Putin</li>
               <li className="flex items-start gap-2"><span className="text-gold-500 mt-0.5">•</span> Completely legal and official</li>
               <li className="flex items-start gap-2"><span className="text-gold-500 mt-0.5">•</span> Active and enforced today</li>
            </ul>
         </div>

         {/* Block 2 */}
         <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:shadow-royal-900/5 hover:border-royal-100 transition-all duration-300 group">
            <div className="w-14 h-14 bg-white text-royal-700 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
              <UsersIcon />
            </div>
            <h3 className="font-serif font-bold text-slate-900 mb-4 text-lg">Thousands of Success Stories</h3>
            <ul className="space-y-3 mb-8 text-sm text-slate-600 leading-relaxed">
               <li className="flex items-start gap-2"><span className="text-gold-500 mt-0.5">•</span> Real people, real approvals</li>
               <li className="flex items-start gap-2"><span className="text-gold-500 mt-0.5">•</span> Families, retirees, freelancers</li>
               <li className="flex items-start gap-2"><span className="text-gold-500 mt-0.5">•</span> Highest satisfaction ratings</li>
            </ul>
            <a href="#testimonials" onClick={(e) => scrollToSection(e, 'testimonials')} className="text-royal-700 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all mt-auto group-hover:text-royal-900">
              View testimonials <span className="transition-transform"><SmallArrowIcon /></span>
            </a>
         </div>

         {/* Block 3 */}
         <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:shadow-royal-900/5 hover:border-royal-100 transition-all duration-300 group">
            <div className="w-14 h-14 bg-white text-royal-700 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
              <AwardIcon />
            </div>
            <h3 className="font-serif font-bold text-slate-900 mb-4 text-lg">Expert-Led Guidance</h3>
            <ul className="space-y-3 mb-8 text-sm text-slate-600 leading-relaxed">
               <li className="flex items-start gap-2"><span className="text-gold-500 mt-0.5">•</span> Immigration lawyers on staff</li>
               <li className="flex items-start gap-2"><span className="text-gold-500 mt-0.5">•</span> Updated regularly with changes</li>
               <li className="flex items-start gap-2"><span className="text-gold-500 mt-0.5">•</span> Years of experience</li>
               <li className="flex items-start gap-2"><span className="text-gold-500 mt-0.5">•</span> Consulate trained experts</li>
            </ul>
         </div>

         {/* Block 4 */}
         <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:shadow-royal-900/5 hover:border-royal-100 transition-all duration-300 group">
            <div className="w-14 h-14 bg-white text-royal-700 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
              <ShieldCheckIcon />
            </div>
            <h3 className="font-serif font-bold text-slate-900 mb-4 text-lg">100% Transparent Process</h3>
            <ul className="space-y-3 mb-8 text-sm text-slate-600 leading-relaxed">
               <li className="flex items-start gap-2"><span className="text-gold-500 mt-0.5">•</span> Step-by-step guide included</li>
               <li className="flex items-start gap-2"><span className="text-gold-500 mt-0.5">•</span> Zero hidden fees or surprises</li>
               <li className="flex items-start gap-2"><span className="text-gold-500 mt-0.5">•</span> 30-day money-back guarantee</li>
            </ul>
            <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="text-royal-700 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all mt-auto group-hover:text-royal-900">
              View pricing <span className="transition-transform"><SmallArrowIcon /></span>
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

  const questions = [
    {
      q: "What is your primary motivation?",
      options: ["Seeking Traditional Values", "Better Future for Children", "Economic Opportunities", "Safety & Security"]
    },
    {
      q: "Who are you planning to move with?",
      options: ["Just myself", "With Spouse", "Whole Family (with kids)", "Retiring Couple"]
    },
    {
      q: "What is your timeline?",
      options: ["Immediately (ASAP)", "In 12-18 Months", "Next Year", "Just Researching"]
    },
    {
      q: "Do you hold a passport from:",
      options: ["USA / UK / Canada", "EU Country", "Australia / NZ", "Other"]
    }
  ];

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await submitLead({ source: 'quiz-email', email });
      setViewState('quiz');
    } catch (error) {
      console.error(error);
      alert("We couldn't send your email. Please try again.");
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

  const painPoints = [
    {
      title: "Your government no longer represents your values.",
      desc: "Political decisions contradict what you believe in. You watch the news and realize: this is no longer your country."
    },
    {
      title: "You're afraid to raise children in this environment.",
      desc: "Schools teach ideas you reject. Neighbors and friends pressure you with views you disagree with. You want your children to grow up with clear values instead of confusion."
    },
    {
      title: "You're exhausted by the restrictions on your faith.",
      desc: "Speaking about traditional values has become dangerous. You're labeled \"backward\" or a \"fanatic\" for believing in God, family, and tradition."
    },
    {
      title: "You desperately seek a society where faith, family & stability still matter.",
      desc: "You need a place where most people share your beliefs—not mock them."
    },
    {
      title: "You feel profoundly alone.",
      desc: "Everything around you feels hostile. Others who think like you either stay silent or are planning to leave. You need a community of like-minded people."
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column */}
          <div className="pr-4">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-8 leading-tight">
              Does Western Culture No Longer Feel Like <span className="italic text-royal-800">Home?</span>
            </h2>
            <p className="text-lg text-slate-600 mb-12 leading-relaxed font-light">
              You've felt it coming for years. Maybe longer. The frustration grows with each passing day:
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
                        Interactive Assessment
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
                            Take our 2-minute Quiz: <br/><span className="text-gold-400">Is Russia Right for You?</span>
                        </h3>
                        <form onSubmit={handleEmailSubmit} className="space-y-5">
                            <p className="text-blue-100 font-light text-sm">
                                Answer 4 simple questions to receive your personalized eligibility report and relocation roadmap.
                            </p>
                            <div>
                                <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider mb-2">Enter your email to start</label>
                                <input 
                                type="email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-blue-300/50 focus:ring-2 focus:ring-gold-500 focus:bg-white/10 outline-none transition-all backdrop-blur-sm"
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 border border-white/10"
                            >
                                Start Assessment <ArrowRightIcon />
                            </button>
                            <p className="text-[10px] text-blue-300/60 text-center uppercase tracking-wider">
                                Your privacy is protected. No spam.
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
                          <h3 className="text-xl font-bold mb-2">Analyzing your profile...</h3>
                          <p className="text-blue-200 text-sm">Comparing your answers with Decree No. 702 requirements.</p>
                      </div>
                  )}

                  {/* VIEW: RESULT */}
                  {viewState === 'result' && (
                    <div className="text-center animate-fade-in my-auto">
                       <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-400/30 shadow-lg animate-[bounce_1s_ease-in-out_1]">
                         <CheckCircleIcon />
                       </div>
                       <h4 className="text-2xl font-serif font-bold mb-2">Excellent Match!</h4>
                       <div className="bg-white/10 rounded-xl p-4 mb-6 border border-white/10 backdrop-blur-sm text-left">
                           <p className="text-blue-100 text-sm mb-3">
                             Based on your answers, you appear to be a <strong className="text-white">High Potential Candidate</strong> for the Shared Values Visa program.
                           </p>
                           <p className="text-blue-100 text-sm">
                             We've sent your personalized report and next steps to <span className="text-white font-semibold border-b border-white/20">{email}</span>.
                           </p>
                       </div>
                       
                       <a 
                         href="https://movetorussia.com/get-access/" 
                         target="_blank"
                         className="block w-full py-4 bg-gold-400 text-royal-900 font-bold rounded-xl hover:bg-gold-300 transition-all shadow-lg mb-4"
                       >
                         Get Your Visa Guide Now
                       </a>

                       <button 
                         onClick={restart}
                         className="text-xs text-blue-300 hover:text-white transition-colors underline decoration-blue-300/50 underline-offset-4"
                       >
                         Start over
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
           <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight mb-4">The Shared Values Visa</h2>
           <p className="text-slate-500 font-medium tracking-widest uppercase text-sm">Official Decree No. 702 Pathway</p>
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
                {tab === 'basics' && 'The Basics'}
                {tab === 'compare' && 'Compare Alternatives'}
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
                   <h3 className="text-3xl font-serif font-bold text-slate-900 mb-6">This isn't just a visa. This is your ticket to a stable future.</h3>
                   <p className="text-slate-600 text-lg leading-relaxed">When you complete the process, you'll receive an <span className="font-bold text-royal-800 bg-royal-50 px-2 py-0.5 rounded">Entry Visa</span> (to travel) and a <span className="font-bold text-royal-800 bg-royal-50 px-2 py-0.5 rounded">Temporary Residence Permit (3 years)</span> to live, work, and build your life.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                   <div className="bg-gradient-to-br from-royal-50 to-white p-8 rounded-3xl border border-royal-100 shadow-sm">
                      <h4 className="font-bold text-royal-900 mb-6 flex items-center gap-3 text-lg">
                        <div className="p-2 bg-royal-100 rounded-lg text-royal-600"><AwardIcon /></div> Why this matters
                      </h4>
                      <ul className="space-y-4">
                        {[
                          "Issued by Presidential Decree (Legal & Official)",
                          "For eligible citizens (EU, USA, Canada, Japan, etc.)",
                          "Fast-track to residency (Bypasses quotas)",
                          "Work rights included immediately"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-4">
                            <div className="mt-1 text-green-600 bg-green-100 rounded-full p-1"><CheckCircleIcon /></div>
                            <span className="text-slate-700 font-medium leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                   </div>
                   
                   {/* Enhanced Image Card */}
                   <div className="relative flex flex-col justify-end items-start p-8 rounded-3xl border border-slate-200 overflow-hidden min-h-[300px] group">
                      <img src={PEOPLE_IMAGE} alt="People in Russia" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-royal-900/95 via-royal-900/50 to-royal-900/10"></div>
                      
                      <div className="relative z-10 text-white text-left">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white shadow-md mb-4 border border-white/20"><GlobeIcon /></div>
                        <h4 className="font-serif font-bold mb-2 text-xl">Who is this for?</h4>
                        <p className="text-blue-100 mb-6 text-sm leading-relaxed">Citizens of 47 countries who value traditional principles over neoliberal ideology.</p>
                        <a href="#eligibility" onClick={(e) => scrollToSection(e, 'eligibility')} className="text-gold-400 font-bold text-xs uppercase tracking-widest border-b border-gold-400/50 hover:border-gold-400 transition-all pb-1">Check Eligibility List</a>
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
                         <span className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm">VS</span> Traditional TRP (Quota)
                       </h3>
                       <ul className="space-y-5">
                          {[
                            "Requires migration quota (Only 10.5k/year)",
                            "Mandatory Russian language exam",
                            "Complex document requirements",
                            "8-12 months or longer wait",
                            "Unpredictable outcome"
                          ].map((item, i) => (
                             <li key={i} className="flex items-start gap-3 text-slate-500">
                                <span className="text-red-400 font-bold text-lg leading-none mt-0.5">✗</span>
                                <span className="font-medium">{item}</span>
                             </li>
                          ))}
                       </ul>
                    </div>

                    {/* SVV */}
                    <div className="bg-white p-10 rounded-3xl border-2 border-royal-600 shadow-2xl shadow-royal-900/10 relative overflow-hidden transform md:-translate-y-2">
                       <div className="absolute top-0 right-0 bg-royal-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-widest shadow-lg">RECOMMENDED</div>
                       <h3 className="text-2xl font-serif font-bold text-royal-900 mb-8 flex items-center gap-3">
                         <div className="p-2 bg-royal-100 rounded-lg text-royal-600"><StarIcon /></div> Shared Values Visa
                       </h3>
                       <ul className="space-y-5">
                          {[
                            "NO quota needed",
                            "NO language exam initially",
                            "Streamlined documents",
                            "~6 months typical timeline",
                            "More predictable process"
                          ].map((item, i) => (
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
    const steps = [
        {
            title: "Preparation Phase",
            duration: "Months 1-4",
            cost: "$1,000 - $2,000",
            icon: <FileTextIcon />,
            content: (
                <>
                    <p className="font-semibold mb-3 text-royal-900">Gather required documents:</p>
                    <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex gap-2 items-start"><span className="text-green-500 mt-0.5">✓</span> Valid passport (4+ years remaining)</li>
                        <li className="flex gap-2 items-start"><span className="text-green-500 mt-0.5">✓</span> Criminal background check (with apostille)</li>
                        <li className="flex gap-2 items-start"><span className="text-green-500 mt-0.5">✓</span> Marriage/Birth/Divorce certificates (apostille)</li>
                        <li className="flex gap-2 items-start"><span className="text-green-500 mt-0.5">✓</span> Medical insurance document ($30,000+ coverage)</li>
                        <li className="flex gap-2 items-start"><span className="text-green-500 mt-0.5">✓</span> Photographs (3.5×4.5 cm, 4-5 copies)</li>
                    </ul>
                </>
            )
        },
        {
            title: "Visa Application",
            duration: "Months 5-7",
            cost: "$500 - $1,000",
            icon: <BriefcaseIcon />,
            content: (
                <div className="space-y-3">
                    <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600 marker:text-royal-600 marker:font-bold">
                        <li><strong>Fill out form:</strong> Visit visa.kdmid.ru. Specify "private" purpose. Print & sign with pen.</li>
                        <li><strong>Write letter to Consulate:</strong> Request visa for temporary residence application. Include full details.</li>
                        <li><strong>Assemble package:</strong> Passport, form, letter, background check, photos, insurance.</li>
                        <li><strong>Submit in person:</strong> Visit your nearest Russian Consulate. Pay fee.</li>
                    </ol>
                    <div className="bg-amber-50 text-amber-800 text-xs p-3 rounded-lg border border-amber-100 italic">
                        <strong>NOTE:</strong> Any non-transit visa type is acceptable, though we recommend a 3+ month visa.
                    </div>
                </div>
            )
        },
        {
            title: "Travel to Russia",
            duration: "Months 8-10",
            cost: "$2,500 - $4,000",
            icon: <PlaneIcon />,
            content: (
                <div className="space-y-3">
                    <ul className="space-y-3 text-sm text-slate-600">
                         <li className="flex gap-3 items-start bg-slate-50 p-2 rounded"><span className="text-royal-500 font-bold">1.</span> <span><strong>Book accommodation:</strong> Apartment or hotel (needed for registration).</span></li>
                         <li className="flex gap-3 items-start bg-slate-50 p-2 rounded"><span className="text-royal-500 font-bold">2.</span> <span><strong>Book flight:</strong> Moscow or St. Petersburg recommended.</span></li>
                         <li className="flex gap-3 items-start bg-slate-50 p-2 rounded"><span className="text-royal-500 font-bold">3.</span> <span><strong>Arrival Tasks:</strong> Register address, get Russian SIM, open bank account, get medical exam.</span></li>
                    </ul>
                </div>
            )
        },
        {
            title: "TRP Application",
            duration: "Months 11-14",
            cost: "$1,500 - $2,500",
            icon: <FileTextIcon />,
            content: (
                <div className="space-y-3">
                    <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600 marker:text-royal-600 marker:font-bold">
                        <li><strong>Appointment:</strong> Book at Migration Center (FMIV).</li>
                        <li><strong>Prepare Docs:</strong> Forms, medical results, certified translations, passport, photos.</li>
                        <li><strong>Submit:</strong> Visit FMIV, get fingerprinted & photographed.</li>
                        <li><strong>Pay Fee:</strong> 1,920 RUB (~$20).</li>
                    </ol>
                </div>
            )
        },
        {
            title: "Wait & Approval",
            duration: "Months 15-18",
            cost: "$2,000+ (living)",
            icon: <CheckCircleIcon />,
            content: (
                 <div className="space-y-3">
                    <p className="text-sm text-slate-500 italic">Processing commonly takes 4-6 months inside Russia. Plan for living expenses while you wait—you can legally stay and work.</p>
                    <div className="flex flex-col gap-2 mt-4">
                        <span className="font-bold text-sm text-royal-900">When approved:</span>
                        <div className="bg-gradient-to-r from-green-50 to-green-100 text-green-900 p-4 rounded-xl text-sm font-bold border border-green-200 flex items-center gap-3 shadow-sm">
                            <div className="bg-white rounded-full p-1 text-green-600"><AwardIcon /></div>
                            YOU ARE NOW OFFICIALLY A RESIDENT FOR 3 YEARS!
                        </div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
             {/* Background Element */}
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#f0f4fa_1px,transparent_1px),linear-gradient(to_bottom,#f0f4fa_1px,transparent_1px)] bg-[size:4rem_4rem] -z-10 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="inline-block px-5 py-2 bg-royal-100 text-royal-800 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border border-royal-200">
                        Step-by-Step Guide
                    </div>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                        Your 5-Step Roadmap <br className="hidden md:block" /> to Russian Residency
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
                                                <CreditCardIcon /> Est. Cost: {step.cost}
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
                                            {step.icon}
                                        </div>
                                        
                                        <div className="leading-relaxed">
                                            {step.content}
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
                        <h3 className="text-xl font-bold mb-8 uppercase tracking-[0.2em] text-gold-400">Total Summary</h3>
                        <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-24">
                            <div className="text-center">
                                <div className="text-blue-200 text-xs uppercase font-bold mb-2 tracking-wider">Total Timeline</div>
                                <div className="text-5xl md:text-6xl font-serif font-bold tracking-tight">~18 <span className="text-3xl">Months</span></div>
                            </div>
                            <div className="hidden md:block w-px bg-white/10"></div>
                             <div className="text-center">
                                <div className="text-blue-200 text-xs uppercase font-bold mb-2 tracking-wider">Total Estimated Cost</div>
                                <div className="text-5xl md:text-6xl font-serif font-bold text-green-400">$10,000+</div>
                                <div className="text-xs text-blue-300 mt-3 font-light">*Plan for extended stays, translations, travel, and living costs</div>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </section>
    );
};

const TestimonialsSection = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const testimonials = [
    {
      name: "Michael T.",
      location: "Moscow",
      origin: "USA",
      flag: "🇺🇸",
      date: "June 2025",
      type: "Family of 4",
      quote: "I was skeptical. It seemed too good to be true. But the guide was so detailed and clear that I just followed each step. My family and I flew to Moscow in December, and by June our application was approved. Best decision we've ever made.",
    },
    {
      name: "Sarah M.",
      location: "St. Petersburg",
      origin: "Canada",
      flag: "🇨🇦",
      date: "March 2025",
      type: "Freelancer",
      quote: "I've been a digital nomad for 5 years. Legal status always worried me. With the Shared Values Visa, I have peace of mind. I work remotely, earn in dollars, pay taxes legally, and live in a beautiful city.",
    },
    {
      name: "Robert & Linda W.",
      location: "Kazan",
      origin: "Australia",
      flag: "🇦🇺",
      date: "February 2025",
      type: "Retirees",
      quote: "We were tired of the West. We wanted a place where family values still meant something. Your guide anticipated every question. We moved to Kazan and found a community of faithful, wise, kind people.",
    }
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden" id="testimonials">
      {/* Background decoration with Photo */}
      <div className="absolute inset-0 z-0">
          <img 
            src={PLACEHOLDER_IMAGE} 
            alt="Moscow City Skyline" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-white/90 backdrop-blur-[2px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
         {/* Header */}
         <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight">Real People, Real Stories, Real Success</h2>
            <p className="mt-6 text-slate-600 max-w-2xl mx-auto text-lg font-light">Join the growing community of expats who found their new home.</p>
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
                         {t.origin} • Approved: {t.date}
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
                   <h3 className="text-3xl font-serif font-bold mb-4">Success Stories</h3>
                   <p className="text-blue-200 mb-8 font-light text-lg">We've helped hundreds of people successfully navigate the immigration process.</p>
                   <ul className="space-y-4 mb-8">
                      <li className="flex items-center gap-4 font-medium"><span className="text-green-400 bg-green-500/20 p-1 rounded-full"><CheckCircleIcon /></span> High success rate with complete docs</li>
                      <li className="flex items-center gap-4 font-medium"><span className="text-green-400 bg-green-500/20 p-1 rounded-full"><CheckCircleIcon /></span> Thousands of satisfied clients</li>
                      <li className="flex items-center gap-4 font-medium"><span className="text-green-400 bg-green-500/20 p-1 rounded-full"><CheckCircleIcon /></span> Families, retirees, professionals approved</li>
                   </ul>
                </div>
             </div>

             {/* Share Block */}
             <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-[2.5rem] p-12 text-white flex flex-col justify-center relative overflow-hidden shadow-2xl">
                 <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10">
                    <svg width="250" height="250" viewBox="0 0 24 24" fill="currentColor"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2-2z"/></svg>
                 </div>
                 <div className="relative z-10">
                   <h3 className="text-3xl font-serif font-bold mb-4">Share Your Story</h3>
                   <p className="text-blue-100 mb-8 font-light text-lg">If you've been approved, inspire others! You'll receive a 10% discount on future services.</p>
                   <button 
                     onClick={onOpenModal}
                     className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl shadow-lg hover:bg-blue-50 transition-colors flex items-center justify-center w-fit uppercase tracking-wide text-sm transform hover:-translate-y-1"
                   >
                      Submit Your Story
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

  // Full list of 47 eligible countries (Representative based on decree)
  const eligibleList = [
    "Albania", "Andorra", "Australia", "Austria", "Bahamas", "Belgium", "Bulgaria", "Canada",
    "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France",
    "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Japan", "Latvia",
    "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Micronesia", "Monaco", "Montenegro",
    "Netherlands", "New Zealand", "North Macedonia", "Norway", "Poland", "Portugal",
    "Romania", "San Marino", "Singapore", "Slovakia", "Slovenia", "South Korea", "Spain",
    "Sweden", "Switzerland", "Taiwan", "United Kingdom", "United States"
  ];

  const checkEligibility = () => {
    if (!country || !sharesValues || !validPassport) return;

    // Logic: Must be in list + Share Values + Valid Passport
    if (country !== "Other / Not Listed" && sharesValues === 'yes' && validPassport === 'yes') {
        setResult('qualified');
    } else {
        setResult('consult');
    }
  };

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200" id="eligibility">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
           <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 uppercase tracking-tight">Do You Qualify? <span className="text-royal-600">Check in 30 Seconds</span></h2>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white rounded-[2rem] shadow-2xl shadow-royal-900/10 border border-slate-100 overflow-hidden">
                <div className="bg-royal-900 p-8 text-white text-center border-b border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    <h3 className="text-lg font-bold uppercase tracking-[0.2em] text-gold-400 relative z-10">Interactive Eligibility Checker</h3>
                </div>
                
                <div className="p-10 md:p-14 space-y-10">
                    {!result ? (
                        <>
                            {/* Q1 */}
                            <div>
                                <label className="block text-slate-800 font-bold mb-4 text-lg font-serif">1. Where is your passport issued?</label>
                                <div className="relative">
                                    <select 
                                        className="w-full p-5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:ring-2 focus:ring-royal-500 focus:bg-white outline-none transition-all appearance-none cursor-pointer font-medium"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                    >
                                        <option value="" disabled>Select your country...</option>
                                        {eligibleList.map(c => <option key={c} value={c}>{c}</option>)}
                                        <option value="Other / Not Listed">Other / Not Listed</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                                </div>
                            </div>

                            {/* Q2 */}
                            <div>
                                <label className="block text-slate-800 font-bold mb-4 text-lg font-serif">2. Do you share traditional Russian values?</label>
                                <div className="flex gap-6">
                                    <button 
                                        onClick={() => setSharesValues('yes')}
                                        className={`flex-1 py-4 px-6 rounded-xl border-2 font-bold transition-all transform hover:-translate-y-1 ${sharesValues === 'yes' ? 'border-royal-600 bg-royal-50 text-royal-700 shadow-md' : 'border-slate-100 bg-slate-50 hover:border-slate-300 text-slate-500'}`}
                                    >
                                        Yes
                                    </button>
                                    <button 
                                        onClick={() => setSharesValues('no')}
                                        className={`flex-1 py-4 px-6 rounded-xl border-2 font-bold transition-all transform hover:-translate-y-1 ${sharesValues === 'no' ? 'border-royal-600 bg-royal-50 text-royal-700 shadow-md' : 'border-slate-100 bg-slate-50 hover:border-slate-300 text-slate-500'}`}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>

                            {/* Q3 */}
                            <div>
                                <label className="block text-slate-800 font-bold mb-4 text-lg font-serif">3. Does your passport have 4+ years of validity remaining?</label>
                                <div className="flex gap-6">
                                    <button 
                                        onClick={() => setValidPassport('yes')}
                                        className={`flex-1 py-4 px-6 rounded-xl border-2 font-bold transition-all transform hover:-translate-y-1 ${validPassport === 'yes' ? 'border-royal-600 bg-royal-50 text-royal-700 shadow-md' : 'border-slate-100 bg-slate-50 hover:border-slate-300 text-slate-500'}`}
                                    >
                                        Yes
                                    </button>
                                    <button 
                                        onClick={() => setValidPassport('no')}
                                        className={`flex-1 py-4 px-6 rounded-xl border-2 font-bold transition-all transform hover:-translate-y-1 ${validPassport === 'no' ? 'border-royal-600 bg-royal-50 text-royal-700 shadow-md' : 'border-slate-100 bg-slate-50 hover:border-slate-300 text-slate-500'}`}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>

                            <button 
                                onClick={checkEligibility}
                                disabled={!country || !sharesValues || !validPassport}
                                className="w-full py-5 bg-royal-700 text-white font-bold rounded-xl hover:bg-royal-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-royal-700/30 text-lg uppercase tracking-widest transform hover:-translate-y-0.5"
                            >
                                Check Your Eligibility
                            </button>
                        </>
                    ) : (
                        <div className="animate-fade-in text-center">
                            {result === 'qualified' ? (
                                <div className="bg-green-50 border border-green-200 rounded-3xl p-10">
                                    <div className="w-24 h-24 bg-white text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm border border-green-100">
                                        <CheckCircleIcon />
                                    </div>
                                    <h3 className="text-3xl font-serif font-bold text-green-800 mb-4">YOU QUALIFY!</h3>
                                    <p className="text-green-700 mb-10 max-w-md mx-auto text-lg leading-relaxed">Great news! You are likely eligible for the Shared Values Visa based on your responses. We recommend confirming with your local consulate.</p>
                                    <a href="https://movetorussia.com/get-access/" className="px-10 py-5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 w-full md:w-auto uppercase tracking-wide hover:-translate-y-1 inline-block">
                                        GET YOUR FULL GUIDE ($99)
                                    </a>
                                    <button onClick={() => setResult(null)} className="block mt-6 text-sm text-green-600 hover:text-green-800 hover:underline w-full font-medium">Check again</button>
                                </div>
                            ) : (
                                <div className="bg-amber-50 border border-amber-200 rounded-3xl p-10">
                                    <div className="w-24 h-24 bg-white text-amber-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm border border-amber-100">
                                        <span className="text-5xl font-serif font-bold">?</span>
                                    </div>
                                    <h3 className="text-3xl font-serif font-bold text-amber-800 mb-4">CHECK WITH CONSULATE</h3>
                                    <p className="text-amber-700 mb-10 max-w-md mx-auto text-lg leading-relaxed">Your situation requires official verification. Your country might have specific requirements or exceptions.</p>
                                    <button 
                                      onClick={onOpenModal}
                                      className="px-10 py-5 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 transition-all shadow-lg w-full md:w-auto uppercase tracking-wide hover:-translate-y-1"
                                    >
                                        SCHEDULE FREE CONSULTATION
                                    </button>
                                    <button onClick={() => setResult(null)} className="block mt-6 text-sm text-amber-700 hover:text-amber-900 hover:underline w-full font-medium">Check again</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Countries List */}
        <div className="mb-20">
             <h3 className="text-2xl font-serif font-bold text-slate-900 mb-10 text-center">Eligible Countries (Representative List)</h3>
             <div className="grid md:grid-cols-3 gap-8 text-sm">
                
                {/* Europe */}
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-soft hover:shadow-lg transition-all">
                    <h4 className="font-bold text-royal-900 mb-6 border-b border-royal-100 pb-3 flex items-center gap-2">🇪🇺 EUROPEAN UNION & EUROPE</h4>
                    <ul className="space-y-1 text-slate-600 columns-2 md:columns-3 font-medium text-xs">
                        {[
                            "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", 
                            "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", 
                            "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", 
                            "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", 
                            "Slovenia", "Spain", "Sweden", "Albania", "Andorra", "Iceland", "Liechtenstein", "Monaco", "Montenegro", "North Macedonia", "Norway", "San Marino", "Switzerland", "United Kingdom"
                        ].map(c => <li key={c} className="flex items-center gap-2">✓ {c}</li>)}
                    </ul>
                </div>

                {/* Americas */}
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-soft hover:shadow-lg transition-all h-fit">
                    <h4 className="font-bold text-royal-900 mb-6 border-b border-royal-100 pb-3 flex items-center gap-2">🌎 AMERICAS</h4>
                    <ul className="space-y-2 text-slate-600 font-medium">
                        <li className="flex items-center gap-2">✓ Canada</li>
                        <li className="flex items-center gap-2">✓ United States</li>
                    </ul>
                </div>

                {/* Asia Pacific */}
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-soft hover:shadow-lg transition-all h-fit">
                    <h4 className="font-bold text-royal-900 mb-6 border-b border-royal-100 pb-3 flex items-center gap-2">🌏 ASIA-PACIFIC & OTHERS</h4>
                    <ul className="space-y-2 text-slate-600 font-medium">
                        <li className="flex items-center gap-2">✓ Australia</li>
                        <li className="flex items-center gap-2">✓ Japan</li>
                        <li className="flex items-center gap-2">✓ New Zealand</li>
                        <li className="flex items-center gap-2">✓ Singapore</li>
                        <li className="flex items-center gap-2">✓ South Korea</li>
                        <li className="flex items-center gap-2">✓ Taiwan (China)</li>
                        <li className="mt-6 italic text-slate-400 text-xs">And others (check with your consulate)</li>
                    </ul>
                </div>

             </div>
             <p className="text-center text-xs text-slate-400 mt-6 max-w-3xl mx-auto leading-relaxed">
                 IMPORTANT NOTE: The list of eligible countries is determined by Russian authorities (Decree No. 702) and coincides with the list of foreign states implementing unfriendly policies. This list may change. Eligibility must always be confirmed with your nearest Russian consulate.
             </p>
             <div className="text-center mt-4">
                 <button 
                   onClick={onOpenModal}
                   className="text-royal-600 font-bold text-xs uppercase border-b-2 border-royal-200 hover:border-royal-600 transition-all pb-1 hover:text-royal-800 tracking-wider"
                 >
                   Ask Us About Your Country
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
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 uppercase tracking-tight">START YOUR TRANSFORMATION TODAY</h2>
                    <p className="mt-6 text-slate-600 max-w-2xl mx-auto text-lg font-light">Small investment, life-changing return.</p>
                </div>

                <div className="max-w-4xl mx-auto mb-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-royal-50 border border-royal-100 rounded-2xl px-6 py-4 shadow-soft">
                        <div className="text-sm md:text-base text-royal-900 font-semibold">Not sure where to start? Talk to a specialist first—your consultation is free.</div>
                        <button 
                          onClick={onOpenModal}
                          className="px-6 py-3 bg-royal-900 text-white rounded-full font-bold text-sm uppercase tracking-wide hover:bg-royal-800 transition-all shadow-md hover:-translate-y-0.5"
                        >
                            Schedule Free Consultation
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
                    {/* Main Offer */}
                    <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-2xl shadow-royal-900/10 border-2 border-royal-600 overflow-hidden relative transform md:-translate-y-4">
                        <div className="absolute top-0 right-0 bg-gradient-to-l from-royal-600 to-royal-500 text-white text-xs font-bold px-6 py-2 rounded-bl-2xl uppercase tracking-widest shadow-md">MOST POPULAR</div>
                        <div className="p-10 md:p-12">
                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-20 h-20 bg-royal-50 text-royal-700 rounded-2xl flex items-center justify-center shrink-0 border border-royal-100">
                                    <BookOpenIcon />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-serif font-bold text-slate-900">SHARED VALUES VISA GUIDE</h3>
                                    <p className="text-slate-600 mt-1 font-light text-lg">Complete step-by-step handbook for applying to Russian residency.</p>
                                </div>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-10 mb-10">
                                <div>
                                    <h4 className="font-bold text-xs text-royal-900 uppercase tracking-widest mb-6 border-b border-royal-100 pb-2">What's Included:</h4>
                                    <ul className="space-y-4 text-sm text-slate-700">
                                        {[
                                            "Step-by-step handbook (PDF)",
                                            "Downloadable checklists (documents, visa, TRP)",
                                            "Sample letters and forms (ready to use)",
                                            "Country-specific instructions",
                                            "Video tutorials",
                                            "Consulate database (contact info)",
                                            "Translator/lawyer directory",
                                            "Housing resources and marketplace",
                                            "Email support (priority)",
                                            "LIFETIME updates (FREE)"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <span className="text-green-500 font-bold bg-green-50 rounded-full p-0.5 mt-0.5 text-xs">✓</span> <span className="leading-snug">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-gradient-to-b from-royal-50 to-white p-8 rounded-3xl border border-royal-100 flex flex-col justify-center text-center shadow-inner">
                                    <div className="text-slate-400 text-sm font-semibold mb-2 line-through">Consultant Fee: $500+</div>
                                    <div className="text-6xl font-serif font-bold text-royal-900 mb-2">$99</div>
                                    <div className="text-green-700 font-bold text-xs mb-8 bg-green-100 py-1.5 px-4 rounded-full mx-auto w-fit border border-green-200 uppercase tracking-wide">YOU SAVE 80%+</div>
                                    
                                    <a href="https://movetorussia.com/get-access/" className="w-full py-5 bg-royal-700 text-white font-bold rounded-xl hover:bg-royal-800 transition-all shadow-lg hover:shadow-royal-700/30 flex items-center justify-center gap-3 uppercase tracking-wider text-sm mb-4 transform hover:-translate-y-1">
                                        Buy Now - Instant Access
                                    </a>
                                </div>
                            </div>

                            <div className="bg-gold-50/50 rounded-2xl p-6 border border-gold-200 mb-8">
                                <h4 className="font-bold text-gold-800 text-sm mb-4 uppercase tracking-wide flex items-center gap-2">🎁 Bonus Offers (Included Free):</h4>
                                <div className="grid sm:grid-cols-2 gap-3 text-sm text-slate-700">
                                    <div className="flex items-center gap-2"><span className="text-gold-500 font-bold">+</span> Budget Planning Template</div>
                                    <div className="flex items-center gap-2"><span className="text-gold-500 font-bold">+</span> Email Template Library</div>
                                    <div className="flex items-center gap-2"><span className="text-gold-500 font-bold">+</span> Housing Marketplace Access</div>
                                    <div className="flex items-center gap-2"><span className="text-gold-500 font-bold">+</span> 3-month Priority Support</div>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 pt-6 border-t border-slate-100">
                                <div className="flex items-center gap-2 font-medium">
                                    <ShieldCheckIcon /> 
                                    <span>30-Day Money-Back Guarantee. No questions asked.</span>
                                </div>
                                <div className="flex items-center gap-4 opacity-70 font-serif font-bold tracking-widest">
                                    <span>VISA</span><span>MASTERCARD</span><span>PAYPAL</span><span>CRYPTO</span>
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
                                    <ClockIcon /> Limited Time Offer
                                </div>
                                <h3 className="text-2xl font-serif font-bold mb-3">Special Pricing</h3>
                                <p className="text-blue-200 text-sm mb-6 font-light">Reduced pricing available until December 31, 2025.</p>
                                <div className="text-xs space-y-2 text-blue-300 border-t border-white/10 pt-4">
                                    <p className="uppercase tracking-widest font-bold text-[10px]">Why act now?</p>
                                    <ul className="list-disc pl-4 space-y-1">
                                        <li>Fees may change</li>
                                        <li>Avoid processing delays</li>
                                    </ul>
                                </div>
                             </div>
                        </div>

                        <div className="bg-white rounded-[2rem] shadow-soft border border-slate-100 p-8 hover:shadow-lg transition-all">
                            <h3 className="font-serif font-bold text-slate-900 flex items-center gap-3 mb-6 text-lg">
                                <div className="p-2 bg-royal-50 rounded-lg text-royal-600"><BriefcaseIcon /></div>
                                Premium Consulting
                            </h3>
                            <div className="mb-4 text-xs font-semibold text-royal-700 bg-royal-50 border border-royal-100 rounded-full px-3 py-1 w-fit">Start with a free consultation</div>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <strong className="text-sm text-slate-800">One-on-One Consultation</strong>
                                        <span className="font-bold text-royal-800 font-serif">$199</span>
                                    </div>
                                    <p className="text-xs text-slate-500">60-min video call. Document review. Personalized guidance.</p>
                                </div>
                                <div className="border-t border-slate-100 pt-4">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <strong className="text-sm text-slate-800">Document Preparation</strong>
                                        <span className="font-bold text-royal-800 font-serif">$500</span>
                                    </div>
                                    <p className="text-xs text-slate-500">Professional prep, translation coordination, apostille help.</p>
                                </div>
                                <div className="border-t border-slate-100 pt-4">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <strong className="text-sm text-slate-800">Full Management</strong>
                                        <span className="font-bold text-royal-800 font-serif">$2k+</span>
                                    </div>
                                    <p className="text-xs text-slate-500">Complete process handling. We do everything for you.</p>
                                </div>
                                <button 
                                  onClick={onOpenModal}
                                  className="w-full py-4 bg-royal-900 text-white font-bold rounded-xl hover:bg-royal-800 transition-all shadow-md hover:-translate-y-0.5 text-sm uppercase tracking-wide"
                                >
                                    Schedule Free Consultation
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
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6">Key Requirements</h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">The Shared Values Visa simplifies the process, but you still need to prepare.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
            { icon: <GlobeIcon />, title: "Eligible Citizenship", text: "Citizen of one of the 47 listed countries." },
            { icon: <FileTextIcon />, title: "Valid Passport", text: "Must have at least 6 months validity remaining." },
            { icon: <ShieldCheckIcon />, title: "No Criminal Record", text: "Clean police record from your home country." },
            { icon: <HeartIcon />, title: "Medical Certificate", text: "Standard health checks (HIV, etc)." },
            { icon: <UsersIcon />, title: "Family Members", text: "Spouse and children can be included." },
            { icon: <ActivityIcon />, title: "Financial Proof", text: "Proof of funds to support yourself initially." }
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
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-white">Life in Russia</h2>
              <p className="text-blue-200 max-w-2xl mx-auto text-lg">Discover the advantages that await you.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                  { title: "Traditional Values", desc: "A society that respects faith, family, and tradition." },
                  { title: "High Safety", desc: "Clean streets, low crime, and safe neighborhoods for kids." },
                  { title: "World-Class Culture", desc: "Museums, theaters, ballet, and history at every turn." },
                  { title: "Affordable Living", desc: "Lower cost of energy, food, and housing compared to the West." }
              ].map((item, i) => (
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
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-12 text-center">See Your Future</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 h-96 md:h-[600px]">
                <div className="col-span-2 md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group">
                    <img src={MOSCOW_2_IMAGE} alt="Moscow Red Square" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                        <span className="text-white font-bold text-lg">Moscow</span>
                    </div>
                </div>
                <div className="relative rounded-3xl overflow-hidden group">
                     <img src={SPB_IMAGE} alt="St Petersburg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                        <span className="text-white font-bold text-sm">St. Petersburg</span>
                    </div>
                </div>
                <div className="relative rounded-3xl overflow-hidden group">
                    <img src={NATURE_IMAGE} alt="Nature" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                        <span className="text-white font-bold text-sm">Nature</span>
                    </div>
                </div>
                <div className="col-span-2 relative rounded-3xl overflow-hidden group">
                    <img src={CHURCH_IMAGE} alt="Orthodox Church" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                        <span className="text-white font-bold text-sm">Spiritual Heritage</span>
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
                     <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-4">
                    {FAQS_LIST.map((item, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                            <button 
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                            >
                                <span className="font-bold text-slate-900 text-lg pr-8">{item.q}</span>
                                <span className="text-royal-600">
                                    {openIndex === i ? <MinusIcon /> : <PlusIcon />}
                                </span>
                            </button>
                            {openIndex === i && (
                                <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100">
                                    {item.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ComparisonSection = () => (
     <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-12 text-center">Cost of Living Comparison</h2>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b-2 border-slate-100">
                            <th className="p-4 text-slate-400 font-medium uppercase text-xs tracking-wider">Item</th>
                            <th className="p-4 font-bold text-royal-900 text-lg">Russia (Avg)</th>
                            <th className="p-4 font-bold text-slate-500 text-lg">USA/Europe (Avg)</th>
                            <th className="p-4 font-bold text-green-600 text-lg">Savings</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-700">
                         {[
                             { item: "Rent (1-bedroom city center)", ru: "$400 - $800", west: "$1,500 - $2,500", save: "60-80%" },
                             { item: "Utilities (Monthly)", ru: "$50 - $100", west: "$200 - $400", save: "75%" },
                             { item: "Public Transport Pass", ru: "$25", west: "$100+", save: "75%" },
                             { item: "Internet (High Speed)", ru: "$5 - $10", west: "$50 - $80", save: "85%" },
                             { item: "Restaurant Meal (for 2)", ru: "$30", west: "$80 - $100", save: "60%" }
                         ].map((row, i) => (
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
            <p className="text-center text-xs text-slate-400 mt-6">*Estimates based on 2024-2025 data. Exchange rates vary.</p>
        </div>
     </section>
);

const FinalCTASection = ({ onOpenModal }: { onOpenModal: () => void }) => (
    <section className="py-32 bg-royal-900 text-white relative overflow-hidden text-center">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
         <div className="max-w-4xl mx-auto px-4 relative z-10">
             <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">Ready to Start Your New Life?</h2>
             <p className="text-blue-200 text-xl mb-12 max-w-2xl mx-auto">Don't let another year pass wishing for a better future. The Shared Values Visa is your open door.</p>
             <div className="flex flex-col sm:flex-row justify-center gap-6">
                 <button onClick={onOpenModal} className="px-10 py-5 bg-white text-royal-900 font-bold rounded-full hover:bg-slate-100 transition-all shadow-xl hover:-translate-y-1 text-lg border border-white">
                     Schedule Free Consultation
                 </button>
                 <a href="https://movetorussia.com/get-access/" className="px-10 py-5 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-royal-900 transition-all hover:-translate-y-1 text-lg">
                     Get The Guide
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
                    <div className="w-8 h-8 bg-royal-700 rounded flex items-center justify-center text-gold-400">SV</div>
                    Shared Values
                 </div>
                 <p className="text-sm leading-relaxed mb-6">Helping families and individuals find stability and tradition in Russia through the Shared Values Visa program.</p>
            </div>
            
            <div>
                <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Navigation</h4>
                <ul className="space-y-3 text-sm">
                    <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                    <li><a href="#eligibility" className="hover:text-white transition-colors">Check Eligibility</a></li>
                    <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                    <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Contact</h4>
                <ul className="space-y-3 text-sm">
                    <li>support@sharedvaluesvisa.com</li>
                    <li>Moscow, Russia</li>
                    <li className="pt-4">
                        <a href="https://movetorussia.com/get-access/" className="inline-block px-4 py-2 bg-royal-800 text-white rounded-lg hover:bg-royal-700 transition-colors text-xs font-bold uppercase tracking-wide">
                            Get Official Guide
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} Shared Values Visa Assistance. All rights reserved. Not a government agency.</p>
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
