import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/constants";

const Blog = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section id="blog" className="py-20 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Blog & <span className="text-primary dark:text-accent">Research</span>
          </motion.h2>
          <motion.p 
            className="mt-4 max-w-3xl mx-auto text-lg text-neutral-700 dark:text-neutral-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Stay updated with our latest research findings, industry insights, and project case studies.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {blogPosts.map((post) => (
            <motion.div 
              key={post.id}
              className="bg-white dark:bg-neutral-700 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105"
              variants={fadeInUp}
            >
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-48 object-cover" 
              />
              <div className="p-6">
                <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                  <span>{post.category}</span>
                  <span className="mx-2">•</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{post.title}</h3>
                <p className="mt-3 text-neutral-700 dark:text-neutral-300">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex items-center">
                  <a href="#" className="text-primary dark:text-accent hover:text-primary/80 dark:hover:text-accent/80 inline-flex items-center">
                    Read Article <i className="ri-arrow-right-line ml-1"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Button className="bg-primary hover:bg-primary/80 dark:bg-accent dark:hover:bg-accent/80">
            View All Articles <i className="ri-arrow-right-line ml-2"></i>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
