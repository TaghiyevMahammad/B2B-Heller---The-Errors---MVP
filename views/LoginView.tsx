import React, { useState } from 'react';
import { UserRole } from '../types';
import { ROLES_CONFIG, MOCK_AUTH_USERS } from '../constants';
import { GraduationCap, ArrowRight, CheckCircle2, Mail, Lock, ChevronLeft, AlertCircle, Zap } from 'lucide-react';

interface LoginViewProps {
  onLogin: (role: UserRole) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'role' | 'email'>('role');

  const validateAndLogin = (e?: React.FormEvent | React.MouseEvent, customEmail?: string, customPassword?: string) => {
    if (e) e.preventDefault();
    setError(null);
    
    const finalEmail = customEmail ?? email;
    const finalPassword = customPassword ?? password;

    if (!finalEmail || !finalPassword) {
      setError("Zəhmət olmasa bütün sahələri doldurun.");
      return;
    }

    const universityRoles = [UserRole.STUDENT, UserRole.TEACHER, UserRole.UNIVERSITY_ADMIN];
    const isUniversityRole = selectedRole && universityRoles.includes(selectedRole);

    // 1. Domain Validation
    if (isUniversityRole) {
      if (!finalEmail.toLowerCase().endsWith('@unec.edu.az')) {
        setError("Giriş yalnız səlahiyyətli korporativ (@unec.edu.az) email ünvanları ilə mümkündür.");
        return;
      }
    } else if (selectedRole === UserRole.PARTNER_COMPANY) {
      const partnerPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.unex\.az$/;
      if (!partnerPattern.test(finalEmail.toLowerCase())) {
        setError("Giriş yalnız təyin edilmiş şirkət (@companyname.unex.az) email ünvanları ilə mümkündür.");
        return;
      }
    }

    // 2. Credential & Role Verification
    const authorizedUser = MOCK_AUTH_USERS.find(
      (user) => 
        user.email.toLowerCase() === finalEmail.toLowerCase() && 
        user.password === finalPassword && 
        user.role === selectedRole
    );

    if (!authorizedUser) {
      setError("Email və ya şifrə yanlışdır. Giriş yalnız səlahiyyətli istifadəçilər üçündür.");
      return;
    }

    onLogin(authorizedUser.role);
  };

