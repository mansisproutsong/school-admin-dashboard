import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function CustomSelect({ 
  value, 
  onChange, 
  options = [], 
  label, 
  icon: Icon,
  className = '',
  menuWidth = 'w-56',
  size = 'md' // 'sm' | 'md'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  return (
    <div className={`relative inline-block text-left ${className}`} ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-2 bg-slate-50 hover:bg-slate-100 text-ink font-semibold border border-line rounded-xl transition-all cursor-pointer shadow-2xs focus:outline-none focus:ring-2 focus:ring-primary/25 ${
          size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-3.5 py-2 text-xs'
        } ${isOpen ? 'ring-2 ring-primary/25 border-primary/50 bg-white' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-1.5 truncate">
          {Icon && <Icon className="w-3.5 h-3.5 text-muted shrink-0" />}
          {label && <span className="text-[11px] font-semibold text-muted shrink-0">{label}</span>}
          <span className="font-bold text-ink truncate">
            {selectedOption?.label || value}
          </span>
        </div>

        <ChevronDown 
          className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-primary' : ''
          }`} 
        />
      </button>

      {/* Custom Dropdown Menu */}
      {isOpen && (
        <div 
          className={`absolute left-0 sm:right-0 sm:left-auto mt-1.5 ${menuWidth} max-h-64 overflow-y-auto bg-white rounded-2xl shadow-xl border border-slate-200/90 py-1.5 z-50 animate-fadeIn`}
          role="listbox"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            const OptionIcon = option.icon;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected 
                    ? 'bg-blue-50/80 text-primary font-bold' 
                    : 'text-slate-700 hover:bg-slate-50 hover:text-ink font-medium'
                }`}
                role="option"
                aria-selected={isSelected}
              >
                <div className="flex items-center gap-2 truncate">
                  {OptionIcon && (
                    <OptionIcon className={`w-3.5 h-3.5 shrink-0 ${option.color || 'text-slate-400'}`} />
                  )}
                  <span className="truncate">{option.label}</span>
                </div>

                {option.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${option.badge}`}>
                    {option.badgeText || option.value}
                  </span>
                )}

                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
