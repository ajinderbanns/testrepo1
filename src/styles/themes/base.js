/**
 * Base Design Tokens
 * 
 * Shared foundational design tokens used across all themes.
 * These tokens define typography, spacing, layout, and structural elements
 * that remain consistent regardless of theme selection.
 * 
 * @module base
 */

/**
 * Typography System
 * 
 * Comprehensive type scale with responsive sizing, font families, weights, and spacing.
 * Font sizes use rem units for accessibility and scalability.
 * 
 * Usage:
 *   fontSize: theme.typography.size.heading1
 *   fontFamily: theme.typography.family.primary
 *   fontWeight: theme.typography.weight.bold
 */
const typography = {
  // Font Families
  family: {
    primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    secondary: '"Poppins", "Inter", sans-serif',
    mono: '"Fira Code", "Courier New", monospace',
  },

  // Font Size Scale (fluid/responsive scale)
  // Base: 16px (1rem) - scales from mobile to desktop
  size: {
    // Display sizes (for hero sections and major headings)
    display: '4.5rem',    // 72px - Hero text
    
    // Heading sizes
    heading1: '3rem',     // 48px - Page titles
    heading2: '2.25rem',  // 36px - Section headers
    heading3: '1.875rem', // 30px - Subsection headers
    heading4: '1.5rem',   // 24px - Card titles
    heading5: '1.25rem',  // 20px - Small headings
    heading6: '1.125rem', // 18px - Tiny headings
    
    // Body text sizes
    body: '1rem',         // 16px - Standard body text
    bodyLarge: '1.125rem',// 18px - Large body text
    bodySmall: '0.875rem',// 14px - Small body text
    
    // UI text sizes
    caption: '0.75rem',   // 12px - Captions, labels
    tiny: '0.625rem',     // 10px - Fine print
  },

  // Font Weights
  weight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
}

/**
 * Spacing System
 * 
 * Consistent spacing scale based on 4px grid.
 * Use these values for margins, padding, gaps, and positioning.
 * 
 * Usage:
 *   padding: theme.spacing.md
 *   marginBottom: theme.spacing.xl
 */
const spacing = {
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
  massive: '8rem',  // 128px
}

/**
 * Breakpoints
 * 
 * Responsive design breakpoints for different device sizes.
 * Use with media queries for responsive layouts.
 * 
 * Usage:
 *   @media (min-width: ${theme.breakpoints.tablet}) { ... }
 */
const breakpoints = {
  mobile: '320px',       // Small mobile devices
  mobileLarge: '480px',  // Large mobile devices
  tablet: '768px',       // Tablets and small laptops
  desktop: '1024px',     // Desktop and laptops
  desktopLarge: '1280px',// Large desktop screens
  wide: '1536px',        // Wide/ultrawide displays
  ultrawide: '1920px',   // Ultra-wide displays
}

/**
 * Media Queries (Helper)
 * 
 * Pre-built media query strings for convenience.
 * 
 * Usage:
 *   ${theme.mediaQueries.tablet} { ... }
 */
const mediaQueries = {
  mobile: `@media (min-width: ${breakpoints.mobile})`,
  mobileLarge: `@media (min-width: ${breakpoints.mobileLarge})`,
  tablet: `@media (min-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
  desktopLarge: `@media (min-width: ${breakpoints.desktopLarge})`,
  wide: `@media (min-width: ${breakpoints.wide})`,
  ultrawide: `@media (min-width: ${breakpoints.ultrawide})`,
}

/**
 * Shadow System
 * 
 * Elevation levels using box shadows.
 * Use these to create depth and hierarchy in the UI.
 * 
 * Usage:
 *   boxShadow: theme.shadows.medium
 */
const shadows = {
  none: 'none',
  
  // Subtle elevation
  small: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  
  // Default card elevation
  medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  
  // Prominent elements (modals, popovers)
  large: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  
  // Very prominent (major modals, drawers)
  xlarge: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  
  // Maximum elevation
  xxlarge: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  
  // Inner shadow for inputs
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  
  // Glow effects (colored shadows added in theme-specific files)
  glowSmall: '0 0 10px rgba(0, 0, 0, 0.1)',
  glowMedium: '0 0 20px rgba(0, 0, 0, 0.15)',
  glowLarge: '0 0 30px rgba(0, 0, 0, 0.2)',
}

/**
 * Border Radius System
 * 
 * Consistent corner radius values for different UI element types.
 * 
 * Usage:
 *   borderRadius: theme.radii.medium
 */
const radii = {
  none: '0',
  small: '0.25rem',    // 4px - Subtle rounding
  medium: '0.5rem',    // 8px - Default buttons, cards
  large: '0.75rem',    // 12px - Larger cards
  xlarge: '1rem',      // 16px - Feature cards
  xxlarge: '1.5rem',   // 24px - Hero sections
  full: '9999px',      // Pills, circular avatars
  circle: '50%',       // Perfect circles
}

/**
 * Border Widths
 * 
 * Standard border width values.
 * 
 * Usage:
 *   borderWidth: theme.borderWidth.medium
 */
const borderWidth = {
  none: '0',
  thin: '1px',
  medium: '2px',
  thick: '3px',
  heavy: '4px',
}

/**
 * Z-Index Scale
 * 
 * Standardized z-index values for proper layering.
 * 
 * Usage:
 *   zIndex: theme.zIndex.modal
 */
const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
}

/**
 * Transitions
 * 
 * Standard animation timing and easing functions.
 * 
 * Usage:
 *   transition: theme.transitions.default
 */
const transitions = {
  // Durations
  duration: {
    instant: '100ms',
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
    slower: '500ms',
  },

  // Easing functions
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Pre-built transitions
  default: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
  fast: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: 'all 350ms cubic-bezier(0.4, 0, 0.2, 1)',
}

/**
 * Base Theme Export
 * 
 * Combines all base tokens into a single object.
 * This object is merged with theme-specific tokens (maleTheme, femaleTheme).
 */
export const baseTheme = {
  typography,
  spacing,
  breakpoints,
  mediaQueries,
  shadows,
  radii,
  borderWidth,
  zIndex,
  transitions,
}

export default baseTheme
