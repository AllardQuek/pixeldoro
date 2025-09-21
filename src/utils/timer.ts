import type { TimerConfig, FlowerStage } from '../types';

// Development mode flag - set to true for testing
export const DEVELOPMENT_MODE = true;

// Timer configuration constants
export const TIMER_CONFIG: TimerConfig = DEVELOPMENT_MODE ? {
  // Development: Much shorter durations for testing
  workDuration: 25, // 25 seconds instead of 25 minutes
  shortBreakDuration: 10, // 10 seconds instead of 5 minutes
  longBreakDuration: 15, // 15 seconds instead of 15 minutes
  cyclesBeforeLongBreak: 4,
} : {
  // Production: Normal pomodoro durations
  workDuration: 25 * 60, // 25 minutes = 1500 seconds
  shortBreakDuration: 5 * 60, // 5 minutes = 300 seconds
  longBreakDuration: 15 * 60, // 15 minutes = 900 seconds
  cyclesBeforeLongBreak: 4,
};

// Flower animation stage configuration
export const FLOWER_STAGES: FlowerStage[] = [
  {
    name: 'seed',
    startPercent: 0,
    endPercent: 20,
    duration: DEVELOPMENT_MODE ? 5 : 5 * 60, // 5 seconds or 5 minutes
  },
  {
    name: 'sprout',
    startPercent: 20,
    endPercent: 40,
    duration: DEVELOPMENT_MODE ? 5 : 5 * 60, // 5 seconds or 5 minutes
  },
  {
    name: 'leaves',
    startPercent: 40,
    endPercent: 60,
    duration: DEVELOPMENT_MODE ? 5 : 5 * 60, // 5 seconds or 5 minutes
  },
  {
    name: 'bud',
    startPercent: 60,
    endPercent: 80,
    duration: DEVELOPMENT_MODE ? 5 : 5 * 60, // 5 seconds or 5 minutes
  },
  {
    name: 'bloom',
    startPercent: 80,
    endPercent: 100,
    duration: DEVELOPMENT_MODE ? 5 : 5 * 60, // 5 seconds or 5 minutes
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
