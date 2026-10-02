import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useFilter } from '../context/FilterContext';
import ClassSelector from '../components/common/ClassSelector';
import StudentDrawer from '../components/common/StudentDrawer';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';
import { 
  Award, TrendingUp, AlertTriangle, CheckCircle2, Download, 
  Eye, Send, Phone, Bell, X, Megaphone, ArrowRight, ArrowUpRight
} from 'lucide-react';

const getInitials = (name) => {
  if (!name) return 'ST';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const avatarSolidColors = [
  'bg-emerald-600 text-white',
  'bg-blue-600 text-white',
  'bg-indigo-600 text-white',
  'bg-teal-600 text-white',
  'bg-cyan-600 text-white',
  'bg-sky-600 text-white'
];

const getAvatarColor = (id) => {
  const num = parseInt(String(id).replace(/\D/g, '')) || 0;
  return avatarSolidColors[num % avatarSolidColors.length];
};

export default function Results() {
  const { getFilteredData, selectedClassId } = useFilter();
  const { kpis, students, subjectPerformanceData, scopeText } = getFilteredData();

  const [selectedStudentForDrawer, setSelectedStudentForDrawer] = useState(null);
  const [remedialModalStudent, setRemedialModalStudent] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Top Performers (>=80%) sorted descending
  const topPerformers = students
    .filter(s => s.performanceAvg >= 80)
    .sort((a, b) => b.performanceAvg - a.performanceAvg);

  // At Risk Students (<75%) sorted ascending
  const atRiskStudents = students
    .filter(s => s.performanceAvg < 75)
    .sort((a, b) => a.performanceAvg - b.performanceAvg);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleIssueRemedialConfirm = (studentName) => {
    setRemedialModalStudent(null);
    triggerToast(`Remedial notice sent to parent of ${studentName}`);
  };

  // Helper to generate realistic subject failure notes for intervention cards
  const getFailingSubjectsNote = (s) => {
    const score = s.performanceAvg;
    if (score < 60) return `Failing: Math (${Math.max(40, score - 8)}%), Science (${score}%)`;
    if (score < 65) return `Failing: English (${score}%)`;
    if (score < 70) return `Lacking in Hindi (${score}%)`;
    return `Target Gap: -${75 - score}%`;
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Scope Selector */}
      <ClassSelector />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Academic Performance & Results</h1>
          <p className="text-xs text-slate-500 mt-0.5">{scopeText}</p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => triggerToast("Exporting official marksheet PDF...")}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Export Report Cards
          </button>

          <button 
            onClick={() => triggerToast("Results published to parent portal")}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-2xs"
          >
            Publish Results
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4.5 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Academic Average</p>
            <p className="text-xl font-black text-slate-900 mt-0.5">{kpis.academicAvg}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4.5 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Term Pass Rate</p>
            <p className="text-xl font-black text-slate-900 mt-0.5">{selectedClassId === 'ALL' ? '94.2%' : '96.8%'}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4.5 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Distinction Scholars (≥80%)</p>
            <p className="text-xl font-black text-slate-900 mt-0.5">{topPerformers.length} Students</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4.5 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Intervention Needed (&lt;75%)</p>
            <p className="text-xl font-black text-rose-600 mt-0.5">{atRiskStudents.length} Students</p>
          </div>
        </div>
      </div>

      {/* Subject Performance Bar Chart */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-sm text-slate-900">Subject Average Score Breakdown (%)</h3>
            <p className="text-xs text-slate-400">Class average across evaluated subjects</p>
          </div>
        </div>

        <div className="h-56 w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={subjectPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="subject" stroke="#64748B" tickLine={false} />
              <YAxis domain={[40, 100]} stroke="#64748B" tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F172A', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '12px' }}
                itemStyle={{ color: '#60A5FA' }}
                formatter={(val) => [`${val}%`, 'Avg Score']}
              />
              <Bar dataKey="score" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Main 2 Panel Layout matching User Screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Panel: Distinction & Top Performers */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">Distinction & Top Performers</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Cohort meeting or exceeding 80% cutoff • {topPerformers.length} Students
                </p>
              </div>
            </div>

            <button 
              onClick={() => triggerToast("Opening full top performers register")}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              Full Register <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {topPerformers.length === 0 ? (
              <p className="text-xs text-slate-400 py-8 text-center font-medium">
                No students currently above 80% threshold in this scope.
              </p>
            ) : (
              topPerformers.map((s, idx) => {
                const rankStr = `#${String(idx + 1).padStart(2, '0')}`;
                const initials = getInitials(s.name);
                const avatarBg = getAvatarColor(s.id);
                
                // Special tag badge for top ranks
                let tag = null;
                if (idx === 0) tag = <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-md border border-amber-200">Class Topper</span>;
                else if (idx === 1) tag = <span className="bg-slate-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded-md">Distinction in Math</span>;
                else if (idx === 2) tag = <span className="bg-slate-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded-md">Science Lead</span>;

                return (
                  <div 
                    key={s.id} 
                    className="p-3 bg-slate-50/70 rounded-2xl border border-slate-200/70 flex items-center justify-between hover:bg-slate-100/70 transition-colors group cursor-pointer"
                    onClick={() => setSelectedStudentForDrawer(s)}
                  >
                    <div className="flex items-center gap-3">
                      {/* Rank number */}
                      <span className="text-[11px] font-mono font-bold text-slate-400 w-6 shrink-0">
                        {rankStr}
                      </span>

                      {/* Solid round initials circle */}
                      <div className={`w-9 h-9 rounded-full ${avatarBg} flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs`}>
                        {initials}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-slate-900 text-xs group-hover:text-blue-600 transition-colors">
                            {s.name}
                          </p>
                          {tag}
                        </div>
                        <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                          Roll: {s.classId}-{s.rollNo} • 7 Subjects
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                        {s.performanceAvg.toFixed(1)}%
                      </span>

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStudentForDrawer(s);
                        }}
                        className="w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors shadow-2xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Panel: Academic Intervention Required */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center font-bold shrink-0">
                !
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">Academic Intervention Required</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Cohort below 75% threshold • {atRiskStudents.length} Students
                </p>
              </div>
            </div>

            <button 
              onClick={() => triggerToast(`Broadcast alert sent to parents of ${atRiskStudents.length} students`)}
              className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs shrink-0"
            >
              <Megaphone className="w-3.5 h-3.5" />
              Send Guardian Alerts
            </button>
          </div>

          <div className="space-y-2.5">
            {atRiskStudents.length === 0 ? (
              <p className="text-xs text-slate-400 py-8 text-center font-medium">
                No students currently requiring academic intervention.
              </p>
            ) : (
              atRiskStudents.map((s) => {
                const initials = getInitials(s.name);
                const score = s.performanceAvg;

                // Severity Card Styles
                let cardBg = 'bg-slate-50/80 border-slate-200/80';
                let avatarBg = 'bg-slate-200 text-slate-700';
                let badge = null;
                let actionText = 'Notify Parent';
                let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50';
                let scoreBadgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';

                if (score < 60) {
                  cardBg = 'bg-rose-50/70 border-rose-200/80';
                  avatarBg = 'bg-rose-200 text-rose-800';
                  badge = <span className="bg-rose-200 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-md">Critical Alert</span>;
                  actionText = 'Assign Remedial';
                  btnStyle = 'bg-white border-rose-200 text-rose-700 hover:bg-rose-100 font-bold';
                  scoreBadgeStyle = 'bg-rose-100 text-rose-700 border-rose-200';
                } else if (score < 65) {
                  cardBg = 'bg-rose-50/40 border-rose-100';
                  avatarBg = 'bg-rose-100 text-rose-700';
                  badge = <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-md">High Attention</span>;
                  actionText = 'Assign Remedial';
                  btnStyle = 'bg-white border-rose-200 text-rose-700 hover:bg-rose-50 font-bold';
                  scoreBadgeStyle = 'bg-rose-100 text-rose-700 border-rose-200';
                } else if (score < 70) {
                  cardBg = 'bg-amber-50/50 border-amber-200/80';
                  avatarBg = 'bg-amber-100 text-amber-800';
                  scoreBadgeStyle = 'bg-amber-100 text-amber-800 border-amber-200';
                }

                return (
                  <div key={s.id} className={`p-3 rounded-2xl border ${cardBg} flex items-center justify-between transition-colors`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${avatarBg} flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs`}>
                        {initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-slate-900 text-xs hover:text-rose-600 transition-colors cursor-pointer" onClick={() => setSelectedStudentForDrawer(s)}>
                            {s.name}
                          </p>
                          {badge}
                        </div>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                          Roll: {s.classId}-{s.rollNo} • {getFailingSubjectsNote(s)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`text-xs font-bold border px-2.5 py-1 rounded-full ${scoreBadgeStyle}`}>
                        {s.performanceAvg.toFixed(1)}%
                      </span>

                      <button 
                        onClick={() => setRemedialModalStudent(s)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-semibold shadow-2xs transition-colors cursor-pointer ${btnStyle}`}
                      >
                        {actionText}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

      {/* Student Drawer Portal */}
      {selectedStudentForDrawer && (
        <StudentDrawer 
          student={selectedStudentForDrawer} 
          onClose={() => setSelectedStudentForDrawer(null)} 
        />
      )}

      {/* Remedial Notice Confirmation Modal */}
      {remedialModalStudent && createPortal(
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Assign Remedial / Notify Parent</h3>
              <button onClick={() => setRemedialModalStudent(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-2">
              <p>Student: <strong className="text-slate-900">{remedialModalStudent.name}</strong> (Class {remedialModalStudent.classId})</p>
              <p>Academic Score: <strong className="text-rose-600">{remedialModalStudent.performanceAvg}%</strong></p>
              <p className="text-slate-500 font-mono">Parent Phone: {remedialModalStudent.parentPhone}</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 text-xs font-semibold">
              <button
                onClick={() => setRemedialModalStudent(null)}
                className="px-3.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handleIssueRemedialConfirm(remedialModalStudent.name)}
                className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold"
              >
                Dispatch Alert
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Toast Notification */}
      {toastMessage && createPortal(
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-medium flex items-center gap-2.5 z-50 border border-slate-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>,
        document.body
      )}
    </div>
  );
}