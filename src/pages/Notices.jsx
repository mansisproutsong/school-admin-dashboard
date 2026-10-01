import React, { useState } from 'react';
import { useFilter } from '../context/FilterContext';
import ClassSelector from '../components/common/ClassSelector';
import { noticesList } from '../data/mockData';
import { Megaphone, Plus } from 'lucide-react';

export default function Notices() {
  const { selectedClassId } = useFilter();
  return (
    <div className="space-y-6">
      <ClassSelector />
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-ink">School Notices & Announcements</h1>
          <p className="text-xs text-muted mt-0.5">Broadcasting notices to entire institution, standards, or specific classes</p>
        </div>
        <button onClick={() => alert('Create Notice Modal')} className="bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-btn hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Notice
        </button>
      </div>

      <div className="space-y-3">
        {noticesList.map((n) => (
          <div key={n.id} className="bg-white p-4 rounded-card border border-line shadow-soft flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-btn bg-warning/10 flex items-center justify-center shrink-0">
                <Megaphone className="w-4 h-4 text-warning" />
              </span>
              <div>
                <p className="text-sm font-bold text-ink">{n.title}</p>
                <p className="text-xs text-muted">Posted {n.date} • Audience: {selectedClassId === 'ALL' ? 'Entire School' : `Class ${selectedClassId}`}</p>
              </div>
            </div>
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${n.priority === 'High' ? 'bg-danger/10 text-danger' : 'bg-slate-100 text-muted'}`}>
              {n.priority} Priority
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
