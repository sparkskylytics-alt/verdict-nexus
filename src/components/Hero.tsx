// import React from 'react';
// import { Link } from './ui/Link';

// const Hero: React.FC = () => {
//   return (
//     <section id="home" className="relative h-screen bg-gradient-to-r from-primary-900 to-primary-800 text-white">
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute inset-0 bg-black opacity-50"></div>
//         <div 
//           className="absolute inset-0 bg-cover bg-center"
//           style={{ 
//             backgroundImage: "url('https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
//             backgroundBlendMode: "overlay",
//             opacity: 0.6
//           }}
//         ></div>
//       </div>
      
//       <div className="relative h-full flex items-center">
//         <div className="container mx-auto px-4 md:px-8">
//           <div className="max-w-3xl mx-auto md:mx-0">
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6 animate-fade-in">
//               Expert Legal Solutions for <span className="text-gold-400">Every Indian</span>
//             </h1>
//             <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl leading-relaxed">
//               We provide comprehensive legal services tailored to protect your rights and interests. 
//               Our team of experienced advocates is dedicated to delivering justice with integrity and excellence.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4">
//               <Link 
//                 href="#contact" 
//                 className="px-6 py-3 bg-gold-500 text-primary-900 rounded-md font-semibold text-center hover:bg-gold-600 transition-colors duration-300 transform hover:scale-105"
//               >
//                 Free Case Evaluation
//               </Link>
//               <Link 
//                 href="#practice-areas" 
//                 className="px-6 py-3 bg-white bg-opacity-10 text-white rounded-md font-semibold text-center hover:bg-opacity-20 backdrop-blur-sm transition-colors duration-300"
//               >
//                 Explore Our Services
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-8">
//         <Link href="#practice-areas" className="text-white animate-bounce">
//           <svg 
//             xmlns="http://www.w3.org/2000/svg" 
//             className="h-8 w-8" 
//             fill="none" 
//             viewBox="0 0 24 24" 
//             stroke="currentColor"
//           >
//             <path 
//               strokeLinecap="round" 
//               strokeLinejoin="round" 
//               strokeWidth={2} 
//               d="M19 14l-7 7m0 0l-7-7m7 7V3" 
//             />
//           </svg>
//         </Link>
//       </div>
//     </section>
//   );
// };

// export default Hero;

import { useInView } from '../hooks/useInView';

const Hero = () => {
  const [ref, isInView] = useInView();

  return (
    <section
      ref={ref}
      className="relative pt-24 font-montserrat pb-20 overflow-hidden text-white"
    >
      <style jsx>{`
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
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>

      <div className="absolute inset-0 
        bg-gradient-to-br 
        from-[#0F172A] 
        via-[#1E293B] 
        to-[#020617]" />

      <div className="absolute inset-0 
        bg-[radial-gradient(circle_at_30%_40%,rgba(92,111,122,0.35),transparent_45%)]" />

      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] 
        bg-[#5C6F7A]/30 blur-3xl rounded-full"
        style={{
          animation: 'float 6s ease-in-out infinite'
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 h-60 
        bg-gradient-to-t from-black/40 to-transparent" />

      <div className="absolute inset-0 opacity-[0.05] 
        bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] 
        bg-[size:40px_40px]" />

      <div className="relative container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div
              className="w-16 h-[2px] bg-[#CFC7B8] mb-6"
              style={{
                animation: isInView ? 'fadeInRight 0.8s ease-out 0.2s both' : 'none',
                transformOrigin: 'left'
              }}
            ></div>
            <h1
              className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-6"
              style={{
                animation: isInView ? 'fadeInUp 0.8s ease-out 0.3s both' : 'none'
              }}
            >
              Professional Legal Services
              <br />
              You Can Trust
            </h1>
            <p
              className="text-gray-300 text-base mb-8 max-w-xl"
              style={{
                animation: isInView ? 'fadeInUp 0.8s ease-out 0.4s both' : 'none'
              }}
            >
            We provide expert legal counsel for individuals and businesses, offering reliable guidance, strategic solutions, and strong representation. Our commitment is to protect your interests, resolve complex matters efficiently, and deliver results you can trust.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4"
              style={{
                animation: isInView ? 'fadeInUp 0.8s ease-out 0.5s both' : 'none'
              }}
            >
              {/* <button className="bg-[#5C6F7A] hover:bg-[#6F848F] 
                px-7 py-3 rounded shadow-xl text-sm font-medium 
                transition-all duration-300 hover:scale-105 active:scale-95
                hover:shadow-2xl">
                Schedule Consultation
              </button>
              <button className="border border-white/40 
                px-7 py-3 rounded text-sm hover:bg-white/10 
                transition-all duration-300 hover:scale-105 active:scale-95">
                View Services
              </button> */}
            </div>
          </div>

          <div className="lg:w-1/2 w-full relative">
            <div
              className="h-80 rounded-xl shadow-2xl border border-white/10 bg-cover bg-center relative overflow-hidden"
              style={{
                backgroundImage:
                  "url('https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
                animation: isInView ? 'fadeInUp 0.8s ease-out 0.6s both' : 'none'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            </div>

            <div
              className="absolute -bottom-6 left-8 
              bg-[#E8E2D6] text-[#2F3336] 
              px-6 py-3 rounded-lg shadow-xl
              hover:scale-105 transition-transform duration-300"
              style={{
                animation: isInView ? 'fadeInUp 0.8s ease-out 0.7s both' : 'none'
              }}
            >
              <div className="font-bold text-sm">
                Award Winning
              </div>
              <div className="text-xs">
                Legal Excellence
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;