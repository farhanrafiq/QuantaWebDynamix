import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

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
  };
  shm: {
    subhead: string;
    body: string;
    features: string[];
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

  useEffect(() => {
    fetch('/qf-content.json')
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error('Failed to load QF content:', err));
  }, []);

  if (!content) return null;

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/918899969992', '_blank', 'noopener,noreferrer');
  };

  return (
    <section 
      id={id} 
      className={`qf-section py-16 md:py-20 lg:py-24 ${className}`}
    >
      <div className="qf-wrap max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {id === 'about' && (
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="qf-h2 text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {content.about.headline}
            </h2>
            <p className="qf-lead text-lg text-neutral-300 mb-8 max-w-4xl">
              {content.about.body}
            </p>
            <ul className="qf-list space-y-4">
              {content.about.bullets.map((bullet, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start text-neutral-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <span className="w-2 h-2 bg-electric-blue rounded-full mt-2 mr-4 flex-shrink-0"></span>
                  <span>{bullet}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        {id === 'eli-s1' && (
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="qf-h2 text-3xl md:text-4xl font-bold text-white mb-4">
              Eli-S1
            </h2>
            <h3 className="qf-subhead text-xl text-electric-blue mb-6">
              {content.eliS1.subhead}
            </h3>
            <p className="qf-text text-neutral-300 mb-8 max-w-3xl text-lg">
              {content.eliS1.body}
            </p>
            <Button 
              onClick={handleWhatsAppClick}
              className="qf-btn bg-[#25D366] hover:bg-[#25D366]/80 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Discuss Eli-S1
            </Button>
          </motion.div>
        )}

        {id === 'shm' && (
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="qf-h2 text-3xl md:text-4xl font-bold text-white mb-4">
              SHM for Spacecrafts & Buildings
            </h2>
            <h3 className="qf-subhead text-xl text-electric-blue mb-6">
              {content.shm.subhead}
            </h3>
            <p className="qf-text text-neutral-300 mb-8 max-w-3xl text-lg">
              {content.shm.body}
            </p>
            <div className="qf-chips flex flex-wrap gap-3">
              {content.shm.features.map((feature, index) => (
                <motion.span 
                  key={index}
                  className="qf-tag px-4 py-2 bg-electric-blue/10 border border-electric-blue/20 rounded-full text-electric-blue text-sm font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  {feature}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {id === 'it-services' && (
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="qf-grid grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div>
                <h3 className="qf-h3 text-2xl font-bold text-white mb-6">
                  IT Services
                </h3>
                <ul className="qf-list space-y-3">
                  {content.services.map((service, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start text-neutral-300"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <span className="w-2 h-2 bg-electric-blue rounded-full mt-2 mr-4 flex-shrink-0"></span>
                      <span>{service}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="qf-h3 text-2xl font-bold text-white mb-6">
                  Applications (SaaS / One-Time)
                </h3>
                <div className="qf-app-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {content.apps.map((app, index) => (
                    <motion.div 
                      key={index}
                      className="qf-card bg-neutral-900/50 border border-neutral-800 rounded-lg p-4 hover:border-electric-blue/30 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <div className="qf-tag inline-block px-3 py-1 bg-electric-blue/10 border border-electric-blue/20 rounded-full text-electric-blue text-xs font-medium mb-3">
                        {app.mode}
                      </div>
                      <h4 className="text-white font-semibold mb-2">{app.name}</h4>
                      <p className="text-neutral-400 text-sm mb-4">{app.desc}</p>
                      <Button
                        onClick={handleWhatsAppClick}
                        variant="outline"
                        size="sm"
                        className="qf-btn w-full border-electric-blue/30 text-electric-blue hover:bg-electric-blue/10 hover:border-electric-blue/50"
                      >
                        Request demo
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default QFSection;