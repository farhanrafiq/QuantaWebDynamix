import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Page components
import NotFound from "@/pages/not-found";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Technologies from "./pages/TechnologiesNew";
import Products from "./pages/Products";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";

// Loader component for page transitions
const PageLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-neutral-900">
    <div className="relative w-24 h-24">
      <div className="absolute inset-0 rounded-full border-4 border-t-accent border-r-accent border-b-transparent border-l-transparent animate-spin"></div>
      <div className="absolute inset-2 rounded-full border-4 border-t-primary border-r-transparent border-b-primary border-l-transparent animate-spin-slow"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-lg font-semibold text-primary dark:text-accent">
          QuantaFONS
        </div>
      </div>
    </div>
  </div>
);

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  out: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

function Router() {
  const [location] = useLocation();
  const [isChangingPage, setIsChangingPage] = useState(false);
  const [prevLocation, setPrevLocation] = useState(location);
  
  // Handle page transitions with a small delay for smooth animations
  useEffect(() => {
    if (location !== prevLocation) {
      // When location changes
      setIsChangingPage(true);
      
      // Wait for animation and then update previous location
      const timer = setTimeout(() => {
        setPrevLocation(location);
        setIsChangingPage(false);
        // Scroll to top on page change
        window.scrollTo(0, 0);
      }, 700); // Slightly longer than animation to ensure completion
      
      return () => clearTimeout(timer);
    }
  }, [location, prevLocation]);
  
  return (
    <>
      {/* Page transition loader */}
      <AnimatePresence>
        {isChangingPage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PageLoader />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main content with page transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          className="min-h-screen"
        >
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/technologies" component={Technologies} />
            <Route path="/products" component={Products} />
            <Route path="/blog" component={Blog} />
            <Route path="/careers" component={Careers} />
            <Route path="/contact" component={Contact} />
            <Route component={NotFound} />
          </Switch>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          <Toaster />
          <RootLayout>
            <Router />
          </RootLayout>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
