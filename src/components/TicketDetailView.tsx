import React from 'react';
import { 
  HiMapPin as MapPin, 
  HiClock as Clock, 
  HiCurrencyDollar as DollarSign, 
  HiEnvelope as Mail, 
  HiPhone as Phone,
  HiDocumentText as FileText,
  HiCalendar as Calendar,
  HiTag as Tag,
  HiUser as User
} from 'react-icons/hi2';

interface TicketDetailViewProps {
  ticket: any;
  t: any;
  language: string;
}

const TicketDetailView: React.FC<TicketDetailViewProps> = ({ ticket, t, language }) => {
  const formatDateTime = (dateTimeStr: string) => {
    if (!dateTimeStr) return 'N/A';
    try {
      const date = new Date(dateTimeStr);
      return new Intl.DateTimeFormat(language === 'uz' ? 'uz-UZ' : language === 'ru' ? 'ru-RU' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(date);
    } catch (e) {
      return dateTimeStr;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical (SLA)': return 'bg-rose-100 text-rose-600 border-rose-200';
      case 'High': return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'Medium': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'Low': return 'bg-slate-100 text-slate-600 border-slate-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'Approved': return 'bg-emerald-100 text-emerald-600 border-emerald-200';
      case 'Rejected': return 'bg-rose-100 text-rose-600 border-rose-200';
      case 'Assigned': return 'bg-indigo-100 text-indigo-600 border-indigo-200';
      case 'Completed': return 'bg-slate-100 text-slate-600 border-slate-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-slate-900">TK-{ticket.id?.slice(0, 8).toUpperCase()}</h3>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border ${getStatusColor(ticket.status)}`}>
                {ticket.status}
              </span>
            </div>
            <p className={`text-sm transition-all duration-500 ${ticket.status === 'Completed' ? 'text-slate-400 line-through' : 'text-slate-500'}`}>
              {ticket.subject}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`px-4 py-2 rounded-xl border font-bold text-xs uppercase tracking-wider ${getPriorityColor(ticket.priority)}`}>
            {ticket.priority}
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Service Details */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <FileText className="w-4 h-4" /> Service Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Service Type</p>
                <p className="font-semibold text-slate-900">{ticket.serviceType}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Estimated Duration</p>
                <p className="font-semibold text-slate-900">{ticket.estimatedDuration}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Description</p>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{ticket.description}</p>
              </div>
            </div>
          </div>

          {/* Location & Time */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Location & Schedule
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Country & City</p>
                <p className="font-semibold text-slate-900">{ticket.country}, {ticket.city}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Scheduled Date/Time</p>
                <p className="font-semibold text-slate-900">{formatDateTime(ticket.dateTime)}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Exact Location</p>
                <p className="font-semibold text-slate-900">{ticket.location}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Client Info */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <User className="w-4 h-4" /> Client Information
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 font-bold">
                  {ticket.clientName?.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{ticket.clientName}</p>
                  <p className="text-xs text-slate-500">Ticket ID: TK-{ticket.ticketNumber}</p>
                </div>
              </div>
              <div className="pt-4 space-y-3 border-t border-slate-100">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>{ticket.contactEmail}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>{ticket.contactPhone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Assignment Info (if any) */}
          {ticket.engineerName && (
            <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 space-y-6">
              <h4 className="text-sm font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                <User className="w-4 h-4" /> Assigned Engineer
              </h4>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-400 font-bold shadow-sm">
                  {ticket.engineerName?.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{ticket.engineerName}</p>
                  <p className="text-xs text-slate-500">{ticket.engineerEmail}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDetailView;
