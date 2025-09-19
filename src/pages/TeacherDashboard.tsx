import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Users, Calendar, BookOpen } from 'lucide-react';

const TeacherDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card shadow-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Teacher Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user?.username}</p>
              </div>
            </div>
            <Button variant="outline" onClick={logout} size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Management</CardTitle>
              <CardDescription>
                This is a placeholder for the Attendance Register (Phase 1 Module 4)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40 border-2 border-dashed border-muted rounded-lg">
                <div className="text-center space-y-4">
                  <Calendar className="w-12 h-12 mx-auto text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Attendance Register Coming Soon</h3>
                    <p className="text-sm text-muted-foreground">
                      Phase 1 Module 4 will include daily attendance marking and management
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>My Classes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Class 10 - Section A</p>
                  <p className="text-sm text-muted-foreground">25 Students</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Today's Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Attendance not yet marked</p>
                  <p className="text-sm text-muted-foreground">Feature coming in next phase</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;