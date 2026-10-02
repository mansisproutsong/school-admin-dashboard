const fs = require('fs');

const classesList = [
  { id: '8-A', standard: '8', section: 'A', teacher: 'Ms. Sania Yousaf', room: 'Room 101', capacity: 35, studentCount: 32, feeAmount: 14000 },
  { id: '8-B', standard: '8', section: 'B', teacher: 'Mr. Junaid Aslam', room: 'Room 102', capacity: 35, studentCount: 30, feeAmount: 14000 },
  { id: '9-A', standard: '9', section: 'A', teacher: 'Mr. Faisal Karim', room: 'Room 201', capacity: 40, studentCount: 35, feeAmount: 16000 },
  { id: '9-B', standard: '9', section: 'B', teacher: 'Ms. Rabia Sultan', room: 'Room 202', capacity: 40, studentCount: 33, feeAmount: 16000 },
  { id: '10-A', standard: '10', section: 'A', teacher: 'Mr. Ahsan Bukhari', room: 'Room 301', capacity: 35, studentCount: 32, feeAmount: 18500 },
  { id: '10-B', standard: '10', section: 'B', teacher: 'Mr. Adeel Nasir', room: 'Room 302', capacity: 35, studentCount: 31, feeAmount: 18500 },
  { id: '11-Science', standard: '11', section: 'Science', teacher: 'Dr. V. K. Sharma', room: 'Lab Block 1', capacity: 40, studentCount: 38, feeAmount: 22000 },
  { id: '11-Commerce', standard: '11', section: 'Commerce', teacher: 'Ms. Neha Gupta', room: 'Room 401', capacity: 40, studentCount: 36, feeAmount: 20000 },
  { id: '12-Science', standard: '12', section: 'Science', teacher: 'Mr. R. C. Verma', room: 'Lab Block 2', capacity: 40, studentCount: 39, feeAmount: 22000 },
  { id: '12-Commerce', standard: '12', section: 'Commerce', teacher: 'Mr. Rajesh Shah', room: 'Room 402', capacity: 40, studentCount: 34, feeAmount: 20000 },
];

let globalStudentId = 1;
const studentsData = [];

classesList.forEach((cls) => {
  for (let i = 1; i <= cls.studentCount; i++) {
    // Generate realistic attendance (70 - 100)
    // For a few, make it below 75 for alerts
    const isAtRiskAttendance = Math.random() > 0.9;
    const attendancePct = isAtRiskAttendance ? Math.floor(Math.random() * 15) + 60 : Math.floor(Math.random() * 26) + 75;
    
    // Fee status
    const feeRand = Math.random();
    let feeStatus = 'Paid';
    if (feeRand > 0.85) feeStatus = 'Overdue';
    else if (feeRand > 0.7) feeStatus = 'Pending';
    
    // Performance
    const isAtRiskAcademic = Math.random() > 0.95;
    const performanceAvg = isAtRiskAcademic ? Math.floor(Math.random() * 20) + 40 : Math.floor(Math.random() * 30) + 65;
    
    // Status
    const status = Math.random() > 0.08 ? 'Present' : 'Absent';

    studentsData.push({
      id: `S${globalStudentId}`,
      name: `Student ${globalStudentId}`,
      classId: cls.id,
      section: cls.section,
      rollNo: i.toString().padStart(2, '0'),
      attendancePct,
      feeStatus,
      feeAmount: cls.feeAmount,
      performanceAvg,
      parentName: `Parent ${globalStudentId}`,
      parentPhone: `+91 98765 ${Math.floor(10000 + Math.random() * 90000)}`,
      status,
    });
    globalStudentId++;
  }
});

// Calculate true averages and totals
const totalStudents = studentsData.length; // 340
const totalClasses = classesList.length; // 10

