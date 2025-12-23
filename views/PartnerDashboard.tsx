
import React, { useState } from 'react';
import { MOCK_STUDENT } from '../constants';
import { Search, Filter, Briefcase, ChevronRight, CheckCircle2 } from 'lucide-react';

const PartnerDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Bacarıq və ya fakültə üzrə axtar..." 
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 bg-slate-100 text-slate-700 px-6 py-3 rounded-2xl font-bold hover:bg-slate-200 transition-all">
            <Filter className="w-5 h-5" />
            Filtrlər
          </button>
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
            Namizədləri tap
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Student Result Card */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all group">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <img src={MOCK_STUDENT.avatar} className="w-16 h-16 rounded-2xl object-cover" />
              <div>
                <div className="font-bold text-slate-800 text-lg flex items-center gap-1">
                  {MOCK_STUDENT.name} {MOCK_STUDENT.surname}
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-sm text-slate-500">{MOCK_STUDENT.faculty}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Akademik Təsdiq</span>
                <span className="bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full text-[10px]">REYTİNQLİ</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {MOCK_STUDENT.skills.slice(0, 3).map(skill => (
                  <span key={skill.name} className="bg-slate-50 text-slate-600 px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-100">
                    {skill.name}
                  </span>
                ))}
              </div>
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500 line-clamp-2 italic">
                  "Dr. Əli Əliyev tərəfindən 'Alqoritmlər' sahəsində yüksək qiymətləndirilib."
                </p>
              </div>
            </div>
          </div>
          <button className="w-full bg-slate-50 p-4 text-indigo-600 font-bold flex items-center justify-center gap-2 group-hover:bg-indigo-600 group-hover:text-white transition-all">
            <Briefcase className="w-4 h-4" />
            Profilə bax
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;
