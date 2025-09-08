import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Zap, Radar, Activity, Database, BarChart3 } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';

interface SHMData {
  shm: {
    overview: string;
    sensors: Array<{
      type: string;
      description: string;
      applications: string[];
    }>;
    analytics: Array<{
      name: string;
      description: string;
    }>;
    spacecraftFocus: string[];
    civilFocus: string[];
    architecture: {
      dataFlow: string[];
      storage: string;
      alerts: string;
      integration: string;
    };
    kpis: string[];
  };
  ctas: {
    primary: { text: string; url: string };
    whatsapp: { text: string; url: string };
  };
}

const SHM: React.FC = () => {
  const [siteData, setSiteData] = useState<SHMData | null>(null);

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
                  <Shield className="w-4 h-4 mr-2" />
                  Structural Health Monitoring
                </div>
              </motion.div>

              <motion.h1 
                variants={itemVariants}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight max-w-5xl"
              >
                Real-Time Monitoring for Critical Infrastructure
              </motion.h1>

              <motion.p 
                variants={itemVariants}
                className="text-xl text-neutral-300 mb-12 max-w-4xl leading-relaxed"
              >
                {siteData.shm.overview}
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

        {/* Sensor Technology Section */}
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
                  Advanced Sensor Technology
                </h2>
                <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                  Multi-modal sensing systems designed for precision and reliability in extreme environments
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {siteData.shm.sensors.map((sensor, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-[#15171B]/80 backdrop-blur-xl rounded-xl p-8 border border-electric-blue/20 hover:border-electric-blue/40 transition-all duration-300"
                  >
                    <div className="w-16 h-16 bg-electric-blue/10 rounded-lg flex items-center justify-center mb-6">
                      {index === 0 && <Radar className="w-8 h-8 text-electric-blue" />}
                      {index === 1 && <Activity className="w-8 h-8 text-electric-blue" />}
                      {index === 2 && <BarChart3 className="w-8 h-8 text-electric-blue" />}
                      {index === 3 && <Database className="w-8 h-8 text-electric-blue" />}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4">{sensor.type}</h3>
                    <p className="text-neutral-300 mb-6 leading-relaxed">{sensor.description}</p>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-electric-blue uppercase tracking-wide">Applications</h4>
                      <ul className="space-y-2">
                        {sensor.applications.map((app, appIndex) => (
                          <li key={appIndex} className="flex items-start text-sm text-neutral-300">
                            <div className="w-2 h-2 bg-electric-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>{app}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Applications Section */}
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
                  Mission-Critical Applications
                </h2>
                <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                  Specialized monitoring solutions for aerospace and civil engineering applications
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Spacecraft Applications */}
                <motion.div variants={itemVariants} className="space-y-6">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-electric-blue/10 rounded-lg flex items-center justify-center">
                      <Radar className="w-8 h-8 text-electric-blue" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">Spacecraft Monitoring</h3>
                      <p className="text-neutral-400">Mission-critical structural integrity</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {siteData.shm.spacecraftFocus.map((focus, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-4 p-4 bg-[#15171B]/50 rounded-lg border border-electric-blue/10"
                        whileHover={{ backgroundColor: "rgba(21, 23, 27, 0.8)" }}
                      >
                        <div className="w-8 h-8 bg-electric-blue/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-electric-blue text-sm font-bold">{index + 1}</span>
                        </div>
                        <p className="text-neutral-300 leading-relaxed">{focus}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Civil Infrastructure Applications */}
                <motion.div variants={itemVariants} className="space-y-6">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-electric-blue/10 rounded-lg flex items-center justify-center">
                      <Shield className="w-8 h-8 text-electric-blue" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">Infrastructure Health</h3>
                      <p className="text-neutral-400">Continuous structural assessment</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {siteData.shm.civilFocus.map((focus, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-4 p-4 bg-[#15171B]/50 rounded-lg border border-electric-blue/10"
                        whileHover={{ backgroundColor: "rgba(21, 23, 27, 0.8)" }}
                      >
                        <div className="w-8 h-8 bg-electric-blue/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-electric-blue text-sm font-bold">{index + 1}</span>
                        </div>
                        <p className="text-neutral-300 leading-relaxed">{focus}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Analytics Section */}
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
                  AI-Powered Analytics
                </h2>
                <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                  Advanced signal processing and machine learning for predictive insights
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {siteData.shm.analytics.map((analytic, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-[#15171B]/80 backdrop-blur-xl rounded-xl p-6 border border-electric-blue/20 hover:border-electric-blue/40 transition-all duration-300 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-16 h-16 bg-electric-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <BarChart3 className="w-8 h-8 text-electric-blue" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{analytic.name}</h3>
                    <p className="text-neutral-300 leading-relaxed">{analytic.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Architecture Section */}
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
                  System Architecture
                </h2>
                <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                  Scalable, edge-to-cloud architecture designed for reliability and performance
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-bold text-white mb-6">Data Flow Pipeline</h3>
                  <div className="space-y-4">
                    {siteData.shm.architecture.dataFlow.map((flow, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-[#15171B]/80 rounded-lg border border-electric-blue/20">
                        <div className="w-8 h-8 bg-electric-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-electric-blue text-sm font-bold">{index + 1}</span>
                        </div>
                        <p className="text-neutral-300">{flow}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-bold text-white mb-6">System Specifications</h3>
                  <div className="space-y-6">
                    <div className="p-4 bg-[#15171B]/80 rounded-lg border border-electric-blue/20">
                      <h4 className="font-semibold text-electric-blue mb-2">Data Storage</h4>
                      <p className="text-neutral-300">{siteData.shm.architecture.storage}</p>
                    </div>
                    
                    <div className="p-4 bg-[#15171B]/80 rounded-lg border border-electric-blue/20">
                      <h4 className="font-semibold text-electric-blue mb-2">Alert System</h4>
                      <p className="text-neutral-300">{siteData.shm.architecture.alerts}</p>
                    </div>
                    
                    <div className="p-4 bg-[#15171B]/80 rounded-lg border border-electric-blue/20">
                      <h4 className="font-semibold text-electric-blue mb-2">Integration</h4>
                      <p className="text-neutral-300">{siteData.shm.architecture.integration}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* KPIs Section */}
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
                  Performance Guarantees
                </h2>
                <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                  Industry-leading performance metrics backed by rigorous testing and validation
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {siteData.shm.kpis.map((kpi, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-[#15171B]/80 backdrop-blur-xl rounded-xl p-8 border border-electric-blue/20 hover:border-electric-blue/40 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <Activity className="w-6 h-6 text-electric-blue" />
                      </div>
                      <p className="text-white font-medium text-lg leading-relaxed">{kpi}</p>
                    </div>
                  </motion.div>
                ))}
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
                Protect Your Critical Assets
              </motion.h2>
              
              <motion.p 
                variants={itemVariants}
                className="text-xl text-neutral-300 mb-12"
              >
                Get early detection of structural issues before they become costly failures
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
                  Technical Discussion
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SHM;