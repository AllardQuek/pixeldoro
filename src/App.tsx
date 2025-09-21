import { useState } from 'react';
import { usePomodoro } from './hooks/usePomodoro';
import { useAnimation } from './hooks/useAnimation';
import { useTimelinePreview } from './hooks/useTimelinePreview';
import { useTheme } from './hooks/useTheme';
import { Timer } from './components/Timer';
import { Controls } from './components/Controls';
import { FlowerAnimation } from './components/FlowerAnimation';
import { ThemeSelector } from './components/ThemeSelector';
import { DevControls } from './components/DevControls';
import './App.css';

function App() {
  const [isDebugMode, setIsDebugMode] = useState(false);
  const theme = useTheme();
  const { state, controls } = usePomodoro();
  const animation = useAnimation({ 
    timeRemaining: state.timeRemaining, 
    phase: state.phase,
    sessionStartTime: state.sessionStartTime,
    wasWorkCompleted: state.wasWorkCompleted
  });

  const timeline = useTimelinePreview();

  // Use preview states when timeline slider is active, otherwise use real states
  const displayState = timeline.isPreviewActive && timeline.previewTimerState 
    ? timeline.previewTimerState 
    : state;
  
  const displayAnimation = timeline.isPreviewActive && timeline.previewAnimation 
    ? timeline.previewAnimation 
    : animation;

  return (
    <div className="app">
      {/* Debug Toggle - Top Right */}
      <button 
        className="app__debug-toggle"
        onClick={() => setIsDebugMode(!isDebugMode)}
        title={isDebugMode ? 'Hide debug tools' : 'Show debug tools'}
      >
        {isDebugMode ? '🔧' : '⚙️'}
      </button>

      <header className="app__header">
        <h1 className="app__title">🌸 Bloom Pomodoro</h1>
        <p className="app__subtitle">Focus • Grow • Bloom</p>
        
        {/* Theme Selector in header */}
        <ThemeSelector 
          currentTheme={theme.currentTheme}
          availableThemes={theme.availableThemes}
          isRandomized={theme.isRandomized}
          onThemeSelect={theme.selectTheme}
          onRandomize={theme.randomizeTheme}
        />
      </header>
      
      <main className="app__main">
        <div className="app__animation">
          <FlowerAnimation 
            animation={displayAnimation} 
            timerState={displayState}
            theme={theme.currentTheme}
            showDebugInfo={isDebugMode}
          />
        </div>
        
        <div className="app__timer">
          <Timer state={displayState} />
        </div>
        
        <div className="app__controls">
          <Controls 
            state={state} // Always use real state for controls
            onStart={controls.start}
            onPause={controls.pause}
            onReset={controls.reset}
            onSkipBreak={controls.skipBreak}
          />
        </div>
        
        {isDebugMode && (
          <div className="app__dev-controls">
            <DevControls 
              isDevelopmentMode={true} // Enable for timeline feature
              onTimelineChange={timeline.handleTimelineChange}
              totalDuration={state.sessionStartTime}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
