import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";

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

// --- Landing Page Sections ---

const Navbar = () => (
  <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-sm transition-all duration-300 supports-[backdrop-filter]:bg-white/60">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-20 items-center">
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 bg-royal-900 rounded-lg flex items-center justify-center text-gold-400 font-serif font-bold text-lg shadow-lg shadow-royal-900/20 group-hover:scale-105 transition-transform">SV</div>
          <div className="flex flex-col">
              <span className="font-serif font-bold text-slate-900 tracking-tight leading-none text-lg">Shared Values Visa</span>
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Official Pathway</span>
          </div>
        </div>
        <div className="hidden md:flex space-x-10 text-sm font-semibold text-slate-600">
          <a href="#" className="hover:text-royal-800 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-royal-800 after:transition-all hover:after:w-full">Mission</a>
          <a href="#" className="hover:text-royal-800 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-royal-800 after:transition-all hover:after:w-full">Trust</a>
          <a href="#" className="hover:text-royal-800 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-royal-800 after:transition-all hover:after:w-full">Eligibility</a>
          <a href="#" className="hover:text-royal-800 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-royal-800 after:transition-all hover:after:w-full">FAQ</a>
        </div>
        <button className="bg-royal-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-royal-800 transition-all shadow-lg hover:shadow-royal-900/30 hover:-translate-y-0.5 border border-transparent hover:border-royal-700">
          Portal Login
        </button>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative pt-24 pb-40 overflow-hidden bg-slate-50 min-h-[90vh] flex flex-col justify-center">
    {/* Photo Background with Overlay */}
    <div className="absolute inset-0 z-0">
        <img 
            src="https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&q=80&w=2500" 
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
        <button className="px-10 py-4 bg-royal-900 text-white rounded-full font-bold hover:bg-royal-800 transition-all flex items-center justify-center gap-3 shadow-xl shadow-royal-900/20 hover:shadow-royal-900/30 hover:-translate-y-1 text-sm md:text-base tracking-wide group">
          Get Your Visa Guide Now
          <span className="group-hover:translate-x-1 transition-transform"><ArrowRightIcon /></span>
        </button>
        <button className="px-10 py-4 bg-white text-royal-900 border border-slate-200 rounded-full font-bold hover:bg-slate-50 transition-all shadow-md hover:shadow-lg hover:-translate-y-1 text-sm md:text-base">
          Schedule Free Consultation
        </button>
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
               <span>Average timeline: 5.2 months</span>
             </span>
         </div>
      </div>
    </div>
  </section>
);

const TrustSection = () => (
  <section className="py-24 bg-white relative z-20 -mt-10 rounded-t-[40px] shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.05)]">
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
            <a href="#" className="text-royal-700 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all mt-auto group-hover:text-royal-900">
              Learn more <span className="transition-transform"><SmallArrowIcon /></span>
            </a>
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
            <a href="#" className="text-royal-700 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all mt-auto group-hover:text-royal-900">
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
            <a href="#" className="text-royal-700 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all mt-auto group-hover:text-royal-900">
              Meet our team <span className="transition-transform"><SmallArrowIcon /></span>
            </a>
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
            <a href="#" className="text-royal-700 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all mt-auto group-hover:text-royal-900">
              View pricing <span className="transition-transform"><SmallArrowIcon /></span>
            </a>
         </div>
      </div>
    </div>
  </section>
);

