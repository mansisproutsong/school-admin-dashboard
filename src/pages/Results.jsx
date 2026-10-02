import React from 'react';
import { useFilter } from '../context/FilterContext';
import ClassSelector from '../components/common/ClassSelector';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Award, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export default function Results() {
  const { getFilteredData, selectedClassId } = useFilter();
  const { kpis, students, subjectPerformanceData, scopeText } = getFilteredData();

  const topPerformers = students.filter(s => s.performanceAvg >= 80);
  const atRiskStudents = students.filter(s => s.performanceAvg < 75);

  return (
    <div className="space-y-6">
      <ClassSelector />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-ink">Academic Performance & Results</h1>
          <p className="text-xs text-muted mt-0.5">{scopeText}</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-card border border-line shadow-soft flex items-center gap-4">
          <span className="w-12 h-12 rounded-btn bg-purple-500/10 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6 text-purple-600" />
          </span>
          <div>
            <p className="text-2xl font-bold text-ink">{kpis.academicAvg}</p>
            <p className="text-xs text-muted mt-0.5">Overall Academic Average</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-card border border-line shadow-soft flex items-center gap-4">
          <span className="w-12 h-12 rounded-btn bg-success/10 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6 text-success" />
          </span>
          <div>
            <p className="text-2xl font-bold text-ink">{selectedClassId === 'ALL' ? '94.2%' : '96.8%'}</p>
            <p className="text-xs text-muted mt-0.5">Term Pass Rate</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-card border border-line shadow-soft flex items-center gap-4">
          <span className="w-12 h-12 rounded-btn bg-danger/10 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 text-danger" />
          </span>
          <div>
            <p className="text-2xl font-bold text-danger">{atRiskStudents.length}</p>
            <p className="text-xs text-muted mt-0.5">Students Needing Remedial Coaching (&lt;75%)</p>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-5 rounded-card border border-line shadow-soft space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-sm text-ink">Subject Average Score Breakdown (%)</h3>
          <span className="text-xs text-muted">Hover over bars for exact scores</span>
        </div>
        <div className="h-64 w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={subjectPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="subject" stroke="#64748B" />
              <YAxis domain={[40, 100]} stroke="#64748B" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F172A', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                itemStyle={{ color: '#C084FC' }}
                formatter={(val) => [`${val}%`, 'Avg Score']}
              />
              <Bar dataKey="score" fill="#9333EA" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Student Rank Lists / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-white p-5 rounded-card border border-line shadow-soft space-y-3">
          <h3 className="font-bold text-sm text-ink flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-success" /> Top Performers (&ge;80%)
          </h3>
          <div className="space-y-2">
            {topPerformers.map(s => (
              <div key={s.id} className="p-3 bg-slate-50 rounded-btn border border-line flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-ink">{s.name}</p>
                  <p className="text-[11px] text-muted">Class {s.classId} • Roll No: {s.rollNo}</p>
                </div>
                <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">{s.performanceAvg}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* At-Risk Students */}
        <div className="bg-white p-5 rounded-card border border-line shadow-soft space-y-3">
          <h3 className="font-bold text-sm text-ink flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-danger" /> Students At-Risk (&lt;75%)
          </h3>
          <div className="space-y-2">
            {atRiskStudents.length === 0 ? (
              <p className="text-xs text-muted py-4 text-center">No students currently at risk in this class context!</p>
            ) : (
              atRiskStudents.map(s => (
                <div key={s.id} className="p-3 bg-red-50/50 rounded-btn border border-red-200 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-red-900">{s.name}</p>
                    <p className="text-[11px] text-muted">Class {s.classId} • Roll No: {s.rollNo}</p>
                  </div>
                  <span className="text-xs font-bold text-danger bg-white border border-red-200 px-2.5 py-1 rounded-full">{s.performanceAvg}%</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}