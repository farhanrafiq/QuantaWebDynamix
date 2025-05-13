import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  
  // Text animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };
  
  // Number animation variants
  const errorNumber = {
    hidden: { 
      opacity: 0,
      scale: 0.5,
      rotateY: -90
    },
    show: { 
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
        delay: 0.2
      }
    }
  };
  
  // Initialize Three.js background
  useEffect(() => {
    if (!canvasRef.current) return;
    setMounted(true);
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: new THREE.Color('#0062cc'),
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    // Create mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Handle resize
    const handleResize = () => {
      // Update camera
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      
      // Update renderer
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation
    let mouseX = 0;
    let mouseY = 0;
    
    // Mouse move effect
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate based on mouse position
      particlesMesh.rotation.x += 0.002;
      particlesMesh.rotation.y += 0.001;
      
      // Interactive movement
      particlesMesh.rotation.x += mouseY * 0.001;
      particlesMesh.rotation.y += mouseX * 0.001;
      
      // Render
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      // Clean up Three.js resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
      
      // Stop animation loop
      if (renderer) {
        renderer.setAnimationLoop(null);
      }
    };
  }, []);
  
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* Three.js background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 bg-gradient-to-b from-neutral-950 to-neutral-900"
      />
      
      {/* Content */}
      <div className="relative z-10 px-4 text-center">
        <motion.div 
          className="mb-8"
          variants={errorNumber}
          initial="hidden"
          animate="show"
        >
          <h1 className="text-8xl md:text-9xl font-black text-white">
            <span className="text-accent">4</span>
            <span className="text-white">0</span>
            <span className="text-accent">4</span>
          </h1>
        </motion.div>
        
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-xl mx-auto"
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-white mb-6"
            variants={item}
          >
            Page Not Found
          </motion.h2>
          
          <motion.p 
            className="text-neutral-300 mb-8 text-lg"
            variants={item}
          >
            The page you're looking for doesn't exist or has been moved.
            We've searched across our entire network but couldn't locate it.
          </motion.p>
          
          <motion.div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4" variants={item}>
            <Link href="/">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/80 text-white font-medium px-6 py-6 h-auto rounded-lg group transition-all duration-300 shadow-lg hover:shadow-accent/20 hover:shadow-xl"
              >
                <Home className="mr-2 h-5 w-5" />
                <span>Back to Home</span>
              </Button>
            </Link>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 px-6 py-6 h-auto rounded-lg backdrop-blur-sm"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              <span>Go Back</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Particles overlay */}
      {mounted && (
        <div className="absolute inset-0 z-0 overflow-hidden opacity-40 pointer-events-none">
          <div className="absolute w-1/2 h-1/2 -top-20 -right-20 bg-accent/20 rounded-full blur-3xl"></div>
          <div className="absolute w-1/3 h-1/3 -bottom-20 -left-20 bg-primary/20 rounded-full blur-3xl"></div>
        </div>
      )}
    </div>
  );
}
