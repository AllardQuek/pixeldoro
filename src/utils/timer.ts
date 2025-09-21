import type { TimerConfig, FlowerStage } from '../types';

// Timer configuration constants
export const TIMER_CONFIG: TimerConfig = {
  workDuration: 25 * 60, // 25 minutes
  shortBreakDuration: 5 * 60, // 5 minutes
  longBreakDuration: 15 * 60, // 15 minutes
  cyclesBeforeLongBreak: 4,
};

// Flower animation stage configuration
export const FLOWER_STAGES: FlowerStage[] = [
  {
    name: 'seed',
    startPercent: 0,
    endPercent: 20,
    duration: 5 * 60, // 5 minutes
  },
  {
    name: 'sprout',
    startPercent: 20,
    endPercent: 40,
    duration: 5 * 60, // 5 minutes
  },
  {
    name: 'leaves',
    startPercent: 40,
    endPercent: 60,
    duration: 5 * 60, // 5 minutes
  },
  {
    name: 'bud',
    startPercent: 60,
    endPercent: 80,
    duration: 5 * 60, // 5 minutes
  },
  {
    name: 'bloom',
    startPercent: 80,
    endPercent: 100,
    duration: 5 * 60, // 5 minutes
  },
];

// Utility functions
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const formatTimeForTitle = (seconds: number, phase: string): string => {
  const timeStr = formatTime(seconds);
  const emoji = phase === 'work' ? '🌱' : '☕';
  return `${emoji} ${timeStr} remaining`;
};

export const calculateProgress = (timeRemaining: number, totalDuration: number): number => {
  return Math.max(0, Math.min(1, (totalDuration - timeRemaining) / totalDuration));
};

export const getFlowerStage = (progress: number): FlowerStage => {
  const progressPercent = progress * 100;
  
  for (const stage of FLOWER_STAGES) {
    if (progressPercent >= stage.startPercent && progressPercent < stage.endPercent) {
      return stage;
    }
  }
  
  // If we're at 100%, return the bloom stage
  return FLOWER_STAGES[FLOWER_STAGES.length - 1];
};

export const getStageProgress = (overallProgress: number): number => {
  const stage = getFlowerStage(overallProgress);
  const progressPercent = overallProgress * 100;
  
  const stageRange = stage.endPercent - stage.startPercent;
  const progressInStage = progressPercent - stage.startPercent;
  
  return Math.max(0, Math.min(1, progressInStage / stageRange));
};

// Enhanced granular progress calculation for per-second pixel changes
export const getGranularProgress = (timeRemaining: number, totalDuration: number) => {
  const overallProgress = calculateProgress(timeRemaining, totalDuration);
  const currentStage = getFlowerStage(overallProgress);
  const stageProgress = getStageProgress(overallProgress);
  
  // Calculate elapsed time
  const elapsedSeconds = totalDuration - timeRemaining;
  
  // Dynamic pixel count based on duration for scalability
  // Use a reasonable base pixel count that scales with duration
  const pixelsPerStage = Math.max(2, Math.floor(totalDuration / (5 * 2))); // 5 stages, 2 seconds per pixel minimum
  const totalPixels = pixelsPerStage * FLOWER_STAGES.length;
  
  // Calculate current pixel index for progressive appearance
  const currentPixelIndex = totalPixels > 0 && totalDuration > 0 
    ? Math.floor((elapsedSeconds / totalDuration) * totalPixels)
    : 0;
  
  // Pixels within current stage
  const pixelsInCurrentStage = timeRemaining <= 0 
    ? pixelsPerStage // Show all pixels when completed
    : Math.floor(stageProgress * pixelsPerStage);
  
  // Ensure completion shows maximum bloom
  const finalPixelsInCurrentStage = (timeRemaining <= 0 && currentStage.name === 'bloom') 
    ? pixelsPerStage 
    : pixelsInCurrentStage;
  
  // Calculate interval for new pixel appearance
  const pixelInterval = totalPixels > 0 ? Math.max(1, Math.floor(totalDuration / totalPixels)) : 1;
  
  return {
    overallProgress,
    currentStage,
    stageProgress,
    totalPixels,
    pixelsPerStage,
    currentPixelIndex,
    pixelsInCurrentStage: finalPixelsInCurrentStage,
    elapsedSeconds,
    shouldShowNewPixel: elapsedSeconds > 0 && elapsedSeconds % pixelInterval === 0,
    pixelInterval, // How often new pixels appear (in seconds)
  };
};
