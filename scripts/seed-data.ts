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

    console.log("✅ Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    process.exit(0);
  }
}

seedDatabase();