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

export const PixelFlower: React.FC<PixelFlowerProps> = ({ stage, progress }) => {
  
  // Simple visibility check - stages become visible and stay visible
  const isStageVisible = (targetStage: string) => {
    const stages = ['seed', 'sprout', 'leaves', 'bud', 'bloom'];
    const currentIndex = stages.indexOf(stage);
    const targetIndex = stages.indexOf(targetStage);
    return currentIndex >= targetIndex;
  };

  // Get progress for a specific stage
  const getStageProgress = (targetStage: string) => {
    if (stage === targetStage) return progress;
    if (isStageVisible(targetStage)) return 1;
    return 0;
  };

  return (
    <div className="pixel-flower-container">
      <div className="pixel-flower">
        
        {/* 1. SOIL - Bottom foundation */}
        <div className="pixel-soil">
          <div className="pixel-row">
            <div className="pixel soil"></div>
            <div className="pixel soil"></div>
            <div className="pixel soil"></div>
            <div className="pixel soil"></div>
            <div className="pixel soil"></div>
          </div>
        </div>
        
        {/* 2. STEM - Grows from soil, always visible once sprouted */}
        {isStageVisible('sprout') && (
          <motion.div 
            className="pixel-stem"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: getStageProgress('sprout') }}
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
        )}
        
        {/* 3. LEAVES - Attached to stem, always visible once grown */}
        {isStageVisible('leaves') && (
          <motion.div 
            className="pixel-leaves"
            initial={{ scale: 0 }}
            animate={{ scale: getStageProgress('leaves') }}
          >
            <div className="pixel-row">
              <div className="pixel leaf"></div>
              <div className="pixel"></div>
              <div className="pixel leaf"></div>
            </div>
          </motion.div>
        )}
        
        {/* 4. BUD/BLOOM - Single element that transforms */}
        {isStageVisible('bud') && (
          <motion.div 
            className="pixel-flower-head"
            initial={{ scale: 0 }}
            animate={{ 
              scale: stage === 'bud' ? progress : 1,
              opacity: 1
            }}
          >
            {stage === 'bud' && (
              <>
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
              </>
            )}
            
            {stage === 'bloom' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: progress }}
                className="bloom-content"
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
            )}
          </motion.div>
        )}
        
      </div>
    </div>
  );
};
