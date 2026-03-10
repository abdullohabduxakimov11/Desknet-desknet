import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HiSquares2X2 as LayoutDashboard, 
  HiUsers as Users, 
  HiTicket as Ticket, 
  HiDocumentText as FileText, 
  HiMapPin as MapPin, 
  HiCheckCircle as CheckCircle2, 
  HiWrenchScrewdriver as HardHat,
  HiBriefcase as Briefcase, 
  HiCreditCard as CreditCard, 
  HiChartBar as BarChart3, 
  HiPlusCircle as PlusSquare, 
  HiChatBubbleLeftRight as MessageSquare, 
  HiCog6Tooth as Settings,
  HiArrowLeftOnRectangle as LogOut,
  HiBars3 as Menu,
  HiXMark as X,
  HiChevronRight as ChevronRight,
  HiMagnifyingGlass as Search,
  HiBell as Bell,
  HiUser as User,
  HiFunnel as Filter,
  HiEllipsisVertical as MoreVertical,
  HiArrowUpRight as ArrowUpRight,
  HiArrowDownRight as ArrowDownRight,
  HiClock as Clock,
  HiStar as Star,
  HiPaperAirplane as Send,
  HiHeart as Heart,
  HiChatBubbleOvalLeft as MessageCircle,
  HiShare as Share2,
  HiArrowPath as Loader2,
  HiPhoto as ImageIcon,
  HiCamera as Camera,
  HiLockClosed as Lock,
  HiEye as Eye,
  HiEyeSlash as EyeOff,
  HiExclamationCircle as AlertCircle,
  HiCheckCircle as CheckCircle,
  HiGlobeAlt as Globe,
  HiChevronDown as ChevronDown,
  HiEnvelope as Mail,
  HiPhone as Phone,
  HiCodeBracket as Code
} from 'react-icons/hi2';
import Logo from './Logo';
import LogoutConfirmModal from './LogoutConfirmModal';
import MessagingSystem from './MessagingSystem';
import { useLanguage } from '../context/LanguageContext';
import { 
  db,
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  addDoc, 
  serverTimestamp,
  updateDoc,
  setDoc,
  doc,
  deleteDoc,
  limit
} from '../firebase';
// import { 
//   collection, 
//   onSnapshot, 
//   query, 
//   orderBy, 
//   addDoc, 
//   serverTimestamp,
//   updateDoc,
//   setDoc,
//   doc,
//   deleteDoc,
//   limit
// } from 'firebase/firestore';

import TicketDetailView from './TicketDetailView';

interface AdminPortalProps {
  onLogout: () => void;
}

