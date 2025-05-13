import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, useAnimation, useInView, useScroll, useTransform } from "framer-motion";
import ParticleBackground from "@/components/ParticleBackground";
import { ArrowRight, ChevronDown, BookOpen, Award, Database, Server, BarChart2, GitBranch } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lottie from "lottie-react";

// Import GSAP ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Animation variants
const heroTextVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const heroChildVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 12 
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.215, 0.61, 0.355, 1] 
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const featureCardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1]
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0, 0.71, 0.2, 1.01]
    }
  }
};

// Lottie animation data for acoustic waves
const acousticAnimationData = {
  "v": "4.8.0",
  "fr": 60,
  "ip": 0,
  "op": 180,
  "w": 1920,
  "h": 1080,
  "nm": "Sound Waves",
  "ddd": 0,
  "assets": [],
  "layers": [
    {
      "ddd": 0,
      "ind": 1,
      "ty": 4,
      "nm": "Wave 1",
      "sr": 1,
      "ks": {
        "o": { "a": 0, "k": 100 },
        "p": { "a": 0, "k": [960, 540, 0] },
        "a": { "a": 0, "k": [0, 0, 0] },
        "s": { "a": 0, "k": [100, 100, 100] }
      },
      "ao": 0,
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "ind": 0,
              "ty": "sh",
              "ix": 1,
              "ks": {
                "a": 1,
                "k": [
                  {
                    "i": { "x": 0.5, "y": 0 },
                    "o": { "x": 0.5, "y": 1 },
                    "t": 0,
                    "s": [
                      {
                        "i": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
                        "o": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
                        "v": [
                          [-600, 0],
                          [-450, 80],
                          [-300, -80],
                          [-150, 160],
                          [0, -160],
                          [150, 160],
                          [300, -80],
                          [450, 80],
                          [600, 0]
                        ],
                        "c": false
                      }
                    ]
                  },
                  {
                    "t": 90,
                    "s": [
                      {
                        "i": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
                        "o": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
                        "v": [
                          [-600, 0],
                          [-450, -80],
                          [-300, 80],
                          [-150, -160],
                          [0, 160],
                          [150, -160],
                          [300, 80],
                          [450, -80],
                          [600, 0]
                        ],
                        "c": false
                      }
                    ]
                  },
                  {
                    "t": 180,
                    "s": [
                      {
                        "i": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
                        "o": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
                        "v": [
                          [-600, 0],
                          [-450, 80],
                          [-300, -80],
                          [-150, 160],
                          [0, -160],
                          [150, 160],
                          [300, -80],
                          [450, 80],
                          [600, 0]
                        ],
                        "c": false
                      }
                    ]
                  }
                ],
                "ix": 2
              },
              "nm": "Path 1",
              "mn": "ADBE Vector Shape - Group",
              "hd": false
            },
            {
              "ty": "st",
              "c": { "a": 0, "k": [0, 0.4, 0.8, 1], "ix": 3 },
              "o": { "a": 0, "k": 100, "ix": 4 },
              "w": { "a": 0, "k": 12, "ix": 5 },
              "lc": 2,
              "lj": 2,
              "bm": 0,
              "nm": "Stroke 1",
              "mn": "ADBE Vector Graphic - Stroke",
              "hd": false
            }
          ],
          "nm": "Wave Group",
          "np": 2,
          "cix": 2,
          "bm": 0,
          "ix": 1,
          "mn": "ADBE Vector Group",
          "hd": false
        }
      ],
      "ip": 0,
      "op": 180,
      "st": 0,
      "bm": 0
    }
  ]
};