const ProblemSection = () => {
  const [email, setEmail] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setQuizStarted(true);
    }
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
             <div className="bg-royal-900 rounded-[2rem] p-10 shadow-2xl shadow-royal-900/40 text-white relative overflow-hidden border border-royal-800">
                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-overlay filter blur-[80px] opacity-40 animate-pulse"></div>
                <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-purple-600 rounded-full mix-blend-overlay filter blur-[80px] opacity-40"></div>

                <div className="relative z-10">
                  <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full text-[10px] font-bold mb-6 uppercase tracking-widest shadow-lg">
                    Interactive Assessment
                  </div>
                  <h3 className="text-3xl font-serif font-bold mb-4 leading-tight">
                    Take our 2-minute Quiz: <br/><span className="text-gold-400">Is Russia Right for You?</span>
                  </h3>
                  
                  {!quizStarted ? (
                    <form onSubmit={handleQuizSubmit} className="space-y-5">
                      <p className="text-blue-100 font-light text-sm">
                        Answer 7 simple questions to receive your personalized eligibility report and relocation roadmap.
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
                        Start Assessment
                        <ArrowRightIcon />
                      </button>
                      
                      <p className="text-[10px] text-blue-300/60 text-center uppercase tracking-wider">
                        Your privacy is protected. No spam.
                      </p>
                    </form>
                  ) : (
                    <div className="text-center py-10 animate-fade-in">
                       <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                         <CheckCircleIcon />
                       </div>
                       <h4 className="text-xl font-serif font-bold mb-2">Profile Initialized</h4>
                       <p className="text-blue-100 mb-8 font-light">
                         We've sent a secure link to <span className="text-white font-semibold">{email}</span>. Click it to begin your assessment.
                       </p>
                       <button 
                         onClick={() => setQuizStarted(false)}
                         className="text-sm text-blue-300 hover:text-white transition-colors underline decoration-blue-300/50 underline-offset-4"
                       >
                         Start over with a different email
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
                <p><span className="font-bold text-slate-900">124 people</span> started the quiz today</p>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const SolutionSection = () => {
  const [activeTab, setActiveTab] = useState('basics');

  const timelineSteps = [
    { title: "Months 1-2: Prepare Documents", desc: "Gather certificates, passport, background check documents.", details: "Time: 2-4 weeks | Cost: $50-200" },
    { title: "Month 2: Apply for Visa", desc: "Fill out form on visa.kdmid.ru & submit at Russian consulate.", details: "Time: 1-2 weeks | Cost: $80-200" },
    { title: "Month 3: Fly to Russia", desc: "Arrive with your visa and register at migration center.", details: "Time: 1-2 weeks | Cost: $900-2,500" },
    { title: "Months 3-4: Apply for TRP", desc: "Submit documents, pass medical exam and provide photos.", details: "Time: 2-4 weeks | Cost: $100-350" },
    { title: "Months 4-6: Wait for Approval", desc: "Process application. You can work during this period. Collect your TRP card.", details: "Processing: ~4.5 months" },
  ];

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
                   <div className="flex flex-col justify-center items-center text-center p-8 bg-slate-50 rounded-3xl border border-slate-100">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-royal-600 shadow-md mb-6"><GlobeIcon /></div>
                      <h4 className="font-serif font-bold text-slate-900 mb-2 text-xl">Who is this for?</h4>
                      <p className="text-slate-600 mb-8 leading-relaxed">Citizens of 47 countries who value traditional principles over neoliberal ideology.</p>
                      <button className="text-royal-700 font-bold text-sm uppercase tracking-wide border-b-2 border-royal-200 hover:border-royal-700 transition-all pb-1 hover:pb-2">Check if your country is on the list</button>
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
            duration: "Weeks 1-8",
            cost: "$50-200",
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
            ),
            cta: []
        },
        {
            title: "Visa Application",
            duration: "Weeks 8-12",
            cost: "$80-200",
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
            ),
            cta: [
                { text: "Find Your Consulate", icon: <ExternalLinkIcon />, primary: false },
                { text: "Book Appointment", icon: <ExternalLinkIcon />, primary: true }
            ]
        },
        {
            title: "Travel to Russia",
            duration: "Within visa validity",
            cost: "$900-2,500",
            icon: <PlaneIcon />,
            content: (
                <div className="space-y-3">
                    <ul className="space-y-3 text-sm text-slate-600">
                         <li className="flex gap-3 items-start bg-slate-50 p-2 rounded"><span className="text-royal-500 font-bold">1.</span> <span><strong>Book accommodation:</strong> Apartment or hotel (needed for registration).</span></li>
                         <li className="flex gap-3 items-start bg-slate-50 p-2 rounded"><span className="text-royal-500 font-bold">2.</span> <span><strong>Book flight:</strong> Moscow or St. Petersburg recommended.</span></li>
                         <li className="flex gap-3 items-start bg-slate-50 p-2 rounded"><span className="text-royal-500 font-bold">3.</span> <span><strong>Arrival Tasks:</strong> Register address, get Russian SIM, open bank account, get medical exam.</span></li>
                    </ul>
                </div>
            ),
            cta: [
                { text: "Book Accommodation", icon: <ExternalLinkIcon />, primary: true },
                { text: "Get Hospital List", icon: <FileTextIcon />, primary: false }
            ]
        },
        {
            title: "TRP Application",
            duration: "Within timeframe",
            cost: "$20 + med exam",
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
            ),
            cta: [
                { text: "Find Migration Center", icon: <ExternalLinkIcon />, primary: false }
            ]
        },
        {
            title: "Wait & Approval",
            duration: "4-5 months",
            cost: "None",
            icon: <CheckCircleIcon />,
            content: (
                 <div className="space-y-3">
                    <p className="text-sm text-slate-500 italic">Processing typically takes 4-4.5 months. You can legally stay and work while waiting.</p>
                    <div className="flex flex-col gap-2 mt-4">
                        <span className="font-bold text-sm text-royal-900">When approved:</span>
                        <div className="bg-gradient-to-r from-green-50 to-green-100 text-green-900 p-4 rounded-xl text-sm font-bold border border-green-200 flex items-center gap-3 shadow-sm">
                            <div className="bg-white rounded-full p-1 text-green-600"><AwardIcon /></div>
                            YOU ARE NOW OFFICIALLY A RESIDENT FOR 3 YEARS!
                        </div>
                    </div>
                </div>
            ),
             cta: [
                { text: "Check Status Online", icon: <ExternalLinkIcon />, primary: true },
                { text: "Schedule Pickup", icon: <ClockIcon />, primary: false }
            ]
        }
    ];

    return (
        <section className="py-32 bg-white relative overflow-hidden">
             {/* Background Element */}
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#f0f4fa_1px,transparent_1px),linear-gradient(to_bottom,#f0f4fa_1px,transparent_1px)] bg-[size:4rem_4rem] -z-10 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
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
                        <div key={index} className={`relative mb-24 last:mb-0 group`}>
                            
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
                                        
                                        <div className="mb-8 leading-relaxed">
                                            {step.content}
                                        </div>

                                        <div className="flex flex-wrap gap-3">
                                            {step.cta.map((btn, i) => (
                                                <button key={i} className={`px-5 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all ${
                                                    btn.primary 
                                                    ? 'bg-royal-900 text-white hover:bg-royal-800 shadow-lg shadow-royal-900/10 hover:shadow-royal-900/20' 
                                                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                                                }`}>
                                                    {btn.text}
                                                    {btn.icon}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Summary Footer */}
                <div className="mt-24 text-center bg-royal-900 rounded-[2.5rem] p-12 text-white shadow-2xl relative overflow-hidden border-4 border-white/10">
                     <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500 rounded-full mix-blend-overlay filter blur-[100px] opacity-30 animate-pulse"></div>
                     <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-8 uppercase tracking-[0.2em] text-gold-400">Total Summary</h3>
                        <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-24">
                            <div className="text-center">
                                <div className="text-blue-200 text-xs uppercase font-bold mb-2 tracking-wider">Total Timeline</div>
                                <div className="text-5xl md:text-6xl font-serif font-bold tracking-tight">~6 <span className="text-3xl">Months</span></div>
                            </div>
                            <div className="hidden md:block w-px bg-white/10"></div>
                             <div className="text-center">
                                <div className="text-blue-200 text-xs uppercase font-bold mb-2 tracking-wider">Total Estimated Cost</div>
                                <div className="text-5xl md:text-6xl font-serif font-bold text-green-400">$1,150+</div>
                                <div className="text-xs text-blue-300 mt-3 font-light">*Varies by country & lifestyle choices</div>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </section>
    );
};

const RequirementsSection = () => {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200" id="requirements">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 uppercase tracking-tight">Complete Document Requirements & Checklist</h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto font-light text-lg">Preparation is key. Ensure you have every document ready to avoid delays.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Passport Card */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 hover:shadow-lg transition-all">
                <div className="flex items-center gap-5 mb-8">
                    <div className="w-14 h-14 bg-royal-50 text-royal-600 rounded-2xl flex items-center justify-center shadow-sm">
                        <FileTextIcon />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-slate-900">Passport Requirements</h3>
                </div>
                <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                        <div className="mt-1 text-green-500 bg-green-50 rounded-full p-0.5"><CheckCircleIcon /></div>
                        <div>
                            <span className="font-bold text-slate-900 text-lg">Valid for minimum 4 years</span>
                            <p className="text-sm text-slate-600 mt-1 leading-relaxed">Check expiration carefully. If expiring sooner, renew first. Renewal cost: $130-160.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="mt-1 text-green-500 bg-green-50 rounded-full p-0.5"><CheckCircleIcon /></div>
                        <div>
                            <span className="font-bold text-slate-900 text-lg">Minimum 5 blank pages</span>
                            <p className="text-sm text-slate-600 mt-1 leading-relaxed">Needed for visas and stamps. Not enough pages—renew your passport.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="mt-1 text-green-500 bg-green-50 rounded-full p-0.5"><CheckCircleIcon /></div>
                        <div>
                            <span className="font-bold text-slate-900 text-lg">No damage or marks</span>
                            <p className="text-sm text-slate-600 mt-1 leading-relaxed">Passport should be in good condition.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4 pt-2 border-t border-slate-100 mt-2">
                         <div className="mt-1 text-royal-500"><ClockIcon /></div>
                         <div className="text-xs font-bold text-royal-700 bg-royal-50 px-3 py-1.5 rounded-full uppercase tracking-wide">
                            Renewal Timeline: 2-8 weeks
                         </div>
                    </li>
                </ul>
            </div>

            {/* Criminal Background Card - Highlighted */}
            <div className="bg-gold-50/50 p-10 rounded-3xl shadow-lg border-2 border-gold-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-gold-400 text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-widest shadow-md">CRITICAL DOCUMENT</div>
                <div className="flex items-center gap-5 mb-8">
                    <div className="w-14 h-14 bg-gold-100 text-gold-700 rounded-2xl flex items-center justify-center shadow-sm">
                        <ShieldCheckIcon />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-slate-900">Criminal Background Check</h3>
                </div>
                <div className="mb-8 bg-white p-5 rounded-xl border border-gold-200 text-sm text-amber-900 font-bold flex items-start gap-3 shadow-sm">
                    <div className="mt-0.5"><AlertTriangleIcon /></div>
                    <span className="leading-relaxed">MUST have an apostille (NOT just a notary seal). Must be current (&lt;3 months).</span>
                </div>
                
                <div className="space-y-6 text-sm">
                    {/* Country specific details condensed */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-white p-5 rounded-xl border border-gold-100 shadow-sm hover:border-gold-300 transition-colors">
                            <strong className="block text-slate-900 mb-2 flex items-center gap-2">🇺🇸 United States</strong>
                            <p className="text-slate-600 leading-snug">FBI National Crime Check ($18). Apostille from State Dept. 8-12 weeks.</p>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-gold-100 shadow-sm hover:border-gold-300 transition-colors">
                            <strong className="block text-slate-900 mb-2 flex items-center gap-2">🇬🇧 United Kingdom</strong>
                            <p className="text-slate-600 leading-snug">ACRO Certificate (£13). NOT DBS. Apostille from Crown Court. 4-6 weeks.</p>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-gold-100 shadow-sm hover:border-gold-300 transition-colors">
                            <strong className="block text-slate-900 mb-2 flex items-center gap-2">🇨🇦 Canada</strong>
                            <p className="text-slate-600 leading-snug">Certified Criminal Record Check. Apostille from Ministry of Attorney General.</p>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-gold-100 shadow-sm hover:border-gold-300 transition-colors">
                            <strong className="block text-slate-900 mb-2 flex items-center gap-2">🇪🇺 EU</strong>
                            <p className="text-slate-600 leading-snug">Local police department. Apostille at local court. 2-6 weeks.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* 3 Column Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Family */}
            <div className="bg-white p-8 rounded-3xl shadow-soft border border-slate-100 hover:shadow-lg transition-all">
                <div className="flex items-center gap-4 mb-6">
                     <div className="p-3 bg-royal-50 text-royal-600 rounded-xl"><UsersIcon /></div>
                     <h3 className="font-serif font-bold text-slate-900 text-lg">Family Documents</h3>
                </div>
                <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                    <p><strong className="text-slate-900">Married:</strong> Marriage certificate (original + copy) + Apostille. Name must match passport EXACTLY.</p>
                    <p><strong className="text-slate-900">Divorced:</strong> Divorce decree (original + copy) + Apostille + Original Marriage Cert.</p>
                    <p><strong className="text-slate-900">Children:</strong> Birth certificates (original + copy) + Apostille. In Russian language (certified translation).</p>
                </div>
            </div>

            {/* Medical */}
            <div className="bg-white p-8 rounded-3xl shadow-soft border border-slate-100 hover:shadow-lg transition-all">
                <div className="flex items-center gap-4 mb-6">
                     <div className="p-3 bg-royal-50 text-royal-600 rounded-xl"><ActivityIcon /></div>
                     <h3 className="font-serif font-bold text-slate-900 text-lg">Medical Docs</h3>
                </div>
                 <div className="space-y-5 text-sm text-slate-600 leading-relaxed">
                    <div>
                        <strong className="block text-slate-900 text-[10px] uppercase tracking-widest mb-2 bg-slate-100 w-fit px-2 py-1 rounded">Before Visa Application</strong>
                        <p>Medical insurance ($30,000+ coverage) valid in Russia during visa period.</p>
                    </div>
                    <div>
                        <strong className="block text-slate-900 text-[10px] uppercase tracking-widest mb-2 bg-slate-100 w-fit px-2 py-1 rounded">After Arrival (Before TRP)</strong>
                        <p>Full medical examination (X-ray, blood tests, urinalysis, physical) at state or private clinics in Russia ($160-320).</p>
                    </div>
                </div>
            </div>

            {/* Photos */}
            <div className="bg-white p-8 rounded-3xl shadow-soft border border-slate-100 hover:shadow-lg transition-all">
                <div className="flex items-center gap-4 mb-6">
                     <div className="p-3 bg-royal-50 text-royal-600 rounded-xl"><CameraIcon /></div>
                     <h3 className="font-serif font-bold text-slate-900 text-lg">Photographs</h3>
                </div>
                 <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                    <p><strong>Size:</strong> 3.5 × 4.5 cm (critical requirement)</p>
                    <p><strong>Specs:</strong> White background, face clearly visible, looking at camera. No sunglasses, hats, or heavy makeup.</p>
                    <p><strong>Color:</strong> Color or black-and-white.</p>
                    <p><strong>Quantity:</strong> 3-4 minimum.</p>
                    <p className="bg-slate-50 p-4 rounded-xl text-xs text-slate-500 italic border border-slate-200 mt-4">Photography studios available in any Russian city (~$5-15).</p>
                </div>
            </div>
        </div>

        {/* Translation Process */}
        <div className="bg-royal-900 rounded-3xl p-10 text-white mb-16 relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600 rounded-full mix-blend-overlay filter blur-[100px] opacity-40"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-overlay filter blur-[100px] opacity-30"></div>
             
             <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                    <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md"><GlobeIcon /></div>
                    <h3 className="text-2xl font-serif font-bold">Translations & Apostilles: How It Works</h3>
                </div>
                
                <div className="grid md:grid-cols-5 gap-6 items-center text-center md:text-left mb-10">
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 h-full flex flex-col justify-center hover:bg-white/10 transition-colors">
                        <div className="text-gold-400 font-bold mb-2 text-xs uppercase tracking-widest">Step 1</div>
                        <div className="font-semibold text-lg">Get Apostille in your country</div>
                    </div>
                    <div className="hidden md:flex justify-center text-white/30"><ArrowRightIcon /></div>
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 h-full flex flex-col justify-center hover:bg-white/10 transition-colors">
                        <div className="text-gold-400 font-bold mb-2 text-xs uppercase tracking-widest">Step 2</div>
                        <div className="font-semibold text-lg">Fly to Russia with originals</div>
                    </div>
                    <div className="hidden md:flex justify-center text-white/30"><ArrowRightIcon /></div>
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 h-full flex flex-col justify-center hover:bg-white/10 transition-colors">
                        <div className="text-gold-400 font-bold mb-2 text-xs uppercase tracking-widest">Step 3</div>
                        <div className="font-semibold text-lg">Get Certified Translation in Russia</div>
                    </div>
                </div>
                
                <div className="bg-red-900/40 border border-red-500/30 p-6 rounded-xl text-sm text-red-100 flex gap-4 items-start backdrop-blur-md">
                    <div className="mt-0.5 text-red-400"><AlertTriangleIcon /></div>
                    <p><strong className="text-white uppercase tracking-wide text-xs block mb-1">Common Mistake:</strong> DO NOT translate documents before coming to Russia. FMIV (Migration) will only accept translations from certified translators registered in Russia with a local stamp. Translations from your home country will be rejected.</p>
                </div>
             </div>
        </div>

        {/* Common Mistakes */}
        <div className="border border-red-100 bg-red-50/50 rounded-[2.5rem] p-10 md:p-14 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-8 flex items-center gap-3 justify-center md:justify-start">
                <span className="text-red-500"><AlertTriangleIcon /></span> 5 Common Mistakes That Cause Rejection
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                 {[
                    { t: "Name Discrepancies", d: "Spelling must match exactly across ALL documents (Passport vs Certs)." },
                    { t: "Apostille vs Notary", d: "Regular notary stamps are NOT accepted. Must be an Official Apostille." },
                    { t: "Wrong Background Check", d: "e.g., UK applicants getting DBS instead of ACRO. Check specific requirements." },
                    { t: "Expired Passport", d: "Must be valid for 4+ years. Renew before applying if needed." },
                    { t: "Old Medical Docs", d: "Exams expire in 30 days. Schedule immediately before TRP submission." }
                 ].map((m, i) => (
                    <div key={i} className="flex gap-4 items-start p-5 bg-white rounded-2xl border border-red-100 shadow-sm hover:shadow-md transition-all">
                        <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">X</div>
                        <div>
                            <strong className="block text-slate-900 text-base mb-2">{m.t}</strong>
                            <span className="text-slate-600 text-sm leading-relaxed">{m.d}</span>
                        </div>
                    </div>
                 ))}
            </div>
        </div>

      </div>
    </section>
  );
};

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <ActivityIcon />,
      title: "No Migration Quota Required",
      why: "Russia has a strict annual quota (10.5k/year). People wait years.",
      result: "SVV completely bypasses this. No queue. No competition."
    },
    {
      icon: <BookOpenIcon />,
      title: "No Language Exam (Initially)",
      why: "Traditional residency requires passing history, law, and language exams.",
      result: "Exempt for the first 3 years. Start life without exam stress."
    },
    {
      icon: <BriefcaseIcon />,
      title: "Immediate Work & Business Rights",
      why: "Typically, foreigners need complex permits to work legally.",
      result: "Work as an employee, freelancer, or start a business immediately."
    },
    {
      icon: <UsersIcon />,
      title: "Family Reunification Included",
      why: "Moving alone is hard. You want your family with you.",
      result: "Spouse, children, and stepchildren get full rights and benefits."
    },
    {
      icon: <ClockIcon />,
      title: "Path to Permanent Residency",
      why: "TRP is just a stepping stone, not the final destination.",
      result: "Apply for permanent residency after 3 years. Path to citizenship."
    },
    {
      icon: <HeartIcon />,
      title: "Access to Healthcare & Education",
      why: "You need to know your family is safe and cared for.",
      result: "Access to state healthcare, schools, and universities."
    }
  ];

  return (
    <section className="py-32 bg-white">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight">6 Major Benefits of the Shared Values Visa</h2>
            <div className="w-24 h-1 bg-royal-200 mx-auto mt-6 rounded-full"></div>
            <p className="mt-6 text-slate-600 max-w-2xl mx-auto text-lg font-light">Designed specifically to make your transition as smooth as possible.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {benefits.map((benefit, idx) => (
               <div key={idx} className="bg-white rounded-[2rem] border border-slate-100 p-0 shadow-soft hover:shadow-2xl hover:shadow-royal-900/10 transition-all duration-300 hover:-translate-y-2 group flex flex-col h-full overflow-hidden">
                  <div className="p-10 pb-6 flex-1">
                     <div className="w-16 h-16 bg-royal-50 text-royal-700 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-royal-600 group-hover:text-white transition-colors duration-300 shadow-sm group-hover:shadow-md group-hover:scale-110 transform">
                        {benefit.icon}
                     </div>
                     <h3 className="font-serif font-bold text-xl text-slate-900 mb-4 group-hover:text-royal-800 transition-colors">{benefit.title}</h3>
                     <p className="text-slate-600 text-sm leading-relaxed mb-6">
                       <span className="font-bold text-slate-900 uppercase text-xs tracking-wide block mb-2">Why it matters:</span> {benefit.why}
                     </p>
                  </div>
                  <div className="bg-slate-50 p-8 border-t border-slate-100 mt-auto group-hover:bg-royal-50/50 transition-colors">
                     <p className="text-sm font-bold text-royal-800 flex items-start gap-3">
                       <span className="mt-0.5 text-green-500"><CheckCircleIcon /></span>
                       {benefit.result}
                     </p>
                  </div>
               </div>
             ))}
          </div>
       </div>
    </section>
  );
};

