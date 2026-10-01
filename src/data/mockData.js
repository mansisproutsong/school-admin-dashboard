// Centralized Relational Mock Dataset for EduAdmin / Green Valley International School

export const schoolInfo = {
  name: "Green Valley International School",
  brandName: "EduAdmin",
  academicYear: "2026–27",
  campus: "Main Campus",
  totalStudents: 1248,
  totalTeachers: 86,
  totalClasses: 42,
  principal: "Mansi Jogani"
};

export const classesList = [
  { id: '8-A', standard: '8', section: 'A', teacher: 'Ms. Sania Yousaf', room: 'Room 101', capacity: 35, studentCount: 32, attendancePct: 94, avgScore: 78, feeCollectionPct: 88 },
  { id: '8-B', standard: '8', section: 'B', teacher: 'Mr. Junaid Aslam', room: 'Room 102', capacity: 35, studentCount: 30, attendancePct: 91, avgScore: 75, feeCollectionPct: 91 },
  { id: '9-A', standard: '9', section: 'A', teacher: 'Mr. Faisal Karim', room: 'Room 201', capacity: 40, studentCount: 35, attendancePct: 88, avgScore: 72, feeCollectionPct: 83 },
  { id: '9-B', standard: '9', section: 'B', teacher: 'Ms. Rabia Sultan', room: 'Room 202', capacity: 40, studentCount: 33, attendancePct: 94, avgScore: 81, feeCollectionPct: 92 },
  { id: '10-A', standard: '10', section: 'A', teacher: 'Mr. Ahsan Bukhari', room: 'Room 301', capacity: 35, studentCount: 32, attendancePct: 95, avgScore: 84, feeCollectionPct: 90 },
  { id: '10-B', standard: '10', section: 'B', teacher: 'Mr. Adeel Nasir', room: 'Room 302', capacity: 35, studentCount: 31, attendancePct: 92, avgScore: 80, feeCollectionPct: 86 },
  { id: '11-Science', standard: '11', section: 'Science', teacher: 'Dr. V. K. Sharma', room: 'Lab Block 1', capacity: 40, studentCount: 38, attendancePct: 96, avgScore: 86, feeCollectionPct: 95 },
  { id: '11-Commerce', standard: '11', section: 'Commerce', teacher: 'Ms. Neha Gupta', room: 'Room 401', capacity: 40, studentCount: 36, attendancePct: 90, avgScore: 77, feeCollectionPct: 89 },
  { id: '12-Science', standard: '12', section: 'Science', teacher: 'Mr. R. C. Verma', room: 'Lab Block 2', capacity: 40, studentCount: 39, attendancePct: 97, avgScore: 89, feeCollectionPct: 96 },
  { id: '12-Commerce', standard: '12', section: 'Commerce', teacher: 'Mr. Rajesh Shah', room: 'Room 402', capacity: 40, studentCount: 34, attendancePct: 93, avgScore: 82, feeCollectionPct: 91 },
];

