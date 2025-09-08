import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MapPin, Phone, Mail, Linkedin, Twitter, Youtube, Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Form schema with validation
const contactFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  company: z.string().optional(),
  inquiryType: z.string().min(1, { message: "Please select an inquiry type" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  privacyPolicy: z.boolean().refine(val => val === true, {
    message: "You must agree to the privacy policy",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Initialize form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      inquiryType: "",
      message: "",
      privacyPolicy: false,
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    setFormSubmitting(true);
    
    // Simulate API request with timeout
    setTimeout(() => {
      console.log("Form submitted:", data);
      setFormSubmitting(false);
      
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon!",
      });
      
      form.reset();
    }, 1000);
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const fadeInRight = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const fadeInLeft = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Contact <span className="text-primary dark:text-accent">Us</span>
          </motion.h2>
          <motion.p 
            className="mt-4 max-w-3xl mx-auto text-lg text-neutral-700 dark:text-neutral-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Have questions about our technologies or interested in a partnership? Get in touch with our team.
          </motion.p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
            className="h-full"
          >
            <div className="bg-white dark:bg-neutral-700 rounded-lg shadow-xl p-8 h-full">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">Send Us a Message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Company" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="inquiryType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Inquiry Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Please select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="product">Product Information</SelectItem>
                            <SelectItem value="technical">Technical Support</SelectItem>
                            <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                            <SelectItem value="career">Career Information</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="How can we help you?" rows={4} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="privacyPolicy"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox 
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the <a href="#" className="text-primary dark:text-accent hover:underline">privacy policy</a>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={formSubmitting}>
                    {formSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>

          <motion.div 
            className="mt-12 lg:mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInLeft}
          >
            <div className="bg-white dark:bg-neutral-700 rounded-lg shadow-xl p-8 h-full">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">Contact Information</h3>
              
              <div className="space-y-8">
                <div className="flex">
                  <div className="flex-shrink-0 text-primary dark:text-accent">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-neutral-900 dark:text-white">Headquarters</h4>
                    <p className="mt-1 text-neutral-700 dark:text-neutral-300">
                      Red Cross Road, Maisuma<br />
                      Srinagar, Kashmir, 190008<br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 text-primary dark:text-accent">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-neutral-900 dark:text-white">Phone</h4>
                    <p className="mt-1 text-neutral-700 dark:text-neutral-300">
                      +919796000522<br />
                      Monday - Friday, 9am - 6pm IST
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 text-primary dark:text-accent">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-neutral-900 dark:text-white">Email</h4>
                    <p className="mt-1 text-neutral-700 dark:text-neutral-300">
                      info@quantafons.com<br />
                      support@quantafons.com
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Connect With Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-accent transition-colors">
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-accent transition-colors">
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-accent transition-colors">
                    <Youtube className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-accent transition-colors">
                    <Github className="h-6 w-6" />
                  </a>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Office Location</h4>
                <div className="rounded-lg overflow-hidden h-64 bg-neutral-200 dark:bg-neutral-600 flex items-center justify-center">
                  {/* Google Map would be embedded here */}
                  <span className="text-neutral-700 dark:text-neutral-300">Interactive Map Loading...</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
