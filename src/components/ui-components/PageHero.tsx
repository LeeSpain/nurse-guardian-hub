
import React, { ReactNode } from 'react';

interface PageHeroProps {
  title: string;
  subtitle: string;
  badge?: string;
  badgeColor?: 'purple' | 'client' | 'default';
  children?: ReactNode;
  image?: string;
  imageAlt?: string;
}

const PageHero: React.FC<PageHeroProps> = ({ 
  title, 
  subtitle, 
  badge, 
  badgeColor = 'default',
  children,
  image,
  imageAlt = 'Hero image'
}) => {
  // Determine badge styling based on badgeColor
  const getBadgeClasses = () => {
    switch(badgeColor) {
      case 'purple':
        return 'bg-purple-100 text-purple-700';
      case 'client':
        return 'bg-client-muted text-client';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <section className="pt-20 pb-8 md:pt-24 md:pb-16 px-4 md:px-10 overflow-hidden relative bg-gradient-to-br from-[#EFF6FF] via-[#F0FDFA] to-[#ECFDF5]">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>
      
      <div className="max-w-6xl mx-auto">
        <div className="md:grid md:grid-cols-2 gap-10 items-center">
          <div>
            {badge && (
              <div className={`inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-medium ${getBadgeClasses()}`}>
                {badge}
              </div>
            )}
            <h1 className="text-3xl md:text-5xl font-bold mb-6">{title}</h1>
            <p className="text-lg text-gray-600 mb-8">{subtitle}</p>
            
            {children}
          </div>
          
          {image && (
            <div className="hidden md:block">
              <div className="aspect-video rounded-2xl overflow-hidden border border-[#10B981]/20 shadow-xl transform hover:-translate-y-2 transition-all duration-300">
                <img 
                  src={image} 
                  alt={imageAlt} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width="800"
                  height="450"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
