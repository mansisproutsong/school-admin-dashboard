import React from 'react';
import { Menu, Search, Bell, Calendar, User } from 'lucide-react';

export default function Header({ onMenuClick }) {
  return (
    <header className="h-[72px] bg-white border-b border-line flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
      {/* Left Search & Mobile Toggle */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button 
          onClick={onMenuClick}
          className="lg:hidden text-muted hover:text-ink p-2 rounded-btn hover:bg-slate-100"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative max-w-md w-full hidden sm:block group">
          <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search students, teachers, classes..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 bg-slate-50/50 text-xs font-semibold text-ink focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Right User Actions */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-1.5 text-xs font-semibold bg-slate-100 px-3 py-1.5 rounded-full text-muted">
          <Calendar className="w-3.5 h-3.5 text-primary" />
          <span>Academic Year 2026–27</span>
        </div>

        <button className="relative w-9 h-9 flex items-center justify-center text-muted hover:text-ink hover:bg-slate-100 rounded-btn">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
        </button>

        <div className="h-6 w-px bg-line mx-1" />

        <div className="flex items-center gap-2">
          <img 
            src="https://i.pravatar.cc/64?img=47" 
            alt="Mansi Jogani" 
            className="w-8 h-8 rounded-full border border-line" 
          />
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-ink leading-tight">Mansi Jogani</p>
            <p className="text-[10px] text-muted leading-tight">Principal</p>
          </div>
        </div>
      </div>
    </header>
  );
}