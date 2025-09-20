import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle, XCircle, Clock, Calendar } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns';
import { SubjectAttendance, AttendanceStatus } from '@/data/mockData';

interface AttendanceRegisterTableProps {
  attendanceData: SubjectAttendance[];
}

const AttendanceRegisterTable = ({ attendanceData }: AttendanceRegisterTableProps) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear] = useState(new Date().getFullYear());

  // Generate school days for selected month
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

  const schoolDays = generateSchoolDays(selectedYear, selectedMonth);

  const getAttendanceIcon = (status: AttendanceStatus) => {
    switch (status.status) {
      case 'P':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'A':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'L':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'H':
        return <Calendar className="h-4 w-4 text-gray-600" />;
      default:
        return null;
    }
  };

  const getAttendanceColor = (status: AttendanceStatus) => {
    switch (status.status) {
      case 'P':
        return 'bg-green-100 text-green-800';
      case 'A':
        return 'bg-red-100 text-red-800';
      case 'L':
        return 'bg-yellow-100 text-yellow-800';
      case 'H':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="space-y-4">
      {/* Month Selector */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Monthly Attendance View</h3>
        <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month, index) => (
              <SelectItem key={index} value={index.toString()}>
                {month} {selectedYear}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Attendance Table */}
      <div className="border rounded-lg">
        <ScrollArea className="h-96">
          <Table>
            <TableHeader className="sticky top-0 bg-white">
              <TableRow>
                <TableHead className="w-40 font-semibold">Subject</TableHead>
                <TableHead className="w-32 font-semibold">Teacher</TableHead>
                <TableHead className="w-20 font-semibold text-center">%</TableHead>
                {schoolDays.map(date => (
                  <TableHead key={date} className="w-12 text-center font-medium">
                    {format(new Date(date), 'd')}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceData.map(subject => (
                <TableRow key={subject.subjectId} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    <div>
                      <p className="font-semibold text-sm">{subject.subjectName}</p>
                      <p className="text-xs text-gray-600">
                        {subject.attendedClasses}/{subject.totalClasses} classes
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-700">
                    {subject.teacherName}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getPercentageColor(subject.attendancePercentage)}`}
                    >
                      {subject.attendancePercentage}%
                    </Badge>
                  </TableCell>
                  {schoolDays.map(date => {
                    const attendance = subject.dateAttendance[date];
                    return (
                      <TableCell key={date} className="text-center p-2">
                        {attendance ? (
                          <div className="flex justify-center">
                            <Badge 
                              variant="secondary" 
                              className={`${getAttendanceColor(attendance)} px-1 py-0 text-xs flex items-center justify-center w-6 h-6`}
                            >
                              {attendance.status}
                            </Badge>
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                            <span className="text-xs text-gray-400">-</span>
                          </div>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <Badge className="bg-green-100 text-green-800 px-2 py-1">P</Badge>
          <span>Present</span>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-red-100 text-red-800 px-2 py-1">A</Badge>
          <span>Absent</span>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-yellow-100 text-yellow-800 px-2 py-1">L</Badge>
          <span>Late</span>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-gray-100 text-gray-800 px-2 py-1">H</Badge>
          <span>Holiday</span>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <p className="text-2xl font-bold text-green-600">
            {attendanceData.reduce((sum, subject) => sum + subject.attendedClasses, 0)}
          </p>
          <p className="text-sm text-green-800">Total Classes Attended</p>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <p className="text-2xl font-bold text-blue-600">
            {attendanceData.reduce((sum, subject) => sum + subject.totalClasses, 0)}
          </p>
          <p className="text-sm text-blue-800">Total Classes Conducted</p>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <p className="text-2xl font-bold text-purple-600">
            {Math.round(
              (attendanceData.reduce((sum, subject) => sum + subject.attendedClasses, 0) /
              attendanceData.reduce((sum, subject) => sum + subject.totalClasses, 0)) * 100
            )}%
          </p>
          <p className="text-sm text-purple-800">Overall Percentage</p>
        </div>
      </div>
    </div>
  );
};

export default AttendanceRegisterTable;