import { Link } from "wouter";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-accent font-bold">Quanta</span>FONS
            </h3>
            <p className="text-neutral-400 mb-6">
              Advancing infrastructure through materials science and AI-driven monitoring solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-accent transition-colors">
                <i className="ri-linkedin-box-fill text-xl"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-accent transition-colors">
                <i className="ri-twitter-fill text-xl"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-accent transition-colors">
                <i className="ri-youtube-fill text-xl"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-accent transition-colors">
                <i className="ri-github-fill text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Solutions</h4>
            <ul className="space-y-2">
              <li><Link href="/technologies" className="text-neutral-400 hover:text-accent transition-colors">PTFE Waterproofing</Link></li>
              <li><Link href="/technologies" className="text-neutral-400 hover:text-accent transition-colors">Nano-Enhanced Admixtures</Link></li>
              <li><Link href="/technologies" className="text-neutral-400 hover:text-accent transition-colors">Structural Health Monitoring</Link></li>
              <li><Link href="/products" className="text-neutral-400 hover:text-accent transition-colors">Predictive Analytics</Link></li>
              <li><Link href="/products" className="text-neutral-400 hover:text-accent transition-colors">Surface Treatments</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-neutral-400 hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="text-neutral-400 hover:text-accent transition-colors">Careers</Link></li>
              <li><Link href="/about" className="text-neutral-400 hover:text-accent transition-colors">Investors</Link></li>
              <li><Link href="/blog" className="text-neutral-400 hover:text-accent transition-colors">News & Research</Link></li>
              <li><Link href="/about" className="text-neutral-400 hover:text-accent transition-colors">Sustainability</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-neutral-400 hover:text-accent transition-colors">Technical Documentation</Link></li>
              <li><Link href="/blog" className="text-neutral-400 hover:text-accent transition-colors">Case Studies</Link></li>
              <li><Link href="/blog" className="text-neutral-400 hover:text-accent transition-colors">White Papers</Link></li>
              <li><Link href="/products" className="text-neutral-400 hover:text-accent transition-colors">Product Datasheets</Link></li>
              <li><Link href="/contact" className="text-neutral-400 hover:text-accent transition-colors">Support Center</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm">&copy; {currentYear} QuantaFONS Pvt Ltd. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="#" className="text-neutral-500 hover:text-accent text-sm transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-neutral-500 hover:text-accent text-sm transition-colors">Terms of Service</Link>
            <Link href="#" className="text-neutral-500 hover:text-accent text-sm transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
