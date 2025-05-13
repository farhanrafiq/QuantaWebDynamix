import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTheme } from "next-themes";

interface RootLayoutProps {
  children: React.ReactNode;
}

// Initial page loader animation
const InitialLoader = () => {
  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-neutral-900"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, delay: 1.5 }}
    >
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 rounded-full border-8 border-t-accent border-r-accent/50 border-b-accent/30 border-l-accent/10 animate-spin"></div>
        <div className="absolute inset-4 rounded-full border-8 border-t-primary border-r-primary/50 border-b-primary/30 border-l-primary/10 animate-spin-slow"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-accent">Quanta</span>
          <span className="text-primary dark:text-white">FONS</span>
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Global R&D Innovation
        </p>
      </motion.div>
    </motion.div>
  );
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Set theme and handle initial loading animation
  useEffect(() => {
    // Make sure component is mounted
    setMounted(true);
    
    // Initial loading animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Don't render until mounted to prevent theme flash
  if (!mounted) return null;
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Initial page loader */}
      <AnimatePresence>
        {loading && <InitialLoader />}
      </AnimatePresence>
      
      <Header />
      <main className="flex-grow relative">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
