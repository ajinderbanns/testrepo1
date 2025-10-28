/**
 * Animation Helpers and Configuration Utilities
 * 
 * Provides timing, easing, stagger, and configuration utilities for consistent
 * animations across the application. Works with Framer Motion and custom animations.
 * 
 * @module animationHelpers
 */

/**
 * Standard Easing Functions
 * 
 * Pre-configured easing curves for different animation types.
 * Compatible with Framer Motion and CSS transitions.
 */
export const easings = {
  // Standard easings
  linear: [0, 0, 1, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  
  // Material Design easings
  standard: [0.4, 0.0, 0.2, 1],
  decelerate: [0.0, 0.0, 0.2, 1],
  accelerate: [0.4, 0.0, 1, 1],
  
  // Custom cinematic easings
  smooth: [0.45, 0, 0.55, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  elastic: [0.68, -0.6, 0.32, 1.6],
  
  // Euphoria-inspired dramatic easings
  dramatic: [0.22, 1, 0.36, 1],
  snap: [0.87, 0, 0.13, 1],
  
  // For visualizations
  smooth3D: [0.33, 1, 0.68, 1],
}

/**
 * Standard Animation Durations (in seconds)
 * 
 * Consistent timing values for different animation types.
 */
export const durations = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  medium: 0.4,
  slow: 0.6,
  slower: 0.8,
  slowest: 1.0,
  cinematic: 1.5,
}

/**
 * Stagger Delays for Child Animations
 * 
 * Time delays between sequential animations of child elements.
 */
export const staggerDelays = {
  tight: 0.03,
  normal: 0.05,
  relaxed: 0.1,
  loose: 0.15,
  dramatic: 0.2,
}

/**
 * Create Stagger Configuration
 * 
 * Generates stagger configuration for Framer Motion's staggerChildren.
 * 
 * @param {number} delay - Delay between each child (in seconds)
 * @param {string} direction - Direction of stagger ('forward' or 'reverse')
 * @returns {Object} Stagger configuration object
 * 
 * @example
 * const stagger = createStagger(0.1, 'forward')
 */
export const createStagger = (delay = staggerDelays.normal, direction = 'forward') => ({
  staggerChildren: delay,
  staggerDirection: direction === 'forward' ? 1 : -1,
})

/**
 * Create Spring Configuration
 * 
 * Generates spring animation configuration for Framer Motion.
 * 
 * @param {string} type - Spring type ('gentle', 'bouncy', 'stiff', 'slow', 'molasses')
 * @returns {Object} Spring configuration
 * 
 * @example
 * const spring = createSpring('bouncy')
 */
export const createSpring = (type = 'gentle') => {
  const springs = {
    gentle: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
    bouncy: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
    stiff: {
      type: 'spring',
      stiffness: 400,
      damping: 30,
    },
    slow: {
      type: 'spring',
      stiffness: 80,
      damping: 20,
    },
    molasses: {
      type: 'spring',
      stiffness: 50,
      damping: 20,
    },
  }
  
  return springs[type] || springs.gentle
}

/**
 * Create Transition Configuration
 * 
 * Generates complete transition configuration with timing and easing.
 * 
 * @param {number} duration - Animation duration in seconds
 * @param {Array} ease - Easing curve (cubic bezier array)
 * @param {number} delay - Delay before animation starts
 * @returns {Object} Transition configuration
 * 
 * @example
 * const transition = createTransition(0.3, easings.easeOut, 0.1)
 */
export const createTransition = (
  duration = durations.normal,
  ease = easings.easeOut,
  delay = 0
) => ({
  duration,
  ease,
  delay,
})

/**
 * Fade Transition Variants
 * 
 * Pre-built fade in/out animation variants for Framer Motion.
 */
export const fadeVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: createTransition(durations.normal, easings.easeOut),
  },
  exit: {
    opacity: 0,
    transition: createTransition(durations.fast, easings.easeIn),
  },
}

/**
 * Scale Transition Variants
 * 
 * Pre-built scale animation variants.
 */
export const scaleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: createTransition(durations.normal, easings.easeOut),
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: createTransition(durations.fast, easings.easeIn),
  },
}

/**
 * Slide Transition Variants
 * 
 * Pre-built slide animation variants (from bottom, top, left, right).
 */
