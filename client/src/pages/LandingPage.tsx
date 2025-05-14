import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lottie from "lottie-react";
import { ArrowRight, Check, ExternalLink, Github, Database, Server, Grid } from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// TypeWriter effect component
const TypeWriter = ({ text, delay = 40 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{displayText}<span className="animate-pulse">|</span></span>;
};

// FadeInText letter by letter component
const FadeInText = ({ text }: { text: string }) => {
  return (
    <span className="inline-block">
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, delay: index * 0.05 }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

// 3D Tilt Card component
const TiltCard = ({ title, description, icon, className }: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  className?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      card.style.transition = 'transform 0.1s ease';
    };
    
    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s ease';
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <motion.div
      ref={cardRef}
      className={`bg-gradient-to-br from-[#1A1D21] to-[#0D0F12] p-6 rounded-xl border border-electric-blue/30 shadow-xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4 h-14 w-14 bg-electric-blue/10 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-neutral-400">{description}</p>
    </motion.div>
  );
};

// Case Study Panel component
const CaseStudyPanel = ({ title, description, icon, bgClass }: {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgClass: string;
}) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <motion.div 
      className={`rounded-xl overflow-hidden shadow-lg relative group cursor-pointer ${expanded ? 'fixed inset-4 z-50 overflow-auto' : 'min-h-[350px]'}`}
      onClick={() => setExpanded(!expanded)}
      layoutId={`panel-${title}`}
    >
      <div className={`absolute inset-0 ${bgClass} transition-transform duration-700 group-hover:scale-110`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      <div className="relative z-10 p-6 h-full flex flex-col">
        <div className="text-electric-blue text-3xl mb-4">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-neutral-300 text-sm">{expanded ? description : `${description.substring(0, 100)}...`}</p>
        
        {expanded && (
          <motion.div 
            className="mt-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button variant="outline" className="border-electric-blue text-electric-blue hover:bg-electric-blue/20 mt-4">
              View Full Case Study <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            <p className="mt-6 text-sm text-neutral-400">Click anywhere to close</p>
          </motion.div>
        )}
        
        {!expanded && (
          <div className="mt-auto">
            <span className="text-electric-blue text-sm flex items-center">
              Click to expand <ArrowRight className="ml-1 h-3 w-3" />
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Team Member component
const TeamMember = ({ name, title, avatarSrc }: {
  name: string;
  title: string;
  avatarSrc: string;
}) => {
  const [bioOpen, setBioOpen] = useState(false);
  
  return (
    <motion.div 
      className="relative"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      onClick={() => setBioOpen(true)}
    >
      <div className="relative rounded-full w-32 h-32 mx-auto border-2 border-electric-blue/50 overflow-hidden cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/20 to-transparent animate-pulse" />
        <img src={avatarSrc} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="text-center mt-3">
        <h4 className="text-white font-semibold">{name}</h4>
        <p className="text-sm text-electric-blue">{title}</p>
      </div>
      
      {bioOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setBioOpen(false)}
        >
          <motion.div 
            className="bg-[#0D0F12] border border-electric-blue/30 rounded-xl p-6 max-w-lg mx-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start mb-4">
              <div className="rounded-full w-20 h-20 border-2 border-electric-blue/50 overflow-hidden">
                <img src={avatarSrc} alt={name} className="w-full h-full object-cover" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-white">{name}</h3>
                <p className="text-electric-blue">{title}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-white font-semibold mb-2">Expertise & Achievements</h4>
              <ul className="space-y-2">
                <li className="flex items-start text-neutral-300">
                  <Check className="h-5 w-5 text-electric-blue mr-2 flex-shrink-0 mt-0.5" />
                  <span>PhD in Civil Engineering with focus on Smart Infrastructure</span>
                </li>
                <li className="flex items-start text-neutral-300">
                  <Check className="h-5 w-5 text-electric-blue mr-2 flex-shrink-0 mt-0.5" />
                  <span>12+ patents in structural health monitoring technology</span>
                </li>
                <li className="flex items-start text-neutral-300">
                  <Check className="h-5 w-5 text-electric-blue mr-2 flex-shrink-0 mt-0.5" />
                  <span>Led R&D team behind QuantaFONS' PTFE-Nano waterproofing technology</span>
                </li>
              </ul>
            </div>
            
            <div className="text-right">
              <Button 
                variant="outline" 
                className="border-electric-blue text-electric-blue hover:bg-electric-blue/20"
                onClick={() => setBioOpen(false)}
              >
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

// Data Visualization component
const DataVisualization = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <motion.div 
      className="bg-[#0D0F12] border border-electric-blue/30 rounded-xl overflow-hidden shadow-lg"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 border-b border-electric-blue/30 flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      <div className="p-4">
        {children}
      </div>
    </motion.div>
  );
};

// Technology Card component
const TechnologyCard = ({ icon, name, description }: { 
  icon: React.ReactNode; 
  name: string; 
  description: string; 
}) => {
  return (
    <motion.div
      className="p-4 flex flex-col items-center justify-center text-center group"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <div className="text-electric-blue text-4xl mb-3 group-hover:animate-pulse">
        {icon}
      </div>
      <h4 className="text-white font-semibold mb-1">{name}</h4>
      <p className="text-xs text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{description}</p>
    </motion.div>
  );
};

// Main Landing Page component
const LandingPage = () => {
  // References for sections
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);
  const visualizationsRef = useRef<HTMLDivElement>(null);
  const caseStudiesRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  // Refs for animations
  const dataStreamCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // Intersection observer states
  const heroInView = useInView(heroRef, { once: false, amount: 0.5 });
  const aboutInView = useInView(aboutRef, { once: false, amount: 0.5 });
  
  // Scroll animation values
  const { scrollYProgress } = useScroll();
  const smoothScrollYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Initialize data stream animation
  useEffect(() => {
    const canvas = dataStreamCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Create data stream particles
    const particles: { x: number; y: number; size: number; speed: number; color: string }[] = [];
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 1 + 0.5,
        color: Math.random() > 0.5 ? '#0099ff' : '#ff00ff'
      });
    }
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Move particles
        particle.y += particle.speed;
        
        // Reset particle position when it goes off screen
        if (particle.y > canvas.height) {
          particle.y = 0;
          particle.x = Math.random() * canvas.width;
        }
      });
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <div className="bg-[#0D0F12] text-white min-h-screen relative">
      {/* Global progress indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-electric-blue/20 z-50">
        <motion.div 
          className="h-full bg-electric-blue"
          style={{ scaleX: smoothScrollYProgress, transformOrigin: "0% 50%" }}
        />
      </div>
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <canvas 
          ref={dataStreamCanvasRef}
          className="absolute inset-0 z-0 opacity-30"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D0F12] to-[#0D0F12] z-10" />
        
        <div className="container mx-auto px-4 relative z-20 text-center">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {heroInView && <FadeInText text="Quantum-Powered Insights • Real-Time Structural Intelligence" />}
          </motion.h1>
          
          <motion.div 
            className="text-xl sm:text-2xl text-electric-blue mb-12 h-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            {heroInView && <TypeWriter text="AI • Nano-Sensors • PTFE-Enhanced Waterproofing • Digital Twin Analytics" />}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            <Button 
              size="lg" 
              className="bg-transparent relative overflow-hidden border-2 border-electric-blue hover:bg-electric-blue/20 group"
            >
              <span className="relative z-10">Request Demo</span>
              <span className="absolute inset-0 bg-electric-blue/20 animate-pulse" />
              <ArrowRight className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-0"
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.5 }}
          >
            <ArrowRight className="h-6 w-6 transform rotate-90 text-white/50" />
          </motion.div>
        </div>
      </section>
      
      {/* About Us Section */}
      <section 
        ref={aboutRef}
        className="py-20 relative"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-12 relative inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              About QuantaFONS
              <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-electric-blue"></span>
            </motion.h2>
            
            <div className="space-y-16">
              {/* Timeline item 1 */}
              <motion.div 
                className="relative pl-10 border-l-2 border-electric-blue/50"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-electric-blue animate-pulse"></div>
                <h3 className="text-xl font-bold text-white mb-2">Founded 2024</h3>
                <p className="text-neutral-400">
                  QuantaFONS was established by a team of engineers and data scientists with the vision of revolutionizing infrastructure management through cutting-edge technology.
                </p>
              </motion.div>
              
              {/* Timeline item 2 */}
              <motion.div 
                className="relative pl-10 border-l-2 border-electric-blue/50"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-electric-blue animate-pulse"></div>
                <h3 className="text-xl font-bold text-white mb-2">PTFE Waterproofing R&D</h3>
                <p className="text-neutral-400">
                  Development of our proprietary PTFE-enhanced waterproofing system, offering unprecedented durability and protection for critical infrastructure.
                </p>
              </motion.div>
              
              {/* Timeline item 3 */}
              <motion.div 
                className="relative pl-10 border-l-2 border-electric-blue/50"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-electric-blue animate-pulse"></div>
                <h3 className="text-xl font-bold text-white mb-2">Quantum-Fiber SHM Launch</h3>
                <p className="text-neutral-400">
                  Introduction of our breakthrough quantum-fiber structural health monitoring system, capable of detecting micro-changes in structural integrity with unparalleled accuracy.
                </p>
              </motion.div>
              
              {/* Timeline item 4 */}
              <motion.div 
                className="relative pl-10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-electric-blue animate-pulse"></div>
                <h3 className="text-xl font-bold text-white mb-2">AI-Analytics Platform</h3>
                <p className="text-neutral-400">
                  Launch of our cloud-based AI analytics platform, providing real-time structural intelligence and predictive maintenance insights for infrastructure managers.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Core Capabilities Section */}
      <section 
        ref={capabilitiesRef}
        className="py-20 relative"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Core Capabilities
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-electric-blue"></span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TiltCard 
              title="PTFE-Nano Waterproofing"
              description="Our proprietary PTFE-based waterproofing system provides unparalleled protection against water intrusion, extending infrastructure lifespan by decades."
              icon={<div className="w-10 h-10 text-electric-blue flex items-center justify-center">
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" className="animate-pulse" />
                  <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" className="animate-ping" />
                  <circle cx="12" cy="12" r="2" fill="currentColor" />
                </svg>
              </div>}
            />
            
            <TiltCard 
              title="Quantum Fiber Sensors"
              description="Ultra-precise fiber optic sensing technology that monitors structural strain, temperature, and vibration with quantum-level accuracy in real-time."
              icon={<div className="w-10 h-10 text-electric-blue flex items-center justify-center relative">
                <div className="absolute w-full h-0.5 bg-electric-blue top-1/2 -translate-y-1/2 animate-[pulse_2s_ease-in-out_infinite]"></div>
                <div className="absolute h-full w-0.5 bg-electric-blue left-1/2 -translate-x-1/2 animate-[pulse_3s_ease-in-out_infinite]"></div>
                <div className="w-2 h-2 bg-electric-blue rounded-full animate-ping"></div>
              </div>}
            />
            
            <TiltCard 
              title="AI Analytics Engine"
              description="Our neural network-based analytics system processes sensor data to predict structural behavior and identify potential issues before they become critical."
              icon={<div className="w-10 h-10 text-electric-blue flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse"/>
                </svg>
              </div>}
            />
            
            <TiltCard 
              title="Digital Twin Simulation"
              description="Complete digital replicas of physical structures that enable virtual testing, scenario planning, and optimized maintenance scheduling."
              icon={<div className="w-10 h-10 text-electric-blue flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="4" width="16" height="16" stroke="currentColor" strokeWidth="1.5" fill="none" className="animate-[pulse_4s_infinite]" />
                  <path d="M4 4L12 12M12 12L20 4M12 12L4 20M12 12L20 20" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>}
            />
          </div>
        </div>
      </section>
      
      {/* Live Data Visualizations Section */}
      <section 
        ref={visualizationsRef}
        className="py-20 relative"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Live Data Visualizations
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-electric-blue"></span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DataVisualization title="Strain vs. Time">
              <div className="h-64 w-full bg-[#151A1E] rounded-lg overflow-hidden relative">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0099ff" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#0099ff" stopOpacity="0" />
                  </linearGradient>
                  <path 
                    d="M0 50 L10 48 L20 52 L30 45 L40 55 L50 40 L60 60 L70 30 L80 50 L90 35 L100 45" 
                    fill="none" 
                    stroke="#0099ff" 
                    strokeWidth="1.5"
                    className="animate-pulse"
                  />
                  <path 
                    d="M0 50 L10 48 L20 52 L30 45 L40 55 L50 40 L60 60 L70 30 L80 50 L90 35 L100 45 V100 H0 Z" 
                    fill="url(#lineGradient)"
                  />
                </svg>
                <div className="absolute bottom-2 right-2 text-xs text-electric-blue bg-[#0D0F12]/80 p-1 rounded">
                  Live
                </div>
              </div>
            </DataVisualization>
            
            <DataVisualization title="Corrosion Risk Heatmap">
              <div className="h-64 w-full bg-[#151A1E] rounded-lg overflow-hidden relative">
                <div className="grid grid-cols-10 grid-rows-10 gap-1 p-2 h-full w-full">
                  {Array.from({ length: 100 }).map((_, index) => {
                    const row = Math.floor(index / 10);
                    const col = index % 10;
                    const intensity = (Math.sin(row * 0.5) + Math.cos(col * 0.5) + 2) / 4;
                    const hue = 200 - intensity * 200; // Blue to red
                    
                    return (
                      <div 
                        key={index} 
                        className="rounded-sm animate-pulse"
                        style={{ 
                          backgroundColor: `hsla(${hue}, 100%, 50%, ${0.3 + intensity * 0.7})`,
                          animationDelay: `${(row + col) * 0.1}s`,
                          animationDuration: '3s'
                        }}
                      />
                    );
                  })}
                </div>
                <div className="absolute bottom-2 right-2 text-xs text-electric-blue bg-[#0D0F12]/80 p-1 rounded">
                  Live
                </div>
              </div>
            </DataVisualization>
            
            <DataVisualization title="Carbonation Depth Profile">
              <div className="h-64 w-full bg-[#151A1E] rounded-lg overflow-hidden relative">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ff00ff" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ff00ff" stopOpacity="0" />
                  </linearGradient>
                  <path 
                    d="M0 80 Q25 60 50 70 T100 50 V100 H0 Z" 
                    fill="url(#areaGradient)"
                    className="animate-pulse"
                  />
                  <path 
                    d="M0 80 Q25 60 50 70 T100 50" 
                    fill="none" 
                    stroke="#ff00ff" 
                    strokeWidth="1.5"
                  />
                </svg>
                <div className="absolute bottom-2 right-2 text-xs text-electric-blue bg-[#0D0F12]/80 p-1 rounded">
                  Live
                </div>
              </div>
            </DataVisualization>
          </div>
        </div>
      </section>
      
      {/* Case Studies Section */}
      <section 
        ref={caseStudiesRef}
        className="py-20 relative"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Case Studies
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-electric-blue"></span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CaseStudyPanel 
              title="Mumbai Metro Waterproofing"
              description="Implementation of our PTFE-Nano waterproofing system for Mumbai Metro's underground sections, preventing water ingress in one of the world's most challenging monsoon environments. The system has maintained complete waterproofing integrity for 3+ years with zero reported leakages, compared to industry standard solutions that typically show signs of failure within 18 months in similar conditions."
              icon={<svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 16.2236C7 18.5034 9.01472 20 11.5 20C13.9853 20 16 18.5034 16 16.2236" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M4 9L4 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M20 9V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M11 6H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M4 13L20 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M4 10C4 7.17157 4 5.75736 4.87868 4.87868C5.75736 4 7.17157 4 10 4H14C16.8284 4 18.2426 4 19.1213 4.87868C20 5.75736 20 7.17157 20 10V14C20 16.8284 20 18.2426 19.1213 19.1213C18.2426 20 16.8284 20 14 20H10C7.17157 20 5.75736 20 4.87868 19.1213C4 18.2426 4 16.8284 4 14V10Z" stroke="currentColor" strokeWidth="1.5"/>
              </svg>}
              bgClass="bg-gradient-to-br from-blue-900/50 to-blue-600/10"
            />
            
            <CaseStudyPanel 
              title="Delhi Airport Runway SHM"
              description="Deployment of our quantum-fiber structural health monitoring system across Delhi International Airport's primary runway, enabling real-time detection of subsurface voids and structural fatigue. The system identified early signs of base course erosion in two locations, allowing for targeted maintenance that prevented potential runway closure and saved an estimated $3.2M in emergency repairs and operational disruption."
              icon={<svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 4.5V9.5C10.5 9.5 10.5 10.5 9.5 10.5C8.5 10.5 8.5 9.5 8.5 9.5C8.5 9.5 8.5 8.5 7.5 8.5C6.5 8.5 6.5 9.5 6.5 9.5C6.5 9.5 6.5 10.5 5.5 10.5C4.5 10.5 4.5 9.5 4.5 9.5V4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.5 9.5V4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.5 19.5L13.5 14.5L15.5 9.5L17.5 14.5L15.5 19.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.5 19.5V14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.5 19.5C10.5 19.5 8.5 19.5 8.5 17.5C8.5 15.5 10.5 14.5 10.5 14.5C10.5 14.5 12.5 15.5 12.5 17.5C12.5 19.5 10.5 19.5 10.5 19.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.5 19.5V14.5L7.5 17L4.5 19.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20.5 9.5V4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.5 7.5H22.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20.5 14.5V19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.5 16.5H22.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>}
              bgClass="bg-gradient-to-br from-green-900/50 to-green-600/10"
            />
            
            <CaseStudyPanel 
              title="Hyderabad High-Rise Digital Twin"
              description="Creation of a comprehensive digital twin for Hyderabad's 62-story Centennial Tower, integrating real-time monitoring data with predictive simulation capabilities. The digital twin enabled scenario planning for structural reinforcement to accommodate a planned 8-story addition, predicting stress distribution patterns with 97% accuracy when compared to physical testing, and reducing design optimization time from 6 months to 6 weeks."
              icon={<svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 22L12 2L22 22H2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 18L17 13L11 15L7 11L12 18Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>}
              bgClass="bg-gradient-to-br from-purple-900/50 to-purple-600/10"
            />
          </div>
        </div>
      </section>
      
      {/* Technology Stack Section */}
      <section 
        ref={techStackRef}
        className="py-20 relative"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Technology Stack & R&D
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-electric-blue"></span>
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <TechnologyCard 
              icon={<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5.5C13.66 5.5 15 6.84 15 8.5C15 10.16 13.66 11.5 12 11.5C10.34 11.5 9 10.16 9 8.5C9 6.84 10.34 5.5 12 5.5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="currentColor"/>
              </svg>}
              name="Python"
              description="Core language for our AI/ML models and data processing pipeline."
            />
            
            <TechnologyCard 
              icon={<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.0883 12.0005C22.0883 10.8155 21.9453 9.72051 21.6833 8.72551L21.6693 8.67651L21.6553 8.62651C20.5333 4.86651 17.2353 2.14251 13.2443 2.14251C11.0753 2.14251 9.08434 2.92851 7.56134 4.25951L8.90934 5.16751C10.1413 4.11251 11.6243 3.50051 13.2443 3.50051C16.4123 3.50051 19.0883 5.65551 20.0953 8.63551C20.3133 9.48051 20.4293 10.4055 20.4293 11.3895V12.0005C20.4293 12.6115 20.3653 13.2085 20.2453 13.7875C19.3923 17.3735 16.6053 20.0005 13.2443 20.0005C11.6223 20.0005 10.1393 19.3865 8.90634 18.3315L7.55934 19.2405C9.08334 20.5695 11.0733 21.3555 13.2443 21.3555C17.2343 21.3555 20.5323 18.6345 21.6543 14.8745C21.9403 13.9825 22.0883 13.0125 22.0883 12.0005Z" fill="currentColor"/>
                <path d="M21.0543 5.74352L14.0283 10.6885L14.0393 14.2085L17.5023 11.8315L17.5173 17.6345L19.5493 16.2425L19.5313 10.4405L21.0543 9.39552V5.74352Z" fill="currentColor"/>
                <path d="M12.4283 10.6885L5.40234 5.74352V9.39552L6.92535 10.4405L6.90734 16.2425L8.93935 17.6345L8.95436 11.8315L12.4173 14.2085L12.4283 10.6885Z" fill="currentColor"/>
              </svg>}
              name="TensorFlow"
              description="Deep learning framework for our neural network models."
            />
            
            <TechnologyCard 
              icon={<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22V12M12 12L21 7M12 12L3 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 2V12M12 12L3 17M12 12L21 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>}
              name="Node.js"
              description="Backend runtime for our data processing APIs and dashboards."
            />
            
            <TechnologyCard 
              icon={<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5 16.5L21 21M18.75 11.625C18.75 15.5869 15.5369 18.75 11.625 18.75C7.71307 18.75 4.5 15.5869 4.5 11.625C4.5 7.66307 7.71307 4.5 11.625 4.5C15.5369 4.5 18.75 7.66307 18.75 11.625Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.625 8.25V12M11.625 12V15.75M11.625 12H15.375M11.625 12H7.875" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>}
              name="WebGL"
              description="Graphics API for our 3D visualizations and digital twins."
            />
            
            <TechnologyCard 
              icon={<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>}
              name="Three.js"
              description="JavaScript 3D library for interactive structural visualizations."
            />
            
            <TechnologyCard 
              icon={<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M18 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 18V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>}
              name="D3.js"
              description="Data visualization library for our analytics dashboards."
            />
            
            <TechnologyCard 
              icon={<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
                <path d="M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>}
              name="SolidWorks"
              description="CAD software for our structural design and simulation."
            />
            
            <TechnologyCard 
              icon={<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L14.5 2.90175L17 3.80349L18.1962 6.15635L19.3923 8.5092L19.3923 11.5L19.3923 14.4908L18.1962 16.8436L17 19.1965L14.5 20.0982L12 21L9.5 20.0982L7 19.1965L5.80385 16.8436L4.60769 14.4908L4.60769 11.5L4.60769 8.5092L5.80385 6.15635L7 3.80349L9.5 2.90175L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M12 16L12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="8" r="1" fill="currentColor"/>
              </svg>}
              name="COMSOL"
              description="Multiphysics simulation software for complex structural analysis."
            />
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section 
        ref={teamRef}
        className="py-20 relative"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Team & Lab
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-electric-blue"></span>
          </motion.h2>
          
          <div className="flex flex-wrap justify-center gap-10">
            <TeamMember 
              name="Dr. Amit Sharma"
              title="Founder & CEO"
              avatarSrc="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Crect width='160' height='160' fill='%23252830'/%3E%3Ctext x='50%' y='50%' font-size='48' text-anchor='middle' alignment-baseline='middle' font-family='sans-serif' fill='%230099ff'%3EAS%3C/text%3E%3C/svg%3E"
            />
            
            <TeamMember 
              name="Dr. Priya Patel"
              title="Chief Science Officer"
              avatarSrc="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Crect width='160' height='160' fill='%23252830'/%3E%3Ctext x='50%' y='50%' font-size='48' text-anchor='middle' alignment-baseline='middle' font-family='sans-serif' fill='%230099ff'%3EPP%3C/text%3E%3C/svg%3E"
            />
            
            <TeamMember 
              name="Dr. Rajiv Mehta"
              title="Chief Technology Officer"
              avatarSrc="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Crect width='160' height='160' fill='%23252830'/%3E%3Ctext x='50%' y='50%' font-size='48' text-anchor='middle' alignment-baseline='middle' font-family='sans-serif' fill='%230099ff'%3ERM%3C/text%3E%3C/svg%3E"
            />
            
            <TeamMember 
              name="Ananya Singh"
              title="Data Science Lead"
              avatarSrc="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Crect width='160' height='160' fill='%23252830'/%3E%3Ctext x='50%' y='50%' font-size='48' text-anchor='middle' alignment-baseline='middle' font-family='sans-serif' fill='%230099ff'%3EAS%3C/text%3E%3C/svg%3E"
            />
            
            <TeamMember 
              name="Vikram Reddy"
              title="Engineering Director"
              avatarSrc="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Crect width='160' height='160' fill='%23252830'/%3E%3Ctext x='50%' y='50%' font-size='48' text-anchor='middle' alignment-baseline='middle' font-family='sans-serif' fill='%230099ff'%3EVR%3C/text%3E%3C/svg%3E"
            />
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section 
        ref={contactRef}
        className="py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#0D0F12] opacity-80"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-electric-blue/5 to-magenta/5"></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-full h-full max-w-4xl max-h-4xl rounded-full bg-electric-blue animate-pulse"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Contact / Demo Request
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-electric-blue"></span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-6 text-white">Request Information</h3>
              
              <div className="space-y-4">
                <div className="rounded-lg bg-[#1A1D21] p-4 border border-electric-blue/30 flex items-center">
                  <div className="bg-electric-blue/10 rounded-full p-2 mr-4">
                    <Check className="h-5 w-5 text-electric-blue" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Your Industry</h4>
                    <p className="text-sm text-neutral-400">We specialize in infrastructure, buildings, and industrial facilities</p>
                  </div>
                </div>
                
                <div className="rounded-lg bg-[#1A1D21] p-4 border border-electric-blue/30 flex items-center">
                  <div className="bg-electric-blue/10 rounded-full p-2 mr-4">
                    <Check className="h-5 w-5 text-electric-blue" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Project Type</h4>
                    <p className="text-sm text-neutral-400">New construction, retrofitting, or ongoing monitoring</p>
                  </div>
                </div>
                
                <div className="rounded-lg bg-[#1A1D21] p-4 border border-electric-blue/30 flex items-center">
                  <div className="bg-electric-blue/10 rounded-full p-2 mr-4">
                    <Check className="h-5 w-5 text-electric-blue" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Budget Range</h4>
                    <p className="text-sm text-neutral-400">We offer solutions for projects of all sizes</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-6 text-white">Contact Details</h3>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-neutral-300 mb-1">First Name</label>
                    <input
                      type="text"
                      id="first-name"
                      className="w-full bg-[#1A1D21] border border-electric-blue/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-electric-blue/50 focus:border-electric-blue focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-neutral-300 mb-1">Last Name</label>
                    <input
                      type="text"
                      id="last-name"
                      className="w-full bg-[#1A1D21] border border-electric-blue/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-electric-blue/50 focus:border-electric-blue focus:outline-none transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-[#1A1D21] border border-electric-blue/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-electric-blue/50 focus:border-electric-blue focus:outline-none transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-neutral-300 mb-1">Company</label>
                  <input
                    type="text"
                    id="company"
                    className="w-full bg-[#1A1D21] border border-electric-blue/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-electric-blue/50 focus:border-electric-blue focus:outline-none transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full bg-[#1A1D21] border border-electric-blue/30 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-electric-blue/50 focus:border-electric-blue focus:outline-none transition-all resize-none"
                  ></textarea>
                </div>
                
                <div className="pt-2">
                  <Button className="w-full bg-electric-blue hover:bg-electric-blue/90 text-white relative overflow-hidden group">
                    <span className="relative z-10">Submit Request</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-electric-blue via-magenta to-electric-blue bg-[length:200%_100%] animate-gradient"></span>
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 border-t border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-white">QuantaFONS</h2>
              <p className="text-neutral-400">Quantum-Powered Structural Intelligence</p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-neutral-400 hover:text-electric-blue transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path></svg>
              </a>
              <a href="#" className="text-neutral-400 hover:text-electric-blue transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="text-neutral-400 hover:text-electric-blue transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-neutral-800 text-center text-neutral-500 text-sm">
            &copy; {new Date().getFullYear()} QuantaFONS Pvt. Ltd. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;