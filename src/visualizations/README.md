# LLM Visualizations

Interactive visualizations demonstrating core Large Language Model concepts. Built with Canvas and Framer Motion for smooth 60fps animations, fully theme-integrated with male/female palettes.

## Available Visualizations

### 1. TokenFlow

Interactive visualization showing text-to-token transformation.

**Features:**
- Real-time tokenization of input text
- Individual token highlighting on hover
- Token count display
- Interactive reset and tokenize controls
- Theme-aware colors

**Usage:**
```jsx
import { TokenFlow } from '@/visualizations'

<TokenFlow 
  initialText="Hello! How can I help you today?"
  autoTokenize={false}
  showTokenCount={true}
/>
```

**Props:**
- `initialText` (string): Initial text to display
- `autoTokenize` (boolean): Auto-tokenize on mount
- `showTokenCount` (boolean): Show token count info

### 2. AttentionHeatmap

Matrix visualization showing attention weights between tokens.

**Features:**
- Interactive heatmap cells
- Multiple attention patterns (local, causal, focused)
- Hover to see attention scores
- Token labels on axes
- Gradient legend
- Theme-aware color mapping

**Usage:**
```jsx
import { AttentionHeatmap } from '@/visualizations'

<AttentionHeatmap 
  tokens={['The', 'cat', 'sat', 'on', 'the', 'mat']}
  pattern="diagonal"
  cellSize={40}
  showLabels={true}
/>
```

**Props:**
- `tokens` (array): Array of token strings
- `pattern` (string): 'diagonal', 'causal', or 'focused'
- `cellSize` (number): Size of each cell in pixels
- `showLabels` (boolean): Show token labels

### 3. EmbeddingSpace

2D visualization of word embeddings with semantic clustering.

**Features:**
- Canvas-based scatter plot (60fps)
- Interactive word selection
- Semantic similarity visualization
- Cluster color coding
- Hover effects and tooltips
- Touch/mouse support

**Usage:**
```jsx
import { EmbeddingSpace } from '@/visualizations'

<EmbeddingSpace 
  width={600}
  height={500}
  showClusters={true}
  interactive={true}
/>
```

**Props:**
- `width` (number): Canvas width
- `height` (number): Canvas height
- `embeddings` (array): Custom embedding data
- `showClusters` (boolean): Show cluster backgrounds
- `interactive` (boolean): Enable interactions

**Embedding Data Format:**
```js
{
  word: 'dog',
  x: 0.2,        // Normalized 0-1
  y: 0.3,        // Normalized 0-1
  cluster: 'animals'
}
```

### 4. NeuralNetworkViz

Animated neural network with layers, nodes, and activation flows.

**Features:**
- Canvas-based rendering (60fps)
- Particle-based activation flow
- Multiple layers visualization
- Connection weight visualization
- Interactive node hover
- Auto-play mode
- Theme-aware colors

**Usage:**
```jsx
import { NeuralNetworkViz } from '@/visualizations'

<NeuralNetworkViz 
  width={700}
  height={500}
  layerSizes={[4, 6, 6, 3]}
  autoPlay={true}
  speed={1}
/>
```

**Props:**
- `width` (number): Canvas width
- `height` (number): Canvas height
- `layerSizes` (array): Number of nodes per layer
- `autoPlay` (boolean): Auto-trigger activations
- `speed` (number): Animation speed multiplier

### 5. TextGeneration

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
├── TokenFlow.jsx                 # Token transformation visualization
├── AttentionHeatmap.jsx          # Attention matrix heatmap
├── EmbeddingSpace.jsx            # 2D embeddings with Canvas
├── NeuralNetworkViz.jsx          # Neural network with Canvas
├── TextGeneration.jsx            # Token-by-token generation
├── textGenerationExamples.js     # Pre-scripted data
├── INTEGRATION_EXAMPLE.md        # Integration guide
└── README.md                     # This file
```

## Quick Start

```jsx
// Import all visualizations
import {
  TokenFlow,
  AttentionHeatmap,
  EmbeddingSpace,
  NeuralNetworkViz,
  TextGeneration
} from '@/visualizations'

function LLMConceptsPage() {
  return (
    <div>
      <h1>Understanding LLMs</h1>
      
      {/* Token Flow */}
      <section>
        <h2>Tokenization</h2>
        <TokenFlow initialText="Enter your text here" />
      </section>
      
      {/* Attention */}
      <section>
        <h2>Attention Mechanism</h2>
        <AttentionHeatmap pattern="diagonal" />
      </section>
      
      {/* Embeddings */}
      <section>
        <h2>Word Embeddings</h2>
        <EmbeddingSpace showClusters={true} />
      </section>
      
      {/* Neural Network */}
      <section>
        <h2>Neural Network</h2>
        <NeuralNetworkViz autoPlay={true} />
      </section>
      
      {/* Text Generation */}
      <section>
        <h2>Text Generation</h2>
        <TextGeneration autoPlay={false} />
      </section>
    </div>
  )
}
```

## Styling

All visualizations use:
- **Inline styles** for theme-specific colors (dynamic)
- **useAnimationConfig** hook for theme-aware styling
- **Framer Motion** for smooth animations
- **Canvas API** for performance-critical rendering (60fps)

No additional CSS files needed - styling is fully self-contained.

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

## Theme Integration

All visualizations automatically adapt to the current theme (male/female):

**Male Theme (Dark/Euphoria):**
- Deep purple primary colors (#9333EA)
- Hot pink accents (#EC4899)
- Electric blue secondary (#3B82F6)
- Dark backgrounds (#0A0A0A)
- High contrast text

**Female Theme (Light/Summer):**
- Coral primary colors (#FF7F50)
- Peach accents (#FFDAB9)
- Mint secondary (#98D8C8)
- Light backgrounds (#FFF8F0)
- Warm, inviting text

**Usage:**
```jsx
// Automatically uses current theme
const animConfig = useAnimationConfig()

