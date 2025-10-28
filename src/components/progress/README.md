# Progress Visualization Components

Enhanced progress visualization components designed specifically for module progress tracking. These components feature smooth Framer Motion animations, theme integration, accessibility support, and micro-interactions.

## Components

### 1. ProgressBar

Linear progress bar with animated fill and smooth number counting animation.

**Features:**
- Animated fill transition with custom easing
- Smooth number counting animation
- Shimmer/glow effect during progress
- Theme-aware colors
- Multiple sizes (small, medium, large)
- Color variants (primary, secondary, success, warning, error, accent)
- Custom color support
- Accessibility: ARIA progressbar role with proper labels
- Completion callback

**Usage:**
```jsx
import { ProgressBar } from '@/components/progress'

// Basic usage
<ProgressBar value={75} showLabel />

// With custom color and size
<ProgressBar 
  value={50} 
  color="success"
  size="large"
  animated
  onComplete={() => console.log('Complete!')}
/>

// Custom color
<ProgressBar value={80} color="#FF6B6B" />
```

**Props:**
- `value` (number, default: 0): Progress value (0-100)
- `size` (string, default: 'medium'): Size preset ('small', 'medium', 'large')
- `showLabel` (bool, default: true): Show percentage label
- `color` (string, default: 'primary'): Color variant or custom hex/rgb color
- `animated` (bool, default: true): Enable smooth animations
- `className` (string): Additional CSS classes
- `style` (object): Custom inline styles
- `onComplete` (function): Callback when progress reaches 100%

---

### 2. CircularProgress

Ring-style progress indicator with animated SVG stroke and number counting.

**Features:**
- SVG-based circular progress ring
- Animated stroke with gradient fill
- Smooth number counting
- Glow effect on completion
- Animated endpoint circle
- Optional label and percentage display
- Theme-aware colors
- Accessibility: ARIA progressbar role
- Completion celebration animation

**Usage:**
```jsx
import { CircularProgress } from '@/components/progress'

// Basic usage
<CircularProgress value={75} size={120} />

// With label and custom styling
<CircularProgress 
  value={100}
  size={160}
  strokeWidth={12}
  color="success"
  label="Module 1"
  showPercentage
/>

// Without percentage
<CircularProgress 
  value={50}
  showPercentage={false}
  label="In Progress"
/>
```

**Props:**
- `value` (number, default: 0): Progress value (0-100)
- `size` (number, default: 120): Circle diameter in pixels
- `strokeWidth` (number, default: 10): Stroke width in pixels
- `color` (string, default: 'primary'): Color variant or custom color
- `showLabel` (bool, default: true): Show center content area
- `showPercentage` (bool, default: true): Show percentage value
- `label` (string): Custom label text
- `animated` (bool, default: true): Enable smooth animations
- `className` (string): Additional CSS classes
- `style` (object): Custom inline styles

---

### 3. ModuleStatus

Status badge component with 3 visual states and smooth transition animations.

**Features:**
- Three states: completed, in-progress, locked
- Animated state transitions
- Pulsing animation for in-progress state
- Completion celebration overlay
- Icon animations (scale, rotate)
- Theme-aware colors
- Multiple sizes
- Custom labels
- Optional icon display
- Accessibility: ARIA status role

**Usage:**
```jsx
import { ModuleStatus } from '@/components/progress'

// Basic usage
<ModuleStatus status="completed" />

// With custom label and size
<ModuleStatus 
  status="in-progress"
  label="Module 2: How LLMs Work"
  size="large"
  showIcon
/>

// Without icon
<ModuleStatus 
  status="locked"
  showIcon={false}
  label="Coming Soon"
/>
```

**Props:**
- `status` (string, required): Module status ('completed', 'in-progress', 'locked')
- `label` (string): Custom label text (overrides default)
- `size` (string, default: 'medium'): Badge size ('small', 'medium', 'large')
- `showIcon` (bool, default: true): Show status icon
- `animated` (bool, default: true): Enable animations
- `className` (string): Additional CSS classes
- `style` (object): Custom inline styles

**Status Indicators:**
- **Completed**: Green checkmark (✓), success colors
- **In Progress**: Pulsing dot (●), primary colors with pulse animation
- **Locked**: Lock icon (🔒), disabled/muted colors

---

### 4. MilestoneAnimation

Celebration component for achievements and milestone completion.

**Features:**
- Celebration animation with scale, glow, and particles
- Multiple animation types (success, achievement, milestone, levelUp)
- Confetti-like particle effects
- Expanding ring animations
- Pulsing glow effect
- Auto-dismiss with configurable duration
- Theme-aware colors
- Custom icons and messages
- Completion callback

