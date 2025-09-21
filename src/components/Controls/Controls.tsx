import React from 'react';
import type { PomodoroState } from '../../types';

interface ControlsProps {
  state: PomodoroState;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkipBreak: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ 
  state, 
  onStart, 
  onPause, 
  onReset, 
  onSkipBreak 
}) => {
  const { isActive, isPaused, phase } = state;
  
  const getPrimaryButtonText = () => {
    if (!isActive && !isPaused) return 'Start';
    if (isPaused) return 'Resume';
    if (isActive) return 'Pause';
    return 'Start';
  };

  const handlePrimaryAction = () => {
    if (isActive) {
      onPause();
    } else {
      onStart();
    }
  };

  const showSkipBreak = phase !== 'work' && !isActive;

  return (
    <div className="controls">
      <button 
        className="controls__primary"
        onClick={handlePrimaryAction}
        type="button"
      >
        {getPrimaryButtonText()}
      </button>
      
      <button 
        className="controls__secondary"
        onClick={onReset}
        type="button"
        disabled={!isActive && !isPaused}
      >
        Reset
      </button>
      
      {showSkipBreak && (
        <button 
          className="controls__skip"
          onClick={onSkipBreak}
          type="button"
        >
          Skip Break
        </button>
      )}
    </div>
  );
};
