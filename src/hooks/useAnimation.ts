import { useMemo } from 'react';
import type { AnimationProgress } from '../types';
import { calculateProgress, getFlowerStage, getStageProgress, getGranularProgress, FLOWER_STAGES } from '../utils/timer';

interface UseAnimationProps {
  timeRemaining: number;
  phase: 'work' | 'shortBreak' | 'longBreak';
  sessionStartTime?: number; // Add this to track the original session duration
  wasWorkCompleted?: boolean; // New prop to track if we just completed a work session
}

export function useAnimation({ timeRemaining, phase, sessionStartTime, wasWorkCompleted }: UseAnimationProps): AnimationProgress {
  return useMemo(() => {
    // Only animate during work sessions, BUT persist final bloom if work was just completed
    if (phase !== 'work' && !wasWorkCompleted) {
      const seedStage = FLOWER_STAGES[0];
      return {
        stage: 'seed',
        progress: 0,
        overallProgress: 0,
        granularData: {
          overallProgress: 0,
          currentStage: seedStage,
          stageProgress: 0,
          totalPixels: 0,
          pixelsPerStage: 0,
          currentPixelIndex: 0,
          pixelsInCurrentStage: 0,
          elapsedSeconds: 0,
          shouldShowNewPixel: false,
          pixelInterval: 1,
        },
      };
    }

    // If work was completed, show final bloom state even during break
    if (phase !== 'work' && wasWorkCompleted) {
      const totalDuration = sessionStartTime || 600; // Use a reasonable default
      const granularData = getGranularProgress(0, totalDuration); // 0 time remaining = completed
      
      return {
        stage: 'bloom',
        progress: 1, // 100% progress
        overallProgress: 1,
        granularData: {
          ...granularData,
          pixelsInCurrentStage: granularData.pixelsPerStage, // Show all pixels
          elapsedSeconds: totalDuration, // Full elapsed time
        },
      };
    }

    // Use sessionStartTime if provided, otherwise fall back to timeRemaining
    const totalDuration = sessionStartTime || timeRemaining;
    const overallProgress = calculateProgress(timeRemaining, totalDuration);
    
    // When timer completes, ensure we stay at 100% progress
    const finalProgress = timeRemaining <= 0 ? 1 : overallProgress;
    
    const currentStage = getFlowerStage(finalProgress);
    const stageProgress = getStageProgress(finalProgress);
    const granularData = getGranularProgress(timeRemaining, totalDuration);

    return {
      stage: currentStage.name,
      progress: stageProgress,
      overallProgress: finalProgress,
      granularData,
    };
  }, [timeRemaining, phase, sessionStartTime, wasWorkCompleted]);
}
