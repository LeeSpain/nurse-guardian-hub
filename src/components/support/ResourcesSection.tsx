
import React from 'react';
import { Link as LinkIcon, LucideIcon } from 'lucide-react';

interface ResourceItem {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
}

interface ResourcesSectionProps {
  resources: ResourceItem[];
}

const ResourcesSection: React.FC<ResourcesSectionProps> = ({ resources }) => {
  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-client-muted/20 text-client mb-4">
          <LinkIcon size={24} />
        </div>
        <h2 className="text-3xl font-bold">Helpful Resources</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((resource, index) => {
          const IconComponent = resource.icon;
          return (
            <a 
              key={index} 
              href={resource.link} 
              className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all hover:border-client-muted group"
            >
              <IconComponent size={24} className="text-client mb-4" />
              <h3 className="text-lg font-semibold mb-2 group-hover:text-client transition-colors">{resource.title}</h3>
              <p className="text-gray-600">{resource.description}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ResourcesSection;
