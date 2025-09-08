import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon, Calendar, Clock, ArrowRight, Filter, X } from 'lucide-react';
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
}

interface BlogData {
  posts: BlogPost[];
  categories: string[];
  tags: string[];
}

const Search: React.FC = () => {
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  
  const resultsPerPage = 12;

  useEffect(() => {
    fetch('/data/qf-blogs.json')
      .then(res => res.json())
      .then(data => setBlogData(data))
      .catch(err => console.error('Failed to load blog data:', err));

    // Get search query from URL if present
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
      setSearchQuery(query);
      performSearch(query, 'All', []);
    }
  }, []);

  const performSearch = (query: string, category: string, tags: string[]) => {
    if (!blogData) return;

    setIsSearching(true);
    
    // Simulate search delay for better UX
    setTimeout(() => {
      let results = blogData.posts;

      // Filter by search query
      if (query.trim()) {
        const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
        results = results.filter(post => {
          const searchableText = `${post.title} ${post.excerpt} ${post.category} ${post.tags.join(' ')}`.toLowerCase();
          return searchTerms.some(term => searchableText.includes(term));
        });
      }

      // Filter by category
      if (category !== 'All') {
        results = results.filter(post => post.category === category);
      }

      // Filter by tags
      if (tags.length > 0) {
        results = results.filter(post => 
          tags.some(tag => post.tags.includes(tag))
        );
      }

      // Sort by relevance (featured first, then by date)
      results.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      });

      setSearchResults(results);
      setCurrentPage(1);
      setIsSearching(false);
    }, 300);
  };

  useEffect(() => {
    if (blogData) {
      performSearch(searchQuery, selectedCategory, selectedTags);
    }
  }, [searchQuery, selectedCategory, selectedTags, blogData]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedTags([]);
    setSearchQuery('');
  };

  if (!blogData) return <div>Loading...</div>;

  const totalPages = Math.ceil(searchResults.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const currentResults = searchResults.slice(startIndex, startIndex + resultsPerPage);

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
        {/* Search Header */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Search Articles
                </h1>
                <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                  Find technical insights, implementation guides, and industry expertise
                </p>
              </motion.div>

              {/* Search Bar */}
              <motion.div variants={itemVariants} className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search articles, topics, or technologies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-[#15171B]/80 backdrop-blur-xl border border-electric-blue/20 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-electric-blue/50 transition-colors"
                  />
                </div>
              </motion.div>

              {/* Active Filters */}
              {(selectedCategory !== 'All' || selectedTags.length > 0 || searchQuery) && (
                <motion.div variants={itemVariants} className="max-w-4xl mx-auto mb-8">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-neutral-400 text-sm">Active filters:</span>
                    
                    {selectedCategory !== 'All' && (
                      <div className="flex items-center gap-1 px-3 py-1 bg-electric-blue/10 border border-electric-blue/20 rounded-full text-electric-blue text-sm">
                        Category: {selectedCategory}
                        <button 
                          onClick={() => setSelectedCategory('All')}
                          className="ml-1 hover:bg-electric-blue/20 rounded"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    {selectedTags.map(tag => (
                      <div key={tag} className="flex items-center gap-1 px-3 py-1 bg-magenta/10 border border-magenta/20 rounded-full text-magenta text-sm">
                        {tag}
                        <button 
                          onClick={() => handleTagToggle(tag)}
                          className="ml-1 hover:bg-magenta/20 rounded"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-neutral-400 hover:text-white"
                    >
                      Clear all
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

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
                  {blogData.categories.slice(0, 8).map(category => (
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
                  <span className="text-white font-medium">Popular Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {blogData.tags.slice(0, 15).map(tag => (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        selectedTags.includes(tag)
                          ? 'bg-magenta text-white'
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

        {/* Search Results */}
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
                  {isSearching ? 'Searching...' : `${searchResults.length} Results`}
                </h2>
                {totalPages > 1 && (
                  <div className="text-neutral-400 text-sm">
                    Page {currentPage} of {totalPages}
                  </div>
                )}
              </motion.div>

              {isSearching ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="bg-[#15171B]/80 backdrop-blur-xl rounded-xl border border-electric-blue/20 overflow-hidden animate-pulse">
                      <div className="aspect-video bg-neutral-800"></div>
                      <div className="p-6 space-y-3">
                        <div className="h-4 bg-neutral-800 rounded w-3/4"></div>
                        <div className="h-4 bg-neutral-800 rounded w-1/2"></div>
                        <div className="h-16 bg-neutral-800 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : currentResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {currentResults.map((post) => (
                    <motion.div
                      key={post.id}
                      variants={itemVariants}
                      className="bg-[#15171B]/80 backdrop-blur-xl rounded-xl border border-electric-blue/20 hover:border-electric-blue/40 transition-all duration-300 overflow-hidden group"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="aspect-video bg-gradient-to-br from-electric-blue/10 to-magenta/10"></div>
                      
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Link href={`/blog/category/${encodeURIComponent(post.category)}`}>
                            <span className="px-3 py-1 bg-electric-blue/10 border border-electric-blue/20 rounded-full text-electric-blue text-xs font-medium hover:bg-electric-blue/20 transition-colors cursor-pointer">
                              {post.category}
                            </span>
                          </Link>
                          {post.featured && (
                            <span className="px-3 py-1 bg-magenta/10 border border-magenta/20 rounded-full text-magenta text-xs font-medium">
                              Featured
                            </span>
                          )}
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
                            <Link key={tag} href={`/blog/tag/${tag}`}>
                              <span className="px-2 py-1 bg-neutral-800 text-neutral-400 text-xs rounded hover:bg-electric-blue/10 hover:text-electric-blue transition-colors cursor-pointer">
                                {tag}
                              </span>
                            </Link>
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
              ) : (
                <motion.div variants={itemVariants} className="text-center py-16">
                  <SearchIcon className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-4">No results found</h3>
                  <p className="text-neutral-400 mb-8">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                  <Button onClick={clearFilters} className="bg-electric-blue hover:bg-electric-blue/80">
                    Clear all filters
                  </Button>
                </motion.div>
              )}

              {/* Pagination */}
              {totalPages > 1 && !isSearching && (
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

export default Search;