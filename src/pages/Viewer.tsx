import React, { useEffect, useState } from "react";
import LogoUploadBox from "../components/LogoUploadBox";

interface LogoState {
  [key: string]: string | null;
}

interface LogoSyncState {
  logos: LogoState;
  selectedBox: string | null;
  drawnBoxes: string[];
}

export default function Viewer() {
  const [logos, setLogos] = useState<LogoState>({});
  const [selectedBox, setSelectedBox] = useState<string | null>(null);
  const [drawnBoxes, setDrawnBoxes] = useState<Set<string>>(new Set());

  // Poll localStorage for changes
  useEffect(() => {
    const checkForUpdates = () => {
      const savedState = localStorage.getItem("logoState");
      if (savedState) {
        const state: LogoSyncState = JSON.parse(savedState);
        setLogos(state.logos);
        setSelectedBox(state.selectedBox);
        setDrawnBoxes(new Set(state.drawnBoxes));
      }
    };

    // Initial check
    checkForUpdates();

    // Poll every second
    const interval = setInterval(checkForUpdates, 1000);

    return () => clearInterval(interval);
  }, []);

  // Dummy function since viewer is read-only
  const handleImageSelect = () => {};

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Live Results Viewer
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {Object.keys(logos).map((id) => (
            <LogoUploadBox
              key={id}
              id={id}
              image={logos[id]}
              onImageSelect={handleImageSelect}
              isSelected={id === selectedBox}
              isDrawn={drawnBoxes.has(id)}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
}
