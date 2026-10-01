import React from 'react';
import { useFilter } from '../context/FilterContext';
import ClassSelector from '../components/common/ClassSelector';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Award, TrendingUp, AlertTriangle } from 'lucide-react';

export default function Results() {
  const { getFilteredData, selectedClassId } = useFilter();
  const { kpis, students } = getFilteredData();

  const subjectPerformanceData = [
    { subject: 'Maths', score: 82 },
    { subject: 'Science', score: 79 },
    { subject: 'English', score: 88 },
    { subject: 'Comp Sci', score: 94 },
    { subject: 'Social Studies', score: 76 },
  ];

  const topPerformers = students.filter(s => s.performanceAvg >= 85);
  const atRiskStudents = students.filter(s => s.performanceAvg < 70);

  return (
    <div className="space-y-6">
      <ClassSelector />

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-ink">Academic Performance & Results</h1>
          <p className="text-xs text-muted mt-0.5">Term result analytics and subject performance breakdown</p>
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
            <p className="text-2xl font-bold text-ink">94.2%</p>
            <p className="text-xs text-muted mt-0.5">Term Pass Rate</p>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-5 rounded-card border border-line shadow-soft space-y-4">
        <h3 className="font-bold text-sm text-ink">Subject Performance Breakdown</h3>
        <div className="h-64 w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={subjectPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="subject" stroke="#64748B" />
              <YAxis domain={[50, 100]} stroke="#64748B" />
              <Tooltip />
              <Bar dataKey="score" fill="#9333EA" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}