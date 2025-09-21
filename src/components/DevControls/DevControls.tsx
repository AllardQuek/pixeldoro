import React, { useState, useCallback } from 'react';

interface DevControlsProps {
  isDevelopmentMode: boolean;
  onTimelineChange?: (progress: number) => void;
  totalDuration?: number;
}

export const DevControls: React.FC<DevControlsProps> = ({ 
  isDevelopmentMode,
  onTimelineChange,
  totalDuration = 1500 // 25 minutes default
}) => {
  const [timelineProgress, setTimelineProgress] = useState(0);

  const handleTimelineChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const progress = parseFloat(e.target.value);
    setTimelineProgress(progress);
    onTimelineChange?.(progress);
  }, [onTimelineChange]);

  if (!isDevelopmentMode) return null;

  return (
    <div className="dev-controls">
      <div className="dev-controls__label">🔧 Animation Timeline</div>
      
      <div className="dev-controls__timeline">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={timelineProgress}
          onChange={handleTimelineChange}
          className="dev-controls__slider"
        />
        <div className="dev-controls__timeline-labels">
          <span>Seed</span>
          <span>Sprout</span>
          <span>Leaves</span>
          <span>Bud</span>
          <span>Bloom</span>
        </div>
        <div className="dev-controls__timeline-info">
          Progress: {Math.round(timelineProgress * 100)}% 
          ({Math.round((1 - timelineProgress) * totalDuration)}s remaining)
        </div>
      </div>
    </div>
  );
};
