import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button";
import { ArrowDown, ArrowRight, ExternalLink, ChevronRight, Zap, BarChart3, Shield, Building } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation } from "wouter";
import ParticleBackground from "../components/ParticleBackground";
import { useIsMobile } from "../hooks/use-mobile";
import QFSection from "../components/qf/QFSection";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Custom cursor component
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      // Check if the cursor is over an interactive element
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <motion.div
      ref={cursorRef}
      className="fixed z-50 w-8 h-8 pointer-events-none mix-blend-difference"
      animate={{
        scale: isPointer ? 0.5 : 1,
        opacity: 1,
      }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="16"
          cy="16"
          r="15"
          stroke="white"
          strokeWidth={isPointer ? "3" : "1"}
          fill={isPointer ? "white" : "transparent"}
        />
      </svg>
    </motion.div>
  );
};

// Animated section header component
const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div className="text-center mb-16">
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-4 text-white relative inline-block"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {title}
        <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-electric-blue"></span>
      </motion.h2>

      <motion.p
        className="text-lg text-neutral-400 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {subtitle}
      </motion.p>
    </div>
  );
};

// Technology card component
const TechnologyCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) => {
  return (
    <motion.div
      className="bg-[#15171B] border border-electric-blue/10 p-6 rounded-xl hover:bg-[#181A1F] hover:border-electric-blue/30 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <div className="p-3 bg-electric-blue/10 rounded-xl inline-block mb-4 text-electric-blue">
        {icon}
      </div>
      <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
      <p className="text-neutral-400">{description}</p>
      <div className="mt-4 text-electric-blue flex items-center cursor-pointer hover:underline">
        Learn more <ChevronRight className="ml-1 w-4 h-4" />
      </div>
    </motion.div>
  );
};

// Case study card component
const CaseStudyCard = ({ 
  title, 
  client, 
  description, 
  image 
}: { 
  title: string; 
  client: string; 
  description: string; 
  image: string;
}) => {
  return (
    <motion.div
      className="group bg-[#15171B] rounded-xl overflow-hidden hover:bg-[#181A1F] transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-electric-blue/20 to-[#15171B]/80 z-10"></div>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
      </div>
      <div className="p-6">
        <div className="text-sm text-electric-blue mb-2">{client}</div>
        <h3 className="text-white text-xl font-bold mb-2 group-hover:text-electric-blue transition-colors duration-300">{title}</h3>
        <p className="text-neutral-400 mb-4">{description}</p>
        <div className="flex items-center text-electric-blue cursor-pointer hover:underline">
          View case study <ExternalLink className="ml-1 w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
};

// Team member card component
const TeamMemberCard = ({ name, title, image }: { name: string; title: string; image: string }) => {
  return (
    <motion.div
      className="bg-[#15171B] rounded-lg overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#15171B] to-transparent z-10"></div>
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
      </div>
      <div className="p-4 relative z-20 -mt-16">
        <h3 className="text-white text-xl font-bold">{name}</h3>
        <p className="text-electric-blue">{title}</p>
      </div>
    </motion.div>
  );
};

// Main landing page component
const LandingPage = () => {
  const isMobile = useIsMobile();
  const [_, navigate] = useLocation();
  
  // References for scroll animations
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Custom scroll-based animations
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
  
  // Setup GSAP scroll animations
  useEffect(() => {
    // Hero section parallax
    if (heroRef.current) {
      const heroElements = heroRef.current.querySelectorAll('.hero-animate');
      
      heroElements.forEach((element, index) => {
        gsap.fromTo(
          element,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.2 * index,
            ease: "power3.out"
          }
        );
      });
    }
    
    // Create scroll animations
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section) => {
      gsap.fromTo(
        section.querySelectorAll('.scroll-animate'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "center center",
            scrub: 1,
          }
        }
      );
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
  
  // Smooth scroll function
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className="bg-[#0D0F12] min-h-screen overflow-x-hidden">
      {!isMobile && <CustomCursor />}
      
      {/* Hero section */}
      <section ref={heroRef} className="min-h-screen flex flex-col relative">
        {!isMobile && <ParticleBackground color="#0099ff" count={50} density={80} />}
        
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-electric-blue/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-magenta/10 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 flex-1 flex flex-col justify-center items-center text-center relative z-10">
          <motion.div style={{ opacity, scale }}>
            <motion.div 
              className="text-sm uppercase tracking-widest text-electric-blue mb-4 hero-animate"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Revolutionizing Artificial Intelligence
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 hero-animate"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="relative inline-block">
                Quanta
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-electric-blue"></span>
              </span>
              <span className="text-electric-blue">FONS</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-neutral-400 mb-10 max-w-3xl mx-auto hero-animate"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Building practical AI solutions that help teams research, write, code, and ship faster. 
              From Eli-S1 AI engine to real-time structural monitoring for spacecraft and critical infrastructure.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center hero-animate"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button 
                className="bg-electric-blue hover:bg-electric-blue/80 text-white"
                onClick={() => navigate('/contact')}
              >
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button 
                className="bg-transparent border border-white/20 text-white hover:bg-white/10"
                onClick={() => scrollToSection(aboutRef)}
              >
                Learn More
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex justify-center items-center z-10">
          <motion.div 
            className="w-8 h-12 rounded-full border-2 border-electric-blue/30 flex justify-center items-start p-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.div 
              className="w-1 h-2 bg-electric-blue rounded-full"
              animate={{ 
                y: [0, 8, 0],
                opacity: [1, 0.5, 1]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          </motion.div>
        </div>
      </section>
      
      {/* About section */}
      <section ref={aboutRef} className="py-24 relative">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="About QuantaFONS"
            subtitle="An AI-first R&D company building practical solutions: Eli-S1 AI engine, real-time structural health monitoring, and production-ready applications."
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              className="scroll-animate"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-electric-blue/30"></div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-electric-blue/30"></div>
                
                <div className="bg-[#15171B] p-8 rounded-xl">
                  <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                  <p className="text-neutral-400 mb-6">
                    To revolutionize infrastructure management through innovative technologies that enhance durability, 
                    safety, and sustainability while reducing lifetime costs.
                  </p>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                  <p className="text-neutral-400">
                    A world where infrastructure is intelligent, self-monitoring, and built with advanced materials 
                    that minimize environmental impact while maximizing performance.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-[#15171B] p-6 rounded-xl border border-electric-blue/10">
                  <div className="text-4xl font-bold text-electric-blue mb-2">12+</div>
                  <div className="text-white">Years of Research</div>
                </div>
                
                <div className="bg-[#15171B] p-6 rounded-xl border border-electric-blue/10">
                  <div className="text-4xl font-bold text-electric-blue mb-2">40+</div>
                  <div className="text-white">Research Papers</div>
                </div>
                
                <div className="bg-[#15171B] p-6 rounded-xl border border-electric-blue/10">
                  <div className="text-4xl font-bold text-electric-blue mb-2">16</div>
                  <div className="text-white">Patents</div>
                </div>
                
                <div className="bg-[#15171B] p-6 rounded-xl border border-electric-blue/10">
                  <div className="text-4xl font-bold text-electric-blue mb-2">240+</div>
                  <div className="text-white">Projects</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="scroll-animate"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-[#15171B] p-8 rounded-xl border border-electric-blue/10 relative">
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-electric-blue rounded-full"></div>
                <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-electric-blue rounded-full"></div>
                
                <h3 className="text-2xl font-bold text-white mb-6">Our Approach</h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="p-2 bg-electric-blue/10 rounded-lg text-electric-blue h-10 w-10 flex items-center justify-center shrink-0">
                      <Zap className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Research-Driven Innovation</h4>
                      <p className="text-neutral-400">
                        Our solutions begin with rigorous scientific research, leading to breakthrough technologies.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="p-2 bg-electric-blue/10 rounded-lg text-electric-blue h-10 w-10 flex items-center justify-center shrink-0">
                      <BarChart3 className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Data-Powered Intelligence</h4>
                      <p className="text-neutral-400">
                        We transform raw sensor data into actionable insights through advanced analytics and AI.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="p-2 bg-electric-blue/10 rounded-lg text-electric-blue h-10 w-10 flex items-center justify-center shrink-0">
                      <Shield className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Preventive Protection</h4>
                      <p className="text-neutral-400">
                        Our materials and monitoring systems prevent problems before they occur, extending infrastructure lifespan.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="p-2 bg-electric-blue/10 rounded-lg text-electric-blue h-10 w-10 flex items-center justify-center shrink-0">
                      <Building className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Future-Ready Engineering</h4>
                      <p className="text-neutral-400">
                        We design solutions that anticipate the challenges of tomorrow's infrastructure needs.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button 
                    className="bg-electric-blue hover:bg-electric-blue/80 text-white"
                    onClick={() => navigate('/about')}
                  >
                    Discover Our Story
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Core capabilities section */}
      <section ref={capabilitiesRef} className="py-24 bg-[#0A0C10] relative">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-electric-blue/5 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            title="Core Capabilities"
            subtitle="Our AI-driven technologies and monitoring solutions deliver real value across research, development, and critical infrastructure."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <TechnologyCard
              icon={<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L4 8L12 12L20 8L12 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 16L12 20L20 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 12L12 16L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>}
              title="Advanced Materials"
              description="Nano-enhanced concrete admixtures and PTFE-based waterproofing systems for unprecedented durability and performance."
            />
            
            <TechnologyCard
              icon={<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 16V8.00002C20.9996 7.6493 20.9071 7.30483 20.7315 7.00119C20.556 6.69754 20.3037 6.44539 20 6.27002L13 2.27002C12.696 2.09449 12.3511 2.00208 12 2.00208C11.6489 2.00208 11.304 2.09449 11 2.27002L4 6.27002C3.69626 6.44539 3.44398 6.69754 3.26846 7.00119C3.09294 7.30483 3.00036 7.6493 3 8.00002V16C3.00036 16.3508 3.09294 16.6952 3.26846 16.9989C3.44398 17.3025 3.69626 17.5547 4 17.73L11 21.73C11.304 21.9056 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9056 13 21.73L20 17.73C20.3037 17.5547 20.556 17.3025 20.7315 16.9989C20.9071 16.6952 20.9996 16.3508 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.27002 6.96002L12 12.01L20.73 6.96002" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22.08V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>}
              title="Structural Health Monitoring"
              description="AI-driven monitoring systems using distributed fiber optic sensors to detect and predict infrastructure issues."
            />
            
            <TechnologyCard
              icon={<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>}
              title="Acoustic Analysis Software"
              description="Proprietary software that analyzes acoustic signatures to identify early signs of structural deterioration."
            />
          </div>
          
          <div className="text-center mt-16">
            <Button 
              className="bg-electric-blue hover:bg-electric-blue/80 text-white"
              onClick={() => navigate('/technologies')}
            >
              Explore All Technologies
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Visualization section */}
      <section ref={scrollRef} className="py-24 relative">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Acoustic Index Visualizer"
            subtitle="Our proprietary acoustic analysis technology detects micro-fractures and structural weaknesses through advanced sound analysis."
          />
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="bg-[#15171B] p-6 rounded-xl border border-electric-blue/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="w-12 h-12 bg-electric-blue/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-electric-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.5 12H16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11 7.5L7.5 12L11 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-white text-xl font-bold mb-2">Data Capture</h3>
                <p className="text-neutral-400">
                  Our advanced sensors capture acoustic vibrations from infrastructure at ultra-high sampling rates, detecting frequencies beyond human hearing range.
                </p>
              </motion.div>
              
              <motion.div
                className="bg-[#15171B] p-6 rounded-xl border border-electric-blue/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="w-12 h-12 bg-electric-blue/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-electric-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 9V5C14 4.46957 13.7893 3.96086 13.4142 3.58579C13.0391 3.21071 12.5304 3 12 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H12C12.5304 21 13.0391 20.7893 13.4142 20.4142C13.7893 20.0391 14 19.5304 14 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 7H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 11H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 15H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 11L21 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 11L17 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-white text-xl font-bold mb-2">AI Analysis</h3>
                <p className="text-neutral-400">
                  Our proprietary machine learning algorithms analyze acoustic signatures against our database of over 10,000 structural failure patterns.
                </p>
              </motion.div>
              
              <motion.div
                className="bg-[#15171B] p-6 rounded-xl border border-electric-blue/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="w-12 h-12 bg-electric-blue/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-electric-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16L9 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 13L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-white text-xl font-bold mb-2">3D Visualization</h3>
                <p className="text-neutral-400">
                  Our system generates comprehensive 3D visualizations showing structural integrity hotspots with precise severity rankings.
                </p>
              </motion.div>
            </div>
            
            <motion.div
              className="mt-16 bg-[#15171B] p-6 rounded-xl border border-electric-blue/20 overflow-hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative aspect-video">
                <div className="absolute inset-0 bg-gradient-to-tr from-electric-blue/20 to-magenta/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-block p-4 bg-[#0D0F12]/80 rounded-xl mb-4">
                      <svg className="w-16 h-16 text-electric-blue mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 8L16 12L10 16V8Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="text-white text-xl font-bold">Watch Demo: Acoustic Analysis in Action</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Case studies section */}
      <section className="py-24 bg-[#0A0C10]">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Case Studies"
            subtitle="See how our technologies have been implemented in real-world infrastructure projects."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <CaseStudyCard
              title="Bridge Monitoring System"
              client="National Highway Authority"
              description="Implementation of our fiber optic SHM system on a major suspension bridge, providing real-time structural health data."
              image="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23252830'/%3E%3Cpath d='M100,200 L700,200 M150,200 L150,150 M250,200 L250,120 M350,200 L350,100 M450,200 L450,100 M550,200 L550,120 M650,200 L650,150' stroke='%230099ff' stroke-width='10' fill='none' /%3E%3Cpath d='M150,150 Q400,50 650,150' stroke='%230099ff' stroke-width='8' fill='none' /%3E%3C/svg%3E"
            />
            
            <CaseStudyCard
              title="Tunnel Waterproofing Project"
              client="European Transit Authority"
              description="Application of our PTFE-enhanced waterproofing system in a high-pressure underwater transit tunnel."
              image="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23252830'/%3E%3Ccircle cx='400' cy='200' r='150' stroke='%230099ff' stroke-width='10' fill='none' /%3E%3Cpath d='M250,200 L550,200' stroke='%230099ff' stroke-width='8' fill='none' /%3E%3Ccircle cx='400' cy='200' r='190' stroke='%230099ff' stroke-width='4' stroke-dasharray='15,10' fill='none' /%3E%3C/svg%3E"
            />
            
            <CaseStudyCard
              title="Dam Acoustic Monitoring"
              client="Regional Water Authority"
              description="Deployment of our acoustic analysis system to monitor an aging concrete dam for early detection of structural issues."
              image="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23252830'/%3E%3Cpath d='M150,300 L650,300 L650,100 L400,50 L150,100 Z' stroke='%230099ff' stroke-width='10' fill='none' /%3E%3Cpath d='M200,300 L200,120 M300,300 L300,100 M400,300 L400,80 M500,300 L500,100 M600,300 L600,120' stroke='%230099ff' stroke-width='4' stroke-dasharray='10,5' fill='none' /%3E%3C/svg%3E"
            />
          </div>
          
          <div className="text-center mt-16">
            <Button 
              className="bg-electric-blue hover:bg-electric-blue/80 text-white"
              onClick={() => navigate('/case-studies')}
            >
              View All Case Studies
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Tech stack section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-electric-blue/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-magenta/5 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            title="Technology Stack"
            subtitle="Our proprietary technologies leverage cutting-edge tools and frameworks."
          />
          
          <motion.div 
            className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className="p-6 bg-[#15171B] rounded-xl border border-electric-blue/10 hover:border-electric-blue/30 transition-colors duration-300 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-electric-blue/10 flex items-center justify-center">
                  <div className="w-6 h-6 text-electric-blue">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className="text-white font-medium">Technology {i + 1}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Team section */}
      <section className="py-24 bg-[#0A0C10]">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Our Team"
            subtitle="Meet the innovative minds behind QuantaFONS's groundbreaking technologies."
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <TeamMemberCard
              name="Dr. Amit Sharma"
              title="Founder & CEO"
              image="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23252830'/%3E%3Ccircle cx='200' cy='120' r='70' stroke='%230099ff' stroke-width='4' fill='none' /%3E%3Ccircle cx='200' cy='100' r='25' stroke='%230099ff' stroke-width='4' fill='none' /%3E%3Cpath d='M150,180 Q200,240 250,180' stroke='%230099ff' stroke-width='4' fill='none' /%3E%3C/svg%3E"
            />
            
            <TeamMemberCard
              name="Dr. Priya Patel"
              title="Chief Science Officer"
              image="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23252830'/%3E%3Ccircle cx='200' cy='120' r='70' stroke='%230099ff' stroke-width='4' fill='none' /%3E%3Ccircle cx='200' cy='100' r='25' stroke='%230099ff' stroke-width='4' fill='none' /%3E%3Cpath d='M150,180 Q200,240 250,180' stroke='%230099ff' stroke-width='4' fill='none' /%3E%3C/svg%3E"
            />
            
            <TeamMemberCard
              name="Dr. Rajiv Mehta"
              title="CTO"
              image="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23252830'/%3E%3Ccircle cx='200' cy='120' r='70' stroke='%230099ff' stroke-width='4' fill='none' /%3E%3Ccircle cx='200' cy='100' r='25' stroke='%230099ff' stroke-width='4' fill='none' /%3E%3Cpath d='M150,180 Q200,240 250,180' stroke='%230099ff' stroke-width='4' fill='none' /%3E%3C/svg%3E"
            />
            
            <TeamMemberCard
              name="Ananya Singh"
              title="AI Research Director"
              image="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23252830'/%3E%3Ccircle cx='200' cy='120' r='70' stroke='%230099ff' stroke-width='4' fill='none' /%3E%3Ccircle cx='200' cy='100' r='25' stroke='%230099ff' stroke-width='4' fill='none' /%3E%3Cpath d='M150,180 Q200,240 250,180' stroke='%230099ff' stroke-width='4' fill='none' /%3E%3C/svg%3E"
            />
          </div>
          
          <div className="text-center mt-16">
            <Button 
              className="bg-electric-blue hover:bg-electric-blue/80 text-white"
              onClick={() => navigate('/team')}
            >
              Meet Our Full Team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* QuantaFONS Sections */}
      <QFSection id="about" className="bg-[#0A0C10]" />
      <QFSection id="eli-s1" className="bg-[#0D0F12]" />
      <QFSection id="shm" className="bg-[#0A0C10]" />
      <QFSection id="it-services" className="bg-[#0D0F12]" />
      
      {/* Contact section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-full h-96 bg-gradient-to-b from-electric-blue/10 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-magenta/10 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            title="Get in Touch"
            subtitle="Interested in our technologies? Have a project in mind? We'd love to hear from you."
          />
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#15171B] p-8 rounded-xl border border-electric-blue/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-electric-blue/10 rounded-lg text-electric-blue h-10 w-10 flex items-center justify-center shrink-0 mt-1">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 10C20 14.4183 16.4183 18 12 18C11.1 18 10.2 17.8 9.4 17.5C8.4 18.5 7 19 5.5 19C5 19 4.5 18.9 4 18.8C4.5 18.3 4.9 17.7 5.1 17C3.8 15.7 3 13 3 10C3 5.58172 6.58172 2 12 2C17.4183 2 20 5.58172 20 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8 8H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-bold">Email</h4>
                        <a href="mailto:info@quantafons.com" className="text-electric-blue hover:underline">info@quantafons.com</a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-electric-blue/10 rounded-lg text-electric-blue h-10 w-10 flex items-center justify-center shrink-0 mt-1">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 16.92V19.92C22 20.4704 21.7893 20.9982 21.4142 21.3733C21.0391 21.7484 20.5113 21.9591 19.96 21.96C18.4243 21.96 16.9092 21.6261 15.5154 20.9839C14.1216 20.3417 12.8792 19.4079 11.8647 18.2553C10.8503 17.1028 10.0214 15.7565 9.47394 14.277C8.92653 12.7975 8.63865 11.2106 8.64 9.61998C8.64 9.06868 8.85071 8.54093 9.22574 8.16589C9.60076 7.79086 10.1285 7.58016 10.68 7.57998H13.68C14.1616 7.57563 14.6283 7.7539 14.9935 8.08034C15.3587 8.40677 15.5965 8.85656 15.66 9.33998C15.7754 10.178 15.9904 10.9975 16.3 11.78C16.4561 12.127 16.495 12.515 16.4121 12.8894C16.3293 13.2639 16.1287 13.6036 15.84 13.86L14.76 14.94C15.6652 16.1993 16.8425 17.2537 18.21 18.06L19.29 16.98C19.5464 16.6913 19.8861 16.4907 20.2605 16.4079C20.635 16.325 21.023 16.3639 21.37 16.52C22.1525 16.8296 22.972 17.0446 23.81 17.16C24.2935 17.2234 24.7432 17.4613 25.0697 17.8265C25.3961 18.1916 25.5744 18.6584 25.57 19.14L22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-bold">Phone</h4>
                        <a href="tel:+911234567890" className="text-electric-blue hover:underline">+91 123 456 7890</a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-electric-blue/10 rounded-lg text-electric-blue h-10 w-10 flex items-center justify-center shrink-0 mt-1">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-bold">Address</h4>
                        <p className="text-neutral-400">742, 7th Floor, Emaar Digital Greens<br/>Sector 61, Gurugram, India</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="text-white font-bold mb-4">Follow Us</h4>
                    <div className="flex gap-4">
                      <a href="#" className="p-2 bg-electric-blue/10 rounded-lg text-electric-blue hover:bg-electric-blue/20 transition-colors duration-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
                        </svg>
                      </a>
                      
                      <a href="#" className="p-2 bg-electric-blue/10 rounded-lg text-electric-blue hover:bg-electric-blue/20 transition-colors duration-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19,3H5C3.895,3 3,3.895 3,5V19C3,20.105 3.895,21 5,21H19C20.105,21 21,20.105 21,19V5C21,3.895 20.105,3 19,3M9,17H6.477V10H9V17M7.694,8.717C6.923,8.717 6.297,8.076 6.297,7.287C6.297,6.498 6.923,5.857 7.694,5.857C8.464,5.857 9.09,6.498 9.09,7.287C9.09,8.076 8.464,8.717 7.694,8.717M18,17H15.558V13.627C15.558,12.658 15.538,11.425 14.229,11.425C12.903,11.425 12.69,12.469 12.69,13.541V17H10.269V10H12.61V11.081H12.645C12.97,10.457 13.773,9.8 15.023,9.8C17.469,9.8 18,11.547 18,13.801V17Z" />
                        </svg>
                      </a>
                      
                      <a href="#" className="p-2 bg-electric-blue/10 rounded-lg text-electric-blue hover:bg-electric-blue/20 transition-colors duration-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2C22,19.4 19.4,22 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8C2,4.6 4.6,2 7.8,2M7.6,4C5.61,4 4,5.61 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4C18.39,20 20,18.39 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5C17.94,5.5 18.5,6.06 18.5,6.75C18.5,7.44 17.94,8 17.25,8C16.56,8 16,7.44 16,6.75C16,6.06 16.56,5.5 17.25,5.5M12,7C14.76,7 17,9.24 17,12C17,14.76 14.76,17 12,17C9.24,17 7,14.76 7,12C7,9.24 9.24,7 12,7M12,9C10.34,9 9,10.34 9,12C9,13.66 10.34,15 12,15C13.66,15 15,13.66 15,12C15,10.34 13.66,9 12,9Z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Send Us a Message</h3>
                  
                  <form className="space-y-4">
                    <div>
                      <label className="text-white block mb-2 text-sm">Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 bg-[#0D0F12] border border-electric-blue/20 rounded-lg text-white focus:outline-none focus:border-electric-blue"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label className="text-white block mb-2 text-sm">Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 bg-[#0D0F12] border border-electric-blue/20 rounded-lg text-white focus:outline-none focus:border-electric-blue"
                        placeholder="Your email"
                      />
                    </div>
                    
                    <div>
                      <label className="text-white block mb-2 text-sm">Message</label>
                      <textarea
                        className="w-full px-4 py-2 bg-[#0D0F12] border border-electric-blue/20 rounded-lg text-white focus:outline-none focus:border-electric-blue h-32"
                        placeholder="Your message"
                      ></textarea>
                    </div>
                    
                    <Button className="w-full bg-electric-blue hover:bg-electric-blue/80 text-white">
                      Send Message
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer is handled by the RootLayout component */}
    </div>
  );
};

export default LandingPage;