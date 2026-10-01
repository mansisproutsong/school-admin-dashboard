import React from 'react';
import { Bell, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function NotificationPanel({ onClose }) {
  const notifs = [
    { title: '24 students low attendance alert', time: '10 min ago', color: 'text-danger' },
    { title: '38 overdue fee reminders generated', time: '1 hour ago', color: 'text-warning' },
    { title: 'PTM Meeting scheduled for tomorrow', time: '2 hours ago', color: 'text-primary' },
  ];

  return (
    <div className="absolute right-0 top-12 w-80 bg-white border border-line rounded-card shadow-xl z-50 overflow-hidden text-xs">
      <div className="p-3 border-b border-line font-bold text-ink flex justify-between items-center bg-slate-50">
        <span>Notifications</span>
        <button onClick={onClose} className="text-[10px] text-primary hover:underline">Mark all read</button>
      </div>
      <div className="divide-y divide-line max-h-64 overflow-y-auto">
        {notifs.map((n, i) => (
          <div key={i} className="p-3 hover:bg-slate-50 space-y-0.5">
            <p className={`font-semibold ${n.color}`}>{n.title}</p>
            <p className="text-[10px] text-muted">{n.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
