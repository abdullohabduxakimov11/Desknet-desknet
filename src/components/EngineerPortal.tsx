import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  db, 
  auth,
  collection, 
  query, 
  where, 
  onSnapshot, 
  orderBy, 
  updateDoc, 
  doc 
} from '../firebase';
// import { collection, query, where, onSnapshot, orderBy, updateDoc, doc } from 'firebase/firestore';
import { 
  HiUser as User, 
  HiMagnifyingGlass as Search, 
  HiChatBubbleLeftRight as MessageSquare, 
  HiCog6Tooth as Settings, 
  HiArrowLeftOnRectangle as LogOut, 
  HiComputerDesktop as Monitor,
  HiGlobeAlt as Globe, 
  HiBell as Bell, 
  HiBars3 as Menu, 
  HiXMark as X, 
  HiChevronRight as ChevronRight, 
  HiMapPin as MapPin, 
  HiBriefcase as Briefcase, 
  HiStar as Star, 
  HiClock as Clock, 
  HiCurrencyDollar as DollarSign, 
  HiLanguage as Languages, 
  HiPhone as Phone,
  HiCodeBracket as Code, 
  HiDocumentText as FileText, 
  HiCamera as Camera, 
  HiPencilSquare as Edit3, 
  HiCheckCircle as CheckCircle2, 
  HiExclamationTriangle as AlertTriangle,
  HiShieldCheck as ShieldCheck, 
  HiMap as MapIcon, 
  HiLockClosed as LockIcon,
  HiCheck as Check,
  HiXMark as XMark
} from 'react-icons/hi2';
import Select from 'react-select';
import { Country, City } from 'country-state-city';
import Logo from './Logo';
import LogoutConfirmModal from './LogoutConfirmModal';
import MessagingSystem from './MessagingSystem';
import { useLanguage } from '../context/LanguageContext';

import TicketDetailView from './TicketDetailView';

interface EngineerPortalProps {
  user: any;
  onLogout: () => void;
}

