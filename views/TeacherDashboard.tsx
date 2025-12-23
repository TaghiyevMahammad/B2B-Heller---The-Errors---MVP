import React, { useState } from 'react';
import { MOCK_TEACHER_QUEUE } from '../constants';
import { 
  ClipboardCheck, 
  Send, 
  Loader2, 
  User, 
  ChevronRight, 
  CheckCircle2, 
  ThumbsUp,
  GraduationCap
} from 'lucide-react';

const TeacherDashboard: React.FC = () => {
  const [queue, setQueue] = useState([...MOCK_TEACHER_QUEUE]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [comment, setComment] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const currentStudent = queue[currentIndex];

  const handleConfirmAndSend = async () => {
    if (!comment.trim()) {
      alert("Zəhmət olmasa tələbə haqqında rəy daxil edin.");
      return;
    }

    setIsSending(true);
    
    // Simulate API call and final notification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSending(false);
    setShowToast(true);
    
    // Auto-advance logic
    setTimeout(() => {
      setShowToast(false);
      setComment('');
      if (currentIndex < queue.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        // Queue empty
        setQueue([]);
      }
    }, 2000);
  };

  if (queue.length === 0 || !currentStudent) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center space-y-6 animate-in fade-in zoom-in duration-700">
        <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-xl">
          <CheckCircle2 className="w-12 h-12 text-emerald-500" />
        </div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Bütün müraciətlər cavablandırıldı!</h2>
        <p className="text-slate-400 font-medium max-w-sm mx-auto">
          Hazırda referans gözləyən yeni tələbə yoxdur. Arxiv bölməsindən əvvəlki qeydlərinizə baxa bilərsiniz.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 relative">
      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-500">
          <ThumbsUp className="w-6 h-6" />
          <span className="font-black text-sm uppercase tracking-widest">Referans uğurla göndərildi!</span>
        </div>
      )}

      <div className="bg-white p-6 lg:p-12 rounded-[2.5rem] shadow-sm border border-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3">
              <ClipboardCheck className="w-10 h-10 text-indigo-600" />
              Tələbə Siyahısı
            </h2>
            <p className="text-slate-400 font-medium mt-2">Növbədə olan tələbə: {currentIndex + 1} / {queue.length}</p>
          </div>
          <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-widest border border-indigo-100">
            Gözləyən: {queue.length - currentIndex}
          </div>
        </div>

        {/* Current Student Card */}
        <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 mb-10 relative group transition-all hover:bg-white hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50/50">
          <div className="relative">
            <img src={currentStudent.avatar} className="w-20 h-20 lg:w-24 lg:h-24 rounded-[1.5rem] object-cover ring-4 ring-white shadow-md group-hover:scale-105 transition-transform" />
            <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-xl shadow-sm border border-slate-100">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
            </div>
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">Cari Tələbə</div>
            <div className="font-black text-slate-800 text-2xl tracking-tight">{currentStudent.name} {currentStudent.surname}</div>
            <div className="text-sm font-bold text-slate-500 uppercase tracking-tighter mt-1">{currentStudent.faculty} | {currentStudent.courseYear}-cü kurs</div>
          </div>
          <ChevronRight className="w-6 h-6 text-slate-300 lg:block hidden" />
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-black text-slate-700 uppercase tracking-widest ml-1">
              <User className="w-4 h-4" />
              Akademik Referans Mətni
            </label>
            <textarea 
              className="w-full h-48 lg:h-60 p-6 rounded-[2rem] border border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none text-slate-700 leading-relaxed font-medium resize-none bg-slate-50 focus:bg-white"
              placeholder={`Zəhmət olmasa ${currentStudent.name} haqqında akademik rəyinizi bura daxil edin...`}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          
          <button 
            onClick={handleConfirmAndSend}
            disabled={!comment.trim() || isSending}
            className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-100 uppercase tracking-widest text-sm disabled:opacity-50 group"
          >
            {isSending ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Təsdiqlə və Göndər
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;