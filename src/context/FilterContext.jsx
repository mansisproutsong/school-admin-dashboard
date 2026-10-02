import React, { createContext, useContext, useState } from 'react';
import { classesList as initialClasses, studentsData as initialStudents, overallKPIs, eventsList as initialEvents, noticesList as initialNotices } from '../data/mockData';

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [selectedClassId, setSelectedClassId] = useState('ALL');
  const [selectedSection, setSelectedSection] = useState('ALL');
  const [dateRange, setDateRange] = useState('This Term'); // 'This Week' | 'This Month' | 'This Term'
  
  const [students, setStudents] = useState(initialStudents);
  const [notices, setNotices] = useState(initialNotices);
  const [events, setEvents] = useState(initialEvents);

  // Helper function to add a new student
  const addStudent = (studentObj) => {
    const newId = `S${100 + students.length + 1}`;
    setStudents(prev => [
      {
        id: newId,
        name: studentObj.name,
        classId: studentObj.classId || '10-A',
        section: studentObj.section || 'A',
        rollNo: studentObj.rollNo || String(students.length + 1),
        attendancePct: Number(studentObj.attendancePct) || 92,
        feeStatus: studentObj.feeStatus || 'Paid',
        feeAmount: Number(studentObj.feeAmount) || 18500,
        performanceAvg: Number(studentObj.performanceAvg) || 82,
        parentName: studentObj.parentName || 'Parent Name',
        parentPhone: studentObj.parentPhone || '+91 98765 00000',
        status: studentObj.status || 'Present'
      },
      ...prev
    ]);
  };

  // Helper to record / update fee payment
  const recordPayment = (studentId, amount, status) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return { ...s, feeStatus: status, feeAmount: Number(amount) };
      }
      return s;
    }));
  };

  // Helper to add notice
  const addNotice = (noticeObj) => {
    setNotices(prev => [
      {
        id: `N${prev.length + 1}`,
        title: noticeObj.title,
        category: noticeObj.category || 'General',
        priority: noticeObj.priority || 'Medium',
        date: 'Just Now',
        targetClass: noticeObj.targetClass || 'ALL'
      },
      ...prev
    ]);
  };

  // Helper to add event
  const addEvent = (eventObj) => {
    setEvents(prev => [
      {
        id: `E${prev.length + 1}`,
        title: eventObj.title,
        date: eventObj.date || 'Oct 25, 2026',
        time: eventObj.time || '10:00 AM',
        category: eventObj.category || 'Academic',
        icon: 'calendar'
      },
      ...prev
    ]);
  };

  // Dynamic filter output calculator
  const getFilteredData = () => {
    const rangeMultiplier = dateRange === 'This Week' ? 0.25 : dateRange === 'This Month' ? 0.65 : 1.0;
    const rangeLabel = dateRange;

    if (selectedClassId === 'ALL') {
      const presentCount = Math.round(1153 * rangeMultiplier);
      const absentCount = Math.round(95 * rangeMultiplier);
      const feeCol = (18.6 * (dateRange === 'This Week' ? 0.3 : dateRange === 'This Month' ? 0.7 : 1.0)).toFixed(1);

      return {
        isOverall: true,
        scopeText: `Showing overall institution metrics (${students.length + 1240} Students | 86 Staff | 42 Classes) • [${rangeLabel}]`,
        dateRange,
        kpis: {
          ...overallKPIs,
          totalStudents: `${students.length + 1240}`,
          attendanceBreakdown: `${presentCount} Present • ${absentCount} Absent`,
          feeCollected: `₹${feeCol}L`,
          feeExpected: `₹22L`,
        },
        students: students,
        classDetails: null,
        attendanceChartData: [
          { day: 'Mon', Present: Math.round(92 * (dateRange === 'This Week' ? 1.0 : 1.0)), Absent: 8 },
          { day: 'Tue', Present: Math.round(94 * (dateRange === 'This Week' ? 0.95 : 1.0)), Absent: 6 },
          { day: 'Wed', Present: Math.round(91 * (dateRange === 'This Week' ? 0.98 : 1.0)), Absent: 9 },
          { day: 'Thu', Present: Math.round(95 * (dateRange === 'This Week' ? 1.02 : 1.0)), Absent: 5 },
          { day: 'Fri', Present: Math.round(89 * (dateRange === 'This Week' ? 0.9 : 1.0)), Absent: 11 },
          { day: 'Sat', Present: Math.round(87 * (dateRange === 'This Week' ? 0.85 : 1.0)), Absent: 13 },
        ],
        feeMonthlyData: [
          { month: 'Apr', Collected: Number((3.2 * rangeMultiplier).toFixed(1)) },
          { month: 'May', Collected: Number((4.5 * rangeMultiplier).toFixed(1)) },
          { month: 'Jun', Collected: Number((3.8 * rangeMultiplier).toFixed(1)) },
          { month: 'Jul', Collected: Number((4.1 * rangeMultiplier).toFixed(1)) },
          { month: 'Aug', Collected: Number((3.0 * rangeMultiplier).toFixed(1)) },
        ],
        subjectPerformanceData: [
          { subject: 'Maths', score: 82 },
          { subject: 'Science', score: 79 },
          { subject: 'English', score: 88 },
          { subject: 'Comp Sci', score: 94 },
          { subject: 'Social Studies', score: 76 },
        ]
      };
    }

    const cls = initialClasses.find(c => c.id === selectedClassId) || initialClasses[0];
    const filteredStudents = students.filter(s => s.classId === selectedClassId);
    const count = filteredStudents.length || cls.studentCount;

    const baseAttendance = cls.attendancePct || 92;
    const presentCount = Math.round(count * (baseAttendance / 100));
    const absentCount = count - presentCount;
    const feeCol = (cls.feeCollectionPct * 0.058 * (dateRange === 'This Week' ? 0.3 : dateRange === 'This Month' ? 0.7 : 1.0)).toFixed(1);

    const classOffset = selectedClassId.charCodeAt(0) % 5;

    return {
      isOverall: false,
      scopeText: `Showing filtered data for Class ${selectedClassId} (${count} Students | Teacher: ${cls.teacher}) • [${rangeLabel}]`,
      dateRange,
      kpis: {
        totalStudents: `${count}`,
        studentGrowth: `Capacity ${cls.capacity}`,
        attendancePct: `${cls.attendancePct}%`,
        attendanceBreakdown: `${presentCount} Present • ${absentCount} Absent`,
        feeCollected: `₹${feeCol}L`,
        feeExpected: `₹5.8L`,
        feePct: `${cls.feeCollectionPct}%`,
        academicAvg: `${cls.avgScore}%`,
        academicGrowth: `Class Average`
      },
      students: filteredStudents.length ? filteredStudents : students.slice(0, 3),
      classDetails: cls,
      attendanceChartData: [
        { day: 'Mon', Present: Math.min(count, presentCount - classOffset), Absent: Math.max(0, absentCount + classOffset) },
        { day: 'Tue', Present: Math.min(count, presentCount + 1), Absent: Math.max(0, absentCount - 1) },
        { day: 'Wed', Present: Math.min(count, presentCount - 2), Absent: Math.max(0, absentCount + 2) },
        { day: 'Thu', Present: Math.min(count, presentCount + 2), Absent: Math.max(0, absentCount - 2) },
        { day: 'Fri', Present: Math.min(count, presentCount - 1), Absent: Math.max(0, absentCount + 1) },
        { day: 'Sat', Present: Math.min(count, presentCount - 3), Absent: Math.max(0, absentCount + 3) },
      ],
      feeMonthlyData: [
        { month: 'Apr', Collected: Number((0.8 + classOffset * 0.1).toFixed(1)) },
        { month: 'May', Collected: Number((1.2 + classOffset * 0.1).toFixed(1)) },
        { month: 'Jun', Collected: Number((0.9 + classOffset * 0.1).toFixed(1)) },
        { month: 'Jul', Collected: Number((1.1 + classOffset * 0.1).toFixed(1)) },
        { month: 'Aug', Collected: Number((0.7 + classOffset * 0.1).toFixed(1)) },
      ],
      subjectPerformanceData: [
        { subject: 'Maths', score: Math.min(100, cls.avgScore + (classOffset - 2) * 3) },
        { subject: 'Science', score: Math.min(100, cls.avgScore - (classOffset - 1) * 2) },
        { subject: 'English', score: Math.min(100, cls.avgScore + 5) },
        { subject: 'Comp Sci', score: Math.min(100, cls.avgScore + 8) },
        { subject: 'Social Studies', score: Math.min(100, cls.avgScore - 4) },
      ]
    };
  };

  return (
    <FilterContext.Provider value={{
      selectedClassId,
      setSelectedClassId,
      selectedSection,
      setSelectedSection,
      dateRange,
      setDateRange,
      getFilteredData,
      classesList: initialClasses,
      students,
      addStudent,
      recordPayment,
      notices,
      addNotice,
      events,
      addEvent
    }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}