import React, { useState } from 'react';
import { 
  ShieldCheck, Phone, Mail, MapPin, Award, CheckCircle2, Send, 
  Globe, Lock, Check
} from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
  onOpenSaccoModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3500);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-200 border-t border-slate-800/80 pt-0 pb-10 font-sans">
      
      {/* Quality Assurance Bar - Glassmorphic Ribbon */}
      <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-950 text-white py-3.5 shadow-md border-b border-red-700/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center text-[11px] sm:text-xs font-black uppercase tracking-wider">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>10–15 Year Full Guarantee</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>100% Virgin Food-Grade Poly</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>KEBS ISO 9001:2015 Certified</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Globe className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Countrywide Depot Network</span>
            </div>
          </div>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="w-full h-56 sm:h-64 bg-slate-900 border-b border-slate-800/80 relative overflow-hidden group">
        <iframe
          title="Roto Moulders Limited Head Office Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.784263721389!2d36.851411!3d-1.309222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwMTgnMzMuMiJTIDM2wrA1MScwNS4xIkU!5e0!3m2!1sen!2ske!4v1650000000000!5m2!1sen!2ske"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(0.85) contrast(1.2) invert(0.92)' }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-md px-4 py-3 rounded-xl border border-slate-800 text-xs text-white shadow-2xl max-w-xs">
          <p className="font-black uppercase text-amber-400 tracking-wider text-xs">ROTO MOULDERS LIMITED</p>
          <p className="text-[11px] text-slate-300 mt-0.5">Enterprise Road, Industrial Area, Nairobi, Kenya</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pt-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10">
          
          {/* Column 1: Brand & Genuine Payment Gateways */}
          <div className="lg:col-span-4 space-y-5">
            <div 
              className="flex items-center gap-3 cursor-pointer group w-fit"
              onClick={() => onNavigateTab('catalog')}
            >
              <img 
                src="https://placehold.co/150x150/dc2626/ffffff?text=ROTO+LOGO" 
                alt="Roto Tanks Logo Placeholder" 
                className="w-10 h-10 rounded-xl object-cover border border-red-600/60 shadow-md group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-black text-white tracking-tighter uppercase font-mono group-hover:text-amber-400 transition-colors">
                  ROTO
                </span>
                <span className="text-xs font-black text-white tracking-widest uppercase bg-red-600 px-2.5 py-1 rounded-md shadow-sm">
                  TANKS
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Roto Moulders Limited is committed to providing genuine quality and long-lasting water storage solutions. Engineered in Nairobi for endurance across East Africa with 100% food-grade material.
            </p>

            {/* Authentic Payment Options Section */}
            <div className="pt-2 space-y-2.5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                  <span>ACCEPTED PAYMENT OPTIONS</span>
                </p>
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                  <Lock className="w-2.5 h-2.5" />
                  <span>256-Bit Encrypted</span>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* M-PESA Authentic Badge */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/40 rounded-xl shadow-sm hover:border-emerald-400 transition-all group">
                  <div className="w-5 h-5 rounded-full bg-[#00A859] flex items-center justify-center font-black text-[9px] text-white shadow-xs shrink-0">
                    M
                  </div>
                  <div className="leading-none">
                    <span className="text-[11px] font-black text-white tracking-tight group-hover:text-emerald-400 transition-colors">Lipa Na M-PESA</span>
                    <span className="block text-[8px] font-bold text-emerald-400/90 uppercase tracking-wider">Paybill / Till</span>
                  </div>
                </div>

                {/* VISA Authentic Badge */}
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-xl shadow-sm hover:border-sky-500/50 transition-all">
                  <svg className="w-7 h-4 text-white shrink-0" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="36" height="24" rx="4" fill="#0A2540"/>
                    <path d="M14.2 16.5L16.3 7.5H18.9L16.8 16.5H14.2ZM24.8 7.7C24.3 7.5 23.6 7.3 22.7 7.3C20.1 7.3 18.2 8.7 18.2 10.7C18.2 12.2 19.5 13 20.5 13.5C21.6 14 22 14.3 22 14.8C22 15.5 21.1 15.8 20.3 15.8C19.3 15.8 18.7 15.5 18.2 15.3L17.7 17.6C18.3 17.9 19.4 18.1 20.5 18.1C23.3 18.1 25.1 16.7 25.1 14.6C25.1 12.1 22.2 11.9 22.2 10.9C22.2 10.5 22.6 10 23.6 10C24.4 10 25.1 10.2 25.6 10.4L26.1 8.2C25.7 8 24.9 7.7 24.8 7.7ZM31.4 7.5H29.3C28.6 7.5 28.1 7.7 27.8 8.4L23.8 16.5H26.5L27 15H30.3L30.6 16.5H33L31.4 7.5ZM27.8 12.8L28.9 9.8L29.6 12.8H27.8ZM11.6 7.5L9.1 13.7L8.8 12.3C8.3 10.7 6.8 8.9 5.2 8L7.6 16.5H10.3L14.3 7.5H11.6Z" fill="#FFC72C"/>
                  </svg>
                  <span className="text-[10px] font-black text-slate-200 tracking-wider">VISA</span>
                </div>

                {/* Mastercard Badge */}
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-xl shadow-sm hover:border-amber-500/50 transition-all">
                  <div className="flex -space-x-1 shrink-0">
                    <div className="w-3.5 h-3.5 rounded-full bg-red-500"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-amber-400 opacity-90"></div>
                  </div>
                  <span className="text-[10px] font-black text-slate-200 tracking-wider">Mastercard</span>
                </div>

                {/* AMEX Badge */}
                <div className="flex items-center gap-1 px-2 py-1.5 bg-slate-900 border border-slate-800 rounded-xl shadow-sm hover:border-sky-400/50 transition-all">
                  <span className="text-[10px] font-extrabold text-sky-400 tracking-widest bg-sky-950/80 px-1.5 py-0.5 rounded border border-sky-800/60">AMEX</span>
                </div>

                {/* Bank EFT / Cheque Badge */}
                <div className="flex items-center gap-1 px-2 py-1.5 bg-slate-900 border border-slate-800 rounded-xl shadow-sm hover:border-slate-700 transition-all">
                  <span className="text-[10px] font-bold text-slate-300">Bank EFT / RTGS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Useful Links */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-widest border-b border-slate-800/80 pb-2.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              <span>Useful Links</span>
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
              <ul className="space-y-2.5">
                <li>
                  <button onClick={() => onNavigateTab('catalog')} className="hover:text-amber-400 transition-all cursor-pointer text-left flex items-center gap-1.5 hover:translate-x-1 group">
                    <span className="text-slate-500 group-hover:text-amber-400">›</span>
                    <span className="font-medium">Home Page</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateTab('catalog')} className="hover:text-amber-400 transition-all cursor-pointer text-left flex items-center gap-1.5 hover:translate-x-1 group">
                    <span className="text-slate-500 group-hover:text-amber-400">›</span>
                    <span className="font-medium">About Roto Tanks</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateTab('custom-moulding')} className="hover:text-amber-400 transition-all cursor-pointer text-left flex items-center gap-1.5 hover:translate-x-1 group">
                    <span className="text-slate-500 group-hover:text-amber-400">›</span>
                    <span className="font-medium">Custom Moulding</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateTab('dealer-locator')} className="hover:text-amber-400 transition-all cursor-pointer text-left flex items-center gap-1.5 hover:translate-x-1 group">
                    <span className="text-slate-500 group-hover:text-amber-400">›</span>
                    <span className="font-medium">Depot Locations</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateTab('catalog')} className="hover:text-amber-400 transition-all cursor-pointer text-left flex items-center gap-1.5 hover:translate-x-1 group">
                    <span className="text-slate-500 group-hover:text-amber-400">›</span>
                    <span className="font-medium">Factory Catalog</span>
                  </button>
                </li>
              </ul>

              <ul className="space-y-2.5">
                <li>
                  <button onClick={() => onNavigateTab('ai-advisor')} className="hover:text-amber-400 transition-all cursor-pointer text-left flex items-center gap-1.5 hover:translate-x-1 group">
                    <span className="text-slate-500 group-hover:text-amber-400">›</span>
                    <span className="font-medium">AI Tank Calculator</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateTab('warranty')} className="hover:text-amber-400 transition-all cursor-pointer text-left flex items-center gap-1.5 hover:translate-x-1 group">
                    <span className="text-slate-500 group-hover:text-amber-400">›</span>
                    <span className="font-medium">Warranty Lookup</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateTab('warranty')} className="hover:text-amber-400 transition-all cursor-pointer text-left flex items-center gap-1.5 hover:translate-x-1 group">
                    <span className="text-slate-500 group-hover:text-amber-400">›</span>
                    <span className="font-medium">Track My Order</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateTab('warranty')} className="hover:text-amber-400 transition-all cursor-pointer text-left flex items-center gap-1.5 hover:translate-x-1 group">
                    <span className="text-slate-500 group-hover:text-amber-400">›</span>
                    <span className="font-medium">Return Policy</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateTab('domain-hub')} className="hover:text-amber-400 transition-all cursor-pointer text-left flex items-center gap-1.5 hover:translate-x-1 group">
                    <span className="text-slate-500 group-hover:text-amber-400">›</span>
                    <span className="font-medium">System Domain</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Contact Us & Social & Newsletter */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-widest border-b border-slate-800/80 pb-2.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Contact Us & Social</span>
            </h4>
            
            <div className="space-y-3 text-xs text-slate-300">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span className="leading-snug">Enterprise Road, Industrial Area, P.O. Box 46143-00100, Nairobi, Kenya</span>
              </p>

              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+254710492539" className="hover:text-white font-extrabold text-amber-400 text-sm tracking-tight">+254 710 492 539</a>
              </p>
              
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="mailto:online@rotomoulders.com" className="hover:text-white font-medium text-slate-200">online@rotomoulders.com</a>
              </p>

              {/* Social Channels with Genuine Brand Styling */}
              <div className="pt-2">
                <p className="text-[11px] font-black text-slate-300 uppercase tracking-widest mb-2">Connect With Us</p>
                <div className="flex items-center gap-2.5">
                  <a 
                    href="https://wa.me/254710492539" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-md transition-all hover:scale-105 flex items-center gap-1.5 text-xs font-bold"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-md transition-all hover:scale-105"
                    title="Facebook"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://youtube.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl shadow-md transition-all hover:scale-105"
                    title="YouTube"
                  >
                    <YouTubeIcon className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2.5 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white rounded-xl shadow-md transition-all hover:scale-105"
                    title="Instagram"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-3 space-y-2 border-t border-slate-800/80">
              <p className="text-xs font-black text-white uppercase tracking-wider">Subscribe To Newsletter</p>
              <p className="text-[11px] text-slate-400">Get product updates, factory direct pricing & technical specs.</p>
              
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-3.5 py-2.5 bg-slate-900 border border-slate-800 text-white rounded-xl text-xs font-medium focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder-slate-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer shrink-0 uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-red-600/30"
                >
                  {subscribed ? (
                    <>
                      <span>Joined!</span>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    </>
                  ) : (
                    <>
                      <span>Join</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Bottom Rights Notice */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
          <div>
            © {new Date().getFullYear()} Roto Moulders Limited. All Rights Reserved. Reg. CPR/2011/56882.
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 text-[10px] font-bold uppercase tracking-wider bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Official Factory Sales
            </span>
            <button onClick={() => onNavigateTab('warranty')} className="hover:text-amber-400 transition-colors cursor-pointer">
              Warranty Terms
            </button>
            <button onClick={() => onNavigateTab('catalog')} className="hover:text-amber-400 transition-colors cursor-pointer">
              Sales Terms
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

// SVG Helper Components for Authentic Brand Logos
function WhatsAppIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.67-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 2a10 10 0 0 0-8.4 15.4L2 22l4.8-1.25A10 10 0 1 0 12 2zm0 18a7.96 7.96 0 0 1-4.07-1.11l-.29-.17-3.03.79.81-2.95-.19-.3A7.96 7.96 0 1 1 12 20z"/>
    </svg>
  );
}

function FacebookIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
    </svg>
  );
}

function YouTubeIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}
