import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  contactFormSchema, 
  insertContactMessageSchema, 
  insertSubscriberSchema,
  insertTechnologySchema,
  insertTechnologyFeatureSchema,
  insertTechnologySpecSchema,
  insertProductSchema,
  insertProductFeatureSchema,
  insertBlogPostSchema,
  insertTagSchema,
  insertTeamMemberSchema,
  insertJobPositionSchema
} from "@shared/schema";
import qfSeoRoutes from "./api/qf-seo.js";

export async function registerRoutes(app: Express): Promise<Server> {
  // SEO API routes
  app.use('/api/qf-seo', qfSeoRoutes);
  
  // API routes prefix with /api
  
  // Contact form submission
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      
      // Save the contact message to the database
      const contactMessage = await storage.createContactMessage({
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        company: validatedData.company,
        inquiryType: validatedData.inquiryType,
        message: validatedData.message
      });
      
      return res.status(200).json({
        success: true,
        message: 'Your message has been received. We will contact you soon.',
        data: contactMessage
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.errors
        });
      }
      
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing your request'
      });
    }
  });

  // Subscribe to newsletter
  app.post('/api/subscribe', async (req: Request, res: Response) => {
    try {
      const schema = z.object({
        email: z.string().email(),
      });
      
      const { email } = schema.parse(req.body);
      
      // Check if subscriber already exists
      const existingSubscriber = await storage.getSubscriberByEmail(email);
      
      if (existingSubscriber) {
        if (!existingSubscriber.subscribed) {
          // Re-subscribe if previously unsubscribed
          await storage.updateSubscriberStatus(existingSubscriber.id, true);
          return res.status(200).json({
            success: true,
            message: 'You have been re-subscribed to our newsletter!'
          });
        }
        
        return res.status(200).json({
          success: true,
          message: 'You are already subscribed to our newsletter.'
        });
      }
      
      // Add new subscriber
      const subscriber = await storage.createSubscriber({
        email,
        subscribed: true
      });
      
      return res.status(200).json({
        success: true,
        message: 'Thank you for subscribing to our newsletter!',
        data: subscriber
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email address',
          errors: error.errors
        });
      }
      
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing your request'
      });
    }
  });
  
  // Get all technologies
  app.get('/api/technologies', async (_req: Request, res: Response) => {
    try {
      const technologies = await storage.getTechnologies();
      return res.status(200).json({
        success: true,
        data: technologies
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch technologies'
      });
    }
  });
  
  // Get technology by slug
  app.get('/api/technologies/:slug', async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const technology = await storage.getTechnologyBySlug(slug);
      
      if (!technology) {
        return res.status(404).json({
          success: false,
          message: 'Technology not found'
        });
      }
      
      // Get features and specs
      const features = await storage.getTechnologyFeatures(technology.id);
      const specs = await storage.getTechnologySpecs(technology.id);
      
      return res.status(200).json({
        success: true,
        data: {
          ...technology,
          features,
          specs
        }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch technology details'
      });
    }
  });
  
  // Get all products
  app.get('/api/products', async (req: Request, res: Response) => {
    try {
      const { category } = req.query;
      let products;
      
      if (category && typeof category === 'string') {
        products = await storage.getProductsByCategory(category);
      } else {
        products = await storage.getProducts();
      }
      
      return res.status(200).json({
        success: true,
        data: products
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch products'
      });
    }
  });
  
  // Get product by slug
  app.get('/api/products/:slug', async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const product = await storage.getProductBySlug(slug);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
      
      // Get features
      const features = await storage.getProductFeatures(product.id);
      
      return res.status(200).json({
        success: true,
        data: {
          ...product,
          features
        }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch product details'
      });
    }
  });
  
  // Get all blog posts
  app.get('/api/blog', async (req: Request, res: Response) => {
    try {
      const { category, featured } = req.query;
      let posts;
      
      if (featured === 'true') {
        const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
        posts = await storage.getFeaturedBlogPosts(limit);
      } else if (category && typeof category === 'string') {
        posts = await storage.getBlogPostsByCategory(category);
      } else {
        posts = await storage.getBlogPosts();
      }
      
      return res.status(200).json({
        success: true,
        data: posts
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch blog posts'
      });
    }
  });
  
  // Get blog post by slug
  app.get('/api/blog/:slug', async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Blog post not found'
        });
      }
      
      // Get tags for the post
      const tags = await storage.getTagsByBlogPostId(post.id);
      
      return res.status(200).json({
        success: true,
        data: {
          ...post,
          tags
        }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch blog post'
      });
    }
  });
  
  // Get all team members
  app.get('/api/team', async (req: Request, res: Response) => {
    try {
      const { featured } = req.query;
      let members;
      
      if (featured === 'true') {
        members = await storage.getFeaturedTeamMembers();
      } else {
        members = await storage.getTeamMembers();
      }
      
      return res.status(200).json({
        success: true,
        data: members
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch team members'
      });
    }
  });
  
  // Get job positions
  app.get('/api/careers', async (req: Request, res: Response) => {
    try {
      const { active } = req.query;
      let positions;
      
      if (active === 'true' || active === undefined) {
        positions = await storage.getActiveJobPositions();
      } else {
        positions = await storage.getJobPositions();
      }
      
      return res.status(200).json({
        success: true,
        data: positions
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch job positions'
      });
    }
  });
  
  // Get job position by slug
  app.get('/api/careers/:slug', async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const position = await storage.getJobPositionBySlug(slug);
      
      if (!position) {
        return res.status(404).json({
          success: false,
          message: 'Job position not found'
        });
      }
      
      return res.status(200).json({
        success: true,
        data: position
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch job position'
      });
    }
  });

  const httpServer = createServer(app);
  
  return httpServer;
}
