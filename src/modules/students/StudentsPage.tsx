import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Users, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

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

const initialStudents: Student[] = [
  { id: 1, name: "Arjun Sharma", rollNo: 1, classId: 1, section: "A" },
  { id: 2, name: "Priya Verma", rollNo: 2, classId: 1, section: "A" },
  { id: 3, name: "Ravi Singh", rollNo: 1, classId: 2, section: "A" },
];

const classes: ClassData[] = [
  { id: 1, name: "Class 10", sections: ["A", "B"] },
  { id: 2, name: "Class 9", sections: ["A"] },
];

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(initialStudents);
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    classId: '',
    section: ''
  });

  // Filter students based on class and section
  const filterStudents = (classFilter: string, sectionFilter: string) => {
    let filtered = students;
    
    if (classFilter !== 'all') {
      filtered = filtered.filter(student => student.classId === parseInt(classFilter));
    }
    
    if (sectionFilter !== 'all') {
      filtered = filtered.filter(student => student.section === sectionFilter);
    }
    
    setFilteredStudents(filtered);
  };

  const handleClassChange = (value: string) => {
    setSelectedClass(value);
    setSelectedSection('all'); // Reset section filter when class changes
    filterStudents(value, 'all');
  };

  const handleSectionChange = (value: string) => {
    setSelectedSection(value);
    filterStudents(selectedClass, value);
  };

  const resetForm = () => {
    setFormData({ name: '', rollNo: '', classId: '', section: '' });
    setEditingStudent(null);
  };

  const handleAddStudent = () => {
    if (!formData.name || !formData.rollNo || !formData.classId || !formData.section) {
      toast.error('Please fill all fields');
      return;
    }

    const newStudent: Student = {
      id: Date.now(),
      name: formData.name,
      rollNo: parseInt(formData.rollNo),
      classId: parseInt(formData.classId),
      section: formData.section
    };

    setStudents([...students, newStudent]);
    filterStudents(selectedClass, selectedSection);
    resetForm();
    setIsAddingStudent(false);
    toast.success('Student added successfully');
  };

  const handleEditStudent = () => {
    if (!editingStudent || !formData.name || !formData.rollNo || !formData.classId || !formData.section) {
      toast.error('Please fill all fields');
      return;
    }

    const updatedStudent: Student = {
      ...editingStudent,
      name: formData.name,
      rollNo: parseInt(formData.rollNo),
      classId: parseInt(formData.classId),
      section: formData.section
    };

    setStudents(students.map(student => 
      student.id === editingStudent.id ? updatedStudent : student
    ));
    filterStudents(selectedClass, selectedSection);
    resetForm();
    toast.success('Student updated successfully');
  };

  const handleDeleteStudent = (studentId: number) => {
    const studentName = students.find(s => s.id === studentId)?.name;
    setStudents(students.filter(student => student.id !== studentId));
    filterStudents(selectedClass, selectedSection);
    toast.success(`Student "${studentName}" deleted successfully`);
  };

  const startEditStudent = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      rollNo: student.rollNo.toString(),
      classId: student.classId.toString(),
      section: student.section
    });
  };

  const getClassName = (classId: number) => {
    return classes.find(cls => cls.id === classId)?.name || 'Unknown';
  };

  const getAvailableSections = () => {
    if (!formData.classId) return [];
    const selectedClassData = classes.find(cls => cls.id === parseInt(formData.classId));
    return selectedClassData?.sections || [];
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Student Management</span>
              </CardTitle>
              <CardDescription>Manage students by class and section</CardDescription>
            </div>
            <Dialog open={isAddingStudent} onOpenChange={setIsAddingStudent}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                  <DialogDescription>Enter student details</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="studentName">Student Name</Label>
                    <Input
                      id="studentName"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter student name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rollNo">Roll Number</Label>
                    <Input
                      id="rollNo"
                      type="number"
                      value={formData.rollNo}
                      onChange={(e) => setFormData({...formData, rollNo: e.target.value})}
                      placeholder="Enter roll number"
                    />
                  </div>
                  <div>
                    <Label>Class</Label>
                    <Select value={formData.classId} onValueChange={(value) => setFormData({...formData, classId: value, section: ''})}>
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
                    <Select value={formData.section} onValueChange={(value) => setFormData({...formData, section: value})} disabled={!formData.classId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableSections().map(section => (
                          <SelectItem key={section} value={section}>
                            Section {section}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => {resetForm(); setIsAddingStudent(false);}}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddStudent}>Add Student</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex space-x-4 mb-6">
            <div className="flex-1">
              <Label>Filter by Class</Label>
              <Select value={selectedClass} onValueChange={handleClassChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {classes.map(cls => (
                    <SelectItem key={cls.id} value={cls.id.toString()}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label>Filter by Section</Label>
              <Select value={selectedSection} onValueChange={handleSectionChange} disabled={selectedClass === 'all'}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sections</SelectItem>
                  {selectedClass !== 'all' && 
                    classes.find(cls => cls.id === parseInt(selectedClass))?.sections.map(section => (
                      <SelectItem key={section} value={section}>
                        Section {section}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Students Table */}
          {filteredStudents.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No students found for the selected filters.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Roll No</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.rollNo}</TableCell>
                    <TableCell>{getClassName(student.classId)}</TableCell>
                    <TableCell>Section {student.section}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => startEditStudent(student)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Student</DialogTitle>
                              <DialogDescription>Update student details</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="editStudentName">Student Name</Label>
                                <Input
                                  id="editStudentName"
                                  value={formData.name}
                                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                              </div>
                              <div>
                                <Label htmlFor="editRollNo">Roll Number</Label>
                                <Input
                                  id="editRollNo"
                                  type="number"
                                  value={formData.rollNo}
                                  onChange={(e) => setFormData({...formData, rollNo: e.target.value})}
                                />
                              </div>
                              <div>
                                <Label>Class</Label>
                                <Select value={formData.classId} onValueChange={(value) => setFormData({...formData, classId: value, section: ''})}>
                                  <SelectTrigger>
                                    <SelectValue />
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
                                <Select value={formData.section} onValueChange={(value) => setFormData({...formData, section: value})}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {getAvailableSections().map(section => (
                                      <SelectItem key={section} value={section}>
                                        Section {section}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" onClick={resetForm}>
                                  Cancel
                                </Button>
                                <Button onClick={handleEditStudent}>Update Student</Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentsPage;