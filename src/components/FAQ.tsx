import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 py-5">
      <button
        className="flex justify-between items-center w-full text-left font-semibold text-gray-800 focus:outline-none"
        onClick={onClick}
      >
        <span>{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-primary-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      <div 
        className={`mt-2 text-gray-600 overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="py-2">{answer}</p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Frequently Asked Questions" 
          subtitle="Find answers to common legal questions our clients ask"
        />
        
        <div className="max-w-3xl mx-auto mt-12">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;