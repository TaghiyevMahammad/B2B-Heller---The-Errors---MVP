import React, { useState, useEffect } from 'react';
import { UserRole, Student } from './types';
import Layout from './components/Layout';
import LoginView from './views/LoginView';
import StudentDashboard from './views/StudentDashboard';
import ProfileView from './views/ProfileView';
import CertificatesView from './views/CertificatesView';
import VacanciesView from './views/VacanciesView';
import TeacherDashboard from './views/TeacherDashboard';
import TeacherReferencesView from './views/TeacherReferencesView';
import UniversityDashboard from './views/UniversityDashboard';
import PartnersManagementView from './views/PartnersManagementView';
import PartnerDashboard from './views/PartnerDashboard';
import { GraduationCap } from 'lucide-react';
import { MOCK_STUDENT } from './constants';

const SplashScreen: React.FC = () => (
  <div className="fixed inset-0 z-[100] bg-indigo-600 flex flex-col items-center justify-center animate-out fade-out-smooth duration-1000 fill-mode-forwards delay-[3000ms]">
    <div className="bg-white p-6 rounded-full shadow-2xl mb-8 transition-transform duration-700">
      < GraduationCap className="text-indigo-600 w-16 h-16" />
    </div>
    <div className="text-center space-y-2">
      <h1 className="text-white text-6xl font-black tracking-tighter">
        UBEX
      </h1>
      <p className="text-indigo-100 text-sm font-bold uppercase tracking-[0.3em] opacity-80">
        Uni Bridge Exchange
      </p>
    </div>
    <div className="mt-12 flex gap-3">
      <div className="w-2.5 h-2.5 bg-indigo-200 rounded-full"></div>
      <div className="w-2.5 h-2.5 bg-indigo-200 rounded-full"></div>
      <div className="w-2.5 h-2.5 bg-indigo-200 rounded-full"></div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [currentView, setCurrentView] = useState('Dashboard');
  const [showSplash, setShowSplash] = useState(true);
  
  // Shared state for the current session's student profile
  const [studentData, setStudentData] = useState<Student>(MOCK_STUDENT);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    setUserRole(null);
    setCurrentView('Dashboard');
  };

  const updateStudent = (updates: Partial<Student>) => {
    setStudentData(prev => ({ ...prev, ...updates }));
  };

  const renderView = () => {
    // Shared Student-related Overrides
    if (currentView === 'Profilim') {
      return <ProfileView student={studentData} onUpdate={updateStudent} onNavigate={setCurrentView} />;
    }
    
    if (currentView === 'Sertifikatlar') {
      return <CertificatesView student={studentData} onUpdate={updateStudent} />;
    }

    if (currentView === 'Vakansiyalar') {
      return <VacanciesView student={studentData} onUpdate={updateStudent} />;
    }

    // Teacher View Specifics
    if (userRole === UserRole.TEACHER && currentView === 'Referanslar') {
      return <TeacherReferencesView />;
    }

    // Admin View Specifics
    if (userRole === UserRole.UNIVERSITY_ADMIN) {
      if (currentView === 'Analitika') return <UniversityDashboard />;
      if (currentView === 'Tərəfdaşlar') return <PartnersManagementView />;
    }

    // Role-based Dashboard defaults
    switch (userRole) {
      case UserRole.STUDENT:
        return <StudentDashboard student={studentData} />;
      case UserRole.TEACHER:
        return <TeacherDashboard />;
      case UserRole.UNIVERSITY_ADMIN:
        return <UniversityDashboard />; // Analytics is the default dashboard
      case UserRole.PARTNER_COMPANY:
        return <PartnerDashboard />;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50">
      {showSplash && <SplashScreen />}
      
      {!userRole ? (
        <div className="animate-slide-up">
          <LoginView onLogin={(role) => {
            setUserRole(role);
            // Default views based on role
            if (role === UserRole.UNIVERSITY_ADMIN) setCurrentView('Analitika');
            else setCurrentView('Dashboard');
          }} />
        </div>
      ) : (
        <Layout 
          role={userRole} 
          currentView={currentView}
          onNavigate={setCurrentView}
          onLogout={handleLogout}
        >
          <div className="animate-in fade-in duration-1000 cubic-bezier(0.16, 1, 0.3, 1)">
            {renderView()}
          </div>
        </Layout>
      )}
    </div>
  );
};

export default App;