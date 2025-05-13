import { pgTable, text, serial, integer, boolean, timestamp, jsonb, varchar, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  role: true,
});

// Contact form schema for validation
export const contactFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  company: z.string().optional(),
  inquiryType: z.string().min(1, { message: "Please select an inquiry type" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  privacyPolicy: z.boolean().refine(val => val === true, {
    message: "You must agree to the privacy policy",
  }),
});

// Contact messages table
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  inquiryType: text("inquiry_type").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  firstName: true,
  lastName: true,
  email: true,
  company: true,
  inquiryType: true,
  message: true,
});

// Newsletter subscribers table
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscribed: boolean("subscribed").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertSubscriberSchema = createInsertSchema(subscribers).pick({
  email: true,
  subscribed: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type Subscriber = typeof subscribers.$inferSelect;

// Technologies table
export const technologies = pgTable("technologies", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  shortDescription: text("short_description").notNull(),
  fullDescription: text("full_description").notNull(),
  iconName: varchar("icon_name", { length: 50 }),
  imageUrl: text("image_url"),
  category: varchar("category", { length: 50 }).notNull(),
  featured: boolean("featured").default(false),
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertTechnologySchema = createInsertSchema(technologies).pick({
  name: true,
  slug: true,
  shortDescription: true,
  fullDescription: true,
  iconName: true,
  imageUrl: true,
  category: true,
  featured: true,
  displayOrder: true,
});

// Technology features/benefits
export const technologyFeatures = pgTable("technology_features", {
  id: serial("id").primaryKey(),
  technologyId: integer("technology_id").notNull().references(() => technologies.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description").notNull(),
  iconName: varchar("icon_name", { length: 50 }),
  displayOrder: integer("display_order").default(0),
});

export const insertTechnologyFeatureSchema = createInsertSchema(technologyFeatures).pick({
  technologyId: true,
  title: true,
  description: true,
  iconName: true,
  displayOrder: true,
});

// Technology specifications
export const technologySpecs = pgTable("technology_specs", {
  id: serial("id").primaryKey(),
  technologyId: integer("technology_id").notNull().references(() => technologies.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  value: text("value").notNull(),
  displayOrder: integer("display_order").default(0),
});

export const insertTechnologySpecSchema = createInsertSchema(technologySpecs).pick({
  technologyId: true,
  name: true,
  value: true,
  displayOrder: true,
});

// Products table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  shortDescription: text("short_description").notNull(),
  fullDescription: text("full_description").notNull(),
  imageUrl: text("image_url"),
  category: varchar("category", { length: 50 }).notNull(),
  featured: boolean("featured").default(false),
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  slug: true,
  shortDescription: true,
  fullDescription: true,
  imageUrl: true,
  category: true,
  featured: true,
  displayOrder: true,
});

// Product features table
export const productFeatures = pgTable("product_features", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description").notNull(),
  iconName: varchar("icon_name", { length: 50 }),
  displayOrder: integer("display_order").default(0),
});

export const insertProductFeatureSchema = createInsertSchema(productFeatures).pick({
  productId: true,
  title: true,
  description: true,
  iconName: true,
  displayOrder: true,
});

// Blog posts table
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  authorId: integer("author_id").references(() => users.id),
  category: varchar("category", { length: 50 }).notNull(),
  publishDate: timestamp("publish_date").defaultNow(),
  published: boolean("published").default(false),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).pick({
  title: true,
  slug: true,
  excerpt: true,
  content: true,
  imageUrl: true,
  authorId: true,
  category: true,
  publishDate: true,
  published: true,
  featured: true,
});

// Blog post tags
export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  slug: varchar("slug", { length: 50 }).notNull().unique(),
});

export const insertTagSchema = createInsertSchema(tags).pick({
  name: true,
  slug: true,
});

// Blog post to tags (many-to-many relationship)
export const blogPostsTags = pgTable("blog_posts_tags", {
  id: serial("id").primaryKey(),
  blogPostId: integer("blog_post_id").notNull().references(() => blogPosts.id, { onDelete: "cascade" }),
  tagId: integer("tag_id").notNull().references(() => tags.id, { onDelete: "cascade" }),
});

// Team members table
export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  title: varchar("title", { length: 100 }).notNull(),
  bio: text("bio").notNull(),
  imageUrl: text("image_url"),
  department: varchar("department", { length: 50 }).notNull(),
  email: varchar("email", { length: 100 }),
  linkedin: text("linkedin"),
  displayOrder: integer("display_order").default(0),
  featured: boolean("featured").default(false),
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).pick({
  name: true,
  title: true,
  bio: true,
  imageUrl: true,
  department: true,
  email: true,
  linkedin: true,
  displayOrder: true,
  featured: true,
});

// Career job positions
export const jobPositions = pgTable("job_positions", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  department: varchar("department", { length: 50 }).notNull(),
  location: varchar("location", { length: 100 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // Full-time, Part-time, Contract
  description: text("description").notNull(),
  requirements: text("requirements").notNull(),
  active: boolean("active").default(true),
  publishDate: timestamp("publish_date").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertJobPositionSchema = createInsertSchema(jobPositions).pick({
  title: true,
  slug: true,
  department: true,
  location: true,
  type: true,
  description: true,
  requirements: true,
  active: true,
  publishDate: true,
});

// Define relations
export const technologiesRelations = relations(technologies, ({ many }) => ({
  features: many(technologyFeatures),
  specs: many(technologySpecs),
}));

export const technologyFeaturesRelations = relations(technologyFeatures, ({ one }) => ({
  technology: one(technologies, {
    fields: [technologyFeatures.technologyId],
    references: [technologies.id],
  }),
}));

export const technologySpecsRelations = relations(technologySpecs, ({ one }) => ({
  technology: one(technologies, {
    fields: [technologySpecs.technologyId],
    references: [technologies.id],
  }),
}));

export const productsRelations = relations(products, ({ many }) => ({
  features: many(productFeatures),
}));

export const productFeaturesRelations = relations(productFeatures, ({ one }) => ({
  product: one(products, {
    fields: [productFeatures.productId],
    references: [products.id],
  }),
}));

export const blogPostsRelations = relations(blogPosts, ({ one, many }) => ({
  author: one(users, {
    fields: [blogPosts.authorId],
    references: [users.id],
  }),
  tags: many(blogPostsTags),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  blogPosts: many(blogPostsTags),
}));

export const blogPostsTagsRelations = relations(blogPostsTags, ({ one }) => ({
  blogPost: one(blogPosts, {
    fields: [blogPostsTags.blogPostId],
    references: [blogPosts.id],
  }),
  tag: one(tags, {
    fields: [blogPostsTags.tagId],
    references: [tags.id],
  }),
}));

// Additional types for the new schemas
export type InsertTechnology = z.infer<typeof insertTechnologySchema>;
export type Technology = typeof technologies.$inferSelect;

export type InsertTechnologyFeature = z.infer<typeof insertTechnologyFeatureSchema>;
export type TechnologyFeature = typeof technologyFeatures.$inferSelect;

export type InsertTechnologySpec = z.infer<typeof insertTechnologySpecSchema>;
export type TechnologySpec = typeof technologySpecs.$inferSelect;

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export type InsertProductFeature = z.infer<typeof insertProductFeatureSchema>;
export type ProductFeature = typeof productFeatures.$inferSelect;

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

export type InsertTag = z.infer<typeof insertTagSchema>;
export type Tag = typeof tags.$inferSelect;

export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;

export type InsertJobPosition = z.infer<typeof insertJobPositionSchema>;
export type JobPosition = typeof jobPositions.$inferSelect;
