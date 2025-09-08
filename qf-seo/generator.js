import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createGzip } from 'zlib';
import { pipeline } from 'stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load SEO configuration
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'qf-seo.config.json'), 'utf8'));

// Core sitemap generation utilities
class QFSeoGenerator {
  constructor() {
    this.outputDir = path.join(__dirname, '../client/public');
    this.dataDir = path.join(__dirname, '../client/public/data');
    this.blogData = null;
    this.siteData = null;
  }

  async loadData() {
    try {
      this.blogData = JSON.parse(fs.readFileSync(path.join(this.dataDir, 'qf-blogs.json'), 'utf8'));
      this.siteData = JSON.parse(fs.readFileSync(path.join(this.dataDir, 'qf-site.json'), 'utf8'));
    } catch (error) {
      console.warn('Warning: Could not load blog or site data:', error.message);
      this.blogData = { posts: [] };
      this.siteData = { apps: [], faqs: [] };
    }
  }

  // Generate XML sitemap for pages
  generatePagesSitemap() {
    const pages = [
      { url: '/', lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '1.0' },
      { url: '/about', lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.8' },
      { url: '/eli-s1', lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '0.9' },
      { url: '/shm', lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '0.9' },
      { url: '/it-services', lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '0.8' },
      { url: '/apps', lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '0.8' },
      { url: '/case-studies', lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.7' },
      { url: '/technologies', lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.6' },
      { url: '/products', lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.6' },
      { url: '/blog', lastmod: new Date().toISOString(), changefreq: 'daily', priority: '0.8' },
      { url: '/search', lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '0.5' },
      { url: '/careers', lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.6' },
      { url: '/contact', lastmod: new Date().toISOString(), changefreq: 'monthly', priority: '0.7' },
      { url: '/privacy', lastmod: new Date().toISOString(), changefreq: 'yearly', priority: '0.3' },
      { url: '/terms', lastmod: new Date().toISOString(), changefreq: 'yearly', priority: '0.3' }
    ];

    return this.generateSitemapXML(pages, 'pages');
  }

  // Generate XML sitemap for blog posts
  generatePostsSitemap() {
    if (!this.blogData || !this.blogData.posts) {
      return this.generateSitemapXML([], 'posts');
    }

    const posts = this.blogData.posts.map(post => ({
      url: `/blog/${post.slug}`,
      lastmod: post.updatedAt || post.publishDate,
      changefreq: 'monthly',
      priority: post.featured ? '0.8' : '0.6'
    }));

    return this.generateSitemapXML(posts, 'posts');
  }

  // Generate XML sitemap for categories
  generateCategoriesSitemap() {
    const categories = [
      'AI Engineering',
      'MLOps & Model Deployment',
      'Web Development',
      'Mobile Development',
      'Data Engineering',
      'Cloud Infrastructure',
      'DevOps & Automation',
      'API Development',
      'Database Systems',
      'Security & Privacy',
      'UI/UX Design',
      'Performance Optimization',
      'Testing & QA',
      'Project Management',
      'SHM & Aerospace',
      'IoT & Edge Computing',
      'Research & Development',
      'Industry Insights'
    ];

    const categoryUrls = categories.map(category => ({
      url: `/blog/category/${encodeURIComponent(category)}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.5'
    }));

    return this.generateSitemapXML(categoryUrls, 'categories');
  }

  // Generate XML sitemap for tags
  generateTagsSitemap() {
    const commonTags = [
      'ai', 'machine-learning', 'react', 'typescript', 'python', 'nodejs',
      'aws', 'docker', 'kubernetes', 'api', 'database', 'security',
      'performance', 'testing', 'devops', 'frontend', 'backend',
      'shm', 'aerospace', 'iot', 'analytics', 'automation'
    ];

    const tagUrls = commonTags.map(tag => ({
      url: `/blog/tag/${tag}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.4'
    }));

    return this.generateSitemapXML(tagUrls, 'tags');
  }

  // Generate XML sitemap for apps
  generateAppsSitemap() {
    if (!this.siteData || !this.siteData.apps) {
      return this.generateSitemapXML([], 'apps');
    }

    const apps = this.siteData.apps.map(app => ({
      url: `/apps#${app.name.toLowerCase().replace(/\s+/g, '-')}`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.6'
    }));

    return this.generateSitemapXML(apps, 'apps');
  }

  // Generate sitemap XML content
  generateSitemapXML(urls, type) {
    const urlElements = urls.map(item => `
  <url>
    <loc>${config.siteUrl}${item.url}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
  }

  // Generate main sitemap index
  generateSitemapIndex() {
    const sitemaps = [
      'sitemap-pages.xml',
      'sitemap-posts.xml',
      'sitemap-categories.xml',
      'sitemap-tags.xml',
      'sitemap-apps.xml'
    ];

    const sitemapElements = sitemaps.map(sitemap => `
  <sitemap>
    <loc>${config.siteUrl}/${sitemap}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapElements}
</sitemapindex>`;
  }

  // Generate robots.txt
  generateRobotsTxt() {
    return `User-agent: *
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /node_modules/
Disallow: /src/
Allow: /

# Sitemap
Sitemap: ${config.siteUrl}/sitemap.xml

# Crawl-delay for courtesy
Crawl-delay: 1
`;
  }

  // Generate RSS feed
  generateRSSFeed() {
    if (!this.blogData || !this.blogData.posts) {
      return this.generateEmptyRSS();
    }

    const recentPosts = this.blogData.posts
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
      .slice(0, 50);

    const items = recentPosts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt || post.metaDescription || ''}]]></description>
      <link>${config.siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${config.siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishDate).toUTCString()}</pubDate>
      <category><![CDATA[${post.category}]]></category>
      <author><![CDATA[info@quantafons.com (QuantaFONS Team)]]></author>
    </item>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>QuantaFONS Blog</title>
    <description>AI, Engineering, and Technology Insights from QuantaFONS</description>
    <link>${config.siteUrl}/blog</link>
    <atom:link href="${config.siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <ttl>60</ttl>
    <image>
      <url>${config.siteUrl}/logo.png</url>
      <title>QuantaFONS</title>
      <link>${config.siteUrl}</link>
    </image>
${items}
  </channel>
</rss>`;
  }

  generateEmptyRSS() {
    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>QuantaFONS Blog</title>
    <description>AI, Engineering, and Technology Insights from QuantaFONS</description>
    <link>${config.siteUrl}/blog</link>
    <atom:link href="${config.siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  </channel>
</rss>`;
  }

  // Generate Atom feed
  generateAtomFeed() {
    if (!this.blogData || !this.blogData.posts) {
      return this.generateEmptyAtom();
    }

    const recentPosts = this.blogData.posts
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
      .slice(0, 50);

    const entries = recentPosts.map(post => `
  <entry>
    <title><![CDATA[${post.title}]]></title>
    <link href="${config.siteUrl}/blog/${post.slug}"/>
    <id>${config.siteUrl}/blog/${post.slug}</id>
    <updated>${new Date(post.updatedAt || post.publishDate).toISOString()}</updated>
    <published>${new Date(post.publishDate).toISOString()}</published>
    <summary><![CDATA[${post.excerpt || post.metaDescription || ''}]]></summary>
    <category term="${post.category}"/>
    <author>
      <name>QuantaFONS Team</name>
      <email>info@quantafons.com</email>
    </author>
  </entry>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>QuantaFONS Blog</title>
  <subtitle>AI, Engineering, and Technology Insights from QuantaFONS</subtitle>
  <link href="${config.siteUrl}/atom.xml" rel="self"/>
  <link href="${config.siteUrl}/blog"/>
  <id>${config.siteUrl}/blog</id>
  <updated>${new Date().toISOString()}</updated>
  <author>
    <name>QuantaFONS Team</name>
    <email>info@quantafons.com</email>
  </author>
${entries}
</feed>`;
  }

  generateEmptyAtom() {
    return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>QuantaFONS Blog</title>
  <subtitle>AI, Engineering, and Technology Insights from QuantaFONS</subtitle>
  <link href="${config.siteUrl}/atom.xml" rel="self"/>
  <link href="${config.siteUrl}/blog"/>
  <id>${config.siteUrl}/blog</id>
  <updated>${new Date().toISOString()}</updated>
  <author>
    <name>QuantaFONS Team</name>
    <email>info@quantafons.com</email>
  </author>
</feed>`;
  }

  // Write file and create gzipped version
  async writeFileWithGzip(filePath, content) {
    // Write original file
    fs.writeFileSync(filePath, content, 'utf8');
    
    // Create gzipped version
    const gzipPath = `${filePath}.gz`;
    const readStream = fs.createReadStream(filePath);
    const writeStream = fs.createWriteStream(gzipPath);
    const gzipStream = createGzip();
    
    await pipeline(readStream, gzipStream, writeStream);
    
    console.log(`Generated: ${path.basename(filePath)} and ${path.basename(gzipPath)}`);
  }

  // Main build function
  async build() {
    console.log('🚀 Starting QuantaFONS SEO generation...');
    
    // Ensure output directory exists
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    // Load data
    await this.loadData();

    // Generate all sitemaps
    const sitemaps = {
      'sitemap.xml': this.generateSitemapIndex(),
      'sitemap-pages.xml': this.generatePagesSitemap(),
      'sitemap-posts.xml': this.generatePostsSitemap(),
      'sitemap-categories.xml': this.generateCategoriesSitemap(),
      'sitemap-tags.xml': this.generateTagsSitemap(),
      'sitemap-apps.xml': this.generateAppsSitemap()
    };

    // Write sitemaps with gzip
    for (const [filename, content] of Object.entries(sitemaps)) {
      await this.writeFileWithGzip(path.join(this.outputDir, filename), content);
    }

    // Generate and write other files
    fs.writeFileSync(path.join(this.outputDir, 'robots.txt'), this.generateRobotsTxt());
    fs.writeFileSync(path.join(this.outputDir, 'rss.xml'), this.generateRSSFeed());
    fs.writeFileSync(path.join(this.outputDir, 'atom.xml'), this.generateAtomFeed());

    console.log('✅ SEO files generated successfully!');
    console.log(`📁 Output directory: ${this.outputDir}`);
    console.log('📄 Generated files:');
    console.log('   - sitemap.xml (index)');
    console.log('   - sitemap-pages.xml');
    console.log('   - sitemap-posts.xml');
    console.log('   - sitemap-categories.xml');
    console.log('   - sitemap-tags.xml');
    console.log('   - sitemap-apps.xml');
    console.log('   - robots.txt');
    console.log('   - rss.xml');
    console.log('   - atom.xml');
    console.log('   - All XML files include .gz versions');
  }

  // Validation function
  validate() {
    console.log('🔍 Validating SEO implementation...');
    
    const requiredFiles = [
      'sitemap.xml',
      'sitemap-pages.xml', 
      'sitemap-posts.xml',
      'robots.txt',
      'rss.xml',
      'atom.xml'
    ];

    let allValid = true;

    requiredFiles.forEach(file => {
      const filePath = path.join(this.outputDir, file);
      if (fs.existsSync(filePath)) {
        console.log(`✅ ${file} exists`);
      } else {
        console.log(`❌ ${file} missing`);
        allValid = false;
      }
    });

    if (allValid) {
      console.log('✅ All SEO files are present!');
    } else {
      console.log('❌ Some SEO files are missing. Run "npm run seo:build" to generate them.');
    }

    return allValid;
  }

  // IndexNow ping function (placeholder for now)
  async ping(urls = []) {
    if (!config.indexNow.enabled) {
      console.log('IndexNow is disabled in configuration');
      return;
    }

    console.log('📡 IndexNow ping functionality ready for implementation');
    console.log(`Key: ${config.indexNow.key}`);
    console.log(`URLs to ping: ${urls.length || 'all'}`);
    
    // This will be implemented in the next phase
    return true;
  }
}

// CLI interface
const command = process.argv[2];
const generator = new QFSeoGenerator();

switch (command) {
  case 'build':
    generator.build().catch(console.error);
    break;
  case 'validate':
    generator.validate();
    break;
  case 'ping':
    const urls = process.argv.slice(3);
    generator.ping(urls).catch(console.error);
    break;
  default:
    console.log('Available commands:');
    console.log('  build    - Generate all SEO files');
    console.log('  validate - Check if SEO files exist');
    console.log('  ping     - Ping IndexNow with URLs');
    console.log('');
    console.log('Usage: node qf-seo/generator.js <command>');
}