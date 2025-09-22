// Mock data for Timetable Management

export interface TimeSlot {
  id: number;
  label: string;
  startTime: string;
  endTime: string;
}

export interface TeacherTimeSlot {
  timeSlotId: number;
  className: string;
  sectionName: string;
  room?: string;
}

export interface SectionTimeSlot {
  timeSlotId: number;
  subject: string;
  teacherName: string;
  room?: string;
}

export interface TeacherTimetable {
  id: number;
  teacherId: number;
  teacherName: string;
  subject: string;
  schedule: Record<string, TeacherTimeSlot[]>;
}

export interface SectionTimetable {
  id: number;
  sectionId: number;
  className: string;
  sectionName: string;
  academicYear: string;
  schedule: Record<string, SectionTimeSlot[]>;
}

export interface Class {
  id: number;
  name: string;
}

export interface Section {
  id: number;
  name: string;
  classId: number;
}

// Time slots configuration
export const timeSlots: TimeSlot[] = [
  { id: 1, label: '08:00 - 08:45', startTime: '08:00', endTime: '08:45' },
  { id: 2, label: '08:45 - 09:30', startTime: '08:45', endTime: '09:30' },
  { id: 3, label: '09:30 - 10:15', startTime: '09:30', endTime: '10:15' },
  { id: 4, label: '10:15 - 11:00', startTime: '10:15', endTime: '11:00' },
  { id: 5, label: '11:15 - 12:00', startTime: '11:15', endTime: '12:00' }, // Break: 11:00-11:15
  { id: 6, label: '12:00 - 12:45', startTime: '12:00', endTime: '12:45' },
  { id: 7, label: '12:45 - 01:30', startTime: '12:45', endTime: '13:30' },
  { id: 8, label: '02:15 - 03:00', startTime: '14:15', endTime: '15:00' }, // Lunch: 01:30-02:15
];

// Days of the week
export const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Mock classes data
export const mockClasses: Class[] = [
  { id: 1, name: 'Class X' },
  { id: 2, name: 'Class XI' },
  { id: 3, name: 'Class XII' }
];

// Mock sections data
export const mockSections: Section[] = [
  { id: 1, name: 'A', classId: 1 },
  { id: 2, name: 'B', classId: 1 },
  { id: 3, name: 'A', classId: 2 },
  { id: 4, name: 'B', classId: 2 },
  { id: 5, name: 'A', classId: 3 },
  { id: 6, name: 'B', classId: 3 }
];

// Mock teacher timetables
export const mockTeacherTimetables: TeacherTimetable[] = [
  {
    id: 1,
    teacherId: 1,
    teacherName: 'Dr. Rajesh Kumar',
    subject: 'Mathematics',
    schedule: {
      Monday: [
        { timeSlotId: 1, className: 'Class X', sectionName: 'A', room: 'Room 101' },
        { timeSlotId: 3, className: 'Class XI', sectionName: 'A', room: 'Room 201' },
        { timeSlotId: 6, className: 'Class XII', sectionName: 'B', room: 'Room 301' }
      ],
      Tuesday: [
        { timeSlotId: 2, className: 'Class X', sectionName: 'B', room: 'Room 102' },
        { timeSlotId: 4, className: 'Class XI', sectionName: 'B', room: 'Room 202' },
        { timeSlotId: 7, className: 'Class XII', sectionName: 'A', room: 'Room 302' }
      ],
      Wednesday: [
        { timeSlotId: 1, className: 'Class X', sectionName: 'A', room: 'Room 101' },
        { timeSlotId: 5, className: 'Class XI', sectionName: 'A', room: 'Room 201' }
      ],
      Thursday: [
        { timeSlotId: 2, className: 'Class X', sectionName: 'B', room: 'Room 102' },
        { timeSlotId: 4, className: 'Class XI', sectionName: 'B', room: 'Room 202' },
        { timeSlotId: 6, className: 'Class XII', sectionName: 'B', room: 'Room 301' }
      ],
      Friday: [
        { timeSlotId: 3, className: 'Class XI', sectionName: 'A', room: 'Room 201' },
        { timeSlotId: 7, className: 'Class XII', sectionName: 'A', room: 'Room 302' }
      ],
      Saturday: [
        { timeSlotId: 1, className: 'Class X', sectionName: 'A', room: 'Room 101' },
        { timeSlotId: 3, className: 'Class X', sectionName: 'B', room: 'Room 102' }
      ]
    }
  },
  {
    id: 2,
    teacherId: 2,
    teacherName: 'Prof. Sunita Sharma',
    subject: 'Physics',
    schedule: {
      Monday: [
        { timeSlotId: 2, className: 'Class XI', sectionName: 'A', room: 'Physics Lab' },
        { timeSlotId: 5, className: 'Class XII', sectionName: 'A', room: 'Physics Lab' }
      ],
      Tuesday: [
        { timeSlotId: 1, className: 'Class XI', sectionName: 'B', room: 'Physics Lab' },
        { timeSlotId: 6, className: 'Class XII', sectionName: 'B', room: 'Physics Lab' }
      ],
      Wednesday: [
        { timeSlotId: 3, className: 'Class XI', sectionName: 'A', room: 'Room 203' },
        { timeSlotId: 7, className: 'Class XII', sectionName: 'A', room: 'Room 303' }
      ],
      Thursday: [
        { timeSlotId: 1, className: 'Class XI', sectionName: 'B', room: 'Room 204' },
        { timeSlotId: 5, className: 'Class XII', sectionName: 'B', room: 'Room 304' }
      ],
      Friday: [
        { timeSlotId: 2, className: 'Class XI', sectionName: 'A', room: 'Physics Lab' },
        { timeSlotId: 6, className: 'Class XII', sectionName: 'A', room: 'Physics Lab' }
      ],
      Saturday: [
        { timeSlotId: 2, className: 'Class XI', sectionName: 'B', room: 'Physics Lab' }
      ]
    }
  },
  {
    id: 3,
    teacherId: 3,
    teacherName: 'Ms. Priya Patel',
    subject: 'Chemistry',
    schedule: {
      Monday: [
        { timeSlotId: 4, className: 'Class XI', sectionName: 'B', room: 'Chemistry Lab' },
        { timeSlotId: 7, className: 'Class XII', sectionName: 'B', room: 'Chemistry Lab' }
      ],
      Tuesday: [
        { timeSlotId: 3, className: 'Class XI', sectionName: 'A', room: 'Chemistry Lab' },
        { timeSlotId: 5, className: 'Class XII', sectionName: 'A', room: 'Chemistry Lab' }
      ],
      Wednesday: [
        { timeSlotId: 2, className: 'Class XI', sectionName: 'B', room: 'Room 205' },
        { timeSlotId: 6, className: 'Class XII', sectionName: 'B', room: 'Room 305' }
      ],
      Thursday: [
        { timeSlotId: 3, className: 'Class XI', sectionName: 'A', room: 'Room 206' },
        { timeSlotId: 7, className: 'Class XII', sectionName: 'A', room: 'Room 306' }
      ],
      Friday: [
        { timeSlotId: 1, className: 'Class XI', sectionName: 'B', room: 'Chemistry Lab' },
        { timeSlotId: 4, className: 'Class XII', sectionName: 'B', room: 'Chemistry Lab' }
      ],
      Saturday: [
        { timeSlotId: 4, className: 'Class XI', sectionName: 'A', room: 'Chemistry Lab' }
      ]
    }
  }
];

