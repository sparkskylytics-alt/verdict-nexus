// import React, { useState, useEffect } from 'react';
// import { Link as RouterLink } from "react-router-dom";
// import { Menu, X, Scale } from 'lucide-react';
// import { Link } from './ui/Link';
// import logo from '../../src/Images/image.png';

// const Navbar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 10) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navItems = [
//     { label: 'Home', href: '#home' },
//     { label: 'Practice Areas', href: '#practice-areas' },
//     { label: 'Our Team', href: '#our-team' },
//     { label: 'Contact', href: '#contact' },
//   ];

//   const privateLinks = [
//     { label: 'Orders', to: '/orders' },
//     { label: 'Judgment', to: '/judgment' },
//   ];

//   return (
//     <nav 
//       className={`fixed w-full z-50 transition-all duration-300 ${
//         isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
//       }`}
//     >
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center">
//             <img src={logo} alt="Scale Icon" className={`h-8 w-8 ${isScrolled ? 'filter invert' : ''}`} />
//             <span 
//               className={`ml-2 text-xl font-semibold ${
//                 isScrolled ? 'text-primary-700' : 'text-white'
//               }`}
//             >
//               Verdict Nexus
//             </span>
//           </div>
          
//           {/* Desktop Navigation */}
//           <div className="hidden md:flex space-x-8 items-center">
//             {navItems.map((item) => (
//               <Link 
//                 key={item.label}
//                 href={item.href}
//                 className={`font-medium transition-colors duration-200 ${
//                   isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-gold-400'
//                 }`}
//               >
//                 {item.label}
//               </Link>
//             ))}
            
//             {/* Private Links - Desktop */}
//             {privateLinks.map((link) => (
//               <RouterLink
//                 key={link.label}
//                 to={link.to}
//                 className={`font-medium transition-colors duration-200 ${
//                   isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-gold-400'
//                 }`}
//               >
//                 {link.label}
//               </RouterLink>
//             ))}
            
//             <Link 
//               href="#contact" 
//               className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
//                 isScrolled 
//                   ? 'bg-primary-600 text-white hover:bg-primary-700' 
//                   : 'bg-gold-500 text-primary-900 hover:bg-gold-600'
//               }`}
//             >
//               Free Consultation
//             </Link>
//           </div>
          
//           {/* Mobile menu button */}
//           <button
//             className="md:hidden focus:outline-none"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             {isOpen ? (
//               <X className={`h-6 w-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
//             ) : (
//               <Menu className={`h-6 w-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
//             )}
//           </button>
//         </div>
        
//         {/* Mobile Navigation */}
//         <div
//           className={`md:hidden ${
//             isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
//           } overflow-hidden transition-all duration-300 ease-in-out bg-white rounded-b-lg shadow-lg mt-2`}
//         >
//           <div className="px-4 py-5 space-y-4">
//             {/* Main Navigation Links */}
//             {navItems.map((item) => (
//               <Link
//                 key={item.label}
//                 href={item.href}
//                 className="block font-medium text-gray-700 hover:text-primary-600 py-2 border-b border-gray-100 last:border-b-0"
//                 onClick={() => setIsOpen(false)}
//               >
//                 {item.label}
//               </Link>
//             ))}
            
//             {/* Private Links - Mobile */}
//             <div className="pt-4 border-t border-gray-200">
//               <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
//                 Client Portal
//               </h3>
//               {privateLinks.map((link) => (
//                 <RouterLink
//                   key={link.label}
//                   to={link.to}
//                   className="block font-medium text-gray-700 hover:text-primary-600 py-2 border-b border-gray-100 last:border-b-0"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   <div className="flex items-center">
//                     <Scale className="w-4 h-4 mr-2 text-primary-500" />
//                     {link.label}
//                   </div>
//                 </RouterLink>
//               ))}
//             </div>
            
//             <Link
//               href="#contact"
//               className="block px-4 py-3 text-center rounded-md font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200 mt-4"
//               onClick={() => setIsOpen(false)}
//             >
//               Free Consultation
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../src/Images/image.png';
import { NavbarProps } from '../types';

