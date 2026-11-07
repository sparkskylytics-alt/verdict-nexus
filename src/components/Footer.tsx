// import React from 'react';
// import { Scale, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
// import { Link } from './ui/Link';
// import logo from "../../src/Images/image.png"; // ✅ adjust path based on your file location


// const Footer: React.FC = () => {
//   const currentYear = new Date().getFullYear();
  
//   return (
//     <footer className="bg-primary-900 text-white pt-16 pb-6">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
//           <div className="space-y-4">
//            <div className="flex items-center">
//   <img 
//     src={logo} 
//     alt="Verdict Nexus Logo" 
//     className="h-8 w-auto object-contain"
//   />
//   <span className="ml-2 text-white text-xl font-semibold text-gray-900">
//     Verdict Nexus
//   </span>
// </div>
//             <p className="text-gray-300 leading-relaxed">
//               Providing comprehensive legal services with integrity and excellence since 2023. Our team of experienced advocates is dedicated to protecting your rights and interests.
//             </p>
//             <div className="flex space-x-4">
//               <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors duration-200">
//                 <Facebook className="h-5 w-5" />
//               </a>
//               <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors duration-200">
//                 <Twitter className="h-5 w-5" />
//               </a>
//               <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors duration-200">
//                 <Linkedin className="h-5 w-5" />
//               </a>
//               <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors duration-200">
//                 <Instagram className="h-5 w-5" />
//               </a>
//             </div>
//           </div>
          
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Practice Areas</h3>
//             <ul className="space-y-2">
//               {[
//                 'Civil Litigation',
//                 'Family Law',
//                 'Corporate Law',
//                 'Real Estate',
//                 'Criminal Defense',
//                 'Intellectual Property'
//               ].map((item, index) => (
//                 <li key={index}>
//                   <Link href="#practice-areas" className="text-gray-300 hover:text-gold-400 transition-colors duration-200">
//                     {item}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
          
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               {[
//                 { text: 'Home', href: '#home' },
//                 { text: 'About Us', href: '#about' },
//                 { text: 'Our Team', href: '#our-team' },
//                 { text: 'Testimonials', href: '#testimonials' },
//                 { text: 'FAQ', href: '#faq' },
//                 { text: 'Contact Us', href: '#contact' }
//               ].map((item, index) => (
//                 <li key={index}>
//                   <Link href={item.href} className="text-gray-300 hover:text-gold-400 transition-colors duration-200">
//                     {item.text}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
          
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
//             <ul className="space-y-3 text-gray-300">
//               <li>S-211, Gayatri Life Suites, Greater Noida West, Sector-1, 201302</li>
//               <li>Phone: +919310654386</li>
//               <li>Email: advocatekhojshashi@gmail.com</li>
//               <li>Hours: Mon-Fri 9:00 AM - 6:00 PM</li>
//             </ul>
//           </div>
//         </div>
        
//         <div className="border-t border-gray-700 pt-6">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <p className="text-gray-400 text-sm">
//               &copy; {currentYear} Verdict Nexus. All rights reserved.
//             </p>
//             <div className="flex space-x-6 mt-4 md:mt-0">
//               <Link href="#" className="text-gray-400 text-sm hover:text-gray-300 transition-colors duration-200">
//                 Privacy Policy
//               </Link>
//               <Link href="#" className="text-gray-400 text-sm hover:text-gray-300 transition-colors duration-200">
//                 Terms of Service
//               </Link>
//               <Link href="#" className="text-gray-400 text-sm hover:text-gray-300 transition-colors duration-200">
//                 Disclaimer
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useSiteContent } from '../content/SiteContent';

const Footer = () => {
  const { siteSettings: ss, landingLinks } = useSiteContent();
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
      // For standalone pages (if any in future)
      navigate(path);
    }
  };

  return (
    <footer className="relative font-montserrat text-white overflow-hidden bg-[#2F3336]">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      <div className="relative container mx-auto px-4 py-14">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div
            style={{
              animation: 'fadeInUp 0.6s ease-out both'
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center">
                <img 
                  src={ss.footerLogo} 
                  alt={`${ss.siteName} Logo`} 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-lg font-semibold">
                {ss.siteName}
              </span>
            </div>
            <p className="text-[#CFC7B8] text-sm leading-relaxed">
              {ss.footerAbout}
            </p>
          </div>

          {/* Quick Links - Now with proper navigation */}
          <div
            style={{
              animation: 'fadeInUp 0.6s ease-out 0.1s both'
            }}
          >
            <h3 className="font-semibold mb-4 text-sm">
              {ss.footerQuickLinksTitle}
            </h3>
            <ul className="space-y-2 text-sm">
              {ss.navItems.map((item, index) => (
                <li
                  key={item.label}
                  style={{
                    animation: `fadeInRight 0.4s ease-out ${0.2 + index * 0.1}s both`
                  }}
                >
                  <button
                    onClick={() => handleNavigation('/', item.sectionId)}
                    className="
                      text-[#CFC7B8]
                      hover:text-white
                      transition-all duration-300
                      hover:pl-2 block w-full text-left
                    "
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas */}
          <div
            style={{
              animation: 'fadeInUp 0.6s ease-out 0.2s both'
            }}
          >
            <h3 className="font-semibold mb-4 text-sm">
              {ss.footerPracticeTitle}
            </h3>
            <ul className="space-y-2 text-sm">
              {ss.footerPracticeAreas.map((area, index) => (
                <li
                  key={area}
                  style={{
                    animation: `fadeInRight 0.4s ease-out ${0.3 + index * 0.1}s both`
                  }}
                >
                  <button
                    onClick={() => {
                      if (location.pathname !== '/') {
                        navigate('/');
                        setTimeout(() => {
                          scrollToSection('practice-areas');
                        }, 100);
                      } else {
                        scrollToSection('practice-areas');
                      }
                    }}
                    className="
                      text-[#CFC7B8]
                      hover:text-white
                      transition-all duration-300
                      hover:pl-2 block w-full text-left
                    "
                  >
                    {area}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div
            style={{
              animation: 'fadeInUp 0.6s ease-out 0.3s both'
            }}
          >
            <h3 className="font-semibold mb-4 text-sm">
              {ss.newsletterTitle}
            </h3>
            <p className="text-[#CFC7B8] text-sm mb-4">
              {ss.newsletterText}
            </p>
            <div
              className="flex"
              style={{
                animation: 'scaleIn 0.5s ease-out 0.4s both'
              }}
            >
              <input
                type="email"
                placeholder={ss.newsletterPlaceholder}
                className="
                  flex-grow
                  p-3
                  text-sm
                  bg-white/10
                  border border-white/20
                  rounded-l
                  placeholder-gray-300
                  focus:outline-none focus:bg-white/20
                  transition-all duration-300
                "
              />
              <button
                className="
                  bg-[#5C6F7A]
                  hover:bg-[#6F848F]
                  px-4
                  rounded-r
                  text-sm
                  transition-all duration-300
                  hover:scale-110
                "
              >
                →
              </button>
            </div>
          </div>
          {/* Service / city pages */}
          {landingLinks.length > 0 && (
            <div className="md:col-span-4">
              <h3 className="font-semibold mb-3 text-sm">Areas of Practice by Location</h3>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-2 text-sm">
                {landingLinks.map((l) => (
                  <li key={l.slug}>
                    <Link to={`/${l.slug}`} className="text-[#CFC7B8] hover:text-white transition-colors">
                      {l.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div
          className="
            border-t border-white/10
            mt-10 pt-6
            flex flex-col md:flex-row
            justify-between
            items-center
            gap-3
            text-sm text-[#CFC7B8]
          "
          style={{
            animation: 'fadeInUp 0.6s ease-out 0.5s both'
          }}
        >
          <p>
            © {new Date().getFullYear()} {ss.copyrightText}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => handleNavigation('/', 'privacy')}
              className="hover:text-white transition hover:scale-105"
            >
              {ss.privacyLabel}
            </button>
            <button 
              onClick={() => handleNavigation('/', 'terms')}
              className="hover:text-white transition hover:scale-105"
            >
              {ss.termsLabel}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;