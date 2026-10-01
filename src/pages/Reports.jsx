import React from 'react';
import { useFilter } from '../context/FilterContext';
import ClassSelector from '../components/common/ClassSelector';
import { FileBarChart, Download, FileText } from 'lucide-react';

export default function Reports() {
  const { selectedClassId } = useFilter();

  const handleExport = (reportName, format) => {
    alert(`[MOCK EXPORT] ${reportName} for ${selectedClassId === 'ALL' ? 'Entire School' : 'Class ' + selectedClassId} downloaded as ${format}!`);
  };

  const reportCards = [
    { title: 'Attendance Analytics Report', desc: 'Detailed monthly student & class presence breakdown' },
    { title: 'Academic Performance Report', desc: 'Subject averages, pass percentages, and rank lists' },
    { title: 'Fee Collection Ledger Report', desc: 'Paid, pending, and overdue collection statements' },
    { title: 'Teacher & Staff Workload Report', desc: 'Assigned subject hours and department coverage' },
  ];

  return (
    <div className="space-y-6">
      <ClassSelector />

      <div>
        <h1 className="text-xl font-bold text-ink">Institutional & Class Reports</h1>
        <p className="text-xs text-muted mt-0.5">Generate and download official CSV and PDF reports</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reportCards.map((r, i) => (
          <div key={i} className="bg-white p-5 rounded-card border border-line shadow-soft space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-10 h-10 rounded-btn bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </span>
              <div>
                <h3 className="font-bold text-sm text-ink">{r.title}</h3>
                <p className="text-xs text-muted mt-0.5">{r.desc}</p>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-line">
              <button 
                onClick={() => handleExport(r.title, 'CSV')}
                className="flex-1 text-xs font-semibold py-2 rounded-btn border border-line hover:bg-slate-50 flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-muted" /> Export CSV
              </button>
              <button 
                onClick={() => handleExport(r.title, 'PDF')}
                className="flex-1 text-xs font-semibold py-2 rounded-btn bg-primary text-white hover:bg-blue-700 flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
