import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Database, Cloud, Code, Bot } from 'lucide-react';
import gsap from 'gsap';
import ParticleBackground from '../ParticleBackground';

interface QFSectionProps {
  id: string;
  className?: string;
}

interface QFContent {
  about: {
    headline: string;
    body: string;
    bullets: string[];
  };
  eliS1: {
    subhead: string;
    body: string;
    capabilities?: string[];
    integrations?: string[];
    deploymentOptions?: string[];
  };
  shm: {
    subhead: string;
    body: string;
    spacecraftFeatures?: string[];
    buildingFeatures?: string[];
    analytics?: string[];
  };
  services: string[];
  apps: Array<{
    name: string;
    desc: string;
    mode: string;
  }>;
}

const QFSection: React.FC<QFSectionProps> = ({ id, className = "" }) => {
  const [content, setContent] = useState<QFContent | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    fetch('/qf-content.json')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error('Failed to load QF content:', err));
  }, []);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current.querySelectorAll('.qf-animate'), 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [content]);

  if (!content) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }
    }
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/918899969992', '_blank', 'noopener,noreferrer');
  };

  return (
    <section 
      ref={sectionRef}
      id={id} 
      className={`qf-section relative py-20 md:py-32 overflow-hidden ${className}`}
    >
      {/* Particle Background */}
      <div className="absolute inset-0 opacity-30">
        <ParticleBackground color="#0099ff" count={30} density={60} />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-electric-blue/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-magenta/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="qf-wrap max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* About Section */}
        {id === 'about' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div variants={itemVariants} className="qf-animate">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-sm font-medium mb-8">
                <Zap className="w-4 h-4 mr-2" />
                AI-First R&D Company
              </div>
            </motion.div>

            <motion.h2 
              variants={itemVariants}
              className="qf-h2 qf-animate text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight"
            >
              {content.about.headline}
            </motion.h2>

            <motion.p 
              variants={itemVariants}
              className="qf-lead qf-animate text-xl text-neutral-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              {content.about.body}
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {content.about.bullets.map((bullet, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="qf-animate bg-[#15171B]/80 backdrop-blur-xl rounded-xl p-8 border border-electric-blue/20 hover:border-electric-blue/40 transition-all duration-300 group"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-electric-blue/20 transition-colors">
                    {index === 0 && <Bot className="w-6 h-6 text-electric-blue" />}
                    {index === 1 && <Shield className="w-6 h-6 text-electric-blue" />}
                    {index === 2 && <Code className="w-6 h-6 text-electric-blue" />}
                  </div>
                  <p className="text-white font-medium leading-relaxed">{bullet}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Eli-S1 Section */}
        {id === 'eli-s1' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <motion.div variants={itemVariants} className="qf-animate">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-sm font-medium mb-6">
                    <Zap className="w-4 h-4 mr-2" />
                    Eli-S1 AI Engine
                  </div>
                </motion.div>

                <motion.h2 
                  variants={itemVariants}
                  className="qf-h2 qf-animate text-4xl md:text-5xl font-bold text-white mb-6"
                >
                  Eli-S1
                </motion.h2>

                <motion.h3 
                  variants={itemVariants}
                  className="qf-subhead qf-animate text-xl text-electric-blue mb-8 leading-relaxed"
                >
                  {content.eliS1.subhead}
                </motion.h3>

                <motion.p 
                  variants={itemVariants}
                  className="qf-text qf-animate text-lg text-neutral-300 mb-8 leading-relaxed"
                >
                  {content.eliS1.body}
                </motion.p>

                <motion.div variants={itemVariants} className="qf-animate">
                  <Button 
                    onClick={handleWhatsAppClick}
                    className="bg-[#25D366] hover:bg-[#25D366]/80 text-white px-8 py-4 text-lg rounded-xl group"
                    size="lg"
                  >
                    Discuss Eli-S1
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </div>

              <div className="space-y-6">
                {content.eliS1.capabilities?.slice(0, 4).map((capability, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="qf-animate bg-[#15171B]/80 backdrop-blur-xl rounded-lg p-6 border border-electric-blue/20 hover:border-electric-blue/40 transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-electric-blue/10 rounded-lg flex items-center justify-center mt-1">
                        <div className="w-3 h-3 bg-electric-blue rounded-full"></div>
                      </div>
                      <p className="text-white font-medium leading-relaxed">{capability}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* SHM Section */}
        {id === 'shm' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="text-center mb-16">
              <motion.div variants={itemVariants} className="qf-animate">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-sm font-medium mb-6">
                  <Shield className="w-4 h-4 mr-2" />
                  Structural Health Monitoring
                </div>
              </motion.div>

              <motion.h2 
                variants={itemVariants}
                className="qf-h2 qf-animate text-4xl md:text-5xl font-bold text-white mb-6"
              >
                SHM for Spacecrafts & Buildings
              </motion.h2>

              <motion.h3 
                variants={itemVariants}
                className="qf-subhead qf-animate text-xl text-electric-blue mb-8"
              >
                {content.shm.subhead}
              </motion.h3>

              <motion.p 
                variants={itemVariants}
                className="qf-text qf-animate text-lg text-neutral-300 max-w-4xl mx-auto leading-relaxed"
              >
                {content.shm.body}
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <motion.div variants={itemVariants} className="qf-animate">
                <h4 className="text-2xl font-bold text-white mb-6">Spacecraft Applications</h4>
                <div className="space-y-4">
                  {content.shm.spacecraftFeatures?.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-electric-blue rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-neutral-300">{feature}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="qf-animate">
                <h4 className="text-2xl font-bold text-white mb-6">Infrastructure Applications</h4>
                <div className="space-y-4">
                  {content.shm.buildingFeatures?.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-electric-blue rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-neutral-300">{feature}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="qf-animate">
              <h4 className="text-2xl font-bold text-white mb-8 text-center">Analytics Capabilities</h4>
              <div className="flex flex-wrap justify-center gap-4">
                {content.shm.analytics?.map((analytic, index) => (
                  <motion.span 
                    key={index}
                    className="px-6 py-3 bg-electric-blue/10 border border-electric-blue/20 rounded-full text-electric-blue font-medium"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 153, 255, 0.2)" }}
                  >
                    {analytic}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* IT Services Section */}
        {id === 'it-services' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="qf-animate text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-sm font-medium mb-6">
                <Code className="w-4 h-4 mr-2" />
                IT Services & Applications
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Production Software</h2>
              <p className="text-xl text-neutral-300 max-w-3xl mx-auto">Enterprise applications and services you can run tomorrow</p>
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
              <motion.div variants={itemVariants} className="qf-animate">
                <h3 className="text-3xl font-bold text-white mb-8">IT Services</h3>
                <div className="grid grid-cols-1 gap-6">
                  {content.services.map((service, index) => (
                    <motion.div
                      key={index}
                      className="bg-[#15171B]/80 backdrop-blur-xl rounded-lg p-6 border border-electric-blue/20 hover:border-electric-blue/40 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-electric-blue/10 rounded-lg flex items-center justify-center">
                          <div className="w-4 h-4 bg-electric-blue rounded-full"></div>
                        </div>
                        <p className="text-white font-medium text-lg">{service}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="qf-animate">
                <h3 className="text-3xl font-bold text-white mb-8">Applications (SaaS / One-Time)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {content.apps.map((app, index) => (
                    <motion.div 
                      key={index}
                      className="bg-[#15171B]/80 backdrop-blur-xl border border-electric-blue/20 rounded-xl p-6 hover:border-electric-blue/40 transition-all duration-300 group"
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                        app.mode === 'SaaS' 
                          ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                          : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                      }`}>
                        {app.mode}
                      </div>
                      <h4 className="text-white font-bold text-lg mb-3">{app.name}</h4>
                      <p className="text-neutral-400 text-sm mb-6 leading-relaxed">{app.desc}</p>
                      <Button
                        onClick={handleWhatsAppClick}
                        variant="outline"
                        size="sm"
                        className="w-full border-electric-blue/30 text-electric-blue hover:bg-electric-blue/10 hover:border-electric-blue/50 group-hover:bg-electric-blue/20 transition-all"
                      >
                        Request Demo
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default QFSection;