import { useEffect, useState } from "react";
import { Upload, FileText, Search, FolderOpen, AlertCircle, CheckCircle, Loader } from "lucide-react";

const UploadOrder = () => {
  const [cases, setCases] = useState<string[]>([]);
  const [selectedCase, setSelectedCase] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch case numbers
  useEffect(() => {
    const fetchCases = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("https://verdictnexus.in/api/get-case-numbers.php");
        const data = await res.json();
        setCases(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching cases:", error);
        setCases([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCases();
  }, []);

  // Filter cases based on search
  const filteredCases = cases.filter(caseNum =>
    caseNum.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const uploadOrder = async () => {
    if (!selectedCase) {
      setUploadStatus({
        success: false,
        message: "Please select a case number"
      });
      return;
    }

    if (!file) {
      setUploadStatus({
        success: false,
        message: "Please select a PDF file to upload"
      });
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);

    try {
      const formData = new FormData();
      formData.append("case_number", selectedCase);
      formData.append("order_file", file);

      const res = await fetch(
        "https://verdictnexus.in/api/upload-order.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const message = await res.text();
      
      setUploadStatus({
        success: res.ok,
        message: message
      });

      // Reset form on success
      if (res.ok) {
        setFile(null);
        setSelectedCase("");
        setTimeout(() => setUploadStatus(null), 5000);
      }
    } catch (error) {
      setUploadStatus({
        success: false,
        message: "Failed to upload. Please try again."
      });
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <FileText className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Court Order</h2>
        <p className="text-gray-600">Upload court orders for existing cases in PDF format</p>
      </div>

      {/* Status Message */}
      {uploadStatus && (
        <div className={`mb-6 p-4 rounded-lg animate-fade-in ${uploadStatus.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {uploadStatus.success ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-500" />
              )}
            </div>
            <div className="ml-3">
              <p className={`font-medium ${uploadStatus.success ? 'text-green-800' : 'text-red-800'}`}>
                {uploadStatus.success ? "Success!" : "Attention Required"}
              </p>
              <p className={`mt-1 text-sm ${uploadStatus.success ? 'text-green-700' : 'text-red-700'}`}>
                {uploadStatus.message}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-8">
          {/* Case Selection Section */}
          <div className="mb-8">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FolderOpen className="w-4 h-4 mr-2 text-gray-400" />
              Select Case
            </label>
            
            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Case Dropdown */}
            <div className="relative">
              <select
                value={selectedCase}
                onChange={(e) => setSelectedCase(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none"
                disabled={isLoading}
              >
                <option value="">Select a case number</option>
                {filteredCases.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="mt-3 flex items-center text-sm text-gray-500">
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Loading cases...
              </div>
            )}

            {/* No Cases Found */}
            {!isLoading && filteredCases.length === 0 && cases.length > 0 && searchTerm && (
              <div className="mt-3 text-sm text-gray-500">
                No cases found matching "{searchTerm}"
              </div>
            )}

            {/* No Cases Available */}
            {!isLoading && cases.length === 0 && (
              <div className="mt-3 text-sm text-yellow-600 bg-yellow-50 p-3 rounded-lg">
                No cases found. Please add clients first.
              </div>
            )}
          </div>

          {/* File Upload Section */}
          <div className="mb-8">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Upload className="w-4 h-4 mr-2 text-gray-400" />
              Upload Court Order (PDF)
            </label>

            {/* File Upload Area */}
            <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              file 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }`}>
              <div className="max-w-xs mx-auto">
                {file ? (
                  <>
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileText className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="font-medium text-gray-900 mb-1">{file.name}</p>
                    <p className="text-sm text-gray-500 mb-4">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Remove File
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-gray-900">
                        Drop your PDF file here
                      </p>
                      <p className="text-sm text-gray-500">
                        or click to browse
                      </p>
                      <p className="text-xs text-gray-400 mt-4">
                        Supports PDF files up to 10MB
                      </p>
                    </div>
                  </>
                )}
              </div>

              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
                id="file-upload"
              />
              {!file && (
                <label
                  htmlFor="file-upload"
                  className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Browse Files
                </label>
              )}
            </div>
          </div>

          {/* Upload Button */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              <p>Ensure the PDF is clear and readable</p>
              <p>Maximum file size: 10MB</p>
            </div>
            <button
              onClick={uploadOrder}
              disabled={isUploading || !selectedCase || !file}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isUploading ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Order
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
          <h4 className="font-medium text-blue-800 mb-3 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            What to Upload
          </h4>
          <ul className="text-sm text-blue-700 space-y-2">
            <li>• Court orders and judgments</li>
            <li>• Interim orders</li>
            <li>• Stay orders</li>
            <li>• Final decrees</li>
            <li>• Bail orders</li>
          </ul>
        </div>

        <div className="bg-green-50 border border-green-100 rounded-lg p-6">
          <h4 className="font-medium text-green-800 mb-3 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Best Practices
          </h4>
          <ul className="text-sm text-green-700 space-y-2">
            <li>• Scan documents in high resolution</li>
            <li>• Ensure all pages are included</li>
            <li>• Verify case number matches</li>
            <li>• Include dates and signatures</li>
            <li>• Use PDF format for consistency</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UploadOrder;