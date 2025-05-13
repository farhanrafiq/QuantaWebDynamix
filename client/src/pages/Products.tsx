import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { products } from "@/lib/constants";

type ProductCategory = "all" | "waterproofing" | "admixtures" | "monitoring" | "software";

const Products = () => {
  const [activeFilter, setActiveFilter] = useState<ProductCategory>("all");

  // Filter products based on selected category
  const filteredProducts = products.filter(
    (product) => activeFilter === "all" || product.category === activeFilter
  );

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section id="products" className="py-20 bg-neutral-50 dark:bg-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Our <span className="text-primary dark:text-accent">Products & Solutions</span>
          </motion.h2>
          <motion.p 
            className="mt-4 max-w-3xl mx-auto text-lg text-neutral-700 dark:text-neutral-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            From waterproofing systems to AI-powered monitoring solutions, explore our innovative product lineup.
          </motion.p>
        </div>

        {/* Product Filters */}
        <motion.div 
          className="mb-10 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <FilterButton 
            active={activeFilter === "all"} 
            onClick={() => setActiveFilter("all")}
          >
            All Products
          </FilterButton>
          <FilterButton 
            active={activeFilter === "waterproofing"} 
            onClick={() => setActiveFilter("waterproofing")}
          >
            Waterproofing
          </FilterButton>
          <FilterButton 
            active={activeFilter === "admixtures"} 
            onClick={() => setActiveFilter("admixtures")}
          >
            Admixtures
          </FilterButton>
          <FilterButton 
            active={activeFilter === "monitoring"} 
            onClick={() => setActiveFilter("monitoring")}
          >
            Monitoring
          </FilterButton>
          <FilterButton 
            active={activeFilter === "software"} 
            onClick={() => setActiveFilter("software")}
          >
            Software
          </FilterButton>
        </motion.div>

        {/* Products Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {filteredProducts.map((product) => (
            <motion.div 
              key={product.id}
              className="bg-white dark:bg-neutral-700 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105"
              variants={fadeInUp}
            >
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-56 object-cover" 
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{product.name}</h3>
                <p className="text-primary dark:text-accent text-sm">{product.subtitle}</p>
                <p className="mt-3 text-neutral-700 dark:text-neutral-300">
                  {product.description}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary dark:bg-accent/20 dark:text-accent">
                    {product.tag}
                  </span>
                  <Link href={`/products/${product.id}`} className="text-primary dark:text-accent hover:text-primary/80 dark:hover:text-accent/80">
                    View Details <i className="ri-arrow-right-line ml-1"></i>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary/80 dark:bg-accent dark:hover:bg-accent/80">
            View Full Product Catalog <i className="ri-arrow-right-line ml-2"></i>
          </Button>
        </div>
      </div>
    </section>
  );
};

type FilterButtonProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const FilterButton: React.FC<FilterButtonProps> = ({ active, onClick, children }) => {
  return (
    <Button
      variant="ghost"
      className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-primary/10 dark:hover:bg-accent/10 transition-colors
        ${active 
          ? "bg-primary/10 text-primary dark:bg-accent/20 dark:text-accent font-medium" 
          : "bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
        }`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default Products;
