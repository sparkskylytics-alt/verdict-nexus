import { useEffect, useState } from "react";
import { RefreshCw, CheckCircle, XCircle } from "lucide-react";

interface Props {
  onVerify: (ok: boolean) => void;
}

const AlphaNumericCaptcha: React.FC<Props> = ({ onVerify }) => {
  const [captcha, setCaptcha] = useState("");
  const [input, setInput] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    // Generate 6-character alphanumeric + special characters captcha
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789@#$%&*";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
    setInput("");
    setIsVerified(false);
    setError("");
    onVerify(false);
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    setError("");
    
    if (value.length === captcha.length) {
      const correct = value === captcha;
      setIsVerified(correct);
      onVerify(correct);
      
      if (!correct) {
        setError("Captcha doesn't match. Please try again.");
      }
    } else {
      setIsVerified(false);
      onVerify(false);
    }
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Security Verification</h3>
        <button
          type="button"
          onClick={generateCaptcha}
          className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          Generate New
        </button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-center bg-white border border-gray-300 rounded-lg p-4 mb-4">
          <span className="text-3xl font-bold tracking-widest bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
            {captcha.split('').map((char, i) => (
              <span
                key={i}
                className="inline-block mx-1"
                style={{
                  transform: `rotate(${Math.random() * 10 - 5}deg)`,
                }}
              >
                {char}
              </span>
            ))}
          </span>
        </div>

        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Enter the characters exactly as shown above"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
              isVerified
                ? 'border-green-500 focus:ring-green-200 bg-green-50'
                : error
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:ring-primary-200'
            }`}
            maxLength={6}
          />
          
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {input.length === captcha.length && (
              <>
                {isVerified ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
              </>
            )}
          </div>
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <XCircle className="w-4 h-4 mr-1" />
            {error}
          </p>
        )}

        {isVerified && (
          <p className="mt-2 text-sm text-green-600 flex items-center">
            <CheckCircle className="w-4 h-4 mr-1" />
            Captcha verified successfully
          </p>
        )}
      </div>

      <div className="text-xs text-gray-500 space-y-1">
        <p>• Enter the characters exactly as shown (case-sensitive)</p>
        <p>• Refresh if characters are unclear</p>
        <p>• This helps prevent automated searches</p>
      </div>
    </div>
  );
};

export default AlphaNumericCaptcha;