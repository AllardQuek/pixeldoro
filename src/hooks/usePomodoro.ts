import { useReducer, useEffect, useCallback, useRef } from 'react';
import type { PomodoroState, TimerAction } from '../types';
import { TIMER_CONFIG, formatTimeForTitle } from '../utils/timer';

// Initial state
const initialState: PomodoroState = {
  phase: 'work',
  timeRemaining: TIMER_CONFIG.workDuration,
  isActive: false,
  isPaused: false,
  sessionsCompleted: 0,
  currentCycle: 1,
  sessionStartTime: TIMER_CONFIG.workDuration,
};

// Timer reducer
function pomodoroReducer(state: PomodoroState, action: TimerAction): PomodoroState {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        isActive: true,
        isPaused: false,
      };

    case 'PAUSE':
      return {
        ...state,
        isActive: false,
        isPaused: true,
      };

    case 'RESET':
      return {
        ...initialState,
        sessionsCompleted: state.sessionsCompleted,
        currentCycle: state.currentCycle,
        sessionStartTime: TIMER_CONFIG.workDuration,
      };

    case 'TICK': {
      if (!state.isActive || state.timeRemaining <= 0) {
        return state;
      }
      
      const newTimeRemaining = state.timeRemaining - 1;
      
      if (newTimeRemaining <= 0) {
        // Session completed, trigger completion
        return {
          ...state,
          timeRemaining: 0,
          isActive: false,
        };
      }
      
      return {
        ...state,
        timeRemaining: newTimeRemaining,
      };
    }

    case 'COMPLETE_SESSION': {
      const isWorkSession = state.phase === 'work';
      
      if (isWorkSession) {
        const newSessionsCompleted = state.sessionsCompleted + 1;
        const newCurrentCycle = state.currentCycle + 1;
        
        // Determine next phase
        const shouldTakeLongBreak = newCurrentCycle > TIMER_CONFIG.cyclesBeforeLongBreak;
        const nextPhase = shouldTakeLongBreak ? 'longBreak' : 'shortBreak';
        const nextDuration = shouldTakeLongBreak 
          ? TIMER_CONFIG.longBreakDuration 
          : TIMER_CONFIG.shortBreakDuration;
        
        return {
          ...state,
          phase: nextPhase,
          timeRemaining: nextDuration,
          sessionStartTime: nextDuration, // Track starting time for breaks
          isActive: false,
          isPaused: false,
          sessionsCompleted: newSessionsCompleted,
          currentCycle: shouldTakeLongBreak ? 1 : newCurrentCycle,
        };
      } else {
        // Break completed, return to work
        return {
          ...state,
          phase: 'work',
          timeRemaining: TIMER_CONFIG.workDuration,
          sessionStartTime: TIMER_CONFIG.workDuration,
          isActive: false,
          isPaused: false,
        };
      }
    }

    case 'SKIP_BREAK':
      if (state.phase !== 'work') {
        return {
          ...state,
          phase: 'work',
          timeRemaining: TIMER_CONFIG.workDuration,
          sessionStartTime: TIMER_CONFIG.workDuration,
          isActive: false,
          isPaused: false,
        };
      }
      return state;

    case 'SET_TIME': {
      return {
        ...state,
        phase: 'work', // Always set to work phase for dev testing
        timeRemaining: action.payload,
        sessionStartTime: action.payload, // Track the starting duration
        isActive: false,
        isPaused: false,
      };
    }

    default:
      return state;
  }
}

export function usePomodoro() {
  const [state, dispatch] = useReducer(pomodoroReducer, initialState);
  const intervalRef = useRef<number | null>(null);

  // Timer tick effect
  useEffect(() => {
    if (state.isActive) {
      intervalRef.current = window.setInterval(() => {
        dispatch({ type: 'TICK' });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.isActive]);

  // Update document title
  useEffect(() => {
    if (state.isActive) {
      document.title = formatTimeForTitle(state.timeRemaining, state.phase);
    } else {
      document.title = 'Bloom Pomodoro Timer';
    }
  }, [state.timeRemaining, state.phase, state.isActive]);

  // Handle session completion
  useEffect(() => {
    if (state.timeRemaining === 0 && !state.isActive) {
      dispatch({ type: 'COMPLETE_SESSION' });
    }
  }, [state.timeRemaining, state.isActive]);

  // Control functions
  const start = useCallback(() => {
    dispatch({ type: 'START' });
  }, []);

  const pause = useCallback(() => {
    dispatch({ type: 'PAUSE' });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const skipBreak = useCallback(() => {
    dispatch({ type: 'SKIP_BREAK' });
  }, []);

  const setTime = useCallback((seconds: number) => {
    dispatch({ type: 'SET_TIME', payload: seconds });
  }, []);

  return {
    state,
    controls: {
      start,
      pause,
      reset,
      skipBreak,
      setTime,
    },
  };
}
