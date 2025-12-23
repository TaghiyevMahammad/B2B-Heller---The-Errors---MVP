import React, { useState, useEffect } from 'react';
import { MOCK_UNIVERSITY_STATS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Users, GraduationCap, Building2, TrendingUp, Sparkles, Loader2, Download } from 'lucide-react';

const UniversityDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const COLORS = ['#4f46e5', '#818cf8', '#a5b4fc', '#c7d2fe'];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: 'Ümumi Tələbə', value: MOCK_UNIVERSITY_STATS.totalStudents, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Müəllim Heyəti', value: MOCK_UNIVERSITY_STATS.totalTeachers, icon: GraduationCap, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Şirkət Partnyorluğu', value: MOCK_UNIVERSITY_STATS.partnerCompanies, icon: Building2, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Orta GPA', value: MOCK_UNIVERSITY_STATS.averageGpa, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Akademik Analitika</h1>
          <p className="text-slate-500 font-medium mt-2">Universitet daxili akademik effektivliyin real zamanlı xülasəsi.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold hover:bg-slate-50 transition-all shadow-sm">
          <Download className="w-4 h-4" />
          Hesabatı Yüklə (PDF)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-indigo-50/50 transition-all group">
            <div className={`${s.bg} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <s.icon className={`w-7 h-7 ${s.color}`} />
            </div>
            <div className="text-4xl font-black text-slate-800 tracking-tight">{s.value}</div>
            <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">İstedad Paylanması</h3>
            <span className="text-xs font-bold text-slate-400 bg-slate-50 px-4 py-2 rounded-full border border-slate-100 uppercase tracking-widest">Bacarıq Sayı üzrə</span>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_UNIVERSITY_STATS.topSkills}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: '#f8fafc', radius: 10 }}
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 800 }}
                />
                <Bar dataKey="count" radius={[10, 10, 0, 0]} barSize={60}>
                  {MOCK_UNIVERSITY_STATS.topSkills.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-indigo-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-indigo-200 flex flex-col items-center text-center justify-center space-y-6">
            <div className="bg-white/20 p-4 rounded-full backdrop-blur-md">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black tracking-tight">Strategiya Tövsiyəsi</h3>
              <div className="h-px bg-white/20 w-12 mx-auto" />
            </div>
            <p className="text-indigo-100 leading-relaxed italic font-medium">
              "Cari semestr üzrə proqramlaşdırma bacarıqları üzrə artım müşahidə olunur. Lakin müəllim referanslarında 'Problem Həll Etmə' xalları nisbətən aşağıdır. Praktik laboratoriya işlərinin sayının 15% artırılması tövsiyə edilir."
            </p>
            <button className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-transform">
              Detallı Analizi Aç
            </button>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-4">
             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sistem Statusu</div>
             <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                <div className="font-bold text-slate-700 text-sm">Bütün məlumatlar yenidir</div>
             </div>
             <p className="text-xs text-slate-500 leading-relaxed font-medium">Son sinxronizasiya: 5 dəqiqə əvvəl</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityDashboard;