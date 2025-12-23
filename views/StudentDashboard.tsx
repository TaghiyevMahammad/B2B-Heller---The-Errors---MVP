import React, { useEffect, useState } from 'react';
import { Student } from '../types';
import SkillChart from '../components/SkillChart';
import { getStudentInsight } from '../services/geminiService';
import { 
  BrainCircuit, 
  BookOpen, 
  Star, 
  FolderGit2, 
  Linkedin, 
  Github, 
  Link as LinkIcon,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  FileText
} from 'lucide-react';

interface StudentDashboardProps {
  student: Student;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ student }) => {
  const [insight, setInsight] = useState<string>('');

  useEffect(() => {
    const fetchInsight = async () => {
      const result = await getStudentInsight(student);
      setInsight(result || 'Təhlil zamanı xəta baş verdi.');
    };
    fetchInsight();
  }, [student.skills, student.cv?.analysisStatus, student.gpa]);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'LinkedIn': return <Linkedin className="w-4 h-4 text-blue-600" />;
      case 'GitHub': return <Github className="w-4 h-4 text-slate-800" />;
      default: return <LinkIcon className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="w-full space-y-6 lg:space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Header Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800">
              {student.gpa.toFixed(2)}
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">GPA Göstəricisi</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800">{student.skills.length}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Təsdiqlənmiş Bacarıq</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
            <Star className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800">{student.references.length}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Müəllim Referansı</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
            <FolderGit2 className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800">{student.projects.length}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Akademik Layihə</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-10">
        {/* Profile Card & Insight */}
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-white p-6 lg:p-10 rounded-[2.5rem] shadow-sm border border-slate-200 flex flex-col h-fit">
            <div className="flex flex-col items-center text-center">
              <div className="relative group">
                <img src={student.avatar} className="w-28 h-28 lg:w-32 lg:h-32 rounded-[2rem] object-cover mb-6 ring-8 ring-indigo-50 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-white shadow-sm" />
              </div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">{student.name} {student.surname}</h2>
              <p className="text-slate-500 font-medium mt-1 text-sm">{student.faculty} | {student.courseYear}-cü kurs</p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2 mb-4 text-indigo-700 font-bold text-sm uppercase tracking-widest">
                <BrainCircuit className="w-5 h-5" />
                AI Zəka Xülasəsi
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                {insight ? (
                  <p className="text-sm text-slate-600 leading-relaxed italic">
                    "{insight}"
                  </p>
                ) : (
                  <div className="flex gap-1 py-4 justify-center">
                    <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce delay-150"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Links Section */}
            <div className="mt-6 space-y-3">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Peşəkar Keçidlər</div>
              <div className="flex flex-wrap gap-2">
                {student.links.length > 0 ? (
                  student.links.map(link => (
                    <a 
                      key={link.id} 
                      href={link.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-300 transition-colors"
                    >
                      {getPlatformIcon(link.platform)}
                      <span className="text-[11px] font-bold text-slate-600">{link.label || link.platform}</span>
                    </a>
                  ))
                ) : (
                  <div className="text-[10px] text-slate-300 italic px-1 font-medium">Heç bir link əlavə edilməyib.</div>
                )}
              </div>
            </div>
          </div>

          {/* CV Status Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-2 rounded-xl">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-black tracking-tight">CV Analiz Statusu</h4>
            </div>
            {student.cv?.analysisStatus === 'none' ? (
              <div className="space-y-4">
                <p className="text-xs text-indigo-100 leading-relaxed">Hələ CV analizi aparılmayıb. Profil bölməsindən CV-nizi yükləyərək bacarıq matrisinizi zənginləşdirə bilərsiniz.</p>
                <div className="text-[10px] font-bold bg-white/10 w-fit px-3 py-1 rounded-full uppercase tracking-widest">Gözləmədə</div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl border border-white/10">
                  <div className="truncate pr-4">
                    <div className="text-[10px] font-black uppercase text-indigo-200">Analiz Edilən Fayl</div>
                    <div className="font-bold text-sm truncate">{student.cv?.fileName}</div>
                  </div>
                  <Sparkles className="w-5 h-5 text-indigo-200 shrink-0" />
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-100 uppercase tracking-widest">
                  <CheckCircle2 className="w-4 h-4" />
                  Bacarıq Matrisi Yeniləndi
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Skill Matrix & Analysis */}
        <div className="xl:col-span-8 bg-white p-6 lg:p-10 rounded-[2.5rem] shadow-sm border border-slate-200 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h3 className="text-xl lg:text-2xl font-black text-slate-800 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-indigo-600" />
              Komprensiv Bacarıq Matrisi
            </h3>
            {student.cv?.analysisStatus !== 'none' && (
              <span className="flex items-center gap-1 text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100 uppercase tracking-widest">
                <Sparkles className="w-3 h-3" />
                AI Təkmilləşdirilib
              </span>
            )}
          </div>
          
          <div className="bg-slate-50/50 rounded-[2rem] p-4 lg:p-8 border border-slate-100">
            <SkillChart skills={student.skills} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-10 flex-1">
            {student.skills.map((skill, idx) => (
              <div key={idx} className="p-5 bg-white rounded-3xl border border-slate-100 hover:border-indigo-200 transition-all group relative overflow-hidden">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded border border-slate-100">{skill.category}</div>
                  <div className="text-indigo-600 font-bold text-sm">{skill.value}%</div>
                </div>
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  {skill.name}
                  {skill.isAiGenerated && <Sparkles className="w-3 h-3 text-indigo-400" />}
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${skill.isAiGenerated ? 'bg-gradient-to-r from-purple-500 to-indigo-500' : 'bg-indigo-600'}`}
                    style={{ width: `${skill.value}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        {/* References */}
        <div className="bg-white p-6 lg:p-10 rounded-[2.5rem] shadow-sm border border-slate-200">
          <h3 className="text-xl lg:text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
            <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
            Akademik Təsdiqlər
          </h3>
          <div className="space-y-6">
            {student.references.map((ref) => (
              <div key={ref.id} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 relative overflow-hidden group hover:bg-white hover:border-indigo-200 transition-all">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-indigo-600">
                      {ref.teacherName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-black text-slate-800 text-sm">{ref.teacherName}</div>
                      <div className="text-[11px] font-bold text-slate-400">{ref.courseName}</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < ref.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed mb-4 italic">"{ref.comment}"</p>
                <div className="flex flex-wrap gap-2">
                  {ref.skills.map(skill => (
                    <span key={skill} className="text-[9px] bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-indigo-600 uppercase tracking-widest font-bold">
                      {skill}
                    </span>
                  ))}
                </div>
                {ref.isVerified && (
                  <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[9px] px-3 py-1 rounded-bl-2xl font-black tracking-tighter">
                    VERIFIED
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="bg-white p-6 lg:p-10 rounded-[2.5rem] shadow-sm border border-slate-200">
          <h3 className="text-xl lg:text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
            <FolderGit2 className="w-8 h-8 text-indigo-600" />
            Layihə Portfoliom
          </h3>
          <div className="space-y-6">
            {student.projects.map((proj) => (
              <div key={proj.id} className="p-6 bg-white border border-slate-100 rounded-[2rem] hover:border-indigo-400 transition-all group shadow-sm">
                <div className="flex justify-between items-start gap-3 mb-3">
                  <div className="font-black text-lg text-slate-800 group-hover:text-indigo-700 transition-colors">{proj.title}</div>
                  <span className="bg-slate-100 text-slate-600 font-black px-3 py-1 rounded-xl text-[10px] uppercase">Grade: {proj.grade}</span>
                </div>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed line-clamp-2">{proj.description}</p>
                <div className="flex flex-wrap gap-2">
                  {proj.skillsGained.map(s => (
                    <span key={s} className="bg-slate-50 text-slate-500 text-[9px] px-2.5 py-1 rounded-lg font-bold border border-slate-100">
                      #{s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;