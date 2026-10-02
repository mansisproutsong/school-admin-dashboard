import React, { useState } from 'react';
import { useFilter } from '../context/FilterContext';
import { teachers } from '../data/teachers';
import { timetable } from '../data/timetable';
import { BookOpen, Plus, Trash2, Pencil, X, Filter, Download } from 'lucide-react';

export default function Subjects() {
  const { selectedClassId, classesList } = useFilter();
  const [viewType, setViewType] = useState('Timetable');
  const [ttView, setTtView] = useState('Class');
  
  // Timetable Filters
  const [filterClass, setFilterClass] = useState(selectedClassId === 'ALL' ? '8-A' : selectedClassId);
  const [filterTeacher, setFilterTeacher] = useState('T001');

  // Subjects view state
  const [showModal, setShowModal] = useState(false);
  const [newSub, setNewSub] = useState({ name: '', code: '', teacher: '', classes: '10-A' });

  // Get unique subjects
  const subjectsList = Array.from(new Set(timetable.filter(t => t.subject !== 'Activity' && t.subject !== 'Library').map(t => t.subject))).map((name, i) => {
      const ts = teachers.filter(t => t.subject === name).map(t => t.name).join(', ');
      const cls = Array.from(new Set(timetable.filter(t => t.subject === name).map(t => t.classId))).join(', ');
      return { id: i, name, code: name.substring(0,3).toUpperCase() + '-101', teacher: ts, classes: cls };
  });

  const filteredSubjects = selectedClassId === 'ALL' 
    ? subjectsList 
    : subjectsList.filter(s => s.classes.includes(selectedClassId));

  const handleAddSubject = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const periods = [1, 2, 3, 4, 5, 6, 7];
  
  const getEntry = (day, p, fType) => {
      if(fType === 'Class') {
          return timetable.find(t => t.classId === filterClass && t.day === day && t.period === p);
      } else {
          return timetable.find(t => t.teacherId === filterTeacher && t.day === day && t.period === p);
      }
  };

  const selectedTeacherObj = teachers.find(t => t.id === filterTeacher);
  const teacherPeriodsCount = timetable.filter(t => t.teacherId === filterTeacher).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-ink">Academic & Timetable</h1>
            <div className="flex items-center bg-slate-100 p-1 rounded-btn text-xs font-semibold">
              {['Subjects', 'Timetable'].map(v => (
                <button 
                  key={v} 
                  onClick={() => setViewType(v)} 
                  className={`px-3 py-1.5 rounded-md transition-colors ${viewType === v ? 'bg-white shadow-sm text-primary' : 'text-muted hover:text-ink'}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted mt-1">
            {viewType === 'Subjects' 
              ? 'Showing subjects across institution' 
              : 'Weekly class schedule and teacher assignments'}
          </p>
        </div>

        {viewType === 'Subjects' && (
          <button 
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-btn hover:bg-blue-700 shrink-0"
          >
            <Plus className="w-4 h-4" /> Add Subject
          </button>
        )}
      </div>

      {viewType === 'Subjects' ? (
        <div className="bg-white rounded-card border border-line shadow-soft overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-line text-muted font-bold uppercase text-[10px]">
                <th className="py-3 px-5">Subject Name</th>
                <th className="py-3 px-3">Subject Code</th>
                <th className="py-3 px-3">Assigned Teachers</th>
                <th className="py-3 px-3">Assigned Classes</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filteredSubjects.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-5 font-bold text-ink">{s.name}</td>
                  <td className="py-3.5 px-3 text-muted font-medium">{s.code}</td>
                  <td className="py-3.5 px-3 font-medium text-ink max-w-[200px] truncate">{s.teacher}</td>
                  <td className="py-3.5 px-3">
                    <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-semibold">
                      {s.classes.substring(0, 30)}...
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right space-x-2">
                    <button className="p-1.5 text-muted hover:text-primary hover:bg-primary/10 rounded-btn">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-muted hover:text-danger hover:bg-danger/10 rounded-btn">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Timetable Filters */}
          <div className="bg-white p-4 rounded-card border border-line shadow-soft flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-btn text-xs font-semibold">
              {['Class', 'Teacher'].map(v => (
                <button 
                  key={v} 
                  onClick={() => setTtView(v)} 
                  className={`px-4 py-1.5 rounded-md transition-colors ${ttView === v ? 'bg-white shadow-sm text-primary' : 'text-muted hover:text-ink'}`}
                >
                  {v} View
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
                {ttView === 'Class' ? (
                    <select 
                        value={filterClass} 
                        onChange={e => setFilterClass(e.target.value)}
                        className="bg-bg border border-line text-xs font-semibold rounded-inp px-3 py-2 outline-none"
                    >
                        {classesList.map(c => <option key={c.id} value={c.id}>Class {c.id}</option>)}
                    </select>
                ) : (
                    <select 
                        value={filterTeacher} 
                        onChange={e => setFilterTeacher(e.target.value)}
                        className="bg-bg border border-line text-xs font-semibold rounded-inp px-3 py-2 outline-none"
                    >
                        {teachers.map(t => <option key={t.id} value={t.id}>{t.name} ({t.subject})</option>)}
                    </select>
                )}
                
                <button className="inline-flex items-center gap-2 border border-line text-xs font-semibold px-3 py-2 rounded-btn hover:bg-slate-50">
                    <Download className="w-4 h-4 text-muted" /> Export
                </button>
            </div>
          </div>

          {ttView === 'Teacher' && selectedTeacherObj && (
              <div className="bg-white rounded-card border border-line p-5 shadow-soft flex gap-8 items-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold">
                      {selectedTeacherObj.name.charAt(4)}
                  </div>
                  <div>
                      <h3 className="font-bold text-lg text-ink">{selectedTeacherObj.name}</h3>
                      <p className="text-xs text-muted mt-1">{selectedTeacherObj.email} • {selectedTeacherObj.phone}</p>
                  </div>
                  <div className="ml-auto grid grid-cols-3 gap-4 text-center">
                      <div className="bg-slate-50 p-3 rounded-btn border border-line">
                          <p className="text-[10px] text-muted font-bold uppercase">Weekly Periods</p>
                          <p className="text-lg font-bold text-ink mt-1">{teacherPeriodsCount}</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-btn border border-line">
                          <p className="text-[10px] text-muted font-bold uppercase">Subject</p>
                          <p className="text-sm font-bold text-primary mt-1.5">{selectedTeacherObj.subject}</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-btn border border-line">
                          <p className="text-[10px] text-muted font-bold uppercase">Status</p>
                          <p className="text-sm font-bold text-success mt-1.5">{selectedTeacherObj.status}</p>
                      </div>
                  </div>
              </div>
          )}

          <div className="bg-white rounded-card border border-line shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left min-w-[800px]">
                <thead>
                  <tr className="border-b border-line text-muted font-bold uppercase text-[10px]">
                    <th className="py-3 px-5 border-r border-line bg-slate-50 w-24">Day / Time</th>
                    <th className="py-3 px-3 w-32">1: 8:00 - 8:45</th>
                    <th className="py-3 px-3 w-32">2: 8:45 - 9:30</th>
                    <th className="py-3 px-3 w-32">3: 9:45 - 10:30</th>
                    <th className="py-3 px-3 w-32">4: 10:30 - 11:15</th>
                    <th className="py-3 px-3 w-32">5: 11:15 - 12:00</th>
                    <th className="py-3 px-3 bg-slate-50 text-center w-24">Break</th>
                    <th className="py-3 px-3 w-32">6: 12:30 - 1:15</th>
                    <th className="py-3 px-3 w-32">7: 1:15 - 2:00</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {days.map(day => (
                    <tr key={day} className="hover:bg-slate-50 group">
                      <td className="py-3.5 px-5 font-bold text-ink border-r border-line bg-slate-50 group-hover:bg-slate-100">{day}</td>
                      
                      {[1,2,3,4,5].map(p => {
                          const entry = getEntry(day, p, ttView);
                          const getSubjectColor = (subj) => {
                            if (!subj) return 'text-ink';
                            const colors = {
                              'Mathematics': 'text-primary',
                              'Physics': 'text-blue-600',
                              'English': 'text-green-600',
                              'Chemistry': 'text-purple-600',
                              'Computer Science': 'text-orange-600',
                              'Biology': 'text-pink-600',
                              'Accountancy': 'text-indigo-600',
                              'Economics': 'text-rose-600',
                              'Business Studies': 'text-cyan-600',
                              'Social Studies': 'text-teal-600',
                              'Physical Education': 'text-emerald-600',
                              'Hindi': 'text-amber-600',
                              'Gujarati': 'text-amber-600'
                            };
                            return colors[subj] || 'text-ink';
                          };
                          
                          return (
                            <td key={p} className="py-3.5 px-3 border-r border-line/50 relative group/cell">
                                {entry ? (
                                    <>
                                        <div className={`font-bold ${ttView === 'Class' ? getSubjectColor(entry.subject) : 'text-primary'}`}>
                                            {ttView === 'Class' ? entry.subject : 'Class ' + entry.classId}
                                        </div>
                                        <div className="text-[10px] text-muted mt-0.5">{ttView === 'Class' ? entry.teacherName : entry.room}</div>
                                        <button className="absolute top-1.5 right-1.5 opacity-0 group-hover/cell:opacity-100 p-1 bg-white/90 rounded shadow-sm text-muted hover:text-primary transition-opacity">
                                           <Pencil className="w-3 h-3" />
                                        </button>
                                    </>
                                ) : (
                                    <span className="text-muted/50">-</span>
                                )}
                            </td>
                          );
                      })}
                      
                      <td className="py-3.5 px-3 bg-slate-50 text-center font-bold text-muted uppercase text-[10px] tracking-wider border-r border-line">Break</td>
                      
                      {[6,7].map(p => {
                          const entry = getEntry(day, p, ttView);
                          const getSubjectColor = (subj) => {
                            if (!subj) return 'text-ink';
                            const colors = {
                              'Mathematics': 'text-blue-600',
                              'Physics': 'text-purple-600',
                              'Chemistry': 'text-pink-600',
                              'Biology': 'text-emerald-600',
                              'English': 'text-red-600',
                              'Computer Science': 'text-cyan-600',
                              'Accountancy': 'text-indigo-600',
                              'Economics': 'text-amber-600',
                              'Business Studies': 'text-orange-600',
                              'Social Studies': 'text-teal-600',
                              'Physical Education': 'text-lime-600'
                            };
                            return colors[subj] || 'text-ink';
                          };
                          
                          return (
                            <td key={p} className="py-3.5 px-3 border-r border-line/50">
                                {entry ? (
                                    <>
                                        <div className={`font-bold ${ttView === 'Class' ? getSubjectColor(entry.subject) : 'text-primary'}`}>
                                            {ttView === 'Class' ? entry.subject : 'Class ' + entry.classId}
                                        </div>
                                        <div className="text-[10px] text-muted mt-0.5">{ttView === 'Class' ? entry.teacherName : entry.room}</div>
                                    </>
                                ) : (
                                    <span className="text-muted/50">-</span>
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
      )}
    </div>
  );
}