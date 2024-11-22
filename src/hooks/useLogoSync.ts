import { useState, useEffect } from 'react';

interface LogoState {
  [key: string]: string | null;
}

interface LogoSyncState {
  logos: LogoState;
  selectedBox: string | null;
  drawnBoxes: string[];
}

export function useLogoSync() {
  const [logos, setLogos] = useState<LogoState>({
    logo1: null, logo2: null, logo3: null, logo4: null,
    logo5: null, logo6: null, logo7: null, logo8: null,
  });
  const [selectedBox, setSelectedBox] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnBoxes, setDrawnBoxes] = useState<Set<string>>(new Set());

  // Sync state with localStorage
  useEffect(() => {
    const state: LogoSyncState = {
      logos,
      selectedBox,
      drawnBoxes: Array.from(drawnBoxes),
    };
    localStorage.setItem('logoState', JSON.stringify(state));
  }, [logos, selectedBox, drawnBoxes]);

  // Load initial state
  useEffect(() => {
    const savedState = localStorage.getItem('logoState');
    if (savedState) {
      const state: LogoSyncState = JSON.parse(savedState);
      setLogos(state.logos);
      setSelectedBox(state.selectedBox);
      setDrawnBoxes(new Set(state.drawnBoxes));
    }
  }, []);

  const handleDraw = () => {
    if (isDrawing) return;
    
    setIsDrawing(true);
    setSelectedBox(null);
    
    const availableBoxes = Object.keys(logos).filter(box => !drawnBoxes.has(box));
    if (availableBoxes.length === 0) {
      setIsDrawing(false);
      return;
    }

    let iterations = 15;
    let interval = 80;
    
    const animate = () => {
      if (iterations > 0) {
        const randomIndex = Math.floor(Math.random() * availableBoxes.length);
        setSelectedBox(availableBoxes[randomIndex]);
        iterations--;
        
        interval += 30;
        setTimeout(animate, interval);
      } else {
        const finalBox = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
        setSelectedBox(finalBox);
        setDrawnBoxes(prev => new Set([...prev, finalBox]));
        setIsDrawing(false);
      }
    };
    
    animate();
  };

  const handleReset = () => {
    setDrawnBoxes(new Set());
    setSelectedBox(null);
  };

  return {
    logos,
    setLogos,
    selectedBox,
    isDrawing,
    drawnBoxes,
    handleDraw,
    handleReset,
  };
}