const AdminPortal: React.FC<AdminPortalProps> = ({ onLogout }) => {
  const { t, language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [activeUserSubTab, setActiveUserSubTab] = useState('Clients');
  const [activeTicketSubTab, setActiveTicketSubTab] = useState('Pending');
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [selectedEngineer, setSelectedEngineer] = useState<any>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [showEngineerModal, setShowEngineerModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    role: 'client',
    status: 'Active'
  });

  // Firestore Data State
  const [tickets, setTickets] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    const unsubTickets = onSnapshot(query(collection(db, "tickets"), orderBy("createdAt", "desc")), (snapshot) => {
      setTickets(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubUsers = onSnapshot(collection(db, "users"), (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubClients = onSnapshot(collection(db, "clients"), (snapshot) => {
      setClients(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubJobs = onSnapshot(query(collection(db, "jobs"), orderBy("completedAt", "desc")), (snapshot) => {
      setJobs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubPosts = onSnapshot(query(collection(db, "posts"), orderBy("createdAt", "desc")), (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubMessages = onSnapshot(query(collection(db, "messages"), orderBy("timestamp", "asc")), (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubInvoices = onSnapshot(query(collection(db, "invoices"), orderBy("createdAt", "desc")), (snapshot) => {
      setInvoices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setIsLoading(false);
    });

    return () => {
      unsubTickets();
      unsubUsers();
      unsubClients();
      unsubJobs();
      unsubPosts();
      unsubMessages();
      unsubInvoices();
    };
  }, []);

  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState<string | null>(null);
  const [ticketSearch, setTicketSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');

  // Settings states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [settingsStatus, setSettingsStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  const menuItems = [
    { id: 'Dashboard', icon: LayoutDashboard },
    { id: 'Manage Users', icon: Users },
    { id: 'Tickets', icon: Ticket },
    { id: 'Completed Jobs', icon: CheckCircle2 },
    { id: 'Billing & Invoices', icon: CreditCard },
    { id: 'Post Job & News', icon: PlusSquare },
    { id: 'Messages', icon: MessageSquare },
    { id: 'Settings', icon: Settings },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPostImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = async () => {
    if (!newPostContent.trim()) return;
    try {
      await addDoc(collection(db, "posts"), {
        author: 'Admin',
        content: newPostContent,
        image: newPostImage,
        createdAt: serverTimestamp(),
        likes: 0,
        comments: 0
      });
      setNewPostContent('');
      setNewPostImage(null);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userRef = doc(collection(db, "users"));
      const userData = {
        uid: userRef.id,
        displayName: newUser.username,
        email: newUser.email,
        role: newUser.role.toLowerCase(),
        status: newUser.status,
        createdAt: serverTimestamp()
      };
      
      await setDoc(userRef, userData);
      
      setShowAddUserModal(false);
      setNewUser({ username: '', email: '', role: 'client', status: 'Active' });
      alert(`${newUser.role} added successfully!`);
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user.");
    }
  };

  const handleUpdatePassword = async () => {
    if (!newPassword || !confirmPassword) {
      setSettingsStatus({ type: 'error', message: 'Please fill in all password fields.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setSettingsStatus({ type: 'error', message: 'New passwords do not match.' });
      return;
    }

    setIsSavingSettings(true);
    setSettingsStatus(null);

    try {
      // In a real app, we'd check the current password against Firestore
      // For this demo, we'll update the admin password in a settings document
      await setDoc(doc(db, "settings", "admin_config"), {
        adminPassword: newPassword,
        updatedAt: serverTimestamp()
      }, { merge: true });

      setSettingsStatus({ type: 'success', message: 'Admin password updated successfully!' });
      setNewPassword('');
      setConfirmPassword('');
      setCurrentPassword('');
    } catch (error) {
      console.error("Error updating settings:", error);
      setSettingsStatus({ type: 'error', message: 'Failed to update settings. Please try again.' });
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleUpdateTicketStatus = async (ticketId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "tickets", ticketId), {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
      
      if (newStatus === 'Completed') {
        setShowSuccessAnimation(true);
        setTimeout(() => setShowSuccessAnimation(false), 3000);
      } else {
        alert(`Ticket ${newStatus.toLowerCase()} successfully!`);
      }
      
      setShowTicketModal(false);
      setSelectedTicket(null);
    } catch (error) {
      console.error("Error updating ticket status:", error);
      alert("Failed to update ticket status.");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        const activeTicketsCount = tickets.filter(t => t.status !== 'Resolved' && t.status !== 'Closed').length;
        const newEngineersCount = users.filter(u => u.role === 'engineer' && u.status === 'Pending').length;
        const totalRevenue = invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + parseFloat(i.amount.replace(/[^0-9.]/g, '') || '0'), 0);
        
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, change: '+12.5%', icon: CreditCard, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { label: 'Active Tickets', value: activeTicketsCount.toString(), change: '+3', icon: Ticket, color: 'text-blue-500', bg: 'bg-blue-50' },
                { label: 'New Engineers', value: newEngineersCount.toString(), change: '+5', icon: HardHat, color: 'text-orange-500', bg: 'bg-orange-50' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-bold flex items-center gap-1 ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {stat.change.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-black">{stat.value}</h3>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-black">Recent Tickets</h3>
                  <button onClick={() => setActiveTab('Tickets')} className="text-brand-teal font-bold text-sm hover:underline">View All</button>
                </div>
                <div className="space-y-4">
                  {tickets.slice(0, 3).map((ticket, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 border border-slate-100">
                          <Ticket className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">{ticket.clientName || 'Unknown Client'}</h4>
                          <p className="text-xs text-slate-500">{ticket.subject}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase mb-1 block ${
                          ticket.urgency === 'Urgent' || ticket.urgency === 'High' ? 'bg-rose-100 text-rose-600' :
                          ticket.status === 'Pending' ? 'bg-orange-100 text-orange-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {ticket.status}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {ticket.createdAt?.toDate ? ticket.createdAt.toDate().toLocaleDateString() : 'Just now'}
                        </span>
                      </div>
                    </div>
                  ))}
                  {tickets.length === 0 && <p className="text-center text-slate-400 py-4">No tickets found</p>}
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-black">New Engineers</h3>
                  <button onClick={() => setActiveTab('Engineers')} className="text-brand-teal font-bold text-sm hover:underline">Review All</button>
                </div>
                <div className="space-y-4">
                  {users.filter(u => u.role === 'engineer').slice(0, 3).map((eng, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 border border-slate-100 overflow-hidden">
                          {eng.photoURL ? <img src={eng.photoURL} className="w-full h-full object-cover" /> : <User className="w-5 h-5" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">{eng.displayName || eng.name}</h4>
                          <p className="text-xs text-slate-500">{eng.specialization || 'General'} • {eng.country || 'Global'}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                        eng.status === 'Verified' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {eng.status || 'Pending'}
                      </span>
                    </div>
                  ))}
                  {users.filter(u => u.role === 'engineer').length === 0 && <p className="text-center text-slate-400 py-4">No engineers found</p>}
                </div>
              </div>
            </div>
          </div>
        );
      case 'Manage Users':
        const filteredClients = users.filter(u => 
          u.role === 'client' && 
          ((u.displayName?.toLowerCase() || '').includes(userSearch.toLowerCase()) || 
           (u.email?.toLowerCase() || '').includes(userSearch.toLowerCase()))
        );
        const filteredEngineers = users.filter(u => 
          u.role === 'engineer' && 
          ((u.displayName?.toLowerCase() || '').includes(userSearch.toLowerCase()) || 
           (u.email?.toLowerCase() || '').includes(userSearch.toLowerCase()))
        );
        const staffUsers = users.filter(u => u.role === 'admin' || u.role === 'staff');

        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-black">Manage Users</h3>
                <div className="flex gap-4 mt-2">
                  {['Clients', 'Engineers', 'Staff'].map(sub => (
                    <button 
                      key={sub}
                      onClick={() => setActiveUserSubTab(sub)}
                      className={`text-sm font-bold pb-2 border-b-2 transition-all ${activeUserSubTab === sub ? 'border-brand-teal text-brand-teal' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder={`Search ${activeUserSubTab.toLowerCase()}...`} 
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-teal/50 w-64"
                  />
                </div>
                <button 
                  onClick={() => {
                    setNewUser(prev => ({ ...prev, role: activeUserSubTab.slice(0, -1).toLowerCase() }));
                    setShowAddUserModal(true);
                  }}
                  className="px-4 py-2 bg-brand-teal text-slate-900 rounded-xl text-sm font-bold"
                >
                  + Add {activeUserSubTab.slice(0, -1)}
                </button>
              </div>
            </div>

            {activeUserSubTab === 'Clients' && (
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Client Name</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Joined</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredClients.map((client) => (
                      <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 font-bold text-xs overflow-hidden">
                              {client.photoURL ? <img src={client.photoURL} className="w-full h-full object-cover" /> : (client.displayName?.charAt(0) || client.email?.charAt(0))}
                            </div>
                            <span className="font-bold text-slate-900">{client.displayName || 'Unnamed Client'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">{client.email}</td>
                        <td className="px-6 py-4 text-sm text-slate-500">{client.location || 'N/A'}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                            client.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                          }`}>
                            {client.status || 'Active'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">{client.createdAt?.toDate ? client.createdAt.toDate().toLocaleDateString() : 'N/A'}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeUserSubTab === 'Engineers' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEngineers.map((eng) => (
                  <div key={eng.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-brand-teal/30 transition-all group">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 font-bold text-xl overflow-hidden">
                        {eng.photoURL ? <img src={eng.photoURL} className="w-full h-full object-cover" /> : (eng.displayName?.charAt(0) || eng.email?.charAt(0))}
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                          eng.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 
                          eng.status === 'Busy' ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-400'
                        }`}>
                          {eng.status || 'Active'}
                        </span>
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-brand-teal transition-colors">{eng.displayName || eng.fullName || 'Unnamed Engineer'}</h4>
                    <p className="text-sm text-slate-500 mb-4">{eng.specialization?.label || eng.specialization || 'General Engineer'} • {eng.location || (eng.city?.label ? `${eng.city.label}, ${eng.country?.label}` : 'N/A')}</p>
                    
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="text-center p-2 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="text-[8px] text-slate-400 uppercase font-bold">Hourly</div>
                        <div className="text-xs font-bold text-slate-900">${eng.hourlyRate || '0'}</div>
                      </div>
                      <div className="text-center p-2 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="text-[8px] text-slate-400 uppercase font-bold">Half Day</div>
                        <div className="text-xs font-bold text-slate-900">${eng.halfDayRate || '0'}</div>
                      </div>
                      <div className="text-center p-2 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="text-[8px] text-slate-400 uppercase font-bold">Full Day</div>
                        <div className="text-xs font-bold text-slate-900">${eng.fullDayRate || '0'}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                        <Star className="w-4 h-4 fill-current" /> {eng.rating || 'N/A'}
                      </div>
                      <button 
                        onClick={() => {
                          setSelectedEngineer(eng);
                          setShowEngineerModal(true);
                        }}
                        className="text-xs font-bold text-brand-teal uppercase tracking-widest hover:underline"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeUserSubTab === 'Staff' && (
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Staff Name</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {staffUsers.map((staff) => (
                      <tr key={staff.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900">{staff.displayName || staff.email}</td>
                        <td className="px-6 py-4 text-sm text-slate-500">{staff.email}</td>
                        <td className="px-6 py-4 text-sm font-bold text-brand-teal uppercase">{staff.role}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      case 'Tickets':
        const filteredTickets = tickets.filter(ticket => {
          const matchesSearch = (ticket.subject?.toLowerCase() || '').includes(ticketSearch.toLowerCase()) ||
                               (ticket.clientName?.toLowerCase() || '').includes(ticketSearch.toLowerCase());
          const matchesTab = activeTicketSubTab === 'All' || ticket.status === activeTicketSubTab;
          return matchesSearch && matchesTab;
        });

        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-black">Service Tickets</h3>
                <div className="flex gap-4 mt-2">
                  {['Pending', 'Approved', 'Rejected', 'Assigned', 'Completed', 'All'].map(sub => (
                    <button 
                      key={sub}
                      onClick={() => setActiveTicketSubTab(sub)}
                      className={`text-sm font-bold pb-2 border-b-2 transition-all ${activeTicketSubTab === sub ? 'border-brand-teal text-brand-teal' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search subject or client..." 
                    value={ticketSearch}
                    onChange={(e) => setTicketSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-teal/50 w-64"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Ticket ID</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Client</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-brand-teal text-sm flex items-center gap-2">
                        TK-{ticket.id.slice(0, 4).toUpperCase()}
                        {ticket.createdAt && (new Date().getTime() - (ticket.createdAt?.seconds ? ticket.createdAt.seconds * 1000 : new Date(ticket.createdAt).getTime()) < 24 * 60 * 60 * 1000) && (
                          <span className="px-1.5 py-0.5 bg-brand-teal text-brand-dark text-[8px] font-black uppercase rounded animate-pulse">New</span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900">{ticket.clientName}</td>
                      <td className={`px-6 py-4 text-sm transition-all duration-500 ${ticket.status === 'Completed' ? 'text-slate-400 line-through' : 'text-slate-600'}`}>
                        {ticket.subject}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                          ticket.priority === 'Critical (SLA)' ? 'bg-rose-100 text-rose-600' :
                          ticket.priority === 'High' ? 'bg-orange-100 text-orange-600' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                          ticket.status === 'Completed' ? 'bg-slate-100 text-slate-400' : 
                          ticket.status === 'Approved' ? 'bg-emerald-100 text-emerald-600' :
                          ticket.status === 'Rejected' ? 'bg-rose-100 text-rose-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {ticket.createdAt ? new Date(ticket.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setShowTicketModal(true);
                          }}
                          className="text-brand-teal font-bold text-xs hover:underline"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredTickets.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-slate-400 font-medium">
                        No tickets matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Completed Jobs':
        const completedTickets = tickets.filter(t => t.status === 'Completed');
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-black">Completed Jobs History</h3>
              <button className="text-brand-teal font-bold text-sm flex items-center gap-2">
                <FileText className="w-4 h-4" /> Export Report
              </button>
            </div>
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Job ID</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Client</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Engineer</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Completed</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {completedTickets.map((job) => (
                    <tr key={job.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900 text-sm">JB-{job.id.slice(0, 4).toUpperCase()}</td>
                      <td className="px-6 py-4 text-sm text-slate-400 line-through">{job.subject}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{job.clientName}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{job.engineerName || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{job.serviceType || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {job.updatedAt ? new Date(job.updatedAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => {
                            setSelectedTicket(job);
                            setShowTicketModal(true);
                          }}
                          className="text-brand-teal font-bold text-xs hover:underline"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                  {completedTickets.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-slate-400 font-medium">
                        No completed jobs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Post Job & News':
        return (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex gap-4 mb-4">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-brand-teal font-bold shrink-0">AD</div>
                <div className="flex-1 space-y-4">
                  <textarea 
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Share news or post a new job opportunity..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm outline-none focus:border-brand-teal/50 transition-all resize-none"
                    rows={3}
                  />
                  
                  {newPostImage && (
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-100 group">
                      <img src={newPostImage} className="w-full h-full object-cover" alt="Post preview" />
                      <button 
                        onClick={() => setNewPostImage(null)}
                        className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-slate-500 hover:text-brand-teal transition-colors text-sm font-bold cursor-pointer">
                    <ImageIcon className="w-4 h-4" /> 
                    <span>Image</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                  <button className="flex items-center gap-2 text-slate-500 hover:text-brand-teal transition-colors text-sm font-bold">
                    <Briefcase className="w-4 h-4" /> Job
                  </button>
                  <button className="flex items-center gap-2 text-slate-500 hover:text-brand-teal transition-colors text-sm font-bold">
                    <FileText className="w-4 h-4" /> Article
                  </button>
                </div>
                <button 
                  onClick={handlePost}
                  disabled={!newPostContent.trim()}
                  className="px-6 py-2 bg-brand-teal text-slate-900 rounded-xl text-sm font-bold shadow-lg shadow-brand-teal/20 hover:bg-teal-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 font-bold text-xs">
                      {post.authorName?.charAt(0) || 'A'}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{post.authorName || 'Admin'}</h4>
                      <p className="text-[10px] text-slate-400 font-medium">{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'N/A'}</p>
                    </div>
                  </div>
                  
                  {post.image && (
                    <div className="w-full aspect-video rounded-2xl overflow-hidden mb-4 border border-slate-50">
                      <img src={post.image} className="w-full h-full object-cover" alt="Post banner" />
                    </div>
                  )}
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{post.content}</p>
                  <div className="flex items-center gap-6 pt-4 border-t border-slate-50">
                    <button className="flex items-center gap-2 text-slate-400 hover:text-brand-teal transition-colors text-xs font-bold">
                      <ArrowUpRight className="w-4 h-4" /> {post.likes || 0} Likes
                    </button>
                    <button className="flex items-center gap-2 text-slate-400 hover:text-brand-teal transition-colors text-xs font-bold">
                      <MessageSquare className="w-4 h-4" /> {post.commentsCount || 0} Comments
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Messages':
        const adminUser = {
          uid: 'admin_desknet',
          email: 'admin@desknet.com',
          displayName: 'Admin',
          role: 'admin'
        };
        return <MessagingSystem currentUser={adminUser} role="admin" allUsers={users} />;
      case 'Billing & Invoices':
        const totalOutstanding = invoices.filter(i => i.status !== 'Paid').reduce((sum, i) => sum + parseFloat(i.amount.replace(/[^0-9.]/g, '') || '0'), 0);
        const paidThisMonth = invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + parseFloat(i.amount.replace(/[^0-9.]/g, '') || '0'), 0);
        const overdueCount = invoices.filter(i => i.status === 'Overdue').length;

        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Outstanding</p>
                <div className="text-3xl font-bold text-slate-900">${totalOutstanding.toLocaleString()}</div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Paid This Month</p>
                <div className="text-3xl font-bold text-emerald-500">${paidThisMonth.toLocaleString()}</div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Overdue Invoices</p>
                <div className="text-3xl font-bold text-rose-500">{overdueCount}</div>
              </div>
            </div>
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-black">Recent Invoices</h3>
                <button className="text-brand-teal text-sm font-bold hover:underline">View All</button>
              </div>
              <div className="divide-y divide-slate-100">
                {invoices.map((inv) => (
                  <div key={inv.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                        <CreditCard className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{inv.clientName}</p>
                        <p className="text-xs text-slate-400">INV-{inv.id.slice(0, 4).toUpperCase()} • {inv.createdAt ? new Date(inv.createdAt).toLocaleDateString() : 'N/A'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900">{inv.amount}</p>
                      <span className={`text-[10px] font-bold uppercase ${
                        inv.status === 'Paid' ? 'text-emerald-500' : 
                        inv.status === 'Overdue' ? 'text-rose-500' : 'text-orange-500'
                      }`}>
                        {inv.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'Settings':
        return (
          <div className="max-w-2xl space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
              <h3 className="text-xl font-bold text-black">System Settings</h3>
              
              {/* Password Change Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-900">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Security & Access</h4>
                    <p className="text-xs text-slate-500">Manage your administrative credentials.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">New Password</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-teal/50 transition-all"
                      />
                      <button 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Confirm New Password</label>
                    <input 
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-teal/50 transition-all"
                    />
                  </div>
                </div>

                {settingsStatus && (
                  <div className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-medium ${
                    settingsStatus.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
                  }`}>
                    {settingsStatus.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    <span>{settingsStatus.message}</span>
                  </div>
                )}

                <button 
                  onClick={handleUpdatePassword}
                  disabled={isSavingSettings}
                  className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSavingSettings ? 'Updating...' : 'Update Password'}
                </button>
              </div>

              <div className="pt-8 border-t border-slate-100 space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Two-Factor Authentication</h4>
                    <p className="text-xs text-slate-500">Add an extra layer of security to your account.</p>
                  </div>
                  <div className="w-12 h-6 bg-brand-teal rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Email Notifications</h4>
                    <p className="text-xs text-slate-500">Receive daily summaries and critical alerts.</p>
                  </div>
                  <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-3xl border border-slate-200 p-20 flex flex-col items-center justify-center text-center space-y-6 shadow-sm">
            <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200">
              <BarChart3 className="w-12 h-12" />
            </div>
            <div className="max-w-md">
              <h3 className="text-2xl font-bold text-black mb-2">{activeTab}</h3>
              <p className="text-slate-500">This management module is currently being populated with real-time data from the DeskNet global network. Check back shortly for full administrative controls.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      <AnimatePresence>
        {showSuccessAnimation && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-white p-12 rounded-[3rem] shadow-2xl flex flex-col items-center space-y-6"
            >
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500">
                <motion.div
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <CheckCircle className="w-16 h-16" />
                </motion.div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-900">Task Completed!</h3>
                <p className="text-slate-500 font-medium">The ticket has been successfully closed.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-white border-r border-slate-200 sticky top-0 h-screen flex flex-col z-50 shadow-sm"
      >
        <div className="p-8 flex items-center justify-between">
          {isSidebarOpen && <Logo />}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-slate-900"
          >
            {isSidebarOpen ? <Menu className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 p-3.5 rounded-xl transition-all group relative ${
                activeTab === item.id 
                  ? 'bg-slate-900 text-white font-bold shadow-lg shadow-slate-900/20' 
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {activeTab === item.id && (
                <motion.div 
                  layoutId="admin-sidebar-indicator"
                  className="absolute left-0 w-1 h-6 bg-brand-teal rounded-r-full"
                />
              )}
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-brand-teal' : 'text-slate-400 group-hover:text-brand-teal transition-colors'}`} />
              {isSidebarOpen && <span className="text-sm">{item.id}</span>}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-100">
          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center gap-4 p-4 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all group"
          >
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {isSidebarOpen && <span className="text-sm font-bold uppercase tracking-widest">Logout</span>}
          </button>
        </div>
      </motion.aside>

      <LogoutConfirmModal 
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={onLogout}
        title="Confirm Admin Logout"
        message="Are you sure you want to log out of the administrator dashboard?"
        confirmLabel="Log Out"
        cancelLabel="Cancel"
      />

      {/* Main Content Area */}
      <main className={`flex-1 flex flex-col min-w-0 ${activeTab === 'Messages' ? 'h-screen overflow-hidden' : 'overflow-y-auto'}`}>
        {/* Top Bar with Breadcrumbs */}
        <div className="flex items-center justify-between px-6 md:px-12 py-6 md:py-8 z-40 gap-4 bg-white/50 backdrop-blur-sm sticky top-0 border-b border-slate-100/50">
          <div className="flex flex-col">
            <h2 className="text-xl font-black text-black leading-none mb-1">
              {activeTab}
            </h2>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <button 
                onClick={() => setActiveTab('Dashboard')}
                className="hover:text-brand-teal transition-colors"
              >
                Admin Portal
              </button>
              <ChevronRight className="w-2.5 h-2.5" />
              <span className="text-brand-teal">
                {activeTab}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:border-brand-teal/30 transition-all shadow-sm"
              >
                <Globe className="w-4 h-4 text-brand-teal" />
                <span>{language === 'en' ? 'English' : language === 'ru' ? 'Русский' : 'O\'zbekcha'}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-40 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 overflow-hidden"
                  >
                    {[
                      { code: 'en', label: 'English' },
                      { code: 'ru', label: 'Русский' },
                      { code: 'uz', label: 'O\'zbekcha' }
                    ].map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as any);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                          language === lang.code 
                            ? 'bg-brand-teal/10 text-brand-teal' 
                            : 'text-slate-600 hover:bg-slate-50'
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
              <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 relative shrink-0">
                <Bell className="w-5 h-5" />
                <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </div>

              <button 
                onClick={() => setShowLogoutConfirm(true)}
                className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50 transition-all shrink-0 shadow-sm"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className={`${activeTab === 'Messages' ? 'flex-1' : 'p-6 md:p-12 pt-4 md:pt-6 max-w-7xl mx-auto w-full'}`}>
          {renderContent()}
        </div>
      </main>

      {/* Add User Modal */}
      <AnimatePresence>
        {showAddUserModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddUserModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-black">Add New {newUser.role.charAt(0).toUpperCase() + newUser.role.slice(1)}</h3>
                  <button onClick={() => setShowAddUserModal(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form className="space-y-6" onSubmit={handleAddUser}>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Username</label>
                    <input 
                      type="text" 
                      value={newUser.username}
                      onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                      placeholder="Enter username" 
                      className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-teal outline-none transition-all" 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                    <input 
                      type="email" 
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      placeholder="user@company.com" 
                      className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-teal outline-none transition-all" 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Role</label>
                    <select 
                      value={newUser.role}
                      onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                      className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-teal outline-none transition-all"
                    >
                      <option value="client">Client</option>
                      <option value="engineer">Engineer</option>
                      <option value="staff">Staff</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-4 bg-brand-teal text-slate-900 font-bold rounded-xl hover:bg-teal-300 transition-all shadow-lg shadow-brand-teal/20"
                  >
                    Create User
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Engineer Detail Modal */}
      <AnimatePresence>
        {showEngineerModal && selectedEngineer && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEngineerModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 md:p-8 border-b border-slate-100 bg-white flex justify-between items-center sticky top-0 z-10">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Engineer Profile</h3>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Detailed registration information</p>
                </div>
                <button onClick={() => setShowEngineerModal(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                {/* Profile Hero */}
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <div className="w-32 h-32 bg-white border border-slate-200 rounded-3xl flex items-center justify-center overflow-hidden shrink-0">
                    {selectedEngineer.photoURL || selectedEngineer.profilePic ? (
                      <img 
                        src={selectedEngineer.photoURL || selectedEngineer.profilePic} 
                        alt="Profile" 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer" 
                      />
                    ) : (
                      <User className="w-12 h-12 text-slate-200" />
                    )}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">{selectedEngineer.displayName || selectedEngineer.fullName}</h2>
                    <p className="text-brand-teal font-bold mb-4">{selectedEngineer.specialization?.label || selectedEngineer.specialization || 'IT Professional'}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedEngineer.city?.label || selectedEngineer.city}, {selectedEngineer.country?.label || selectedEngineer.country}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{selectedEngineer.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{selectedEngineer.phoneCountryCode?.value} {selectedEngineer.phoneNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                  {[
                    { label: 'Hourly Rate', value: `$${selectedEngineer.hourlyRate || '0'}/hr`, icon: CreditCard },
                    { label: 'Half-day Rate', value: `$${selectedEngineer.halfDayRate || '0'}/4h`, icon: CreditCard },
                    { label: 'Full-day Rate', value: `$${selectedEngineer.fullDayRate || '0'}/8h`, icon: CreditCard },
                    { label: 'Experience', value: `${selectedEngineer.experience || '0'}+ Years`, icon: Clock },
                    { label: 'Status', value: selectedEngineer.status || 'Active', icon: CheckCircle },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 flex items-center gap-4 shadow-sm">
                      <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-brand-teal" />
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">{stat.label}</div>
                        <div className="text-lg font-bold text-slate-900">{stat.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Skills & Languages */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-900 flex items-center gap-2">
                      <Code className="w-5 h-5 text-brand-teal" /> Technical Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(selectedEngineer.skills) ? (
                        selectedEngineer.skills.map((skill: any, i: number) => (
                          <span key={i} className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-sm text-slate-600">
                            {skill.label || skill}
                          </span>
                        ))
                      ) : (
                        (selectedEngineer.skills || '').split(',').map((skill: string, i: number) => (
                          <span key={i} className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-sm text-slate-600">
                            {skill.trim()}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-900 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-brand-teal" /> Languages
                    </h4>
                    <div className="space-y-2">
                      {(selectedEngineer.languages || []).map((lang: any, i: number) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                          <span className="font-bold text-slate-700">{lang.name}</span>
                          <span className="text-[10px] px-2 py-1 bg-brand-teal/10 text-brand-teal rounded-md font-bold uppercase">
                            {lang.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CV Section */}
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm">
                        <FileText className="w-8 h-8 text-brand-teal" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">Curriculum Vitae</h4>
                        <p className="text-xs text-slate-500">Verified Resume Document</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      {selectedEngineer.cvFile && (
                        <a 
                          href={typeof selectedEngineer.cvFile === 'string' ? selectedEngineer.cvFile : '#'} 
                          download={selectedEngineer.fullName ? `${selectedEngineer.fullName}_CV.pdf` : 'CV.pdf'}
                          className="px-6 py-3 bg-brand-teal text-slate-900 font-bold rounded-xl hover:bg-teal-300 transition-all flex items-center gap-2 shadow-lg shadow-brand-teal/20"
                        >
                          <FileText className="w-4 h-4" /> Download CV
                        </a>
                      )}
                      <button className="px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all">
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 border-t border-slate-100 bg-white flex justify-end sticky bottom-0 z-10">
                <button 
                  onClick={() => setShowEngineerModal(false)}
                  className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Ticket Detail Modal */}
      <AnimatePresence>
        {showTicketModal && selectedTicket && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTicketModal(false)}
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
                  <h3 className="text-xl font-bold text-slate-900">Ticket Details</h3>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Review and manage service request</p>
                </div>
                <button onClick={() => setShowTicketModal(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <TicketDetailView ticket={selectedTicket} t={t} language={language} />
              </div>

              <div className="p-6 md:p-8 border-t border-slate-200 bg-white flex flex-wrap gap-4 justify-end sticky bottom-0 z-10">
                {selectedTicket.status === 'Pending' && (
                  <>
                    <button 
                      onClick={() => handleUpdateTicketStatus(selectedTicket.id, 'Rejected')}
                      className="px-6 py-3 bg-rose-50 text-rose-600 font-bold rounded-xl hover:bg-rose-100 transition-all"
                    >
                      Reject Ticket
                    </button>
                    <button 
                      onClick={() => handleUpdateTicketStatus(selectedTicket.id, 'Approved')}
                      className="px-8 py-3 bg-brand-teal text-slate-900 font-bold rounded-xl hover:bg-teal-400 transition-all shadow-lg shadow-brand-teal/20"
                    >
                      Approve & List as Job
                    </button>
                  </>
                )}
                {(selectedTicket.status === 'Approved' || selectedTicket.status === 'Assigned') && (
                  <button 
                    onClick={() => handleUpdateTicketStatus(selectedTicket.id, 'Completed')}
                    className="px-8 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                  >
                    Mark as Completed
                  </button>
                )}
                <button 
                  onClick={() => setShowTicketModal(false)}
                  className="px-6 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPortal;
