/**
 * Framer Motion Animation Presets
 * 
 * Reusable animation variants for consistent, cinematic feel across all pages.
 * Includes page transitions, content reveals, hover states, and micro-interactions.
 * 
 * Usage:
 * ```jsx
 * import { pageTransitions, contentReveal } from '@/animations/presets'
 * 
 * <motion.div
 *   variants={pageTransitions.fade}
 *   initial="initial"
 *   animate="animate"
 *   exit="exit"
 * />
 * ```
 * 
 * @module presets
 */

import { easings, durations, createStagger } from '../utils/animationHelpers'

/**
 * Page Transition Presets
 * 
 * Smooth transitions between pages/routes.
 */
export const pageTransitions = {
  // Fade transition
  fade: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: durations.normal,
        ease: easings.easeOut,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: durations.fast,
        ease: easings.easeIn,
      },
    },
  },
  
  // Slide from right (common for forward navigation)
  slideRight: {
    initial: { x: '100%', opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: durations.medium,
        ease: easings.easeOut,
      },
    },
    exit: {
      x: '-100%',
      opacity: 0,
      transition: {
        duration: durations.medium,
        ease: easings.easeIn,
      },
    },
  },
  
  // Slide from left (common for back navigation)
  slideLeft: {
    initial: { x: '-100%', opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: durations.medium,
        ease: easings.easeOut,
      },
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: {
        duration: durations.medium,
        ease: easings.easeIn,
      },
    },
  },
  
  // Scale up (dramatic entrance)
  scaleUp: {
    initial: { scale: 0.9, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: durations.medium,
        ease: easings.easeOut,
      },
    },
    exit: {
      scale: 1.1,
      opacity: 0,
      transition: {
        duration: durations.fast,
        ease: easings.easeIn,
      },
    },
  },
  
  // Blur transition (Euphoria-inspired)
  blur: {
    initial: { filter: 'blur(10px)', opacity: 0 },
    animate: {
      filter: 'blur(0px)',
      opacity: 1,
      transition: {
        duration: durations.slow,
        ease: easings.smooth,
      },
    },
    exit: {
      filter: 'blur(10px)',
      opacity: 0,
      transition: {
        duration: durations.normal,
        ease: easings.easeIn,
      },
    },
  },
}

/**
 * Content Reveal Presets
 * 
 * Animations for revealing content sections.
 */
export const contentReveal = {
  // Fade in up
  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.medium,
        ease: easings.easeOut,
      },
    },
  },
  
  // Fade in down
  fadeInDown: {
    hidden: { opacity: 0, y: -40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.medium,
        ease: easings.easeOut,
      },
    },
  },
  
  // Fade in left
  fadeInLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: durations.medium,
        ease: easings.easeOut,
      },
    },
  },
  
  // Fade in right
  fadeInRight: {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: durations.medium,
        ease: easings.easeOut,
      },
    },
  },
  
  // Scale in
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: durations.medium,
        ease: easings.easeOut,
      },
    },
  },
  
  // Pop in (with bounce)
  popIn: {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  },
}

/**
 * Stagger Children Presets
 * 
 * Container variants for staggering child animations.
 */
export const staggerChildren = {
  // Normal stagger
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        ...createStagger(0.05),
        delayChildren: 0.1,
      },
    },
  },
  
  // Fast stagger
  containerFast: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        ...createStagger(0.03),
        delayChildren: 0,
      },
    },
  },
  
  // Slow dramatic stagger
  containerDramatic: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        ...createStagger(0.15),
        delayChildren: 0.2,
      },
    },
  },
  
  // Item for stagger
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.normal,
        ease: easings.easeOut,
      },
    },
  },
  
  // Item with scale
  itemScale: {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: durations.normal,
        ease: easings.easeOut,
      },
    },
  },
}

/**
 * Hover Effects Presets
 * 
 * Micro-interactions for hover states.
 */
