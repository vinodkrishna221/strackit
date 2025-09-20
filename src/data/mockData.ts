// Mock data for Student Dashboard implementation
import { format, subDays, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns';

export interface AttendanceStatus {
  status: 'P' | 'A' | 'L' | 'H'; // Present, Absent, Late, Holiday
  time?: string;
}

export interface SubjectAttendance {
  subjectId: number;
  subjectName: string;
  teacherName: string;
  totalClasses: number;
  attendedClasses: number;
  attendancePercentage: number;
  dateAttendance: Record<string, AttendanceStatus>;
}

export interface DailyStatistics {
  classesAttendedToday: number;
  totalClassesToday: number;
  overallPercentage: number;
  timeSpentOutside: string;
  todayStatus: 'Present' | 'Absent' | 'Partial';
}

// Generate date range for current month (excluding weekends)
const generateSchoolDays = (year: number, month: number): string[] => {
  const start = startOfMonth(new Date(year, month));
  const end = endOfMonth(new Date(year, month));
  const days = eachDayOfInterval({ start, end });
  
  return days
    .filter(day => {
      const dayOfWeek = getDay(day);
      return dayOfWeek !== 0 && dayOfWeek !== 6; // Exclude Sunday (0) and Saturday (6)
    })
    .map(day => format(day, 'yyyy-MM-dd'));
};

// Generate random attendance for demonstration
const generateAttendancePattern = (dates: string[]): Record<string, AttendanceStatus> => {
  const attendance: Record<string, AttendanceStatus> = {};
  
  dates.forEach(date => {
    const rand = Math.random();
    if (rand > 0.15) {
      attendance[date] = { status: 'P', time: '09:00' };
    } else if (rand > 0.05) {
      attendance[date] = { status: 'L', time: '09:15' };
    } else {
      attendance[date] = { status: 'A' };
    }
  });
  
  return attendance;
};

// Mock subjects data
export const mockSubjects: SubjectAttendance[] = [
  {
    subjectId: 1,
    subjectName: 'Mathematics',
    teacherName: 'Dr. Rajesh Kumar',
    totalClasses: 22,
    attendedClasses: 20,
    attendancePercentage: 90.9,
    dateAttendance: generateAttendancePattern(generateSchoolDays(2024, 8)) // September 2024
  },
  {
    subjectId: 2,
    subjectName: 'Physics',
    teacherName: 'Prof. Sunita Sharma',
    totalClasses: 20,
    attendedClasses: 18,
    attendancePercentage: 90.0,
    dateAttendance: generateAttendancePattern(generateSchoolDays(2024, 8))
  },
  {
    subjectId: 3,
    subjectName: 'Chemistry',
    teacherName: 'Ms. Priya Patel',
    totalClasses: 21,
    attendedClasses: 19,
    attendancePercentage: 90.5,
    dateAttendance: generateAttendancePattern(generateSchoolDays(2024, 8))
  },
  {
    subjectId: 4,
    subjectName: 'English',
    teacherName: 'Mr. David Wilson',
    totalClasses: 18,
    attendedClasses: 17,
    attendancePercentage: 94.4,
    dateAttendance: generateAttendancePattern(generateSchoolDays(2024, 8))
  },
  {
    subjectId: 5,
    subjectName: 'History',
    teacherName: 'Dr. Meera Singh',
    totalClasses: 16,
    attendedClasses: 15,
    attendancePercentage: 93.8,
    dateAttendance: generateAttendancePattern(generateSchoolDays(2024, 8))
  },
  {
    subjectId: 6,
    subjectName: 'Computer Science',
    teacherName: 'Mr. Ravi Agarwal',
    totalClasses: 19,
    attendedClasses: 18,
    attendancePercentage: 94.7,
    dateAttendance: generateAttendancePattern(generateSchoolDays(2024, 8))
  }
];

// Function to calculate daily statistics
export const calculateDailyStats = (subjects: SubjectAttendance[], targetDate?: string): DailyStatistics => {
  const today = targetDate || format(new Date(), 'yyyy-MM-dd');
  
  let classesAttendedToday = 0;
  let totalClassesToday = 0;
  let totalPresent = 0;
  let totalClasses = 0;
  
  subjects.forEach(subject => {
    // Count today's attendance
    if (subject.dateAttendance[today]) {
      totalClassesToday++;
      if (subject.dateAttendance[today].status === 'P' || subject.dateAttendance[today].status === 'L') {
        classesAttendedToday++;
      }
    }
    
    // Calculate overall stats
    totalPresent += subject.attendedClasses;
    totalClasses += subject.totalClasses;
  });
  
  const overallPercentage = totalClasses > 0 ? (totalPresent / totalClasses) * 100 : 0;
  
  let todayStatus: 'Present' | 'Absent' | 'Partial' = 'Absent';
  if (classesAttendedToday === totalClassesToday && totalClassesToday > 0) {
    todayStatus = 'Present';
  } else if (classesAttendedToday > 0) {
    todayStatus = 'Partial';
  }
  
  return {
    classesAttendedToday,
    totalClassesToday,
    overallPercentage: Math.round(overallPercentage * 10) / 10,
    timeSpentOutside: '2h 30m', // Mock data
    todayStatus
  };
};

// Function to get attendance data for a specific student
export const getStudentAttendanceData = (studentId: number): SubjectAttendance[] => {
  // In a real app, this would filter based on student's enrolled subjects
  return mockSubjects;
};

// Export utility functions
export { generateSchoolDays };