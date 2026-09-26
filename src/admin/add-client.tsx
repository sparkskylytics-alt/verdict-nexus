import { useState } from "react";
import { UserPlus, Save, User, Phone, FileText, Briefcase } from "lucide-react";

const AddClient = () => {
  const [form, setForm] = useState({
    case_number: "",
    client_name: "",
    phone_number: "",
    case_type: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/add-client.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(form).toString(),
      });

      const message = await res.text();
      alert(message);
      
      if (res.ok) {
        setSuccess(true);
        // Reset form
        setForm({
          case_number: "",
          client_name: "",
          phone_number: "",
          case_type: "",
        });
        
        // Hide success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      alert("Error adding client. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
          <UserPlus className="w-8 h-8 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Add New Client</h2>
        <p className="text-gray-600">Enter client details to add to the system</p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-green-800 font-medium">Client added successfully!</p>
              <p className="text-green-700 text-sm mt-1">The client has been added to the database.</p>
            </div>
          </div>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Case Number */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FileText className="w-4 h-4 mr-2 text-gray-400" />
                  Case Number
                </label>
                <input
                  name="case_number"
                  value={form.case_number}
                  onChange={handleChange}
                  placeholder="E.g., LA/2024/001"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Unique identifier for the case</p>
              </div>

              {/* Client Name */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 mr-2 text-gray-400" />
                  Client Name
                </label>
                <input
                  name="client_name"
                  value={form.client_name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                  Phone Number
                </label>
                <input
                  name="phone_number"
                  value={form.phone_number}
                  onChange={handleChange}
                  placeholder="Enter 10-digit mobile number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Format: 9876543210</p>
              </div>

              {/* Case Type */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                  Case Type
                </label>
                <select
                  name="case_type"
                  value={form.case_type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors bg-white"
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

           
          </div>

          {/* Form Footer */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                <p>All fields marked with * are required</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setForm({
                      case_number: "",
                      client_name: "",
                      phone_number: "",
                      case_type: "",
                    });
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isSubmitting}
                >
                  Clear Form
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding Client...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      Add Client
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Form Tips */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">Case Number Format</h4>
          <p className="text-sm text-blue-700">Use consistent format: LA/Year/Sequence (e.g., LA/2024/001)</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-lg p-4">
          <h4 className="font-medium text-green-800 mb-2">Client Information</h4>
          <p className="text-sm text-green-700">Ensure client name matches official documents</p>
        </div>
        <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
          <h4 className="font-medium text-purple-800 mb-2">Case Type</h4>
          <p className="text-sm text-purple-700">Select the most relevant category for proper classification</p>
        </div>
      </div>
    </div>
  );
};

export default AddClient;