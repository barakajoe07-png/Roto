import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check, X } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  badge?: string;
  icon?: React.ReactNode;
  description?: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  icon?: React.ReactNode;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
  dark?: boolean;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  label,
  icon,
  searchable = false,
  disabled = false,
  className = '',
  dark = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Filter options based on search query
  const filteredOptions = options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase()) ||
      (opt.description && opt.description.toLowerCase().includes(search.toLowerCase())) ||
      (opt.badge && opt.badge.toLowerCase().includes(search.toLowerCase()))
  );

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation & Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const autoSearchable = searchable || options.length > 7;

  return (
    <div className={`relative w-full text-left font-sans ${className}`} ref={containerRef}>
      {label && (
        <label
          className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
            dark ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          {label}
        </label>
      )}

      {/* Select Trigger Button with Claymorphic & Glassmorphic depth */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer outline-hidden ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${
          dark
            ? 'bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.3)] backdrop-blur-md focus:border-yellow-400'
            : 'bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_4px_10px_rgba(0,0,0,0.05)] focus:border-red-600'
        }`}
      >
        <div className="flex items-center gap-2.5 truncate pr-2">
          {icon && <span className="shrink-0 text-yellow-400">{icon}</span>}
          {selectedOption?.icon && <span className="shrink-0">{selectedOption.icon}</span>}
          <span className="truncate font-semibold">
            {selectedOption ? selectedOption.label : <span className="text-slate-400">{placeholder}</span>}
          </span>
          {selectedOption?.badge && (
            <span className="px-1.5 py-0.5 text-[10px] font-black rounded-md bg-yellow-400 text-black uppercase tracking-wider shrink-0">
              {selectedOption.badge}
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-yellow-400' : 'text-slate-400'
          }`}
        />
      </button>

      {/* Floating Popover Options Menu */}
      {isOpen && (
        <div
          className={`absolute z-50 mt-1.5 w-full rounded-2xl border shadow-2xl overflow-hidden backdrop-blur-xl transition-all ${
            dark
              ? 'bg-slate-950/95 border-slate-700/80 text-white shadow-[0_20px_40px_rgba(0,0,0,0.8)]'
              : 'bg-white/95 border-slate-200 text-slate-900 shadow-[0_20px_40px_rgba(0,0,0,0.15)]'
          }`}
        >
          {/* Optional Search Input */}
          {autoSearchable && (
            <div className={`p-2 border-b ${dark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-100 bg-slate-50'}`}>
              <div className="relative flex items-center">
                <Search className="w-3.5 h-3.5 absolute left-3 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Type to search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={`w-full pl-8 pr-7 py-1.5 rounded-lg text-xs font-medium focus:outline-hidden ${
                    dark
                      ? 'bg-slate-900 text-white border border-slate-700 focus:border-yellow-400 placeholder-slate-500'
                      : 'bg-white text-slate-900 border border-slate-200 focus:border-red-600 placeholder-slate-400'
                  }`}
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-2 text-slate-400 hover:text-white p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Options List */}
          <div className="max-h-60 overflow-y-auto p-1.5 space-y-0.5 custom-scrollbar">
            {filteredOptions.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400 font-medium">
                No matching options found
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                      setSearch('');
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left ${
                      isSelected
                        ? dark
                          ? 'bg-red-600/90 text-white shadow-sm font-bold'
                          : 'bg-red-600 text-white font-bold'
                        : dark
                        ? 'hover:bg-slate-800/80 text-slate-200'
                        : 'hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                      <div className="truncate">
                        <div className="truncate font-semibold">{opt.label}</div>
                        {opt.description && (
                          <div
                            className={`text-[10px] font-normal truncate ${
                              isSelected ? 'text-red-100' : dark ? 'text-slate-400' : 'text-slate-500'
                            }`}
                          >
                            {opt.description}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      {opt.badge && (
                        <span
                          className={`px-1.5 py-0.5 text-[9px] font-extrabold rounded ${
                            isSelected
                              ? 'bg-yellow-300 text-black'
                              : dark
                              ? 'bg-slate-800 text-yellow-400 border border-slate-700'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {opt.badge}
                        </span>
                      )}
                      {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
