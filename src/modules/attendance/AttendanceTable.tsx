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

  const renderAttendanceCell = (student: Student, date: string) => {
    const status = getAttendanceStatus(student.id, date);
    const isToday = date === today;
    const dayOfMonth = parseInt(date.split('-')[2]);

    return (
      <div key={`${student.id}-${date}`} className="min-w-[60px] p-2 text-center border-r border-border/50">
        <div className="text-xs text-muted-foreground mb-1">{dayOfMonth}</div>
        <Button
          variant={status === 'Present' ? 'default' : status === 'Absent' ? 'destructive' : 'outline'}
          size="sm"
          className="w-8 h-8 p-0"
          onClick={() => handleToggleAttendance(student.id, date)}
          disabled={!isToday && !status} // Only allow marking for today or already marked dates
        >
          {status === 'Present' ? (
            <Check className="w-3 h-3" />
          ) : status === 'Absent' ? (
            <X className="w-3 h-3" />
          ) : (
            <span className="text-xs">-</span>
          )}
        </Button>
        {isToday && (
          <div className="text-xs text-primary mt-1">Today</div>
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
          <div className="flex-1 overflow-x-auto">
            <div className="flex min-w-max">
              {dates.map(date => {
                const dayOfMonth = parseInt(date.split('-')[2]);
                const isToday = date === today;
                return (
                  <div
                    key={date}
                    className={`min-w-[60px] p-2 text-center border-r border-border/50 ${
                      isToday ? 'bg-primary/10 font-medium' : ''
                    }`}
                  >
                    <div className="text-sm">{dayOfMonth}</div>
                    {isToday && (
                      <Badge variant="secondary" className="text-xs mt-1">
                        Today
                      </Badge>
                    )}
                  </div>
                );
              })}
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
              <div className="flex-1 overflow-x-auto">
                <div className="flex min-w-max">
                  {dates.map(date => renderAttendanceCell(student, date))}
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
    </div>
  );
};

export default AttendanceTable;