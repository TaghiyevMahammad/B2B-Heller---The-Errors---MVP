import React, { useState } from 'react';
import { UserRole } from '../types';
import { 
  LayoutDashboard, 
  UserCircle, 
  GraduationCap, 
  Building2, 
  LogOut, 
  Menu,
  ShieldCheck,
  Award,
  X,
  Briefcase
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  role: UserRole;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, role, currentView, onNavigate, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getNavItems = () => {
    switch (role) {
      case UserRole.STUDENT:
        return [
          { icon: UserCircle, label: 'Profilim' },
          { icon: LayoutDashboard, label: 'Dashboard' },
          { icon: Award, label: 'Sertifikatlar' },
          { icon: Briefcase, label: 'Vakansiyalar' },
        ];
      case UserRole.TEACHER:
        return [
          { icon: LayoutDashboard, label: 'Tələbələr' },
          { icon: ShieldCheck, label: 'Referanslar' },
        ];
      case UserRole.UNIVERSITY_ADMIN:
        return [
          { icon: LayoutDashboard, label: 'Analitika' },
          { icon: Building2, label: 'Tərəfdaşlar' },
        ];
      case UserRole.PARTNER_COMPANY:
        return [
          { icon: LayoutDashboard, label: 'İstedadlar' },
          { icon: UserCircle, label: 'İşə Qəbul' },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-40 lg:hidden transition-opacity duration-700"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-200 transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) transform 
          ${isSidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0 lg:w-24 lg:hover:w-72'} 
          flex flex-col group
        `}
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4 overflow-hidden">
            <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-100 flex-shrink-0">
              <GraduationCap className="text-white w-7 h-7" />
            </div>
            <div className={`transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 lg:group-hover:opacity-100 lg:group-hover:translate-x-0'}`}>
              <span className="font-black text-slate-800 text-2xl tracking-tighter block leading-none">
                UBEX
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                Uni Bridge Exchange
              </span>
            </div>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="lg:hidden p-2 text-slate-400 hover:text-slate-600 transition-smooth"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-5 space-y-2 overflow-y-auto overflow-x-hidden scrollbar-hide">
          {getNavItems().map((item, idx) => (
            <button 
              key={idx} 
              onClick={() => {
                onNavigate(item.label);
                setIsSidebarOpen(false);
              }}
              className={`
                flex items-center gap-4 w-full p-4 rounded-[1.5rem] transition-smooth group/item
                ${currentView === item.label ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-slate-50 text-slate-600 hover:text-indigo-600'}
              `}
            >
              <item.icon className={`w-6 h-6 flex-shrink-0 group-item-hover:scale-110 transition-transform duration-500 ${currentView === item.label ? 'scale-110' : ''}`} />
              <span className={`font-semibold whitespace-nowrap transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 lg:group-hover:opacity-100 lg:group-hover:translate-x-0'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="p-5 border-t border-slate-100">
          <button 
            onClick={onLogout}
            className="flex items-center gap-4 w-full p-4 rounded-[1.5rem] text-red-500 hover:bg-red-50 transition-smooth"
          >
            <LogOut className="w-6 h-6 flex-shrink-0" />
            <span className={`font-semibold whitespace-nowrap transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 lg:group-hover:opacity-100 lg:group-hover:translate-x-0'}`}>
              Çıxış
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) lg:ml-24">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center px-6 lg:px-10 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="p-3 hover:bg-slate-100 rounded-xl lg:hidden text-slate-500 transition-smooth"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="font-bold text-slate-800 text-lg">
              {currentView === 'Analitika' ? 'Akademik Analitika' : currentView}
            </h2>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-10 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;