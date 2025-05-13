import { 
  users, 
  type User, 
  type InsertUser,
  contactMessages,
  type ContactMessage,
  type InsertContactMessage,
  subscribers,
  type Subscriber,
  type InsertSubscriber,
  technologies,
  type Technology,
  type InsertTechnology,
  technologyFeatures,
  type TechnologyFeature,
  type InsertTechnologyFeature,
  technologySpecs,
  type TechnologySpec,
  type InsertTechnologySpec,
  products,
  type Product,
  type InsertProduct,
  productFeatures,
  type ProductFeature,
  type InsertProductFeature,
  blogPosts,
  type BlogPost,
  type InsertBlogPost,
  tags,
  type Tag,
  type InsertTag,
  blogPostsTags,
  teamMembers,
  type TeamMember,
  type InsertTeamMember,
  jobPositions,
  type JobPosition,
  type InsertJobPosition
} from "@shared/schema";
import { eq, desc, sql, and, or, like } from "drizzle-orm";
import { db } from "./db";

// Comprehensive storage interface for all entities
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact message methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  
  // Newsletter subscriber methods
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
  updateSubscriberStatus(id: number, subscribed: boolean): Promise<Subscriber>;
  
  // Technology methods
  getTechnologies(): Promise<Technology[]>;
  getTechnologyBySlug(slug: string): Promise<Technology | undefined>;
  createTechnology(technology: InsertTechnology): Promise<Technology>;
  updateTechnology(id: number, technology: Partial<InsertTechnology>): Promise<Technology>;
  deleteTechnology(id: number): Promise<void>;
  getTechnologyFeatures(technologyId: number): Promise<TechnologyFeature[]>;
  getTechnologySpecs(technologyId: number): Promise<TechnologySpec[]>;
  createTechnologyFeature(feature: InsertTechnologyFeature): Promise<TechnologyFeature>;
  createTechnologySpec(spec: InsertTechnologySpec): Promise<TechnologySpec>;
  
  // Product methods
  getProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product>;
  deleteProduct(id: number): Promise<void>;
  getProductFeatures(productId: number): Promise<ProductFeature[]>;
  createProductFeature(feature: InsertProductFeature): Promise<ProductFeature>;
  
  // Blog methods
  getBlogPosts(): Promise<BlogPost[]>;
  getFeaturedBlogPosts(limit?: number): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPostsByCategory(category: string): Promise<BlogPost[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<void>;
  getTags(): Promise<Tag[]>;
  createTag(tag: InsertTag): Promise<Tag>;
  getTagsByBlogPostId(blogPostId: number): Promise<Tag[]>;
  addTagToBlogPost(blogPostId: number, tagId: number): Promise<void>;
  removeTagFromBlogPost(blogPostId: number, tagId: number): Promise<void>;
  
  // Team member methods
  getTeamMembers(): Promise<TeamMember[]>;
  getFeaturedTeamMembers(): Promise<TeamMember[]>;
  getTeamMemberById(id: number): Promise<TeamMember | undefined>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember>;
  deleteTeamMember(id: number): Promise<void>;
  
  // Job position methods
  getJobPositions(): Promise<JobPosition[]>;
  getActiveJobPositions(): Promise<JobPosition[]>;
  getJobPositionBySlug(slug: string): Promise<JobPosition | undefined>;
  createJobPosition(position: InsertJobPosition): Promise<JobPosition>;
  updateJobPosition(id: number, position: Partial<InsertJobPosition>): Promise<JobPosition>;
  deleteJobPosition(id: number): Promise<void>;
}

