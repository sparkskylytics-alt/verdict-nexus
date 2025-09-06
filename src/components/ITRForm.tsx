import React, { useState, useEffect } from 'react';
import { useITR } from '../hooks/useITR';
import { AlertCircle, CheckCircle, Loader } from 'lucide-react';

interface ITRFormProps {
  onClose: () => void;
}

const ITRForm: React.FC<ITRFormProps> = ({ onClose }) => {
  const { submitITR, getRequirements, loading, error } = useITR();
  const [requirements, setRequirements] = useState<any>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    pan: '',
    financialYear: '2023-24',
    incomeType: 'Salary',
    grossIncome: '',
    documents: [] as string[]
  });

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const data = await getRequirements();
        setRequirements(data);
      } catch (err) {
        console.error('Failed to fetch requirements:', err);
      }
    };
    fetchRequirements();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitITR({
        ...formData,
        grossIncome: Number(formData.grossIncome)
      });
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (err) {
      console.error('Failed to submit ITR:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Submission Successful!</h3>
            <p className="text-gray-600">Your ITR application has been received. We'll process it shortly.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">ITR Filing Form</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="pan">
              PAN Number
            </label>
            <input
              type="text"
              id="pan"
              name="pan"
              required
              pattern="[A-Z]{5}[0-9]{4}[A-Z]"
              title="Enter valid PAN number (e.g., ABCDE1234F)"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={formData.pan}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="incomeType">
              Income Type
            </label>
            <select
              id="incomeType"
              name="incomeType"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={formData.incomeType}
              onChange={handleChange}
            >
              <option value="Salary">Salary</option>
              <option value="Business">Business</option>
              <option value="Professional">Professional</option>
              <option value="Capital Gains">Capital Gains</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="grossIncome">
              Gross Income (₹)
            </label>
            <input
              type="number"
              id="grossIncome"
              name="grossIncome"
              required
              min="0"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={formData.grossIncome}
              onChange={handleChange}
            />
          </div>

          {requirements && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <h4 className="font-semibold text-gray-700 mb-2">Required Documents:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {requirements.documents.map((doc: string, index: number) => (
                  <li key={index}>{doc}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-primary-600 text-white rounded-md font-semibold hover:bg-primary-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </span>
            ) : (
              'Submit ITR Application'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ITRForm;