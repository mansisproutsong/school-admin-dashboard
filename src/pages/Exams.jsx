import React, { useState } from 'react';
import { useFilter } from '../context/FilterContext';
import ClassSelector from '../components/common/ClassSelector';
import { FileText, Plus, Calendar, Clock, CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Exams() {
  const { selectedClassId, classesList } = useFilter();
  const [showModal, setShowModal] = useState(false);
  const [exams, setExams] = useState([
    { id: 1, title: 'Mid-Term — Mathematics', cls: '10-A', date: 'Oct 12, 2026', time: '9:00 AM - 12:00 PM', status: 'Upcoming' },
    { id: 2, title: 'Mid-Term — Physics', cls: '10-A', date: 'Oct 14, 2026', time: '9:00 AM - 12:00 PM', status: 'Upcoming' },
    { id: 3, title: 'Unit Test — English', cls: '9-B', date: 'Oct 05, 2026', time: '10:00 AM - 11:30 AM', status: 'Upcoming' },
    { id: 4, title: 'Final — Computer Science', cls: '10-B', date: 'Sep 28, 2026', time: '9:00 AM - 12:00 PM', status: 'Completed' },
    { id: 5, title: 'Term 1 — Chemistry Lab', cls: '11-Science', date: 'Oct 18, 2026', time: '1:00 PM - 3:00 PM', status: 'Upcoming' },
    { id: 6, title: 'Mid-Term — Biology', cls: '11-Science', date: 'Oct 20, 2026', time: '10:00 AM - 1:00 PM', status: 'Upcoming' },
    { id: 7, title: 'Unit Test — History', cls: '8-A', date: 'Oct 22, 2026', time: '9:00 AM - 10:30 AM', status: 'Upcoming' },
    { id: 8, title: 'Final — Accountancy', cls: '12-Commerce', date: 'Sep 25, 2026', time: '9:00 AM - 12:00 PM', status: 'Completed' },
    { id: 9, title: 'Term 1 — Geography', cls: '9-A', date: 'Oct 25, 2026', time: '11:00 AM - 1:00 PM', status: 'Upcoming' },
    { id: 10, title: 'Mid-Term — Economics', cls: '11-Commerce', date: 'Oct 28, 2026', time: '9:00 AM - 12:00 PM', status: 'Upcoming' },
  ]);

  const [newExam, setNewExam] = useState({
    title: '',
    cls: selectedClassId === 'ALL' ? '10-A' : selectedClassId,
    date: 'Oct 20, 2026',
    time: '9:00 AM - 12:00 PM',
    status: 'Upcoming'
  });

  const handleScheduleExam = (e) => {
    e.preventDefault();
    if (!newExam.title.trim()) return;
    setExams([{ id: Date.now(), ...newExam }, ...exams]);
    setShowModal(false);
    setNewExam({ title: '', cls: selectedClassId === 'ALL' ? '10-A' : selectedClassId, date: 'Oct 20, 2026', time: '9:00 AM - 12:00 PM', status: 'Upcoming' });
  };

  const filteredExams = selectedClassId === 'ALL'
    ? exams
    : exams.filter(e => e.cls === selectedClassId);

  return (
    <div className="space-y-6">
      <ClassSelector />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-ink">Exam Schedules & Evaluation</h1>
          <p className="text-xs text-muted mt-0.5">
            {selectedClassId === 'ALL' ? 'Showing all upcoming and completed exams across institution' : `Exams scheduled for Class ${selectedClassId}`}
          </p>
        </div>

        <button 
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-btn hover:bg-blue-700 shrink-0 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Schedule Exam
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExams.map((ex) => (
          <div key={ex.id} className="bg-white rounded-card border border-line p-5 shadow-soft space-y-3 hover:border-primary/50 transition-all">
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
              <p className="text-[11px] text-muted flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3 text-primary" /> {ex.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Exam Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-ink/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-card w-full max-w-md p-6 space-y-4 shadow-xl border border-line">
            <div className="flex justify-between items-center border-b border-line pb-3">
              <h3 className="font-bold text-ink text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> Schedule New Examination
              </h3>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-muted hover:text-ink" /></button>
            </div>

            <form onSubmit={handleScheduleExam} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-muted">Exam Name / Subject</label>
                <input 
                  required 
                  type="text" 
                  value={newExam.title} 
                  onChange={(e) => setNewExam({...newExam, title: e.target.value})} 
                  placeholder="e.g. Mid-Term — Science" 
                  className="w-full mt-1 p-2.5 border border-line rounded-inp focus:outline-none" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-muted">Target Class</label>
                  <select 
                    value={newExam.cls} 
                    onChange={(e) => setNewExam({...newExam, cls: e.target.value})}
                    className="w-full mt-1 p-2.5 border border-line rounded-inp"
                  >
                    {classesList.map(c => (
                      <option key={c.id} value={c.id}>Class {c.id}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-muted">Date</label>
                  <input 
                    type="text" 
                    value={newExam.date} 
                    onChange={(e) => setNewExam({...newExam, date: e.target.value})} 
                    placeholder="Oct 24, 2026" 
                    className="w-full mt-1 p-2.5 border border-line rounded-inp" 
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-muted">Timing & Duration</label>
                <input 
                  type="text" 
                  value={newExam.time} 
                  onChange={(e) => setNewExam({...newExam, time: e.target.value})} 
                  placeholder="9:00 AM - 12:00 PM" 
                  className="w-full mt-1 p-2.5 border border-line rounded-inp" 
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-line">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-btn">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white font-bold rounded-btn">Schedule Exam</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}