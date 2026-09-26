// import React, { useState } from 'react';
// import { ChevronDown, ChevronUp } from 'lucide-react';
// import SectionTitle from './ui/SectionTitle';

// interface FAQItemProps {
//   question: string;
//   answer: string;
//   isOpen: boolean;
//   onClick: () => void;
// }

// const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
//   return (
//     <div className="border-b border-gray-200 py-5">
//       <button
//         className="flex justify-between items-center w-full text-left font-semibold text-gray-800 focus:outline-none"
//         onClick={onClick}
//       >
//         <span>{question}</span>
//         {isOpen ? (
//           <ChevronUp className="w-5 h-5 text-primary-600" />
//         ) : (
//           <ChevronDown className="w-5 h-5 text-gray-500" />
//         )}
//       </button>
//       <div 
//         className={`mt-2 text-gray-600 overflow-hidden transition-all duration-300 ${
//           isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
//         }`}
//       >
//         <p className="py-2">{answer}</p>
//       </div>
//     </div>
//   );
// };

// const FAQ: React.FC = () => {
//   const [openIndex, setOpenIndex] = useState<number | null>(0);

//   const faqs = [
//     {
//       question: "What areas of law does your firm specialize in?",
//       answer: "Our firm specializes in various areas including civil litigation, family law, corporate law, real estate, criminal defense, intellectual property, constitutional law, and legal documentation. Our team of advocates has extensive experience in these practice areas across Indian courts."
//     },
//     {
//       question: "How do I know if I need a lawyer?",
//       answer: "You may need a lawyer if you're facing legal issues such as property disputes, family matters, criminal charges, business-related legal challenges, or need legal documentation. We offer free initial consultations to help you determine if you need legal representation."
//     },
//     {
//       question: "What should I bring to my first meeting with a lawyer?",
//       answer: "For your first meeting, bring any documents related to your case such as contracts, correspondence, court papers, police reports, medical records (if relevant), and a written timeline of events. This helps us understand your situation thoroughly and provide effective legal advice."
//     },
//     {
//       question: "How much will my case cost?",
//       answer: "Legal costs vary depending on the complexity of your case, the time required, and the nature of legal services needed. During our initial consultation, we'll discuss fee structures, which may include hourly rates, flat fees for specific services, or contingency arrangements in certain cases. We strive to provide transparent billing and payment options."
//     },
//     {
//       question: "How long will my case take to resolve?",
//       answer: "The duration varies significantly based on the type of case, its complexity, the court's schedule, and whether settlement is possible. Some matters can be resolved in weeks, while others may take months or even years. We'll provide a realistic timeline estimate based on your specific situation during consultation."
//     },
//     {
//       question: "Can I represent myself instead of hiring a lawyer?",
//       answer: "While self-representation (appearing 'in-person') is permitted in Indian courts, it's generally not recommended for complex matters. The legal system involves intricate procedures, substantive law knowledge, and courtroom protocols that legal professionals are trained to navigate. A qualified advocate can significantly improve your chances of a favorable outcome."
//     }
//   ];

//   const toggleFAQ = (index: number) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <section id="faq" className="py-20 bg-white">
//       <div className="container mx-auto px-4">
//         <SectionTitle 
//           title="Frequently Asked Questions" 
//           subtitle="Find answers to common legal questions our clients ask"
//         />
        
//         <div className="max-w-3xl mx-auto mt-12">
//           {faqs.map((faq, index) => (
//             <FAQItem 
//               key={index}
//               question={faq.question}
//               answer={faq.answer}
//               isOpen={openIndex === index}
//               onClick={() => toggleFAQ(index)}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FAQ;
import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import type { FAQ as FAQType } from '../types/index'; // Rename the type import

