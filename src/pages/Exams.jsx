import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useFilter } from '../context/FilterContext';
import ClassSelector from '../components/common/ClassSelector';
import CustomSelect from '../components/common/CustomSelect';
import { 
  FileText, Plus, Calendar, Clock, CheckCircle2, AlertCircle, X, 
  Search, Filter, MapPin, Award, BookOpen, UserCheck, ArrowUpRight, 
  Send, Eye, Download, Printer, Sparkles
} from 'lucide-react';

export default function Exams() {
  const { selectedClassId, classesList } = useFilter();
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'Upcoming' | 'Completed'
  const [toastMessage, setToastMessage] = useState('');

  const [exams, setExams] = useState([
    { id: 1, title: 'Mid-Term — Mathematics', cls: '10-A', date: 'Oct 12, 2026', time: '9:00 AM - 12:00 PM', hall: 'Room 204', marks: 100, supervisor: 'Dr. Priya Sharma', status: 'Upcoming' },
    { id: 2, title: 'Mid-Term — Physics', cls: '10-A', date: 'Oct 14, 2026', time: '9:00 AM - 12:00 PM', hall: 'Phys Lab 1', marks: 100, supervisor: 'Mrs. Sunita Sharma', status: 'Upcoming' },
    { id: 3, title: 'Unit Test — English', cls: '9-B', date: 'Oct 05, 2026', time: '10:00 AM - 11:30 AM', hall: 'Room 102', marks: 50, supervisor: 'Neha Mehta', status: 'Upcoming' },
    { id: 4, title: 'Final — Computer Science', cls: '10-B', date: 'Sep 28, 2026', time: '9:00 AM - 12:00 PM', hall: 'Comp Lab 2', marks: 100, supervisor: 'Mehul Shah', status: 'Completed' },
    { id: 5, title: 'Term 1 — Chemistry Lab', cls: '11-Science', date: 'Oct 18, 2026', time: '1:00 PM - 3:00 PM', hall: 'Chem Lab Block', marks: 50, supervisor: 'Mr. Rajesh Varma', status: 'Upcoming' },
    { id: 6, title: 'Mid-Term — Biology', cls: '11-Science', date: 'Oct 20, 2026', time: '10:00 AM - 1:00 PM', hall: 'Bio Lab 1', marks: 100, supervisor: 'Mrs. Ananya Mukhopadhyay', status: 'Upcoming' },
    { id: 7, title: 'Unit Test — History & Civics', cls: '8-A', date: 'Oct 22, 2026', time: '9:00 AM - 10:30 AM', hall: 'Room 201', marks: 50, supervisor: 'Ayesha Khan', status: 'Upcoming' },
    { id: 8, title: 'Final — Accountancy', cls: '12-Commerce', date: 'Sep 25, 2026', time: '9:00 AM - 12:00 PM', hall: 'Auditorium Hall B', marks: 100, supervisor: 'Nitin Mehta', status: 'Completed' },
    { id: 9, title: 'Term 1 — Geography', cls: '9-A', date: 'Oct 25, 2026', time: '11:00 AM - 1:00 PM', hall: 'Room 302', marks: 80, supervisor: 'Jayesh Patel', status: 'Upcoming' },
    { id: 10, title: 'Mid-Term — Economics', cls: '11-Commerce', date: 'Oct 28, 2026', time: '9:00 AM - 12:00 PM', hall: 'Room 401', marks: 100, supervisor: 'Riya Patel', status: 'Upcoming' },
  ]);

  const [newExam, setNewExam] = useState({
    title: '',
    cls: selectedClassId === 'ALL' ? '10-A' : selectedClassId,
    date: 'Oct 24, 2026',
    time: '9:00 AM - 12:00 PM',
    hall: 'Main Hall',
    marks: 100,
    supervisor: 'Dr. Priya Sharma',
    status: 'Upcoming'
  });

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleScheduleExam = (e) => {
    e.preventDefault();
    if (!newExam.title.trim()) return;
    const created = { id: Date.now(), ...newExam };
    setExams([created, ...exams]);
    setShowModal(false);
    triggerToast(`Scheduled ${newExam.title} for Class ${newExam.cls}`);
    setNewExam({ 
      title: '', 
      cls: selectedClassId === 'ALL' ? '10-A' : selectedClassId, 
      date: 'Oct 24, 2026', 
      time: '9:00 AM - 12:00 PM',
      hall: 'Main Hall',
      marks: 100,
      supervisor: 'Dr. Priya Sharma',
      status: 'Upcoming' 
    });
  };

  // Filtered exams based on class selector, search query, and status filter
  const filteredExams = useMemo(() => {
    return exams.filter((ex) => {
      const matchClass = selectedClassId === 'ALL' || ex.cls === selectedClassId;
      const matchStatus = statusFilter === 'ALL' || ex.status === statusFilter;
      const matchQuery = !searchQuery || 
        ex.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        ex.cls.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.supervisor.toLowerCase().includes(searchQuery.toLowerCase());
      return matchClass && matchStatus && matchQuery;
    });
  }, [exams, selectedClassId, statusFilter, searchQuery]);

  // Dynamic KPI counts
  const kpis = useMemo(() => {
    const total = filteredExams.length;
    const upcoming = filteredExams.filter(e => e.status === 'Upcoming').length;
    const completed = filteredExams.filter(e => e.status === 'Completed').length;
    return { total, upcoming, completed };
  }, [filteredExams]);

  return (
    <div className="space-y-6 pb-8">
      {/* Global Class Scope Selector */}
      <ClassSelector />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">Exam Schedules & Evaluation</h1>
            <span className="text-xs text-blue-700 bg-blue-50 font-bold px-3 py-1 rounded-full border border-blue-100">
              Academic Term 2026–27
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {selectedClassId === 'ALL' 
              ? `Showing institution-wide exam schedules (${filteredExams.length} Total)` 
              : `Showing scheduled assessments for Class ${selectedClassId}`}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => triggerToast("Official Date Sheet PDF export initiated")}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            Print Date Sheet
          </button>

          <button 
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            Schedule Exam
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4.5 shadow-sm hover:shadow-md transition-all flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 flex items-center justify-center shrink-0">
            <FileText className="w-5.5 h-5.5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TOTAL EXAMS</p>
            <p className="text-base font-black text-slate-900 mt-0.5">{kpis.total} Assessments</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4.5 shadow-sm hover:shadow-md transition-all flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-100 flex items-center justify-center shrink-0">
            <Calendar className="w-5.5 h-5.5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">UPCOMING</p>
            <p className="text-base font-black text-slate-900 mt-0.5">{kpis.upcoming} Active Papers</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4.5 shadow-sm hover:shadow-md transition-all flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5.5 h-5.5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">EVALUATED</p>
            <p className="text-base font-black text-slate-900 mt-0.5">{kpis.completed} Results Ready</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4.5 shadow-sm hover:shadow-md transition-all flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 ring-1 ring-purple-100 flex items-center justify-center shrink-0">
            <Award className="w-5.5 h-5.5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ACCURACY AVG</p>
            <p className="text-base font-black text-slate-900 mt-0.5">84.5% Overall</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Status Toggle Pills */}
        <div className="inline-flex bg-slate-100 p-1 rounded-xl text-xs font-semibold w-full sm:w-auto">
          {[
            { label: 'All Exams', value: 'ALL' },
            { label: 'Upcoming', value: 'Upcoming' },
            { label: 'Completed', value: 'Completed' }
          ].map((st) => (
            <button
              key={st.value}
              onClick={() => setStatusFilter(st.value)}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer text-xs ${
                statusFilter === st.value 
                  ? 'bg-white shadow-xs text-blue-600 font-bold' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search exam title, class or faculty..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Exam Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExams.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-400">
            <FileText className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="font-bold text-slate-700 text-sm">No exam schedules found</p>
            <p className="text-xs text-slate-400 mt-1">Try adjusting your scope or status search filter.</p>
          </div>
        ) : (
          filteredExams.map((ex) => (
            <div 
              key={ex.id} 
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 flex items-center justify-center font-bold text-sm shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>

                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                    ex.status === 'Completed' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {ex.status}
                  </span>
                </div>

                {/* Exam Title & Class */}
                <div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                    {ex.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-0.5 rounded-lg text-[11px]">
                      Class {ex.cls}
                    </span>
                    <span className="text-slate-400 text-xs">•</span>
                    <span className="text-xs font-semibold text-slate-500">{ex.marks} Marks</span>
                  </div>
                </div>

                {/* Date & Location Breakdown */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-slate-700 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{ex.date}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-600 font-medium">
                    <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{ex.time}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-600 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{ex.hall}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-500 text-[11px] border-t border-slate-200/60 pt-1.5 mt-1">
                    <UserCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Supervisor: <strong className="text-slate-800">{ex.supervisor}</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button 
                  onClick={() => triggerToast(`Viewing details for ${ex.title}`)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  Details
                </button>
                {ex.status === 'Completed' ? (
                  <button 
                    onClick={() => triggerToast(`Results dossier loaded for ${ex.title}`)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5" />
                    View Marks
                  </button>
                ) : (
                  <button 
                    onClick={() => triggerToast(`Invigilation slip printed for ${ex.title}`)}
                    className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Hall Ticket
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Schedule Exam Modal */}
      {showModal && createPortal(
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Schedule New Examination</h3>
                  <p className="text-xs text-slate-400">Add test date & invigilator details</p>
                </div>
              </div>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleScheduleExam} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Examination Title & Subject</label>
                <input 
                  required 
                  type="text" 
                  value={newExam.title} 
                  onChange={(e) => setNewExam({...newExam, title: e.target.value})} 
                  placeholder="e.g. Mid-Term — Mathematics" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Class</label>
                  <select 
                    value={newExam.cls} 
                    onChange={(e) => setNewExam({...newExam, cls: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800"
                  >
                    {classesList.map(c => (
                      <option key={c.id} value={c.id}>Class {c.id}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Total Marks</label>
                  <input 
                    type="number" 
                    value={newExam.marks} 
                    onChange={(e) => setNewExam({...newExam, marks: Number(e.target.value)})} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Examination Date</label>
                  <input 
                    type="text" 
                    value={newExam.date} 
                    onChange={(e) => setNewExam({...newExam, date: e.target.value})} 
                    placeholder="Oct 24, 2026" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800" 
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Timing & Duration</label>
                  <input 
                    type="text" 
                    value={newExam.time} 
                    onChange={(e) => setNewExam({...newExam, time: e.target.value})} 
                    placeholder="9:00 AM - 12:00 PM" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800" 
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Exam Hall / Lab Location</label>
                <input 
                  type="text" 
                  value={newExam.hall} 
                  onChange={(e) => setNewExam({...newExam, hall: e.target.value})} 
                  placeholder="e.g. Room 204 or Main Auditorium" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800" 
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Lead Supervisor / Invigilator</label>
                <input 
                  type="text" 
                  value={newExam.supervisor} 
                  onChange={(e) => setNewExam({...newExam, supervisor: e.target.value})} 
                  placeholder="Faculty Member Name" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800" 
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)} 
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-colors"
                >
                  Schedule Exam
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* Toast Notification */}
      {toastMessage && createPortal(
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-3 z-50 animate-bounceIn border border-slate-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>,
        document.body
      )}
    </div>
  );
}