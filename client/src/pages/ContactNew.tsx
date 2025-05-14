import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { ArrowRight, Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle } from "lucide-react";

// Map component for contact page
const ContactMap = () => {
  return (
    <div className="w-full h-full min-h-[300px] bg-[#15171B] rounded-xl overflow-hidden relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full bg-[#0D0F12] relative">
          {/* Simple vector map illustration */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 800 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-40"
          >
            <path
              d="M100,100 L700,100 L700,500 L100,500 Z"
              stroke="#0099FF"
              strokeWidth="2"
              strokeDasharray="10 5"
              fill="none"
            />
            <path
              d="M200,200 L300,180 L400,220 L500,200 L600,250"
              stroke="#0099FF"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M200,300 L300,350 L400,320 L500,370 L600,340"
              stroke="#0099FF"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M200,400 L300,380 L400,420 L500,380 L600,430"
              stroke="#0099FF"
              strokeWidth="3"
              fill="none"
            />
            <circle cx="400" cy="300" r="20" fill="#0099FF" fillOpacity="0.3" stroke="#0099FF" strokeWidth="2" />
            <circle cx="400" cy="300" r="5" fill="#0099FF" />
          </svg>
          
          {/* Location pin */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-electric-blue flex flex-col items-center">
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <MapPin size={36} />
            </motion.div>
            <div className="mt-2 bg-[#0D0F12]/90 px-3 py-1 rounded-full text-sm font-medium">
              QuantaFONS HQ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Info card component
const InfoCard = ({ icon, title, content }: { icon: React.ReactNode; title: string; content: React.ReactNode }) => {
  return (
    <motion.div
      className="bg-[#15171B] p-6 rounded-xl border border-electric-blue/10 hover:border-electric-blue/30 transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex gap-4">
        <div className="p-2 bg-electric-blue/10 rounded-lg text-electric-blue h-10 w-10 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-white font-bold mb-1">{title}</h3>
          <div className="text-neutral-400">{content}</div>
        </div>
      </div>
    </motion.div>
  );
};

// Form input component
const FormInput = ({
  label,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  error,
  required = false,
  textarea = false,
}: {
  label: string;
  type?: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  textarea?: boolean;
}) => {
  return (
    <div className="mb-4">
      <label className="block text-white text-sm font-medium mb-2">
        {label} {required && <span className="text-electric-blue">*</span>}
      </label>
      {textarea ? (
        <textarea
          className={`w-full bg-[#0D0F12] border ${
            error ? "border-red-500" : "border-electric-blue/20"
          } rounded-lg p-3 text-white focus:outline-none focus:border-electric-blue transition-colors duration-200 min-h-32`}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        />
      ) : (
        <input
          type={type}
          className={`w-full bg-[#0D0F12] border ${
            error ? "border-red-500" : "border-electric-blue/20"
          } rounded-lg p-3 text-white focus:outline-none focus:border-electric-blue transition-colors duration-200`}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

// Main Contact component
const Contact = () => {
  // Form state
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // Form errors state
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      message: "",
    };
    let isValid = true;

    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Successful submission
      setSubmitStatus("success");
      // Reset form after successful submission
      setFormState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0D0F12] min-h-screen">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 right-0 w-96 h-96 bg-electric-blue/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-magenta/5 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Get in <span className="text-electric-blue">Touch</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-neutral-300 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Have a question or want to discuss a potential collaboration? Our team is here to help. 
              Reach out to us using the form below or through our contact details.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Contact Details Section */}
      <section className="py-10 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <InfoCard
              icon={<MapPin className="h-5 w-5" />}
              title="Address"
              content={
                <p>
                  742, 7th Floor, Emaar Digital Greens<br />
                  Sector 61, Gurugram, India
                </p>
              }
            />
            
            <InfoCard
              icon={<Phone className="h-5 w-5" />}
              title="Phone"
              content={
                <a href="tel:+911234567890" className="text-electric-blue hover:underline">
                  +91 123 456 7890
                </a>
              }
            />
            
            <InfoCard
              icon={<Mail className="h-5 w-5" />}
              title="Email"
              content={
                <a href="mailto:info@quantafons.com" className="text-electric-blue hover:underline">
                  info@quantafons.com
                </a>
              }
            />
            
            <InfoCard
              icon={<Clock className="h-5 w-5" />}
              title="Business Hours"
              content={
                <p>
                  Monday - Friday<br />
                  9:00 AM - 6:00 PM IST
                </p>
              }
            />
          </div>
        </div>
      </section>
      
      {/* Contact Form and Map Section */}
      <section className="py-16 bg-[#0A0C10]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-white mb-6 relative inline-block">
                  Send Us a Message
                  <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-electric-blue"></span>
                </h2>
                <p className="text-neutral-400 mb-8">
                  Fill out the form below and our team will get back to you as soon as possible.
                </p>
                
                {submitStatus === "success" ? (
                  <motion.div
                    className="bg-green-900/20 border border-green-500/30 p-6 rounded-lg text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Message Sent Successfully!</h3>
                    <p className="text-neutral-300">
                      Thank you for reaching out. We'll get back to you shortly.
                    </p>
                    <Button
                      className="bg-electric-blue hover:bg-electric-blue/80 text-white mt-6"
                      onClick={() => setSubmitStatus("idle")}
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : submitStatus === "error" ? (
                  <motion.div
                    className="bg-red-900/20 border border-red-500/30 p-6 rounded-lg text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Message Could Not Be Sent</h3>
                    <p className="text-neutral-300">
                      There was a problem sending your message. Please try again later.
                    </p>
                    <Button
                      className="bg-electric-blue hover:bg-electric-blue/80 text-white mt-6"
                      onClick={() => setSubmitStatus("idle")}
                    >
                      Try Again
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput
                        label="Full Name"
                        placeholder="Your full name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        error={errors.name}
                        required
                      />
                      
                      <FormInput
                        label="Email"
                        type="email"
                        placeholder="Your email address"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        error={errors.email}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput
                        label="Phone"
                        placeholder="Your phone number (optional)"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                      />
                      
                      <FormInput
                        label="Subject"
                        placeholder="What's this about?"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <FormInput
                      label="Message"
                      placeholder="Your message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      error={errors.message}
                      required
                      textarea
                    />
                    
                    <Button
                      type="submit"
                      className="bg-electric-blue hover:bg-electric-blue/80 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </motion.div>
              
              {/* Map */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="h-full"
              >
                <h2 className="text-3xl font-bold text-white mb-6 relative inline-block">
                  Our Location
                  <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-electric-blue"></span>
                </h2>
                <p className="text-neutral-400 mb-8">
                  Visit our headquarters located in the heart of Gurugram's tech district.
                </p>
                
                <div className="h-[400px] lg:h-[calc(100%-132px)]">
                  <ContactMap />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-electric-blue/20 to-magenta/20 relative">
        <div className="absolute inset-0 bg-[#0D0F12] opacity-90"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Join Our Newsletter
            </motion.h2>
            
            <motion.p 
              className="text-lg text-neutral-300 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Stay updated with our latest research, innovations, and industry insights by subscribing to our newsletter.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="max-w-md mx-auto"
            >
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-[#0A0C10] border border-electric-blue/20 rounded-lg p-3 text-white focus:outline-none focus:border-electric-blue transition-colors duration-200"
                  required
                />
                <Button className="bg-electric-blue hover:bg-electric-blue/80 text-white whitespace-nowrap">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
              <p className="text-sm text-neutral-500 mt-4">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from QuantaFONS.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Footer is handled by the RootLayout component */}
    </div>
  );
};

export default Contact;