import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { toast } from 'sonner';

// Define user roles
export enum UserRole {
  GUEST = 'guest',
  NURSE = 'nurse',
  CLIENT = 'client',
  ADMIN = 'admin'
}

// User interface
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: Date;
}

// Subscription interface
export interface Subscription {
  subscribed: boolean;
  subscription_tier?: string | null;
  subscription_end?: string | null;
  subscription_status?: string | null;
}

// User context interface
interface UserContextType {
  user: User | null;
  session: Session | null;
  subscription: Subscription | null;
  subscriptionLoading: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (userData: { 
    email: string; 
    password: string; 
    firstName: string; 
    lastName: string; 
    role: UserRole;
    specialties?: string[];
  }) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<{ error?: string }>;
  checkSubscription: () => Promise<void>;
  createCheckout: (planId: string) => Promise<{ error?: string; url?: string }>;
  manageSubscription: () => Promise<{ error?: string; url?: string }>;
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// User provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const isAuthenticated = !!session && !!user;

  // Initialize auth state
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        
        if (session?.user) {
          // Fetch user profile data
          setTimeout(() => {
            fetchUserProfile(session.user);
          }, 0);
        } else {
          setUser(null);
          setSubscription(null);
          setSubscriptionLoading(false);
        }
        
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user);
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch user profile from metadata or database
  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      const metadata = supabaseUser.user_metadata || {};
      
      const userProfile: User = {
        id: supabaseUser.id,
        email: supabaseUser.email!,
        firstName: metadata.firstName || metadata.first_name || '',
        lastName: metadata.lastName || metadata.last_name || '',
        role: metadata.role || UserRole.CLIENT,
        createdAt: new Date(supabaseUser.created_at)
      };
      
      setUser(userProfile);

      // Check subscription status for nurses
      if (userProfile.role === UserRole.NURSE) {
        setSubscriptionLoading(true);
        setTimeout(() => {
          checkSubscription();
        }, 0);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null);
    }
  };

  // Check subscription status
  const checkSubscription = async (): Promise<void> => {
    try {
      if (!session) {
        setSubscriptionLoading(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) {
        console.error('Error checking subscription:', error);
        setSubscription({ subscribed: false });
        return;
      }

      setSubscription(data);
    } catch (error) {
      console.error('Error checking subscription:', error);
      setSubscription({ subscribed: false });
    } finally {
      setSubscriptionLoading(false);
    }
  };

  // Create Stripe checkout session
  const createCheckout = async (planId: string): Promise<{ error?: string; url?: string }> => {
    try {
      if (!session) {
        return { error: 'User not authenticated' };
      }

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planId }
      });

      if (error) {
        return { error: error.message };
      }

      return { url: data.url };
    } catch (error: any) {
      return { error: error.message };
    }
  };

  // Manage subscription via customer portal
  const manageSubscription = async (): Promise<{ error?: string; url?: string }> => {
    try {
      if (!session) {
        return { error: 'User not authenticated' };
      }

      const { data, error } = await supabase.functions.invoke('customer-portal');

      if (error) {
        return { error: error.message };
      }

      return { url: data.url };
    } catch (error: any) {
      return { error: error.message };
    }
  };

  // Login function
  const login = async (email: string, password: string): Promise<{ error?: string }> => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { error: error.message };
      }

      if (data.user) {
        // Success - user state will be updated by onAuthStateChange
        toast.success('Successfully logged in!');
        
        // Navigate based on role
        const role = data.user.user_metadata?.role || UserRole.CLIENT;
        setTimeout(() => {
          if (role === UserRole.NURSE) {
            navigate('/nurse/dashboard');
          } else {
            navigate('/client/dashboard');
          }
        }, 100);
      }

      return {};
    } catch (error: any) {
      return { error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    specialties?: string[];
  }): Promise<{ error?: string }> => {
    try {
      setIsLoading(true);
      const redirectUrl = `${window.location.origin}/`;

      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            first_name: userData.firstName,
            last_name: userData.lastName,
            role: userData.role,
            specialties: userData.specialties
          }
        }
      });

      if (error) {
        return { error: error.message };
      }

      if (data.user) {
        toast.success('Registration successful! Please check your email to verify your account.');
        navigate('/login');
      }

      return {};
    } catch (error: any) {
      return { error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error('Error logging out');
        return;
      }
      
      setUser(null);
      setSession(null);
      setSubscription(null);
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  // Update user function
  const updateUser = async (userData: Partial<User>): Promise<{ error?: string }> => {
    try {
      if (!session?.user) {
        return { error: 'No authenticated user' };
      }

      const { error } = await supabase.auth.updateUser({
        data: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          first_name: userData.firstName,
          last_name: userData.lastName,
          role: userData.role
        }
      });

      if (error) {
        return { error: error.message };
      }

      // Update local user state
      if (user) {
        setUser({ ...user, ...userData });
      }

      toast.success('Profile updated successfully');
      return {};
    } catch (error: any) {
      return { error: error.message };
    }
  };

  const contextValue: UserContextType = {
    user,
    session,
    subscription,
    subscriptionLoading,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    checkSubscription,
    createCheckout,
    manageSubscription
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use user context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Protected route component
interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  redirectTo = '/login'
}) => {
  const { isAuthenticated, user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate(redirectTo);
        return;
      }

      if (requiredRole && user?.role !== requiredRole) {
        // Redirect based on user role
        if (user?.role === UserRole.NURSE) {
          navigate('/nurse/dashboard');
        } else if (user?.role === UserRole.CLIENT) {
          navigate('/client/dashboard');
        } else {
          navigate('/');
        }
      }
    }
  }, [isAuthenticated, user, isLoading, requiredRole, navigate, redirectTo]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
};