  const handleFillDemo = () => {
    if (!selectedRole) return;
    
    const demoUser = MOCK_AUTH_USERS.find(u => u.role === selectedRole);
    if (demoUser) {
      setEmail(demoUser.email);
      setPassword(demoUser.password);
      // Auto-trigger login for the best jury experience
      validateAndLogin(undefined, demoUser.email, demoUser.password);
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep('email');
    setError(null);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-white xl:bg-slate-50 flex items-center justify-center p-4 lg:p-6 selection:bg-indigo-100">
      <div className="max-w-7xl w-full flex flex-col xl:grid xl:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Hero Section */}
        <div className="xl:col-span-5 w-full flex flex-col items-center text-center space-y-8 py-8 xl:py-0 order-1">
          <div className="space-y-6">
            <div className="bg-indigo-600 w-28 h-28 lg:w-32 lg:h-32 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-100/50 mx-auto">
              <GraduationCap className="text-white w-14 h-14 lg:w-16 lg:h-16" />
            </div>
            
            <div className="space-y-0">
              <h1 className="text-7xl lg:text-8xl font-black text-slate-800 tracking-tighter leading-none">
                UBEX
              </h1>
              <p className="text-indigo-600 font-bold uppercase tracking-[0.5em] text-sm lg:text-base pt-3">
                UNI BRIDGE EXCHANGE
              </p>
            </div>
          </div>

          <p className="text-slate-500 text-lg lg:text-xl font-medium italic leading-relaxed max-w-sm">
            "Universitet daxili akademik məlumatları real bacarıqlara çevirən növbəti nəsil təhsil platforması."
          </p>

          <div className="flex flex-row flex-wrap items-center justify-center gap-3 w-full">
            <div className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-full shadow-sm border border-slate-100 text-[10px] lg:text-[11px] font-black text-slate-400 uppercase tracking-widest">
              <CheckCircle2 className="text-green-500 w-4 h-4" />
              Təhlükəsiz Giriş
            </div>
            <div className="px-5 py-2.5 bg-white rounded-full shadow-sm border border-slate-100 text-[10px] lg:text-[11px] font-black text-slate-400 uppercase tracking-widest">
              Closed Beta v1.0
            </div>
          </div>
        </div>

        {/* Roles & Login Content */}
        <div className="xl:col-span-7 w-full bg-white p-6 lg:p-10 rounded-[3.5rem] shadow-2xl shadow-indigo-50/50 border border-slate-100 space-y-6 order-2 ring-1 ring-slate-200/50 min-h-[550px] flex flex-col">
          
          {step === 'role' ? (
            <div className="space-y-6 animate-in fade-in duration-500 slide-in-from-right-4">
              <div className="space-y-1 text-center">
                <h2 className="text-2xl lg:text-3xl font-black text-slate-800 tracking-tight">Sistemi Kəşf Edin</h2>
                <p className="text-sm lg:text-base text-slate-400 font-medium">Davam etmək üçün müvafiq rolu seçin</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
                {ROLES_CONFIG.map((item, idx) => (
                  <button 
                    key={item.role}
                    onClick={() => handleRoleSelect(item.role)}
                    style={{ animationDelay: `${idx * 80}ms` }}
                    className="group flex flex-col justify-between p-5 lg:p-6 rounded-[2rem] border border-slate-50 bg-slate-50/30 hover:bg-white hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-500 text-left animate-slide-up"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all transform group-hover:rotate-12">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="font-black text-slate-800 group-hover:text-indigo-700 transition-colors text-lg">{item.label}</div>
                      <div className="text-xs text-slate-400 font-medium group-hover:text-slate-500 transition-colors line-clamp-2">{item.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-500 slide-in-from-left-4 flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setStep('role')}
                  className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold text-sm transition-colors group w-fit"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Rollara qayıt
                </button>
                
                {/* Jury Testing Button */}
                <button 
                  onClick={handleFillDemo}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors text-[10px] font-black uppercase tracking-wider border border-indigo-100"
                >
                  <Zap className="w-3 h-3 fill-indigo-600" />
                  YOXLAMA
                </button>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                  {ROLES_CONFIG.find(r => r.role === selectedRole)?.label} Girişi
                </h2>
                <p className="text-slate-400 font-medium text-sm">Zəhmət olmasa təyin edilmiş korporativ giriş məlumatlarınızı daxil edin.</p>
              </div>

              <div className="space-y-4">
                {/* Email Input */}
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email ünvanı"
                    className="w-full pl-14 pr-6 py-4 rounded-[1.5rem] bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-semibold text-slate-900 placeholder:text-slate-400"
                    autoFocus
                  />
                </div>

                {/* Password Input */}
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && validateAndLogin()}
                    placeholder="Şifrə"
                    className="w-full pl-14 pr-6 py-4 rounded-[1.5rem] bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-semibold text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                {error && (
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-xs font-bold leading-relaxed">{error}</p>
                  </div>
                )}

                <button 
                  onClick={validateAndLogin}
                  className="w-full bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 group"
                >
                  Sistemə Giriş
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider text-center leading-relaxed">
                  Təhlükəsizlik üçün yalnız təsdiqlənmiş korporativ ünvanlara və şifrələrə icazə verilir.
                </p>
              </div>
            </div>
          )}
          
          <div className="pt-8 mt-auto text-center border-t border-slate-100">
            <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">
              Bütün hüquqlar qorunur © 2025 UBEX - Uni Bridge Exchange
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;