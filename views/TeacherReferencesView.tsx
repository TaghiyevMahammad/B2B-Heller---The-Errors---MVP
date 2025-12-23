import React from 'react';
import { MOCK_SENT_REFERENCES } from '../constants';
import { 
  ShieldCheck, 
  Calendar, 
  User, 
  Star, 
  Quote, 
  Search,
  BookOpen,
  LayoutGrid
} from 'lucide-react';

const TeacherReferencesView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <LayoutGrid className="w-10 h-10 text-indigo-600" />
            Referans Arxivim
          </h1>
          <p className="text-slate-500 font-medium">İndiyədək təsdiqlənmiş və göndərilmiş bütün akademik rəylər.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Tələbə və ya fənn adı ilə axtar..." 
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200 outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-sm font-semibold"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {MOCK_SENT_REFERENCES.map((ref) => (
          <div key={ref.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-indigo-50/50 transition-all group relative overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Sidebar info */}
              <div className="lg:w-72 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                      <User className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tələbə Adı</div>
                      <div className="font-bold text-slate-800">{ref.studentName}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fənn Adı</div>
                      <div className="font-bold text-slate-800">{ref.courseName}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tarix</div>
                      <div className="font-bold text-slate-800">{ref.date}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < ref.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-100'}`} />
                    ))}
                  </div>
                  <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Akademik Reytinq</div>
                </div>
              </div>

              {/* Content info */}
              <div className="flex-1 space-y-6 relative">
                <Quote className="absolute -top-6 -left-6 w-16 h-16 text-slate-50 -z-10 opacity-50" />
                <div className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 italic text-slate-700 leading-relaxed font-medium">
                  "{ref.comment}"
                </div>

                <div className="flex flex-wrap gap-2">
                  {ref.skills.map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-indigo-600 uppercase tracking-widest shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Status Badge */}
            <div className="absolute top-0 right-0 bg-emerald-600 text-white px-6 py-2 rounded-bl-3xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Göndərildi
            </div>
          </div>
        ))}

        {MOCK_SENT_REFERENCES.length === 0 && (
          <div className="py-24 text-center bg-white rounded-[3rem] border-4 border-dashed border-slate-100">
            <BookOpen className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <h3 className="text-xl font-black text-slate-300">Hələ heç bir referans göndərilməyib.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherReferencesView;