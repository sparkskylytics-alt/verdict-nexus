import React from 'react';
import { Link } from './ui/Link';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen bg-gradient-to-r from-primary-900 to-primary-800 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
            backgroundBlendMode: "overlay",
            opacity: 0.6
          }}
        ></div>
      </div>
      
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto md:mx-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6 animate-fade-in">
              Expert Legal Solutions for <span className="text-gold-400">Every Indian</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl leading-relaxed">
              We provide comprehensive legal services tailored to protect your rights and interests. 
              Our team of experienced advocates is dedicated to delivering justice with integrity and excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="#contact" 
                className="px-6 py-3 bg-gold-500 text-primary-900 rounded-md font-semibold text-center hover:bg-gold-600 transition-colors duration-300 transform hover:scale-105"
              >
                Free Case Evaluation
              </Link>
              <Link 
                href="#practice-areas" 
                className="px-6 py-3 bg-white bg-opacity-10 text-white rounded-md font-semibold text-center hover:bg-opacity-20 backdrop-blur-sm transition-colors duration-300"
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-8">
        <Link href="#practice-areas" className="text-white animate-bounce">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default Hero;