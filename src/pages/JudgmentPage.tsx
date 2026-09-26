import { useState, useEffect } from "react";
import { Search, Scale, FileText, Download, Eye, RefreshCw, Filter, Gavel } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const JudgmentPage = () => {
  const [caseNumber, setCaseNumber] = useState("");
  const [caseType, setCaseType] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [judgment, setJudgment] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const caseTypes = [
    "Civil Litigation", "Family Law", "Corporate Law", "Real Estate",
    "Criminal Defense", "Intellectual Property", "Constitutional Law",
    "Documentation", "ITR Services", "Other"
  ];

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 5; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    setCaptcha(result);
    setCaptchaInput("");
  };

  useEffect(() => { generateCaptcha(); }, []);

  const searchJudgment = async () => {
    if (!caseNumber.trim()) {
      setError("Please enter case number");
      return;
    }
    if (captchaInput !== captcha) {
      setError("Security code verification failed");
      generateCaptcha();
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://verdictnexus.in/api/get-judgment.php?case_number=${encodeURIComponent(caseNumber)}`
      );

      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setJudgment(null);
      } else {
        setJudgment(data.judgment || null);
      }
      setSearched(true);
    } catch {
      setError("Failed to search. Please try again.");
      setJudgment(null);
    } finally {
      setLoading(false);
    }
  };

  const isImage = judgment?.judgment_file_path?.match(/\.(jpg|jpeg|png|gif|webp)$/i);
  const isPdf = judgment?.judgment_file_path?.match(/\.pdf$/i);
  const fileName = judgment?.judgment_file_path?.split('/').pop() || "Judgment Document";

  return (
    <div className="min-h-screen bg-gray-50 font-montserrat">
      <Navbar scrolled={false} />
      
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header with theme colors */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#5C6F7A]/10 rounded-full mb-4 border border-[#5C6F7A]/20">
              <Gavel className="w-8 h-8 text-[#5C6F7A]" />
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-[#2F3336]">Court Judgment Search</h1>
            <div className="w-14 h-[2px] bg-[#5C6F7A] mx-auto mt-3"></div>
            <p className="text-[#5C6F7A] text-sm mt-3">Search and access final court judgments</p>
          </div>

          {/* Search Card - Themed */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-lg font-semibold text-[#2F3336] mb-6 flex items-center">
              <Search className="w-5 h-5 mr-2 text-[#5C6F7A]" />
              Search Parameters
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Case Number */}
              <div>
                <label className="block text-sm font-medium text-[#2F3336] mb-2">
                  Case Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3.5 w-4 h-4 text-[#5C6F7A]" />
                  <input
                    type="text"
                    placeholder="e.g., LA/2024/001"
                    value={caseNumber}
                    onChange={(e) => { setCaseNumber(e.target.value); setError(""); }}
                    className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#5C6F7A] focus:ring-1 focus:ring-[#5C6F7A] transition-all duration-300 text-sm"
                  />
                </div>
              </div>

              {/* Case Type */}
              <div>
                <label className="block text-sm font-medium text-[#2F3336] mb-2">
                  <Filter className="w-3 h-3 inline mr-1 text-[#5C6F7A]" />
                  Case Type
                </label>
                <select
                  value={caseType}
                  onChange={(e) => setCaseType(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#5C6F7A] focus:ring-1 focus:ring-[#5C6F7A] transition-all duration-300 text-sm"
                >
                  <option value="">Select Case Type</option>
                  {caseTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Captcha - Themed */}
            <div className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-[#2F3336]">Security Verification</h3>
                <button 
                  onClick={generateCaptcha} 
                  className="text-xs text-[#5C6F7A] hover:text-[#2F3336] flex items-center transition-colors"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  New Code
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="bg-white border border-gray-300 rounded-lg p-3 text-center flex-1">
                  <span className="text-xl font-bold tracking-widest text-[#2F3336]">{captcha}</span>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Enter security code"
                    value={captchaInput}
                    onChange={(e) => { setCaptchaInput(e.target.value.toUpperCase()); setError(""); }}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#5C6F7A] focus:ring-1 focus:ring-[#5C6F7A] transition-all duration-300 text-sm uppercase"
                    maxLength={5}
                  />
                  <p className="text-xs text-gray-500 mt-2">Enter code exactly as shown above</p>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
                {error}
              </div>
            )}

            {/* Search Button - Themed */}
            <button
              onClick={searchJudgment}
              disabled={loading}
              className="w-full py-3.5 bg-[#5C6F7A] text-white font-medium rounded-lg hover:bg-[#6F848F] disabled:opacity-70 flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Search Judgment
                </>
              )}
            </button>
          </div>

          {/* Results - Themed */}
          {searched && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-semibold text-[#2F3336]">Search Results</h2>
                  <p className="text-[#5C6F7A] text-sm mt-1">
                    {judgment ? "Judgment found" : "No judgment found"}
                  </p>
                </div>
                {judgment && (
                  <span className="px-3 py-1 bg-[#5C6F7A]/10 text-[#5C6F7A] text-xs font-medium rounded-full border border-[#5C6F7A]/20">
                    Court Judgment
                  </span>
                )}
              </div>

              {judgment ? (
                <div className="space-y-6">
                  {/* Document Card */}
                  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg ${isImage ? 'bg-green-100' : 'bg-[#5C6F7A]/10'}`}>
                          {isImage ? (
                            <Eye className="w-5 h-5 text-green-600" />
                          ) : isPdf ? (
                            <FileText className="w-5 h-5 text-[#5C6F7A]" />
                          ) : (
                            <FileText className="w-5 h-5 text-[#5C6F7A]" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-[#2F3336] mb-1">{fileName}</h3>
                          {judgment.case_type && (
                            <span className="inline-block px-2 py-1 bg-gray-100 text-[#5C6F7A] text-xs rounded">
                              {judgment.case_type}
                            </span>
                          )}
                          <p className="text-xs text-gray-500 mt-2">Final court judgment • Filed in court of law</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                      <a
                        href={judgment.judgment_file_path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 bg-[#5C6F7A] text-white text-sm font-medium rounded-lg hover:bg-[#6F848F] transition-all duration-300 hover:scale-105 flex items-center justify-center"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        {isImage ? 'View Image' : 'View Document'}
                      </a>
                      <a
                        href={judgment.judgment_file_path}
                        download
                        className="flex-1 py-2.5 border border-[#5C6F7A] text-[#5C6F7A] text-sm font-medium rounded-lg hover:bg-[#5C6F7A] hover:text-white transition-all duration-300 hover:scale-105 flex items-center justify-center"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </a>
                    </div>
                  </div>

                  {/* Image Preview */}
                  {isImage && (
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h4 className="font-medium text-[#2F3336] mb-4 flex items-center">
                        <Eye className="w-4 h-4 mr-2 text-[#5C6F7A]" />
                        Document Preview
                      </h4>
                      <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 p-2">
                        <img
                          src={judgment.judgment_file_path}
                          alt="Judgment Preview"
                          className="w-full max-h-96 object-contain rounded"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gavel className="w-10 h-10 text-[#5C6F7A]/40" />
                  </div>
                  <h3 className="text-lg font-medium text-[#2F3336] mb-2">No Judgment Found</h3>
                  <p className="text-[#5C6F7A] text-sm max-w-md mx-auto">
                    No judgment found for case number "{caseNumber}". Please verify the case number and try again.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Info Section - Themed */}
          <div className="mb-6 p-5 bg-[#5C6F7A]/5 rounded-lg border border-[#5C6F7A]/20">
            <h4 className="font-medium text-[#2F3336] mb-2 flex items-center">
              <Gavel className="w-4 h-4 mr-2 text-[#5C6F7A]" />
              About Court Judgments
            </h4>
            <p className="text-sm text-[#5C6F7A] leading-relaxed">
              A court judgment is the final decision in a legal case. It contains the court's ruling,
              reasoning, and any orders or directions issued. Judgments are legally binding and can be
              appealed in higher courts.
            </p>
          </div>

          {/* Footer - Themed */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <span className="text-sm text-[#2F3336]">Need assistance?</span>
              <a 
                href="mailto:Advoctekhojshashi@gmail.com" 
                className="text-sm text-[#5C6F7A] hover:text-[#2F3336] font-medium transition-colors"
              >
                Advoctekhojshashi@gmail.com
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JudgmentPage;