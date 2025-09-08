import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Calendar, Clock, Share2, Tag, User } from 'lucide-react';
import { Link, useParams } from 'wouter';
import ParticleBackground from '@/components/ParticleBackground';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishDate: string;
  readingTime: number;
  author: string;
  relatedPosts: Array<{
    title: string;
    slug: string;
  }>;
}

interface BlogData {
  posts: BlogPost[];
}

const BlogPost: React.FC = () => {
  const { slug } = useParams();
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [tableOfContents, setTableOfContents] = useState<Array<{ id: string; title: string; level: number }>>([]);

  useEffect(() => {
    fetch('/data/qf-blogs.json')
      .then(res => res.json())
      .then(data => {
        setBlogData(data);
        const foundPost = data.posts.find((p: BlogPost) => p.slug === slug);
        if (foundPost) {
          setPost(foundPost);
          generateTableOfContents(foundPost.content);
        }
      })
      .catch(err => console.error('Failed to load blog data:', err));
  }, [slug]);

  const generateTableOfContents = (content: string) => {
    const headers = content.match(/^#{2,3}\s+.+$/gm) || [];
    const toc = headers.map((header, index) => {
      const level = header.match(/^#{2,3}/)?.[0].length || 2;
      const title = header.replace(/^#{2,3}\s+/, '');
      const id = `heading-${index}`;
      return { id, title, level };
    });
    setTableOfContents(toc);
  };

  const formatContent = (content: string) => {
    return content
      .replace(/^#{2}\s+(.+)$/gm, (match, title, offset, string) => {
        const index = tableOfContents.findIndex(item => item.title === title);
        const id = index >= 0 ? tableOfContents[index].id : `heading-${Math.random()}`;
        return `<h2 id="${id}" class="text-3xl font-bold text-white mb-6 mt-12">${title}</h2>`;
      })
      .replace(/^#{3}\s+(.+)$/gm, (match, title, offset, string) => {
        const index = tableOfContents.findIndex(item => item.title === title);
        const id = index >= 0 ? tableOfContents[index].id : `heading-${Math.random()}`;
        return `<h3 id="${id}" class="text-2xl font-semibold text-white mb-4 mt-8">${title}</h3>`;
      })
      .replace(/^```(\w+)?\n([\s\S]*?)```$/gm, (match, lang, code) => {
        return `<div class="bg-[#0D1117] border border-electric-blue/20 rounded-lg p-6 my-6 overflow-x-auto">
          <pre class="text-sm text-neutral-300"><code>${code.trim()}</code></pre>
        </div>`;
      })
      .replace(/^(.+)$/gm, (match) => {
        if (match.startsWith('<h') || match.startsWith('<div') || match.trim() === '') return match;
        return `<p class="text-neutral-300 leading-relaxed mb-6">${match}</p>`;
      });
  };

  const handleShare = () => {
    if (navigator.share && post) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Could add a toast notification here
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!blogData || !post) return <div>Loading...</div>;

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
        <ParticleBackground color="#0099ff" count={20} density={40} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
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

              {/* Article Header */}
              <motion.div variants={itemVariants} className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-electric-blue/10 border border-electric-blue/20 rounded-full text-electric-blue text-sm font-medium">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-4 text-sm text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.publishDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readingTime} min read
                    </span>
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {post.title}
                </h1>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-electric-blue/10 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-electric-blue" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{post.author}</p>
                      <p className="text-neutral-400 text-sm">Technical Team</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="border-electric-blue/30 text-electric-blue hover:bg-electric-blue/10"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Table of Contents */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="lg:col-span-1"
              >
                <motion.div variants={itemVariants} className="sticky top-8">
                  <div className="bg-[#15171B]/80 backdrop-blur-xl rounded-xl p-6 border border-electric-blue/20">
                    <h3 className="text-lg font-semibold text-white mb-4">Table of Contents</h3>
                    <nav className="space-y-2">
                      {tableOfContents.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => scrollToSection(item.id)}
                          className={`block w-full text-left text-sm text-neutral-400 hover:text-electric-blue transition-colors ${
                            item.level === 3 ? 'pl-4' : ''
                          }`}
                        >
                          {item.title}
                        </button>
                      ))}
                    </nav>
                  </div>
                </motion.div>
              </motion.div>

              {/* Article Content */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="lg:col-span-3"
              >
                <motion.article variants={itemVariants} className="prose prose-invert prose-lg max-w-none">
                  <div 
                    className="qf-content"
                    dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
                  />
                </motion.article>

                {/* Tags */}
                <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-electric-blue/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-5 h-5 text-electric-blue" />
                    <span className="text-white font-medium">Tags</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <Link key={tag} href={`/blog/tag/${tag}`}>
                        <span className="px-3 py-1 bg-[#15171B]/80 border border-electric-blue/20 rounded-full text-neutral-300 hover:border-electric-blue/40 hover:text-electric-blue transition-colors text-sm cursor-pointer">
                          {tag}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {post.relatedPosts.length > 0 && (
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.h2 variants={itemVariants} className="text-3xl font-bold text-white mb-8">
                  Related Articles
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {post.relatedPosts.map((relatedPost, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="bg-[#15171B]/80 backdrop-blur-xl rounded-xl p-6 border border-electric-blue/20 hover:border-electric-blue/40 transition-all duration-300 group"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-electric-blue transition-colors line-clamp-2">
                        <Link href={`/blog/${relatedPost.slug}`}>
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-electric-blue hover:bg-electric-blue/10 p-0 h-auto font-medium group"
                        >
                          Read More
                          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className="bg-[#15171B]/80 backdrop-blur-xl rounded-xl p-8 border border-electric-blue/20">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Stay Updated with AI & Engineering Insights
                </h3>
                <p className="text-neutral-300 mb-6">
                  Get the latest technical articles and implementation guides delivered to your inbox
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-[#0A0B0F] border border-electric-blue/20 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-electric-blue/50"
                  />
                  <Button className="bg-electric-blue hover:bg-electric-blue/80 text-white px-6 py-3 rounded-lg">
                    Subscribe
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogPost;