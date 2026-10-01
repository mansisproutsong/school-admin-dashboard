import React from 'react';

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <div className="bg-primary rounded-card p-6 text-white shadow-soft">
        <h1 className="text-2xl font-bold">Good Morning, Admin 👋</h1>
        <p className="text-blue-100 text-sm mt-1">Welcome to EduAdmin School Administration System.</p>
      </div>
      <div className="p-6 bg-white border border-line rounded-card shadow-soft">
        <p className="text-sm font-semibold text-ink">Phase 2 EduAdmin Layout & Routing is live!</p>
      </div>
    </div>
  );
}