const TestimonialsSection = () => {
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
    <section className="py-32 bg-slate-50 relative overflow-hidden" id="testimonials">
      {/* Background decoration with Photo */}
      <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1512495039889-52a3b799c9bc?q=80&w=2838&auto=format&fit=crop" 
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
                   <button className="text-gold-400 font-bold text-sm uppercase flex items-center gap-2 hover:text-white transition-colors tracking-widest border-b border-transparent hover:border-white pb-1 w-fit">
                      View Detailed Statistics <ArrowRightIcon />
                   </button>
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
                   <button className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl shadow-lg hover:bg-blue-50 transition-colors flex items-center justify-center w-fit uppercase tracking-wide text-sm transform hover:-translate-y-1">
                      Submit Your Story
                   </button>
                </div>
             </div>
         </div>
      </div>
    </section>
  );
};

// --- Refactored Eligibility & New Sections ---

const FaqSection = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqData = [
        {
        q: "How many countries are eligible?",
        a: <>
            <p>The list of eligible countries is significant and includes most EU nations, USA, Canada, Australia, Japan, New Zealand, South Korea, and others.</p>
            <p className="mt-2">The exact list is determined by Russian authorities and subject to change. Always confirm your country's current eligibility with your nearest Russian consulate or official sources.</p>
            <p className="mt-2 font-bold text-royal-700">[CHECK CONSULATE WEBSITE FOR CURRENT LIST]</p>
        </>
        },
        {
        q: "What if my country isn't currently eligible?",
        a: <>
            <p>Requirements may change. We recommend:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Contact your nearest Russian consulate for official information</li>
                <li>Subscribe for updates</li>
                <li>Follow official government announcements</li>
            </ul>
            <p className="mt-2">Your country could be added in the future.</p>
        </>
        },
        {
        q: "How long does the entire process take?",
        a: <>
            <p>Typically approximately 6 months from start to approval:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Document preparation: 2-4 weeks</li>
                <li>Visa application: 1-2 weeks</li>
                <li>Visa processing: Varies by consulate</li>
                <li>Travel to Russia: 1-2 weeks</li>
                <li>TRP application: 2-4 weeks</li>
                <li>TRP processing: Typically up to 4-4.5 months</li>
            </ul>
            <p className="mt-2 font-bold text-royal-700">Important: Timelines can vary based on individual circumstances, consulate workload, and completeness of documentation.</p>
        </>
        },
        {
        q: "Can I bring my family with me?",
        a: <>
            <p>Yes! Your spouse and children can apply for TRP through the same pathway.</p>
            <p className="mt-2">Each family member receives:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Their own entry visa</li>
                <li>Their own 3-year TRP</li>
                <li>The same work rights and privileges</li>
            </ul>
            <p className="mt-2">Children automatically get access to schools and healthcare.</p>
        </>
        },
        {
        q: "Do I need to speak Russian?",
        a: <>
            <p>No, not required for the initial TRP application!</p>
            <p className="mt-2">This is one of the major advantages—you do NOT need to pass the Russian language exam for your first TRP.</p>
            <p className="mt-2">What's recommended:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Start learning basic Russian BEFORE you arrive</li>
                <li>Continue studying in Russia (very affordable!)</li>
                <li>You have 3 years before language is needed for permanent residency</li>
            </ul>
            <p className="mt-2">Russian is manageable to learn with motivation and available resources.</p>
        </>
        },
        {
        q: "How much does everything cost?",
        a: <>
            <p>Approximate cost breakdown:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Documents and apostilles: $50-200</li>
                <li>Consular visa fee: $80-200</li>
                <li>Flight to Russia: $900-2,500</li>
                <li>Accommodation (initial stay): $200-500</li>
                <li>Medical exam: $160-320</li>
                <li>Document translations: $50-150</li>
                <li>State fee (TRP): $20</li>
                <li>Miscellaneous: $100-250</li>
            </ul>
            <p className="mt-2 font-bold text-royal-700">TOTAL: $1,560-4,140 (approximate)</p>
            <p className="mt-1">Plus our guide: $99 (one-time, lifetime access with updates)</p>
            <p className="mt-1">For complex cases, consulting services available.</p>
            <p className="mt-2 text-xs italic">Note: Actual costs vary by country of residence, personal circumstances, and choices made.</p>
        </>
        },
        {
        q: "What's your approval rate?",
        a: <>
            <p>High approval rates occur when documentation is complete and correct.</p>
            <p className="mt-2">Common reasons for complications:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Incomplete documents</li>
                <li>Name mismatches across documents</li>
                <li>Medical examination issues</li>
                <li>Issues with background checks</li>
            </ul>
            <p className="mt-2">Our guide helps prevent most common documentation mistakes.</p>
        </>
        },
        {
        q: "Can I work in Russia with TRP?",
        a: <>
            <p>Yes! This is a major advantage.</p>
            <p className="mt-2">You can:</p>
            <ul className="list-none mt-2 space-y-1">
                <li>✓ Work as an employee (no extra work permits needed)</li>
                <li>✓ Start a business (as individual entrepreneur/IP)</li>
                <li>✓ Freelance (remote work for international clients)</li>
                <li>✓ Hire employees</li>
                <li>✓ Transfer income (within legal limits)</li>
            </ul>
            <p className="mt-2">No additional permits or labor contracts with migration required (beyond standard employment requirements).</p>
        </>
        },
        {
        q: "What happens after 3 years of TRP?",
        a: <>
            <p>You have several options:</p>
            <div className="mt-3 space-y-3">
                <div>
                    <strong className="block text-slate-800">Option 1: Apply for permanent residency</strong>
                    <ul className="list-disc pl-5 text-xs text-slate-500 mt-1">
                    <li>Extended duration</li>
                    <li>Pathway to citizenship</li>
                    <li>More rights than TRP</li>
                    </ul>
                </div>
                <div>
                    <strong className="block text-slate-800">Option 2: Renew TRP for another 3 years</strong>
                    <ul className="list-disc pl-5 text-xs text-slate-500 mt-1">
                    <li>Standard process available</li>
                    <li>Stay in Russia another 3 years</li>
                    </ul>
                </div>
                <div>
                    <strong className="block text-slate-800">Option 3: Apply for citizenship</strong>
                    <ul className="list-disc pl-5 text-xs text-slate-500 mt-1">
                    <li>Typically requires meeting residency requirements</li>
                    <li>Full rights of Russian citizen</li>
                    </ul>
                </div>
            </div>
            <p className="mt-3">Consult with local authorities about specific requirements and timelines for your situation.</p>
        </>
        },
        {
        q: "Is this related to politics?",
        a: <>
            <p>The decree is designed for individuals who share traditional values and who seek an alternative to their current country.</p>
            <p className="mt-2">Requirements focus on:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Sharing traditional values</li>
                <li>Honest about your motivations</li>
                <li>Meeting documentation requirements</li>
            </ul>
            <p className="mt-2">It does NOT require political activism or involvement in Russia. Simply residency based on shared values and eligibility.</p>
        </>
        },
        {
        q: "Will I lose my original citizenship?",
        a: <>
            <p>No! Obtaining Russian residency does not automatically affect your original citizenship.</p>
            <p className="mt-2">However:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Some countries have specific dual citizenship policies (check yours)</li>
                <li>If you later apply for Russian citizenship, you may face dual citizenship questions</li>
                <li>Consult your home consulate for specific rules</li>
            </ul>
            <p className="mt-2">Russian TRP and permanent residency do NOT require renouncing your original citizenship.</p>
        </>
        },
        {
        q: "What job opportunities are available?",
        a: <>
            <p>Many options for foreign residents:</p>
            <div className="mt-3 space-y-3">
                <div>
                    <div className="flex justify-between items-baseline font-bold text-slate-800">
                        <span>English teaching</span>
                        <span className="text-sm text-green-600">$450-900/month</span>
                    </div>
                    <p className="text-xs text-slate-500">High demand. Schools, private lessons, online. TEFL sometimes required.</p>
                </div>
                <div>
                    <div className="flex justify-between items-baseline font-bold text-slate-800">
                        <span>IT/Programming</span>
                        <span className="text-sm text-green-600">$1,100-3,300+/month</span>
                    </div>
                    <p className="text-xs text-slate-500">Russian companies, startups. Remote for international companies (USD!). Python, JavaScript, Go, etc.</p>
                </div>
                <div>
                    <div className="flex justify-between items-baseline font-bold text-slate-800">
                        <span>Translation & writing</span>
                        <span className="text-sm text-green-600">$650-1,650/month</span>
                    </div>
                    <p className="text-xs text-slate-500">Translation bureaus, Copywriting, English editing.</p>
                </div>
                <div>
                    <div className="flex justify-between items-baseline font-bold text-slate-800">
                        <span>Consulting</span>
                        <span className="text-sm text-green-600">$55-165/hour</span>
                    </div>
                    <p className="text-xs text-slate-500">Business, marketing, finance consulting. Expert services.</p>
                </div>
                <div>
                    <div className="flex justify-between items-baseline font-bold text-slate-800">
                        <span>Remote work</span>
                        <span className="text-sm text-green-600">Paid in home currency</span>
                    </div>
                    <p className="text-xs text-slate-500">Continue with your current employer. Earn strong currency, spend weak rubles. Cost of living 50-70% lower than West.</p>
                </div>
                <div>
                    <div className="flex justify-between items-baseline font-bold text-slate-800">
                        <span>Content creation</span>
                        <span className="text-sm text-green-600">$350-1,100+/month</span>
                    </div>
                    <p className="text-xs text-slate-500">YouTube, blogs, podcasts. Online teaching. Consulting.</p>
                </div>
            </div>
        </>
        },
        {
        q: "What's the monthly cost of living?",
        a: <>
            <p>Depends on city and lifestyle:</p>
            <div className="mt-3 grid sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-3 rounded">
                    <strong className="block text-slate-800 mb-1">Moscow</strong>
                    <ul className="text-xs text-slate-600 space-y-1">
                        <li>1-bed apt: $330-550</li>
                        <li>Groceries: $165-220</li>
                        <li>Transport: $6</li>
                        <li>Entertainment: $110-220</li>
                        <li className="font-bold border-t border-slate-200 pt-1 mt-1">TOTAL: $611-996</li>
                    </ul>
                </div>
                <div className="bg-slate-50 p-3 rounded">
                    <strong className="block text-slate-800 mb-1">St. Petersburg</strong>
                    <ul className="text-xs text-slate-600 space-y-1">
                        <li>1-bed apt: $220-385</li>
                        <li>Groceries: $130-200</li>
                        <li>Transport: $6</li>
                        <li>Entertainment: $90-165</li>
                        <li className="font-bold border-t border-slate-200 pt-1 mt-1">TOTAL: $446-756</li>
                    </ul>
                </div>
                <div className="bg-slate-50 p-3 rounded">
                    <strong className="block text-slate-800 mb-1">Kazan/Novosibirsk</strong>
                    <ul className="text-xs text-slate-600 space-y-1">
                        <li>1-bed apt: $110-220</li>
                        <li>Groceries: $110-165</li>
                        <li>Transport: $4</li>
                        <li>Entertainment: $55-110</li>
                        <li className="font-bold border-t border-slate-200 pt-1 mt-1">TOTAL: $279-499</li>
                    </ul>
                </div>
            </div>
            <p className="mt-3 font-medium">Conclusion: Comfortable living on $650-1,100/month is very achievable, especially with remote work in foreign currency.</p>
        </>
        },
        {
        q: "Is Russia safe for foreigners?",
        a: <>
            <p>Major cities are generally safe:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Moscow:</strong> Urban environment like London or New York</li>
                <li><strong>St. Petersburg:</strong> Safe, international</li>
                <li><strong>Kazan, Yekaterinburg:</strong> Safe and welcoming</li>
            </ul>
            <p className="mt-3 font-bold">Practical tips:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Avoid political disputes/arguments</li>
                <li>Normal urban safety practices apply</li>
                <li>Watch for pickpockets in crowded areas</li>
                <li>Learn basic Russian for communication</li>
                <li>Choose established neighborhoods</li>
            </ul>
            <p className="mt-2">Our guide includes detailed city information and neighborhood recommendations.</p>
        </>
        },
        {
        q: "Can I buy property in Russia?",
        a: <>
            <p>Property ownership depends on your residency status:</p>
            <div className="mt-3 space-y-3">
                <div>
                    <strong className="block text-slate-800">With TRP:</strong>
                    <ul className="list-none mt-1 space-y-1 text-sm">
                    <li>✓ Rent apartments and houses</li>
                    <li>✗ Buy real estate (generally restricted)</li>
                    <li>✗ Own land (generally restricted)</li>
                    </ul>
                </div>
                <div>
                    <strong className="block text-slate-800">With permanent residency:</strong>
                    <ul className="list-none mt-1 space-y-1 text-sm">
                    <li>✓ Can buy 1 house/apartment</li>
                    <li>✓ Can own a land plot (limited size)</li>
                    <li>✓ More rights but still with restrictions</li>
                    </ul>
                </div>
                <div>
                    <strong className="block text-slate-800">With Russian citizenship:</strong>
                    <ul className="list-none mt-1 space-y-1 text-sm">
                    <li>✓ Full ownership rights like any citizen</li>
                    </ul>
                </div>
            </div>
            <p className="mt-3">Recommendation: Rent initially with your TRP, explore permanent residency pathway after 3 years if you want to buy.</p>
        </>
        },
        {
        q: "How is healthcare?",
        a: <>
            <p>Two-system approach:</p>
            <div className="mt-3 grid sm:grid-cols-2 gap-4">
                <div>
                    <strong className="block text-slate-800">State healthcare</strong>
                    <ul className="list-disc pl-5 mt-1 text-sm text-slate-600">
                        <li>Polyclinics (outpatient care)</li>
                        <li>Hospitals</li>
                        <li>Emergency services</li>
                        <li>Free or minimal cost</li>
                        <li>Quality varies</li>
                        <li>May have wait times</li>
                    </ul>
                </div>
                <div>
                    <strong className="block text-slate-800">Private healthcare</strong>
                    <ul className="list-disc pl-5 mt-1 text-sm text-slate-600">
                        <li>Clinics in major cities</li>
                        <li>$55-220 for consultation</li>
                        <li>Generally modern and professional</li>
                        <li>Faster service</li>
                    </ul>
                </div>
            </div>
            <p className="mt-3 font-bold">Our advice:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Use state system for emergencies and basic care</li>
                <li>Private system for regular care (very affordable)</li>
                <li>Our guide includes clinic recommendations by city</li>
            </ul>
        </>
        },
        {
        q: "What's included in the $99 guide?",
        a: <>
            <p>Complete package includes:</p>
            <ul className="list-none mt-2 space-y-1 font-medium">
                <li>✓ Step-by-step handbook (PDF)</li>
                <li>✓ Downloadable checklists (documents, visa, TRP)</li>
                <li>✓ Sample letters and forms (ready to use)</li>
                <li>✓ Country-specific instructions</li>
                <li>✓ Video tutorials</li>
                <li>✓ Consulate database (contact info)</li>
                <li>✓ Translator and lawyer directory</li>
                <li>✓ Housing resources</li>
                <li>✓ Email support</li>
                <li>✓ LIFETIME updates (FREE)</li>
            </ul>
            <p className="mt-2 text-green-700 font-bold">One purchase—lifetime access with regular updates.</p>
        </>
        },
        {
        q: "Do you offer additional paid services?",
        a: <>
            <p>Yes, for those who need personalized help:</p>
            <div className="mt-3 space-y-3">
                <div>
                    <strong className="block text-slate-800">1. One-on-one consultation ($199)</strong>
                    <p className="text-sm text-slate-600">60-minute session. Answer your specific questions. Review your documents. Personalized guidance.</p>
                </div>
                <div>
                    <strong className="block text-slate-800">2. Document preparation ($500)</strong>
                    <p className="text-sm text-slate-600">Professional document preparation. Translation coordination. Apostille assistance. FMIV formatting.</p>
                </div>
                <div>
                    <strong className="block text-slate-800">3. Full-service management ($2,000-3,000)</strong>
                    <p className="text-sm text-slate-600">Complete process management. Application submission. Status tracking. Email support throughout.</p>
                </div>
            </div>
            <p className="mt-3">Are they needed? Most people succeed with the guide. Additional services for complex cases or to save time.</p>
        </>
        },
        {
        q: "What about annual compliance and follow-ups?",
        a: <>
            <p className="font-bold">Important: After receiving your TRP, you'll need to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Maintain your legal residency status</li>
                <li>Follow local registration requirements</li>
                <li>Comply with income reporting (if applicable)</li>
                <li>Keep your documentation current</li>
                <li>Follow any annual compliance procedures</li>
            </ul>
            <p className="mt-2">Our guide and updated materials cover these requirements. It's important to stay informed about current regulations through official channels.</p>
        </>
        }
    ];

    return (
        <section className="py-32 bg-white" id="faq">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-serif font-bold text-slate-900 uppercase tracking-tight">FREQUENTLY ASKED QUESTIONS</h2>
                    <div className="w-24 h-1 bg-royal-200 mx-auto mt-6 rounded-full"></div>
                </div>
                <div className="space-y-4">
                    {faqData.map((item, i) => (
                        <div key={i} className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-soft transition-all hover:shadow-md">
                            <button
                                onClick={() => toggleFaq(i)}
                                className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50 transition-colors focus:outline-none"
                            >
                                <span className="font-bold text-slate-900 pr-8 text-base md:text-lg font-serif">{item.q}</span>
                                <span className="text-royal-400 flex-shrink-0">
                                    {openFaq === i ? <MinusIcon /> : <PlusIcon />}
                                </span>
                            </button>
                            {openFaq === i && (
                                <div className="p-6 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100 mt-0 bg-slate-50/50">
                                    <div className="pt-4">{item.a}</div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

interface ComparisonRow {
  criteria: string;
  svv: string | boolean;
  other: string | boolean;
}

interface ComparisonTableProps {
  title: string;
  otherName: string;
  rows: ComparisonRow[];
  verdict: string;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ title, otherName, rows, verdict }) => (
  <div className="mb-16 last:mb-0 bg-white rounded-[2rem] shadow-soft border border-slate-100 overflow-hidden">
    <div className="p-8 border-b border-slate-100 bg-slate-50/50">
        <h3 className="text-2xl font-serif font-bold text-slate-800 flex items-center gap-3">
            <span className="w-1.5 h-8 bg-royal-600 rounded-full"></span>
            {title}
        </h3>
    </div>
    <div className="overflow-x-auto p-4 md:p-8">
      <table className="w-full text-sm text-left border-collapse min-w-[600px] rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-slate-100 text-slate-700">
            <th className="p-5 font-bold w-1/3 text-xs uppercase tracking-widest">Criteria</th>
            <th className="p-5 font-bold bg-royal-50 text-royal-900 w-1/3 text-xs uppercase tracking-widest border-l border-r border-royal-100">Shared Values Visa</th>
            <th className="p-5 font-bold text-slate-500 w-1/3 text-xs uppercase tracking-widest">{otherName}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <td className="p-5 font-bold text-slate-900">{row.criteria}</td>
              <td className="p-5 bg-royal-50/30 text-slate-800 font-medium border-l border-r border-slate-100">
                 {typeof row.svv === 'boolean' ? (row.svv ? <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded">✓ YES</span> : <span className="text-red-500 font-bold bg-red-50 px-2 py-1 rounded">✗ NO</span>) : 
                 (row.svv.startsWith('✓') ? <span className="text-green-600 font-bold">{row.svv}</span> : row.svv)}
              </td>
              <td className="p-5 text-slate-500">
                 {typeof row.other === 'boolean' ? (row.other ? <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded">✓ YES</span> : <span className="text-red-500 font-bold bg-red-50 px-2 py-1 rounded">✗ NO</span>) : 
                 (row.other.startsWith('✗') ? <span className="text-red-500 font-bold">{row.other}</span> : (row.other.startsWith('✓') ? <span className="text-green-600 font-bold">{row.other}</span> : row.other))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="p-6 bg-royal-900 text-white flex items-start md:items-center gap-4 mx-4 md:mx-8 mb-8 rounded-2xl shadow-lg">
      <div className="p-2 bg-white/10 rounded-lg"><StarIcon /></div>
      <div>
         <strong className="block text-gold-400 uppercase text-xs tracking-widest mb-1">Expert Verdict</strong> 
         <span className="text-slate-100 font-light leading-snug">{verdict}</span>
      </div>
    </div>
  </div>
);

const ComparisonSection = () => {
    const comparisons: ComparisonTableProps[] = [
      {
        title: "VS. Traditional TRP (Quota-Based)",
        otherName: "Traditional TRP",
        rows: [
          { criteria: "Quota required?", svv: "✓ NO", other: "✗ YES (10.5k/yr)" },
          { criteria: "Language exam?", svv: "✓ NO (initially)", other: "✗ YES (required)" },
          { criteria: "Application process", svv: "✓ STREAMLINED", other: "✗ COMPLEX" },
          { criteria: "Timeline", svv: "✓ ~6 months", other: "✗ 8-12+ months" },
          { criteria: "Entry path", svv: "✓ DIRECT", other: "✗ Needs invitation" },
          { criteria: "Success rate", svv: "✓ High (w/complete docs)", other: "? Variable" },
          { criteria: "Cost", svv: "✓ $1.1-2.7k", other: "✗ $1.6-4.4k" },
          { criteria: "Work rights", svv: "✓ YES", other: "✓ YES" },
          { criteria: "Family access", svv: "✓ Available", other: "✓ Available" },
          { criteria: "Path to citizenship", svv: "✓ YES", other: "✓ YES" },
          { criteria: "Values requirement", svv: "✓ YES", other: "✗ No" },
        ],
        verdict: "If you meet eligibility and share traditional values, Shared Values pathway is more efficient than traditional TRP."
      },
      {
          title: "VS. Student Visa",
          otherName: "Student Visa",
          rows: [
              { criteria: "Duration", svv: "3 years (TRP)", other: "1 year (typical)" },
              { criteria: "Cost", svv: "$1.1-2.7k", other: "$550-1.6k + university" },
              { criteria: "Work rights", svv: "✓ YES (full)", other: "✗ LIMITED (20h/week)" },
              { criteria: "Requires school?", svv: "NO", other: "YES (expensive!)" },
              { criteria: "Bring family?", svv: "YES", other: "NO" },
              { criteria: "Direct path to residency", svv: "✓ YES (3 yrs)", other: "✗ INDIRECT" },
              { criteria: "Permanent residency", svv: "✓ After 3 yrs", other: "✗ Need new path" },
              { criteria: "Renewal", svv: "SIMPLE", other: "COMPLEX" },
          ],
          verdict: "If you don't want to study and pay tuition, Shared Values is the better residency path."
      },
      {
          title: "VS. Golden Visa",
          otherName: "Golden Visa",
          rows: [
              { criteria: "Initial cost", svv: "$1.1-2.7k", other: "$220k+ investment" },
              { criteria: "Duration", svv: "3 years (TRP)", other: "1-3 years" },
              { criteria: "Investment required?", svv: "NO", other: "YES (required)" },
              { criteria: "Work rights", svv: "✓ YES", other: "✓ YES" },
              { criteria: "Bring family?", svv: "YES", other: "YES" },
              { criteria: "Path to citizenship", svv: "✓ YES", other: "✓ YES" },
              { criteria: "If rejected", svv: "✓ Minimal loss", other: "✗ Investment at risk" },
              { criteria: "Accessibility", svv: "✓ For most people", other: "✗ Wealthy only" },
          ],
          verdict: "If you don't have $220k+ to invest, Shared Values is your accessible residency path. If you have capital, compare ROI carefully."
      }
    ];
  
    return (
      <section className="py-32 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 uppercase tracking-tight">HOW SHARED VALUES VISA COMPARES</h2>
            <div className="w-24 h-1 bg-royal-200 mx-auto mt-6 rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto">
              {comparisons.map((c, i) => (
                <ComparisonTable 
                  key={i} 
                  title={c.title}
                  otherName={c.otherName}
                  rows={c.rows}
                  verdict={c.verdict}
                />
              ))}
          </div>
        </div>
      </section>
    );
};
  
const PricingSection = () => {
    return (
        <section className="py-32 bg-white border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 uppercase tracking-tight">START YOUR TRANSFORMATION TODAY</h2>
                    <p className="mt-6 text-slate-600 max-w-2xl mx-auto text-lg font-light">Small investment, life-changing return.</p>
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
                                    
                                    <button className="w-full py-5 bg-royal-700 text-white font-bold rounded-xl hover:bg-royal-800 transition-all shadow-lg hover:shadow-royal-700/30 flex items-center justify-center gap-3 uppercase tracking-wider text-sm mb-4 transform hover:-translate-y-1">
                                        Buy Now - Instant Access
                                    </button>
                                    <button className="text-slate-500 text-xs hover:text-royal-600 underline decoration-slate-300 underline-offset-4">Or pay monthly: 3 × $39</button>
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
                                <button className="w-full py-4 border border-royal-200 text-royal-700 font-bold rounded-xl hover:bg-royal-50 hover:border-royal-300 transition-all text-sm uppercase tracking-wide">
                                    Schedule Consultation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const EligibilitySection = () => {
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
    <section className="py-32 bg-slate-50 border-t border-slate-200" id="eligibility">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 uppercase tracking-tight">Do You Qualify? <span className="text-royal-600">Check in 30 Seconds</span></h2>
        </div>

        <div className="max-w-3xl mx-auto mb-20">
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
                                    <button className="px-10 py-5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 w-full md:w-auto uppercase tracking-wide hover:-translate-y-1">
                                        GET YOUR FULL GUIDE ($99)
                                    </button>
                                    <button onClick={() => setResult(null)} className="block mt-6 text-sm text-green-600 hover:text-green-800 hover:underline w-full font-medium">Check again</button>
                                </div>
                            ) : (
                                <div className="bg-amber-50 border border-amber-200 rounded-3xl p-10">
                                    <div className="w-24 h-24 bg-white text-amber-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm border border-amber-100">
                                        <span className="text-5xl font-serif font-bold">?</span>
                                    </div>
                                    <h3 className="text-3xl font-serif font-bold text-amber-800 mb-4">CHECK WITH CONSULATE</h3>
                                    <p className="text-amber-700 mb-10 max-w-md mx-auto text-lg leading-relaxed">Your situation requires official verification. Your country might have specific requirements or exceptions.</p>
                                    <button className="px-10 py-5 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 transition-all shadow-lg w-full md:w-auto uppercase tracking-wide hover:-translate-y-1">
                                        FIND YOUR NEAREST CONSULATE
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
             <p className="text-center text-xs text-slate-400 mt-10 max-w-3xl mx-auto leading-relaxed">
                 IMPORTANT NOTE: The list of eligible countries is determined by Russian authorities (Decree No. 702) and coincides with the list of foreign states implementing unfriendly policies. This list may change. Eligibility must always be confirmed with your nearest Russian consulate.
             </p>
             <div className="text-center mt-8">
                 <button className="text-royal-600 font-bold text-xs uppercase border-b-2 border-royal-200 hover:border-royal-600 transition-all pb-1 hover:text-royal-800 tracking-wider">Contact Your Consulate For Official List</button>
             </div>
        </div>
      </div>
    </section>
  );
};

const FinalCTASection = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if(email) {
       alert("Thank you! You've been subscribed to updates.");
       setEmail('');
    }
  };

  return (
    <section className="py-32 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 uppercase tracking-tight">
            Ready to Take Control of Your Future?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
            {/* Left Column */}
            <div className="bg-royal-900 rounded-[2.5rem] p-12 text-white shadow-2xl flex flex-col items-center text-center relative overflow-hidden border border-white/10 group hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-overlay filter blur-[80px] opacity-30 animate-pulse"></div>
                <div className="relative z-10 w-full">
                    <h3 className="text-3xl font-serif font-bold mb-3 text-gold-400">START WITH THE GUIDE</h3>
                    <div className="text-xl font-bold mb-4 opacity-80">$99 One-Time</div>
                    <p className="text-blue-100 mb-10 font-light text-lg">Get instant access to the complete roadmap. Start TODAY.</p>
                    <button className="px-8 py-5 bg-white text-royal-900 font-bold rounded-xl shadow-xl hover:bg-blue-50 transition-colors w-full uppercase tracking-widest flex items-center justify-center gap-3 text-sm">
                        Purchase Now <ArrowRightIcon />
                    </button>
                    <div className="mt-8 flex flex-col gap-3 text-xs text-blue-200/60 uppercase tracking-wider font-bold">
                        <span className="flex items-center justify-center gap-2"><ShieldCheckIcon /> 30-day money-back guarantee</span>
                        <span className="flex items-center justify-center gap-2"><CheckCircleIcon /> All materials immediately available</span>
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="bg-white rounded-[2.5rem] p-12 border border-slate-200 shadow-xl flex flex-col items-center text-center group hover:scale-[1.02] transition-transform duration-300">
                <h3 className="text-3xl font-serif font-bold text-slate-900 mb-3">FREE ASSESSMENT</h3>
                <div className="text-xl font-bold mb-4 text-slate-400">$0 Consultation</div>
                <p className="text-slate-600 mb-10 font-light text-lg">Have questions about eligibility? Book a free consultation with our team.</p>
                <button className="px-8 py-5 bg-slate-50 text-slate-900 font-bold rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors w-full uppercase tracking-widest flex items-center justify-center gap-3 text-sm">
                    Book Now - Calendly <ExternalLinkIcon />
                </button>
                <div className="mt-8 flex flex-col gap-3 text-xs text-slate-400 uppercase tracking-wider font-bold">
                    <span>No obligation. No pressure.</span>
                    <span>Just honest guidance.</span>
                </div>
            </div>
        </div>

        {/* Hesitant Block */}
        <div className="max-w-2xl mx-auto text-center bg-slate-50/50 rounded-3xl p-10 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-3 font-serif">NOT READY YET?</h3>
            <p className="text-slate-600 mb-8 font-light">Get free updates & information sent to your inbox:</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
                <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-1 px-5 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-royal-500 outline-none bg-white transition-all shadow-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="px-8 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors uppercase text-xs tracking-widest shadow-md">
                    Subscribe
                </button>
            </form>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                <span className="flex items-center gap-2">Occasional emails</span>
                <span className="flex items-center gap-2">Unsubscribe anytime</span>
                <span className="flex items-center gap-2">Bonus guide included</span>
            </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
    return (
        <footer className="bg-royal-950 text-white pt-24 pb-12 border-t border-white/5 font-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-12 mb-20">
                    <div>
                        <h4 className="font-bold text-xs mb-8 text-gold-500 uppercase tracking-[0.2em]">About</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors hover:underline decoration-gold-500 underline-offset-4">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors hover:underline decoration-gold-500 underline-offset-4">Our Team</a></li>
                            <li><a href="#" className="hover:text-white transition-colors hover:underline decoration-gold-500 underline-offset-4">Our Story</a></li>
                            <li><a href="#" className="hover:text-white transition-colors hover:underline decoration-gold-500 underline-offset-4">Why We Do This</a></li>
                            <li><a href="#" className="hover:text-white transition-colors hover:underline decoration-gold-500 underline-offset-4">Testimonials</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-xs mb-8 text-gold-500 uppercase tracking-[0.2em]">Resources</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors hover:underline decoration-gold-500 underline-offset-4">Visa Guide</a></li>
                            <li><a href="#" className="hover:text-white transition-colors hover:underline decoration-gold-500 underline-offset-4">FAQ</a></li>
                            <li><a href="#" className="hover:text-white transition-colors hover:underline decoration-gold-500 underline-offset-4">Blog</a></li>
                            <li><a href="#" className="hover:text-white transition-colors hover:underline decoration-gold-500 underline-offset-4">Video Library</a></li>
                            <li><a href="#" className="hover:text-white transition-colors hover:underline decoration-gold-500 underline-offset-4">Glossary</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-xs mb-8 text-gold-500 uppercase tracking-[0.2em]">Legal</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors hover:underline decoration-gold-500 underline-offset-4">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-white transition-colors hover:underline decoration-gold-500 underline-offset-4">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors hover:underline decoration-gold-500 underline-offset-4">Refund Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors hover:underline decoration-gold-500 underline-offset-4">Disclaimer</a></li>
                            <li><a href="#" className="hover:text-white transition-colors hover:underline decoration-gold-500 underline-offset-4">Cookie Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-xs mb-8 text-gold-500 uppercase tracking-[0.2em]">Contact</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span> support@example.com</li>
                            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span> Telegram: @example</li>
                            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span> Calendly: example.com</li>
                            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span> Office: Moscow & New York</li>
                            <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span> ☎️ +1-555-0123-456</li>
                        </ul>
                    </div>
                </div>
                
                <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                    <div className="text-slate-500 text-xs leading-relaxed">
                        <p className="font-bold text-slate-300 uppercase tracking-wider mb-1">© 2025 Move to Russia | Shared Values Visa Guide</p>
                        <p>All rights reserved.</p>
                    </div>
                    <div className="text-slate-600 text-[10px] max-w-md italic border-l border-white/10 pl-4">
                        "This site is an independent information service. We are not affiliated with the Russian government or any government agency."
                    </div>
                    <div className="flex gap-3 text-slate-500 text-[10px] font-bold tracking-widest uppercase">
                        <span className="px-3 py-1.5 bg-white/5 rounded border border-white/5 hover:bg-white/10 transition-colors cursor-default">SSL Secure</span>
                        <span className="px-3 py-1.5 bg-white/5 rounded border border-white/5 hover:bg-white/10 transition-colors cursor-default">GDPR Compliant</span>
                        <span className="px-3 py-1.5 bg-white/5 rounded border border-white/5 hover:bg-white/10 transition-colors cursor-default">Money-Back Guarantee</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const App = () => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-gold-200 selection:text-royal-900">
      <Navbar />
      <Hero />
      <TrustSection />
      <ProblemSection />
      <SolutionSection />
      <ApplicationProcessSection />
      <RequirementsSection />
      <BenefitsSection />
      <TestimonialsSection />
      <EligibilitySection />
      <FaqSection />
      <ComparisonSection />
      <PricingSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);