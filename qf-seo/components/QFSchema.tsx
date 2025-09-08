import React, { useEffect } from 'react';
import { useLocation } from 'wouter';

interface OrganizationSchemaProps {
  type?: 'Organization' | 'Corporation' | 'TechCompany';
}

interface WebsiteSchemaProps {
  searchUrl?: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

interface ArticleSchemaProps {
  headline: string;
  description: string;
  author: string;
  publishDate: string;
  modifyDate?: string;
  image?: string;
  category: string;
  tags?: string[];
}

interface SoftwareApplicationSchemaProps {
  name: string;
  description: string;
  applicationCategory: string;
  operatingSystem: string;
  price?: string;
  priceCurrency?: string;
  mode: 'SaaS' | 'One-Time';
}

interface FAQSchemaProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

// Organization Schema Component
export const QFOrganizationSchema: React.FC<OrganizationSchemaProps> = ({ 
  type = 'TechCompany' 
}) => {
  const siteUrl = 'https://www.quantafons.com';
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": type,
    "name": "QuantaFONS Private Limited",
    "alternateName": "QuantaFONS",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "description": "AI-first R&D company specializing in Eli-S1 AI engine, structural health monitoring for spacecraft and critical infrastructure, and enterprise software solutions.",
    "foundingDate": "2020",
    "founders": [
      {
        "@type": "Person",
        "name": "QuantaFONS Founding Team"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Red Cross Road, Maisuma",
      "addressLocality": "Srinagar",
      "addressRegion": "Kashmir",
      "postalCode": "190008",
      "addressCountry": "IN"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-9796000522",
        "contactType": "customer support",
        "areaServed": "IN",
        "availableLanguage": ["en", "ur"]
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/quantafons",
      "https://x.com/quantafons",
      "https://github.com/quantafons"
    ],
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning",
      "Structural Health Monitoring",
      "Spacecraft Engineering",
      "Enterprise Software Development",
      "AI Agents",
      "MLOps",
      "Cloud Infrastructure"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "serviceArea": {
      "@type": "AdministrativeArea",
      "name": "Global"
    }
  };

  useEffect(() => {
    const scriptId = 'qf-organization-schema';
    let script = document.getElementById(scriptId);
    
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      (script as HTMLScriptElement).type = 'application/ld+json';
      document.head.appendChild(script);
    }
    
    script.textContent = JSON.stringify(organizationSchema);
  }, []);

  return null;
};

// Website Schema Component
export const QFWebsiteSchema: React.FC<WebsiteSchemaProps> = ({ 
  searchUrl = '/search' 
}) => {
  const siteUrl = 'https://www.quantafons.com';
  
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "QuantaFONS",
    "url": siteUrl,
    "description": "AI-first R&D company specializing in Eli-S1 AI engine, structural health monitoring for spacecraft and critical infrastructure, and enterprise software solutions.",
    "publisher": {
      "@type": "Organization",
      "name": "QuantaFONS Private Limited"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}${searchUrl}?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  useEffect(() => {
    const scriptId = 'qf-website-schema';
    let script = document.getElementById(scriptId);
    
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      (script as HTMLScriptElement).type = 'application/ld+json';
      document.head.appendChild(script);
    }
    
    script.textContent = JSON.stringify(websiteSchema);
  }, []);

  return null;
};

// Breadcrumb Schema Component
export const QFBreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({ items }) => {
  const siteUrl = 'https://www.quantafons.com';
  
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${siteUrl}${item.url}`
    }))
  };

  useEffect(() => {
    const scriptId = 'qf-breadcrumb-schema';
    let script = document.getElementById(scriptId);
    
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      (script as HTMLScriptElement).type = 'application/ld+json';
      document.head.appendChild(script);
    }
    
    script.textContent = JSON.stringify(breadcrumbSchema);
  }, [items]);

  return null;
};

// Article Schema Component
export const QFArticleSchema: React.FC<ArticleSchemaProps> = ({
  headline,
  description,
  author,
  publishDate,
  modifyDate,
  image,
  category,
  tags = []
}) => {
  const [location] = useLocation();
  const siteUrl = 'https://www.quantafons.com';
  
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": description,
    "image": image || `${siteUrl}/og-default.png`,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "QuantaFONS Private Limited",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "datePublished": publishDate,
    "dateModified": modifyDate || publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}${location}`
    },
    "articleSection": category,
    "keywords": tags.join(', '),
    "inLanguage": "en-IN"
  };

  useEffect(() => {
    const scriptId = 'qf-article-schema';
    let script = document.getElementById(scriptId);
    
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      (script as HTMLScriptElement).type = 'application/ld+json';
      document.head.appendChild(script);
    }
    
    script.textContent = JSON.stringify(articleSchema);
  }, [headline, description, author, publishDate, modifyDate, image, category, tags]);

  return null;
};

// Software Application Schema Component
export const QFSoftwareApplicationSchema: React.FC<SoftwareApplicationSchemaProps> = ({
  name,
  description,
  applicationCategory,
  operatingSystem,
  price,
  priceCurrency = 'INR',
  mode
}) => {
  const siteUrl = 'https://www.quantafons.com';
  
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "applicationCategory": applicationCategory,
    "operatingSystem": operatingSystem,
    "provider": {
      "@type": "Organization",
      "name": "QuantaFONS Private Limited"
    },
    "url": `${siteUrl}/apps`,
    "downloadUrl": mode === 'One-Time' ? `${siteUrl}/contact` : undefined,
    "installUrl": mode === 'SaaS' ? `${siteUrl}/contact` : undefined,
    "offers": price ? {
      "@type": "Offer",
      "price": price.replace(/[^\d.]/g, ''),
      "priceCurrency": priceCurrency,
      "availability": "https://schema.org/InStock",
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    } : undefined
  };

  useEffect(() => {
    const scriptId = `qf-software-schema-${name.toLowerCase().replace(/\s+/g, '-')}`;
    let script = document.getElementById(scriptId);
    
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      (script as HTMLScriptElement).type = 'application/ld+json';
      document.head.appendChild(script);
    }
    
    script.textContent = JSON.stringify(softwareSchema);
    
    // Cleanup function to remove script when component unmounts
    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [name, description, applicationCategory, operatingSystem, price, priceCurrency, mode]);

  return null;
};

// FAQ Schema Component
export const QFFAQSchema: React.FC<FAQSchemaProps> = ({ faqs }) => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  useEffect(() => {
    const scriptId = 'qf-faq-schema';
    let script = document.getElementById(scriptId);
    
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      (script as HTMLScriptElement).type = 'application/ld+json';
      document.head.appendChild(script);
    }
    
    script.textContent = JSON.stringify(faqSchema);
  }, [faqs]);

  return null;
};

// Combined Schema Component for Organization + Website (for homepage)
export const QFHomepageSchema: React.FC = () => {
  return (
    <>
      <QFOrganizationSchema />
      <QFWebsiteSchema />
    </>
  );
};