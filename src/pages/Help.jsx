import React, { useState } from 'react';
import ClassSelector from '../components/common/ClassSelector';
import { HelpCircle, Search, BookOpen, MessageCircle, ShieldCheck, ChevronDown, Send, CheckCircle2 } from 'lucide-react';

export default function Help() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const [supportSent, setSupportSent] = useState(false);
  const [supportMsg, setSupportMsg] = useState({ subject: '', details: '' });

  const faqs = [
    {
      id: 1,
      q: 'How does the Class Context Filter work?',
      a: 'The Class Context dropdown near the top header allows you to filter the entire EduAdmin dashboard by a specific standard and section (e.g. Class 10-A). Selecting a class dynamically recalculates attendance rates, fee collection metrics, academic averages, and student rosters across all modules.'
    },
    {
      id: 2,
      q: 'How can I mark student attendance?',
      a: 'Navigate to the Attendance page, select your target Class Context, and toggle student presence using the bulk or individual status selectors. Click "Save Attendance Record" to persist the changes.'
    },
    {
      id: 3,
      q: 'How do I generate official CSV or PDF school reports?',
      a: 'Go to the Institutional Reports page, select your preferred scope (Overall School or specific Class), and click "Export CSV" or "Download PDF" on any of the report cards.'
    },
    {
      id: 4,
      q: 'How do I add a new student or record fee payments?',
      a: 'Click "Add Student" on the Dashboard or Students page to open the registration drawer. To record fee payments, navigate to the Fees page and click "Record Payment".'
    }
  ];

  const filteredFaqs = faqs.filter(f => 
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-ink">Documentation & Help Center</h1>
          <p className="text-xs text-muted mt-0.5">User guides, operational FAQs, system status, and technical support</p>
        </div>

        <span className="text-xs font-bold text-success bg-success/10 px-3 py-1.5 rounded-full flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4" /> System Status: All Operational
        </span>
      </div>

      

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-card border border-line shadow-soft space-y-2">
          <span className="w-10 h-10 rounded-btn bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary" />
          </span>
          <h3 className="font-bold text-sm text-ink">User Documentation</h3>
          <p className="text-xs text-muted">Complete guide to managing classes, grades, and faculty rosters.</p>
        </div>

        <div className="bg-white p-5 rounded-card border border-line shadow-soft space-y-2">
          <span className="w-10 h-10 rounded-btn bg-warning/10 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-warning" />
          </span>
          <h3 className="font-bold text-sm text-ink">Operational FAQs</h3>
          <p className="text-xs text-muted">Frequently asked questions about hall ticket eligibility and fee ledgers.</p>
        </div>

        <div className="bg-white p-5 rounded-card border border-line shadow-soft space-y-2">
          <span className="w-10 h-10 rounded-btn bg-purple-500/10 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-purple-600" />
          </span>
          <h3 className="font-bold text-sm text-ink">Direct IT Support</h3>
          <p className="text-xs text-muted">Get assistance from SproutSong technical support team.</p>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="bg-white rounded-card border border-line p-6 shadow-soft space-y-4">
        <h3 className="font-bold text-sm text-ink border-b border-line pb-3">Frequently Asked Questions</h3>

        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div key={faq.id} className="border border-line rounded-btn overflow-hidden">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                  className="w-full p-4 text-left font-bold text-xs text-ink bg-slate-50 flex justify-between items-center hover:bg-slate-100/80 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="p-4 bg-white text-xs text-muted leading-relaxed border-t border-line">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Support Form */}
      <div className="bg-white rounded-card border border-line p-6 shadow-soft space-y-4">
        <h3 className="font-bold text-sm text-ink border-b border-line pb-3">Contact IT Support Ticket</h3>

        {supportSent ? (
          <div className="bg-success/10 border border-success text-success p-4 rounded-card text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> Your support ticket has been logged with SproutSong Support team. Ticket ID: #GVIS-9821.
          </div>
        ) : (
          <form onSubmit={handleSupportSubmit} className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-muted">Issue Subject</label>
              <input 
                required 
                type="text" 
                value={supportMsg.subject} 
                onChange={(e) => setSupportMsg({...supportMsg, subject: e.target.value})} 
                placeholder="e.g. Issue generating PDF report for Class 10-A" 
                className="w-full mt-1 p-2.5 border border-line rounded-inp focus:outline-none" 
              />
            </div>

            <div>
              <label className="font-semibold text-muted">Detailed Description</label>
              <textarea 
                rows="3" 
                value={supportMsg.details} 
                onChange={(e) => setSupportMsg({...supportMsg, details: e.target.value})} 
                placeholder="Provide steps to reproduce the issue..." 
                className="w-full mt-1 p-2.5 border border-line rounded-inp focus:outline-none" 
              />
            </div>

            <div className="flex justify-end pt-2">
              <button type="submit" className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-btn flex items-center gap-2 hover:bg-blue-700 shadow-sm">
                <span>Submit Ticket</span> <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
