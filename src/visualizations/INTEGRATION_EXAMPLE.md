# TextGeneration Visualization - Integration Example

This document shows how to integrate the TextGeneration visualization into Module 1 content.

## Quick Integration

### Option 1: Add to Module 1 Section Component

Create a new section component for "How They Generate Text" or modify the existing one:

```jsx
// src/components/modules/HowTheyGenerateText.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import { module1Content } from '../../data/modules/module1'
import { TextGeneration } from '../../visualizations'

function HowTheyGenerateText({ gender }) {
  const { theme } = useTheme()
  
  // Get section data
  const sectionData = module1Content.sections.find(
    section => section.id === 'intro_how_generate_text'
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ padding: theme.spacing.xl }}
    >
      <h1 style={{ 
        fontSize: theme.typography.size.heading1,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.lg,
      }}>
        {sectionData.title}
      </h1>

      <p style={{
        fontSize: theme.typography.size.bodyLarge,
        color: theme.colors.text.primary,
        lineHeight: theme.typography.lineHeight.relaxed,
        marginBottom: theme.spacing.xl,
      }}>
        {sectionData.introduction[gender]}
      </p>

      {/* Interactive Visualization */}
      <TextGeneration 
        autoPlay={false}
        showProbabilityIndicators={true}
        speed={1}
      />

      {/* Rest of section content */}
      <div style={{ marginTop: theme.spacing.xxl }}>
        {/* Content blocks, examples, analogies, etc. */}
      </div>
    </motion.div>
  )
}

export default HowTheyGenerateText
```

### Option 2: Add to Existing WhatAreLLMs Component

If you want to add it to the existing component:

```jsx
// src/components/modules/WhatAreLLMs.jsx
import { TextGeneration } from '../../visualizations'

// ... inside the component render, add a section:

<section style={{ marginTop: theme.spacing.xxl }}>
  <h2 style={sectionTitleStyles}>
    See It In Action
  </h2>
  <p style={descriptionStyles}>
    Watch how an LLM generates text token-by-token:
  </p>
  <TextGeneration 
    autoPlay={false}
    showProbabilityIndicators={true}
  />
</section>
```

### Option 3: Standalone Page/Route

Create a dedicated page for interactive demonstrations:

```jsx
// src/pages/Demonstrations.jsx
import React from 'react'
import { TextGeneration } from '../visualizations'
import { useTheme } from '../hooks/useTheme'

function Demonstrations() {
  const { theme } = useTheme()

  return (
    <div style={{
      padding: theme.spacing.xxl,
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      <h1 style={{
        fontSize: theme.typography.size.heading1,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.xl,
      }}>
        Interactive Demonstrations
      </h1>

      <section style={{ marginBottom: theme.spacing.xxl }}>
        <h2 style={{
          fontSize: theme.typography.size.heading2,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.lg,
        }}>
          Text Generation Process
        </h2>
        <TextGeneration />
      </section>

      {/* Add more demonstrations here */}
    </div>
  )
}

export default Demonstrations
```

## Customization Options

### Adjust Animation Speed

```jsx
// Slower for educational emphasis
<TextGeneration speed={0.5} />

// Faster for quick demonstrations
<TextGeneration speed={2} />
```

### Auto-play for Presentations

```jsx
// Start playing automatically
<TextGeneration autoPlay={true} />
```

### Hide Probability Indicators

```jsx
// Simpler view without percentages
<TextGeneration showProbabilityIndicators={false} />
```

## Styling Integration

The visualization automatically inherits theme colors and spacing. To add custom spacing:

```jsx
<div style={{ 
  marginTop: theme.spacing.xxl,
  marginBottom: theme.spacing.xxl,
}}>
  <TextGeneration />
</div>
```

## Mobile Considerations

The visualization is fully responsive and will automatically:
- Stack controls vertically on narrow screens
- Reduce font sizes appropriately
- Adjust spacing for better mobile UX
- Increase touch target sizes (44px minimum)

## Accessibility

The visualization includes built-in accessibility features:
- Keyboard navigation (Tab to focus, Enter/Space to activate)
- Screen reader support (ARIA labels)
- Reduced motion support (automatically disables animations if user prefers)
- High contrast mode support

## Performance Tips

For optimal performance:
1. Only render one instance at a time
2. Use `autoPlay={false}` and let users initiate
3. The component automatically cleans up timeouts on unmount
4. GPU acceleration is enabled for smooth animations

## Testing

To test the integration:

1. **Visual Test**: Verify theme colors apply correctly
2. **Interaction Test**: Test all buttons (Play, Pause, Reset, Example switcher)
3. **Responsive Test**: Check on mobile, tablet, and desktop sizes
4. **Theme Test**: Switch between male and female themes
5. **Accessibility Test**: Navigate with keyboard only

## Example with Section Wrapper

Here's a complete example with proper spacing and context:

```jsx
function Module1Section2() {
  const { theme, themeName } = useTheme()
  const gender = themeName === 'female' ? 'female' : 'male'

  return (
    <div style={{
      maxWidth: '1100px',
      margin: '0 auto',
      padding: theme.spacing.xxl,
    }}>
      {/* Section Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={{
          fontSize: theme.typography.size.heading1,
          fontWeight: theme.typography.weight.bold,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.lg,
        }}>
          How LLMs Generate Text
        </h1>

        <p style={{
          fontSize: theme.typography.size.bodyLarge,
          color: theme.colors.text.primary,
          lineHeight: theme.typography.lineHeight.relaxed,
          marginBottom: theme.spacing.xxl,
        }}>
          {gender === 'male' 
            ? "Ever wonder how an LLM actually produces text that makes sense? It's not magic - it's a systematic process that's actually pretty logical once you break it down."
            : "Curious about how an LLM creates responses that flow so naturally? The process is fascinating - it's like watching a skilled writer craft a response in real-time."
          }
        </p>
      </motion.div>

      {/* Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ marginBottom: theme.spacing.xxl }}
      >
        <TextGeneration 
          autoPlay={false}
          showProbabilityIndicators={true}
          speed={1}
        />
      </motion.div>

      {/* Additional Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 style={{
          fontSize: theme.typography.size.heading2,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.lg,
        }}>
          Key Takeaways
        </h2>
        {/* More content here */}
      </motion.div>
    </div>
  )
}
```

## Next Steps

After integrating the visualization:

1. Gather user feedback on animation speed
2. Monitor performance on lower-end devices
3. Consider adding more examples based on user requests
4. Test with actual students/users
5. Iterate on probability indicator visibility
6. Consider adding sound effects toggle (currently not implemented)

## Support

For issues or questions about the visualization:
- Check the main README.md in the visualizations folder
- Review the component's PropTypes for available options
- Test in multiple browsers and devices
- Verify theme context is properly set up
