import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { 
  ArrowRight, 
  Calendar, 
  User, 
  Tag, 
  ChevronRight, 
  ChevronLeft, 
  Search,
  BookOpen
} from "lucide-react";

// Define interfaces for blog data types
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  tags: string[];
}

interface BlogCategory {
  name: string;
  count: number;
}

// Blog Post Card component
const BlogPostCard = ({ post }: { post: BlogPost }) => {
  return (
    <motion.div
      className="bg-[#15171B] border border-electric-blue/10 rounded-xl overflow-hidden group hover:border-electric-blue/30 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <div className="h-56 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-electric-blue/20 to-[#15171B]/80 z-10"></div>
        
        <div className="w-full h-full bg-[#0D0F12] relative">
          {/* SVG image placeholder */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-electric-blue/30"
          >
            {post.category === "research" ? (
              <>
                <rect x="50" y="50" width="300" height="200" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" fill="none" />
                <circle cx="200" cy="150" r="50" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M160,200 Q200,240 240,200" stroke="currentColor" strokeWidth="2" fill="none" />
              </>
            ) : post.category === "technology" ? (
              <>
                <circle cx="200" cy="150" r="100" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M130,150 L270,150 M200,80 L200,220" stroke="currentColor" strokeWidth="2" fill="none" />
                <circle cx="200" cy="150" r="40" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="5 5" />
              </>
            ) : (
              <>
                <polygon points="200,50 300,150 200,250 100,150" stroke="currentColor" strokeWidth="2" fill="none" />
                <line x1="100" y1="150" x2="300" y2="150" stroke="currentColor" strokeWidth="2" />
                <line x1="200" y1="50" x2="200" y2="250" stroke="currentColor" strokeWidth="2" />
              </>
            )}
          </svg>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-sm text-electric-blue mb-3 gap-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            <span>{post.author}</span>
          </div>
        </div>
        
        <h3 className="text-white text-xl font-bold mb-3 line-clamp-2 group-hover:text-electric-blue transition-colors duration-300">
          {post.title}
        </h3>
        
        <p className="text-neutral-400 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
            {post.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="text-xs bg-electric-blue/10 text-electric-blue px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
            {post.tags.length > 2 && (
              <span className="text-xs bg-electric-blue/10 text-electric-blue px-2 py-1 rounded-full">
                +{post.tags.length - 2}
              </span>
            )}
          </div>
          
          <div className="text-electric-blue hover:underline cursor-pointer flex items-center">
            Read More <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Featured Post component
const FeaturedPost = ({ post }: { post: BlogPost }) => {
  return (
    <motion.div
      className="bg-[#15171B] rounded-xl overflow-hidden group relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="md:flex h-full">
        <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#15171B]/0 to-[#15171B] z-10 md:bg-gradient-to-r md:from-electric-blue/20 md:to-[#15171B]/80"></div>
          
          <div className="w-full h-full bg-[#0D0F12] relative">
            {/* SVG image placeholder */}
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-electric-blue/30"
            >
              <circle cx="200" cy="150" r="100" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M130,150 L270,150 M200,80 L200,220" stroke="currentColor" strokeWidth="2" fill="none" />
              <circle cx="200" cy="150" r="40" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="5 5" />
            </svg>
          </div>
        </div>
        
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <div className="text-electric-blue text-sm font-bold mb-1">FEATURED POST</div>
          
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-4 group-hover:text-electric-blue transition-colors duration-300">
            {post.title}
          </h2>
          
          <div className="flex items-center text-sm text-electric-blue mb-4 gap-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>{post.author}</span>
            </div>
          </div>
          
          <p className="text-neutral-400 mb-6">
            {post.excerpt}
          </p>
          
          <div className="flex gap-2 mb-6">
            {post.tags.map((tag, index) => (
              <span key={index} className="text-xs bg-electric-blue/10 text-electric-blue px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          
          <Button className="bg-electric-blue hover:bg-electric-blue/80 text-white w-fit">
            Read Full Article
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Blog Main component
const Blog = () => {
  // State for search input
  const [searchQuery, setSearchQuery] = useState("");
  
  // State for current category filter
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Demo blog data
  const featuredPost: BlogPost = {
    id: 1,
    title: "Quantum-Level Sensing in Fiber Optic Structural Monitoring",
    excerpt: "Our latest research breakthrough extends the sensitivity of fiber optic structural health monitoring systems to unprecedented levels, enabling detection of structural changes at near-quantum scales.",
    content: "",
    author: "Dr. Rajiv Mehta",
    date: "May 1, 2024",
    image: "",
    category: "research",
    tags: ["Fiber Optics", "Quantum Sensing", "SHM"]
  };
  
  const blogPosts: BlogPost[] = [
    {
      id: 2,
      title: "Novel PTFE-Based Waterproofing Systems for Critical Infrastructure",
      excerpt: "Discover how our advanced PTFE-based waterproofing solutions extend infrastructure lifespan by up to 50 years while reducing maintenance costs.",
      content: "",
      author: "Dr. Amit Sharma",
      date: "April 15, 2024",
      image: "",
      category: "technology",
      tags: ["Waterproofing", "PTFE", "Infrastructure"]
    },
    {
      id: 3,
      title: "Digital Twin Modeling for Urban Infrastructure: Challenges and Opportunities",
      excerpt: "Exploring the potential of digital twin technology in predicting and managing urban infrastructure challenges before they manifest physically.",
      content: "",
      author: "Dr. Priya Patel",
      date: "March 28, 2024",
      image: "",
      category: "research",
      tags: ["Digital Twin", "Urban Infrastructure", "AI"]
    },
    {
      id: 4,
      title: "The Future of Concrete: Nano-Enhanced Admixtures",
      excerpt: "How our revolutionary nano-enhanced admixtures are changing the properties of concrete to meet the demands of 21st-century infrastructure projects.",
      content: "",
      author: "Ananya Singh",
      date: "March 10, 2024",
      image: "",
      category: "technology",
      tags: ["Concrete", "Nanomaterials", "Admixtures"]
    },
    {
      id: 5,
      title: "AI-Driven Structural Health Monitoring: A Comprehensive Review",
      excerpt: "A deep dive into how artificial intelligence is transforming structural health monitoring from simple data collection to predictive maintenance.",
      content: "",
      author: "Dr. Rajiv Mehta",
      date: "February 22, 2024",
      image: "",
      category: "research",
      tags: ["AI", "SHM", "Predictive Maintenance"]
    },
    {
      id: 6,
      title: "Acoustic Analysis for Early Crack Detection in Concrete Structures",
      excerpt: "Our acoustic analysis technology can detect micro-fractures in concrete up to two years before they become visible, enabling preventive maintenance.",
      content: "",
      author: "Ananya Singh",
      date: "February 8, 2024",
      image: "",
      category: "technology",
      tags: ["Acoustic Analysis", "Crack Detection", "Concrete"]
    }
  ];
  
  // Demo categories
  const categories: BlogCategory[] = [
    { name: "all", count: blogPosts.length + 1 },
    { name: "research", count: blogPosts.filter(post => post.category === "research").length + 1 },
    { name: "technology", count: blogPosts.filter(post => post.category === "technology").length },
    { name: "case studies", count: 0 },
    { name: "news", count: 0 }
  ];
  
  // Filter posts based on search query and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="bg-[#0D0F12] min-h-screen">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 right-0 w-96 h-96 bg-electric-blue/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-magenta/5 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Our <span className="text-electric-blue">Research</span> & Insights
            </motion.h1>
            
            <motion.p 
              className="text-lg text-neutral-300 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover the latest breakthroughs, research, and innovations from our team of experts in civil engineering,
              materials science, and artificial intelligence.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Search and Filter Section */}
      <section className="py-6 bg-[#0A0C10]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              {/* Search */}
              <div className="relative md:w-1/3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-electric-blue" />
                </div>
                <input
                  type="text"
                  className="bg-[#15171B] border border-electric-blue/20 rounded-lg pl-10 pr-4 py-3 w-full text-white focus:outline-none focus:border-electric-blue transition-colors duration-200"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      activeCategory === category.name
                        ? "bg-electric-blue text-white"
                        : "bg-[#15171B] text-white hover:bg-electric-blue/20"
                    }`}
                    onClick={() => setActiveCategory(category.name)}
                  >
                    {category.name.charAt(0).toUpperCase() + category.name.slice(1)} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Post Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-2xl font-bold text-white mb-6 relative inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Featured Article
              <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-electric-blue"></span>
            </motion.h2>
            
            <FeaturedPost post={featuredPost} />
          </div>
        </div>
      </section>
      
      {/* Latest Posts Section */}
      <section className="py-16 bg-[#0A0C10]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-end mb-6">
              <motion.h2
                className="text-2xl font-bold text-white relative inline-block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Latest Articles
                <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-electric-blue"></span>
              </motion.h2>
              
              <div className="flex gap-2">
                {/* Pagination (demo only) */}
                <button className="p-2 bg-[#15171B] rounded-lg text-white hover:bg-electric-blue/20 transition-colors duration-200">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button className="p-2 bg-[#15171B] rounded-lg text-white hover:bg-electric-blue/20 transition-colors duration-200">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="bg-[#15171B] p-8 rounded-xl text-center">
                <BookOpen className="h-12 w-12 text-electric-blue/30 mx-auto mb-4" />
                <h3 className="text-white text-xl font-bold mb-2">No articles found</h3>
                <p className="text-neutral-400">
                  We couldn't find any articles matching your search criteria. Please try a different search or category.
                </p>
                <Button 
                  className="bg-electric-blue hover:bg-electric-blue/80 text-white mt-6"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
            
            {/* Pagination (Simple demo version) */}
            {filteredPosts.length > 0 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#15171B] text-white hover:bg-electric-blue/20 transition-colors duration-200">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  
                  <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-electric-blue text-white">
                    1
                  </button>
                  
                  <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#15171B] text-white hover:bg-electric-blue/20 transition-colors duration-200">
                    2
                  </button>
                  
                  <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#15171B] text-white hover:bg-electric-blue/20 transition-colors duration-200">
                    3
                  </button>
                  
                  <span className="text-neutral-400 px-2">...</span>
                  
                  <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#15171B] text-white hover:bg-electric-blue/20 transition-colors duration-200">
                    8
                  </button>
                  
                  <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#15171B] text-white hover:bg-electric-blue/20 transition-colors duration-200">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Topics Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-2xl font-bold text-white mb-8 relative inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Popular Topics
              <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-electric-blue"></span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                className="bg-[#15171B] p-6 rounded-xl border border-electric-blue/10 hover:border-electric-blue/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="p-4 bg-electric-blue/10 rounded-xl inline-block mb-4 text-electric-blue">
                  <svg 
                    width="40" 
                    height="40" 
                    viewBox="0 0 40 40" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-electric-blue"
                  >
                    <rect x="5" y="5" width="30" height="30" rx="15" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M15,20 L25,20 M20,15 L20,25" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <h3 className="text-white text-xl font-bold mb-2">Waterproofing Technologies</h3>
                <p className="text-neutral-400 mb-4">
                  Latest developments in advanced waterproofing systems for critical infrastructure.
                </p>
                <div className="flex items-center text-electric-blue hover:underline cursor-pointer">
                  View Articles <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </motion.div>
              
              <motion.div
                className="bg-[#15171B] p-6 rounded-xl border border-electric-blue/10 hover:border-electric-blue/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="p-4 bg-electric-blue/10 rounded-xl inline-block mb-4 text-electric-blue">
                  <svg 
                    width="40" 
                    height="40" 
                    viewBox="0 0 40 40" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-electric-blue"
                  >
                    <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M12,20 Q20,10 28,20 Q20,30 12,20" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </div>
                <h3 className="text-white text-xl font-bold mb-2">Structural Health Monitoring</h3>
                <p className="text-neutral-400 mb-4">
                  AI-driven systems for real-time monitoring and predictive maintenance of infrastructure.
                </p>
                <div className="flex items-center text-electric-blue hover:underline cursor-pointer">
                  View Articles <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </motion.div>
              
              <motion.div
                className="bg-[#15171B] p-6 rounded-xl border border-electric-blue/10 hover:border-electric-blue/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="p-4 bg-electric-blue/10 rounded-xl inline-block mb-4 text-electric-blue">
                  <svg 
                    width="40" 
                    height="40" 
                    viewBox="0 0 40 40" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-electric-blue"
                  >
                    <polygon points="20,5 35,15 35,25 20,35 5,25 5,15" stroke="currentColor" strokeWidth="2" fill="none" />
                    <circle cx="20" cy="20" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </div>
                <h3 className="text-white text-xl font-bold mb-2">Nano-Enhanced Materials</h3>
                <p className="text-neutral-400 mb-4">
                  How nanotechnology is transforming the properties and performance of construction materials.
                </p>
                <div className="flex items-center text-electric-blue hover:underline cursor-pointer">
                  View Articles <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-electric-blue/20 to-magenta/20 relative">
        <div className="absolute inset-0 bg-[#0D0F12] opacity-90"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Subscribe to Our Research Newsletter
            </motion.h2>
            
            <motion.p 
              className="text-lg text-neutral-300 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Stay updated with our latest research, innovations, and industry insights. 
              Delivered monthly to your inbox.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="max-w-md mx-auto"
            >
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-[#0A0C10] border border-electric-blue/20 rounded-lg p-3 text-white focus:outline-none focus:border-electric-blue transition-colors duration-200"
                  required
                />
                <Button className="bg-electric-blue hover:bg-electric-blue/80 text-white whitespace-nowrap">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
              <p className="text-sm text-neutral-500 mt-4">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from QuantaFONS.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Footer is handled by the RootLayout component */}
    </div>
  );
};

export default Blog;