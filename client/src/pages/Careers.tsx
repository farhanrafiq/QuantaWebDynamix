import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { openPositions } from "@/lib/constants";
import { Workflow, Users, Globe, Award } from "lucide-react";

const Careers = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const fadeInRight = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const fadeInLeft = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section id="careers" className="py-20 bg-neutral-50 dark:bg-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Join Our <span className="text-primary dark:text-accent">Team</span>
          </motion.h2>
          <motion.p 
            className="mt-4 max-w-3xl mx-auto text-lg text-neutral-700 dark:text-neutral-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Help us transform the future of infrastructure with cutting-edge materials science and AI technology.
          </motion.p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
          >
            {/* A modern office environment with engineers collaborating */}
            <img 
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800&h=600" 
              alt="QuantaFONS modern office with team collaboration" 
              className="rounded-lg shadow-xl mx-auto" 
            />
          </motion.div>
          <motion.div 
            className="mt-10 lg:mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInLeft}
          >
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">Why Work at QuantaFONS</h3>
            <div className="mt-6 space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 text-primary dark:text-accent">
                  <Workflow className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-neutral-900 dark:text-white">Cutting-Edge Workflow</h4>
                  <p className="mt-1 text-neutral-700 dark:text-neutral-300">
                    Work on technologies that are transforming the built environment with access to advanced research facilities.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 text-primary dark:text-accent">
                  <Users className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-neutral-900 dark:text-white">Collaborative Culture</h4>
                  <p className="mt-1 text-neutral-700 dark:text-neutral-300">
                    Join interdisciplinary teams where materials scientists, software engineers, and structural engineers collaborate daily.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 text-primary dark:text-accent">
                  <Globe className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-neutral-900 dark:text-white">Global Impact</h4>
                  <p className="mt-1 text-neutral-700 dark:text-neutral-300">
                    Our solutions are deployed in critical infrastructure projects across 12 countries, directly improving safety and sustainability.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 text-primary dark:text-accent">
                  <Award className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-neutral-900 dark:text-white">Growth & Development</h4>
                  <p className="mt-1 text-neutral-700 dark:text-neutral-300">
                    Continuous learning environment with conference attendance, publication support, and skill development programs.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Open Positions */}
        <div className="mt-20">
          <motion.h3 
            className="text-2xl font-bold text-center text-neutral-900 dark:text-white mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Open Positions
          </motion.h3>
          
          <motion.div 
            className="space-y-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {openPositions.map((job) => (
              <motion.div 
                key={job.id}
                className="bg-white dark:bg-neutral-700 rounded-lg shadow-md overflow-hidden"
                variants={fadeInUp}
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-neutral-900 dark:text-white">{job.title}</h4>
                      <p className="mt-1 text-primary dark:text-accent">{job.department} • {job.location}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary dark:bg-accent/20 dark:text-accent">
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-neutral-700 dark:text-neutral-300">
                    {job.description}
                  </p>
                  <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center">
                      <i className="ri-time-line text-neutral-500 dark:text-neutral-400"></i>
                      <span className="ml-2 text-sm text-neutral-500 dark:text-neutral-400">Posted {job.postedTime}</span>
                    </div>
                    <Link href={`/careers/${job.id}`} className="mt-4 sm:mt-0 inline-flex items-center text-primary dark:text-accent hover:text-primary/80 dark:hover:text-accent/80">
                      View Details <i className="ri-arrow-right-line ml-1"></i>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-primary hover:bg-primary/80 dark:bg-accent dark:hover:bg-accent/80">
              View All Openings <i className="ri-arrow-right-line ml-2"></i>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Careers;
