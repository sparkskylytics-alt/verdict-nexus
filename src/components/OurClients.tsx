// import React from "react";

// const logos: string[] = [
//   "/Images/Clients/medipol.png",
//   "/Images/Clients/panhr.png",
//   "/Images/Clients/moat_electronics.jpg"

// ];

// const OurClients: React.FC = () => {
//   return (
//     <section className="py-12 bg-gradient-to-b from-white to-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">
//             Our Clients
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Working with industry leaders and innovative companies
//           </p>
//         </div>

//         {/* Compact infinite scroll container */}
//         <div className="relative w-full overflow-hidden py-6">
//           {/* Gradient fade edges */}
//           <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
//           <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
//           {/* Compact scrolling logos - single continuous line */}
//           <div className="flex animate-infinite-scroll-fast">
//             {[...logos, ...logos, ...logos, ...logos, ...logos, ...logos].map((logo, index) => (
//               <div
//                 key={index}
//                 className="group flex-shrink-0 mx-3 md:mx-5 lg:mx-6 px-2 md:px-3 py-2 hover:scale-105 transition-transform duration-300"
//               >
//                 <div className="w-28 h-16 md:w-36 md:h-20 lg:w-40 lg:h-24 flex items-center justify-center p-2  transition-all duration-300 ">
//                   <img
//                     src={logo}
//                     alt={`Client Logo ${index + 1}`}
//                     className="h-full w-full object-contain transition-all duration-300 group-hover:brightness-110 group-hover:scale-105"
//                     loading="lazy"
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Compact stats section */}
     
//       </div>
//     </section>
//   );
// };

// export default OurClients;

import { useInView } from '../hooks/useInView';
import { Client } from '../types';
import { useEffect, useRef, useState } from 'react';

const clients: Client[] = [
  { name: "Medipol", logo: "/Images/Clients/medipol.png" },
  { name: "Panhr", logo: "/Images/Clients/panhr.png" },
  { name: "Moat Electronics", logo: "/Images/Clients/moat_electronics.jpg" },
];

// Duplicate clients multiple times for seamless infinite scroll with just 3 clients
const duplicatedClients = [...clients, ...clients, ...clients, ...clients];

const OurClients = () => {
  const [ref, isInView] = useInView();
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationId: number;
    const scrollSpeed = 1; // Increased speed for better visibility

    const animate = () => {
      if (!scrollRef.current || isPaused) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      scrollRef.current.scrollLeft += scrollSpeed;

      // Reset scroll position when we've scrolled through one set of clients
      if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 4) {
        scrollRef.current.scrollLeft = 0;
      }

      animationId = requestAnimationFrame(animate);
    };

    if (isInView && !isPaused) {
      animationId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isInView, isPaused]);

  return (
    <section
      ref={ref}
      className="relative py-10 font-montserrat bg-white overflow-hidden"
    >
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
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
        
        /* Gradient fade on edges */
        .carousel-fade-left {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 80px;
          background: linear-gradient(to right, white, transparent);
          z-index: 10;
          pointer-events: none;
        }
        
        .carousel-fade-right {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 80px;
          background: linear-gradient(to left, white, transparent);
          z-index: 10;
          pointer-events: none;
        }
        
        /* Hide scrollbar */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2
            className="text-xl md:text-2xl font-semibold text-[#2F3336]"
            style={{
              animation: isInView
                ? "slideInLeft 0.6s ease-out both"
                : "none",
            }}
          >
            Trusted By Industry Leaders
          </h2>
          <p
            className="text-[#5C6F7A] text-sm mt-2"
            style={{
              animation: isInView
                ? "slideInRight 0.6s ease-out 0.1s both"
                : "none",
            }}
          >
            Partnerships built on trust & long-term success
          </p>
        </div>

        <div className="relative">
          {/* Fade effects on edges */}
          <div className="carousel-fade-left"></div>
          <div className="carousel-fade-right"></div>

          {/* Carousel container - single row */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide gap-8 py-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ cursor: isPaused ? 'default' : 'grab' }}
          >
            {duplicatedClients.map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="
                  group relative
                  flex-shrink-0
                  flex items-center justify-center
                  w-40 h-24
                  p-4
                  rounded-xl
                  bg-white
                  border border-gray-200
                  shadow-md
                  hover:shadow-lg
                  hover:-translate-y-1
                  transition-all duration-300
                "
                style={{
                  animation: isInView && index < 3
                    ? `scaleIn 0.5s ease-out ${0.2 + index * 0.1}s both`
                    : "none",
                }}
              >
                <div
                  className="
                    absolute inset-0 rounded-xl
                    border border-[#5C6F7A]/0
                    group-hover:border-[#5C6F7A]/30
                    transition
                  "
                />
                <img
                  src={client.logo}
                  alt={client.name}
                  className="
                    relative
                    max-h-10
                    object-contain
                    group-hover:scale-110
                    transition duration-300
                  "
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurClients;