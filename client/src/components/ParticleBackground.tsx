import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface ParticleBackgroundProps {
  className?: string;
  color?: string;
  count?: number;
  density?: number;
}

const ParticleBackground = ({ 
  className = "", 
  color = "#0062cc", 
  count = 2000,
  density = 20
}: ParticleBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0.5, 0.5));

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js components
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Setup camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 25;
    cameraRef.current = camera;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasRef.current = renderer.domElement;
    rendererRef.current = renderer;
    
    // Clear any existing canvas
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    
    containerRef.current.appendChild(renderer.domElement);

    // Create particle geometry
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const colorObj = new THREE.Color(color);
    const baseColor = new THREE.Color(color);
    const accentColor = new THREE.Color('#00a8ff');

    for (let i = 0; i < count; i++) {
      // Position particles in a sphere
      const distance = Math.random() * density;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      const x = distance * Math.sin(phi) * Math.cos(theta);
      const y = distance * Math.sin(phi) * Math.sin(theta);
      const z = distance * Math.cos(phi);
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Set different colors based on position
      const mixRatio = Math.random();
      colorObj.copy(baseColor).lerp(accentColor, mixRatio);
      
      colors[i * 3] = colorObj.r;
      colors[i * 3 + 1] = colorObj.g;
      colors[i * 3 + 2] = colorObj.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Create material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      sizeAttenuation: true,
      transparent: true,
      alphaTest: 0.001,
      vertexColors: true
    });
    
    // Create points
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    pointsRef.current = particles;

    // Mouse move handler for interactive particles
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) - 0.5;
      mouseRef.current.y = -((event.clientY / window.innerHeight) - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Window resize handler
    const handleResize = () => {
      if (!rendererRef.current || !cameraRef.current) return;
      
      // Update camera
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      
      // Update renderer
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !pointsRef.current) return;
      
      // Rotate particles based on mouse position
      pointsRef.current.rotation.x += mouseRef.current.y * 0.01;
      pointsRef.current.rotation.y += mouseRef.current.x * 0.01;
      
      // Add gentle continuous rotation
      pointsRef.current.rotation.y += 0.001;
      pointsRef.current.rotation.z += 0.0005;
      
      // Render scene
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      
      // Continue animation loop
      frameRef.current = requestAnimationFrame(animate);
    };
    
    // Begin animation
    animate();

    // Add wave animation with GSAP
    gsap.to(pointsRef.current.rotation, {
      duration: 10,
      y: Math.PI * 2,
      repeat: -1,
      ease: "power1.inOut"
    });

    // Cleanup on unmount
    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (pointsRef.current) {
        if (pointsRef.current.geometry) {
          pointsRef.current.geometry.dispose();
        }
        if (pointsRef.current.material) {
          (pointsRef.current.material as THREE.Material).dispose();
        }
      }
      
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [color, count, density]);

  return (
    <div 
      ref={containerRef}
      className={`absolute w-full h-full top-0 left-0 z-0 pointer-events-none ${className}`}
    ></div>
  );
};

export { ParticleBackground };
