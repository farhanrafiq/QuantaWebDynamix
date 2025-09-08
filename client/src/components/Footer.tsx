import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { 
  ArrowRight, Mail, Phone, MapPin, Github, Twitter, 
  Linkedin, Facebook, Instagram, Send, CheckCircle 
} from "lucide-react";
import gsap from "gsap";

// Animation variants
const footerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const linkVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 }
  }
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const currentYear = new Date().getFullYear();
  
  // Refs for scroll animations
  const footerRef = useRef<HTMLDivElement>(null);
  const subscribeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.2 });
  const subscribeInView = useInView(subscribeRef, { once: true, amount: 0.8 });
  
  // Button animation with useState instead of GSAP
  const [buttonScale, setButtonScale] = useState(0.95);
  
  useEffect(() => {
    if (!subscribeInView) return;
    
    // Pulse animation using setInterval
    const interval = setInterval(() => {
      setButtonScale(prev => prev === 0.95 ? 1 : 0.95);
    }, 1500);
    
    return () => clearInterval(interval);
  }, [subscribeInView]);
  
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && !subscribing) {
      setSubscribing(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success animation
        setSubscribed(true);
        
        // Reset form after success animation
        setTimeout(() => {
          setEmail("");
          setSubscribed(false);
          setSubscribing(false);
        }, 3000);
      } catch (error) {
        console.error("Subscription error:", error);
        setSubscribing(false);
      }
    }
  };

  // Solutions links with animation delay offsets
  const solutionLinks = [
    { 
      name: "Eli-S1 AI Engine", 
      href: "/eli-s1",
      delay: 0
    },
    { 
      name: "Structural Health Monitoring", 
      href: "/shm",
      delay: 0.1
    },
    { 
      name: "IT Services & Development", 
      href: "/it-services",
      delay: 0.2
    },
    { 
      name: "Production Applications", 
      href: "/apps",
      delay: 0.3
    },
    { 
      name: "Legacy Technologies", 
      href: "/technologies",
      delay: 0.4
    },
  ];

  // Company links
  const companyLinks = [
    { 
      name: "About Us", 
      href: "/about",
      delay: 0
    },
    { 
      name: "Case Studies", 
      href: "/case-studies",
      delay: 0.1
    },
    { 
      name: "Careers", 
      href: "/careers",
      delay: 0.2
    },
    { 
      name: "AI & Engineering Blog", 
      href: "/blog",
      delay: 0.3
    },
    { 
      name: "Contact Us", 
      href: "/contact",
      delay: 0.4
    },
  ];

  // Resources links
  const resourceLinks = [
    { 
      name: "AI Engineering Articles", 
      href: "/blog/category/AI%20Engineering",
      delay: 0
    },
    { 
      name: "MLOps & Deployment", 
      href: "/blog/category/MLOps%20%26%20Model%20Deployment",
      delay: 0.1
    },
    { 
      name: "Search Articles", 
      href: "/search",
      delay: 0.2
    },
    { 
      name: "Privacy Policy", 
      href: "/privacy",
      delay: 0.3
    },
    { 
      name: "Terms of Service", 
      href: "/terms",
      delay: 0.4
    },
  ];

  // Contact information
  const contactInfo = [
    { 
      icon: <MapPin className="h-5 w-5" />, 
      text: "Red Cross Road, Maisuma, Srinagar, Kashmir, 190008" 
    },
    { 
      icon: <Phone className="h-5 w-5" />, 
      text: "+919796000522" 
    },
    { 
      icon: <Mail className="h-5 w-5" />, 
      text: "info@quantafons.com" 
    },
  ];

  // Social media links
  const socialLinks = [
    { 
      name: "LinkedIn", 
      icon: <Linkedin className="h-5 w-5" />, 
      href: "https://linkedin.com" 
    },
    { 
      name: "Twitter", 
      icon: <Twitter className="h-5 w-5" />, 
      href: "https://twitter.com" 
    },
    { 
      name: "Instagram", 
      icon: <Instagram className="h-5 w-5" />, 
      href: "https://instagram.com" 
    },
    { 
      name: "Facebook", 
      icon: <Facebook className="h-5 w-5" />, 
      href: "https://facebook.com" 
    },
    { 
      name: "GitHub", 
      icon: <Github className="h-5 w-5" />, 
      href: "https://github.com" 
    },
  ];

  return (
    <motion.footer 
      ref={footerRef}
      className="bg-gradient-to-br from-neutral-900 to-neutral-950 text-white pt-20 pb-8 relative overflow-hidden"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={footerVariants}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent/20 blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl"></div>
      </div>
      
      {/* Newsletter subscription banner */}
      <motion.div 
        ref={subscribeRef}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        variants={itemVariants}
      >
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-neutral-800">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="lg:max-w-xl">
              <h3 className="text-2xl font-bold text-white mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-neutral-400">
                Stay updated with our latest research breakthroughs, technology advancements, and industry insights.
              </p>
            </div>
            
            <form onSubmit={handleSubscribe} className="w-full lg:w-auto">
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={subscribing || subscribed}
                  className="w-full md:w-80 bg-neutral-800/50 border-neutral-700 focus:border-accent text-white rounded-r-none focus-visible:ring-accent"
                />
                <Button 
                  type="submit" 
                  disabled={subscribing || subscribed}
                  className={`rounded-l-none transition-all duration-500 ${
                    subscribed 
                      ? 'bg-green-600 hover:bg-green-600' 
                      : subscribing 
                        ? 'bg-primary/70' 
                        : 'bg-accent hover:bg-accent/80'
                  }`}
                  style={{
                    transform: subscribeInView && !subscribing && !subscribed 
                      ? `scale(${buttonScale})` 
                      : 'scale(1)'
                  }}
                >
                  {subscribed ? (
                    <span className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Subscribed
                    </span>
                  ) : subscribing ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="h-5 w-5 mr-2" />
                      Subscribe
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Company Info */}
          <motion.div variants={itemVariants}>
            <Link href="/">
              <div className="font-bold text-2xl mb-6">
                <span className="text-accent font-black">Quanta</span>
                <span className="text-white">FONS</span>
              </div>
            </Link>
            <p className="text-neutral-400 max-w-md mb-8">
              An AI-first R&D company building practical solutions that help teams work faster. From Eli-S1 AI engine to real-time structural monitoring and production software.
            </p>
            
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-4">
              Connect With Us
            </h4>
            <div className="flex space-x-3">
              {socialLinks.map((link, index) => (
                <motion.a 
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-accent transition-colors p-2 bg-neutral-800/50 hover:bg-neutral-700/50 backdrop-blur-sm rounded-full"
                  aria-label={link.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + (index * 0.1), duration: 0.3 }}
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
            
            <div className="mt-8">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-4">
                Contact Information
              </h4>
              <ul className="space-y-3">
                {contactInfo.map((item, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start"
                    variants={linkVariants}
                    transition={{ delay: 0.3 + (index * 0.1) }}
                  >
                    <span className="flex-shrink-0 text-accent mr-3 mt-1">{item.icon}</span>
                    <span className="text-neutral-300 text-sm">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Solutions Links */}
          <motion.div 
            variants={itemVariants}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-white">
              <span className="border-b-2 border-accent pb-1">Solutions</span>
            </h3>
            <ul className="space-y-4">
              {solutionLinks.map((link) => (
                <motion.li 
                  key={link.name}
                  variants={linkVariants}
                  transition={{ delay: 0.3 + link.delay }}
                >
                  <Link 
                    href={link.href}
                    className="text-neutral-400 hover:text-accent transition-colors inline-flex items-center group"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Company Links */}
          <motion.div 
            variants={itemVariants}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-white">
              <span className="border-b-2 border-accent pb-1">Company</span>
            </h3>
            <ul className="space-y-4">
              {companyLinks.map((link) => (
                <motion.li 
                  key={link.name}
                  variants={linkVariants}
                  transition={{ delay: 0.3 + link.delay }}
                >
                  <Link 
                    href={link.href}
                    className="text-neutral-400 hover:text-accent transition-colors inline-flex items-center group"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Resources Links */}
          <motion.div 
            variants={itemVariants}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-white">
              <span className="border-b-2 border-accent pb-1">Resources</span>
            </h3>
            <ul className="space-y-4">
              {resourceLinks.map((link) => (
                <motion.li 
                  key={link.name}
                  variants={linkVariants}
                  transition={{ delay: 0.3 + link.delay }}
                >
                  <Link 
                    href={link.href}
                    className="text-neutral-400 hover:text-accent transition-colors inline-flex items-center group"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        {/* Divider & Copyright */}
        <motion.div 
          className="mt-16 pt-8 border-t border-neutral-800"
          variants={itemVariants}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-500 text-sm">
              &copy; {currentYear} QuantaFONS Pvt Ltd. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-8">
              <Link href="/privacy" className="text-neutral-500 hover:text-accent text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-neutral-500 hover:text-accent text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/search" className="text-neutral-500 hover:text-accent text-sm transition-colors">
                Search
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
