import { baseTheme } from './base.js'

/**
 * Female Theme - Summer I Turned Pretty / Sex Education Inspired
 * 
 * Warm, soft, inviting aesthetic inspired by coming-of-age shows.
 * Features peachy tones, coral, warm yellows, and soft pinks with sunset vibes.
 * 
 * Design Philosophy:
 * - Warm, approachable, and comforting color palette
 * - Soft contrasts with gentle gradients
 * - Light, airy backgrounds with peachy/cream tones
 * - Youthful, optimistic, and friendly feel
 * 
 * @module femaleTheme
 */

/**
 * Color Palette - Summer / Sex Ed Inspired
 * 
 * Primary: Peachy tones and warm corals
 * Secondary: Soft pinks and blush
 * Accent: Warm yellows and sunset oranges
 * Backgrounds: Cream, light peach, soft whites
 * Text: Warm dark browns and soft grays
 */
const colors = {
  // Primary Colors - Peachy & Coral
  primary: {
    main: '#FF7F50',        // Coral (primary CTA color)
    light: '#FFB894',       // Light peach
    dark: '#FF6B6B',        // Deep coral
    darker: '#E85D4F',      // Darker coral-red
    contrast: '#FFFFFF',    // Text on primary
  },

  // Secondary Colors - Soft Pinks & Blush
  secondary: {
    main: '#FFB6C1',        // Light pink
    light: '#FFC9D0',       // Very light pink
    dark: '#FF9BAA',        // Medium pink
    darker: '#FF8FA3',      // Deeper pink
    contrast: '#5A4A42',    // Text on secondary (warm brown)
  },

  // Accent Colors - Warm Yellows & Sunset
  accent: {
    main: '#FFD93D',        // Warm yellow
    light: '#FFE66D',       // Light yellow
    dark: '#FFC300',        // Golden yellow
    peach: '#FFDAB9',       // Peach puff
    sunset: '#FF9A76',      // Sunset orange
    contrast: '#5A4A42',    // Text on accent
  },

  // Background Levels - Light, warm, airy
  background: {
    primary: '#FFFBF5',     // Warm white (main background)
    secondary: '#FFF8DC',   // Cream/cornsilk (cards, sections)
    tertiary: '#FFEFD5',    // Papaya whip (elevated elements)
    elevated: '#FFE4CC',    // Light peach (hover states)
    overlay: 'rgba(255, 251, 245, 0.95)',  // Modal overlays
  },

  // Surface colors for cards, panels
  surface: {
    base: '#FFF8DC',        // Base surface (cream)
    raised: '#FFEFD5',      // Raised surface (papaya whip)
    overlay: '#FFE4CC',     // Overlay surface (light peach)
    highlight: 'rgba(255, 127, 80, 0.08)',  // Coral tinted surface
  },

  // Text Colors - Warm, readable
  text: {
    primary: '#3D2E29',     // Dark warm brown (main text)
    secondary: '#5A4A42',   // Medium warm brown (secondary text)
    tertiary: '#8B7D77',    // Light warm brown (tertiary text)
    disabled: '#B8ACA6',    // Disabled text (lighter brown-gray)
    inverse: '#FFFFFF',     // Text on dark backgrounds
    link: '#FF6B6B',        // Link color (coral)
    linkHover: '#FF7F50',   // Link hover (lighter coral)
  },

  // Border Colors
  border: {
    default: '#F0D9C7',     // Default borders (light peach-tan)
    light: '#F8E8D8',       // Light borders
    dark: '#E8C9B3',        // Dark borders
    focus: '#FF7F50',       // Focus state (coral)
    accent: '#FFD93D',      // Accent borders (yellow)
  },

  // State Colors - Warm variants
  state: {
    success: '#4ECDC4',     // Turquoise success
    warning: '#FFB347',     // Warm orange warning
    error: '#FF6B6B',       // Coral-red error
    info: '#74B9FF',        // Soft blue info
  },

  // Semantic Colors
  semantic: {
    successBg: 'rgba(78, 205, 196, 0.1)',
    successText: '#3BAFA6',
    warningBg: 'rgba(255, 179, 71, 0.1)',
    warningText: '#FF9F1C',
    errorBg: 'rgba(255, 107, 107, 0.1)',
    errorText: '#FF6B6B',
    infoBg: 'rgba(116, 185, 255, 0.1)',
    infoText: '#5A9FD4',
  },

  // Gradient Overlays - Sunset inspired
  gradients: {
    primary: 'linear-gradient(135deg, #FF7F50 0%, #FFB894 100%)',
    secondary: 'linear-gradient(135deg, #FFB6C1 0%, #FFC9D0 100%)',
    accent: 'linear-gradient(135deg, #FFD93D 0%, #FFE66D 100%)',
    sunset: 'linear-gradient(135deg, #FFD93D 0%, #FF9A76 50%, #FF7F50 100%)',
    peachy: 'linear-gradient(135deg, #FFDAB9 0%, #FFB894 50%, #FFB6C1 100%)',
    summer: 'linear-gradient(135deg, #FFF8DC 0%, #FFDAB9 25%, #FFB894 50%, #FF7F50 75%, #FFB6C1 100%)',
    warm: 'linear-gradient(180deg, rgba(255, 251, 245, 0) 0%, rgba(255, 215, 185, 0.3) 100%)',
  },
}

