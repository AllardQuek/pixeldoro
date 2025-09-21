import React from 'react';

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
  
  // Simple flower definition - just 15 pixels total in a clear progression
  const fullFlower = [
    // Stem (pixels 0-2)
    ['stem', 1, 2], ['stem', 2, 2], ['stem', 3, 2],
    
    // Leaves (pixels 3-4)
    ['leaf', 3, 1], ['leaf', 3, 3],
    
    // Bloom 3x3 grid (pixels 5-13) - yellow center + 8 pink petals
    ['petal', 4, 1], ['petal', 4, 2], ['petal', 4, 3],     // bottom row
    ['petal', 5, 1], ['center-bright', 5, 2], ['petal', 5, 3], // middle row
    ['petal', 6, 1], ['petal', 6, 2], ['petal', 6, 3],     // top row
  ];

  // How many pixels to show based on timer progress
  const pixelsToShow = granularData && granularData.totalPixels > 0
    ? Math.floor((granularData.currentPixelIndex / granularData.totalPixels) * fullFlower.length)
    : 0;
  
  // Create grid
  const grid = Array(7).fill(null).map(() => Array(5).fill(null));
  
  // Always show soil
  for (let i = 0; i < 5; i++) {
    grid[0][i] = 'soil';
  }
  
  // Add pixels progressively
  for (let i = 0; i < pixelsToShow && i < fullFlower.length; i++) {
    const [type, row, col] = fullFlower[i];
    if (grid[row as number] && grid[row as number][col as number] !== undefined) {
      grid[row as number][col as number] = type as string;
    }
  }

  return (
    <div className="pixel-flower-container">
      {/* Debug info */}
      {showDebugInfo && granularData && (
        <div style={{ fontSize: '10px', color: 'white', position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, background: 'rgba(0,0,0,0.5)', padding: '8px 12px', borderRadius: '4px', whiteSpace: 'nowrap', minWidth: '200px', textAlign: 'center' }}>
          Timer: {granularData.currentPixelIndex}/{granularData.totalPixels} → 
          Flower: {pixelsToShow}/{fullFlower.length} | 
          Elapsed: {granularData.elapsedSeconds}s
        </div>
      )}
      
      <div className="pixel-flower">
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