const faqs: FAQType[] = [  // Use the renamed type
  {
    question: "What areas of law does your firm specialize in?",
    answer: "Our firm specializes in various areas including civil litigation, family law, corporate law, real estate, criminal defense, intellectual property, constitutional law, and legal documentation. Our team of advocates has extensive experience in these practice areas across Indian courts."
  },
  {
    question: "How do I know if I need a lawyer?",
    answer: "You may need a lawyer if you're facing legal issues such as property disputes, family matters, criminal charges, business-related legal challenges, or need legal documentation. We offer free initial consultations to help you determine if you need legal representation."
  },
  {
    question: "What should I bring to my first meeting with a lawyer?",
    answer: "For your first meeting, bring any documents related to your case such as contracts, correspondence, court papers, police reports, medical records (if relevant), and a written timeline of events. This helps us understand your situation thoroughly and provide effective legal advice."
  },
  {
    question: "How much will my case cost?",
    answer: "Legal costs vary depending on the complexity of your case, the time required, and the nature of legal services needed. During our initial consultation, we'll discuss fee structures, which may include hourly rates, flat fees for specific services, or contingency arrangements in certain cases. We strive to provide transparent billing and payment options."
  },
  {
    question: "How long will my case take to resolve?",
    answer: "The duration varies significantly based on the type of case, its complexity, the court's schedule, and whether settlement is possible. Some matters can be resolved in weeks, while others may take months or even years. We'll provide a realistic timeline estimate based on your specific situation during consultation."
  },
  {
    question: "Can I represent myself instead of hiring a lawyer?",
    answer: "While self-representation (appearing 'in-person') is permitted in Indian courts, it's generally not recommended for complex matters. The legal system involves intricate procedures, substantive law knowledge, and courtroom protocols that legal professionals are trained to navigate. A qualified advocate can significantly improve your chances of a favorable outcome."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [ref, isInView] = useInView();

  return (
    <section ref={ref} className="relative py-14 font-montserrat overflow-hidden">
      <style jsx>{`
        @keyframes rotateIn {
          from {
            opacity: 0;
            transform: rotateX(-90deg);
          }
          to {
            opacity: 1;
            transform: rotateX(0);
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
      `}</style>

      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px]
        rotate-45
        blur-3xl"
        style={{
          animation: isInView ? 'rotateIn 1.5s ease-out both' : 'none'
        }}
      />

      <div
        className="absolute right-0 top-0 h-full w-[6px]
        bg-gradient-to-b
        from-[#5C6F7A]
        via-[#2F3336]
        to-transparent
        opacity-70"
        style={{
          animation: isInView ? 'slideInRight 0.8s ease-out 0.3s both' : 'none'
        }}
      />

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-10">
          <div
            className="w-14 h-[2px] bg-[#5C6F7A] mx-auto mb-4"
            style={{
              animation: isInView ? 'scaleIn 0.6s ease-out 0.2s both' : 'none',
              transformOrigin: 'center'
            }}
          ></div>
          <h2 className="text-xl md:text-2xl font-semibold text-[#2F3336]">
            Frequently Asked Questions
          </h2>
          <p className="text-[#5C6F7A] text-sm mt-2">
            Answers to common legal inquiries
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="
                bg-white
                border border-gray-200
                rounded-lg
                overflow-hidden
                shadow-sm
                hover:shadow-md
                transition-all duration-300
              "
              style={{
                animation: isInView ? `fadeInUp 0.5s ease-out ${0.1 + index * 0.15}s both` : 'none'
              }}
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="
                  w-full
                  px-5 py-4
                  flex justify-between items-center
                  text-left
                  hover:bg-gray-50
                  transition-all duration-300
                "
              >
                <span className="text-sm font-medium text-[#2F3336]">
                  {faq.question}
                </span>
                <span
                  className={`
                    text-lg font-light transition-transform duration-300
                    ${openIndex === index
                      ? "rotate-45 text-[#5C6F7A]"
                      : "text-gray-400"
                    }
                  `}
                >
                  +
                </span>
              </button>

              <div
                className={`
                  grid transition-all duration-300 ease-in-out
                  ${openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                  }
                `}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>

              <div className="
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

export default FAQ;