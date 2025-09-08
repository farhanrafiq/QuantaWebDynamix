const fs = require('fs');
const path = require('path');

// 30 seed topics with 4 angles each = 120+ posts
const SEED_TOPICS = [
  "AI agents in production",
  "RAG systems on private data", 
  "Prompt engineering that survives audits",
  "LLM evaluation and test harnesses",
  "Function calling and tool use",
  "Multi-agent orchestration patterns",
  "Fine-tuning vs adapters",
  "Vector databases and hybrid search",
  "Latency budgets for AI apps",
  "Observability for LLMs",
  "On-device models and WebGPU",
  "GPU vs CPU cost curves",
  "Streaming responses for UX",
  "Security and data redaction for AI",
  "NLP pipelines beyond LLMs",
  "Vision models for quality control",
  "MLOps in small teams",
  "CI for data and prompts",
  "Docs and knowledge bases with AI",
  "ETL to analytics in one week",
  "Web app architecture 2025",
  "Mobile app stacks that scale",
  "DevOps for fast shipping",
  "Performance budgets for SPAs",
  "Testing strategies E2E to unit",
  "SHM sensors for spacecraft skins",
  "Modal analysis for buildings",
  "Edge processing for SHM",
  "SCADA and CMMS integration with SHM",
  "Digital twins for maintenance"
];

const ANGLES = [
  "how-to",
  "architecture-deep-dive", 
  "pitfalls",
  "comparison"
];

const CATEGORIES = [
  "AI Engineering",
  "Machine Learning", 
  "LLMs & Language Models",
  "AI Agents & Automation",
  "MLOps & Model Deployment",
  "Data Engineering",
  "DevOps & Infrastructure",
  "Web Development", 
  "Mobile Development",
  "Security & Privacy",
  "Cloud Computing",
  "Structural Health Monitoring",
  "Aerospace Engineering",
  "Civil Engineering",
  "Edge AI & Computing",
  "Computer Vision",
  "Natural Language Processing",
  "Testing & Quality Assurance",
  "Performance Optimization"
];

const TAGS = [
  "RAG", "vector-databases", "prompt-engineering", "function-calling", "agents",
  "multi-modal", "semantic-search", "fine-tuning", "distillation", "evaluation",
  "retrieval", "streaming", "observability", "latency", "GPU", "ONNX", "WebGPU",
  "WASM", "fiber-bragg-grating", "modal-analysis", "ODS", "SCADA", "CMMS",
  "LangChain", "OpenAI", "Anthropic", "transformers", "embeddings", "BERT",
  "GPT", "Claude", "LLaMA", "quantization", "LoRA", "inference", "training",
  "datasets", "reasoning", "hallucination", "guardrails", "safety", "RLHF",
  "model-compression", "AutoML", "hyperparameter-tuning", "Docker", "Kubernetes",
  "microservices", "serverless", "GraphQL", "REST", "authentication", "encryption",
  "monitoring", "testing", "CI/CD", "performance", "optimization", "scalability"
];

// Helper functions
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function generateTitle(topic, angle) {
  const templates = {
    "how-to": [
      `How to Implement ${topic}: A Complete Guide`,
      `Building ${topic}: Step-by-Step Tutorial`, 
      `${topic}: Implementation Guide for Production`,
      `Complete Guide to ${topic} in 2025`
    ],
    "architecture-deep-dive": [
      `${topic}: Architecture Patterns and Best Practices`,
      `Deep Dive: ${topic} System Design`,
      `${topic}: Scalable Architecture Patterns`,
      `Engineering ${topic}: Architecture Deep Dive`
    ],
    "pitfalls": [
      `${topic}: Common Pitfalls and How to Avoid Them`,
      `Debugging ${topic}: Common Issues and Solutions`,
      `${topic} Mistakes That Cost Teams Months`,
      `What We Learned From ${topic} Failures`
    ],
    "comparison": [
      `${topic}: Comparing Popular Solutions`,
      `${topic} Tools: Comprehensive Comparison`,
      `Choosing the Right ${topic} Solution`,
      `${topic}: Framework Comparison and Recommendations`
    ]
  };
  
  const angleTemplates = templates[angle];
  return angleTemplates[Math.floor(Math.random() * angleTemplates.length)];
}

function generateMetaDescription(title, category) {
  const templates = [
    `Learn ${title.toLowerCase()} with practical examples, code samples, and production-ready solutions. Complete guide for ${category.toLowerCase()} professionals.`,
    `Comprehensive guide to ${title.toLowerCase()}. Includes best practices, real-world examples, and actionable insights for ${category.toLowerCase()} teams.`,
    `Master ${title.toLowerCase()} with this detailed guide. Features implementation strategies, performance tips, and proven approaches for ${category.toLowerCase()}.`,
    `Everything you need to know about ${title.toLowerCase()}. In-depth analysis, practical examples, and expert insights for ${category.toLowerCase()} success.`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)]
    .substring(0, 160)
    .replace(/\.$/, '') + '.';
}

function selectRandomTags(allTags, count = 5) {
  const shuffled = [...allTags].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateKeywords(title, tags, category) {
  const titleWords = title.toLowerCase().split(' ').filter(w => w.length > 3);
  const categoryWords = category.toLowerCase().split(' ');
  const tagWords = tags.slice(0, 3);
  
  return [...new Set([...titleWords.slice(0, 2), ...categoryWords, ...tagWords])].slice(0, 8);
}

function generateReadingTime() {
  return Math.floor(Math.random() * 6) + 7; // 7-12 minutes
}

function generatePublishDate() {
  const now = new Date();
  const eighteenMonthsAgo = new Date(now.getFullYear() - 1, now.getMonth() - 6, now.getDate());
  const randomTime = eighteenMonthsAgo.getTime() + Math.random() * (now.getTime() - eighteenMonthsAgo.getTime());
  return new Date(randomTime).toISOString().split('T')[0];
}

function generateContent(title, topic, angle, category, tags) {
  const sections = {
    "how-to": [
      "## Overview",
      "## Prerequisites",
      "## Step-by-Step Implementation",
      "## Code Examples",
      "## Best Practices",
      "## Testing and Validation",
      "## Production Deployment",
      "## Troubleshooting",
      "## Performance Optimization",
      "## Conclusion"
    ],
    "architecture-deep-dive": [
      "## System Overview", 
      "## Core Architecture Components",
      "## Data Flow and Processing",
      "## Scalability Patterns",
      "## Security Considerations",
      "## Performance Characteristics",
      "## Integration Patterns",
      "## Monitoring and Observability",
      "## Trade-offs and Alternatives",
      "## Future Considerations"
    ],
    "pitfalls": [
      "## Introduction",
      "## Common Anti-patterns",
      "## Performance Pitfalls",
      "## Security Vulnerabilities", 
      "## Scalability Issues",
      "## Maintenance Challenges",
      "## Integration Problems",
      "## Testing Gaps",
      "## Lessons Learned",
      "## Prevention Strategies"
    ],
    "comparison": [
      "## Comparison Overview",
      "## Solution Architecture",
      "## Feature Comparison",
      "## Performance Benchmarks",
      "## Cost Analysis", 
      "## Integration Capabilities",
      "## Community and Support",
      "## Use Case Recommendations",
      "## Migration Considerations",
      "## Final Verdict"
    ]
  };

  const sectionHeaders = sections[angle];
  let content = `In this comprehensive guide, we'll explore ${topic} and provide actionable insights for ${category.toLowerCase()} teams.\n\n`;
  
  // Generate content for each section
  sectionHeaders.forEach((header, index) => {
    content += `${header}\n\n`;
    
    // Add 2-3 paragraphs per section
    for (let i = 0; i < 2 + Math.floor(Math.random() * 2); i++) {
      content += generateParagraph(topic, angle, header, tags) + '\n\n';
    }
    
    // Add code examples for technical sections
    if (header.includes('Code') || header.includes('Implementation') || header.includes('Examples')) {
      content += generateCodeExample(topic, tags) + '\n\n';
    }
  });
  
  // Add TLDR
  content += `## TLDR\n\n${generateTLDR(topic, angle, category)}\n\n`;
  
  // Add conclusion with next steps
  content += `## Next Steps\n\n${generateNextSteps(topic, category)}\n\n`;
  
  return content;
}

function generateParagraph(topic, angle, section, tags) {
  const templates = [
    `When implementing ${topic}, it's crucial to understand the underlying architecture and how it impacts system performance. Our experience shows that teams often overlook key considerations that can make or break production deployments.`,
    `The evolution of ${topic} has transformed how we approach modern software development. By leveraging proven patterns and avoiding common pitfalls, teams can achieve significant improvements in both development velocity and system reliability.`,
    `Industry leaders have adopted ${topic} to solve complex challenges at scale. The key is understanding which approach fits your specific use case and technical constraints.`,
    `Performance optimization in ${topic} requires a deep understanding of the underlying mechanisms. Through careful monitoring and iterative improvement, teams can achieve substantial gains.`,
    `Security considerations for ${topic} cannot be an afterthought. Implementing proper safeguards from the beginning prevents costly vulnerabilities and ensures compliance with industry standards.`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}

function generateCodeExample(topic, tags) {
  const examples = [
    '```python\n# Example implementation\nclass AIAgent:\n    def __init__(self, config):\n        self.config = config\n        self.tools = []\n    \n    def execute(self, task):\n        return self.process_with_tools(task)\n```',
    '```javascript\n// Optimized implementation\nconst agent = new AIAgent({\n  model: "gpt-4",\n  tools: ["search", "calculator"],\n  maxTokens: 2000\n});\n\nconst result = await agent.execute(query);\n```',
    '```typescript\ninterface AgentConfig {\n  model: string;\n  tools: Tool[];\n  maxRetries: number;\n}\n\nclass ProductionAgent implements Agent {\n  constructor(private config: AgentConfig) {}\n  \n  async process(input: string): Promise<AgentResponse> {\n    // Implementation details\n  }\n}\n```'
  ];
  
  return examples[Math.floor(Math.random() * examples.length)];
}

function generateTLDR(topic, angle, category) {
  const summaries = {
    "how-to": `${topic} implementation requires careful planning and attention to performance. Key steps include proper configuration, testing, and gradual rollout.`,
    "architecture-deep-dive": `${topic} architecture balances scalability, performance, and maintainability. Critical components include data processing, caching, and monitoring.`,
    "pitfalls": `Common ${topic} pitfalls include inadequate testing, poor error handling, and insufficient monitoring. Prevention strategies focus on best practices and early detection.`,
    "comparison": `${topic} solutions vary in complexity, cost, and capabilities. Choice depends on team size, technical requirements, and long-term maintenance considerations.`
  };
  
  return summaries[angle];
}

function generateNextSteps(topic, category) {
  return `1. Start with a proof-of-concept implementation
2. Set up monitoring and alerting
3. Plan for gradual production rollout
4. Establish maintenance procedures
5. Consider team training and documentation

For more ${category.toLowerCase()} insights, explore our related articles on advanced implementation patterns and case studies.`;
}

function generateRelatedPosts(allPosts, currentPost, count = 4) {
  // Simple similarity based on shared tags and category
  const related = allPosts
    .filter(post => post.slug !== currentPost.slug)
    .map(post => {
      let score = 0;
      if (post.category === currentPost.category) score += 2;
      
      const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag));
      score += sharedTags.length;
      
      return { ...post, similarity: score };
    })
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, count)
    .map(post => ({ title: post.title, slug: post.slug }));
    
  return related;
}

