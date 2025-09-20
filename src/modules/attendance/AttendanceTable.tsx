import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { format } from 'date-fns';

interface Student {
  id: number;
  name: string;
  rollNo: number;
  classId: number;
  section: string;
}

interface AttendanceRecord {
  [date: string]: {
    [studentId: number]: 'Present' | 'Absent' | undefined;
  };
}

interface AttendanceTableProps {
  students: Student[];
  dates: string[];
  attendance: AttendanceRecord;
  onAttendanceChange: (studentId: number, date: string, status: 'Present' | 'Absent') => void;
}

const AttendanceTable = ({
  students,
  dates,
  attendance,
  onAttendanceChange
}: AttendanceTableProps) => {
  const today = format(new Date(), 'yyyy-MM-dd');

  const getAttendanceStatus = (studentId: number, date: string) => {
    return attendance[date]?.[studentId];
  };

  const handleToggleAttendance = (studentId: number, date: string) => {
    const currentStatus = getAttendanceStatus(studentId, date);
    const newStatus = currentStatus === 'Present' ? 'Absent' : 'Present';
    onAttendanceChange(studentId, date, newStatus);
  };

  const isHoliday = (date: string) => {
    const dayOfWeek = new Date(date).getDay();
    return dayOfWeek === 0; // Sunday = 0
  };

  const isPastDate = (date: string) => {
    return date < today;
  };

  const isFutureDate = (date: string) => {
    return date > today;
  };

  const renderAttendanceCell = (student: Student, date: string) => {
    const status = getAttendanceStatus(student.id, date);
    const isToday = date === today;
    const holiday = isHoliday(date);
    const pastDate = isPastDate(date);
    const futureDate = isFutureDate(date);
    const dayOfMonth = parseInt(date.split('-')[2]);

    if (holiday) {
      return (
        <div key={`${student.id}-${date}`} className="min-w-[60px] p-2 text-center border-r border-border/50">
          <div className="text-xs text-muted-foreground mb-1">{dayOfMonth}</div>
          <div className="w-8 h-8 mx-auto bg-orange-100 border-2 border-orange-300 rounded flex items-center justify-center">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          </div>
          <div className="text-xs text-orange-600 mt-1">Holiday</div>
        </div>
      );
    }

    return (
      <div key={`${student.id}-${date}`} className="min-w-[60px] p-2 text-center border-r border-border/50">
        <div className="text-xs text-muted-foreground mb-1">{dayOfMonth}</div>
        <Button
          variant={status === 'Present' ? 'default' : status === 'Absent' ? 'destructive' : 'outline'}
          size="sm"
          className={`w-8 h-8 p-0 relative ${
            status === 'Present' ? 'bg-green-100 border-green-300 hover:bg-green-200' : 
            status === 'Absent' ? 'bg-red-100 border-red-300 hover:bg-red-200' : ''
          }`}
          onClick={() => handleToggleAttendance(student.id, date)}
          disabled={!isToday || holiday} // Only allow marking for today, not holidays
        >
          {status === 'Present' ? (
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          ) : status === 'Absent' ? (
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          ) : (
            <span className="text-xs">-</span>
          )}
        </Button>
        {isToday && !holiday && (
          <div className="text-xs text-primary mt-1">Today</div>
        )}
        {pastDate && !holiday && (
          <div className="text-xs text-muted-foreground mt-1">Past</div>
        )}
        {futureDate && !holiday && (
          <div className="text-xs text-muted-foreground mt-1">Future</div>
        )}
      </div>
    );
  };

  const calculateAttendanceStats = (studentId: number) => {
    let present = 0;
    let total = 0;
    
    dates.forEach(date => {
      const status = getAttendanceStatus(studentId, date);
      if (status) {
        total++;
        if (status === 'Present') present++;
      }
    });
    
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
    return { present, total, percentage };
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-muted/50 border-b">
        <div className="flex">
          {/* Student info header */}
          <div className="min-w-[200px] p-4 border-r border-border/50 bg-background">
            <div className="font-medium">Student Details</div>
          </div>
          
          {/* Date headers */}
          <div className="flex-1 overflow-hidden">
            <div className="overflow-x-auto" id="attendance-scroll">
              <div className="flex min-w-max">
                {dates.map(date => {
                  const dayOfMonth = parseInt(date.split('-')[2]);
                  const isToday = date === today;
                  const holiday = isHoliday(date);
                  const dayName = format(new Date(date), 'EEE');
                  return (
                    <div
                      key={date}
                      className={`min-w-[60px] p-2 text-center border-r border-border/50 ${
                        isToday ? 'bg-primary/10 font-medium' : ''
                      } ${holiday ? 'bg-orange-50' : ''}`}
                    >
                      <div className="text-xs text-muted-foreground">{dayName}</div>
                      <div className="text-sm font-medium">{dayOfMonth}</div>
                      {isToday && !holiday && (
                        <Badge variant="secondary" className="text-xs mt-1">
                          Today
                        </Badge>
                      )}
                      {holiday && (
                        <Badge variant="outline" className="text-xs mt-1 bg-orange-100 text-orange-700 border-orange-300">
                          Holiday
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Stats header */}
          <div className="min-w-[120px] p-4 border-l border-border/50 bg-background">
            <div className="font-medium">Attendance %</div>
          </div>
        </div>
      </div>

      {/* Student rows */}
      <div className="max-h-[600px] overflow-y-auto">
        {students.map(student => {
          const stats = calculateAttendanceStats(student.id);
          
          return (
            <div key={student.id} className="flex border-b border-border/50 hover:bg-muted/30">
              {/* Student info */}
              <div className="min-w-[200px] p-4 border-r border-border/50 bg-background/50">
                <div className="font-medium text-sm">{student.name}</div>
                <div className="text-xs text-muted-foreground">Roll: {student.rollNo}</div>
              </div>
              
              {/* Attendance cells */}
              <div className="flex-1 overflow-hidden">
                <div className="overflow-x-auto attendance-row-scroll">
                  <div className="flex min-w-max">
                    {dates.map(date => renderAttendanceCell(student, date))}
                  </div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="min-w-[120px] p-4 border-l border-border/50 bg-background/50">
                <div className="text-center">
                  <div className="font-medium text-sm">{stats.percentage}%</div>
                  <div className="text-xs text-muted-foreground">
                    {stats.present}/{stats.total}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Global horizontal scrollbar */}
      <div className="border-t bg-muted/30 p-2">
        <div className="w-full overflow-x-auto" 
             onScroll={(e) => {
               const scrollLeft = e.currentTarget.scrollLeft;
               // Sync all scrollable elements
               document.getElementById('attendance-scroll')!.scrollLeft = scrollLeft;
               document.querySelectorAll('.attendance-row-scroll').forEach(el => {
                 (el as HTMLElement).scrollLeft = scrollLeft;
               });
             }}>
          <div style={{ width: `${dates.length * 60}px`, height: '1px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTable;