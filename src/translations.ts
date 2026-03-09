export type Language = 'en' | 'ru' | 'uz';

export const translations = {
  en: {
    nav: {
      home: "Home",
      signUp: "Sign Up",
      platform: "Platform",
      solutions: "Solutions",
      pricing: "Pricing",
      resources: "Resources",
      login: "Log in",
      getStarted: "Get Started"
    },
    ticket: {
      tag: "Support",
      title: "Log a",
      titleAccent: "Ticket",
      subtitle: "Need assistance? Our support team is here to help you with any technical or account-related issues.",
      steps: {
        category: "Category",
        details: "Details",
        priority: "Priority",
        review: "Review"
      },
      fields: {
        type: "Issue Type",
        subject: "Subject",
        description: "Description",
        urgency: "Urgency",
        impact: "Impact"
      },
      placeholders: {
        subject: "Briefly describe the issue",
        description: "Provide as much detail as possible..."
      },
      submit: "Submit Ticket",
      success: "Ticket Submitted Successfully",
      successDesc: "Our team will review your request and get back to you shortly."
    },
    hero: {
      title: "Find the Best",
      titleAccent: "IT Talent Globally",
      subtitle: "Connect with verified engineers from 92+ countries. Build your dream team in days, not months.",
      ctaPrimary: "Start Hiring",
      ctaSecondary: "Watch Demo"
    },
    trusted: "Trusted by industry leaders",
    stats: {
      tag: "By The Numbers",
      title: "Powering",
      titleAccent: "enterprise scale",
      subtitle: "Join the world's fastest-growing companies that trust DeskNet to fulfill their IT talent needs",
      verified: "Verified Engineers",
      verifiedSub: "Pre-vetted Engineers Ready to Work",
      partners: "Partner Companies",
      partnersSub: "Trusted Partner Companies",
      matchTime: "avg. match time",
      matchTimeSub: "AI-Powered Instant Matching",
      satisfaction: "Customer satisfaction",
      satisfactionSub: "Client Happiness Score"
    },
    metrics: {
      matchTime: "Time to First Match",
      industryAvg: "vs. Industry avg",
      faster: "6x faster",
      tag: "Real Results",
      title: "Metrics",
      titleAccent: "That Matter",
      subtitle: "Our clients see measurable improvements in hiring speed, cost efficiency, and talent quality from day one.",
      reduction: "Reduction in hiring costs",
      productivity: "Faster time to productivity",
      renewal: "Average contract renewal rate"
    },
    capabilities: {
      tag: "Platform Capabilities",
      title: "Built",
      titleAccent: "for Enterprise Scale",
      subtitle: "A comprehensive platform built for the world's most demanding organizations.",
      ai: "AI-Powered Matching",
      aiDesc: "Our proprietary algorithm matches your requirements with pre-vetted talent in under 48 hours.",
      security: "Enterprise Security",
      securityDesc: "SOC 2 Type II certified. Bank-grade encryption. Full compliance with GDPR, HIPAA, and more.",
      network: "Global Talent Network",
      networkDesc: "Access verified engineers across 92+ countries, all time zones covered, 24/7 support.",
      modular: "Modular Platform",
      modularDesc: "Pick and choose the services you need. Scale up or down instantly based on demand."
    },
    cta: {
      title: "Ready to Transform",
      titleAccent: "Your IT Hiring?",
      subtitle: "Join 35+ companies using DeskNet to build world-class engineering teams. Get started in minutes, not months.",
      primary: "Start Free Trial",
      secondary: "Talk to Sales"
    },
    footer: {
      desc: "Global platform connecting innovative companies with verified IT talent from 92+ countries.",
      product: "Product",
      company: "Company",
      legal: "Legal",
      rights: "All Rights Reserved"
    },
    about: {
      tag: "About Us",
      heroTitle: "Connecting exceptional tech talent with innovative companies",
      heroDesc: "DeskNet is the infrastructure layer for global technical talent. We bridge the gap between the best engineers and forward-thinking companies.",
      missionTag: "Our Mission",
      missionTitle: "Transform how companies find talent and how engineers find opportunities",
      missionDesc: "DeskNet is the infrastructure layer for global technical talent. We bridge the gap between the best engineers and forward-thinking companies.",
      rigorousVetting: "Rigorous Vetting",
      valuesTag: "Core Values",
      valuesTitle: "What drives us forward",
      valuesSubtitle: "Our core principles guide every decision and every feature.",
      values: {
        transparency: {
          title: "Transparency",
          desc: "Honest communication and clear terms for all parties. No hidden fees, no surprises—just straightforward collaboration."
        },
        quality: {
          title: "Quality First",
          desc: "We work only with verified engineers and serious companies committed to excellence."
        },
        compensation: {
          title: "Fair Compensation",
          desc: "Engineers deserve competitive rates. We ensure every opportunity values technical expertise."
        },
        speed: {
          title: "Speed & Efficiency",
          desc: "Time matters in tech. Our process connects talent with opportunities in days, not months."
        },
        community: {
          title: "Community Driven",
          desc: "We're not just building a platform—we're creating a community of technologists and innovators."
        },
        innovation: {
          title: "Continuous Innovation",
          desc: "Technology evolves, and we evolve with it. We continuously improve the platform."
        }
      },
      howItWorksTitle: "How DeskNet Works",
      howItWorksSubtitle: "A streamlined process that benefits both engineers and companies.",
      forEngineers: "For Engineers",
      forCompanies: "For Companies",
      steps: {
        engineers: [
          { title: "Create Your Profile", desc: "Showcase your skills, experience and expected rate in minutes." },
          { title: "Get Verified", desc: "Our team verifies your profile to ensure quality matches." },
          { title: "Connect With Companies", desc: "Get opportunities that match your skills and preferences." }
        ],
        companies: [
          { title: "Post Your Requirements", desc: "Define the skills, experience and project details you need." },
          { title: "Review Matched Engineers", desc: "Review verified engineers perfectly matched to your criteria." },
          { title: "Start Building", desc: "Connect directly and start working with your new team member." }
        ]
      },
      ctaTitle: "Ready to join the network?",
      ctaSubtitle: "Start your journey today and connect with the best tech professionals and companies.",
      getStarted: "Get Started",
      learnMore: "Learn More"
    },
    testimonials: {
      tag: "Testimonials",
      title: "Trusted by",
      titleAccent: "the best",
      subtitle: "Hear from the engineering leaders and developers who are building the future on DeskNet.",
      items: [
        {
          quote: "DeskNet has completely transformed our hiring process. We found a Senior Architect in 48 hours who has been a game-changer for our infrastructure.",
          author: "James Wilson",
          role: "CTO at TechFlow",
          avatar: "https://picsum.photos/seed/james/100/100"
        },
        {
          quote: "As an engineer, DeskNet gives me the freedom to work on world-class projects with fair compensation and full transparency. It's the platform I've been waiting for.",
          author: "Elena Rodriguez",
          role: "Senior Full Stack Engineer",
          avatar: "https://picsum.photos/seed/elena/100/100"
        },
        {
          quote: "The quality of talent on DeskNet is unparalleled. Their vetting process is rigorous, ensuring we only interview the top 1% of global talent.",
          author: "Marcus Chen",
          role: "VP of Engineering at CloudScale",
          avatar: "https://picsum.photos/seed/marcus/100/100"
        }
      ]
    },
    login: {
      title: "Welcome Back",
      subtitle: "Choose your account type to continue",
      engineer: "Engineer",
      engineerDesc: "Find your next big opportunity",
      client: "Client",
      clientDesc: "Hire world-class engineering talent",
      admin: "Administrator",
      adminDesc: "Manage the DeskNet platform",
      email: "Email Address",
      password: "Password",
      signIn: "Sign In",
      signInAsAdmin: "Sign In as Admin",
      signInAsEngineer: "Sign In as Engineer",
      signInAsClient: "Sign In as Client",
      forgotPassword: "Forgot Password?",
      noAccount: "Don't have an account?",
      signUp: "Sign Up",
      back: "Back to selection"
    },
    signup: {
      title: "Join DeskNet",
      subtitle: "Choose your account type to get started",
      engineer: "Engineer",
      engineerDesc: "Join our network of elite engineers",
      client: "Client",
      clientDesc: "Hire verified engineering talent",
      fullName: "Full Name",
      email: "Email Address",
      password: "Password",
      companyName: "Company Name",
      firstName: "First Name",
      lastName: "Last Name",
      companyEmail: "Company Email",
      companySize: "Number of People in Company",
      createAccount: "Create Account",
      hasAccount: "Already have an account?",
      signIn: "Sign In",
      back: "Back to selection",
      continue: "Continue",
      complete: "Complete Registration",
      steps: {
        account: "Account",
        personal: "Personal",
        professional: "Professional",
        rates: "Rates",
        assets: "Assets"
      },
      fields: {
        dob: "Date of Birth",
        day: "Day",
        month: "Month",
        year: "Year",
        country: "Country",
        city: "City",
        specialization: "Main IT Specialization",
        experience: "Years of Experience",
        skills: "Skills (comma separated)",
        hourlyRate: "Hourly Rate ($)",
        halfDayRate: "Half-day Rate ($)",
        fullDayRate: "Full-day Rate ($)",
        languages: "Languages",
        contactInfo: "Contact Information",
        phoneNumber: "Phone Number",
        whatsappNumber: "WhatsApp Number",
        cvUpload: "Upload CV (PDF)",
        profilePic: "Profile Picture"
      },
      onboarding: {
        step1: { title: "Date of Birth", desc: "Please provide your date of birth." },
        step2: { title: "Location", desc: "Where are you currently residing?" },
        step3: { title: "Specialization", desc: "What is your primary area of technical expertise?" },
        step4: { title: "Experience", desc: "How many years have you been working in this field?" },
        step5: { title: "Skills", desc: "List your core technical skills and tools." },
        step6: { title: "Rates", desc: "Set your expected rates for different engagement types." },
        step7: { title: "Languages", desc: "What languages do you speak and at what level?" },
        step8: { title: "Contact Info", desc: "How can companies reach out to you directly?" },
        step9: { title: "CV Upload", desc: "Upload your latest CV or resume in PDF format." },
        step10: { title: "Profile Picture", desc: "Add a professional photo to your profile." },
        proficiencyLevels: {
          a1: "A1 - Beginner",
          a2: "A2 - Elementary",
          b1: "B1 - Intermediate",
          b2: "B2 - Upper Intermediate",
          c1: "C1 - Advanced",
          c2: "C2 - Proficient"
        },
        placeholders: {
          searchCountry: "Search country...",
          searchCity: "Search city...",
          selectCountryFirst: "Select country first",
          selectSpecializations: "Select specializations...",
          searchSkills: "Search and add skills...",
          usdPerHour: "USD per hour",
          usdHalfDay: "USD for 4 hours",
          usdFullDay: "USD for 8 hours",
          selectLanguage: "Select Language",
          selectLevel: "Level",
          phoneNumber: "Phone number",
          whatsappNumber: "WhatsApp number",
          uploadCV: "Upload your CV",
          cvFormat: "PDF format preferred, max 5MB",
          confirmCV: "Confirm CV",
          cvConfirmed: "CV Confirmed",
          yearsExperience: "Years of experience",
          countryCode: "Code",
          profilePicTitle: "Profile Picture",
          profilePicDesc: "Help companies recognize you. Square images work best.",
          choosePhoto: "Choose Photo",
          confirmPhoto: "Confirm Photo",
          photoConfirmed: "Photo Confirmed",
          change: "Change",
          cancel: "Cancel",
          back: "Back",
          completeReg: "Complete Registration",
          continue: "Continue"
        }
      }
    },
    why: {
      tag: "Why DeskNet",
      heroTitle: "Why",
      heroTitleAccent: "DeskNet?",
      heroSubtitle: "Everything you need to build exceptional engineering teams",
      stats: {
        engineers: "Verified Engineers",
        countries: "Countries",
        success: "Success Rate"
      },
      watchDemo: "Watch how it works",
      benefitsTag: "benefits",
      benefitsTitle: "Everything you need to",
      benefitsTitleAccent: "succeed",
      benefitsSubtitle: "Comprehensive features designed for both engineers and companies",
      benefits: [
        { title: "Vetted Talent Pool", desc: "Every engineer on our platform is carefully vetted and verified." },
        { title: "Fair Compensation", desc: "Engineers set their own rates with full transparency." },
        { title: "Secure Payments", desc: "Our escrow system protects both parties." },
        { title: "24/7 Support", desc: "Our dedicated support team is always available." },
        { title: "Fast Matching", desc: "Our intelligent algorithm quickly connects you." },
        { title: "Global Network", desc: "Access talent from around the world." }
      ],
      verificationTag: "Verification Process",
      verificationTitle: "Every engineer,",
      verificationTitleAccent: "Thoroughly verified",
      verificationSubtitle: "Our rigorous verification process ensures you work only with top-tier professionals. Background checks, skill assessments and real-time verification.",
      verificationList: [
        "Technical Skills Assessment",
        "Background Verification",
        "Certification Check",
        "Portfolio Review"
      ],
      comparisonTag: "Comparison",
      comparisonTitle: "DeskNet vs",
      comparisonTitleAccent: "the rest",
      comparisonSubtitle: "Learn why leading companies choose DeskNet over traditional platforms",
      comparison: {
        header: ["Feature", "DeskNet", "Others"],
        rows: [
          ["Talent Verification", "Check", "Limited"],
          ["Transparent Pricing", "Check", "Hidden fees"],
          ["Escrow Protection", "Check", "Varies"],
          ["AI-Powered Matching", "Check", "Manual"],
          ["Global Reach", "92+ Countries", "Regional"],
          ["Support Response", "< 2 hours", "24-48 hours"]
        ]
      },
      networkTitle: "Truly",
      networkTitleAccent: "Global Network",
      networkSubtitle: "Access top-tier IT talent from 92+ countries with experience across all major tech stacks.",
      networkStats: [
        { label: "Engineers", value: "3.5K+" },
        { label: "Companies", value: "35+" },
        { label: "Countries", value: "92+" },
        { label: "Uptime", value: "99.9%" }
      ],
      networkLive: "Live Engineers",
      networkProjects: "Active Projects",
      ctaTitle: "Ready to make a difference?",
      ctaSubtitle: "Join thousands of successful engineers and companies on DeskNet today.",
      ctaEarning: "Start Earning",
      ctaHiring: "Start Hiring",
      ctaBadges: ["SOC 2 Certified", "No Hidden Fees", "24/7 Support"]
    },
    portal: {
      menu: {
        profile: "My Profile",
        jobs: "Find Jobs",
        messages: "Messages",
        settings: "Settings",
        logout: "Logout"
      },
      profile: {
        verified: "Verified Pro",
        verifiedEngineer: "Verified Engineer",
        edit: "Edit Profile",
        stats: {
          rate: "Hourly Rate",
          halfDayRate: "Half-day Rate",
          fullDayRate: "Full-day Rate",
          experience: "Experience",
          success: "Success Rate"
        },
        skills: "Technical Skills",
        languages: "Languages",
        contactInfo: "Contact Information"
      },
      jobs: {
        searchPlaceholder: "Search for jobs, skills, or companies...",
        searchBtn: "Search Jobs",
        apply: "Apply Now",
        remote: "Remote",
        posted: "Posted"
      },
      messages: {
        recent: "Recent Chats",
        searchPlaceholder: "Search messages...",
        empty: "Select a conversation to start messaging"
      },
      settings: {
        account: "Account Settings",
        notifications: "Email Notifications",
        notificationsDesc: "Receive job alerts and messages via email",
        twoFactor: "Two-Factor Authentication",
        twoFactorDesc: "Add an extra layer of security to your account",
        privacy: "Privacy",
        visibility: "Profile Visibility",
        visibilityDesc: "Show your profile in search results",
        delete: "Delete Account",
        enable: "Enable"
      },
      logoutConfirm: {
        title: "Confirm Logout",
        message: "Are you sure you want to log out of your account?",
        confirm: "Logout",
        cancel: "Cancel"
      },
      cv: {
        view: "View CV",
        download: "Download CV"
      }
    },
    clientPortal: {
      welcome: "Client Portal",
      guest: "Guest",
      subtitle: "Select a section below to get started",
      nav: {
        home: "Home",
        logTicket: "Log a Ticket",
        myTickets: "My Tickets",
        services: "Services & Rates",
        billing: "Billing",
        userManagement: "Manage Users",
        companyProfile: "Company Profile",
        help: "Help & Support",
        messages: "Messages",
        logout: "Log Out"
      },
      cards: {
        quickActions: { name: "Quick Actions", desc: "Access frequently used features and shortcuts for common tasks" },
        logTicket: { name: "Log New Ticket", desc: "Create and submit a new support ticket or service request" },
        activeTickets: { name: "Active Tickets", desc: "View summary of your currently active and open tickets" },
        awaitingAction: { name: "Awaiting Action", desc: "Tickets requiring your attention or approval" },
        updates: { name: "Recent Updates & Notifications", desc: "Stay informed about all account activity and updates" },
        startOpportunity: { name: "Start New Opportunity", desc: "Initiate a new project or resource request" },
        coordinator: { name: "Assigned DeskNet Coordinator", desc: "Contact information and details for your dedicated DeskNet coordinator" },
        accountStatus: { name: "Account Status", desc: "Overview of your account status, billing, and service details" }
      },
      common: {
        back: "Back",
        return: "Return to",
        updating: "Updating Content",
        updatingDesc: "This section is currently being updated with the latest data and features for your account. Please check back soon or contact support if you need immediate assistance.",
        edit: "Edit",
        submit: "Submit",
        confirm: "Confirm",
        cancel: "Cancel",
        loading: "Loading...",
        noData: "No data found",
        viewAll: "View All",
        online: "Online",
        typeMessage: "Type your message...",
        noMessages: "No messages yet. Start a conversation with support!"
      },
      logTicket: {
        title: "Log a New Ticket",
        serviceType: "Service Type",
        estimatedDuration: "Estimated Duration",
        priority: "Priority",
        subject: "Subject",
        description: "Detailed Description",
        country: "Country",
        city: "City",
        location: "Full Location",
        contactEmail: "Contact Email",
        contactPhone: "Contact Phone Number",
        ticketNumber: "Ticket Number",
        dateTime: "Preferred Date/Time",
        review: "Review Ticket",
        edit: "Edit Ticket",
        confirm: "Confirm & Submit",
        submitting: "Submitting...",
        steps: {
          service: "Service",
          location: "Location",
          contact: "Contact",
          details: "Details",
          review: "Review"
        },
        placeholders: {
          subject: "Brief description of the issue",
          description: "Provide as much detail as possible...",
          location: "Full site address",
          estimatedDuration: "e.g. 4 hours, 2 days",
          country: "Select country",
          city: "Enter city",
          contactEmail: "contact@example.com",
          contactPhone: "+1 234 567 890",
          ticketNumber: "Internal reference number"
        },
        options: {
          serviceTypes: {
            onDemand: "On-Demand Dispatch",
            project: "Project-Based",
            maintenance: "Maintenance",
            hourly: "Hourly",
            halfDay: "Half Day",
            fullDay: "Full Day"
          },
          priorities: {
            low: "Low",
            medium: "Medium",
            high: "High",
            critical: "Critical (SLA)"
          }
        }
      },
      myTickets: {
        title: "My Tickets",
        table: {
          id: "ID",
          subject: "Subject",
          status: "Status",
          engineer: "Engineer",
          date: "Date",
          priority: "Priority",
          type: "Type"
        },
        filters: {
          all: "All",
          status: "Status",
          priority: "Priority",
          search: "Search tickets..."
        },
        status: {
          completed: "Completed",
          resolved: "Resolved",
          inProgress: "In Progress",
          open: "Open"
        }
      },
      billing: {
        title: "Billing & Invoices",
        balance: "Current Balance",
        pending: "Pending Advice",
        nextBilling: "Next Billing Date",
        recentInvoices: "Recent Invoices"
      },
      subItems: {
        myTickets: {
          list: "Ticket List",
          filters: "Filters",
          timeline: "Ticket Status Timeline",
          quotation: "Quotation & Cost Visibility",
          engineer: "Engineer Assignment Details",
          comments: "Ticket Comments & Updates",
          completion: "Completion & Feedback Actions"
        },
        services: {
          catalog: "Services Catalog",
          models: "Engagement Models",
          coverage: "Country Coverage",
          rates: "Standard Rate Guidelines",
          notes: "Commercial Notes"
        },
        billing: {
          advice: "Monthly Billing Advice",
          approval: "Billing Advice Approval",
          invoices: "Invoices",
          history: "Billing History"
        },
        userManagement: {
          addRemove: "Add/Remove Users",
          access: "Access Control"
        },
        opportunities: {
          dispatch: "On-Demand Dispatch",
          project: "Project-Based",
          contract: "Contract-Based",
          fte: "Full-Time Equivalent",
          msp: "Managed Services",
          tracking: "Opportunity Tracking"
        },
        companyProfile: {
          details: "Company Details",
          contact: "Contact Details",
          location: "Location",
          billing: "Billing Information",
          operating: "Operating Countries",
          industry: "Industry"
        },
        help: {
          howItWorks: "How It Works",
          faqs: "FAQs",
          contact: "Support Contact Details",
          country: "Country Support",
          city: "City Support",
          guidelines: "Portal Guidelines"
        }
      },
      services: {
        title: "Services & Rates",
        onDemand: { title: "On-Demand Dispatch", price: "From $45/hr", desc: "Quick response for emergency repairs and maintenance." },
        project: { title: "Project-Based", price: "Custom Quote", desc: "End-to-end project management and implementation." },
        managed: { title: "Managed Services", price: "Monthly Retainer", desc: "Continuous monitoring and support for your infrastructure." },
        coverage: {
          title: "Global Coverage",
          desc: "We provide services in over 150 countries with a network of 20,000+ certified engineers.",
          cta: "View Coverage Map"
        }
      },
      userManagement: {
        title: "Manage Users",
        addUser: "Add User",
        noUsers: "No sub-users found. Add your first team member!"
      },
      companyProfile: {
        title: "Company Profile",
        memberSince: "Member since",
        generalInfo: "General Information",
        industry: "Industry",
        employees: "Employees",
        website: "Website",
        contactDetails: "Contact Details",
        primaryAddress: "Primary Address",
        country: "Country",
        city: "City",
        location: "Full Location"
      },
      help: {
        title: "Help & Support",
        faqs: "Frequently Asked Questions",
        faqItems: [
          { q: 'What is the SLA for critical tickets?', a: 'Critical tickets have a 4-hour on-site response time guarantee.' },
          { q: 'How are engineers vetted?', a: 'All engineers undergo technical assessments and background checks.' },
          { q: 'Can I cancel a scheduled dispatch?', a: 'Yes, but cancellations within 24 hours may incur a fee.' }
        ],
        howItWorksItems: [
          { step: '01', title: 'Log Ticket', desc: 'Submit your request via the portal.' },
          { step: '02', title: 'Assignment', desc: 'We match a verified engineer.' },
          { step: '03', title: 'Execution', desc: 'Engineer performs the work on-site.' },
          { step: '04', title: 'Completion', desc: 'Review and approve the service.' }
        ],
        immediateHelp: "Need Immediate Help?",
        supportCenter: "Global Support Center",
        accountManager: "Account Manager",
        managerName: "Alex Thompson",
        managerRole: "Dedicated Success Manager",
        supportDesc: "Our support team is available 24/7 to assist you with any technical issues.",
        liveChat: "Live Chat",
        waitTime: "Average wait time: 2 mins",
        startChat: "Start Chat"
      },
      messages: {
        title: "Messages",
        conversations: "Conversations",
        activeChat: "Active Support Chat"
      },
      addUser: {
        title: "Add New User",
        username: "Username",
        usernamePlaceholder: "Enter username",
        email: "Email Address",
        emailPlaceholder: "user@company.com",
        role: "Role",
        roles: {
          admin: "Admin",
          manager: "Manager",
          viewer: "Viewer"
        },
        submit: "Create User"
      }
    }
  },
  ru: {
    nav: {
      home: "Главная",
      signUp: "Регистрация",
      platform: "Платформа",
      solutions: "Решения",
      pricing: "Цены",
      resources: "Ресурсы",
      login: "Войти",
      getStarted: "Начать"
    },
    ticket: {
      tag: "Поддержка",
      title: "Создать",
      titleAccent: "Тикет",
      subtitle: "Нужна помощь? Наша служба поддержки готова помочь вам с любыми техническими вопросами или вопросами по аккаунту.",
      steps: {
        category: "Категория",
        details: "Детали",
        priority: "Приоритет",
        review: "Проверка"
      },
      fields: {
        type: "Тип проблемы",
        subject: "Тема",
        description: "Описание",
        urgency: "Срочность",
        impact: "Влияние"
      },
      placeholders: {
        subject: "Кратко опишите проблему",
        description: "Предоставьте как можно больше деталей..."
      },
      submit: "Отправить тикет",
      success: "Тикет успешно отправлен",
      successDesc: "Наша команда рассмотрит ваш запрос и свяжется с вами в ближайшее время."
    },
    hero: {
      title: "Найдите лучших",
      titleAccent: "IT-талантов по всему миру",
      subtitle: "Свяжитесь с проверенными инженерами из 92+ стран. Создайте команду своей мечты за считанные дни, а не месяцы.",
      ctaPrimary: "Начать найм",
      ctaSecondary: "Смотреть демо"
    },
    trusted: "Нам доверяют лидеры индустрии",
    stats: {
      tag: "В цифрах",
      title: "Масштабирование",
      titleAccent: "корпоративного уровня",
      subtitle: "Присоединяйтесь к самым быстрорастущим компаниям мира, которые доверяют DeskNet в поиске IT-талантов",
      verified: "Проверенные инженеры",
      verifiedSub: "Готовые к работе специалисты",
      partners: "Компании-партнеры",
      partnersSub: "Надежные партнеры",
      matchTime: "ср. время подбора",
      matchTimeSub: "Мгновенный подбор на базе ИИ",
      satisfaction: "Удовлетворенность клиентов",
      satisfactionSub: "Индекс счастья клиентов"
    },
    metrics: {
      matchTime: "Время до первого совпадения",
      industryAvg: "по сравнению со средним по отрасли",
      faster: "в 6 раз быстрее",
      tag: "Реальные результаты",
      title: "Метрики,",
      titleAccent: "которые имеют значение",
      subtitle: "Наши клиенты видят измеримые улучшения в скорости найма, эффективности затрат и качестве талантов с первого дня.",
      reduction: "Снижение затрат на найм",
      productivity: "Быстрый выход на продуктивность",
      renewal: "Средний уровень продления контрактов"
    },
    capabilities: {
      tag: "Возможности платформы",
      title: "Создано",
      titleAccent: "для корпоративного масштаба",
      subtitle: "Комплексная платформа, созданная для самых требовательных организаций мира.",
      ai: "Подбор на базе ИИ",
      aiDesc: "Наш запатентованный алгоритм подбирает специалистов под ваши требования менее чем за 48 часов.",
      security: "Корпоративная безопасность",
      securityDesc: "Сертификация SOC 2 Type II. Шифрование банковского уровня. Полное соответствие GDPR, HIPAA и др.",
      network: "Глобальная сеть талантов",
      networkDesc: "Доступ к проверенным инженерам в 92+ странах, охват всех часовых поясов, поддержка 24/7.",
      modular: "Модульная платформа",
      modularDesc: "Выбирайте только нужные услуги. Мгновенно масштабируйтесь в зависимости от спроса."
    },
    cta: {
      title: "Готовы трансформировать",
      titleAccent: "найм в IT?",
      subtitle: "Присоединяйтесь к 35+ компаниям, использующим DeskNet для создания инженерных команд мирового уровня. Начните за минуты, а не месяцы.",
      primary: "Начать пробный период",
      secondary: "Связаться с отделом продаж"
    },
    footer: {
      desc: "Глобальная платформа для поиска и управления IT-талантами корпоративного уровня.",
      product: "Продукт",
      company: "Компания",
      legal: "Юридическая информация",
      rights: "Все права защищены."
    },
    about: {
      tag: "О нас",
      heroTitle: "Объединяем исключительные IT-таланты с инновационными компаниями",
      heroDesc: "DeskNet — это инфраструктурный слой для глобальных технических талантов. Мы сокращаем разрыв между лучшими инженерами и дальновидными компаниями.",
      missionTag: "Наша миссия",
      missionTitle: "Трансформировать то, как компании находят таланты, а инженеры — возможности",
      missionDesc: "DeskNet — это инфраструктурный слой для глобальных технических талантов. Мы сокращаем разрыв между лучшими инженерами и дальновидными компаниями.",
      rigorousVetting: "Строгий отбор",
      valuesTag: "Основные ценности",
      valuesTitle: "Что движет нами вперед",
      valuesSubtitle: "Наши основные принципы определяют каждое решение и каждую функцию.",
      values: {
        transparency: {
          title: "Прозрачность",
          desc: "Честное общение и четкие условия для всех сторон. Никаких скрытых комиссий, никаких сюрпризов — только прямое сотрудничество."
        },
        quality: {
          title: "Качество прежде всего",
          desc: "Мы работаем только с проверенными инженерами и серьезными компаниями, стремящимися к совершенству."
        },
        compensation: {
          title: "Справедливое вознаграждение",
          desc: "Инженеры заслуживают конкурентоспособных ставок. Мы гарантируем, что каждая возможность ценит технический опыт."
        },
        speed: {
          title: "Скорость и эффективность",
          desc: "В технологиях время имеет значение. Наш процесс связывает таланты с возможностями за считанные дни, а не месяцы."
        },
        community: {
          title: "Ориентированность на сообщество",
          desc: "Мы не просто строим платформу — мы создаем сообщество технологов и инноваторов."
        },
        innovation: {
          title: "Постоянные инновации",
          desc: "Технологии развиваются, и мы развиваемся вместе с ними. Мы постоянно совершенствуем платформу."
        }
      },
      howItWorksTitle: "Как работает DeskNet",
      howItWorksSubtitle: "Оптимизированный процесс, который приносит пользу как инженерам, так и компаниям.",
      forEngineers: "Для инженеров",
      forCompanies: "Для компаний",
      steps: {
        engineers: [
          { title: "Создайте свой профиль", desc: "Продемонстрируйте свои навыки, опыт и ожидаемую ставку за считанные минуты." },
          { title: "Пройдите верификацию", desc: "Наша команда проверяет ваш профиль, чтобы гарантировать качественные совпадения." },
          { title: "Связывайтесь с компаниями", desc: "Получайте возможности, соответствующие вашим навыкам и предпочтениям." }
        ],
        companies: [
          { title: "Разместите свои требования", desc: "Определите необходимые навыки, опыт и детали проекта." },
          { title: "Просмотрите подходящих инженеров", desc: "Изучите проверенных инженеров, идеально подходящих под ваши критерии." },
          { title: "Начните работу", desc: "Связывайтесь напрямую и начинайте работать с новым членом вашей команды." }
        ]
      },
      ctaTitle: "Готовы присоединиться к сети?",
      ctaSubtitle: "Начните свое путешествие сегодня и свяжитесь с лучшими техническими специалистами и компаниями.",
      getStarted: "Начать",
      learnMore: "Узнать больше"
    },
    testimonials: {
      tag: "Отзывы",
      title: "Нам доверяют",
      titleAccent: "лучшие",
      subtitle: "Узнайте мнение инженерных лидеров и разработчиков, которые строят будущее вместе с DeskNet.",
      items: [
        {
          quote: "DeskNet полностью изменил наш процесс найма. Мы нашли ведущего архитектора за 48 часов, и он стал ключевым игроком в развитии нашей инфраструктуры.",
          author: "Джеймс Уилсон",
          role: "CTO в TechFlow",
          avatar: "https://picsum.photos/seed/james/100/100"
        },
        {
          quote: "Как инженер, DeskNet дает мне свободу работать над проектами мирового уровня со справедливым вознаграждением и полной прозрачностью. Это именно та платформа, которую я ждал.",
          author: "Елена Родригес",
          role: "Senior Full Stack Engineer",
          avatar: "https://picsum.photos/seed/elena/100/100"
        },
        {
          quote: "Качество талантов в DeskNet не имеет равных. Их процесс отбора очень строгий, что гарантирует нам интервью только с лучшим 1% мировых талантов.",
          author: "Маркус Чен",
          role: "VP of Engineering в CloudScale",
          avatar: "https://picsum.photos/seed/marcus/100/100"
        }
      ]
    },
    login: {
      title: "С возвращением",
      subtitle: "Выберите тип аккаунта, чтобы продолжить",
      engineer: "Инженер",
      engineerDesc: "Найдите свою следующую большую возможность",
      client: "Клиент",
      clientDesc: "Наймите инженерные таланты мирового уровня",
      admin: "Администратор",
      adminDesc: "Управление платформой DeskNet",
      email: "Электронная почта",
      password: "Пароль",
      signIn: "Войти",
      signInAsAdmin: "Войти как админ",
      signInAsEngineer: "Войти как инженер",
      signInAsClient: "Войти как клиент",
      forgotPassword: "Забыли пароль?",
      noAccount: "Нет аккаунта?",
      signUp: "Зарегистрироваться",
      back: "Назад к выбору"
    },
    signup: {
      title: "Присоединяйтесь к DeskNet",
      subtitle: "Выберите тип аккаунта, чтобы начать",
      engineer: "Инженер",
      engineerDesc: "Присоединяйтесь к нашей сети элитных инженеров",
      client: "Клиент",
      clientDesc: "Наймите проверенных инженерных талантов",
      fullName: "Полное имя",
      email: "Электронная почта",
      password: "Пароль",
      companyName: "Название компании",
      firstName: "Имя",
      lastName: "Фамилия",
      companyEmail: "Рабочая почта",
      companySize: "Количество сотрудников",
      createAccount: "Создать аккаунт",
      hasAccount: "Уже есть аккаунт?",
      signIn: "Войти",
      back: "Назад к выбору",
      continue: "Продолжить",
      complete: "Завершить регистрацию",
      steps: {
        account: "Аккаунт",
        personal: "Личные данные",
        professional: "Опыт",
        rates: "Ставки",
        assets: "Файлы"
      },
      fields: {
        dob: "Дата рождения",
        day: "День",
        month: "Месяц",
        year: "Год",
        country: "Страна",
        city: "Город",
        specialization: "Основная специализация",
        experience: "Лет опыта",
        skills: "Навыки (через запятую)",
        hourlyRate: "Почасовая ставка ($)",
        halfDayRate: "Ставка за полдня ($)",
        fullDayRate: "Ставка за полный день ($)",
        languages: "Языки",
        contactInfo: "Контактная информация",
        phoneNumber: "Номер телефона",
        whatsappNumber: "Номер WhatsApp",
        cvUpload: "Загрузить CV (PDF)",
        profilePic: "Фото профиля"
      },
      onboarding: {
        step1: { title: "Дата рождения", desc: "Пожалуйста, укажите вашу дату рождения." },
        step2: { title: "Местоположение", desc: "Где вы сейчас проживаете?" },
        step3: { title: "Специализация", desc: "Какова ваша основная область технических знаний?" },
        step4: { title: "Опыт работы", desc: "Сколько лет вы работаете в этой области?" },
        step5: { title: "Навыки", desc: "Перечислите ваши основные технические навыки и инструменты." },
        step6: { title: "Ставки", desc: "Установите ожидаемые ставки для различных типов взаимодействия." },
        step7: { title: "Языки", desc: "На каких языках вы говорите и на каком уровне?" },
        step8: { title: "Контактная информация", desc: "Как компании могут связаться с вами напрямую?" },
        step9: { title: "Загрузка CV", desc: "Загрузите ваше последнее резюме в формате PDF." },
        step10: { title: "Фото профиля", desc: "Добавьте профессиональное фото в свой профиль." },
        proficiencyLevels: {
          a1: "A1 - Начальный",
          a2: "A2 - Элементарный",
          b1: "B1 - Средний",
          b2: "B2 - Выше среднего",
          c1: "C1 - Продвинутый",
          c2: "C2 - Свободное владение"
        },
        placeholders: {
          searchCountry: "Поиск страны...",
          searchCity: "Поиск города...",
          selectCountryFirst: "Сначала выберите страну",
          selectSpecializations: "Выберите специализации...",
          searchSkills: "Поиск и добавление навыков...",
          usdPerHour: "USD в час",
          usdHalfDay: "USD за 4 часа",
          usdFullDay: "USD за 8 часов",
          selectLanguage: "Выберите язык",
          selectLevel: "Уровень",
          phoneNumber: "Номер телефона",
          whatsappNumber: "Номер WhatsApp",
          uploadCV: "Загрузите ваше CV",
          cvFormat: "Предпочтительно PDF, макс. 5МБ",
          confirmCV: "Подтвердить CV",
          cvConfirmed: "CV подтверждено",
          yearsExperience: "Лет опыта",
          countryCode: "Код",
          profilePicTitle: "Фото профиля",
          profilePicDesc: "Помогите компаниям узнать вас. Квадратные изображения работают лучше всего.",
          choosePhoto: "Выбрать фото",
          confirmPhoto: "Подтвердить фото",
          photoConfirmed: "Фото подтверждено",
          change: "Изменить",
          cancel: "Отмена",
          back: "Назад",
          completeReg: "Завершить регистрацию",
          continue: "Продолжить"
        }
      }
    },
    why: {
      tag: "Почему DeskNet",
      heroTitle: "Почему",
      heroTitleAccent: "DeskNet?",
      heroSubtitle: "Все, что вам нужно для создания исключительных инженерных команд",
      stats: {
        engineers: "Проверенные инженеры",
        countries: "Страны",
        success: "Успешность"
      },
      watchDemo: "Посмотрите, как это работает",
      benefitsTag: "преимущества",
      benefitsTitle: "Все, что вам нужно для",
      benefitsTitleAccent: "успеха",
      benefitsSubtitle: "Комплексные функции, разработанные как для инженеров, так и для компаний",
      benefits: [
        { title: "Проверенный пул талантов", desc: "Каждый инженер на нашей платформе проходит тщательную проверку и верификацию." },
        { title: "Справедливое вознаграждение", desc: "Инженеры сами устанавливают свои ставки при полной прозрачности." },
        { title: "Безопасные платежи", desc: "Наша система эскроу защищает обе стороны." },
        { title: "Поддержка 24/7", desc: "Наша специальная служба поддержки всегда доступна." },
        { title: "Быстрый подбор", desc: "Наш интеллектуальный алгоритм быстро связывает вас." },
        { title: "Глобальная сеть", desc: "Доступ к талантам со всего мира." }
      ],
      verificationTag: "Процесс верификации",
      verificationTitle: "Каждый инженер,",
      verificationTitleAccent: "Тщательно проверен",
      verificationSubtitle: "Наш строгий процесс верификации гарантирует, что вы работаете только с профессионалами высшего уровня. Проверка биографии, оценка навыков и верификация в реальном времени.",
      verificationList: [
        "Оценка технических навыков",
        "Проверка биографии",
        "Проверка сертификатов",
        "Обзор портфолио"
      ],
      comparisonTag: "Сравнение",
      comparisonTitle: "DeskNet против",
      comparisonTitleAccent: "остальных",
      comparisonSubtitle: "Узнайте, почему ведущие компании выбирают DeskNet вместо традиционных платформ",
      comparison: {
        header: ["Функция", "DeskNet", "Другие"],
        rows: [
          ["Верификация талантов", "Check", "Ограничено"],
          ["Прозрачное ценообразование", "Check", "Скрытые комиссии"],
          ["Защита эскроу", "Check", "Варьируется"],
          ["Подбор на базе ИИ", "Check", "Вручную"],
          ["Глобальный охват", "92+ Страны", "Региональный"],
          ["Ответ поддержки", "< 2 часов", "24-48 часов"]
        ]
      },
      networkTitle: "По-настоящему",
      networkTitleAccent: "Глобальная сеть",
      networkSubtitle: "Доступ к высококлассным IT-талантам из 92+ стран с опытом работы во всех основных технологических стеках.",
      networkStats: [
        { label: "Инженеры", value: "3.5K+" },
        { label: "Компании", value: "35+" },
        { label: "Страны", value: "92+" },
        { label: "Uptime", value: "99.9%" }
      ],
      networkLive: "Инженеры онлайн",
      networkProjects: "Активные проекты",
      ctaTitle: "Готовы внести свой вклад?",
      ctaSubtitle: "Присоединяйтесь к тысячам успешных инженеров и компаний на DeskNet уже сегодня.",
      ctaEarning: "Начать зарабатывать",
      ctaHiring: "Начать найм",
      ctaBadges: ["Сертификация SOC 2", "Без скрытых комиссий", "Поддержка 24/7"]
    },
    portal: {
      menu: {
        profile: "Мой профиль",
        jobs: "Поиск работы",
        messages: "Сообщения",
        settings: "Настройки",
        logout: "Выйти"
      },
      profile: {
        verified: "Проверенный профи",
        verifiedEngineer: "Проверенный инженер",
        edit: "Редактировать профиль",
        stats: {
          rate: "Почасовая ставка",
          halfDayRate: "Ставка за полдня",
          fullDayRate: "Ставка за полный день",
          experience: "Опыт",
          success: "Успешность"
        },
        skills: "Технические навыки",
        languages: "Языки",
        contactInfo: "Контактная информация"
      },
      jobs: {
        searchPlaceholder: "Поиск работы, навыков или компаний...",
        searchBtn: "Найти работу",
        apply: "Подать заявку",
        remote: "Удаленно",
        posted: "Опубликовано"
      },
      messages: {
        recent: "Недавние чаты",
        searchPlaceholder: "Поиск сообщений...",
        empty: "Выберите чат, чтобы начать общение"
      },
      settings: {
        account: "Настройки аккаунта",
        notifications: "Email уведомления",
        notificationsDesc: "Получать оповещения о работе и сообщения по почте",
        twoFactor: "Двухфакторная аутентификация",
        twoFactorDesc: "Добавьте дополнительный уровень безопасности",
        privacy: "Конфиденциальность",
        visibility: "Видимость профиля",
        visibilityDesc: "Показывать ваш профиль в результатах поиска",
        delete: "Удалить аккаунт",
        enable: "Включить"
      },
      logoutConfirm: {
        title: "Подтверждение выхода",
        message: "Вы уверены, что хотите выйти из своего аккаунта?",
        confirm: "Выйти",
        cancel: "Отмена"
      },
      cv: {
        view: "Посмотреть CV",
        download: "Скачать CV"
      }
    },
    clientPortal: {
      welcome: "Клиентский портал",
      guest: "Гость",
      subtitle: "Выберите раздел ниже, чтобы начать",
      nav: {
        home: "Главная",
        logTicket: "Создать тикет",
        myTickets: "Мои тикеты",
        services: "Услуги и тарифы",
        billing: "Биллинг",
        userManagement: "Управление пользователями",
        companyProfile: "Профиль компании",
        help: "Помощь и поддержка",
        messages: "Сообщения",
        logout: "Выйти"
      },
      cards: {
        quickActions: { name: "Быстрые действия", desc: "Доступ к часто используемым функциям и ярлыкам для общих задач" },
        logTicket: { name: "Создать новый тикет", desc: "Создайте и отправьте новый тикет в службу поддержки или запрос на обслуживание" },
        activeTickets: { name: "Активные тикеты", desc: "Просмотр сводки ваших текущих активных и открытых тикетов" },
        awaitingAction: { name: "Ожидание действия", desc: "Тикеты, требующие вашего внимания или одобрения" },
        updates: { name: "Последние обновления и уведомления", desc: "Будьте в курсе всей активности аккаунта и обновлений" },
        startOpportunity: { name: "Начать новую возможность", desc: "Инициировать новый проект или запрос ресурсов" },
        coordinator: { name: "Назначенный координатор DeskNet", desc: "Контактная информация и детали вашего выделенного координатора DeskNet" },
        accountStatus: { name: "Статус аккаунта", desc: "Обзор статуса вашего аккаунта, биллинга и деталей обслуживания" }
      },
      common: {
        back: "Назад",
        return: "Вернуться к",
        updating: "Обновление контента",
        updatingDesc: "Этот раздел в настоящее время обновляется с использованием последних данных и функций для вашего аккаунта. Пожалуйста, зайдите позже или свяжитесь с поддержкой, если вам нужна немедленная помощь.",
        edit: "Редактировать",
        submit: "Отправить",
        confirm: "Подтвердить",
        cancel: "Отмена",
        loading: "Загрузка...",
        noData: "Данные не найдены",
        viewAll: "Посмотреть все",
        online: "В сети",
        typeMessage: "Введите сообщение...",
        noMessages: "Сообщений пока нет. Начните разговор с поддержкой!"
      },
      logTicket: {
        title: "Создать новый тикет",
        serviceType: "Тип услуги",
        estimatedDuration: "Оценочная длительность",
        priority: "Приоритет",
        subject: "Тема",
        description: "Подробное описание",
        country: "Страна",
        city: "Город",
        location: "Полный адрес",
        contactEmail: "Контактный Email",
        contactPhone: "Контактный телефон",
        ticketNumber: "Номер тикета",
        dateTime: "Предпочтительная дата/время",
        review: "Проверить тикет",
        edit: "Редактировать тикет",
        confirm: "Подтвердить и отправить",
        submitting: "Отправка...",
        steps: {
          service: "Услуга",
          location: "Локация",
          contact: "Контакт",
          details: "Детали",
          review: "Проверка"
        },
        placeholders: {
          subject: "Краткое описание проблемы",
          description: "Предоставьте как можно больше деталей...",
          location: "Полный адрес объекта",
          estimatedDuration: "например, 4 часа, 2 дня",
          country: "Выберите страну",
          city: "Введите город",
          contactEmail: "contact@example.com",
          contactPhone: "+1 234 567 890",
          ticketNumber: "Внутренний номер ссылки"
        },
        options: {
          serviceTypes: {
            onDemand: "Диспетчеризация по требованию",
            project: "Проектная основа",
            maintenance: "Техническое обслуживание",
            hourly: "Почасовая",
            halfDay: "Полдня",
            fullDay: "Полный день"
          },
          priorities: {
            low: "Низкий",
            medium: "Средний",
            high: "Высокий",
            critical: "Критический (SLA)"
          }
        }
      },
      myTickets: {
        title: "Мои тикеты",
        table: {
          id: "ID",
          subject: "Тема",
          status: "Статус",
          engineer: "Инженер",
          date: "Дата",
          priority: "Приоритет",
          type: "Тип"
        },
        filters: {
          all: "Все",
          status: "Статус",
          priority: "Приоритет",
          search: "Поиск тикетов..."
        },
        status: {
          completed: "Завершено",
          resolved: "Решено",
          inProgress: "В процессе",
          open: "Открыто"
        }
      },
      billing: {
        title: "Биллинг и счета",
        balance: "Текущий баланс",
        pending: "Ожидающие уведомления",
        nextBilling: "Следующая дата выставления счета",
        recentInvoices: "Последние счета"
      },
      subItems: {
        myTickets: {
          list: "Список тикетов",
          filters: "Фильтры",
          timeline: "Хронология статуса тикета",
          quotation: "Видимость котировок и затрат",
          engineer: "Детали назначения инженера",
          comments: "Комментарии и обновления тикетов",
          completion: "Действия по завершению и обратной связи"
        },
        services: {
          catalog: "Каталог услуг",
          models: "Модели взаимодействия",
          coverage: "Охват стран",
          rates: "Стандартные рекомендации по ставкам",
          notes: "Коммерческие примечания"
        },
        billing: {
          advice: "Ежемесячный совет по биллингу",
          approval: "Одобрение совета по биллингу",
          invoices: "Счета",
          history: "История биллинга"
        },
        userManagement: {
          addRemove: "Добавить/Удалить пользователей",
          roles: "Назначение ролей",
          access: "Контроль доступа",
          logs: "Журналы активности"
        },
        opportunities: {
          dispatch: "Выезд по запросу",
          project: "Проектная работа",
          contract: "Контрактная работа",
          fte: "Полная занятость",
          msp: "Управляемые услуги",
          tracking: "Отслеживание возможностей"
        },
        companyProfile: {
          details: "Детали компании",
          contact: "Контактные данные",
          location: "Местоположение",
          billing: "Информация о биллинге",
          operating: "Страны деятельности",
          industry: "Отрасль"
        },
        help: {
          howItWorks: "Как это работает",
          faqs: "Часто задаваемые вопросы",
          contact: "Контактные данные службы поддержки",
          country: "Поддержка по странам",
          city: "Поддержка по городам",
          location: "Полное местоположение",
          guidelines: "Рекомендации по порталу"
        }
      },
      services: {
        title: "Услуги и тарифы",
        onDemand: { title: "Диспетчеризация по требованию", price: "От $45/час", desc: "Быстрое реагирование на аварийный ремонт и техническое обслуживание." },
        project: { title: "Проектная основа", price: "Индивидуальный расчет", desc: "Сквозное управление проектами и их реализация." },
        managed: { title: "Управляемые услуги", price: "Ежемесячный аванс", desc: "Непрерывный мониторинг и поддержка вашей инфраструктуры." },
        coverage: {
          title: "Глобальный охват",
          desc: "Мы предоставляем услуги в более чем 150 странах с сетью из 20 000+ сертифицированных инженеров.",
          cta: "Посмотреть карту охвата"
        }
      },
      userManagement: {
        title: "Управление пользователями",
        addUser: "Добавить пользователя",
        noUsers: "Субпользователи не найдены. Добавьте своего первого члена команды!"
      },
      companyProfile: {
        title: "Профиль компании",
        memberSince: "Участник с",
        generalInfo: "Общая информация",
        industry: "Отрасль",
        employees: "Сотрудники",
        website: "Веб-сайт",
        contactDetails: "Контактные данные",
        primaryAddress: "Основной адрес",
        country: "Страна",
        city: "Город",
        location: "Полное местоположение"
      },
      help: {
        title: "Помощь и поддержка",
        faqs: "Часто задаваемые вопросы",
        faqItems: [
          { q: 'Каков SLA для критических заявок?', a: 'Для критических заявок гарантируется время реагирования на месте в течение 4 часов.' },
          { q: 'Как проверяются инженеры?', a: 'Все инженеры проходят техническую оценку и проверку биографических данных.' },
          { q: 'Могу ли я отменить запланированный выезд?', a: 'Да, но при отмене менее чем за 24 часа может взиматься плата.' }
        ],
        howItWorksItems: [
          { step: '01', title: 'Создать заявку', desc: 'Отправьте свой запрос через портал.' },
          { step: '02', title: 'Назначение', desc: 'Мы подберем проверенного инженера.' },
          { step: '03', title: 'Выполнение', desc: 'Инженер выполняет работу на месте.' },
          { step: '04', title: 'Завершение', desc: 'Проверьте и подтвердите выполнение услуги.' }
        ],
        immediateHelp: "Нужна немедленная помощь?",
        supportCenter: "Глобальный центр поддержки",
        accountManager: "Менеджер по работе с клиентами",
        managerName: "Алекс Томпсон",
        managerRole: "Персональный менеджер по успеху",
        supportDesc: "Наша служба поддержки доступна 24/7, чтобы помочь вам с любыми техническими проблемами.",
        liveChat: "Живой чат",
        waitTime: "Среднее время ожидания: 2 мин",
        startChat: "Начать чат"
      },
      messages: {
        title: "Сообщения",
        conversations: "Разговоры",
        activeChat: "Активный чат поддержки"
      },
      addUser: {
        title: "Добавить нового пользователя",
        username: "Имя пользователя",
        usernamePlaceholder: "Введите имя пользователя",
        email: "Адрес электронной почты",
        emailPlaceholder: "user@company.com",
        role: "Роль",
        roles: {
          admin: "Админ",
          manager: "Менеджер",
          viewer: "Зритель"
        },
        submit: "Создать пользователя"
      }
    }
  },
  uz: {
    nav: {
      home: "Bosh sahifa",
      signUp: "Ro'yxatdan o'tish",
      platform: "Platforma",
      solutions: "Yechimlar",
      pricing: "Narxlar",
      resources: "Resurslar",
      login: "Kirish",
      getStarted: "Boshlash"
    },
    ticket: {
      tag: "Qo'llab-quvvatlash",
      title: "Chipta",
      titleAccent: "Yaratish",
      subtitle: "Yordam kerakmi? Bizning qo'llab-quvvatlash jamoamiz har qanday texnik yoki hisob bilan bog'liq muammolarda yordam berishga tayyor.",
      steps: {
        category: "Toifa",
        details: "Tafsilotlar",
        priority: "Ustuvorlik",
        review: "Ko'rib chiqish"
      },
      fields: {
        type: "Muammo turi",
        subject: "Mavzu",
        description: "Tavsif",
        urgency: "Shoshilinchlik",
        impact: "Ta'sir"
      },
      placeholders: {
        subject: "Muammoni qisqacha tasvirlab bering",
        description: "Iloji boricha ko'proq tafsilotlarni taqdim eting..."
      },
      submit: "Chiptani yuborish",
      success: "Chipta muvaffaqiyatli yuborildi",
      successDesc: "Bizning jamoamiz so'rovingizni ko'rib chiqadi va tez orada siz bilan bog'lanadi."
    },
    hero: {
      title: "Dunyo bo'ylab eng yaxshi",
      titleAccent: "IT iste'dodlarini toping",
      subtitle: "92+ mamlakatdan kelgan tasdiqlangan muhandislar bilan bog'laning. Orzuingizdagi jamoani oylar emas, kunlar ichida quring.",
      ctaPrimary: "Ishga olishni boshlash",
      ctaSecondary: "Demoni ko'rish"
    },
    trusted: "Sohaning yetakchi kompaniyalari ishonadi",
    stats: {
      tag: "Raqamlarda",
      title: "Korporativ",
      titleAccent: "miqyosdagi quvvat",
      subtitle: "IT iste'dodlariga bo'lgan ehtiyojlarini qondirish uchun DeskNet-ga ishonadigan dunyodagi eng tez rivojlanayotgan kompaniyalarga qo'shiling",
      verified: "Tasdiqlangan muhandislar",
      verifiedSub: "Ishga tayyor mutaxassislar",
      partners: "Hamkor kompaniyalar",
      partnersSub: "Ishonchli hamkorlar",
      matchTime: "o'rtacha tanlash vaqti",
      matchTimeSub: "Sun'iy intellekt asosida tezkor tanlash",
      satisfaction: "Mijozlar mamnuniyati",
      satisfactionSub: "Mijozlar baxtiyorligi ko'rsatkichi"
    },
    metrics: {
      matchTime: "Birinchi moslikkacha bo'lgan vaqt",
      industryAvg: "soha o'rtacha ko'rsatkichiga nisbatan",
      faster: "6 baravar tezroq",
      tag: "Haqiqiy natijalar",
      title: "Muhim",
      titleAccent: "ko'rsatkichlar",
      subtitle: "Mijozlarimiz birinchi kundan boshlab ishga olish tezligi, xarajatlar samaradorligi va iste'dodlar sifatining sezilarli darajada yaxshilanishini ko'rmoqdalar.",
      reduction: "Ishga olish xarajatlarini kamaytirish",
      productivity: "Mahsuldorlikka tezroq erishish",
      renewal: "Shartnomani uzaytirishning o'rtacha ko'rsatkichi"
    },
    capabilities: {
      tag: "Platforma imkoniyatlari",
      title: "Korporativ",
      titleAccent: "miqyos uchun qurilgan",
      subtitle: "Dunyoning eng talabchan tashkilotlari uchun qurilgan keng qamrovli platforma.",
      ai: "Sun'iy intellekt asosida tanlash",
      aiDesc: "Bizning xususiy algoritmimiz sizning talablaringizga 48 soat ichida mos keladigan iste'dodlarni topadi.",
      security: "Korporativ xavfsizlik",
      securityDesc: "SOC 2 Type II sertifikati. Bank darajasidagi shifrlash. GDPR, HIPAA va boshqalarga to'liq muvofiqlik.",
      network: "Global iste'dodlar tarmog'i",
      networkDesc: "92+ mamlakatdagi tasdiqlangan muhandislarga kirish, barcha vaqt zonalari qamrab olingan, 24/7 qo'llab-quvvatlash.",
      modular: "Modulli platforma",
      modularDesc: "O'zingizga kerakli xizmatlarni tanlang. Talabga qarab darhol kengaytiring yoki qisqartiring."
    },
    cta: {
      title: "IT ishga olish jarayonini",
      titleAccent: "o'zgartirishga tayyormisiz?",
      subtitle: "Dunyo darajasidagi muhandislik jamoalarini qurish uchun DeskNet-dan foydalanadigan 35+ kompaniyaga qo'shiling. Oylar emas, bir necha daqiqada boshlang.",
      primary: "Bepul sinovni boshlash",
      secondary: "Sotuv bo'limi bilan bog'lanish"
    },
    footer: {
      desc: "Korporativ darajadagi IT iste'dodlarini topish va boshqarish uchun global platforma.",
      product: "Mahsulot",
      company: "Kompaniya",
      legal: "Huquqiy",
      rights: "Barcha huquqlar himoyalangan."
    },
    about: {
      tag: "Biz haqimizda",
      heroTitle: "Ajoyib IT iste'dodlarini innovatsion kompaniyalar bilan bog'laymiz",
      heroDesc: "DeskNet — global texnik iste'dodlar uchun infratuzilma qatlamidir. Biz eng yaxshi muhandislar va istiqbolli kompaniyalar o'rtasidagi tafovutni bartaraf etamiz.",
      missionTag: "Bizning missiyamiz",
      missionTitle: "Kompaniyalar iste'dodlarni topish va muhandislar imkoniyatlarni topish usulini o'zgartirish",
      missionDesc: "DeskNet — global texnik iste'dodlar uchun infratuzilma qatlamidir. Biz eng yaxshi muhandislar va istiqbolli kompaniyalar o'rtasidagi tafovutni bartaraf etamiz.",
      rigorousVetting: "Qattiq tekshiruv",
      valuesTag: "Asosiy qadriyatlar",
      valuesTitle: "Bizni nima oldinga undaydi",
      valuesSubtitle: "Bizning asosiy tamoyillarimiz har bir qaror va har bir funksiyani boshqaradi.",
      values: {
        transparency: {
          title: "Shaffoflik",
          desc: "Barcha tomonlar uchun halol muloqot va aniq shartlar. Yashirin to'lovlar yo'q, syurprizlar yo'q — faqat to'g'ridan-to'g'ri hamkorlik."
        },
        quality: {
          title: "Birinchi navbatda sifat",
          desc: "Biz faqat tasdiqlangan muhandislar va mukammallikka intiladigan jiddiy kompaniyalar bilan ishlaymiz."
        },
        compensation: {
          title: "Adolatli haq to'lash",
          desc: "Muhandislar raqobatbardosh stavkalarga loyiqdir. Biz har bir imkoniyat texnik tajribani qadrlashini ta'minlaymiz."
        },
        speed: {
          title: "Tezlik va samaradorlik",
          desc: "Texnologiyada vaqt muhim. Bizning jarayonimiz iste'dodlarni oylar emas, kunlar ichida imkoniyatlar bilan bog'laydi."
        },
        community: {
          title: "Jamiyatga yo'naltirilgan",
          desc: "Biz shunchaki platforma qurmayapmiz — biz texnologlar va innovatorlar hamjamiyatini yaratyapmiz."
        },
        innovation: {
          title: "Doimiy innovatsiyalar",
          desc: "Texnologiya rivojlanmoqda va biz u bilan birga rivojlanmoqdamiz. Biz platformani doimiy ravishda takomillashtirib boramiz."
        }
      },
      howItWorksTitle: "DeskNet qanday ishlaydi",
      howItWorksSubtitle: "Ham muhandislar, ham kompaniyalar uchun foydali bo'lgan soddalashtirilgan jarayon.",
      forEngineers: "Muhandislar uchun",
      forCompanies: "Kompaniyalar uchun",
      steps: {
        engineers: [
          { title: "Profilingizni yarating", desc: "O'z mahoratingizni, tajribangizni va kutilayotgan stavkangizni bir necha daqiqada namoyish eting." },
          { title: "Tasdiqlashdan o'ting", desc: "Bizning jamoamiz sifatli moslikni ta'minlash uchun profilingizni tekshiradi." },
          { title: "Kompaniyalar bilan bog'laning", desc: "Sizning mahoratingiz va afzalliklaringizga mos keladigan imkoniyatlarni oling." }
        ],
        companies: [
          { title: "Talablaringizni joylashtiring", desc: "Sizga kerak bo'lgan mahorat, tajriba va loyiha tafsilotlarini belgilang." },
          { title: "Mos keladigan muhandislarni ko'rib chiqing", desc: "Sizning mezonlaringizga to'liq mos keladigan tasdiqlangan muhandislarni ko'rib chiqing." },
          { title: "Qurishni boshlang", desc: "To'g'ridan-to'g'ri bog'laning va yangi jamoa a'zosi bilan ishlashni boshlang." }
        ]
      },
      ctaTitle: "Tarmoqqa qo'shilishga tayyormisiz?",
      ctaSubtitle: "Bugun sayohatingizni boshlang va eng yaxshi texnik mutaxassislar va kompaniyalar bilan bog'laning.",
      getStarted: "Boshlash",
      learnMore: "Batafsil ma'lumot"
    },
    testimonials: {
      tag: "Fikr-mulohazalar",
      title: "Eng yaxshilar",
      titleAccent: "ishonadi",
      subtitle: "DeskNet bilan kelajakni qurayotgan muhandislik rahbarlari va dasturchilarning fikrlarini tinglang.",
      items: [
        {
          quote: "DeskNet bizning ishga olish jarayonimizni butunlay o'zgartirdi. Biz 48 soat ichida infratuzilmamiz uchun muhim bo'lgan Senior Arxitektorni topdik.",
          author: "James Wilson",
          role: "TechFlow CTOsi",
          avatar: "https://picsum.photos/seed/james/100/100"
        },
        {
          quote: "Muhandis sifatida DeskNet menga adolatli haq to'lash va to'liq shaffoflik bilan dunyo darajasidagi loyihalarda ishlash erkinligini beradi. Bu men kutgan platforma.",
          author: "Elena Rodriguez",
          role: "Senior Full Stack Engineer",
          avatar: "https://picsum.photos/seed/elena/100/100"
        },
        {
          quote: "DeskNet-dagi iste'dodlar sifati tengsizdir. Ularning tekshirish jarayoni qat'iy bo'lib, bizga faqat dunyo iste'dodlarining eng yaxshi 1 foizi bilan suhbatlashishni ta'minlaydi.",
          author: "Marcus Chen",
          role: "CloudScale muhandislik bo'yicha vitse-prezidenti",
          avatar: "https://picsum.photos/seed/marcus/100/100"
        }
      ]
    },
    login: {
      title: "Xush kelibsiz",
      subtitle: "Davom etish uchun hisob turini tanlang",
      engineer: "Muhandis",
      engineerDesc: "Keyingi katta imkoniyatingizni toping",
      client: "Mijoz",
      clientDesc: "Dunyo darajasidagi muhandislik iste'dodlarini yollang",
      admin: "Administrator",
      adminDesc: "DeskNet platformasini boshqarish",
      email: "Elektron pochta manzili",
      password: "Parol",
      signIn: "Kirish",
      signInAsAdmin: "Admin sifatida kirish",
      signInAsEngineer: "Muhandis sifatida kirish",
      signInAsClient: "Mijoz sifatida kirish",
      forgotPassword: "Parolni unutdingizmi?",
      noAccount: "Hisobingiz yo'qmi?",
      signUp: "Ro'yxatdan o'tish",
      back: "Tanlovga qaytish"
    },
    signup: {
      title: "DeskNet-ga qo'shiling",
      subtitle: "Boshlash uchun hisob turini tanlang",
      engineer: "Muhandis",
      engineerDesc: "Bizning elita muhandislar tarmog'imizga qo'shiling",
      client: "Mijoz",
      clientDesc: "Tasdiqlangan muhandislik iste'dodlarini yollang",
      fullName: "To'liq ism",
      email: "Elektron pochta manzili",
      password: "Parol",
      companyName: "Kompaniya nomi",
      firstName: "Ism",
      lastName: "Familiya",
      companyEmail: "Kompaniya emaili",
      companySize: "Kompaniyadagi xodimlar soni",
      createAccount: "Hisob yaratish",
      hasAccount: "Hisobingiz bormi?",
      signIn: "Kirish",
      back: "Tanlovga qaytish",
      continue: "Davom etish",
      complete: "Ro'yxatdan o'tishni yakunlash",
      steps: {
        account: "Hisob",
        personal: "Shaxsiy",
        professional: "Tajriba",
        rates: "Stavkalar",
        assets: "Fayllar"
      },
      fields: {
        dob: "Tug'ilgan sana",
        day: "Kun",
        month: "Oy",
        year: "Yil",
        country: "Mamlakat",
        city: "Shahar",
        specialization: "Asosiy IT mutaxassisligi",
        experience: "Tajriba yillari",
        skills: "Ko'nikmalar (vergul bilan)",
        hourlyRate: "Soatlik stavka ($)",
        halfDayRate: "Yarim kunlik stavka ($)",
        fullDayRate: "To'liq kunlik stavka ($)",
        languages: "Tillar",
        contactInfo: "Aloqa ma'lumotlari",
        phoneNumber: "Telefon raqami",
        whatsappNumber: "WhatsApp raqami",
        cvUpload: "CV yuklash (PDF)",
        profilePic: "Profil rasmi"
      },
      onboarding: {
        step1: { title: "Tug'ilgan sana", desc: "Iltimos, tug'ilgan sanangizni ko'rsating." },
        step2: { title: "Manzil", desc: "Hozirda qayerda istiqomat qilasiz?" },
        step3: { title: "Mutaxassislik", desc: "Sizning asosiy texnik tajribangiz qaysi sohada?" },
        step4: { title: "Ish tajribasi", desc: "Ushbu sohada necha yildan beri ishlayapsiz?" },
        step5: { title: "Ko'nikmalar", desc: "Asosiy texnik ko'nikmalaringiz va asboblaringizni sanab o'ting." },
        step6: { title: "Stavkalar", desc: "Turli xil hamkorlik turlari uchun kutilayotgan stavkalaringizni belgilang." },
        step7: { title: "Tillar", desc: "Qaysi tillarda gaplashasiz va qaysi darajada?" },
        step8: { title: "Aloqa ma'lumotlari", desc: "Kompaniyalar siz bilan qanday bog'lanishlari mumkin?" },
        step9: { title: "CV yuklash", desc: "Oxirgi CV yoki rezyumengizni PDF formatida yuklang." },
        step10: { title: "Profil rasmi", desc: "Profilingizga professional fotosurat qo'shing." },
        proficiencyLevels: {
          a1: "A1 - Boshlang'ich",
          a2: "A2 - Oddiy",
          b1: "B1 - O'rta",
          b2: "B2 - O'rtadan yuqori",
          c1: "C1 - Ilg'or",
          c2: "C2 - Mukammal"
        },
        placeholders: {
          searchCountry: "Mamlakatni qidirish...",
          searchCity: "Shaharni qidirish...",
          selectCountryFirst: "Avval mamlakatni tanlang",
          selectSpecializations: "Mutaxassisliklarni tanlang...",
          searchSkills: "Ko'nikmalarni qidirish va qo'shish...",
          usdPerHour: "Soatiga USD",
          usdHalfDay: "4 soat uchun USD",
          usdFullDay: "8 soat uchun USD",
          selectLanguage: "Tilni tanlang",
          selectLevel: "Daraja",
          phoneNumber: "Telefon raqami",
          whatsappNumber: "WhatsApp raqami",
          uploadCV: "CV-ni yuklang",
          cvFormat: "PDF formatida bo'lishi tavsiya etiladi, maks 5MB",
          confirmCV: "CV-ni tasdiqlash",
          cvConfirmed: "CV tasdiqlandi",
          yearsExperience: "Ish tajribasi yillari",
          countryCode: "Kod",
          profilePicTitle: "Profil rasmi",
          profilePicDesc: "Kompaniyalar sizni tanib olishiga yordam bering. Kvadrat rasmlar eng yaxshi natija beradi.",
          choosePhoto: "Rasmni tanlash",
          confirmPhoto: "Rasmni tasdiqlash",
          photoConfirmed: "Rasm tasdiqlandi",
          change: "O'zgartirish",
          cancel: "Bekor qilish",
          back: "Orqaga",
          completeReg: "Ro'yxatdan o'tishni yakunlash",
          continue: "Davom etish"
        }
      }
    },
    why: {
      tag: "Nima uchun DeskNet",
      heroTitle: "Nima uchun",
      heroTitleAccent: "DeskNet?",
      heroSubtitle: "Ajoyib muhandislik jamoalarini qurish uchun kerak bo'lgan hamma narsa",
      stats: {
        engineers: "Tasdiqlangan muhandislar",
        countries: "Mamlakatlar",
        success: "Muvaffaqiyat darajasi"
      },
      watchDemo: "Qanday ishlashini ko'ring",
      benefitsTag: "afzalliklar",
      benefitsTitle: "Muvaffaqiyatga erishish uchun",
      benefitsTitleAccent: "kerak bo'lgan hamma narsa",
      benefitsSubtitle: "Muhandislar va kompaniyalar uchun mo'ljallangan keng qamrovli xususiyatlar",
      benefits: [
        { title: "Tasdiqlangan iste'dodlar bazasi", desc: "Platformamizdagi har bir muhandis diqqat bilan tekshiriladi va tasdiqlanadi." },
        { title: "Adolatli haq to'lash", desc: "Muhandislar o'z stavkalarini to'liq shaffoflik bilan belgilaydilar." },
        { title: "Xavfsiz to'lovlar", desc: "Bizning eskrou tizimimiz har ikki tomonni ham himoya qiladi." },
        { title: "24/7 qo'llab-quvvatlash", desc: "Bizning maxsus qo'llab-quvvatlash jamoamiz har doim mavjud." },
        { title: "Tezkor moslashtirish", desc: "Bizning aqlli algoritmimiz sizni tezda bog'laydi." },
        { title: "Global tarmoq", desc: "Dunyo bo'ylab iste'dodlarga kiring." }
      ],
      verificationTag: "Tekshirish jarayoni",
      verificationTitle: "Har bir muhandis,",
      verificationTitleAccent: "To'liq tekshirilgan",
      verificationSubtitle: "Bizning qat'iy tekshirish jarayonimiz sizning faqat yuqori darajadagi mutaxassislar bilan ishlashingizni ta'minlaydi. Biografiyani tekshirish, ko'nikmalarni baholash va real vaqtda tekshirish.",
      verificationList: [
        "Texnik ko'nikmalarni baholash",
        "Biografiyani tekshirish",
        "Sertifikatlarni tekshirish",
        "Portfelni ko'rib chiqish"
      ],
      comparisonTag: "Taqqoslash",
      comparisonTitle: "DeskNet va",
      comparisonTitleAccent: "boshqalar",
      comparisonSubtitle: "Nima uchun yetakchi kompaniyalar an'anaviy platformalardan ko'ra DeskNet-ni tanlashini bilib oling",
      comparison: {
        header: ["Xususiyat", "DeskNet", "Boshqalar"],
        rows: [
          ["Iste'dodlarni tekshirish", "Check", "Cheklangan"],
          ["Shaffof narxlar", "Check", "Yashirin to'lovlar"],
          ["Eskrou himoyasi", "Check", "Farq qiladi"],
          ["AI asosida moslashtirish", "Check", "Qo'lda"],
          ["Global qamrov", "92+ Mamlakatlar", "Mintaqaviy"],
          ["Yordam javobi", "< 2 soat", "24-48 soat"]
        ]
      },
      networkTitle: "Haqiqatdan ham",
      networkTitleAccent: "Global tarmoq",
      networkSubtitle: "Barcha asosiy texnologik steklar bo'yicha tajribaga ega 92+ mamlakatdan yuqori darajadagi IT iste'dodlariga kiring.",
      networkStats: [
        { label: "Muhandislar", value: "3.5K+" },
        { label: "Kompaniyalar", value: "35+" },
        { label: "Mamlakatlar", value: "92+" },
        { label: "Uptime", value: "99.9%" }
      ],
      networkLive: "Jonli muhandislar",
      networkProjects: "Faol loyihalar",
      ctaTitle: "O'zgarish qilishga tayyormisiz?",
      ctaSubtitle: "Bugun DeskNet-da minglab muvaffaqiyatli muhandislar va kompaniyalarga qo'shiling.",
      ctaEarning: "Daromad olishni boshlang",
      ctaHiring: "Ishga olishni boshlang",
      ctaBadges: ["SOC 2 sertifikatlangan", "Yashirin to'lovlar yo'q", "24/7 qo'llab-quvvatlash"]
    },
    portal: {
      menu: {
        profile: "Mening profilim",
        jobs: "Ish qidirish",
        messages: "Xabarlar",
        settings: "Sozlamalar",
        logout: "Chiqish"
      },
      profile: {
        verified: "Tasdiqlangan Pro",
        verifiedEngineer: "Tasdiqlangan muhandis",
        edit: "Profilni tahrirlash",
        stats: {
          rate: "Soatlik stavka",
          halfDayRate: "Yarim kunlik stavka",
          fullDayRate: "To'liq kunlik stavka",
          experience: "Tajriba",
          success: "Muvaffaqiyat darajasi"
        },
        skills: "Texnik ko'nikmalar",
        languages: "Tillar",
        contactInfo: "Aloqa ma'lumotlari"
      },
      jobs: {
        searchPlaceholder: "Ishlar, ko'nikmalar yoki kompaniyalarni qidirish...",
        searchBtn: "Ish qidirish",
        apply: "Hozir topshirish",
        remote: "Masofaviy",
        posted: "Joylashtirilgan"
      },
      messages: {
        recent: "So'nggi suhbatlar",
        searchPlaceholder: "Xabarlarni qidirish...",
        empty: "Xabar yuborish uchun suhbatni tanlang"
      },
      settings: {
        account: "Hisob sozlamalari",
        notifications: "Email xabarnomalari",
        notificationsDesc: "Ish haqida ogohlantirishlar va xabarlarni email orqali olish",
        twoFactor: "Ikki bosqichli autentifikatsiya",
        twoFactorDesc: "Hisobingizga qo'shimcha xavfsizlik qatlamini qo'shing",
        privacy: "Maxfiylik",
        visibility: "Profil ko'rinishi",
        visibilityDesc: "Profilingizni qidiruv natijalarida ko'rsatish",
        delete: "Hisobni o'chirish",
        enable: "Yoqish"
      },
      logoutConfirm: {
        title: "Chiqishni tasdiqlash",
        message: "Haqiqatan ham hisobingizdan chiqmoqchimisiz?",
        confirm: "Chiqish",
        cancel: "Bekor qilish"
      },
      cv: {
        view: "CV-ni ko'rish",
        download: "CV-ni yuklab olish"
      }
    },
    clientPortal: {
      welcome: "Mijoz portali",
      guest: "Mehmon",
      subtitle: "Boshlash uchun quyidagi bo'limni tanlang",
      nav: {
        home: "Bosh sahifa",
        logTicket: "Tiket yaratish",
        myTickets: "Mening tiketlarim",
        services: "Xizmatlar va tariflar",
        billing: "Billing",
        userManagement: "Foydalanuvchilarni boshqarish",
        companyProfile: "Kompaniya profili",
        help: "Yordam va qo'llab-quvvatlash",
        messages: "Xabarlar",
        logout: "Chiqish"
      },
      cards: {
        quickActions: { name: "Tezkor harakatlar", desc: "Tez-tez ishlatiladigan funksiyalar va umumiy vazifalar uchun yorliqlarga kirish" },
        logTicket: { name: "Yangi tiket yaratish", desc: "Yangi qo'llab-quvvatlash tiketi yoki xizmat so'rovini yarating va yuboring" },
        activeTickets: { name: "Faol tiketlar", desc: "Hozirgi faol va ochiq tiketlaringizning qisqacha mazmunini ko'ring" },
        awaitingAction: { name: "Harakat kutilmoqda", desc: "Sizning e'tiboringizni yoki tasdiqlashingizni talab qiladigan tiketlar" },
        updates: { name: "Oxirgi yangilanishlar va bildirishnomalar", desc: "Barcha hisob faoliyati va yangilanishlardan xabardor bo'ling" },
        startOpportunity: { name: "Yangi imkoniyatni boshlash", desc: "Yangi loyiha yoki resurs so'rovini boshlang" },
        coordinator: { name: "Tayinlangan DeskNet koordinatori", desc: "Sizning maxsus DeskNet koordinatoringiz uchun aloqa ma'lumotlari va tafsilotlar" },
        accountStatus: { name: "Hisob holati", desc: "Hisobingiz holati, billing va xizmat ko'rsatish tafsilotlari haqida umumiy ma'lumot" }
      },
      common: {
        back: "Orqaga",
        return: "Qaytish",
        updating: "Kontent yangilanmoqda",
        updatingDesc: "Ushbu bo'lim hozirda hisobingiz uchun so'nggi ma'lumotlar va funksiyalar bilan yangilanmoqda. Iltimos, tez orada qaytib ko'ring yoki zudlik bilan yordam kerak bo'lsa, qo'llab-quvvatlash xizmatiga murojaat qiling.",
        edit: "Tahrirlash",
        submit: "Yuborish",
        confirm: "Tasdiqlash",
        cancel: "Bekor qilish",
        loading: "Yuklanmoqda...",
        noData: "Ma'lumot topilmadi",
        viewAll: "Hammasini ko'rish",
        online: "Onlayn",
        typeMessage: "Xabar yozing...",
        noMessages: "Hozircha xabarlar yo'q. Qo'llab-quvvatlash xizmati bilan suhbatni boshlang!"
      },
      logTicket: {
        title: "Yangi tiket yaratish",
        serviceType: "Xizmat turi",
        estimatedDuration: "Taxminiy davomiyligi",
        priority: "Ustuvorlik",
        subject: "Mavzu",
        description: "Batafsil tavsif",
        country: "Mamlakat",
        city: "Shahar",
        location: "To'liq manzil",
        contactEmail: "Aloqa emaili",
        contactPhone: "Aloqa telefon raqami",
        ticketNumber: "Tiket raqami",
        dateTime: "Afzal sana/vaqt",
        review: "Tiketni ko'rib chiqish",
        edit: "Tiketni tahrirlash",
        confirm: "Tasdiqlash va yuborish",
        submitting: "Yuborilmoqda...",
        steps: {
          service: "Xizmat",
          location: "Manzil",
          contact: "Aloqa",
          details: "Tafsilotlar",
          review: "Tekshirish"
        },
        placeholders: {
          subject: "Muammoning qisqacha tavsifi",
          description: "Iloji boricha batafsil ma'lumot bering...",
          location: "To'liq sayt manzili",
          estimatedDuration: "masalan, 4 soat, 2 kun",
          country: "Mamlakatni tanlang",
          city: "Shaharni kiriting",
          contactEmail: "contact@example.com",
          contactPhone: "+1 234 567 890",
          ticketNumber: "Ichki havola raqami"
        },
        options: {
          serviceTypes: {
            onDemand: "Talab bo'yicha yuborish",
            project: "Loyihaga asoslangan",
            maintenance: "Texnik xizmat ko'rsatish",
            hourly: "Soatbay",
            halfDay: "Yarim kun",
            fullDay: "To'liq kun"
          },
          priorities: {
            low: "Past",
            medium: "O'rta",
            high: "Yuqori",
            critical: "Kritik (SLA)"
          }
        }
      },
      myTickets: {
        title: "Mening tiketlarim",
        table: {
          id: "ID",
          subject: "Mavzu",
          status: "Holat",
          engineer: "Muhandis",
          date: "Sana",
          priority: "Ustuvorlik",
          type: "Turi"
        },
        filters: {
          all: "Hammasi",
          status: "Holat",
          priority: "Ustuvorlik",
          search: "Tiketlarni qidirish..."
        },
        status: {
          completed: "Tugallangan",
          resolved: "Hal qilingan",
          inProgress: "Jarayonda",
          open: "Ochiq"
        }
      },
      billing: {
        title: "Billing va hisob-fakturalar",
        balance: "Joriy balans",
        pending: "Kutilayotgan bildirishnomalar",
        nextBilling: "Keyingi hisob-kitob sanasi",
        recentInvoices: "Oxirgi hisob-fakturalar"
      },
      subItems: {
        myTickets: {
          list: "Tiketlar ro'yxati",
          filters: "Filtrlar",
          timeline: "Tiket holati xronologiyasi",
          quotation: "Kotirovka va xarajatlar ko'rinishi",
          engineer: "Muhandis tayinlash tafsilotlari",
          comments: "Tiket sharhlari va yangilanishlari",
          completion: "Tugatish va qayta aloqa harakatlari"
        },
        services: {
          catalog: "Xizmatlar katalogi",
          models: "Hamkorlik modellari",
          coverage: "Mamlakat qamrovi",
          rates: "Standart stavka ko'rsatmalari",
          notes: "Tijorat eslatmalari"
        },
        billing: {
          advice: "Oylik billing maslahati",
          approval: "Billing maslahatini tasdiqlash",
          invoices: "Hisob-fakturalar",
          history: "Billing tarixi"
        },
        userManagement: {
          addRemove: "Foydalanuvchilarni qo'shish/o'chirish",
          roles: "Rollarni tayinlash",
          access: "Kirish nazorati",
          logs: "Faoliyat jurnallari"
        },
        opportunities: {
          dispatch: "Talab bo'yicha yuborish",
          project: "Loyiha asosida",
          contract: "Shartnoma asosida",
          fte: "To'liq stavka",
          msp: "Boshqariladigan xizmatlar",
          tracking: "Imkoniyatlarni kuzatish"
        },
        companyProfile: {
          details: "Kompaniya tafsilotlari",
          contact: "Aloqa ma'lumotlari",
          location: "Manzil",
          billing: "Billing ma'lumotlari",
          operating: "Faoliyat yuritayotgan mamlakatlar",
          industry: "Sanoat"
        },
        help: {
          howItWorks: "Bu qanday ishlaydi",
          faqs: "Ko'p beriladigan savollar",
          contact: "Yordam xizmati aloqa ma'lumotlari",
          country: "Mamlakat yordami",
          city: "Shahar yordami",
          location: "To'liq manzil",
          guidelines: "Portal ko'rsatmalari"
        }
      },
      services: {
        title: "Xizmatlar va tariflar",
        onDemand: { title: "Talab bo'yicha yuborish", price: "$45/soatdan", desc: "Favqulodda ta'mirlash va texnik xizmat ko'rsatish uchun tezkor javob." },
        project: { title: "Loyihaga asoslangan", price: "Maxsus kotirovka", desc: "Loyihalarni to'liq boshqarish va amalga oshirish." },
        managed: { title: "Boshqariladigan xizmatlar", price: "Oylik to'lov", desc: "Infratuzilmangizni doimiy monitoring qilish va qo'llab-quvvatlash." },
        coverage: {
          title: "Global qamrov",
          desc: "Biz 150 dan ortiq mamlakatlarda 20 000 dan ortiq sertifikatlangan muhandislar tarmog'i bilan xizmat ko'rsatamiz.",
          cta: "Qamrov xaritasini ko'rish"
        }
      },
      userManagement: {
        title: "Foydalanuvchilarni boshqarish",
        addUser: "Foydalanuvchi qo'shish",
        noUsers: "Sub-foydalanuvchilar topilmadi. Birinchi jamoa a'zosini qo'shing!"
      },
      companyProfile: {
        title: "Kompaniya profili",
        memberSince: "A'zo bo'lgan sana",
        generalInfo: "Umumiy ma'lumot",
        industry: "Sanoat",
        employees: "Xodimlar",
        website: "Veb-sayt",
        contactDetails: "Aloqa ma'lumotlari",
        primaryAddress: "Asosiy manzil",
        country: "Mamlakat",
        city: "Shahar",
        location: "To'liq manzil"
      },
      help: {
        title: "Yordam va qo'llab-quvvatlash",
        faqs: "Ko'p beriladigan savollar",
        faqItems: [
          { q: 'Kritik chiptalar uchun SLA qanday?', a: 'Kritik chiptalar uchun 4 soatlik joyida javob berish vaqti kafolatlanadi.' },
          { q: 'Muhandislar qanday tekshiriladi?', a: 'Barcha muhandislar texnik baholash va fon tekshiruvidan o\'tadilar.' },
          { q: 'Rejalashtirilgan jo\'natishni bekor qila olamanmi?', a: 'Ha, lekin 24 soat ichida bekor qilish to\'lovga olib kelishi mumkin.' }
        ],
        howItWorksItems: [
          { step: '01', title: 'Chipta yaratish', desc: 'So\'rovingizni portal orqali yuboring.' },
          { step: '02', title: 'Tayinlash', desc: 'Biz tasdiqlangan muhandisni tanlaymiz.' },
          { step: '03', title: 'Bajarish', desc: 'Muhandis ishni joyida bajaradi.' },
          { step: '04', title: 'Yakunlash', desc: 'Xizmatni ko\'rib chiqing va tasdiqlang.' }
        ],
        immediateHelp: "Zudlik bilan yordam kerakmi?",
        supportCenter: "Global qo'llab-quvvatlash markazi",
        accountManager: "Hisob menejeri",
        managerName: "Alex Thompson",
        managerRole: "Maxsus muvaffaqiyat menejeri",
        supportDesc: "Bizning qo'llab-quvvatlash jamoamiz har qanday texnik muammolarda yordam berish uchun 24/7 ishlaydi.",
        liveChat: "Jonli chat",
        waitTime: "O'rtacha kutish vaqti: 2 daqiqa",
        startChat: "Chatni boshlash"
      },
      messages: {
        title: "Xabarlar",
        conversations: "Suhbatlar",
        activeChat: "Faol yordam chati"
      },
      addUser: {
        title: "Yangi foydalanuvchi qo'shish",
        username: "Foydalanuvchi nomi",
        usernamePlaceholder: "Foydalanuvchi nomini kiriting",
        email: "Elektron pochta manzili",
        emailPlaceholder: "user@company.com",
        role: "Rol",
        roles: {
          admin: "Admin",
          manager: "Menejer",
          viewer: "Ko'ruvchi"
        },
        submit: "Foydalanuvchi yaratish"
      }
    }
  }
};
