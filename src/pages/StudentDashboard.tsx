import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, User, Calendar, BookOpen, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { useState } from 'react';
import StudentProfileCard from './components/StudentProfileCard';
import DailyStatsCard from './components/DailyStatsCard';
import AttendanceRegisterTable from './components/AttendanceRegisterTable';
import TimetablePage from '@/modules/timetable/TimetablePage';
import { getStudentAttendanceData, calculateDailyStats } from '@/data/mockData';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('attendance');

  // Redirect if not a student
  if (!user || user.role !== 'student' || !user.studentProfile) {
    navigate('/login');
    return null;
  }

  const { studentProfile } = user;
  const attendanceData = getStudentAttendanceData(studentProfile.id);
  const dailyStats = calculateDailyStats(attendanceData);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold text-gray-900">
                  Welcome, {studentProfile.firstName} {studentProfile.lastName}
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(), 'EEEE, MMMM d, yyyy')}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="attendance" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Attendance</span>
            </TabsTrigger>
            <TabsTrigger value="timetable" className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>My Timetable</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="attendance">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Profile and Stats */}
              <div className="lg:col-span-1 space-y-6">
                <StudentProfileCard studentProfile={studentProfile} />
                <DailyStatsCard dailyStats={dailyStats} />
              </div>

              {/* Right Column - Attendance Register */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5" />
                      <span>Attendance Register</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AttendanceRegisterTable attendanceData={attendanceData} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="timetable">
            <TimetablePage sectionId={1} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default StudentDashboard;