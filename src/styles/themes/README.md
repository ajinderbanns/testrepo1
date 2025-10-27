# Theme System Documentation

A comprehensive design token system with dual-theme support for the educational application.

## Overview

This theme system provides a complete set of design tokens for building consistent, accessible, and beautiful user interfaces. It includes:

- **Base Tokens**: Shared design tokens (typography, spacing, breakpoints, shadows, borders)
- **Male Theme**: Bold, neon, high-contrast aesthetic inspired by HBO's Euphoria
- **Female Theme**: Warm, soft, inviting aesthetic inspired by Summer I Turned Pretty / Sex Education

## File Structure

```
src/styles/themes/
├── base.js          # Shared design tokens
├── maleTheme.js     # Male/Euphoria-inspired theme
├── femaleTheme.js   # Female/Summer-inspired theme
├── index.js         # Central export with utilities
└── README.md        # This file
```

## Quick Start

### Basic Usage

```jsx
import { maleTheme, femaleTheme } from '@/styles/themes'

// Access theme tokens
console.log(maleTheme.colors.primary.main)  // '#9333EA' (purple)
console.log(femaleTheme.colors.primary.main) // '#FF7F50' (coral)
```

### With Styled Components / Emotion

```jsx
import { ThemeProvider } from 'styled-components' // or @emotion/react
import { maleTheme } from '@/styles/themes'
import styled from 'styled-components'

function App() {
  return (
    <ThemeProvider theme={maleTheme}>
      <StyledButton>Click Me</StyledButton>
    </ThemeProvider>
  )
}

const StyledButton = styled.button`
  background-color: ${props => props.theme.colors.primary.main};
  color: ${props => props.theme.colors.primary.contrast};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  font-size: ${props => props.theme.typography.size.body};
  font-weight: ${props => props.theme.typography.weight.semibold};
  border-radius: ${props => props.theme.radii.medium};
  box-shadow: ${props => props.theme.shadows.buttonPrimary};
  transition: ${props => props.theme.transitions.default};

  &:hover {
    box-shadow: ${props => props.theme.shadows.glowPrimaryLarge};
  }
`
```

### With React Context (Custom Implementation)

```jsx
import React, { createContext, useContext, useState } from 'react'
import { getTheme } from '@/styles/themes'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState('male')
  const theme = getTheme(themeName)

  return (
    <ThemeContext.Provider value={{ theme, themeName, setThemeName }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}

// Usage in components
function MyComponent() {
  const { theme, setThemeName } = useTheme()
  
  return (
    <div style={{
      backgroundColor: theme.colors.background.primary,
      color: theme.colors.text.primary,
      padding: theme.spacing.lg,
    }}>
      <button onClick={() => setThemeName('female')}>
        Switch to Female Theme
      </button>
    </div>
  )
}
```

### Dynamic Theme Switching

```jsx
import { useState } from 'react'
import { themes, getTheme, isValidTheme } from '@/styles/themes'

function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState('male')
  const theme = getTheme(currentTheme)

  const handleThemeChange = (newTheme) => {
    if (isValidTheme(newTheme)) {
      setCurrentTheme(newTheme)
    }
  }

  return (
    <div>
      <button onClick={() => handleThemeChange('male')}>Male Theme</button>
      <button onClick={() => handleThemeChange('female')}>Female Theme</button>
    </div>
  )
}
```

## Design Token Categories

### Colors

Both themes include comprehensive color systems:

```jsx
// Color structure (example from maleTheme)
theme.colors = {
  primary: { main, light, dark, darker, contrast },
  secondary: { main, light, dark, darker, contrast },
  accent: { main, light, dark, orange, magenta, contrast },
  background: { primary, secondary, tertiary, elevated, overlay },
  surface: { base, raised, overlay, highlight },
  text: { primary, secondary, tertiary, disabled, inverse, link, linkHover },
  border: { default, light, dark, focus, accent },
  state: { success, warning, error, info },
  semantic: { successBg, successText, warningBg, ... },
  gradients: { primary, secondary, accent, ... }
}
```

#### Male Theme Colors (Euphoria)
- **Primary**: Deep purples (`#9333EA`, `#6B46C1`)
- **Secondary**: Electric blues (`#3B82F6`, `#0EA5E9`)
- **Accent**: Hot pinks & neon (`#EC4899`, `#F97316`)
- **Background**: Deep blacks (`#0A0A0A`, `#1A1A1A`)
- **Text**: High contrast whites (`#FFFFFF`, `#E5E5E5`)

#### Female Theme Colors (Summer/Sex Ed)
- **Primary**: Coral & peach (`#FF7F50`, `#FFB894`)
- **Secondary**: Soft pinks (`#FFB6C1`, `#FFC9D0`)
- **Accent**: Warm yellows (`#FFD93D`, `#FFE66D`)
- **Background**: Cream & warm whites (`#FFFBF5`, `#FFF8DC`)
- **Text**: Warm browns (`#3D2E29`, `#5A4A42`)

### Typography

```jsx
theme.typography = {
  family: {
    primary: 'Inter, system fonts',
    secondary: 'Poppins, Inter',
    mono: 'Fira Code, Courier New'
  },
  size: {
    display: '4.5rem',    // 72px
    heading1: '3rem',     // 48px
    heading2: '2.25rem',  // 36px
    heading3: '1.875rem', // 30px
    heading4: '1.5rem',   // 24px
    heading5: '1.25rem',  // 20px
    heading6: '1.125rem', // 18px
    body: '1rem',         // 16px
    bodyLarge: '1.125rem',
    bodySmall: '0.875rem',
    caption: '0.75rem',
    tiny: '0.625rem'
  },
  weight: { light, regular, medium, semibold, bold, extrabold },
  lineHeight: { tight, snug, normal, relaxed, loose },
  letterSpacing: { tighter, tight, normal, wide, wider, widest }
}
```

**Usage Example:**
```jsx
<h1 style={{
  fontFamily: theme.typography.family.primary,
  fontSize: theme.typography.size.heading1,
  fontWeight: theme.typography.weight.bold,
  lineHeight: theme.typography.lineHeight.tight,
}}>
  Page Title
</h1>
```

### Spacing

Consistent spacing scale based on 4px grid:

```jsx
theme.spacing = {
  none: '0',
  xxs: '0.25rem',   // 4px
  xs: '0.5rem',     // 8px
  sm: '0.75rem',    // 12px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  xxl: '3rem',      // 48px
  xxxl: '4rem',     // 64px
  huge: '6rem',     // 96px
  massive: '8rem'   // 128px
}
```

**Usage Example:**
```jsx
<div style={{
  padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
  marginBottom: theme.spacing.xxl,
  gap: theme.spacing.md,
}}>
  Content
</div>
```

### Breakpoints

Responsive design breakpoints:

```jsx
theme.breakpoints = {
  mobile: '320px',
  mobileLarge: '480px',
  tablet: '768px',
  desktop: '1024px',
  desktopLarge: '1280px',
  wide: '1536px',
  ultrawide: '1920px'
}

// Pre-built media queries
theme.mediaQueries = {
  mobile: '@media (min-width: 320px)',
  tablet: '@media (min-width: 768px)',
  desktop: '@media (min-width: 1024px)',
  // ... etc
}
```

**Usage Example:**
```jsx
const ResponsiveContainer = styled.div`
  padding: ${props => props.theme.spacing.md};
  
  ${props => props.theme.mediaQueries.tablet} {
    padding: ${props => props.theme.spacing.lg};
  }
  
  ${props => props.theme.mediaQueries.desktop} {
    padding: ${props => props.theme.spacing.xl};
  }
`
```

### Shadows

Elevation system with theme-specific glow effects:

```jsx
// Base shadows (all themes)
theme.shadows = {
  none, small, medium, large, xlarge, xxlarge,
  inner, glowSmall, glowMedium, glowLarge
}

// Male theme additions (neon glows)
maleTheme.shadows = {
  ...baseShadows,
  glowPrimary: '0 0 20px rgba(147, 51, 234, 0.5)',  // Purple glow
  buttonPrimary: '0 4px 6px rgba(0,0,0,0.3), 0 0 15px rgba(147,51,234,0.4)',
  cardElevated: '...'
}

// Female theme additions (warm soft shadows)
femaleTheme.shadows = {
  ...baseShadows,
  warmMedium: '0 4px 6px rgba(90, 74, 66, 0.12)',
  glowPrimary: '0 0 20px rgba(255, 127, 80, 0.3)',  // Coral glow
  buttonPrimary: '...'
}
```

### Border Radius

```jsx
theme.radii = {
  none: '0',
  small: '0.25rem',    // 4px
  medium: '0.5rem',    // 8px
  large: '0.75rem',    // 12px
  xlarge: '1rem',      // 16px
  xxlarge: '1.5rem',   // 24px
  full: '9999px',      // Pills
  circle: '50%'        // Perfect circles
}
```

### Transitions

```jsx
theme.transitions = {
  duration: { instant, fast, normal, slow, slower },
  easing: { linear, easeIn, easeOut, easeInOut, sharp, bounce },
  default: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
  fast: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: 'all 350ms cubic-bezier(0.4, 0, 0.2, 1)'
}
```

### Z-Index

```jsx
theme.zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070
}
```

