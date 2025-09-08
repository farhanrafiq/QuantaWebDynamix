import { Router } from 'express';
// @ts-ignore - ES module import
import IndexNowService from '../../qf-seo/utils/indexnow.js';

const router = Router();

// Initialize IndexNow service
const indexNowService = new IndexNowService();

// IndexNow ping endpoint
router.post('/indexnow', async (req, res) => {
  try {
    const { urls } = req.body;

    if (!urls || !Array.isArray(urls)) {
      return res.status(400).json({
        success: false,
        error: 'URLs array is required'
      });
    }

    const result = await indexNowService.ping(urls);
    
    res.json({
      success: result.success,
      message: `Pinged ${result.urlCount} URLs to IndexNow engines`,
      results: result.results
    });
  } catch (error) {
    console.error('IndexNow ping error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to ping IndexNow'
    });
  }
});

// Ping specific blog post
router.post('/indexnow/blog/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await indexNowService.pingBlogPost(slug);
    
    res.json({
      success: result.success,
      message: `Pinged blog post: ${slug}`,
      results: result.results
    });
  } catch (error) {
    console.error('Blog post ping error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to ping blog post'
    });
  }
});

// Ping all site pages
router.post('/indexnow/site', async (req, res) => {
  try {
    const result = await indexNowService.pingSitePages();
    
    res.json({
      success: result.success,
      message: 'Pinged all site pages',
      results: result.results
    });
  } catch (error) {
    console.error('Site pages ping error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to ping site pages'
    });
  }
});

// Ping all changed URLs
router.post('/indexnow/all', async (req, res) => {
  try {
    const result = await indexNowService.pingAllChangedUrls();
    
    res.json({
      success: result.success,
      message: 'Pinged all changed URLs',
      results: result.results
    });
  } catch (error) {
    console.error('All URLs ping error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to ping all URLs'
    });
  }
});

// Generate and serve IndexNow key file
router.get('/indexnow-key', (req, res) => {
  try {
    indexNowService.createKeyFile();
    res.json({
      success: true,
      message: 'IndexNow key file created',
      key: indexNowService.key
    });
  } catch (error) {
    console.error('Key file creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create key file'
    });
  }
});

export default router;