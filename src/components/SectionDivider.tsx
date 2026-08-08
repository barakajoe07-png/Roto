import React from 'react';

interface SectionDividerProps {
  className?: string;
  glowColor?: 'red' | 'amber' | 'neutral';
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  className = '',
  glowColor = 'amber',
}) => {
  const glowStyles = {
    red: 'from-red-600/15 via-rose-500/20 to-red-600/15',
    amber: 'from-red-600/10 via-amber-500/20 to-rose-600/10',
    neutral: 'from-slate-700/10 via-slate-500/15 to-slate-700/10',
  };

  return (
    <div className={`relative w-full overflow-hidden py-4 bg-slate-950 ${className}`}>
      {/* Soft Center Radial Glow */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 sm:w-1/2 h-8 bg-gradient-to-r ${glowStyles[glowColor]} blur-2xl rounded-full pointer-events-none`}
      />

      {/* Subtle Gradient Line Fade */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-800/90 to-transparent" />
        <div className="absolute w-2 h-2 rounded-full bg-amber-500/60 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
      </div>
    </div>
  );
};
