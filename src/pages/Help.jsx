import React, { useState } from 'react';
import { HelpCircle, Search, BookOpen, MessageCircle, ShieldCheck, ChevronDown, Send, CheckCircle2, Phone, Mail } from 'lucide-react';

const FAQS = [
  { id: 1, q: 'How does the Class Context Filter work?', a: 'The Class Context dropdown near the top header allows you to filter the entire dashboard by a specific standard and section (e.g. Class 10-A). Selecting a class dynamically recalculates attendance rates, fee collection metrics, academic averages, and student rosters across all modules.' },
  { id: 2, q: 'How can I mark student attendance?', a: 'Navigate to the Attendance page, select your target Class Context, and toggle student presence using the bulk or individual status selectors. Click "Save Attendance Record" to persist the changes.' },
  { id: 3, q: 'How do I generate official CSV reports?', a: 'Go to the Institutional Reports page, select your preferred scope (Overall School or specific Class), and click "Export CSV" on any of the report cards.' },
  { id: 4, q: 'How do I record fee payments?', a: 'Navigate to the Fees page and click "Record Payment". Select the student, enter the amount paid, choose the date, and update the status to Paid.' },
  { id: 5, q: 'How do I add a new notice or announcement?', a: 'Go to the Notices page and click "Create Notice". Fill in the title, category, priority, and target audience, then click "Post Notice" to broadcast it.' },
];

export default function Help() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const [supportSent, setSupportSent] = useState(false);
  const [supportMsg, setSupportMsg] = useState({ subject: '', details: '' });

  const filteredFaqs = FAQS.filter(f =>
    f.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    if (!supportMsg.subject.trim()) return;
    setSupportSent(true);
    setTimeout(() => setSupportSent(false), 4000);
    setSupportMsg({ subject: '', details: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-ink">Help & Support Center</h1>
          <p className="text-xs text-muted mt-0.5">User guides, operational FAQs, and technical support</p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-btn">
          <CheckCircle2 className="w-3.5 h-3.5" /> All Systems Operational
        </span>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: <BookOpen className="w-5 h-5 text-primary" />,       bg: 'bg-blue-50 border-blue-100',    title: 'User Documentation',  desc: 'Complete guide to managing classes, grades, and faculty rosters.' },
          { icon: <HelpCircle className="w-5 h-5 text-amber-500" />,   bg: 'bg-amber-50 border-amber-100',  title: 'Operational FAQs',    desc: 'Frequently asked questions about attendance, fee ledgers, and reports.' },
          { icon: <ShieldCheck className="w-5 h-5 text-slate-600" />,  bg: 'bg-slate-50 border-slate-200',  title: 'Direct IT Support',   desc: 'Get assistance from the SproutSong technical support team.' },
        ].map((c, i) => (
          <div key={i} className={`bg-white rounded-card border shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition-shadow ${c.bg.split(' ')[1]}`}>
            <span className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center`}>
              {c.icon}
            </span>
            <div>
              <h3 className="font-bold text-sm text-ink">{c.title}</h3>
              <p className="text-xs text-muted mt-1 leading-relaxed">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-card border border-line shadow-sm overflow-hidden">
        <div className="p-5 border-b border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h3 className="font-bold text-sm text-ink">Frequently Asked Questions</h3>
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs border border-line rounded-inp bg-bg focus:outline-none focus:ring-2 focus:ring-primary/25"
            />
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredFaqs.length === 0 ? (
            <p className="text-center py-8 text-muted text-sm">No FAQs match your search.</p>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div key={faq.id}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full px-5 py-4 text-left text-sm font-bold text-ink bg-white hover:bg-slate-50 flex justify-between items-center gap-3 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-muted shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-sm text-muted leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      <p className="pt-3">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-white rounded-card border border-line shadow-sm p-6 space-y-4">
        <div className="border-b border-line pb-3 flex items-center justify-between">
          <h3 className="font-bold text-sm text-ink">Submit a Support Ticket</h3>
          <div className="flex items-center gap-4 text-xs text-muted">
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> +91 98765 99999</span>
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> support@sproutsong.in</span>
          </div>
        </div>

        {supportSent ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-card text-sm font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> Your ticket has been logged. Ticket ID: #GVIS-9821. We'll respond within 24 hours.
          </div>
        ) : (
          <form onSubmit={handleSupportSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted block mb-1">Issue Subject</label>
              <input
                required type="text" value={supportMsg.subject}
                onChange={(e) => setSupportMsg({...supportMsg, subject: e.target.value})}
                placeholder="e.g. Issue generating report for Class 10-A"
                className="w-full p-2.5 text-sm border border-line rounded-inp bg-bg focus:outline-none focus:ring-2 focus:ring-primary/25"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted block mb-1">Detailed Description</label>
              <textarea
                rows="3" value={supportMsg.details}
                onChange={(e) => setSupportMsg({...supportMsg, details: e.target.value})}
                placeholder="Provide steps to reproduce the issue..."
                className="w-full p-2.5 text-sm border border-line rounded-inp bg-bg focus:outline-none focus:ring-2 focus:ring-primary/25"
              />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-btn flex items-center gap-2 hover:bg-blue-700 shadow-sm transition-colors">
                Submit Ticket <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
