import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useFilter } from '../context/FilterContext';
import { teachers } from '../data/teachers';
import { timetable as initialTimetable } from '../data/timetable';
import ClassSelector from '../components/common/ClassSelector';
import CustomSelect from '../components/common/CustomSelect';
import { 
  Calendar, BookOpen, Users, ShieldCheck, Plus, Printer, 
  MapPin, Clock, Pencil, Trash2, CheckCircle2, X, Download, 
  Filter, Sparkles, AlertCircle, Eye, ChevronRight
} from 'lucide-react';

export default function Subjects() {
  const { selectedClassId, setSelectedClassId, classesList, students } = useFilter();
  const [viewType, setViewType] = useState('Timetable'); // 'Subjects' | 'Timetable'
  const [ttView, setTtView] = useState('Class'); // 'Class' | 'Teacher'
  
  // Active Filter states
  const [filterClass, setFilterClass] = useState(selectedClassId === 'ALL' ? '8-A' : selectedClassId);
  const [filterTeacher, setFilterTeacher] = useState('T001');

  // Sync filterClass when global ClassSelector changes
  useEffect(() => {
    if (selectedClassId !== 'ALL') {
      setFilterClass(selectedClassId);
    }
  }, [selectedClassId]);

  // Timetable State
  const [timetableData, setTimetableData] = useState(initialTimetable);

  // Modal states
  const [showAddSlotModal, setShowAddSlotModal] = useState(false);
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Form states
  const [newSlot, setNewSlot] = useState({
    day: 'Monday',
    period: 1,
    subject: 'Mathematics',
    teacherName: 'Dr. Priya Sharma',
    room: 'Room 204'
  });

  const [newSubject, setNewSubject] = useState({
    name: '',
    code: '',
    leadTeacher: '',
    creditHours: '4'
  });

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const periodHeaderMap = [
    { num: 1, title: 'PERIOD 1', time: '8:00 - 8:45 am' },
    { num: 2, title: 'PERIOD 2', time: '8:45 - 9:30 am' },
    { num: 3, title: 'PERIOD 3', time: '9:45 - 10:30 am' },
    { num: 4, title: 'PERIOD 4', time: '10:30 - 11:15 am' },
    { num: 5, title: 'PERIOD 5', time: '11:15 - 12:00 pm' },
    { isRecess: true, title: 'RECESS', time: '12:00 - 12:30 pm' },
    { num: 6, title: 'PERIOD 6', time: '12:30 - 1:15 pm' },
    { num: 7, title: 'PERIOD 7', time: '1:15 - 2:00 pm' },
  ];

  // Dynamic KPI Metrics calculations based on selected filter scope
  const metrics = useMemo(() => {
    let activeEntries = [];
    if (ttView === 'Class') {
      activeEntries = timetableData.filter(t => t.classId === filterClass);
    } else {
      activeEntries = timetableData.filter(t => t.teacherId === filterTeacher);
    }

    const totalWeeklySlots = activeEntries.length;
    const uniqueSubjects = new Set(activeEntries.map(t => t.subject)).size;
    
    let uniqueTeachers = 0;
    if (ttView === 'Class') {
      uniqueTeachers = new Set(activeEntries.map(t => t.teacherName || t.teacherId)).size;
    } else {
      uniqueTeachers = 1;
    }

    // Schedule Conflict Verification check
    const slotMap = new Map();
    let conflicts = 0;
    timetableData.forEach(t => {
      const key = `${t.teacherId}_${t.day}_${t.period}`;
      if (slotMap.has(key)) {
        conflicts++;
      } else {
        slotMap.set(key, true);
      }
    });

    return {
      weeklySlots: totalWeeklySlots > 0 ? `${totalWeeklySlots} Periods Planned` : '42 Periods Planned',
      coreSubjectsCount: `${uniqueSubjects || 8} Subject Modules`,
      facultyCount: `${uniqueTeachers || 7} Lead Teachers`,
      conflictsCount: conflicts === 0 ? 'Zero Class Conflicts' : `${conflicts} Schedule Conflict`
    };
  }, [ttView, filterClass, filterTeacher, timetableData]);

  // Color mapping for subject cards matching screenshot
  const getSubjectCardStyle = (subject) => {
    if (!subject) return 'bg-slate-50 border-slate-200 text-slate-400';
    const s = subject.toLowerCase();

    if (s.includes('social') || s.includes('history') || s.includes('geography')) {
      return 'bg-emerald-50/90 border-emerald-200/90 text-emerald-950 hover:bg-emerald-100/90 shadow-2xs';
    }
    if (s.includes('gujarati') || s.includes('hindi') || s.includes('sanskrit')) {
      return 'bg-amber-50/90 border-amber-200/90 text-amber-950 hover:bg-amber-100/90 shadow-2xs';
    }
    if (s.includes('computer') || s.includes('it') || s.includes('code')) {
      return 'bg-cyan-50/90 border-cyan-200/90 text-cyan-950 hover:bg-cyan-100/90 shadow-2xs';
    }
    if (s.includes('science') || s.includes('physics') || s.includes('chem') || s.includes('bio')) {
      return 'bg-blue-50/90 border-blue-200/90 text-blue-950 hover:bg-blue-100/90 shadow-2xs';
    }
    if (s.includes('math') || s.includes('algebra')) {
      return 'bg-indigo-50/90 border-indigo-200/90 text-indigo-950 hover:bg-indigo-100/90 shadow-2xs';
    }
    if (s.includes('english')) {
      return 'bg-rose-50/90 border-rose-200/90 text-rose-950 hover:bg-rose-100/90 shadow-2xs';
    }
    if (s.includes('physical') || s.includes('pe') || s.includes('sports')) {
      return 'bg-lime-50/90 border-lime-200/90 text-lime-950 hover:bg-lime-100/90 shadow-2xs';
    }
    return 'bg-purple-50/90 border-purple-200/90 text-purple-950 hover:bg-purple-100/90 shadow-2xs';
  };

  const getEntry = (day, periodNum) => {
    if (ttView === 'Class') {
      return timetableData.find(t => t.classId === filterClass && t.day === day && t.period === periodNum);
    } else {
      return timetableData.find(t => t.teacherId === filterTeacher && t.day === day && t.period === periodNum);
    }
  };

  // Unique Subjects list computed dynamically
  const subjectsList = useMemo(() => {
    const validEntries = timetableData.filter(t => t.subject !== 'Activity' && t.subject !== 'Library');
    const names = Array.from(new Set(validEntries.map(t => t.subject)));

    return names.map((name, i) => {
      const assignedTeachers = teachers.filter(t => t.subject === name).map(t => t.name).join(', ') || 'Lead Faculty';
      const assignedClasses = Array.from(new Set(timetableData.filter(t => t.subject === name).map(t => t.classId))).join(', ');
      const periodCount = timetableData.filter(t => t.subject === name).length;
      return { 
        id: i, 
        name, 
        code: name.substring(0, 3).toUpperCase() + '-101', 
        teacher: assignedTeachers, 
        classes: assignedClasses || 'All Classes',
        periods: periodCount
      };
    });
  }, [timetableData]);

  const selectedTeacherObj = teachers.find(t => t.id === filterTeacher);

  const handlePrint = () => {
    window.print();
  };

  const handleCreateSlot = (e) => {
    e.preventDefault();
    const newEntry = {
      id: `TT_${Date.now()}`,
      classId: filterClass,
      day: newSlot.day,
      period: Number(newSlot.period),
      time: '8:00 - 8:45',
      subject: newSlot.subject,
      teacherId: 'T001',
      teacherName: newSlot.teacherName,
      room: newSlot.room
    };
    setTimetableData(prev => [...prev, newEntry]);
    setShowAddSlotModal(false);
    triggerToast(`Added ${newSlot.subject} slot for Class ${filterClass} on ${newSlot.day}`);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Global Class Scope Selector */}
      <ClassSelector />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">Academic & Timetable</h1>
            <div className="inline-flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              {['Subjects', 'Timetable'].map(v => (
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
          <p className="text-xs text-slate-500 mt-1">
            Weekly class schedule, subject allocations, and faculty assignments
          </p>
        </div>

        <button 
          onClick={() => viewType === 'Timetable' ? setShowAddSlotModal(true) : setShowAddSubjectModal(true)}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          {viewType === 'Timetable' ? 'Schedule Activity' : 'Add Subject'}
        </button>
      </div>

      {/* 4 Metric Cards (Dynamic Fetch) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-all flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 flex items-center justify-center shrink-0">
            <Calendar className="w-5.5 h-5.5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">WEEKLY SLOTS</p>
            <p className="text-base font-black text-slate-900 mt-0.5">{metrics.weeklySlots}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-all flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 ring-1 ring-purple-100 flex items-center justify-center shrink-0">
            <BookOpen className="w-5.5 h-5.5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CORE SUBJECTS</p>
            <p className="text-base font-black text-slate-900 mt-0.5">{metrics.coreSubjectsCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-all flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-100 flex items-center justify-center shrink-0">
            <Users className="w-5.5 h-5.5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">FACULTY ASSIGNED</p>
            <p className="text-base font-black text-slate-900 mt-0.5">{metrics.facultyCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-all flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5.5 h-5.5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">VERIFICATION</p>
            <p className="text-base font-black text-emerald-700 mt-0.5">{metrics.conflictsCount}</p>
          </div>
        </div>
      </div>

      {/* Main View Area */}
      {viewType === 'Timetable' ? (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Segment Toggle */}
              <div className="inline-flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                {['Class', 'Teacher'].map(v => (
                  <button 
                    key={v} 
                    onClick={() => setTtView(v)} 
                    className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                      ttView === v 
                        ? 'bg-white shadow-xs text-blue-600 font-bold' 
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {v} View
                  </button>
                ))}
              </div>

              {/* Class / Teacher Selector */}
              {ttView === 'Class' ? (
                <CustomSelect
                  value={filterClass}
                  onChange={(val) => {
                    setFilterClass(val);
                    setSelectedClassId(val);
                  }}
                  options={classesList.map(c => {
                    const studentCount = students.filter(s => s.classId === c.id).length;
                    return {
                      value: c.id,
                      label: `Class ${c.name} (${studentCount} Students)`
                    };
                  })}
                  menuWidth="w-64"
                />
              ) : (
                <CustomSelect
                  value={filterTeacher}
                  onChange={setFilterTeacher}
                  options={teachers.map(t => ({
                    value: t.id,
                    label: `${t.name} (${t.subject})`
                  }))}
                  menuWidth="w-72"
                />
              )}

              {/* Term badge */}
              <span className="inline-flex items-center gap-1.5 bg-slate-50 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Term 1 • Week 42
              </span>
            </div>

            {/* Print & Add Slot Actions */}
            <div className="flex items-center gap-2.5">
              <button 
                onClick={handlePrint}
                className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                Print
              </button>

              <button 
                onClick={() => setShowAddSlotModal(true)}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Slot
              </button>
            </div>
          </div>

          {/* Teacher Info Card if Teacher View */}
          {ttView === 'Teacher' && selectedTeacherObj && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xl font-bold shadow-md shrink-0">
                  {selectedTeacherObj.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">{selectedTeacherObj.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedTeacherObj.email} • {selectedTeacherObj.phone}</p>
                  <span className="inline-block mt-1.5 text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                    Lead Faculty - {selectedTeacherObj.subject}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 w-full sm:w-auto text-center">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Weekly Slots</p>
                  <p className="text-base font-black text-slate-900 mt-0.5">
                    {timetableData.filter(t => t.teacherId === filterTeacher).length} Periods
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Department</p>
                  <p className="text-xs font-bold text-blue-600 mt-1.5">{selectedTeacherObj.subject}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Status</p>
                  <p className="text-xs font-bold text-emerald-600 mt-1.5">Active</p>
                </div>
              </div>
            </div>
          )}

          {/* Timetable Grid Matrix */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse min-w-[1100px]">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold text-[10px] uppercase tracking-wider">
                    <th className="py-3.5 px-4 text-left border-r border-slate-200 w-28 bg-slate-100/60 sticky left-0 z-10">
                      DAY / TIME
                    </th>
                    {periodHeaderMap.map((p) => (
                      p.isRecess ? (
                        <th key="recess" className="py-3.5 px-2 text-center w-16 bg-slate-100/90 border-r border-slate-200 text-slate-400">
                          RECESS
                        </th>
                      ) : (
                        <th key={p.num} className="py-3 px-3 text-center border-r border-slate-200/80 w-36">
                          <div className="font-extrabold text-slate-800">{p.title}</div>
                          <div className="text-[10px] text-slate-400 font-medium lowercase mt-0.5">{p.time}</div>
                        </th>
                      )
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/80">
                  {days.map((day) => (
                    <tr key={day} className="hover:bg-slate-50/50 transition-colors group">
                      {/* Day Column */}
                      <td className="py-4 px-4 font-bold text-slate-800 border-r border-slate-200 bg-slate-50/80 group-hover:bg-slate-100/80 sticky left-0 z-10 text-xs">
                        {day}
                      </td>

                      {/* Periods Slots */}
                      {periodHeaderMap.map((p) => {
                        if (p.isRecess) {
                          return (
                            <td key="recess-cell" className="bg-slate-50/80 border-r border-slate-200 text-center py-2 px-1 relative">
                              <div className="h-full flex items-center justify-center">
                                <span className="rotate-90 text-[10px] font-black tracking-widest text-slate-400 uppercase select-none opacity-60">
                                  BREAK
                                </span>
                              </div>
                            </td>
                          );
                        }

                        const entry = getEntry(day, p.num);
                        const cardStyle = entry ? getSubjectCardStyle(entry.subject) : 'bg-slate-50/40 border-dashed border-slate-200';

                        return (
                          <td key={p.num} className="p-2 border-r border-slate-200/80 align-top h-24">
                            {entry ? (
                              <div className={`h-full p-2.5 rounded-xl border transition-all duration-150 flex flex-col justify-between cursor-pointer ${cardStyle}`}>
                                <div>
                                  <p className="font-bold text-xs leading-snug tracking-tight">
                                    {ttView === 'Class' ? entry.subject : `Class ${entry.classId}`}
                                  </p>
                                  <p className="text-[11px] font-medium opacity-80 mt-0.5 line-clamp-1">
                                    {ttView === 'Class' ? entry.teacherName : entry.subject}
                                  </p>
                                </div>
                                <div className="text-[10px] font-semibold opacity-75 mt-1.5 flex items-center gap-1">
                                  <MapPin className="w-3 h-3 shrink-0" />
                                  <span className="truncate">{entry.room}</span>
                                </div>
                              </div>
                            ) : (
                              <div 
                                onClick={() => {
                                  setNewSlot(prev => ({ ...prev, day, period: p.num }));
                                  setShowAddSlotModal(true);
                                }}
                                className="h-full rounded-xl border border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 flex items-center justify-center text-slate-300 hover:text-blue-600 transition-all cursor-pointer group/add"
                              >
                                <Plus className="w-4 h-4 opacity-0 group-hover/add:opacity-100 transition-opacity" />
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Subjects Grid View */
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Curriculum & Subject Modules</h3>
              <p className="text-xs text-slate-500">Active subjects across secondary and senior wings ({subjectsList.length} Total)</p>
            </div>
            <button
              onClick={() => setShowAddSubjectModal(true)}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Subject Module
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjectsList.map((sub) => {
              const cardStyle = getSubjectCardStyle(sub.name);

              return (
                <div key={sub.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-xs ${cardStyle}`}>
                        {sub.code.substring(0, 3)}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{sub.name}</h4>
                        <p className="text-xs text-slate-400 font-mono">{sub.code}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                      {sub.periods} Weekly Slots
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Assigned Faculty:</span>
                      <span className="font-bold text-slate-800 truncate max-w-[160px]">{sub.teacher}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Target Classes:</span>
                      <span className="font-semibold text-slate-700 truncate max-w-[160px]">{sub.classes}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-100">
                    <button 
                      onClick={() => triggerToast(`Editing subject module ${sub.name}`)}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5 text-slate-400" />
                      Edit
                    </button>
                    <button 
                      onClick={() => triggerToast(`Archived subject module ${sub.name}`)}
                      className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Slot Modal */}
      {showAddSlotModal && createPortal(
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Add Timetable Slot</h3>
              <button onClick={() => setShowAddSlotModal(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSlot} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Class</label>
                <input 
                  type="text" 
                  value={`Class ${filterClass}`} 
                  disabled 
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Day</label>
                  <select 
                    value={newSlot.day} 
                    onChange={e => setNewSlot({ ...newSlot, day: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800 bg-white"
                  >
                    {days.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Period Number</label>
                  <select 
                    value={newSlot.period} 
                    onChange={e => setNewSlot({ ...newSlot, period: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800 bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map(p => <option key={p} value={p}>Period {p}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                <select 
                  value={newSlot.subject} 
                  onChange={e => setNewSlot({ ...newSlot, subject: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800 bg-white"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="Social Studies">Social Studies</option>
                  <option value="English">English</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Gujarati">Gujarati</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Physical Education">Physical Education</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Assigned Teacher</label>
                <input 
                  type="text" 
                  value={newSlot.teacherName} 
                  onChange={e => setNewSlot({ ...newSlot, teacherName: e.target.value })}
                  placeholder="Faculty Name" 
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Room / Lab Location</label>
                <input 
                  type="text" 
                  value={newSlot.room} 
                  onChange={e => setNewSlot({ ...newSlot, room: e.target.value })}
                  placeholder="e.g. Room 204 or Bio Lab 1" 
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800 bg-white"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddSlotModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm"
                >
                  Save Timetable Slot
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* Add Subject Modal */}
      {showAddSubjectModal && createPortal(
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Add New Subject Module</h3>
              <button onClick={() => setShowAddSubjectModal(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              setShowAddSubjectModal(false);
              triggerToast(`Created subject module ${newSubject.name}`);
            }} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject Name</label>
                <input 
                  type="text" 
                  value={newSubject.name} 
                  onChange={e => setNewSubject({ ...newSubject, name: e.target.value })}
                  placeholder="e.g. Artificial Intelligence" 
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject Code</label>
                <input 
                  type="text" 
                  value={newSubject.code} 
                  onChange={e => setNewSubject({ ...newSubject, code: e.target.value })}
                  placeholder="e.g. AI-101" 
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800 bg-white"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddSubjectModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm"
                >
                  Create Subject
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