const Navbar = ({ scrolled }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Height of fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handle navigation for different menu items
  const handleNavigation = (path: string, sectionId?: string) => {
    setIsMenuOpen(false);

    if (sectionId) {
      // For sections on home page (Services, Team, Contact)
      if (location.pathname !== '/') {
        // If not on home page, navigate to home first
        navigate('/');
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          scrollToSection(sectionId);
        }, 100);
      } else {
        // If already on home page, scroll directly
        scrollToSection(sectionId);
      }
    } else {
      // For standalone pages (Orders, Judgment)
      navigate(path);
    }
  };

  // Handle free consultation click
  const handleConsultationClick = () => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        scrollToSection('contact');
      }, 100);
    } else {
      scrollToSection('contact');
    }
  };

  // Function to check if a nav item is active (for text color only)
  const isItemActive = (item: { name: string; path: string; sectionId?: string }) => {
    // For standalone pages (Orders, Judgment)
    if (item.path !== '/' && location.pathname === item.path) {
      return true;
    }
    
    // For Home button - active when on home page
    if (item.name === "Home") {
      return location.pathname === '/';
    }
    
    // For section buttons (Services, Team, Contact) - active when on home page
    if (item.sectionId && location.pathname === '/') {
      return true;
    }
    
    return false;
  };

  // Navigation items
  const navItems = [
    { name: "Home", path: "/", sectionId: "home" },
    { name: "Services", path: "/", sectionId: "practice-areas" },
    { name: "Team", path: "/", sectionId: "team" },
    { name: "Orders", path: "/orders" },
    { name: "Judgment", path: "/judgment" },
    { name: "Contact", path: "/", sectionId: "contact" }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 font-montserrat 
      bg-[#2F3336] transition-all duration-300 z-50 
      ${scrolled ? "shadow-lg" : ""}`}
      style={{
        animation: 'slideDown 0.5s ease-out'
      }}
    >
      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideDownMenu {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="container font-montserrat mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo - Always goes to home */}
          <button 
            onClick={() => handleNavigation('/')}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded flex items-center justify-center overflow-hidden">
              <img
                src={logo}
                alt="Law Firm Logo"
                className="h-6 w-6 object-contain transition duration-300"
              />
            </div>
            <span className="text-xl font-semibold text-[#E8E2D6] tracking-wide">
              Verdict Nexus
            </span>
          </button>

          {/* Desktop Menu - No active lines */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item, index) => {
              const isActive = isItemActive(item);
              
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path, item.sectionId)}
                  className={`
                    text-sm font-medium transition-all duration-300
                    hover:scale-105
                    ${isActive 
                      ? 'text-[#E8E2D6]' 
                      : 'text-[#CFC7B8] hover:text-[#E8E2D6]'
                    }
                  `}
                  style={{
                    animation: `fadeInRight 0.5s ease-out ${index * 0.1}s both`
                  }}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={handleConsultationClick}
              className="bg-[#5C6F7A] text-[#E8E2D6] 
              px-5 py-2 rounded hover:bg-[#6F848F] 
              transition-all text-sm font-medium shadow-md
              hover:scale-105 active:scale-95
              transform transition-transform duration-200"
              style={{
                animation: 'fadeIn 0.6s ease-out 0.4s both'
              }}
            >
              Free Consultation
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#E8E2D6] hover:scale-110 transition-transform"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu - No background for active items */}
        {isMenuOpen && (
          <div
            className="md:hidden pb-4 space-y-2"
            style={{
              animation: 'slideDownMenu 0.3s ease-out'
            }}
          >
            {navItems.map((item) => {
              const isActive = isItemActive(item);
              
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path, item.sectionId)}
                  className={`
                    block w-full text-left py-2 px-2 transition-all duration-200
                    hover:pl-4
                    ${isActive 
                      ? 'text-[#E8E2D6]' 
                      : 'text-[#CFC7B8] hover:text-[#E8E2D6]'
                    }
                  `}
                >
                  {item.name}
                </button>
              );
            })}
            <button
              onClick={handleConsultationClick}
              className="mt-2 bg-[#5C6F7A] text-[#E8E2D6] 
              px-5 py-2 rounded w-full text-sm shadow-md
              hover:scale-[1.02] transition-transform"
            >
              Free Consultation
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;