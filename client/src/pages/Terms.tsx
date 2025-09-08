import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';

const Terms: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0B0F] via-[#1A1B23] to-[#0A0B0F] relative overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 opacity-20">
        <ParticleBackground color="#0099ff" count={30} density={60} />
      </div>

      <div className="relative z-10">
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-sm font-medium mb-8">
                  <FileText className="w-4 h-4 mr-2" />
                  Terms of Service
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Terms of Service
                </h1>
                <p className="text-xl text-neutral-300">
                  Terms and conditions for using our services
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="prose prose-invert prose-lg max-w-none">
                <div className="space-y-8">
                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Acceptance of Terms</h2>
                    <p className="text-neutral-300 leading-relaxed">
                      By accessing and using our services, you accept and agree to be bound by the terms 
                      and provision of this agreement. If you do not agree to abide by the above, 
                      please do not use this service.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Use License</h2>
                    <p className="text-neutral-300 leading-relaxed mb-4">
                      Permission is granted to temporarily use our services for personal, non-commercial 
                      transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                    </p>
                    <ul className="list-disc list-inside text-neutral-300 space-y-2">
                      <li>Modify or copy the materials</li>
                      <li>Use the materials for any commercial purpose or for any public display</li>
                      <li>Remove any copyright or other proprietary notations from the materials</li>
                      <li>Attempt to decompile or reverse engineer any software</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Service Availability</h2>
                    <p className="text-neutral-300 leading-relaxed">
                      We strive to provide uninterrupted service but cannot guarantee 100% uptime. 
                      We reserve the right to modify or discontinue services with or without notice.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
                    <p className="text-neutral-300 leading-relaxed">
                      In no event shall QuantaFONS or its suppliers be liable for any damages arising 
                      out of the use or inability to use our services, even if we have been notified 
                      orally or in writing of the possibility of such damage.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
                    <p className="text-neutral-300 leading-relaxed">
                      These terms and conditions are governed by and construed in accordance with the 
                      laws of the jurisdiction in which QuantaFONS operates.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
                    <p className="text-neutral-300 leading-relaxed">
                      Questions about the Terms of Service should be sent to us at legal@quantafons.com.
                    </p>
                  </section>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Terms;