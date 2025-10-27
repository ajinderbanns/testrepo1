import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import './PageTransition.css'

/**
 * Animation Variants for Page Transitions
 * Provides smooth, cinematic transitions between pages
 */
export const pageVariants = {
  // Fade with subtle scale effect
  fade: {
    initial: {
      opacity: 0,
      scale: 0.98,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.43, 0.13, 0.23, 0.96], // Custom easing for smooth effect
      },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.3,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  },

  // Slide from right
  slideRight: {
    initial: {
      opacity: 0,
      x: 100,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.3,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  },

  // Slide from left
  slideLeft: {
    initial: {
      opacity: 0,
      x: -100,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
    exit: {
      opacity: 0,
      x: 100,
      transition: {
        duration: 0.3,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  },

  // Cinematic fade with blur effect
  cinematic: {
    initial: {
      opacity: 0,
      filter: 'blur(10px)',
      scale: 1.05,
    },
    animate: {
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
    exit: {
      opacity: 0,
      filter: 'blur(10px)',
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  },
}

/**
 * PageTransition Component
 * Wraps page content with Framer Motion animations for smooth transitions
 * Uses AnimatePresence to handle exit animations when routes change
 */
function PageTransition({ 
  children, 
  variant = 'fade', 
  className = '',
  animatePresence = true 
}) {
  const location = useLocation()
  
  // Get the animation variant
  const selectedVariant = pageVariants[variant] || pageVariants.fade

  // If AnimatePresence is disabled, just return the motion wrapper
  if (!animatePresence) {
    return (
      <motion.div
        className={`page-transition ${className}`}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={selectedVariant}
      >
        {children}
      </motion.div>
    )
  }

  // With AnimatePresence for proper exit animations
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        className={`page-transition ${className}`}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={selectedVariant}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['fade', 'slideRight', 'slideLeft', 'cinematic']),
  className: PropTypes.string,
  animatePresence: PropTypes.bool,
}

export default PageTransition
