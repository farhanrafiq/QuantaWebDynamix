import { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "../components/ui/button";
import {
  ArrowRight,
  Plus,
  Minus,
  Check,
  Shield,
  Layers,
  BarChart2,
  Droplets,
  Activity
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Define Product interface locally for use in this component
interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  image?: string;
}

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Product card component
const ProductCard = ({ product }: { product: Product }) => {
  return (
    <motion.div
      className="bg-[#15171B] border border-electric-blue/10 rounded-xl overflow-hidden group hover:border-electric-blue/30 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <div className="h-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-electric-blue/20 to-[#15171B]/80 z-10"></div>
        
        <div className="w-full h-full flex items-center justify-center bg-[#0D0F12] relative">
          {/* Vector illustration for product */}
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-electric-blue group-hover:scale-110 transition-transform duration-500"
          >
            {product.category === "waterproofing" ? (
              <>
                <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" fill="none" />
                <circle cx="60" cy="60" r="30" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M30,60 Q60,30 90,60 Q60,90 30,60" stroke="currentColor" strokeWidth="2" fill="none" />
              </>
            ) : product.category === "admixtures" ? (
              <>
                <rect x="30" y="30" width="60" height="60" stroke="currentColor" strokeWidth="2" fill="none" />
                <circle cx="60" cy="60" r="20" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M30,30 L90,90 M30,90 L90,30" stroke="currentColor" strokeWidth="2" fill="none" />
              </>
            ) : (
              <>
                <polygon points="60,20 90,50 60,80 30,50" stroke="currentColor" strokeWidth="2" fill="none" />
                <circle cx="60" cy="50" r="25" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="2 4" />
                <line x1="30" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="2" />
              </>
            )}
          </svg>
        </div>
      </div>
      
      <div className="p-6">
        <div className="text-sm text-electric-blue mb-2">{product.category.toUpperCase()}</div>
        <h3 className="text-white text-xl font-bold mb-3">{product.name}</h3>
        <p className="text-neutral-400 mb-4 line-clamp-3">{product.description}</p>
        
        <div className="mt-auto flex items-center text-electric-blue hover:underline cursor-pointer">
          View Details <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>
    </motion.div>
  );
};

// FAQ Item component
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

const FAQItem = ({ question, answer, isOpen, toggleOpen }: FAQItemProps) => {
  return (
    <div className="border-b border-electric-blue/10 py-5">
      <button 
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={toggleOpen}
      >
        <h3 className="text-white text-lg font-medium">{question}</h3>
        <div className="text-electric-blue">
          {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
        </div>
      </button>
      
      <motion.div 
        className="overflow-hidden"
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="pt-4 pb-2 text-neutral-400">{answer}</div>
      </motion.div>
    </div>
  );
};

// Feature card component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <motion.div
      className="bg-[#15171B] border border-electric-blue/10 rounded-xl p-6 hover:border-electric-blue/30 transition-all duration-300"
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

// 3D visualization representation
const ProductVisualization = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Setup GSAP animations for the visualization
    gsap.from(containerRef.current.querySelectorAll('.anim-item'), {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "bottom 20%",
        scrub: 1,
      }
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="h-[500px] bg-[#0A0C10] rounded-xl overflow-hidden relative flex items-center justify-center"
    >
      <div className="absolute top-0 left-0 w-full h-full opacity-50">
        <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/10 to-magenta/10"></div>
        <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
          {Array.from({ length: 144 }).map((_, index) => (
            <div 
              key={index}
              className="border border-electric-blue/5"
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 text-center">
        <div className="anim-item">
          <div className="w-40 h-40 mx-auto border-4 border-electric-blue/30 rounded-full flex items-center justify-center relative">
            <div className="w-32 h-32 border-2 border-electric-blue/20 rounded-full absolute animate-pulse"></div>
            <div className="w-24 h-24 border border-electric-blue/10 rounded-full absolute animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-48 h-48 border border-electric-blue/5 rounded-full absolute animate-pulse" style={{ animationDelay: '0.8s' }}></div>
            
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-electric-blue"
            >
              <polygon points="40,10 70,30 70,50 40,70 10,50 10,30" stroke="currentColor" strokeWidth="2" fill="none" />
              <polygon points="40,20 60,35 60,45 40,60 20,45 20,35" stroke="currentColor" strokeWidth="2" fill="none" />
              <line x1="40" y1="10" x2="40" y2="70" stroke="currentColor" strokeWidth="2" />
              <line x1="10" y1="30" x2="70" y2="50" stroke="currentColor" strokeWidth="2" />
              <line x1="10" y1="50" x2="70" y2="30" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        </div>
        
        <motion.h3 
          className="text-white text-2xl font-bold mt-6 mb-2 anim-item"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Advanced 3D Molecular Visualization
        </motion.h3>
        
        <motion.p 
          className="text-neutral-400 max-w-md mx-auto anim-item"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Explore our products at the molecular level to understand how our advanced nanotechnology creates superior performance.
        </motion.p>
      </div>
      
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <motion.div
          className="bg-[#15171B] px-4 py-2 rounded-full border border-electric-blue/20 text-white text-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Interactive models available in full version
        </motion.div>
      </div>
    </div>
  );
};

// Main Products component
const Products = () => {
  // Query for fetching products
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });
  
  // Scroll animation
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);
  
  // FAQ state
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  
  // Handle FAQ toggle
  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };
  
  // Demo FAQ data
  const faqs = [
    {
      question: "What makes QuantaFONS waterproofing solutions different?",
      answer: "Our proprietary PTFE-based formulations work at the molecular level to create a hydrophobic barrier that lasts significantly longer than conventional solutions, reducing lifetime costs by up to 40%."
    },
    {
      question: "Are your products environmentally friendly?",
      answer: "Yes, all our products are developed with sustainability in mind. Our nano-enhanced admixtures use up to 30% less material while providing superior performance, and our waterproofing solutions are free from harmful VOCs."
    },
    {
      question: "How do your monitoring systems integrate with existing infrastructure?",
      answer: "Our monitoring systems use non-invasive installation methods and can be retrofitted to existing structures. The systems connect wirelessly to our cloud platform, requiring minimal changes to existing infrastructure management systems."
    },
    {
      question: "What kind of support do you provide after installation?",
      answer: "We offer comprehensive support packages including regular system health checks, software updates, data analysis services, and technical support from our team of engineers available 24/7."
    },
    {
      question: "Do you offer custom solutions for specific project requirements?",
      answer: "Absolutely. Our R&D team works closely with clients to develop tailored solutions for unique challenges. We begin with a detailed analysis of your specific needs and design a custom implementation plan."
    }
  ];
  
  return (
    <div className="bg-[#0D0F12] min-h-screen">
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 right-0 w-96 h-96 bg-electric-blue/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-magenta/5 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            style={{ opacity: heroOpacity, scale: titleScale }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Advanced <span className="text-electric-blue">Materials</span> & Solutions
            </motion.h1>
            
            <motion.p 
              className="text-lg text-neutral-300 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our cutting-edge materials and monitoring systems represent the future of infrastructure management,
              combining nanotechnology with data-driven insights for unprecedented performance.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button className="bg-electric-blue hover:bg-electric-blue/80 text-white">
                Explore All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button className="bg-transparent border border-white/20 text-white hover:bg-white/10">
                Download Brochure
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Key Features Section */}
      <section className="py-20 bg-[#0A0C10]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white relative inline-block">
                Key Technologies
                <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-electric-blue"></span>
              </h2>
              
              <p className="text-lg text-neutral-400 max-w-3xl mx-auto">
                Our products leverage multiple cutting-edge technologies to deliver superior performance
                across various applications in infrastructure management.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                icon={<Droplets className="h-6 w-6" />}
                title="Nano-Enhanced Waterproofing"
                description="PTFE-based formulations providing superior water resistance and longevity for concrete structures."
              />
              
              <FeatureCard
                icon={<Layers className="h-6 w-6" />}
                title="Advanced Admixtures"
                description="Revolutionary concrete additives that enhance durability, reduce cracking, and improve workability."
              />
              
              <FeatureCard
                icon={<Activity className="h-6 w-6" />}
                title="Fiber Optic Monitoring"
                description="Distributed sensing technology that detects structural issues before they become visible problems."
              />
              
              <FeatureCard
                icon={<BarChart2 className="h-6 w-6" />}
                title="Acoustic Analysis"
                description="AI-powered sound analysis that identifies structural weaknesses through their unique acoustic signatures."
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white relative inline-block">
                Our Product Line
                <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-electric-blue"></span>
              </h2>
              
              <p className="text-lg text-neutral-400 max-w-3xl mx-auto">
                From advanced concrete additives to cutting-edge monitoring systems, our products
                are designed to revolutionize infrastructure management.
              </p>
            </motion.div>
            
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-electric-blue border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="text-white mt-4">Loading products...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">
                <p>Error loading products. Please try again later.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Show actual products if available, or use placeholders */}
                {products?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                )) || [
                  // Placeholder products if API fails
                  {
                    id: 1,
                    name: "QuantaSeal PT-200",
                    category: "waterproofing",
                    description: "Advanced PTFE-based waterproofing solution for critical concrete infrastructure with 20+ year lifespan."
                  },
                  {
                    id: 2,
                    name: "NanoMix CN-400",
                    category: "admixtures",
                    description: "Nano-enhanced concrete admixture that increases strength by 40% while reducing cement requirements."
                  },
                  {
                    id: 3,
                    name: "FiberSense SHM-100",
                    category: "monitoring",
                    description: "Distributed fiber optic sensing system for real-time structural health monitoring of bridges and tunnels."
                  },
                  {
                    id: 4,
                    name: "AcoustiScan AS-50",
                    category: "monitoring",
                    description: "AI-powered acoustic analysis system that detects micro-fractures through sound wave analysis."
                  },
                  {
                    id: 5,
                    name: "DuraFlex CF-300",
                    category: "admixtures",
                    description: "Flexible concrete admixture designed for seismic resilience and extreme temperature variations."
                  },
                  {
                    id: 6,
                    name: "HydroGuard HG-100",
                    category: "waterproofing",
                    description: "Crystalline waterproofing system that penetrates concrete and seals micro-cracks automatically."
                  }
                ].map((product, index) => (
                  <ProductCard 
                    key={index} 
                    product={product as unknown as Product} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* 3D Visualization Section */}
      <section className="py-20 bg-[#0A0C10]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white relative inline-block">
                Product Visualization
                <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-electric-blue"></span>
              </h2>
              
              <p className="text-lg text-neutral-400 max-w-3xl mx-auto">
                Explore our products at the molecular level to understand why they outperform
                conventional solutions in durability, efficiency, and reliability.
              </p>
            </motion.div>
            
            <ProductVisualization />
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-electric-blue/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-magenta/5 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white relative inline-block">
                Why Choose Our Products
                <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-electric-blue"></span>
              </h2>
              
              <p className="text-lg text-neutral-400 max-w-3xl mx-auto">
                Our solutions deliver measurable benefits throughout the entire lifecycle of your infrastructure.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                className="bg-[#15171B] p-8 rounded-xl border border-electric-blue/10"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Key Benefits</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-electric-blue/10 rounded-full text-electric-blue mt-1">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">Extended Lifespan</h4>
                      <p className="text-neutral-400">Our solutions can extend infrastructure lifespan by 30-50% compared to traditional methods.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-electric-blue/10 rounded-full text-electric-blue mt-1">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">Reduced Maintenance Costs</h4>
                      <p className="text-neutral-400">Predictive monitoring and superior materials reduce maintenance costs by up to 40%.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-electric-blue/10 rounded-full text-electric-blue mt-1">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">Environmental Impact</h4>
                      <p className="text-neutral-400">Our nano-enhanced formulations use less material while delivering better performance.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-electric-blue/10 rounded-full text-electric-blue mt-1">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">Data-Driven Insights</h4>
                      <p className="text-neutral-400">Advanced analytics turn structural data into actionable intelligence for infrastructure managers.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-electric-blue/10 rounded-full text-electric-blue mt-1">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">Compliance & Safety</h4>
                      <p className="text-neutral-400">All our products meet or exceed international safety standards and certification requirements.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="bg-[#15171B] p-8 rounded-xl border border-electric-blue/10 relative overflow-hidden"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-electric-blue/5 rounded-full filter blur-lg"></div>
                
                <h3 className="text-2xl font-bold text-white mb-6">Compare With Traditional Solutions</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-white">Lifespan</span>
                      <span className="text-electric-blue">3x Longer</span>
                    </div>
                    <div className="w-full bg-[#0D0F12] rounded-full h-2.5">
                      <div className="bg-electric-blue h-2.5 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-white">Cost Efficiency</span>
                      <span className="text-electric-blue">40% Savings</span>
                    </div>
                    <div className="w-full bg-[#0D0F12] rounded-full h-2.5">
                      <div className="bg-electric-blue h-2.5 rounded-full w-2/3"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-white">Environmental Impact</span>
                      <span className="text-electric-blue">65% Reduction</span>
                    </div>
                    <div className="w-full bg-[#0D0F12] rounded-full h-2.5">
                      <div className="bg-electric-blue h-2.5 rounded-full w-4/5"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-white">Performance</span>
                      <span className="text-electric-blue">Superior</span>
                    </div>
                    <div className="w-full bg-[#0D0F12] rounded-full h-2.5">
                      <div className="bg-electric-blue h-2.5 rounded-full w-5/6"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-white">Data Integration</span>
                      <span className="text-electric-blue">Complete</span>
                    </div>
                    <div className="w-full bg-[#0D0F12] rounded-full h-2.5">
                      <div className="bg-electric-blue h-2.5 rounded-full w-11/12"></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <Button className="bg-electric-blue hover:bg-electric-blue/80 text-white">
                    Get Detailed Comparison
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-[#0A0C10]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white relative inline-block">
                Frequently Asked Questions
                <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-electric-blue"></span>
              </h2>
              
              <p className="text-lg text-neutral-400 max-w-3xl mx-auto">
                Find answers to common questions about our products, technology, and implementation process.
              </p>
            </motion.div>
            
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQ === index}
                  toggleOpen={() => toggleFAQ(index)}
                />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <motion.p
                className="text-neutral-400 mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Can't find the answer you're looking for? Contact our technical support team.
              </motion.p>
              
              <Button className="bg-electric-blue hover:bg-electric-blue/80 text-white">
                Contact Technical Support
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
          <div className="max-w-5xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ready to Transform Your Infrastructure Management?
            </motion.h2>
            
            <motion.p 
              className="text-lg text-neutral-300 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our team of experts is ready to help you find the right solutions for your specific infrastructure challenges. 
              Schedule a consultation or request a product demo today.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button className="bg-electric-blue hover:bg-electric-blue/80 text-white">
                Request a Product Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button className="bg-transparent border border-white text-white hover:bg-white/10">
                Contact Sales Team
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Footer is handled by the RootLayout component */}
    </div>
  );
};

export default Products;