import { motion } from "framer-motion";
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
import { useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
                  className={`bg-gradient-to-br ${colorScheme.bgFrom} ${colorScheme.bgTo} ${colorScheme.darkBgFrom} ${colorScheme.darkBgTo} p-6 rounded-xl ${colorScheme.border} ${colorScheme.darkBorder} relative overflow-hidden group cursor-pointer`}
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
          {techData?.data?.map((tech) => {
            // Determine the color scheme based on category
            const colorScheme = 
              tech.category === 'software' ? {
                bg: 'bg-primary/5',
                darkBg: 'dark:bg-primary/10',
                accentBg: 'bg-accent/5',
                darkAccentBg: 'dark:bg-accent/10',
                text: 'text-primary',
                darkText: 'dark:text-accent',
                bgLight: 'bg-primary/10',
                darkBgLight: 'dark:bg-primary/20',
              } : 
              tech.category === 'ai' ? {
                bg: 'bg-blue-500/5',
                darkBg: 'dark:bg-blue-500/10',
                accentBg: 'bg-blue-400/5',
                darkAccentBg: 'dark:bg-blue-400/10',
                text: 'text-blue-500',
                darkText: 'dark:text-blue-400',
                bgLight: 'bg-blue-500/10',
                darkBgLight: 'dark:bg-blue-500/20',
              } : 
              {
                bg: 'bg-purple-500/5',
                darkBg: 'dark:bg-purple-500/10',
                accentBg: 'bg-purple-400/5',
                darkAccentBg: 'dark:bg-purple-400/10',
                text: 'text-purple-500',
                darkText: 'dark:text-purple-400',
                bgLight: 'bg-purple-500/10',
                darkBgLight: 'dark:bg-purple-500/20',
              };

            // Map iconName to icon component for features
            const getIconComponent = (iconName?: string) => {
              if (iconName === 'waves') return Waves;
              if (iconName === 'wand2') return Wand2;
              if (iconName === 'network') return Network;
              if (iconName === 'gitBranch') return BarChart2;
              if (iconName === 'activity') return Check;
              if (iconName === 'history') return Check;
              if (iconName === 'atom') return Layers;
              if (iconName === 'droplet') return Check;
              if (iconName === 'refresh') return Check;
              return Check; // fallback icon
            };
            
            const detailsId = `${tech.slug}-details`;
            
            return (
              <div 
                key={tech.id}
                id={tech.slug} 
                className="lg:grid lg:grid-cols-2 lg:gap-16 items-center relative pt-12"
              >
                {/* Decorative elements */}
                <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                  <div className={`absolute top-1/4 -left-40 w-80 h-80 ${colorScheme.bg} ${colorScheme.darkBg} rounded-full blur-3xl`}></div>
                  <div className={`absolute bottom-1/4 -right-40 w-80 h-80 ${colorScheme.accentBg} ${colorScheme.darkAccentBg} rounded-full blur-3xl`}></div>
                </div>
                
                <motion.div
                  className="order-2 lg:order-1 mt-10 lg:mt-0"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeInRight}
                >
                  <h3 className={`text-2xl md:text-3xl font-bold ${colorScheme.text} ${colorScheme.darkText} mb-2`}>
                    {tech.name}
                  </h3>
                  <p className="text-neutral-700 dark:text-neutral-300 text-lg mb-6">
                    {tech.fullDescription}
                  </p>
                  
                  <div className="mt-6 space-y-6">
                    {detailsLoading && selectedTechnology === tech.slug ? (
                      <div className="flex justify-center items-center py-4">
                        <Loader2 className={`h-6 w-6 animate-spin ${colorScheme.text}`} />
                        <span className="ml-2 text-neutral-700 dark:text-neutral-300">Loading features...</span>
                      </div>
                    ) : techDetails?.data?.slug === tech.slug && techDetails?.data?.features ? (
                      techDetails.data.features
                        .sort((a, b) => a.displayOrder - b.displayOrder)
                        .map(feature => {
                          const FeatureIcon = getIconComponent(feature.iconName);
                          return (
                            <div key={feature.id} className="flex items-start">
                              <div className={`flex-shrink-0 p-2 ${colorScheme.bgLight} ${colorScheme.darkBgLight} rounded-lg mt-1`}>
                                <FeatureIcon className={`h-5 w-5 ${colorScheme.text} ${colorScheme.darkText}`} />
                              </div>
                              <div className="ml-4">
                                <h4 className="text-lg font-medium text-neutral-900 dark:text-white">{feature.title}</h4>
                                <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                          );
                        })
                    ) : (
                      // Placeholder for when specific tech is not yet fetched
                      <div className="flex justify-center items-center py-4">
                        <span className="text-neutral-600 dark:text-neutral-400">
                          Click on the technology card above to view features
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {techDetails?.data?.slug === tech.slug && techDetails?.data?.specs && (
                    <div className="mt-8 flex">
                      <Button 
                        variant="link" 
                        className={`${colorScheme.text} ${colorScheme.darkText} hover:opacity-80 p-0 h-auto group`}
                        onClick={() => toggleExpandSection(detailsId)}
                      >
                        {expandedSection === detailsId ? 'Show Less' : 'Technical Specifications'} 
                        <ArrowRight className={`ml-2 h-4 w-4 transition-transform ${expandedSection === detailsId ? 'rotate-90' : 'group-hover:translate-x-1'}`}/>
                      </Button>
                    </div>
                  )}
                  
                  {expandedSection === detailsId && techDetails?.data?.slug === tech.slug && techDetails?.data?.specs && (
                    <motion.div 
                      className="mt-6 p-5 bg-neutral-50 dark:bg-neutral-800 rounded-xl"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 className="font-semibold text-neutral-900 dark:text-white mb-4 text-lg">{tech.name} Specifications</h4>
                      <div className="space-y-3">
                        {techDetails.data.specs
                          .sort((a, b) => a.displayOrder - b.displayOrder)
                          .map(spec => (
                            <div key={spec.id} className="flex justify-between items-center">
                              <span className="text-neutral-700 dark:text-neutral-300">{spec.name}</span>
                              <span className={`${colorScheme.text} ${colorScheme.darkText} font-medium`}>{spec.value}</span>
                            </div>
                          ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
                
                <motion.div 
                  className="order-1 lg:order-2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeInLeft}
                >
                  <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6">
                    <div className="aspect-square w-full h-full flex items-center justify-center">
                      {tech.category === 'software' ? (
                        <Lottie animationData={acousticWaveAnimationData} className="w-full h-full" />
                      ) : tech.category === 'ai' ? (
                        <div className="flex items-center justify-center h-full w-full">
                          <BarChart2 className={`w-32 h-32 ${colorScheme.text} ${colorScheme.darkText}`} />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full w-full">
                          <Layers className={`w-32 h-32 ${colorScheme.text} ${colorScheme.darkText}`} />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Technologies;