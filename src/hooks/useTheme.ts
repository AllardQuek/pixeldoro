import { useState, useCallback } from 'react';
import { flowerTheme, treeTheme } from '../data/themes';
import type { BasicTheme } from '../types';

const availableThemes = [flowerTheme, treeTheme];

// Get random theme for variety
const getRandomTheme = (): BasicTheme => {
  const randomIndex = Math.floor(Math.random() * availableThemes.length);
  return availableThemes[randomIndex];
};

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<BasicTheme>(() => {
    // Start with random theme for surprise
    return getRandomTheme();
  });
  
  const [isManualSelection, setIsManualSelection] = useState(false);

  // Function to manually select a theme
  const selectTheme = useCallback((themeId: string) => {
    const theme = availableThemes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
      setIsManualSelection(true);
    }
  }, []);

  // Function to get a new random theme
  const randomizeTheme = useCallback(() => {
    const newTheme = getRandomTheme();
    setCurrentTheme(newTheme);
    setIsManualSelection(false);
  }, []);

  // Auto-randomize on new sessions (when user hasn't manually chosen)
  const onNewSession = useCallback(() => {
    if (!isManualSelection) {
      randomizeTheme();
    }
  }, [isManualSelection, randomizeTheme]);

  return {
    currentTheme,
    availableThemes,
    selectTheme,
    randomizeTheme,
    onNewSession,
    isRandomized: !isManualSelection
  };
};
