import { useEffect, useState } from "react";
import { Scale, Upload, FileText, Loader } from "lucide-react";

const UploadJudgment = () => {
  const [cases, setCases] = useState<string[]>([]);
  const [selectedCase, setSelectedCase] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://verdictnexus.in/api/get-case-numbers.php")
      .then(res => res.json())
      .then(data => {
        setCases(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch(() => {
        setCases([]);
        setIsLoading(false);
      });
  }, []);

  const uploadJudgment = async () => {
    if (!selectedCase || !file) {
      alert("Please select a case and upload a PDF file");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("case_number", selectedCase);
    formData.append("judgment_file", file);

    try {
      const res = await fetch(
        "https://verdictnexus.in/api/upload-judgment.php",
        { method: "POST", body: formData }
      );
      const message = await res.text();
      alert(message);
      
      if (res.ok) {
        setFile(null);
        setSelectedCase("");
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border p-8">
        <div className="flex items-center mb-8">
          <div className="p-3 bg-purple-100 rounded-lg mr-4">
            <Scale className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Upload Judgment</h2>
            <p className="text-gray-600">Upload final court judgments for cases</p>
          </div>
        </div>

        {/* Warning */}
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-700">
            ⚠️ Note: Only one judgment per case. New uploads will replace existing judgments.
          </p>
        </div>

        {/* Case Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Case Number *
          </label>
          <div className="relative">
            <select
              value={selectedCase}
              onChange={(e) => setSelectedCase(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white appearance-none"
              disabled={isLoading}
            >
              <option value="">Select Case Number</option>
              {cases.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {isLoading && (
              <div className="absolute right-10 top-3">
                <Loader className="w-5 h-5 animate-spin text-gray-400" />
              </div>
            )}
          </div>
        </div>

        {/* File Upload */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Judgment File (PDF) *
          </label>
          <div className={`border-2 ${file ? 'border-purple-500 bg-purple-50' : 'border-dashed border-gray-300'} rounded-lg p-6 text-center transition-colors`}>
            {file ? (
              <div className="space-y-3">
                <FileText className="w-12 h-12 text-purple-500 mx-auto" />
                <div>
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Remove File
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-gray-600">Drag & drop PDF file or</p>
                  <label className="inline-block mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer">
                    Select File
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Upload Button */}
        <button
          onClick={uploadJudgment}
          disabled={isUploading || !selectedCase || !file}
          className="w-full py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isUploading ? (
            <>
              <Loader className="w-5 h-5 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Scale className="w-5 h-5 mr-2" />
              Upload Judgment
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default UploadJudgment;