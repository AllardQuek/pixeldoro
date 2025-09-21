import React from 'react';
import type { AnimationProgress, BasicTheme } from '../../types';
import type { PomodoroState } from '../../types';
import { formatTime } from '../../utils/timer';
import { PixelFlower } from './PixelFlower';
import './PixelArt.css';

interface FlowerAnimationProps {
  animation: AnimationProgress;
  timerState: PomodoroState;
  theme?: BasicTheme;
  showDebugInfo?: boolean;
}

export const FlowerAnimation: React.FC<FlowerAnimationProps> = ({ animation, timerState, theme, showDebugInfo = false }) => {
  const { stage, progress, overallProgress } = animation;
  const { timeRemaining, phase, isActive, isPaused, sessionsCompleted, currentCycle } = timerState;

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
    if (!isActive && !isPaused) return 'Ready';
    if (isPaused) return 'Paused';
    if (isActive) return 'Active';
    return '';
  };

  return (
    <div className="flower-animation">
      <div className="flower__container">
        {/* Pixel art flower - replaces old SVG approach */}
        <PixelFlower 
          stage={stage} 
          progress={progress} 
          theme={theme}
          granularData={animation.granularData} 
          showDebugInfo={showDebugInfo} 
        />
      </div>
      
      <div className="flower__debug">
        {/* Timer section merged with progress info */}
        <div className="flower__timer-section">
          <div className="flower__timer-phase">{getPhaseLabel()}</div>
          <div className="flower__timer-display">{formatTime(timeRemaining)}</div>
          <div className="flower__timer-status">{getStatusText()}</div>
        </div>
        
        {/* Progress info section */}
        <div className="flower__progress-section">
          <div className="flower__stage-info">
            <span className="flower__stage-name">Stage: {stage.charAt(0).toUpperCase() + stage.slice(1)}</span>
            <div className="flower__progress-bar">
              <div 
                className="flower__progress-fill" 
                style={{ width: `${overallProgress * 100}%` }}
              />
            </div>
            <span className="flower__progress-text">{(overallProgress * 100).toFixed(0)}% Complete</span>
          </div>
        </div>
        
        <div className="flower__session-info">
          <span>Session #{sessionsCompleted + 1}</span>
          <span>Cycle {currentCycle}/4</span>
        </div>
      </div>
    </div>
  );
};