// Access theme colors
const primaryColor = animConfig.colors.primary
const accentColor = animConfig.colors.accent
```

## Performance

**Target:** 60fps on modern devices, 30fps on mobile

**Optimizations:**
- Canvas-based rendering for complex visualizations
- RequestAnimationFrame with FPS throttling
- GPU-accelerated CSS transforms
- Reduced motion support
- Mobile-optimized touch targets (44px minimum)
- Efficient re-renders with React.memo and useMemo

**Performance Tips:**
```jsx
// Use Canvas for > 50 animated elements
<NeuralNetworkViz />  // ✅ Canvas-based

// Use Framer Motion for < 50 elements
<TokenFlow />  // ✅ Framer Motion

// Disable auto-play on mobile for battery life
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
<NeuralNetworkViz autoPlay={!isMobile} />
```

## Accessibility

All visualizations support:

✅ **Reduced Motion**
- Respects `prefers-reduced-motion`
- Uses `useAnimationConfig` for detection
- Provides static fallbacks

✅ **Keyboard Navigation**
- Tab-accessible controls
- Enter/Space for interactions
- Escape to close modals

✅ **Screen Readers**
- ARIA labels on interactive elements
- Semantic HTML structure
- Alternative text descriptions

✅ **High Contrast**
- WCAG AA compliant color contrasts
- Theme-aware color selection
- Border outlines for focus states

**Example:**
```jsx
const animConfig = useAnimationConfig()

if (!animConfig.enabled) {
  // Reduced motion - show static version
  return <StaticVisualization />
}

return <AnimatedVisualization />
```

## Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome/Edge | 88+ | ✅ Full |
| Firefox | 85+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| iOS Safari | 14+ | ✅ Full |
| Chrome Android | 88+ | ✅ Full |

**Required Features:**
- Canvas API
- RequestAnimationFrame
- CSS Grid
- Flexbox
- ES6+ JavaScript

## Demo Page

Visit `/animations-demo` to see all visualizations in action with:
- Interactive controls
- Theme switching
- Side-by-side comparisons
- Performance metrics
- Code examples

## API Reference

### Common Props

All visualizations accept these common patterns:

```jsx
// Size control
width={600}
height={500}

// Interactivity
interactive={true}
autoPlay={false}

// Theme (automatic via context)
// No manual theme prop needed

// Performance
speed={1}          // Animation speed multiplier
```

### useAnimationConfig Hook

```jsx
const animConfig = useAnimationConfig()

// Available properties:
animConfig.duration     // { fast, normal, slow, ... }
animConfig.easing       // { easeIn, easeOut, ... }
animConfig.colors       // { primary, accent, text, ... }
animConfig.enabled      // boolean (respects reduced motion)
animConfig.targetFPS    // 60 or 30
animConfig.theme        // Full theme object
```

## Contributing

When adding new visualizations:

1. **Create component** in `src/visualizations/[Name].jsx`
2. **Use hooks:**
   ```jsx
   import { useTheme } from '../hooks/useTheme'
   import { useAnimationConfig } from '../hooks/useAnimationConfig'
   ```
3. **Export** in `src/visualizations/index.js`
4. **Document** usage and props
5. **Add to demo page** (`src/pages/AnimationsDemo.jsx`)
6. **Test:**
   - Both themes (male/female)
   - Reduced motion
   - Mobile devices
   - Touch interactions
7. **Optimize** for 60fps
8. **Update** this README

## Troubleshooting

**Issue:** Animation is choppy
- Check `animConfig.targetFPS`
- Reduce number of animated elements
- Use Canvas for complex scenes
- Disable auto-play on low-end devices

**Issue:** Colors don't match theme
- Use `animConfig.colors` instead of hardcoded colors
- Check that `useAnimationConfig` is called

**Issue:** Canvas not rendering
- Ensure canvas ref is set correctly
- Check that `useEffect` cleanup stops animations
- Verify canvas width/height are set

**Issue:** Not responsive
- Use percentage widths or `max-width`
- Test on multiple screen sizes
- Check touch target sizes (44px minimum)

## Dependencies

- React 18.3+
- Framer Motion 11.0+
- Custom theme system (ThemeContext)
- Custom hooks (useTheme, useAnimationConfig)
