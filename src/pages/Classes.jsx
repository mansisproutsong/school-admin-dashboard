import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFilter } from '../context/FilterContext';
import ClassSelector from '../components/common/ClassSelector';
import { School, User, Award, Users, TrendingUp, UserCheck, Wallet, ArrowRight } from 'lucide-react';

export default function Classes() {
  const { classesList, students, setSelectedClassId } = useFilter();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Scope Selector */}
      <ClassSelector />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-line shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-ink tracking-tight">Class Architecture & Metrics</h1>
          <p className="text-xs text-muted mt-1">
            Real-time breakdown of all {classesList.length} classes, section capacities, attendance rates, and academic performance averages
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 bg-blue-50 text-primary border border-blue-100 rounded-xl">
            Total Classes: {classesList.length}
          </span>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {classesList.map((cls) => {
          // Live dynamic metrics calculated directly from student data
          const classStudents = students.filter(s => s.classId === cls.id);
          const enrolledCount = classStudents.length || cls.studentCount;
          const capacity = cls.capacity || 35;
          const occupancyPct = Math.min(100, Math.round((enrolledCount / capacity) * 100));

          const attendancePct = enrolledCount > 0 
            ? Math.round(classStudents.reduce((acc, curr) => acc + curr.attendancePct, 0) / enrolledCount) 
            : cls.attendancePct;

          const avgScore = enrolledCount > 0 
            ? Math.round(classStudents.reduce((acc, curr) => acc + curr.performanceAvg, 0) / enrolledCount) 
            : cls.avgScore;

          const paidCount = classStudents.filter(s => s.feeStatus === 'Paid').length;
          const pendingCount = enrolledCount - paidCount;

          return (
            <div 
              key={cls.id}
              onClick={() => {
                setSelectedClassId(cls.id);
                navigate('/students');
              }}
              className="bg-white rounded-2xl border border-line p-5 shadow-xs hover:shadow-md hover:border-primary/40 cursor-pointer transition-all space-y-4 group relative overflow-hidden"
            >
              {/* Top Row: Class Title & Icon */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-ink text-lg group-hover:text-primary transition-colors">
                      Class {cls.id}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      Sec {cls.section || 'A'}
                    </span>
                  </div>
                  <p className="text-xs text-muted mt-0.5">{cls.room} • Standard {cls.standard}</p>
                </div>

                <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all border border-blue-100 shadow-2xs">
                  <School className="w-5 h-5" />
                </div>
              </div>

              {/* Class Teacher In-charge */}
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-slate-50/80 p-2.5 rounded-xl border border-line">
                <User className="w-4 h-4 text-primary shrink-0" />
                <span className="truncate">Mentor: <strong className="text-ink">{cls.teacher}</strong></span>
              </div>

              {/* Enrolled Capacity Bar */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-muted font-medium">
                  <span>Enrolled Capacity</span>
                  <span className="font-bold text-ink">{enrolledCount}/{capacity} Students</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${occupancyPct >= 90 ? 'bg-indigo-600' : 'bg-primary'}`} 
                    style={{ width: `${occupancyPct}%` }} 
                  />
                </div>
              </div>

              {/* Dynamic Metrics Cards (Live Attendance % & Avg Score %) */}
              <div className="grid grid-cols-2 gap-2.5 pt-1 text-xs">
                <div className="p-3 bg-emerald-50/60 rounded-xl text-center border border-emerald-100">
                  <p className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">Attendance Rate</p>
                  <p className="text-lg font-extrabold text-emerald-600 mt-0.5">{attendancePct}%</p>
                </div>
                <div className="p-3 bg-purple-50/60 rounded-xl text-center border border-purple-100">
                  <p className="text-[10px] text-purple-800 font-bold uppercase tracking-wider">Avg Score</p>
                  <p className="text-lg font-extrabold text-purple-700 mt-0.5">{avgScore}%</p>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="flex items-center justify-between text-[11px] text-muted pt-2 border-t border-line">
                <span>Fees: <strong className="text-emerald-600">{paidCount} Paid</strong> • <span className="text-amber-600">{pendingCount} Pending</span></span>
                <span className="font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Students <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}