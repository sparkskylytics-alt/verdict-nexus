import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle: string;
  alignment?: 'left' | 'center';
  textColor?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  subtitle, 
  alignment = 'center',
  textColor = 'text-gray-900'
}) => {
  return (
    <div className={`mb-12 ${alignment === 'center' ? 'text-center' : 'text-left'}`}>
      <h2 className={`text-3xl md:text-4xl font-bold font-serif mb-4 ${textColor}`}>
        {title}
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        {subtitle}
      </p>
      <div className={`h-1 w-20 bg-gold-500 mt-6 ${alignment === 'center' ? 'mx-auto' : ''}`}></div>
    </div>
  );
};

export default SectionTitle;