export const hoverEffects = {
  // Lift effect
  lift: {
    whileHover: {
      y: -4,
      transition: {
        duration: durations.fast,
        ease: easings.easeOut,
      },
    },
    whileTap: {
      y: 0,
      scale: 0.98,
    },
  },
  
  // Scale effect
  scale: {
    whileHover: {
      scale: 1.05,
      transition: {
        duration: durations.fast,
        ease: easings.easeOut,
      },
    },
    whileTap: {
      scale: 0.95,
    },
  },
  
  // Glow effect (use with custom styling)
  glow: {
    whileHover: {
      scale: 1.02,
      transition: {
        duration: durations.normal,
        ease: easings.easeOut,
      },
    },
  },
  
  // Bounce effect
  bounce: {
    whileHover: {
      y: -8,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
    whileTap: {
      y: 0,
    },
  },
  
  // Rotate effect (for icons)
  rotate: {
    whileHover: {
      rotate: 5,
      transition: {
        duration: durations.fast,
        ease: easings.easeOut,
      },
    },
  },
  
  // Shake effect
  shake: {
    whileHover: {
      x: [-2, 2, -2, 2, 0],
      transition: {
        duration: durations.normal,
        ease: easings.easeInOut,
      },
    },
  },
}

/**
 * Button Interaction Presets
 * 
 * Specific presets for button interactions.
 */
export const buttonInteractions = {
  // Primary button
  primary: {
    whileHover: {
      scale: 1.02,
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
      transition: {
        duration: durations.fast,
        ease: easings.easeOut,
      },
    },
    whileTap: {
      scale: 0.98,
    },
  },
  
  // Secondary button
  secondary: {
    whileHover: {
      y: -2,
      transition: {
        duration: durations.fast,
        ease: easings.easeOut,
      },
    },
    whileTap: {
      y: 0,
    },
  },
  
  // Icon button
  icon: {
    whileHover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: durations.fast,
        ease: easings.easeOut,
      },
    },
    whileTap: {
      scale: 0.9,
      rotate: 0,
    },
  },
}

/**
 * Card Interaction Presets
 * 
 * Animations for card components.
 */
export const cardInteractions = {
  // Subtle lift
  subtle: {
    whileHover: {
      y: -4,
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
      transition: {
        duration: durations.normal,
        ease: easings.easeOut,
      },
    },
  },
  
  // Dramatic lift
  dramatic: {
    whileHover: {
      y: -8,
      scale: 1.02,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
      transition: {
        duration: durations.normal,
        ease: easings.easeOut,
      },
    },
  },
  
  // Glow effect
  glow: {
    whileHover: {
      scale: 1.02,
      transition: {
        duration: durations.normal,
        ease: easings.easeOut,
      },
    },
  },
}

/**
 * Modal/Dialog Presets
 * 
 * Animations for modals and dialogs.
 */
export const modalAnimations = {
  // Modal backdrop
  backdrop: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: durations.fast,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: durations.fast,
      },
    },
  },
  
  // Modal content (scale in)
  modal: {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: durations.normal,
        ease: easings.easeOut,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: {
        duration: durations.fast,
        ease: easings.easeIn,
      },
    },
  },
  
  // Modal slide from bottom (mobile)
  slideUp: {
    initial: { opacity: 0, y: '100%' },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.medium,
        ease: easings.easeOut,
      },
    },
    exit: {
      opacity: 0,
      y: '100%',
      transition: {
        duration: durations.normal,
        ease: easings.easeIn,
      },
    },
  },
}

/**
 * Notification/Toast Presets
 * 
 * Animations for notifications and toasts.
 */
export const notificationAnimations = {
  // Slide in from top
  slideInTop: {
    initial: { opacity: 0, y: -100 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      y: -100,
      transition: {
        duration: durations.fast,
      },
    },
  },
  
  // Slide in from right
  slideInRight: {
    initial: { opacity: 0, x: 100 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      x: 100,
      transition: {
        duration: durations.fast,
      },
    },
  },
}

/**
 * Loading/Spinner Presets
 * 
 * Animations for loading indicators.
 */
export const loadingAnimations = {
  // Spin
  spin: {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  },
  
  // Pulse
  pulse: {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },
  
  // Bounce
  bounce: {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },
}

/**
 * Text Animation Presets
 * 
 * Animations for text reveals.
 */
export const textAnimations = {
  // Character reveal
  characterReveal: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.fast,
      },
    },
  },
  
  // Word reveal
  wordReveal: {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: durations.normal,
      },
    },
  },
  
  // Typewriter container
  typewriterContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
      },
    },
  },
}

// Export all presets as default
export default {
  pageTransitions,
  contentReveal,
  staggerChildren,
  hoverEffects,
  buttonInteractions,
  cardInteractions,
  modalAnimations,
  notificationAnimations,
  loadingAnimations,
  textAnimations,
}
