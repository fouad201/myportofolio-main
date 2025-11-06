import { useState, useEffect, createContext, useContext } from 'react';
import { motion } from 'framer-motion';

// Create a context for sound settings
export const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    // Load sound preference from localStorage
    const savedPref = localStorage.getItem('soundEnabled');
    if (savedPref !== null) {
      setSoundEnabled(savedPref === 'true');
    }
  }, []);

  const toggleSound = () => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    localStorage.setItem('soundEnabled', newValue.toString());
    
    // Play a test sound when enabling
    if (newValue) {
      playSound('enable');
    }
  };

  const playSound = (type) => {
    if (!soundEnabled) return;
    
    // Create simple audio context for sound effects
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Different frequencies for different actions
    const frequencies = {
      click: 800,
      hover: 600,
      success: 1000,
      enable: 700
    };
    
    oscillator.frequency.value = frequencies[type] || 600;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound, playSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};

// Sound Toggle Button Component
const SoundToggle = () => {
  const { soundEnabled, toggleSound } = useSound();

  return (
    <motion.button
      onClick={toggleSound}
      className="fixed bottom-24 right-6 z-50 w-12 h-12 bg-[var(--surface-2)] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={soundEnabled ? "Disable sound effects" : "Enable sound effects"}
      title={soundEnabled ? "Sound On" : "Sound Off"}
    >
      <i className={`bx ${soundEnabled ? 'bx-volume-full' : 'bx-volume-mute'} text-xl`}></i>
    </motion.button>
  );
};

export default SoundToggle;

