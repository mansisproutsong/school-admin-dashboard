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

  const addStudent = (studentObj) => {
    const newId = `S${students.length + 1000}`;
    setStudents(prev => [
      {
        id: newId,
        name: studentObj.name,
        classId: studentObj.classId || '10-A',
        section: studentObj.section || 'A',
        rollNo: studentObj.rollNo || String(prev.length + 1),
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

  const recordPayment = (studentId, amount, status) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return { ...s, feeStatus: status, feeAmount: Number(amount) };
      }
      return s;
    }));
  };

  const addNotice = (noticeObj) => {
    setNotices(prev => [{
      id: `N${prev.length + 1}`,
      title: noticeObj.title,
      category: noticeObj.category || 'General',
      priority: noticeObj.priority || 'Medium',
      date: 'Just Now',
      targetClass: noticeObj.targetClass || 'ALL'
    }, ...prev]);
  };

  const addEvent = (eventObj) => {
    setEvents(prev => [{
      id: `E${prev.length + 1}`,
      title: eventObj.title,
      date: eventObj.date || 'Oct 25, 2026',
      time: eventObj.time || '10:00 AM',
      category: eventObj.category || 'Academic',
      icon: 'calendar'
    }, ...prev]);
  };

  const getFilteredData = () => {
    const filteredStudents = selectedClassId === 'ALL' 
      ? students 
      : students.filter(s => s.classId === selectedClassId);

    const count = filteredStudents.length;
    let presentCount = 0;
    let totalAttendancePct = 0;
    let totalPerformance = 0;
    let totalFeeExpected = 0;
    let totalFeeCollected = 0;

    filteredStudents.forEach(s => {
      if (s.status === 'Present') presentCount++;
      totalAttendancePct += s.attendancePct;
      totalPerformance += s.performanceAvg;
      
      totalFeeExpected += s.feeAmount;
      if (s.feeStatus === 'Paid') {
        totalFeeCollected += s.feeAmount;
      }
    });

    const absentCount = count - presentCount;
    const avgAttendance = count > 0 ? Math.round(totalAttendancePct / count) : 0;
    const avgPerformance = count > 0 ? Math.round(totalPerformance / count) : 0;
    const feePct = totalFeeExpected > 0 ? Math.round((totalFeeCollected / totalFeeExpected) * 100) : 0;

    let clsDetails = null;
    let capacity = count;
    if (selectedClassId !== 'ALL') {
      clsDetails = initialClasses.find(c => c.id === selectedClassId);
      capacity = clsDetails?.capacity || count;
    } else {
      capacity = initialClasses.reduce((acc, curr) => acc + curr.capacity, 0);
    }

    const scopeText = selectedClassId === 'ALL'
      ? `Showing overall metrics (${count} Students | 86 Staff | 10 Classes)`
      : `Showing Class ${selectedClassId} (${count} Students | Teacher: ${clsDetails?.teacher || 'N/A'})`;

    return {
      isOverall: selectedClassId === 'ALL',
      scopeText,
      dateRange,
      kpis: {
        totalStudents: count.toString(),
        studentGrowth: `Capacity ${capacity}`,
        attendancePct: `${avgAttendance}%`,
        attendanceBreakdown: `${presentCount} Present • ${absentCount} Absent`,
        feeCollected: `₹${(totalFeeCollected / 100000).toFixed(2)}L`,
        feeExpected: `₹${(totalFeeExpected / 100000).toFixed(2)}L`,
        feePct: `${feePct}%`,
        academicAvg: `${avgPerformance}%`,
        academicGrowth: selectedClassId === 'ALL' ? '+3.2% Overall' : 'Class Average'
      },
      students: filteredStudents,
      classDetails: clsDetails,
      attendanceChartData: [
        { day: 'Mon', Present: Math.round(presentCount * 0.95), Absent: count - Math.round(presentCount * 0.95) },
        { day: 'Tue', Present: presentCount, Absent: absentCount },
        { day: 'Wed', Present: Math.round(presentCount * 0.98), Absent: count - Math.round(presentCount * 0.98) },
        { day: 'Thu', Present: Math.round(presentCount * 1.02) > count ? count : Math.round(presentCount * 1.02), Absent: Math.max(0, count - Math.round(presentCount * 1.02)) },
        { day: 'Fri', Present: Math.round(presentCount * 0.9), Absent: count - Math.round(presentCount * 0.9) },
      ],
      feeMonthlyData: [
        { month: 'Apr', Collected: totalFeeCollected * 0.15 / 100000 },
        { month: 'May', Collected: totalFeeCollected * 0.30 / 100000 },
        { month: 'Jun', Collected: totalFeeCollected * 0.20 / 100000 },
        { month: 'Jul', Collected: totalFeeCollected * 0.25 / 100000 },
        { month: 'Aug', Collected: totalFeeCollected * 0.10 / 100000 },
      ],
      subjectPerformanceData: (function() {
        const classSubjects = {
          '11-Science': ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Physical Education'],
          '12-Science': ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Physical Education'],
          '11-Commerce': ['Accountancy', 'Economics', 'Business Studies', 'English', 'Mathematics', 'Computer Science', 'Physical Education'],
          '12-Commerce': ['Accountancy', 'Economics', 'Business Studies', 'English', 'Mathematics', 'Computer Science', 'Physical Education']
        };
        let subs = classSubjects[selectedClassId] || ['Mathematics', 'English', 'Science', 'Social Studies', 'Computer Science', 'Hindi', 'Gujarati'];
        if (selectedClassId === 'ALL') {
            subs = ['Mathematics', 'English', 'Science', 'Computer Science', 'Physics', 'Economics', 'Accountancy'];
        }
        return subs.map((sub, idx) => ({
            subject: sub,
            score: Math.min(100, Math.max(40, avgPerformance + (idx % 2 === 0 ? 5 : -4) + (idx * 2) - 3))
        }));
      })()
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