export const slideVariants = {
  fromBottom: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: createTransition(durations.medium, easings.easeOut),
    },
    exit: {
      opacity: 0,
      y: -40,
      transition: createTransition(durations.fast, easings.easeIn),
    },
  },
  fromTop: {
    hidden: { opacity: 0, y: -40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: createTransition(durations.medium, easings.easeOut),
    },
    exit: {
      opacity: 0,
      y: 40,
      transition: createTransition(durations.fast, easings.easeIn),
    },
  },
  fromLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: createTransition(durations.medium, easings.easeOut),
    },
    exit: {
      opacity: 0,
      x: 40,
      transition: createTransition(durations.fast, easings.easeIn),
    },
  },
  fromRight: {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: createTransition(durations.medium, easings.easeOut),
    },
    exit: {
      opacity: 0,
      x: -40,
      transition: createTransition(durations.fast, easings.easeIn),
    },
  },
}

/**
 * Calculate Optimal FPS for Canvas
 * 
 * Determines if 60fps can be maintained based on performance.
 * 
 * @returns {number} Target FPS (60 or 30)
 */
export const getOptimalFPS = () => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) return 30
  
  // Check device capabilities (rough heuristic)
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  return isMobile ? 30 : 60
}

/**
 * RequestAnimationFrame Wrapper with FPS Control
 * 
 * Throttles animation frame to target FPS for performance.
 * 
 * @param {Function} callback - Function to call each frame
 * @param {number} fps - Target frames per second
 * @returns {Object} Control object with start/stop methods
 * 
 * @example
 * const animation = createRAF(draw, 60)
 * animation.start()
 * // Later: animation.stop()
 */
export const createRAF = (callback, fps = 60) => {
  let rafId = null
  let lastTime = 0
  const interval = 1000 / fps
  
  const animate = (currentTime) => {
    rafId = requestAnimationFrame(animate)
    
    const deltaTime = currentTime - lastTime
    
    if (deltaTime >= interval) {
      lastTime = currentTime - (deltaTime % interval)
      callback(deltaTime / 1000) // Pass time in seconds
    }
  }
  
  return {
    start: () => {
      lastTime = performance.now()
      rafId = requestAnimationFrame(animate)
    },
    stop: () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
    },
  }
}

/**
 * Interpolation Functions
 * 
 * Linear interpolation and other interpolation utilities.
 */
export const lerp = (start, end, t) => start + (end - start) * t

export const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

export const map = (value, inMin, inMax, outMin, outMax) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

/**
 * Easing Function Implementation (for Canvas)
 * 
 * Apply easing to a value between 0 and 1.
 * 
 * @param {number} t - Progress (0 to 1)
 * @param {string} type - Easing type
 * @returns {number} Eased value
 */
export const applyEasing = (t, type = 'easeOut') => {
  switch (type) {
    case 'linear':
      return t
    case 'easeIn':
      return t * t
    case 'easeOut':
      return t * (2 - t)
    case 'easeInOut':
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    case 'bounce':
      if (t < 0.5) {
        return 8 * t * t * t * t
      }
      const f = t - 1
      return 1 + 8 * f * f * f * f
    default:
      return t
  }
}

/**
 * Theme-aware Color Interpolation
 * 
 * Interpolates between two hex colors.
 * 
 * @param {string} color1 - Start color (hex)
 * @param {string} color2 - End color (hex)
 * @param {number} t - Progress (0 to 1)
 * @returns {string} Interpolated color (hex)
 */
export const lerpColor = (color1, color2, t) => {
  const hex2rgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : { r: 0, g: 0, b: 0 }
  }
  
  const rgb2hex = (r, g, b) => {
    return '#' + [r, g, b].map(x => {
      const hex = Math.round(x).toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join('')
  }
  
  const c1 = hex2rgb(color1)
  const c2 = hex2rgb(color2)
  
  const r = lerp(c1.r, c2.r, t)
  const g = lerp(c1.g, c2.g, t)
  const b = lerp(c1.b, c2.b, t)
  
  return rgb2hex(r, g, b)
}

export default {
  easings,
  durations,
  staggerDelays,
  createStagger,
  createSpring,
  createTransition,
  fadeVariants,
  scaleVariants,
  slideVariants,
  getOptimalFPS,
  createRAF,
  lerp,
  clamp,
  map,
  applyEasing,
  lerpColor,
}
