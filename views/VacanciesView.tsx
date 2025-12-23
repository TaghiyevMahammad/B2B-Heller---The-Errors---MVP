import React, { useState } from 'react';
import { Student, Vacancy, JobApplication } from '../types';
import { MOCK_VACANCIES } from '../constants';
import { 
  Briefcase, 
  Building2, 
  Send, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ChevronRight,
  Mail,
  Zap,
  Star
} from 'lucide-react';

interface VacanciesViewProps {
  student: Student;
  onUpdate: (updates: Partial<Student>) => void;
}

const VacanciesView: React.FC<VacanciesViewProps> = ({ student, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<'browse' | 'applications'>('browse');
  const [applyingId, setApplyingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{title: string, message: string, type: 'success' | 'info'} | null>(null);

  const handleApply = async (vacancy: Vacancy) => {
    if (student.applications.some(app => app.vacancyId === vacancy.id)) return;

    setApplyingId(vacancy.id);
    
    // Simulate application workflow
    const newApp: JobApplication = {
      id: Math.random().toString(36).substr(2, 9),
      vacancyId: vacancy.id,
      vacancyTitle: vacancy.title,
      company: vacancy.company,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Submitted'
    };

    // 1. Submit
    onUpdate({ applications: [...student.applications, newApp] });
    
    // 2. Automated status progression simulation
    setTimeout(() => {
      onUpdate({
        applications: student.applications.map(app => 
          app.vacancyId === vacancy.id ? { ...app, status: 'Under Review' } : app
        )
      });
      setNotification({
        title: "Status Yeniləndi",
        message: `${vacancy.company} müraciətinizə baxmağa başladı.`,
        type: 'info'
      });
    }, 5000);

    // 3. Final Result Simulation (Random after 15s)
    setTimeout(() => {
      const isAccepted = Math.random() > 0.4;
      const status = isAccepted ? 'Accepted' : 'Rejected';
      
      onUpdate({
        applications: student.applications.map(app => 
          app.vacancyId === vacancy.id ? { ...app, status } : app
        )
      });

      setNotification({
        title: isAccepted ? "Təbriklər!" : "Məlumat",
        message: isAccepted 
          ? `${vacancy.company} sizi növbəti mərhələyə dəvət edir. Emailinizi yoxlayın.`
          : `${vacancy.company} müraciətinizlə bağlı mənfi qərar qəbul etdi.`,
        type: isAccepted ? 'success' : 'info'
      });
    }, 15000);

    setApplyingId(null);
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Submitted': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Under Review': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Accepted': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Rejected': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Submitted': return <Send className="w-3.5 h-3.5" />;
      case 'Under Review': return <Clock className="w-3.5 h-3.5" />;
      case 'Accepted': return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'Rejected': return <AlertCircle className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <Briefcase className="w-10 h-10 text-indigo-600" />
            Karyera Mərkəzi
          </h1>
          <p className="text-slate-500 font-medium">Universitet tərəfdaşları tərəfindən təklif olunan ən son vakansiyalar.</p>
        </div>
        
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => setActiveTab('browse')}
            className={`px-6 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${activeTab === 'browse' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Vakansiyalar
          </button>
          <button 
            onClick={() => setActiveTab('applications')}
            className={`px-6 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${activeTab === 'applications' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Müraciətlərim ({student.applications.length})
          </button>
        </div>
      </div>

      {/* Notifications Simulation */}
      {notification && (
        <div className={`p-5 rounded-[1.5rem] border animate-in slide-in-from-top-4 duration-500 flex items-start gap-4 ${notification.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-indigo-50 border-indigo-100 text-indigo-800'}`}>
          <div className="mt-0.5">
            {notification.type === 'success' ? <Zap className="w-6 h-6 text-emerald-500 fill-emerald-500" /> : <Mail className="w-6 h-6 text-indigo-500" />}
          </div>
          <div className="flex-1">
            <div className="font-black text-sm uppercase tracking-tight">{notification.title}</div>
            <div className="text-xs font-medium mt-1">{notification.message}</div>
          </div>
          <button onClick={() => setNotification(null)} className="p-1 hover:bg-black/5 rounded-lg transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {activeTab === 'browse' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {MOCK_VACANCIES.map((v) => {
            const hasApplied = student.applications.some(app => app.vacancyId === v.id);
            const appStatus = student.applications.find(app => app.vacancyId === v.id)?.status;

            return (
              <div key={v.id} className="bg-white rounded-[2.5rem] border border-slate-200 p-8 flex flex-col hover:shadow-2xl hover:shadow-indigo-50/50 transition-all group overflow-hidden relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex gap-4">
                    <img src={v.logo} className="w-14 h-14 rounded-2xl object-cover ring-4 ring-slate-50" alt={v.company} />
                    <div>
                      <h3 className="text-xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors">{v.title}</h3>
                      <div className="flex items-center gap-1.5 text-slate-400 font-bold text-xs mt-1">
                        <Building2 className="w-4 h-4" />
                        {v.company}
                      </div>
                    </div>
                  </div>
                  {hasApplied && (
                    <div className={`px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 ${getStatusStyle(appStatus || '')}`}>
                      {getStatusIcon(appStatus || '')}
                      {appStatus === 'Submitted' ? 'Müraciət edildi' : 
                       appStatus === 'Under Review' ? 'Baxılır' : 
                       appStatus === 'Accepted' ? 'Qəbul' : 'Rədd'}
                    </div>
                  )}
                </div>

                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                  {v.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {v.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-50 rounded-lg text-slate-400 font-bold text-[10px] uppercase border border-slate-100">
                      {tag}
                    </span>
                  ))}
                </div>

                <button 
                  disabled={hasApplied || applyingId === v.id}
                  onClick={() => handleApply(v)}
                  className={`
                    w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2
                    ${hasApplied 
                      ? 'bg-slate-50 text-slate-400 cursor-not-allowed border border-slate-100' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100 hover:scale-[1.02]'}
                  `}
                >
                  {applyingId === v.id ? (
                    <Clock className="w-5 h-5 animate-spin" />
                  ) : hasApplied ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Müraciət Bitib
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      İndi Müraciət Et
                    </>
                  )}
                </button>

                {/* Aesthetic bg shape */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-50 rounded-full opacity-20 blur-2xl group-hover:scale-150 transition-transform" />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vakansiya & Şirkət</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tarix</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Gedişat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {student.applications.map((app) => (
                  <tr key={app.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="font-black text-slate-800 group-hover:text-indigo-600 transition-colors">{app.vacancyTitle}</div>
                      <div className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-tighter">{app.company}</div>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-slate-500">
                      {app.appliedDate}
                    </td>
                    <td className="px-8 py-6">
                      <div className={`w-fit px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 ${getStatusStyle(app.status)}`}>
                        {getStatusIcon(app.status)}
                        {app.status === 'Submitted' ? 'Müraciət edildi' : 
                         app.status === 'Under Review' ? 'Baxılır' : 
                         app.status === 'Accepted' ? 'Qəbul' : 'Rədd'}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-100 h-1.5 w-24 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-1000 ${app.status === 'Rejected' ? 'bg-rose-500' : 'bg-indigo-600'}`}
                            style={{ width: app.status === 'Submitted' ? '25%' : app.status === 'Under Review' ? '60%' : '100%' }}
                          />
                        </div>
                        {app.status === 'Accepted' && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 animate-pulse" />}
                      </div>
                    </td>
                  </tr>
                ))}
                {student.applications.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center">
                        <Briefcase className="w-12 h-12 text-slate-200 mb-4" />
                        <div className="text-slate-400 font-black uppercase text-xs tracking-widest">Heç bir müraciətiniz yoxdur.</div>
                        <button 
                          onClick={() => setActiveTab('browse')}
                          className="mt-4 text-indigo-600 font-bold text-sm hover:underline"
                        >
                          Vakansiyalara göz atın
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const X = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="6 18L18 6M6 6l12 12" />
  </svg>
);

export default VacanciesView;