/**
 * useAnimationConfig Hook
 * 
 * Custom hook that provides theme-aware animation configuration.
 * Adjusts animation timing and behavior based on user preferences and device capabilities.
 * 
 * Features:
 * - Respects prefers-reduced-motion
 * - Adjusts timing for mobile devices
 * - Provides theme-aware color configurations
 * - Returns optimized FPS settings
 * 
 * @module useAnimationConfig
 */

import { useMemo } from 'react'
import { useTheme } from './useTheme'
import {
  durations,
  easings,
  staggerDelays,
  getOptimalFPS,
} from '../utils/animationHelpers'

/**
 * useAnimationConfig Hook
 * 
 * Returns animation configuration based on theme and user preferences.
 * 
 * @param {Object} options - Configuration options
 * @param {boolean} options.respectReducedMotion - Whether to disable animations for prefers-reduced-motion
 * @param {boolean} options.adjustForMobile - Whether to adjust timing for mobile devices
 * @returns {Object} Animation configuration
 * 
 * @example
 * function MyComponent() {
 *   const animConfig = useAnimationConfig()
 *   
 *   return (
 *     <motion.div
 *       initial={{ opacity: 0 }}
 *       animate={{ opacity: 1 }}
 *       transition={{
 *         duration: animConfig.duration.normal,
 *         ease: animConfig.easing.easeOut,
 *       }}
 *     >
 *       Content
 *     </motion.div>
 *   )
 * }
 * 
 * @example
 * // With Canvas visualization
 * function CanvasViz() {
 *   const animConfig = useAnimationConfig()
 *   const colors = animConfig.colors
 *   
 *   // Use colors.primary, colors.accent, etc. in canvas drawing
 * }
 */
export const useAnimationConfig = ({
  respectReducedMotion = true,
  adjustForMobile = true,
} = {}) => {
  const { theme, themeName } = useTheme()
  
  const config = useMemo(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = respectReducedMotion &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // Check if mobile device
    const isMobile = adjustForMobile &&
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    
    // Adjust durations if needed
    const adjustedDurations = prefersReducedMotion
      ? {
          instant: 0,
          fast: 0,
          normal: 0,
          medium: 0,
          slow: 0,
          slower: 0,
          slowest: 0,
          cinematic: 0,
        }
      : isMobile
      ? {
          instant: durations.instant,
          fast: durations.fast * 0.8,
          normal: durations.normal * 0.8,
          medium: durations.medium * 0.8,
          slow: durations.slow * 0.8,
          slower: durations.slower * 0.8,
          slowest: durations.slowest * 0.8,
          cinematic: durations.cinematic * 0.8,
        }
      : durations
    
    // Adjust stagger delays
    const adjustedStagger = prefersReducedMotion
      ? {
          tight: 0,
          normal: 0,
          relaxed: 0,
          loose: 0,
          dramatic: 0,
        }
      : isMobile
      ? {
          tight: staggerDelays.tight * 0.8,
          normal: staggerDelays.normal * 0.8,
          relaxed: staggerDelays.relaxed * 0.8,
          loose: staggerDelays.loose * 0.8,
          dramatic: staggerDelays.dramatic * 0.8,
        }
      : staggerDelays
    
    // Get optimal FPS
    const targetFPS = getOptimalFPS()
    
    // Extract theme colors for visualizations
    const colors = {
      // Primary colors
      primary: theme.colors.primary.main,
      primaryLight: theme.colors.primary.light,
      primaryDark: theme.colors.primary.dark,
      
      // Secondary colors
      secondary: theme.colors.secondary.main,
      secondaryLight: theme.colors.secondary.light,
      secondaryDark: theme.colors.secondary.dark,
      
      // Accent colors
      accent: theme.colors.accent.main,
      accentLight: theme.colors.accent.light,
      accentDark: theme.colors.accent.dark,
      
      // Background colors
      background: theme.colors.background.primary,
      backgroundSecondary: theme.colors.background.secondary,
      backgroundTertiary: theme.colors.background.tertiary,
      
      // Surface colors
      surface: theme.colors.surface.base,
      surfaceRaised: theme.colors.surface.raised,
      
      // Text colors
      text: theme.colors.text.primary,
      textSecondary: theme.colors.text.secondary,
      textTertiary: theme.colors.text.tertiary,
      
      // State colors
      success: theme.colors.state.success.main,
      warning: theme.colors.state.warning.main,
      error: theme.colors.state.error.main,
      info: theme.colors.state.info.main,
      
      // Border colors
      border: theme.colors.border.default,
      borderLight: theme.colors.border.light,
      borderAccent: theme.colors.border.accent,
    }
    
    return {
      // Timing
      duration: adjustedDurations,
      stagger: adjustedStagger,
      easing: easings,
      
      // State flags
      enabled: !prefersReducedMotion,
      isMobile,
      prefersReducedMotion,
      
      // Performance
      targetFPS,
      
      // Theme integration
      colors,
      themeName,
      theme,
      
      // Spacing and sizing (from theme)
      spacing: theme.spacing,
      radii: theme.radii,
      shadows: theme.shadows,
    }
  }, [theme, themeName, respectReducedMotion, adjustForMobile])
  
  return config
}

/**
 * useReducedMotion Hook
 * 
 * Simple hook that returns whether user prefers reduced motion.
 * 
 * @returns {boolean} True if user prefers reduced motion
 * 
 * @example
 * function MyComponent() {
 *   const reducedMotion = useReducedMotion()
 *   
 *   if (reducedMotion) {
 *     return <StaticVersion />
 *   }
 *   
 *   return <AnimatedVersion />
 * }
 */
export const useReducedMotion = () => {
  return useMemo(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])
}

export default useAnimationConfig
