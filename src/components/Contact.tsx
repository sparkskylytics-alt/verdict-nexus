// import React, { useState } from 'react';
// import { Phone, Mail, MapPin, Clock } from 'lucide-react';
// import SectionTitle from './ui/SectionTitle';

// interface FormState {
//   name: string;
//   email: string;
//   phone: string;
//   caseType: string;
//   message: string;
//   attachment?: File | null;
// }

// const Contact: React.FC = () => {
//   const [formState, setFormState] = useState<FormState>({
//     name: '',
//     email: '',
//     phone: '',
//     caseType: '',
//     message: '',
//     attachment: null
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormState(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     setFormState(prev => ({ ...prev, attachment: file }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const formData = new FormData();

//       // Append form data with appropriate field names
//       formData.append("name", formState.name);
//       formData.append("email", formState.email);
//       formData.append("phone", formState.phone);
//       formData.append("caseType", formState.caseType);
//       formData.append("message", formState.message);

//       // Append file if exists - GetForm expects file field name
//       if (formState.attachment) {
//         formData.append("file", formState.attachment);
//       }

//       // Submit to GetForm endpoint
//       const response = await fetch("https://getform.io/f/bpjxznjb", {
//         method: "POST",
//         body: formData,
//         // Headers are automatically set by FormData for multipart/form-data
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error("GetForm submission error:", errorText);
//         throw new Error(`Form submission failed: ${response.status}`);
//       }

//       // Success
//       setSubmitted(true);
//       setFormState({
//         name: "",
//         email: "",
//         phone: "",
//         caseType: "",
//         message: "",
//         attachment: null,
//       });

//       setTimeout(() => setSubmitted(false), 5000);

//     } catch (error) {
//       console.error("Submission error:", error);
//       alert("❌ Failed to submit form. Please try again or contact us directly.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const contactInfo = [
//     {
//       icon: <Phone className="h-6 w-6" />,
//       title: "Phone",
//       details: ["+919310654386", "+91 9632784891"]
//     },
//     {
//       icon: <Mail className="h-6 w-6" />,
//       title: "Email",
//       details: ["Advoctekhojshashi@gmail.com"]
//     },
//     {
//       icon: <MapPin className="h-6 w-6" />,
//       title: "Address",
//       details: ["S-211, Gayatri Life Suites", "Greater Noida West, Sector-1, 201302"]
//     },
//     {
//       icon: <Clock className="h-6 w-6" />,
//       title: "Business Hours",
//       details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 2:00 PM"]
//     }
//   ];

//   return (
//     <section id="contact" className="py-20 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <SectionTitle 
//           title="Contact Us" 
//           subtitle="Schedule a consultation or send us a message"
//         />
        
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">
//           <div className="lg:col-span-1 space-y-8">
//             {contactInfo.map((item, index) => (
//               <div key={index} className="flex items-start">
//                 <div className="flex-shrink-0 bg-primary-100 p-3 rounded-full text-primary-600 mr-4">
//                   {item.icon}
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h3>
//                   {item.details.map((detail, i) => (
//                     <p key={i} className="text-gray-600">{detail}</p>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-8">
//             <h3 className="text-2xl font-semibold text-gray-800 mb-6">Free Case Evaluation</h3>
            
//             {submitted ? (
//               <div className="bg-green-50 text-green-700 p-4 rounded mb-6 animate-fade-in">
//                 Thank you for contacting us! We'll get back to you within 24 hours.
//               </div>
//             ) : null}
            
//             {/* Form now submits to GetForm.io */}
//             <form 
//               onSubmit={handleSubmit}
//               method="POST"
//               encType="multipart/form-data"
//             >
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 <div>
//                   <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formState.name}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formState.email}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                     required
//                   />
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 <div>
//                   <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     value={formState.phone}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="caseType" className="block text-gray-700 mb-2">Case Type</label>
//                   <select
//                     id="caseType"
//                     name="caseType"
//                     value={formState.caseType}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                     required
//                   >
//                     <option value="">Select Case Type</option>
//                     <option value="Civil Litigation">Civil Litigation</option>
//                     <option value="Family Law">Family Law</option>
//                     <option value="Corporate Law">Corporate Law</option>
//                     <option value="Real Estate">Real Estate</option>
//                     <option value="Criminal Defense">Criminal Defense</option>
//                     <option value="Intellectual Property">Intellectual Property</option>
//                     <option value="Constitutional Law">Constitutional Law</option>
//                     <option value="Documentation">Documentation</option>
//                     <option value="ITR Services">ITR Services</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>
//               </div>
              
//               <div className="mb-6">
//                 <label htmlFor="message" className="block text-gray-700 mb-2">Case Details</label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   value={formState.message}
//                   onChange={handleChange}
//                   rows={5}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                   required
//                 ></textarea>
//               </div>
              
//               <div className="mb-6">
//                 <label htmlFor="attachment" className="block text-gray-700 mb-2">Attach File (Optional)</label>
//                 <input
//                   type="file"
//                   id="attachment"
//                   name="attachment"
//                   onChange={handleFileChange}
//                   accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
//                 />
//                 <p className="text-sm text-gray-500 mt-1">Supported formats: PDF, JPG, PNG, DOC, DOCX</p>
//               </div>
              
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className={`px-6 py-3 bg-primary-600 text-white rounded-md font-semibold hover:bg-primary-700 transition-colors duration-300 ${
//                   isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
//                 }`}
//               >
//                 {isSubmitting ? 'Submitting...' : 'Submit Request'}
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Google Maps Section */}
//         <div className="mt-16">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Find Us Here</h3>
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="aspect-w-16 aspect-h-9 h-96">
//               <iframe
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2233913121413!2d77.43073631508236!3d28.50702098245596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cea6b4c8f2c85%3A0x6f8a0e3b4c8f2c85!2sGayatri%20Life%20Suites%2C%20Greater%20Noida%20West%2C%20Sector%201%2C%20Greater%20Noida%2C%20Uttar%20Pradesh%20201302!5e0!3m2!1sen!2sin!4v1647875234567!5m2!1sen!2sin"
//                 width="100%"
//                 height="100%"
//                 style={{ border: 0 }}
//                 allowFullScreen
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//                 title="JusLok Office Location - S-211, Gayatri Life Suites, Greater Noida West"
//                 className="w-full h-full"
//               ></iframe>
//             </div>
//             <div className="p-6 bg-gray-50">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h4 className="text-lg font-semibold text-gray-800 mb-2">Our Office Location</h4>
//                   <p className="text-gray-600">S-211, Gayatri Life Suites, Greater Noida West, Sector-1, 201302</p>
//                 </div>
//                 <a
//                   href="https://maps.google.com/?q=S-211,+Gayatri+Life+Suites,+Greater+Noida+West,+Sector-1,+201302"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-300"
//                 >
//                   Get Directions
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  phone: string;
  caseType: string;
  message: string;
  attachment?: File | null;
}

interface ContactInfo {
  icon: string;
  title: string;
  content: string;
}

const Contact = () => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    caseType: '',
    message: '',
    attachment: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormState(prev => ({ ...prev, attachment: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("name", formState.name);
      formData.append("email", formState.email);
      formData.append("phone", formState.phone);
      formData.append("caseType", formState.caseType);
      formData.append("message", formState.message);

      if (formState.attachment) {
        formData.append("file", formState.attachment);
      }

      const response = await fetch("https://getform.io/f/bpjxznjb", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("GetForm submission error:", errorText);
        throw new Error(`Form submission failed: ${response.status}`);
      }

      setSubmitted(true);
      setFormState({
        name: "",
        email: "",
        phone: "",
        caseType: "",
        message: "",
        attachment: null,
      });

      setTimeout(() => setSubmitted(false), 5000);

    } catch (error) {
      console.error("Submission error:", error);
      alert("❌ Failed to submit form. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo: ContactInfo[] = [
    {
      icon: "/Icons/location.png",
      title: "Greater Noida Office",
      content: "S-211, Gayatri Life Suites, Greater Noida West, Sector-1, 201302",
    },
    {
      icon: "/Icons/location.png",
      title: "Mumbai Office",
      content: "9, 1st Floor, Western India House, Above Bombay Store, Sir P. M. Road, Fort, Mumbai 400001.",
    },
    {
      icon: "/Icons/telephone.png",
      title: "Phone Number",
      content: "+91 9310654386  |  +91 9632784891",
    },
    {
      icon: "/Icons/email.png",
      title: "Email Address",
      content: "Advoctekhojshashi@gmail.com",
    },
    {
      icon: "/Icons/working-time.png",
      title: "Business Hours",
      content: "Mon-Fri: 9AM-6PM | Sat: 10AM-2PM",
    },
  ];

  return (
    <section id="contact" className="relative py-8 font-montserrat overflow-hidden bg-gray-50">
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
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
      `}</style>

      {/* Background Effects */}
      <div className="absolute inset-0" />
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_30%_30%,rgba(92,111,122,0.15),transparent_50%)]
        "
      />

      <div className="relative container mx-auto px-4 max-w-6xl">
        {/* Section Title */}
        <div className="text-center mb-10">
          <div className="w-14 h-[2px] bg-[#5C6F7A] mx-auto mb-4"></div>
          <h2 className="text-xl md:text-2xl font-semibold text-[#2F3336]">
            Contact Us
          </h2>
          <p className="text-[#5C6F7A] text-sm mt-2">
            Schedule a consultation or send us a message
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* LEFT INFO - Contact Cards - Takes 5 columns */}
          <div className="lg:col-span-5 space-y-4">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="
                  flex gap-3 items-start
                  hover:translate-x-1
                  transition-transform duration-300
                  bg-white p-4 rounded-lg shadow-sm
                "
                style={{
                  animation: `slideInLeft 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Icon Box - Smaller */}
                <div
                  className="
                    w-10 h-10 flex-shrink-0
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

                {/* Text - With better wrapping */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-[#2F3336] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed break-words">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}

            {/* Alternative icons using lucide-react if images not available */}
            <div className="hidden">
              <Phone className="h-6 w-6" />
              <Mail className="h-6 w-6" />
              <MapPin className="h-6 w-6" />
              <Clock className="h-6 w-6" />
            </div>
          </div>

          {/* RIGHT - Form - Takes 7 columns (instead of 8) */}
          <div className="lg:col-span-7">
            <div
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
              <h3 className="text-lg font-semibold text-[#2F3336] mb-4">
                Free Case Evaluation
              </h3>

              {submitted && (
                <div className="bg-green-50 text-green-700 text-sm p-3 rounded-lg mb-4 animate-fadeIn">
                  Thank you! We'll respond within 24 hours.
                </div>
              )}

              <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                {/* Name & Email Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 text-xs mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="
                        w-full p-2.5 text-sm
                        border border-gray-300
                        rounded-lg
                        focus:outline-none
                        focus:border-[#5C6F7A]
                        focus:ring-1 focus:ring-[#5C6F7A]
                        transition-all duration-300
                      "
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 text-xs mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="
                        w-full p-2.5 text-sm
                        border border-gray-300
                        rounded-lg
                        focus:outline-none
                        focus:border-[#5C6F7A]
                        focus:ring-1 focus:ring-[#5C6F7A]
                        transition-all duration-300
                      "
                      required
                    />
                  </div>
                </div>

                {/* Phone & Case Type Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 text-xs mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className="
                        w-full p-2.5 text-sm
                        border border-gray-300
                        rounded-lg
                        focus:outline-none
                        focus:border-[#5C6F7A]
                        focus:ring-1 focus:ring-[#5C6F7A]
                        transition-all duration-300
                      "
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="caseType" className="block text-gray-700 text-xs mb-1">
                      Case Type
                    </label>
                    <select
                      id="caseType"
                      name="caseType"
                      value={formState.caseType}
                      onChange={handleChange}
                      className="
                        w-full p-2.5 text-sm
                        border border-gray-300
                        rounded-lg
                        focus:outline-none
                        focus:border-[#5C6F7A]
                        focus:ring-1 focus:ring-[#5C6F7A]
                        transition-all duration-300
                      "
                      required
                    >
                      <option value="">Select Case Type</option>
                      <option value="Civil Litigation">Civil Litigation</option>
                      <option value="Family Law">Family Law</option>
                      <option value="Corporate Law">Corporate Law</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Criminal Defense">Criminal Defense</option>
                      <option value="Intellectual Property">Intellectual Property</option>
                      <option value="Constitutional Law">Constitutional Law</option>
                      <option value="Documentation">Documentation</option>
                      <option value="ITR Services">ITR Services</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-gray-700 text-xs mb-1">
                    Case Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={4}
                    className="
                      w-full p-2.5 text-sm
                      border border-gray-300
                      rounded-lg
                      focus:outline-none
                      focus:border-[#5C6F7A]
                      focus:ring-1 focus:ring-[#5C6F7A]
                      transition-all duration-300
                    "
                    required
                  />
                </div>

                {/* File Attachment */}
                <div>
                  <label htmlFor="attachment" className="block text-gray-700 text-xs mb-1">
                    Attach File (Optional)
                  </label>
                  <input
                    type="file"
                    id="attachment"
                    name="attachment"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    className="
                      w-full p-2 text-sm
                      border border-gray-300
                      rounded-lg
                      focus:outline-none
                      focus:border-[#5C6F7A]
                      focus:ring-1 focus:ring-[#5C6F7A]
                      file:mr-3 file:py-1.5 file:px-3
                      file:rounded-md file:border-0
                      file:text-xs file:font-medium
                      file:bg-[#5C6F7A] file:text-white
                      hover:file:bg-[#6F848F]
                      transition-all duration-300
                    "
                  />
                  <p className="text-[10px] text-gray-400 mt-1">
                    Supported: PDF, JPG, PNG, DOC, DOCX (Max 5MB)
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-full
                    bg-[#5C6F7A]
                    hover:bg-[#6F848F]
                    text-white
                    py-2.5
                    rounded-lg
                    text-sm
                    font-medium
                    shadow-md
                    hover:shadow-lg
                    transition-all duration-300
                    ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
                  `}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Google Maps Section - More Compact */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-[#2F3336] mb-4 text-center">
            Find Us Here
          </h3>
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="h-64 w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2233913121413!2d77.43073631508236!3d28.50702098245596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cea6b4c8f2c85%3A0x6f8a0e3b4c8f2c85!2sGayatri%20Life%20Suites%2C%20Greater%20Noida%20West%2C%20Sector%201%2C%20Greater%20Noida%2C%20Uttar%20Pradesh%20201302!5e0!3m2!1sen!2sin!4v1647875234567!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Verdict Nexus Office Location"
                className="w-full h-full"
              />
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <p className="text-gray-600 text-sm">
                  S-211, Gayatri Life Suites, Greater Noida West, Sector-1, 201302
                </p>
                <a
                  href="https://maps.google.com/?q=S-211,+Gayatri+Life+Suites,+Greater+Noida+West,+Sector-1,+201302"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    px-4 py-2
                    bg-[#5C6F7A]
                    hover:bg-[#6F848F]
                    text-white
                    rounded-lg
                    text-xs
                    font-medium
                    transition-all duration-300
                    hover:scale-105
                    whitespace-nowrap
                  "
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add animation classes */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Contact;