const EngineerPortal: React.FC<EngineerPortalProps> = ({ user, onLogout }) => {
  const { t, language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [availableJobs, setAvailableJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showReviewStep, setShowReviewStep] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  // Profile editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<any>(user);
  const [isSaving, setIsSaving] = useState(false);
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await updateDoc(doc(db, "users", user.uid || user.id), editedUser);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, option: any) => {
    setEditedUser((prev: any) => ({ ...prev, [name]: option }));
  };

  const specializationOptions = [
    { value: 'it_support', label: 'IT Support Specialist' },
    { value: 'network_eng', label: 'Network Engineer' },
    { value: 'sys_admin', label: 'System Administrator' },
    { value: 'cloud_infra', label: 'Cloud Infrastructure Engineer' },
    { value: 'cyber_analyst', label: 'Cybersecurity Analyst' },
    { value: 'service_desk', label: 'IT Service Desk Manager' },
    { value: 'hardware_tech', label: 'Hardware Technician' },
    { value: 'db_admin', label: 'Database Administrator' },
    { value: 'it_consultant', label: 'IT Consultant' },
    { value: 'infra_arch', label: 'Infrastructure Architect' },
    { value: 'tech_support', label: 'Technical Support Engineer' },
    { value: 'voip_eng', label: 'VoIP Engineer' },
  ];

  const countries = Country.getAllCountries().map(c => ({
    value: c.isoCode,
    label: c.name,
    phonecode: c.phonecode.startsWith('+') ? c.phonecode : `+${c.phonecode}`
  }));

  const cities = editedUser?.country ? City.getCitiesOfCountry(editedUser.country.value)?.map(c => ({
    value: c.name,
    label: c.name
  })) || [] : [];

  const customSelectStyles = {
    control: (base: any) => ({
      ...base,
      borderRadius: '0.75rem',
      borderColor: '#e5e7eb',
      padding: '2px',
      '&:hover': { borderColor: '#2dd4bf' }
    })
  };

  useEffect(() => {
    const unsubAvailable = onSnapshot(
      query(collection(db, "tickets"), where("status", "==", "Approved")),
      (snapshot) => {
        setAvailableJobs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    );

    const unsubClients = onSnapshot(collection(db, "users"), (snapshot) => {
      setClients(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).filter(u => u.role === 'client'));
    });

    return () => {
      unsubAvailable();
      unsubClients();
    };
  }, []);

  const handleApplyJob = async (jobId: string) => {
    try {
      await updateDoc(doc(db, "tickets", jobId), {
        status: 'Assigned',
        engineerName: user?.fullName || user?.name || 'Unknown Engineer',
        engineerEmail: user?.email,
      });
      alert("Applied successfully!");
      setShowJobModal(false);
      setShowReviewStep(false);
      setSelectedJob(null);
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("Failed to apply. Please try again.");
    }
  };

  const pt = (t as any).portal;
  const cvT = pt.cv;

  const profilePicUrl = React.useMemo(() => {
    if (user?.profilePic instanceof File) {
      return URL.createObjectURL(user.profilePic);
    }
    return user?.profilePic || null;
  }, [user?.profilePic]);

  const calculateCompleteness = () => {
    let score = 0;
    const total = 6;
    if (user?.fullName) score++;
    if (user?.email) score++;
    if (user?.phoneNumber) score++;
    if (user?.specialization) score++;
    if (user?.skills && user.skills.length > 0) score++;
    if (user?.cvFile) score++;
    
    const percentage = Math.round((score / total) * 100);
    let feedback = "";
    if (percentage === 100) feedback = "Your profile is complete! Great job.";
    else if (percentage >= 70) feedback = "Almost there! Adding more details helps you stand out.";
    else feedback = "Your profile is incomplete. We recommend adding more information before applying.";
    
    return { percentage, feedback, score, total };
  };

  const completeness = calculateCompleteness();

  const cvUrl = React.useMemo(() => {
    if (user?.cvFile instanceof File) {
      return URL.createObjectURL(user.cvFile);
    }
    return user?.cvFile || null;
  }, [user?.cvFile]);

  const menuItems = [
    { 
      id: 'profile', 
      label: pt.menu.profile, 
      icon: User
    },
    { 
      id: 'jobs', 
      label: pt.menu.jobs, 
      icon: Search
    },
    { id: 'messages', label: pt.menu.messages, icon: MessageSquare },
    { 
      id: 'settings', 
      label: pt.menu.settings, 
      icon: Settings
    },
  ];

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'uz', label: "O'zbek", flag: '🇺🇿' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="border-r border-gray-200 bg-white/80 backdrop-blur-xl sticky top-0 h-screen flex flex-col z-30"
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && <Logo />}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-900"
          >
            {isSidebarOpen ? <Menu className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <div 
              key={item.id} 
              className="relative"
            >
              <button
                onClick={() => {
                  setActiveTab(item.id);
                }}
                className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all group relative ${
                  activeTab === item.id 
                    ? 'bg-slate-900 text-white font-bold shadow-lg shadow-slate-900/20' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {activeTab === item.id && (
                  <motion.div 
                    layoutId="engineer-sidebar-indicator"
                    className="absolute left-0 w-1 h-6 bg-brand-teal rounded-r-full"
                  />
                )}
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-brand-teal' : 'group-hover:text-brand-teal transition-colors'}`} />
                {isSidebarOpen && <span>{item.label}</span>}
              </button>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 space-y-2">
          {/* Language Menu */}
          <div className="relative group">
            <button className="w-full flex items-center gap-4 p-4 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
              <Globe className="w-5 h-5" />
              {isSidebarOpen && (
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-sm font-medium">{languages.find(l => l.code === language)?.label}</span>
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </div>
              )}
            </button>
            <div className="absolute bottom-full left-0 w-full mb-2 bg-white border border-gray-200 rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-2xl">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-100 transition-colors ${
                    language === lang.code ? 'text-brand-teal bg-brand-teal/5' : 'text-gray-600'
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="font-medium">{lang.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center gap-4 p-4 text-red-400 hover:text-red-300 hover:bg-red-400/5 rounded-xl transition-all group"
          >
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {isSidebarOpen && <span className="text-sm font-bold uppercase tracking-widest">{pt.menu.logout}</span>}
          </button>
        </div>
    </motion.aside>

      {/* Main Content Area */}
      <main className={`flex-1 flex flex-col min-w-0 ${activeTab === 'messages' ? 'h-screen overflow-hidden' : 'overflow-y-auto'}`}>
        {/* Top Bar with Breadcrumbs */}
        <div className="flex items-center justify-between px-6 md:px-12 py-6 md:py-8 z-40 gap-4 bg-white/50 backdrop-blur-sm sticky top-0 border-b border-gray-100/50">
          <div className="flex flex-col">
            <h2 className="text-xl font-black text-black leading-none mb-1">
              {menuItems.find(m => m.id === activeTab)?.label || activeTab}
            </h2>
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <button 
                onClick={() => setActiveTab('profile')}
                className="hover:text-brand-teal transition-colors"
              >
                Engineer Portal
              </button>
              <ChevronRight className="w-2.5 h-2.5" />
              <span className="text-brand-teal">
                {menuItems.find(m => m.id === activeTab)?.label || activeTab}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:border-brand-teal/30 transition-all shadow-sm"
              >
                <Globe className="w-4 h-4 text-brand-teal" />
                <span>{language === 'en' ? 'English' : language === 'ru' ? 'Русский' : 'O\'zbekcha'}</span>
                <ChevronRight className={`w-3 h-3 transition-transform ${isLangMenuOpen ? 'rotate-90' : ''}`} />
              </button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-40 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50 overflow-hidden"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as any);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                          language === lang.code 
                            ? 'bg-brand-teal/10 text-brand-teal' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 relative shrink-0">
                <Bell className="w-5 h-5" />
                <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </div>

              <button 
                onClick={() => setShowLogoutConfirm(true)}
                className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50 transition-all shrink-0 shadow-sm"
                title={pt.menu.logout}
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className={`${activeTab === 'messages' ? 'flex-1' : 'p-6 md:p-12 pt-4 md:pt-6 max-w-6xl mx-auto w-full'}`}>
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div 
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto space-y-8"
              >
                {/* Profile Hero */}
                <div className="relative bg-white border border-gray-200 rounded-3xl p-8 overflow-hidden shadow-sm">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/5 blur-3xl -mr-32 -mt-32 rounded-full" />
                  <div className="relative flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <div className="relative group">
                      <div className="w-32 h-32 bg-gray-50 border-2 border-gray-100 rounded-3xl flex items-center justify-center overflow-hidden">
                        {profilePicUrl ? (
                          <img src={profilePicUrl} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          <User className="w-12 h-12 text-gray-300" />
                        )}
                      </div>
                      <button className="absolute -bottom-2 -right-2 p-2 bg-brand-teal text-white rounded-xl shadow-lg hover:scale-110 transition-transform">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                        {isEditing ? (
                          <input 
                            type="text" 
                            name="fullName"
                            value={editedUser.fullName || ''}
                            onChange={handleInputChange}
                            className="text-3xl font-bold text-black border-b border-brand-teal outline-none bg-transparent"
                            placeholder="Full Name"
                          />
                        ) : (
                          <h1 className="text-3xl font-bold text-black">{user?.fullName || 'John Doe'}</h1>
                        )}
                        <div className="flex items-center gap-2 px-3 py-1 bg-brand-teal/10 border border-brand-teal/20 rounded-full">
                          <CheckCircle2 className="w-4 h-4 text-brand-teal" />
                          <span className="text-[10px] font-bold text-brand-teal uppercase tracking-widest">{pt.profile.verifiedEngineer}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-center md:justify-start gap-6 text-gray-500 text-sm">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />
                          {isEditing ? (
                            <Select 
                              options={specializationOptions}
                              value={editedUser.specialization}
                              onChange={(opt) => handleSelectChange('specialization', opt)}
                              styles={customSelectStyles}
                              className="min-w-[200px]"
                            />
                          ) : (
                            <span>{user?.specialization?.label || user?.specialization || 'Senior Software Engineer'}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {isEditing ? (
                            <div className="flex gap-2">
                              <Select 
                                options={countries}
                                value={editedUser.country}
                                onChange={(opt) => handleSelectChange('country', opt)}
                                styles={customSelectStyles}
                                className="min-w-[150px]"
                                placeholder="Country"
                              />
                              <Select 
                                options={cities}
                                value={editedUser.city}
                                onChange={(opt) => handleSelectChange('city', opt)}
                                styles={customSelectStyles}
                                className="min-w-[150px]"
                                placeholder="City"
                                isDisabled={!editedUser.country}
                              />
                            </div>
                          ) : (
                            <span>{user?.city?.label || user?.city || 'New York'}, {user?.country?.label || user?.country || 'USA'}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-brand-teal">
                          <Star className="w-4 h-4 fill-brand-teal" />
                          <span className="font-bold">4.9 (24 Reviews)</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {isEditing ? (
                        <>
                          <button 
                            onClick={handleSaveProfile}
                            disabled={isSaving}
                            className="px-6 py-3 bg-brand-teal text-white rounded-xl hover:bg-teal-300 transition-colors flex items-center gap-2 font-semibold text-sm uppercase tracking-widest shadow-lg shadow-brand-teal/20"
                          >
                            {isSaving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Check className="w-4 h-4" />}
                            Save
                          </button>
                          <button 
                            onClick={() => {
                              setIsEditing(false);
                              setEditedUser(user);
                            }}
                            className="px-6 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2 font-semibold text-sm uppercase tracking-widest"
                          >
                            <XMark className="w-4 h-4" />
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => setIsEditing(true)}
                          className="px-6 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2 font-semibold text-sm uppercase tracking-widest"
                        >
                          <Edit3 className="w-4 h-4" />
                          {pt.profile.edit}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                  {[
                    { label: pt.profile.stats.rate, value: `$${user?.hourlyRate || '50'}/hr`, icon: DollarSign, name: 'hourlyRate' },
                    { label: pt.profile.stats.halfDayRate, value: `$${user?.halfDayRate || '180'}/4h`, icon: DollarSign, name: 'halfDayRate' },
                    { label: pt.profile.stats.fullDayRate, value: `$${user?.fullDayRate || '350'}/8h`, icon: DollarSign, name: 'fullDayRate' },
                    { label: pt.profile.stats.experience, value: `${user?.experience || '5'}+ Years`, icon: Clock, name: 'experience' },
                    { label: pt.profile.stats.success, value: '98%', icon: CheckCircle2 },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-4 shadow-sm">
                      <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-brand-teal" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">{stat.label}</div>
                        {isEditing && stat.name ? (
                          <div className="flex items-center gap-1">
                            {stat.name.includes('Rate') && <span className="text-gray-400">$</span>}
                            <input 
                              type="text" 
                              name={stat.name}
                              value={editedUser[stat.name] || ''}
                              onChange={handleInputChange}
                              className="w-20 font-bold border-b border-brand-teal outline-none"
                            />
                            {stat.name === 'hourlyRate' && <span className="text-gray-400">/hr</span>}
                            {stat.name === 'halfDayRate' && <span className="text-gray-400">/4h</span>}
                            {stat.name === 'fullDayRate' && <span className="text-gray-400">/8h</span>}
                          </div>
                        ) : (
                          <div className="text-xl font-bold">{stat.value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Details Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                      <Code className="w-5 h-5 text-brand-teal" />
                      {pt.profile.skills}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(user?.skills) ? (
                        user.skills.map((skill: any) => (
                          <span key={skill.value || skill} className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm hover:border-brand-teal/30 transition-colors cursor-default">
                            {skill.label || skill}
                          </span>
                        ))
                      ) : (
                        (user?.skills || 'React, Node.js, TypeScript, AWS, Docker').split(',').map((skill: string) => (
                          <span key={skill} className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm hover:border-brand-teal/30 transition-colors cursor-default">
                            {skill.trim()}
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                      <Languages className="w-5 h-5 text-brand-teal" />
                      {pt.profile.languages}
                    </h3>
                    <div className="space-y-4">
                      {(user?.languages || [{ name: 'English', level: 'C2' }, { name: 'Russian', level: 'B2' }]).map((lang: any, i: number) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-xl">
                          <span className="font-bold">{lang.name}</span>
                          <span className="text-xs px-2 py-1 bg-brand-teal/10 text-brand-teal rounded-md font-bold uppercase tracking-widest">
                            {lang.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                      <Phone className="w-5 h-5 text-brand-teal" />
                      {pt.profile.contactInfo}
                    </h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">{(t as any).signup.fields.phoneNumber}</span>
                          <span className="text-lg font-bold">{user?.phoneCountryCode?.value} {user?.phoneNumber}</span>
                        </div>
                        <div className="w-10 h-10 bg-brand-teal/10 rounded-xl flex items-center justify-center">
                          <Phone className="w-5 h-5 text-brand-teal" />
                        </div>
                      </div>
                      {user?.whatsappNumber && (
                        <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">{(t as any).signup.fields.whatsappNumber}</span>
                            <span className="text-lg font-bold">{user?.whatsappCountryCode?.value} {user?.whatsappNumber}</span>
                          </div>
                          <div className="w-10 h-10 bg-[#25D366]/10 rounded-xl flex items-center justify-center">
                            <Phone className="w-5 h-5 text-[#25D366]" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CV Section */}
                  <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-brand-teal" />
                      CV / Resume
                    </h3>
                    <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-brand-teal/10 rounded-2xl flex items-center justify-center mb-4">
                        <FileText className="w-8 h-8 text-brand-teal" />
                      </div>
                      <h4 className="font-bold mb-1">
                        {user?.cvFile instanceof File ? user.cvFile.name : 'Curriculum Vitae.pdf'}
                      </h4>
                      <p className="text-xs text-gray-400 mb-6 uppercase tracking-widest font-bold">Verified Document</p>
                      
                      {cvUrl && (
                        <a 
                          href={cvUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full py-3 bg-brand-teal text-white font-semibold rounded-xl hover:bg-teal-300 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
                        >
                          <Search className="w-4 h-4" /> {cvT.view}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'jobs' && (
              <motion.div 
                key="jobs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                    <input 
                      type="text" 
                      placeholder={pt.jobs.searchPlaceholder}
                      className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-brand-teal/50 transition-colors shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableJobs.map((job) => (
                    <motion.div 
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-2">
                          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#009688] group-hover:bg-[#009688] group-hover:text-white transition-colors">
                            <Briefcase className="w-6 h-6" />
                          </div>
                          {job.createdAt && (new Date().getTime() - (job.createdAt?.seconds ? job.createdAt.seconds * 1000 : new Date(job.createdAt).getTime()) < 24 * 60 * 60 * 1000) && (
                            <div className="px-2 py-1 bg-brand-teal text-brand-dark text-[10px] font-black uppercase rounded-md h-fit animate-pulse">
                              New
                            </div>
                          )}
                        </div>
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                          job.priority === 'Critical (SLA)' ? 'bg-rose-100 text-rose-600' :
                          job.priority === 'High' ? 'bg-orange-100 text-orange-600' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {job.priority}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2 line-clamp-1">{job.subject}</h3>
                      <p className="text-sm text-slate-500 mb-6 line-clamp-2">{job.description}</p>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span>{job.city}, {job.country}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span>{job.estimatedDuration}</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          setSelectedJob(job);
                          setShowJobModal(true);
                        }}
                        className="w-full py-3 bg-slate-50 text-slate-600 font-bold rounded-xl group-hover:bg-[#009688] group-hover:text-white transition-all"
                      >
                        View Details
                      </button>
                    </motion.div>
                  ))}
                  {availableJobs.length === 0 && (
                    <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-4">
                        <Briefcase className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">{pt.jobs.noJobs || 'No jobs available'}</h3>
                      <p className="text-sm text-slate-500 mt-1">Check back later for new opportunities.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'messages' && (
              <motion.div 
                key="messages"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full"
              >
                <MessagingSystem currentUser={user} role="engineer" allUsers={clients} />
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div 
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto space-y-8"
              >
                <div className="bg-white border border-gray-200 rounded-3xl p-8 space-y-8 shadow-sm">
                  <section>
                    <h3 className="text-lg font-bold mb-6">{pt.settings.account}</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                        <div>
                          <div className="font-bold">{pt.settings.notifications}</div>
                          <div className="text-xs text-gray-500">{pt.settings.notificationsDesc}</div>
                        </div>
                        <div className="w-12 h-6 bg-brand-teal rounded-full relative cursor-pointer">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                        <div>
                          <div className="font-bold">{pt.settings.twoFactor}</div>
                          <div className="text-xs text-gray-500">{pt.settings.twoFactorDesc}</div>
                        </div>
                        <button className="text-xs font-bold text-brand-teal uppercase tracking-widest hover:underline">{pt.settings.enable}</button>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-bold mb-6">{pt.settings.privacy}</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                        <div>
                          <div className="font-bold">{pt.settings.visibility}</div>
                          <div className="text-xs text-gray-500">{pt.settings.visibilityDesc}</div>
                        </div>
                        <div className="w-12 h-6 bg-brand-teal rounded-full relative cursor-pointer">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                        </div>
                      </div>
                    </div>
                  </section>

                  <button className="w-full py-4 bg-red-50 text-red-500 border border-red-100 rounded-2xl font-semibold hover:bg-red-100 transition-colors">
                    {pt.settings.delete}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Job Detail Modal */}
      <AnimatePresence>
        {showJobModal && selectedJob && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowJobModal(false);
                setShowReviewStep(false);
              }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-slate-50 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 md:p-8 border-b border-slate-200 bg-white flex justify-between items-center sticky top-0 z-10">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {showReviewStep ? 'Review Your Application' : 'Job Details'}
                  </h3>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">
                    {showReviewStep ? 'Confirm your details before final submission' : 'Review job information and apply'}
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setShowJobModal(false);
                    setShowReviewStep(false);
                  }} 
                  className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                {showReviewStep ? (
                  <div className="space-y-8">
                    {/* Profile Completeness Feedback */}
                    <div className={`p-6 rounded-3xl border ${completeness.percentage === 100 ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${completeness.percentage === 100 ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
                            {completeness.percentage === 100 ? <CheckCircle2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900">Profile Completeness</h4>
                            <p className="text-xs text-slate-500 font-medium">{completeness.percentage}% Complete</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-black text-slate-900">{completeness.score}/{completeness.total}</span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-4">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${completeness.percentage}%` }}
                          className={`h-full ${completeness.percentage === 100 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                        />
                      </div>
                      <p className="text-sm font-medium text-slate-700">{completeness.feedback}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Profile Summary */}
                      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Profile Summary
                        </h4>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-16 h-16 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
                            {profilePicUrl ? (
                              <img src={profilePicUrl} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300">
                                <User className="w-8 h-8" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{user?.fullName || 'Not provided'}</p>
                            <p className="text-sm text-slate-500">{user?.specialization?.label || user?.specialization || 'Not provided'}</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Monitor className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-600">{user?.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-600">{user?.phoneCountryCode?.value} {user?.phoneNumber || 'Not provided'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Skills Review */}
                      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                          <Code className="w-4 h-4" />
                          Selected Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray(user?.skills) && user.skills.length > 0 ? (
                            user.skills.map((skill: any) => (
                              <span key={skill.value || skill} className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-semibold text-slate-700">
                                {skill.label || skill}
                              </span>
                            ))
                          ) : (
                            <p className="text-sm text-slate-400 italic">No skills selected. We recommend updating your profile.</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="bg-brand-teal/5 border border-brand-teal/20 rounded-3xl p-6">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-brand-teal/10 rounded-xl flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-6 h-6 text-brand-teal" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 mb-1">Application Confirmation</h4>
                          <p className="text-sm text-slate-600">
                            By clicking "Confirm & Submit", you agree to share your profile details and contact information with the client for this specific job.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <TicketDetailView ticket={selectedJob} t={t} language={language} />
                )}
              </div>

              <div className="p-6 md:p-8 border-t border-slate-200 bg-white flex flex-wrap gap-4 justify-end sticky bottom-0 z-10">
                {showReviewStep ? (
                  <>
                    <button 
                      onClick={() => setShowReviewStep(false)}
                      className="px-6 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all"
                    >
                      Back to Details
                    </button>
                    <button 
                      onClick={() => handleApplyJob(selectedJob.id)}
                      className="px-8 py-3 bg-brand-teal text-brand-dark font-bold rounded-xl hover:bg-teal-300 transition-all shadow-lg shadow-brand-teal/20"
                    >
                      Confirm & Submit Application
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => setShowJobModal(false)}
                      className="px-6 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all"
                    >
                      Close
                    </button>
                    <button 
                      onClick={() => setShowReviewStep(true)}
                      className="px-8 py-3 bg-[#009688] text-white font-bold rounded-xl hover:bg-[#00796B] transition-all shadow-lg shadow-[#009688]/20"
                    >
                      Apply for this Job
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <LogoutConfirmModal 
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={onLogout}
        title={pt.logoutConfirm?.title}
        message={pt.logoutConfirm?.message}
        confirmLabel={pt.logoutConfirm?.confirm}
        cancelLabel={pt.logoutConfirm?.cancel}
      />
    </div>
  );
};

export default EngineerPortal;