// Implementation using PostgreSQL with Drizzle ORM
export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Contact message methods
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [contactMessage] = await db.insert(contactMessages).values(message).returning();
    return contactMessage;
  }
  
  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }
  
  // Newsletter subscriber methods
  async createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber> {
    const [newSubscriber] = await db.insert(subscribers).values(subscriber).returning();
    return newSubscriber;
  }
  
  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    const [subscriber] = await db.select().from(subscribers).where(eq(subscribers.email, email));
    return subscriber;
  }
  
  async updateSubscriberStatus(id: number, subscribed: boolean): Promise<Subscriber> {
    const [updatedSubscriber] = await db
      .update(subscribers)
      .set({ subscribed, updatedAt: new Date() })
      .where(eq(subscribers.id, id))
      .returning();
    return updatedSubscriber;
  }
  
  // Technology methods
  async getTechnologies(): Promise<Technology[]> {
    return await db.select().from(technologies).orderBy(technologies.displayOrder);
  }
  
  async getTechnologyBySlug(slug: string): Promise<Technology | undefined> {
    const [technology] = await db.select().from(technologies).where(eq(technologies.slug, slug));
    return technology;
  }
  
  async createTechnology(technology: InsertTechnology): Promise<Technology> {
    const [newTechnology] = await db.insert(technologies).values(technology).returning();
    return newTechnology;
  }
  
  async updateTechnology(id: number, technology: Partial<InsertTechnology>): Promise<Technology> {
    const [updatedTechnology] = await db
      .update(technologies)
      .set({ ...technology, updatedAt: new Date() })
      .where(eq(technologies.id, id))
      .returning();
    return updatedTechnology;
  }
  
  async deleteTechnology(id: number): Promise<void> {
    await db.delete(technologies).where(eq(technologies.id, id));
  }
  
  async getTechnologyFeatures(technologyId: number): Promise<TechnologyFeature[]> {
    return await db
      .select()
      .from(technologyFeatures)
      .where(eq(technologyFeatures.technologyId, technologyId))
      .orderBy(technologyFeatures.displayOrder);
  }
  
  async getTechnologySpecs(technologyId: number): Promise<TechnologySpec[]> {
    return await db
      .select()
      .from(technologySpecs)
      .where(eq(technologySpecs.technologyId, technologyId))
      .orderBy(technologySpecs.displayOrder);
  }
  
  async createTechnologyFeature(feature: InsertTechnologyFeature): Promise<TechnologyFeature> {
    const [newFeature] = await db.insert(technologyFeatures).values(feature).returning();
    return newFeature;
  }
  
  async createTechnologySpec(spec: InsertTechnologySpec): Promise<TechnologySpec> {
    const [newSpec] = await db.insert(technologySpecs).values(spec).returning();
    return newSpec;
  }
  
  // Product methods
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products).orderBy(products.displayOrder);
  }
  
  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    return product;
  }
  
  async getProductsByCategory(category: string): Promise<Product[]> {
    return await db
      .select()
      .from(products)
      .where(eq(products.category, category))
      .orderBy(products.displayOrder);
  }
  
  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }
  
  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product> {
    const [updatedProduct] = await db
      .update(products)
      .set({ ...product, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return updatedProduct;
  }
  
  async deleteProduct(id: number): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
  }
  
  async getProductFeatures(productId: number): Promise<ProductFeature[]> {
    return await db
      .select()
      .from(productFeatures)
      .where(eq(productFeatures.productId, productId))
      .orderBy(productFeatures.displayOrder);
  }
  
  async createProductFeature(feature: InsertProductFeature): Promise<ProductFeature> {
    const [newFeature] = await db.insert(productFeatures).values(feature).returning();
    return newFeature;
  }
  
  // Blog methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.publishDate));
  }
  
  async getFeaturedBlogPosts(limit: number = 3): Promise<BlogPost[]> {
    return await db
      .select()
      .from(blogPosts)
      .where(and(eq(blogPosts.published, true), eq(blogPosts.featured, true)))
      .orderBy(desc(blogPosts.publishDate))
      .limit(limit);
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db
      .select()
      .from(blogPosts)
      .where(and(eq(blogPosts.slug, slug), eq(blogPosts.published, true)));
    return post;
  }
  
  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    return await db
      .select()
      .from(blogPosts)
      .where(and(eq(blogPosts.category, category), eq(blogPosts.published, true)))
      .orderBy(desc(blogPosts.publishDate));
  }
  
  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }
  
  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost> {
    const [updatedPost] = await db
      .update(blogPosts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return updatedPost;
  }
  
  async deleteBlogPost(id: number): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }
  
  async getTags(): Promise<Tag[]> {
    return await db.select().from(tags);
  }
  
  async createTag(tag: InsertTag): Promise<Tag> {
    const [newTag] = await db.insert(tags).values(tag).returning();
    return newTag;
  }
  
  async getTagsByBlogPostId(blogPostId: number): Promise<Tag[]> {
    return await db
      .select({ 
        id: tags.id, 
        name: tags.name, 
        slug: tags.slug 
      })
      .from(tags)
      .innerJoin(blogPostsTags, eq(tags.id, blogPostsTags.tagId))
      .where(eq(blogPostsTags.blogPostId, blogPostId));
  }
  
  async addTagToBlogPost(blogPostId: number, tagId: number): Promise<void> {
    await db.insert(blogPostsTags).values({ blogPostId, tagId });
  }
  
  async removeTagFromBlogPost(blogPostId: number, tagId: number): Promise<void> {
    await db
      .delete(blogPostsTags)
      .where(and(
        eq(blogPostsTags.blogPostId, blogPostId),
        eq(blogPostsTags.tagId, tagId)
      ));
  }
  
  // Team member methods
  async getTeamMembers(): Promise<TeamMember[]> {
    return await db.select().from(teamMembers).orderBy(teamMembers.displayOrder);
  }
  
  async getFeaturedTeamMembers(): Promise<TeamMember[]> {
    return await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.featured, true))
      .orderBy(teamMembers.displayOrder);
  }
  
  async getTeamMemberById(id: number): Promise<TeamMember | undefined> {
    const [member] = await db.select().from(teamMembers).where(eq(teamMembers.id, id));
    return member;
  }
  
  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const [newMember] = await db.insert(teamMembers).values(member).returning();
    return newMember;
  }
  
  async updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember> {
    const [updatedMember] = await db
      .update(teamMembers)
      .set(member)
      .where(eq(teamMembers.id, id))
      .returning();
    return updatedMember;
  }
  
  async deleteTeamMember(id: number): Promise<void> {
    await db.delete(teamMembers).where(eq(teamMembers.id, id));
  }
  
  // Job position methods
  async getJobPositions(): Promise<JobPosition[]> {
    return await db.select().from(jobPositions).orderBy(desc(jobPositions.publishDate));
  }
  
  async getActiveJobPositions(): Promise<JobPosition[]> {
    return await db
      .select()
      .from(jobPositions)
      .where(eq(jobPositions.active, true))
      .orderBy(desc(jobPositions.publishDate));
  }
  
  async getJobPositionBySlug(slug: string): Promise<JobPosition | undefined> {
    const [position] = await db.select().from(jobPositions).where(eq(jobPositions.slug, slug));
    return position;
  }
  
  async createJobPosition(position: InsertJobPosition): Promise<JobPosition> {
    const [newPosition] = await db.insert(jobPositions).values(position).returning();
    return newPosition;
  }
  
  async updateJobPosition(id: number, position: Partial<InsertJobPosition>): Promise<JobPosition> {
    const [updatedPosition] = await db
      .update(jobPositions)
      .set({ ...position, updatedAt: new Date() })
      .where(eq(jobPositions.id, id))
      .returning();
    return updatedPosition;
  }
  
  async deleteJobPosition(id: number): Promise<void> {
    await db.delete(jobPositions).where(eq(jobPositions.id, id));
  }
}

// Use database storage instead of memory storage
export const storage = new DatabaseStorage();
