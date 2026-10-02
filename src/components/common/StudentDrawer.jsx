import React, { useState } from 'react';
import { X, User, Phone, Mail, Award, ClipboardCheck, Wallet, CheckCircle, AlertTriangle } from 'lucide-react';

export default function StudentDrawer({ student, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-ink/40 transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-line">
          {/* Drawer Header */}
          <div className="p-5 bg-slate-50 border-b border-line flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-lg">
                {student.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-base font-bold text-ink">{student.name}</h2>
                <p className="text-xs text-muted">Class {student.classId} • Roll #{student.rollNo}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 text-muted hover:text-ink rounded-btn hover:bg-slate-200">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-line px-4 bg-white text-xs font-semibold">
            {['overview', 'attendance', 'academics', 'fees'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-3 border-b-2 capitalize transition-colors ${
                  activeTab === tab 
                    ? 'border-primary text-primary font-bold' 
                    : 'border-transparent text-muted hover:text-ink'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {activeTab === 'overview' && (
              <div className="space-y-4 text-xs">
                <div className="bg-bg rounded-card p-4 space-y-2.5 border border-line">
                  <p className="font-bold text-ink text-sm">Personal & Contact Info</p>
                  <div className="flex justify-between py-1 border-b border-line">
                    <span className="text-muted">Parent / Guardian:</span>
                    <span className="font-semibold text-ink">{student.parentName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-line">
                    <span className="text-muted">Contact Phone:</span>
                    <span className="font-semibold text-ink">{student.parentPhone}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted">Class & Section:</span>
                    <span className="font-semibold text-ink">Class {student.classId} (Sec {student.section})</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-btn">
                    <p className="text-muted text-[11px]">Attendance Rate</p>
                    <p className="text-lg font-bold text-primary mt-0.5">{student.attendancePct}%</p>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-100 rounded-btn">
                    <p className="text-muted text-[11px]">Academic Score</p>
                    <p className="text-lg font-bold text-purple-600 mt-0.5">{student.performanceAvg}%</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'attendance' && (
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-bg border border-line rounded-card space-y-2">
                  <p className="font-bold text-ink">Attendance Summary</p>
                  <p className="text-muted">Overall term attendance for student is <span className="font-bold text-ink">{student.attendancePct}%</span>.</p>
                  {student.attendancePct < 75 ? (
                    <p className="text-danger font-semibold bg-danger/10 p-2 rounded-md flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" /> Attendance below 75% threshold!
                    </p>
                  ) : (
                    <p className="text-success font-semibold bg-success/10 p-2 rounded-md flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4" /> Eligible for term examinations.
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'academics' && (
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-bg border border-line rounded-card space-y-2">
                  <p className="font-bold text-ink">Subject Breakdown</p>
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between"><span>Mathematics</span><span className="font-bold">84%</span></div>
                    <div className="flex justify-between"><span>Physics</span><span className="font-bold">88%</span></div>
                    <div className="flex justify-between"><span>English</span><span className="font-bold">92%</span></div>
                    <div className="flex justify-between"><span>Computer Science</span><span className="font-bold">95%</span></div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'fees' && (
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-bg border border-line rounded-card space-y-2">
                  <p className="font-bold text-ink">Fee Ledger</p>
                  <div className="flex justify-between items-center py-2 border-b border-line">
                    <div><p className="font-semibold">Term Fee 2026–27</p><p className="text-[10px] text-muted">Due: Jul 15, 2026</p></div>
                    <span className="font-bold text-ink">₹{student.feeAmount?.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-muted">Status:</span>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      student.feeStatus === 'Paid' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                    }`}>
                      {student.feeStatus}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 bg-slate-50 border-t border-line flex gap-2">
            <button 
              onClick={() => alert(`Notice sent to parent of ${student.name}`)}
              className="flex-1 bg-primary text-white py-2 rounded-btn text-xs font-semibold hover:bg-blue-700"
            >
              Send Notice to Parent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}