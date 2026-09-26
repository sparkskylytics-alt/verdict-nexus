// import React, { useState } from 'react';
// import { FileText, Users, Briefcase, Home, Scale, Shield, Landmark, FileCheck, Calculator } from 'lucide-react';
// import SectionTitle from './ui/SectionTitle';
// import ITRForm from './ITRForm';

// interface PracticeAreaProps {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
//   onClick?: () => void;
// }

// const PracticeAreaCard: React.FC<PracticeAreaProps> = ({ icon, title, description, onClick }) => {
//   return (
//     <div 
//       className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] cursor-pointer"
//       onClick={onClick}
//     >
//       <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary-50 text-primary-600 mb-4">
//         {icon}
//       </div>
//       <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
//       <p className="text-gray-600">{description}</p>
//     </div>
//   );
// };

// const PracticeAreas: React.FC = () => {
//   const [showITRForm, setShowITRForm] = useState(false);

//   const areas = [
//     {
//       icon: <FileText className="h-7 w-7" />,
//       title: "Civil Litigation",
//       description: "Representation in civil disputes including property matters, breach of contracts, and recovery suits."
//     },
//     {
//       icon: <Users className="h-7 w-7" />,
//       title: "Family Law",
//       description: "Assistance with divorce, child custody, maintenance, adoption, and other domestic relations matters."
//     },
//     {
//       icon: <Briefcase className="h-7 w-7" />,
//       title: "Corporate Law",
//       description: "Legal advice on company formation, compliance, mergers, acquisitions, and corporate governance."
//     },
//     {
//       icon: <Home className="h-7 w-7" />,
//       title: "Real Estate",
//       description: "Legal services for property transactions, tenant disputes, and construction-related matters."
//     },
//     {
//       icon: <Scale className="h-7 w-7" />,
//       title: "Criminal Defense",
//       description: "Defense representation in criminal proceedings at all levels of the Indian judicial system."
//     },
//     {
//       icon: <Shield className="h-7 w-7" />,
//       title: "Intellectual Property",
//       description: "Protection of trademarks, copyrights, patents, and trade secrets in the Indian jurisdiction."
//     },
//     {
//       icon: <Landmark className="h-7 w-7" />,
//       title: "Constitutional Law",
//       description: "Representation in matters involving fundamental rights, constitutional remedies and public interest litigation."
//     },
//     {
//       icon: <FileCheck className="h-7 w-7" />,
//       title: "Documentation",
//       description: "Drafting and reviewing legal documents, agreements, wills, and power of attorney."
//     },
//     {
//       icon: <Calculator className="h-7 w-7" />,
//       title: "ITR Services",
//       description: "Professional assistance with income tax return filing, tax planning, and compliance for individuals and businesses.",
//       onClick: () => setShowITRForm(true)
//     }
//   ];

//   return (
//     <section id="practice-areas" className="py-20 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <SectionTitle title="Our Practice Areas" subtitle="Comprehensive Legal Expertise" />
        
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
//           {areas.map((area, index) => (
//             <PracticeAreaCard 
//               key={index}
//               icon={area.icon}
//               title={area.title}
//               description={area.description}
//               onClick={area.onClick}
//             />
//           ))}
//         </div>
//       </div>

//       {showITRForm && <ITRForm onClose={() => setShowITRForm(false)} />}
//     </section>
//   );
// };

// export default PracticeAreas;

import { PracticeArea } from '../types';

const areas: PracticeArea[] = [
  {
    title: "Corporate Law",
    description: "Legal advice on company formation, compliance, mergers, acquisitions, and corporate governance.",
    icon: "/Icons/regulation.png",
  },
  {
    title: "Real Estate",
    description: "Legal services for property transactions, tenant disputes, and construction-related matters.",
    icon: "/Icons/urban.png",
  },
  {
    title: "Family Law",
    description: "Assistance with divorce, child custody, maintenance, adoption, and domestic relations matters.",
    icon: "/Icons/family-law.png",
  },
  {
    title: "Civil Litigation",
    description: "Representation in civil disputes including property matters and recovery suits.",
    icon: "/Icons/civil-rights.png",
  },
  {
    title: "Criminal Defense",
    description: "Defense representation in criminal proceedings at all court levels.",
    icon: "/Icons/justice.png",
  },
  {
    title: "Intellectual Property",
    description: "Protection of trademarks, copyrights, patents, and trade secrets.",
    icon: "/Icons/court.png",
  },
  {
    title: "Constitutional Law",
    description: "Matters involving fundamental rights and constitutional remedies.",
    icon: "/Icons/law-book.png",
  },
 
  {
    title: "ITR Services",
    description: "Income tax filing, tax planning, and compliance services.",
    icon: "/Icons/monitor.png",
  },
 {
    title: "Documentation",
    description: "Drafting agreements, wills, legal notices, and power of attorney.",
    icon: "/Icons/documentation.png",
  },
];

const PracticeAreas = () => {
  return (
    <section  id="practice-areas" className="relative py-10 font-montserrat overflow-hidden">
      <div className="absolute inset-0 bg-[#2F3336]" />
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-white">
            Practice Areas
          </h2>
          <div
            className="
              w-14 h-[2px]
              bg-gradient-to-r
              from-[#C6A15B]
              to-[#E6C27A]
              mx-auto mt-2
            "
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {areas.map((area, index) => (
            <div
              key={index}
              className="
                group
                p-4
                rounded-lg
                bg-white/95
                border border-white/20
                shadow-sm
                hover:shadow-lg
                hover:-translate-y-1
                transition-all duration-300
              "
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="
                    w-10 h-10
                    bg-gradient-to-br
                    from-[#5C6F7A]
                    to-[#2F3336]
                    rounded-md
                    flex items-center justify-center
                    shadow-sm
                    group-hover:scale-105
                    transition
                  "
                >
                  <img
                    src={area.icon}
                    alt={area.title}
                    className="w-5 h-5 object-contain"
                  />
                </div>
                <h3 className="text-sm font-semibold text-[#2F3336]">
                  {area.title}
                </h3>
              </div>
              <p className="text-gray-600 text-xs leading-relaxed">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;