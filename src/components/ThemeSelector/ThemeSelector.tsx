import React from 'react';
import type { BasicTheme } from '../../types';
import './ThemeSelector.css';

interface ThemeSelectorProps {
  currentTheme: BasicTheme;
  availableThemes: BasicTheme[];
  isRandomized: boolean;
  onThemeSelect: (themeId: string) => void;
  onRandomize: () => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  availableThemes,
  isRandomized,
  onThemeSelect,
  onRandomize
}) => {
  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'random') {
      onRandomize();
    } else {
      onThemeSelect(value);
    }
  };

  // Show "random" when in random mode, otherwise show the selected theme ID
  const displayValue = isRandomized ? 'random' : currentTheme.id;

  return (
    <div className="theme-selector">
      <label className="theme-selector__label">Art Style</label>
      <select 
        className="theme-selector__dropdown"
        value={displayValue} 
        onChange={handleThemeChange}
      >
        <option value="random">🎲 Random</option>
        {availableThemes.map(theme => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>
    </div>
  );
};
