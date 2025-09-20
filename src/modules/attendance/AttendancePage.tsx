import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Calendar, CheckCircle, XCircle, Users } from 'lucide-react';
import { format, getDaysInMonth } from 'date-fns';
import { toast } from 'sonner';
import AttendanceTable from './AttendanceTable';

interface Student {
  id: number;
  name: string;
  rollNo: number;
  classId: number;
  section: string;
}

interface ClassData {
  id: number;
  name: string;
  sections: string[];
}

interface AttendanceRecord {
  [date: string]: {
    [studentId: number]: 'Present' | 'Absent' | undefined;
  };
}

// Hardcoded data - same as other modules
const students: Student[] = [
  { id: 1, name: "Arjun Sharma", rollNo: 1, classId: 1, section: "A" },
  { id: 2, name: "Priya Verma", rollNo: 2, classId: 1, section: "A" },
  { id: 3, name: "Ravi Singh", rollNo: 1, classId: 2, section: "A" },
  { id: 4, name: "Sneha Patel", rollNo: 3, classId: 1, section: "A" },
  { id: 5, name: "Amit Kumar", rollNo: 4, classId: 1, section: "A" },
];

const classes: ClassData[] = [
  { id: 1, name: "Class 10", sections: ["A", "B"] },
  { id: 2, name: "Class 9", sections: ["A"] },
];

// Mock attendance data for 2025
const mockAttendanceData: AttendanceRecord = {
  '2025-09-02': { 1: 'Present', 2: 'Present', 3: 'Absent', 4: 'Present', 5: 'Present' },
  '2025-09-03': { 1: 'Present', 2: 'Absent', 3: 'Present', 4: 'Present', 5: 'Absent' },
  '2025-09-04': { 1: 'Absent', 2: 'Present', 3: 'Present', 4: 'Absent', 5: 'Present' },
  '2025-09-05': { 1: 'Present', 2: 'Present', 3: 'Present', 4: 'Present', 5: 'Present' },
  '2025-09-06': { 1: 'Present', 2: 'Absent', 3: 'Present', 4: 'Present', 5: 'Present' },
  '2025-09-09': { 1: 'Present', 2: 'Present', 3: 'Absent', 4: 'Present', 5: 'Absent' },
  '2025-09-10': { 1: 'Absent', 2: 'Present', 3: 'Present', 4: 'Present', 5: 'Present' },
  '2025-09-11': { 1: 'Present', 2: 'Present', 3: 'Present', 4: 'Absent', 5: 'Present' },
  '2025-09-12': { 1: 'Present', 2: 'Absent', 3: 'Present', 4: 'Present', 5: 'Present' },
  '2025-09-13': { 1: 'Present', 2: 'Present', 3: 'Present', 4: 'Present', 5: 'Absent' },
  '2025-09-16': { 1: 'Present', 2: 'Present', 3: 'Absent', 4: 'Present', 5: 'Present' },
  '2025-09-17': { 1: 'Absent', 2: 'Present', 3: 'Present', 4: 'Present', 5: 'Present' },
  '2025-09-18': { 1: 'Present', 2: 'Present', 3: 'Present', 4: 'Present', 5: 'Present' },
  '2025-09-19': { 1: 'Present', 2: 'Absent', 3: 'Present', 4: 'Present', 5: 'Present' },
};

