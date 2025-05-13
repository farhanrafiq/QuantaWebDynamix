import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";

const Technologies = () => {
  // State to track expanded details sections
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleExpandSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

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
  
  return (
    <section id="technologies" className="py-20 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Our <span className="text-primary dark:text-accent">Technologies</span>
          </motion.h2>
          <motion.p 
            className="mt-4 max-w-3xl mx-auto text-lg text-neutral-700 dark:text-neutral-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover the innovative technologies that set QuantaFONS apart from traditional engineering solutions.
          </motion.p>
        </div>

        <div className="space-y-24">
          {/* PTFE Waterproofing */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
            >
              {/* A close-up of water beading on a hydrophobic concrete surface */}
              <img 
                src="https://pixabay.com/get/g123e9209893b09dd70223ae2211a857503a120e819be843027b2d99c4d323cfd1ec5c274ca0c53f1841b86d846e1a273462d6cec9e5b326a0b12de36ebb0f19d_1280.jpg" 
                alt="PTFE-based waterproofing system showing hydrophobic properties" 
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
              <h3 className="text-2xl font-bold text-primary dark:text-accent">PTFE-Based Waterproofing</h3>
              <p className="mt-4 text-neutral-700 dark:text-neutral-300">
                Our proprietary PTFE-based waterproofing technology creates a permanent hydrophobic barrier that integrates at the molecular level with concrete structures, preventing water penetration even under extreme pressure conditions.
              </p>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-success mt-1">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-neutral-900 dark:text-white">Molecular Integration</h4>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      Unlike surface coatings, our solution forms chemical bonds with concrete's calcium silicate hydrate.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-success mt-1">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-neutral-900 dark:text-white">Self-Healing Properties</h4>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      Incorporates nano-capsules that release additional waterproofing agents when microcracks form.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-success mt-1">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-neutral-900 dark:text-white">Extended Lifespan</h4>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      Provides 50+ years of protection, significantly reducing maintenance costs over time.
                    </p>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="link" 
                className="mt-8 text-primary dark:text-accent hover:text-primary/80 dark:hover:text-accent/80 p-0 h-auto"
                onClick={() => toggleExpandSection('ptfe-details')}
              >
                {expandedSection === 'ptfe-details' ? 'Show Less' : 'Learn More'} 
                <i className={`ri-arrow-right-line ml-1 ${expandedSection === 'ptfe-details' ? 'rotate-90' : ''} transition-transform`}></i>
              </Button>

              {expandedSection === 'ptfe-details' && (
                <motion.div 
                  className="mt-6 bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">Technical Specifications</h4>
                  <ul className="list-disc list-inside space-y-2 text-neutral-700 dark:text-neutral-300">
                    <li>Hydrostatic pressure resistance: Up to 12 bar</li>
                    <li>Water absorption reduction: 99.8%</li>
                    <li>Application methods: Admixture, surface spray, injection</li>
                    <li>Vapor permeability: Allows structure to breathe</li>
                    <li>Chemical resistance: Resists chlorides, sulfates, acids</li>
                    <li>Environmental compliance: VOC-free, non-toxic</li>
                  </ul>
                  <p className="mt-4 text-neutral-700 dark:text-neutral-300">
                    Our PTFE-based waterproofing has been validated through rigorous testing by independent laboratories and real-world applications in marine environments, underground structures, and water treatment facilities.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Nano-Enhanced Admixtures */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div 
              className="order-2 lg:order-1 mt-10 lg:mt-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
            >
              <h3 className="text-2xl font-bold text-primary dark:text-accent">Nano-Enhanced Admixtures</h3>
              <p className="mt-4 text-neutral-700 dark:text-neutral-300">
                Our nano-enhanced admixtures incorporate engineered nanoparticles that improve concrete's structural properties at the nanoscale, creating stronger, more durable, and more environmentally friendly structures.
              </p>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-success mt-1">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-neutral-900 dark:text-white">Increased Strength</h4>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      Up to a 40% increase in compressive strength compared to standard concrete mixes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-success mt-1">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-neutral-900 dark:text-white">Reduced Carbon Footprint</h4>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      Allows for 30% less cement usage while maintaining or improving performance metrics.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-success mt-1">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-neutral-900 dark:text-white">Enhanced Durability</h4>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      Significantly improved resistance to chloride penetration, freeze-thaw cycles, and chemical attack.
                    </p>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="link" 
                className="mt-8 text-primary dark:text-accent hover:text-primary/80 dark:hover:text-accent/80 p-0 h-auto"
                onClick={() => toggleExpandSection('nano-details')}
              >
                {expandedSection === 'nano-details' ? 'Show Less' : 'Learn More'} 
                <i className={`ri-arrow-right-line ml-1 ${expandedSection === 'nano-details' ? 'rotate-90' : ''} transition-transform`}></i>
              </Button>

              {expandedSection === 'nano-details' && (
                <motion.div 
                  className="mt-6 bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">Nano-Enhanced Admixture Types</h4>
                  <ul className="list-disc list-inside space-y-2 text-neutral-700 dark:text-neutral-300">
                    <li><span className="font-medium">NanoSilica:</span> Ultra-fine silica particles for increased density and strength</li>
                    <li><span className="font-medium">CarbonTube:</span> Carbon nanotubes for improved tensile strength and crack resistance</li>
                    <li><span className="font-medium">NanoFiber:</span> Cellulose nanofibers for enhanced flexural strength and reduced shrinkage</li>
                    <li><span className="font-medium">NanoReact:</span> Reactive nanoparticles that continue to strengthen concrete over time</li>
                  </ul>
                  <p className="mt-4 text-neutral-700 dark:text-neutral-300">
                    Our nano-enhanced admixtures have been used in high-performance structures worldwide, including bridges, high-rise buildings, marine structures, and critical infrastructure projects requiring exceptional durability.
                  </p>
                </motion.div>
              )}
            </motion.div>
            <motion.div 
              className="order-1 lg:order-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
            >
              {/* A microscopic view of nano particles in a concrete matrix */}
              <img 
                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800&h=600" 
                alt="Nano-enhanced concrete admixture at microscopic level" 
                className="rounded-lg shadow-xl mx-auto" 
              />
            </motion.div>
          </div>

          {/* AI-Driven Structural Health Monitoring */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
            >
              {/* A control room with digital displays showing structural monitoring data */}
              <img 
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800&h=600" 
                alt="AI-driven structural health monitoring dashboard" 
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
              <h3 className="text-2xl font-bold text-primary dark:text-accent">AI-Driven Structural Health Monitoring</h3>
              <p className="mt-4 text-neutral-700 dark:text-neutral-300">
                Our integrated monitoring system combines fiber-optic sensors, IoT connectivity, and proprietary machine learning algorithms to provide real-time structural health assessment and predictive maintenance insights.
              </p>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-success mt-1">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-neutral-900 dark:text-white">Distributed Sensing</h4>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      Advanced fiber-optic sensor networks measure strain, temperature, vibration, and corrosion.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-success mt-1">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-neutral-900 dark:text-white">Predictive Analytics</h4>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      Neural network models forecast potential failures weeks to months before conventional methods.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-success mt-1">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-neutral-900 dark:text-white">Real-Time Alerts</h4>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      Automated notification system alerts stakeholders of potential issues via customizable channels.
                    </p>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="link" 
                className="mt-8 text-primary dark:text-accent hover:text-primary/80 dark:hover:text-accent/80 p-0 h-auto"
                onClick={() => toggleExpandSection('ai-details')}
              >
                {expandedSection === 'ai-details' ? 'Show Less' : 'Learn More'} 
                <i className={`ri-arrow-right-line ml-1 ${expandedSection === 'ai-details' ? 'rotate-90' : ''} transition-transform`}></i>
              </Button>

              {expandedSection === 'ai-details' && (
                <motion.div 
                  className="mt-6 bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">System Components</h4>
                  <ul className="list-disc list-inside space-y-2 text-neutral-700 dark:text-neutral-300">
                    <li><span className="font-medium">QuantaSense Fiber Network:</span> Distributed fiber optic sensors with 1mm spatial resolution</li>
                    <li><span className="font-medium">QuantaNode IoT Gateways:</span> Edge computing devices processing sensor data in real-time</li>
                    <li><span className="font-medium">StructureAI Platform:</span> Cloud-based neural network processing and visualization</li>
                    <li><span className="font-medium">Digital Twin Integration:</span> Real-time performance mapped to structural models</li>
                    <li><span className="font-medium">Alert Management System:</span> Customizable notification thresholds and routing</li>
                  </ul>
                  <p className="mt-4 text-neutral-700 dark:text-neutral-300">
                    Our AI-driven monitoring systems are currently deployed on bridges, dams, tunnels, and high-rise buildings worldwide, providing critical insights that have prevented potential structural failures and optimized maintenance schedules.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;
