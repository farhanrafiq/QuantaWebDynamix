import { useEffect } from 'react';
import { useLocation } from 'wouter';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  noIndex?: boolean;
  canonical?: string;
}

const QFMetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  keywords,
  image,
  article,
  noIndex = false,
  canonical
}) => {
  const [location] = useLocation();
  
  // Default values from config
  const siteUrl = 'https://www.quantafons.com';
  const siteName = 'QuantaFONS';
  const defaultTitle = 'QuantaFONS - AI, SHM for Spacecrafts and Buildings, IT Services';
  const defaultDescription = 'AI-first R&D company specializing in Eli-S1 AI engine, structural health monitoring for spacecraft and critical infrastructure, and enterprise software solutions.';
  const defaultImage = `${siteUrl}/og-default.png`;
  
  // Generate final values
  const finalTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalImage = image || defaultImage;
  const finalCanonical = canonical || `${siteUrl}${location}`;
  
  useEffect(() => {
    // Update document title
    document.title = finalTitle;
    
    // Helper function to update or create meta tag
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      
      tag.setAttribute('content', content);
    };

    // Helper function to update or create link tag
    const updateLinkTag = (rel: string, href: string) => {
      let tag = document.querySelector(`link[rel="${rel}"]`);
      
      if (!tag) {
        tag = document.createElement('link');
        tag.setAttribute('rel', rel);
        document.head.appendChild(tag);
      }
      
      tag.setAttribute('href', href);
    };

    // Basic meta tags
    updateMetaTag('description', finalDescription);
    if (keywords) updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'QuantaFONS Private Limited');
    
    // Robots meta
    if (noIndex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow');
    }

    // Open Graph tags
    updateMetaTag('og:title', finalTitle, true);
    updateMetaTag('og:description', finalDescription, true);
    updateMetaTag('og:type', article ? 'article' : 'website', true);
    updateMetaTag('og:url', finalCanonical, true);
    updateMetaTag('og:image', finalImage, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:site_name', siteName, true);
    updateMetaTag('og:locale', 'en_IN', true);

    // Article-specific Open Graph tags
    if (article) {
      if (article.publishedTime) {
        updateMetaTag('article:published_time', article.publishedTime, true);
      }
      if (article.modifiedTime) {
        updateMetaTag('article:modified_time', article.modifiedTime, true);
      }
      if (article.author) {
        updateMetaTag('article:author', article.author, true);
      }
      if (article.section) {
        updateMetaTag('article:section', article.section, true);
      }
      if (article.tags) {
        article.tags.forEach(tag => {
          const tagMeta = document.createElement('meta');
          tagMeta.setAttribute('property', 'article:tag');
          tagMeta.setAttribute('content', tag);
          document.head.appendChild(tagMeta);
        });
      }
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:site', '@quantafons');
    updateMetaTag('twitter:creator', '@quantafons');
    updateMetaTag('twitter:title', finalTitle);
    updateMetaTag('twitter:description', finalDescription);
    updateMetaTag('twitter:image', finalImage);

    // Additional SEO tags
    updateMetaTag('theme-color', '#0099FF');
    updateMetaTag('msapplication-TileColor', '#0099FF');
    updateMetaTag('apple-mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');

    // Canonical URL
    updateLinkTag('canonical', finalCanonical);

    // RSS feed
    updateLinkTag('alternate', `${siteUrl}/rss.xml`);
    const rssLink = document.querySelector('link[rel="alternate"]');
    if (rssLink) {
      rssLink.setAttribute('type', 'application/rss+xml');
      rssLink.setAttribute('title', 'QuantaFONS Blog RSS Feed');
    }

    // Preconnect to external domains
    const preconnectDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://cdn.jsdelivr.net'
    ];

    preconnectDomains.forEach(domain => {
      let preconnectTag = document.querySelector(`link[rel="preconnect"][href="${domain}"]`);
      if (!preconnectTag) {
        preconnectTag = document.createElement('link');
        preconnectTag.setAttribute('rel', 'preconnect');
        preconnectTag.setAttribute('href', domain);
        if (domain.includes('gstatic')) {
          preconnectTag.setAttribute('crossorigin', '');
        }
        document.head.appendChild(preconnectTag);
      }
    });

  }, [finalTitle, finalDescription, finalImage, finalCanonical, keywords, article, noIndex]);

  // This component doesn't render anything
  return null;
};

export default QFMetaTags;