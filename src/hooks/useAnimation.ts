import { useMemo } from 'react';
import type { AnimationProgress } from '../types';
import { calculateProgress, getFlowerStage, getStageProgress, getGranularProgress, FLOWER_STAGES } from '../utils/timer';

interface UseAnimationProps {
  timeRemaining: number;
  phase: 'work' | 'shortBreak' | 'longBreak';
  sessionStartTime?: number; // Add this to track the original session duration
}

export function useAnimation({ timeRemaining, phase, sessionStartTime }: UseAnimationProps): AnimationProgress {
  return useMemo(() => {
    // Only animate during work sessions
    if (phase !== 'work') {
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

    // Use sessionStartTime if provided, otherwise fall back to timeRemaining
    const totalDuration = sessionStartTime || timeRemaining;
    const overallProgress = calculateProgress(timeRemaining, totalDuration);
    
    const currentStage = getFlowerStage(overallProgress);
    const stageProgress = getStageProgress(overallProgress);
    const granularData = getGranularProgress(timeRemaining, totalDuration);

    return {
      stage: currentStage.name,
      progress: stageProgress,
      overallProgress,
      granularData,
    };
  }, [timeRemaining, phase, sessionStartTime]);
}
