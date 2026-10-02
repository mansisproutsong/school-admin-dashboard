import React, { useState } from 'react';
import { useFilter } from '../context/FilterContext';
import ClassSelector from '../components/common/ClassSelector';
import { Calendar, Plus, X, Trophy, FlaskConical, Music, Users, BookOpen, Dumbbell } from 'lucide-react';
import { createPortal } from 'react-dom';

const CATEGORY_CONFIG = {
  Academic:  { bg: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-100',    icon: <BookOpen className="w-4 h-4" />,      dot: 'bg-blue-500' },
  Sports:    { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100', icon: <Dumbbell className="w-4 h-4" />,      dot: 'bg-emerald-500' },
  Cultural:  { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-100',   icon: <Music className="w-4 h-4" />,        dot: 'bg-amber-500' },
  Meeting:   { bg: 'bg-slate-50',   text: 'text-slate-700',   border: 'border-slate-200',   icon: <Users className="w-4 h-4" />,        dot: 'bg-slate-400' },
  Exam:      { bg: 'bg-rose-50',    text: 'text-rose-700',    border: 'border-rose-100',    icon: <FlaskConical className="w-4 h-4" />, dot: 'bg-rose-500' },
};

export default function Events() {
  const { selectedClassId, events, addEvent } = useFilter();
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: 'Oct 25, 2026', time: '10:00 AM - 2:00 PM', category: 'Academic' });

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title.trim()) return;
    addEvent(newEvent);
    setShowModal(false);
    setNewEvent({ title: '', date: 'Oct 25, 2026', time: '10:00 AM - 2:00 PM', category: 'Academic' });
  };

  const categoryCounts = Object.keys(CATEGORY_CONFIG).reduce((acc, cat) => {
    acc[cat] = events.filter(e => e.category === cat).length;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <ClassSelector />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-ink">Events & School Calendar</h1>
          <p className="text-xs text-muted mt-0.5">Upcoming school-wide, standard, and class-specific events</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-btn hover:bg-blue-700 shrink-0 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>

      {/* Category Summary Strip */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {Object.entries(CATEGORY_CONFIG).map(([cat, cfg]) => (
          <div key={cat} className={`bg-white rounded-card border ${cfg.border} shadow-sm p-4 flex items-center gap-3`}>
            <span className={`${cfg.bg} ${cfg.text} w-10 h-10 rounded-lg flex items-center justify-center shrink-0 [&>svg]:w-5 [&>svg]:h-5`}>{cfg.icon}</span>
            <div>
              <p className="text-2xl font-bold text-ink leading-none">{categoryCounts[cat] || 0}</p>
              <p className="text-xs text-muted font-semibold mt-1 uppercase tracking-wider">{cat}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-muted text-sm bg-white rounded-card border border-line">No events scheduled.</div>
        ) : (
          events.map((evt) => {
            const cfg = CATEGORY_CONFIG[evt.category] || CATEGORY_CONFIG.Academic;
            return (
              <div key={evt.id} className={`bg-white rounded-card border border-line shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow`}>
                <div className={`w-10 h-10 rounded-xl ${cfg.bg} ${cfg.text} flex items-center justify-center shrink-0`}>
                  {cfg.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-bold text-ink leading-tight">{evt.title}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${cfg.bg} ${cfg.text} border ${cfg.border}`}>
                      {evt.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <Calendar className="w-3.5 h-3.5 text-muted shrink-0" />
                    <p className="text-xs text-muted font-medium">{evt.date} &nbsp;·&nbsp; {evt.time}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Event Modal */}
      {showModal && createPortal(
        <div className="fixed inset-0 z-[100] bg-ink/40 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-card w-full max-w-md p-6 space-y-4 shadow-xl border border-line">
            <div className="flex justify-between items-center border-b border-line pb-3">
              <h3 className="font-bold text-ink text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" /> Schedule New Event
              </h3>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-muted hover:text-ink" /></button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-muted block mb-1">Event Title</label>
                <input required type="text" value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  placeholder="e.g. Science Fair 2026"
                  className="w-full p-2.5 border border-line rounded-inp focus:outline-none focus:ring-2 focus:ring-primary/25 bg-bg" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-muted block mb-1">Event Date</label>
                  <input type="text" value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    className="w-full p-2.5 border border-line rounded-inp focus:outline-none focus:ring-2 focus:ring-primary/25 bg-bg" />
                </div>
                <div>
                  <label className="font-semibold text-muted block mb-1">Timing</label>
                  <input type="text" value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    className="w-full p-2.5 border border-line rounded-inp focus:outline-none focus:ring-2 focus:ring-primary/25 bg-bg" />
                </div>
              </div>

              <div>
                <label className="font-semibold text-muted block mb-1">Category</label>
                <select value={newEvent.category} onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                  className="w-full p-2.5 border border-line rounded-inp focus:outline-none focus:ring-2 focus:ring-primary/25 bg-bg">
                  <option>Academic</option><option>Meeting</option><option>Exam</option><option>Sports</option><option>Cultural</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-line">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-ink font-semibold rounded-btn transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary hover:bg-blue-700 text-white font-bold rounded-btn shadow-sm transition-colors">Add Event</button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
