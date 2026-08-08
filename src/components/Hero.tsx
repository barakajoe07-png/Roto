import React from 'react';
import { ShieldCheck, Award, Sparkles, ArrowRight, Factory, Layers, Droplets, Box, HelpCircle, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onExploreCatalog: () => void;
  onOpenAdvisor: () => void;
  onOpenDomainHub: () => void;
  onOpenSaccoModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCatalog,
  onOpenAdvisor,
  onOpenDomainHub,
}) => {
  return (
    <div className="relative overflow-hidden bg-slate-950 text-slate-100 py-8 sm:py-16 md:py-20 lg:py-24">
      {/* Animated Subtle Ambient Radial Glows & Background Lighting */}
      <div className="absolute top-10 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-red-600/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-amber-500/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />
      
      {/* Floating subtle background particles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* Hero Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Slogan, Pitch & Primary CTAs */}
          <div 
            className="lg:col-span-7 space-y-4 sm:space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-950/60 border border-red-800/60 text-red-300 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-md backdrop-blur-md">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
              <span className="truncate sm:whitespace-normal">East Africa's #1 Tank Manufacturer Since 1991</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase leading-snug sm:leading-[1.15] tracking-tight">
              BECAUSE YOUR FAMILY DESERVES WATER THAT'S <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-400 bg-clip-text text-transparent">SAFE, COOL, AND PURE.</span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-base md:text-lg font-normal max-w-xl leading-relaxed">
              Molded from 100% virgin food-grade polyethylene with UV20 tropicalized protection. Engineered for endurance with a <span className="font-extrabold text-amber-400">10–15 Year Replacement Guarantee</span>.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 sm:pt-2">
              <button
                onClick={onExploreCatalog}
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-xs sm:text-sm rounded-xl sm:rounded-2xl shadow-xl shadow-red-600/30 hover:shadow-2xl hover:shadow-red-600/40 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer uppercase tracking-wider border border-red-500/40"
              >
                <span>Explore Factory Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAdvisor}
                className="px-6 sm:px-7 py-3.5 sm:py-4 bg-slate-900/80 hover:bg-slate-900 text-amber-400 hover:text-amber-300 font-extrabold text-xs sm:text-sm rounded-xl sm:rounded-2xl shadow-lg border border-slate-800/90 hover:border-amber-500/50 backdrop-blur-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                <span>AI Capacity Calculator</span>
              </button>
            </div>

            {/* Trust Stats Glass Card */}
            <div 
              className="p-3.5 sm:p-5 bg-slate-900/50 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-slate-800/80 shadow-xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
            >
              <div className="flex items-center gap-2 sm:gap-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-[11px] sm:text-xs font-black text-white">30+ Years</div>
                  <div className="text-[9px] sm:text-[10px] text-slate-400">Industry Leader</div>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="text-[11px] sm:text-xs font-black text-white">1 Million+</div>
                  <div className="text-[9px] sm:text-[10px] text-slate-400">Tanks Installed</div>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 shrink-0" />
                <div>
                  <div className="text-[11px] sm:text-xs font-black text-white">ISO 9001</div>
                  <div className="text-[9px] sm:text-[10px] text-slate-400">KEBS Certified</div>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400 shrink-0" />
                <div>
                  <div className="text-[11px] sm:text-xs font-black text-white">10–15 Year</div>
                  <div className="text-[9px] sm:text-[10px] text-slate-400">Full Guarantee</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Roto Tank Card */}
          <div 
            className="lg:col-span-5 relative"
          >
            <div className="bg-slate-900/60 backdrop-blur-2xl p-5 sm:p-7 rounded-2xl sm:rounded-[28px] shadow-2xl shadow-slate-950/90 border border-slate-800/80 relative overflow-hidden group hover:border-slate-700 transition-all">
              {/* Floating Glass Badge */}
              <div className="absolute top-3.5 right-3.5 z-10 bg-red-950/80 backdrop-blur-md text-red-200 border border-red-500/40 text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                <span>BEST SELLER</span>
              </div>

              {/* Product Visual Container */}
              <div className="h-48 sm:h-64 bg-slate-950/70 rounded-xl sm:rounded-2xl flex items-center justify-center p-4 sm:p-5 mb-4 sm:mb-6 border border-slate-800/80 shadow-inner group-hover:border-red-900/30 transition-colors relative">
                <img
                  src="/src/assets/images/roto_tank_hero_1785146455759.jpg"
                  alt="Roto Vertical Water Tank"
                  className="max-h-full max-w-full object-contain rounded-lg drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <span className="text-[10px] sm:text-xs font-extrabold text-amber-400 uppercase tracking-wider block">Roto Vertical Cylindrical Series</span>
                <h3 className="text-base sm:text-xl font-black text-white uppercase tracking-tight">Genuine Water Storage Tanks (100L – 24,000L)</h3>
                <p className="text-xs text-slate-400 font-normal leading-relaxed">
                  Dual-layer UV protection prevents algae growth and maintains water cool in tropical heat.
                </p>
              </div>

              {/* Specs & Highlights */}
              <div className="mt-4 sm:mt-6 pt-3.5 sm:pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300 font-semibold">
                <span className="flex items-center gap-1.5 text-slate-400 text-[11px] sm:text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  ISO 9001:2015 Quality
                </span>
                <span className="text-amber-400 font-extrabold bg-amber-950/50 border border-amber-800/60 px-2.5 py-1 sm:px-3 rounded-xl backdrop-blur-sm text-[10px] sm:text-xs">
                  100% Virgin Polyethylene
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="mt-10 sm:mt-16 bg-slate-900/40 backdrop-blur-xl border-t border-b border-slate-800/80 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4 sm:mb-5">
            <h2 className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-widest">Explore Product Categories</h2>
          </div>
          <div className="flex overflow-x-auto sm:grid sm:grid-cols-4 md:grid-cols-7 gap-2.5 sm:gap-3.5 text-center scrollbar-none pb-2 sm:pb-0">
            {[
              { label: 'Water Storage', icon: Droplets, color: 'text-sky-400' },
              { label: 'Material Handling', icon: Box, color: 'text-amber-400' },
              { label: 'Road Safety', icon: ShieldCheck, color: 'text-red-400' },
              { label: 'Farming & Feeders', icon: Factory, color: 'text-emerald-400' },
              { label: 'Waste & Sanitation', icon: Layers, color: 'text-slate-300' },
              { label: 'Custom Moulding', icon: Award, color: 'text-amber-400' },
              { label: 'Domain Setup', icon: HelpCircle, color: 'text-slate-400', action: onOpenDomainHub },
            ].map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  onClick={cat.action || onExploreCatalog}
                  className="shrink-0 w-32 sm:w-auto bg-slate-900/50 hover:bg-slate-900/90 backdrop-blur-md p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-800/80 hover:border-slate-700 shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer group flex flex-col items-center justify-center gap-2"
                >
                  <div className="p-2.5 sm:p-3 bg-slate-950/80 group-hover:bg-slate-950 rounded-lg sm:rounded-xl border border-slate-800 shadow-xs">
                    <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${cat.color}`} />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-200 group-hover:text-white whitespace-nowrap sm:whitespace-normal sm:line-clamp-1">{cat.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};


