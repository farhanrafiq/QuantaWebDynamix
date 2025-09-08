import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';

const Privacy: React.FC = () => {
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
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy Policy
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Privacy Policy
                </h1>
                <p className="text-xl text-neutral-300">
                  How we collect, use, and protect your information
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="prose prose-invert prose-lg max-w-none">
                <div className="space-y-8">
                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
                    <p className="text-neutral-300 leading-relaxed">
                      We collect information you provide directly to us, such as when you create an account, 
                      use our services, or contact us for support. This may include your name, email address, 
                      and any other information you choose to provide.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
                    <p className="text-neutral-300 leading-relaxed mb-4">
                      We use the information we collect to:
                    </p>
                    <ul className="list-disc list-inside text-neutral-300 space-y-2">
                      <li>Provide, maintain, and improve our services</li>
                      <li>Process transactions and send related information</li>
                      <li>Send you technical notices and support messages</li>
                      <li>Respond to your comments and questions</li>
                      <li>Monitor and analyze usage patterns</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Information Sharing</h2>
                    <p className="text-neutral-300 leading-relaxed">
                      We do not sell, trade, or otherwise transfer your personal information to third parties 
                      without your consent, except as described in this policy. We may share your information 
                      with trusted service providers who assist us in operating our services.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
                    <p className="text-neutral-300 leading-relaxed">
                      We implement appropriate security measures to protect your personal information against 
                      unauthorized access, alteration, disclosure, or destruction. However, no method of 
                      transmission over the internet is 100% secure.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                    <p className="text-neutral-300 leading-relaxed">
                      If you have any questions about this Privacy Policy, please contact us at 
                      privacy@quantafons.com or through our contact form.
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

export default Privacy;