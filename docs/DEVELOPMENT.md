# Development Guidelines

## Code Standards

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### Component Structure
```typescript
// Component template
interface ComponentProps {
  // Props interface always defined
}

export const Component: React.FC<ComponentProps> = ({ prop }) => {
  // Custom hooks first
  const customHook = useCustomHook();
  
  // State declarations
  const [state, setState] = useState();
  
  // Effect hooks
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  // Event handlers
  const handleEvent = useCallback(() => {
    // Handler logic
  }, [dependencies]);
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

### Naming Conventions
- **Components**: PascalCase (`FlowerAnimation`)
- **Hooks**: camelCase with 'use' prefix (`usePomodoro`)
- **Constants**: UPPER_SNAKE_CASE (`POMODORO_DURATION`)
- **Files**: kebab-case (`flower-animation.tsx`)
- **CSS Classes**: BEM methodology (`flower__petal--blooming`)

## Git Workflow

### Branch Strategy
- **main**: Production-ready code
- **develop**: Integration branch for features
- **feature/**: Individual feature branches
- **hotfix/**: Emergency fixes for production

### Commit Messages
```
type(scope): description

feat(timer): add pause functionality
fix(animation): resolve petal rotation timing
docs(readme): update installation instructions
style(flower): improve petal color transitions
refactor(hooks): extract timer logic to custom hook
```

### Pull Request Process
1. Create feature branch from `develop`
2. Implement feature with tests
3. Update documentation if needed
4. Submit PR with clear description
5. Code review and approval
6. Merge to `develop`

## Testing Strategy

### Unit Tests
- **Timer Logic**: All state transitions and timing
- **Animation Calculations**: Progress calculations and stage transitions
- **Utility Functions**: Pure functions with predictable outputs

### Component Tests
```typescript
// Example test structure
describe('FlowerAnimation', () => {
  it('should render seed stage at 0% progress', () => {
    render(<FlowerAnimation progress={0} />);
    expect(screen.getByTestId('seed')).toBeVisible();
  });
  
  it('should transition to sprout at 20% progress', () => {
    render(<FlowerAnimation progress={0.2} />);
    expect(screen.getByTestId('sprout')).toBeVisible();
  });
});
```

### Performance Tests
- Animation frame rate consistency
- Memory leak detection
- Bundle size monitoring
- Load time measurements

## Animation Guidelines

### Timing Functions
```css
/* Preferred easing functions */
.natural-ease { transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94); }
.growth-ease { transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55); }
.bloom-ease { transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275); }
```

### Animation Durations
- **Micro-interactions**: 150-300ms
- **State transitions**: 300-500ms
- **Growth stages**: 5000ms (5 minutes real-time)
- **Completion celebration**: 1000-2000ms

### Motion Design Principles
1. **Purposeful**: Every animation serves a function
2. **Natural**: Follow organic growth patterns
3. **Consistent**: Same timing across similar elements
4. **Responsive**: Respect user motion preferences
5. **Performant**: Use transform and opacity when possible

## Error Handling

### Timer Errors
```typescript
try {
  startTimer();
} catch (error) {
  console.error('Timer start failed:', error);
  // Graceful fallback to manual timer
  showFallbackTimer();
}
```

### Animation Errors
```typescript
// Graceful degradation for animation failures
const [animationSupported, setAnimationSupported] = useState(true);

useEffect(() => {
  if (!window.requestAnimationFrame) {
    setAnimationSupported(false);
  }
}, []);

if (!animationSupported) {
  return <StaticFlowerDisplay progress={progress} />;
}
```

### Notification Errors
```typescript
// Fallback for notification permission denied
const showNotification = async (message: string) => {
  if (Notification.permission === 'granted') {
    new Notification(message);
  } else {
    // Fallback to in-app notification
    showInAppAlert(message);
  }
};
```

## Development Workflow

### Local Development Setup
1. Clone repository
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Run tests: `npm test`
5. Check types: `npm run type-check`

### Development Tools

#### Animation Timeline Preview
The timeline preview feature allows designers and developers to instantly test animations:

```typescript
// Enable timeline preview in DevControls
<DevControls 
  isDevelopmentMode={true}
  onTimelineChange={timeline.handleTimelineChange}
  totalDuration={state.sessionStartTime}
/>
```

**Features:**
- **Interactive Slider**: Scrub through 0-100% of animation timeline
- **Stage Visualization**: See Seed → Sprout → Leaves → Bud → Bloom transitions
- **Real-time Preview**: Instant visual feedback as you drag the slider
- **Progress Info**: Shows percentage and time remaining at any point
- **Auto-activation**: Preview mode enables automatically when slider moves

**Use Cases:**
- **Design Iteration**: Quickly test visual changes across all animation stages
- **Timing Verification**: Ensure smooth transitions between growth phases
- **Performance Testing**: Check animation performance at different progress points
- **Client Demos**: Show the full animation experience in seconds instead of 25 minutes

#### Pixel Animation Debugging
Built-in debug information displays real-time animation metrics:

```typescript
// Debug overlay shows:
Timer: {currentPixelIndex}/{totalPixels} → 
Flower: {pixelsToShow}/{fullFlower.length} | 
Elapsed: {elapsedSeconds}s
```

**Animation Implementation Testing:**
- Switch between PixelFlower variants by changing imports
- Test different animation approaches (grid-based vs stage-based vs complex)
- Verify pixel-perfect timing and progression
- Monitor performance across different implementations

#### Animation Architecture Choices
```typescript
// 1. Simple Grid Approach (PixelFlower.tsx)
const pixelsToShow = Math.floor((currentPixelIndex / totalPixels) * fullFlower.length);

// 2. Stage-Based Approach (PixelFlower.simple.tsx)  
const isStageVisible = (targetStage) => currentIndex >= targetIndex;

// 3. Complex Pixel Approach (PixelFlower.old.tsx)
const getPixelOpacity = (pixelIndex) => pixelIndex <= currentPixelIndex ? 1 : 0.3;
```

### Pre-commit Checklist
- [ ] All tests passing
- [ ] TypeScript compilation clean
- [ ] ESLint warnings resolved
- [ ] Animation performance verified
- [ ] Documentation updated
- [ ] Commit message follows convention

### Code Review Checklist
- [ ] Component logic is clear and testable
- [ ] Animation performance is optimized
- [ ] Accessibility requirements met
- [ ] Error handling implemented
- [ ] TypeScript types are accurate
- [ ] Documentation is up to date

## Deployment Process

### Build Optimization
```bash
# Production build with analysis
npm run build
npm run analyze

# Performance audits
npm run lighthouse
npm run bundle-size
```

### Environment Configuration
- **Development**: Hot reload, debug logging
- **Staging**: Production build, debug enabled
- **Production**: Optimized build, error reporting

### Monitoring
- Performance metrics collection
- Error tracking and reporting
- User interaction analytics
- Animation performance monitoring
