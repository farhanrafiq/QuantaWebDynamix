import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link, useParams } from 'wouter';
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
}

const BlogCategory: React.FC = () => {
  const { category } = useParams();
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [categoryPosts, setCategoryPosts] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const postsPerPage = 12;

  useEffect(() => {
    fetch('/data/qf-blogs.json')
      .then(res => res.json())
      .then(data => {
        setBlogData(data);
        const filtered = data.posts.filter((post: BlogPost) => 
          post.category === decodeURIComponent(category || '')
        );
        setCategoryPosts(filtered);
      })
      .catch(err => console.error('Failed to load blog data:', err));
  }, [category]);

  if (!blogData || !category) return <div>Loading...</div>;

  const decodedCategory = decodeURIComponent(category);
  const totalPages = Math.ceil(categoryPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = categoryPosts.slice(startIndex, startIndex + postsPerPage);

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
        {/* Header */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Breadcrumb */}
              <motion.div variants={itemVariants} className="mb-8">
                <Link href="/blog">
                  <Button variant="ghost" size="sm" className="text-electric-blue hover:bg-electric-blue/10 p-0">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                  </Button>
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-sm font-medium mb-8">
                  Category: {decodedCategory}
                </div>
              </motion.div>

              <motion.h1 
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
              >
                {decodedCategory} Articles
              </motion.h1>

              <motion.p 
                variants={itemVariants}
                className="text-xl text-neutral-300 mb-8"
              >
                {categoryPosts.length} articles in this category
              </motion.p>
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

        {/* Related Categories */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 variants={itemVariants} className="text-2xl font-bold text-white mb-8">
                Explore Other Categories
              </motion.h2>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
                {blogData.categories
                  .filter(cat => cat !== decodedCategory)
                  .slice(0, 8)
                  .map(cat => (
                    <Link key={cat} href={`/blog/category/${encodeURIComponent(cat)}`}>
                      <span className="px-4 py-2 bg-[#15171B]/80 border border-electric-blue/20 rounded-lg text-neutral-300 hover:border-electric-blue/40 hover:text-electric-blue transition-colors cursor-pointer">
                        {cat}
                      </span>
                    </Link>
                  ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogCategory;