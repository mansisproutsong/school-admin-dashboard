import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFilter } from '../context/FilterContext';
import ClassSelector from '../components/common/ClassSelector';
import StudentDrawer from '../components/common/StudentDrawer';
import EmptyState from '../components/common/EmptyState';
import { Search, Filter, Eye, UserPlus, X } from 'lucide-react';

export default function Students() {
  const { getFilteredData, selectedClassId, addStudent, classesList } = useFilter();
  const { students } = getFilteredData();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState('');
  const [feeFilter, setFeeFilter] = useState('ALL');
  const [attendanceFilter, setAttendanceFilter] = useState('ALL');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [visibleCount, setVisibleCount] = useState(50); // Pagination/lazy load

  useEffect(() => {
    const filterParam = searchParams.get('filter');
    if (filterParam === 'low_attendance') {
      setAttendanceFilter('LOW');
    } else if (filterParam === 'overdue') {
      setFeeFilter('Overdue');
    }
  }, [searchParams]);

  const [newStudent, setNewStudent] = useState({
    name: '',
    classId: selectedClassId === 'ALL' ? '10-A' : selectedClassId,
    rollNo: '',
    feeAmount: 18500,
    feeStatus: 'Paid',
    parentName: '',
    parentPhone: '',
    attendancePct: 95,
    performanceAvg: 85
  });

  const handleCreateStudent = (e) => {
    e.preventDefault();
    if (!newStudent.name.trim()) return;
    addStudent(newStudent);
    setShowAddModal(false);
    setNewStudent({
      name: '',
      classId: selectedClassId === 'ALL' ? '10-A' : selectedClassId,
      rollNo: '',
      feeAmount: 18500,
      feeStatus: 'Paid',
      parentName: '',
      parentPhone: '',
      attendancePct: 95,
      performanceAvg: 85
    });
  };

  const displayedStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.rollNo.includes(searchTerm);
    const matchesFee = feeFilter === 'ALL' || student.feeStatus === feeFilter;
    const matchesAttendance = attendanceFilter === 'ALL' || (attendanceFilter === 'LOW' && student.attendancePct < 75);
    return matchesSearch && matchesFee && matchesAttendance;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setFeeFilter('ALL');
    setAttendanceFilter('ALL');
    setSearchParams({});
  };

  return (
    <div className="space-y-6">
      <ClassSelector />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-ink">Student Management</h1>
          <p className="text-xs text-muted mt-0.5">
            {selectedClassId === 'ALL' 
              ? `Showing all ${students.length} enrolled students across Green Valley` 
              : `Showing ${students.length} students enrolled in Class ${selectedClassId}`}
          </p>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-btn hover:bg-blue-700 shrink-0 shadow-sm"
        >
          <UserPlus className="w-4 h-4" /> Add Student
        </button>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-card border border-line shadow-soft">
          <p className="text-2xl font-bold text-ink">{students.length}</p>
          <p className="text-xs text-muted mt-1">Total Enrolled Students</p>
        </div>
        <div className="bg-white p-5 rounded-card border border-line shadow-soft">
          <p className="text-2xl font-bold text-success">
            {students.length > 0 ? Math.round(students.reduce((acc, curr) => acc + curr.attendancePct, 0) / students.length) : 0}%
          </p>
          <p className="text-xs text-muted mt-1">Average Attendance</p>
        </div>
        <div className="bg-white p-5 rounded-card border border-line shadow-soft">
          <p className="text-2xl font-bold text-purple-600">
            {students.length > 0 ? Math.round(students.reduce((acc, curr) => acc + curr.performanceAvg, 0) / students.length) : 0}%
          </p>
          <p className="text-xs text-muted mt-1">Academic Average</p>
        </div>
        <div className="bg-white p-5 rounded-card border border-line shadow-soft">
          <p className="text-2xl font-bold text-danger">
            {students.filter(s => s.feeStatus !== 'Paid').length}
          </p>
          <p className="text-xs text-muted mt-1">Pending Fee Students</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-card border border-line shadow-soft flex flex-col sm:flex-row flex-wrap items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search student by name or roll no..."
            className="w-full pl-9 pr-3 py-2 rounded-inp border border-line text-xs bg-bg focus:outline-none focus:ring-2 focus:ring-primary/25"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted">Attendance:</span>
            <select 
              value={attendanceFilter}
              onChange={(e) => setAttendanceFilter(e.target.value)}
              className="bg-bg border border-line text-xs font-semibold rounded-inp px-3 py-1.5 focus:outline-none"
            >
              <option value="ALL">All</option>
              <option value="LOW">Below 75%</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted">Fee Status:</span>
            <select 
              value={feeFilter}
              onChange={(e) => setFeeFilter(e.target.value)}
              className="bg-bg border border-line text-xs font-semibold rounded-inp px-3 py-1.5 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {displayedStudents.length === 0 ? (
        <EmptyState 
          message="No students found matching your filters."
          onClearFilter={clearFilters} 
        />
      ) : (
        <div className="bg-white rounded-card border border-line shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-xs text-left">
              <thead>
                <tr className="text-muted border-b border-line bg-slate-50 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-5">Student Name</th>
                  <th className="py-3 px-3">Class</th>
                  <th className="py-3 px-3">Roll No</th>
                  <th className="py-3 px-3">Attendance</th>
                  <th className="py-3 px-3">Performance</th>
                  <th className="py-3 px-3">Fee Status</th>
                  <th className="py-3 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {displayedStudents.slice(0, visibleCount).map((student) => (
                  <tr 
                    key={student.id} 
                    onClick={() => setSelectedStudent(student)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-5 font-semibold text-ink flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">
                        {student.name.charAt(0)}
                      </div>
                      <span>{student.name}</span>
                    </td>
                    <td className="py-3.5 px-3 font-medium text-muted">Class {student.classId}</td>
                    <td className="py-3.5 px-3 font-medium text-muted">{student.rollNo}</td>
                    <td className="py-3.5 px-3 font-semibold text-ink">
                      <span className={`px-2 py-0.5 rounded-full ${student.attendancePct < 75 ? 'bg-danger/10 text-danger font-bold' : 'text-ink'}`}>
                        {student.attendancePct}%
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-purple-600">{student.performanceAvg}%</td>
                    <td className="py-3.5 px-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        student.feeStatus === 'Paid' ? 'bg-success/10 text-success' :
                        student.feeStatus === 'Pending' ? 'bg-warning/10 text-warning' : 'bg-danger/10 text-danger'
                      }`}>
                        {student.feeStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedStudent(student); }}
                        className="p-1.5 text-muted hover:text-primary hover:bg-primary/10 rounded-btn"
                        title="View Student Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {visibleCount < displayedStudents.length && (
            <div className="p-3 border-t border-line text-center bg-slate-50">
              <button 
                onClick={() => setVisibleCount(prev => prev + 50)}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Load More Students
              </button>
            </div>
          )}
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-ink/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-card w-full max-w-md p-6 space-y-4 shadow-xl border border-line animate-fadeIn">
            <div className="flex justify-between items-center border-b border-line pb-3">
              <h3 className="font-bold text-ink text-sm flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-primary" /> Register New Student
              </h3>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-5 h-5 text-muted hover:text-ink" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-muted">Full Name</label>
                <input required type="text" value={newStudent.name} onChange={(e) => setNewStudent({...newStudent, name: e.target.value})} placeholder="e.g. Rahul Verma" className="w-full mt-1 p-2.5 border border-line rounded-inp focus:outline-none focus:ring-2 focus:ring-primary/25" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-muted">Class</label>
                  <select value={newStudent.classId} onChange={(e) => setNewStudent({...newStudent, classId: e.target.value})} className="w-full mt-1 p-2.5 border border-line rounded-inp focus:outline-none">
                    {classesList.map((c) => (
                      <option key={c.id} value={c.id}>Class {c.id}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-muted">Roll Number</label>
                  <input required type="text" value={newStudent.rollNo} onChange={(e) => setNewStudent({...newStudent, rollNo: e.target.value})} placeholder="e.g. 25" className="w-full mt-1 p-2.5 border border-line rounded-inp" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-muted">Parent Name</label>
                  <input required type="text" value={newStudent.parentName} onChange={(e) => setNewStudent({...newStudent, parentName: e.target.value})} placeholder="e.g. Rajesh Verma" className="w-full mt-1 p-2.5 border border-line rounded-inp" />
                </div>
                <div>
                  <label className="font-semibold text-muted">Parent Phone</label>
                  <input required type="text" value={newStudent.parentPhone} onChange={(e) => setNewStudent({...newStudent, parentPhone: e.target.value})} placeholder="+91 98765 43210" className="w-full mt-1 p-2.5 border border-line rounded-inp" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-muted">Term Fee Amount (₹)</label>
                  <input type="number" value={newStudent.feeAmount} onChange={(e) => setNewStudent({...newStudent, feeAmount: e.target.value})} className="w-full mt-1 p-2.5 border border-line rounded-inp" />
                </div>
                <div>
                  <label className="font-semibold text-muted">Fee Status</label>
                  <select value={newStudent.feeStatus} onChange={(e) => setNewStudent({...newStudent, feeStatus: e.target.value})} className="w-full mt-1 p-2.5 border border-line rounded-inp">
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-line">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-line rounded-btn hover:bg-slate-50 font-semibold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white font-bold rounded-btn hover:bg-blue-700">Save Student</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <StudentDrawer student={selectedStudent} onClose={() => setSelectedStudent(null)} />
    </div>
  );
}