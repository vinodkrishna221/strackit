import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import type { DailyStatistics } from '@/data/mockData';

interface DailyStatsCardProps {
  dailyStats: DailyStatistics;
}

const DailyStatsCard = ({ dailyStats }: DailyStatsCardProps) => {
  const {
    classesAttendedToday,
    totalClassesToday,
    overallPercentage,
    timeSpentOutside,
    todayStatus
  } = dailyStats;

  const getStatusIcon = () => {
    switch (todayStatus) {
      case 'Present':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Partial':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'Absent':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = () => {
    switch (todayStatus) {
      case 'Present':
        return 'bg-green-100 text-green-800';
      case 'Partial':
        return 'bg-yellow-100 text-yellow-800';
      case 'Absent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const todayAttendancePercentage = totalClassesToday > 0 
    ? (classesAttendedToday / totalClassesToday) * 100 
    : 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5" />
          <span>Daily Statistics</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Today's Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <span className="text-sm font-medium">Today's Status</span>
          </div>
          <Badge className={getStatusColor()}>
            {todayStatus}
          </Badge>
        </div>

        {/* Classes Attended Today */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Classes Today</span>
            <span className="text-sm font-semibold">
              {classesAttendedToday} out of {totalClassesToday}
            </span>
          </div>
          <Progress 
            value={todayAttendancePercentage} 
            className="h-2"
          />
          <p className="text-xs text-gray-600 text-center">
            {Math.round(todayAttendancePercentage)}% attendance today
          </p>
        </div>

        {/* Overall Attendance */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Overall Attendance</span>
            <span className={`text-sm font-bold ${getPercentageColor(overallPercentage)}`}>
              {overallPercentage}%
            </span>
          </div>
          <Progress 
            value={overallPercentage} 
            className="h-2"
          />
          <p className="text-xs text-gray-600 text-center">
            {overallPercentage >= 75 ? 'Meeting attendance requirement' : 'Below minimum requirement (75%)'}
          </p>
        </div>

        {/* Time Spent Outside */}
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Time Outside Classroom</span>
          </div>
          <span className="text-sm font-semibold text-blue-800">{timeSpentOutside}</span>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">This Week</p>
            <p className="text-lg font-bold text-gray-900">4/5</p>
            <p className="text-xs text-gray-600">Days Present</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">This Month</p>
            <p className="text-lg font-bold text-gray-900">18/20</p>
            <p className="text-xs text-gray-600">Days Present</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyStatsCard;
