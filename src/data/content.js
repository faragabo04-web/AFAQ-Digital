export const WHATSAPP_NUMBER = "971504131228";
export const WHATSAPP_URL = "https://wa.me/971504131228";
export const PHONE_DISPLAY = "+971 50 413 1228";
// Web3Forms access key — get one free at https://web3forms.com (routes form
// submissions to the AFAQ inbox; the key is public-safe). Until the real key
// replaces this TODO value, the contact form shows an error and directs
// visitors to WhatsApp instead of pretending to send.
export const WEB3FORMS_ACCESS_KEY = "65cd398c-0b78-4b03-a3a8-5db5efe0b507";
export const LINKEDIN_URL = "https://www.linkedin.com/in/ahmed-farouk-01b279286/";
export const FACEBOOK_URL = "https://www.facebook.com/helloafaqdigital";
export const INSTAGRAM_URL = "https://www.instagram.com/helloafaqdigital/";
export const EMAIL = "helloafaqdigital@gmail.com";

export const WHATSAPP_MESSAGE =
  "Hello Afaq Digital, I'd like to ask about your services.";

export const whatsappHref = `${WHATSAPP_URL}?text=${encodeURIComponent(WHATSAPP_MESSAGE).replace(/'/g, "%27")}`;

export const navLinks = [
  { id: "home", en: "Home", ar: "الرئيسية" },
  { id: "services", en: "Services", ar: "الخدمات" },
  { id: "work", en: "Work", ar: "الأعمال" },
  { id: "process", en: "Process", ar: "الخطوات" },
  { id: "faq", en: "FAQ", ar: "الأسئلة" },
  { id: "contact", en: "Contact", ar: "تواصل معنا" }
];

