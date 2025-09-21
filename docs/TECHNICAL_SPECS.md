# Technical Specifications

## Timer Logic Specifications

### Pomodoro Cycle
- **Work Session**: 25 minutes (1500 seconds)
- **Short Break**: 5 minutes (300 seconds)
- **Long Break**: 15 minutes (900 seconds) - after 4 work sessions
- **Cycle Reset**: Automatic progression through work/break cycles

### State Management
```typescript
interface PomodoroState {
  phase: 'work' | 'shortBreak' | 'longBreak';
  timeRemaining: number; // seconds
  isActive: boolean;
  isPaused: boolean;
  sessionsCompleted: number;
  currentCycle: number; // 1-4, resets after long break
}
```

### Animation Timing
```typescript
interface AnimationProgress {
  stage: 'seed' | 'sprout' | 'leaves' | 'bud' | 'bloom';
  progress: number; // 0-1 within current stage
  overallProgress: number; // 0-1 for entire session
  granularData: {
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
```

### Timeline Preview System
```typescript
interface TimelinePreviewHook {
  timelineProgress: number;        // 0-1 slider position
  isPreviewActive: boolean;        // Auto-activated when slider moves
  handleTimelineChange: (progress: number) => void;
  previewAnimation: AnimationProgress | null;
  previewTimerState: PomodoroState | null;
}
```

**Implementation Details:**
- **Real-time Calculation**: Animation state computed from slider position
- **Granular Progress**: Pixel-level animation data for precise previews
- **State Override**: Preview states replace real timer states when active
- **Performance Optimized**: useMemo for expensive calculations
- **Auto-activation**: Preview mode enables when slider position > 0

## Flower Animation Stages

### Pixel-Based Animation System
The flower animation uses a 7×5 pixel grid system with progressive pixel reveal:

```typescript
// Simplified flower definition (15 pixels total)
const fullFlower = [
  // Stem (pixels 0-2)
  ['stem', 1, 2], ['stem', 2, 2], ['stem', 3, 2],
  // Leaves (pixels 3-4)  
  ['leaf', 3, 1], ['leaf', 3, 3],
  // Bloom 3×3 grid (pixels 5-13)
  ['petal', 4, 1], ['petal', 4, 2], ['petal', 4, 3],
  ['petal', 5, 1], ['center-bright', 5, 2], ['petal', 5, 3],
  ['petal', 6, 1], ['petal', 6, 2], ['petal', 6, 3],
];
```

### Animation Implementations

#### 1. Grid-Based Approach (PixelFlower.tsx)
- **Concept**: Simple 15-pixel progression mapped to timer
- **Debug**: Built-in progress overlay for development
- **Performance**: Minimal computation, direct mapping

#### 2. Stage-Based Approach (PixelFlower.simple.tsx)  
- **Concept**: Traditional stage visibility with smooth transitions
- **Animation**: Framer Motion for scale/opacity effects
- **UX**: Clear visual progression through growth phases

#### 3. Complex Pixel Approach (PixelFlower.old.tsx)
- **Concept**: Dynamic pixel generation with opacity-based reveal
- **Features**: Variable pixel counts, progressive opacity, detail enhancement
- **Complexity**: Advanced timing and layered animations

### Stage Specifications

### Stage 1: Seed (0-20% of session)
- **Visual**: Small brown seed in dark soil foundation
- **Grid Position**: Row 0 (soil), minimal seed presence
- **Animation**: Subtle pulse (scale 1.0-1.05, 2s duration)

### Stage 2: Sprout (20-40% of session)  
- **Visual**: Green stem emerging vertically from soil
- **Grid Pixels**: Stem pixels [1,2], [2,2], [3,2] progressively revealed
- **Animation**: Gradual scaleY growth from bottom origin

### Stage 3: Leaves (40-60% of session)
- **Visual**: 2 leaves unfurling from stem sides
- **Grid Pixels**: Leaf pixels [3,1] and [3,3] appear
- **Animation**: Scale from 0 to full size with rotation

### Stage 4: Bud (60-80% of session)
- **Visual**: Closed flower bud at stem tip
- **Grid Position**: Top rows preparing for bloom
- **Animation**: Scale increase + color saturation buildup

### Stage 5: Bloom (80-100% of session)
- **Visual**: Full 3×3 flower with bright center and petals
- **Grid Pixels**: Complete petal array with center-bright focal point
- **Animation**: Petal unfurling + center sparkle effects

## CSS Animation Strategy

### Pixel Art Rendering
```css
.pixel-flower-container {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}

.pixel-flower {
  transform: scale(3); /* Magnify 8px pixels for visibility */
}

.pixel {
  width: 8px;
  height: 8px;
  border: 0.5px solid rgba(255, 255, 255, 0.1);
}
```

### Hardware Acceleration
```css
.pixel-flower-container {
  will-change: transform;
  transform: translateZ(0); /* Force GPU acceleration */
}
```

### Responsive Scaling
```css
@media (max-width: 600px) {
  .pixel-flower { transform: scale(2.5); }
}
@media (max-width: 400px) {
  .pixel-flower { transform: scale(2); }
}
```

### Performance Targets
- **Frame Rate**: Consistent 60fps
- **CPU Usage**: < 3% on modern browsers (achieved with pixel approach)
- **Memory**: < 30MB total page memory (optimized from SVG approach)
- **Bundle Size**: < 100KB gzipped
- **Pixel Updates**: ~1 pixel per 100 seconds (25min / 15 pixels)

## Browser Compatibility

### Target Support
- **Chrome**: 90+ (95% support for CSS transforms)
- **Firefox**: 88+ (SVG animation support)
- **Safari**: 14+ (WebKit optimizations)
- **Edge**: 90+ (Chromium-based)

### Fallbacks
- **Reduced Motion**: Respect `prefers-reduced-motion`
- **Low Performance**: Simplified animations for older devices
- **No JavaScript**: Static flower image with CSS-only timer

## Accessibility Requirements

### Motion Sensitivity
```css
@media (prefers-reduced-motion: reduce) {
  .flower-animation {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

### Screen Reader Support
```html
<div role="timer" aria-live="polite" aria-label="Pomodoro timer">
  <span class="sr-only">Work session: {timeRemaining} remaining</span>
</div>
```

### Keyboard Navigation
- **Space**: Start/Pause timer
- **R**: Reset current session
- **Escape**: Stop timer and return to idle
- **Tab**: Navigate through controls

## Performance Monitoring

### Key Metrics to Track
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Animation frame consistency
- Memory usage over time

### Optimization Techniques
- **SVG Optimization**: Remove unnecessary paths/metadata
- **Code Splitting**: Load animation library only when needed
- **Asset Preloading**: Critical SVG elements
- **Service Worker**: Cache static assets
