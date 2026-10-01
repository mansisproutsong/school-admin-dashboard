import React, { useState } from 'react';
import { useFilter } from '../context/FilterContext';
import ClassSelector from '../components/common/ClassSelector';
import { FileText, Plus, Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Exams() {
  const { selectedClassId } = useFilter();
  const [exams, setExams] = useState([
    { id: 1, title: 'Mid-Term — Mathematics', cls: '10-A', date: 'Oct 12, 2026', time: '9:00 AM', status: 'Upcoming' },
    { id: 2, title: 'Mid-Term — Physics', cls: '10-A', date: 'Oct 14, 2026', status: 'Upcoming' },
    { id: 3, title: 'Unit Test — English', cls: '9-B', date: 'Oct 05, 2026', status: 'Upcoming' },
    { id: 4, title: 'Final — Computer Science', cls: '10-B', date: 'Sep 28, 2026', status: 'Completed' },
  ]);

  const filteredExams = selectedClassId === 'ALL'
    ? exams
    : exams.filter(e => e.cls === selectedClassId);

  return (
    <div className="space-y-6">
      <ClassSelector />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-ink">Exam Schedules</h1>
          <p className="text-xs text-muted mt-0.5">
            {selectedClassId === 'ALL' ? 'Showing all upcoming and completed exams' : `Exams scheduled for Class ${selectedClassId}`}
          </p>
        </div>

        <button 
          onClick={() => alert('Schedule Exam Modal')}
          className="inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-btn hover:bg-blue-700 shrink-0"
        >
          <Plus className="w-4 h-4" /> Schedule Exam
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExams.map((ex) => (
          <div key={ex.id} className="bg-white rounded-card border border-line p-5 shadow-soft space-y-3">
            <div className="flex items-start justify-between">
              <span className="w-10 h-10 rounded-btn bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </span>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                ex.status === 'Completed' ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'
              }`}>
                {ex.status}
              </span>
            </div>
            <div>
              <p className="font-bold text-ink text-sm">{ex.title}</p>
              <p className="text-xs text-muted mt-1">Class {ex.cls} • {ex.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}