export const content = {
  en: {
    dir: "ltr",
    langLabel: "العربية",
    navCta: "Start Your Project",
    hero: {
      badge: "Premium Digital Agency",
      headline: "Websites That Make Your Business Look Trusted, Modern, and Ready to Grow.",
      description:
        "AFAQ Digital designs and builds premium websites, stores, and business systems that help growing brands look credible and turn visitors into real enquiries.",
      primary: "Start Your Project",
      secondary: "View Our Work",
      trust: [
        "Responsive on every device",
        "SEO-ready foundation",
        "Proven with live projects"
      ],
      floatNote: "Built to grow"
    },
    servicesTicker: {
      label: "AFAQ core services",
      items: [
        "Premium Websites",
        "E-Commerce Stores",
        "Google Sheets Dashboards",
        "Google Business Profile",
        "LinkedIn Optimization",
        "AI Website Assistant"
      ]
    },
    services: {
      title: "Digital Solutions Built for Your Business Growth",
      description:
        "From websites and online stores to business systems and digital presence, AFAQ Digital helps your business look professional, work smarter, and reach more customers.",
      proofBar: {
        kicker: "Related Work",
        showAll: "Show all projects",
        back: "Back to services"
      },
      items: [
        {
          id: "websites",
          title: "Premium Websites",
          tagline: "Designed to win trust. Built to convert.",
          text: "Custom business websites that present your brand clearly, load fast, and turn visitors into real enquiries.",
          points: ["Brand-aligned custom design", "Responsive on every device", "SEO-ready structure", "Proven with live projects"],
          cta: "View Website Work"
        },
        {
          id: "ecommerce",
          title: "E-Commerce Stores",
          tagline: "From first visit to checkout.",
          text: "Online stores built for smooth browsing, easy ordering, and catalogs that grow with your business.",
          points: ["Conversion-focused product pages", "Smooth checkout journey", "Scalable catalog & orders"],
          cta: "View Store Work"
        },
        {
          id: "dashboards",
          title: "Business Systems & Dashboards",
          tagline: "Your operations, in one clear system.",
          text: "Custom systems and dashboards that connect accounting, inventory, and daily operations with real-time reporting.",
          points: ["Accounting & finance workflows", "Inventory & operations management", "Real-time reports & analytics", "Scales as your business grows"],
          cta: "Request a Demo"
        },
        {
          id: "google-business",
          title: "Google Business Profile",
          tagline: "Be found. Be trusted. Locally.",
          text: "Optimized profiles that improve local discovery and turn searches into calls, directions, and visits.",
          points: ["Accurate, complete profile setup", "Stronger local visibility", "Trust signals that convert"],
          cta: "Improve My Profile"
        },
        {
          id: "linkedin",
          title: "LinkedIn Optimization",
          tagline: "Positioning that opens doors.",
          text: "Professional profile optimization that sharpens your positioning and makes the right opportunities find you.",
          points: ["Clear professional narrative", "Authority-building profile", "Better opportunity visibility"],
          cta: "See a Live Profile"
        },
        {
          id: "ai-assistant",
          title: "AI Website Assistant",
          tagline: "Smart support. 24/7. Always on.",
          text: "We integrate AI assistants into your website to answer questions, qualify leads, and support your customers automatically.",
          points: ["24/7 customer support", "Lead qualification", "Smart, human-like conversations"],
          cta: "Try the Assistant",
          chat: ["Hello! How can I help you today?", "I want a website for my business.", "Great — tell me your goals and I'll guide you."]
        }
      ]
    },
    why: {
      eyebrow: "PREMIUM EXECUTION",
      title: "Why Choose AFAQ Digital",
      items: [
        {
          title: "Premium Digital Presence",
          text: "A refined online presence across your website, Google profile, LinkedIn, and customer touchpoints."
        },
        {
          title: "Business-Focused Execution",
          text: "Every page, section, and button is planned around your goals and customer journey."
        },
        {
          title: "Smart Tools & Dashboards",
          text: "Dashboards and automation help you track work, reduce manual tasks, and make clearer decisions."
        },
        {
          title: "Clear Process & Support",
          text: "From idea to launch, we follow organized steps and stay available for future updates."
        }
      ]
    },
    portfolio: {
      eyebrow: "SELECTED WORK",
      title: "Selected Work & Website Concepts",
      description:
        "A curated selection of live projects and working website demos, clearly labeled so you can explore the work with confidence.",
      items: [
        {
          title: "Zawia Salon",
          statusKey: "live-project",
          status: "Live Project",
          type: "Salon Business Website",
          link: "https://zawianasr.com/",
          image: "/images/portfolio/01-zawia-salon.webp",
          imageAlt: "First viewport screenshot of the Zawia Salon website",
          description:
            "A salon business website with services, booking actions, WhatsApp contact, location details, and a polished local presence.",
          impact: "A conversion-focused salon website with booking, WhatsApp, location, and service access.",
          tags: ["Salon Website", "Booking Flow", "WhatsApp", "Google Maps"],
          button: "Visit Website"
        },
        {
          title: "Muyed Mohammed — Video Editor Portfolio",
          statusKey: "live-project",
          status: "Live Project",
          type: "Creator Portfolio",
          link: "https://www.muyedmohammed.xyz/",
          image: "/images/portfolio/02-muyed-mohammed.webp",
          imageAlt: "First viewport screenshot of the Muyed Mohammed portfolio website",
          description:
            "A cinematic portfolio website for a video editor, presenting creative work, services, personal brand, and direct WhatsApp conversion.",
          impact: "A focused creator portfolio built for stronger presentation and a more professional first impression.",
          tags: ["Creator Portfolio", "Video Editor", "Personal Brand", "WhatsApp"],
          button: "View Portfolio"
        },
        {
          title: "Beauty Pets",
          statusKey: "live-demo",
          status: "Live Demo",
          type: "Pet Business Website",
          link: "https://faragabo04-web.github.io/beauty-pets/",
          image: "/images/portfolio/03-beauty-pets.webp",
          imageAlt: "First viewport screenshot of the Beauty Pets live demo website",
          description:
            "A working pet business website demo for grooming, products, accessories, services, and easy customer contact.",
          tags: ["Pet Business", "Grooming", "Products", "Services"],
          button: "Explore Live Demo"
        },
        {
          title: "VANTÉ NOIR",
          statusKey: "live-demo",
          status: "Live Demo",
          type: "E-Commerce Website",
          link: "https://ahmed-farouk-vante-noir.vercel.app/",
          image: "/images/portfolio/04-vante-noir.webp",
          imageAlt: "First viewport screenshot of the VANTÉ NOIR e-commerce live demo website",
          description:
            "A working e-commerce website demo with luxury styling, strong branding, smooth sections, and premium product presentation.",
          tags: ["E-Commerce", "Luxury Design", "Branding", "Premium UI"],
          button: "Explore Live Demo"
        },
        {
          title: "M&M’s Play Area",
          statusKey: "live-demo",
          status: "Live Demo",
          type: "Play Area Website",
          link: "https://faragabo04-web.github.io/MM-PLAYAREA-PREMIUM/",
          image: "/images/portfolio/05-mm-play-area.webp",
          imageAlt: "First viewport screenshot of the M&M’s Play Area live demo website",
          description:
            "A working play area website demo with gallery, pricing presentation, WhatsApp booking, maps, and clear parent-focused sections.",
          tags: ["Play Area", "Gallery", "Booking", "WhatsApp"],
          button: "Explore Live Demo"
        },
        {
          title: "Cool Grand Restaurant",
          statusKey: "live-demo",
          status: "Live Demo",
          type: "Restaurant Website",
          link: "https://faragabo04-web.github.io/Cool-Grand-restaurant/",
          image: "/images/portfolio/06-cool-grand-restaurant.webp",
          imageAlt: "Hero screenshot of the Cool Grand Restaurant live demo website",
          description:
            "A working restaurant website demo focused on menu presentation, food visuals, WhatsApp ordering, location, and fast customer action.",
          impact: "A restaurant experience designed to make menu browsing and ordering feel clear and direct.",
          tags: ["Restaurant", "Menu", "WhatsApp Orders", "Google Maps"],
          button: "Explore Live Demo"
        }
      ]
    },
    process: {
      title: "A Clear Process from Idea to Launch",
      description:
        "A compact journey that keeps your website, store, or business system focused from the first conversation to launch.",
      steps: [
        {
          number: "01",
          title: "Understand",
          text: "We learn about your business, audience, goals, and the result you need."
        },
        {
          number: "02",
          title: "Plan",
          text: "We organize the structure, content, features, and customer journey before design starts."
        },
        {
          number: "03",
          title: "Design",
          text: "We create a focused visual direction that matches your brand and market."
        },
        {
          number: "04",
          title: "Build",
          text: "We develop, test, optimize, and prepare the experience for real use."
        },
        {
          number: "05",
          title: "Launch & Support",
          text: "We launch carefully and remain available for updates and improvements."
        }
      ]
    },
    packages: {
      eyebrow: "TAILORED SOLUTIONS",
      title: "Choose the Right Solution for Your Business",
      description:
        "Start with the direction that fits your current goals. The final scope, timeline, and quotation are tailored after we understand your business.",
      cta: "Request a Tailored Quote",
      quoteNote:
        "Every business is different. Final scope, timeline, hosting/domain requirements, maintenance, and quotation are confirmed after consultation.",
      items: [
        {
          title: "Website Launch",
          fit: "For businesses that need a professional online presence.",
          text: "A focused launch path for presenting your business clearly and guiding visitors toward enquiry or booking.",
          scope: "Best when your priority is a credible first digital home.",
          includes: [
            "Premium business website",
            "Responsive design",
            "WhatsApp contact",
            "Google Maps or location",
            "Contact or enquiry form",
            "Foundational SEO structure"
          ]
        },
        {
          title: "Online Growth",
          badge: "Growth Focus",
          fit: "For businesses that need stronger presence and customer flow.",
          text: "A broader path for improving how customers discover, understand, and contact your business online.",
          scope: "Best when visibility, presentation, and conversion need to work together.",
          includes: [
            "Website or e-commerce direction",
            "Service or product presentation",
            "Customer conversion structure",
            "Google Business Profile support",
            "LinkedIn presence option",
            "Contact and WhatsApp actions"
          ]
        },
        {
          title: "Smart Business",
          fit: "For businesses that need organization, reporting, or smart tools.",
          text: "A practical systems path for making daily operations clearer, easier to track, and ready to improve over time.",
          scope: "Best when internal workflows need more structure and visibility.",
          includes: [
            "Google Sheets Dashboard",
            "Reports and tracking",
            "Google Apps Script automation",
            "Forms and workflows",
            "AI Website Assistant",
            "Future system improvements"
          ]
        }
      ]
    },    about: {
      title: "About AFAQ Digital",
      subtitle: "Your Digital Partner for Growth",
      copy: [
        "AFAQ Digital is a premium digital agency based in Dubai, helping businesses across the UAE, GCC, and worldwide build a stronger digital presence through websites, online stores, dashboards, and smart digital solutions.",
        "We combine premium design, business thinking, and modern technology to create solutions that look professional, work smoothly, and support real business growth."
      ],
      qualityTitle: "Quality Without Compromise",
      qualityText:
        "We care about every detail — structure, content, performance, and the final experience your customers see and interact with.",
      founder:
        "Founded by Ahmed Farouk, AFAQ Digital brings together business understanding, design taste, and practical digital execution.",
      locations: ["Dubai", "UAE", "GCC", "Worldwide"]
    },
    faq: {
      title: "Questions, Answered.",
      subtitle: "Clear answers before we start.",
      items: [
        {
          question: "How long does a project take?",
          answer: "Most website projects take one to three weeks, depending on scope and content readiness. We confirm the timeline clearly before work begins."
        },
        {
          question: "What do you need from me to start?",
          answer: "We need your business details, goals, service information, brand assets if available, and any examples you like. If something is missing, Team AFAQ can guide you through it."
        },
        {
          question: "Can you work with my existing brand?",
          answer: "Yes. We can build around your current logo, colors, and content, or refine the digital presentation while keeping the brand recognizable."
        },
        {
          question: "Do you provide support after launch?",
          answer: "Yes. We provide post-launch support for technical fixes, updates, and practical improvements based on your project needs."
        },
        {
          question: "How is pricing determined?",
          answer: "Pricing depends on scope, features, content, timeline, and the level of customization required. We review the details first, then prepare a suitable quotation."
        }
      ]
    },
    contact: {
      eyebrow: "CONTACT",
      title: "Let’s Build What’s Next.",
      description:
        "Tell us what you need. Team AFAQ will reply with the right next step.",
      fields: {
        name: "Full Name",
        business: "Business Name",
        whatsapp: "WhatsApp Number",
        service: "Service Needed",
        message: "Message"
      },
      options: [
        "Website",
        "E-Commerce Store",
        "Google Sheets Dashboard",
        "Google Business Profile",
        "LinkedIn Profile",
        "AI Website Assistant",
        "Not Sure Yet"
      ],
      submit: "Start Your Project",
      whatsapp: "Chat on WhatsApp",
      cards: ["WhatsApp", "Google Form", "LinkedIn"],
      linkedinCta: "Connect on LinkedIn",
      success: "Thank you! Your request was sent successfully. We'll get back to you soon — or message us on WhatsApp for the fastest reply.",
      required: "Please complete the highlighted fields.",
      sending: "Sending your details…",
      error: "Something went wrong while sending. Please try again, or contact us directly on WhatsApp."
    },
    assistant: {
      name: "AFAQ Assistant",
      subtitle: "Powered by AFAQ AI",
      welcome: "Hi 👋 I’m AFAQ Digital Assistant. How can I help you today?",
      triggerLabel: "AI Assistant",
      quickActions: ["Explore Services", "Create a New Website", "Improve Existing Website", "Check Pricing", "WhatsApp Contact"],
      responses: [
        "We build websites, online stores, dashboards, Google Business support, LinkedIn optimization, and AI website assistants.",
        "Great. A premium website can help present your services clearly and guide visitors toward WhatsApp or your contact form.",
        "Great. We can review your current website and identify improvements in design, speed, user experience, content structure, contact actions, and professional presentation. Send us your website link and we’ll suggest the best improvement plan.",
        "Pricing depends on your needs and project size. Share your details and AFAQ Digital will prepare a suitable quote.",
        "You can start directly on WhatsApp and share your business needs."
      ],
      inputPlaceholder: "Choose a quick action"
    },
    footer: {
      slogan: "Smart Websites. Wider Horizons. Real Growth.",
      description:
        "AFAQ Digital builds premium websites, online stores, dashboards, automation, and smart digital solutions for growing businesses.",
      location: "Based in Dubai · Serving UAE, GCC & Worldwide",
      quickTitle: "Quick Links",
      links: ["Home", "Services", "Work", "Process", "FAQ", "Contact"],
      servicesTitle: "Our Services",
      services: ["Websites", "E-Commerce", "Dashboards", "Google Business", "LinkedIn", "AI Assistant"],
      contactTitle: "Contact Info",
      brandIdentity: {
        label: "Visual Identity & Brand Materials",
        detail: "Logos · Business Cards · Menus · Brochures · Price Lists"
      },
      contact: {
        whatsapp: "WhatsApp",
        call: "Call",
        linkedin: "LinkedIn",
        linkedinValue: "Connect on LinkedIn",
        instagram: "Instagram",
        facebook: "Facebook",
        comingSoon: "Coming Soon"
      },
      copyright: "© 2026 AFAQ Digital. All rights reserved.",
      credit: "DESIGNED & DEVELOPED BY TEAM AFAQ"
    }
  },
  ar: {
    dir: "rtl",
    langLabel: "English",
    navCta: "ابدأ مشروعك",
    hero: {
      badge: "وكالة رقمية بريميوم",
      headline: "مواقع احترافية تجعل عملك أكثر ثقة وحداثة وجاهزية للنمو.",
      description:
        "تصمم AFAQ Digital وتبني مواقع بريميوم، متاجر، وأنظمة أعمال تساعد العلامات النامية على الظهور بثقة وتحويل الزوار إلى استفسارات حقيقية.",
      primary: "ابدأ مشروعك",
      secondary: "شاهد أعمالنا",
      trust: [
        "متجاوب على كل الأجهزة",
        "أساس جاهز لتحسين الظهور",
        "مثبت بمشاريع منشورة"
      ],
      floatNote: "جاهز للنمو"
    },
    servicesTicker: {
      label: "خدمات AFAQ الأساسية",
      items: [
        "مواقع احترافية",
        "متاجر إلكترونية",
        "لوحات تحكم Google Sheets",
        "الملف التجاري على Google",
        "تحسين LinkedIn",
        "مساعد ذكي للموقع"
      ]
    },
    services: {
      title: "حلول رقمية مصممة لنمو مشروعك",
      description:
        "من المواقع والمتاجر الإلكترونية إلى أنظمة الأعمال والحضور الرقمي، تساعدك AFAQ Digital على الظهور باحتراف، العمل بكفاءة، والوصول لعملاء أكثر.",
      proofBar: {
        kicker: "أعمال ذات صلة",
        showAll: "عرض كل المشاريع",
        back: "العودة إلى الخدمات"
      },
      items: [
        {
          id: "websites",
          title: "مواقع احترافية",
          tagline: "تصميم يبني الثقة، وبناء يحوّل الزوار لعملاء.",
          text: "مواقع أعمال مخصصة تعرض علامتك بوضوح، تعمل بسرعة، وتحوّل الزوار إلى استفسارات حقيقية.",
          points: ["تصميم مخصص يعكس هويتك", "متجاوب على كل الأجهزة", "هيكل جاهز لمحركات البحث", "مشاريع حقيقية منشورة"],
          cta: "شاهد أعمال المواقع"
        },
        {
          id: "ecommerce",
          title: "متاجر إلكترونية",
          tagline: "من أول زيارة حتى إتمام الطلب.",
          text: "متاجر إلكترونية مبنية لتصفح سلس، طلب سهل، وكتالوج ينمو مع مشروعك.",
          points: ["صفحات منتجات تركز على البيع", "رحلة شراء سلسة", "كتالوج وطلبات قابلة للتوسع"],
          cta: "شاهد أعمال المتاجر"
        },
        {
          id: "dashboards",
          title: "أنظمة أعمال وداشبوردات",
          tagline: "عملياتك كلها في نظام واحد واضح.",
          text: "أنظمة وداشبوردات مخصصة تربط الحسابات، المخزون، والعمليات اليومية بتقارير لحظية.",
          points: ["حسابات وتدفقات مالية", "إدارة المخزون والعمليات", "تقارير وتحليلات لحظية", "يتوسع مع نمو مشروعك"],
          cta: "اطلب عرضًا تجريبيًا"
        },
        {
          id: "google-business",
          title: "Google Business Profile",
          tagline: "اظهر محليًا. واكسب الثقة.",
          text: "ملفات محسّنة تقوّي ظهورك المحلي وتحوّل عمليات البحث إلى اتصالات وزيارات.",
          points: ["إعداد ملف دقيق ومكتمل", "ظهور محلي أقوى", "إشارات ثقة تجذب العملاء"],
          cta: "حسّن ملفك الآن"
        },
        {
          id: "linkedin",
          title: "تحسين حساب LinkedIn",
          tagline: "حضور مهني يفتح الفرص.",
          text: "تحسين احترافي لملفك يوضح تموضعك المهني ويجعل الفرص المناسبة تصل إليك.",
          points: ["سرد مهني واضح", "ملف يبني المصداقية", "ظهور أفضل أمام الفرص"],
          cta: "شاهد ملفًا حقيقيًا"
        },
        {
          id: "ai-assistant",
          title: "مساعد ذكي للموقع",
          tagline: "دعم ذكي. على مدار الساعة.",
          text: "ندمج مساعدًا ذكيًا في موقعك يجيب على الأسئلة، يؤهل العملاء المحتملين، ويدعم زوارك تلقائيًا.",
          points: ["دعم للعملاء 24/7", "تأهيل العملاء المحتملين", "محادثات ذكية وطبيعية"],
          cta: "جرّب المساعد",
          chat: ["مرحبًا! كيف أساعدك اليوم؟", "أريد موقعًا لنشاطي التجاري.", "رائع — أخبرني عن هدفك وسأوجهك خطوة بخطوة."]
        }
      ]
    },
    why: {
      eyebrow: "تنفيذ احترافي",
      title: "لماذا تختار AFAQ Digital؟",
      items: [
        {
          title: "حضور رقمي بريميوم",
          text: "حضور رقمي راقٍ عبر موقعك، صفحة Google، LinkedIn، ونقاط تواصل العملاء."
        },
        {
          title: "تنفيذ موجه للأعمال",
          text: "كل صفحة، قسم، وزر يتم بناؤه حول أهداف مشروعك ورحلة العميل."
        },
        {
          title: "أدوات ذكية وداشبوردات",
          text: "داشبوردات وأتمتة تساعدك على متابعة العمل، تقليل المهام اليدوية، واتخاذ قرارات أوضح."
        },
        {
          title: "خطوات واضحة ودعم",
          text: "من الفكرة إلى الإطلاق، نعمل بخطوات منظمة ونبقى متاحين للتحديثات المستقبلية."
        }
      ]
    },
    portfolio: {
      eyebrow: "أعمال مختارة",
      title: "أعمال ونماذج مواقع مختارة",
      description:
        "مجموعة مختارة من المشاريع المباشرة والنماذج الحية، مع توضيح حالة كل مشروع لتصفح الأعمال بثقة ووضوح.",
      items: [
        {
          title: "Zawia Salon",
          statusKey: "live-project",
          status: "مشروع مباشر",
          type: "موقع أعمال لصالون",
          link: "https://zawianasr.com/",
          image: "/images/portfolio/01-zawia-salon.webp",
          imageAlt: "لقطة أول شاشة من موقع Zawia Salon",
          description: "موقع أعمال لصالون يعرض الخدمات، الحجز، واتساب، الموقع، وحضورًا محليًا احترافيًا.",
          impact: "موقع صالون يركز على سهولة الحجز والتواصل عبر واتساب والوصول للخدمات.",
          tags: ["موقع صالون", "حجز", "WhatsApp", "Google Maps"],
          button: "زيارة الموقع"
        },
        {
          title: "بورتفوليو مؤيد محمد — مونتير فيديو",
          statusKey: "live-project",
          status: "مشروع مباشر",
          type: "بورتفوليو لصانع محتوى",
          link: "https://www.muyedmohammed.xyz/",
          image: "/images/portfolio/02-muyed-mohammed.webp",
          imageAlt: "لقطة أول شاشة من موقع بورتفوليو مؤيد محمد",
          description:
            "موقع بورتفوليو سينمائي لمونتير فيديو يعرض الأعمال، الخدمات، الهوية الشخصية، ويوجه الزوار للتواصل عبر واتساب.",
          impact: "بورتفوليو مركز يمنح صانع المحتوى حضورًا أقوى وانطباعًا احترافيًا من أول زيارة.",
          tags: ["بورتفوليو", "Video Editor", "Personal Brand", "WhatsApp"],
          button: "عرض البورتفوليو"
        },
        {
          title: "Beauty Pets",
          statusKey: "live-demo",
          status: "نموذج مباشر",
          type: "موقع أعمال لخدمات الحيوانات الأليفة",
          link: "https://faragabo04-web.github.io/beauty-pets/",
          image: "/images/portfolio/03-beauty-pets.webp",
          imageAlt: "لقطة أول شاشة من نموذج Beauty Pets المباشر",
          description: "نموذج موقع مباشر لخدمات الحيوانات الأليفة يعرض العناية، المنتجات، الإكسسوارات، الخدمات، وطرق تواصل سهلة.",
          tags: ["Pet Business", "Grooming", "Products", "Services"],
          button: "استعراض النموذج"
        },
        {
          title: "VANTÉ NOIR",
          statusKey: "live-demo",
          status: "نموذج مباشر",
          type: "متجر إلكتروني",
          link: "https://ahmed-farouk-vante-noir.vercel.app/",
          image: "/images/portfolio/04-vante-noir.webp",
          imageAlt: "لقطة أول شاشة من نموذج VANTÉ NOIR المباشر للمتجر الإلكتروني",
          description: "نموذج متجر إلكتروني مباشر بتصميم فاخر، هوية قوية، أقسام ناعمة، وعرض منتجات بريميوم.",
          tags: ["E-Commerce", "Luxury Design", "Branding", "Premium UI"],
          button: "استعراض النموذج"
        },
        {
          title: "M&M’s Play Area",
          statusKey: "live-demo",
          status: "نموذج مباشر",
          type: "موقع لمنطقة ألعاب",
          link: "https://faragabo04-web.github.io/MM-PLAYAREA-PREMIUM/",
          image: "/images/portfolio/05-mm-play-area.webp",
          imageAlt: "لقطة أول شاشة من نموذج M&M’s Play Area المباشر",
          description: "نموذج موقع مباشر لمنطقة ألعاب يعرض الصور، الأسعار، الحجز عبر واتساب، خرائط Google، وأقسامًا واضحة للأهالي.",
          tags: ["Play Area", "Gallery", "Booking", "WhatsApp"],
          button: "استعراض النموذج"
        },
        {
          title: "Cool Grand Restaurant",
          statusKey: "live-demo",
          status: "نموذج مباشر",
          type: "موقع مطعم",
          link: "https://faragabo04-web.github.io/Cool-Grand-restaurant/",
          image: "/images/portfolio/06-cool-grand-restaurant.webp",
          imageAlt: "لقطة هيرو من نموذج Cool Grand Restaurant المباشر",
          description: "نموذج موقع مباشر لمطعم يركز على عرض المنيو، صور الطعام، الطلب عبر واتساب، الموقع، وسرعة تفاعل العميل.",
          impact: "تجربة مطعم مصممة لجعل تصفح المنيو والطلب واضحًا ومباشرًا.",
          tags: ["Restaurant", "Menu", "WhatsApp Orders", "Google Maps"],
          button: "استعراض النموذج"
        }
      ]
    },
    process: {
      title: "خطوات واضحة من الفكرة إلى الإطلاق",
      description: "رحلة مختصرة ومنظمة تحافظ على تركيز الموقع أو المتجر أو نظام العمل من أول نقاش حتى الإطلاق.",
      steps: [
        {
          number: "01",
          title: "الفهم",
          text: "نفهم طبيعة عملك، جمهورك، أهدافك، والنتيجة التي تحتاج الوصول إليها."
        },
        {
          number: "02",
          title: "التخطيط",
          text: "ننظم الهيكل، المحتوى، المميزات، ورحلة العميل قبل بدء التصميم."
        },
        {
          number: "03",
          title: "التصميم",
          text: "نصمم اتجاهًا بصريًا مركزًا يناسب علامتك وسوقك."
        },
        {
          number: "04",
          title: "التطوير",
          text: "نطور، نختبر، نحسن، ونجهز التجربة للاستخدام الحقيقي."
        },
        {
          number: "05",
          title: "الإطلاق والدعم",
          text: "نطلق المشروع بعناية ونبقى متاحين للتحديثات والتحسينات."
        }
      ]
    },
    packages: {
      eyebrow: "حلول مخصصة",
      title: "اختر الحل المناسب لعملك",
      description: "ابدأ بالمسار الأقرب لاحتياجاتك الحالية، ثم نحدد النطاق والمدة وعرض السعر بعد فهم طبيعة عملك وأهدافك.",
      cta: "اطلب عرض سعر مخصص",
      quoteNote:
        "كل مشروع له احتياجات مختلفة. يتم تأكيد النطاق والمدة ومتطلبات الاستضافة والدومين والصيانة وعرض السعر بعد الاستشارة.",
      items: [
        {
          title: "Website Launch",
          fit: "للأعمال التي تحتاج إلى حضور إلكتروني احترافي.",
          text: "مسار إطلاق مركز يعرض نشاطك بوضوح ويوجه الزائر نحو الاستفسار أو الحجز.",
          scope: "مناسب عندما تكون الأولوية لبناء واجهة رقمية موثوقة لأول مرة.",
          includes: [
            "موقع أعمال بريميوم",
            "تصميم متجاوب",
            "تواصل عبر واتساب",
            "خرائط Google أو الموقع",
            "نموذج تواصل أو استفسار",
            "هيكل SEO تأسيسي"
          ]
        },
        {
          title: "Online Growth",
          badge: "تركيز على النمو",
          fit: "للأعمال التي تحتاج حضورًا أقوى ورحلة عميل أوضح.",
          text: "مسار أوسع لتحسين طريقة اكتشاف العملاء لعملك وفهم خدماتك والتواصل معك.",
          scope: "مناسب عندما يحتاج الظهور، العرض، والتحويل إلى العمل معًا.",
          includes: [
            "اتجاه موقع أو متجر إلكتروني",
            "عرض الخدمات أو المنتجات",
            "هيكل يركز على تحويل العملاء",
            "دعم Google Business Profile",
            "خيار حضور LinkedIn",
            "أزرار تواصل وواتساب"
          ]
        },
        {
          title: "Smart Business",
          fit: "للأعمال التي تحتاج تنظيمًا، تقارير، أو أدوات ذكية.",
          text: "مسار أنظمة عملي يجعل العمليات اليومية أوضح وأسهل في المتابعة وقابلة للتطوير لاحقًا.",
          scope: "مناسب عندما تحتاج خطوات العمل الداخلية إلى هيكل ورؤية أوضح.",
          includes: [
            "داشبورد Google Sheets",
            "تقارير ومتابعة",
            "أتمتة Google Apps Script",
            "نماذج وخطوات عمل",
            "مساعد ذكي للموقع",
            "تحسينات مستقبلية للنظام"
          ]
        }
      ]
    },    about: {
      title: "من نحن",
      subtitle: "شريكك الرقمي نحو النمو",
      copy: [
        "AFAQ Digital وكالة رقمية بريميوم مقرها دبي، تساعد المشاريع داخل الإمارات، دول الخليج، وحول العالم على بناء حضور رقمي أقوى من خلال المواقع، المتاجر الإلكترونية، الداشبوردات، والحلول الذكية.",
        "نمزج بين التصميم الراقي، التفكير التجاري، والتقنية الحديثة لنقدم حلولًا تظهر باحتراف، تعمل بسلاسة، وتدعم نموًا حقيقيًا للأعمال."
      ],
      qualityTitle: "جودة بلا تنازلات",
      qualityText:
        "نهتم بكل تفصيلة — من الهيكل والمحتوى والأداء إلى التجربة النهائية التي يراها ويتعامل معها عملاؤك.",
      founder:
        "تأسست AFAQ Digital على يد Ahmed Farouk لتجمع بين فهم الأعمال، الذوق التصميمي، والتنفيذ الرقمي العملي.",
      locations: ["Dubai", "UAE", "GCC", "Worldwide"]
    },
    faq: {
      title: "إجابات واضحة قبل أن نبدأ",
      subtitle: "أهم ما تحتاج معرفته قبل بدء مشروعك.",
      items: [
        {
          question: "كم يستغرق تنفيذ المشروع؟",
          answer: "تستغرق معظم مشاريع المواقع من أسبوع إلى ثلاثة أسابيع حسب نطاق العمل وجاهزية المحتوى. نوضح لك الجدول الزمني قبل البدء."
        },
        {
          question: "ماذا تحتاجون مني للبدء؟",
          answer: "نحتاج معلومات نشاطك، أهداف المشروع، تفاصيل الخدمات، وأي عناصر هوية متوفرة مثل الشعار أو الصور. وإذا كان هناك شيء غير جاهز، يساعدك فريق AFAQ في ترتيبه."
        },
        {
          question: "هل يمكنكم العمل على هويتي الحالية؟",
          answer: "نعم. يمكننا البناء على الشعار والألوان والمحتوى الحالي، أو تحسين الظهور الرقمي مع الحفاظ على هوية المشروع."
        },
        {
          question: "هل تقدمون دعمًا بعد الإطلاق؟",
          answer: "نعم. نوفر دعمًا بعد الإطلاق للتعديلات الفنية، التحديثات، والتحسينات العملية حسب احتياج المشروع."
        },
        {
          question: "كيف يتم تحديد السعر؟",
          answer: "يعتمد السعر على نطاق العمل، المزايا المطلوبة، المحتوى، الجدول الزمني، ومستوى التخصيص. نراجع التفاصيل أولًا ثم نجهز عرضًا مناسبًا."
        }
      ]
    },
    contact: {
      eyebrow: "تواصل معنا",
      title: "لنبدأ خطوتك الرقمية القادمة",
      description:
        "أخبرنا بما تحتاجه، وسيتواصل معك فريق AFAQ بالخطوة المناسبة.",
      fields: {
        name: "الاسم",
        business: "اسم النشاط التجاري",
        whatsapp: "رقم واتساب",
        service: "الخدمة المطلوبة",
        message: "رسالتك"
      },
      options: [
        "موقع إلكتروني",
        "متجر إلكتروني",
        "داشبورد Google Sheets",
        "إدارة Google Business Profile",
        "تحسين حساب LinkedIn",
        "مساعد ذكي للموقع",
        "لست متأكدًا بعد"
      ],
      submit: "ابدأ مشروعك",
      whatsapp: "تواصل عبر واتساب",
      cards: ["WhatsApp", "Google Form", "LinkedIn"],
      linkedinCta: "تواصل معنا عبر LinkedIn",
      success: "شكرًا لك! تم إرسال طلبك بنجاح وسنتواصل معك قريبًا — أو راسلنا عبر واتساب للرد الأسرع.",
      required: "من فضلك أكمل الحقول المحددة.",
      sending: "جارٍ إرسال بياناتك…",
      error: "حدث خطأ أثناء الإرسال. حاول مرة أخرى أو تواصل معنا مباشرة عبر واتساب."
    },
    assistant: {
      name: "مساعد AFAQ الذكي",
      subtitle: "مدعوم بـ AFAQ AI",
      welcome: "مرحبًا 👋 أنا مساعد AFAQ Digital الذكي. اختر ما يناسبك وسأساعدك فورًا.",
      triggerLabel: "مساعد ذكي",
      quickActions: ["استكشاف الخدمات", "إنشاء موقع جديد", "تطوير موقع حالي", "معرفة التكلفة", "تواصل واتساب"],
      responses: [
        "نقدم مواقع، متاجر إلكترونية، داشبوردات، دعم Google Business، تحسين LinkedIn، ومساعد ذكي للموقع.",
        "ممتاز. الموقع الاحترافي يساعدك على عرض خدماتك بوضوح وتوجيه الزائر إلى واتساب أو نموذج التواصل.",
        "ممتاز، نقدر نراجع موقعك الحالي ونحدد نقاط التحسين في التصميم، السرعة، تجربة المستخدم، ترتيب المحتوى، أزرار التواصل، والظهور الاحترافي. ابعت لنا رابط الموقع وسنقترح لك خطة تطوير مناسبة.",
        "التكلفة تعتمد على احتياجك وحجم المشروع. شارك التفاصيل وسيتم تجهيز عرض مناسب.",
        "يمكنك البدء مباشرة عبر واتساب وإرسال احتياج مشروعك."
      ],
      inputPlaceholder: "اختر إجراء سريع"
    },
    footer: {
      slogan: "مواقع ذكية. آفاق أوسع. نمو حقيقي.",
      description:
        "تبني AFAQ Digital مواقع احترافية، متاجر إلكترونية، داشبوردات، أتمتة، وحلول رقمية ذكية للمشاريع النامية.",
      location: "مقرنا دبي · نخدم الإمارات، الخليج، والعالم",
      quickTitle: "روابط سريعة",
      links: ["الرئيسية", "الخدمات", "الأعمال", "الخطوات", "الأسئلة", "تواصل معنا"],
      servicesTitle: "خدماتنا",
      services: [
        "مواقع إلكترونية",
        "متاجر إلكترونية",
        "داشبوردات",
        "Google Business",
        "LinkedIn",
        "مساعد ذكي"
      ],
      contactTitle: "معلومات التواصل",
      brandIdentity: {
        label: "هوية بصرية ومواد تسويقية",
        detail: "لوجوهات · كروت عمل · منيوهات · بروشورات · قوائم أسعار"
      },
      contact: {
        whatsapp: "WhatsApp",
        call: "اتصال",
        linkedin: "LinkedIn",
        linkedinValue: "تواصل معنا عبر LinkedIn",
        instagram: "Instagram",
        facebook: "Facebook",
        comingSoon: "قريبًا"
      },
      copyright: "© 2026 AFAQ Digital. جميع الحقوق محفوظة.",
      credit: "DESIGNED & DEVELOPED BY TEAM AFAQ"
    }
  }
};
