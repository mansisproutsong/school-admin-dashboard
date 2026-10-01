import React, { useState } from 'react';
import { useFilter } from '../context/FilterContext';
import ClassSelector from '../components/common/ClassSelector';
import { 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, 
  Tooltip, CartesianGrid, Legend 
} from 'recharts';
import { ClipboardCheck, UserX, Clock, AlertTriangle, Calendar, Filter } from 'lucide-react';

export default function Attendance() {
  const { getFilteredData, selectedClassId } = useFilter();
  const { isOverall, scopeText, kpis, students } = getFilteredData();
  const [period, setPeriod] = useState('Week');

  // Recharts Mock Trend Data
  const trendData = [
    { day: 'Mon', Present: 94, Absent: 6, Late: 2 },
    { day: 'Tue', Present: 92, Absent: 8, Late: 3 },
    { day: 'Wed', Present: 96, Absent: 4, Late: 1 },
    { day: 'Thu', Present: 91, Absent: 9, Late: 4 },
    { day: 'Fri', Present: 95, Absent: 5, Late: 2 },
    { day: 'Sat', Present: 89, Absent: 11, Late: 5 },
  ];

  const classComparisonData = [
    { name: '10-A', Attendance: 95 },
    { name: '10-B', Attendance: 92 },
    { name: '9-A', Attendance: 88 },
    { name: '9-B', Attendance: 94 },
    { name: '8-A', Attendance: 94 },
    { name: '8-B', Attendance: 91 },
  ];

  const lowAttendanceStudents = students.filter(s => s.attendancePct < 75);

  return (
    <div className="space-y-6">
      <ClassSelector />

      {/* Header & Period Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-ink">Attendance Management & Analytics</h1>
          <p className="text-xs text-muted mt-0.5">{scopeText}</p>
        </div>

        <div className="flex items-center gap-1 bg-white border border-line p-1 rounded-btn shadow-soft text-xs font-semibold">
          {['Week', 'Month', 'Term'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                period === p ? 'bg-primary text-white' : 'text-muted hover:bg-slate-100'
              }`}
            >
              This {p}
            </button>
          ))}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-card border border-line p-5 shadow-soft flex items-center gap-4">
          <span className="w-12 h-12 rounded-btn bg-success/10 flex items-center justify-center shrink-0">
            <ClipboardCheck className="w-6 h-6 text-success" />
          </span>
          <div>
            <p className="text-2xl font-bold text-ink">{kpis.attendancePct}</p>
            <p className="text-xs text-muted mt-0.5">Average Attendance Rate</p>
          </div>
        </div>

        <div className="bg-white rounded-card border border-line p-5 shadow-soft flex items-center gap-4">
          <span className="w-12 h-12 rounded-btn bg-danger/10 flex items-center justify-center shrink-0">
            <UserX className="w-6 h-6 text-danger" />
          </span>
          <div>
            <p className="text-2xl font-bold text-ink">
              {isOverall ? '95 Students' : '2 Students'}
            </p>
            <p className="text-xs text-muted mt-0.5">Absent Today</p>
          </div>
        </div>

        <div className="bg-white rounded-card border border-line p-5 shadow-soft flex items-center gap-4">
          <span className="w-12 h-12 rounded-btn bg-warning/10 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6 text-warning" />
          </span>
          <div>
            <p className="text-2xl font-bold text-ink">
              {isOverall ? '26 Students' : '1 Student'}
            </p>
            <p className="text-xs text-muted mt-0.5">Late Arrivals Today</p>
          </div>
        </div>
      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Area Chart */}
        <div className="lg:col-span-2 bg-white rounded-card border border-line p-5 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <h3 className="font-bold text-sm text-ink">Attendance Trend ({period}ly)</h3>
            <span className="text-xs text-muted font-medium">Daily Present %</span>
          </div>

          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="day" stroke="#64748B" />
                <YAxis domain={[70, 100]} stroke="#64748B" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="Present" stroke="#22C55E" fillOpacity={1} fill="url(#colorPresent)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Class Comparison Bar Chart */}
        <div className="bg-white rounded-card border border-line p-5 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <h3 className="font-bold text-sm text-ink">Class Comparison</h3>
            <span className="text-xs text-muted font-medium">Attendance %</span>
          </div>

          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classComparisonData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" stroke="#64748B" />
                <YAxis domain={[60, 100]} stroke="#64748B" />
                <Tooltip />
                <Bar dataKey="Attendance" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Low Attendance Alert Table (<75%) */}
      <div className="bg-white rounded-card border border-line p-5 shadow-soft space-y-4">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <h3 className="font-bold text-sm text-ink flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-danger" /> Low Attendance Alert (&lt;75%)
          </h3>
          <span className="text-xs text-danger font-semibold bg-danger/10 px-2.5 py-1 rounded-full">
            Action Needed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-muted border-b border-line bg-slate-50 font-bold uppercase text-[10px]">
                <th className="py-2.5 px-4">Student Name</th>
                <th className="py-2.5 px-3">Class</th>
                <th className="py-2.5 px-3">Attendance</th>
                <th className="py-2.5 px-3">Parent Contact</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {lowAttendanceStudents.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-muted">
                    No students currently below 75% attendance in this scope!
                  </td>
                </tr>
              ) : (
                lowAttendanceStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-semibold text-ink">{s.name}</td>
                    <td className="py-3 px-3 text-muted">Class {s.classId}</td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-danger bg-danger/10 px-2 py-0.5 rounded-full">
                        {s.attendancePct}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-muted">{s.parentPhone}</td>
                    <td className="py-3 px-4 text-right">
                      <button 
                        onClick={() => alert(`Warning notice issued to parent of ${s.name}`)}
                        className="text-xs font-semibold text-danger hover:underline"
                      >
                        Issue Warning Notice
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}