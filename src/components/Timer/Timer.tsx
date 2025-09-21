import React from 'react';
import { formatTime } from '../../utils/timer';
import type { PomodoroState } from '../../types';

interface TimerProps {
  state: PomodoroState;
}

export const Timer: React.FC<TimerProps> = ({ state }) => {
  const { timeRemaining, phase, isActive, isPaused } = state;
  
  const getPhaseLabel = () => {
    switch (phase) {
      case 'work':
        return 'Focus Time';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
      default:
        return 'Timer';
    }
  };

  const getStatusText = () => {
    if (!isActive && !isPaused) return 'Ready to start';
    if (isPaused) return 'Paused';
    if (isActive) return 'In progress';
    return '';
  };

  return (
    <div className="timer">
      <div className="timer__phase">
        {getPhaseLabel()}
      </div>
      
      <div className="timer__display">
        {formatTime(timeRemaining)}
      </div>
      
      <div className="timer__status">
        {getStatusText()}
      </div>
      
      <div className="timer__progress">
        Session #{state.sessionsCompleted + 1} • Cycle {state.currentCycle}/4
      </div>
    </div>
  );
};
