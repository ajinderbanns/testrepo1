# Visualizations Module

This module contains interactive visualizations for demonstrating LLM concepts.

## Available Visualizations

### TextGeneration

An interactive visualization that demonstrates how Large Language Models generate text token-by-token.

**Features:**
- Token-by-token reveal animation showing progressive text generation
- Probability indicators displaying model confidence for each token
- Play/pause/reset controls for interactive exploration
- Multiple pre-scripted examples with gender-specific content
- Theme-aware styling (adapts to male/female theme colors)
- Fully responsive design for mobile and desktop
- Accessibility features (keyboard navigation, reduced motion support)

**Usage:**

```jsx
import { TextGeneration } from '../visualizations'

function MyComponent() {
  return (
    <TextGeneration 
      autoPlay={false}
      showProbabilityIndicators={true}
      speed={1}
    />
  )
}
```

**Props:**

- `autoPlay` (boolean, default: false): Start animation automatically on mount
- `showProbabilityIndicators` (boolean, default: true): Display probability percentages above tokens
- `speed` (number, default: 1): Animation speed multiplier (higher = faster)

**Examples:**

The visualization includes 3 pre-scripted examples with gender-differentiated content:

1. **Simple Q&A**: Basic question-answer generation (coding/writing)
2. **Creative Completion**: Shows varied probabilities in creative tasks
3. **Step-by-Step Explanation**: Demonstrates structured, logical generation

## File Structure

```
visualizations/
├── index.js                      # Central export
├── TextGeneration.jsx            # Main visualization component
├── textGenerationExamples.js     # Pre-scripted data
└── README.md                     # This file
```

## Styling

The visualization uses a combination of:
- Inline styles for theme-specific colors (dynamic)
- CSS classes for responsive design and animations
- Framer Motion for smooth animations and transitions

CSS is located at: `src/styles/visualizations/TextGeneration.css`

## Integration with Module Content

To integrate the visualization into module content:

```jsx
import { TextGeneration } from '../../visualizations'

function HowTheyGenerateTextSection() {
  return (
    <div>
      <h2>How LLMs Generate Text</h2>
      <p>Watch the process in action:</p>
      <TextGeneration />
    </div>
  )
}
```

## Theme Integration

The visualization automatically adapts to the current theme:

**Male Theme (Dark/Purple):**
- Deep purple primary colors
- High contrast text
- Neon accent highlights
- Dark backgrounds

**Female Theme (Light/Peachy):**
- Coral and peachy primary colors
- Warm, inviting text colors
- Soft accent highlights
- Light, airy backgrounds

## Performance Considerations

- Uses CSS transforms for GPU acceleration
- Implements `will-change` for optimized animations
- Debounced token generation for smooth 60fps
- Reduced motion support for accessibility
- Mobile-optimized touch targets (44px minimum)

## Accessibility

- Keyboard navigation support
- Focus states for all interactive elements
- ARIA attributes for screen readers
- Reduced motion support (prefers-reduced-motion)
- High contrast mode support
- Semantic HTML structure

## Future Enhancements

Potential improvements for future iterations:

- [ ] Sound effects for token appearance (optional toggle)
- [ ] Speed control slider (0.5x - 2x)
- [ ] Custom prompt input (with pre-generation)
- [ ] Multiple visualization modes (list, graph, matrix)
- [ ] Export generated text as image/PDF
- [ ] Temperature/sampling parameter visualization
- [ ] Token highlighting by probability ranges

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 13+)
- Mobile browsers: Optimized for touch

## Dependencies

- React 18+
- Framer Motion 11+
- Theme context (custom)
