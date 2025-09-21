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
  const getPixelOpacity = (pixelIndex: number) => {
    if (!granularData) return 1;
    
    const { currentPixelIndex, shouldShowNewPixel } = granularData;
    
    // Pixels appear progressively
    if (pixelIndex <= currentPixelIndex) return 1;
    if (pixelIndex === currentPixelIndex + 1 && shouldShowNewPixel) return 0.7;
    return 0.3; // Future pixels are dimmed
  };

  // Generate additional detail pixels based on session duration
  const generateDetailPixels = (basePixels: number) => {
    if (!granularData) return [];
    
    const { pixelsPerStage, pixelsInCurrentStage } = granularData;
    
    // Add extra pixels for longer sessions
    const extraPixels = Math.max(0, pixelsPerStage - basePixels);
    return Array.from({ length: extraPixels }, (_, i) => ({
      opacity: getPixelOpacity(basePixels + i),
      delay: i * 0.1,
    }));
  };
  const renderSeedStage = () => (
    <motion.div
      className="pixel-flower"
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Soil */}
      <div className="pixel-soil">
        <div className="pixel-row">
          <div className="pixel soil"></div>
          <div className="pixel soil"></div>
          <div className="pixel soil"></div>
          <div className="pixel soil"></div>
          <div className="pixel soil"></div>
        </div>
      </div>
      
      {/* Seed */}
      <div className="pixel-seed">
        <div className="pixel-row">
          <div className="pixel seed"></div>
          <div className="pixel seed"></div>
        </div>
      </div>
    </motion.div>
  );

  const renderSproutStage = () => {
    const baseStemPixels = 3;
    const additionalStemPixels = granularData ? Math.min(3, Math.floor(granularData.pixelsInCurrentStage / 2)) : 0;
    
    return (
      <div className="pixel-flower">
        {/* Soil */}
        <div className="pixel-soil">
          <div className="pixel-row">
            <div className="pixel soil"></div>
            <div className="pixel soil"></div>
            <div className="pixel soil"></div>
            <div className="pixel soil"></div>
            <div className="pixel soil"></div>
          </div>
        </div>
        
        {/* Sprout emerging with dynamic height */}
        <motion.div 
          className="pixel-sprout"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: progress }}
          style={{ transformOrigin: 'bottom' }}
        >
          <div className="pixel-row">
            <div className="pixel stem" style={{ opacity: getPixelOpacity(0) }}></div>
          </div>
          <div className="pixel-row">
            <div className="pixel stem" style={{ opacity: getPixelOpacity(1) }}></div>
          </div>
          <div className="pixel-row">
            <div className="pixel stem" style={{ opacity: getPixelOpacity(2) }}></div>
          </div>
          
          {/* Additional stem segments for longer sessions */}
          {Array.from({ length: additionalStemPixels }, (_, i) => (
            <div key={`extra-stem-${i}`} className="pixel-row">
              <div 
                className="pixel stem-extra" 
                style={{ opacity: getPixelOpacity(baseStemPixels + i) }}
              ></div>
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  const renderLeavesStage = () => (
    <div className="pixel-flower">
      {/* Soil */}
      <div className="pixel-soil">
        <div className="pixel-row">
          <div className="pixel soil"></div>
          <div className="pixel soil"></div>
          <div className="pixel soil"></div>
          <div className="pixel soil"></div>
          <div className="pixel soil"></div>
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
      {/* Soil */}
      <div className="pixel-soil">
        <div className="pixel-row">
          <div className="pixel soil"></div>
          <div className="pixel soil"></div>
          <div className="pixel soil"></div>
          <div className="pixel soil"></div>
          <div className="pixel soil"></div>
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
        {/* Soil */}
        <div className="pixel-soil">
          <div className="pixel-row">
            <div className="pixel soil"></div>
            <div className="pixel soil"></div>
            <div className="pixel soil"></div>
            <div className="pixel soil"></div>
            <div className="pixel soil"></div>
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
        
        {/* Transitioning bud that becomes bloom */}
        <div className="pixel-flower-top" style={{ position: 'relative' }}>
          {/* Bud that fades out as bloom appears */}
          <motion.div 
            className="pixel-bud"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ 
              scale: Math.max(0.5, 1 - progress * 0.5),
              opacity: Math.max(0.3, 1 - progress * 0.7) // Keep some opacity longer
            }}
            style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}
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

          {/* Full bloom that emerges from the bud */}
          <motion.div 
            className="pixel-bloom"
            initial={{ scale: 0, rotate: -10, opacity: 0 }}
            animate={{ 
              scale: progress,
              rotate: 0,
              opacity: progress // Start appearing immediately
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ position: 'relative' }}
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
