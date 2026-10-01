import React from 'react';
import { useFilter } from '../../context/FilterContext';
import { Filter, Building2, Calendar } from 'lucide-react';

export default function ClassSelector() {
  const { selectedClassId, setSelectedClassId, classesList } = useFilter();

  return (
    <div className="bg-white rounded-card border border-line p-4 shadow-soft flex flex-wrap items-center justify-between gap-4">
      {/* Context Badge Labels */}
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1.5 rounded-full flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5" /> Main Campus
        </span>
        <span className="text-xs font-semibold bg-slate-100 text-muted px-3 py-1.5 rounded-full flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-primary" /> Academic Year 2026–27
        </span>
      </div>

      {/* Class Dropdown */}
      <div className="flex items-center gap-2">
        <label htmlFor="global-class-select" className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-primary" /> Class Context:
        </label>
        <select
          id="global-class-select"
          value={selectedClassId}
          onChange={(e) => setSelectedClassId(e.target.value)}
          className="bg-bg border border-line text-ink font-semibold text-xs rounded-inp px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/25 cursor-pointer"
        >
          <option value="ALL">All Classes (Overall School)</option>
          {classesList.map((cls) => (
            <option key={cls.id} value={cls.id}>
              Class {cls.id} ({cls.studentCount} Students)
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}