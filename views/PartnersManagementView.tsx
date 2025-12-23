import React, { useState, useMemo } from 'react';
import { Partner } from '../types';
import { MOCK_PARTNERS } from '../constants';
import { 
  Building2, 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  Mail, 
  X, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  Globe,
  Briefcase
} from 'lucide-react';

const PartnersManagementView: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>(MOCK_PARTNERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [partnerToDelete, setPartnerToDelete] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    website: '',
    contactEmail: '',
    description: '',
    status: 'Active' as 'Active' | 'Inactive',
    logo: ''
  });

  const industries = useMemo(() => {
    const list = new Set(partners.map(p => p.industry));
    return ['All', ...Array.from(list)];
  }, [partners]);

  const filteredPartners = partners.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = industryFilter === 'All' || p.industry === industryFilter;
    return matchesSearch && matchesFilter;
  });

  const handleOpenAddModal = () => {
    setEditingPartner(null);
    setFormData({
      name: '',
      industry: '',
      website: '',
      contactEmail: '',
      description: '',
      status: 'Active',
      logo: `https://picsum.photos/seed/${Math.random()}/100`
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (partner: Partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      industry: partner.industry,
      website: partner.website,
      contactEmail: partner.contactEmail,
      description: partner.description,
      status: partner.status,
      logo: partner.logo
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.industry || !formData.contactEmail) {
      alert("Zəhmət olmasa tələb olunan sahələri doldurun.");
      return;
    }

    if (editingPartner) {
      setPartners(partners.map(p => p.id === editingPartner.id ? { ...p, ...formData } : p));
    } else {
      const newPartner: Partner = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData
      };
      setPartners([newPartner, ...partners]);
    }
    setIsModalOpen(false);
  };

  const confirmDelete = (id: string) => {
    setPartnerToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (partnerToDelete) {
      setPartners(partners.filter(p => p.id !== partnerToDelete));
      setIsDeleteModalOpen(false);
      setPartnerToDelete(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <Building2 className="w-10 h-10 text-indigo-600" />
            Tərəfdaş Şirkətlər
          </h1>
          <p className="text-slate-500 font-medium">UBEX platformasına qoşulan korporativ tərəfdaşların idarə edilməsi.</p>
        </div>
        <button 
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
        >
          <Plus className="w-5 h-5" />
          Yeni Tərəfdaş
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Şirkət adı və ya sahə üzrə axtar..." 
            className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-semibold"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select 
              className="w-full pl-11 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none font-bold text-sm appearance-none cursor-pointer"
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
            >
              {industries.map(ind => <option key={ind} value={ind}>{ind === 'All' ? 'Bütün Sahələr' : ind}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Partners List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPartners.map(partner => (
          <div key={partner.id} className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-indigo-50/50 transition-all group flex flex-col">
            <div className="p-8 space-y-6 flex-1">
              <div className="flex items-start justify-between">
                <div className="relative">
                   <img src={partner.logo} className="w-16 h-16 rounded-2xl object-cover ring-4 ring-slate-50" alt={partner.name} />
                   <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-white ${partner.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleOpenEditModal(partner)} className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => confirmDelete(partner.id)} className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">{partner.name}</h3>
                <div className="flex items-center gap-1.5 text-xs font-black text-indigo-500 uppercase tracking-widest mt-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  {partner.industry}
                </div>
              </div>

              <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 italic font-medium">"{partner.description}"</p>

              <div className="space-y-3 pt-4 border-t border-slate-50">
                <a href={partner.website} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-indigo-600 transition-colors">
                  <Globe className="w-4 h-4" />
                  <span className="text-xs font-bold truncate">{partner.website.replace('https://', '')}</span>
                </a>
                <a href={`mailto:${partner.contactEmail}`} className="flex items-center gap-3 text-slate-400 hover:text-indigo-600 transition-colors">
                  <Mail className="w-4 h-4" />
                  <span className="text-xs font-bold truncate">{partner.contactEmail}</span>
                </a>
              </div>
            </div>
            
            <div className="bg-slate-50 p-6 flex justify-between items-center group-hover:bg-indigo-50 transition-colors">
               <span className={`text-[10px] font-black uppercase tracking-widest ${partner.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'}`}>
                 {partner.status === 'Active' ? 'Aktiv Tərəfdaş' : 'Deaktiv edilib'}
               </span>
               <button className="text-indigo-600 font-black text-[10px] uppercase tracking-widest flex items-center gap-1 hover:underline">
                 Vakansiyalara Bax
                 <ExternalLink className="w-3 h-3" />
               </button>
            </div>
          </div>
        ))}

        {filteredPartners.length === 0 && (
          <div className="col-span-full py-32 bg-white rounded-[4rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <Building2 className="w-12 h-12 text-slate-200" />
            </div>
            <h3 className="text-2xl font-black text-slate-300">Heç bir tərəfdaş tapılmadı</h3>
            <p className="text-slate-400 font-medium mt-2 max-w-xs mx-auto">Axtarış şərtlərini dəyişərək yenidən yoxlayın və ya yeni tərəfdaş əlavə edin.</p>
          </div>
        )}
      </div>

      {/* Edit/Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl p-10 space-y-8 relative border border-slate-100 max-h-[90vh] overflow-y-auto scrollbar-hide">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-2 text-slate-400 hover:text-slate-600 transition-colors"><X className="w-6 h-6" /></button>
            
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-slate-800 tracking-tight">{editingPartner ? 'Məlumatları Redaktə Et' : 'Yeni Tərəfdaş Əlavə Et'}</h3>
              <p className="text-slate-400 font-medium">Bütün tələb olunan sahələri doldurduğunuzdan əmin olun.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Şirkət Adı *</label>
                <input 
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl font-bold outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Fəaliyyət Sahəsi *</label>
                <input 
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl font-bold outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
                  value={formData.industry}
                  onChange={e => setFormData({...formData, industry: e.target.value})}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Vebsayt</label>
                <input 
                  placeholder="https://..."
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl font-bold outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
                  value={formData.website}
                  onChange={e => setFormData({...formData, website: e.target.value})}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Əlaqə Emaili *</label>
                <input 
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl font-bold outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
                  value={formData.contactEmail}
                  onChange={e => setFormData({...formData, contactEmail: e.target.value})}
                />
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Şirkət haqqında qısa məlumat</label>
                <textarea 
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl font-bold outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all h-32 resize-none"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Status</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl font-bold outline-none focus:border-indigo-500 transition-all"
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value as any})}
                >
                  <option value="Active">Aktiv</option>
                  <option value="Inactive">Deaktiv</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-200 transition-all">Ləğv et</button>
              <button onClick={handleSave} className="flex-[2] py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">Dəyişiklikləri Saxla</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl p-10 text-center space-y-6">
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-10 h-10 text-rose-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-800">Tərəfdaşı Silmək?</h3>
              <p className="text-slate-400 font-medium">Bu hərəkət geri qaytarıla bilməz. Bütün vakansiyalar və əlaqələr silinəcək.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-widest">Xeyr, Saxla</button>
              <button onClick={handleDelete} className="flex-1 py-4 bg-rose-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-700 shadow-xl shadow-rose-100">Bəli, Silinsin</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnersManagementView;