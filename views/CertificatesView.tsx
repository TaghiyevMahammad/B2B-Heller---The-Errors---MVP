import React, { useState } from 'react';
import { Student, Certificate } from '../types';
import { 
  Award, 
  Plus, 
  Trash2, 
  Calendar, 
  Fingerprint, 
  X, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Edit2,
  Upload,
  ExternalLink,
  Link as LinkIcon
} from 'lucide-react';

interface CertificatesViewProps {
  student: Student;
  onUpdate: (updates: Partial<Student>) => void;
}

const CertificatesView: React.FC<CertificatesViewProps> = ({ student, onUpdate }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [newCert, setNewCert] = useState({ 
    name: '', 
    verificationNumber: '', 
    url: '', 
    date: new Date().toISOString().split('T')[0], 
    image: '' 
  });
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImage(base64String);
        setNewCert(prev => ({ ...prev, image: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddOrUpdate = () => {
    if (!newCert.name || !newCert.verificationNumber || !newCert.url || (!newCert.image && !editingCertId)) {
      setError('Sertifikat adı, verifikasiya nömrəsi, URL və şəkil tələb olunur.');
      return;
    }

    if (editingCertId) {
      const updatedCerts = student.certificates.map(c => 
        c.id === editingCertId 
          ? { ...c, ...newCert, image: newCert.image || c.image } 
          : c
      );
      onUpdate({ certificates: updatedCerts });
    } else {
      const certificate: Certificate = {
        id: Math.random().toString(36).substr(2, 9),
        name: newCert.name,
        verificationNumber: newCert.verificationNumber,
        url: newCert.url,
        date: newCert.date,
        image: newCert.image
      };
      onUpdate({ certificates: [...student.certificates, certificate] });
    }

    resetForm();
  };

  const resetForm = () => {
    setNewCert({ 
      name: '', 
      verificationNumber: '', 
      url: '', 
      date: new Date().toISOString().split('T')[0], 
      image: '' 
    });
    setPreviewImage(null);
    setShowAddForm(false);
    setEditingCertId(null);
    setError(null);
  };

  const startEdit = (cert: Certificate) => {
    setNewCert({ 
      name: cert.name, 
      verificationNumber: cert.verificationNumber, 
      url: cert.url, 
      date: cert.date, 
      image: '' 
    });
    setPreviewImage(cert.image);
    setEditingCertId(cert.id);
    setShowAddForm(true);
  };

  const removeCert = (id: string) => {
    if (window.confirm('Bu sertifikatı silmək istədiyinizə əminsiniz?')) {
      onUpdate({ certificates: student.certificates.filter(c => c.id !== id) });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <Award className="w-10 h-10 text-indigo-600" />
            Sertifikatlarım
          </h1>
          <p className="text-slate-500 font-medium mt-2">Profilinizdə görünəcək rəsmi sertifikatlar siyahısı.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setShowAddForm(true); }}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
        >
          <Plus className="w-5 h-5" />
          Yeni Sertifikat
        </button>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-8 lg:p-10 space-y-6 relative border border-slate-100 max-h-[90vh] overflow-y-auto scrollbar-hide">
            <button 
              onClick={resetForm}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                {editingCertId ? 'Sertifikatı Yenilə' : 'Yeni Sertifikat Əlavə Et'}
              </h3>
              <p className="text-slate-400 font-medium text-sm">Zəhmət olmasa tələb olunan bütün məlumatları daxil edin.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Sertifikatın Adı *</label>
                  <input 
                    type="text"
                    placeholder="Məs: Google Data Analytics"
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-slate-900 font-bold outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all placeholder:text-slate-400"
                    value={newCert.name}
                    onChange={(e) => setNewCert({...newCert, name: e.target.value})}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Verifikasiya Nömrəsi *</label>
                  <input 
                    type="text"
                    placeholder="Məs: GDA-12345-X"
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-slate-900 font-bold outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all placeholder:text-slate-400"
                    value={newCert.verificationNumber}
                    onChange={(e) => setNewCert({...newCert, verificationNumber: e.target.value})}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Sertifikat URL *</label>
                  <input 
                    type="url"
                    placeholder="https://verify.example.com/..."
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-slate-900 font-bold outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all placeholder:text-slate-400"
                    value={newCert.url}
                    onChange={(e) => setNewCert({...newCert, url: e.target.value})}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Verilmə Tarixi</label>
                  <input 
                    type="date"
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-slate-900 font-bold outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
                    value={newCert.date}
                    onChange={(e) => setNewCert({...newCert, date: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Sertifikat Şəkli *</label>
                  <div className="relative group aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] overflow-hidden flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all">
                    {previewImage ? (
                      <>
                        <img src={previewImage} className="w-full h-full object-cover" alt="Preview" />
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Upload className="text-white w-10 h-10" />
                        </div>
                      </>
                    ) : (
                      <div className="p-8">
                        <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Klikləyərək Şəkil Yükləyin</span>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      onChange={handleFileChange}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold text-center mt-2">Şəkil yüklənməsi məcburidir.</p>
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100 animate-pulse">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <div className="pt-4 flex gap-3">
              <button 
                onClick={resetForm}
                className="flex-1 bg-slate-100 text-slate-600 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all"
              >
                Ləğv Et
              </button>
              <button 
                onClick={handleAddOrUpdate}
                className="flex-[2] bg-indigo-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
              >
                {editingCertId ? 'Dəyişiklikləri Saxla' : 'Sertifikatı Əlavə Et'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Thumbnails */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {student.certificates.map((cert) => (
          <div 
            key={cert.id} 
            className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-indigo-50/50 hover:-translate-y-1 transition-all duration-500 group flex flex-col h-full"
          >
            {/* Thumbnail Image */}
            <div className="aspect-square relative overflow-hidden bg-slate-100 border-b border-slate-100">
              <img src={cert.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={cert.name} />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                <div className="flex gap-2">
                  <button 
                    onClick={() => startEdit(cert)}
                    className="bg-white/20 backdrop-blur-md text-white p-2.5 rounded-xl hover:bg-indigo-600 transition-colors shadow-lg border border-white/20"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => removeCert(cert.id)}
                    className="bg-white/20 backdrop-blur-md text-white p-2.5 rounded-xl hover:bg-red-600 transition-colors shadow-lg border border-white/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <a 
                  href={cert.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-white/20 backdrop-blur-md text-white p-2.5 rounded-xl hover:bg-white hover:text-indigo-600 transition-all shadow-lg border border-white/20"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              
              <div className="absolute top-3 right-3">
                <div className="bg-white/90 backdrop-blur shadow-lg p-1 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
              </div>
            </div>
            
            <div className="p-5 space-y-3 flex-1 flex flex-col">
              <h3 className="font-black text-slate-800 text-sm leading-tight line-clamp-2 min-h-[2.5rem] group-hover:text-indigo-600 transition-colors">
                {cert.name}
              </h3>
              
              <div className="mt-auto space-y-2">
                <div className="flex items-center gap-2 text-slate-400">
                  <Fingerprint className="w-3 h-3 text-indigo-400" />
                  <span className="text-[9px] font-bold uppercase tracking-widest truncate">
                    {cert.verificationNumber}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar className="w-3 h-3 text-indigo-400" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">{cert.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {student.certificates.length === 0 && (
          <div className="col-span-full py-32 bg-white rounded-[3rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <Award className="w-10 h-10 text-slate-200" />
            </div>
            <h3 className="text-xl font-black text-slate-300 tracking-tight">Hələ heç bir sertifikat yoxdur</h3>
            <p className="text-slate-400 font-medium mt-2 max-w-xs mx-auto text-sm">
              Peşəkar inkişafınızı təsdiqləyən sənədləri bura əlavə edərək profilinizi gücləndirin.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificatesView;