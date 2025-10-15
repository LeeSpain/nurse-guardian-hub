import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, Bell } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { cn } from '@/lib/utils';
import Logo from '@/components/ui-components/Logo';
import Button from '@/components/ui-components/Button';

const NurseDashboardHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, logout, subscription } = useUser();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isActivePath = (path: string) => location.pathname === path;
  
  const navLinks = [
    { path: '/nurse/dashboard', label: 'Dashboard' },
    { path: '/nurse/dashboard/calendar', label: 'Calendar' },
    { path: '/nurse/dashboard/staff', label: 'Staff' },
    { path: '/nurse/dashboard/shifts', label: 'Shifts' },
    { path: '/nurse/dashboard/care-plans', label: 'Care Plans' },
    { path: '/nurse/dashboard/care-logs', label: 'Care Logs' },
    { path: '/nurse/dashboard/analytics', label: 'Analytics' },
    { path: '/nurse/dashboard/reports', label: 'Reports' },
    { path: '/nurse/dashboard/settings', label: 'Settings' },
  ];
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300",
      scrolled 
        ? "bg-white/95 shadow-md border-purple-100" 
        : "bg-white/90 shadow-sm border-purple-50"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/nurse/dashboard" className="flex items-center gap-2">
            <Logo size="small" />
            <span className="font-semibold text-gray-900 hidden sm:inline">Dashboard</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActivePath(link.path)
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* User Greeting */}
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {user?.firstName || 'Healthcare Professional'}
              </p>
              {subscription && (
                <p className="text-xs text-purple-600">
                  {subscription.subscription_tier} Plan
                </p>
              )}
            </div>
            
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            {/* Logout Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              icon={<LogOut size={16} />}
              className="border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              Logout
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-purple-600 hover:bg-purple-50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-purple-100 bg-white">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {/* User Info */}
            <div className="px-4 py-3 bg-purple-50 rounded-lg mb-4">
              <p className="font-medium text-gray-900">
                {user?.firstName || 'Healthcare Professional'}
              </p>
              <p className="text-sm text-gray-600">{user?.email}</p>
              {subscription && (
                <p className="text-xs text-purple-600 mt-1">
                  {subscription.subscription_tier} Plan
                </p>
              )}
            </div>
            
            {/* Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActivePath(link.path)
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-700 hover:bg-purple-50"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Logout */}
            <button
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default NurseDashboardHeader;
