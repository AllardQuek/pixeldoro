import React from 'react';

interface DevControlsProps {
  onSetTime: (seconds: number) => void;
  isDevelopmentMode: boolean;
}

export const DevControls: React.FC<DevControlsProps> = ({ onSetTime, isDevelopmentMode }) => {
  if (!isDevelopmentMode) return null;

  return (
    <div className="dev-controls">
      <div className="dev-controls__label">🔧 Dev Mode</div>
      <div className="dev-controls__buttons">
        <button onClick={() => onSetTime(5)} className="dev-controls__btn">5s</button>
        <button onClick={() => onSetTime(10)} className="dev-controls__btn">10s</button>
        <button onClick={() => onSetTime(30)} className="dev-controls__btn">30s</button>
        <button onClick={() => onSetTime(60)} className="dev-controls__btn">1m</button>
      </div>
    </div>
  );
};
