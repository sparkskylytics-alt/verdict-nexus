import { useState } from "react";
import { useSiteContent } from "../content/SiteContent";

interface DisclaimerModalProps {
  onAccept: () => void;
}

export default function DisclaimerModal({ onAccept }: DisclaimerModalProps) {
  const { disclaimerSection: d } = useSiteContent();
  const [checked, setChecked] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white w-full max-w-2xl md:max-w-3xl rounded-lg shadow-lg p-5 md:p-8 max-h-[85vh] overflow-y-auto">

        {/* Title */}
        <h2 className="text-lg md:text-2xl font-semibold mb-4 text-blue-600 text-center">
          {d.title}
        </h2>

        {/* Text */}
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
          {d.text}
        </p>

        {/* Checkbox */}
        <label className="flex items-center gap-2 cursor-pointer text-sm md:text-base">
          <input 
            type="checkbox" 
            checked={checked} 
            onChange={() => setChecked(!checked)} 
            className="w-4 h-4"
          />
          <span>{d.checkboxLabel}</span>
        </label>

        {/* Button */}
        <button
          disabled={!checked}
          onClick={onAccept}
          className={`mt-5 w-full py-3 rounded-lg text-white text-sm md:text-base font-medium ${
            checked ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {d.buttonLabel}
        </button>

      </div>
    </div>
  );
}
