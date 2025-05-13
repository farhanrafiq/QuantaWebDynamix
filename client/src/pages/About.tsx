import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const About = () => {
  // Animation controls
  const storyRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true, amount: 0.3 });
  const storyControls = useAnimation();
  
  const teamRef = useRef(null);
  const teamInView = useInView(teamRef, { once: true, amount: 0.3 });
  const teamControls = useAnimation();

  // Animations
  useEffect(() => {
    if (storyInView) {
      storyControls.start("visible");
    }
    if (teamInView) {
      teamControls.start("visible");
    }
  }, [storyInView, teamInView, storyControls, teamControls]);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };
  
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
        staggerChildren: 0.2
      }
    }
  };

  return (
    <>
      <section id="about" className="py-16 bg-neutral-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              About <span className="text-primary dark:text-accent">QuantaFONS</span>
            </motion.h2>
            <motion.p 
              className="mt-4 max-w-3xl mx-auto text-lg text-neutral-700 dark:text-neutral-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Founded in 2012, we bring cutting-edge materials science and artificial intelligence to solve the most challenging problems in infrastructure.
            </motion.p>
          </div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              ref={storyRef}
              initial="hidden"
              animate={storyControls}
              variants={fadeInRight}
            >
              {/* A team of engineers discussing a project in a modern lab setting */}
              <img 
                src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800&h=600" 
                alt="QuantaFONS engineering team collaborating" 
                className="rounded-lg shadow-xl mx-auto" 
              />
            </motion.div>
            <motion.div 
              className="mt-10 lg:mt-0"
              ref={storyRef}
              initial="hidden"
              animate={storyControls}
              variants={fadeInLeft}
            >
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">Our Story</h3>
              <p className="mt-4 text-neutral-700 dark:text-neutral-300">
                QuantaFONS was born from a vision to transform how we build and maintain critical infrastructure. What started as a research project at the Materials Engineering Department has grown into a global leader in advanced construction materials and structural health monitoring.
              </p>
              
              <h3 className="mt-8 text-2xl font-bold text-neutral-900 dark:text-white">Our Mission</h3>
              <p className="mt-4 text-neutral-700 dark:text-neutral-300">
                We are committed to developing sustainable solutions that extend infrastructure lifespan, reduce maintenance costs, and enhance safety through predictive analytics and advanced materials.
              </p>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-neutral-700 p-4 rounded-lg shadow">
                  <h4 className="font-semibold text-primary dark:text-accent">Innovation</h4>
                  <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">Pushing boundaries with nanotechnology and AI-driven analytics</p>
                </div>
                <div className="bg-white dark:bg-neutral-700 p-4 rounded-lg shadow">
                  <h4 className="font-semibold text-primary dark:text-accent">Excellence</h4>
                  <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">Delivering uncompromising quality in materials and solutions</p>
                </div>
                <div className="bg-white dark:bg-neutral-700 p-4 rounded-lg shadow">
                  <h4 className="font-semibold text-primary dark:text-accent">Sustainability</h4>
                  <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">Creating eco-friendly products that reduce environmental impact</p>
                </div>
                <div className="bg-white dark:bg-neutral-700 p-4 rounded-lg shadow">
                  <h4 className="font-semibold text-primary dark:text-accent">Collaboration</h4>
                  <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">Working closely with clients to solve complex engineering challenges</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Team Section */}
          <div className="mt-24">
            <motion.h3 
              className="text-2xl font-bold text-center text-neutral-900 dark:text-white mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Leadership Team
            </motion.h3>
            
            <motion.div 
              ref={teamRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate={teamControls}
            >
              {/* Team Member 1 */}
              <motion.div 
                className="bg-white dark:bg-neutral-700 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105"
                variants={fadeInUp}
              >
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=400&h=400" 
                  alt="Dr. Robert Chen, Founder & CEO" 
                  className="w-full h-64 object-cover" 
                />
                <div className="p-4">
                  <h4 className="font-semibold text-neutral-900 dark:text-white">Dr. Robert Chen</h4>
                  <p className="text-primary dark:text-accent text-sm">Founder & CEO</p>
                  <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">Ph.D. in Materials Science from MIT with 15+ years in advanced materials research.</p>
                  <div className="mt-3">
                    <a href="#" className="text-primary dark:text-accent hover:text-primary/80 dark:hover:text-accent/80">
                      <i className="ri-linkedin-box-fill text-xl"></i>
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Team Member 2 */}
              <motion.div 
                className="bg-white dark:bg-neutral-700 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105"
                variants={fadeInUp}
              >
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=400&h=400" 
                  alt="Dr. Sarah Nguyen, CTO" 
                  className="w-full h-64 object-cover" 
                />
                <div className="p-4">
                  <h4 className="font-semibold text-neutral-900 dark:text-white">Dr. Sarah Nguyen</h4>
                  <p className="text-primary dark:text-accent text-sm">Chief Technology Officer</p>
                  <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">Former lead researcher at DARPA with expertise in structural health monitoring systems.</p>
                  <div className="mt-3">
                    <a href="#" className="text-primary dark:text-accent hover:text-primary/80 dark:hover:text-accent/80">
                      <i className="ri-linkedin-box-fill text-xl"></i>
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Team Member 3 */}
              <motion.div 
                className="bg-white dark:bg-neutral-700 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105"
                variants={fadeInUp}
              >
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=400&h=400" 
                  alt="Dr. Vikram Patel, Head of R&D" 
                  className="w-full h-64 object-cover" 
                />
                <div className="p-4">
                  <h4 className="font-semibold text-neutral-900 dark:text-white">Dr. Vikram Patel</h4>
                  <p className="text-primary dark:text-accent text-sm">Head of R&D</p>
                  <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">Pioneering researcher in nano-enhanced concrete admixtures with 28 patents.</p>
                  <div className="mt-3">
                    <a href="#" className="text-primary dark:text-accent hover:text-primary/80 dark:hover:text-accent/80">
                      <i className="ri-linkedin-box-fill text-xl"></i>
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Team Member 4 */}
              <motion.div 
                className="bg-white dark:bg-neutral-700 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105"
                variants={fadeInUp}
              >
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=400&h=400" 
                  alt="Emma Richardson, COO" 
                  className="w-full h-64 object-cover" 
                />
                <div className="p-4">
                  <h4 className="font-semibold text-neutral-900 dark:text-white">Emma Richardson</h4>
                  <p className="text-primary dark:text-accent text-sm">Chief Operations Officer</p>
                  <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">MBA from Stanford with extensive experience scaling technology companies globally.</p>
                  <div className="mt-3">
                    <a href="#" className="text-primary dark:text-accent hover:text-primary/80 dark:hover:text-accent/80">
                      <i className="ri-linkedin-box-fill text-xl"></i>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