// Mock section timetables
export const mockSectionTimetables: SectionTimetable[] = [
  {
    id: 1,
    sectionId: 1,
    className: 'Class X',
    sectionName: 'A',
    academicYear: '2024-25',
    schedule: {
      Monday: [
        { timeSlotId: 1, subject: 'Mathematics', teacherName: 'Dr. Rajesh Kumar', room: 'Room 101' },
        { timeSlotId: 2, subject: 'English', teacherName: 'Mr. David Wilson', room: 'Room 105' },
        { timeSlotId: 3, subject: 'Science', teacherName: 'Ms. Kavita Rao', room: 'Science Lab' },
        { timeSlotId: 4, subject: 'Social Science', teacherName: 'Dr. Meera Singh', room: 'Room 107' },
        { timeSlotId: 5, subject: 'Hindi', teacherName: 'Mrs. Asha Verma', room: 'Room 109' },
        { timeSlotId: 6, subject: 'Computer Science', teacherName: 'Mr. Ravi Agarwal', room: 'Computer Lab' }
      ],
      Tuesday: [
        { timeSlotId: 1, subject: 'English', teacherName: 'Mr. David Wilson', room: 'Room 105' },
        { timeSlotId: 2, subject: 'Mathematics', teacherName: 'Dr. Rajesh Kumar', room: 'Room 101' },
        { timeSlotId: 3, subject: 'Science', teacherName: 'Ms. Kavita Rao', room: 'Science Lab' },
        { timeSlotId: 4, subject: 'Physical Education', teacherName: 'Mr. Suresh Khanna', room: 'Playground' },
        { timeSlotId: 5, subject: 'Social Science', teacherName: 'Dr. Meera Singh', room: 'Room 107' },
        { timeSlotId: 6, subject: 'Art', teacherName: 'Ms. Anita Joshi', room: 'Art Room' }
      ],
      Wednesday: [
        { timeSlotId: 1, subject: 'Hindi', teacherName: 'Mrs. Asha Verma', room: 'Room 109' },
        { timeSlotId: 2, subject: 'Science', teacherName: 'Ms. Kavita Rao', room: 'Science Lab' },
        { timeSlotId: 3, subject: 'Mathematics', teacherName: 'Dr. Rajesh Kumar', room: 'Room 101' },
        { timeSlotId: 4, subject: 'English', teacherName: 'Mr. David Wilson', room: 'Room 105' },
        { timeSlotId: 5, subject: 'Computer Science', teacherName: 'Mr. Ravi Agarwal', room: 'Computer Lab' },
        { timeSlotId: 6, subject: 'Music', teacherName: 'Mrs. Lakshmi Nair', room: 'Music Room' }
      ],
      Thursday: [
        { timeSlotId: 1, subject: 'Social Science', teacherName: 'Dr. Meera Singh', room: 'Room 107' },
        { timeSlotId: 2, subject: 'Mathematics', teacherName: 'Dr. Rajesh Kumar', room: 'Room 101' },
        { timeSlotId: 3, subject: 'English', teacherName: 'Mr. David Wilson', room: 'Room 105' },
        { timeSlotId: 4, subject: 'Science', teacherName: 'Ms. Kavita Rao', room: 'Science Lab' },
        { timeSlotId: 5, subject: 'Hindi', teacherName: 'Mrs. Asha Verma', room: 'Room 109' },
        { timeSlotId: 6, subject: 'Library', teacherName: 'Ms. Geetha Nair', room: 'Library' }
      ],
      Friday: [
        { timeSlotId: 1, subject: 'Mathematics', teacherName: 'Dr. Rajesh Kumar', room: 'Room 101' },
        { timeSlotId: 2, subject: 'Science', teacherName: 'Ms. Kavita Rao', room: 'Science Lab' },
        { timeSlotId: 3, subject: 'English', teacherName: 'Mr. David Wilson', room: 'Room 105' },
        { timeSlotId: 4, subject: 'Computer Science', teacherName: 'Mr. Ravi Agarwal', room: 'Computer Lab' },
        { timeSlotId: 5, subject: 'Physical Education', teacherName: 'Mr. Suresh Khanna', room: 'Playground' },
        { timeSlotId: 6, subject: 'Social Science', teacherName: 'Dr. Meera Singh', room: 'Room 107' }
      ],
      Saturday: [
        { timeSlotId: 1, subject: 'Hindi', teacherName: 'Mrs. Asha Verma', room: 'Room 109' },
        { timeSlotId: 2, subject: 'Art', teacherName: 'Ms. Anita Joshi', room: 'Art Room' },
        { timeSlotId: 3, subject: 'Music', teacherName: 'Mrs. Lakshmi Nair', room: 'Music Room' },
        { timeSlotId: 4, subject: 'General Studies', teacherName: 'Various Teachers', room: 'Main Hall' }
      ]
    }
  },
  {
    id: 2,
    sectionId: 3,
    className: 'Class XI',
    sectionName: 'A',
    academicYear: '2024-25',
    schedule: {
      Monday: [
        { timeSlotId: 1, subject: 'Physics', teacherName: 'Prof. Sunita Sharma', room: 'Physics Lab' },
        { timeSlotId: 2, subject: 'Chemistry', teacherName: 'Ms. Priya Patel', room: 'Room 203' },
        { timeSlotId: 3, subject: 'Mathematics', teacherName: 'Dr. Rajesh Kumar', room: 'Room 201' },
        { timeSlotId: 4, subject: 'English', teacherName: 'Mr. David Wilson', room: 'Room 205' },
        { timeSlotId: 5, subject: 'Computer Science', teacherName: 'Mr. Ravi Agarwal', room: 'Computer Lab' },
        { timeSlotId: 6, subject: 'Biology', teacherName: 'Dr. Sanjay Gupta', room: 'Biology Lab' }
      ],
      Tuesday: [
        { timeSlotId: 1, subject: 'Chemistry', teacherName: 'Ms. Priya Patel', room: 'Chemistry Lab' },
        { timeSlotId: 2, subject: 'Mathematics', teacherName: 'Dr. Rajesh Kumar', room: 'Room 201' },
        { timeSlotId: 3, subject: 'Physics', teacherName: 'Prof. Sunita Sharma', room: 'Room 203' },
        { timeSlotId: 4, subject: 'Biology', teacherName: 'Dr. Sanjay Gupta', room: 'Biology Lab' },
        { timeSlotId: 5, subject: 'English', teacherName: 'Mr. David Wilson', room: 'Room 205' },
        { timeSlotId: 6, subject: 'Physical Education', teacherName: 'Mr. Suresh Khanna', room: 'Playground' }
      ],
      Wednesday: [
        { timeSlotId: 1, subject: 'Mathematics', teacherName: 'Dr. Rajesh Kumar', room: 'Room 201' },
        { timeSlotId: 2, subject: 'Physics', teacherName: 'Prof. Sunita Sharma', room: 'Physics Lab' },
        { timeSlotId: 3, subject: 'English', teacherName: 'Mr. David Wilson', room: 'Room 205' },
        { timeSlotId: 4, subject: 'Chemistry', teacherName: 'Ms. Priya Patel', room: 'Room 203' },
        { timeSlotId: 5, subject: 'Computer Science', teacherName: 'Mr. Ravi Agarwal', room: 'Computer Lab' },
        { timeSlotId: 6, subject: 'Economics', teacherName: 'Dr. Amit Sharma', room: 'Room 207' }
      ],
      Thursday: [
        { timeSlotId: 1, subject: 'Biology', teacherName: 'Dr. Sanjay Gupta', room: 'Biology Lab' },
        { timeSlotId: 2, subject: 'Mathematics', teacherName: 'Dr. Rajesh Kumar', room: 'Room 201' },
        { timeSlotId: 3, subject: 'Chemistry', teacherName: 'Ms. Priya Patel', room: 'Chemistry Lab' },
        { timeSlotId: 4, subject: 'Physics', teacherName: 'Prof. Sunita Sharma', room: 'Room 203' },
        { timeSlotId: 5, subject: 'English', teacherName: 'Mr. David Wilson', room: 'Room 205' },
        { timeSlotId: 6, subject: 'Library', teacherName: 'Ms. Geetha Nair', room: 'Library' }
      ],
      Friday: [
        { timeSlotId: 1, subject: 'Physics', teacherName: 'Prof. Sunita Sharma', room: 'Physics Lab' },
        { timeSlotId: 2, subject: 'Chemistry', teacherName: 'Ms. Priya Patel', room: 'Chemistry Lab' },
        { timeSlotId: 3, subject: 'Mathematics', teacherName: 'Dr. Rajesh Kumar', room: 'Room 201' },
        { timeSlotId: 4, subject: 'Computer Science', teacherName: 'Mr. Ravi Agarwal', room: 'Computer Lab' },
        { timeSlotId: 5, subject: 'Biology', teacherName: 'Dr. Sanjay Gupta', room: 'Biology Lab' },
        { timeSlotId: 6, subject: 'Economics', teacherName: 'Dr. Amit Sharma', room: 'Room 207' }
      ],
      Saturday: [
        { timeSlotId: 1, subject: 'English', teacherName: 'Mr. David Wilson', room: 'Room 205' },
        { timeSlotId: 2, subject: 'General Studies', teacherName: 'Various Teachers', room: 'Main Hall' },
        { timeSlotId: 3, subject: 'Career Counseling', teacherName: 'Ms. Reena Khanna', room: 'Counseling Room' }
      ]
    }
  }
];