**Usage:**
```jsx
import { MilestoneAnimation } from '@/components/progress'

// Basic usage
<MilestoneAnimation 
  show={true}
  title="Module Completed!"
  icon="🎉"
/>

// Achievement with custom configuration
<MilestoneAnimation 
  show={achievementUnlocked}
  type="achievement"
  title="First Step!"
  message="You've completed your first module"
  icon="🏆"
  duration={5000}
  showConfetti
  onComplete={() => setAchievementUnlocked(false)}
/>

// Manual control (no auto-dismiss)
<MilestoneAnimation 
  show={showMilestone}
  type="levelUp"
  title="Level Up!"
  duration={0}
  onComplete={handleClose}
/>
```

**Props:**
- `show` (bool, default: false): Show/hide the animation
- `type` (string, default: 'success'): Animation theme ('success', 'achievement', 'milestone', 'levelUp')
- `title` (string, default: 'Achievement Unlocked!'): Main title text
- `message` (string): Optional description/message
- `icon` (string, default: '🎉'): Emoji or icon to display
- `duration` (number, default: 3000): Duration in ms before auto-hiding (0 for manual control)
- `showConfetti` (bool, default: true): Show confetti particles
- `onComplete` (function): Callback when animation completes
- `className` (string): Additional CSS classes
- `style` (object): Custom inline styles

---

## Demo

A comprehensive demo page is available to test all components with various configurations:

```jsx
import ProgressDemo from '@/components/progress/ProgressDemo'

// In your app
<ProgressDemo />
```

The demo includes:
- Interactive controls for testing different states
- All size and color variations
- Animation demonstrations
- Theme switching (male/female themes)
- Integration examples showing components working together

---

## Theme Integration

All components automatically adapt to the current theme (male/female) using the `useTheme` hook. They pull colors from:

- `theme.colors.primary.*` - Primary actions and progress
- `theme.colors.secondary.*` - Secondary elements
- `theme.colors.state.*` - Success, warning, error states
- `theme.colors.text.*` - Text colors
- `theme.colors.surface.*` - Background surfaces
- `theme.colors.semantic.*` - Semantic color combinations

**Male Theme (Euphoria-inspired):**
- Deep purples, electric blues, hot pinks
- High contrast with dark backgrounds
- Neon glow effects

**Female Theme (Summer-inspired):**
- Peachy tones, coral, soft pinks
- Warm, light backgrounds
- Soft, gentle transitions

---

## Accessibility

All components include proper accessibility features:

- **ARIA roles**: `progressbar`, `status`
- **ARIA labels**: Descriptive labels for screen readers
- **Keyboard support**: Interactive elements are keyboard accessible
- **Color contrast**: All color combinations meet WCAG AA standards
- **Animation control**: Animations can be disabled via props
- **Semantic HTML**: Proper use of semantic elements

---

## Performance

- **60fps animations**: Optimized for smooth performance
- **GPU acceleration**: Uses transform and opacity for animations
- **Lazy updates**: Components only re-render when necessary
- **Spring animations**: Natural, physics-based motion
- **SVG optimization**: Efficient circular progress rendering

---

## Integration Example

```jsx
import { ProgressBar, CircularProgress, ModuleStatus, MilestoneAnimation } from '@/components/progress'
import { useProgress } from '@/hooks/useProgress'

function ModuleProgressView() {
  const { progress, overallCompletion } = useProgress()
  const [showCelebration, setShowCelebration] = useState(false)

  const handleModuleComplete = () => {
    setShowCelebration(true)
  }

  return (
    <div>
      {/* Overall progress */}
      <ProgressBar 
        value={overallCompletion} 
        color="primary"
        size="large"
        showLabel
      />

      {/* Module list */}
      <div>
        <div className="module-card">
          <h3>Module 1: Introduction</h3>
          <ModuleStatus status="completed" />
          <CircularProgress value={100} size={80} color="success" />
        </div>

        <div className="module-card">
          <h3>Module 2: Deep Dive</h3>
          <ModuleStatus status="in-progress" />
          <CircularProgress 
            value={65} 
            size={80} 
            color="primary"
            label="65%"
          />
        </div>

        <div className="module-card">
          <h3>Module 3: Advanced</h3>
          <ModuleStatus status="locked" />
          <CircularProgress value={0} size={80} color="secondary" />
        </div>
      </div>

      {/* Celebration */}
      <MilestoneAnimation
        show={showCelebration}
        type="success"
        title="Module Completed!"
        message="Great job! On to the next one."
        icon="🎉"
        onComplete={() => setShowCelebration(false)}
      />
    </div>
  )
}
```

---

## Browser Support

All components work in modern browsers:
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Opera 74+

SVG animations are compatible with all modern browsers. Fallbacks are provided for older browsers.

---

## Future Enhancements

Potential improvements for future versions:
- [ ] Additional animation presets
- [ ] Custom confetti shapes
- [ ] Sound effects support
- [ ] More celebration types
- [ ] Progress history/timeline view
- [ ] Animated transitions between states
- [ ] Multi-step progress indicator
- [ ] Radial/gauge progress variants
