export const WHATSAPP_NUMBER = "971504131228";
export const WHATSAPP_URL = "https://wa.me/971504131228";
export const PHONE_DISPLAY = "+971 50 413 1228";
export const PHONE_DISPLAY_LOCAL = "050 413 1228";
export const GOOGLE_FORM_URL = "TODO_ADD_GOOGLE_FORM_URL";
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
      headline: "Premium Websites & Smart Systems for Growing Businesses",
      description:
        "AFAQ Digital builds premium websites, online stores, dashboards, and digital presence solutions that help growing businesses look professional, work smarter, and attract more customers.",
      chips: ["Websites", "E-Commerce", "Dashboards", "Google Business", "LinkedIn", "AI Assistant"],
      location: "Based in Dubai · Serving UAE, GCC & Worldwide",
      primary: "Start Your Project",
      secondary: "WhatsApp Consultation",
      floating: ["Website Ready", "Online Store", "Sales Dashboard", "Google Profile", "AI Assistant"]
    },
    services: {
      title: "Digital Solutions Built for Your Business Growth",
      description:
        "From websites and online stores to dashboards and digital presence, AFAQ Digital helps your business look professional, work smarter, and reach more customers.",
      items: [
        {
          title: "Premium Websites",
          text: "We build elegant business websites that present your services clearly, build trust, and turn visitors into real inquiries."
        },
        {
          title: "E-Commerce Stores",
          text: "We build online stores that help businesses showcase products, receive orders, and sell online smoothly."
        },
        {
          title: "Google Sheets Dashboard",
          text: "We create smart dashboards to track sales, expenses, revenue, performance, and daily business activity in one organized place."
        },
        {
          title: "Google Business Profile Management",
          text: "We improve your Google Business Profile with updated information, photos, services, products, and better local visibility."
        },
        {
          title: "LinkedIn Profile Optimization",
          text: "We improve LinkedIn profiles with a professional headline, about section, skills, experience, and clear personal or business positioning."
        },
        {
          title: "AI Website Assistant",
          text: "We add a smart website assistant that answers common questions, guides visitors, and sends serious customers to WhatsApp or your contact form."
        }
      ]
    },
    why: {
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
      title: "Selected Work & Website Concepts",
      description:
        "A focused collection of live projects and website concepts built for real business needs, clear customer actions, and professional online presence.",
      items: [
        {
          title: "Zawia Salon",
          label: "Live Project",
          link: "https://zawianasr.com/",
          description:
            "Live salon website with services, booking actions, WhatsApp contact, location details, and a professional local business presence.",
          impact: "Helped improve booking flow and supported a reported +30% sales growth.",
          tags: ["Live Website", "Booking Flow", "WhatsApp", "Google Maps", "Local Business", "Sales Growth"],
          button: "View Live Project"
        },
        {
          title: "Cool Grand Restaurant",
          label: "Website Project",
          link: "https://faragabo04-web.github.io/Cool-Grand-restaurant/",
          description:
            "Modern restaurant website focused on menu presentation, food visuals, WhatsApp ordering, Google Maps, and fast customer action.",
          impact: "Made menu browsing and ordering smoother for customers at home.",
          tags: ["Restaurant", "Menu Experience", "WhatsApp Orders", "Google Maps", "Customer Journey"],
          button: "View Project"
        },
        {
          title: "VANTÉ NOIR",
          label: "Premium Creative Website",
          link: "https://ahmed-farouk-vante-noir.vercel.app/",
          description:
            "Premium creative website concept with elegant layout, strong branding, smooth sections, and luxury digital presentation.",
          tags: ["Luxury Design", "Branding", "Portfolio", "Premium UI"],
          button: "View Project"
        },
        {
          title: "M&M’s Play Area",
          label: "Website Concept",
          link: "https://faragabo04-web.github.io/MM-PLAYAREA-PREMIUM/",
          description:
            "Family-focused website concept with pricing, gallery, WhatsApp booking, Google Maps, and clear sections for parents.",
          tags: ["Kids Business", "Gallery", "Pricing", "Booking", "WhatsApp"],
          button: "View Project"
        },
        {
          title: "Beauty Pets",
          label: "Website Concept",
          link: "https://faragabo04-web.github.io/Beauty-Pets/",
          description:
            "Pet shop website concept for grooming, products, accessories, services, and easy customer contact.",
          tags: ["Pet Shop", "Grooming", "Products", "Services", "Local Business"],
          button: "View Project"
        }
      ]
    },
    testimonials: {
      title: "Client Feedback",
      subtitle:
        "Realistic notes from business owners and customers after experiencing smoother digital journeys.",
      trustLine:
        "Feedback-style notes inspired by common business needs: clearer services, easier contact, better structure, and a more professional digital presence.",
      ctaText: "Want your business to be the next success story?",
      ctaButton: "Start Your Project",
      items: [
        {
          label: "Salon Owner · Dubai",
          tag: "Website + WhatsApp Contact",
          icon: "SL",
          text: "The website structure made it easier for customers to understand our services and contact us directly."
        },
        {
          label: "Restaurant Manager · UAE",
          tag: "Menu / Ordering Flow",
          icon: "RT",
          text: "The menu and contact flow felt clearer. Customers could browse options and reach us with less confusion."
        },
        {
          label: "Small Business Owner · Dubai",
          tag: "Premium Business Presence",
          icon: "SM",
          text: "The layout helped our business look more organized and professional, while keeping the message simple."
        },
        {
          label: "E-Commerce Founder · GCC",
          tag: "E-Commerce Experience",
          icon: "EC",
          text: "The structure focused on what customers need to see before they ask, order, or contact us."
        },
        {
          label: "Startup Founder · Dubai",
          tag: "Startup Website Launch",
          icon: "ST",
          text: "The process felt organized from the first call. Every section had a clear purpose for the launch."
        },
        {
          label: "Retail Business Owner · UAE",
          tag: "Google / WhatsApp Presence",
          icon: "GB",
          text: "The digital presence felt more trustworthy, especially with clearer services, Google details, and WhatsApp actions."
        },
        {
          label: "Operations Manager · GCC",
          tag: "Dashboard Concept",
          icon: "BI",
          text: "The dashboard concept made our numbers easier to follow in one clear place instead of scattered files."
        },
        {
          label: "Local Service Provider · Dubai",
          tag: "Service Business Website",
          icon: "LS",
          text: "The final layout felt clean and practical. It helped present the service without making the page feel heavy."
        }
      ]
    },
    process: {
      title: "A Clear Process from Idea to Launch",
      description:
        "We keep every project organized with clear steps, smooth communication, and focused execution.",
      steps: [
        {
          number: "01",
          title: "Understand",
          text: "We start by understanding your business, goals, services, audience, and what your customers need to see."
        },
        {
          number: "02",
          title: "Plan",
          text: "We organize the website structure, sections, content flow, features, and customer journey before design starts."
        },
        {
          number: "03",
          title: "Design",
          text: "We create a premium visual direction that matches your brand and makes the experience clear and attractive."
        },
        {
          number: "04",
          title: "Build",
          text: "We develop the website, store, dashboard, or system with clean structure, responsive layout, and required integrations."
        },
        {
          number: "05",
          title: "Launch & Support",
          text: "We review, refine, launch, and stay available for updates, improvements, and future growth."
        }
      ]
    },
    packages: {
      title: "Choose the Right Solution for Your Business",
      description:
        "Start with a website, grow with better visibility, or organize your business with smart dashboards and automation.",
      cta: "Request This Package",
      addons: "AI Assistant · LinkedIn · Google Business Profile · Future Updates",
      items: [
        {
          title: "Website Launch",
          text: "A clean, premium website for businesses that need a professional online presence.",
          includes: ["Premium website", "Responsive design", "WhatsApp contact", "Google Maps", "Contact form", "Basic SEO structure"]
        },
        {
          title: "Online Growth",
          text: "A stronger solution for businesses that need a website, online store, Google presence, and customer-focused structure.",
          includes: [
            "Website or e-commerce store",
            "Product/service showcase",
            "WhatsApp & contact actions",
            "Google Business Profile support",
            "LinkedIn profile option",
            "Customer-focused structure"
          ]
        },
        {
          title: "Smart Business",
          text: "Dashboards, automation, reports, and smart assistants to help your business work more efficiently.",
          includes: [
            "Google Sheets Dashboard",
            "Reports & tracking",
            "Google Apps Script automation",
            "AI Website Assistant",
            "Forms and workflows",
            "Future improvements"
          ]
        }
      ]
    },
    about: {
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
      title: "Frequently Asked Questions",
      subtitle: "Questions you may have before starting your project",
      items: [
        {
          question: "How long does a project take?",
          answer:
            "It depends on the project size and type, but most websites take one to three weeks. We define a clear timeline before starting."
        },
        {
          question: "How much do your services cost?",
          answer:
            "Cost depends on your needs and project size. Contact us to receive a suitable quote tailored to your project."
        },
        {
          question: "Do you provide support after delivery?",
          answer: "Yes, we provide technical support and updates after launch to keep your project running smoothly."
        },
        {
          question: "Can you build a website or online store?",
          answer:
            "Yes, we build professional websites and online stores that help you showcase services or products, receive orders easily, and attract more customers."
        },
        {
          question: "Do you work with clients outside Dubai or the UAE?",
          answer:
            "Yes, AFAQ Digital is based in Dubai, and we serve clients across the UAE, GCC, and worldwide remotely through clear communication and organized steps."
        },
        {
          question: "Do you manage Google Business Profile and LinkedIn?",
          answer:
            "Yes, we improve Google Business Profile and LinkedIn through updated information, photos, services, descriptions, and professional positioning to build trust and attract customers."
        },
        {
          question: "Will I own the project after delivery?",
          answer:
            "Yes, after final delivery, the project files and usage rights belong to you, and you can use or transfer them as needed."
        }
      ]
    },
    contact: {
      title: "Turn Your Idea Into a Real Digital Experience",
      description:
        "Tell us about your business, and we’ll help you build the right solution — a website, online store, dashboard, or smart system that supports your growth.",
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
      success: "Thanks. Your details are ready. Please use WhatsApp for the fastest reply.",
      required: "Please complete the highlighted fields."
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
        instagram: "Instagram",
        facebook: "Facebook",
        comingSoon: "Coming Soon"
      },
      copyright: "© 2026 AFAQ Digital. All rights reserved.",
      credit: "DESIGNED & DEVELOPED BY AHMED FAROUK"
    }
  },
  ar: {
    dir: "rtl",
    langLabel: "English",
    navCta: "ابدأ مشروعك",
    hero: {
      badge: "وكالة رقمية بريميوم",
      headline: "مواقع احترافية وأنظمة ذكية لنمو مشروعك",
      description:
        "تبني AFAQ Digital مواقع احترافية، متاجر إلكترونية، داشبوردات، وحلول حضور رقمي تساعد المشاريع على الظهور باحتراف، العمل بكفاءة، وجذب عملاء أكثر.",
      chips: ["مواقع إلكترونية", "متاجر إلكترونية", "داشبوردات", "Google Business", "LinkedIn", "مساعد ذكي"],
      location: "مقرنا دبي · نخدم الإمارات، الخليج، والعالم",
      primary: "ابدأ مشروعك",
      secondary: "استشارة عبر واتساب",
      floating: ["موقع جاهز", "متجر إلكتروني", "داشبورد مبيعات", "صفحة Google", "مساعد ذكي"]
    },
    services: {
      title: "حلول رقمية مصممة لنمو مشروعك",
      description:
        "من المواقع والمتاجر الإلكترونية إلى الداشبوردات والحضور الرقمي، تساعدك AFAQ Digital على الظهور باحتراف، العمل بكفاءة، والوصول لعملاء أكثر.",
      items: [
        {
          title: "مواقع احترافية",
          text: "نصمم ونطوّر مواقع راقية تعرض خدماتك بوضوح، تبني الثقة، وتحول الزوار إلى عملاء محتملين."
        },
        {
          title: "متاجر إلكترونية",
          text: "نصمم ونطوّر متاجر إلكترونية تساعد الشركات على عرض منتجاتها، استقبال الطلبات، والبيع أونلاين بسهولة واحترافية."
        },
        {
          title: "داشبورد Google Sheets",
          text: "ننشئ داشبوردات ذكية لمتابعة المبيعات، المصروفات، الإيرادات، الأداء، وحركة العمل اليومية في مكان واحد منظم."
        },
        {
          title: "إدارة Google Business Profile",
          text: "نحسّن صفحة نشاطك على Google من خلال تحديث البيانات، رفع الصور، إضافة الخدمات والمنتجات، وتحسين ظهورك المحلي للعملاء."
        },
        {
          title: "تحسين حساب LinkedIn",
          text: "نحسّن حساب LinkedIn من حيث العنوان، النبذة، المهارات، الخبرات، وطريقة عرضك المهني أو التجاري بشكل أكثر ثقة."
        },
        {
          title: "مساعد ذكي للموقع",
          text: "نضيف مساعدًا ذكيًا يرد على الأسئلة الشائعة، يوجه الزائر، ويرسل العملاء الجادين إلى واتساب أو نموذج التواصل."
        }
      ]
    },
    why: {
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
      title: "أعمال ونماذج مواقع مختارة",
      description:
        "مجموعة مختارة من المشاريع المنشورة ونماذج المواقع المصممة لاحتياجات أعمال حقيقية وتجربة عميل واضحة.",
      items: [
        {
          title: "Zawia Salon",
          label: "مشروع منشور",
          link: "https://zawianasr.com/",
          description: "موقع صالون منشور يعرض الخدمات، الحجز، واتساب، الموقع، وحضورًا محليًا احترافيًا.",
          impact: "ساهم في تنظيم الحجز ودعم نمو المبيعات بنسبة مذكورة +30%.",
          tags: ["Live Website", "Booking Flow", "WhatsApp", "Google Maps", "Local Business", "Sales Growth"],
          button: "عرض المشروع"
        },
        {
          title: "Cool Grand Restaurant",
          label: "مشروع موقع",
          link: "https://faragabo04-web.github.io/Cool-Grand-restaurant/",
          description: "موقع مطعم حديث يركز على عرض المنيو، الصور، الطلب عبر واتساب، خرائط Google، وسرعة تفاعل العميل.",
          impact: "جعل تصفح المنيو والطلب من المنزل أسهل وأكثر سلاسة.",
          tags: ["Restaurant", "Menu Experience", "WhatsApp Orders", "Google Maps", "Customer Journey"],
          button: "عرض المشروع"
        },
        {
          title: "VANTÉ NOIR",
          label: "موقع إبداعي بريميوم",
          link: "https://ahmed-farouk-vante-noir.vercel.app/",
          description: "موقع إبداعي بريميوم بتصميم فاخر، هوية قوية، أقسام ناعمة، وتجربة رقمية راقية.",
          tags: ["Luxury Design", "Branding", "Portfolio", "Premium UI"],
          button: "عرض المشروع"
        },
        {
          title: "M&M’s Play Area",
          label: "نموذج موقع",
          link: "https://faragabo04-web.github.io/MM-PLAYAREA-PREMIUM/",
          description: "نموذج موقع موجه للعائلات يعرض الأسعار، الصور، الحجز عبر واتساب، خرائط Google، ومعلومات واضحة للآباء.",
          tags: ["Kids Business", "Gallery", "Pricing", "Booking", "WhatsApp"],
          button: "عرض المشروع"
        },
        {
          title: "Beauty Pets",
          label: "نموذج موقع",
          link: "https://faragabo04-web.github.io/Beauty-Pets/",
          description: "نموذج موقع لمحل حيوانات أليفة يعرض العناية، المنتجات، الإكسسوارات، الخدمات، وطرق تواصل سهلة.",
          tags: ["Pet Shop", "Grooming", "Products", "Services", "Local Business"],
          button: "عرض المشروع"
        }
      ]
    },
    testimonials: {
      title: "آراء العملاء",
      subtitle: "ملاحظات واقعية من أصحاب أعمال وعملاء بعد تجربة رقمية أسهل وأكثر وضوحًا.",
      trustLine:
        "ملاحظات بأسلوب واقعي مستوحاة من احتياجات شائعة لأصحاب الأعمال: وضوح الخدمات، سهولة التواصل، ترتيب المحتوى، وحضور رقمي أكثر احترافية.",
      ctaText: "هل تريد أن يكون مشروعك قصة النجاح القادمة؟",
      ctaButton: "ابدأ مشروعك",
      items: [
        {
          label: "صاحب صالون · دبي",
          tag: "موقع + تواصل واتساب",
          icon: "SL",
          text: "ترتيب الموقع سهّل على العملاء فهم خدماتنا والتواصل معنا مباشرة."
        },
        {
          label: "مدير مطعم · الإمارات",
          tag: "منيو / مسار طلب",
          icon: "RT",
          text: "عرض المنيو وخطوات التواصل أصبحوا أوضح، والعميل يقدر يوصل للاختيار المناسب بسهولة."
        },
        {
          label: "صاحب مشروع صغير · دبي",
          tag: "حضور أعمال احترافي",
          icon: "SM",
          text: "التصميم أعطى المشروع شكلًا أكثر تنظيمًا واحترافية، مع رسالة واضحة وبسيطة."
        },
        {
          label: "مؤسس متجر إلكتروني · الخليج",
          tag: "تجربة متجر إلكتروني",
          icon: "EC",
          text: "هيكل الموقع ركّز على ما يحتاج العميل رؤيته قبل السؤال، الطلب، أو التواصل."
        },
        {
          label: "مؤسس شركة ناشئة · دبي",
          tag: "إطلاق موقع ناشئ",
          icon: "ST",
          text: "طريقة العمل كانت منظمة من البداية، وكل قسم في الموقع كان له هدف واضح يخدم الإطلاق."
        },
        {
          label: "صاحب نشاط تجاري · الإمارات",
          tag: "حضور Google / واتساب",
          icon: "GB",
          text: "الحضور الرقمي أصبح أكثر ثقة، خصوصًا مع وضوح الخدمات، بيانات Google، وأزرار واتساب."
        },
        {
          label: "مدير عمليات · الخليج",
          tag: "فكرة لوحة تحكم",
          icon: "BI",
          text: "فكرة لوحة التحكم ساعدتنا نتابع الأرقام بشكل أوضح في مكان واحد بدل ملفات متفرقة."
        },
        {
          label: "مقدم خدمة محلي · دبي",
          tag: "موقع خدمات محلية",
          icon: "LS",
          text: "الشكل النهائي كان واضحًا وعمليًا، وساعدنا نعرض الخدمة بدون أن تكون الصفحة مزدحمة."
        }
      ]
    },
    process: {
      title: "خطوات واضحة من الفكرة إلى الإطلاق",
      description: "نحافظ على تنظيم كل مشروع من خلال خطوات واضحة، تواصل سلس، وتنفيذ مركز على الهدف.",
      steps: [
        {
          number: "01",
          title: "الفهم",
          text: "نبدأ بفهم نشاطك، أهدافك، خدماتك، جمهورك، وما يحتاج عملاؤك إلى رؤيته."
        },
        {
          number: "02",
          title: "التخطيط",
          text: "ننظم هيكل الموقع، الأقسام، تدفق المحتوى، المميزات، ورحلة العميل قبل بدء التصميم."
        },
        {
          number: "03",
          title: "التصميم",
          text: "نصمم اتجاهًا بصريًا راقيًا يناسب علامتك ويجعل التجربة واضحة وجذابة."
        },
        {
          number: "04",
          title: "التطوير",
          text: "نطوّر الموقع، المتجر، الداشبورد، أو النظام بهيكل نظيف، تصميم متجاوب، وربط تقني مناسب."
        },
        {
          number: "05",
          title: "الإطلاق والدعم",
          text: "نراجع، نحسن، نطلق المشروع، ونبقى متاحين للتحديثات والتحسينات المستقبلية."
        }
      ]
    },
    packages: {
      title: "اختر الحل المناسب لمشروعك",
      description: "ابدأ بموقع احترافي، طوّر ظهورك الرقمي، أو نظّم عملك من خلال داشبوردات وأتمتة ذكية.",
      cta: "اطلب هذه الباقة",
      addons: "مساعد ذكي · LinkedIn · Google Business Profile · تحديثات مستقبلية",
      items: [
        {
          title: "Website Launch",
          text: "موقع احترافي للمشاريع التي تحتاج إلى حضور إلكتروني واضح وموثوق.",
          includes: ["موقع بريميوم", "تصميم متجاوب", "ربط واتساب", "خرائط Google", "نموذج تواصل", "هيكل SEO أساسي"]
        },
        {
          title: "Online Growth",
          text: "حل أقوى للمشاريع التي تحتاج إلى موقع، متجر إلكتروني، ظهور على Google، وتجربة موجهة للعملاء.",
          includes: [
            "موقع أو متجر إلكتروني",
            "عرض المنتجات أو الخدمات",
            "أزرار واتساب وتواصل",
            "دعم Google Business Profile",
            "خيار تحسين LinkedIn",
            "هيكل موجه للعملاء"
          ]
        },
        {
          title: "Smart Business",
          text: "داشبوردات، أتمتة، تقارير، ومساعد ذكي يساعد مشروعك على العمل بكفاءة أكبر.",
          includes: [
            "داشبورد Google Sheets",
            "تقارير ومتابعة",
            "أتمتة Google Apps Script",
            "مساعد ذكي للموقع",
            "نماذج وخطوات عمل",
            "تحسينات مستقبلية"
          ]
        }
      ]
    },
    about: {
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
      title: "الأسئلة الشائعة",
      subtitle: "أسئلة قد تدور في ذهنك قبل بدء مشروعك",
      items: [
        {
          question: "كم يستغرق تنفيذ المشروع؟",
          answer: "يعتمد على حجم ونوع المشروع، لكن معظم المواقع تستغرق من أسبوع إلى ثلاثة أسابيع. نحدّد لك جدولًا زمنيًا واضحًا قبل البدء."
        },
        {
          question: "ما تكلفة الخدمات؟",
          answer: "تختلف حسب احتياجك وحجم المشروع. تواصل معنا للحصول على عرض سعر مناسب ومخصّص لمشروعك."
        },
        {
          question: "هل تقدّمون دعمًا بعد التسليم؟",
          answer: "نعم، نوفّر دعمًا فنيًا وتحديثات بعد الإطلاق لضمان عمل مشروعك بسلاسة."
        },
        {
          question: "هل يمكن تنفيذ موقع أو متجر إلكتروني؟",
          answer: "نعم، ننفّذ مواقع احترافية ومتاجر إلكترونية تساعدك على عرض خدماتك أو منتجاتك، استقبال الطلبات بسهولة، وجذب عملاء أكثر."
        },
        {
          question: "هل تعملون مع عملاء خارج دبي أو الإمارات؟",
          answer: "نعم، مقر AFAQ Digital في دبي، ونخدم العملاء داخل الإمارات وخارجها عن بُعد من خلال تواصل واضح وخطوات عمل منظمة."
        },
        {
          question: "هل تديرون Google Business Profile وLinkedIn؟",
          answer: "نعم، نحسّن صفحة Google Business Profile وحساب LinkedIn من حيث البيانات، الصور، الخدمات، الوصف، وطريقة الظهور لزيادة الثقة وجذب العملاء."
        },
        {
          question: "هل أملك حقوق المشروع بعد التسليم؟",
          answer: "نعم، بعد التسليم النهائي تكون ملفات المشروع وحقوق الاستخدام ملكك بالكامل، ويمكنك استخدامها أو نقلها حسب احتياجك."
        }
      ]
    },
    contact: {
      title: "حوّل فكرتك إلى تجربة رقمية حقيقية",
      description:
        "أخبرنا عن مشروعك، وسنساعدك في بناء الحل المناسب: موقع، متجر إلكتروني، داشبورد، أو نظام ذكي يدعم نمو عملك.",
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
      success: "تم تجهيز بياناتك. استخدم واتساب للحصول على أسرع رد.",
      required: "من فضلك أكمل الحقول المحددة."
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
        instagram: "Instagram",
        facebook: "Facebook",
        comingSoon: "قريبًا"
      },
      copyright: "© 2026 AFAQ Digital. جميع الحقوق محفوظة.",
      credit: "DESIGNED & DEVELOPED BY AHMED FAROUK"
    }
  }
};
