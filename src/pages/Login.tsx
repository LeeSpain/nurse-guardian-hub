
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import Header from '../components/navigation/Header';
import NurseHeader from '../components/navigation/NurseHeader';
import ClientHeader from '../components/navigation/ClientHeader';
import Footer from '../components/layout/Footer';
import { 
  Input
} from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Button from '../components/ui-components/Button';
import { useUser, UserRole } from '../contexts/UserContext';
import { toast } from 'sonner';
import VideoOverlay from '../components/video/VideoOverlay';
import { Link as RouterLink } from 'react-router-dom';

const Login: React.FC = () => {
  const { user, login, isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const serviceType = searchParams.get('service');
  const [showTutorial, setShowTutorial] = useState(false);
  
  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
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

  // Set default tab based on the URL parameter
  useEffect(() => {
    // If there's a registration_success parameter, show tutorial
    if (searchParams.get('registration_success') === 'true') {
      setShowTutorial(true);
    }
  }, [searchParams]);
  
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

  // Determine which header to display based on service type
  const renderHeader = () => {
    if (serviceType === 'nurse') {
      return <NurseHeader />;
    } else if (serviceType === 'client') {
      return <ClientHeader />;
    } else {
      return <Header />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {renderHeader()}
      <main className="flex-grow flex items-center justify-center py-12 bg-gray-50">
        <div className="w-full max-w-md mx-4">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  {serviceType === 'nurse' 
                    ? 'Professional Healthcare Access' 
                    : serviceType === 'client' 
                      ? 'Care Seeker Portal' 
                      : 'Welcome to NurseSync'}
                </h1>
                <p className="text-gray-600 mt-2">
                  {serviceType === 'nurse' 
                    ? 'Sign in to your professional account' 
                    : serviceType === 'client' 
                      ? 'Access your care portal'
                      : 'Sign in to your account'}
                </p>
              </div>
              
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
                    variant={serviceType === 'client' ? 'client' : 'primary'}
                    fullWidth
                    isLoading={isLoading}
                    className={serviceType === 'client' ? '' : 'bg-purple-600 hover:bg-purple-700'}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </div>
                
                <div className="text-center text-sm text-gray-500 mt-4">
                  <p className="font-medium mb-2">Don't have an account?</p>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <RouterLink 
                      to="/register/nurse"
                      className="border border-purple-200 bg-purple-50 rounded p-3 hover:bg-purple-100 transition-colors"
                    >
                      <p className="font-semibold mb-1 text-purple-700">Sign up as Nurse</p>
                      <p className="text-purple-600">Join as a healthcare professional</p>
                    </RouterLink>
                    <RouterLink 
                      to="/register/client"
                      className="border border-blue-200 bg-blue-50 rounded p-3 hover:bg-blue-100 transition-colors"
                    >
                      <p className="font-semibold mb-1 text-blue-700">Sign up as Client</p>
                      <p className="text-blue-600">Find care for your loved ones</p>
                    </RouterLink>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account yet?{' '}
                    <RouterLink 
                      to={serviceType ? `/pricing?service=${serviceType}` : "/pricing"} 
                      className={`font-medium ${serviceType === 'client' ? 'text-client' : 'text-purple-600'} hover:underline`}
                    >
                      View pricing & plans
                    </RouterLink>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {showTutorial && (
        <VideoOverlay videoId="dQw4w9WgXcQ" onClose={() => setShowTutorial(false)} />
      )}
    </div>
  );
};

export default Login;
