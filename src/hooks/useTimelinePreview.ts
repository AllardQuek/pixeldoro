import { useState, useCallback, useMemo } from 'react';
import type { AnimationProgress, PomodoroState } from '../types';
import { TIMER_CONFIG, getFlowerStage, getStageProgress, getGranularProgress } from '../utils/timer';

export function useTimelinePreview() {
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [isPreviewActive, setIsPreviewActive] = useState(false);

  const handleTimelineChange = useCallback((progress: number) => {
    setTimelineProgress(progress);
    setIsPreviewActive(progress > 0); // Auto-activate preview when slider is moved
  }, []);

  // Generate preview states based on timeline progress
  const previewStates = useMemo(() => {
    if (!isPreviewActive) {
      return {
        previewAnimation: null,
        previewTimerState: null,
      };
    }

    const totalDuration = TIMER_CONFIG.workDuration; // 25 minutes
    const timeRemaining = Math.round((1 - timelineProgress) * totalDuration);
    
    // Create preview timer state
    const previewTimerState: PomodoroState = {
      phase: 'work' as const,
      timeRemaining,
      isActive: false, // Not actually running
      isPaused: false,
      sessionsCompleted: 0,
      currentCycle: 1,
      sessionStartTime: totalDuration,
      wasWorkCompleted: false,
    };

    // Calculate animation state
    const currentStage = getFlowerStage(timelineProgress);
    const stageProgress = getStageProgress(timelineProgress);
    const granularData = getGranularProgress(timeRemaining, totalDuration);

    const previewAnimation: AnimationProgress = {
      stage: currentStage.name,
      progress: stageProgress,
      overallProgress: timelineProgress,
      granularData,
    };

    return {
      previewAnimation,
      previewTimerState,
    };
  }, [isPreviewActive, timelineProgress]);

  return {
    timelineProgress,
    isPreviewActive,
    handleTimelineChange,
    ...previewStates,
  };
}