const AttendancePage = () => {
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<string>(format(new Date(), 'yyyy-MM'));
  const [attendance, setAttendance] = useState<AttendanceRecord>(mockAttendanceData);

  // Auto-select current month when section changes
  const handleSectionChange = (value: string) => {
    setSelectedSection(value);
    // Auto-select current month when section is selected
    setSelectedMonth(format(new Date(), 'yyyy-MM'));
  };

  // Filter students based on selected class and section
  const filteredStudents = useMemo(() => {
    if (!selectedClass || !selectedSection) return [];
    
    return students.filter(student => 
      student.classId === parseInt(selectedClass) && 
      student.section === selectedSection
    );
  }, [selectedClass, selectedSection]);

  // Get available sections for selected class
  const availableSections = useMemo(() => {
    if (!selectedClass) return [];
    const classData = classes.find(cls => cls.id === parseInt(selectedClass));
    return classData?.sections || [];
  }, [selectedClass]);

  // Generate dates for the selected month
  const monthDates = useMemo(() => {
    if (!selectedMonth) return [];
    
    const [year, month] = selectedMonth.split('-').map(Number);
    const daysInMonth = getDaysInMonth(new Date(year, month - 1));
    
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    });
  }, [selectedMonth]);

  const handleClassChange = (value: string) => {
    setSelectedClass(value);
    setSelectedSection(''); // Reset section when class changes
  };

  const handleAttendanceChange = (studentId: number, date: string, status: 'Present' | 'Absent') => {
    setAttendance(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        [studentId]: status
      }
    }));
  };

  const handleMarkAllPresent = () => {
    if (!filteredStudents.length || !monthDates.length) return;
    
    const today = format(new Date(), 'yyyy-MM-dd');
    const newAttendance = { ...attendance };
    
    if (!newAttendance[today]) {
      newAttendance[today] = {};
    }
    
    filteredStudents.forEach(student => {
      newAttendance[today][student.id] = 'Present';
    });
    
    setAttendance(newAttendance);
    toast.success('All students marked present for today');
  };

  const handleClearToday = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const newAttendance = { ...attendance };
    
    if (newAttendance[today]) {
      delete newAttendance[today];
    }
    
    setAttendance(newAttendance);
    toast.success('Today\'s attendance cleared');
  };

  const handleSaveAttendance = () => {
    // In a real app, this would save to a database
    toast.success('Attendance saved successfully');
  };

  const getClassName = (classId: number) => {
    return classes.find(cls => cls.id === classId)?.name || 'Unknown';
  };

  return (
    <div className="space-y-6">
      {/* Current Date Display */}
      <div className="bg-card border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Today's Date</h2>
            <p className="text-2xl font-bold text-primary">
              {format(new Date(), 'EEEE, MMMM do, yyyy')}
            </p>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Present</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Absent</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span>Holiday</span>
            </div>
          </div>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Attendance Register</span>
          </CardTitle>
          <CardDescription>
            Mark daily attendance for students by class and section
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Class</Label>
              <Select value={selectedClass} onValueChange={handleClassChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map(cls => (
                    <SelectItem key={cls.id} value={cls.id.toString()}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Section</Label>
              <Select 
                value={selectedSection} 
                onValueChange={handleSectionChange}
                disabled={!selectedClass}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  {availableSections.map(section => (
                    <SelectItem key={section} value={section}>
                      Section {section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Month</Label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => {
                    const date = new Date(2025, i, 1);
                    const value = format(date, 'yyyy-MM');
                    return (
                      <SelectItem key={value} value={value}>
                        {format(date, 'MMMM yyyy')}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          {selectedClass && selectedSection && (
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleMarkAllPresent} variant="outline">
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark All Present
              </Button>
              <Button onClick={handleClearToday} variant="outline">
                <XCircle className="w-4 h-4 mr-2" />
                Clear Today
              </Button>
              <Button onClick={handleSaveAttendance}>
                Save Attendance
              </Button>
            </div>
          )}

          {/* Attendance Table */}
          {!selectedClass || !selectedSection ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-medium mb-2">Select Class and Section</h3>
              <p className="text-sm text-muted-foreground">
                Choose a class and section to view the attendance register
              </p>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-medium mb-2">No Students Found</h3>
              <p className="text-sm text-muted-foreground">
                No students found for {getClassName(parseInt(selectedClass))} - Section {selectedSection}
              </p>
            </div>
          ) : (
            <AttendanceTable
              students={filteredStudents}
              dates={monthDates}
              attendance={attendance}
              onAttendanceChange={handleAttendanceChange}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendancePage;