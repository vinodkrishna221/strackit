import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Users, BookOpen, Plus, Edit2, Trash2 } from 'lucide-react';
import TeacherTimetableTable from './TeacherTimetableTable';
import SectionTimetableTable from './SectionTimetableTable';
import TimetableEditDialog from './TimetableEditDialog';
import { mockTeacherTimetables, mockSectionTimetables, mockClasses, mockSections, TimeSlot, TeacherTimetable, SectionTimetable } from '@/data/timetableData';

interface TimetablePageProps {
  isAdmin?: boolean;
  teacherId?: number;
  sectionId?: number;
}

const TimetablePage = ({ isAdmin = false, teacherId, sectionId }: TimetablePageProps) => {
  const [activeTab, setActiveTab] = useState(isAdmin ? 'teacher' : teacherId ? 'teacher' : 'section');
  const [selectedTeacher, setSelectedTeacher] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingTimetable, setEditingTimetable] = useState<TeacherTimetable | SectionTimetable | null>(null);
  const [editType, setEditType] = useState<'teacher' | 'section'>('teacher');

  // Filter data based on user role and permissions
  const getFilteredTeacherTimetables = () => {
    if (teacherId) {
      return mockTeacherTimetables.filter(tt => tt.teacherId === teacherId);
    }
    if (selectedTeacher) {
      return mockTeacherTimetables.filter(tt => tt.teacherId === parseInt(selectedTeacher));
    }
    return mockTeacherTimetables;
  };

  const getFilteredSectionTimetables = () => {
    if (sectionId) {
      return mockSectionTimetables.filter(st => st.sectionId === sectionId);
    }
    if (selectedClass && selectedSection) {
      const targetSection = mockSections.find(s => 
        s.classId === parseInt(selectedClass) && s.name === selectedSection
      );
      if (targetSection) {
        return mockSectionTimetables.filter(st => st.sectionId === targetSection.id);
      }
    }
    return mockSectionTimetables;
  };

  const handleEditTimetable = (timetable: TeacherTimetable | SectionTimetable, type: 'teacher' | 'section') => {
    if (!isAdmin) return;
    setEditingTimetable(timetable);
    setEditType(type);
    setEditDialogOpen(true);
  };

  const handleDeleteTimetable = (id: number, type: 'teacher' | 'section') => {
    if (!isAdmin) return;
    // In real app, this would make an API call
    console.log(`Delete ${type} timetable with id: ${id}`);
  };

  const handleCreateNew = (type: 'teacher' | 'section') => {
    if (!isAdmin) return;
    setEditingTimetable(null);
    setEditType(type);
    setEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Calendar className="w-6 h-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">Timetable Management</h2>
            <p className="text-muted-foreground">
              {isAdmin ? 'Manage school timetables' : 'View your timetable'}
            </p>
          </div>
        </div>
        {isAdmin && (
          <div className="flex space-x-2">
            <Button 
              onClick={() => handleCreateNew('teacher')}
              className="animate-fade-in"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Teacher Schedule
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleCreateNew('section')}
              className="animate-fade-in"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Section Schedule
            </Button>
          </div>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="teacher" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Teacher Timetable</span>
          </TabsTrigger>
          <TabsTrigger value="section" className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>Section Timetable</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="teacher" className="space-y-6">
          {/* Teacher Filters */}
          {isAdmin && !teacherId && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Select Teacher</CardTitle>
                <CardDescription>Choose a teacher to view their timetable</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Dr. Rajesh Kumar</SelectItem>
                    <SelectItem value="2">Prof. Sunita Sharma</SelectItem>
                    <SelectItem value="3">Ms. Priya Patel</SelectItem>
                    <SelectItem value="4">Mr. David Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          )}

          {/* Teacher Timetable */}
          <TeacherTimetableTable 
            timetables={getFilteredTeacherTimetables()}
            isAdmin={isAdmin}
            onEdit={(timetable) => handleEditTimetable(timetable, 'teacher')}
            onDelete={(id) => handleDeleteTimetable(id, 'teacher')}
          />
        </TabsContent>

        <TabsContent value="section" className="space-y-6">
          {/* Section Filters */}
          {isAdmin && !sectionId && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Select Class & Section</CardTitle>
                <CardDescription>Choose a class and section to view their timetable</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClasses.map(cls => (
                      <SelectItem key={cls.id} value={cls.id.toString()}>
                        {cls.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedSection} onValueChange={setSelectedSection}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockSections
                      .filter(s => !selectedClass || s.classId === parseInt(selectedClass))
                      .map(section => (
                        <SelectItem key={section.id} value={section.name}>
                          {section.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          )}

          {/* Section Timetable */}
          <SectionTimetableTable 
            timetables={getFilteredSectionTimetables()}
            isAdmin={isAdmin}
            onEdit={(timetable) => handleEditTimetable(timetable, 'section')}
            onDelete={(id) => handleDeleteTimetable(id, 'section')}
          />
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <TimetableEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        timetable={editingTimetable}
        type={editType}
        onSave={(data) => {
          console.log('Save timetable:', data);
          setEditDialogOpen(false);
        }}
      />
    </div>
  );
};

export default TimetablePage;