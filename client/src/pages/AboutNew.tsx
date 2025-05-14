import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "../components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Users, Award, BarChart, Lightbulb, Zap, FileText } from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Animated stats counter component
const AnimatedCounter = ({ target, label, prefix = "", suffix = "" }: { 
  target: number;
  label: string;
  prefix?: string;
  suffix?: string;
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (!isInView || !nodeRef.current) return;
    
    let start = 0;
    const duration = 2000;
    const increment = Math.ceil(target / (duration / 16)); // 16ms per frame (approx 60fps)
    
    const counter = nodeRef.current.querySelector(".counter");
    if (!counter) return;
    
    const updateCounter = () => {
      start += increment;
      if (start > target) {
        counter.textContent = `${prefix}${target}${suffix}`;
      } else {
        counter.textContent = `${prefix}${start}${suffix}`;
        requestAnimationFrame(updateCounter);
      }
    };
    
    requestAnimationFrame(updateCounter);
  }, [isInView, target, prefix, suffix]);
  
  return (
    <motion.div
      ref={nodeRef}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-electric-blue counter">
        {prefix}0{suffix}
      </div>
      <div className="text-white text-lg mt-2">{label}</div>
    </motion.div>
  );
};

// Team member card component
const TeamMemberCard = ({ name, position, image }: { 
  name: string;
  position: string;
  image: string;
}) => {
  return (
    <motion.div
      className="bg-[#0D0F12] border border-electric-blue/20 p-6 rounded-xl hover:border-electric-blue transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-2 border-electric-blue/30">
        <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/5 to-electric-blue/20 animate-pulse"></div>
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-white text-xl font-bold text-center">{name}</h3>
      <p className="text-electric-blue text-center">{position}</p>
    </motion.div>
  );
};

// Value proposition card component
const ValueCard = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <motion.div
      className="bg-[#15171B] border border-electric-blue/10 p-6 rounded-xl hover:bg-[#181A1F] transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-3 bg-electric-blue/10 rounded-xl inline-block mb-4 text-electric-blue">
        {icon}
      </div>
      <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
      <p className="text-neutral-400">{description}</p>
    </motion.div>
  );
};

// Publication card component
const PublicationCard = ({ title, journal, date, authors, link }: {
  title: string;
  journal: string;
  date: string;
  authors: string;
  link: string;
}) => {
  return (
    <motion.div
      className="border-l-2 border-electric-blue/30 pl-6 py-2 hover:border-electric-blue transition-colors duration-300"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-white font-medium mb-1">{title}</h3>
      <p className="text-electric-blue text-sm">{journal} • {date}</p>
      <p className="text-neutral-400 text-sm">{authors}</p>
      <a 
        href={link} 
        className="text-sm text-white/70 hover:text-white inline-flex items-center mt-2 hover:underline"
        target="_blank" 
        rel="noopener noreferrer"
      >
        Read Paper <ArrowRight className="ml-1 w-3 h-3" />
      </a>
    </motion.div>
  );
};

// Main About Page component
const About = () => {
  // Reference for scroll trigger animations
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Setup GSAP animations
  useEffect(() => {
    if (!timelineRef.current) return;
    
    const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { 
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50 
        },
        { 
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          }
        }
      );
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
  
  return (
    <div className="bg-[#0D0F12] min-h-screen">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 right-0 w-96 h-96 bg-electric-blue/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-magenta/5 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              About <span className="text-electric-blue">QuantaFONS</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-neutral-300 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We are a leading R&D company specializing in advanced civil-engineering data projects and AI-driven structural-health monitoring systems. Our mission is to revolutionize infrastructure management through cutting-edge technology.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button className="bg-electric-blue hover:bg-electric-blue/80 text-white">
                Our Research
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Company Stats Section */}
      <section className="py-16 bg-[#0A0C10]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-5xl mx-auto">
            <AnimatedCounter target={12} label="Years Experience" />
            <AnimatedCounter target={245} label="Projects Completed" />
            <AnimatedCounter target={42} label="Research Papers" />
            <AnimatedCounter target={16} label="Patents Filed" />
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-16 text-white relative inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Journey
              <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-electric-blue"></span>
            </motion.h2>
            
            <div ref={timelineRef} className="relative">
              {/* Timeline line */}
              <div className="absolute top-0 bottom-0 left-1/2 -ml-[1px] w-[2px] bg-electric-blue/30"></div>
              
              {/* Timeline nodes */}
              <div className="space-y-20">
                {/* 2011 - Foundation */}
                <div className="timeline-item relative">
                  <div className="absolute left-1/2 top-0 -ml-3 w-6 h-6 rounded-full bg-[#0D0F12] border-2 border-electric-blue"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="md:text-right">
                      <h3 className="text-electric-blue text-2xl font-bold mb-2">2011</h3>
                      <h4 className="text-white text-xl mb-3">Company Foundation</h4>
                      <p className="text-neutral-400">QuantaFONS was founded with a vision to transform infrastructure management through data-driven technologies and advanced materials science.</p>
                    </div>
                    <div className="bg-[#15171B] rounded-xl overflow-hidden h-64">
                      <div className="w-full h-full flex items-center justify-center">
                        <Users className="w-24 h-24 text-electric-blue/30" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 2015 - Research Breakthrough */}
                <div className="timeline-item relative">
                  <div className="absolute left-1/2 top-0 -ml-3 w-6 h-6 rounded-full bg-[#0D0F12] border-2 border-electric-blue"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="md:order-2">
                      <h3 className="text-electric-blue text-2xl font-bold mb-2">2015</h3>
                      <h4 className="text-white text-xl mb-3">PTFE Waterproofing Breakthrough</h4>
                      <p className="text-neutral-400">Our team achieved a major breakthrough in PTFE-based waterproofing technology, creating a solution with unprecedented durability and effectiveness.</p>
                    </div>
                    <div className="md:order-1 bg-[#15171B] rounded-xl overflow-hidden h-64">
                      <div className="w-full h-full flex items-center justify-center">
                        <Award className="w-24 h-24 text-electric-blue/30" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 2018 - AI Platform */}
                <div className="timeline-item relative">
                  <div className="absolute left-1/2 top-0 -ml-3 w-6 h-6 rounded-full bg-[#0D0F12] border-2 border-electric-blue"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="md:text-right">
                      <h3 className="text-electric-blue text-2xl font-bold mb-2">2018</h3>
                      <h4 className="text-white text-xl mb-3">AI Analytics Platform Launch</h4>
                      <p className="text-neutral-400">We launched our AI-powered structural health monitoring platform, transforming how infrastructure managers predict and prevent critical failures.</p>
                    </div>
                    <div className="bg-[#15171B] rounded-xl overflow-hidden h-64">
                      <div className="w-full h-full flex items-center justify-center">
                        <BarChart className="w-24 h-24 text-electric-blue/30" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 2024 - Quantum Fiber */}
                <div className="timeline-item relative">
                  <div className="absolute left-1/2 top-0 -ml-3 w-6 h-6 rounded-full bg-[#0D0F12] border-2 border-electric-blue"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="md:order-2">
                      <h3 className="text-electric-blue text-2xl font-bold mb-2">2024</h3>
                      <h4 className="text-white text-xl mb-3">Quantum Fiber SHM System</h4>
                      <p className="text-neutral-400">The debut of our revolutionary Quantum Fiber sensing technology marks a new era in structural health monitoring with unprecedented accuracy and reliability.</p>
                    </div>
                    <div className="md:order-1 bg-[#15171B] rounded-xl overflow-hidden h-64">
                      <div className="w-full h-full flex items-center justify-center">
                        <Lightbulb className="w-24 h-24 text-electric-blue/30" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-20 bg-[#0A0C10] relative">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-electric-blue/5 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-white relative inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Values
              <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-electric-blue"></span>
            </motion.h2>
            
            <motion.p 
              className="text-lg text-neutral-400 mb-12 max-w-3xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our core values drive everything we do at QuantaFONS, from research and development to client relationships and community engagement.
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ValueCard 
                icon={<Zap className="h-6 w-6" />}
                title="Innovation"
                description="We continuously push the boundaries of what's possible in civil engineering through relentless innovation and research."
              />
              
              <ValueCard 
                icon={<Users className="h-6 w-6" />}
                title="Collaboration"
                description="We believe that breakthrough solutions come from diverse teams working together across disciplinary boundaries."
              />
              
              <ValueCard 
                icon={<FileText className="h-6 w-6" />}
                title="Integrity"
                description="We maintain the highest standards of scientific integrity and transparency in all our research and business practices."
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Research Team Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-white relative inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Leadership Team
              <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-electric-blue"></span>
            </motion.h2>
            
            <motion.p 
              className="text-lg text-neutral-400 mb-12 max-w-3xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our world-class team brings together expertise from civil engineering, data science, materials science, and artificial intelligence.
            </motion.p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <TeamMemberCard 
                name="Dr. Amit Sharma"
                position="Founder & CEO"
                image="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Crect width='160' height='160' fill='%23252830'/%3E%3Ctext x='50%' y='50%' font-size='48' text-anchor='middle' alignment-baseline='middle' font-family='sans-serif' fill='%230099ff'%3EAS%3C/text%3E%3C/svg%3E"
              />
              
              <TeamMemberCard 
                name="Dr. Priya Patel"
                position="Chief Science Officer"
                image="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Crect width='160' height='160' fill='%23252830'/%3E%3Ctext x='50%' y='50%' font-size='48' text-anchor='middle' alignment-baseline='middle' font-family='sans-serif' fill='%230099ff'%3EPP%3C/text%3E%3C/svg%3E"
              />
              
              <TeamMemberCard 
                name="Dr. Rajiv Mehta"
                position="CTO"
                image="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Crect width='160' height='160' fill='%23252830'/%3E%3Ctext x='50%' y='50%' font-size='48' text-anchor='middle' alignment-baseline='middle' font-family='sans-serif' fill='%230099ff'%3ERM%3C/text%3E%3C/svg%3E"
              />
              
              <TeamMemberCard 
                name="Ananya Singh"
                position="AI Research Director"
                image="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Crect width='160' height='160' fill='%23252830'/%3E%3Ctext x='50%' y='50%' font-size='48' text-anchor='middle' alignment-baseline='middle' font-family='sans-serif' fill='%230099ff'%3EAS%3C/text%3E%3C/svg%3E"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Research Papers Section */}
      <section className="py-20 bg-[#0A0C10]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-white relative inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Recent Publications
              <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-electric-blue"></span>
            </motion.h2>
            
            <motion.p 
              className="text-lg text-neutral-400 mb-12 max-w-3xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our team regularly publishes cutting-edge research in top-tier academic journals and conferences.
            </motion.p>
            
            <div className="space-y-8">
              <PublicationCard 
                title="Novel PTFE-Based Waterproofing Systems for Critical Infrastructure"
                journal="Journal of Advanced Materials Engineering"
                date="2023"
                authors="Sharma, A., Patel, P., Mehta, R."
                link="#"
              />
              
              <PublicationCard 
                title="AI-Driven Structural Health Monitoring: A Comprehensive Review"
                journal="Structural Monitoring and Maintenance"
                date="2022"
                authors="Singh, A., Mehta, R., Sharma, A."
                link="#"
              />
              
              <PublicationCard 
                title="Quantum-Level Sensing in Fiber Optic Structural Monitoring"
                journal="IEEE Sensors Journal"
                date="2024"
                authors="Mehta, R., Singh, A., Patel, P."
                link="#"
              />
              
              <PublicationCard 
                title="Digital Twin Modeling for Urban Infrastructure: Challenges and Opportunities"
                journal="Smart Cities"
                date="2023"
                authors="Patel, P., Sharma, A., Singh, A."
                link="#"
              />
            </div>
            
            <div className="text-center mt-12">
              <Button className="bg-electric-blue hover:bg-electric-blue/80 text-white">
                View All Publications
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-electric-blue/20 to-magenta/20 relative">
        <div className="absolute inset-0 bg-[#0D0F12] opacity-90"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Interested in Collaborating?
            </motion.h2>
            
            <motion.p 
              className="text-lg text-neutral-300 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We're always looking for research partners, industry collaborators, and talented individuals to join our mission of revolutionizing infrastructure management.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button className="bg-electric-blue hover:bg-electric-blue/80 text-white">
                Contact Our Team
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button className="bg-transparent border border-white text-white hover:bg-white/10">
                View Open Positions
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Footer is handled by the RootLayout component */}
    </div>
  );
};

export default About;