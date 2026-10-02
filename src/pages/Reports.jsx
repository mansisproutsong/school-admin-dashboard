import React from 'react';
import { useFilter } from '../context/FilterContext';
import ClassSelector from '../components/common/ClassSelector';
import { FileText, Download, Users, ClipboardCheck, Award, Wallet, Briefcase, Building2 } from 'lucide-react';
import { teachersList } from '../data/mockData';

export default function Reports() {
  const { getFilteredData, selectedClassId, classesList } = useFilter();
  const { students } = getFilteredData();

  const handleExportCSV = (reportType) => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    let headers = '';
    let rows = '';

    if (reportType === 'Student Report') {
      headers = 'Student ID,Name,Class,Roll No,Parent Name,Parent Phone\n';
      students.forEach(s => {
        rows += `${s.id},${s.name},${s.classId},${s.rollNo},${s.parentName},${s.parentPhone}\n`;
      });
    } else if (reportType === 'Attendance Report') {
      headers = 'Student ID,Name,Class,Roll No,Attendance %,Status\n';
      students.forEach(s => {
        rows += `${s.id},${s.name},${s.classId},${s.rollNo},${s.attendancePct},${s.status}\n`;
      });
    } else if (reportType === 'Academic/Result Report') {
      headers = 'Student ID,Name,Class,Roll No,Performance Avg (%)\n';
      students.forEach(s => {
        rows += `${s.id},${s.name},${s.classId},${s.rollNo},${s.performanceAvg}\n`;
      });
    } else if (reportType === 'Fees Report') {
      headers = 'Student ID,Name,Class,Roll No,Fee Amount,Fee Status\n';
      students.forEach(s => {
        rows += `${s.id},${s.name},${s.classId},${s.rollNo},${s.feeAmount},${s.feeStatus}\n`;
      });
    } else if (reportType === 'Teacher/Staff Report') {
      headers = 'Teacher ID,Name,Department,Classes Assigned,Phone,Status\n';
      teachersList.forEach(t => {
        rows += `${t.id},${t.name},${t.department},"${t.classes}",${t.phone},${t.status}\n`;
      });
    } else if (reportType === 'Class-wise Report') {
      headers = 'Class ID,Teacher,Room,Capacity,Enrolled,Attendance %,Avg Score,Fee Collection %\n';
      const classesToExport = selectedClassId === 'ALL' ? classesList : classesList.filter(c => c.id === selectedClassId);
      classesToExport.forEach(c => {
        rows += `${c.id},${c.teacher},${c.room},${c.capacity},${c.studentCount},${c.attendancePct},${c.avgScore},${c.feeCollectionPct}\n`;
      });
    }

    if (!rows) return alert('No data to export.');
    
    csvContent += headers + rows;
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${reportType.replace(/[\/\s]+/g, '_').toLowerCase()}_${selectedClassId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reportCards = [
    { title: 'Student Report', desc: 'Total students, class-wise students', icon: <Users className="w-5 h-5 text-primary" /> },
    { title: 'Attendance Report', desc: 'Overall and class-wise attendance', icon: <ClipboardCheck className="w-5 h-5 text-success" /> },
    { title: 'Academic/Result Report', desc: 'Class and subject-wise performance', icon: <Award className="w-5 h-5 text-purple-500" /> },
    { title: 'Fees Report', desc: 'Paid, pending, and overdue fees', icon: <Wallet className="w-5 h-5 text-warning" /> },
    { title: 'Teacher/Staff Report', desc: 'Staff and teacher information', icon: <Briefcase className="w-5 h-5 text-blue-500" /> },
    { title: 'Class-wise Report', desc: 'Selected class overview and statistics', icon: <Building2 className="w-5 h-5 text-emerald-500" /> },
  ];

  return (
    <div className="space-y-6">
      <ClassSelector />

      <div>
        <h1 className="text-xl font-bold text-ink">Institutional & Class Reports</h1>
        <p className="text-xs text-muted mt-0.5">Generate and download official CSV reports</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportCards.map((r, i) => (
          <div key={i} className="bg-white p-5 rounded-card border border-line shadow-soft space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-10 h-10 rounded-btn bg-slate-50 border border-line flex items-center justify-center shrink-0">
                {r.icon}
              </span>
              <div>
                <h3 className="font-bold text-sm text-ink">{r.title}</h3>
                <p className="text-[11px] text-muted mt-0.5">{r.desc}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-line">
              <button 
                onClick={() => handleExportCSV(r.title)}
                className="w-full text-xs font-semibold py-2 rounded-btn bg-primary text-white hover:bg-blue-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Export CSV
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
