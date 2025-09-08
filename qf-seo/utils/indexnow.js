import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load SEO configuration
const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../qf-seo.config.json'), 'utf8'));

class IndexNowService {
  constructor() {
    this.enabled = config.indexNow.enabled;
    this.key = config.indexNow.key;
    this.engines = config.indexNow.engines;
    this.host = new URL(config.siteUrl).hostname;
    this.keyLocation = `${config.siteUrl}/${this.key}.txt`;
  }

  // Generate IndexNow key file content
  generateKeyFile() {
    return this.key;
  }

  // Ping IndexNow with URLs
  async ping(urls = []) {
    if (!this.enabled) {
      console.log('IndexNow is disabled in configuration');
      return { success: false, reason: 'disabled' };
    }

    if (urls.length === 0) {
      console.log('No URLs provided for IndexNow ping');
      return { success: false, reason: 'no_urls' };
    }

    const payload = {
      host: this.host,
      key: this.key,
      keyLocation: this.keyLocation,
      urlList: urls.map(url => {
        // Ensure URLs are absolute
        if (url.startsWith('/')) {
          return `${config.siteUrl}${url}`;
        }
        return url;
      })
    };

    console.log(`📡 Pinging IndexNow with ${urls.length} URLs...`);
    console.log('Payload:', JSON.stringify(payload, null, 2));

    const results = [];

    for (const engine of this.engines) {
      try {
        const response = await fetch(engine, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'QuantaFONS-SEO-Bot/1.0'
          },
          body: JSON.stringify(payload)
        });

        const result = {
          engine,
          status: response.status,
          success: response.ok,
          message: response.ok ? 'Success' : `HTTP ${response.status}`
        };

        if (!response.ok) {
          const errorText = await response.text();
          result.error = errorText;
        }

        results.push(result);
        console.log(`${engine}: ${result.success ? '✅' : '❌'} ${result.message}`);

      } catch (error) {
        const result = {
          engine,
          success: false,
          error: error.message
        };
        results.push(result);
        console.log(`${engine}: ❌ ${error.message}`);
      }
    }

    return {
      success: results.some(r => r.success),
      results,
      urlCount: urls.length
    };
  }

  // Ping specific blog post
  async pingBlogPost(slug) {
    const url = `/blog/${slug}`;
    return this.ping([url]);
  }

  // Ping multiple blog posts
  async pingBlogPosts(slugs) {
    const urls = slugs.map(slug => `/blog/${slug}`);
    return this.ping(urls);
  }

  // Ping site pages
  async pingSitePages() {
    const urls = [
      '/',
      '/about',
      '/eli-s1',
      '/shm',
      '/it-services',
      '/apps',
      '/case-studies',
      '/blog',
      '/contact'
    ];
    return this.ping(urls);
  }

  // Generate all changed URLs from sitemap data
  async pingAllChangedUrls() {
    try {
      const sitemapPath = path.join(__dirname, '../../client/public/data/blog-sitemap.json');
      if (fs.existsSync(sitemapPath)) {
        const blogSitemap = JSON.parse(fs.readFileSync(sitemapPath, 'utf8'));
        const blogUrls = blogSitemap.map(item => item.url);
        
        // Combine with site pages
        const allUrls = [
          '/',
          '/about',
          '/eli-s1',
          '/shm',
          '/it-services',
          '/apps',
          '/case-studies',
          '/blog',
          '/contact',
          ...blogUrls
        ];

        return this.ping(allUrls);
      } else {
        return this.pingSitePages();
      }
    } catch (error) {
      console.error('Error reading sitemap data:', error);
      return this.pingSitePages();
    }
  }

  // Create IndexNow key file
  createKeyFile() {
    const keyFilePath = path.join(__dirname, `../../client/public/${this.key}.txt`);
    fs.writeFileSync(keyFilePath, this.generateKeyFile());
    console.log(`✅ Created IndexNow key file: ${this.key}.txt`);
  }
}

export default IndexNowService;