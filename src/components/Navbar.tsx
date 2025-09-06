import React, { useState, useEffect } from 'react';
import { Menu, X, Scale } from 'lucide-react';
import { Link } from './ui/Link';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Scale 
              className={`h-8 w-8 ${isScrolled ? 'text-primary-700' : 'text-white'}`} 
            />
            <span 
              className={`ml-2 text-xl font-semibold ${
                isScrolled ? 'text-primary-700' : 'text-white'
              }`}
            >
              JusLok
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {['Home', 'Practice Areas', 'Our Team', 'Resources', 'Contact'].map((item) => (
              <Link 
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className={`font-medium transition-colors duration-200 ${
                  isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-gold-400'
                }`}
              >
                {item}
              </Link>
            ))}
            <Link 
              href="#contact" 
              className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                isScrolled 
                  ? 'bg-primary-600 text-white hover:bg-primary-700' 
                  : 'bg-gold-500 text-primary-900 hover:bg-gold-600'
              }`}
            >
              Free Consultation
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
            )}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <div
          className={`md:hidden ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden transition-all duration-300 ease-in-out bg-white rounded-b-lg shadow-lg mt-2`}
        >
          <div className="px-4 py-5 space-y-4">
            {['Home', 'Practice Areas', 'Our Team', 'Resources', 'Contact'].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="block font-medium text-gray-700 hover:text-primary-600"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Link
              href="#contact"
              className="block px-4 py-2 text-center rounded-md font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;