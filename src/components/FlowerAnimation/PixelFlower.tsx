import React from 'react';
import { flowerTheme } from '../../data/themes';

interface PixelFlowerProps {
  stage: 'seed' | 'sprout' | 'leaves' | 'bud' | 'bloom';
  progress: number; // 0-1 within current stage
  granularData?: {
    totalPixels: number;
    pixelsPerStage: number;
    currentPixelIndex: number;
    pixelsInCurrentStage: number;
    elapsedSeconds: number;
    shouldShowNewPixel: boolean;
  };
  showDebugInfo?: boolean;
}

export const PixelFlower: React.FC<PixelFlowerProps> = ({ granularData, showDebugInfo = false }) => {
  
  // Use theme data instead of hard-coded array
  const currentTheme = flowerTheme;
  const themePixels = currentTheme.pixels;

  // How many pixels to show based on timer progress
  const pixelsToShow = granularData && granularData.totalPixels > 0
    ? Math.floor((granularData.currentPixelIndex / granularData.totalPixels) * themePixels.length)
    : 0;
  
  // Create grid using theme dimensions
  const grid = Array(currentTheme.gridSize.height).fill(null).map(() => Array(currentTheme.gridSize.width).fill(null));
  
  // Add progressive pixels - all pixels build over time, including base/soil
  for (let i = 0; i < pixelsToShow && i < themePixels.length; i++) {
    const pixel = themePixels[i];
    if (grid[pixel.row] && grid[pixel.row][pixel.col] !== undefined) {
      grid[pixel.row][pixel.col] = pixel.type;
    }
  }

  return (
    <div className="pixel-art-container">
      {/* Debug info */}
      {showDebugInfo && granularData && (
        <div style={{ fontSize: '10px', color: 'white', position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, background: 'rgba(0,0,0,0.5)', padding: '8px 12px', borderRadius: '4px', whiteSpace: 'nowrap', minWidth: '200px', textAlign: 'center' }}>
          Timer: {granularData.currentPixelIndex}/{granularData.totalPixels} → 
          Theme: {pixelsToShow}/{themePixels.length} ({currentTheme.name}) | 
          Elapsed: {granularData.elapsedSeconds}s
        </div>
      )}
      
      <div className="pixel-art-grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="pixel-row">
            {row.map((cellType, colIndex) => (
              <div 
                key={`${rowIndex}-${colIndex}`}
                className={cellType ? `pixel ${cellType}` : 'pixel'}
                style={{ opacity: cellType ? 1 : 0 }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
