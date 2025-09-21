import React from 'react';
import { motion } from 'framer-motion';

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
}

export const PixelFlower: React.FC<PixelFlowerProps> = ({ stage, progress, granularData }) => {
  
  // Dynamic pixel generation based on duration and progress
  const getPixelOpacity = (pixelIndex: number, isBaseStructure: boolean = false) => {
    if (!granularData) return 1;
    
    const { currentPixelIndex, elapsedSeconds } = granularData;
    
    // Always show base stage structure (soil, seed) to motivate users
    if (isBaseStructure) return 1;
    
    // At timer start (full time remaining = elapsedSeconds is 0), hide progressive elements
    if (elapsedSeconds === 0) return 0;
    
    // Pixels appear progressively during timer
    if (pixelIndex <= currentPixelIndex) return 1;
    return 0; // Future pixels are completely hidden
  };

  // Generate additional detail pixels based on session duration
  const generateDetailPixels = (basePixels: number) => {
    if (!granularData) return [];
    
    const { pixelsPerStage } = granularData;
    
    // Add extra pixels for longer sessions
    const extraPixels = Math.max(0, pixelsPerStage - basePixels);
    return Array.from({ length: extraPixels }, (_, i) => ({
      opacity: getPixelOpacity(basePixels + i),
      delay: i * 0.1,
    }));
  };
  const renderSeedStage = () => (
    <div className="pixel-flower">
      {/* Soil foundation - flat 5-pixel base at bottom */}
      <div className="pixel-soil">
        <div className="pixel-row">
          <div className="pixel soil" style={{ opacity: getPixelOpacity(0, true) }}></div>
          <div className="pixel soil" style={{ opacity: getPixelOpacity(0, true) }}></div>
          <div className="pixel soil" style={{ opacity: getPixelOpacity(0, true) }}></div>
          <div className="pixel soil" style={{ opacity: getPixelOpacity(0, true) }}></div>
          <div className="pixel soil" style={{ opacity: getPixelOpacity(0, true) }}></div>
        </div>
      </div>
    </div>
  );

    const renderSproutStage = () => {
    const baseStemPixels = 3;
    const additionalStemPixels = granularData ? Math.min(3, Math.floor(granularData.pixelsPerStage / 2)) : 0;
    
    return (
      <div className="pixel-flower">
        {/* Soil foundation - same flat 5-pixel base as seed stage */}
        <div className="pixel-soil">
          <div className="pixel-row">
            <div className="pixel soil" style={{ opacity: getPixelOpacity(0, true) }}></div>
            <div className="pixel soil" style={{ opacity: getPixelOpacity(0, true) }}></div>
            <div className="pixel soil" style={{ opacity: getPixelOpacity(0, true) }}></div>
            <div className="pixel soil" style={{ opacity: getPixelOpacity(0, true) }}></div>
            <div className="pixel soil" style={{ opacity: getPixelOpacity(0, true) }}></div>
          </div>
        </div>
        
        {/* Sprout emerging progressively from the seed - centered without grid */}
        <motion.div 
          className="pixel-sprout"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: progress }}
          style={{ 
            transformOrigin: 'bottom',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div className="pixel stem" style={{ opacity: getPixelOpacity(0) }}></div>
          <div className="pixel stem" style={{ opacity: getPixelOpacity(1) }}></div>
          <div className="pixel stem" style={{ opacity: getPixelOpacity(2) }}></div>
          
          {/* Additional stem segments for longer sessions */}
          {Array.from({ length: additionalStemPixels }, (_, i) => (
            <div 
              key={`extra-stem-${i}`}
              className="pixel stem-extra" 
              style={{ opacity: getPixelOpacity(baseStemPixels + i) }}
            ></div>
          ))}
        </motion.div>
      </div>
    );
  };

  const renderLeavesStage = () => (
    <div className="pixel-flower">
      {/* Soil foundation - same flat 5-pixel base as seed stage */}
      <div className="pixel-soil">
        <div className="pixel-row">
          <div className="pixel soil" style={{ opacity: getPixelOpacity(0, true) }}></div>
          <div className="pixel soil" style={{ opacity: getPixelOpacity(0, true) }}></div>
          <div className="pixel soil" style={{ opacity: getPixelOpacity(0, true) }}></div>
          <div className="pixel soil" style={{ opacity: getPixelOpacity(0, true) }}></div>
          <div className="pixel soil" style={{ opacity: getPixelOpacity(0, true) }}></div>
        </div>
      </div>
      
      {/* Stem */}
      <div className="pixel-stem">
        <div className="pixel-row">
          <div className="pixel stem"></div>
        </div>
        <div className="pixel-row">
          <div className="pixel stem"></div>
        </div>
        <div className="pixel-row">
          <div className="pixel stem"></div>
        </div>
      </div>
      
      {/* Leaves appearing */}
      <motion.div 
        className="pixel-leaves"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: progress, scale: progress }}
      >
        <div className="pixel-row">
          <div className="pixel leaf"></div>
          <div className="pixel"></div>
          <div className="pixel leaf"></div>
        </div>
      </motion.div>
    </div>
  );

  const renderBudStage = () => (
    <div className="pixel-flower">
      {/* Soil foundation - same flat 5-pixel base as seed stage */}
      <div className="pixel-soil">
        <div className="pixel-row">
          <div className="pixel soil" style={{ opacity: getPixelOpacity(0, true) }}></div>
          <div className="pixel soil" style={{ opacity: getPixelOpacity(0, true) }}></div>
          <div className="pixel soil" style={{ opacity: getPixelOpacity(0, true) }}></div>
          <div className="pixel soil" style={{ opacity: getPixelOpacity(0, true) }}></div>
          <div className="pixel soil" style={{ opacity: getPixelOpacity(0, true) }}></div>
        </div>
      </div>
      
      {/* Stem */}
      <div className="pixel-stem">
        <div className="pixel-row">
          <div className="pixel stem"></div>
        </div>
        <div className="pixel-row">
          <div className="pixel stem"></div>
        </div>
        <div className="pixel-row">
          <div className="pixel stem"></div>
        </div>
      </div>
      
      {/* Leaves */}
      <div className="pixel-leaves">
        <div className="pixel-row">
          <div className="pixel leaf"></div>
          <div className="pixel"></div>
          <div className="pixel leaf"></div>
        </div>
      </div>
      
      {/* Bud forming */}
      <motion.div 
        className="pixel-bud"
        initial={{ scale: 0 }}
        animate={{ scale: progress }}
      >
        <div className="pixel-row">
          <div className="pixel bud"></div>
          <div className="pixel bud"></div>
          <div className="pixel bud"></div>
        </div>
        <div className="pixel-row">
          <div className="pixel bud"></div>
          <div className="pixel bud-center"></div>
          <div className="pixel bud"></div>
        </div>
      </motion.div>
    </div>
  );

  const renderBloomStage = () => {
    const detailPixels = generateDetailPixels(25); // Base bloom has 25 pixels
    
    return (
      <div className="pixel-flower">
        {/* Soil foundation - same flat 5-pixel base as all stages */}
        <div className="pixel-soil">
          <div className="pixel-row">
            <div className="pixel soil" style={{ opacity: getPixelOpacity(0, true) }}></div>
            <div className="pixel soil" style={{ opacity: getPixelOpacity(0, true) }}></div>
            <div className="pixel soil" style={{ opacity: getPixelOpacity(0, true) }}></div>
            <div className="pixel soil" style={{ opacity: getPixelOpacity(0, true) }}></div>
            <div className="pixel soil" style={{ opacity: getPixelOpacity(0, true) }}></div>
          </div>
        </div>
        
        {/* Stem */}
        <div className="pixel-stem">
          <div className="pixel-row">
            <div className="pixel stem"></div>
          </div>
          <div className="pixel-row">
            <div className="pixel stem"></div>
          </div>
          <div className="pixel-row">
            <div className="pixel stem"></div>
          </div>
        </div>
        
        {/* Leaves */}
        <div className="pixel-leaves">
          <div className="pixel-row">
            <div className="pixel leaf"></div>
            <div className="pixel"></div>
            <div className="pixel leaf"></div>
          </div>
        </div>
        
        {/* Full bloom with dynamic details */}
        <motion.div 
          className="pixel-bloom"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ 
            scale: progress,
            rotate: 0,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="pixel-row">
            <div className="pixel petal" style={{ opacity: getPixelOpacity(0) }}></div>
            <div className="pixel petal" style={{ opacity: getPixelOpacity(1) }}></div>
            <div className="pixel petal" style={{ opacity: getPixelOpacity(2) }}></div>
            <div className="pixel petal" style={{ opacity: getPixelOpacity(3) }}></div>
            <div className="pixel petal" style={{ opacity: getPixelOpacity(4) }}></div>
          </div>
          <div className="pixel-row">
            <div className="pixel petal" style={{ opacity: getPixelOpacity(5) }}></div>
            <div className="pixel center" style={{ opacity: getPixelOpacity(6) }}></div>
            <div className="pixel center" style={{ opacity: getPixelOpacity(7) }}></div>
            <div className="pixel center" style={{ opacity: getPixelOpacity(8) }}></div>
            <div className="pixel petal" style={{ opacity: getPixelOpacity(9) }}></div>
          </div>
          <div className="pixel-row">
            <div className="pixel petal" style={{ opacity: getPixelOpacity(10) }}></div>
            <div className="pixel center" style={{ opacity: getPixelOpacity(11) }}></div>
            <div className="pixel center-bright" style={{ opacity: getPixelOpacity(12) }}></div>
            <div className="pixel center" style={{ opacity: getPixelOpacity(13) }}></div>
            <div className="pixel petal" style={{ opacity: getPixelOpacity(14) }}></div>
          </div>
          <div className="pixel-row">
            <div className="pixel petal" style={{ opacity: getPixelOpacity(15) }}></div>
            <div className="pixel center" style={{ opacity: getPixelOpacity(16) }}></div>
            <div className="pixel center" style={{ opacity: getPixelOpacity(17) }}></div>
            <div className="pixel center" style={{ opacity: getPixelOpacity(18) }}></div>
            <div className="pixel petal" style={{ opacity: getPixelOpacity(19) }}></div>
          </div>
          <div className="pixel-row">
            <div className="pixel petal" style={{ opacity: getPixelOpacity(20) }}></div>
            <div className="pixel petal" style={{ opacity: getPixelOpacity(21) }}></div>
            <div className="pixel petal" style={{ opacity: getPixelOpacity(22) }}></div>
            <div className="pixel petal" style={{ opacity: getPixelOpacity(23) }}></div>
            <div className="pixel petal" style={{ opacity: getPixelOpacity(24) }}></div>
          </div>
          
          {/* Dynamic detail pixels for longer sessions */}
          {detailPixels.map((pixel, i) => (
            <motion.div
              key={`detail-${i}`}
              className="pixel detail-petal"
              style={{ 
                opacity: pixel.opacity,
                position: 'absolute',
                // Distribute around the flower
                left: `${50 + 20 * Math.cos((i / detailPixels.length) * 2 * Math.PI)}%`,
                top: `${50 + 20 * Math.sin((i / detailPixels.length) * 2 * Math.PI)}%`,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: pixel.opacity > 0.5 ? 1 : 0 }}
              transition={{ delay: pixel.delay }}
            />
          ))}
        </motion.div>
      </div>
    );
  };

  const renderStage = () => {
    switch (stage) {
      case 'seed':
        return renderSeedStage();
      case 'sprout':
        return renderSproutStage();
      case 'leaves':
        return renderLeavesStage();
      case 'bud':
        return renderBudStage();
      case 'bloom':
        return renderBloomStage();
      default:
        return renderSeedStage();
    }
  };

  return (
    <div className="pixel-flower-container">
      {renderStage()}
    </div>
  );
};
