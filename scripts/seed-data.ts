import { db } from "../server/db";
import { 
  technologies, 
  technologyFeatures, 
  technologySpecs,
  products,
  productFeatures,
  blogPosts,
  tags,
  blogPostsTags,
  teamMembers,
  jobPositions
} from "../shared/schema";

async function seedDatabase() {
  console.log("🌱 Starting database seeding...");

  try {
    // Clear existing data first to avoid duplicates
    console.log("Clearing existing data...");
    await db.delete(technologyFeatures);
    await db.delete(technologySpecs);
    await db.delete(technologies);
    await db.delete(productFeatures);
    await db.delete(products);
    
    // Add technologies
    console.log("Adding technologies...");
    
    const acousticTech = await db.insert(technologies).values({
      name: "Acoustic Analytics Platform",
      slug: "acoustic-analytics",
      shortDescription: "Advanced signal processing algorithms for analyzing structural acoustic signatures.",
      fullDescription: "Our proprietary acoustic analysis software transforms raw vibration data into actionable insights, helping predict structural failures before they occur. Using advanced machine learning models and signal processing algorithms, we can identify subtle changes in a structure's acoustic signature that may indicate developing issues.",
      iconName: "waves",
      category: "software",
      featured: true,
      displayOrder: 1
    }).returning();
    
    const predictiveTech = await db.insert(technologies).values({
      name: "Predictive Maintenance AI",
      slug: "predictive-maintenance",
      shortDescription: "Neural network models that predict maintenance needs before critical failures occur.",
      fullDescription: "Our AI-powered predictive maintenance system uses advanced neural networks to analyze structural health monitoring data and predict when maintenance will be needed. By identifying patterns that suggest developing issues, the system helps prevent unexpected failures and optimize maintenance schedules.",
      iconName: "barChart2",
      category: "ai",
      featured: true,
      displayOrder: 2
    }).returning();
    
    const materialsAdvanced = await db.insert(technologies).values({
      name: "Advanced Materials",
      slug: "advanced-materials",
      shortDescription: "Nano-enhanced admixtures and PTFE-based waterproofing for next-generation structures.",
      fullDescription: "Our advanced materials research has produced breakthrough nano-enhanced admixtures and PTFE-based waterproofing solutions that significantly outperform traditional products. These innovative materials provide superior durability, strength, and water resistance, extending the lifespan of concrete structures and reducing long-term maintenance costs.",
      iconName: "layers",
      category: "materials",
      featured: true,
      displayOrder: 3
    }).returning();

    // Add technology features
    console.log("Adding technology features...");
    
    // Acoustic Analytics features
    await db.insert(technologyFeatures).values([
      {
        technologyId: acousticTech[0].id,
        title: "Real-time Frequency Analysis",
        description: "Process acoustic signatures in real-time, identifying structural anomalies through multi-spectral analysis.",
        iconName: "waves",
        displayOrder: 1
      },
      {
        technologyId: acousticTech[0].id,
        title: "ML-Driven Pattern Recognition",
        description: "Machine learning algorithms detect acoustic patterns indicating potential structural compromises with 98.7% accuracy.",
        iconName: "wand2",
        displayOrder: 2
      },
      {
        technologyId: acousticTech[0].id,
        title: "Neural Network Integration",
        description: "Our deep neural networks continuously learn from acoustic data, improving detection accuracy over time.",
        iconName: "network",
        displayOrder: 3
      }
    ]);
    
    // Predictive Maintenance features
    await db.insert(technologyFeatures).values([
      {
        technologyId: predictiveTech[0].id,
        title: "Failure Prediction Models",
        description: "Advanced neural networks predict structural failures up to 8 months before they occur with 94% accuracy.",
        iconName: "gitBranch",
        displayOrder: 1
      },
      {
        technologyId: predictiveTech[0].id,
        title: "Real-time Monitoring",
        description: "Continuous monitoring system provides instant alerts when structural parameters fall outside normal ranges.",
        iconName: "activity",
        displayOrder: 2
      },
      {
        technologyId: predictiveTech[0].id,
        title: "Historic Data Analysis",
        description: "Statistical algorithms analyze years of historical data to identify long-term structural behavior patterns.",
        iconName: "history",
        displayOrder: 3
      }
    ]);
    
    // Advanced Materials features
    await db.insert(technologyFeatures).values([
      {
        technologyId: materialsAdvanced[0].id,
        title: "Nano-Enhanced Admixtures",
        description: "Our proprietary nano-particle formulations increase concrete strength by up to 40% while reducing water requirements.",
        iconName: "atom",
        displayOrder: 1
      },
      {
        technologyId: materialsAdvanced[0].id,
        title: "PTFE Waterproofing",
        description: "Advanced PTFE-based waterproofing provides complete hydrophobic protection with a 35-year durability guarantee.",
        iconName: "droplet",
        displayOrder: 2
      },
      {
        technologyId: materialsAdvanced[0].id,
        title: "Self-Healing Compounds",
        description: "Innovative additives enable concrete to self-repair micro-cracks, significantly extending structural lifespan.",
        iconName: "refresh",
        displayOrder: 3
      }
    ]);

    // Add technology specs
    console.log("Adding technology specifications...");
    
    // Acoustic Analytics specs
    await db.insert(technologySpecs).values([
      {
        technologyId: acousticTech[0].id,
        name: "Frequency Range",
        value: "0.1 Hz to 25 kHz",
        displayOrder: 1
      },
      {
        technologyId: acousticTech[0].id,
        name: "Processing Latency",
        value: "< 15ms",
        displayOrder: 2
      },
      {
        technologyId: acousticTech[0].id,
        name: "Detection Accuracy",
        value: "98.7%",
        displayOrder: 3
      },
      {
        technologyId: acousticTech[0].id,
        name: "Signal Resolution",
        value: "24-bit/192kHz",
        displayOrder: 4
      },
      {
        technologyId: acousticTech[0].id,
        name: "Supported Sensors",
        value: "Piezoelectric, MEMS, Fiber Optic",
        displayOrder: 5
      }
    ]);
    
    // Predictive Maintenance specs
    await db.insert(technologySpecs).values([
      {
        technologyId: predictiveTech[0].id,
        name: "Neural Network Architecture",
        value: "Deep Convolutional with LSTM layers",
        displayOrder: 1
      },
      {
        technologyId: predictiveTech[0].id,
        name: "Training Data Volume",
        value: "15+ years of historical data",
        displayOrder: 2
      },
      {
        technologyId: predictiveTech[0].id,
        name: "Prediction Horizon",
        value: "Up to 8 months",
        displayOrder: 3
      },
      {
        technologyId: predictiveTech[0].id,
        name: "False Positive Rate",
        value: "< 2.3%",
        displayOrder: 4
      },
      {
        technologyId: predictiveTech[0].id,
        name: "Integration Options",
        value: "REST API, MQTT, Custom protocols",
        displayOrder: 5
      }
    ]);
    
    // Advanced Materials specs
    await db.insert(technologySpecs).values([
      {
        technologyId: materialsAdvanced[0].id,
        name: "Nano-particle Size",
        value: "5-25 nm",
        displayOrder: 1
      },
      {
        technologyId: materialsAdvanced[0].id,
        name: "Strength Increase",
        value: "35-40% compared to standard concrete",
        displayOrder: 2
      },
      {
        technologyId: materialsAdvanced[0].id,
        name: "Water Resistance",
        value: "Complete impermeability at 10 bar pressure",
        displayOrder: 3
      },
      {
        technologyId: materialsAdvanced[0].id,
        name: "Durability Rating",
        value: "35+ years under extreme conditions",
        displayOrder: 4
      },
      {
        technologyId: materialsAdvanced[0].id,
        name: "Environmental Impact",
        value: "Carbon-neutral production process",
        displayOrder: 5
      }
    ]);

    // Add products
    console.log("Adding products...");
    
    const quantaShield = await db.insert(products).values({
      name: "QuantaShield Pro",
      slug: "quantashield-pro",
      shortDescription: "Advanced PTFE Waterproofing System",
      fullDescription: "Our flagship waterproofing solution designed for critical infrastructure with 50+ years of protection. QuantaShield Pro utilizes a proprietary PTFE-based formula that creates an impermeable barrier against water penetration while remaining flexible to accommodate structural movement.",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=600&h=400",
      category: "waterproofing",
      featured: true,
      displayOrder: 1
    }).returning();
    
    const nanoForce = await db.insert(products).values({
      name: "NanoForce",
      slug: "nanoforce",
      shortDescription: "High-Performance Concrete Admixture",
      fullDescription: "Nano-engineered additive that increases concrete strength by 40% while reducing cement content by 30%. NanoForce employs advanced nanotechnology to optimize the crystalline structure of concrete, resulting in superior performance and durability while reducing the environmental impact of construction.",
      imageUrl: "https://pixabay.com/get/g54faf1293e565bc5005588f1d00aca04a69c92ec4501f8f6bd7d475859fc9b01e3e4b8a8d3aeaf54082a661b70812ed6426190b6e489e7ab69ef16bf407b9ea4_1280.jpg",
      category: "admixtures",
      featured: true,
      displayOrder: 2
    }).returning();
    
    const quantaSense = await db.insert(products).values({
      name: "QuantaSense",
      slug: "quantasense",
      shortDescription: "Distributed Fiber Optic Sensing System",
      fullDescription: "Comprehensive sensor network providing real-time structural data with 0.01mm measurement accuracy. QuantaSense uses distributed fiber optic technology to create a network of thousands of virtual sensors that continuously monitor strain, temperature, and vibration across entire structures.",
      imageUrl: "https://images.unsplash.com/photo-1517373116369-9bdb8cdc9f62?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=600&h=400",
      category: "monitoring",
      featured: true,
      displayOrder: 3
    }).returning();
    
    const structureAI = await db.insert(products).values({
      name: "StructureAI",
      slug: "structure-ai",
      shortDescription: "Predictive Maintenance Platform",
      fullDescription: "Cloud-based analytics suite that processes sensor data to predict maintenance needs and potential failures. Our AI algorithms have been trained on 15+ years of structural health data to accurately identify developing issues before they become critical problems.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=600&h=400",
      category: "software",
      featured: true,
      displayOrder: 4
    }).returning();
    
    const hydroGuard = await db.insert(products).values({
      name: "HydroGuard",
      slug: "hydroguard",
      shortDescription: "Penetrative Sealer & Surface Treatment",
      fullDescription: "Hydrophobic treatment for existing concrete structures that penetrates up to 4 inches below surface. HydroGuard creates a molecular barrier against water ingress while allowing the concrete to breathe, preventing internal moisture build-up and extending the lifespan of aging infrastructure.",
      imageUrl: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=600&h=400",
      category: "waterproofing",
      featured: false,
      displayOrder: 5
    }).returning();
    
    const corroTrack = await db.insert(products).values({
      name: "CorroTrack",
      slug: "corrotrack",
      shortDescription: "Corrosion Monitoring System",
      fullDescription: "IoT-enabled sensors that monitor reinforcement corrosion in real-time, with 5+ year battery life. CorroTrack identifies the early stages of reinforcement corrosion before visible damage occurs, allowing for targeted preventative maintenance rather than costly repairs.",
      imageUrl: "https://pixabay.com/get/ga27f5c05fb095dbf078b938bc19542f49aee8d30aa25e853b5475724df9fbd33aa916b406bec7debafdc3b88e7c376245be0f7447526c7f6b92a2734e198a744_1280.jpg",
      category: "monitoring",
      featured: false,
      displayOrder: 6
    }).returning();
    
    // Add product features
    console.log("Adding product features...");
    
    // QuantaShield features
    await db.insert(productFeatures).values([
      {
        productId: quantaShield[0].id,
        title: "Long-Term Protection",
        description: "50+ year protection against water penetration, backed by accelerated aging tests.",
        iconName: "shield",
        displayOrder: 1
      },
      {
        productId: quantaShield[0].id,
        title: "Chemical Resistance",
        description: "Resists aggressive chemicals including acids, bases, and hydrocarbons.",
        iconName: "flask",
        displayOrder: 2
      },
      {
        productId: quantaShield[0].id,
        title: "Structural Flexibility",
        description: "Maintains integrity while accommodating structural movement and thermal cycling.",
        iconName: "move",
        displayOrder: 3
      }
    ]);
    
    // NanoForce features
    await db.insert(productFeatures).values([
      {
        productId: nanoForce[0].id,
        title: "Strength Enhancement",
        description: "Increases compressive strength by up to 40% compared to standard concrete mixes.",
        iconName: "zap",
        displayOrder: 1
      },
      {
        productId: nanoForce[0].id,
        title: "Environmental Impact",
        description: "Reduces cement content by 30%, significantly lowering CO2 emissions.",
        iconName: "leaf",
        displayOrder: 2
      },
      {
        productId: nanoForce[0].id,
        title: "Durability Improvement",
        description: "Enhances freeze-thaw resistance and reduces permeability for longer service life.",
        iconName: "clock",
        displayOrder: 3
      }
    ]);
    
    // QuantaSense features
    await db.insert(productFeatures).values([
      {
        productId: quantaSense[0].id,
        title: "High-Resolution Monitoring",
        description: "Measures strain with 0.01mm accuracy across thousands of sensing points.",
        iconName: "eye",
        displayOrder: 1
      },
      {
        productId: quantaSense[0].id,
        title: "Real-Time Alerts",
        description: "Provides instant notification when measurements exceed predefined thresholds.",
        iconName: "bell",
        displayOrder: 2
      },
      {
        productId: quantaSense[0].id,
        title: "Distributed Sensing",
        description: "Creates a comprehensive picture of structural behavior with no blind spots.",
        iconName: "network",
        displayOrder: 3
      }
    ]);
    
    // StructureAI features
    await db.insert(productFeatures).values([
      {
        productId: structureAI[0].id,
        title: "Predictive Analytics",
        description: "Forecasts potential failures up to 8 months before they occur with 94% accuracy.",
        iconName: "brain",
        displayOrder: 1
      },
      {
        productId: structureAI[0].id,
        title: "Maintenance Optimization",
        description: "Prioritizes repairs based on risk assessment and structural criticality.",
        iconName: "tool",
        displayOrder: 2
      },
      {
        productId: structureAI[0].id,
        title: "Historical Trending",
        description: "Tracks structural health indicators over time to identify long-term degradation patterns.",
        iconName: "activity",
        displayOrder: 3
      }
    ]);

    console.log("✅ Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    process.exit(0);
  }
}

seedDatabase();