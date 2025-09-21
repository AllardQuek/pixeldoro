import { usePomodoro } from './hooks/usePomodoro';
import { useAnimation } from './hooks/useAnimation';
import { useTimelinePreview } from './hooks/useTimelinePreview';
import { Timer } from './components/Timer';
import { Controls } from './components/Controls';
import { FlowerAnimation } from './components/FlowerAnimation';
import { DevControls } from './components/DevControls';
import './App.css';

function App() {
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
      <header className="app__header">
        <h1 className="app__title">🌸 Bloom Pomodoro</h1>
        <p className="app__subtitle">Focus • Grow • Bloom</p>
      </header>
      
      <main className="app__main">
        <div className="app__animation">
          <FlowerAnimation 
            animation={displayAnimation} 
            timerState={displayState}
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
        
        <div className="app__dev-controls">
          <DevControls 
            isDevelopmentMode={true} // Enable for timeline feature
            onTimelineChange={timeline.handleTimelineChange}
            totalDuration={state.sessionStartTime}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