## Theme-Specific Features

### Male Theme (Euphoria)

**Characteristics:**
- Bold, high-contrast colors
- Neon glow effects
- Dark backgrounds with vibrant accents
- Energetic, edgy aesthetic

**Special Features:**
```jsx
maleTheme.colors.gradients.neon
maleTheme.colors.gradients.euphoric
maleTheme.shadows.glowPrimary
maleTheme.shadows.glowPrimaryLarge
```

### Female Theme (Summer/Sex Ed)

**Characteristics:**
- Warm, inviting color palette
- Soft contrasts and gentle gradients
- Light, airy backgrounds
- Friendly, optimistic aesthetic

**Special Features:**
```jsx
femaleTheme.colors.gradients.sunset
femaleTheme.colors.gradients.peachy
femaleTheme.shadows.warmMedium
femaleTheme.shadows.glowPrimary // Soft coral glow
```

## Best Practices

### 1. Always Use Theme Tokens

❌ **Don't:**
```jsx
<div style={{ color: '#9333EA', padding: '16px' }}>
```

✅ **Do:**
```jsx
<div style={{ 
  color: theme.colors.primary.main, 
  padding: theme.spacing.md 
}}>
```

### 2. Use Semantic Color Names

❌ **Don't:**
```jsx
backgroundColor: theme.colors.primary.main // For success states
```

✅ **Do:**
```jsx
backgroundColor: theme.colors.state.success
```

### 3. Leverage Spacing Scale

❌ **Don't:**
```jsx
margin: '18px'  // Arbitrary value
```

✅ **Do:**
```jsx
margin: theme.spacing.lg  // 24px (part of system)
```

### 4. Use Consistent Elevation

```jsx
// Card hierarchy
<Card style={{ boxShadow: theme.shadows.small }}>
  Basic card
</Card>

<Card style={{ boxShadow: theme.shadows.medium }}>
  Default card
</Card>

<Card style={{ boxShadow: theme.shadows.cardElevated }}>
  Elevated card with theme-specific glow
</Card>
```

### 5. Responsive Typography

```jsx
const Heading = styled.h1`
  font-size: ${props => props.theme.typography.size.heading3};
  
  ${props => props.theme.mediaQueries.tablet} {
    font-size: ${props => props.theme.typography.size.heading2};
  }
  
  ${props => props.theme.mediaQueries.desktop} {
    font-size: ${props => props.theme.typography.size.heading1};
  }
`
```

## Utility Functions

### `getTheme(themeName)`
Get a theme by name with fallback:
```jsx
const theme = getTheme('female') // Returns femaleTheme
const theme = getTheme('invalid') // Returns maleTheme (default)
```

### `isValidTheme(themeName)`
Validate a theme name:
```jsx
isValidTheme('male')   // true
isValidTheme('custom') // false
```

### `getThemeMetadata()`
Get metadata for all themes:
```jsx
const metadata = getThemeMetadata()
// Returns array of theme metadata objects with descriptions, characteristics, etc.
```

## Extending Themes

To add a new theme:

1. Create `src/styles/themes/customTheme.js`
2. Import base theme and extend it
3. Export the theme
4. Add to `themes` object in `index.js`

```jsx
// customTheme.js
import { baseTheme } from './base.js'

export const customTheme = {
  ...baseTheme,
  name: 'custom',
  colors: {
    // Your custom colors
  },
  // Override other tokens as needed
}

// index.js
import { customTheme } from './customTheme.js'

export const themes = {
  male: maleTheme,
  female: femaleTheme,
  custom: customTheme, // Add here
}
```

## TypeScript Support (Future)

For TypeScript projects, create `theme.types.ts`:

```typescript
export interface Theme {
  name: string
  variant: string
  colors: {
    primary: ColorScale
    secondary: ColorScale
    // ... etc
  }
  typography: Typography
  spacing: Spacing
  // ... etc
}
```

## Troubleshooting

### Theme not updating
- Ensure ThemeProvider wraps your components
- Check that theme prop is correctly passed
- Verify component is consuming theme via props or context

### Colors look different
- Check if browser dark mode is interfering
- Verify hex values match theme definitions
- Test in different browsers for consistency

### Responsive issues
- Confirm breakpoints match design requirements
- Test media queries at exact breakpoint values
- Use browser dev tools to debug responsive behavior

## Additional Resources

- [Styled Components Documentation](https://styled-components.com/docs/advanced#theming)
- [Emotion Theming Guide](https://emotion.sh/docs/theming)
- [Design Tokens Specification](https://design-tokens.github.io/community-group/format/)

---

**Version:** 1.0.0  
**Last Updated:** 2024  
**Maintainer:** Development Team