const Home = () => {
  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const acousticRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  // InView states
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.5 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const acousticInView = useInView(acousticRef, { once: true, amount: 0.3 });

  // Animation controls
  const statsControls = useAnimation();
  const featuresControls = useAnimation();
  const acousticControls = useAnimation();

  // Parallax effect for hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Trigger animations when sections come into view
  useEffect(() => {
    if (statsInView) statsControls.start("visible");
    if (featuresInView) featuresControls.start("visible");
    if (acousticInView) acousticControls.start("visible");
  }, [statsInView, featuresInView, acousticInView, statsControls, featuresControls, acousticControls]);

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Animate stats counters on scroll
    const statsElements = document.querySelectorAll('.stat-item');
    
    statsElements.forEach((el, index) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out"
      });
    });

    // Animate acoustic demo section
    if (acousticRef.current) {
      gsap.fromTo(
        acousticRef.current.querySelectorAll('.gsap-stagger'),
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: acousticRef.current,
            start: "top 70%"
          },
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out"
        }
      );
    }

    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center bg-gradient-to-br from-primary/90 to-secondary/90 dark:from-neutral-900/95 dark:to-neutral-800/95 text-white overflow-hidden"
      >
        {/* Dynamic 3D Particle Background */}
        <ParticleBackground count={3000} density={30} />
        
        {/* Parallax content */}
        <motion.div 
          className="absolute inset-0 z-10 flex items-center"
          style={{ y, opacity }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              className="max-w-4xl"
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={heroTextVariants}
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight"
                variants={heroChildVariants}
              >
                <span className="block">Innovative IT Solutions for</span>
                <span className="block text-accent">Tomorrow's Challenges</span>
              </motion.h1>
              
              <motion.p 
                className="mt-6 text-xl md:text-2xl text-white/90 max-w-3xl leading-relaxed"
                variants={heroChildVariants}
              >
                Empowering infrastructure with AI, data science & acoustic analytics.
              </motion.p>
              
              <motion.div 
                className="mt-10 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0"
                variants={heroChildVariants}
              >
                <Link href="/contact">
                  <Button 
                    size="lg" 
                    className="bg-accent hover:bg-accent/80 text-white text-lg px-8 py-6 h-auto rounded-lg group transition-all duration-300 shadow-lg hover:shadow-accent/20 hover:shadow-2xl"
                  >
                    <span>Request a Demo</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/technologies">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 h-auto rounded-lg backdrop-blur-sm"
                  >
                    Explore R&D Labs
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="h-8 w-8 text-white/70" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section - Enhanced with animations */}
      <section ref={statsRef} className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            animate={statsControls}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
              Global Impact <span className="text-primary dark:text-accent">Metrics</span>
            </h2>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Leading the way in R&D innovation with measurable results across continents.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <motion.div 
              className="stat-item flex flex-col items-center p-6 bg-neutral-50 dark:bg-neutral-800 rounded-xl shadow-sm"
              variants={fadeInUp}
              initial="hidden"
              animate={statsControls}
            >
              <div className="flex items-center justify-center w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-full mb-4">
                <BookOpen className="h-6 w-6 text-primary dark:text-accent" />
              </div>
              <div className="text-4xl font-bold text-primary dark:text-accent">
                <CountUp end={50} duration={2.5} suffix="+" />
              </div>
              <p className="mt-2 text-neutral-700 dark:text-neutral-300">R&D Projects</p>
            </motion.div>
            
            <motion.div 
              className="stat-item flex flex-col items-center p-6 bg-neutral-50 dark:bg-neutral-800 rounded-xl shadow-sm"
              variants={fadeInUp}
              initial="hidden"
              animate={statsControls}
            >
              <div className="flex items-center justify-center w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-full mb-4">
                <Award className="h-6 w-6 text-primary dark:text-accent" />
              </div>
              <div className="text-4xl font-bold text-primary dark:text-accent">
                <CountUp end={24} duration={2.5} />
              </div>
              <p className="mt-2 text-neutral-700 dark:text-neutral-300">Patents Filed</p>
            </motion.div>
            
            <motion.div 
              className="stat-item flex flex-col items-center p-6 bg-neutral-50 dark:bg-neutral-800 rounded-xl shadow-sm"
              variants={fadeInUp}
              initial="hidden"
              animate={statsControls}
            >
              <div className="flex items-center justify-center w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-full mb-4">
                <Database className="h-6 w-6 text-primary dark:text-accent" />
              </div>
              <div className="text-4xl font-bold text-primary dark:text-accent">
                <CountUp end={10} duration={2.5} suffix="TB" />
              </div>
              <p className="mt-2 text-neutral-700 dark:text-neutral-300">Data Processed</p>
            </motion.div>
            
            <motion.div 
              className="stat-item flex flex-col items-center p-6 bg-neutral-50 dark:bg-neutral-800 rounded-xl shadow-sm"
              variants={fadeInUp}
              initial="hidden"
              animate={statsControls}
            >
              <div className="flex items-center justify-center w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-full mb-4">
                <GitBranch className="h-6 w-6 text-primary dark:text-accent" />
              </div>
              <div className="text-4xl font-bold text-primary dark:text-accent">
                <CountUp end={15} duration={2.5} />
              </div>
              <p className="mt-2 text-neutral-700 dark:text-neutral-300">Global Partners</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Technologies Section */}
      <section ref={featuresRef} className="py-20 bg-neutral-50 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            animate={featuresControls}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
              Core <span className="text-primary dark:text-accent">R&D</span> Domains
            </h2>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Our research spans multiple domains, creating innovative solutions for tomorrow's challenges.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={featuresControls}
          >
            {/* Technology Card 1 */}
            <motion.div 
              className="bg-white dark:bg-neutral-700 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group"
              variants={featureCardVariants}
            >
              <div className="h-48 overflow-hidden bg-gradient-to-br from-primary to-blue-700 dark:from-primary dark:to-blue-600">
                <div className="w-full h-full flex items-center justify-center">
                  <Server className="text-white/90 h-16 w-16 group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Acoustic Analytics Platform</h3>
                <p className="mt-3 text-neutral-600 dark:text-neutral-300">
                  Advanced signal processing algorithms for analyzing and interpreting acoustic data from infrastructure.
                </p>
                <Link href="/technologies" className="inline-flex items-center mt-4 text-primary dark:text-accent font-medium">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* Technology Card 2 */}
            <motion.div 
              className="bg-white dark:bg-neutral-700 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group"
              variants={featureCardVariants}
            >
              <div className="h-48 overflow-hidden bg-gradient-to-br from-accent to-blue-400 dark:from-accent dark:to-blue-500">
                <div className="w-full h-full flex items-center justify-center">
                  <BarChart2 className="text-white/90 h-16 w-16 group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Predictive Maintenance AI</h3>
                <p className="mt-3 text-neutral-600 dark:text-neutral-300">
                  Neural network models that predict maintenance needs before critical failures occur.
                </p>
                <Link href="/technologies" className="inline-flex items-center mt-4 text-primary dark:text-accent font-medium">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            {/* Technology Card 3 */}
            <motion.div 
              className="bg-white dark:bg-neutral-700 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group md:col-span-2 lg:col-span-1"
              variants={featureCardVariants}
            >
              <div className="h-48 overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500">
                <div className="w-full h-full flex items-center justify-center">
                  <svg 
                    className="text-white/90 h-16 w-16 group-hover:scale-110 transition-transform duration-500" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm-1 17.9c-4.4-.5-7.9-4-8.4-8.4l8.4-1v9.4zm1-9.9l8.4 1c-.5 4.4-4 7.9-8.4 8.4v-9.4z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Sensor Integration Systems</h3>
                <p className="mt-3 text-neutral-600 dark:text-neutral-300">
                  Unified platform for managing and analyzing multi-source sensor data from infrastructure.
                </p>
                <Link href="/technologies" className="inline-flex items-center mt-4 text-primary dark:text-accent font-medium">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Acoustic Software Demo Section */}
      <section ref={acousticRef} className="py-24 bg-gradient-to-br from-white to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              className="mb-10 lg:mb-0"
              variants={fadeInUp}
              initial="hidden"
              animate={acousticControls}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white gsap-stagger">
                Acoustic <span className="text-primary dark:text-accent">Analysis</span> Software
              </h2>
              <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 gsap-stagger">
                Our proprietary acoustic analysis platform transforms raw vibration data into actionable insights, helping predict structural failures before they occur.
              </p>
              
              <div className="mt-8 space-y-6">
                <div className="flex items-start gsap-stagger">
                  <div className="flex-shrink-0 p-2 bg-primary/10 dark:bg-primary/20 rounded-lg mt-1">
                    <svg className="h-5 w-5 text-primary dark:text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-neutral-900 dark:text-white">Real-time Frequency Analysis</h4>
                    <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                      Process acoustic signatures in real-time to identify structural anomalies.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gsap-stagger">
                  <div className="flex-shrink-0 p-2 bg-primary/10 dark:bg-primary/20 rounded-lg mt-1">
                    <svg className="h-5 w-5 text-primary dark:text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-neutral-900 dark:text-white">ML-Driven Pattern Recognition</h4>
                    <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                      Machine learning algorithms to detect patterns indicating potential structural compromises.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gsap-stagger">
                  <div className="flex-shrink-0 p-2 bg-primary/10 dark:bg-primary/20 rounded-lg mt-1">
                    <svg className="h-5 w-5 text-primary dark:text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-neutral-900 dark:text-white">Predictive Alert System</h4>
                    <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                      Advanced alerting system with 98.7% prediction accuracy for structural failures.
                    </p>
                  </div>
                </div>
              </div>
              
              <motion.div 
                className="mt-10"
                variants={fadeInUp}
                initial="hidden"
                animate={acousticControls}
              >
                <Link href="/technologies">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/80 text-white group transition-all duration-300 shadow-lg hover:shadow-primary/20 hover:shadow-xl"
                  >
                    <span>Request Demo Access</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              className="rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-neutral-700 gsap-stagger"
              variants={scaleIn}
              initial="hidden"
              animate={acousticControls}
            >
              <div className="p-6 bg-primary/10 dark:bg-primary/20 border-b border-neutral-200 dark:border-neutral-600">
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white">Acoustic Index Visualizer</h3>
              </div>
              
              <div className="p-6 h-80 flex items-center justify-center">
                <div className="w-full max-w-md">
                  <Lottie 
                    animationData={acousticAnimationData} 
                    loop={true}
                    className="w-full h-64"
                  />
                  
                  <div className="mt-6 px-4">
                    <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                      <span>Frequency Range</span>
                      <span>20Hz - 20kHz</span>
                    </div>
                    <div className="h-2 bg-neutral-200 dark:bg-neutral-600 rounded-full overflow-hidden">
                      <div className="h-full bg-accent w-3/4 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-24 bg-gradient-to-br from-primary to-secondary dark:from-neutral-800 dark:to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Ready to Revolutionize Your<br />Infrastructure Management?
            </h2>
            
            <p className="mt-6 text-xl text-white/80 max-w-3xl mx-auto">
              Partner with QuantaFONS to access cutting-edge R&D technologies that improve safety, reduce costs, and extend infrastructure lifespan.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row justify-center sm:space-x-6 space-y-4 sm:space-y-0">
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="bg-white hover:bg-white/90 text-primary dark:text-neutral-900 text-lg px-8 py-6 h-auto rounded-lg group transition-all duration-300 shadow-lg hover:shadow-white/20 hover:shadow-xl"
                >
                  <span>Schedule a Consultation</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/products">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 h-auto rounded-lg backdrop-blur-sm"
                >
                  Explore Our Solutions
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

// CountUp component for animated numbers
type CountUpProps = {
  end: number;
  duration: number;
  prefix?: string;
  suffix?: string;
};

const CountUp: React.FC<CountUpProps> = ({ end, duration, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const counterInView = useInView(counterRef, { once: true });
  
  useEffect(() => {
    if (counterInView) {
      let startTime: number | null = null;
      let animationFrame: number;
      
      const updateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(updateCount);
        }
      };
      
      animationFrame = requestAnimationFrame(updateCount);
      
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [counterInView, duration, end]);
  
  return (
    <span ref={counterRef}>
      {prefix}{count}{suffix}
    </span>
  );
};

export default Home;
