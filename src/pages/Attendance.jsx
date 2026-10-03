import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useFilter } from '../context/FilterContext';
import ClassSelector from '../components/common/ClassSelector';
import StudentDrawer from '../components/common/StudentDrawer';
import { 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, Cell, XAxis, YAxis, 
  Tooltip, CartesianGrid, Legend 
} from 'recharts';
import { 
  ClipboardCheck, UserX, Clock, AlertTriangle, Calendar, Filter, 
  Users, UserCheck, Send, CheckCircle2, ChevronRight, Eye, Phone, Bell
} from 'lucide-react';

const avatarGradients = [
  'from-blue-600 to-indigo-600 text-white',
  'from-emerald-500 to-teal-600 text-white',
  'from-purple-600 to-pink-600 text-white',
  'from-amber-500 to-orange-600 text-white',
  'from-cyan-500 to-blue-600 text-white',
  'from-rose-500 to-red-600 text-white'
];

const getAvatarGradient = (id) => {
  const num = parseInt(String(id).replace(/\D/g, '')) || 0;
  return avatarGradients[num % avatarGradients.length];
};

const getInitials = (name) => {
  if (!name) return 'ST';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

export default function Attendance() {
  const { getFilteredData, selectedClassId, classesList, students: allStudents } = useFilter();
  const filteredData = getFilteredData();
  const { isOverall, scopeText, kpis, students } = filteredData;
  
  const [period, setPeriod] = useState('Week');
  const [viewType, setViewType] = useState('Students');
  const [selectedStudentForDrawer, setSelectedStudentForDrawer] = useState(null);
  const [warningNoticeStudent, setWarningNoticeStudent] = useState(null);
  const [noticeSentToast, setNoticeSentToast] = useState('');

  const trendData = filteredData.attendanceChartData;

  // Dynamically compute class attendance comparison from live student dataset
  const classComparisonData = classesList.map(cls => {
    const clsStudents = allStudents.filter(s => s.classId === cls.id);
    const avgAtt = clsStudents.length > 0 
      ? Math.round(clsStudents.reduce((acc, curr) => acc + curr.attendancePct, 0) / clsStudents.length)
      : 0;
    return { 
      id: cls.id,
      name: cls.id, 
      Attendance: avgAtt,
      studentsCount: clsStudents.length
    };
  });

  const teacherAttendanceData = [
    { name: 'Dr. Ramesh Iyer', role: 'Mathematics Lead', attendancePct: 98, status: 'Present', phone: '+91 98401 22334' },
    { name: 'Mrs. Sunita Sharma', role: 'Physics Dept', attendancePct: 95, status: 'Present', phone: '+91 98112 33445' },
    { name: 'Mr. Rajesh Varma', role: 'Chemistry Senior', attendancePct: 88, status: 'Present', phone: '+91 98765 43210' },
    { name: 'Ms. Meenakshi Sundaram', role: 'English Literature', attendancePct: 71, status: 'Absent', phone: '+91 97123 88990' },
    { name: 'Mr. Vikramaditya Singh', role: 'Computer Science', attendancePct: 99, status: 'Present', phone: '+91 99887 76655' },
    { name: 'Mrs. Ananya Mukhopadhyay', role: 'Biology Lead', attendancePct: 73, status: 'Present', phone: '+91 98334 55667' }
  ];

  const lowAttendanceStudents = students.filter(s => s.attendancePct < 75);
  const lowAttendanceTeachers = teacherAttendanceData.filter(t => t.attendancePct < 75);

  const handleIssueNoticeConfirm = (studentName) => {
    setWarningNoticeStudent(null);
    setNoticeSentToast(`Official Attendance Notice issued to parent of ${studentName}`);
    setTimeout(() => setNoticeSentToast(''), 4000);
  };

  return (
    <div className="space-y-6">
      <ClassSelector />

      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Attendance Analytics</h1>
            <div className="inline-flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              {['Students', 'Teachers'].map(v => (
                <button 
                  key={v} 
                  onClick={() => setViewType(v)} 
                  className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                    viewType === v 
                      ? 'bg-white shadow-xs text-blue-600 font-bold' 
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-1">{scopeText}</p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 p-1.5 rounded-xl text-xs font-semibold shrink-0 overflow-x-auto">
          {[
            { label: 'This Week', value: 'Week' },
            { label: 'This Month', value: 'Month' },
            { label: 'This Term', value: 'Term' }
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setPeriod(item.value)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                period === item.value 
                  ? 'bg-blue-600 text-white font-bold shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 flex items-center justify-center shrink-0">
            <ClipboardCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900 tracking-tight">{viewType === 'Students' ? kpis.attendancePct : '94%'}</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Average Attendance Rate</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 ring-1 ring-rose-100 flex items-center justify-center shrink-0">
            <UserX className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900 tracking-tight">
              {viewType === 'Students' ? (isOverall ? `${students.filter(s => s.status === 'Absent').length || 95} Students` : `${students.filter(s => s.status === 'Absent').length} Students`) : '4 Teachers'}
            </p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Absent Today</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-100 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900 tracking-tight">
              {viewType === 'Students' ? (isOverall ? '26 Students' : '1 Student') : '2 Teachers'}
            </p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Late Arrivals Today</p>
          </div>
        </div>
      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Area Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Attendance Trend ({period}ly)</h3>
              <p className="text-[11px] text-slate-400">Daily average present percentage</p>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
              Active Tracking
            </span>
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
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" stroke="#64748B" tickLine={false} />
                <YAxis domain={[70, 100]} stroke="#64748B" tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                  itemStyle={{ color: '#4ADE80' }}
                />
                <Legend />
                <Area type="monotone" dataKey="Present" stroke="#22C55E" fillOpacity={1} fill="url(#colorPresent)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Class Comparison Bar Chart */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Class Comparison</h3>
              <p className="text-[11px] text-slate-400">Live attendance rate per class</p>
            </div>
            <span className="text-xs text-slate-500 font-semibold bg-slate-100 px-2.5 py-1 rounded-full">
              {classComparisonData.length} Classes
            </span>
          </div>

          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" stroke="#64748B" tickLine={false} interval={0} fontSize={11} />
                <YAxis domain={[50, 100]} stroke="#64748B" tickLine={false} fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                  itemStyle={{ color: '#60A5FA' }}
                  formatter={(val) => [`${val}%`, 'Attendance']}
                  labelFormatter={(label) => `Class ${label}`}
                />
                <Bar dataKey="Attendance" radius={[6, 6, 0, 0]}>
                  {classComparisonData.map((entry) => (
                    <Cell 
                      key={entry.id} 
                      fill={selectedClassId === 'ALL' || selectedClassId === entry.id ? '#2563EB' : '#CBD5E1'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Low Attendance Alert Table (<75%) */}
      {viewType === 'Students' ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Low Attendance Alert (&lt;75%)</h3>
                <p className="text-[11px] text-slate-500">Students requiring immediate parent outreach</p>
              </div>
            </div>
            <span className="text-xs text-rose-700 font-bold bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
              {lowAttendanceStudents.length} Students Flagged
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100 bg-slate-50/80 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-3">Class & Roll</th>
                  <th className="py-3 px-3">Attendance %</th>
                  <th className="py-3 px-3">Parent Contact</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {lowAttendanceStudents.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-slate-400 font-medium">
                      No students currently below 75% attendance in this scope.
                    </td>
                  </tr>
                ) : (
                  lowAttendanceStudents.map((s) => {
                    const initials = getInitials(s.name);
                    const gradient = getAvatarGradient(s.id);

                    return (
                      <tr key={s.id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center font-bold text-xs shrink-0 shadow-xs`}>
                              {initials}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer" onClick={() => setSelectedStudentForDrawer(s)}>
                                {s.name}
                              </p>
                              <p className="text-[11px] text-slate-400">ID: {s.id}</p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <span className="font-semibold text-slate-700">Class {s.classId}</span>
                          <p className="text-[11px] text-slate-400">Roll {s.rollNo}</p>
                        </td>

                        <td className="py-3 px-3">
                          <span className="font-black text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            {s.attendancePct}%
                          </span>
                        </td>

                        <td className="py-3 px-3">
                          <p className="font-medium text-slate-800">{s.parentName || 'Parent / Guardian'}</p>
                          <p className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                            <Phone className="w-3 h-3 text-slate-400" />
                            {s.parentPhone}
                          </p>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedStudentForDrawer(s)}
                              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                            >
                              <Eye className="w-3.5 h-3.5 text-slate-400" />
                              View
                            </button>
                            <button 
                              onClick={() => setWarningNoticeStudent(s)}
                              className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Send className="w-3.5 h-3.5" />
                              Issue Notice
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Low Attendance Teachers (&lt;75%)</h3>
                <p className="text-[11px] text-slate-500">Faculty attendance review & notifications</p>
              </div>
            </div>
            <span className="text-xs text-amber-700 font-bold bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
              {lowAttendanceTeachers.length} Faculty Review
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100 bg-slate-50/80 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Faculty Member</th>
                  <th className="py-3 px-3">Department</th>
                  <th className="py-3 px-3">Attendance</th>
                  <th className="py-3 px-3">Status Today</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {lowAttendanceTeachers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-slate-400 font-medium">
                      All teachers maintain attendance above threshold!
                    </td>
                  </tr>
                ) : (
                  lowAttendanceTeachers.map((t, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">{t.name}</td>
                      <td className="py-3 px-3 text-slate-600 font-medium">{t.role}</td>
                      <td className="py-3 px-3">
                        <span className="font-black text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-full">
                          {t.attendancePct}%
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          t.status === 'Present' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                        }`}>
                          {t.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button 
                          onClick={() => alert(`Official Attendance Reminder sent to ${t.name}`)}
                          className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-semibold text-xs transition-colors cursor-pointer"
                        >
                          Send Reminder
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Student Drawer Portal */}
      {selectedStudentForDrawer && (
        <StudentDrawer 
          student={selectedStudentForDrawer} 
          onClose={() => setSelectedStudentForDrawer(null)} 
        />
      )}

      {/* Warning Notice Confirmation Modal */}
      {warningNoticeStudent && createPortal(
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-scaleUp">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Issue Official Attendance Notice</h3>
                <p className="text-xs text-slate-500">Send warning SMS & Email to parent</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-200/80 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Student Name:</span>
                <span className="font-bold text-slate-900">{warningNoticeStudent.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Class & Roll:</span>
                <span className="font-semibold text-slate-800">Class {warningNoticeStudent.classId} • Roll {warningNoticeStudent.rollNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Current Attendance:</span>
                <span className="font-black text-rose-600">{warningNoticeStudent.attendancePct}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Parent Phone:</span>
                <span className="font-mono font-semibold text-slate-800">{warningNoticeStudent.parentPhone}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              An automated notification will be dispatched to <strong className="text-slate-800">{warningNoticeStudent.parentPhone}</strong> requesting a parent-teacher meeting due to attendance falling below 75%.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setWarningNoticeStudent(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleIssueNoticeConfirm(warningNoticeStudent.name)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                Send Official Notice
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Toast Notification */}
      {noticeSentToast && createPortal(
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-3 z-50 animate-bounceIn border border-slate-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{noticeSentToast}</span>
        </div>,
        document.body
      )}
    </div>
  );
}