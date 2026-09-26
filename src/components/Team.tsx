// import React from "react";
// import { Scale } from "lucide-react";
// import SectionTitle from "./ui/SectionTitle";

// interface TeamMemberProps {
//   name: string;
//   position: string;
//   bio: string;
// }

// const TeamMember: React.FC<TeamMemberProps> = ({ name, position, bio }) => {
//   return (
//     <div className="group poppins-regular relative bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-[#1e3a8a]/30 transition-all duration-500 hover:-translate-y-1">
//       <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#1e3a8a]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//       <div className="relative z-10 flex flex-col items-start">
//         <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-[#1e3a8a]/10 text-[#1e3a8a]">
//           <Scale size={22} />
//         </div>
//         <h3 className="text-xl poppins-regular font-serif font-semibold text-gray-900 mb-1">
//           {name}
//         </h3>
//         <p className="text-[#1e3a8a] poppins-regular font-medium text-sm uppercase tracking-wider">
//           {position}
//         </p>
//         <p className="mt-4 text-gray-600 text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
//           {bio}
//         </p>
//       </div>
//     </div>
//   );
// };

// const Team: React.FC = () => {
//   const members = [
//     {
//       name: "Shashi Kant Upadhyay",
//       position: "Senior Advocate",
//       bio: "With over 5 years of experience in civil litigation, Shashi has represented clients before the Supreme Court of India and various High Courts.",
//     },
//     {
//       name: "MD Amaan",
//       position: "Corporate Law Specialist",
//       bio: "Amaan specializes in mergers and acquisitions, negotiating complex corporate transactions for Indian and international clients.",
//     },
//     {
//       name: "Akbar Khan",
//       position: "Criminal Defense Attorney",
//       bio: "Akbar leads our criminal defense practice with a proven record of successful case outcomes.",
//     },
//     {
//       name: "Sathosh",
//       position: "Family Law Expert",
//       bio: "Sathosh is known for her compassionate approach to family law, guiding clients through divorce, custody, and domestic relations cases.",
//     },
//   ];

//   return (
//     <section id="our-team" className="py-20 bg-white relative overflow-hidden">
//       {/* Soft top gradient for luxury touch */}
//       <div className="absolute inset-0 bg-gradient-to-b from-[#f9fafb] to-white" />

//       <div className="container mx-auto px-6 relative z-10">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900 mb-3">
//             Meet Our Legal Experts
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Our dedicated advocates combine deep legal expertise and unwavering
//             integrity to protect your rights and deliver justice with excellence.
//           </p>
//           <div className="w-24 h-1 bg-[#bfa36f] mx-auto mt-6 rounded-full" />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {members.map((member, index) => (
//             <TeamMember key={index} {...member} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Team;

import { useInView } from '../hooks/useInView';
import { TeamMember } from '../types';

const team: TeamMember[] = [
  {
    name: "Shashi Kant Upadhyay",
    role: "Advocate",
specialty:
  "Experienced in civil litigation, Shashi has represented clients before the Supreme Court of India and various High Courts.",    experience: "Years",
    image: "/team/sachin-bhaiya.jpeg",
  },
  {
    name: "MD Amaan",
    role: "Corporate Law Specialist",
    specialty: "Amaan specializes in mergers and acquisitions, negotiating complex corporate transactions for Indian and international clients.",
    experience: "18 Years",
    image: "/team/akbar.jpeg",
  },
  {
    name: "Akbar Khan",
    role: "Criminal Defense Attorney",
    specialty: "Akbar leads our criminal defense practice with a proven record of successful case outcomes.",
    experience: "22 Years",
    image: "/team/aman.jpeg",
  },
  {
    name: "Santosh Kumar",
    role: "Family Law Expert",
    specialty: "Sathosh is known for her compassionate approach to family law, guiding clients through divorce, custody, and domestic relations cases.",
    experience: "15 Years",
    image: "/team/santosh.png",
  },
];

const Team = () => {
  const [ref, isInView] = useInView();

  return (
    <section id="team" ref={ref} className="relative py-14 font-montserrat overflow-hidden bg-white">
      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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
        className="absolute mt-10 left-0 top-0 h-full w-12 
        bg-gradient-to-b 
        from-[#5C6F7A] 
        to-[#2F3336]"
        style={{
          animation: isInView ? 'slideInFromLeft 0.8s ease-out both' : 'none'
        }}
      />

      <div className="absolute inset-0 opacity-[0.03] 
        bg-[linear-gradient(to_right,#000_1px,transparent_1px),
             linear-gradient(to_bottom,#000_1px,transparent_1px)]
        bg-[size:36px_36px]" />

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-2xl font-semibold text-[#2F3336]">
            Our Legal Team
          </h2>
          <p className="text-[#5C6F7A] text-xs mt-2">
            Dedicated professionals delivering trusted legal excellence
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((member, index) => (
            <div
              key={index}
              className="
                group relative
                bg-white
                rounded-lg
                overflow-hidden
                shadow-sm
                hover:shadow-lg
                hover:-translate-y-1
                transition-all duration-300
              "
              style={{
                animation: isInView ? `fadeInUp 0.6s ease-out ${0.1 + index * 0.15}s both` : 'none'
              }}
            >
              <div className="relative  h-56 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="
                    top-0
                    w-full h-full object-cover
                    group-hover:scale-105
                    transition duration-500
                  "
                />
                <div className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/60
                  via-black/10
                  to-transparent
                " />
                <div className="
                  absolute bottom-0 left-0 right-0
                  p-4 text-white
                ">
                  <h3 className="font-semibold text-sm">
                    {member.name}
                  </h3>
                  <p className="text-[11px] text-white">
                    {member.role}
                  </p>
                  <p className="text-[10px] text-white">
                    {member.specialty}
                  </p>
                </div>
                {/* <div className="
                  absolute top-2 right-2
                  bg-white text-[#2F3336]
                  text-[10px]
                  px-2 py-[2px]
                  rounded-full
                  shadow
                  group-hover:scale-110
                  transition-transform duration-300
                ">
                  {member.experience}
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;