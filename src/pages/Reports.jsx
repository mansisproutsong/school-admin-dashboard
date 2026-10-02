import React from 'react';
import { useFilter } from '../context/FilterContext';
import ClassSelector from '../components/common/ClassSelector';
import { FileText, Download, Users, ClipboardCheck, Award, Wallet, Briefcase, Building2 } from 'lucide-react';
import { teachers } from '../data/teachers';

export default function Reports() {
  const { getFilteredData, selectedClassId, classesList } = useFilter();
  const { students } = getFilteredData();

  const handleExportCSV = (reportType) => {
    let headers = '';
    let rows = '';

    if (reportType === 'Student Report') {
      headers = 'Student ID,Name,Class,Roll No,Parent Name,Parent Phone\n';
      students.forEach(s => { rows += `${s.id},${s.name},${s.classId},${s.rollNo},${s.parentName},${s.parentPhone}\n`; });
    } else if (reportType === 'Attendance Report') {
      headers = 'Student ID,Name,Class,Roll No,Attendance %,Status\n';
      students.forEach(s => { rows += `${s.id},${s.name},${s.classId},${s.rollNo},${s.attendancePct},${s.status}\n`; });
    } else if (reportType === 'Academic Report') {
      headers = 'Student ID,Name,Class,Roll No,Performance Avg (%)\n';
      students.forEach(s => { rows += `${s.id},${s.name},${s.classId},${s.rollNo},${s.performanceAvg}\n`; });
    } else if (reportType === 'Fees Report') {
      headers = 'Student ID,Name,Class,Roll No,Fee Amount,Fee Status\n';
      students.forEach(s => { rows += `${s.id},${s.name},${s.classId},${s.rollNo},${s.feeAmount},${s.feeStatus}\n`; });
    } else if (reportType === 'Teacher Report') {
      headers = 'Teacher ID,Name,Department,Subject,Classes Assigned,Phone\n';
      teachers.forEach(t => { rows += `${t.id},${t.name},${t.department},${t.subject},"${t.assignedClasses.join(', ')}",${t.phone}\n`; });
    } else if (reportType === 'Class-wise Report') {
      headers = 'Class ID,Teacher,Room,Capacity,Enrolled,Attendance %,Avg Score,Fee Collection %\n';
      const classesToExport = selectedClassId === 'ALL' ? classesList : classesList.filter(c => c.id === selectedClassId);
      classesToExport.forEach(c => { rows += `${c.id},${c.teacher},${c.room},${c.capacity},${c.studentCount},${c.attendancePct},${c.avgScore},${c.feeCollectionPct}\n`; });
    }

    if (!rows) return alert('No data to export.');
    const csvContent = 'data:text/csv;charset=utf-8,' + headers + rows;
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `${reportType.replace(/[\/\s]+/g, '_').toLowerCase()}_${selectedClassId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reportCards = [
    { title: 'Student Report',    desc: 'Name, roll no., class, parent contact',     icon: <Users className="w-5 h-5 text-primary" />,     accent: 'text-primary',      count: students.length },
    { title: 'Attendance Report', desc: 'Overall and class-wise attendance records',  icon: <ClipboardCheck className="w-5 h-5 text-success" />, accent: 'text-success',  count: students.filter(s => s.status === 'Regular').length },
    { title: 'Academic Report',   desc: 'Class and subject-wise performance data',    icon: <Award className="w-5 h-5 text-indigo-500" />,  accent: 'text-indigo-500',   count: students.filter(s => (s.performanceAvg || 0) >= 75).length },
    { title: 'Fees Report',       desc: 'Paid, pending, and overdue fee ledger',      icon: <Wallet className="w-5 h-5 text-amber-500" />,  accent: 'text-amber-500',    count: students.filter(s => s.feeStatus === 'Paid').length },
    { title: 'Teacher Report',    desc: 'Staff info, departments, class assignments', icon: <Briefcase className="w-5 h-5 text-slate-600" />,accent: 'text-slate-600',   count: teachers.length },
    { title: 'Class-wise Report', desc: 'Selected class overview and statistics',     icon: <Building2 className="w-5 h-5 text-emerald-500" />, accent: 'text-emerald-500', count: classesList.length },
  ];

  return (
    <div className="space-y-6">
      <ClassSelector />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-ink">Institutional Reports</h1>
          <p className="text-xs text-muted mt-0.5">Generate and download official CSV reports for {selectedClassId === 'ALL' ? 'all classes' : `Class ${selectedClassId}`}</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-btn">
          <FileText className="w-3.5 h-3.5" /> CSV Export Ready
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportCards.map((r, i) => (
          <div key={i} className="bg-white rounded-card border border-line shadow-sm p-5 flex flex-col gap-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <span className="w-10 h-10 rounded-lg bg-slate-50 border border-line flex items-center justify-center shrink-0">
                {r.icon}
              </span>
              <div className="flex-1">
                <h3 className="font-bold text-sm text-ink">{r.title}</h3>
                <p className="text-[11px] text-muted mt-0.5 leading-relaxed">{r.desc}</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg px-3 py-2 flex items-center justify-between border border-line">
              <span className="text-xs text-muted font-medium">Records</span>
              <span className={`text-sm font-bold ${r.accent}`}>{r.count}</span>
            </div>

            <button
              onClick={() => handleExportCSV(r.title)}
              className="w-full text-xs font-semibold py-2.5 rounded-btn bg-primary text-white hover:bg-blue-700 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
