import React from 'react';
import { Scale, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link } from './ui/Link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary-900 text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center">
              <Scale className="h-8 w-8 text-gold-400" />
              <span className="ml-2 text-xl font-semibold">JusLok</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Providing comprehensive legal services with integrity and excellence since 2005. Our team of experienced advocates is dedicated to protecting your rights and interests.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Practice Areas</h3>
            <ul className="space-y-2">
              {[
                'Civil Litigation',
                'Family Law',
                'Corporate Law',
                'Real Estate',
                'Criminal Defense',
                'Intellectual Property'
              ].map((item, index) => (
                <li key={index}>
                  <Link href="#practice-areas" className="text-gray-300 hover:text-gold-400 transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { text: 'Home', href: '#home' },
                { text: 'About Us', href: '#about' },
                { text: 'Our Team', href: '#our-team' },
                { text: 'Testimonials', href: '#testimonials' },
                { text: 'FAQ', href: '#faq' },
                { text: 'Contact Us', href: '#contact' }
              ].map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-gray-300 hover:text-gold-400 transition-colors duration-200">
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-gray-300">
              <li>S-211, Gayatri Life Suites, Greater Noida West, Sector-1, 201302</li>
              <li>Phone: +919310654386</li>
              <li>Email: info@juslok.in</li>
              <li>Hours: Mon-Fri 9:00 AM - 6:00 PM</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} JusLok. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 text-sm hover:text-gray-300 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 text-sm hover:text-gray-300 transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 text-sm hover:text-gray-300 transition-colors duration-200">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;