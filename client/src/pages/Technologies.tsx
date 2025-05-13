import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  ChevronRight, 
  Radio, 
  BarChart2, 
  Wand2, 
  Layers, 
  Network, 
  Waves,
  ArrowRight,
  Loader2
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import Lottie from "lottie-react";
import { useQuery } from "@tanstack/react-query";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Lottie animation data for acoustic waves
const acousticWaveAnimationData = {
  "v": "5.5.7",
  "fr": 60,
  "ip": 0,
  "op": 120,
  "w": 800,
  "h": 400,
  "nm": "Sound Wave Animation",
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
        "p": { "a": 0, "k": [400, 200, 0] },
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
                    "i": { "x": 0.667, "y": 1 },
                    "o": { "x": 0.333, "y": 0 },
                    "t": 0,
                    "s": [
                      {
                        "i": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
                        "o": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
                        "v": [
                          [-300, 0],
                          [-250, 40],
                          [-200, -40],
                          [-150, 80],
                          [-100, -80],
                          [-50, 40],
                          [0, -40],
                          [50, 0],
                          [100, 20],
                          [150, -20],
                          [200, 40],
                          [250, -40],
                          [300, 0]
                        ],
                        "c": false
                      }
                    ]
                  },
                  {
                    "t": 60,
                    "s": [
                      {
                        "i": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
                        "o": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
                        "v": [
                          [-300, 0],
                          [-250, -40],
                          [-200, 40],
                          [-150, -80],
                          [-100, 80],
                          [-50, -40],
                          [0, 40],
                          [50, 0],
                          [100, -20],
                          [150, 20],
                          [200, -40],
                          [250, 40],
                          [300, 0]
                        ],
                        "c": false
                      }
                    ]
                  },
                  {
                    "t": 120,
                    "s": [
                      {
                        "i": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
                        "o": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
                        "v": [
                          [-300, 0],
                          [-250, 40],
                          [-200, -40],
                          [-150, 80],
                          [-100, -80],
                          [-50, 40],
                          [0, -40],
                          [50, 0],
                          [100, 20],
                          [150, -20],
                          [200, 40],
                          [250, -40],
                          [300, 0]
                        ],
                        "c": false
                      }
                    ]
                  }
                ]
              },
              "nm": "Path 1",
              "mn": "ADBE Vector Shape - Group",
              "hd": false
            },
            {
              "ty": "st",
              "c": { "a": 0, "k": [0, 0.47, 1, 1], "ix": 3 },
              "o": { "a": 0, "k": 100, "ix": 4 },
              "w": { "a": 0, "k": 6, "ix": 5 },
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
      "op": 120,
      "st": 0,
      "bm": 0
    }
  ]
};

// Type definitions for our database entities
interface Technology {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  iconName?: string;
  imageUrl?: string;
  category: string;
  featured: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  features?: TechnologyFeature[];
  specs?: TechnologySpec[];
}

interface TechnologyFeature {
  id: number;
  technologyId: number;
  title: string;
  description: string;
  iconName?: string;
  displayOrder: number;
}

interface TechnologySpec {
  id: number;
  technologyId: number;
  name: string;
  value: string;
  displayOrder: number;
}

interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const Technologies = () => {
  // State to track expanded details sections
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [selectedTechnology, setSelectedTechnology] = useState<string | null>(null);

  // Fetch technologies from the API
  const { data: techData, isLoading: techLoading, error: techError } = useQuery<APIResponse<Technology[]>>({
    queryKey: ['/api/technologies'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Fetch technology details when one is selected
  const { data: techDetails, isLoading: detailsLoading } = useQuery<APIResponse<Technology & { features: TechnologyFeature[], specs: TechnologySpec[] }>>({
    queryKey: ['/api/technologies', selectedTechnology],
    enabled: !!selectedTechnology,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Group technologies by category
  const categorizedTech = techData?.data?.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, Technology[]>) || {};

  const toggleExpandSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const handleTechnologySelect = (slug: string) => {
    setSelectedTechnology(slug);
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.8
      }
    }
  };
  
  const fadeInRight = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.8
      }
    }
  };
  
  const fadeInLeft = {
    hidden: { opacity: 0, x: 60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.8
      }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };
  
  const scaleIn = {
    hidden: { 
      opacity: 0, 
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0, 0.71, 0.2, 1.01]
      }
    }
  };
  
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40, 
      scale: 0.95 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 10
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    }
  };
  
  return (
    <section id="technologies" className="py-20 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Our <span className="text-primary dark:text-accent">Technologies</span>
          </motion.h2>
          <motion.p 
            className="mt-4 max-w-3xl mx-auto text-lg text-neutral-700 dark:text-neutral-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover the innovative technologies that set QuantaFONS apart from traditional engineering solutions.
          </motion.p>
        </div>

        {/* Technology Categories */}
        {techLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg text-neutral-700 dark:text-neutral-300">Loading technologies...</span>
          </div>
        ) : techError ? (
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg text-center">
            <p className="text-red-600 dark:text-red-400">
              Failed to load technologies. Please try again later.
            </p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {techData?.data?.map((tech) => {
              // Define color scheme based on category
              const colorScheme = 
                tech.category === 'software' ? {
                  bgFrom: 'from-primary/5', 
                  bgTo: 'to-primary/10', 
                  darkBgFrom: 'dark:from-primary/10', 
                  darkBgTo: 'dark:to-primary/20',
                  border: 'border-primary/10',
                  darkBorder: 'dark:border-primary/20',
                  hoverBg: 'group-hover:bg-primary/10',
                  darkHoverBg: 'dark:group-hover:bg-primary/20',
                  text: 'text-primary',
                  darkText: 'dark:text-accent',
                } : 
                tech.category === 'ai' ? {
                  bgFrom: 'from-blue-500/5', 
                  bgTo: 'to-blue-500/10', 
                  darkBgFrom: 'dark:from-blue-500/10', 
                  darkBgTo: 'dark:to-blue-500/20',
                  border: 'border-blue-500/10',
                  darkBorder: 'dark:border-blue-500/20',
                  hoverBg: 'group-hover:bg-blue-500/10',
                  darkHoverBg: 'dark:group-hover:bg-blue-500/20',
                  text: 'text-blue-500',
                  darkText: 'dark:text-blue-400',
                } : 
                {
                  bgFrom: 'from-purple-500/5', 
                  bgTo: 'to-purple-500/10', 
                  darkBgFrom: 'dark:from-purple-500/10', 
                  darkBgTo: 'dark:to-purple-500/20',
                  border: 'border-purple-500/10',
                  darkBorder: 'dark:border-purple-500/20',
                  hoverBg: 'group-hover:bg-purple-500/10',
                  darkHoverBg: 'dark:group-hover:bg-purple-500/20',
                  text: 'text-purple-500',
                  darkText: 'dark:text-purple-400',
                };
              
              // Map iconName to icon component
              const IconComponent = 
                tech.iconName === 'waves' ? Radio :
                tech.iconName === 'barChart2' ? BarChart2 :
                tech.iconName === 'layers' ? Layers :
                Radio; // fallback icon
              
              return (
                <motion.div
                  key={tech.id}
                  className={`bg-gradient-to-br ${colorScheme.bgFrom} ${colorScheme.bgTo} ${colorScheme.darkBgFrom} ${colorScheme.darkBgTo} p-6 rounded-xl ${colorScheme.border} ${colorScheme.darkBorder} relative overflow-hidden group`}
                  variants={cardVariants}
                  whileHover="hover"
                  onClick={() => handleTechnologySelect(tech.slug)}
                >
                  <div className={`absolute -right-10 -top-10 w-40 h-40 bg-primary/5 dark:bg-primary/10 rounded-full blur-xl ${colorScheme.hoverBg} ${colorScheme.darkHoverBg} transition-all duration-700`}></div>
                  <IconComponent className={`h-10 w-10 mb-4 ${colorScheme.text} ${colorScheme.darkText}`} />
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 relative z-10">{tech.name}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4 relative z-10">{tech.shortDescription}</p>
                  <a href={`#${tech.slug}`} className={`inline-flex items-center font-medium ${colorScheme.text} ${colorScheme.darkText} group-hover:translate-x-1 transition-transform relative z-10`}>
                    Discover <ChevronRight className="h-4 w-4 ml-1"/>
                  </a>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        <div className="space-y-24">
          {/* Acoustic Software */}
          <div id="acoustic-software" className="lg:grid lg:grid-cols-2 lg:gap-16 items-center relative">
            {/* Decorative elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 -left-40 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-accent/5 dark:bg-accent/10 rounded-full blur-3xl"></div>
            </div>
            
            <motion.div
              className="order-2 lg:order-1 mt-10 lg:mt-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInRight}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-primary dark:text-accent mb-2">
                Acoustic Software Platform
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 text-lg mb-6">
                Our proprietary acoustic analysis software transforms raw vibration data into actionable insights, helping predict structural failures before they occur.
              </p>
              
              <div className="mt-6 space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-2 bg-primary/10 dark:bg-primary/20 rounded-lg mt-1">
                    <Waves className="h-5 w-5 text-primary dark:text-accent" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-neutral-900 dark:text-white">Real-time Frequency Analysis</h4>
                    <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                      Process acoustic signatures in real-time, identifying structural anomalies through multi-spectral analysis.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-2 bg-primary/10 dark:bg-primary/20 rounded-lg mt-1">
                    <Wand2 className="h-5 w-5 text-primary dark:text-accent" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-neutral-900 dark:text-white">ML-Driven Pattern Recognition</h4>
                    <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                      Machine learning algorithms detect acoustic patterns indicating potential structural compromises with 98.7% accuracy.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-2 bg-primary/10 dark:bg-primary/20 rounded-lg mt-1">
                    <Network className="h-5 w-5 text-primary dark:text-accent" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-neutral-900 dark:text-white">Neural Network Integration</h4>
                    <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                      Our deep neural networks continuously learn from acoustic data, improving detection accuracy over time.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex">
                <Button 
                  variant="link" 
                  className="text-primary dark:text-accent hover:text-primary/80 dark:hover:text-accent/80 p-0 h-auto group"
                  onClick={() => toggleExpandSection('acoustic-details')}
                >
                  {expandedSection === 'acoustic-details' ? 'Show Less' : 'Technical Specifications'} 
                  <ArrowRight className={`ml-2 h-4 w-4 transition-transform ${expandedSection === 'acoustic-details' ? 'rotate-90' : 'group-hover:translate-x-1'}`}/>
                </Button>
              </div>

              {expandedSection === 'acoustic-details' && (
                <motion.div 
                  className="mt-6 bg-neutral-50 dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700"
                  initial={{ opacity: 0, height: 0, y: 20 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-4 text-lg">Acoustic Software Specifications</h4>
                  <ul className="space-y-3 text-neutral-700 dark:text-neutral-300">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><span className="font-medium">Frequency range:</span> 0.1Hz - 20kHz with 0.01Hz resolution</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><span className="font-medium">Processing capability:</span> Up to 512 channels of simultaneous data</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><span className="font-medium">Algorithm suite:</span> FFT, wavelet transforms, spectral analysis, neural networks</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><span className="font-medium">Pattern recognition:</span> 98.7% accuracy in failure prediction (based on field tests)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><span className="font-medium">Integration:</span> Compatible with all major sensor types and building management systems</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-neutral-700 dark:text-neutral-300">
                    Our acoustic analysis software has been deployed on critical infrastructure worldwide, including bridges, skyscrapers, and offshore installations, providing early warnings of structural issues months before conventional detection methods.
                  </p>
                </motion.div>
              )}
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInLeft}
              className="order-1 lg:order-2"
            >
              <div className="relative bg-white dark:bg-neutral-800 p-4 rounded-xl shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 backdrop-blur-sm"></div>
                
                <div className="relative z-10">
                  <div className="bg-neutral-100 dark:bg-neutral-700 h-8 w-full rounded-t-lg flex items-center px-4 border-b border-neutral-200 dark:border-neutral-600">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="mx-auto font-medium text-sm text-neutral-500 dark:text-neutral-400">
                      Acoustic Index Visualizer
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white dark:bg-neutral-800 rounded-b-lg">
                    <Lottie 
                      animationData={acousticWaveAnimationData}
                      className="w-full h-64"
                    />
                    
                    <div className="mt-6">
                      <div className="mb-2 flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
                        <span>Frequency Range</span>
                        <span>0-20kHz</span>
                      </div>
                      <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                        <div className="h-full bg-accent w-3/4 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="mb-2 flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
                        <span>Structural Health Index</span>
                        <span>87%</span>
                      </div>
                      <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[87%] rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="p-3 bg-neutral-100 dark:bg-neutral-700 rounded-lg text-center">
                        <div className="text-sm text-neutral-500 dark:text-neutral-400">
                          Signal Integrity
                        </div>
                        <div className="text-2xl font-bold text-primary dark:text-accent mt-1">
                          99.7%
                        </div>
                      </div>
                      <div className="p-3 bg-neutral-100 dark:bg-neutral-700 rounded-lg text-center">
                        <div className="text-sm text-neutral-500 dark:text-neutral-400">
                          Anomaly Score
                        </div>
                        <div className="text-2xl font-bold text-green-500 mt-1">
                          Low
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* PTFE Waterproofing */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
            >
              {/* A close-up of water beading on a hydrophobic concrete surface */}
              <img 
                src="https://pixabay.com/get/g123e9209893b09dd70223ae2211a857503a120e819be843027b2d99c4d323cfd1ec5c274ca0c53f1841b86d846e1a273462d6cec9e5b326a0b12de36ebb0f19d_1280.jpg" 
                alt="PTFE-based waterproofing system showing hydrophobic properties" 
                className="rounded-lg shadow-xl mx-auto" 
              />
            </motion.div>
            <motion.div 
              className="mt-10 lg:mt-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
            >
              <h3 className="text-2xl font-bold text-primary dark:text-accent">PTFE-Based Waterproofing</h3>
              <p className="mt-4 text-neutral-700 dark:text-neutral-300">
                Our proprietary PTFE-based waterproofing technology creates a permanent hydrophobic barrier that integrates at the molecular level with concrete structures, preventing water penetration even under extreme pressure conditions.
              </p>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-success mt-1">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-neutral-900 dark:text-white">Molecular Integration</h4>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      Unlike surface coatings, our solution forms chemical bonds with concrete's calcium silicate hydrate.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-success mt-1">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-neutral-900 dark:text-white">Self-Healing Properties</h4>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      Incorporates nano-capsules that release additional waterproofing agents when microcracks form.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-success mt-1">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-neutral-900 dark:text-white">Extended Lifespan</h4>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      Provides 50+ years of protection, significantly reducing maintenance costs over time.
                    </p>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="link" 
                className="mt-8 text-primary dark:text-accent hover:text-primary/80 dark:hover:text-accent/80 p-0 h-auto"
                onClick={() => toggleExpandSection('ptfe-details')}
              >
                {expandedSection === 'ptfe-details' ? 'Show Less' : 'Learn More'} 
                <i className={`ri-arrow-right-line ml-1 ${expandedSection === 'ptfe-details' ? 'rotate-90' : ''} transition-transform`}></i>
              </Button>

              {expandedSection === 'ptfe-details' && (
                <motion.div 
                  className="mt-6 bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">Technical Specifications</h4>
                  <ul className="list-disc list-inside space-y-2 text-neutral-700 dark:text-neutral-300">
                    <li>Hydrostatic pressure resistance: Up to 12 bar</li>
                    <li>Water absorption reduction: 99.8%</li>
                    <li>Application methods: Admixture, surface spray, injection</li>
                    <li>Vapor permeability: Allows structure to breathe</li>
                    <li>Chemical resistance: Resists chlorides, sulfates, acids</li>
                    <li>Environmental compliance: VOC-free, non-toxic</li>
                  </ul>
                  <p className="mt-4 text-neutral-700 dark:text-neutral-300">
                    Our PTFE-based waterproofing has been validated through rigorous testing by independent laboratories and real-world applications in marine environments, underground structures, and water treatment facilities.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Nano-Enhanced Admixtures */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div 
              className="order-2 lg:order-1 mt-10 lg:mt-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
            >
              <h3 className="text-2xl font-bold text-primary dark:text-accent">Nano-Enhanced Admixtures</h3>
              <p className="mt-4 text-neutral-700 dark:text-neutral-300">
                Our nano-enhanced admixtures incorporate engineered nanoparticles that improve concrete's structural properties at the nanoscale, creating stronger, more durable, and more environmentally friendly structures.
              </p>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-success mt-1">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-neutral-900 dark:text-white">Increased Strength</h4>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      Up to a 40% increase in compressive strength compared to standard concrete mixes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-success mt-1">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-neutral-900 dark:text-white">Reduced Carbon Footprint</h4>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      Allows for 30% less cement usage while maintaining or improving performance metrics.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-success mt-1">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-neutral-900 dark:text-white">Enhanced Durability</h4>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      Significantly improved resistance to chloride penetration, freeze-thaw cycles, and chemical attack.
                    </p>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="link" 
                className="mt-8 text-primary dark:text-accent hover:text-primary/80 dark:hover:text-accent/80 p-0 h-auto"
                onClick={() => toggleExpandSection('nano-details')}
              >
                {expandedSection === 'nano-details' ? 'Show Less' : 'Learn More'} 
                <i className={`ri-arrow-right-line ml-1 ${expandedSection === 'nano-details' ? 'rotate-90' : ''} transition-transform`}></i>
              </Button>

              {expandedSection === 'nano-details' && (
                <motion.div 
                  className="mt-6 bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">Nano-Enhanced Admixture Types</h4>
                  <ul className="list-disc list-inside space-y-2 text-neutral-700 dark:text-neutral-300">
                    <li><span className="font-medium">NanoSilica:</span> Ultra-fine silica particles for increased density and strength</li>
                    <li><span className="font-medium">CarbonTube:</span> Carbon nanotubes for improved tensile strength and crack resistance</li>
                    <li><span className="font-medium">NanoFiber:</span> Cellulose nanofibers for enhanced flexural strength and reduced shrinkage</li>
                    <li><span className="font-medium">NanoReact:</span> Reactive nanoparticles that continue to strengthen concrete over time</li>
                  </ul>
                  <p className="mt-4 text-neutral-700 dark:text-neutral-300">
                    Our nano-enhanced admixtures have been used in high-performance structures worldwide, including bridges, high-rise buildings, marine structures, and critical infrastructure projects requiring exceptional durability.
                  </p>
                </motion.div>
              )}
            </motion.div>
            <motion.div 
              className="order-1 lg:order-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
            >
              {/* A microscopic view of nano particles in a concrete matrix */}
              <img 
                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800&h=600" 
                alt="Nano-enhanced concrete admixture at microscopic level" 
                className="rounded-lg shadow-xl mx-auto" 
              />
            </motion.div>
          </div>

          {/* AI-Driven Structural Health Monitoring */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
            >
              {/* A control room with digital displays showing structural monitoring data */}
              <img 
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800&h=600" 
                alt="AI-driven structural health monitoring dashboard" 
                className="rounded-lg shadow-xl mx-auto" 
              />
            </motion.div>
            <motion.div 
              className="mt-10 lg:mt-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
            >
              <h3 className="text-2xl font-bold text-primary dark:text-accent">AI-Driven Structural Health Monitoring</h3>
              <p className="mt-4 text-neutral-700 dark:text-neutral-300">
                Our integrated monitoring system combines fiber-optic sensors, IoT connectivity, and proprietary machine learning algorithms to provide real-time structural health assessment and predictive maintenance insights.
              </p>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-success mt-1">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-neutral-900 dark:text-white">Distributed Sensing</h4>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      Advanced fiber-optic sensor networks measure strain, temperature, vibration, and corrosion.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-success mt-1">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-neutral-900 dark:text-white">Predictive Analytics</h4>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      Neural network models forecast potential failures weeks to months before conventional methods.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-success mt-1">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-neutral-900 dark:text-white">Real-Time Alerts</h4>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      Automated notification system alerts stakeholders of potential issues via customizable channels.
                    </p>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="link" 
                className="mt-8 text-primary dark:text-accent hover:text-primary/80 dark:hover:text-accent/80 p-0 h-auto"
                onClick={() => toggleExpandSection('ai-details')}
              >
                {expandedSection === 'ai-details' ? 'Show Less' : 'Learn More'} 
                <i className={`ri-arrow-right-line ml-1 ${expandedSection === 'ai-details' ? 'rotate-90' : ''} transition-transform`}></i>
              </Button>

              {expandedSection === 'ai-details' && (
                <motion.div 
                  className="mt-6 bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">System Components</h4>
                  <ul className="list-disc list-inside space-y-2 text-neutral-700 dark:text-neutral-300">
                    <li><span className="font-medium">QuantaSense Fiber Network:</span> Distributed fiber optic sensors with 1mm spatial resolution</li>
                    <li><span className="font-medium">QuantaNode IoT Gateways:</span> Edge computing devices processing sensor data in real-time</li>
                    <li><span className="font-medium">StructureAI Platform:</span> Cloud-based neural network processing and visualization</li>
                    <li><span className="font-medium">Digital Twin Integration:</span> Real-time performance mapped to structural models</li>
                    <li><span className="font-medium">Alert Management System:</span> Customizable notification thresholds and routing</li>
                  </ul>
                  <p className="mt-4 text-neutral-700 dark:text-neutral-300">
                    Our AI-driven monitoring systems are currently deployed on bridges, dams, tunnels, and high-rise buildings worldwide, providing critical insights that have prevented potential structural failures and optimized maintenance schedules.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;
