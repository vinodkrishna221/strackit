import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Phone, Calendar, MapPin, Hash } from 'lucide-react';
import { format } from 'date-fns';

interface StudentProfile {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: Date;
  rollNumber: string;
  classId: number;
  section: string;
  address: string;
  profilePhoto: string | null;
}

interface StudentProfileCardProps {
  studentProfile: StudentProfile;
}

const StudentProfileCard = ({ studentProfile }: StudentProfileCardProps) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    dateOfBirth,
    rollNumber,
    classId,
    section,
    address,
    profilePhoto
  } = studentProfile;

  const fullName = `${firstName} ${lastName}`;
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
  const age = new Date().getFullYear() - dateOfBirth.getFullYear();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span>Student Profile</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Photo and Basic Info */}
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profilePhoto || undefined} alt={fullName} />
            <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900">{fullName}</h3>
            <p className="text-sm text-gray-600">Class {classId} - Section {section}</p>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Hash className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Roll Number</p>
              <p className="font-medium">{rollNumber}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Phone Number</p>
              <p className="font-medium">{phoneNumber}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Calendar className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Date of Birth</p>
              <p className="font-medium">
                {format(dateOfBirth, 'MMMM d, yyyy')} ({age} years)
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <MapPin className="h-4 w-4 text-gray-500 mt-1" />
            <div>
              <p className="text-sm text-gray-600">Address</p>
              <p className="font-medium text-sm leading-relaxed">{address}</p>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex justify-center">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Active Student
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentProfileCard;