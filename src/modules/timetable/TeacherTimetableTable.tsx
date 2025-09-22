import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, Clock, MapPin } from 'lucide-react';
import { TeacherTimetable, dayNames, timeSlots } from '@/data/timetableData';

interface TeacherTimetableTableProps {
  timetables: TeacherTimetable[];
  isAdmin?: boolean;
  onEdit?: (timetable: TeacherTimetable) => void;
  onDelete?: (id: number) => void;
}

const TeacherTimetableTable = ({ 
  timetables, 
  isAdmin = false, 
  onEdit, 
  onDelete 
}: TeacherTimetableTableProps) => {
  if (timetables.length === 0) {
    return (
      <Card className="animate-fade-in">
        <CardContent className="flex items-center justify-center h-48">
          <p className="text-muted-foreground">No timetable data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {timetables.map((timetable) => (
        <Card key={timetable.id} className="animate-fade-in hover-scale">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <span>{timetable.teacherName}</span>
                  <Badge variant="secondary">{timetable.subject}</Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Weekly Schedule
                </p>
              </div>
              {isAdmin && (
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit?.(timetable)}
                    className="hover-scale"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete?.(timetable.id)}
                    className="hover-scale text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
              {dayNames.map((day) => (
                <div key={day} className="space-y-2">
                  <h4 className="font-semibold text-sm text-center p-2 bg-muted rounded-md">
                    {day}
                  </h4>
                  <div className="space-y-2 min-h-[200px]">
                    {timetable.schedule[day]?.map((slot, index) => (
                      <div
                        key={index}
                        className="p-3 border rounded-md bg-card hover:bg-accent/50 transition-colors animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="w-3 h-3 text-primary" />
                          <span className="text-xs font-medium text-primary">
                            {timeSlots.find(ts => ts.id === slot.timeSlotId)?.label}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{slot.className}</p>
                          <p className="text-xs text-muted-foreground">{slot.sectionName}</p>
                          {slot.room && (
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{slot.room}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )) || (
                      <div className="p-3 border-2 border-dashed border-muted rounded-md text-center">
                        <p className="text-xs text-muted-foreground">No classes</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TeacherTimetableTable;