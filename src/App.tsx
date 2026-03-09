import { motion, AnimatePresence, useInView, animate } from "motion/react";
import { 
  HiArrowRight as ArrowRight, 
  HiPlay as Play, 
  HiStar as Star,
  HiUsers as Users, 
  HiGlobeAlt as Globe, 
  HiBolt as Zap, 
  HiShieldCheck as Shield, 
  HiCheckCircle as CheckCircle, 
  HiArrowTrendingUp as TrendingUp,
  HiChartBar as BarChart3,
  HiSquares2X2 as Layers,
  HiAcademicCap as Award,
  HiChevronDown as ChevronDown,
  HiSparkles as Sparkles,
  HiCheck as Check,
  HiXMark as X,
  HiEnvelope as Mail,
  HiLockClosed as Lock,
  HiUser as User,
  HiBriefcase as Briefcase,
  HiShieldCheck as ShieldCheck,
  HiCalendar as Calendar,
  HiMapPin as MapPin,
  HiCodeBracket as Code,
  HiClock as Clock,
  HiCurrencyDollar as DollarSign,
  HiLanguage as Languages,
  HiPhone as Phone,
  HiDocumentText as FileText,
  HiCamera as Camera,
  HiHome as Home,
  HiInformationCircle as Info,
  HiLifebuoy as LifeBuoy,
  HiExclamationCircle as AlertCircle,
  HiChatBubbleLeftRight as MessageSquare,
  HiPaperAirplane as Send,
  HiArrowPath as Loader2,
  HiArrowTopRightOnSquare as ExternalLink,
  HiEye as Eye,
  HiEyeSlash as EyeOff
} from "react-icons/hi2";
import { 
  FaTwitter as Twitter, 
  FaLinkedin as Linkedin, 
  FaGithub as Github 
} from "react-icons/fa6";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { Language } from "./translations";
import React, { useState, useEffect, useMemo, useRef } from "react";
import Select from 'react-select';
import { Country } from 'country-state-city';
import EngineerSignUpFlow from "./components/EngineerSignUpFlow";
import EngineerPortal from "./components/EngineerPortal";
import ClientPortal from "./components/ClientPortal";
import AdminPortal from "./components/AdminPortal";
import { GoogleGenAI } from "@google/genai";
import { 
  auth, 
  db, 
  isFirebaseConfigured,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged, 
  signOut,
  doc, 
  getDoc, 
  setDoc, 
  addDoc,
  collection,
  serverTimestamp
} from "./firebase";
// import { 
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   onAuthStateChanged, 
//   signOut,
//   User as FirebaseUser
// } from "firebase/auth";
// import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import createGlobe from "cobe";

const GlobeAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionStart = useRef<number | null>(null);
  const [r, setR] = useState(0);

  useEffect(() => {
    let phi = 0;
    let width = 0;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener('resize', onResize);
    onResize();

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.039, 0.066, 0.125], // #0A1120
      markerColor: [0.176, 0.831, 0.749], // #2DD4BF (brand-teal)
      glowColor: [0.176, 0.831, 0.749],
      markers: [
        // North America
        { location: [37.7749, -122.4194], size: 0.03 }, // San Francisco
        { location: [40.7128, -74.0060], size: 0.03 }, // New York
        { location: [45.4215, -75.6972], size: 0.03 }, // Ottawa
        { location: [19.4326, -99.1332], size: 0.03 }, // Mexico City
        { location: [34.0522, -118.2437], size: 0.03 }, // LA
        { location: [25.7617, -80.1918], size: 0.03 }, // Miami
        { location: [51.0447, -114.0719], size: 0.03 }, // Calgary
        
        // South America
        { location: [-23.5505, -46.6333], size: 0.03 }, // Sao Paulo
        { location: [-34.6037, -58.3816], size: 0.03 }, // Buenos Aires
        { location: [4.7110, -74.0721], size: 0.03 }, // Bogota
        { location: [-12.0464, -77.0428], size: 0.03 }, // Lima
        { location: [-33.4489, -70.6693], size: 0.03 }, // Santiago
        
        // Europe
        { location: [51.5074, -0.1278], size: 0.03 }, // London
        { location: [48.8566, 2.3522], size: 0.03 }, // Paris
        { location: [52.5200, 13.4050], size: 0.03 }, // Berlin
        { location: [40.4168, -3.7038], size: 0.03 }, // Madrid
        { location: [41.9028, 12.4964], size: 0.03 }, // Rome
        { location: [52.3676, 4.9041], size: 0.03 }, // Amsterdam
        { location: [59.3293, 18.0686], size: 0.03 }, // Stockholm
        { location: [50.0755, 14.4378], size: 0.03 }, // Prague
        { location: [52.2297, 21.0122], size: 0.03 }, // Warsaw
        { location: [47.4979, 19.0402], size: 0.03 }, // Budapest
        { location: [60.1699, 24.9384], size: 0.03 }, // Helsinki
        { location: [59.9139, 10.7522], size: 0.03 }, // Oslo
        { location: [38.7223, -9.1393], size: 0.03 }, // Lisbon
        { location: [37.9838, 23.7275], size: 0.03 }, // Athens
        
        // Africa
        { location: [6.5244, 3.3792], size: 0.03 }, // Lagos
        { location: [-26.2041, 28.0473], size: 0.03 }, // Johannesburg
        { location: [-1.2921, 36.8219], size: 0.03 }, // Nairobi
        { location: [30.0444, 31.2357], size: 0.03 }, // Cairo
        { location: [33.5731, -7.5898], size: 0.03 }, // Casablanca
        { location: [9.0249, 38.7469], size: 0.03 }, // Addis Ababa
        { location: [5.6037, -0.1870], size: 0.03 }, // Accra
        
        // Asia
        { location: [35.6895, 139.6917], size: 0.03 }, // Tokyo
        { location: [31.2304, 121.4737], size: 0.03 }, // Shanghai
        { location: [37.5665, 126.9780], size: 0.03 }, // Seoul
        { location: [1.3521, 103.8198], size: 0.03 }, // Singapore
        { location: [13.7563, 100.5018], size: 0.03 }, // Bangkok
        { location: [-6.2088, 106.8456], size: 0.03 }, // Jakarta
        { location: [14.5995, 120.9842], size: 0.03 }, // Manila
        { location: [19.0760, 72.8777], size: 0.03 }, // Mumbai
        { location: [28.6139, 77.2090], size: 0.03 }, // Delhi
        { location: [12.9716, 77.5946], size: 0.03 }, // Bangalore
        { location: [25.2048, 55.2708], size: 0.03 }, // Dubai
        { location: [24.7136, 46.6753], size: 0.03 }, // Riyadh
        { location: [41.0082, 28.9784], size: 0.03 }, // Istanbul
        { location: [41.3275, 69.2263], size: 0.03 }, // Tashkent
        { location: [43.2220, 76.8512], size: 0.03 }, // Almaty
        { location: [40.4093, 49.8671], size: 0.03 }, // Baku
        { location: [32.0853, 34.7818], size: 0.03 }, // Tel Aviv
        { location: [10.8231, 106.6297], size: 0.03 }, // Ho Chi Minh City
        
        // Oceania
        { location: [-33.8688, 151.2093], size: 0.03 }, // Sydney
        { location: [-37.8136, 144.9631], size: 0.03 }, // Melbourne
        { location: [-36.8485, 174.7633], size: 0.03 }, // Auckland
        { location: [-27.4705, 153.0260], size: 0.03 }, // Brisbane
        
        // Additional to reach ~92+ countries representation
        { location: [55.7558, 37.6173], size: 0.03 }, // Moscow
        { location: [64.1466, -21.9426], size: 0.03 }, // Reykjavik
        { location: [60.1282, 18.6435], size: 0.03 }, // Sweden (Central)
        { location: [56.1304, -106.3468], size: 0.03 }, // Canada (Central)
        { location: [-25.2744, 133.7751], size: 0.03 }, // Australia (Central)
        { location: [20.5937, 78.9629], size: 0.03 }, // India (Central)
        { location: [35.8617, 104.1954], size: 0.03 }, // China (Central)
        { location: [-14.2350, -51.9253], size: 0.03 }, // Brazil (Central)
        { location: [9.0820, 8.6753], size: 0.03 }, // Nigeria (Central)
        { location: [34.8021, 106.4606], size: 0.03 }, // Japan (Central)
        { location: [23.6345, -102.5528], size: 0.03 }, // Mexico (Central)
        { location: [46.2276, 2.2137], size: 0.03 }, // France (Central)
        { location: [51.1657, 10.4515], size: 0.03 }, // Germany (Central)
        { location: [41.8719, 12.5674], size: 0.03 }, // Italy (Central)
        { location: [52.1326, 5.2913], size: 0.03 }, // Netherlands (Central)
        { location: [50.5039, 4.4699], size: 0.03 }, // Belgium (Central)
        { location: [47.5162, 14.5501], size: 0.03 }, // Austria (Central)
        { location: [46.8182, 8.2275], size: 0.03 }, // Switzerland (Central)
        { location: [53.3498, -6.2603], size: 0.03 }, // Dublin
        { location: [55.6761, 12.5683], size: 0.03 }, // Copenhagen
        { location: [59.4370, 24.7535], size: 0.03 }, // Tallinn
        { location: [56.9496, 24.1052], size: 0.03 }, // Riga
        { location: [54.6872, 25.2797], size: 0.03 }, // Vilnius
        { location: [45.8150, 15.9819], size: 0.03 }, // Zagreb
        { location: [44.4268, 26.1025], size: 0.03 }, // Bucharest
        { location: [42.6977, 23.3219], size: 0.03 }, // Sofia
        { location: [44.7866, 20.4489], size: 0.03 }, // Belgrade
        { location: [41.3275, 19.8187], size: 0.03 }, // Tirana
        { location: [35.1856, 33.3823], size: 0.03 }, // Nicosia
        { location: [35.9375, 14.3754], size: 0.03 }, // Malta
        { location: [33.8886, 35.4955], size: 0.03 }, // Beirut
        { location: [31.9454, 35.9284], size: 0.03 }, // Amman
        { location: [29.3759, 47.9774], size: 0.03 }, // Kuwait City
        { location: [25.2854, 51.5310], size: 0.03 }, // Doha
        { location: [26.2285, 50.5860], size: 0.03 }, // Manama
        { location: [23.5859, 58.4059], size: 0.03 }, // Muscat
      ],
      onRender: (state) => {
        if (!pointerInteracting.current) {
          phi += 0.005;
        }
        state.phi = phi + r;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [r]);

  return (
    <div className="w-full h-full flex items-center justify-center relative group cursor-grab active:cursor-grabbing">
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionStart.current!;
          canvasRef.current!.setPointerCapture(e.pointerId);
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
        }}
        onPointerMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionStart.current = e.clientX;
            setR(prev => prev + delta / 200);
          }
        }}
        style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: "1" }}
      />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-brand-teal/10 backdrop-blur-sm border border-brand-teal/20 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <p className="text-[10px] font-bold text-brand-teal uppercase tracking-widest">Drag to Rotate</p>
      </div>
    </div>
  );
};

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

import Logo from "./components/Logo";
import PlexusBackground from "./components/PlexusBackground";
import WorldMap from "./components/WorldMap";

const Navbar = ({ 
  onLoginClick, 
  onSignUpClick, 
  currentPage, 
  setCurrentPage 
}: { 
  onLoginClick: () => void, 
  onSignUpClick: () => void,
  currentPage: string,
  setCurrentPage: (page: string) => void
}) => {
  const { t, language, setLanguage } = useLanguage();
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'ru', label: 'Russian', flag: '🇷🇺' },
    { code: 'uz', label: 'Uzbek', flag: '🇺🇿' }
  ];

  const navLinks = [
    { id: 'home', label: t.nav.home, icon: Home },
    { id: 'about', label: t.about.tag, icon: Info },
    { id: 'why', label: t.why.tag, icon: Sparkles }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/40 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo />
        </div>
        
        {/* Navigation Links - Pill Container */}
        <div className="hidden lg:flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-2xl">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentPage === link.id;
            return (
              <motion.button
                key={link.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentPage(link.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex items-center gap-2 px-5 py-2 text-xs font-medium transition-all rounded-xl relative ${
                  isActive 
                    ? 'text-brand-dark' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active-bg"
                    className="absolute inset-0 bg-brand-teal rounded-xl shadow-[0_0_20px_rgba(45,212,191,0.3)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-dark' : 'text-white/40'}`} />
                  {link.label}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-active-dot"
                      className="w-1 h-1 bg-brand-dark rounded-full"
                    />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <button 
              onClick={() => setIsLangModalOpen(!isLangModalOpen)}
              className="flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-white transition-all"
            >
              <Globe className="w-4 h-4" />
              <span>{languages.find(l => l.code === language)?.label}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isLangModalOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Language Dropdown */}
            <AnimatePresence>
              {isLangModalOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-[90]" 
                    onClick={() => setIsLangModalOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-4 w-48 bg-brand-card border border-white/10 rounded-2xl p-2 shadow-2xl z-[100] overflow-hidden"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangModalOpen(false);
                        }}
                        className={`w-full p-3 rounded-xl text-left flex items-center justify-between group transition-all ${language === lang.code ? 'bg-brand-teal text-brand-dark' : 'hover:bg-white/5 text-white/60 hover:text-white'}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{lang.flag}</span>
                          <span className="font-bold text-xs">{lang.label}</span>
                        </div>
                        {language === lang.code && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          
          <button 
            onClick={onLoginClick}
            className="hidden sm:block text-xs font-semibold text-white/60 hover:text-white transition-all"
          >
            {t.nav.login}
          </button>
          
          <button 
            onClick={onSignUpClick}
            className="px-6 py-2.5 bg-brand-teal text-brand-dark text-xs font-semibold rounded-xl hover:bg-teal-300 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(45,212,191,0.2)]"
          >
            {t.nav.signUp || "Sign Up"}
          </button>
        </div>
      </div>
    </nav>
  );
};

const HomeHero = ({ onSignUpClick, onWatchDemoClick }: { onSignUpClick: () => void, onWatchDemoClick: () => void }) => {
  const { t } = useLanguage();
  
  return (
    <section className="relative pt-48 pb-32 px-6 overflow-hidden min-h-screen flex items-center bg-[#0A1120]">
      {/* Background Video */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        poster="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070"
        className="absolute top-0 left-0 w-full h-full object-cover -z-20 opacity-20 transition-opacity duration-1000"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-circuit-board-1011-large.mp4" type="video/mp4" />
      </video>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/40 to-brand-dark/80 -z-10" />
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[600px] bg-brand-teal/5 blur-[150px] rounded-full -z-10" />
      
      <div className="max-w-5xl mx-auto text-center relative">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.1] text-white"
        >
          {t.hero.title} <br />
          <span className="text-brand-teal drop-shadow-[0_0_30px_rgba(45,212,191,0.2)]">{t.hero.titleAccent}</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-sm md:text-base text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <motion.button 
            onClick={onSignUpClick}
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(45,212,191,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-brand-teal text-brand-dark font-medium rounded-2xl hover:bg-teal-300 transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(45,212,191,0.2)]"
          >
            <span className="text-sm">{t.hero.ctaPrimary}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <motion.button 
            onClick={onWatchDemoClick}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 bg-brand-dark/40 border border-white/10 text-white font-medium rounded-2xl transition-all flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-brand-teal/10 rounded-full flex items-center justify-center border border-brand-teal/20 group-hover:bg-brand-teal group-hover:text-brand-dark transition-all">
              <Play className="w-4 h-4 text-brand-teal fill-brand-teal group-hover:text-brand-dark group-hover:fill-brand-dark transition-colors" />
            </div>
            <span className="text-sm">{t.hero.ctaSecondary}</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

const VideoDemoModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState("");
  const [hasKey, setHasKey] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      checkKey();
    }
  }, [isOpen]);

  const checkKey = async () => {
    const selected = await window.aistudio.hasSelectedApiKey();
    setHasKey(selected);
  };

  const handleOpenKeySelector = async () => {
    await window.aistudio.openSelectKey();
    setHasKey(true);
  };

  const generateVideo = async () => {
    setIsGenerating(true);
    setError(null);
    setStatus("Initializing Veo model...");
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      setStatus("Sending prompt to Veo... This might take a few minutes.");
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: 'A cinematic high-tech demonstration of a global IT talent network platform. Sleek 3D interfaces showing engineers connecting from across the globe, digital maps glowing in teal, and professional collaboration in a futuristic workspace. High-end lighting and smooth camera movements.',
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      const messages = [
        "Analyzing your request...",
        "Crafting cinematic visuals...",
        "Rendering global network nodes...",
        "Finalizing high-tech demonstration...",
        "Optimizing for playback..."
      ];
      let msgIndex = 0;

      while (!operation.done) {
        setStatus(messages[msgIndex % messages.length]);
        msgIndex++;
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      setStatus("Video generated! Preparing download...");
      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      
      if (downloadLink) {
        const response = await fetch(downloadLink, {
          method: 'GET',
          headers: {
            'x-goog-api-key': process.env.API_KEY || '',
          },
        });
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
      } else {
        throw new Error("Failed to retrieve video link.");
      }
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("Requested entity was not found")) {
        setHasKey(false);
        setError("API Key session expired or invalid. Please re-select your key.");
      } else {
        setError("An error occurred during video generation. Please try again.");
      }
    } finally {
      setIsGenerating(false);
      setStatus("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-dark/90 backdrop-blur-md"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-4xl bg-brand-card border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-white/40 hover:text-white transition-colors z-20 bg-brand-dark/50 rounded-full backdrop-blur-sm"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3 text-white">Platform Demonstration</h2>
            <p className="text-white/50">Experience the future of global IT talent management</p>
          </div>

          <div className="aspect-video bg-brand-dark/50 rounded-2xl border border-white/5 flex flex-col items-center justify-center relative overflow-hidden group">
            {videoUrl ? (
              <video 
                src={videoUrl} 
                controls 
                autoPlay 
                className="w-full h-full object-cover"
              />
            ) : isGenerating ? (
              <div className="text-center p-8">
                <Loader2 className="w-12 h-12 text-brand-teal animate-spin mx-auto mb-6" />
                <p className="text-xl font-bold text-white mb-2">{status}</p>
                <p className="text-sm text-white/40">This usually takes 1-3 minutes. Please stay on this page.</p>
              </div>
            ) : !hasKey ? (
              <div className="text-center p-8 max-w-md">
                <div className="w-16 h-16 bg-brand-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-8 h-8 text-brand-teal" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">API Key Required</h3>
                <p className="text-sm text-white/50 mb-8 leading-relaxed">
                  To generate high-quality AI video demonstrations, you need to select a paid Gemini API key from your Google Cloud project.
                </p>
                <div className="space-y-4">
                  <button 
                  onClick={handleOpenKeySelector}
                  className="w-full py-4 bg-brand-teal text-brand-dark font-semibold rounded-xl hover:bg-teal-300 transition-all flex items-center justify-center gap-2"
                >
                  Select API Key
                </button>
                  <a 
                    href="https://ai.google.dev/gemini-api/docs/billing" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-brand-teal hover:underline flex items-center justify-center gap-1"
                  >
                    Learn about billing <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                  <Play className="w-10 h-10 text-brand-teal fill-brand-teal" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Generate</h3>
                <p className="text-white/50 mb-10 max-w-sm mx-auto">
                  Click below to generate a real-time AI demonstration of the DeskNet platform.
                </p>
                <button 
                  onClick={generateVideo}
                  className="px-12 py-4 bg-brand-teal text-brand-dark font-semibold rounded-xl hover:bg-teal-300 transition-all shadow-lg shadow-brand-teal/20"
                >
                  Generate Demo Video
                </button>
              </div>
            )}

            {error && (
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const AboutUs = () => {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<'globe' | 'map'>('globe');

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal/10 border border-brand-teal/20 mb-8">
                <span className="text-[10px] font-bold text-brand-teal uppercase tracking-widest">{t.about.tag}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                {t.about.heroTitle}
              </h1>
              <p className="text-lg md:text-xl text-white/50 max-w-xl leading-relaxed mb-10">
                {t.about.heroDesc}
              </p>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setViewMode('globe')}
                  className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${viewMode === 'globe' ? 'bg-brand-teal text-brand-dark shadow-[0_0_20px_rgba(45,212,191,0.3)]' : 'bg-white/5 text-white/40 hover:text-white'}`}
                >
                  3D Globe
                </button>
                <button 
                  onClick={() => setViewMode('map')}
                  className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${viewMode === 'map' ? 'bg-brand-teal text-brand-dark shadow-[0_0_20px_rgba(45,212,191,0.3)]' : 'bg-white/5 text-white/40 hover:text-white'}`}
                >
                  World Map
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <AnimatePresence mode="wait">
                {viewMode === 'globe' ? (
                  <motion.div 
                    key="globe"
                    initial={{ opacity: 0, rotateY: -20 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 20 }}
                    className="relative w-full aspect-square max-w-[600px] mx-auto flex items-center justify-center"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <GlobeAnimation />
                    </div>
                    
                    {/* Floating Stats Cards */}
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      whileHover={{ scale: 1.1, zIndex: 30 }}
                      className="absolute top-10 -left-10 glass-card p-4 border-white/10 shadow-2xl z-20 cursor-default hover-glow"
                    >
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Verified Engineers</p>
                      <p className="text-xl font-bold text-brand-teal"><Counter value="3,500+" /></p>
                    </motion.div>

                    <motion.div 
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      whileHover={{ scale: 1.1, zIndex: 30 }}
                      className="absolute bottom-20 -right-10 glass-card p-4 border-white/10 shadow-2xl z-20 cursor-default hover-glow"
                    >
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Countries</p>
                      <p className="text-xl font-bold text-brand-teal"><Counter value="92+" /></p>
                    </motion.div>

                    {/* Central Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-teal/10 blur-[100px] rounded-full -z-10" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="map"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="w-full"
                  >
                    <WorldMap />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-32 pt-16 border-t border-white/5">
            {[
              { value: '3.5K+', label: t.stats.verified },
              { value: '35+', label: t.stats.partners },
              { value: '95%', label: t.stats.satisfaction },
              { value: '48h', label: t.stats.matchTime }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center md:text-left"
              >
                <p className="text-4xl font-bold text-brand-teal mb-2"><Counter value={stat.value} /></p>
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal/10 border border-brand-teal/20 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
                <span className="text-[10px] font-bold text-brand-teal uppercase tracking-widest">{t.about.missionTag}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                {t.about.missionTitle}
              </h2>
              <p className="text-lg text-white/50 mb-10 leading-relaxed max-w-xl">
                {t.about.missionDesc}
              </p>
              <div className="flex items-center gap-3 text-white/40 group cursor-default">
                <span className="text-sm font-bold uppercase tracking-widest group-hover:text-brand-teal transition-colors">{t.about.rigorousVetting}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=2070" 
                  alt="Global Tech Collaboration" 
                  className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-8 left-8 z-20">
                  <div className="w-12 h-12 bg-brand-teal rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <Users className="w-6 h-6 text-brand-dark" />
                  </div>
                  <p className="text-2xl font-bold text-white max-w-xs leading-tight">
                    Connecting the best minds in tech
                  </p>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/20 blur-[60px] rounded-full -z-10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values & Process Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-32">
            <div className="text-center mb-16">
              <p className="text-xs font-bold text-brand-teal uppercase tracking-widest mb-4">{t.about.valuesTag}</p>
              <h2 className="text-4xl font-bold mb-4">{t.about.valuesTitle}</h2>
              <p className="text-white/60">{t.about.valuesSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(t.about.values).map(([key, value]: [string, any], i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 20 }}
                  className="glass-card p-8 hover:bg-white/10 transition-all group hover-glow"
                  whileHover={{ y: -10, scale: 1.02, boxShadow: "0 20px 40px rgba(45,212,191,0.1)" }}
                >
                  <h3 className="text-xl font-bold mb-4 group-hover:text-brand-teal transition-colors">{value.title}</h3>
                  <p className="text-white/60 leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">{t.about.howItWorksTitle}</h2>
              <p className="text-white/60">{t.about.howItWorksSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="glass-card p-10">
                <h3 className="text-2xl font-bold mb-8 text-brand-teal">{t.about.forEngineers}</h3>
                <div className="space-y-8">
                  {t.about.steps.engineers.map((step: any, i: number) => (
                    <motion.div 
                      key={i} 
                      className="flex gap-6 group p-4 rounded-2xl hover:bg-white/5 transition-all cursor-default"
                      whileHover={{ x: 10 }}
                    >
                      <div className="w-10 h-10 rounded-full bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center flex-shrink-0 font-bold text-brand-teal group-hover:bg-brand-teal group-hover:text-brand-dark transition-all">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-bold mb-2 group-hover:text-brand-teal transition-colors">{step.title}</h4>
                        <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="glass-card p-10">
                <h3 className="text-2xl font-bold mb-8 text-brand-teal">{t.about.forCompanies}</h3>
                <div className="space-y-8">
                  {t.about.steps.companies.map((step: any, i: number) => (
                    <motion.div 
                      key={i} 
                      className="flex gap-6 group p-4 rounded-2xl hover:bg-white/5 transition-all cursor-default"
                      whileHover={{ x: 10 }}
                    >
                      <div className="w-10 h-10 rounded-full bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center flex-shrink-0 font-bold text-brand-teal group-hover:bg-brand-teal group-hover:text-brand-dark transition-all">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-bold mb-2 group-hover:text-brand-teal transition-colors">{step.title}</h4>
                        <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-teal/10 rounded-3xl p-12 md:p-20 text-center border border-brand-teal/20">
            <h2 className="text-4xl font-bold mb-6">{t.about.ctaTitle}</h2>
            <p className="text-white/60 mb-10 max-w-2xl mx-auto">{t.about.ctaSubtitle}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-10 py-4 bg-brand-teal text-brand-dark font-semibold rounded-xl hover:bg-teal-300 transition-all">
                {t.about.getStarted}
              </button>
              <button className="px-10 py-4 bg-white/5 text-white font-semibold rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                {t.about.learnMore}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const WhyDeskNet = () => {
  const { t } = useLanguage();
  return (
    <div className="pt-24">
      <section className="py-24 px-6 relative overflow-hidden min-h-[90vh] flex flex-col items-center justify-center">
        {/* Background Video */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          poster="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070"
          className="absolute top-0 left-0 w-full h-full object-cover -z-20 opacity-10 transition-opacity duration-1000"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-circuit-board-1011-large.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-brand-dark/40 -z-10" />

        {/* Atmospheric Backgrounds */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-teal/5 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-teal/5 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-teal/5 border border-brand-teal/20 mb-10">
                <Star className="w-3.5 h-3.5 text-brand-teal fill-brand-teal" />
                <span className="text-xs font-medium text-brand-teal tracking-wide">Trusted by leading companies</span>
              </div>

              <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
                {t.why.heroTitle} <span className="text-brand-teal">{t.why.heroTitleAccent}</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/60 mb-16 leading-relaxed max-w-2xl mx-auto font-medium">
                {t.why.heroSubtitle}
              </p>

              <div className="grid grid-cols-3 gap-8 mb-20 max-w-3xl mx-auto">
                <div>
                  <div className="text-5xl md:text-6xl font-bold text-brand-teal mb-3 tracking-tighter"><Counter value="25K+" /></div>
                  <div className="text-sm font-medium text-white/40">{t.why.stats.engineers}</div>
                </div>
                <div>
                  <div className="text-5xl md:text-6xl font-bold text-brand-teal mb-3 tracking-tighter"><Counter value="92+" /></div>
                  <div className="text-sm font-medium text-white/40">{t.why.stats.countries}</div>
                </div>
                <div>
                  <div className="text-5xl md:text-6xl font-bold text-brand-teal mb-3 tracking-tighter"><Counter value="98%" /></div>
                  <div className="text-sm font-medium text-white/40">{t.why.stats.success}</div>
                </div>
              </div>

              <div className="flex justify-center mb-24">
                <button className="flex items-center gap-4 px-8 py-4 bg-white/[0.03] border border-white/10 rounded-full hover:bg-white/[0.08] transition-all group">
                  <div className="w-10 h-10 bg-brand-teal rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(45,212,191,0.3)]">
                    <Play className="w-4 h-4 text-brand-dark fill-brand-dark ml-0.5" />
                  </div>
                  <span className="text-base font-semibold text-white">{t.why.watchDemo}</span>
                  <ArrowRight className="w-4 h-4 text-white/40 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Scroll Indicator */}
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-2 opacity-40"
              >
                <div className="w-5 h-8 rounded-full border-2 border-white/30 flex justify-center p-1">
                  <div className="w-1 h-2 bg-brand-teal rounded-full" />
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="mt-32 mb-32">
            <div className="text-center mb-20">
              <p className="text-xs font-semibold text-brand-teal uppercase tracking-widest mb-4">{t.why.benefitsTag}</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t.why.benefitsTitle} <span className="text-gradient-teal">{t.why.benefitsTitleAccent}</span>
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto font-medium">{t.why.benefitsSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.why.benefits.map((benefit: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 20 }}
                  className="glass-card p-8 hover:border-brand-teal/30 transition-all hover-glow"
                  whileHover={{ y: -10, scale: 1.02, boxShadow: "0 20px 40px rgba(45,212,191,0.1)" }}
                >
                  <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Check className="w-6 h-6 text-brand-teal" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-brand-teal transition-colors">{benefit.title}</h3>
                  <p className="text-white/60 leading-relaxed font-normal">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-semibold text-brand-teal uppercase tracking-widest mb-4">{t.why.verificationTag}</p>
              <h2 className="text-4xl font-bold mb-8 leading-tight">
                {t.why.verificationTitle} <br />
                <span className="text-brand-teal">{t.why.verificationTitleAccent}</span>
              </h2>
              <p className="text-lg text-white/60 mb-10 leading-relaxed font-medium">
                {t.why.verificationSubtitle}
              </p>
              <div className="space-y-4">
                {t.why.verificationList.map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-brand-teal/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-brand-teal" />
                    </div>
                    <span className="font-medium text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-10"
            >
              <div className="space-y-8">
                <motion.div 
                  whileHover={{ x: 10, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                  className="flex justify-between items-center p-6 bg-white/5 rounded-2xl border border-white/10 transition-all cursor-default"
                >
                  <div className="font-semibold">Technical Skills</div>
                  <div className="px-4 py-1 bg-brand-teal/20 text-brand-teal rounded-full text-xs font-semibold">Verified</div>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 10, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                  className="flex justify-between items-center p-6 bg-white/5 rounded-2xl border border-white/10 transition-all cursor-default"
                >
                  <div className="font-semibold">Background Check</div>
                  <div className="px-4 py-1 bg-brand-teal/20 text-brand-teal rounded-full text-xs font-semibold">Passed</div>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 10, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                  className="flex justify-between items-center p-6 bg-white/5 rounded-2xl border border-white/10 transition-all cursor-default"
                >
                  <div className="font-semibold">Identity Verification</div>
                  <div className="px-4 py-1 bg-brand-teal/20 text-brand-teal rounded-full text-xs font-semibold">Confirmed</div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <div className="mb-32">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold text-brand-teal uppercase tracking-widest mb-4">{t.why.comparisonTag}</p>
              <h2 className="text-4xl font-bold mb-4">
                {t.why.comparisonTitle} <span className="text-brand-teal">{t.why.comparisonTitleAccent}</span>
              </h2>
              <p className="text-white/60 font-medium">{t.why.comparisonSubtitle}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    {t.why.comparison.header.map((h: string, i: number) => (
                      <th key={i} className={`py-6 px-8 font-bold text-lg ${i === 1 ? 'text-brand-teal' : ''}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.why.comparison.rows.map((row: string[], i: number) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="py-6 px-8 text-white/60 font-medium">{row[0]}</td>
                      <td className="py-6 px-8 font-bold text-brand-teal">
                        {row[1] === 'Check' ? <Check className="w-5 h-5" /> : row[1]}
                      </td>
                      <td className="py-6 px-8 text-white/40">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-brand-dark border border-white/10 rounded-[40px] p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.1)_0%,transparent_70%)]" />
            <div className="relative z-10">
              <h2 className="text-5xl md:text-6xl font-bold mb-8">{t.why.ctaTitle}</h2>
              <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">{t.why.ctaSubtitle}</p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button className="px-12 py-5 bg-brand-teal text-brand-dark font-black rounded-2xl hover:bg-teal-300 transition-all shadow-xl shadow-brand-teal/20">
                  {t.why.ctaHiring}
                </button>
                <button className="px-12 py-5 bg-white/5 text-white font-black rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                  {t.why.ctaEarning}
                </button>
              </div>
              <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-40">
                {t.why.ctaBadges.map((badge: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4" /> {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const TrustedBy = () => {
  const { t } = useLanguage();
  const [failedLogos, setFailedLogos] = useState<Record<string, boolean>>({});

  const brands = [
    { name: 'Amazon', domain: 'amazon.com' },
    { name: 'Meta', domain: 'meta.com' },
    { name: 'Apple', domain: 'apple.com' },
    { name: 'Netflix', domain: 'netflix.com' },
    { name: 'Uber', domain: 'uber.com' },
    { name: 'Airbnb', domain: 'airbnb.com' },
    { name: 'Stripe', domain: 'stripe.com' },
    { name: 'Shopify', domain: 'shopify.com' },
    { name: 'Slack', domain: 'slack.com' },
    { name: 'Zoom', domain: 'zoom.us' },
    { name: 'Microsoft', domain: 'microsoft.com' }
  ];
  
  return (
    <section className="py-20 border-y border-white/5 bg-brand-dark/20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-teal/5 blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-bold tracking-[0.4em] text-white/40 uppercase mb-12">
          {t.trusted}
        </p>
        
        <div className="relative group">
          {/* Gradient Masks for smooth fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A1120] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A1120] to-transparent z-10 pointer-events-none" />
          
          <div className="flex overflow-hidden">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ 
                duration: 40, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="flex items-center gap-20 whitespace-nowrap"
            >
              {[...brands, ...brands].map((brand, idx) => (
                <motion.div 
                  key={`${brand.name}-${idx}`}
                  className="flex items-center gap-4 min-w-[200px] group/brand cursor-pointer"
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  {!failedLogos[`${brand.name}-${idx}`] && (
                    <img 
                      src={`https://unavatar.io/${brand.domain}`}
                      alt={brand.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={() => setFailedLogos(prev => ({ ...prev, [`${brand.name}-${idx}`]: true }))}
                      className="h-8 w-8 rounded-lg grayscale opacity-40 group-hover/brand:grayscale-0 group-hover/brand:opacity-100 transition-all duration-300"
                    />
                  )}
                  <span className="text-white/40 font-bold text-lg uppercase tracking-widest group-hover/brand:text-white transition-colors duration-300">
                    {brand.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Counter = ({ value, duration = 2 }: { value: string | number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const stringValue = String(value);
      const numberMatch = stringValue.match(/[\d.]+/);
      const number = numberMatch ? parseFloat(numberMatch[0].replace(/,/g, '')) : 0;

      const controls = animate(0, number, {
        duration,
        onUpdate: (latest) => {
          setCount(latest);
        },
        ease: "easeOut"
      });

      return () => controls.stop();
    }
  }, [value, duration, isInView]);

  const formatNumber = (num: number) => {
    const stringValue = String(value);
    const hasComma = stringValue.includes(',');
    const hasDecimal = stringValue.includes('.');
    
    let formatted: string | number = num;
    if (hasDecimal) {
      formatted = num.toFixed(1);
      // Remove trailing .0 if present
      if (formatted.endsWith('.0')) {
        formatted = formatted.slice(0, -2);
      }
    } else {
      formatted = Math.floor(num);
    }

    if (hasComma) {
      return Number(formatted).toLocaleString();
    }
    return formatted;
  };

  const stringValue = String(value);
  const suffix = stringValue.replace(/[\d.,]+/g, '');
  const prefix = stringValue.split(/[\d.,]+/)[0];

  return (
    <span ref={nodeRef}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
};

const Stats = () => {
  const { t } = useLanguage();
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-brand-teal text-xs font-bold mb-6">
            <TrendingUp className="w-3 h-3" /> {t.stats.tag}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t.stats.title} <span className="text-gradient-teal">{t.stats.titleAccent}</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            {t.stats.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Users, value: '3,500+', label: t.stats.verified, sub: t.stats.verifiedSub },
            { icon: Globe, value: '35+', label: t.stats.partners, sub: t.stats.partnersSub },
            { icon: Zap, value: '48 hrs', label: t.stats.matchTime, sub: t.stats.matchTimeSub },
            { icon: Award, value: '98%', label: t.stats.satisfaction, sub: t.stats.satisfactionSub }
          ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.05, boxShadow: "0 20px 40px rgba(45,212,191,0.15)" }}
                className="glass-card p-8 flex flex-col items-start group hover-glow"
              >
                <div className="w-10 h-10 bg-brand-teal/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-teal/20 transition-all">
                  <stat.icon className="w-5 h-5 text-brand-teal" />
                </div>
                <div className="text-3xl font-bold text-brand-teal mb-2 group-hover:scale-110 origin-left transition-transform"><Counter value={stat.value} /></div>
                <div className="text-lg font-semibold mb-2 group-hover:text-white transition-colors">{stat.label}</div>
                <div className="text-sm text-white/60 group-hover:text-white/80 transition-colors">{stat.sub}</div>
              </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Metrics = () => {
  const { t } = useLanguage();
  return (
    <section className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-teal/5 blur-[80px] rounded-full" />
          <div className="glass-card p-10 relative overflow-hidden">
            <div className="flex justify-between items-end mb-8">
              <div>
                <p className="text-xs font-bold text-white/40 uppercase mb-2">{t.metrics.matchTime}</p>
                <p className="text-4xl font-bold text-brand-teal"><Counter value="48 hours" /></p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-white/40 uppercase mb-2">{t.metrics.industryAvg}</p>
                <p className="text-4xl font-bold text-emerald-400"><Counter value={t.metrics.faster} /></p>
              </div>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '85%' }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="h-full bg-brand-teal"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-bold text-brand-teal uppercase tracking-widest mb-4">{t.metrics.tag}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            {t.metrics.title} <span className="text-gradient-teal">{t.metrics.titleAccent}</span>
          </h2>
          <p className="text-white/60 mb-10 text-lg">
            {t.metrics.subtitle}
          </p>

          <div className="space-y-4">
            {[
              { icon: TrendingUp, label: t.metrics.reduction, value: '45%' },
              { icon: Zap, label: t.metrics.productivity, value: '3.2x' },
              { icon: CheckCircle, label: t.metrics.renewal, value: '94%' }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, x: 10, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                className="glass-card p-6 flex items-center justify-between transition-all cursor-default group hover-glow"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-brand-teal/10 rounded-lg flex items-center justify-center group-hover:bg-brand-teal/20 transition-colors">
                    <item.icon className="w-5 h-5 text-brand-teal" />
                  </div>
                  <span className="font-semibold text-white/80 group-hover:text-white transition-colors">{item.label}</span>
                </div>
                <span className="text-2xl font-bold group-hover:text-brand-teal transition-colors"><Counter value={item.value} /></span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Capabilities = () => {
  const { t } = useLanguage();
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-xs font-bold text-brand-teal uppercase tracking-widest mb-4">{t.capabilities.tag}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t.capabilities.title} <span className="text-gradient-teal">{t.capabilities.titleAccent}</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            {t.capabilities.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { icon: BarChart3, title: t.capabilities.ai, desc: t.capabilities.aiDesc, stat: '48hr', statLabel: 'avg. match time' },
            { icon: Shield, title: t.capabilities.security, desc: t.capabilities.securityDesc, stat: '100%', statLabel: 'compliance rate' },
            { icon: Globe, title: t.capabilities.network, desc: t.capabilities.networkDesc, stat: '92+', statLabel: 'countries covered' },
            { icon: Layers, title: t.capabilities.modular, desc: t.capabilities.modularDesc, stat: '6x', statLabel: 'faster scaling' }
          ].map((cap, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10, scale: 1.02, boxShadow: "0 20px 40px rgba(45,212,191,0.1)" }}
              className="glass-card p-10 group hover:bg-white/[0.08] transition-all hover-glow"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-teal/20 transition-all">
                  <cap.icon className="w-6 h-6 text-brand-teal" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-brand-teal group-hover:scale-110 origin-right transition-transform"><Counter value={cap.stat} /></div>
                  <div className="text-xs font-bold text-white/40 uppercase">{cap.statLabel}</div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-brand-teal transition-colors">{cap.title}</h3>
              <p className="text-white/70 leading-relaxed group-hover:text-white transition-colors">{cap.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomeCTA = ({ onSignUpClick }: { onSignUpClick: () => void }) => {
  const { t } = useLanguage();
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto bg-brand-teal p-12 md:p-24 rounded-3xl text-brand-dark relative overflow-hidden shadow-[0_20px_50px_rgba(45,212,191,0.2)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-4xl relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            {t.cta.title} <span className="opacity-60">{t.cta.titleAccent}</span>
          </h2>
          <p className="text-xl font-medium text-brand-dark/80 mb-12 max-w-2xl">
            {t.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <motion.button 
              onClick={onSignUpClick}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-10 py-4 bg-brand-dark text-white font-bold rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl"
            >
              {t.cta.primary} <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.05)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-10 py-4 bg-transparent text-brand-dark font-bold rounded-xl border border-brand-dark/20 transition-all"
            >
              {t.cta.secondary}
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => {
  const { t } = useLanguage();
  return (
    <footer className="py-24 px-6 bg-[#0a111f] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <div className="mb-8">
              <Logo />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              {t.footer.desc}
            </p>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2 lg:ml-auto">
            <h4 className="font-bold mb-8 text-white uppercase tracking-wider text-xs">{t.footer.product}</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => { setCurrentPage('why'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-slate-400 hover:text-white transition-colors duration-200">Features</button></li>
              <li><button onClick={() => { setCurrentPage('why'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-slate-400 hover:text-white transition-colors duration-200">Post Job</button></li>
              <li><button onClick={() => { setCurrentPage('why'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-slate-400 hover:text-white transition-colors duration-200">Find Engineers</button></li>
              <li><button onClick={() => { setCurrentPage('why'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-slate-400 hover:text-white transition-colors duration-200">Get Started</button></li>
              <li><button onClick={() => { setCurrentPage('why'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-slate-400 hover:text-white transition-colors duration-200">Security</button></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold mb-8 text-white uppercase tracking-wider text-xs">{t.footer.company}</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => { setCurrentPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-slate-400 hover:text-white transition-colors duration-200">About Us</button></li>
              <li><button onClick={() => { setCurrentPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-slate-400 hover:text-white transition-colors duration-200">Careers</button></li>
              <li><button onClick={() => { setCurrentPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-slate-400 hover:text-white transition-colors duration-200">Contact</button></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold mb-8 text-white uppercase tracking-wider text-xs">{t.footer.legal}</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => { setCurrentPage('privacy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-slate-400 hover:text-white transition-colors duration-200">Privacy Policy</button></li>
              <li><button onClick={() => { setCurrentPage('terms'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-slate-400 hover:text-white transition-colors duration-200">Terms of Service</button></li>
              <li><button onClick={() => { setCurrentPage('cookies'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-slate-400 hover:text-white transition-colors duration-200">Cookie Policy</button></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500">
          <p>© 2026 DeskNet.{t.footer.rights}</p>
          <p className="tracking-tight">Building the world's best IT talent network</p>
        </div>
      </div>
    </footer>
  );
};

const LoginModal = ({ 
  isOpen, 
  onClose, 
  onSignUpClick,
  onLoginSuccess
}: { 
  isOpen: boolean; 
  onClose: () => void, 
  onSignUpClick: () => void,
  onLoginSuccess: (role: string, data: any) => void
}) => {
  const { t } = useLanguage();
  const [loginType, setLoginType] = useState<'selection' | 'engineer' | 'client' | 'admin'>('selection');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleBack = () => {
    setLoginType('selection');
    setError('');
    setSuccess('');
    setPassword('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (loginType === 'admin') {
      try {
        // Check Firestore for dynamic admin password
        const settingsDoc = await getDoc(doc(db, "settings", "admin_config"));
        const storedPassword = settingsDoc.exists() ? settingsDoc.data().adminPassword : 'desknet2026';
        
        if (password === storedPassword) {
          setSuccess('Admin login successful!');
          setTimeout(() => {
            onClose();
            onLoginSuccess('admin', { name: 'Administrator', email: 'admin@desknet.com' });
          }, 1500);
        } else {
          setError('Wrong admin password. Please try again.');
        }
      } catch (err) {
        console.error("Error fetching admin config:", err);
        // Fallback to default password if Firestore fails
        if (password === 'desknet2026') {
          setSuccess('Admin login successful!');
          setTimeout(() => {
            onClose();
            onLoginSuccess('admin', { name: 'Administrator', email: 'admin@desknet.com' });
          }, 1500);
        } else {
          setError('Wrong admin password. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // For client/engineer, use Email/Password Sign-In
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        // Update last login
        await setDoc(doc(db, "users", user.uid), { lastLogin: serverTimestamp() }, { merge: true });
        setSuccess('Login successful! Welcome back.');
        setTimeout(() => {
          onClose();
          onLoginSuccess(userData.role || loginType, userData);
        }, 1500);
      } else {
        setError("Account profile not found. Please sign up first.");
        await signOut(auth);
      }
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.code === 'auth/user-not-found') {
        setError("Account not found. Please sign up first.");
      } else if (err.code === 'auth/wrong-password') {
        setError("Wrong password. Please try again.");
      } else if (err.code === 'auth/invalid-credential') {
        // Modern Firebase often returns this for both user-not-found and wrong-password
        setError("Invalid credentials. Please check your email and password.");
      } else if (err.code === 'auth/too-many-requests') {
        setError("Too many failed attempts. Please try again later.");
      } else {
        setError(err.message || "Failed to sign in");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpClick = () => {
    onClose();
    onSignUpClick();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-md bg-brand-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {loginType === 'selection' ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">{t.login.title}</h2>
                <p className="text-white/60 text-sm">{t.login.subtitle}</p>
              </div>

              <div className="space-y-4">
                <motion.button 
                  onClick={() => setLoginType('engineer')}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-4 flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl hover:border-brand-teal/50 hover:bg-white/10 transition-all group text-left hover-glow"
                >
                  <div className="w-12 h-12 bg-brand-teal/10 rounded-lg flex items-center justify-center group-hover:bg-brand-teal/20 transition-colors">
                    <User className="w-6 h-6 text-brand-teal" />
                  </div>
                  <div>
                    <div className="font-bold group-hover:text-brand-teal transition-colors">{t.login.engineer}</div>
                    <div className="text-xs text-white/40 group-hover:text-white/60 transition-colors">{t.login.engineerDesc}</div>
                  </div>
                </motion.button>

                <motion.button 
                  onClick={() => setLoginType('client')}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-4 flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl hover:border-brand-teal/50 hover:bg-white/10 transition-all group text-left hover-glow"
                >
                  <div className="w-12 h-12 bg-brand-teal/10 rounded-lg flex items-center justify-center group-hover:bg-brand-teal/20 transition-colors">
                    <Briefcase className="w-6 h-6 text-brand-teal" />
                  </div>
                  <div>
                    <div className="font-bold group-hover:text-brand-teal transition-colors">{t.login.client}</div>
                    <div className="text-xs text-white/40 group-hover:text-white/60 transition-colors">{t.login.clientDesc}</div>
                  </div>
                </motion.button>

                <motion.button 
                  onClick={() => setLoginType('admin')}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-4 flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl hover:border-brand-teal/50 hover:bg-white/10 transition-all group text-left hover-glow"
                >
                  <div className="w-12 h-12 bg-brand-teal/10 rounded-lg flex items-center justify-center group-hover:bg-brand-teal/20 transition-colors">
                    <ShieldCheck className="w-6 h-6 text-brand-teal" />
                  </div>
                  <div>
                    <div className="font-bold group-hover:text-brand-teal transition-colors">{t.login.admin}</div>
                    <div className="text-xs text-white/40 group-hover:text-white/60 transition-colors">{t.login.adminDesc}</div>
                  </div>
                </motion.button>
              </div>
            </>
          ) : (
            <>
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-xs font-bold text-brand-teal uppercase tracking-widest mb-6 hover:opacity-80 transition-opacity"
              >
                <ArrowRight className="w-4 h-4 rotate-180" /> {t.login.back}
              </button>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">
                  {loginType === 'engineer' && t.login.engineer}
                  {loginType === 'client' && t.login.client}
                  {loginType === 'admin' && t.login.admin} {t.login.signIn}
                </h2>
                <p className="text-white/60 text-sm">
                  {loginType === 'engineer' && "Access your dashboard and find jobs."}
                  {loginType === 'client' && "Manage your team and post new roles."}
                  {loginType === 'admin' && "System-wide administration and monitoring."}
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleLogin}>
                {loginType === 'admin' ? (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Admin Password</label>
                      <div className="flex gap-3">
                        <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                          <Lock className="w-5 h-5 text-white/20" />
                        </div>
                        <div className="relative w-full">
                          <input 
                            type={showPassword ? "text" : "password"} 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 pr-12 text-white placeholder:text-white/10 focus:outline-none focus:border-brand-teal/50 transition-all"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-brand-teal transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">{t.login.email}</label>
                      <div className="flex gap-3">
                        <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                          <Mail className="w-5 h-5 text-white/20" />
                        </div>
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@company.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder:text-white/10 focus:outline-none focus:border-brand-teal/50 transition-all"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">{t.login.password}</label>
                      <div className="flex gap-3">
                        <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                          <Lock className="w-5 h-5 text-white/20" />
                        </div>
                        <div className="relative w-full">
                          <input 
                            type={showPassword ? "text" : "password"} 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 pr-12 text-white placeholder:text-white/10 focus:outline-none focus:border-brand-teal/50 transition-all"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-brand-teal transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {(!isFirebaseConfigured && loginType !== 'admin') && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400 text-xs mb-6">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold">Firebase Configuration Required</p>
                      <p className="leading-relaxed">
                        The Firebase API Key is missing or invalid. Please configure your Firebase environment variables in the AI Studio Secrets panel.
                      </p>
                    </div>
                  </div>
                )}

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-xs"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </motion.div>
                )}

                {success && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2 text-emerald-400 text-xs"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>{success}</span>
                  </motion.div>
                )}

                <button 
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 bg-brand-teal text-brand-dark font-bold rounded-xl transition-all shadow-lg shadow-brand-teal/20 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-300'}`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{t.login.signIn}...</span>
                    </div>
                  ) : loginType === 'admin' ? t.login.signInAsAdmin : 
                      loginType === 'engineer' ? t.login.signInAsEngineer :
                      loginType === 'client' ? t.login.signInAsClient :
                      `${t.login.signIn} as ${loginType}`}
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const SignUpModal = ({ isOpen, onClose, onLoginClick, onEngineerContinue, onClientContinue }: { isOpen: boolean; onClose: () => void, onLoginClick: () => void, onEngineerContinue: (data: any) => void, onClientContinue: (data: any) => void }) => {
  const { t } = useLanguage();
  const [signUpType, setSignUpType] = useState<'selection' | 'engineer' | 'client'>('selection');
  const [engineerStep, setEngineerStep] = useState(1);
  const [clientStep, setClientStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    companyName: '',
    firstName: '',
    lastName: '',
    country: null as any,
    companyEmail: '',
    companySize: '',
    dobDay: '',
    dobMonth: '',
    dobYear: '',
    city: '',
    specialization: '',
    experience: '',
    skills: '',
    hourlyRate: '',
    halfDayRate: '',
    fullDayRate: '',
    languages: '',
    contactInfo: '',
  });

  const countryOptions = useMemo(() => 
    Country.getAllCountries().map(c => ({
      value: c.isoCode,
      label: c.name,
      flag: c.flag
    })), []);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    if (signUpType === 'engineer' && engineerStep > 1) {
      setEngineerStep(engineerStep - 1);
    } else if (signUpType === 'client' && clientStep > 1) {
      setClientStep(clientStep - 1);
    } else {
      setSignUpType('selection');
      setEngineerStep(1);
      setClientStep(1);
    }
  };

  const handleLoginClick = () => {
    onClose();
    onLoginClick();
  };

  const handleEngineerContinue = () => {
    if (engineerStep === 1) {
      onEngineerContinue(formData);
      onClose();
    } else if (engineerStep < 5) {
      setEngineerStep(engineerStep + 1);
    } else {
      // Final submission logic
      console.log('Form submitted:', formData);
      onClose();
    }
  };

  const handleClientContinue = async () => {
    if (clientStep === 1) {
      setClientStep(2);
    } else {
      setIsLoading(true);
      setError('');
      try {
        // Create Firebase Auth user
        const result = await createUserWithEmailAndPassword(auth, formData.companyEmail, formData.password);
        const user = result.user;

        // Create Firestore document
        const userData = {
          uid: user.uid,
          email: formData.companyEmail,
          companyName: formData.companyName,
          firstName: formData.firstName,
          lastName: formData.lastName,
          name: `${formData.firstName} ${formData.lastName}`,
          country: formData.country?.label || '',
          companySize: formData.companySize,
          role: 'client',
          status: 'Active',
          createdAt: serverTimestamp()
        };

        await setDoc(doc(db, "users", user.uid), userData);
        
        onClientContinue(userData);
        onClose();
      } catch (err: any) {
        console.error("Client signup error:", err);
        setError(err.message || "Failed to create client account");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isStepValid = () => {
    if (signUpType === 'client') {
      if (clientStep === 1) {
        return formData.companyName && formData.firstName && formData.lastName && formData.country;
      } else {
        return formData.companyEmail && formData.companySize && formData.password;
      }
    }
    
    switch (engineerStep) {
      case 1: return formData.fullName && formData.email && formData.password;
      case 2: return formData.dobDay && formData.dobMonth && formData.dobYear && formData.country && formData.city;
      case 3: return formData.specialization && formData.experience && formData.skills;
      case 4: return formData.hourlyRate && formData.halfDayRate && formData.fullDayRate;
      case 5: return formData.languages && formData.contactInfo;
      default: return true;
    }
  };

  const customSelectStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '0.75rem',
      padding: '0.25rem',
      color: 'white',
      '&:hover': {
        borderColor: 'rgba(45, 212, 191, 0.5)',
      }
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: '#111827',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '0.75rem',
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused ? 'rgba(45, 212, 191, 0.1)' : 'transparent',
      color: state.isFocused ? '#2dd4bf' : 'rgba(255, 255, 255, 0.6)',
      '&:active': {
        backgroundColor: 'rgba(45, 212, 191, 0.2)',
      }
    }),
    singleValue: (base: any) => ({
      ...base,
      color: 'white',
    }),
    input: (base: any) => ({
      ...base,
      color: 'white',
    }),
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-lg bg-brand-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/40 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {signUpType === 'selection' ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">{t.signup.title}</h2>
                <p className="text-white/60 text-sm">{t.signup.subtitle}</p>
              </div>

              <div className="space-y-4">
                <motion.button 
                  onClick={() => setSignUpType('engineer')}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-4 flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl hover:border-brand-teal/50 hover:bg-white/10 transition-all group text-left hover-glow"
                >
                  <div className="w-12 h-12 bg-brand-teal/10 rounded-lg flex items-center justify-center group-hover:bg-brand-teal/20 transition-colors">
                    <User className="w-6 h-6 text-brand-teal" />
                  </div>
                  <div>
                    <div className="font-semibold group-hover:text-brand-teal transition-colors">{t.signup.engineer}</div>
                    <div className="text-xs text-white/40 group-hover:text-white/60 transition-colors">{t.signup.engineerDesc}</div>
                  </div>
                </motion.button>

                <motion.button 
                  onClick={() => setSignUpType('client')}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-4 flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl hover:border-brand-teal/50 hover:bg-white/10 transition-all group text-left hover-glow"
                >
                  <div className="w-12 h-12 bg-brand-teal/10 rounded-lg flex items-center justify-center group-hover:bg-brand-teal/20 transition-colors">
                    <Briefcase className="w-6 h-6 text-brand-teal" />
                  </div>
                  <div>
                    <div className="font-semibold group-hover:text-brand-teal transition-colors">{t.signup.client}</div>
                    <div className="text-xs text-white/40 group-hover:text-white/60 transition-colors">{t.signup.clientDesc}</div>
                  </div>
                </motion.button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <button 
                  onClick={handleBack}
                  className="flex items-center gap-2 text-xs font-semibold text-brand-teal uppercase tracking-widest hover:opacity-80 transition-opacity"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" /> {t.signup.back}
                </button>
                {signUpType === 'engineer' && (
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Step {engineerStep}/5</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <div 
                          key={s} 
                          className={`w-6 h-1 rounded-full transition-colors ${s <= engineerStep ? 'bg-brand-teal' : 'bg-white/10'}`} 
                        />
                      ))}
                    </div>
                  </div>
                )}
                {signUpType === 'client' && (
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Step {clientStep}/2</span>
                    <div className="flex gap-1">
                      {[1, 2].map((s) => (
                        <div 
                          key={s} 
                          className={`w-6 h-1 rounded-full transition-colors ${s <= clientStep ? 'bg-brand-teal' : 'bg-white/10'}`} 
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">
                  {signUpType === 'engineer' ? (
                    <>
                      {engineerStep === 1 && t.signup.steps.account}
                      {engineerStep === 2 && t.signup.steps.personal}
                      {engineerStep === 3 && t.signup.steps.professional}
                      {engineerStep === 4 && t.signup.steps.rates}
                      {engineerStep === 5 && t.signup.steps.assets}
                    </>
                  ) : (
                    t.signup.client
                  )} {t.nav.getStarted}
                </h2>
                <p className="text-white/60 text-sm">
                  {signUpType === 'engineer' ? (
                    <>
                      {engineerStep === 1 && "Create your account to join the network."}
                      {engineerStep === 2 && "Tell us a bit about yourself."}
                      {engineerStep === 3 && "Showcase your technical expertise."}
                      {engineerStep === 4 && "Set your availability and rates."}
                      {engineerStep === 5 && "Finalize your profile with assets."}
                    </>
                  ) : (
                    "Start hiring verified talent for your projects."
                  )}
                </p>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {signUpType === 'engineer' ? (
                  <>
                    {engineerStep === 1 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">{t.signup.fullName}</label>
                          <div className="flex gap-3">
                            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                              <User className="w-5 h-5 text-white/20" />
                            </div>
                            <input 
                              type="text" 
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              placeholder="John Doe" 
                              className="input-field" 
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">{t.signup.email}</label>
                          <div className="flex gap-3">
                            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                              <Mail className="w-5 h-5 text-white/20" />
                            </div>
                            <input 
                              type="email" 
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="name@company.com" 
                              className="input-field" 
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">{t.signup.password}</label>
                          <div className="flex gap-3">
                            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                              <Lock className="w-5 h-5 text-white/20" />
                            </div>
                            <div className="relative w-full">
                              <input 
                                type={showPassword ? "text" : "password"} 
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="••••••••" 
                                className="input-field pr-12" 
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-brand-teal transition-colors"
                              >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {engineerStep === 2 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">{t.signup.fields.dob}</label>
                          <div className="flex gap-3">
                            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                              <Calendar className="w-5 h-5 text-white/20" />
                            </div>
                            <div className="grid grid-cols-3 gap-3 flex-1">
                              <input 
                                type="text" 
                                name="dobDay"
                                value={formData.dobDay}
                                onChange={handleInputChange}
                                placeholder={t.signup.fields.day} 
                                className="input-field text-sm" 
                              />
                              <input 
                                type="text" 
                                name="dobMonth"
                                value={formData.dobMonth}
                                onChange={handleInputChange}
                                placeholder={t.signup.fields.month} 
                                className="input-field text-sm" 
                              />
                              <input 
                                type="text" 
                                name="dobYear"
                                value={formData.dobYear}
                                onChange={handleInputChange}
                                placeholder={t.signup.fields.year} 
                                className="input-field text-sm" 
                              />
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">{t.signup.fields.country}</label>
                            <div className="flex gap-3">
                              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                                <MapPin className="w-5 h-5 text-white/20" />
                              </div>
                              <input 
                                type="text" 
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                placeholder="USA" 
                                className="input-field" 
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">{t.signup.fields.city}</label>
                            <input 
                              type="text" 
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              placeholder="New York" 
                              className="input-field" 
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {engineerStep === 3 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">{t.signup.fields.specialization}</label>
                          <div className="flex gap-3">
                            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                              <Code className="w-5 h-5 text-white/20" />
                            </div>
                            <input 
                              type="text" 
                              name="specialization"
                              value={formData.specialization}
                              onChange={handleInputChange}
                              placeholder="Full Stack Developer" 
                              className="input-field" 
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">{t.signup.fields.experience}</label>
                          <div className="flex gap-3">
                            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                              <Clock className="w-5 h-5 text-white/20" />
                            </div>
                            <input 
                              type="number" 
                              name="experience"
                              value={formData.experience}
                              onChange={handleInputChange}
                              placeholder="5" 
                              className="input-field" 
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">{t.signup.fields.skills}</label>
                          <textarea 
                            name="skills"
                            value={formData.skills}
                            onChange={handleInputChange}
                            placeholder="React, Node.js, TypeScript..." 
                            className="input-field min-h-[100px] py-3" 
                          />
                        </div>
                      </motion.div>
                    )}

                    {engineerStep === 4 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">{t.signup.fields.hourlyRate}</label>
                          <div className="flex gap-3">
                            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                              <DollarSign className="w-5 h-5 text-white/20" />
                            </div>
                            <input 
                              type="number" 
                              name="hourlyRate"
                              value={formData.hourlyRate}
                              onChange={handleInputChange}
                              placeholder="50" 
                              className="input-field" 
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">{t.signup.fields.halfDayRate}</label>
                            <div className="flex gap-3">
                              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                                <DollarSign className="w-5 h-5 text-white/20" />
                              </div>
                              <input 
                                type="number" 
                                name="halfDayRate"
                                value={formData.halfDayRate}
                                onChange={handleInputChange}
                                placeholder="180" 
                                className="input-field" 
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">{t.signup.fields.fullDayRate}</label>
                            <div className="flex gap-3">
                              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                                <DollarSign className="w-5 h-5 text-white/20" />
                              </div>
                              <input 
                                type="number" 
                                name="fullDayRate"
                                value={formData.fullDayRate}
                                onChange={handleInputChange}
                                placeholder="350" 
                                className="input-field" 
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {engineerStep === 5 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">{t.signup.fields.languages}</label>
                            <div className="flex gap-3">
                              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                                <Languages className="w-5 h-5 text-white/20" />
                              </div>
                              <input 
                                type="text" 
                                name="languages"
                                value={formData.languages}
                                onChange={handleInputChange}
                                placeholder="English, Russian" 
                                className="input-field" 
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">{t.signup.fields.contactInfo}</label>
                            <div className="flex gap-3">
                              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                                <Phone className="w-5 h-5 text-white/20" />
                              </div>
                              <input 
                                type="text" 
                                name="contactInfo"
                                value={formData.contactInfo}
                                onChange={handleInputChange}
                                placeholder="@username" 
                                className="input-field" 
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">{t.signup.fields.cvUpload}</label>
                          <div className="relative group cursor-pointer">
                            <div className="w-full bg-white/5 border border-dashed border-white/20 rounded-xl p-6 flex flex-col items-center justify-center group-hover:border-brand-teal/50 transition-colors">
                              <FileText className="w-8 h-8 text-white/20 mb-2 group-hover:text-brand-teal transition-colors" />
                              <span className="text-sm text-white/40 group-hover:text-white transition-colors">Click or drag to upload CV</span>
                            </div>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">{t.signup.fields.profilePic}</label>
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center overflow-hidden">
                              <Camera className="w-6 h-6 text-white/20" />
                            </div>
                            <button className="text-xs font-semibold text-brand-teal uppercase tracking-widest hover:underline">Upload Photo</button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </>
                ) : (
                  <div className="space-y-4">
                    {clientStep === 1 ? (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">{t.signup.companyName}</label>
                          <div className="flex gap-3">
                            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                              <Briefcase className="w-5 h-5 text-white/20" />
                            </div>
                            <input 
                              type="text" 
                              name="companyName"
                              value={formData.companyName}
                              onChange={handleInputChange}
                              placeholder="Acme Corp" 
                              className="input-field" 
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">{t.signup.firstName}</label>
                            <input 
                              type="text" 
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              placeholder="John" 
                              className="input-field" 
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">{t.signup.lastName}</label>
                            <input 
                              type="text" 
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              placeholder="Doe" 
                              className="input-field" 
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">{t.signup.fields.country}</label>
                          <div className="flex gap-3">
                            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                              <MapPin className="w-5 h-5 text-white/20" />
                            </div>
                            <div className="flex-1">
                              <Select
                                options={countryOptions}
                                value={formData.country}
                                onChange={(opt) => setFormData(prev => ({ ...prev, country: opt }))}
                                styles={customSelectStyles}
                                placeholder="Select Country"
                                isSearchable
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">{t.signup.companyEmail}</label>
                          <div className="flex gap-3">
                            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                              <Mail className="w-5 h-5 text-white/20" />
                            </div>
                            <input 
                              type="email" 
                              name="companyEmail"
                              value={formData.companyEmail}
                              onChange={handleInputChange}
                              placeholder="hr@company.com" 
                              className="input-field" 
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">{t.signup.companySize}</label>
                          <div className="flex gap-3">
                            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                              <Users className="w-5 h-5 text-white/20" />
                            </div>
                            <input 
                              type="text" 
                              name="companySize"
                              value={formData.companySize}
                              onChange={handleInputChange}
                              placeholder="1-10, 11-50, 50+" 
                              className="input-field" 
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">{t.signup.password}</label>
                          <div className="flex gap-3">
                            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                              <Lock className="w-5 h-5 text-white/20" />
                            </div>
                            <div className="relative w-full">
                              <input 
                                type={showPassword ? "text" : "password"} 
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="••••••••" 
                                className="input-field pr-12" 
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-brand-teal transition-colors"
                              >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {engineerStep === 1 && (
                  <div className="text-xs text-white/40 leading-relaxed">
                    By creating an account, you agree to our <button className="text-brand-teal hover:underline">Terms of Service</button> and <button className="text-brand-teal hover:underline">Privacy Policy</button>.
                  </div>
                )}

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-xs"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <button 
                  onClick={signUpType === 'engineer' ? handleEngineerContinue : handleClientContinue}
                  disabled={!isStepValid() || isLoading}
                  className={`w-full py-4 font-semibold rounded-xl transition-all ${
                    isStepValid() && !isLoading
                      ? 'bg-brand-teal text-brand-dark hover:bg-teal-300' 
                      : 'bg-white/5 text-white/20 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    signUpType === 'engineer' ? (
                      engineerStep === 5 ? t.signup.complete : t.signup.continue
                    ) : (
                      clientStep === 2 ? t.signup.createAccount : t.signup.continue
                    )
                  )}
                </button>

                <div className="text-center text-sm text-white/40 pt-4">
                  {t.signup.hasAccount} <button onClick={handleLoginClick} className="text-brand-teal font-semibold hover:underline">{t.signup.signIn}</button>
                </div>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const LogTicket = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    subject: '',
    description: '',
    urgency: 'Medium',
    impact: 'Individual'
  });

  const steps = [
    { id: 1, label: t.ticket.steps.category, icon: Layers },
    { id: 2, label: t.ticket.steps.details, icon: FileText },
    { id: 3, label: t.ticket.steps.priority, icon: AlertCircle },
    { id: 4, label: t.ticket.steps.review, icon: CheckCircle },
  ];

  const handleNext = () => setStep(prev => Math.min(prev + 1, 4));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "tickets"), {
        ...formData,
        status: 'Open',
        clientEmail: auth.currentUser?.email || 'guest@example.com',
        clientName: auth.currentUser?.displayName || 'Guest User',
        createdAt: serverTimestamp(),
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting ticket from website:", error);
      alert("Failed to submit ticket. Please try again.");
    }
  };

  if (isSubmitted) {
    return (
      <section className="pt-48 pb-32 px-6 min-h-screen flex items-center justify-center bg-[#0A1120]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass-card p-12 text-center"
        >
          <div className="w-20 h-20 bg-brand-teal/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10 text-brand-teal" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-white">{t.ticket.success}</h2>
          <p className="text-white/60 mb-10 leading-relaxed">
            {t.ticket.successDesc}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-brand-teal text-brand-dark font-semibold rounded-xl hover:bg-teal-300 transition-all"
          >
            {t.nav.home}
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="pt-48 pb-32 px-6 min-h-screen bg-[#0A1120]">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold text-brand-teal uppercase tracking-widest mb-4">/ {t.ticket.tag}</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 text-white">
            {t.ticket.title} <span className="text-brand-teal">{t.ticket.titleAccent}</span>
          </h1>
          <p className="text-white/50 text-xl max-w-2xl mx-auto font-medium">
            {t.ticket.subtitle}
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2" />
          <div className="relative flex justify-between">
            {steps.map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-3 relative z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 border-2 ${
                  step >= s.id ? 'bg-brand-teal border-brand-teal text-brand-dark shadow-[0_0_20px_rgba(45,212,191,0.3)]' : 'bg-brand-dark border-white/10 text-white/40'
                }`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= s.id ? 'text-brand-teal' : 'text-white/20'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-8 md:p-12">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold mb-8 text-white">{t.ticket.fields.type}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['Technical Issue', 'Billing & Payments', 'Account Access', 'Feature Request', 'Other'].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setFormData({ ...formData, type });
                        handleNext();
                      }}
                      className={`p-6 text-left rounded-2xl border-2 transition-all group ${
                        formData.type === type 
                          ? 'bg-brand-teal/5 border-brand-teal text-brand-teal' 
                          : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <div className="font-semibold mb-1">{type}</div>
                      <div className="text-xs opacity-60">Select this for {type.toLowerCase()} related queries.</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-4">{t.ticket.fields.subject}</label>
                  <input 
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={t.ticket.placeholders.subject}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-brand-teal/50 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-4">{t.ticket.fields.description}</label>
                  <textarea 
                    rows={6}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder={t.ticket.placeholders.description}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-brand-teal/50 transition-all outline-none resize-none"
                  />
                </div>
                <div className="flex justify-between pt-4">
                  <button onClick={handleBack} className="px-8 py-3 text-white/60 font-semibold hover:text-white transition-all">Back</button>
                  <button 
                    onClick={handleNext}
                    disabled={!formData.subject || !formData.description}
                    className={`px-10 py-3 bg-brand-teal text-brand-dark font-semibold rounded-xl transition-all ${!formData.subject || !formData.description ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-300'}`}
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div>
                  <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6">{t.ticket.fields.urgency}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Low', 'Medium', 'High', 'Urgent'].map((u) => (
                      <button
                        key={u}
                        onClick={() => setFormData({ ...formData, urgency: u })}
                        className={`py-4 rounded-xl border-2 font-semibold transition-all ${
                          formData.urgency === u 
                            ? 'bg-brand-teal border-brand-teal text-brand-dark' 
                            : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6">{t.ticket.fields.impact}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {['Individual', 'Team', 'Organization'].map((i) => (
                      <button
                        key={i}
                        onClick={() => setFormData({ ...formData, impact: i })}
                        className={`py-4 rounded-xl border-2 font-semibold transition-all ${
                          formData.impact === i 
                            ? 'bg-brand-teal border-brand-teal text-brand-dark' 
                            : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'
                        }`}
                      >
                        {i}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button onClick={handleBack} className="px-8 py-3 text-white/60 font-semibold hover:text-white transition-all">Back</button>
                  <button onClick={handleNext} className="px-10 py-3 bg-brand-teal text-brand-dark font-semibold rounded-xl hover:bg-teal-300 transition-all">Review Ticket</button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">{t.ticket.fields.type}</div>
                      <div className="text-brand-teal font-bold">{formData.type}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">{t.ticket.fields.urgency}</div>
                      <div className="text-white font-bold">{formData.urgency}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">{t.ticket.fields.impact}</div>
                      <div className="text-white font-bold">{formData.impact}</div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">{t.ticket.fields.subject}</div>
                      <div className="text-white font-bold">{formData.subject}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">{t.ticket.fields.description}</div>
                      <div className="text-white/70 text-sm leading-relaxed line-clamp-4">{formData.description}</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-brand-teal/5 border border-brand-teal/20 rounded-2xl flex items-start gap-4">
                  <AlertCircle className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                  <p className="text-xs text-brand-teal/80 leading-relaxed">
                    By submitting this ticket, you agree that our support team may contact you via your registered email address. We aim to respond to all tickets within 24 hours.
                  </p>
                </div>

                <div className="flex justify-between pt-4">
                  <button onClick={handleBack} className="px-8 py-3 text-white/60 font-semibold hover:text-white transition-all">Back</button>
                  <button 
                    onClick={handleSubmit}
                    className="px-12 py-4 bg-brand-teal text-brand-dark font-semibold rounded-xl hover:bg-teal-300 transition-all shadow-lg shadow-brand-teal/20 flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {t.ticket.submit}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isEngineerOnboardingOpen, setIsEngineerOnboardingOpen] = useState(false);
  const [onboardingData, setOnboardingData] = useState<any>(null);
  const [isEngineerLoggedIn, setIsEngineerLoggedIn] = useState(false);
  const [engineerData, setEngineerData] = useState<any>(null);
  const [isClientLoggedIn, setIsClientLoggedIn] = useState(false);
  const [clientData, setClientData] = useState<any>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            handleLoginSuccess(userData.role, userData);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        // User is signed out
        setIsEngineerLoggedIn(false);
        setIsClientLoggedIn(false);
        setIsAdminLoggedIn(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleEngineerOnboarding = (data: any) => {
    setOnboardingData(data);
    setIsEngineerOnboardingOpen(true);
  };

  const handleEngineerComplete = (data: any) => {
    setEngineerData(data);
    setIsEngineerLoggedIn(true);
    setIsEngineerOnboardingOpen(false);
  };

  const handleClientComplete = (data: any) => {
    setClientData(data);
    setIsClientLoggedIn(true);
  };

  const handleLoginSuccess = (role: string, data: any) => {
    if (role === 'admin') {
      setIsAdminLoggedIn(true);
    } else if (role === 'engineer') {
      setEngineerData(data);
      setIsEngineerLoggedIn(true);
    } else if (role === 'client') {
      setClientData(data);
      setIsClientLoggedIn(true);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAdminLoggedIn(false);
      setIsEngineerLoggedIn(false);
      setIsClientLoggedIn(false);
      setEngineerData(null);
      setClientData(null);
      setCurrentPage('home');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-teal animate-spin" />
      </div>
    );
  }

  if (isAdminLoggedIn) {
    return <AdminPortal onLogout={handleLogout} />;
  }

  if (isEngineerLoggedIn) {
    return <EngineerPortal user={engineerData} onLogout={handleLogout} />;
  }

  if (isClientLoggedIn) {
    return <ClientPortal user={clientData} onLogout={handleLogout} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutUs />;
      case 'why':
        return <WhyDeskNet />;
      case 'privacy':
      case 'terms':
      case 'cookies':
        return (
          <section className="pt-48 pb-32 px-6 min-h-screen bg-[#0A1120]">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-5xl font-black mb-12 text-white capitalize">{currentPage.replace('-', ' ')}</h1>
              <div className="glass-card p-12 space-y-8 text-white/60 leading-relaxed">
                <p>Last updated: October 2023</p>
                <h2 className="text-2xl font-bold text-white">1. Introduction</h2>
                <p>Welcome to DeskNet. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at support@desknet.com.</p>
                <h2 className="text-2xl font-bold text-white">2. Information We Collect</h2>
                <p>We collect personal information that you voluntarily provide to us when you register on the platform, express an interest in obtaining information about us or our products and services, when you participate in activities on the platform or otherwise when you contact us.</p>
                <h2 className="text-2xl font-bold text-white">3. How We Use Your Information</h2>
                <p>We use personal information collected via our platform for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
              </div>
            </div>
          </section>
        );
      case 'home':
      default:
        return (
          <>
            <HomeHero 
              onSignUpClick={() => setIsSignUpOpen(true)} 
              onWatchDemoClick={() => setIsDemoOpen(true)}
            />
            <TrustedBy />
            <Stats />
            <Metrics />
            <Capabilities />
            <HomeCTA onSignUpClick={() => setIsSignUpOpen(true)} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen relative">
      <PlexusBackground />
      <Navbar 
        onLoginClick={() => setIsLoginOpen(true)}
        onSignUpClick={() => setIsSignUpOpen(true)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <VideoDemoModal 
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onSignUpClick={() => setIsSignUpOpen(true)}
        onLoginSuccess={handleLoginSuccess}
      />
      <SignUpModal 
        isOpen={isSignUpOpen} 
        onClose={() => setIsSignUpOpen(false)} 
        onLoginClick={() => setIsLoginOpen(true)}
        onEngineerContinue={handleEngineerOnboarding}
        onClientContinue={handleClientComplete}
      />
      <EngineerSignUpFlow 
        isOpen={isEngineerOnboardingOpen}
        onClose={() => setIsEngineerOnboardingOpen(false)}
        onComplete={handleEngineerComplete}
        initialData={onboardingData}
        initialStep={2}
      />
      <main>
        {renderPage()}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

