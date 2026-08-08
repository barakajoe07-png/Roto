import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ShoppingBag, Globe, Calculator, MapPin, Search, PhoneCall, Sparkles, Wrench, Menu, Factory } from 'lucide-react';
import { RFQItem } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  rfqItems: RFQItem[];
  setIsRfqModalOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenSaccoModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  rfqItems,
  setIsRfqModalOpen,
  searchQuery,
  setSearchQuery,
}) => {
  const totalRfqCount = rfqItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl text-white border-b border-slate-800/70 shadow-2xl">
      {/* Official Factory Hotline Top Bar */}
      <div className="bg-slate-950/90 text-slate-300 text-[11px] px-4 py-1.5 font-semibold border-b border-slate-800/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-red-950/60 text-red-300 border border-red-800/60 font-extrabold px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider backdrop-blur-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              100% Genuine Roto Moulders
            </span>
            <span className="text-slate-300 hidden sm:inline text-[11px] font-medium">
              Official Factory Direct Sales & Countrywide Depot Delivery
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="tel:+254710492539" className="hover:text-amber-400 transition-colors flex items-center gap-1.5 font-extrabold text-amber-400">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>Sales Hotline: +254 710 492 539</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Glass Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo - Official ROTO TANKS Typography */}
          <div 
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            onClick={() => setActiveTab('catalog')}
          >
            <img 
              src="/src/assets/images/roto_logo_placeholder_1785153576543.jpg" 
              alt="Roto Tanks Logo" 
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl object-cover border border-red-600/60 shadow-lg group-hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col items-start leading-none">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tighter font-mono uppercase transition-transform group-hover:scale-105">
                ROTO
              </span>
              <span className="text-xs sm:text-sm font-black text-white tracking-widest uppercase bg-red-600 px-1.5 py-0.5 rounded-xs mt-0.5 shadow-xs">
                TANKS
              </span>
            </div>
            <div className="hidden sm:block border-l border-slate-800/80 pl-3">
              <span className="text-[10px] bg-slate-900 border border-slate-800 text-amber-400 font-extrabold px-2 py-0.5 rounded-xs block w-fit uppercase tracking-wider">
                ROTO MOULDERS LTD
              </span>
              <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">East Africa's Plastic Specialists</p>
            </div>
          </div>

          {/* Quick Search Input */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search water tanks (100L – 24,000L), septic, transport..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-12 py-2.5 bg-slate-900/60 backdrop-blur-md focus:bg-slate-900 text-white placeholder-slate-400 text-xs rounded-xl border border-slate-800 focus:border-red-500 focus:outline-hidden transition-all font-medium shadow-inner"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Nav Buttons & Quote Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveTab('ai-advisor')}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer backdrop-blur-md ${
                activeTab === 'ai-advisor'
                  ? 'bg-amber-400 text-slate-950 font-extrabold shadow-lg shadow-amber-400/20'
                  : 'bg-slate-900/60 text-amber-400 hover:bg-slate-900 border border-slate-800/80'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="hidden sm:inline">AI Tank Calculator</span>
              <span className="sm:hidden">AI Advisor</span>
            </button>

            <button
              onClick={() => setActiveTab('dealer-locator')}
              className={`hidden md:flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer backdrop-blur-md ${
                activeTab === 'dealer-locator'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'text-slate-300 hover:bg-slate-900/80 hover:text-white border border-slate-800/80'
              }`}
            >
              <MapPin className="w-4 h-4 text-red-500" />
              <span>Depots & Branches</span>
            </button>

            {/* Shopping Cart Icon Modal Launcher */}
            <button
              onClick={() => setIsRfqModalOpen(true)}
              className="relative flex items-center justify-center p-2.5 bg-slate-900/80 hover:bg-slate-900 text-white rounded-xl border border-slate-800/80 backdrop-blur-md transition-all cursor-pointer group shadow-md"
              title="View Sales Quotation Cart"
            >
              <ShoppingBag className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              <span
                  className={`absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-950 shadow-md ${
                    totalRfqCount > 0 ? 'bg-red-600 ring-2 ring-amber-400/50' : 'bg-slate-800'
                  }`}
                >
                  {totalRfqCount}
                </span>
            </button>
          </div>
        </div>

        {/* Navigation Bar Pills with Frosted Glass styling & Clean Icons */}
        <nav className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-2.5 border-t border-slate-800/70 text-xs font-bold scrollbar-none flex-nowrap scroll-smooth">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`shrink-0 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 backdrop-blur-md ${
              activeTab === 'catalog' ? 'bg-red-600 text-white font-extrabold shadow-lg shadow-red-600/30' : 'text-slate-300 hover:text-white hover:bg-slate-900/80 border border-slate-800/50'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            <span>Product Catalog</span>
          </button>
          <button
            onClick={() => setActiveTab('ai-advisor')}
            className={`shrink-0 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 backdrop-blur-md ${
              activeTab === 'ai-advisor' ? 'bg-red-600 text-white font-extrabold shadow-lg shadow-red-600/30' : 'text-slate-300 hover:text-white hover:bg-slate-900/80 border border-slate-800/50'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Calculator</span>
          </button>
          <button
            onClick={() => setActiveTab('custom-moulding')}
            className={`shrink-0 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 backdrop-blur-md ${
              activeTab === 'custom-moulding' ? 'bg-red-600 text-white font-extrabold shadow-lg shadow-red-600/30' : 'text-slate-300 hover:text-white hover:bg-slate-900/80 border border-slate-800/50'
            }`}
          >
            <Factory className="w-3.5 h-3.5 text-amber-400" />
            <span>Custom Moulding</span>
          </button>
          <button
            onClick={() => setActiveTab('dealer-locator')}
            className={`shrink-0 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 backdrop-blur-md ${
              activeTab === 'dealer-locator' ? 'bg-red-600 text-white font-extrabold shadow-lg shadow-red-600/30' : 'text-slate-300 hover:text-white hover:bg-slate-900/80 border border-slate-800/50'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Factory Depots</span>
          </button>
          <button
            onClick={() => setActiveTab('warranty')}
            className={`shrink-0 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 backdrop-blur-md ${
              activeTab === 'warranty' ? 'bg-red-600 text-white font-extrabold shadow-lg shadow-red-600/30' : 'text-slate-300 hover:text-white hover:bg-slate-900/80 border border-slate-800/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Warranty Lookup</span>
          </button>
          <button
            onClick={() => setActiveTab('domain-hub')}
            className={`shrink-0 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 backdrop-blur-md ${
              activeTab === 'domain-hub' ? 'bg-slate-800 text-white font-extrabold border border-slate-700 shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-900/80 border border-slate-800/50'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span>Domain & System</span>
          </button>
        </nav>
      </div>
    </header>
  );
};


