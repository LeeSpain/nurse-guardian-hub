
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Bell, Search, ChevronDown, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '../ui-components/Logo';
import Button from '../ui-components/Button';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const isActivePath = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <Logo />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="space-x-1">
                <NavigationMenuItem>
                  <Link 
                    to="/"
                    className={cn(
                      "text-gray-600 hover:text-gray-900 px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md hover:bg-gray-50",
                      isActivePath('/') && "text-purple-700 bg-purple-50"
                    )}
                  >
                    Home
                  </Link>
                </NavigationMenuItem>

                {/* Features Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "text-gray-600 hover:text-gray-900 px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md hover:bg-gray-50",
                      isActivePath('/features') && "text-purple-700 bg-purple-50"
                    )}
                  >
                    Features
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] p-4">
                      <div className="grid grid-cols-1 gap-3">
                        <Link 
                          to="/features/nurse"
                          className="flex p-3 rounded-md hover:bg-purple-50 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                            <User className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">For Healthcare Professionals</h4>
                            <p className="text-xs text-gray-500 mt-0.5">Advanced tools for managing remote care</p>
                          </div>
                        </Link>
                        <Link 
                          to="/features/client"
                          className="flex p-3 rounded-md hover:bg-client-muted/20 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-full bg-client-muted/20 flex items-center justify-center mr-3">
                            <Users className="h-4 w-4 text-client" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">For Clients & Families</h4>
                            <p className="text-xs text-gray-500 mt-0.5">Stay connected with your care providers</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Pricing Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "text-gray-600 hover:text-gray-900 px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md hover:bg-gray-50",
                      isActivePath('/pricing') && "text-purple-700 bg-purple-50"
                    )}
                  >
                    Pricing
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] p-4">
                      <div className="grid grid-cols-1 gap-3">
                        <Link 
                          to="/pricing/nurse"
                          className="flex p-3 rounded-md hover:bg-purple-50 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                            <User className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Nurse Pricing</h4>
                            <p className="text-xs text-gray-500 mt-0.5">Plans for healthcare providers</p>
                          </div>
                        </Link>
                        <Link 
                          to="/pricing/client"
                          className="flex p-3 rounded-md hover:bg-client-muted/20 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-full bg-client-muted/20 flex items-center justify-center mr-3">
                            <Users className="h-4 w-4 text-client" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Client Pricing</h4>
                            <p className="text-xs text-gray-500 mt-0.5">Plans for care recipients & families</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link 
                    to="/testimonials"
                    className={cn(
                      "text-gray-600 hover:text-gray-900 px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md hover:bg-gray-50",
                      isActivePath('/testimonials') && "text-purple-700 bg-purple-50"
                    )}
                  >
                    Testimonials
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link 
                    to="/contact"
                    className={cn(
                      "text-gray-600 hover:text-gray-900 px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md hover:bg-gray-50",
                      isActivePath('/contact') && "text-purple-700 bg-purple-50"
                    )}
                  >
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <button className="text-gray-500 hover:text-gray-700 transition-colors bg-gray-100 p-2 rounded-full">
                <Search size={18} />
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="primary" 
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                icon={<User size={16} />}
              >
                Nurse Portal
              </Button>
              <Button 
                variant="client" 
                size="sm"
                className="rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Client Login
              </Button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "md:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-md transition-transform duration-300 ease-apple transform",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="relative h-full">
          <button
            className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 text-gray-400 hover:text-gray-500"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={24} />
          </button>
          
          <div className="pt-24 pb-6 px-6 space-y-6">
            <Link
              to="/"
              className={cn(
                "block text-gray-600 hover:text-gray-900 px-3 py-3 text-lg font-medium border-b border-gray-100",
                isActivePath('/') && "text-purple-700"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            <div>
              <div className="flex items-center justify-between px-3 py-3 text-lg font-medium text-gray-600 border-b border-gray-100">
                Features
                <ChevronDown size={18} />
              </div>
              <div className="pt-2 pl-5">
                <Link
                  to="/features/nurse"
                  className="block text-gray-600 hover:text-gray-900 px-3 py-2 text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  For Healthcare Professionals
                </Link>
                <Link
                  to="/features/client"
                  className="block text-gray-600 hover:text-gray-900 px-3 py-2 text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  For Clients & Families
                </Link>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between px-3 py-3 text-lg font-medium text-gray-600 border-b border-gray-100">
                Pricing
                <ChevronDown size={18} />
              </div>
              <div className="pt-2 pl-5">
                <Link
                  to="/pricing/nurse"
                  className="block text-gray-600 hover:text-gray-900 px-3 py-2 text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Nurse Pricing
                </Link>
                <Link
                  to="/pricing/client"
                  className="block text-gray-600 hover:text-gray-900 px-3 py-2 text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Client Pricing
                </Link>
              </div>
            </div>
            
            <Link
              to="/testimonials"
              className={cn(
                "block text-gray-600 hover:text-gray-900 px-3 py-3 text-lg font-medium border-b border-gray-100",
                isActivePath('/testimonials') && "text-purple-700"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>

            <Link
              to="/contact"
              className={cn(
                "block text-gray-600 hover:text-gray-900 px-3 py-3 text-lg font-medium border-b border-gray-100",
                isActivePath('/contact') && "text-purple-700"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            
            <div className="pt-6 space-y-4">
              <Button 
                variant="primary" 
                size="md"
                fullWidth
                icon={<User size={18} />}
                className="bg-purple-600 hover:bg-purple-700 text-white shadow-md"
              >
                Nurse Portal
              </Button>
              <Button 
                variant="client" 
                size="md"
                fullWidth
                className="shadow-md"
              >
                Client Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
