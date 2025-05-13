import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { contactFormSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes prefix with /api
  
  // Contact form submission
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      
      // In a real application, you would save this to a database
      // and/or send an email notification
      
      return res.status(200).json({
        success: true,
        message: 'Your message has been received. We will contact you soon.'
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
      
      // In a real application, you would add this to a newsletter subscription list
      
      return res.status(200).json({
        success: true,
        message: 'Thank you for subscribing to our newsletter!'
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

  const httpServer = createServer(app);
  
  return httpServer;
}
