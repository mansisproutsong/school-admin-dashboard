import React from 'react';
import { useFilter } from '../../context/FilterContext';
import { Building2, Filter } from 'lucide-react';
import CustomSelect from './CustomSelect';

export default function ClassSelector() {
  const { selectedClassId, setSelectedClassId, classesList } = useFilter();

  const classOptions = [
    { value: 'ALL', label: 'Overall School (All Classes)' },
    ...classesList.map((cls) => ({
      value: cls.id,
      label: `Class ${cls.id} • ${cls.studentCount} Students`
    }))
  ];

  return (
    <div className="bg-white rounded-2xl border border-line px-4 py-2.5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      {/* Left side indicator */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-xl bg-blue-50 text-primary flex items-center justify-center border border-blue-100">
          <Filter className="w-3.5 h-3.5" />
        </div>
        <div>
          <span className="text-xs font-bold text-ink">Class Scope Filter</span>
          <span className="text-[10px] text-muted block -mt-0.5">Filter data by specific class or entire school</span>
        </div>
      </div>

      {/* Right side scope custom selector */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <CustomSelect 
          label="Scope:"
          value={selectedClassId}
          onChange={(val) => setSelectedClassId(val)}
          options={classOptions}
          menuWidth="w-64"
          icon={Building2}
        />
      </div>
    </div>
  );
}