import React, { useState } from 'react';
import { FileText, Users, Briefcase, Home, Scale, Shield, Landmark, FileCheck, Calculator } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';
import ITRForm from './ITRForm';

interface PracticeAreaProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

const PracticeAreaCard: React.FC<PracticeAreaProps> = ({ icon, title, description, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary-50 text-primary-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const PracticeAreas: React.FC = () => {
  const [showITRForm, setShowITRForm] = useState(false);

  const areas = [
    {
      icon: <FileText className="h-7 w-7" />,
      title: "Civil Litigation",
      description: "Representation in civil disputes including property matters, breach of contracts, and recovery suits."
    },
    {
      icon: <Users className="h-7 w-7" />,
      title: "Family Law",
      description: "Assistance with divorce, child custody, maintenance, adoption, and other domestic relations matters."
    },
    {
      icon: <Briefcase className="h-7 w-7" />,
      title: "Corporate Law",
      description: "Legal advice on company formation, compliance, mergers, acquisitions, and corporate governance."
    },
    {
      icon: <Home className="h-7 w-7" />,
      title: "Real Estate",
      description: "Legal services for property transactions, tenant disputes, and construction-related matters."
    },
    {
      icon: <Scale className="h-7 w-7" />,
      title: "Criminal Defense",
      description: "Defense representation in criminal proceedings at all levels of the Indian judicial system."
    },
    {
      icon: <Shield className="h-7 w-7" />,
      title: "Intellectual Property",
      description: "Protection of trademarks, copyrights, patents, and trade secrets in the Indian jurisdiction."
    },
    {
      icon: <Landmark className="h-7 w-7" />,
      title: "Constitutional Law",
      description: "Representation in matters involving fundamental rights, constitutional remedies and public interest litigation."
    },
    {
      icon: <FileCheck className="h-7 w-7" />,
      title: "Documentation",
      description: "Drafting and reviewing legal documents, agreements, wills, and power of attorney."
    },
    {
      icon: <Calculator className="h-7 w-7" />,
      title: "ITR Services",
      description: "Professional assistance with income tax return filing, tax planning, and compliance for individuals and businesses.",
      onClick: () => setShowITRForm(true)
    }
  ];

  return (
    <section id="practice-areas" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle title="Our Practice Areas" subtitle="Comprehensive Legal Expertise" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {areas.map((area, index) => (
            <PracticeAreaCard 
              key={index}
              icon={area.icon}
              title={area.title}
              description={area.description}
              onClick={area.onClick}
            />
          ))}
        </div>
      </div>

      {showITRForm && <ITRForm onClose={() => setShowITRForm(false)} />}
    </section>
  );
};

export default PracticeAreas;