import React, { createContext, useContext, useState, useEffect } from 'react';

// Mock student data with generated passwords
const mockStudents = [
  {
    id: 1001,
    firstName: "Arjun",
    lastName: "Sharma",
    phoneNumber: "9876543210",
    dateOfBirth: new Date("2005-03-15"),
    rollNumber: "2021001",
    classId: 10,
    section: "A",
    address: "123 Main Street, Delhi",
    profilePhoto: null
  },
  {
    id: 1002,
    firstName: "Priya",
    lastName: "Patel",
    phoneNumber: "9876543211",
    dateOfBirth: new Date("2006-07-22"),
    rollNumber: "2021002",
    classId: 9,
    section: "B",
    address: "456 Park Avenue, Mumbai",
    profilePhoto: null
  },
  {
    id: 1003,
    firstName: "Rahul",
    lastName: "Kumar",
    phoneNumber: "9876543212",
    dateOfBirth: new Date("2005-11-08"),
    rollNumber: "2021003",
    classId: 10,
    section: "A",
    address: "789 Oak Street, Bangalore",
    profilePhoto: null
  }
];

// Function to generate student password based on design spec
const generateStudentPassword = (firstName: string, birthYear: number): string => {
  const namePrefix = firstName.slice(0, 4); // First 4 characters
  const specialChars = "@#";
  return `${namePrefix}${specialChars}${birthYear}`;
};

const users = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "teacher1", password: "teach123", role: "teacher" },
];

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

interface User {
  username?: string;
  phoneNumber?: string;
  role: string;
  studentId?: number;
  studentProfile?: StudentProfile;
}

interface AuthContextType {
  user: User | null;
  login: (usernameOrPhone: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('attendanceUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (usernameOrPhone: string, password: string): boolean => {
    // Check for admin/teacher login
    const foundUser = users.find(u => u.username === usernameOrPhone && u.password === password);
    if (foundUser) {
      const userData = { username: foundUser.username, role: foundUser.role };
      setUser(userData);
      localStorage.setItem('attendanceUser', JSON.stringify(userData));
      return true;
    }

    // Check for student login using phone number
    const foundStudent = mockStudents.find(student => student.phoneNumber === usernameOrPhone);
    if (foundStudent) {
      const birthYear = foundStudent.dateOfBirth.getFullYear();
      const expectedPassword = generateStudentPassword(foundStudent.firstName, birthYear);
      
      if (password === expectedPassword) {
        const userData = {
          phoneNumber: foundStudent.phoneNumber,
          role: "student",
          studentId: foundStudent.id,
          studentProfile: foundStudent
        };
        setUser(userData);
        localStorage.setItem('attendanceUser', JSON.stringify(userData));
        return true;
      }
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('attendanceUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export mock data for use in components
export { mockStudents };