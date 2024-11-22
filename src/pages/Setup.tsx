import React, { useState, useEffect } from "react";
import LogoUploadBox from "../components/LogoUploadBox";
import CopyLink from "../components/CopyLink";
import { useLogoSync } from "../hooks/useLogoSync";

interface LogoState {
  [key: string]: string | null;
}

function Setup() {
  const {
    logos,
    setLogos,
    selectedBox,
    drawnBoxes,
    isDrawing,
    handleDraw,
    handleReset,
  } = useLogoSync();
  const [showCopied, setShowCopied] = useState(false);

  const handleImageSelect = (id: string) => (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setLogos((prev: any) => ({
        ...prev,
        [id]: e.target?.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const availableBoxCount = Object.keys(logos).length - drawnBoxes.size;

  return (
    <div className="min-h-screen py-12 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center mb-12">
          {Object.keys(logos).map((id) => (
            <LogoUploadBox
              key={id}
              id={id}
              image={logos[id]}
              onImageSelect={handleImageSelect(id)}
              isSelected={id === selectedBox}
              isDrawn={drawnBoxes.has(id)}
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex justify-center gap-4">
            <button
              onClick={handleDraw}
              disabled={isDrawing || availableBoxCount === 0}
              className={`px-8 py-3 rounded-lg font-semibold text-white transition-all transform
                ${
                  isDrawing || availableBoxCount === 0
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95"
                }`}
            >
              {isDrawing
                ? "Drawing..."
                : `Draw Random Box (${availableBoxCount} left)`}
            </button>

            <button
              onClick={handleReset}
              disabled={isDrawing || drawnBoxes.size === 0}
              className={`px-8 py-3 rounded-lg font-semibold transition-all transform
                ${
                  isDrawing || drawnBoxes.size === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:scale-105 active:scale-95"
                }`}
            >
              Reset
            </button>
          </div>

          <CopyLink showCopied={showCopied} setShowCopied={setShowCopied} />
        </div>
      </div>
    </div>
  );
}

export default Setup;
