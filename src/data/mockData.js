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
  { id: 'S1', name: 'Student 1', classId: '8-A', section: 'A', rollNo: '01', attendancePct: 82, feeStatus: 'Pending', feeAmount: 14000, performanceAvg: 79, parentName: 'Parent 1', parentPhone: '+91 98765 0001', status: 'Present' },
  { id: 'S2', name: 'Student 2', classId: '8-A', section: 'A', rollNo: '02', attendancePct: 83, feeStatus: 'Overdue', feeAmount: 14000, performanceAvg: 84, parentName: 'Parent 2', parentPhone: '+91 98765 0002', status: 'Present' },
  { id: 'S3', name: 'Student 3', classId: '8-A', section: 'A', rollNo: '03', attendancePct: 71, feeStatus: 'Paid', feeAmount: 14000, performanceAvg: 60, parentName: 'Parent 3', parentPhone: '+91 98765 0003', status: 'Absent' },
  { id: 'S4', name: 'Student 4', classId: '8-A', section: 'A', rollNo: '04', attendancePct: 86, feeStatus: 'Overdue', feeAmount: 14000, performanceAvg: 66, parentName: 'Parent 4', parentPhone: '+91 98765 0004', status: 'Present' },
  { id: 'S5', name: 'Student 5', classId: '8-A', section: 'A', rollNo: '05', attendancePct: 84, feeStatus: 'Paid', feeAmount: 14000, performanceAvg: 94, parentName: 'Parent 5', parentPhone: '+91 98765 0005', status: 'Present' },
  { id: 'S6', name: 'Student 6', classId: '8-A', section: 'A', rollNo: '06', attendancePct: 88, feeStatus: 'Pending', feeAmount: 14000, performanceAvg: 70, parentName: 'Parent 6', parentPhone: '+91 98765 0006', status: 'Absent' },
  { id: 'S7', name: 'Student 7', classId: '8-B', section: 'B', rollNo: '01', attendancePct: 75, feeStatus: 'Overdue', feeAmount: 14000, performanceAvg: 69, parentName: 'Parent 7', parentPhone: '+91 98765 0007', status: 'Present' },
  { id: 'S8', name: 'Student 8', classId: '8-B', section: 'B', rollNo: '02', attendancePct: 82, feeStatus: 'Pending', feeAmount: 14000, performanceAvg: 67, parentName: 'Parent 8', parentPhone: '+91 98765 0008', status: 'Present' },
  { id: 'S9', name: 'Student 9', classId: '8-B', section: 'B', rollNo: '03', attendancePct: 80, feeStatus: 'Overdue', feeAmount: 14000, performanceAvg: 79, parentName: 'Parent 9', parentPhone: '+91 98765 0009', status: 'Present' },
  { id: 'S10', name: 'Student 10', classId: '8-B', section: 'B', rollNo: '04', attendancePct: 96, feeStatus: 'Paid', feeAmount: 14000, performanceAvg: 70, parentName: 'Parent 10', parentPhone: '+91 98765 00010', status: 'Present' },
  { id: 'S11', name: 'Student 11', classId: '8-B', section: 'B', rollNo: '05', attendancePct: 72, feeStatus: 'Paid', feeAmount: 14000, performanceAvg: 77, parentName: 'Parent 11', parentPhone: '+91 98765 00011', status: 'Absent' },
  { id: 'S12', name: 'Student 12', classId: '8-B', section: 'B', rollNo: '06', attendancePct: 94, feeStatus: 'Paid', feeAmount: 14000, performanceAvg: 85, parentName: 'Parent 12', parentPhone: '+91 98765 00012', status: 'Absent' },
  { id: 'S13', name: 'Student 13', classId: '9-A', section: 'A', rollNo: '01', attendancePct: 83, feeStatus: 'Overdue', feeAmount: 16000, performanceAvg: 63, parentName: 'Parent 13', parentPhone: '+91 98765 00013', status: 'Absent' },
  { id: 'S14', name: 'Student 14', classId: '9-A', section: 'A', rollNo: '02', attendancePct: 100, feeStatus: 'Paid', feeAmount: 16000, performanceAvg: 69, parentName: 'Parent 14', parentPhone: '+91 98765 00014', status: 'Present' },
  { id: 'S15', name: 'Student 15', classId: '9-A', section: 'A', rollNo: '03', attendancePct: 91, feeStatus: 'Overdue', feeAmount: 16000, performanceAvg: 92, parentName: 'Parent 15', parentPhone: '+91 98765 00015', status: 'Present' },
  { id: 'S16', name: 'Student 16', classId: '9-A', section: 'A', rollNo: '04', attendancePct: 75, feeStatus: 'Paid', feeAmount: 16000, performanceAvg: 84, parentName: 'Parent 16', parentPhone: '+91 98765 00016', status: 'Present' },
  { id: 'S17', name: 'Student 17', classId: '9-A', section: 'A', rollNo: '05', attendancePct: 93, feeStatus: 'Paid', feeAmount: 16000, performanceAvg: 75, parentName: 'Parent 17', parentPhone: '+91 98765 00017', status: 'Present' },
  { id: 'S18', name: 'Student 18', classId: '9-A', section: 'A', rollNo: '06', attendancePct: 73, feeStatus: 'Paid', feeAmount: 16000, performanceAvg: 67, parentName: 'Parent 18', parentPhone: '+91 98765 00018', status: 'Present' },
  { id: 'S19', name: 'Student 19', classId: '9-B', section: 'B', rollNo: '01', attendancePct: 77, feeStatus: 'Paid', feeAmount: 16000, performanceAvg: 83, parentName: 'Parent 19', parentPhone: '+91 98765 00019', status: 'Present' },
  { id: 'S20', name: 'Student 20', classId: '9-B', section: 'B', rollNo: '02', attendancePct: 82, feeStatus: 'Overdue', feeAmount: 16000, performanceAvg: 95, parentName: 'Parent 20', parentPhone: '+91 98765 00020', status: 'Present' },
  { id: 'S21', name: 'Student 21', classId: '9-B', section: 'B', rollNo: '03', attendancePct: 75, feeStatus: 'Pending', feeAmount: 16000, performanceAvg: 73, parentName: 'Parent 21', parentPhone: '+91 98765 00021', status: 'Present' },
  { id: 'S22', name: 'Student 22', classId: '9-B', section: 'B', rollNo: '04', attendancePct: 82, feeStatus: 'Overdue', feeAmount: 16000, performanceAvg: 76, parentName: 'Parent 22', parentPhone: '+91 98765 00022', status: 'Absent' },
  { id: 'S23', name: 'Student 23', classId: '9-B', section: 'B', rollNo: '05', attendancePct: 77, feeStatus: 'Overdue', feeAmount: 16000, performanceAvg: 73, parentName: 'Parent 23', parentPhone: '+91 98765 00023', status: 'Present' },
  { id: 'S24', name: 'Student 24', classId: '9-B', section: 'B', rollNo: '06', attendancePct: 80, feeStatus: 'Overdue', feeAmount: 16000, performanceAvg: 94, parentName: 'Parent 24', parentPhone: '+91 98765 00024', status: 'Absent' },
  { id: 'S25', name: 'Student 25', classId: '10-A', section: 'A', rollNo: '01', attendancePct: 78, feeStatus: 'Pending', feeAmount: 18500, performanceAvg: 84, parentName: 'Parent 25', parentPhone: '+91 98765 00025', status: 'Present' },
  { id: 'S26', name: 'Student 26', classId: '10-A', section: 'A', rollNo: '02', attendancePct: 74, feeStatus: 'Paid', feeAmount: 18500, performanceAvg: 75, parentName: 'Parent 26', parentPhone: '+91 98765 00026', status: 'Absent' },
  { id: 'S27', name: 'Student 27', classId: '10-A', section: 'A', rollNo: '03', attendancePct: 71, feeStatus: 'Paid', feeAmount: 18500, performanceAvg: 93, parentName: 'Parent 27', parentPhone: '+91 98765 00027', status: 'Present' },
  { id: 'S28', name: 'Student 28', classId: '10-A', section: 'A', rollNo: '04', attendancePct: 91, feeStatus: 'Paid', feeAmount: 18500, performanceAvg: 83, parentName: 'Parent 28', parentPhone: '+91 98765 00028', status: 'Present' },
  { id: 'S29', name: 'Student 29', classId: '10-A', section: 'A', rollNo: '05', attendancePct: 71, feeStatus: 'Pending', feeAmount: 18500, performanceAvg: 70, parentName: 'Parent 29', parentPhone: '+91 98765 00029', status: 'Present' },
  { id: 'S30', name: 'Student 30', classId: '10-A', section: 'A', rollNo: '06', attendancePct: 90, feeStatus: 'Overdue', feeAmount: 18500, performanceAvg: 72, parentName: 'Parent 30', parentPhone: '+91 98765 00030', status: 'Present' },
  { id: 'S31', name: 'Student 31', classId: '10-B', section: 'B', rollNo: '01', attendancePct: 99, feeStatus: 'Overdue', feeAmount: 18500, performanceAvg: 74, parentName: 'Parent 31', parentPhone: '+91 98765 00031', status: 'Present' },
  { id: 'S32', name: 'Student 32', classId: '10-B', section: 'B', rollNo: '02', attendancePct: 98, feeStatus: 'Pending', feeAmount: 18500, performanceAvg: 84, parentName: 'Parent 32', parentPhone: '+91 98765 00032', status: 'Present' },
  { id: 'S33', name: 'Student 33', classId: '10-B', section: 'B', rollNo: '03', attendancePct: 98, feeStatus: 'Paid', feeAmount: 18500, performanceAvg: 84, parentName: 'Parent 33', parentPhone: '+91 98765 00033', status: 'Absent' },
  { id: 'S34', name: 'Student 34', classId: '10-B', section: 'B', rollNo: '04', attendancePct: 88, feeStatus: 'Paid', feeAmount: 18500, performanceAvg: 73, parentName: 'Parent 34', parentPhone: '+91 98765 00034', status: 'Present' },
  { id: 'S35', name: 'Student 35', classId: '10-B', section: 'B', rollNo: '05', attendancePct: 84, feeStatus: 'Paid', feeAmount: 18500, performanceAvg: 96, parentName: 'Parent 35', parentPhone: '+91 98765 00035', status: 'Present' },
  { id: 'S36', name: 'Student 36', classId: '10-B', section: 'B', rollNo: '06', attendancePct: 80, feeStatus: 'Paid', feeAmount: 18500, performanceAvg: 98, parentName: 'Parent 36', parentPhone: '+91 98765 00036', status: 'Present' },
  { id: 'S37', name: 'Student 37', classId: '11-Science', section: 'Science', rollNo: '01', attendancePct: 92, feeStatus: 'Paid', feeAmount: 22000, performanceAvg: 96, parentName: 'Parent 37', parentPhone: '+91 98765 00037', status: 'Absent' },
  { id: 'S38', name: 'Student 38', classId: '11-Science', section: 'Science', rollNo: '02', attendancePct: 77, feeStatus: 'Paid', feeAmount: 22000, performanceAvg: 69, parentName: 'Parent 38', parentPhone: '+91 98765 00038', status: 'Present' },
  { id: 'S39', name: 'Student 39', classId: '11-Science', section: 'Science', rollNo: '03', attendancePct: 93, feeStatus: 'Paid', feeAmount: 22000, performanceAvg: 66, parentName: 'Parent 39', parentPhone: '+91 98765 00039', status: 'Absent' },
  { id: 'S40', name: 'Student 40', classId: '11-Science', section: 'Science', rollNo: '04', attendancePct: 72, feeStatus: 'Pending', feeAmount: 22000, performanceAvg: 97, parentName: 'Parent 40', parentPhone: '+91 98765 00040', status: 'Present' },
  { id: 'S41', name: 'Student 41', classId: '11-Science', section: 'Science', rollNo: '05', attendancePct: 91, feeStatus: 'Paid', feeAmount: 22000, performanceAvg: 97, parentName: 'Parent 41', parentPhone: '+91 98765 00041', status: 'Present' },
  { id: 'S42', name: 'Student 42', classId: '11-Science', section: 'Science', rollNo: '06', attendancePct: 77, feeStatus: 'Paid', feeAmount: 22000, performanceAvg: 62, parentName: 'Parent 42', parentPhone: '+91 98765 00042', status: 'Present' },
  { id: 'S43', name: 'Student 43', classId: '11-Commerce', section: 'Commerce', rollNo: '01', attendancePct: 74, feeStatus: 'Overdue', feeAmount: 20000, performanceAvg: 90, parentName: 'Parent 43', parentPhone: '+91 98765 00043', status: 'Absent' },
  { id: 'S44', name: 'Student 44', classId: '11-Commerce', section: 'Commerce', rollNo: '02', attendancePct: 76, feeStatus: 'Pending', feeAmount: 20000, performanceAvg: 61, parentName: 'Parent 44', parentPhone: '+91 98765 00044', status: 'Absent' },
  { id: 'S45', name: 'Student 45', classId: '11-Commerce', section: 'Commerce', rollNo: '03', attendancePct: 75, feeStatus: 'Overdue', feeAmount: 20000, performanceAvg: 82, parentName: 'Parent 45', parentPhone: '+91 98765 00045', status: 'Present' },
  { id: 'S46', name: 'Student 46', classId: '11-Commerce', section: 'Commerce', rollNo: '04', attendancePct: 86, feeStatus: 'Paid', feeAmount: 20000, performanceAvg: 90, parentName: 'Parent 46', parentPhone: '+91 98765 00046', status: 'Present' },
  { id: 'S47', name: 'Student 47', classId: '11-Commerce', section: 'Commerce', rollNo: '05', attendancePct: 70, feeStatus: 'Paid', feeAmount: 20000, performanceAvg: 61, parentName: 'Parent 47', parentPhone: '+91 98765 00047', status: 'Present' },
  { id: 'S48', name: 'Student 48', classId: '11-Commerce', section: 'Commerce', rollNo: '06', attendancePct: 76, feeStatus: 'Pending', feeAmount: 20000, performanceAvg: 64, parentName: 'Parent 48', parentPhone: '+91 98765 00048', status: 'Present' },
  { id: 'S49', name: 'Student 49', classId: '12-Science', section: 'Science', rollNo: '01', attendancePct: 87, feeStatus: 'Pending', feeAmount: 22000, performanceAvg: 70, parentName: 'Parent 49', parentPhone: '+91 98765 00049', status: 'Absent' },
  { id: 'S50', name: 'Student 50', classId: '12-Science', section: 'Science', rollNo: '02', attendancePct: 100, feeStatus: 'Overdue', feeAmount: 22000, performanceAvg: 94, parentName: 'Parent 50', parentPhone: '+91 98765 00050', status: 'Absent' },
  { id: 'S51', name: 'Student 51', classId: '12-Science', section: 'Science', rollNo: '03', attendancePct: 92, feeStatus: 'Paid', feeAmount: 22000, performanceAvg: 97, parentName: 'Parent 51', parentPhone: '+91 98765 00051', status: 'Absent' },
  { id: 'S52', name: 'Student 52', classId: '12-Science', section: 'Science', rollNo: '04', attendancePct: 77, feeStatus: 'Paid', feeAmount: 22000, performanceAvg: 70, parentName: 'Parent 52', parentPhone: '+91 98765 00052', status: 'Present' },
  { id: 'S53', name: 'Student 53', classId: '12-Science', section: 'Science', rollNo: '05', attendancePct: 97, feeStatus: 'Paid', feeAmount: 22000, performanceAvg: 88, parentName: 'Parent 53', parentPhone: '+91 98765 00053', status: 'Absent' },
  { id: 'S54', name: 'Student 54', classId: '12-Science', section: 'Science', rollNo: '06', attendancePct: 88, feeStatus: 'Paid', feeAmount: 22000, performanceAvg: 86, parentName: 'Parent 54', parentPhone: '+91 98765 00054', status: 'Absent' },
  { id: 'S55', name: 'Student 55', classId: '12-Commerce', section: 'Commerce', rollNo: '01', attendancePct: 78, feeStatus: 'Paid', feeAmount: 20000, performanceAvg: 71, parentName: 'Parent 55', parentPhone: '+91 98765 00055', status: 'Present' },
  { id: 'S56', name: 'Student 56', classId: '12-Commerce', section: 'Commerce', rollNo: '02', attendancePct: 80, feeStatus: 'Pending', feeAmount: 20000, performanceAvg: 76, parentName: 'Parent 56', parentPhone: '+91 98765 00056', status: 'Present' },
  { id: 'S57', name: 'Student 57', classId: '12-Commerce', section: 'Commerce', rollNo: '03', attendancePct: 79, feeStatus: 'Overdue', feeAmount: 20000, performanceAvg: 95, parentName: 'Parent 57', parentPhone: '+91 98765 00057', status: 'Present' },
  { id: 'S58', name: 'Student 58', classId: '12-Commerce', section: 'Commerce', rollNo: '04', attendancePct: 81, feeStatus: 'Pending', feeAmount: 20000, performanceAvg: 68, parentName: 'Parent 58', parentPhone: '+91 98765 00058', status: 'Absent' },
  { id: 'S59', name: 'Student 59', classId: '12-Commerce', section: 'Commerce', rollNo: '05', attendancePct: 82, feeStatus: 'Paid', feeAmount: 20000, performanceAvg: 86, parentName: 'Parent 59', parentPhone: '+91 98765 00059', status: 'Present' },
  { id: 'S60', name: 'Student 60', classId: '12-Commerce', section: 'Commerce', rollNo: '06', attendancePct: 94, feeStatus: 'Pending', feeAmount: 20000, performanceAvg: 81, parentName: 'Parent 60', parentPhone: '+91 98765 00060', status: 'Present' }
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