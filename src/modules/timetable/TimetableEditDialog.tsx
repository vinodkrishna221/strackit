import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X, Save, Clock } from 'lucide-react';
import { TeacherTimetable, SectionTimetable, dayNames, timeSlots, mockClasses, mockSections } from '@/data/timetableData';

interface TimetableEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  timetable: TeacherTimetable | SectionTimetable | null;
  type: 'teacher' | 'section';
  onSave: (data: any) => void;
}

const TimetableEditDialog = ({
  open,
  onOpenChange,
  timetable,
  type,
  onSave
}: TimetableEditDialogProps) => {
  const [formData, setFormData] = useState<any>({});
  const [activeDay, setActiveDay] = useState('Monday');

  useEffect(() => {
    if (timetable) {
      setFormData({ ...timetable });
    } else {
      // Initialize empty form data
      const emptySchedule = dayNames.reduce((acc, day) => {
        acc[day] = [];
        return acc;
      }, {} as any);

      if (type === 'teacher') {
        setFormData({
          teacherName: '',
          subject: '',
          schedule: emptySchedule
        });
      } else {
        setFormData({
          className: '',
          sectionName: '',
          academicYear: '2024-25',
          schedule: emptySchedule
        });
      }
    }
  }, [timetable, type, open]);

  const handleSave = () => {
    onSave(formData);
  };

  const addTimeSlot = (day: string) => {
    if (!formData.schedule) return;
    
    const newSlot = type === 'teacher' 
      ? { timeSlotId: 1, className: '', sectionName: '', room: '' }
      : { timeSlotId: 1, subject: '', teacherName: '', room: '' };

    setFormData({
      ...formData,
      schedule: {
        ...formData.schedule,
        [day]: [...(formData.schedule[day] || []), newSlot]
      }
    });
  };

  const removeTimeSlot = (day: string, index: number) => {
    if (!formData.schedule) return;

    const updatedSlots = [...formData.schedule[day]];
    updatedSlots.splice(index, 1);

    setFormData({
      ...formData,
      schedule: {
        ...formData.schedule,
        [day]: updatedSlots
      }
    });
  };

  const updateTimeSlot = (day: string, index: number, field: string, value: any) => {
    if (!formData.schedule) return;

    const updatedSlots = [...formData.schedule[day]];
    updatedSlots[index] = { ...updatedSlots[index], [field]: value };

    setFormData({
      ...formData,
      schedule: {
        ...formData.schedule,
        [day]: updatedSlots
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>
              {timetable ? 'Edit' : 'Create'} {type === 'teacher' ? 'Teacher' : 'Section'} Timetable
            </span>
          </DialogTitle>
          <DialogDescription>
            {type === 'teacher' 
              ? 'Configure teacher schedule with sections and time slots'
              : 'Configure section schedule with subjects and teachers'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              {type === 'teacher' ? (
                <>
                  <div>
                    <Label htmlFor="teacherName">Teacher Name</Label>
                    <Input
                      id="teacherName"
                      value={formData.teacherName || ''}
                      onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
                      placeholder="Enter teacher name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject || ''}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Enter subject"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Label htmlFor="className">Class</Label>
                    <Select 
                      value={formData.className || ''} 
                      onValueChange={(value) => setFormData({ ...formData, className: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockClasses.map(cls => (
                          <SelectItem key={cls.id} value={cls.name}>{cls.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="sectionName">Section</Label>
                    <Select 
                      value={formData.sectionName || ''} 
                      onValueChange={(value) => setFormData({ ...formData, sectionName: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockSections.map(section => (
                          <SelectItem key={section.id} value={section.name}>{section.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Schedule Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeDay} onValueChange={setActiveDay}>
                <TabsList className="grid w-full grid-cols-7">
                  {dayNames.map(day => (
                    <TabsTrigger key={day} value={day} className="text-xs">
                      {day.slice(0, 3)}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {dayNames.map(day => (
                  <TabsContent key={day} value={day} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{day}</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addTimeSlot(day)}
                        className="animate-fade-in"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Time Slot
                      </Button>
                    </div>

                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {formData.schedule?.[day]?.map((slot: any, index: number) => (
                        <div key={index} className="p-4 border rounded-md space-y-3 animate-fade-in">
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium">Time Slot {index + 1}</h5>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeTimeSlot(day, index)}
                              className="text-destructive hover:text-destructive"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label>Time Slot</Label>
                              <Select
                                value={slot.timeSlotId?.toString() || ''}
                                onValueChange={(value) => updateTimeSlot(day, index, 'timeSlotId', parseInt(value))}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent>
                                  {timeSlots.map(ts => (
                                    <SelectItem key={ts.id} value={ts.id.toString()}>
                                      {ts.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {type === 'teacher' ? (
                              <>
                                <div>
                                  <Label>Class</Label>
                                  <Input
                                    value={slot.className || ''}
                                    onChange={(e) => updateTimeSlot(day, index, 'className', e.target.value)}
                                    placeholder="Class name"
                                  />
                                </div>
                                <div>
                                  <Label>Section</Label>
                                  <Input
                                    value={slot.sectionName || ''}
                                    onChange={(e) => updateTimeSlot(day, index, 'sectionName', e.target.value)}
                                    placeholder="Section name"
                                  />
                                </div>
                              </>
                            ) : (
                              <>
                                <div>
                                  <Label>Subject</Label>
                                  <Input
                                    value={slot.subject || ''}
                                    onChange={(e) => updateTimeSlot(day, index, 'subject', e.target.value)}
                                    placeholder="Subject name"
                                  />
                                </div>
                                <div>
                                  <Label>Teacher</Label>
                                  <Input
                                    value={slot.teacherName || ''}
                                    onChange={(e) => updateTimeSlot(day, index, 'teacherName', e.target.value)}
                                    placeholder="Teacher name"
                                  />
                                </div>
                              </>
                            )}

                            <div>
                              <Label>Room</Label>
                              <Input
                                value={slot.room || ''}
                                onChange={(e) => updateTimeSlot(day, index, 'room', e.target.value)}
                                placeholder="Room number"
                              />
                            </div>
                          </div>
                        </div>
                      )) || (
                        <div className="p-8 text-center text-muted-foreground border-2 border-dashed rounded-md">
                          No time slots added for {day}
                        </div>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="animate-fade-in">
            <Save className="w-4 h-4 mr-2" />
            Save Timetable
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TimetableEditDialog;