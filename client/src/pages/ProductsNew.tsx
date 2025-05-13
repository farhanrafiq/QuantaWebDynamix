import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Loader2, CheckCircle, XCircle, ChevronRight } from "lucide-react";

// Product data types
interface Product {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string | null;
  category: string;
  featured: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  features?: ProductFeature[];
}

interface ProductFeature {
  id: number;
  productId: number;
  title: string;
  description: string;
  iconName?: string;
  displayOrder: number;
}

interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

type ProductCategory = "all" | "waterproofing" | "admixtures" | "monitoring" | "software";

const Products = () => {
  const [activeFilter, setActiveFilter] = useState<ProductCategory>("all");

  // Fetch products from the API
  const { data: productsData, isLoading, error } = useQuery<APIResponse<Product[]>>({
    queryKey: ['/api/products'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Filter products based on selected category
  const filteredProducts = productsData?.data?.filter(
    (product) => activeFilter === "all" || product.category === activeFilter
  ) || [];

  // Product category display data
  const categories: { value: ProductCategory, label: string }[] = [
    { value: "all", label: "All Products" },
    { value: "waterproofing", label: "Waterproofing" },
    { value: "admixtures", label: "Admixtures" },
    { value: "monitoring", label: "Monitoring" },
    { value: "software", label: "Software" }
  ];

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

  const getCategoryTag = (category: string) => {
    switch (category) {
      case 'waterproofing':
        return 'Infrastructure';
      case 'admixtures':
        return 'Construction';
      case 'monitoring':
        return 'Monitoring';
      case 'software':
        return 'Software';
      default:
        return 'Product';
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
          {categories.map(category => (
            <FilterButton 
              key={category.value}
              active={activeFilter === category.value} 
              onClick={() => setActiveFilter(category.value)}
            >
              {category.label}
            </FilterButton>
          ))}
        </motion.div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-neutral-700 dark:text-neutral-300 text-lg">Loading products...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-lg text-center">
            <XCircle className="h-12 w-12 text-red-500 dark:text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-red-700 dark:text-red-300 mb-2">Failed to load products</h3>
            <p className="text-red-600 dark:text-red-400">
              There was an error loading the product catalog. Please try again later.
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-neutral-100 dark:bg-neutral-700/30 p-8 rounded-lg text-center">
            <p className="text-neutral-600 dark:text-neutral-400">
              No products found in this category.
            </p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filteredProducts.map((product) => (
              <motion.div 
                key={product.id}
                className="bg-white dark:bg-neutral-700 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105 group"
                variants={fadeInUp}
              >
                <div className="relative h-56 overflow-hidden">
                  {product.featured && (
                    <div className="absolute top-0 right-0 bg-primary dark:bg-accent text-white px-3 py-1 z-10 rounded-bl-lg">
                      Featured
                    </div>
                  )}
                  <img 
                    src={product.imageUrl || '/placeholder-product.jpg'} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{product.name}</h3>
                  <p className="text-primary dark:text-accent text-sm">{product.shortDescription}</p>
                  <p className="mt-3 text-neutral-700 dark:text-neutral-300 line-clamp-3">
                    {product.fullDescription}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary dark:bg-accent/20 dark:text-accent">
                      {getCategoryTag(product.category)}
                    </span>
                    <Link href={`/products/${product.slug}`} className="text-primary dark:text-accent hover:text-primary/80 dark:hover:text-accent/80 inline-flex items-center">
                      View Details <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="text-center mt-12">
          <Link href="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/80 dark:bg-accent dark:hover:bg-accent/80 text-white flex items-center">
              <span>Request Product Consultation</span>
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
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