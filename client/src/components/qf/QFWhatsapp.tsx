import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface QFWhatsappProps {
  phone?: string;
  className?: string;
}

interface QFConfig {
  whatsapp: {
    enabled: boolean;
    phone: string;
  };
}

const QFWhatsapp: React.FC<QFWhatsappProps> = ({ phone, className = "" }) => {
  const [config, setConfig] = useState<QFConfig | null>(null);

  useEffect(() => {
    fetch('/qf-config.json')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error('Failed to load QF config:', err));
  }, []);

  if (!config || !config.whatsapp.enabled) return null;

  const whatsappPhone = phone || config.whatsapp.phone;
  const whatsappUrl = `https://wa.me/${whatsappPhone}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`qf-wa fixed right-4 bottom-4 md:right-6 md:bottom-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#25D366]/90 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 1 
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="26" 
        height="26" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="text-white"
        aria-hidden="true"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    </motion.a>
  );
};

export default QFWhatsapp;