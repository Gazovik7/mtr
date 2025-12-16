import faqContent from './faq.json';

export type FaqItem = { q: string; a: string };

export const COPY = {
  site: {
    url: 'https://www.sharedvaluesvisa.com',
    links: {
      guideUrl: 'https://movetorussia.com/get-access/',
    },
    brand: {
      mark: 'SV',
      name: 'Shared Values Visa',
      tagline: 'Official Pathway',
      footerName: 'Shared Values',
    },
    contactEmail: 'support@sharedvaluesvisa.com',
    location: 'Moscow, Russia',
  },
  schema: {
    organization: {
      name: 'Shared Values Visa Assistance',
      description:
        'Helping families and individuals find stability and tradition in Russia through the Shared Values Visa program.',
      contactType: 'customer support',
      availableLanguage: ['en'],
    },
    website: {
      name: 'Shared Values Visa',
    },
    webpage: {
      name: 'Shared Values Visa - Official Pathway to Russia',
      inLanguage: 'en-US',
      description: 'Official pathway to Russian residency via the Shared Values Visa (Decree No. 702).',
    },
    product: {
      name: 'Shared Values Visa Guide',
      description: 'Complete step-by-step handbook for applying to Russian residency via Decree No. 702.',
      sku: 'SVV-GUIDE-2025',
      offer: {
        price: '99.00',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        ratingValue: '4.9',
        reviewCount: '3500',
      },
    },
  },
  faq: faqContent as FaqItem[],
  contactModal: {
    title: 'Schedule Consultation',
    subtitle: 'Fill out the form below and our team will get back to you within 24 hours.',
    labels: {
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      message: 'How can we help?',
    },
    placeholders: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 000-0000',
      message: 'I have questions about...',
    },
    submit: {
      idle: 'Request Consultation',
      loading: 'Sending...',
    },
    alerts: {
      success: 'Thank you. A specialist will contact you shortly.',
      failure: "We couldn't send the request. Please try again.",
    },
  },
  navbar: {
    links: [
      { id: 'trust', label: 'Trust' },
      { id: 'eligibility', label: 'Eligibility' },
      { id: 'faq', label: 'FAQ' },
    ],
    cta: 'Schedule Free Consultation',
  },
  hero: {
    badge: 'Applications Open for 2025',
    title: {
      prefix: 'Russia',
      highlight: 'Shared Values',
      suffix: 'Visa',
    },
    subtitle: '"Join Thousands of Westerners Building a New Life in Russia, with clear steps for Russia"',
    paragraphs: [
      "Looking for a place where traditional values still matter. Where family is sacred, faith flourishes, and moral principles aren't mocked. Where children can grow up with clear values instead of confusion.",
      'The Shared Values Visa (SVV) is a legally-backed pathway to Russia for citizens of 47 countries who reject "destructive neoliberal ideology" and are seeking Russian residency and an alternative way of life.',
      'If researching moving to russia, this page explains the Russia Shared Values Visa and what Russian applicants should prepare for Russia.',
    ],
    highlightParagraph:
      'Not theory. Not politics. A real path to permanent residence, work, and family life in Russia, where those values are shared by millions.',
    buttons: {
      primary: 'Schedule Free Consultation',
      secondary: 'Get the Russia Visa Guide',
    },
    socialProof: {
      ratingText: '(4.9/5)',
      quote: '"Trusted by 3,500+ applicants"',
      stats: ['92% approved on first application', 'Full journey: ~18 months'],
    },
  },
  trust: {
    title: 'Why Trust Us with the Most Important Decision?',
    viewTestimonials: 'View testimonials',
    viewPricing: 'View pricing',
    cards: [
      {
        title: 'Based on Presidential Decree',
        bullets: [
          'Decree No. 702 (Sep 19, 2024)',
          'Signed personally by President Vladimir Putin',
          'Completely legal and official',
          'Active and enforced today',
        ],
      },
      {
        title: 'Thousands of Success Stories',
        bullets: ['Real people, real approvals', 'Families, retirees, freelancers', 'Highest satisfaction ratings'],
        cta: 'View testimonials',
      },
      {
        title: 'Expert-Led Guidance',
        bullets: [
          'Immigration lawyers on staff',
          'Updated regularly with changes',
          'Years of experience',
          'Consulate trained experts',
        ],
      },
      {
        title: '100% Transparent Process',
        bullets: ['Step-by-step guide included', 'Zero hidden fees or surprises', '30-day money-back guarantee'],
        cta: 'View pricing',
      },
    ],
  },
  problem: {
    title: {
      prefix: 'Does Western Culture No Longer Feel Like ',
      italic: 'Home?',
    },
    intro: "You've felt it coming for years. Maybe longer. The frustration grows with each passing day:",
    painPoints: [
      {
        title: 'The government no longer represents core values.',
        desc: 'Political decisions contradict personal beliefs. Watching the news makes it clear: the country no longer feels like home.',
      },
      {
        title: "You're afraid to raise children in this environment.",
        desc: 'Schools teach ideas you reject. Neighbors and friends pressure you with views you disagree with. Children deserve to grow up with clear values instead of confusion.',
      },
      {
        title: "You're exhausted by the restrictions on faith.",
        desc: 'Speaking about traditional values has become dangerous. You\'re labeled "backward" or a "fanatic" for believing in God, family, and tradition.',
      },
      {
        title: 'You desperately seek a society where faith, family & stability still matter.',
        desc: 'You need a place where most people share those beliefs—not mock them.',
      },
      {
        title: 'You feel profoundly alone.',
        desc: 'Everything around you feels hostile. Others who think like you either stay silent or are planning to leave. You need a community of like-minded people.',
      },
    ],
    quiz: {
      badge: 'Interactive Assessment',
      emailView: {
        title: 'Take our 2-minute Quiz:',
        highlight: 'Is Russia Right for You?',
        desc: 'Answer 4 simple questions to receive a personalized eligibility report and relocation roadmap for Russia.',
        emailLabel: 'Enter an email to start',
        emailPlaceholder: 'name@example.com',
        submit: 'Start Assessment',
        privacy: 'Privacy is protected. No spam.',
      },
      analyzing: {
        title: 'Analyzing the details...',
        desc: 'Comparing responses with Decree No. 702 requirements.',
      },
      result: {
        title: 'Excellent Match!',
        summary:
          'Based on the answers, you appear to be a High Potential Candidate for the Shared Values Visa program.',
        sentPrefix: "We've sent the personalized report and next steps to ",
        cta: 'Get the Visa Guide Now',
        restart: 'Start Over',
      },
      questions: [
        {
          q: 'What is the main motivation for moving to Russia?',
          options: ['Seeking Traditional Values', 'Better Future for Children', 'Economic Opportunities', 'Safety & Security'],
        },
        {
          q: 'Who are you planning to move with?',
          options: ['Just myself', 'With Spouse', 'Whole Family (with kids)', 'Retiring Couple'],
        },
        {
          q: 'What is the timeline for moving to Russia?',
          options: ['Immediately (ASAP)', 'In 12-18 Months', 'Next Year', 'Just Researching'],
        },
        {
          q: 'Do you hold a passport from:',
          options: ['USA / UK / Canada', 'EU Country', 'Australia / NZ', 'Other'],
        },
      ],
      alerts: {
        emailFailure: "We couldn't send the email. Please try again.",
      },
    },
  },
  images: {
    heroBackgroundAlt: "Moscow St Basil's Cathedral",
    testimonialsBackgroundAlt: 'Moscow City Skyline',
  },
  solution: {
    title: 'The Shared Values Visa',
    subtitle: 'Official Decree No. 702 Pathway',
    tabs: {
      basics: 'The Basics',
      compare: 'Compare Alternatives',
    },
    basics: {
      title: "This isn't just a visa. It's a ticket to a stable future in Russia.",
      intro: {
        prefix: "When you complete the process, you'll receive an ",
        highlight1: 'Entry Visa',
        middle: ' (to travel) and a ',
        highlight2: 'Temporary Residence Permit (3 years)',
        suffix: ' to live, work, and build a life.',
      },
      whyMatters: {
        title: 'Why this matters',
        bullets: [
          'Issued by Presidential Decree (Legal & Official)',
          'For eligible citizens (EU, USA, Canada, Japan, etc.)',
          'Fast-track to residency (Bypasses quotas)',
          'Work rights included immediately',
        ],
      },
      imageCard: {
        title: 'Who is this for?',
        desc: 'Citizens of 47 countries who value traditional principles over neoliberal ideology.',
        cta: 'Check Eligibility List',
      },
      imageAlt: 'People in Russia',
    },
    compare: {
      leftTitle: 'Traditional TRP (Quota)',
      leftBullets: [
        'Requires migration quota (Only 10.5k/year)',
        'Mandatory Russian language exam',
        'Complex document requirements',
        '8-12 months or longer wait',
        'Unpredictable outcome',
      ],
      recommendedLabel: 'RECOMMENDED',
      rightTitle: 'Shared Values Visa',
      rightBullets: [
        'NO quota needed',
        'NO language exam initially',
        'Streamlined documents',
        '~6 months typical timeline',
        'More predictable process',
      ],
    },
  },
  process: {
    badge: 'Step-by-Step Guide',
    title: {
      line1: '5-Step Roadmap',
      line2: 'to Russian Residency',
    },
    estimatedCostPrefix: 'Est. Cost:',
    steps: [
      {
        title: 'Preparation Phase',
        duration: 'Months 1-4',
        cost: '$1,000 - $2,000',
        content: {
          type: 'bullets',
          heading: 'Gather required documents:',
          bullets: [
            'Valid passport (4+ years remaining)',
            'Criminal background check (with apostille)',
            'Marriage/Birth/Divorce certificates (apostille)',
            'Medical insurance document ($30,000+ coverage)',
            'Photographs (3.5×4.5 cm, 4-5 copies)',
          ],
        },
      },
      {
        title: 'Visa Application',
        duration: 'Months 5-7',
        cost: '$500 - $1,000',
        content: {
          type: 'ordered',
          steps: [
            {
              bold: 'Fill out form:',
              text: 'Visit visa.kdmid.ru. Specify "private" purpose. Print & sign with pen.',
            },
            {
              bold: 'Write letter to Russian Consulate:',
              text: 'Request visa for temporary residence application. Include full details.',
            },
            {
              bold: 'Assemble package:',
              text: 'Passport, form, letter, background check, photos, insurance.',
            },
            {
              bold: 'Submit in person:',
              text: 'Visit the nearest Russian consulate. Pay fee.',
            },
          ],
          note: {
            bold: 'NOTE:',
            text: 'Any non-transit visa type is acceptable, though we recommend a 3+ month visa. This step supports moving to Russia under the Russian Federation process.',
          },
        },
      },
      {
        title: 'Travel to Russia',
        duration: 'Months 8-10',
        cost: '$2,500 - $4,000',
        content: {
          type: 'numbered',
          items: [
            { number: '1.', bold: 'Book accommodation:', text: 'Apartment or hotel (needed for registration).' },
            { number: '2.', bold: 'Book flight:', text: 'Moscow or St. Petersburg recommended.' },
            {
              number: '3.',
              bold: 'Arrival Tasks:',
              text: 'Register address, get Russian SIM, open bank account, get medical exam.',
            },
          ],
        },
      },
      {
        title: 'TRP Application',
        duration: 'Months 11-14',
        cost: '$1,500 - $2,500',
        content: {
          type: 'ordered',
          steps: [
            { bold: 'Appointment:', text: 'Book at Migration Center (FMIV).' },
            { bold: 'Prepare Docs:', text: 'Forms, medical results, certified translations, passport, photos.' },
            { bold: 'Submit:', text: 'Visit FMIV, get fingerprinted & photographed.' },
            { bold: 'Pay Fee:', text: '1,920 RUB (~$20).' },
          ],
        },
      },
      {
        title: 'Wait & Approval',
        duration: 'Months 15-18',
        cost: '$2,000+ (living)',
        content: {
          type: 'approval',
          intro:
            'Processing commonly takes 4-6 months inside Russia. Plan for living expenses while you wait—you can legally stay and work.',
          whenApprovedLabel: 'When approved:',
          badge: 'YOU ARE NOW OFFICIALLY A RESIDENT FOR 3 YEARS!',
        },
      },
    ],
    summary: {
      title: 'Total Summary',
      timelineLabel: 'Total Timeline',
      timelineValue: '~18',
      timelineUnit: 'Months',
      costLabel: 'Total Estimated Cost',
      costValue: '$10,000+',
      costFootnote: '*Plan for extended stays, translations, travel, and living costs',
    },
  },
  testimonials: {
    title: 'Real People, Real Stories, Real Success',
    subtitle: 'Join the growing community of expats who found their new home.',
    testimonials: [
      {
        name: 'Michael T.',
        location: 'Moscow',
        origin: 'USA',
        flag: '🇺🇸',
        date: 'June 2025',
        type: 'Family of 4',
        quote:
          "I was skeptical. It seemed too good to be true. But the guide was so detailed and clear that I just followed each step. My family and I flew to Moscow in December, and by June our application was approved. Best decision we've ever made.",
      },
      {
        name: 'Sarah M.',
        location: 'St. Petersburg',
        origin: 'Canada',
        flag: '🇨🇦',
        date: 'March 2025',
        type: 'Freelancer',
        quote:
          "I've been a digital nomad for 5 years. Legal status always worried me. With the Shared Values Visa, I have peace of mind. I work remotely, earn in dollars, pay taxes legally, and live in a beautiful city.",
      },
      {
        name: 'Robert & Linda W.',
        location: 'Kazan',
        origin: 'Australia',
        flag: '🇦🇺',
        date: 'February 2025',
        type: 'Retirees',
        quote:
          'We were tired of the West. We wanted a place where family values still meant something. The guide anticipated every question. We moved to Kazan and found a community of faithful, wise, kind people.',
      },
    ],
    successBlock: {
      title: 'Success Stories',
      desc: "We've helped hundreds of people successfully navigate the immigration process.",
      bullets: [
        'High success rate with complete docs',
        'Thousands of satisfied clients',
        'Families, retirees, professionals approved',
      ],
    },
    shareBlock: {
      title: 'Share a Story',
      desc: "If you've been approved, inspire others! You'll receive a 10% discount on future services.",
      cta: 'Submit a Story',
      approvedLabel: 'Approved:',
    },
  },
  eligibility: {
    title: {
      prefix: 'Do You Qualify? ',
      highlight: 'Check in 30 Seconds',
    },
    checkerTitle: 'Interactive Eligibility Checker',
    q1: {
      label: '1. Where is the passport issued?',
      placeholder: 'Select a country...',
      other: 'Other / Not Listed',
    },
    q2: {
      label: '2. Do you share traditional Russian values?',
      yes: 'Yes',
      no: 'No',
    },
    q3: {
      label: '3. Does the passport have 4+ years of validity remaining?',
      yes: 'Yes',
      no: 'No',
    },
    checkButton: 'Check Eligibility',
    result: {
      qualified: {
        title: 'YOU QUALIFY!',
        desc: 'Great news! You are likely eligible for the Shared Values Visa based on the responses. We recommend confirming with a local Russian consulate.',
        cta: 'GET THE FULL GUIDE ($99)',
        again: 'Check again',
      },
      consult: {
        title: 'CHECK WITH CONSULATE',
        desc: 'This situation requires official verification. The country of citizenship might have specific requirements or exceptions.',
        cta: 'SCHEDULE FREE CONSULTATION',
        again: 'Check again',
      },
    },
    countries: {
      title: 'Eligible Countries (Representative List)',
      europeTitle: 'EUROPEAN UNION & EUROPE',
      americasTitle: 'AMERICAS',
      apacTitle: 'ASIA-PACIFIC & OTHERS',
      europe: [
        'Austria',
        'Belgium',
        'Bulgaria',
        'Croatia',
        'Cyprus',
        'Czech Republic',
        'Denmark',
        'Estonia',
        'Finland',
        'France',
        'Germany',
        'Greece',
        'Hungary',
        'Ireland',
        'Italy',
        'Latvia',
        'Lithuania',
        'Luxembourg',
        'Malta',
        'Netherlands',
        'Poland',
        'Portugal',
        'Romania',
        'Slovakia',
        'Slovenia',
        'Spain',
        'Sweden',
        'Albania',
        'Andorra',
        'Iceland',
        'Liechtenstein',
        'Monaco',
        'Montenegro',
        'North Macedonia',
        'Norway',
        'San Marino',
        'Switzerland',
        'United Kingdom',
      ],
      americas: ['Canada', 'United States'],
      apac: ['Australia', 'Japan', 'New Zealand', 'Singapore', 'South Korea', 'Taiwan (China)'],
      apacFooter: 'And others (check with the consulate)',
      note:
        'IMPORTANT NOTE: The list of eligible countries is determined by Russian authorities (Decree No. 702) and coincides with the list of foreign states implementing unfriendly policies. This list may change. Eligibility must always be confirmed with the nearest Russian consulate.',
      ask: 'Ask Us About a Country',
      fullEligibleList: [
        'Albania',
        'Andorra',
        'Australia',
        'Austria',
        'Bahamas',
        'Belgium',
        'Bulgaria',
        'Canada',
        'Croatia',
        'Cyprus',
        'Czech Republic',
        'Denmark',
        'Estonia',
        'Finland',
        'France',
        'Germany',
        'Greece',
        'Hungary',
        'Iceland',
        'Ireland',
        'Italy',
        'Japan',
        'Latvia',
        'Liechtenstein',
        'Lithuania',
        'Luxembourg',
        'Malta',
        'Micronesia',
        'Monaco',
        'Montenegro',
        'Netherlands',
        'New Zealand',
        'North Macedonia',
        'Norway',
        'Poland',
        'Portugal',
        'Romania',
        'San Marino',
        'Singapore',
        'Slovakia',
        'Slovenia',
        'South Korea',
        'Spain',
        'Sweden',
        'Switzerland',
        'Taiwan',
        'United Kingdom',
        'United States',
      ],
    },
  },
  pricing: {
    title: 'START THE TRANSFORMATION TODAY',
    subtitle: 'Small investment, life-changing return for Russia.',
    topBar: {
      text: 'Not sure where to start? Talk to a specialist first—consultation is free.',
      cta: 'Schedule Free Consultation',
    },
    mainOffer: {
      badge: 'MOST POPULAR',
      title: 'SHARED VALUES VISA GUIDE',
      desc: 'Complete step-by-step handbook for applying to Russian residency.',
      includedTitle: "What's Included:",
      included: [
        'Step-by-step handbook (PDF)',
        'Downloadable checklists (documents, visa, TRP)',
        'Sample letters and forms (ready to use)',
        'Country-specific instructions',
        'Video tutorials',
        'Consulate database (contact info)',
        'Translator/lawyer directory',
        'Housing resources and marketplace',
        'Email support (priority)',
        'LIFETIME updates (FREE)',
      ],
      priceBox: {
        oldPrice: 'Consultant Fee: $500+',
        price: '$99',
        saveLabel: 'YOU SAVE 80%+',
        cta: 'Buy Now - Instant Access',
      },
      bonus: {
        title: 'Bonus Offers (Included Free):',
        items: ['Budget Planning Template', 'Email Template Library', 'Housing Marketplace Access', '3-month Priority Support'],
      },
      guarantee: '30-Day Money-Back Guarantee. No questions asked.',
      paymentMethods: ['VISA', 'MASTERCARD', 'PAYPAL', 'CRYPTO'],
    },
    specialPricing: {
      badge: 'Limited Time Offer',
      title: 'Special Pricing',
      desc: 'Reduced pricing available until December 31, 2025.',
      why: {
        title: 'Why act now?',
        bullets: ['Fees may change', 'Avoid processing delays'],
      },
    },
    premium: {
      title: 'Premium Consulting',
      note: 'Start with a free consultation',
      items: [
        {
          title: 'One-on-One Consultation',
          price: 'Free – 30 minutes',
          desc: '30-min video call. Document review. Personalized guidance.',
        },
        {
          title: 'Full Management',
          price: '$5,000+',
          desc: 'Complete process handling. We do everything for you.',
        },
      ],
      cta: 'Schedule Free Consultation',
    },
  },
  requirements: {
    title: 'Key Requirements',
    subtitle:
      'The Shared Values Visa simplifies the process, but you still need to prepare for Russia with the right Russian documents.',
    items: [
      { title: 'Eligible Citizenship', text: 'Citizen of one of the 47 listed countries.' },
      { title: 'Valid Passport', text: 'Must have at least 6 months validity remaining.' },
      { title: 'No Criminal Record', text: 'Clean police record from the country of citizenship.' },
      { title: 'Medical Certificate', text: 'Standard health checks (HIV, etc).' },
      { title: 'Family Members', text: 'Spouse and children can be included.' },
      { title: 'Financial Proof', text: 'Proof of funds to support yourself initially.' },
    ],
  },
  benefits: {
    title: 'Life in Russia',
    subtitle: 'Discover the advantages that await you in Russia, from Russian cities to smaller communities.',
    items: [
      { title: 'Traditional Values', desc: 'A society that respects faith, family, and tradition.' },
      { title: 'High Safety', desc: 'Clean streets, low crime, and safe neighborhoods for kids.' },
      { title: 'World-Class Culture', desc: 'Museums, theaters, ballet, and history at every turn.' },
      { title: 'Affordable Living', desc: 'Lower cost of energy, food, and housing compared to the West.' },
    ],
  },
  gallery: {
    title: 'See the Future',
    items: [
      { alt: 'Moscow Red Square', label: 'Moscow' },
      { alt: 'St Petersburg', label: 'St. Petersburg' },
      { alt: 'Nature', label: 'Nature' },
      { alt: 'Orthodox Church', label: 'Spiritual Heritage' },
    ],
  },
  faqSection: {
    title: 'Frequently Asked Questions',
  },
  comparison: {
    title: 'Cost of Living Comparison',
    headers: ['Item', 'Russia (Avg)', 'USA/Europe (Avg)', 'Savings'],
    rows: [
      { item: 'Rent (1-bedroom city center)', ru: '$400 - $800', west: '$1,500 - $2,500', save: '60-80%' },
      { item: 'Utilities (Monthly)', ru: '$50 - $100', west: '$200 - $400', save: '75%' },
      { item: 'Public Transport Pass', ru: '$25', west: '$100+', save: '75%' },
      { item: 'Internet (High Speed)', ru: '$5 - $10', west: '$50 - $80', save: '85%' },
      { item: 'Restaurant Meal (for 2)', ru: '$30', west: '$80 - $100', save: '60%' },
    ],
    footnote: '*Estimates based on 2024-2025 data. Exchange rates vary.',
  },
  finalCta: {
    title: 'Ready to Start a New Life?',
    desc: "Don't let another year pass wishing for a better future. The Shared Values Visa is an open door.",
    primary: 'Schedule Free Consultation',
    secondary: 'Get The Guide',
  },
  footer: {
    about: 'Helping families and individuals find stability and tradition in Russia through the Shared Values Visa program in Russia.',
    navigationTitle: 'Navigation',
    navigation: [
      { href: '/', label: 'Home' },
      { href: '#eligibility', label: 'Check Eligibility' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#faq', label: 'FAQ' },
    ],
    contactTitle: 'Contact',
    guideCta: 'Get Official Guide',
    copyright: {
      prefix: 'Shared Values Visa Assistance. All rights reserved. Not a government agency.',
    },
  },
} as const;
