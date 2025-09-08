import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { 
  Moon, Sun, Menu, X, ArrowRight, ChevronDown, 
  LayoutDashboard, Lightbulb, FileCode, Radio, Server, BookOpen, Users, Zap, Building, Bot, Shield, Code
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" 
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0, overflow: "hidden" },
  visible: { 
    opacity: 1, 
    height: "auto",
    transition: {
      height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
      opacity: { duration: 0.25 }
    }
  },
  exit: { 
    opacity: 0, 
    height: 0,
    transition: {
      height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
      opacity: { duration: 0.2 }
    }
  }
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
      staggerChildren: 0.05,
      delayChildren: 0.05,
    }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

const dropdownItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.2 }
  }
};

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  
  // Header states
  const [scrolled, setScrolled] = useState(false);
  const [pastHeroSection, setPastHeroSection] = useState(false);
  const [menuHidden, setMenuHidden] = useState(false);
  const lastScrollY = useRef(0);
  
  // Refs for dropdowns
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const headerRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleDropdownHover = (dropdownName: string) => {
    setActiveDropdown(dropdownName);
  };

  const handleDropdownClose = () => {
    setActiveDropdown(null);
  };

  // Animation when scrolling
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll position and direction
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;
      
      // Update states based on scroll position
      setScrolled(currentScrollY > 10);
      setPastHeroSection(currentScrollY > window.innerHeight - 100);
      
      // Hide/show header based on scroll direction, but only when past hero
      if (currentScrollY > 200) {
        if (scrollingDown && !menuHidden) {
          setMenuHidden(true);
        } else if (!scrollingDown && menuHidden) {
          setMenuHidden(false);
        }
      } else if (menuHidden) {
        setMenuHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuHidden]);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (activeDropdown && 
          dropdownRefs.current[activeDropdown] && 
          !dropdownRefs.current[activeDropdown]?.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown]);

  // GSAP animation for header when scrolled
  useEffect(() => {
    if (scrolled && headerRef.current) {
      gsap.to(headerRef.current, {
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        backdropFilter: "blur(12px)",
        duration: 0.3,
        ease: "power2.out"
      });
    } else if (!scrolled && headerRef.current) {
      gsap.to(headerRef.current, {
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        backdropFilter: "blur(8px)",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [scrolled]);

  // Main navigation with dropdowns
  const navLinks = [
    { 
      name: "Home", 
      href: "/" 
    },
    { 
      name: "About", 
      href: "/about",
    },
    { 
      name: "Technologies", 
      href: "/technologies",
      hasDropdown: true,
      isMegaMenu: true,
      dropdownItems: [
        {
          category: "AI Technologies",
          items: [
            { 
              name: "Eli-S1 AI Engine", 
              href: "/#eli-s1",
              icon: <Bot className="w-5 h-5" />,
              desc: "Multi-agent workflows that plan, code, test, and deploy"
            },
            { 
              name: "Predictive Analytics", 
              href: "/technologies#predictive-ai",
              icon: <LayoutDashboard className="w-5 h-5" />,
              desc: "Advanced AI-driven predictive modeling and analytics"
            }
          ]
        },
        {
          category: "Monitoring & Sensing",
          items: [
            { 
              name: "Structural Health Monitoring", 
              href: "/#shm",
              icon: <Shield className="w-5 h-5" />,
              desc: "Real-time monitoring for spacecraft and infrastructure"
            },
            { 
              name: "Acoustic Analytics", 
              href: "/technologies#acoustic",
              icon: <Radio className="w-5 h-5" />,
              desc: "Advanced acoustic pattern recognition and analysis"
            },
            { 
              name: "Sensor Networks", 
              href: "/technologies#sensor-networks",
              icon: <Server className="w-5 h-5" />,
              desc: "Distributed sensing and edge computing systems"
            }
          ]
        },
        {
          category: "Development & Services",
          items: [
            { 
              name: "IT Services & Apps", 
              href: "/#it-services",
              icon: <Code className="w-5 h-5" />,
              desc: "Enterprise applications and full-stack development"
            },
            { 
              name: "R&D Labs", 
              href: "/technologies#labs",
              icon: <Lightbulb className="w-5 h-5" />,
              desc: "Cutting-edge research and development facilities"
            }
          ]
        }
      ]
    },
    { 
      name: "Solutions", 
      href: "/products" 
    },
    { 
      name: "Research", 
      href: "/blog",
      hasDropdown: true,
      dropdownItems: [
        { 
          name: "Research Papers", 
          href: "/blog#papers",
          icon: <BookOpen className="w-5 h-5" />
        },
        { 
          name: "Case Studies", 
          href: "/blog#case-studies",
          icon: <FileCode className="w-5 h-5" />
        },
        { 
          name: "Team Publications", 
          href: "/blog#publications",
          icon: <Users className="w-5 h-5" />
        }
      ]
    },
    { 
      name: "Careers", 
      href: "/careers" 
    },
    { 
      name: "Contact", 
      href: "/contact" 
    }
  ];

  return (
    <motion.header 
      ref={headerRef}
      className={`fixed w-full z-50 transition-all duration-300 ${
        !pastHeroSection 
          ? "bg-transparent" 
          : "bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border-b border-neutral-200/50 dark:border-neutral-800/50"
      }`}
      animate={{
        y: menuHidden ? -100 : 0,
        opacity: menuHidden ? 0 : 1,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0 flex items-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/">
              <div className="font-bold text-xl md:text-2xl">
                <span className={`${pastHeroSection ? "text-accent" : "text-white"} font-black transition-colors duration-300`}>
                  Quanta
                </span>
                <span className={`${pastHeroSection ? "text-neutral-900 dark:text-white" : "text-white"} transition-colors duration-300`}>
                  FONS
                </span>
              </div>
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2">
            {navLinks.map((link, index) => (
              <div 
                key={link.name} 
                className="relative"
                ref={el => {
                  if (link.hasDropdown) {
                    dropdownRefs.current[link.name] = el;
                  }
                }}
                onMouseEnter={() => link.hasDropdown && handleDropdownHover(link.name)}
                onMouseLeave={handleDropdownClose}
              >
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                >
                  <Link 
                    href={link.href}
                    className={`
                      px-3 py-2 rounded-md text-sm lg:text-base font-medium inline-flex items-center
                      ${pastHeroSection 
                        ? "text-neutral-700 dark:text-neutral-200 hover:text-primary dark:hover:text-accent" 
                        : "text-white/90 hover:text-white"}
                      ${location === link.href ? (pastHeroSection ? "text-primary dark:text-accent" : "text-white") : ""}
                      transition-colors
                    `}
                  >
                    {link.name}
                    {link.hasDropdown && (
                      <ChevronDown size={14} className="ml-1 transition-transform duration-200 ease-in-out" style={{
                        transform: activeDropdown === link.name ? 'rotate(180deg)' : 'rotate(0deg)'
                      }} />
                    )}
                  </Link>
                </motion.div>
                
                {/* Dropdown Menu */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {activeDropdown === link.name && (
                      <motion.div 
                        className={`${(link as any).isMegaMenu ? 'fixed' : 'absolute'} top-full mt-1 rounded-lg overflow-hidden shadow-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 ${
                          (link as any).isMegaMenu ? 'inset-x-0 z-50' : 'w-60 left-0'
                        }`}
                        style={{
                          ...((link as any).isMegaMenu ? { top: '80px' } : {}),
                          pointerEvents: activeDropdown === link.name ? 'auto' : 'none'
                        }}
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <div className="py-2">
                          {(link as any).isMegaMenu ? (
                            // Mega Menu Layout
                            <div className="grid grid-cols-3 gap-8 p-6">
                              {(link.dropdownItems as any)?.map((category: any) => (
                                <div key={category.category}>
                                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4 uppercase tracking-wide">
                                    {category.category}
                                  </h4>
                                  <div className="space-y-2">
                                    {category.items.map((item: any) => (
                                      <motion.div key={item.name} variants={dropdownItemVariants}>
                                        <Link href={item.href}>
                                          <div className="flex items-start p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors cursor-pointer group">
                                            <span className="mr-3 text-primary dark:text-accent mt-1 group-hover:scale-110 transition-transform">
                                              {item.icon}
                                            </span>
                                            <div className="flex-1">
                                              <p className="text-sm font-medium text-neutral-900 dark:text-white mb-1">{item.name}</p>
                                              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.desc}</p>
                                            </div>
                                          </div>
                                        </Link>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            // Regular Dropdown Layout
                            (link.dropdownItems as any)?.map((item: any) => (
                              <motion.div key={item.name} variants={dropdownItemVariants}>
                                <Link href={item.href}>
                                  <div className="flex items-center px-4 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors cursor-pointer">
                                    <span className="mr-3 text-primary dark:text-accent">
                                      {item.icon}
                                    </span>
                                    <div className="flex-1">
                                      <p className="text-sm font-medium text-neutral-900 dark:text-white">{item.name}</p>
                                    </div>
                                  </div>
                                </Link>
                              </motion.div>
                            ))
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>
          
          {/* Right-side buttons */}
          <div className="flex items-center space-x-3 md:space-x-4">
            
            {/* Get in Touch button */}
            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/contact">
                <Button 
                  className={`
                    group 
                    ${pastHeroSection 
                      ? "bg-primary hover:bg-primary/80 dark:bg-accent dark:hover:bg-accent/80" 
                      : "bg-white text-primary hover:bg-white/90"}
                  `}
                >
                  <span>Get in Touch</span>
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
            
            {/* Mobile menu button */}
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className={`
                  ${pastHeroSection 
                    ? "text-neutral-900 dark:text-white" 
                    : "text-white"}
                `}
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 overflow-hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 max-h-[80vh] overflow-auto">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    href={link.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${
                      location === link.href ? "bg-neutral-100 dark:bg-neutral-700 text-primary dark:text-accent" : ""
                    }`}
                    onClick={() => !link.hasDropdown && setMobileMenuOpen(false)}
                  >
                    <div className="flex justify-between items-center">
                      <span>{link.name}</span>
                      {link.hasDropdown && (
                        <ChevronDown 
                          size={16} 
                          className={`transition-transform duration-200 ${
                            activeDropdown === link.name ? 'rotate-180' : 'rotate-0'
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveDropdown(activeDropdown === link.name ? null : link.name);
                          }}
                        />
                      )}
                    </div>
                  </Link>
                  
                  {/* Mobile dropdown menu */}
                  {link.hasDropdown && (
                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-6 py-2 space-y-1 border-l-2 border-neutral-200 dark:border-neutral-700 ml-3 mt-1">
                            {(link as any).isMegaMenu ? (
                              // Mobile Mega Menu - flatten all categories
                              (link.dropdownItems as any)?.flatMap((category: any) => 
                                category.items.map((item: any) => (
                                  <Link 
                                    key={item.name} 
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    <div className="flex items-center px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-700 dark:text-neutral-300">
                                      <span className="mr-3 text-primary dark:text-accent">
                                        {item.icon}
                                      </span>
                                      <span className="text-sm">{item.name}</span>
                                    </div>
                                  </Link>
                                ))
                              )
                            ) : (
                              // Regular Mobile Dropdown
                              (link.dropdownItems as any)?.map((item: any) => (
                                <Link 
                                  key={item.name} 
                                  href={item.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  <div className="flex items-center px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-700 dark:text-neutral-300">
                                    <span className="mr-3 text-primary dark:text-accent">
                                      {item.icon}
                                    </span>
                                    <span className="text-sm">{item.name}</span>
                                  </div>
                                </Link>
                              ))
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
              
              {/* Mobile CTA button */}
              <div className="px-3 py-3">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-primary hover:bg-primary/80 dark:bg-accent dark:hover:bg-accent/80 group">
                    <span>Get in Touch</span>
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
