import React from 'react';
import SectionTitle from './ui/SectionTitle';

interface TeamMemberProps {
  name: string;
  position: string;
  bio: string;
  image: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, position, bio, image }) => {
  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-lg shadow-md mb-4 transition-transform duration-300 group-hover:shadow-xl">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-80 object-cover object-center transition-transform duration-500 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-6">
            <p className="text-white text-sm leading-relaxed">{bio}</p>
          </div>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
      <p className="text-primary-600 font-medium">{position}</p>
    </div>
  );
};

const Team: React.FC = () => {
  const members = [
    {
      name: "Shashi Kant Upadhyay",
      position: "Senior Advocate",
      bio: "With over 5 years of experience in civil litigation, Shashi has represented clients before the Supreme Court of India and various High Courts.",
      image: "https://images.pexels.com/photos/5081971/pexels-photo-5081971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      name: "MD Amaan",
      position: "Corporate Law Specialist",
      bio: "Amaan specializes in mergers and acquisitions, with expertise in negotiating complex corporate transactions for both Indian and multinational companies.",
      image: "https://images.pexels.com/photos/5112704/pexels-photo-5112704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      name: "Akbar Khan",
      position: "Criminal Defense Attorney",
      bio: "A former public prosecutor, Akbar now leads our criminal defense practice with a proven track record of successful case outcomes.",
      image: "https://images.pexels.com/photos/8422206/pexels-photo-8422206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      name: "Sathosh",
      position: "Family Law Expert",
      bio: "Sathosh is known for her compassionate approach to family law matters, helping clients navigate divorce, child custody, and domestic relations issues.",
      image: "https://images.pexels.com/photos/7654586/pexels-photo-7654586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <section id="our-team" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Meet Our Legal Experts" 
          subtitle="Our team of experienced advocates is dedicated to providing the highest quality legal representation"
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {members.map((member, index) => (
            <TeamMember 
              key={index}
              name={member.name}
              position={member.position}
              bio={member.bio}
              image={member.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;