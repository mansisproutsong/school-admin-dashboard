import React from 'react';
import { useFilter } from '../../context/FilterContext';
import { Filter, Building2, Calendar, LayoutGrid, ChevronDown } from 'lucide-react';

export default function ClassSelector() {
  const { selectedClassId, setSelectedClassId, classesList } = useFilter();

  return (
    <div className="bg-white rounded-card border border-line p-3 shadow-soft flex flex-wrap items-center justify-between gap-4">
      {/* Left side info */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-btn bg-primary/10 flex items-center justify-center">
            <LayoutGrid className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-sm font-bold text-ink">Global Context</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-muted">
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> 2026–27</span>
        </div>
      </div>

      {/* Right side selector */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <label htmlFor="global-class-select" className="text-[11px] font-bold uppercase tracking-wider text-muted hidden md:block">
          Select Class:
        </label>
        <div className="relative flex-1 sm:w-64">
          <select
            id="global-class-select"
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="w-full appearance-none bg-slate-50 border border-line text-ink font-bold text-sm rounded-btn pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer transition-all hover:bg-slate-100"
          >
            <option value="ALL">Overall School (All Classes)</option>
            {classesList.map((cls) => (
              <option key={cls.id} value={cls.id}>
                Class {cls.id} • {cls.studentCount} Students
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}