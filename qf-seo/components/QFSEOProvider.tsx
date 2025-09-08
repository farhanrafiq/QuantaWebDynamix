import React from 'react';
import QFMetaTags from './QFMetaTags';
import QFBreadcrumbs from './QFBreadcrumbs';
import { QFHomepageSchema, QFBreadcrumbSchema } from './QFSchema';

interface SEOProviderProps {
  children: React.ReactNode;
  // Meta tag props
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  noIndex?: boolean;
  canonical?: string;
  // Article props (for blog posts)
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  // Breadcrumb props
  showBreadcrumbs?: boolean;
  breadcrumbItems?: Array<{ name: string; url: string }>;
  breadcrumbClassName?: string;
  // Schema props
  isHomepage?: boolean;
}

const QFSEOProvider: React.FC<SEOProviderProps> = ({
  children,
  title,
  description,
  keywords,
  image,
  noIndex = false,
  canonical,
  article,
  showBreadcrumbs = true,
  breadcrumbItems,
  breadcrumbClassName = "mb-6 px-4 sm:px-6 lg:px-8",
  isHomepage = false
}) => {
  return (
    <>
      {/* Meta Tags */}
      <QFMetaTags
        title={title}
        description={description}
        keywords={keywords}
        image={image}
        noIndex={noIndex}
        canonical={canonical}
        article={article}
      />

      {/* Homepage Schema (Organization + Website) */}
      {isHomepage && <QFHomepageSchema />}

      {/* Breadcrumbs */}
      {showBreadcrumbs && !isHomepage && (
        <div className={breadcrumbClassName}>
          <QFBreadcrumbs customItems={breadcrumbItems} />
        </div>
      )}

      {/* Main Content */}
      {children}
    </>
  );
};

export default QFSEOProvider;