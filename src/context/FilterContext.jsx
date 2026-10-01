import React, { createContext, useContext, useState } from 'react';
import { classesList, studentsData, overallKPIs } from '../data/mockData';

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [selectedClassId, setSelectedClassId] = useState('ALL');
  const [selectedSection, setSelectedSection] = useState('ALL');

  // Helper function: Calculate dynamic KPIs based on selected class
  const getFilteredData = () => {
    if (selectedClassId === 'ALL') {
      return {
        isOverall: true,
        scopeText: 'Showing overall institution metrics (1,248 Students | 86 Staff | 42 Classes)',
        kpis: overallKPIs,
        students: studentsData,
        classDetails: null,
      };
    }

    const cls = classesList.find(c => c.id === selectedClassId);
    const filteredStudents = studentsData.filter(s => s.classId === selectedClassId);
    const presentCount = filteredStudents.filter(s => s.status === 'Present').length;
    const absentCount = filteredStudents.length - presentCount;

    return {
      isOverall: false,
      scopeText: `Showing filtered data for Class ${selectedClassId} (${cls?.studentCount || 32} Students | Teacher: ${cls?.teacher || 'Assigned'})`,
      kpis: {
        totalStudents: `${cls?.studentCount || 32}`,
        studentGrowth: `Capacity ${cls?.capacity || 35}`,
        attendancePct: `${cls?.attendancePct || 95}%`,
        attendanceBreakdown: `${presentCount} Present • ${absentCount} Absent`,
        feeCollected: `₹${(cls?.feeCollectionPct * 0.058).toFixed(1)}L`,
        feeExpected: `₹5.8L`,
        feePct: `${cls?.feeCollectionPct}%`,
        academicAvg: `${cls?.avgScore}%`,
        academicGrowth: `Class Average`
      },
      students: filteredStudents.length ? filteredStudents : studentsData.slice(0, 3),
      classDetails: cls,
    };
  };

  return (
    <FilterContext.Provider value={{
      selectedClassId,
      setSelectedClassId,
      selectedSection,
      setSelectedSection,
      getFilteredData,
      classesList
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