// Main generation function
function generateBlogs() {
  const posts = [];
  let postId = 1;
  
  // Generate 4 posts for each seed topic (4 angles)
  SEED_TOPICS.forEach(topic => {
    ANGLES.forEach(angle => {
      const title = generateTitle(topic, angle);
      const slug = slugify(title);
      const category = selectCategory(topic);
      const tags = selectRandomTags(TAGS, 5);
      const keywords = generateKeywords(title, tags, category);
      
      const post = {
        id: postId++,
        title,
        slug,
        metaDescription: generateMetaDescription(title, category),
        category,
        tags,
        keywords,
        primaryKeyword: keywords[0],
        secondaryKeywords: keywords.slice(1, 4),
        coverImage: `/images/blog/${slug}-cover.jpg`,
        readingTime: generateReadingTime(),
        publishDate: generatePublishDate(),
        author: "QuantaFONS Team",
        excerpt: generateMetaDescription(title, category).substring(0, 200) + "...",
        content: generateContent(title, topic, angle, category, tags),
        featured: Math.random() < 0.1, // 10% featured posts
        relatedPosts: [] // Will be populated after all posts are generated
      };
      
      posts.push(post);
    });
  });
  
  // Sort by publish date (newest first)
  posts.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
  
  // Generate related posts for each
  posts.forEach(post => {
    post.relatedPosts = generateRelatedPosts(posts, post);
  });
  
  console.log(`Generated ${posts.length} blog posts`);
  return posts;
}