let newMockData = `// Centralized Relational Mock Dataset for EduAdmin / Green Valley International School

export const schoolInfo = {
  name: "Green Valley International School",
  brandName: "EduAdmin",
  academicYear: "2026–27",
  campus: "Main Campus",
  totalStudents: ${totalStudents},
  totalTeachers: 86,
  totalClasses: ${totalClasses},
  principal: "Mansi Jogani"
};

export const classesList = ${JSON.stringify(classesList, null, 2)};

export const studentsData = ${JSON.stringify(studentsData, null, 2)};

export const overallKPIs = {
  totalStudents: "${totalStudents}",
  studentGrowth: "+4.8%",
  attendancePct: "92.4%", // Will be calculated dynamically
  attendanceBreakdown: "0 Present • 0 Absent",
  feeCollected: "₹0",
  feeExpected: "₹0",
  feePct: "0%",
  academicAvg: "0%",
  academicGrowth: "+3.2%"
};

export const attentionRequiredAlerts = [
  {
    id: 1,
    type: 'attendance',
    title: 'Students below 75% attendance',
    subtext: 'Action required for hall ticket eligibility',
    severity: 'danger',
    actionText: 'View Students',
    link: '/students?filter=low_attendance'
  },
  {
    id: 2,
    type: 'fees',
    title: 'Fee payments overdue',
    subtext: 'Review pending collection',
    severity: 'warning',
    actionText: 'Review Fees',
    link: '/fees?filter=overdue'
  },
  {
    id: 3,
    type: 'event',
    title: 'Parent-Teacher Meeting tomorrow',
    subtext: 'Annual academic progress discussion',
    severity: 'primary',
    actionText: 'View Event',
    link: '/events'
  },
  {
    id: 4,
    type: 'academics',
    title: 'Students academically at risk',
    subtext: 'Remedial coaching recommended',
    severity: 'purple',
    actionText: 'View Report',
    link: '/results?filter=at_risk'
  }
];

export const eventsList = [
  { id: 'E1', title: 'Parent-Teacher Meeting', date: 'Oct 02, 2026', time: '10:00 AM - 2:00 PM', category: 'Meeting', icon: 'users' },
  { id: 'E2', title: 'Mid-Term Examinations', date: 'Oct 12, 2026', time: '9:00 AM - 12:00 PM', category: 'Exam', icon: 'file-text' },
  { id: 'E3', title: 'Annual Sports Day', date: 'Nov 05, 2026', time: '8:00 AM - 4:00 PM', category: 'Sports', icon: 'trophy' },
  { id: 'E4', title: 'Science & Tech Fair', date: 'Nov 20, 2026', time: '10:00 AM - 3:00 PM', category: 'Academic', icon: 'flask-conical' },
];

export const noticesList = [
  { id: 'N1', title: 'Parent-Teacher Meeting Schedule Released', category: 'General', priority: 'High', date: 'Today', targetClass: 'ALL' },
  { id: 'N2', title: 'Mid-Term Examination Timetable 2026–27', category: 'Academic', priority: 'High', date: 'Yesterday', targetClass: 'ALL' },
  { id: 'N3', title: 'Annual Sports Day Registration Open', category: 'Sports', priority: 'Medium', date: '3 days ago', targetClass: 'ALL' },
  { id: 'N4', title: 'School Bus Route #4 Timing Updated', category: 'Transport', priority: 'Low', date: '5 days ago', targetClass: 'ALL' },
  { id: 'N5', title: 'Winter Vacation Announcement', category: 'General', priority: 'High', date: '6 days ago', targetClass: 'ALL' },
  { id: 'N6', title: 'Class 10 Board Exam Instructions', category: 'Academic', priority: 'High', date: '1 week ago', targetClass: '10-A' },
  { id: 'N7', title: 'Inter-House Debate Competition', category: 'General', priority: 'Medium', date: '2 weeks ago', targetClass: '9-A' },
];

export const teachersList = [
  { id: 'T1', name: 'Mr. Ahsan Bukhari', department: 'Mathematics', classes: '10-A, 9-B, 11-Science', status: 'Present', phone: '+91 98765 11111' },
  { id: 'T2', name: 'Ms. Rabia Sultan', department: 'Physics', classes: '10-A, 10-B, 12-Science', status: 'Present', phone: '+91 98765 22222' },
  { id: 'T3', name: 'Mr. Faisal Karim', department: 'Chemistry', classes: '9-A, 9-B, 11-Science, 12-Science', status: 'On Leave', phone: '+91 98765 33333' },
  { id: 'T4', name: 'Ms. Sania Yousaf', department: 'English', classes: '8-A, 8-B, 11-Commerce, 12-Commerce', status: 'Present', phone: '+91 98765 44444' },
  { id: 'T5', name: 'Mr. Adeel Nasir', department: 'Computer Science', classes: '10-A, 10-B, 9-A', status: 'Present', phone: '+91 98765 55555' },
];
`;

fs.writeFileSync('src/data/mockData.js', newMockData);
console.log('mockData.js updated successfully!');
