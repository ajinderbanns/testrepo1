# Animation Library

Comprehensive animation system built with Framer Motion, providing reusable presets, wrapper components, and utilities for consistent, cinematic animations across the application.

## Features

- 🎬 **Cinematic Presets**: Pre-built animation variants for common use cases
- 🎨 **Theme Integration**: All animations work seamlessly with male/female themes
- ♿ **Accessibility**: Respects `prefers-reduced-motion` user preference
- 📱 **Responsive**: Optimized for mobile and desktop devices
- ⚡ **Performance**: 60fps animations with optimized rendering
- 🧩 **Modular**: Import only what you need

## Quick Start

```jsx
import { 
  TransitionWrapper, 
  PageTransition, 
  SectionReveal,
  contentReveal,
  hoverEffects 
} from '@/animations'

// Simple content reveal
<TransitionWrapper preset="fadeInUp" delay={0.2}>
  <h1>Hello World</h1>
</TransitionWrapper>

// Page transitions with React Router
import { useLocation } from 'react-router-dom'

function App() {
  const location = useLocation()
  
  return (
    <PageTransition pageKey={location.pathname} transition="fade">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </PageTransition>
  )
}

// Scroll-triggered section reveal
<SectionReveal preset="fadeInUp" once>
  <section>Your content</section>
</SectionReveal>
```

## Components

### TransitionWrapper

Flexible wrapper for applying motion animations to any element.

```jsx
<TransitionWrapper
  preset="fadeInUp"      // Animation preset
  delay={0.2}            // Delay in seconds
  once={false}           // Animate on every view
  as="section"           // HTML element to render
>
  <Content />
</TransitionWrapper>
```

**Available Presets:**
- `fadeInUp` - Fade in from bottom
- `fadeInDown` - Fade in from top
- `fadeInLeft` - Fade in from left
- `fadeInRight` - Fade in from right
- `scaleIn` - Scale in from small
- `popIn` - Pop in with spring physics

### PageTransition

Animates entire page/route changes.

```jsx
<PageTransition
  pageKey={location.pathname}  // Unique key for each page
  transition="fade"             // Transition type
>
  <YourPage />
</PageTransition>
```

**Available Transitions:**
- `fade` - Simple fade in/out
- `slideRight` - Slide from right (forward navigation)
- `slideLeft` - Slide from left (back navigation)
- `scaleUp` - Scale up entrance
- `blur` - Blur transition (Euphoria-inspired)

### SectionReveal

Scroll-triggered animations using viewport detection.

```jsx
<SectionReveal
  preset="fadeInUp"
  once={true}               // Animate only once
  threshold={0.1}           // Viewport intersection threshold
  stagger={true}            // Enable stagger for children
  staggerSpeed="normal"     // 'fast', 'normal', or 'dramatic'
>
  <YourSection />
</SectionReveal>
```

## Animation Presets

### Page Transitions

```jsx
import { pageTransitions } from '@/animations'

<motion.div
  variants={pageTransitions.fade}
  initial="initial"
  animate="animate"
  exit="exit"
>
  Content
</motion.div>
```

Available: `fade`, `slideRight`, `slideLeft`, `scaleUp`, `blur`

### Content Reveal

```jsx
import { contentReveal } from '@/animations'

<motion.div
  variants={contentReveal.fadeInUp}
  initial="hidden"
  animate="visible"
>
  Content
</motion.div>
```

Available: `fadeInUp`, `fadeInDown`, `fadeInLeft`, `fadeInRight`, `scaleIn`, `popIn`

### Stagger Children

```jsx
import { staggerChildren } from '@/animations'

<motion.div
  variants={staggerChildren.container}
  initial="hidden"
  animate="visible"
>
  {items.map(item => (
    <motion.div key={item.id} variants={staggerChildren.item}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

**Containers:** `container`, `containerFast`, `containerDramatic`  
**Items:** `item`, `itemScale`

### Hover Effects

```jsx
import { hoverEffects } from '@/animations'

<motion.div {...hoverEffects.lift}>
  Hover me
</motion.div>
```

Available: `lift`, `scale`, `glow`, `bounce`, `rotate`, `shake`

### Button Interactions

```jsx
import { buttonInteractions } from '@/animations'

