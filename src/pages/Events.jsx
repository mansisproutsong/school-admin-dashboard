import React from 'react';
import { useFilter } from '../context/FilterContext';
import ClassSelector from '../components/common/ClassSelector';
import { eventsList } from '../data/mockData';
import { Calendar, Plus, Trophy } from 'lucide-react';

export default function Events() {
  const { selectedClassId } = useFilter();
  return (
    <div className="space-y-6">
      <ClassSelector />
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-ink">Events & School Calendar</h1>
          <p className="text-xs text-muted mt-0.5">Upcoming school-wide, standard, and class events</p>
        </div>
        <button onClick={() => alert('Add Event Modal')} className="bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-btn hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {eventsList.map((evt) => (
          <div key={evt.id} className="bg-white p-5 rounded-card border border-line shadow-soft flex items-center justify-between">
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
    </div>
  );
}
