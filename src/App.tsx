import { usePomodoro } from './hooks/usePomodoro';
import { useAnimation } from './hooks/useAnimation';
import { Timer } from './components/Timer';
import { Controls } from './components/Controls';
import { FlowerAnimation } from './components/FlowerAnimation';
import { DevControls } from './components/DevControls';
import { DEVELOPMENT_MODE } from './utils/timer';
import './App.css';

function App() {
  const { state, controls } = usePomodoro();
  const animation = useAnimation({ 
    timeRemaining: state.timeRemaining, 
    phase: state.phase,
    sessionStartTime: state.sessionStartTime
  });

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">🌸 Bloom Pomodoro</h1>
        <p className="app__subtitle">Focus • Grow • Bloom</p>
      </header>
      
      <main className="app__main">
        <div className="app__animation">
          <FlowerAnimation 
            animation={animation} 
            timerState={state}
          />
        </div>
        
        <div className="app__timer">
          <Timer state={state} />
        </div>
        
        <div className="app__controls">
          <Controls 
            state={state}
            onStart={controls.start}
            onPause={controls.pause}
            onReset={controls.reset}
            onSkipBreak={controls.skipBreak}
          />
        </div>
        
        <div className="app__dev-controls">
          <DevControls 
            onSetTime={controls.setTime}
            isDevelopmentMode={DEVELOPMENT_MODE}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
