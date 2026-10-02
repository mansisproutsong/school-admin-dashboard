import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'react-router-dom';
import { useFilter } from '../context/FilterContext';
import ClassSelector from '../components/common/ClassSelector';
import StudentDrawer from '../components/common/StudentDrawer';
import EmptyState from '../components/common/EmptyState';
import CustomSelect from '../components/common/CustomSelect';
import { 
  Search, Filter, Eye, UserPlus, X, Download, LayoutGrid, List, 
  Sparkles, Phone, Mail, ArrowUpDown, IndianRupee, CheckCircle2, 
  AlertTriangle, UserCheck, ShieldAlert, GraduationCap, SlidersHorizontal,
  RefreshCw, TrendingUp, Wallet, Users
} from 'lucide-react';

// Helper for dynamic student initials & vibrant avatar gradient colors
const getInitials = (name) => {
  if (!name) return 'ST';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const getAvatarBg = (name) => {
  const gradients = [
    'from-blue-600 to-indigo-600',
    'from-emerald-600 to-teal-700',
    'from-purple-600 to-indigo-700',
    'from-amber-500 to-orange-600',
    'from-rose-500 to-pink-600',
    'from-violet-600 to-purple-700',
    'from-cyan-600 to-blue-700',
    'from-teal-500 to-emerald-700',
    'from-indigo-600 to-blue-700',
    'from-fuchsia-600 to-pink-600'
  ];
  let hash = 0;
  for (let i = 0; i < (name || '').length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % gradients.length;
  return gradients[index];
};

export default function Students() {
  const { getFilteredData, selectedClassId, addStudent, classesList } = useFilter();
  const { students } = getFilteredData();
  const [searchParams, setSearchParams] = useSearchParams();

  // State Management
  const [searchTerm, setSearchTerm] = useState('');
  const [feeFilter, setFeeFilter] = useState('ALL');
  const [attendanceFilter, setAttendanceFilter] = useState('ALL');
  const [performanceFilter, setPerformanceFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('rollNo'); 
  const [viewMode, setViewMode] = useState('table'); 
  
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [visibleCount, setVisibleCount] = useState(25);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync URL Params
  useEffect(() => {
    const filterParam = searchParams.get('filter');
    if (filterParam === 'low_attendance') {
      setAttendanceFilter('LOW');
    } else if (filterParam === 'overdue') {
      setFeeFilter('Overdue');
    } else if (filterParam === 'top_achievers') {
      setPerformanceFilter('HIGH');
    }
  }, [searchParams]);

  // Form state for adding new student
  const [newStudent, setNewStudent] = useState({
    name: '',
    classId: selectedClassId === 'ALL' ? '10-A' : selectedClassId,
    section: 'A',
    rollNo: '',
    feeAmount: 18500,
    feeStatus: 'Paid',
    parentName: '',
    parentPhone: '',
    attendancePct: 95,
    performanceAvg: 85
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateStudent = (e) => {
    e.preventDefault();
    if (!newStudent.name.trim()) return;
    
    addStudent(newStudent);
    setShowAddModal(false);
    showToast(`Successfully registered ${newStudent.name}!`);

    setNewStudent({
      name: '',
      classId: selectedClassId === 'ALL' ? '10-A' : selectedClassId,
      section: 'A',
      rollNo: '',
      feeAmount: 18500,
      feeStatus: 'Paid',
      parentName: '',
      parentPhone: '',
      attendancePct: 95,
      performanceAvg: 85
    });
  };

  // Filter & Sort Logic
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch = 
        !query || 
        student.name.toLowerCase().includes(query) ||
        student.rollNo.toString().toLowerCase().includes(query) ||
        (student.parentName && student.parentName.toLowerCase().includes(query)) ||
        (student.id && student.id.toLowerCase().includes(query));

      const matchesFee = feeFilter === 'ALL' || student.feeStatus === feeFilter;
      
      const matchesAttendance = 
        attendanceFilter === 'ALL' || 
        (attendanceFilter === 'LOW' && student.attendancePct < 75) ||
        (attendanceFilter === 'HIGH' && student.attendancePct >= 90);

      const matchesPerformance = 
        performanceFilter === 'ALL' ||
        (performanceFilter === 'HIGH' && student.performanceAvg >= 85) ||
        (performanceFilter === 'AVERAGE' && student.performanceAvg >= 65 && student.performanceAvg < 85) ||
        (performanceFilter === 'NEEDS_ATTENTION' && student.performanceAvg < 65);

      return matchesSearch && matchesFee && matchesAttendance && matchesPerformance;
    }).sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'attendance') return b.attendancePct - a.attendancePct;
      if (sortBy === 'performance') return b.performanceAvg - a.performanceAvg;
      if (sortBy === 'feeStatus') return a.feeStatus.localeCompare(b.feeStatus);
      const rollA = parseInt(a.rollNo) || 0;
      const rollB = parseInt(b.rollNo) || 0;
      return rollA - rollB;
    });
  }, [students, searchTerm, feeFilter, attendanceFilter, performanceFilter, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setFeeFilter('ALL');
    setAttendanceFilter('ALL');
    setPerformanceFilter('ALL');
    setSortBy('rollNo');
    setSearchParams({});
    showToast('Filters cleared');
  };

  // Export to CSV
  const exportToCSV = () => {
    if (filteredStudents.length === 0) return;

    const headers = ['Student ID', 'Full Name', 'Class ID', 'Roll No', 'Attendance (%)', 'Academic Performance (%)', 'Fee Status', 'Fee Amount (INR)', 'Parent Name', 'Parent Phone'];
    const csvRows = [
      headers.join(','),
      ...filteredStudents.map(s => [
        `"${s.id || ''}"`,
        `"${s.name.replace(/"/g, '""')}"`,
        `"${s.classId || ''}"`,
        `"${s.rollNo || ''}"`,
        s.attendancePct || 0,
        s.performanceAvg || 0,
        `"${s.feeStatus || ''}"`,
        s.feeAmount || 0,
        `"${(s.parentName || '').replace(/"/g, '""')}"`,
        `"${s.parentPhone || ''}"`
      ].join(','))
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Students_Directory_${selectedClassId}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Student directory exported to CSV!');
  };

  // KPI Calculations
  const totalCount = students.length;
  const avgAttendance = totalCount > 0 ? Math.round(students.reduce((acc, curr) => acc + curr.attendancePct, 0) / totalCount) : 0;
  const lowAttendanceCount = students.filter(s => s.attendancePct < 75).length;
  const avgPerformance = totalCount > 0 ? Math.round(students.reduce((acc, curr) => acc + curr.performanceAvg, 0) / totalCount) : 0;
  const topPerformersCount = students.filter(s => s.performanceAvg >= 85).length;
  const pendingFeeCount = students.filter(s => s.feeStatus !== 'Paid').length;
  const totalPendingAmount = students.filter(s => s.feeStatus !== 'Paid').reduce((acc, curr) => acc + curr.feeAmount, 0);

  const hasActiveFilters = searchTerm !== '' || feeFilter !== 'ALL' || attendanceFilter !== 'ALL' || performanceFilter !== 'ALL';

  // Custom Select Options
  const attendanceOptions = [
    { value: 'ALL', label: 'All Rates' },
    { value: 'LOW', label: 'Below 75% (Alert)', icon: AlertTriangle, color: 'text-rose-500' },
    { value: 'HIGH', label: '90%+ (High)', icon: CheckCircle2, color: 'text-emerald-500' }
  ];

  const feeOptions = [
    { value: 'ALL', label: 'All Statuses' },
    { value: 'Paid', label: 'Paid', badge: 'bg-emerald-100 text-emerald-800' },
    { value: 'Pending', label: 'Pending', badge: 'bg-amber-100 text-amber-800' },
    { value: 'Overdue', label: 'Overdue', badge: 'bg-rose-100 text-rose-800' }
  ];

  const sortOptions = [
    { value: 'rollNo', label: 'Roll Number' },
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'attendance', label: 'Attendance (High-Low)' },
    { value: 'performance', label: 'Academic Marks' },
    { value: 'feeStatus', label: 'Fee Status' }
  ];

  const classFormOptions = classesList.map(c => ({ value: c.id, label: `Class ${c.id}` }));
  const feeFormOptions = [
    { value: 'Paid', label: 'Paid', badge: 'bg-emerald-100 text-emerald-800' },
    { value: 'Pending', label: 'Pending', badge: 'bg-amber-100 text-amber-800' },
    { value: 'Overdue', label: 'Overdue', badge: 'bg-rose-100 text-rose-800' }
  ];

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-slideInRight text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Class Selector Bar */}
      <ClassSelector />

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-line shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-ink tracking-tight">Student Management</h1>
            <span className="bg-primary/10 text-primary font-bold text-xs px-2.5 py-0.5 rounded-full border border-primary/20">
              {filteredStudents.length} {filteredStudents.length === 1 ? 'Student' : 'Students'}
            </span>
          </div>
          <p className="text-xs text-muted mt-1">
            {selectedClassId === 'ALL' 
              ? `Comprehensive roster for all ${totalCount} enrolled students across Green Valley Academy` 
              : `Enrolled student directory for Class ${selectedClassId}`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {/* Quick Preset Filter Buttons */}
          <button
            onClick={() => { setAttendanceFilter(attendanceFilter === 'LOW' ? 'ALL' : 'LOW'); setFeeFilter('ALL'); }}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border ${
              attendanceFilter === 'LOW' 
                ? 'bg-rose-50 text-rose-700 border-rose-200 ring-2 ring-rose-400/20' 
                : 'bg-slate-50 text-slate-700 border-line hover:bg-slate-100'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
            Low Attendance ({lowAttendanceCount})
          </button>

          <button
            onClick={() => { setFeeFilter(feeFilter === 'Overdue' ? 'ALL' : 'Overdue'); setAttendanceFilter('ALL'); }}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border ${
              feeFilter === 'Overdue' 
                ? 'bg-amber-50 text-amber-700 border-amber-200 ring-2 ring-amber-400/20' 
                : 'bg-slate-50 text-slate-700 border-line hover:bg-slate-100'
            }`}
          >
            <IndianRupee className="w-3.5 h-3.5 text-amber-500" />
            Overdue Fees ({students.filter(s => s.feeStatus === 'Overdue').length})
          </button>

          <button 
            onClick={exportToCSV}
            className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 transition-colors"
            title="Export filtered directory to CSV"
          >
            <Download className="w-4 h-4 text-slate-600" /> Export CSV
          </button>

          <button 
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 bg-primary hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-primary/20"
          >
            <UserPlus className="w-4 h-4" /> Add Student
          </button>
        </div>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Enrolled */}
        <div className="bg-white p-5 rounded-2xl border border-line shadow-xs relative overflow-hidden group hover:border-blue-300 transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted uppercase tracking-wider">Total Enrolled</p>
            <div className="p-2 bg-blue-50 text-primary rounded-xl">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-ink mt-2">{totalCount}</p>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-line text-[11px] text-muted">
            <span>Class Scope: <strong className="text-ink">{selectedClassId}</strong></span>
            <span className="text-emerald-600 font-semibold">100% Capacity</span>
          </div>
        </div>

        {/* Average Attendance */}
        <div className="bg-white p-5 rounded-2xl border border-line shadow-xs relative overflow-hidden group hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted uppercase tracking-wider">Avg Attendance</p>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-2xl font-bold text-emerald-600">{avgAttendance}%</p>
            {lowAttendanceCount > 0 && (
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                {lowAttendanceCount} below 75%
              </span>
            )}
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${avgAttendance}%` }} />
          </div>
        </div>

        {/* Academic Average */}
        <div className="bg-white p-5 rounded-2xl border border-line shadow-xs relative overflow-hidden group hover:border-purple-300 transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted uppercase tracking-wider">Academic Score</p>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-2xl font-bold text-purple-600">{avgPerformance}%</p>
            <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
              {topPerformersCount} Achievers (&gt;85%)
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div className="bg-purple-600 h-full rounded-full" style={{ width: `${avgPerformance}%` }} />
          </div>
        </div>

        {/* Pending Fee Students */}
        <div className="bg-white p-5 rounded-2xl border border-line shadow-xs relative overflow-hidden group hover:border-rose-300 transition-all">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted uppercase tracking-wider">Fee Collection</p>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-2xl font-bold text-rose-600">{pendingFeeCount}</p>
            <span className="text-[11px] text-muted">Students Pending</span>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-line text-[11px] text-muted">
            <span>Outstanding:</span>
            <strong className="text-rose-600">₹{totalPendingAmount.toLocaleString('en-IN')}</strong>
          </div>
        </div>

      </div>

      {/* Controls Bar: Search, Custom Select Filters & View Switcher */}
      <div className="bg-white p-4 rounded-2xl border border-line shadow-xs space-y-3">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative w-full lg:max-w-xs">
            <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search student, roll, parent..."
              className="w-full pl-10 pr-9 py-2 rounded-xl border border-line text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/25 transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Custom Select Dropdowns & View Switcher */}
          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-2.5 w-full lg:w-auto">
            
            {/* Custom Attendance Select */}
            <CustomSelect
              label="Attendance:"
              value={attendanceFilter}
              onChange={(val) => setAttendanceFilter(val)}
              options={attendanceOptions}
              menuWidth="w-48"
            />

            {/* Custom Fee Status Select */}
            <CustomSelect
              label="Fee Status:"
              value={feeFilter}
              onChange={(val) => setFeeFilter(val)}
              options={feeOptions}
              menuWidth="w-44"
            />

            {/* Custom Sort Select */}
            <CustomSelect
              label="Sort:"
              icon={ArrowUpDown}
              value={sortBy}
              onChange={(val) => setSortBy(val)}
              options={sortOptions}
              menuWidth="w-52"
            />

            {/* Dual View Mode Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  viewMode === 'table' ? 'bg-white text-primary shadow-xs font-bold' : 'text-muted hover:text-ink'
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs transition-all ${
                  viewMode === 'grid' ? 'bg-white text-primary shadow-xs font-bold' : 'text-muted hover:text-ink'
                }`}
                title="Grid / Cards View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-2 rounded-xl border border-rose-200 transition-colors flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset
              </button>
            )}

          </div>

        </div>

      </div>

      {/* Main Content Area */}
      {filteredStudents.length === 0 ? (
        <EmptyState 
          message="No student profiles match your selected search or filter criteria."
          onClearFilter={clearFilters} 
        />
      ) : (
        <>
          {/* VIEW MODE 1: TABLE VIEW */}
          {viewMode === 'table' && (
            <div className="bg-white rounded-2xl border border-line shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-xs text-left">
                  <thead>
                    <tr className="text-muted border-b border-line bg-slate-50/80 font-bold uppercase tracking-wider text-[10px]">
                      <th className="py-3.5 px-5">Student Details</th>
                      <th className="py-3.5 px-3">Class & Sec</th>
                      <th className="py-3.5 px-3">Roll No</th>
                      <th className="py-3.5 px-3">Attendance</th>
                      <th className="py-3.5 px-3">Academic Avg</th>
                      <th className="py-3.5 px-3">Parent Contact</th>
                      <th className="py-3.5 px-3">Fee Status</th>
                      <th className="py-3.5 px-5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {filteredStudents.slice(0, visibleCount).map((student) => (
                      <tr 
                        key={student.id} 
                        onClick={() => setSelectedStudent(student)}
                        className="hover:bg-blue-50/40 cursor-pointer transition-colors group"
                      >
                        {/* Name & Avatar */}
                        <td className="py-3.5 px-5 font-semibold text-ink">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-2xl bg-gradient-to-tr ${getAvatarBg(student.name)} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs border border-white/20`}>
                              {getInitials(student.name)}
                            </div>
                            <div>
                              <p className="font-bold text-ink group-hover:text-primary transition-colors">{student.name}</p>
                              <p className="text-[10px] text-muted">ID: {student.id}</p>
                            </div>
                          </div>
                        </td>

                        {/* Class */}
                        <td className="py-3.5 px-3 font-medium text-slate-700">
                          <span className="bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold">
                            Class {student.classId}
                          </span>
                        </td>

                        {/* Roll No */}
                        <td className="py-3.5 px-3 font-semibold text-slate-700">{student.rollNo}</td>

                        {/* Attendance */}
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden hidden sm:block">
                              <div 
                                className={`h-full rounded-full ${student.attendancePct >= 75 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                                style={{ width: `${student.attendancePct}%` }}
                              />
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                              student.attendancePct < 75 ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'text-slate-800'
                            }`}>
                              {student.attendancePct}%
                            </span>
                          </div>
                        </td>

                        {/* Academic Avg */}
                        <td className="py-3.5 px-3 font-bold text-purple-700">
                          <span className="bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100">
                            {student.performanceAvg}%
                          </span>
                        </td>

                        {/* Parent Phone */}
                        <td className="py-3.5 px-3 text-muted text-xs">
                          <p className="font-semibold text-slate-700">{student.parentName || 'Parent'}</p>
                          <p className="text-[10px] text-muted">{student.parentPhone || '+91 98765 43210'}</p>
                        </td>

                        {/* Fee Status */}
                        <td className="py-3.5 px-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            student.feeStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' :
                            student.feeStatus === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {student.feeStatus}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-5 text-right">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setSelectedStudent(student); }}
                            className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-colors"
                            title="View Full Profile"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW MODE 2: GRID / CARDS VIEW */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStudents.slice(0, visibleCount).map((student) => (
                <div 
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className="bg-white rounded-2xl border border-line shadow-xs hover:shadow-md transition-all p-5 space-y-4 cursor-pointer relative group border-t-4 border-t-primary"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${getAvatarBg(student.name)} text-white font-bold flex items-center justify-center text-sm shadow-sm border border-white/20`}>
                        {getInitials(student.name)}
                      </div>
                      <div>
                        <h3 className="font-bold text-ink text-sm group-hover:text-primary transition-colors">{student.name}</h3>
                        <p className="text-xs text-muted">Class {student.classId} • Roll No: {student.rollNo}</p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      student.feeStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' :
                      student.feeStatus === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {student.feeStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-line">
                      <p className="text-[10px] text-muted font-medium">Attendance</p>
                      <p className={`font-bold mt-0.5 ${student.attendancePct < 75 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {student.attendancePct}%
                      </p>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-line">
                      <p className="text-[10px] text-muted font-medium">Academic Mark</p>
                      <p className="font-bold text-purple-700 mt-0.5">{student.performanceAvg}%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-line text-muted">
                    <div className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{student.parentName || 'Parent'}</span>
                    </div>
                    <span className="font-bold text-primary flex items-center gap-1 group-hover:underline">
                      View Profile &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Pagination */}
          {visibleCount < filteredStudents.length && (
            <div className="p-4 text-center bg-white rounded-2xl border border-line shadow-xs">
              <button 
                onClick={() => setVisibleCount(prev => prev + 25)}
                className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-blue-700 bg-primary/10 hover:bg-primary/20 px-6 py-2.5 rounded-xl transition-all"
              >
                Load More ({filteredStudents.length - visibleCount} Remaining)
              </button>
            </div>
          )}
        </>
      )}

      {/* REGISTER NEW STUDENT MODAL */}
      {showAddModal && createPortal(
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl border border-line animate-fadeIn">
            
            <div className="flex justify-between items-center border-b border-line pb-3">
              <div>
                <h3 className="font-bold text-ink text-base flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-primary" /> Register New Student
                </h3>
                <p className="text-xs text-muted">Add student to Green Valley official registry</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 text-muted hover:text-ink rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-3 text-xs">
              
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Full Student Name *</label>
                <input 
                  required 
                  type="text" 
                  value={newStudent.name} 
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})} 
                  placeholder="e.g. Ananya Sharma" 
                  className="w-full p-2.5 border border-line rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/25 bg-slate-50" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Class</label>
                  <CustomSelect
                    value={newStudent.classId}
                    onChange={(val) => setNewStudent({...newStudent, classId: val})}
                    options={classFormOptions}
                    className="w-full"
                    menuWidth="w-48"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Roll Number *</label>
                  <input 
                    required 
                    type="text" 
                    value={newStudent.rollNo} 
                    onChange={(e) => setNewStudent({...newStudent, rollNo: e.target.value})} 
                    placeholder="e.g. 42" 
                    className="w-full p-2.5 border border-line rounded-xl bg-slate-50" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Parent / Guardian Name *</label>
                  <input 
                    required 
                    type="text" 
                    value={newStudent.parentName} 
                    onChange={(e) => setNewStudent({...newStudent, parentName: e.target.value})} 
                    placeholder="e.g. Vikram Sharma" 
                    className="w-full p-2.5 border border-line rounded-xl bg-slate-50" 
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Parent Phone *</label>
                  <input 
                    required 
                    type="text" 
                    value={newStudent.parentPhone} 
                    onChange={(e) => setNewStudent({...newStudent, parentPhone: e.target.value})} 
                    placeholder="+91 98765 43210" 
                    className="w-full p-2.5 border border-line rounded-xl bg-slate-50" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Term Fee Amount (₹)</label>
                  <input 
                    type="number" 
                    value={newStudent.feeAmount} 
                    onChange={(e) => setNewStudent({...newStudent, feeAmount: Number(e.target.value)})} 
                    className="w-full p-2.5 border border-line rounded-xl bg-slate-50" 
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Initial Fee Status</label>
                  <CustomSelect
                    value={newStudent.feeStatus}
                    onChange={(val) => setNewStudent({...newStudent, feeStatus: val})}
                    options={feeFormOptions}
                    className="w-full"
                    menuWidth="w-44"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-line">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)} 
                  className="px-4 py-2.5 border border-line rounded-xl hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-blue-700 shadow-md shadow-primary/20"
                >
                  Save & Register Student
                </button>
              </div>

            </form>
          </div>
        </div>,
        document.body
      )}

      {/* STUDENT PROFILE DRAWER */}
      <StudentDrawer 
        student={selectedStudent} 
        onClose={() => setSelectedStudent(null)} 
      />

    </div>
  );
}