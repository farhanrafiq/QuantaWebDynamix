import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Bot, Database, Cloud, Shield, Zap } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';

interface ITServicesData {
  itServices: {
    overview: string;
    services: Array<{
      category: string;
      description: string;
      deliverables: string[];
    }>;
    deliveryModel: {
      approach: string;
      timeline: string;
      support: string;
      quality: string;
    };
    pricing: {
      consultation: string;
      development: string;
      fixedPrice: string;
      retainer: string;
    };
  };
  ctas: {
    primary: { text: string; url: string };
    whatsapp: { text: string; url: string };
  };
}

const ITServices: React.FC = () => {
  const [siteData, setSiteData] = useState<ITServicesData | null>(null);

  useEffect(() => {
    fetch('/data/qf-site.json')
      .then(res => res.json())
      .then(data => setSiteData(data))
      .catch(err => console.error('Failed to load site data:', err));
  }, []);

  if (!siteData) return <div>Loading...</div>;

  const iconMap = {
    "Web & Mobile Development": Code,
    "AI Chatbots & Agents": Bot,
    "Enterprise Systems": Database,
    "Data Pipelines & Analytics": Database,
    "Cloud & DevOps": Cloud
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0B0F] via-[#1A1B23] to-[#0A0B0F] relative overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 opacity-30">
        <ParticleBackground color="#0099ff" count={40} density={80} />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-electric-blue/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-magenta/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-sm font-medium mb-8">
                  <Code className="w-4 h-4 mr-2" />
                  IT Services & Development
                </div>
              </motion.div>

              <motion.h1 
                variants={itemVariants}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight max-w-5xl"
              >
                Full-Stack Development & Enterprise Solutions
              </motion.h1>

              <motion.p 
                variants={itemVariants}
                className="text-xl text-neutral-300 mb-12 max-w-4xl leading-relaxed"
              >
                {siteData.itServices.overview}
              </motion.p>

              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button 
                  size="lg"
                  className="bg-electric-blue hover:bg-electric-blue/80 text-white px-8 py-4 text-lg rounded-xl group"
                  onClick={() => window.location.href = siteData.ctas.primary.url}
                >
                  Get Quote
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-electric-blue/30 text-electric-blue hover:bg-electric-blue/10 px-8 py-4 text-lg rounded-xl"
                  onClick={() => window.open(siteData.ctas.whatsapp.url, '_blank')}
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Quick Chat
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Comprehensive IT Services
                </h2>
                <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                  End-to-end development solutions from concept to production deployment
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {siteData.itServices.services.map((service, index) => {
                  const IconComponent = iconMap[service.category as keyof typeof iconMap] || Code;
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="bg-[#15171B]/80 backdrop-blur-xl rounded-xl p-8 border border-electric-blue/20 hover:border-electric-blue/40 transition-all duration-300 group"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="w-16 h-16 bg-electric-blue/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-electric-blue/20 transition-colors">
                        <IconComponent className="w-8 h-8 text-electric-blue" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-4">{service.category}</h3>
                      <p className="text-neutral-300 mb-6 leading-relaxed">{service.description}</p>
                      
                      <ul className="space-y-3">
                        {service.deliverables.map((deliverable, deliverableIndex) => (
                          <li key={deliverableIndex} className="flex items-start text-sm text-neutral-400">
                            <div className="w-2 h-2 bg-electric-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Delivery Model Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  How We Deliver
                </h2>
                <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                  Proven methodology that ensures quality, timeline adherence, and ongoing support
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div variants={itemVariants}>
                  <div className="bg-[#15171B]/80 backdrop-blur-xl rounded-xl p-8 border border-electric-blue/20">
                    <div className="w-16 h-16 bg-electric-blue/10 rounded-lg flex items-center justify-center mb-6">
                      <Shield className="w-8 h-8 text-electric-blue" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Delivery Approach</h3>
                    <p className="text-neutral-300 leading-relaxed">{siteData.itServices.deliveryModel.approach}</p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div className="bg-[#15171B]/80 backdrop-blur-xl rounded-xl p-8 border border-electric-blue/20">
                    <div className="w-16 h-16 bg-electric-blue/10 rounded-lg flex items-center justify-center mb-6">
                      <Zap className="w-8 h-8 text-electric-blue" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Timeline</h3>
                    <p className="text-neutral-300 leading-relaxed">{siteData.itServices.deliveryModel.timeline}</p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div className="bg-[#15171B]/80 backdrop-blur-xl rounded-xl p-8 border border-electric-blue/20">
                    <div className="w-16 h-16 bg-electric-blue/10 rounded-lg flex items-center justify-center mb-6">
                      <Shield className="w-8 h-8 text-electric-blue" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Support & Maintenance</h3>
                    <p className="text-neutral-300 leading-relaxed">{siteData.itServices.deliveryModel.support}</p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div className="bg-[#15171B]/80 backdrop-blur-xl rounded-xl p-8 border border-electric-blue/20">
                    <div className="w-16 h-16 bg-electric-blue/10 rounded-lg flex items-center justify-center mb-6">
                      <Database className="w-8 h-8 text-electric-blue" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Quality Assurance</h3>
                    <p className="text-neutral-300 leading-relaxed">{siteData.itServices.deliveryModel.quality}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Transparent Pricing
                </h2>
                <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                  Flexible pricing models to fit your project requirements and budget
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div variants={itemVariants} className="bg-[#15171B]/80 backdrop-blur-xl rounded-xl p-6 border border-electric-blue/20 text-center">
                  <h3 className="text-lg font-bold text-white mb-3">Consultation</h3>
                  <p className="text-neutral-300 text-sm">{siteData.itServices.pricing.consultation}</p>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-[#15171B]/80 backdrop-blur-xl rounded-xl p-6 border border-electric-blue/20 text-center">
                  <h3 className="text-lg font-bold text-white mb-3">Development</h3>
                  <p className="text-neutral-300 text-sm">{siteData.itServices.pricing.development}</p>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-[#15171B]/80 backdrop-blur-xl rounded-xl p-6 border border-electric-blue/20 text-center">
                  <h3 className="text-lg font-bold text-white mb-3">Fixed Price</h3>
                  <p className="text-neutral-300 text-sm">{siteData.itServices.pricing.fixedPrice}</p>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-[#15171B]/80 backdrop-blur-xl rounded-xl p-6 border border-electric-blue/20 text-center">
                  <h3 className="text-lg font-bold text-white mb-3">Retainer</h3>
                  <p className="text-neutral-300 text-sm">{siteData.itServices.pricing.retainer}</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold text-white mb-8"
              >
                Ready to Build Something Amazing?
              </motion.h2>
              
              <motion.p 
                variants={itemVariants}
                className="text-xl text-neutral-300 mb-12"
              >
                Let's discuss your project requirements and create a solution that exceeds expectations
              </motion.p>

              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button 
                  size="lg"
                  className="bg-electric-blue hover:bg-electric-blue/80 text-white px-8 py-4 text-lg rounded-xl group"
                  onClick={() => window.location.href = siteData.ctas.primary.url}
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-electric-blue/30 text-electric-blue hover:bg-electric-blue/10 px-8 py-4 text-lg rounded-xl"
                  onClick={() => window.open(siteData.ctas.whatsapp.url, '_blank')}
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Free Consultation
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ITServices;