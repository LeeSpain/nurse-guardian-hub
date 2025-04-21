
import React from 'react';
import { Link } from 'react-router-dom';
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
import { toast } from 'sonner';

const Login: React.FC = () => {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Login functionality will be available soon. Please contact support for early access.", {
      duration: 5000,
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Registration functionality will be available soon. Please contact support for early access.", {
      duration: 5000,
    });
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
                        required 
                      />
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        type="submit"
                        variant="primary"
                        fullWidth
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Sign In
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          type="text"
                          placeholder="John" 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          type="text"
                          placeholder="Doe" 
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
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="regPassword">Password</Label>
                      <Input 
                        id="regPassword" 
                        type="password" 
                        placeholder="••••••••" 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password" 
                        placeholder="••••••••" 
                        required 
                      />
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        type="submit"
                        variant="primary"
                        fullWidth
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Create Account
                      </Button>
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
