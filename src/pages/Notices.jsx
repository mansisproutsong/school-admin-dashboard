import React, { useState } from 'react';
import { useFilter } from '../context/FilterContext';
import ClassSelector from '../components/common/ClassSelector';
import { Megaphone, Plus, X } from 'lucide-react';

export default function Notices() {
  const { selectedClassId, notices, addNotice, classesList } = useFilter();
  const [showModal, setShowModal] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: '',
    category: 'General',
    priority: 'Medium',
    targetClass: selectedClassId
  });

  const handleCreateNotice = (e) => {
    e.preventDefault();
    if (!newNotice.title.trim()) return;
    addNotice(newNotice);
    setShowModal(false);
    setNewNotice({ title: '', category: 'General', priority: 'Medium', targetClass: selectedClassId });
  };

  const filteredNotices = notices;

  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-ink">School Notices & Announcements</h1>
          <p className="text-xs text-muted mt-0.5">Broadcasting notices to entire institution, standards, or specific classes</p>
        </div>
        <button 
          onClick={() => setShowModal(true)} 
          className="bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-btn hover:bg-blue-700 flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Create Notice
        </button>
      </div>

      <div className="space-y-3">
        {filteredNotices.map((n) => (
          <div key={n.id} className="bg-white p-4 rounded-card border border-line shadow-soft flex items-center justify-between hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-btn bg-warning/10 flex items-center justify-center shrink-0">
                <Megaphone className="w-4 h-4 text-warning" />
              </span>
              <div>
                <p className="text-sm font-bold text-ink">{n.title}</p>
                <p className="text-xs text-muted">Posted {n.date} • Category: {n.category} • Target: {n.targetClass === 'ALL' ? 'Entire School' : `Class ${n.targetClass}`}</p>
              </div>
            </div>
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${n.priority === 'High' ? 'bg-danger/10 text-danger' : 'bg-slate-100 text-muted'}`}>
              {n.priority} Priority
            </span>
          </div>
        ))}
      </div>

      {/* Create Notice Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-ink/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-card w-full max-w-md p-6 space-y-4 shadow-xl border border-line">
            <div className="flex justify-between items-center border-b border-line pb-3">
              <h3 className="font-bold text-ink text-sm flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-warning" /> Broadcast New Notice
              </h3>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-muted hover:text-ink" /></button>
            </div>

            <form onSubmit={handleCreateNotice} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-muted">Notice Title</label>
                <input 
                  required 
                  type="text" 
                  value={newNotice.title} 
                  onChange={(e) => setNewNotice({...newNotice, title: e.target.value})} 
                  placeholder="e.g. Mid-Term Examination Schedule Released" 
                  className="w-full mt-1 p-2.5 border border-line rounded-inp focus:outline-none" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-muted">Category</label>
                  <select 
                    value={newNotice.category} 
                    onChange={(e) => setNewNotice({...newNotice, category: e.target.value})}
                    className="w-full mt-1 p-2.5 border border-line rounded-inp"
                  >
                    <option value="General">General</option>
                    <option value="Academic">Academic</option>
                    <option value="Sports">Sports</option>
                    <option value="Transport">Transport</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-muted">Priority</label>
                  <select 
                    value={newNotice.priority} 
                    onChange={(e) => setNewNotice({...newNotice, priority: e.target.value})}
                    className="w-full mt-1 p-2.5 border border-line rounded-inp"
                  >
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-muted">Target Audience</label>
                <select 
                  value={newNotice.targetClass} 
                  onChange={(e) => setNewNotice({...newNotice, targetClass: e.target.value})}
                  className="w-full mt-1 p-2.5 border border-line rounded-inp"
                >
                  <option value="ALL">Entire School</option>
                  {classesList.map((c) => (
                    <option key={c.id} value={c.id}>Class {c.id}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-line">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-btn">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white font-bold rounded-btn">Post Notice</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
