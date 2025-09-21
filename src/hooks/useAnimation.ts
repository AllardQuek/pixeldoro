import { useMemo } from 'react';
import type { AnimationProgress } from '../types';
import { calculateProgress, getFlowerStage, getStageProgress } from '../utils/timer';

interface UseAnimationProps {
  timeRemaining: number;
  phase: 'work' | 'shortBreak' | 'longBreak';
  sessionStartTime?: number; // Add this to track the original session duration
}

export function useAnimation({ timeRemaining, phase, sessionStartTime }: UseAnimationProps): AnimationProgress {
  return useMemo(() => {
    // Only animate during work sessions
    if (phase !== 'work') {
      return {
        stage: 'seed',
        progress: 0,
        overallProgress: 0,
      };
    }

    // Use sessionStartTime if provided, otherwise fall back to timeRemaining
    // This handles the case where we start with custom durations
    const totalDuration = sessionStartTime || timeRemaining;
    const overallProgress = calculateProgress(timeRemaining, totalDuration);
    
    const currentStage = getFlowerStage(overallProgress);
    const stageProgress = getStageProgress(overallProgress);

    return {
      stage: currentStage.name,
      progress: stageProgress,
      overallProgress,
    };
  }, [timeRemaining, phase, sessionStartTime]);
}
