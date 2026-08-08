import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, ShieldCheck, Globe, Wrench, HeartHandshake, ChevronDown, ChevronUp, Star, ChevronLeft, ChevronRight, CheckCircle2, Factory, MapPin, PackageCheck } from 'lucide-react';

export const HomeInfoSections: React.FC<{ onExploreCatalog: () => void }> = ({ onExploreCatalog }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const faqs = [
    {
      q: 'Which brand is better for a water tank in East Africa?',
      a: 'Roto Tanks is widely recognized as East Africa’s pioneer and market leader in rotational moulding since 1991. Manufactured using 100% virgin food-grade polyethylene with double layer UV20 protection, Roto Tanks are tested to withstand extreme tropical weather conditions and come with a 10 to 15-year replacement guarantee.'
    },
    {
      q: 'How big of a water tank do you need for a house?',
      a: 'For an average family of 4 to 6 people, a 2,500L to 5,000L water tank is recommended to supply daily needs (cooking, bathing, washing) during 3 to 5 days of municipal water rationing.'
    },
    {
      q: 'How much does a 1,000 litre water tank cost in Kenya?',
      a: 'A genuine Roto Tank 1,000 Litres vertical cylindrical tank costs KShs 11,500.00 (VAT inclusive) with official factory warranty.'
    },
    {
      q: 'How much does a 3,000 litre water tank cost in Kenya?',
      a: 'A 3,000 Litres vertical Roto Tank costs KShs 37,980.00.'
    },
    {
      q: 'How much does a 5,000 litre water tank cost in Kenya?',
      a: 'A 5,000 Litres heavy duty vertical Roto Tank costs KShs 42,500.00.'
    },
    {
      q: 'How much does a 10,000 litre water tank cost in Kenya?',
      a: 'A 10,000 Litres mega storage Roto Tank costs KShs 141,300.00.'
    },
    {
      q: 'How much does a 20,000 litre water tank cost in Kenya?',
      a: 'A 20,000L to 24,000L industrial Roto Tank ranges from KShs 450,000.00 to KShs 501,830.00 depending on wall thickness specification.'
    },
    {
      q: 'What should I check before buying a plastic water tank?',
      a: 'Check for 100% food-grade resin certification (FDA approved), UV protection rating (UV20), wall thickness, anti-algae inner lining, KEBS ISO certification, and an official manufacturer serial warranty.'
    },
    {
      q: 'How long does a water tank last, and when should I replace it?',
      a: 'A genuine Roto Tank is engineered for a lifespan of 30+ years when properly installed on a level concrete base.'
    }
  ];

  const testimonials = [
    {
      name: 'Mark Harrison',
      location: 'Syokimau, Nairobi',
      purchased: '5,000L Vertical Water Tank',
      time: 'Verified Roto Owner',
      rating: 5,
      text: 'Top quality tanks coupled by efficient delivery across Nairobi. Bought a 5,000L vertical tank for my home in Syokimau and the water stays cool and fresh without any plastic taste even under hot afternoon sun.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Grace Wambui',
      location: 'Nakuru, Kenya',
      purchased: '10,000L Farm Tank & Cattle Troughs',
      time: 'Verified Roto Owner',
      rating: 5,
      text: 'Rotomoulders provided exceptional support for our dairy farm in Nakuru. The cattle troughs and 10,000L water storage tanks have withstood 5 years of intense sun without fading or cracking.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
    },
    {
      name: 'Eng. David Ochieng',
      location: 'Kisumu, Kenya',
      purchased: 'Roto Septic & Underground Vaults',
      time: 'Verified Roto Owner',
      rating: 5,
      text: 'We specified Roto Septic & Underground tanks for our residential estate project in Kisumu. Passed structural inspection easily and saved 40% compared to traditional masonry septic pits.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    }
  ];

  return (
    <div className="bg-slate-950 text-slate-100 py-16 md:py-24 space-y-24 relative overflow-hidden">
      {/* Background Glows & Lighting */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 relative">

        {/* 1. Factory & Corporate Showcase Banner */}
        <div className="relative rounded-[32px] overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
          <img
            src="/src/assets/images/roto_factory_moulding_1785146469124.jpg"
            alt="Roto Moulders Industrial Facility"
            className="w-full h-[420px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1.5 bg-red-950/80 border border-red-800/80 text-red-300 font-extrabold text-xs rounded-full uppercase tracking-wider backdrop-blur-md">
                East Africa's Largest Rotomoulder
              </span>
              <span className="px-3.5 py-1.5 bg-amber-950/80 border border-amber-800/80 text-amber-300 font-extrabold text-xs rounded-full uppercase tracking-wider backdrop-blur-md">
                Manufacturing Since 1991
              </span>
            </div>

            <div className="max-w-3xl space-y-3">
              <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                ROTO MOULDERS LIMITED
              </h2>
              <p className="text-slate-300 text-sm sm:text-base font-normal leading-relaxed">
                Pioneering rotational moulding in East Africa for over 30 years. From our state-of-the-art ISO 9001:2015 certified factory in Nairobi, we produce over 1 million water storage solutions distributed across Kenya, Uganda, Tanzania, and Rwanda.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreCatalog}
                className="px-7 py-3.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-xl shadow-red-600/30 transition-all cursor-pointer uppercase tracking-wider flex items-center gap-2 border border-red-500/40"
              >
                <span>Explore Factory Products</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 2. WHY CHOOSE US Section */}
        <div className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block font-mono">Unmatched Quality & Commitment</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              WHY CHOOSE ROTO TANKS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                title: '30+ YEARS OF EXPERTISE',
                desc: 'Pioneered plastic rotomoulding in East Africa since 1991.',
                icon: Award,
                highlight: false
              },
              {
                title: 'CERTIFIED QUALITY',
                desc: '100% FDA food-grade virgin resin with KEBS ISO certification.',
                icon: ShieldCheck,
                highlight: false
              },
              {
                title: 'TRUSTED ACROSS AFRICA',
                desc: 'Over 1 million installations in Kenya, Uganda, Tanzania & Rwanda.',
                icon: Globe,
                highlight: false
              },
              {
                title: 'WIDE RANGE OF SOLUTIONS',
                desc: 'Tanks from 100L up to 24,000L, septic vaults, and farm troughs.',
                icon: Wrench,
                highlight: false
              },
              {
                title: 'SUSTAINABLE GROWTH',
                desc: 'Access to clean water drives health, agriculture, and economic development.',
                icon: HeartHandshake,
                highlight: true
              }
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  className={`p-7 rounded-[22px] border transition-all duration-300 flex flex-col justify-between ${
                    card.highlight
                      ? 'bg-gradient-to-br from-red-600 via-rose-600 to-red-700 text-white border-red-500 shadow-2xl shadow-red-600/40'
                      : 'bg-slate-900/60 backdrop-blur-2xl text-slate-200 border-slate-800/80 hover:border-slate-700 shadow-xl'
                  }`}
                >
                  <div className="space-y-5">
                    <div className={`p-3.5 w-fit rounded-2xl flex items-center justify-center ${
                      card.highlight ? 'bg-white/20 text-white' : 'bg-slate-950 text-red-500 border border-slate-800 shadow-inner'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className={`text-xs font-black uppercase tracking-wider ${card.highlight ? 'text-white' : 'text-white'}`}>
                      {card.title}
                    </h3>
                    <p className={`text-xs leading-relaxed ${card.highlight ? 'text-slate-100 font-medium' : 'text-slate-400'}`}>
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 3. FREQUENTLY ASKED QUESTIONS Section */}
        <div className="bg-slate-900/60 backdrop-blur-2xl rounded-[32px] p-8 sm:p-12 border border-slate-800/80 shadow-2xl space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block font-mono">Answers To Common Inquiries</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-950/80 rounded-2xl border border-slate-800/80 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    id={`faq-btn-${idx}`}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/60 transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-wide">
                      {faq.q}
                    </span>
                    <div className="p-1.5 bg-slate-900 rounded-xl border border-slate-800 text-amber-400 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div id={`faq-answer-${idx}`} role="region" aria-labelledby={`faq-btn-${idx}`} className="px-6 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-900 font-normal">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. CLIENT TESTIMONIALS WITH VERIFIED PURCHASES */}
        <div className="bg-slate-900/60 backdrop-blur-2xl rounded-[32px] p-8 sm:p-12 border border-slate-800/80 shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black text-amber-400 uppercase tracking-widest block font-mono">Verified Roto Customer Feedback</span>
              <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                WHAT OUR CLIENTS ARE SAYING
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTestimonial(prev => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="p-3 bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 rounded-2xl cursor-pointer shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveTestimonial(prev => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="p-3 bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 rounded-2xl cursor-pointer shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-8 sm:p-10 rounded-[24px] border border-slate-800/80 space-y-6 relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 text-amber-400">
                {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-extrabold text-white ml-2">5.0 / 5.0</span>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 font-extrabold text-[11px] rounded-full uppercase tracking-wider">
                <PackageCheck className="w-3.5 h-3.5 text-emerald-400" />
                {testimonials[activeTestimonial].time}
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-200 italic leading-relaxed">
              "{testimonials[activeTestimonial].text}"
            </p>

            <div className="pt-4 border-t border-slate-900 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={testimonials[activeTestimonial].avatar}
                  alt={testimonials[activeTestimonial].name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-red-600 shadow-md"
                />
                <div>
                  <p className="text-xs font-black text-white uppercase tracking-wider">{testimonials[activeTestimonial].name}</p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 font-medium mt-0.5">
                    <MapPin className="w-3 h-3 text-red-500" />
                    {testimonials[activeTestimonial].location}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Purchased Product</span>
                <span className="text-xs font-extrabold text-amber-400">{testimonials[activeTestimonial].purchased}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
