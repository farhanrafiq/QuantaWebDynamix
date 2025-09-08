import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink, Star, Check, Smartphone } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';

interface App {
  name: string;
  description: string;
  features: string[];
  mode: string;
  pricing: string;
  demoUrl: string;
}

interface AppsData {
  apps: App[];
  ctas: {
    primary: { text: string; url: string };
    whatsapp: { text: string; url: string };
  };
}

const Apps: React.FC = () => {
  const [siteData, setSiteData] = useState<AppsData | null>(null);

  useEffect(() => {
    fetch('/data/qf-site.json')
      .then(res => res.json())
      .then(data => setSiteData(data))
      .catch(err => console.error('Failed to load site data:', err));
  }, []);

  if (!siteData) return <div>Loading...</div>;

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
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-sm font-medium mb-8">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Ready-to-Deploy Applications
                </div>
              </motion.div>

              <motion.h1 
                variants={itemVariants}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
              >
                Production-Ready Software Solutions
              </motion.h1>

              <motion.p 
                variants={itemVariants}
                className="text-xl text-neutral-300 mb-12 max-w-4xl mx-auto leading-relaxed"
              >
                Complete business applications available as SaaS subscriptions or one-time purchases. 
                From practice management to inventory systems, get software you can deploy tomorrow.
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
                  View Demos
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-electric-blue/30 text-electric-blue hover:bg-electric-blue/10 px-8 py-4 text-lg rounded-xl"
                  onClick={() => window.open(siteData.ctas.whatsapp.url, '_blank')}
                >
                  <Star className="mr-2 h-5 w-5" />
                  Custom Solutions
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Applications Grid */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Complete Business Applications
                </h2>
                <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                  Choose from our library of proven solutions or request customizations for your specific needs
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {siteData.apps.map((app, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-[#15171B]/80 backdrop-blur-xl rounded-xl border border-electric-blue/20 hover:border-electric-blue/40 transition-all duration-300 overflow-hidden group"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    {/* App Header */}
                    <div className="p-6 border-b border-electric-blue/10">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-white group-hover:text-electric-blue transition-colors">
                          {app.name}
                        </h3>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          app.mode === 'SaaS' 
                            ? 'bg-electric-blue/10 border border-electric-blue/20 text-electric-blue' 
                            : 'bg-magenta/10 border border-magenta/20 text-magenta'
                        }`}>
                          {app.mode}
                        </div>
                      </div>
                      
                      <p className="text-neutral-300 leading-relaxed mb-4">
                        {app.description}
                      </p>

                      <div className="text-2xl font-bold text-white mb-2">
                        {app.pricing}
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="p-6">
                      <h4 className="text-sm font-semibold text-electric-blue uppercase tracking-wide mb-4">
                        Key Features
                      </h4>
                      <ul className="space-y-3 mb-6">
                        {app.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start text-sm text-neutral-300">
                            <Check className="w-4 h-4 text-electric-blue mt-0.5 mr-3 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <Button 
                          className="w-full bg-electric-blue hover:bg-electric-blue/80 text-white group"
                          onClick={() => window.open(app.demoUrl, '_blank')}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Live Demo
                        </Button>
                        
                        <Button 
                          variant="outline"
                          className="w-full border-electric-blue/30 text-electric-blue hover:bg-electric-blue/10"
                          onClick={() => window.location.href = siteData.ctas.primary.url}
                        >
                          Get Quote
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Deployment Options */}
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
                  Flexible Deployment Models
                </h2>
                <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                  Choose the deployment option that best fits your security, compliance, and operational requirements
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* SaaS Option */}
                <motion.div variants={itemVariants} className="text-center">
                  <div className="bg-[#15171B]/80 backdrop-blur-xl rounded-xl p-8 border border-electric-blue/20">
                    <div className="w-20 h-20 bg-electric-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Smartphone className="w-10 h-10 text-electric-blue" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">SaaS Hosting</h3>
                    <p className="text-neutral-300 mb-6 leading-relaxed">
                      Fully managed cloud hosting with automatic updates, backups, and 24/7 monitoring. 
                      Get started immediately with zero infrastructure setup.
                    </p>
                    <ul className="text-left space-y-2 mb-6">
                      <li className="flex items-center text-neutral-300">
                        <Check className="w-4 h-4 text-electric-blue mr-3" />
                        Instant deployment
                      </li>
                      <li className="flex items-center text-neutral-300">
                        <Check className="w-4 h-4 text-electric-blue mr-3" />
                        Automatic updates
                      </li>
                      <li className="flex items-center text-neutral-300">
                        <Check className="w-4 h-4 text-electric-blue mr-3" />
                        24/7 support included
                      </li>
                      <li className="flex items-center text-neutral-300">
                        <Check className="w-4 h-4 text-electric-blue mr-3" />
                        Scalable pricing
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* One-Time License */}
                <motion.div variants={itemVariants} className="text-center">
                  <div className="bg-[#15171B]/80 backdrop-blur-xl rounded-xl p-8 border border-electric-blue/20">
                    <div className="w-20 h-20 bg-magenta/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Star className="w-10 h-10 text-magenta" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">One-Time License</h3>
                    <p className="text-neutral-300 mb-6 leading-relaxed">
                      Complete ownership with full source code access. Deploy on your own infrastructure 
                      with lifetime license and optional support contracts.
                    </p>
                    <ul className="text-left space-y-2 mb-6">
                      <li className="flex items-center text-neutral-300">
                        <Check className="w-4 h-4 text-magenta mr-3" />
                        Full source code included
                      </li>
                      <li className="flex items-center text-neutral-300">
                        <Check className="w-4 h-4 text-magenta mr-3" />
                        Self-hosted deployment
                      </li>
                      <li className="flex items-center text-neutral-300">
                        <Check className="w-4 h-4 text-magenta mr-3" />
                        No recurring fees
                      </li>
                      <li className="flex items-center text-neutral-300">
                        <Check className="w-4 h-4 text-magenta mr-3" />
                        Customization rights
                      </li>
                    </ul>
                  </div>
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
                Ready to Streamline Your Business?
              </motion.h2>
              
              <motion.p 
                variants={itemVariants}
                className="text-xl text-neutral-300 mb-12"
              >
                Choose from our proven applications or let us build something custom for your specific needs
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
                  Schedule Demo
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-electric-blue/30 text-electric-blue hover:bg-electric-blue/10 px-8 py-4 text-lg rounded-xl"
                  onClick={() => window.open(siteData.ctas.whatsapp.url, '_blank')}
                >
                  <Star className="mr-2 h-5 w-5" />
                  Custom Quote
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Apps;