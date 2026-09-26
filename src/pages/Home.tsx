import { useState, useEffect, useRef } from 'react';
import logo from '../../src/Images/image.png';

const HomePage = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen poppins-regular bg-white">
      <Navbar scrolled={scrolled} />
      <Hero />
      <OurClients />
      <PracticeAreas />
      <Team />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
};

// Animation Hook
const useInView = (threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isInView];
};

// Simple Navbar Component
const Navbar = ({ scrolled }: { scrolled: boolean }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 font-montserrat 
      bg-[#2F3336] transition-all duration-300 z-50 
      ${scrolled ? "shadow-lg" : ""}`}
      style={{
        animation: 'slideDown 0.5s ease-out'
      }}
    >
      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
      <div className="container font-montserrat mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded flex items-center justify-center shadow-md overflow-hidden">
              <img
                src={logo}
                alt="Law Firm Logo"
                className="h-6 w-6 object-contain transition duration-300"
              />
            </div>
            <span className="text-xl font-bold text-[#E8E2D6] tracking-wide">
              Verdict Nexus
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {["Home", "Services", "Team", "Cases", "Contact"].map((item, index) => (
              <a
                key={item}
                href="#"
                className="text-[#CFC7B8] hover:text-[#E8E2D6] 
                text-sm font-medium transition-all duration-300
                hover:scale-105"
                style={{
                  animation: `fadeInRight 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              className="bg-[#5C6F7A] text-[#E8E2D6] 
              px-5 py-2 rounded hover:bg-[#6F848F] 
              transition-all text-sm font-medium shadow-md
              hover:scale-105 active:scale-95
              transform transition-transform duration-200"
              style={{
                animation: 'fadeIn 0.6s ease-out 0.4s both'
              }}
            >
              Free Consultation
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#E8E2D6] hover:scale-110 transition-transform"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className="md:hidden pb-4 space-y-2"
            style={{
              animation: 'slideDownMenu 0.3s ease-out'
            }}
          >
            {["Home", "Services", "Team", "Cases", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="block py-2 text-[#CFC7B8] 
                hover:text-[#E8E2D6] transition-all duration-200
                hover:pl-2"
              >
                {item}
              </a>
            ))}
            <button
              className="mt-2 bg-[#5C6F7A] text-[#E8E2D6] 
              px-5 py-2 rounded w-full text-sm shadow-md
              hover:scale-[1.02] transition-transform"
            >
              Free Consultation
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

// Simple Hero Component
const Hero = () => {
  const [ref, isInView] = useInView();

  return (
    <section
      ref={ref}
      className="relative pt-24 font-montserrat pb-20 overflow-hidden text-white"
    >
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
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>

      {/* ===== New Background Stack ===== */}
      <div className="absolute inset-0 
        bg-gradient-to-br 
        from-[#0F172A] 
        via-[#1E293B] 
        to-[#020617]" />

      {/* Center Spotlight */}
      <div className="absolute inset-0 
        bg-[radial-gradient(circle_at_30%_40%,rgba(92,111,122,0.35),transparent_45%)]" />

      {/* Right Glow Orb */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] 
        bg-[#5C6F7A]/30 blur-3xl rounded-full"
        style={{
          animation: 'float 6s ease-in-out infinite'
        }}
      />

      {/* Bottom Fade Depth */}
      <div className="absolute bottom-0 left-0 right-0 h-60 
        bg-gradient-to-t from-black/40 to-transparent" />

      {/* Subtle Grid Texture */}
      <div className="absolute inset-0 opacity-[0.05] 
        bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] 
        bg-[size:40px_40px]" />

      {/* ===== Content ===== */}
      <div className="relative container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* LEFT */}
          <div className="lg:w-1/2">
            {/* Accent Line */}
            <div
              className="w-16 h-[2px] bg-[#CFC7B8] mb-6"
              style={{
                animation: isInView ? 'fadeInRight 0.8s ease-out 0.2s both' : 'none',
                transformOrigin: 'left'
              }}
            ></div>
            {/* Heading */}
            <h1
              className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-6"
              style={{
                animation: isInView ? 'fadeInUp 0.8s ease-out 0.3s both' : 'none'
              }}
            >
              Professional Legal Services
              <br />
              You Can Trust
            </h1>
            {/* Description */}
            <p
              className="text-gray-300 text-base mb-8 max-w-xl"
              style={{
                animation: isInView ? 'fadeInUp 0.8s ease-out 0.4s both' : 'none'
              }}
            >
              With over 25 years of experience, we provide expert legal
              counsel for individuals and businesses with proven success
              and trusted representation.
            </p>
            {/* Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4"
              style={{
                animation: isInView ? 'fadeInUp 0.8s ease-out 0.5s both' : 'none'
              }}
            >
              <button className="bg-[#5C6F7A] hover:bg-[#6F848F] 
                px-7 py-3 rounded shadow-xl text-sm font-medium 
                transition-all duration-300 hover:scale-105 active:scale-95
                hover:shadow-2xl">
                Schedule Consultation
              </button>
              <button className="border border-white/40 
                px-7 py-3 rounded text-sm hover:bg-white/10 
                transition-all duration-300 hover:scale-105 active:scale-95">
                View Services
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:w-1/2 w-full relative">
            {/* Glass Card */}
            <div
              className="h-80 rounded-xl shadow-2xl border border-white/10 bg-cover bg-center relative overflow-hidden"
              style={{
                backgroundImage:
                  "url('https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
                animation: isInView ? 'fadeInUp 0.8s ease-out 0.6s both' : 'none'
              }}
            >
              {/* Dark Overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            </div>

            {/* Floating Badge */}
            <div
              className="absolute -bottom-6 left-8 
              bg-[#E8E2D6] text-[#2F3336] 
              px-6 py-3 rounded-lg shadow-xl
              hover:scale-105 transition-transform duration-300"
              style={{
                animation: isInView ? 'fadeInUp 0.8s ease-out 0.7s both' : 'none'
              }}
            >
              <div className="font-bold text-sm">
                Award Winning
              </div>
              <div className="text-xs">
                Legal Excellence
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Simple OurClients Component
const OurClients = () => {
  const [ref, isInView] = useInView();

  const clients = [
    { name: "Medipol", logo: "/Images/Clients/medipol.png" },
    { name: "Panhr", logo: "/Images/Clients/panhr.png" },
    { name: "Moat Electronics", logo: "/Images/Clients/moat_electronics.jpg" },
  ];

  return (
    <section
      ref={ref}
      className="relative py-16 font-montserrat bg-white overflow-hidden"
    >
      {/* Animations */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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
      `}</style>

      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2
            className="text-xl md:text-2xl font-semibold text-[#2F3336]"
            style={{
              animation: isInView
                ? "slideInLeft 0.6s ease-out both"
                : "none",
            }}
          >
            Trusted By Industry Leaders
          </h2>

          <p
            className="text-[#5C6F7A] text-sm mt-2"
            style={{
              animation: isInView
                ? "slideInRight 0.6s ease-out 0.1s both"
                : "none",
            }}
          >
            Partnerships built on trust & long-term success
          </p>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {clients.map((client, index) => (
            <div
              key={client.name}
              className="
                group relative
                flex items-center justify-center
                p-6
                rounded-xl
                bg-white
                border border-gray-200
                shadow-sm
                hover:shadow-lg
                hover:-translate-y-2
                transition-all duration-500
              "
              style={{
                animation: isInView
                  ? `scaleIn 0.5s ease-out ${0.2 + index * 0.1
                  }s both`
                  : "none",
              }}
            >
              {/* Hover Border Effect */}
              <div
                className="
                  absolute inset-0 rounded-xl
                  border border-[#5C6F7A]/0
                  group-hover:border-[#5C6F7A]/30
                  transition
                "
              />

              {/* Logo */}
              <img
                src={client.logo}
                alt={client.name}
                className="
                  relative
                  max-h-12
                  object-contain
                  group-hover:scale-110
                  transition duration-500
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



// Simple PracticeAreas Component
const PracticeAreas = () => {

  const areas = [
    {
      title: "Corporate Law",
      description:
        "Legal advice on company formation, compliance, mergers, acquisitions, and corporate governance.",
      icon: "/Icons/regulation.png",
    },
    {
      title: "Real Estate",
      description:
        "Legal services for property transactions, tenant disputes, and construction-related matters.",
      icon: "/Icons/urban.png",
    },
    {
      title: "Family Law",
      description:
        "Assistance with divorce, child custody, maintenance, adoption, and domestic relations matters.",
      icon: "/Icons/family-law.png",
    },
    {
      title: "Civil Litigation",
      description:
        "Representation in civil disputes including property matters and recovery suits.",
      icon: "/Icons/civil-rights.png",
    },
    {
      title: "Criminal Defense",
      description:
        "Defense representation in criminal proceedings at all court levels.",
      icon: "/Icons/justice.png",
    },
    {
      title: "Intellectual Property",
      description:
        "Protection of trademarks, copyrights, patents, and trade secrets.",
      icon: "/Icons/court.png",
    },
    {
      title: "Constitutional Law",
      description:
        "Matters involving fundamental rights and constitutional remedies.",
      icon: "/Icons/law-book.png",
    },
    {
      title: "Documentation",
      description:
        "Drafting agreements, wills, legal notices, and power of attorney.",
      icon: "/Icons/documentation.png",
    },
    {
      title: "ITR Services",
      description:
        "Income tax filing, tax planning, and compliance services.",
      icon: "/Icons/monitor.png",
    },
  ];

  return (
    <section className="relative py-10 font-montserrat overflow-hidden">

      {/* Dark Background */}
      <div className="absolute inset-0 bg-[#2F3336]" />

      <div className="relative container mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-white">
            Practice Areas
          </h2>

          {/* Divider */}
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

        {/* Compact Grid */}
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

              {/* Icon + Title Row */}
              <div className="flex items-center gap-3 mb-2">

                {/* Icon Box */}
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

                {/* Title */}
                <h3 className="text-sm font-semibold text-[#2F3336]">
                  {area.title}
                </h3>
              </div>

              {/* Description */}
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




// Simple Team Component
const Team = () => {
  const [ref, isInView] = useInView();
  const team = [
    {
      name: "Shashi Kant Upadhyay",
      role: "Senior Advocate",
      specialty: "With over 5 years of experience in civil litigation, Shashi has represented clients before the Supreme Court of India and various High Courts.",
      experience: "5 Years",
      image: "/team/sarah.jpg",
    },
    {
      name: "MD Amaan",
      role: "Corporate Law Specialist",
      specialty: "Amaan specializes in mergers and acquisitions, negotiating complex corporate transactions for Indian and international clients.",
      experience: "18 Years",
      image: "/team/michael.jpg",
    },
    {
      name: "Akbar Khan",
      role: "Criminal Defense Attorney",
      specialty: "Akbar leads our criminal defense practice with a proven record of successful case outcomes.",
      experience: "22 Years",
      image: "/team/robert.jpg",
    },
    {
      name: "Sathosh",
      role: "Family Law Expert",
      specialty: "Sathosh is known for her compassionate approach to family law, guiding clients through divorce, custody, and domestic relations cases.",
      experience: "15 Years",
      image: "/team/lisa.jpg",
    },
  ];

  return (
    <section ref={ref} className="relative py-14 font-montserrat overflow-hidden bg-white">
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
      `}</style>

      {/* ===== Compact Background ===== */}
      {/* Slim left brand panel */}
      <div
        className="absolute mt-10 left-0 top-0 h-full w-12 
        bg-gradient-to-b 
        from-[#5C6F7A] 
        to-[#2F3336]"
        style={{
          animation: isInView ? 'slideInFromLeft 0.8s ease-out both' : 'none'
        }}
      />

      {/* Light grid texture */}
      <div className="absolute inset-0 opacity-[0.03] 
        bg-[linear-gradient(to_right,#000_1px,transparent_1px),
             linear-gradient(to_bottom,#000_1px,transparent_1px)]
        bg-[size:36px_36px]" />

      <div className="relative container mx-auto px-4">
        {/* ===== Heading ===== */}
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-2xl font-semibold text-[#2F3336]">
            Our Legal Team
          </h2>
          <p className="text-[#5C6F7A] text-xs mt-2">
            Dedicated professionals delivering trusted legal excellence
          </p>
        </div>

        {/* ===== Compact Grid ===== */}
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
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="
                    w-full h-full object-cover
                    group-hover:scale-105
                    transition duration-500
                  "
                />
                {/* Overlay */}
                <div className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/60
                  via-black/10
                  to-transparent
                " />
                {/* Info */}
                <div className="
                  absolute bottom-0 left-0 right-0
                  p-4 text-white
                ">
                  <h3 className="font-semibold text-sm">
                    {member.name}
                  </h3>
                  <p className="text-[11px] text-gray-300">
                    {member.role}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {member.specialty}
                  </p>
                </div>
                {/* Badge */}
                <div className="
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Simple Testimonials Component
const Testimonials = () => {
  const [ref, isInView] = useInView();
  const testimonials = [
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

  return (
    <section ref={ref} className="relative py-14 font-montserrat overflow-hidden bg-white">
      <style jsx>{`
        @keyframes floatCard {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>

      {/* Paper texture background */}
      <div className="absolute inset-0 opacity-[0.04] 
        bg-[url('https://www.transparenttextures.com/patterns/paper.png')]" />

      <div className="relative container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-2xl font-semibold text-[#2F3336]">
            Client Testimonials
          </h2>
          <p className="text-[#5C6F7A] text-xs mt-2">
            Trusted feedback from our valued clients
          </p>
        </div>

        {/* Grid */}
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
              {/* Quote watermark */}
              <div className="
                absolute top-3 right-4
                text-5xl text-[#5C6F7A]/10
                font-serif
              ">
                "
              </div>

              {/* Stars */}
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

              {/* Content */}
              <p className="text-gray-700 text-sm italic mb-5 leading-relaxed">
                "{t.content}"
              </p>

              {/* Client */}
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

              {/* ===== Permanent Bottom Brand Border ===== */}
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

// Simple FAQ Component
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [ref, isInView] = useInView();

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

  return (
    <section ref={ref} className="relative py-14 font-montserrat overflow-hidden ">
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
      `}</style>

      {/* ===== New Background Style ===== */}
      {/* Soft paper texture */}


      {/* Diagonal brand wash */}
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px]
     
        rotate-45
        blur-3xl"
        style={{
          animation: isInView ? 'rotateIn 1.5s ease-out both' : 'none'
        }}
      />

      {/* Floating accent divider */}
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

      {/* ===== Content ===== */}
      <div className="relative container mx-auto px-4">
        {/* Heading */}
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

        {/* Accordion */}
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
              {/* Question */}
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

              {/* Answer */}
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

              {/* Permanent bottom brand border */}
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

// Simple Contact Component
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [ref, isInView] = useInView();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ===== Contact Info Data ===== */
  const contactInfo = [
    {
      icon: "/Icons/location.png",
      title: "Office Address",
      content:
        "S-211, Gayatri Life Suites Greater Noida West, Sector-1, 201302",
    },
    {
      icon: "/Icons/telephone.png",
      title: "Phone Number",
      content: "+91 9310654386  +91 9632784891",
    },
    {
      icon: "/Icons/email.png",
      title: "Email Address",
      content: "Advoctekhojshashi@gmail.com",
    },
    {
      icon: "/Icons/working-time.png",
      title: "Business Hours",
      content:
        "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 2:00 PM",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative py-14 font-montserrat overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0" />

      <div
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_30%_30%,rgba(92,111,122,0.15),transparent_50%)]
        "
      />

      <div className="relative container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* ===== LEFT INFO ===== */}
          <div>
            <div className="w-14 h-[2px] bg-[#5C6F7A] mb-5"></div>

            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#2F3336]">
              Contact Us
            </h2>

            <p className="text-gray-600 text-sm mb-8 max-w-md">
              Schedule a confidential consultation with our legal experts.
              We respond within 24 hours.
            </p>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="
                    flex gap-4 items-start
                    hover:translate-x-1
                    transition-transform duration-300
                  "
                >
                  {/* Icon Box */}
                  <div
                    className="
                      w-10 h-10
                      bg-[#5C6F7A]/10
                      border border-[#5C6F7A]/20
                      rounded-lg
                      flex items-center justify-center
                      hover:scale-110
                      transition-transform duration-300
                    "
                  >
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-5 h-5 object-contain"
                    />
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-sm font-medium text-[#2F3336]">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-xs whitespace-pre-line">
                      {item.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== FORM ===== */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="
                bg-white
                border border-gray-200
                rounded-xl
                p-6
                shadow-xl
                hover:shadow-2xl
                transition-all duration-500
              "
            >
              {/* Row */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="
                    w-full p-3 text-sm
                    border border-gray-300
                    rounded-lg
                    focus:outline-none
                    focus:border-[#5C6F7A]
                    focus:ring-1 focus:ring-[#5C6F7A]
                  "
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="
                    w-full p-3 text-sm
                    border border-gray-300
                    rounded-lg
                    focus:outline-none
                    focus:border-[#5C6F7A]
                    focus:ring-1 focus:ring-[#5C6F7A]
                  "
                  required
                />
              </div>

              {/* Phone */}
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="
                  w-full p-3 text-sm mb-4
                  border border-gray-300
                  rounded-lg
                  focus:outline-none
                  focus:border-[#5C6F7A]
                  focus:ring-1 focus:ring-[#5C6F7A]
                "
                required
              />

              {/* Message */}
              <textarea
                name="message"
                rows={3}
                placeholder="Describe your legal needs..."
                value={formData.message}
                onChange={handleChange}
                className="
                  w-full p-3 text-sm mb-5
                  border border-gray-300
                  rounded-lg
                  focus:outline-none
                  focus:border-[#5C6F7A]
                  focus:ring-1 focus:ring-[#5C6F7A]
                "
                required
              />

              {/* Button */}
              <button
                type="submit"
                className="
                  w-full
                  bg-[#5C6F7A]
                  hover:bg-[#6F848F]
                  text-white
                  py-3
                  rounded-lg
                  text-sm
                  font-medium
                  shadow-md
                  hover:shadow-lg
                  transition-all duration-300
                "
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};


// Simple Footer Component
const Footer = () => {
  return (
    <footer className="relative font-montserrat text-white overflow-hidden bg-[#2F3336]">
      <div className="relative container mx-auto px-4 py-14">
        {/* Grid */}
        <div className="grid md:grid-cols-4 gap-8">
          {/* ===== Brand ===== */}
          <div
            style={{
              animation: 'fadeInUp 0.6s ease-out both'
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 
                bg-gradient-to-br 
                from-[#5C6F7A] 
                to-[#2F3336]
                rounded flex items-center justify-center shadow-md
                hover:rotate-12 transition-transform duration-300">
                <span className="font-bold text-sm">
                  VN
                </span>
              </div>
              <span className="text-lg font-semibold">
                Verdict Nexus
              </span>
            </div>
            <p className="text-[#CFC7B8] text-sm leading-relaxed">
              Delivering trusted legal expertise for over 25 years with
              integrity, professionalism, and proven results.
            </p>
          </div>

          {/* ===== Quick Links ===== */}
          <div
            style={{
              animation: 'fadeInUp 0.6s ease-out 0.1s both'
            }}
          >
            <h3 className="font-semibold mb-4 text-sm">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {["Home", "Services", "Team", "Contact"].map((item, index) => (
                <li
                  key={item}
                  style={{
                    animation: `fadeInRight 0.4s ease-out ${0.2 + index * 0.1}s both`
                  }}
                >
                  <a
                    href="#"
                    className="
                      text-[#CFC7B8]
                      hover:text-white
                      transition-all duration-300
                      hover:pl-2 block
                    "
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== Practice Areas ===== */}
          <div
            style={{
              animation: 'fadeInUp 0.6s ease-out 0.2s both'
            }}
          >
            <h3 className="font-semibold mb-4 text-sm">
              Practice Areas
            </h3>
            <ul className="space-y-2 text-sm">
              {["Corporate Law", "Real Estate", "Family Law", "Employment"].map((area, index) => (
                <li
                  key={area}
                  style={{
                    animation: `fadeInRight 0.4s ease-out ${0.3 + index * 0.1}s both`
                  }}
                >
                  <a
                    href="#"
                    className="
                      text-[#CFC7B8]
                      hover:text-white
                      transition-all duration-300
                      hover:pl-2 block
                    "
                  >
                    {area}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== Newsletter ===== */}
          <div
            style={{
              animation: 'fadeInUp 0.6s ease-out 0.3s both'
            }}
          >
            <h3 className="font-semibold mb-4 text-sm">
              Newsletter
            </h3>
            <p className="text-[#CFC7B8] text-sm mb-4">
              Subscribe for legal insights & updates
            </p>
            <div
              className="flex"
              style={{
                animation: 'scaleIn 0.5s ease-out 0.4s both'
              }}
            >
              <input
                type="email"
                placeholder="Your email"
                className="
                  flex-grow
                  p-3
                  text-sm
                  bg-white/10
                  border border-white/20
                  rounded-l
                  placeholder-gray-300
                  focus:outline-none focus:bg-white/20
                  transition-all duration-300
                "
              />
              <button
                className="
                  bg-[#5C6F7A]
                  hover:bg-[#6F848F]
                  px-4
                  rounded-r
                  text-sm
                  transition-all duration-300
                  hover:scale-110
                "
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* ===== Bottom Bar ===== */}
        <div
          className="
            border-t border-white/10
            mt-10 pt-6
            flex flex-col md:flex-row
            justify-between
            items-center
            gap-3
            text-sm text-[#CFC7B8]
          "
          style={{
            animation: 'fadeInUp 0.6s ease-out 0.5s both'
          }}
        >
          <p>
            © {new Date().getFullYear()} Verdict Nexus. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition hover:scale-105">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition hover:scale-105">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomePage;