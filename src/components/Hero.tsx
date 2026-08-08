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
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-950/40 border border-red-900/50 text-red-400 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 shrink-0" />
              <span className="truncate sm:whitespace-normal">East Africa's #1 Tank Manufacturer Since 1991</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight sm:leading-[1.15] tracking-tight">
              Because your family deserves water that's <span className="text-red-500">safe, cool, and pure.</span>
            </h1>

            <p className="text-slate-400 text-sm sm:text-base md:text-lg font-normal max-w-xl leading-relaxed">
              Molded from 100% virgin food-grade polyethylene with UV20 tropicalized protection. Engineered for endurance with a <span className="font-semibold text-slate-200">10–15 Year Replacement Guarantee</span>.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 sm:pt-4">
              <button
                onClick={onExploreCatalog}
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>Explore Factory Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAdvisor}
                className="px-6 sm:px-7 py-3.5 sm:py-4 bg-slate-800/80 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>AI Capacity Calculator</span>
              </button>
            </div>

            <div 
              className="p-4 sm:p-6 bg-slate-900/50 rounded-xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-bold text-white">30+ Years</span>
                </div>
                <div className="text-xs text-slate-500">Industry Leader</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-bold text-white">1 Million+</span>
                </div>
                <div className="text-xs text-slate-500">Tanks Installed</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-bold text-white">ISO 9001</span>
                </div>
                <div className="text-xs text-slate-500">KEBS Certified</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-bold text-white">10–15 Year</span>
                </div>
                <div className="text-xs text-slate-500">Full Guarantee</div>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Roto Tank Card */}
          <div 
            className="lg:col-span-5 relative"
          >
            <div className="bg-slate-900/40 p-5 sm:p-7 rounded-2xl border border-slate-800 relative group transition-all">
              {/* Product Visual Container */}
              <div className="h-48 sm:h-64 bg-slate-950/50 rounded-xl flex items-center justify-center p-4 sm:p-5 mb-4 sm:mb-6 border border-slate-800 transition-colors relative">
                <img
                  src="/src/assets/images/roto_tank_hero_1785146455759.jpg"
                  alt="Roto Vertical Water Tank"
                  className="max-h-full max-w-full object-contain rounded-lg drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <span className="text-[10px] sm:text-xs font-bold text-red-500 uppercase tracking-wider block">Roto Vertical Cylindrical Series</span>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">Genuine Water Storage Tanks (100L – 24,000L)</h3>
                <p className="text-sm text-slate-400 font-normal leading-relaxed">
                  Dual-layer UV protection prevents algae growth and maintains water cool in tropical heat.
                </p>
              </div>

              {/* Specs & Highlights */}
              <div className="mt-4 sm:mt-6 pt-3.5 sm:pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-medium">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                  ISO 9001:2015 Quality
                </span>
                <span className="text-slate-300">
                  100% Virgin Polyethylene
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="mt-10 sm:mt-16 bg-slate-900/30 border-t border-b border-slate-800/60 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4 sm:mb-5">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Explore Product Categories</h2>
          </div>
          <div className="flex overflow-x-auto sm:grid sm:grid-cols-4 md:grid-cols-7 gap-2.5 sm:gap-3.5 text-center scrollbar-none pb-2 sm:pb-0">
            {[
              { label: 'Water Storage', icon: Droplets },
              { label: 'Material Handling', icon: Box },
              { label: 'Road Safety', icon: ShieldCheck },
              { label: 'Farming & Feeders', icon: Factory },
              { label: 'Waste & Sanitation', icon: Layers },
              { label: 'Custom Moulding', icon: Award },
              { label: 'Domain Setup', icon: HelpCircle, action: onOpenDomainHub },
            ].map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  onClick={cat.action || onExploreCatalog}
                  className="shrink-0 w-32 sm:w-auto bg-slate-900/40 hover:bg-slate-800 p-3 sm:p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-all duration-200 cursor-pointer group flex flex-col items-center justify-center gap-2"
                >
                  <div className="p-2.5 bg-slate-950/50 group-hover:bg-slate-900 rounded-lg text-slate-400 group-hover:text-red-400 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-slate-300 group-hover:text-white whitespace-nowrap sm:whitespace-normal sm:line-clamp-1">{cat.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};


