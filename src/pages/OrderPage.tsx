import { useState, useEffect } from "react";
import { Search, FileText, Download, Eye, RefreshCw, Scale } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const OrdersPage = () => {
  const [caseNumber, setCaseNumber] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 5; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    setCaptcha(result);
    setCaptchaInput("");
  };

  useEffect(() => { generateCaptcha(); }, []);

  const searchOrders = async () => {
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
        `https://verdictnexus.in/api/get-orders.php?case_number=${encodeURIComponent(caseNumber)}`
      );

      const data = await res.json();
      if (data.error) setError(data.error);
      else setOrders(data.orders || []);
      setSearched(true);
    } catch {
      setError("Failed to search. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-montserrat">
      <Navbar scrolled={false} />
      
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header with theme colors */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#5C6F7A]/10 rounded-full mb-4 border border-[#5C6F7A]/20">
              <Scale className="w-8 h-8 text-[#5C6F7A]" />
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-[#2F3336]">Court Orders Search</h1>
            <div className="w-14 h-[2px] bg-[#5C6F7A] mx-auto mt-3"></div>
            <p className="text-[#5C6F7A] text-sm mt-3">Search and access court documents</p>
          </div>

          {/* Search Card - Themed */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-lg font-semibold text-[#2F3336] mb-6 flex items-center">
              <Search className="w-5 h-5 mr-2 text-[#5C6F7A]" />
              Search Parameters
            </h2>

            {/* Case Number Input */}
            <div className="mb-6">
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
              onClick={searchOrders}
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
                  Search Orders
                </>
              )}
            </button>
          </div>

          {/* Results - Themed */}
          {searched && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-semibold text-[#2F3336]">Search Results</h2>
                  <p className="text-[#5C6F7A] text-sm mt-1">
                    Found {orders.length} document{orders.length !== 1 ? 's' : ''}
                  </p>
                </div>
                {orders.length > 0 && (
                  <span className="px-3 py-1 bg-[#5C6F7A]/10 text-[#5C6F7A] text-xs font-medium rounded-full border border-[#5C6F7A]/20">
                    Legal Documents
                  </span>
                )}
              </div>

              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order, index) => {
                    const isImage = order.order_file_path?.match(/\.(jpg|jpeg|png|gif|webp)$/i);
                    const fileName = order.order_file_path?.split('/').pop() || `Document ${index + 1}`;

                    return (
                      <div 
                        key={index} 
                        className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all duration-300 hover:-translate-y-1 bg-white"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="flex items-start space-x-4">
                            <div className={`p-3 rounded-lg ${isImage ? 'bg-green-100' : 'bg-[#5C6F7A]/10'}`}>
                              {isImage ? (
                                <Eye className="w-5 h-5 text-green-600" />
                              ) : (
                                <FileText className="w-5 h-5 text-[#5C6F7A]" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium text-[#2F3336] mb-1">{fileName}</h3>
                              {order.case_type && (
                                <span className="inline-block px-2 py-1 bg-gray-100 text-[#5C6F7A] text-xs rounded">
                                  {order.case_type}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2 sm:self-center">
                            <a
                              href={order.order_file_path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-[#5C6F7A] text-white text-xs font-medium rounded-lg hover:bg-[#6F848F] transition-all duration-300 hover:scale-105 flex items-center"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </a>
                            <a
                              href={order.order_file_path}
                              download
                              className="px-4 py-2 border border-[#5C6F7A] text-[#5C6F7A] text-xs font-medium rounded-lg hover:bg-[#5C6F7A] hover:text-white transition-all duration-300 hover:scale-105 flex items-center"
                            >
                              <Download className="w-3 h-3 mr-1" />
                              Save
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-10 h-10 text-[#5C6F7A]/40" />
                  </div>
                  <h3 className="text-lg font-medium text-[#2F3336] mb-2">No Orders Found</h3>
                  <p className="text-[#5C6F7A] text-sm max-w-md mx-auto">
                    No orders found for case number "{caseNumber}". Please verify the case number and try again.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Footer - Themed */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <span className="text-sm text-[#2F3336]">Need help?</span>
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

export default OrdersPage;