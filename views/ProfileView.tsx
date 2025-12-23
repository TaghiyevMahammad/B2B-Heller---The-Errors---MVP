import React, { useState } from 'react';
import { DEMO_CV_ANALYSIS_SKILLS } from '../constants';
import { ProfileLink, Skill, Student } from '../types';
import { 
  Linkedin, 
  Github, 
  Terminal, 
  Link as LinkIcon, 
  FileText, 
  Plus, 
  X, 
  CheckCircle2, 
  UploadCloud, 
  Sparkles, 
  Loader2,
  Eye,
  Settings2,
  GraduationCap,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { analyzeCVContent } from '../services/geminiService';

interface ProfileViewProps {
  student: Student;
  onUpdate: (updates: Partial<Student>) => void;
  onNavigate: (view: string) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ student, onUpdate, onNavigate }) => {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newLink, setNewLink] = useState({ platform: 'Other', label: '', url: '' });

  const handleAddLink = () => {
    if (!newLink.url) return;
    
    const displayLabel = newLink.label.trim() || newLink.platform;

    const link: ProfileLink = {
      id: Math.random().toString(36).substr(2, 9),
      platform: newLink.platform as any,
      label: displayLabel,
      url: newLink.url
    };
    onUpdate({ links: [...student.links, link] });
    setNewLink({ platform: 'Other', label: '', url: '' });
    setShowForm(false);
  };

  const removeLink = (id: string) => {
    onUpdate({ links: student.links.filter(l => l.id !== id) });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setCvFile(file);
      triggerAnalysis(file.name, false);
    }
  };

  const triggerAnalysis = async (fileName: string, isDemo: boolean) => {
    setIsAnalyzing(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (isDemo) {
      const demoLinks: ProfileLink[] = [
        { id: 'dl1', platform: 'GitHub', url: 'https://github.com/demo-user', label: 'Portfolio (GitHub)' },
        { id: 'dl2', platform: 'LinkedIn', url: 'https://linkedin.com/in/demo-user', label: 'Professional Profile' }
      ];
      onUpdate({ 
        skills: DEMO_CV_ANALYSIS_SKILLS as Skill[], 
        links: student.links.length === 0 ? demoLinks : student.links,
        cv: { fileName, uploadDate: new Date().toISOString(), analysisStatus: 'demo' }
      });
    } else {
      const result = await analyzeCVContent(fileName);
      if (result.skills.length > 0) {
        const extractedLinks: ProfileLink[] = result.links.map((l: any) => ({
          id: Math.random().toString(36).substr(2, 9),
          platform: l.platform,
          url: l.url,
          label: l.platform
        }));

        onUpdate({ 
          skills: result.skills.map((s: any) => ({ ...s, isAiGenerated: true })),
          links: [...student.links, ...extractedLinks],
          cv: { fileName, uploadDate: new Date().toISOString(), analysisStatus: 'completed' }
        });
      }
    }
    setIsAnalyzing(false);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'LinkedIn': return <Linkedin className="w-5 h-5 text-blue-600" />;
      case 'GitHub': return <Github className="w-5 h-5 text-slate-800" />;
      case 'LeetCode': return <Terminal className="w-5 h-5 text-orange-500" />;
      default: return <LinkIcon className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Profil Tənzimləmələri</h1>
          <p className="text-slate-500 font-medium mt-2">Akademik məlumatlarınızı və peşəkar linklərinizi buradan idarə edin.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
          <img src={student.avatar} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-50" />
          <div>
            <div className="font-black text-slate-800">{student.name} {student.surname}</div>
            <div className="text-xs font-bold text-indigo-500 uppercase tracking-widest">
              {student.faculty} | {student.courseYear}-cü kurs
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Read-only Academic Info Management */}
        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-indigo-600" />
              Akademik Məlumatlar
            </h3>
            <span className="bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-indigo-100 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Təsdiqlənmiş
            </span>
          </div>
          
          <div className="space-y-4">
            <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between group">
              <div className="space-y-0.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kurs Səviyyəsi</label>
                <div className="text-xl font-black text-slate-800">{student.courseYear}-cü kurs</div>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm group-hover:scale-110 transition-transform">
                <GraduationCap className="w-5 h-5 text-indigo-500" />
              </div>
            </div>

            <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between group">
              <div className="space-y-0.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">GPA Göstəricisi</label>
                <div className="text-xl font-black text-slate-800">{student.gpa.toFixed(2)}</div>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
          </div>

          <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
             <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider text-center leading-relaxed italic">
                Bu məlumatlar universitet tərəfindən rəsmi olaraq təmin edilir və tələbə tərəfindən dəyişdirilə bilməz.
             </p>
          </div>
        </section>

        {/* Management: Links */}
        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <LinkIcon className="w-6 h-6 text-indigo-600" />
              Peşəkar Keçidlər
            </h3>
            <button 
              onClick={() => setShowForm(!showForm)}
              className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-xl transition-colors"
            >
              {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </button>
          </div>

          {showForm && (
            <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 space-y-4 animate-in zoom-in-95 duration-300">
              <div className="grid grid-cols-2 gap-3">
                <select 
                  value={newLink.platform}
                  onChange={(e) => setNewLink({...newLink, platform: e.target.value})}
                  className="bg-white border border-slate-200 p-3 rounded-2xl text-sm font-bold outline-none text-slate-900"
                >
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="GitHub">GitHub</option>
                  <option value="LeetCode">LeetCode</option>
                  <option value="Other">Digər</option>
                </select>
                <input 
                  placeholder="Link başlığı"
                  className="bg-white border border-slate-200 p-3 rounded-2xl text-sm font-semibold outline-none text-slate-900 placeholder:text-slate-400"
                  value={newLink.label}
                  onChange={(e) => setNewLink({...newLink, label: e.target.value})}
                />
              </div>
              <input 
                placeholder="URL daxil edin (https://...)"
                className="w-full bg-white border border-slate-200 p-3 rounded-2xl text-sm font-semibold outline-none text-slate-900 placeholder:text-slate-400"
                value={newLink.url}
                onChange={(e) => setNewLink({...newLink, url: e.target.value})}
              />
              <button 
                onClick={handleAddLink}
                className="w-full bg-indigo-600 text-white py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-colors"
              >
                Əlavə Et
              </button>
            </div>
          )}

          <div className="space-y-3">
            {student.links.map(link => (
              <div key={link.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group">
                <div className="flex items-center gap-4 truncate">
                  <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-sm">
                    {getPlatformIcon(link.platform)}
                  </div>
                  <div className="truncate">
                    <div className="font-bold text-slate-800 text-sm">{link.label}</div>
                    <div className="text-[10px] text-slate-400 font-medium truncate">{link.url}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => removeLink(link.id)}
                    className="p-2 text-slate-300 hover:text-red-500 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {student.links.length === 0 && !showForm && (
              <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-[2rem]">
                <p className="text-slate-400 font-medium text-sm italic">Hələ heç bir link yoxdur.</p>
                <p className="text-[10px] text-slate-300 font-bold uppercase mt-1">CV analizi zamanı avtomatik tapıla bilər.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Management: CV */}
        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <Settings2 className="w-6 h-6 text-indigo-600" />
            CV Yükləmə Mərkəzi
          </h3>

          <div className="relative group max-w-xl mx-auto w-full">
            <input 
              type="file" 
              accept=".pdf" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              onChange={handleFileUpload}
            />
            <div className={`
              border-2 border-dashed rounded-[2rem] p-10 flex flex-col items-center text-center transition-all
              ${cvFile ? 'border-indigo-400 bg-indigo-50/30' : 'border-slate-200 bg-slate-50 group-hover:border-indigo-300 group-hover:bg-slate-100/50'}
            `}>
              {isAnalyzing ? (
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
              ) : (
                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
                  {cvFile ? <CheckCircle2 className="w-8 h-8 text-indigo-500" /> : <UploadCloud className="w-8 h-8 text-slate-400" />}
                </div>
              )}
              <div className="font-black text-slate-700">
                {isAnalyzing ? 'AI Analiz Edir...' : (cvFile ? cvFile.name : 'Yeni CV yükləyin')}
              </div>
              <p className="text-xs text-slate-400 font-medium mt-1 text-slate-900">Nəticələr Dashboard-da görünəcək.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => triggerAnalysis('demo-cv.pdf', true)}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-2xl font-black text-xs uppercase tracking-widest transition-colors group"
            >
              <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Demo CV ilə Test Et (YOXLAMA)
            </button>
            {cvFile && (
              <button 
                onClick={() => setCvFile(null)}
                className="px-6 py-4 bg-red-50 text-red-500 hover:bg-red-100 rounded-2xl font-bold text-xs uppercase transition-colors"
              >
                Faylı Sil
              </button>
            )}
          </div>
        </section>
      </div>
      
      <div className="bg-indigo-600 p-8 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-indigo-200">
        <div className="space-y-1 text-center md:text-left">
          <h4 className="text-xl font-black">Nəticələri görmək istəyirsiniz?</h4>
          <p className="text-indigo-100 font-medium text-sm">Bütün AI analizləri və bacarıq matrisi Dashboard bölməsində cəmlənib.</p>
        </div>
        <button 
          onClick={() => onNavigate('Dashboard')}
          className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-900/20 hover:scale-105 transition-transform"
        >
          Dashboard-a Get
        </button>
      </div>
    </div>
  );
};

export default ProfileView;