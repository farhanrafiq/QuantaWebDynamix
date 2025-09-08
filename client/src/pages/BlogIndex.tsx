import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Search, Calendar, Clock, ArrowRight, Filter, Tag } from 'lucide-react';
import { Link } from 'wouter';
import ParticleBackground from '@/components/ParticleBackground';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishDate: string;
  readingTime: number;
  featured: boolean;
  coverImage: string;
}

interface BlogData {
  posts: BlogPost[];
  categories: string[];
  tags: string[];
}

const BlogIndex: React.FC = () => {
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const postsPerPage = 12;

  useEffect(() => {
    fetch('/data/qf-blogs.json')
      .then(res => res.json())
      .then(data => {
        setBlogData(data);
        setFilteredPosts(data.posts);
      })
      .catch(err => console.error('Failed to load blog data:', err));
  }, []);

  useEffect(() => {
    if (!blogData) return;

    let filtered = blogData.posts;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post => 
        selectedTags.some(tag => post.tags.includes(tag))
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [selectedCategory, selectedTags, searchQuery, blogData]);

  if (!blogData) return <div>Loading...</div>;

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);
  const featuredPosts = blogData.posts.filter(post => post.featured).slice(0, 3);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0B0F] via-[#1A1B23] to-[#0A0B0F] relative overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 opacity-20">
        <ParticleBackground color="#0099ff" count={30} density={60} />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-sm font-medium mb-8">
                  <Search className="w-4 h-4 mr-2" />
                  Knowledge Base
                </div>
              </motion.div>

              <motion.h1 
                variants={itemVariants}
                className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight"
              >
                AI & Engineering Insights
              </motion.h1>

              <motion.p 
                variants={itemVariants}
                className="text-xl text-neutral-300 mb-12 max-w-3xl mx-auto"
              >
                Deep technical articles, implementation guides, and industry insights from our AI and engineering teams
              </motion.p>

              {/* Search Bar */}
              <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search articles, topics, or technologies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-[#15171B]/80 backdrop-blur-xl border border-electric-blue/20 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-electric-blue/50 transition-colors"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.h2 
                  variants={itemVariants}
                  className="text-3xl font-bold text-white mb-8"
                >
                  Featured Articles
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {featuredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      variants={itemVariants}
                      className="bg-[#15171B]/80 backdrop-blur-xl rounded-xl border border-electric-blue/20 hover:border-electric-blue/40 transition-all duration-300 overflow-hidden group"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="aspect-video bg-gradient-to-br from-electric-blue/20 to-magenta/20 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-6xl font-bold text-white/20">{index + 1}</span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 bg-electric-blue/10 border border-electric-blue/20 rounded-full text-electric-blue text-xs font-medium">
                            {post.category}
                          </span>
                          <span className="text-neutral-400 text-sm">Featured</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-electric-blue transition-colors">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>
                        
                        <p className="text-neutral-300 text-sm mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-neutral-400">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(post.publishDate).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {post.readingTime} min
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Filters */}
        <section className="pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Category Filter */}
              <motion.div variants={itemVariants} className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-5 h-5 text-electric-blue" />
                  <span className="text-white font-medium">Categories</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === 'All'
                        ? 'bg-electric-blue text-white'
                        : 'bg-[#15171B]/80 border border-electric-blue/20 text-neutral-300 hover:border-electric-blue/40'
                    }`}
                  >
                    All Categories
                  </button>
                  {blogData.categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-electric-blue text-white'
                          : 'bg-[#15171B]/80 border border-electric-blue/20 text-neutral-300 hover:border-electric-blue/40'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Popular Tags */}
              <motion.div variants={itemVariants}>
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5 text-electric-blue" />
                  <span className="text-white font-medium">Popular Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {blogData.tags.slice(0, 15).map(tag => (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        selectedTags.includes(tag)
                          ? 'bg-electric-blue text-white'
                          : 'bg-[#15171B]/80 border border-electric-blue/20 text-neutral-300 hover:border-electric-blue/40'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">
                  All Articles ({filteredPosts.length})
                </h2>
                <div className="text-neutral-400 text-sm">
                  Page {currentPage} of {totalPages}
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {currentPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    variants={itemVariants}
                    className="bg-[#15171B]/80 backdrop-blur-xl rounded-xl border border-electric-blue/20 hover:border-electric-blue/40 transition-all duration-300 overflow-hidden group"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className="aspect-video bg-gradient-to-br from-electric-blue/10 to-magenta/10"></div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-electric-blue/10 border border-electric-blue/20 rounded-full text-electric-blue text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-electric-blue transition-colors line-clamp-2">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>
                      
                      <p className="text-neutral-300 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-neutral-400 mb-4">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.publishDate).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readingTime} min
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 3).map(tag => (
                          <span 
                            key={tag}
                            className="px-2 py-1 bg-neutral-800 text-neutral-400 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link href={`/blog/${post.slug}`}>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-electric-blue hover:bg-electric-blue/10 p-0 h-auto font-medium group"
                        >
                          Read More
                          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div variants={itemVariants} className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="border-electric-blue/30 text-electric-blue hover:bg-electric-blue/10"
                  >
                    Previous
                  </Button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page 
                          ? "bg-electric-blue text-white" 
                          : "border-electric-blue/30 text-electric-blue hover:bg-electric-blue/10"
                        }
                      >
                        {page}
                      </Button>
                    );
                  })}
                  
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="border-electric-blue/30 text-electric-blue hover:bg-electric-blue/10"
                  >
                    Next
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogIndex;