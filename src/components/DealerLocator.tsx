import React, { useState } from 'react';
import { DEALERS, CATEGORIES } from '../data/rotomouldersData';
import { CategoryId } from '../types';
import { MapPin, Phone, Mail, Navigation, CheckCircle, Building2, Search, Filter } from 'lucide-react';
import { CustomSelect } from './CustomSelect';

interface DealerLocatorProps {
  onSelectBranchForQuote?: (cityName: string) => void;
}

export const DealerLocator: React.FC<DealerLocatorProps> = ({ onSelectBranchForQuote }) => {
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedCatFilter, setSelectedCatFilter] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDealers = DEALERS.filter((dealer) => {
    if (selectedCity !== 'all' && dealer.city !== selectedCity) return false;
    if (selectedCatFilter !== 'all' && !dealer.stockCategories.includes(selectedCatFilter)) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = dealer.name.toLowerCase().includes(q);
      const matchCity = dealer.city.toLowerCase().includes(q);
      const matchAddr = dealer.address.toLowerCase().includes(q);
      if (!matchName && !matchCity && !matchAddr) return false;
    }
    return true;
  });

  return (
    <div className="py-12 bg-slate-950 text-slate-100 min-h-screen relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-400/10 border border-amber-400/30 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <MapPin className="w-4 h-4 text-red-500" />
            <span>Factory Outlets & Authorized Depots</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
            Roto Moulders Branch Network
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-normal leading-relaxed">
            Find nearest factory outlets, regional distribution depots, and stockists across Kenya, Uganda, and Tanzania.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-slate-900/90 backdrop-blur-xl p-5 rounded-2xl border border-slate-800/80 shadow-2xl shadow-slate-950/80 flex flex-wrap items-center justify-between gap-4">
          
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search branch name, town, or road..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-white focus:outline-hidden focus:border-red-500 placeholder-slate-500 transition-all shadow-inner"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            {/* City custom select */}
            <div className="w-52">
              <CustomSelect
                value={selectedCity}
                onChange={(val) => setSelectedCity(val)}
                dark={true}
                icon={<MapPin className="w-3.5 h-3.5 text-red-500" />}
                options={[
                  { value: 'all', label: 'All Cities & Regions' },
                  { value: 'Nairobi', label: 'Nairobi HQ' },
                  { value: 'Mombasa', label: 'Mombasa Coast' },
                  { value: 'Kisumu', label: 'Kisumu Lake Hub' },
                  { value: 'Nakuru', label: 'Nakuru' },
                  { value: 'Eldoret', label: 'Eldoret' },
                  { value: 'Arusha', label: 'Arusha (Tanzania)' },
                ]}
              />
            </div>

            {/* Category custom filter */}
            <div className="w-56">
              <CustomSelect
                value={selectedCatFilter}
                onChange={(val) => setSelectedCatFilter(val as any)}
                dark={true}
                icon={<Filter className="w-3.5 h-3.5 text-amber-400" />}
                options={[
                  { value: 'all', label: 'All Stock Categories' },
                  ...CATEGORIES.map((c) => ({ value: c.id, label: c.name })),
                ]}
              />
            </div>
          </div>

        </div>

        {/* Dealer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDealers.map((dealer) => (
            <div
              key={dealer.id}
              className={`bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border shadow-xl flex flex-col justify-between space-y-4 relative hover:-translate-y-0.5 transition-all duration-200 ${
                dealer.isHeadquarters ? 'border-red-600/80 ring-2 ring-red-600/20 shadow-red-950/30' : 'border-slate-800/80 hover:border-slate-700/80'
              }`}
            >
              {dealer.isHeadquarters && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-rose-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
                  Main Factory HQ
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-slate-950 border border-slate-800/80 text-amber-400 rounded-xl flex items-center justify-center shrink-0 font-bold shadow-inner">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">{dealer.region}</span>
                    <h3 className="text-sm font-bold text-white uppercase tracking-tight">{dealer.name}</h3>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-300 pt-3 border-t border-slate-800/80 font-normal">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{dealer.address}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <a href={`tel:${dealer.phone.split('/')[0].trim()}`} className="font-bold text-white hover:text-red-400 transition-colors">
                      {dealer.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                    <span className="text-slate-400">{dealer.email}</span>
                  </div>
                </div>

                {/* Stock Chips */}
                <div className="pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">In-Stock Categories:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {dealer.stockCategories.map((catId) => {
                      const catName = CATEGORIES.find(c => c.id === catId)?.name || catId;
                      return (
                        <span key={catId} className="text-[10px] bg-slate-950 text-slate-300 font-medium px-2.5 py-1 rounded-md border border-slate-800">
                          {catName}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              <a
                href={`tel:${dealer.phone.split('/')[0].trim()}`}
                className="w-full py-2.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/35 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <Phone className="w-3.5 h-3.5 text-amber-300" />
                <span>Call Branch Hotline</span>
              </a>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

