import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  rating: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, role, rating }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 flex flex-col h-full">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-5 h-5 ${i < rating ? 'text-gold-500 fill-gold-500' : 'text-gray-300'}`} 
          />
        ))}
      </div>
      <blockquote className="text-gray-700 flex-grow mb-6 italic">
        "{quote}"
      </blockquote>
      <div>
        <p className="font-semibold text-gray-800">{author}</p>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  const testimonials = [
    {
      quote: "JusticeLaw helped me navigate a complex property dispute with expertise and empathy. Their team was always available to answer my questions and guide me through the legal process.",
      author: "Anil Kumar",
      role: "Business Owner, New Delhi",
      rating: 5
    },
    {
      quote: "I was facing serious charges and the team at JusticeLaw provided an excellent defense strategy. Their knowledge of criminal law and court procedures was instrumental in getting my case resolved favorably.",
      author: "Sanjay Mehta",
      role: "IT Professional, Bangalore",
      rating: 5
    },
    {
      quote: "During my divorce proceedings, the advocates at JusticeLaw were compassionate and professional. They ensured my rights were protected while prioritizing an amicable resolution.",
      author: "Neha Sharma",
      role: "Teacher, Mumbai",
      rating: 4
    },
    {
      quote: "Their corporate law expertise helped our startup navigate complex regulatory requirements. The team provided clear guidance and practical solutions tailored to our business needs.",
      author: "Rahul Patel",
      role: "Startup Founder, Hyderabad",
      rating: 5
    },
    {
      quote: "I was involved in a serious accident and JusticeLaw helped me secure fair compensation. Their dedication to my case and attention to detail made a difficult time much easier.",
      author: "Priya Singh",
      role: "Accountant, Chennai",
      rating: 5
    },
    {
      quote: "The intellectual property team at JusticeLaw protected our patents efficiently. Their strategic approach and industry knowledge provided us with a strong competitive advantage.",
      author: "Vikram Reddy",
      role: "Engineering Director, Pune",
      rating: 4
    }
  ];

  const totalSlides = Math.ceil(testimonials.length / 3);
  
  const nextSlide = () => {
    setActiveSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const visibleTestimonials = testimonials.slice(
    activeSlide * 3,
    Math.min((activeSlide + 1) * 3, testimonials.length)
  );

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Client Success Stories" 
          subtitle="Hear from those we've helped navigate complex legal challenges"
        />
        
        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, index) => (
              <Testimonial 
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                rating={testimonial.rating}
              />
            ))}
          </div>
          
          {totalSlides > 1 && (
            <div className="flex justify-center items-center mt-10 space-x-4">
              <button 
                onClick={prevSlide}
                className="p-2 rounded-full bg-white shadow-md text-gray-700 hover:bg-primary-50 transition-colors duration-200"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex space-x-2">
                {[...Array(totalSlides)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      activeSlide === index ? 'bg-primary-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <button 
                onClick={nextSlide}
                className="p-2 rounded-full bg-white shadow-md text-gray-700 hover:bg-primary-50 transition-colors duration-200"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;