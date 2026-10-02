import React from 'react';
import { useFilter } from '../context/FilterContext';
import ClassSelector from '../components/common/ClassSelector';
import { School, User, Award, Users } from 'lucide-react';

export default function Classes() {
  const { classesList, setSelectedClassId } = useFilter();

  return (
    <div className="space-y-6">
      <ClassSelector />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-ink">Class Architecture</h1>
          <p className="text-xs text-muted mt-0.5">Overview of 10 primary classes and sections across Green Valley International School</p>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {classesList.map((cls) => {
          const occupancyPct = Math.round((cls.studentCount / cls.capacity) * 100);
          return (
            <div 
              key={cls.id}
              onClick={() => setSelectedClassId(cls.id)}
              className="bg-white rounded-card border border-line p-5 shadow-soft hover:border-primary cursor-pointer transition-all space-y-4 group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-ink text-lg group-hover:text-primary transition-colors">
                    Class {cls.id}
                  </h3>
                  <p className="text-xs text-muted">{cls.room} • Standard {cls.standard}</p>
                </div>
                <span className="w-9 h-9 rounded-btn bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <School className="w-4 h-4 text-primary group-hover:text-white" />
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-ink bg-slate-50 p-2.5 rounded-btn border border-line">
                <User className="w-4 h-4 text-primary" />
                <span>Teacher: {cls.teacher}</span>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-muted font-medium">
                  <span>Enrolled Capacity</span>
                  <span className="font-bold text-ink">{cls.studentCount}/{cls.capacity} students</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${occupancyPct}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <div className="p-2 bg-green-50 rounded-btn text-center border border-green-100">
                  <p className="text-[10px] text-muted font-medium">Attendance</p>
                  <p className="font-bold text-success mt-0.5">{cls.attendancePct}%</p>
                </div>
                <div className="p-2 bg-purple-50 rounded-btn text-center border border-purple-100">
                  <p className="text-[10px] text-muted font-medium">Avg Score</p>
                  <p className="font-bold text-purple-600 mt-0.5">{cls.avgScore}%</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}