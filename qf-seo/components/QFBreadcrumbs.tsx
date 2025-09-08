import React from 'react';
import { Link, useLocation } from 'wouter';
import { ChevronRight, Home } from 'lucide-react';
import { QFBreadcrumbSchema } from './QFSchema';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface QFBreadcrumbsProps {
  customItems?: BreadcrumbItem[];
  className?: string;
}

const QFBreadcrumbs: React.FC<QFBreadcrumbsProps> = ({ 
  customItems, 
  className = "" 
}) => {
  const [location] = useLocation();

  // Generate breadcrumb items from current location
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customItems) return customItems;

    const pathSegments = location.split('/').filter(segment => segment !== '');
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', url: '/' }
    ];

    // Don't show breadcrumbs on homepage
    if (pathSegments.length === 0) return [];

    let currentPath = '';
    
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Convert URL segment to readable name
      let name = segment;
      
      // Handle specific routes
      switch (segment) {
        case 'eli-s1':
          name = 'Eli-S1 AI Engine';
          break;
        case 'shm':
          name = 'Structural Health Monitoring';
          break;
        case 'it-services':
          name = 'IT Services';
          break;
        case 'case-studies':
          name = 'Case Studies';
          break;
        default:
          // Convert kebab-case and handle common terms
          name = segment
            .split('-')
            .map(word => {
              // Handle acronyms and special terms
              if (word.toLowerCase() === 'ai') return 'AI';
              if (word.toLowerCase() === 'api') return 'API';
              if (word.toLowerCase() === 'ui') return 'UI';
              if (word.toLowerCase() === 'ux') return 'UX';
              if (word.toLowerCase() === 'seo') return 'SEO';
              if (word.toLowerCase() === 'cms') return 'CMS';
              if (word.toLowerCase() === 'crm') return 'CRM';
              if (word.toLowerCase() === 'erp') return 'ERP';
              if (word.toLowerCase() === 'iot') return 'IoT';
              if (word.toLowerCase() === 'saas') return 'SaaS';
              
              // Capitalize first letter
              return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(' ');
      }
      
      breadcrumbs.push({
        name,
        url: currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = generateBreadcrumbs();

  // Don't render if no breadcrumbs (homepage)
  if (breadcrumbItems.length === 0) return null;

  return (
    <>
      {/* Schema markup */}
      <QFBreadcrumbSchema items={breadcrumbItems} />
      
      {/* Visual breadcrumbs */}
      <nav 
        className={`qf-breadcrumbs ${className}`} 
        aria-label="Breadcrumb navigation"
      >
        <ol className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            const isFirst = index === 0;
            
            return (
              <li key={item.url} className="flex items-center">
                {index > 0 && (
                  <ChevronRight 
                    className="h-4 w-4 mx-2 text-neutral-400 dark:text-neutral-600" 
                    aria-hidden="true"
                  />
                )}
                
                {isLast ? (
                  <span 
                    className="text-neutral-900 dark:text-neutral-100 font-medium"
                    aria-current="page"
                  >
                    {isFirst && <Home className="h-4 w-4 mr-1 inline" aria-hidden="true" />}
                    {item.name}
                  </span>
                ) : (
                  <Link 
                    href={item.url}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-accent transition-colors duration-200 flex items-center"
                  >
                    {isFirst && <Home className="h-4 w-4 mr-1" aria-hidden="true" />}
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default QFBreadcrumbs;