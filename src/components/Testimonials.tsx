// import React, { useState } from 'react';
// import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
// import SectionTitle from './ui/SectionTitle';

// interface TestimonialProps {
//   quote: string;
//   author: string;
//   role: string;
//   rating: number;
// }

// const Testimonial: React.FC<TestimonialProps> = ({ quote, author, role, rating }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-8 flex flex-col h-full">
//       <div className="flex mb-4">
//         {[...Array(5)].map((_, i) => (
//           <Star 
//             key={i} 
//             className={`w-5 h-5 ${i < rating ? 'text-gold-500 fill-gold-500' : 'text-gray-300'}`} 
//           />
//         ))}
//       </div>
//       <blockquote className="text-gray-700 flex-grow mb-6 italic">
//         "{quote}"
//       </blockquote>
//       <div>
//         <p className="font-semibold text-gray-800">{author}</p>
//         <p className="text-sm text-gray-600">{role}</p>
//       </div>
//     </div>
//   );
// };

// const Testimonials: React.FC = () => {
//   const [activeSlide, setActiveSlide] = useState(0);
  
//   const testimonials = [
//     {
//       quote: "JusticeLaw helped me navigate a complex property dispute with expertise and empathy. Their team was always available to answer my questions and guide me through the legal process.",
//       author: "Anil Kumar",
//       role: "Business Owner, New Delhi",
//       rating: 5
//     },
//     {
//       quote: "I was facing serious charges and the team at JusticeLaw provided an excellent defense strategy. Their knowledge of criminal law and court procedures was instrumental in getting my case resolved favorably.",
//       author: "Sanjay Mehta",
//       role: "IT Professional, Bangalore",
//       rating: 5
//     },
//     {
//       quote: "During my divorce proceedings, the advocates at JusticeLaw were compassionate and professional. They ensured my rights were protected while prioritizing an amicable resolution.",
//       author: "Neha Sharma",
//       role: "Teacher, Mumbai",
//       rating: 4
//     },
//     {
//       quote: "Their corporate law expertise helped our startup navigate complex regulatory requirements. The team provided clear guidance and practical solutions tailored to our business needs.",
//       author: "Rahul Patel",
//       role: "Startup Founder, Hyderabad",
//       rating: 5
//     },
//     {
//       quote: "I was involved in a serious accident and JusticeLaw helped me secure fair compensation. Their dedication to my case and attention to detail made a difficult time much easier.",
//       author: "Priya Singh",
//       role: "Accountant, Chennai",
//       rating: 5
//     },
//     {
//       quote: "The intellectual property team at JusticeLaw protected our patents efficiently. Their strategic approach and industry knowledge provided us with a strong competitive advantage.",
//       author: "Vikram Reddy",
//       role: "Engineering Director, Pune",
//       rating: 4
//     }
//   ];

//   const totalSlides = Math.ceil(testimonials.length / 3);
  
//   const nextSlide = () => {
//     setActiveSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
//   };
  
//   const prevSlide = () => {
//     setActiveSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
//   };

//   const visibleTestimonials = testimonials.slice(
//     activeSlide * 3,
//     Math.min((activeSlide + 1) * 3, testimonials.length)
//   );

//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <SectionTitle 
//           title="Client Success Stories" 
//           subtitle="Hear from those we've helped navigate complex legal challenges"
//         />
        
//         <div className="mt-12">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {visibleTestimonials.map((testimonial, index) => (
//               <Testimonial 
//                 key={index}
//                 quote={testimonial.quote}
//                 author={testimonial.author}
//                 role={testimonial.role}
//                 rating={testimonial.rating}
//               />
//             ))}
//           </div>
          
//           {totalSlides > 1 && (
//             <div className="flex justify-center items-center mt-10 space-x-4">
//               <button 
//                 onClick={prevSlide}
//                 className="p-2 rounded-full bg-white shadow-md text-gray-700 hover:bg-primary-50 transition-colors duration-200"
//               >
//                 <ChevronLeft className="w-6 h-6" />
//               </button>
//               <div className="flex space-x-2">
//                 {[...Array(totalSlides)].map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setActiveSlide(index)}
//                     className={`w-3 h-3 rounded-full transition-colors duration-200 ${
//                       activeSlide === index ? 'bg-primary-600' : 'bg-gray-300'
//                     }`}
//                   />
//                 ))}
//               </div>
//               <button 
//                 onClick={nextSlide}
//                 className="p-2 rounded-full bg-white shadow-md text-gray-700 hover:bg-primary-50 transition-colors duration-200"
//               >
//                 <ChevronRight className="w-6 h-6" />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonials;

import { useInView } from '../hooks/useInView';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    name: "David Miller",
    role: "CEO, TechCorp",
    content: "Exceptional legal representation during our merger process.",
    rating: 5,
    image: "/clients/david.jpg",
  },
  {
    name: "Jennifer Wilson",
    role: "Business Owner",
    content: "Professional service and excellent results in my contract dispute.",
    rating: 5,
    image: "/clients/jennifer.jpg",
  },
  {
    name: "Thomas Reed",
    role: "Real Estate Developer",
    content: "They navigated complex zoning laws flawlessly. Highly recommended.",
    rating: 5,
    image: "/clients/thomas.jpg",
  },
];

const Testimonials = () => {
  const [ref, isInView] = useInView();

  return (
    <section ref={ref} className="relative py-14 font-montserrat overflow-hidden bg-white">
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
        @keyframes floatCard {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>

      <div className="absolute inset-0 opacity-[0.04] 
        bg-[url('https://www.transparenttextures.com/patterns/paper.png')]" />

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-2xl font-semibold text-[#2F3336]">
            Client Testimonials
          </h2>
          <p className="text-[#5C6F7A] text-xs mt-2">
            Trusted feedback from our valued clients
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="
                relative
                bg-white
                border border-gray-200
                rounded-lg
                p-5
                shadow-sm
                hover:shadow-lg
                hover:-translate-y-1
                transition-all duration-300
              "
              style={{
                animation: isInView ? `floatCard 0.6s ease-out ${0.2 + index * 0.2}s both, fadeInUp 0.6s ease-out ${0.2 + index * 0.2}s both` : 'none'
              }}
            >
              <div className="
                absolute top-3 right-4
                text-5xl text-[#5C6F7A]/10
                font-serif
              ">
                "
              </div>

              <div className="flex mb-3 text-[#F59E0B] text-sm">
                {[...Array(t.rating)].map((_, i) => (
                  <span
                    key={i}
                    style={{
                      animation: isInView ? `scaleIn 0.3s ease-out ${0.3 + i * 0.1}s both` : 'none'
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className="text-gray-700 text-sm italic mb-5 leading-relaxed">
                "{t.content}"
              </p>

              <div className="flex items-center gap-3">
                <img
                  src={t.image}
                  alt={t.name}
                  className="
                    w-9 h-9
                    rounded-full
                    object-cover
                    border border-gray-200
                    hover:scale-110
                    transition-transform duration-300
                  "
                />
                <div>
                  <div className="text-sm font-medium text-[#2F3336]">
                    {t.name}
                  </div>
                  <div className="text-[11px] text-[#5C6F7A]">
                    {t.role}
                  </div>
                </div>
              </div>

              <div className="
                absolute bottom-0 left-0 right-0
                h-[2px]
                bg-gradient-to-r
                from-[#5C6F7A]
                to-[#2F3336]
              " />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;