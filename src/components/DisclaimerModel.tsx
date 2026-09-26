import { useState } from "react";

interface DisclaimerModalProps {
  onAccept: () => void;
}

export default function DisclaimerModal({ onAccept }: DisclaimerModalProps) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white w-full max-w-2xl md:max-w-3xl rounded-lg shadow-lg p-5 md:p-8 max-h-[85vh] overflow-y-auto">

        {/* Title */}
        <h2 className="text-lg md:text-2xl font-semibold mb-4 text-blue-600 text-center">
          Disclaimer
        </h2>

        {/* Text */}
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
          The Bar Council of India does not permit advertisement or solicitation by advocates in any form or manner.
          By accessing this website, you acknowledge and confirm that you are seeking information relating to Verdict Nexus
          of your own accord and that there has been no form of solicitation, advertisement or inducement by Verdict Nexus
          or its members. The content of this website is for informational purposes only and should not be interpreted
          as soliciting or advertisement. No material/information provided on this website should be construed as legal
          advice. Verdict Nexus shall not be liable for consequences of any action taken by relying on the material/
          information provided on this website The contents of this website are the intellectual property of Verdict Nexus.
        </p>

        {/* Checkbox */}
        <label className="flex items-center gap-2 cursor-pointer text-sm md:text-base">
          <input 
            type="checkbox" 
            checked={checked} 
            onChange={() => setChecked(!checked)} 
            className="w-4 h-4"
          />
          <span>I accept the above.</span>
        </label>

        {/* Button */}
        <button
          disabled={!checked}
          onClick={onAccept}
          className={`mt-5 w-full py-3 rounded-lg text-white text-sm md:text-base font-medium ${
            checked ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          PROCEED TO WEBSITE
        </button>

      </div>
    </div>
  );
}