/**
 * Theme-specific Shadow System
 * 
 * Soft, warm shadows that complement the gentle aesthetic.
 */
const shadows = {
  ...baseTheme.shadows,
  
  // Soft glow effects
  glowPrimary: '0 0 20px rgba(255, 127, 80, 0.3)',         // Coral glow
  glowSecondary: '0 0 20px rgba(255, 182, 193, 0.3)',      // Pink glow
  glowAccent: '0 0 20px rgba(255, 217, 61, 0.3)',          // Yellow glow
  glowPrimaryLarge: '0 0 40px rgba(255, 127, 80, 0.4)',    // Large coral glow
  glowSecondaryLarge: '0 0 40px rgba(255, 182, 193, 0.4)', // Large pink glow
  glowAccentLarge: '0 0 40px rgba(255, 217, 61, 0.4)',     // Large yellow glow
  
  // Warm shadows (with subtle warm tint)
  warmSmall: '0 1px 2px 0 rgba(90, 74, 66, 0.08)',
  warmMedium: '0 4px 6px -1px rgba(90, 74, 66, 0.12), 0 2px 4px -1px rgba(90, 74, 66, 0.08)',
  warmLarge: '0 10px 15px -3px rgba(90, 74, 66, 0.15), 0 4px 6px -2px rgba(90, 74, 66, 0.08)',
  warmXLarge: '0 20px 25px -5px rgba(90, 74, 66, 0.15), 0 10px 10px -5px rgba(90, 74, 66, 0.06)',
  
  // Combined elevation + glow
  cardElevated: '0 10px 15px -3px rgba(90, 74, 66, 0.12), 0 0 20px rgba(255, 127, 80, 0.15)',
  buttonPrimary: '0 4px 6px rgba(90, 74, 66, 0.15), 0 0 15px rgba(255, 127, 80, 0.25)',
  buttonSecondary: '0 4px 6px rgba(90, 74, 66, 0.15), 0 0 15px rgba(255, 182, 193, 0.25)',
}

/**
 * Theme-specific Border Styles
 * 
 * Soft, warm border effects.
 */
const borders = {
  ...baseTheme.borderWidth,
  
  // Special warm borders
  warmPrimary: `2px solid ${colors.primary.main}`,
  warmSecondary: `2px solid ${colors.secondary.main}`,
  warmAccent: `2px solid ${colors.accent.main}`,
  
  // Gradient borders (use with border-image or pseudo-elements)
  gradientPrimary: `2px solid transparent`,
  gradientAccent: `2px solid transparent`,
}

/**
 * Female Theme Complete Configuration
 * 
 * Combines base tokens with female-specific color and style tokens.
 * Ready for ThemeProvider consumption.
 * 
 * Usage:
 *   <ThemeProvider theme={femaleTheme}>
 *     <App />
 *   </ThemeProvider>
 * 
 * Access tokens:
 *   theme.colors.primary.main
 *   theme.spacing.md
 *   theme.typography.size.heading1
 *   theme.shadows.warmMedium
 */
export const femaleTheme = {
  // Spread base theme tokens
  ...baseTheme,
  
  // Theme identifier
  name: 'female',
  variant: 'summer-sex-ed',
  
  // Override/extend with female-specific tokens
  colors,
  shadows,
  borders,
  
  // Theme metadata
  meta: {
    description: 'Warm, soft, inviting theme inspired by Summer I Turned Pretty and Sex Education',
    inspiration: 'Coming-of-age series with warm, approachable aesthetics',
    characteristics: ['warm', 'soft', 'inviting', 'peachy', 'light', 'friendly', 'optimistic'],
    primaryColors: ['coral', 'peach', 'pink', 'yellow'],
  },
}

export default femaleTheme
