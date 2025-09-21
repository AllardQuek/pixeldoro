// Timer state and configuration types
export interface PomodoroState {
  phase: 'work' | 'shortBreak' | 'longBreak';
  timeRemaining: number; // seconds
  isActive: boolean;
  isPaused: boolean;
  sessionsCompleted: number;
  currentCycle: number; // 1-4, resets after long break
  sessionStartTime: number; // Track the original duration for progress calculation
  wasWorkCompleted: boolean; // Track if we just completed a work session
}

// Theme types for pixel art themes
export interface ThemePixel {
  type: string;
  row: number;
  col: number;
}

export interface BasicTheme {
  id: string;
  name: string;
  gridSize: { width: number; height: number };
  pixels: ThemePixel[];
}

export interface AnimationProgress {
  stage: 'seed' | 'sprout' | 'leaves' | 'bud' | 'bloom';
  progress: number; // 0-1 within current stage
  overallProgress: number; // 0-1 for entire session
  granularData?: {
    overallProgress: number;
    currentStage: FlowerStage;
    stageProgress: number;
    totalPixels: number;
    pixelsPerStage: number;
    currentPixelIndex: number;
    pixelsInCurrentStage: number;
    elapsedSeconds: number;
    shouldShowNewPixel: boolean;
    pixelInterval: number;
  };
}

export interface TimerConfig {
  workDuration: number; // 25 minutes = 1500 seconds
  shortBreakDuration: number; // 5 minutes = 300 seconds
  longBreakDuration: number; // 15 minutes = 900 seconds
  cyclesBeforeLongBreak: number; // 4 cycles
}

export type TimerAction = 
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'RESET' }
  | { type: 'TICK' }
  | { type: 'COMPLETE_SESSION' }
  | { type: 'SKIP_BREAK' }
  | { type: 'SET_TIME'; payload: number };

// Animation stage configuration
export interface FlowerStage {
  name: AnimationProgress['stage'];
  startPercent: number;
  endPercent: number;
  duration: number; // in seconds
}

// Notification types
export interface NotificationConfig {
  title: string;
  body: string;
  icon?: string;
  silent?: boolean;
}
