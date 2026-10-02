import React, { useState } from 'react';
import { useFilter } from '../context/FilterContext';
import ClassSelector from '../components/common/ClassSelector';
import { Calendar, Plus, Trophy, X, FlaskConical, Users, FileText } from 'lucide-react';

export default function Events() {
  const { selectedClassId, events, addEvent } = useFilter();
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: 'Oct 25, 2026',
    time: '10:00 AM - 2:00 PM',
    category: 'Academic'
  });

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title.trim()) return;
    addEvent(newEvent);
    setShowModal(false);
    setNewEvent({ title: '', date: 'Oct 25, 2026', time: '10:00 AM - 2:00 PM', category: 'Academic' });
  };

  return (
    <div className="space-y-6">
      <ClassSelector />
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-ink">Events & School Calendar</h1>
          <p className="text-xs text-muted mt-0.5">Upcoming school-wide, standard, and class events</p>
        </div>
        <button 
          onClick={() => setShowModal(true)} 
          className="bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-btn hover:bg-blue-700 flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((evt) => (
          <div key={evt.id} className="bg-white p-5 rounded-card border border-line shadow-soft flex items-center justify-between hover:border-primary/50 transition-all">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-btn bg-primary/10 flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5 text-primary" />
              </span>
              <div>
                <p className="text-sm font-bold text-ink">{evt.title}</p>
                <p className="text-xs text-muted mt-0.5">{evt.date} • {evt.time}</p>
              </div>
            </div>
            <span className="text-xs font-semibold bg-slate-100 px-3 py-1 rounded-full text-muted">{evt.category}</span>
          </div>
        ))}
      </div>

      {/* Add Event Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-ink/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-card w-full max-w-md p-6 space-y-4 shadow-xl border border-line">
            <div className="flex justify-between items-center border-b border-line pb-3">
              <h3 className="font-bold text-ink text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" /> Schedule New School Event
              </h3>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-muted hover:text-ink" /></button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-muted">Event Title</label>
                <input 
                  required 
                  type="text" 
                  value={newEvent.title} 
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} 
                  placeholder="e.g. Science Fair 2026" 
                  className="w-full mt-1 p-2.5 border border-line rounded-inp focus:outline-none" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-muted">Event Date</label>
                  <input 
                    type="text" 
                    value={newEvent.date} 
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})} 
                    placeholder="Oct 28, 2026" 
                    className="w-full mt-1 p-2.5 border border-line rounded-inp" 
                  />
                </div>

                <div>
                  <label className="font-semibold text-muted">Timing</label>
                  <input 
                    type="text" 
                    value={newEvent.time} 
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})} 
                    placeholder="10:00 AM - 1:00 PM" 
                    className="w-full mt-1 p-2.5 border border-line rounded-inp" 
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-muted">Category</label>
                <select 
                  value={newEvent.category} 
                  onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                  className="w-full mt-1 p-2.5 border border-line rounded-inp"
                >
                  <option value="Academic">Academic</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Exam">Exam</option>
                  <option value="Sports">Sports</option>
                  <option value="Cultural">Cultural</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-line">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-btn">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white font-bold rounded-btn">Add Event</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
