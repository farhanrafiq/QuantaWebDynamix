import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Bot, Shield, Code, Database, Cloud, CheckCircle } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';

interface EliS1Data {
  eliS1: {
    overview: string;
    capabilities: Array<{
      category: string;
      items: string[];
    }>;
    howItWorks: Array<{
      step: number;
      title: string;
      description: string;
    }>;
    integrations: string[];
    deploymentOptions: Array<{
      name: string;
      description: string;
      pricing: string;
    }>;
    outcomes: string[];
  };
  ctas: {
    primary: { text: string; url: string };
    whatsapp: { text: string; url: string };
  };
}

const EliS1: React.FC = () => {
  const [siteData, setSiteData] = useState<EliS1Data | null>(null);

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
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-sm font-medium mb-8">
                  <Bot className="w-4 h-4 mr-2" />
                  Eli-S1 AI Engine
                </div>
              </motion.div>

              <motion.h1 
                variants={itemVariants}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight max-w-4xl"
              >
                Multi-Agent AI That Actually Ships
              </motion.h1>

              <motion.p 
                variants={itemVariants}
                className="text-xl text-neutral-300 mb-12 max-w-4xl leading-relaxed"
              >
                {siteData.eliS1.overview}
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
                  Schedule Demo
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

        {/* How It Works Section */}
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
                  How Eli-S1 Works
                </h2>
                <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                  Five-step process that turns complex requirements into production-ready solutions
                </p>
              </motion.div>

              <div className="space-y-8">
                {siteData.eliS1.howItWorks.map((step, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-start gap-8 p-8 bg-[#15171B]/80 backdrop-blur-xl rounded-xl border border-electric-blue/20 hover:border-electric-blue/40 transition-all duration-300"
                  >
                    <div className="w-16 h-16 bg-electric-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-electric-blue">{step.step}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-neutral-300 leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Capabilities Section */}
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
                  Core Capabilities
                </h2>
                <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                  Specialized agents for every aspect of the development lifecycle
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {siteData.eliS1.capabilities.map((capability, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-[#15171B]/80 backdrop-blur-xl rounded-xl p-8 border border-electric-blue/20 hover:border-electric-blue/40 transition-all duration-300"
                  >
                    <h3 className="text-2xl font-bold text-white mb-6">{capability.category}</h3>
                    <ul className="space-y-3">
                      {capability.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start text-neutral-300">
                          <CheckCircle className="w-5 h-5 text-electric-blue mt-0.5 mr-3 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Deployment Options Section */}
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
                  Deployment Options
                </h2>
                <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                  Choose the deployment model that fits your security and compliance requirements
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {siteData.eliS1.deploymentOptions.map((option, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-[#15171B]/80 backdrop-blur-xl rounded-xl p-8 border border-electric-blue/20 hover:border-electric-blue/40 transition-all duration-300 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-16 h-16 bg-electric-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      {index === 0 && <Cloud className="w-8 h-8 text-electric-blue" />}
                      {index === 1 && <Shield className="w-8 h-8 text-electric-blue" />}
                      {index === 2 && <Database className="w-8 h-8 text-electric-blue" />}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{option.name}</h3>
                    <p className="text-neutral-300 mb-6 leading-relaxed">{option.description}</p>
                    <div className="inline-block px-4 py-2 bg-electric-blue/10 border border-electric-blue/20 rounded-full text-electric-blue text-sm font-medium">
                      {option.pricing}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Outcomes Section */}
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
                  Proven Results
                </h2>
                <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                  Measurable improvements across development velocity and quality metrics
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {siteData.eliS1.outcomes.map((outcome, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="text-center p-6 bg-[#15171B]/80 backdrop-blur-xl rounded-xl border border-electric-blue/20"
                  >
                    <div className="text-4xl font-bold text-electric-blue mb-2">
                      {outcome.split(' ')[0]}
                    </div>
                    <div className="text-neutral-300">
                      {outcome.split(' ').slice(1).join(' ')}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Integrations Section */}
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
                  Seamless Integrations
                </h2>
                <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                  Works with your existing development tools and infrastructure
                </p>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap justify-center gap-4"
              >
                {siteData.eliS1.integrations.map((integration, index) => (
                  <div 
                    key={index}
                    className="px-6 py-3 bg-[#15171B]/80 backdrop-blur-xl border border-electric-blue/20 rounded-full text-neutral-300 hover:border-electric-blue/40 transition-colors"
                  >
                    {integration}
                  </div>
                ))}
              </motion.div>
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
                Ready to Transform Your Development Process?
              </motion.h2>
              
              <motion.p 
                variants={itemVariants}
                className="text-xl text-neutral-300 mb-12"
              >
                See Eli-S1 in action with a personalized demo tailored to your use case
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
                  <Zap className="mr-2 h-5 w-5" />
                  Chat with Us
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EliS1;