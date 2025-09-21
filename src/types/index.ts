// Timer state and configuration types
export interface PomodoroState {
  phase: 'work' | 'shortBreak' | 'longBreak';
  timeRemaining: number; // seconds
  isActive: boolean;
  isPaused: boolean;
  sessionsCompleted: number;
  currentCycle: number; // 1-4, resets after long break
  sessionStartTime: number; // Track the original duration for progress calculation
}

export interface AnimationProgress {
  stage: 'seed' | 'sprout' | 'leaves' | 'bud' | 'bloom';
  progress: number; // 0-1 within current stage
  overallProgress: number; // 0-1 for entire session
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
