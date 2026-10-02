import React, { useState } from 'react';
import { useFilter } from '../context/FilterContext';
import { Megaphone, Plus, X, AlertCircle, Info, BookOpen, Bus } from 'lucide-react';
import { createPortal } from 'react-dom';

const CATEGORY_STYLES = {
  General:  { bg: 'bg-slate-100',   text: 'text-slate-600',   icon: <Info className="w-4 h-4" /> },
  Academic: { bg: 'bg-blue-50',     text: 'text-blue-600',    icon: <BookOpen className="w-4 h-4" /> },
  Sports:   { bg: 'bg-emerald-50',  text: 'text-emerald-600', icon: <Megaphone className="w-4 h-4" /> },
  Transport:{ bg: 'bg-amber-50',    text: 'text-amber-600',   icon: <Bus className="w-4 h-4" /> },
};

const PRIORITY_STYLES = {
  High:   'bg-rose-50 text-rose-600 border border-rose-200',
  Medium: 'bg-amber-50 text-amber-600 border border-amber-200',
  Low:    'bg-slate-50 text-slate-500 border border-slate-200',
};

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-ink">Notices & Announcements</h1>
          <p className="text-xs text-muted mt-0.5">Broadcasting notices to entire institution, standards, or specific classes</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-btn hover:bg-blue-700 shrink-0 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Create Notice
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Notices', value: notices.length, color: 'text-ink' },
          { label: 'High Priority', value: notices.filter(n => n.priority === 'High').length, color: 'text-danger' },
          { label: 'Academic', value: notices.filter(n => n.category === 'Academic').length, color: 'text-primary' },
          { label: 'School-wide', value: notices.filter(n => n.targetClass === 'ALL').length, color: 'text-success' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-card border border-line shadow-sm p-4">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted font-medium mt-0.5 uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Notice List */}
      <div className="bg-white rounded-card border border-line shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-line bg-slate-50">
          <h3 className="font-bold text-sm text-ink">All Notices</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {notices.length === 0 ? (
            <p className="text-center py-10 text-muted text-sm">No notices posted yet.</p>
          ) : (
            notices.map((n) => {
              const cat = CATEGORY_STYLES[n.category] || CATEGORY_STYLES.General;
              return (
                <div key={n.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
                  <span className={`w-9 h-9 rounded-lg ${cat.bg} ${cat.text} flex items-center justify-center shrink-0`}>
                    {cat.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-ink truncate">{n.title}</p>
                    <p className="text-xs text-muted mt-0.5">
                      Posted {n.date} &nbsp;·&nbsp; {n.category} &nbsp;·&nbsp;
                      {n.targetClass === 'ALL' ? 'Entire School' : `Class ${n.targetClass}`}
                    </p>
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 ${PRIORITY_STYLES[n.priority] || PRIORITY_STYLES.Medium}`}>
                    {n.priority}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Create Notice Modal */}
      {showModal && createPortal(
        <div className="fixed inset-0 z-[100] bg-ink/40 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-card w-full max-w-md p-6 space-y-4 shadow-xl border border-line">
            <div className="flex justify-between items-center border-b border-line pb-3">
              <h3 className="font-bold text-ink text-sm flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-primary" /> Broadcast New Notice
              </h3>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-muted hover:text-ink" /></button>
            </div>

            <form onSubmit={handleCreateNotice} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-muted block mb-1">Notice Title</label>
                <input
                  required type="text" value={newNotice.title}
                  onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
                  placeholder="e.g. Mid-Term Examination Schedule Released"
                  className="w-full p-2.5 border border-line rounded-inp focus:outline-none focus:ring-2 focus:ring-primary/25 bg-bg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-muted block mb-1">Category</label>
                  <select value={newNotice.category} onChange={(e) => setNewNotice({...newNotice, category: e.target.value})}
                    className="w-full p-2.5 border border-line rounded-inp focus:outline-none focus:ring-2 focus:ring-primary/25 bg-bg">
                    <option>General</option><option>Academic</option><option>Sports</option><option>Transport</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-muted block mb-1">Priority</label>
                  <select value={newNotice.priority} onChange={(e) => setNewNotice({...newNotice, priority: e.target.value})}
                    className="w-full p-2.5 border border-line rounded-inp focus:outline-none focus:ring-2 focus:ring-primary/25 bg-bg">
                    <option>Low</option><option>Medium</option><option>High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-muted block mb-1">Target Audience</label>
                <select value={newNotice.targetClass} onChange={(e) => setNewNotice({...newNotice, targetClass: e.target.value})}
                  className="w-full p-2.5 border border-line rounded-inp focus:outline-none focus:ring-2 focus:ring-primary/25 bg-bg">
                  <option value="ALL">Entire School</option>
                  {classesList.map((c) => <option key={c.id} value={c.id}>Class {c.id}</option>)}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-line">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-ink font-semibold rounded-btn transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary hover:bg-blue-700 text-white font-bold rounded-btn shadow-sm transition-colors">Post Notice</button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
