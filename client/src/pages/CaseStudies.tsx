import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, TrendingUp, Users, Clock } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';

const CaseStudies: React.FC = () => {
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

  const caseStudies = [
    {
      title: "AI-Powered Content Generation Platform",
      client: "Enterprise SaaS Company",
      challenge: "Manual content creation bottleneck limiting product marketing velocity",
      solution: "Custom multi-agent AI system with RAG-based brand consistency and automated approval workflows",
      results: [
        "85% reduction in content creation time",
        "300% increase in marketing output",
        "95% brand consistency score",
        "ROI achieved in 3 months"
      ],
      technologies: ["GPT-4", "LangChain", "Vector DB", "React", "Node.js"],
      timeline: "8 weeks",
      teamSize: "4 engineers"
    },
    {
      title: "Spacecraft Structural Health Monitoring",
      client: "Aerospace Manufacturer",
      challenge: "Real-time monitoring of composite structures during launch and orbital operations",
      solution: "Fiber-optic sensor network with edge AI for anomaly detection and predictive maintenance",
      results: [
        "99.9% system uptime",
        "< 5 minute detection time",
        "40% reduction in maintenance costs",
        "100% mission success rate"
      ],
      technologies: ["FBG Sensors", "Edge AI", "Time-series DB", "SCADA Integration"],
      timeline: "16 weeks",
      teamSize: "6 engineers"
    },
    {
      title: "Practice Management Suite",
      client: "Legal Services Firm",
      challenge: "Fragmented workflow across multiple tools causing inefficiencies and billing errors",
      solution: "Integrated practice management platform with automated time tracking and client billing",
      results: [
        "60% reduction in administrative overhead",
        "95% billing accuracy improvement",
        "80% faster case file retrieval",
        "Client satisfaction score: 4.8/5"
      ],
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "DocuSign API"],
      timeline: "12 weeks",
      teamSize: "5 engineers"
    }
  ];

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
                  <FileText className="w-4 h-4 mr-2" />
                  Success Stories
                </div>
              </motion.div>

              <motion.h1 
                variants={itemVariants}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
              >
                Real Results, Real Impact
              </motion.h1>

              <motion.p 
                variants={itemVariants}
                className="text-xl text-neutral-300 mb-12 max-w-4xl mx-auto leading-relaxed"
              >
                Explore how our AI solutions and engineering expertise have transformed businesses 
                across industries, delivering measurable results and competitive advantages.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="space-y-16">
                {caseStudies.map((study, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-[#15171B]/80 backdrop-blur-xl rounded-xl border border-electric-blue/20 overflow-hidden"
                  >
                    <div className="p-8 lg:p-12">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                          <div>
                            <h3 className="text-3xl font-bold text-white mb-3">{study.title}</h3>
                            <p className="text-electric-blue font-medium">{study.client}</p>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Challenge</h4>
                            <p className="text-neutral-300 leading-relaxed">{study.challenge}</p>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Solution</h4>
                            <p className="text-neutral-300 leading-relaxed">{study.solution}</p>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Key Results</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {study.results.map((result, resultIndex) => (
                                <div key={resultIndex} className="flex items-start gap-3">
                                  <TrendingUp className="w-5 h-5 text-electric-blue mt-0.5 flex-shrink-0" />
                                  <span className="text-neutral-300">{result}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                          <div className="bg-[#0A0B0F]/50 rounded-lg p-6">
                            <h4 className="text-lg font-semibold text-white mb-4">Project Details</h4>
                            
                            <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-electric-blue" />
                                <div>
                                  <p className="text-neutral-400 text-sm">Timeline</p>
                                  <p className="text-white font-medium">{study.timeline}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                <Users className="w-5 h-5 text-electric-blue" />
                                <div>
                                  <p className="text-neutral-400 text-sm">Team Size</p>
                                  <p className="text-white font-medium">{study.teamSize}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-[#0A0B0F]/50 rounded-lg p-6">
                            <h4 className="text-lg font-semibold text-white mb-4">Technologies</h4>
                            <div className="flex flex-wrap gap-2">
                              {study.technologies.map((tech, techIndex) => (
                                <span 
                                  key={techIndex}
                                  className="px-3 py-1 bg-electric-blue/10 border border-electric-blue/20 rounded-full text-electric-blue text-sm"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
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
                  Proven Track Record
                </h2>
                <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                  Consistent delivery of high-impact solutions across diverse industries and use cases
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <motion.div variants={itemVariants} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-electric-blue mb-2">50+</div>
                  <div className="text-neutral-300">Projects Delivered</div>
                </motion.div>

                <motion.div variants={itemVariants} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-electric-blue mb-2">95%</div>
                  <div className="text-neutral-300">Client Satisfaction</div>
                </motion.div>

                <motion.div variants={itemVariants} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-electric-blue mb-2">12</div>
                  <div className="text-neutral-300">Industry Sectors</div>
                </motion.div>

                <motion.div variants={itemVariants} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-electric-blue mb-2">3x</div>
                  <div className="text-neutral-300">Average ROI</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
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
                Ready to Write Your Success Story?
              </motion.h2>
              
              <motion.p 
                variants={itemVariants}
                className="text-xl text-neutral-300 mb-12"
              >
                Let's discuss how our proven methodologies can deliver similar results for your organization
              </motion.p>

              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button 
                  size="lg"
                  className="bg-electric-blue hover:bg-electric-blue/80 text-white px-8 py-4 text-lg rounded-xl group"
                  onClick={() => window.location.href = '/contact'}
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-electric-blue/30 text-electric-blue hover:bg-electric-blue/10 px-8 py-4 text-lg rounded-xl"
                  onClick={() => window.open('https://wa.me/919796000522', '_blank')}
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Request Case Study Details
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CaseStudies;