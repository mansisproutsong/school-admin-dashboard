import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, User, Phone, Mail, Award, ClipboardCheck, Wallet, CheckCircle2, 
  AlertTriangle, BookOpen, Send, IndianRupee, Calendar, TrendingUp, 
  ShieldCheck, Check, FileText, Download, GraduationCap, Users
} from 'lucide-react';
import { useFilter } from '../../context/FilterContext';
import CustomSelect from './CustomSelect';

const getInitials = (name) => {
  if (!name) return 'ST';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

export default function StudentDrawer({ student, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTerm, setSelectedTerm] = useState('Term I (2026–27)');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('Paid');
  const [noticeSent, setNoticeSent] = useState(false);
  const [customNoticeText, setCustomNoticeText] = useState('');
  
  const { recordPayment } = useFilter();

  // Close drawer on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    if (student) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [student, onClose]);

  if (!student) return null;

  const handleRecordPaymentSubmit = (e) => {
    e.preventDefault();
    recordPayment(student.id, paymentAmount || student.feeAmount, paymentStatus);
    setShowPaymentModal(false);
  };

  const handleSendNotice = (e) => {
    e.preventDefault();
    setNoticeSent(true);
    setTimeout(() => {
      setNoticeSent(false);
      setCustomNoticeText('');
    }, 3000);
  };

  const handleDownloadPDF = () => {
    alert(`Downloading official Academic Dossier & Report Card PDF for ${student.name}...`);
  };

  const classSubjectsData = [
    {
      code: 'MTH-001',
      name: 'Mathematics',
      teacher: 'Mr. R. Sharma',
      remarks: 'Good analytical grasp & problem solving',
      score: Math.min(100, Math.max(45, student.performanceAvg + 2)),
      grade: 'B+',
      color: 'bg-blue-600',
      subtext1: 'Theory: 52/70',
      subtext2: 'Practical: 21/30'
    },
    {
      code: 'ENG-002',
      name: 'English',
      teacher: "Ms. C. D'Souza",
      remarks: 'Focus needed on grammar & essay writing',
      score: Math.min(100, Math.max(40, student.performanceAvg - 11)),
      grade: 'Support Needed',
      color: 'bg-amber-500',
      needsSupport: true,
      subtext1: 'Literature: 40/60',
      subtext2: 'Grammar: 24/40'
    },
    {
      code: 'SCI-003',
      name: 'Science',
      teacher: 'Dr. P. Mehta',
      remarks: 'Practical lab work & experiments excellent',
      score: Math.min(100, Math.max(50, student.performanceAvg + 6)),
      grade: 'B+',
      color: 'bg-blue-600',
      subtext1: 'Physics & Chem: 51/70',
      subtext2: 'Biology Lab: 26/30'
    },
    {
      code: 'SST-004',
      name: 'Social Studies',
      teacher: 'Mr. V. K. Singh',
      remarks: 'Consistent class participation & map skills',
      score: Math.min(100, Math.max(48, student.performanceAvg + 4)),
      grade: 'A',
      color: 'bg-indigo-600',
      subtext1: 'History & Civics: 45/60',
      subtext2: 'Geography: 32/40'
    },
    {
      code: 'CS-005',
      name: 'Computer Science',
      teacher: 'Ms. Neha Gupta',
      remarks: 'Strong programming concepts in Python',
      score: Math.min(100, Math.max(55, student.performanceAvg + 10)),
      grade: 'A+',
      color: 'bg-emerald-600',
      subtext1: 'Coding: 48/50',
      subtext2: 'Theory: 45/50'
    }
  ];

  const paymentStatusOptions = [
    { value: 'Paid', label: 'Paid (Full)', badge: 'bg-emerald-100 text-emerald-800' },
    { value: 'Pending', label: 'Pending (Partial)', badge: 'bg-amber-100 text-amber-800' },
    { value: 'Overdue', label: 'Overdue', badge: 'bg-rose-100 text-rose-800' }
  ];

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Overlay Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex z-50">
        <div className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col border-l border-line animate-slideInRight h-full">
          
          {/* HEADER TOP BANNER (EXACT MATCHING UI FROM IMAGE) */}
          <div className="bg-[#0b1220] text-white p-6 space-y-5 relative shrink-0 border-b border-slate-800">
            
            {/* Student Profile Row */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-2xl bg-primary text-white font-extrabold flex items-center justify-center text-sm shadow-md shrink-0">
                  {getInitials(student.name)}
                </div>

                {/* Info Text */}
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-white tracking-tight">{student.name}</h2>
                    <span className="text-xs text-slate-400 font-normal">ID: {student.id}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">
                    Class {student.classId} • Roll No: {student.rollNo}{student.section ? ` • Sec ${student.section}` : ''}
                  </p>
                </div>
              </div>

              {/* Close Button X */}
              <button 
                onClick={onClose} 
                className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Close Drawer (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 3 Metric Cards Row (Centered Labels & Colored Numbers) */}
            <div className="grid grid-cols-3 gap-3">
              
              {/* ATTENDANCE CARD */}
              <div className="bg-[#121929] p-4 rounded-2xl border border-slate-800/80 text-center shadow-xs">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">ATTENDANCE</p>
                <p className={`text-lg font-bold mt-1.5 ${student.attendancePct < 75 ? 'text-rose-500' : 'text-emerald-400'}`}>
                  {student.attendancePct}%
                </p>
              </div>

              {/* ACADEMIC SCORE CARD */}
              <div className="bg-[#121929] p-4 rounded-2xl border border-slate-800/80 text-center shadow-xs">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">ACADEMIC SCORE</p>
                <p className="text-lg font-bold text-purple-400 mt-1.5">
                  {student.performanceAvg}%
                </p>
              </div>

              {/* FEE STATUS CARD */}
              <div className="bg-[#121929] p-4 rounded-2xl border border-slate-800/80 text-center shadow-xs">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">FEE STATUS</p>
                <p className={`text-lg font-bold mt-1.5 ${
                  student.feeStatus === 'Paid' ? 'text-emerald-400' :
                  student.feeStatus === 'Pending' ? 'text-amber-400' : 'text-rose-500'
                }`}>
                  {student.feeStatus}
                </p>
              </div>

            </div>

          </div>

          {/* NAVIGATION TABS BAR */}
          <div className="flex border-b border-line bg-slate-50 text-xs font-semibold px-3 overflow-x-auto shrink-0">
            {[
              { id: 'overview', label: 'Overview', icon: User },
              { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
              { id: 'academics', label: 'Academics', icon: BookOpen },
              { id: 'fees', label: 'Fee Ledger', icon: Wallet },
              { id: 'notice', label: 'Send Notice', icon: Send }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 py-3 px-4 border-b-2 transition-all shrink-0 text-xs font-bold cursor-pointer relative ${
                    isActive 
                      ? 'border-primary text-primary bg-white -mb-px rounded-t-xl shadow-2xs' 
                      : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block ml-0.5" />}
                </button>
              );
            })}
          </div>

          {/* DRAWER BODY CONTENT */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs bg-slate-50/50">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                {/* Parent / Guardian Card */}
                <div className="bg-white rounded-2xl p-5 border border-line shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-line pb-2.5">
                    <h4 className="font-bold text-ink text-xs flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" /> Guardian & Contact Details
                    </h4>
                    <span className="text-[10px] bg-slate-100 font-bold px-2 py-0.5 rounded-full text-muted">Verified</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-[11px] text-muted font-medium">Parent / Guardian Name</p>
                      <p className="font-bold text-ink mt-0.5">{student.parentName || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-muted font-medium">Contact Phone</p>
                      <p className="font-bold text-ink mt-0.5 flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-emerald-600" />
                        {student.parentPhone || '+91 98765 43210'}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-muted font-medium">Guardian Email</p>
                      <p className="font-semibold text-ink mt-0.5 flex items-center gap-1.5 text-[11px]">
                        <Mail className="w-3 h-3 text-primary" />
                        {student.name.toLowerCase().replace(/\s+/g, '.')}@parent.greenvalley.edu
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-muted font-medium">Emergency Status</p>
                      <p className="font-semibold text-emerald-600 mt-0.5 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> Normal
                      </p>
                    </div>
                  </div>
                </div>

                {/* Performance Summary Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-4 rounded-2xl border border-line shadow-xs space-y-1">
                    <div className="flex items-center justify-between text-muted">
                      <span className="text-[11px] font-medium">Attendance Standard</span>
                      <ClipboardCheck className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-xl font-bold text-ink">{student.attendancePct}%</p>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${student.attendancePct >= 75 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                        style={{ width: `${student.attendancePct}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-muted pt-1">
                      {student.attendancePct < 75 ? '⚠️ Action Required (<75%)' : '✓ Good Standing'}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-line shadow-xs space-y-1">
                    <div className="flex items-center justify-between text-muted">
                      <span className="text-[11px] font-medium">Term Average</span>
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                    </div>
                    <p className="text-xl font-bold text-purple-700">{student.performanceAvg}%</p>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-purple-600"
                        style={{ width: `${student.performanceAvg}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-muted pt-1">
                      Grade: {student.performanceAvg >= 85 ? 'A+ Outstanding' : student.performanceAvg >= 75 ? 'A First Class' : 'B Standard'}
                    </p>
                  </div>
                </div>

                {/* Fee Brief Card */}
                <div className="bg-white p-4 rounded-2xl border border-line shadow-xs flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-[11px] text-muted font-medium">Term Fee Balance</p>
                    <p className="text-xl font-bold text-ink">₹{student.feeAmount?.toLocaleString('en-IN')}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    student.feeStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    student.feeStatus === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}>
                    {student.feeStatus}
                  </span>
                </div>
              </div>
            )}

            {/* ACADEMICS TAB */}
            {activeTab === 'academics' && (
              <div className="space-y-5">
                
                {/* Academic Standing & Progress Header Card */}
                <div className="bg-white rounded-2xl p-5 border border-line shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-line pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-primary flex items-center justify-center border border-blue-100">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-ink text-sm">Academic Standing & Progress</h4>
                        <p className="text-[10px] text-muted">Evaluated on Mid-Term 1 Assessment</p>
                      </div>
                    </div>

                    <select 
                      value={selectedTerm}
                      onChange={(e) => setSelectedTerm(e.target.value)}
                      className="bg-slate-50 border border-line text-xs font-semibold text-ink px-3 py-1.5 rounded-xl focus:outline-none cursor-pointer"
                    >
                      <option value="Term I (2026–27)">Term I (2026–27)</option>
                      <option value="Term II (2026–27)">Term II (2026–27)</option>
                    </select>
                  </div>

                  {/* 4 Metric Tiles Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-slate-50 p-3 rounded-xl border border-line">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Class Rank</p>
                      <p className="text-base font-extrabold text-ink mt-0.5">#14 <span className="text-xs font-medium text-slate-400">/ 32</span></p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-line">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Top Subject</p>
                      <p className="text-base font-extrabold text-emerald-600 mt-0.5">Computer <span className="text-xs font-semibold">(88%)</span></p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-line">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Needs Focus</p>
                      <p className="text-base font-extrabold text-rose-600 mt-0.5">English <span className="text-xs font-semibold">(64%)</span></p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-line">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Class Median</p>
                      <p className="text-base font-extrabold text-slate-700 mt-0.5">74% <span className="text-xs font-medium text-slate-400">avg</span></p>
                    </div>
                  </div>

                  {/* Progress Bar vs Median */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-600 font-semibold">Term 1 Overall Score vs Class Median</span>
                      <span className="font-bold text-indigo-700">{student.performanceAvg}% <span className="text-[10px] text-muted">({student.performanceAvg - 74}% from cohort median)</span></span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden relative">
                      <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" style={{ width: `${student.performanceAvg}%` }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-muted">
                      <span>0%</span>
                      <span>Class Median: 74%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>

                {/* Subject Marks & Grades Breakdown Card */}
                <div className="bg-white rounded-2xl p-5 border border-line shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-line pb-3">
                    <div>
                      <h4 className="font-bold text-ink text-sm flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-purple-600" /> Subject Marks & Grades
                      </h4>
                      <p className="text-[10px] text-muted">Calculated across accredited curriculum subjects</p>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full">
                      Overall: {student.performanceAvg}% (B+)
                    </span>
                  </div>

                  {/* Detailed Subject List Cards */}
                  <div className="space-y-3">
                    {classSubjectsData.map((sub) => (
                      <div key={sub.code} className="bg-slate-50/80 p-4 rounded-xl border border-line space-y-2.5">
                        
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-ink text-xs">{sub.name}</span>
                              <span className="text-[10px] text-slate-400 font-semibold">{sub.code}</span>
                              {sub.needsSupport && (
                                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                                  Support Needed
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-muted mt-0.5">
                              Teacher: {sub.teacher} • <span className="italic">Remarks: {sub.remarks}</span>
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-sm font-extrabold text-ink">{sub.score}%</span>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${
                              sub.needsSupport ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-blue-100 text-blue-800 border border-blue-200'
                            }`}>
                              {sub.grade}
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-200/80 rounded-full h-1.5 overflow-hidden">
                          <div className={`h-full rounded-full ${sub.color}`} style={{ width: `${sub.score}%` }} />
                        </div>

                        {/* Subscores */}
                        <div className="flex justify-between text-[10px] text-slate-500 font-medium pt-0.5">
                          <span>{sub.subtext1}</span>
                          <span>{sub.subtext2}</span>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* ATTENDANCE TAB */}
            {activeTab === 'attendance' && (
              <div className="space-y-4">
                <div className={`p-4 rounded-2xl border ${
                  student.attendancePct < 75 ? 'bg-rose-50 border-rose-200 text-rose-800' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                }`}>
                  <div className="flex items-start gap-3">
                    {student.attendancePct < 75 ? (
                      <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-bold text-sm">
                        {student.attendancePct < 75 ? 'Low Attendance Alert!' : 'Regular Attendance'}
                      </p>
                      <p className="text-xs mt-1 opacity-90">
                        {student.attendancePct < 75 
                          ? `Student has only ${student.attendancePct}% attendance, which is below the mandatory 75% CBSE requirement.`
                          : `Student maintains a strong attendance record of ${student.attendancePct}%, fully compliant for exams.`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Weekly Presence Matrix */}
                <div className="bg-white p-4 rounded-2xl border border-line shadow-xs space-y-3">
                  <h4 className="font-bold text-ink text-xs flex items-center justify-between">
                    <span>Recent Weekly Attendance Log</span>
                    <span className="text-[10px] text-muted font-normal">Last 5 Days</span>
                  </h4>

                  <div className="grid grid-cols-5 gap-2 text-center">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, idx) => {
                      const isPresent = (idx + student.rollNo) % 5 !== 0;
                      return (
                        <div key={day} className={`p-2.5 rounded-xl border text-xs font-semibold ${
                          isPresent ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'
                        }`}>
                          <p className="text-[10px] opacity-75 uppercase">{day}</p>
                          <p className="font-bold mt-1">{isPresent ? 'P' : 'A'}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* FEE LEDGER TAB */}
            {activeTab === 'fees' && (
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-2xl border border-line shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-line pb-2.5">
                    <h4 className="font-bold text-ink text-xs flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-emerald-600" /> Academic Term Fee Ledger
                    </h4>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      student.feeStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' :
                      student.feeStatus === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {student.feeStatus}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-line">
                      <span className="text-muted">Total Term Fee:</span>
                      <span className="font-bold text-ink">₹{student.feeAmount?.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-line">
                      <span className="text-muted">Paid Amount:</span>
                      <span className="font-bold text-emerald-600">
                        ₹{(student.feeStatus === 'Paid' ? student.feeAmount : 0).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-muted">Outstanding Balance:</span>
                      <span className={`font-bold ${student.feeStatus === 'Paid' ? 'text-slate-400' : 'text-rose-600'}`}>
                        ₹{(student.feeStatus === 'Paid' ? 0 : student.feeAmount).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setPaymentAmount(student.feeAmount);
                      setShowPaymentModal(true);
                    }}
                    className="w-full mt-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <IndianRupee className="w-4 h-4" /> Record / Update Fee Payment
                  </button>
                </div>
              </div>
            )}

            {/* SEND NOTICE TAB */}
            {activeTab === 'notice' && (
              <form onSubmit={handleSendNotice} className="bg-white p-4 rounded-2xl border border-line shadow-xs space-y-3">
                <h4 className="font-bold text-ink text-xs flex items-center gap-2 border-b border-line pb-2.5">
                  <Send className="w-4 h-4 text-primary" /> Direct SMS / Notice to Parent
                </h4>

                {noticeSent && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-2 text-xs font-semibold animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    Notice successfully sent to {student.parentPhone}!
                  </div>
                )}

                <div>
                  <label className="text-[11px] font-semibold text-muted block mb-1">Predefined Quick Note</label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {[
                      'Low attendance reminder',
                      'Pending fee payment request',
                      'Parent-Teacher conference invitation',
                      'Academic performance praise'
                    ].map(tpl => (
                      <button
                        type="button"
                        key={tpl}
                        onClick={() => setCustomNoticeText(`Dear ${student.parentName}, ${tpl} regarding ${student.name}. Please contact Green Valley School office.`)}
                        className="text-[10px] font-semibold bg-slate-100 hover:bg-blue-50 hover:text-primary text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                      >
                        + {tpl}
                      </button>
                    ))}
                  </div>

                  <textarea 
                    rows={4}
                    required
                    value={customNoticeText}
                    onChange={(e) => setCustomNoticeText(e.target.value)}
                    placeholder="Type official notification message here..."
                    className="w-full p-3 border border-line rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/25 bg-slate-50"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Dispatch SMS Notice Now
                </button>
              </form>
            )}

          </div>

          {/* DRAWER FOOTER BUTTONS ROW */}
          <div className="p-4 bg-white border-t border-line flex items-center justify-between gap-3 shrink-0">
            <button 
              onClick={onClose}
              className="px-4 py-2.5 border border-line hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-all text-xs cursor-pointer"
            >
              Close Drawer
            </button>

            <div className="flex items-center gap-2">
              <button 
                onClick={handleDownloadPDF}
                className="px-4 py-2.5 border border-line hover:bg-slate-50 text-slate-800 font-semibold rounded-xl transition-all text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                Report Card (PDF)
              </button>

              <button 
                onClick={() => {
                  setNoticeSent(true);
                  setTimeout(() => setNoticeSent(false), 3000);
                  setActiveTab('notice');
                }}
                className="px-5 py-2.5 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl transition-all text-xs flex items-center gap-2 shadow-md shadow-primary/20 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                Send Dossier to Guardian
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* RECORD PAYMENT MODAL */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-60 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-line animate-fadeIn">
            <div className="flex justify-between items-center border-b border-line pb-2.5">
              <h3 className="font-bold text-ink text-sm flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-emerald-600" /> Record Fee Payment
              </h3>
              <button onClick={() => setShowPaymentModal(false)}>
                <X className="w-4 h-4 text-muted hover:text-ink" />
              </button>
            </div>

            <form onSubmit={handleRecordPaymentSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-muted block mb-1">Fee Status</label>
                <CustomSelect
                  value={paymentStatus}
                  onChange={(val) => setPaymentStatus(val)}
                  options={paymentStatusOptions}
                  className="w-full"
                  menuWidth="w-56"
                />
              </div>

              <div>
                <label className="font-semibold text-muted block mb-1">Amount (₹)</label>
                <input 
                  type="number"
                  required
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full p-2.5 border border-line rounded-xl font-bold text-ink bg-slate-50"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-line">
                <button 
                  type="button" 
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-2 border border-line rounded-xl font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 cursor-pointer"
                >
                  Update Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}