export const studentsData = [
  { id: 'S101', name: 'Aarav Shah', classId: '10-A', section: 'A', rollNo: '12', attendancePct: 95, feeStatus: 'Paid', feeAmount: 18500, performanceAvg: 88, parentName: 'Tariq Shah', parentPhone: '+91 98765 43210', status: 'Present' },
  { id: 'S102', name: 'Diya Patel', classId: '10-A', section: 'A', rollNo: '14', attendancePct: 96, feeStatus: 'Paid', feeAmount: 18500, performanceAvg: 92, parentName: 'Sanjay Patel', parentPhone: '+91 98765 43211', status: 'Present' },
  { id: 'S103', name: 'Riya Mehta', classId: '10-A', section: 'A', rollNo: '22', attendancePct: 68, feeStatus: 'Overdue', feeAmount: 18500, performanceAvg: 62, parentName: 'Karan Mehta', parentPhone: '+91 98765 43212', status: 'Absent' },
  { id: 'S104', name: 'Vivaan Shah', classId: '10-B', section: 'B', rollNo: '05', attendancePct: 91, feeStatus: 'Paid', feeAmount: 18500, performanceAvg: 81, parentName: 'Amit Shah', parentPhone: '+91 98765 43213', status: 'Present' },
  { id: 'S105', name: 'Anaya Patel', classId: '10-B', section: 'B', rollNo: '08', attendancePct: 94, feeStatus: 'Pending', feeAmount: 18500, performanceAvg: 79, parentName: 'Vikram Patel', parentPhone: '+91 98765 43214', status: 'Present' },
  { id: 'S106', name: 'Bilal Ahmed', classId: '9-B', section: 'B', rollNo: '07', attendancePct: 92, feeStatus: 'Paid', feeAmount: 16000, performanceAvg: 76, parentName: 'Rashid Ahmed', parentPhone: '+91 98765 43215', status: 'Present' },
  { id: 'S107', name: 'Fatima Noor', classId: '8-C', section: 'C', rollNo: '18', attendancePct: 71, feeStatus: 'Pending', feeAmount: 14000, performanceAvg: 65, parentName: 'Zubair Noor', parentPhone: '+91 98765 43216', status: 'Absent' },
  { id: 'S108', name: 'Sara Iqbal', classId: '7-A', section: 'A', rollNo: '19', attendancePct: 89, feeStatus: 'Paid', feeAmount: 13000, performanceAvg: 84, parentName: 'Iqbal Hussain', parentPhone: '+91 98765 43217', status: 'Late' },
];

export const overallKPIs = {
  totalStudents: "1,248",
  studentGrowth: "+4.8%",
  attendancePct: "92.4%",
  attendanceBreakdown: "1,153 Present • 95 Absent",
  feeCollected: "₹18.6L",
  feeExpected: "₹22L",
  feePct: "84.5%",
  academicAvg: "78.6%",
  academicGrowth: "+3.2%"
};

export const attentionRequiredAlerts = [
  {
    id: 1,
    type: 'attendance',
    title: '24 students below 75% attendance',
    subtext: 'Action required for hall ticket eligibility',
    severity: 'danger',
    actionText: 'View Students',
    link: '/students?filter=low_attendance'
  },
  {
    id: 2,
    type: 'fees',
    title: '38 fee payments overdue',
    subtext: '₹3.4L total pending collection',
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
    title: '12 students academically at risk',
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
  { id: 'N1', title: 'Parent-Teacher Meeting Schedule Released', category: 'General', priority: 'High', date: 'Today' },
  { id: 'N2', title: 'Mid-Term Examination Timetable 2026–27', category: 'Academic', priority: 'High', date: 'Yesterday' },
  { id: 'N3', title: 'Annual Sports Day Registration Open', category: 'Sports', priority: 'Medium', date: '3 days ago' },
  { id: 'N4', title: 'School Bus Route #4 Timing Updated', category: 'Transport', priority: 'Low', date: '5 days ago' },
];

export const teachersList = [
  { id: 'T1', name: 'Mr. Ahsan Bukhari', department: 'Mathematics', classes: '10-A, 9-B', status: 'Present', phone: '+91 98765 11111' },
  { id: 'T2', name: 'Ms. Rabia Sultan', department: 'Physics', classes: '10-A, 10-B', status: 'Present', phone: '+91 98765 22222' },
  { id: 'T3', name: 'Mr. Faisal Karim', department: 'Chemistry', classes: '9-A, 9-B', status: 'On Leave', phone: '+91 98765 33333' },
  { id: 'T4', name: 'Ms. Sania Yousaf', department: 'English', classes: '8-A, 7-A', status: 'Present', phone: '+91 98765 44444' },
  { id: 'T5', name: 'Mr. Adeel Nasir', department: 'Computer Science', classes: '10-A, 10-B, 9-A', status: 'Present', phone: '+91 98765 55555' },
];