
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/navigation/Header';
import Footer from '../components/layout/Footer';
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Button from '../components/ui-components/Button';
import { useUser, UserRole } from '../contexts/UserContext';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const { user, login, register, isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState<'client' | 'nurse'>('client');
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on role
      if (user.role === UserRole.NURSE) {
        navigate('/nurse/dashboard');
      } else if (user.role === UserRole.CLIENT) {
        navigate('/client/dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);
  
  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(loginEmail, loginPassword);
      // Navigation handled by the useEffect above
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // Handle registration form submission
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (regPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    // Validate password strength (simple check)
    if (regPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }
    
    try {
      await register({
        email: regEmail,
        firstName,
        lastName,
        password: regPassword,
        role: accountType === 'nurse' ? UserRole.NURSE : UserRole.CLIENT
      });
      
      // Redirect is handled by useEffect when authentication state changes
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 bg-gray-50">
        <div className="w-full max-w-md mx-4">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Welcome to NurseSync</h1>
                <p className="text-gray-600 mt-2">Sign in or create an account to get started</p>
              </div>
              
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your@email.com" 
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link to="/forgot-password" className="text-xs text-purple-600 hover:text-purple-800">
                          Forgot Password?
                        </Link>
                      </div>
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="••••••••" 
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required 
                      />
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        type="submit"
                        variant="primary"
                        fullWidth
                        isLoading={isLoading}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                      </Button>
                    </div>
                    
                    <div className="text-center text-sm text-gray-500 mt-4">
                      <p>Demo login credentials:</p>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                        <div className="border border-gray-200 rounded p-2">
                          <p className="font-semibold mb-1">Nurse Account</p>
                          <p>Email: nurse@example.com</p>
                          <p>Any password works</p>
                        </div>
                        <div className="border border-gray-200 rounded p-2">
                          <p className="font-semibold mb-1">Client Account</p>
                          <p>Email: client@example.com</p>
                          <p>Any password works</p>
                        </div>
                      </div>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-4">
                      <Label>I am a:</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            accountType === 'nurse' 
                              ? 'border-purple-500 bg-purple-50' 
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                          onClick={() => setAccountType('nurse')}
                        >
                          <div className="text-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-purple-600">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <p className="font-medium">Healthcare Professional</p>
                          </div>
                        </div>
                        
                        <div
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            accountType === 'client' 
                              ? 'border-client border-2 bg-client-muted/10' 
                              : 'border-gray-200 hover:border-client/30'
                          }`}
                          onClick={() => setAccountType('client')}
                        >
                          <div className="text-center">
                            <div className="w-12 h-12 bg-client-muted/20 rounded-full flex items-center justify-center mx-auto mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-client">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                            </div>
                            <p className="font-medium">Care Seeker</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          type="text"
                          placeholder="John" 
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          type="text"
                          placeholder="Doe" 
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="regEmail">Email</Label>
                      <Input 
                        id="regEmail" 
                        type="email" 
                        placeholder="your@email.com" 
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="regPassword">Password</Label>
                      <Input 
                        id="regPassword" 
                        type="password" 
                        placeholder="••••••••" 
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password" 
                        placeholder="••••••••" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required 
                      />
                    </div>

                    {accountType === 'nurse' && (
                      <div className="p-4 border border-purple-100 bg-purple-50 rounded-lg">
                        <p className="text-purple-700 text-sm font-medium">
                          Healthcare Professional Access
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          After registration, you'll need to subscribe to a plan to access the full healthcare professional dashboard.
                        </p>
                      </div>
                    )}
                    
                    <div className="pt-2">
                      <Button 
                        type="submit"
                        variant={accountType === 'nurse' ? 'nurse' : 'client'}
                        fullWidth
                        isLoading={isLoading}
                      >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                      </Button>
                    </div>
                    
                    <div className="text-xs text-gray-500 mt-4">
                      By creating an account, you agree to our{' '}
                      <Link to="/terms" className="text-purple-600 hover:text-purple-800">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-purple-600 hover:text-purple-800">
                        Privacy Policy
                      </Link>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
