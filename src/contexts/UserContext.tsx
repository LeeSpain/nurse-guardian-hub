
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

// User roles
export enum UserRole {
  GUEST = 'GUEST',
  NURSE = 'NURSE',
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN'
}

// User interface
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  specialties?: string[];
  verified?: boolean;
}

// Auth context interface
interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock user data (replace with actual API calls when connected to backend)
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'nurse@example.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: UserRole.NURSE,
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    specialties: ['Home Care', 'Elderly Care', 'Wound Care'],
    verified: true
  },
  {
    id: '2',
    email: 'client@example.com',
    firstName: 'James',
    lastName: 'Wilson',
    role: UserRole.CLIENT,
    avatar: 'https://randomuser.me/api/portraits/men/29.jpg'
  }
];

// Provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for stored token in localStorage
        const token = localStorage.getItem('authToken');
        
        if (token) {
          // In a real app, validate token with backend
          // For demo, just get user from localStorage if exists
          const storedUser = localStorage.getItem('user');
          
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (error) {
        console.error('Authentication error:', error);
        // Clear any invalid auth data
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Mock login function (replace with real API call)
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find matching user by email (case insensitive)
      const matchedUser = MOCK_USERS.find(u => 
        u.email.toLowerCase() === email.toLowerCase()
      );
      
      if (matchedUser) {
        // In a real app, validate password with backend
        // For demo, any password works
        
        // Store auth token in localStorage
        localStorage.setItem('authToken', 'mock-jwt-token');
        localStorage.setItem('user', JSON.stringify(matchedUser));
        
        setUser(matchedUser);
        
        // Redirect based on user role
        if (matchedUser.role === UserRole.NURSE) {
          navigate('/nurse');
        } else if (matchedUser.role === UserRole.CLIENT) {
          navigate('/client/home');
        }
        
        toast.success(`Welcome back, ${matchedUser.firstName}!`);
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Mock registration function (replace with real API call)
  const register = async (userData: Partial<User> & { password: string }): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if email already exists
      const emailExists = MOCK_USERS.some(u => 
        u.email.toLowerCase() === userData.email?.toLowerCase()
      );
      
      if (emailExists) {
        toast.error('Email already in use. Please try another.');
        return;
      }
      
      // Create new user (in a real app, this would be done server-side)
      const newUser: User = {
        id: `mock-${Date.now()}`,
        email: userData.email || '',
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        role: userData.role || UserRole.CLIENT,
        avatar: userData.avatar,
        verified: false
      };
      
      // Store auth data
      localStorage.setItem('authToken', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify(newUser));
      
      setUser(newUser);
      
      // Redirect based on user role
      if (newUser.role === UserRole.NURSE) {
        navigate('/nurse');
      } else if (newUser.role === UserRole.CLIENT) {
        navigate('/client/home');
      }
      
      toast.success('Account created successfully!');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    toast.success('Logged out successfully');
  };

  // Update user function
  const updateUser = async (userData: Partial<User>): Promise<void> => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update user data
      const updatedUser = { ...user, ...userData };
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setUser(updatedUser);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Update user error:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using user context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
};

// Auth guard component
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles 
}) => {
  const { user, isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login', { state: { from: location } });
    } else if (!isLoading && isAuthenticated && allowedRoles) {
      // Check if user has required role
      const hasRole = user && allowedRoles.includes(user.role);
      
      if (!hasRole) {
        toast.error('You do not have permission to access this page');
        
        // Redirect based on user role
        if (user?.role === UserRole.NURSE) {
          navigate('/nurse');
        } else if (user?.role === UserRole.CLIENT) {
          navigate('/client/home');
        } else {
          navigate('/');
        }
      }
    }
  }, [isLoading, isAuthenticated, user, allowedRoles, navigate, location]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-purple-600 border-r-transparent border-b-purple-600 border-l-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Check role if specified
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};
