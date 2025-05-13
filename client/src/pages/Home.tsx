import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ParticleBackground from "@/components/ParticleBackground";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Home = () => {
  // Refs for sections
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const statsControls = useAnimation();

  // Animate stats when they come into view
  useEffect(() => {
    if (statsInView) {
      statsControls.start("visible");
    }
  }, [statsInView, statsControls]);

  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="relative bg-gradient-to-br from-primary to-secondary dark:from-neutral-800 dark:to-neutral-900 text-white overflow-hidden">
        <ParticleBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 md:py-40 relative z-1">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <motion.div 
              className="lg:col-span-7"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1 
                className="text-3xl md:text-4xl lg:text-5xl font-bold"
                variants={fadeInUp}
              >
                Redefining <span className="text-accent">Structural Engineering</span> with Advanced Materials 
                <span className="text-accent">&</span> AI Analytics
              </motion.h1>
              <motion.p 
                className="mt-6 text-lg md:text-xl text-neutral-100 dark:text-neutral-200 max-w-3xl"
                variants={fadeInUp}
              >
                QuantaFONS leads the industry in PTFE-based waterproofing, nano-enhanced admixtures, and AI-driven structural health monitoring solutions for critical infrastructure.
              </motion.p>
              <motion.div 
                className="mt-10 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0"
                variants={fadeInUp}
              >
                <Link href="/contact">
                  <Button size="lg" className="bg-accent hover:bg-accent/80 text-white">
                    Request a Consultation
                  </Button>
                </Link>
                <Link href="/technologies">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Explore Technologies
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div 
              className="hidden lg:block lg:col-span-5 mt-12 lg:mt-0"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              {/* A 3D rendering of advanced structural material with embedded sensors */}
              <img 
                src="https://images.unsplash.com/photo-1622015663084-307d19eabbbf?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=760&h=600" 
                alt="Advanced structural material with embedded sensors" 
                className="rounded-lg shadow-2xl" 
              />
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-neutral-900 to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={statsControls}
          >
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="text-4xl font-bold text-primary dark:text-accent">
                <CountUp end={250} duration={2} suffix="+" />
              </div>
              <p className="mt-2 text-neutral-700 dark:text-neutral-300">Projects Completed</p>
            </motion.div>
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="text-4xl font-bold text-primary dark:text-accent">
                <CountUp end={18} duration={2} />
              </div>
              <p className="mt-2 text-neutral-700 dark:text-neutral-300">Patents Filed</p>
            </motion.div>
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="text-4xl font-bold text-primary dark:text-accent">
                <CountUp end={38} duration={2} />
              </div>
              <p className="mt-2 text-neutral-700 dark:text-neutral-300">Research Engineers</p>
            </motion.div>
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="text-4xl font-bold text-primary dark:text-accent">
                <CountUp end={12} duration={2} />
              </div>
              <p className="mt-2 text-neutral-700 dark:text-neutral-300">Countries Served</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary dark:from-neutral-800 dark:to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Transform Your Infrastructure?
          </motion.h2>
          <motion.p 
            className="mt-4 max-w-3xl mx-auto text-lg text-white/80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Partner with QuantaFONS to access cutting-edge materials and monitoring technology that extends infrastructure lifespan, reduces maintenance costs, and improves safety.
          </motion.p>
          <motion.div 
            className="mt-10 flex flex-col sm:flex-row justify-center sm:space-x-6 space-y-4 sm:space-y-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="text-primary dark:text-neutral-900 bg-white hover:bg-neutral-100">
                Request a Consultation
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Explore Solutions
              </Button>
            </Link>
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

// Need to import useState for CountUp component
import { useState } from "react";

export default Home;
