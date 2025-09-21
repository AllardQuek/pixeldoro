import React from 'react';
import { motion } from 'framer-motion';

interface PixelFlowerProps {
  stage: 'seed' | 'sprout' | 'leaves' | 'bud' | 'bloom';
  progress: number; // 0-1 within current stage
}

export const PixelFlower: React.FC<PixelFlowerProps> = ({ stage, progress }) => {
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

  const renderSproutStage = () => (
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
      
      {/* Sprout emerging */}
      <motion.div 
        className="pixel-sprout"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: progress }}
        style={{ transformOrigin: 'bottom' }}
      >
        <div className="pixel-row">
          <div className="pixel stem"></div>
        </div>
        <div className="pixel-row">
          <div className="pixel stem"></div>
        </div>
        <div className="pixel-row">
          <div className="pixel stem"></div>
        </div>
      </motion.div>
    </div>
  );

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

  const renderBloomStage = () => (
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
      
      {/* Full bloom */}
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
          <div className="pixel petal"></div>
          <div className="pixel petal"></div>
          <div className="pixel petal"></div>
          <div className="pixel petal"></div>
          <div className="pixel petal"></div>
        </div>
        <div className="pixel-row">
          <div className="pixel petal"></div>
          <div className="pixel center"></div>
          <div className="pixel center"></div>
          <div className="pixel center"></div>
          <div className="pixel petal"></div>
        </div>
        <div className="pixel-row">
          <div className="pixel petal"></div>
          <div className="pixel center"></div>
          <div className="pixel center-bright"></div>
          <div className="pixel center"></div>
          <div className="pixel petal"></div>
        </div>
        <div className="pixel-row">
          <div className="pixel petal"></div>
          <div className="pixel center"></div>
          <div className="pixel center"></div>
          <div className="pixel center"></div>
          <div className="pixel petal"></div>
        </div>
        <div className="pixel-row">
          <div className="pixel petal"></div>
          <div className="pixel petal"></div>
          <div className="pixel petal"></div>
          <div className="pixel petal"></div>
          <div className="pixel petal"></div>
        </div>
      </motion.div>
    </div>
  );

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