function selectCategory(topic) {
  const categoryMap = {
    "AI agents": "AI Agents & Automation",
    "RAG systems": "AI Engineering", 
    "Prompt engineering": "LLMs & Language Models",
    "LLM evaluation": "Machine Learning",
    "Function calling": "AI Engineering",
    "Multi-agent": "AI Agents & Automation",
    "Fine-tuning": "Machine Learning",
    "Vector databases": "Data Engineering",
    "Latency budgets": "Performance Optimization",
    "Observability": "DevOps & Infrastructure",
    "On-device models": "Edge AI & Computing",
    "GPU vs CPU": "Performance Optimization",
    "Streaming responses": "Web Development",
    "Security": "Security & Privacy",
    "NLP pipelines": "Natural Language Processing",
    "Vision models": "Computer Vision",
    "MLOps": "MLOps & Model Deployment",
    "CI for data": "DevOps & Infrastructure",
    "Docs and knowledge": "AI Engineering",
    "ETL to analytics": "Data Engineering",
    "Web app": "Web Development",
    "Mobile app": "Mobile Development", 
    "DevOps": "DevOps & Infrastructure",
    "Performance budgets": "Performance Optimization",
    "Testing strategies": "Testing & Quality Assurance",
    "SHM sensors": "Structural Health Monitoring",
    "Modal analysis": "Civil Engineering",
    "Edge processing": "Edge AI & Computing",
    "SCADA": "Structural Health Monitoring",
    "Digital twins": "Aerospace Engineering"
  };
  
  for (const [key, category] of Object.entries(categoryMap)) {
    if (topic.toLowerCase().includes(key.toLowerCase())) {
      return category;
    }
  }
  
  return "AI Engineering"; // Default category
}

// Generate and save blogs
function main() {
  try {
    const posts = generateBlogs();
    
    // Create output directory if it doesn't exist
    const outputDir = path.join(__dirname, '../client/public/data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Save blog data
    const blogData = {
      posts,
      totalPosts: posts.length,
      categories: [...new Set(posts.map(p => p.category))].sort(),
      tags: [...new Set(posts.flatMap(p => p.tags))].sort(),
      generatedAt: new Date().toISOString()
    };
    
    fs.writeFileSync(
      path.join(outputDir, 'qf-blogs.json'),
      JSON.stringify(blogData, null, 2)
    );
    
    // Generate sitemap entries
    const sitemapEntries = posts.map(post => ({
      url: `/blog/${post.slug}`,
      lastmod: post.publishDate,
      changefreq: 'monthly',
      priority: post.featured ? '0.8' : '0.6'
    }));
    
    fs.writeFileSync(
      path.join(outputDir, 'blog-sitemap.json'),
      JSON.stringify(sitemapEntries, null, 2)
    );
    
    console.log(`✅ Generated ${posts.length} blog posts`);
    console.log(`📝 Blog data saved to qf-blogs.json`);
    console.log(`🗺️ Sitemap entries saved to blog-sitemap.json`);
    console.log(`📊 Categories: ${blogData.categories.length}`);
    console.log(`🏷️ Tags: ${blogData.tags.length}`);
    
  } catch (error) {
    console.error('Error generating blogs:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { generateBlogs, main };