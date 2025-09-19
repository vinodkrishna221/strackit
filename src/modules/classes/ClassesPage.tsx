import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Plus, BookOpen, Users } from 'lucide-react';
import { toast } from 'sonner';

interface ClassData {
  id: number;
  name: string;
  sections: string[];
}

const initialClasses: ClassData[] = [
  { id: 1, name: "Class 10", sections: ["A", "B"] },
  { id: 2, name: "Class 9", sections: ["A"] },
];

const ClassesPage = () => {
  const [classes, setClasses] = useState<ClassData[]>(initialClasses);
  const [newClassName, setNewClassName] = useState('');
  const [newSectionName, setNewSectionName] = useState('');
  const [selectedClassForSection, setSelectedClassForSection] = useState<number | null>(null);
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [isAddingSection, setIsAddingSection] = useState(false);

  const handleAddClass = () => {
    if (!newClassName.trim()) return;
    
    const newClass: ClassData = {
      id: Date.now(),
      name: newClassName.trim(),
      sections: []
    };
    
    setClasses([...classes, newClass]);
    setNewClassName('');
    setIsAddingClass(false);
    toast.success(`Class "${newClass.name}" added successfully`);
  };

  const handleAddSection = () => {
    if (!newSectionName.trim() || !selectedClassForSection) return;
    
    setClasses(classes.map(cls => 
      cls.id === selectedClassForSection 
        ? { ...cls, sections: [...cls.sections, newSectionName.trim()] }
        : cls
    ));
    
    const className = classes.find(cls => cls.id === selectedClassForSection)?.name;
    setNewSectionName('');
    setSelectedClassForSection(null);
    setIsAddingSection(false);
    toast.success(`Section "${newSectionName}" added to ${className}`);
  };

  const handleDeleteClass = (classId: number) => {
    const className = classes.find(cls => cls.id === classId)?.name;
    setClasses(classes.filter(cls => cls.id !== classId));
    toast.success(`Class "${className}" deleted successfully`);
  };

  const handleDeleteSection = (classId: number, sectionToDelete: string) => {
    setClasses(classes.map(cls => 
      cls.id === classId 
        ? { ...cls, sections: cls.sections.filter(section => section !== sectionToDelete) }
        : cls
    ));
    const className = classes.find(cls => cls.id === classId)?.name;
    toast.success(`Section "${sectionToDelete}" removed from ${className}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Class Management</span>
              </CardTitle>
              <CardDescription>Manage classes and their sections</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Dialog open={isAddingClass} onOpenChange={setIsAddingClass}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Class
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Class</DialogTitle>
                    <DialogDescription>Create a new class for your school</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="className">Class Name</Label>
                      <Input
                        id="className"
                        value={newClassName}
                        onChange={(e) => setNewClassName(e.target.value)}
                        placeholder="e.g., Class 11"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsAddingClass(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddClass}>Add Class</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={isAddingSection} onOpenChange={setIsAddingSection}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Section
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Section</DialogTitle>
                    <DialogDescription>Add a section to an existing class</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Select Class</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {classes.map(cls => (
                          <Button
                            key={cls.id}
                            variant={selectedClassForSection === cls.id ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedClassForSection(cls.id)}
                          >
                            {cls.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="sectionName">Section Name</Label>
                      <Input
                        id="sectionName"
                        value={newSectionName}
                        onChange={(e) => setNewSectionName(e.target.value)}
                        placeholder="e.g., A, B, C"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsAddingSection(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddSection} disabled={!selectedClassForSection}>
                        Add Section
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {classes.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No classes found. Add your first class to get started.</p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {classes.map((cls) => (
                <AccordionItem key={cls.id} value={`class-${cls.id}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center space-x-3">
                        <BookOpen className="w-4 h-4" />
                        <span className="font-medium">{cls.name}</span>
                        <span className="text-sm text-muted-foreground">
                          ({cls.sections.length} section{cls.sections.length !== 1 ? 's' : ''})
                        </span>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClass(cls.id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pt-4 space-y-3">
                      {cls.sections.length === 0 ? (
                        <p className="text-sm text-muted-foreground pl-7">
                          No sections added yet. Use the "Add Section" button above.
                        </p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pl-7">
                          {cls.sections.map((section, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                              <div className="flex items-center space-x-2">
                                <Users className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium">Section {section}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteSection(cls.id, section)}
                                className="text-destructive hover:text-destructive"
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClassesPage;