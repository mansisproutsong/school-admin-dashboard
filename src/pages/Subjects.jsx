import React, { useState } from 'react';
import { useFilter } from '../context/FilterContext';
import ClassSelector from '../components/common/ClassSelector';
import { BookOpen, Plus, Trash2, Pencil, X } from 'lucide-react';

export default function Subjects() {
  const { selectedClassId } = useFilter();
  const [showModal, setShowModal] = useState(false);
  const [subjectsList, setSubjectsList] = useState([
    { id: 1, name: 'Mathematics', code: 'MTH-101', teacher: 'Mr. Ahsan Bukhari', classes: '10-A, 9-B' },
    { id: 2, name: 'Physics', code: 'PHY-101', teacher: 'Ms. Rabia Sultan', classes: '10-A, 10-B' },
    { id: 3, name: 'English', code: 'ENG-101', teacher: 'Ms. Sania Yousaf', classes: '10-A, 9-A, 8-C' },
    { id: 4, name: 'Chemistry', code: 'CHM-101', teacher: 'Mr. Faisal Karim', classes: '9-A, 9-B' },
    { id: 5, name: 'Computer Science', code: 'CS-101', teacher: 'Mr. Adeel Nasir', classes: '10-A, 10-B, 9-A' },
  ]);

  const [newSub, setNewSub] = useState({ name: '', code: '', teacher: '', classes: '10-A' });

  const filteredSubjects = selectedClassId === 'ALL' 
    ? subjectsList 
    : subjectsList.filter(s => s.classes.includes(selectedClassId));

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!newSub.name) return;
    setSubjectsList([{ id: Date.now(), ...newSub }, ...subjectsList]);
    setNewSub({ name: '', code: '', teacher: '', classes: '10-A' });
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <ClassSelector />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-ink">Subjects Curriculum</h1>
          <p className="text-xs text-muted mt-0.5">
            {selectedClassId === 'ALL' ? 'Showing all subjects across institution' : `Subjects assigned to Class ${selectedClassId}`}
          </p>
        </div>

        <button 
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-btn hover:bg-blue-700 shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Subject
        </button>
      </div>

      <div className="bg-white rounded-card border border-line shadow-soft overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-line text-muted font-bold uppercase text-[10px]">
              <th className="py-3 px-5">Subject Name</th>
              <th className="py-3 px-3">Subject Code</th>
              <th className="py-3 px-3">Assigned Teacher</th>
              <th className="py-3 px-3">Assigned Classes</th>
              <th className="py-3 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {filteredSubjects.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-5 font-bold text-ink">{s.name}</td>
                <td className="py-3.5 px-3 text-muted font-medium">{s.code}</td>
                <td className="py-3.5 px-3 font-medium text-ink">{s.teacher}</td>
                <td className="py-3.5 px-3">
                  <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-semibold">
                    {s.classes}
                  </span>
                </td>
                <td className="py-3.5 px-5 text-right space-x-2">
                  <button 
                    onClick={() => setSubjectsList(subjectsList.filter(item => item.id !== s.id))}
                    className="p-1.5 text-muted hover:text-danger hover:bg-danger/10 rounded-btn"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Subject Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-ink/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-card w-full max-w-md p-6 space-y-4 shadow-xl border border-line">
            <div className="flex justify-between items-center border-b border-line pb-3">
              <h3 className="font-bold text-ink">Add New Subject</h3>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-muted" /></button>
            </div>
            <form onSubmit={handleAddSubject} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-muted">Subject Name</label>
                <input required type="text" value={newSub.name} onChange={(e)=>setNewSub({...newSub, name: e.target.value})} placeholder="e.g. Computer Science" className="w-full mt-1 p-2.5 border rounded-inp" />
              </div>
              <div>
                <label className="font-semibold text-muted">Code</label>
                <input type="text" value={newSub.code} onChange={(e)=>setNewSub({...newSub, code: e.target.value})} placeholder="e.g. CS-101" className="w-full mt-1 p-2.5 border rounded-inp" />
              </div>
              <div>
                <label className="font-semibold text-muted">Teacher</label>
                <input type="text" value={newSub.teacher} onChange={(e)=>setNewSub({...newSub, teacher: e.target.value})} placeholder="e.g. Mr. Adeel Nasir" className="w-full mt-1 p-2.5 border rounded-inp" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-btn">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white font-bold rounded-btn">Save Subject</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}