<motion.button {...buttonInteractions.primary}>
  Click me
</motion.button>
```

Available: `primary`, `secondary`, `icon`

### Card Interactions

```jsx
import { cardInteractions } from '@/animations'

<motion.div {...cardInteractions.subtle}>
  Card content
</motion.div>
```

Available: `subtle`, `dramatic`, `glow`

## Hooks

### useAnimationConfig

Access theme-aware animation configuration.

```jsx
import { useAnimationConfig } from '@/hooks'

function MyComponent() {
  const animConfig = useAnimationConfig()
  
  return (
    <motion.div
      animate={{ opacity: 1 }}
      transition={{
        duration: animConfig.duration.normal,
        ease: animConfig.easing.easeOut,
      }}
      style={{
        backgroundColor: animConfig.colors.primary,
      }}
    >
      Content
    </motion.div>
  )
}
```

**Returns:**
- `duration` - Timing values (instant, fast, normal, slow, etc.)
- `stagger` - Stagger delay values
- `easing` - Easing functions
- `enabled` - Whether animations are enabled (respects reduced motion)
- `colors` - Theme colors for visualizations
- `targetFPS` - Optimal FPS for Canvas animations
- `theme` - Full theme object

### useReducedMotion

Simple check for reduced motion preference.

```jsx
import { useReducedMotion } from '@/hooks'

function MyComponent() {
  const reducedMotion = useReducedMotion()
  
  if (reducedMotion) {
    return <StaticVersion />
  }
  
  return <AnimatedVersion />
}
```

## Utilities

### Animation Helpers

```jsx
import {
  easings,
  durations,
  createTransition,
  createSpring,
  lerp,
  lerpColor,
} from '@/utils/animationHelpers'

// Custom transition
const transition = createTransition(
  durations.normal,  // duration
  easings.easeOut,   // easing
  0.1                // delay
)

// Spring physics
const spring = createSpring('bouncy')

// Interpolation
const value = lerp(0, 100, 0.5) // 50
const color = lerpColor('#FF0000', '#0000FF', 0.5)
```

## Best Practices

### 1. Use Wrapper Components

Wrapper components handle reduced motion and common use cases:

```jsx
// ✅ Good
<TransitionWrapper preset="fadeInUp">
  <Content />
</TransitionWrapper>

// ❌ Avoid (unless you need custom behavior)
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
>
  <Content />
</motion.div>
```

### 2. Respect Reduced Motion

Always use `useAnimationConfig` or wrapper components:

```jsx
const animConfig = useAnimationConfig()

if (!animConfig.enabled) {
  return <StaticComponent />
}

return <AnimatedComponent />
```

### 3. Optimize Performance

- Use `once` prop for scroll-triggered animations
- Avoid animating expensive properties (use `transform` and `opacity`)
- Use `will-change` sparingly
- Limit number of simultaneous animations

### 4. Theme Integration

Use `animConfig.colors` for theme-aware animations:

```jsx
const animConfig = useAnimationConfig()

<motion.div
  style={{
    backgroundColor: animConfig.colors.primary,
    color: animConfig.colors.text,
  }}
/>
```

### 5. Stagger Delays

Use appropriate stagger speeds based on content:

```jsx
// Fast for small items (buttons, icons)
<SectionReveal stagger staggerSpeed="fast">
  {buttons}
</SectionReveal>

// Normal for cards, list items
<SectionReveal stagger staggerSpeed="normal">
  {cards}
</SectionReveal>

// Dramatic for hero sections
<SectionReveal stagger staggerSpeed="dramatic">
  {heroElements}
</SectionReveal>
```

## Demo Page

Visit `/animations-demo` to see all animations in action with interactive examples.

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- iOS Safari 14+
- Chrome Android 88+

## Performance

All animations target 60fps on modern devices:
- Page transitions: < 500ms
- Content reveals: < 400ms
- Hover effects: < 200ms
- Canvas animations: 60fps (30fps on mobile)

## Contributing

When adding new animations:
1. Add variants to `presets.js`
2. Update component props and PropTypes
3. Add examples to demo page
4. Update this README
5. Test with both themes
6. Test with reduced motion enabled
