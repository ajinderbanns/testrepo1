/**
 * SectionTransition Component
 * 
 * Framer Motion wrapper for smooth transitions between module sections.
 * Provides slide animations with proper exit handling via AnimatePresence.
 * 
 * @component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

/**
 * Animation variants for section transitions
 */
const sectionVariants = {
  // Slide from right (forward navigation)
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
  
  // Slide from left (backward navigation)
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
  
  // Fade transition (default)
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
        ease: [0.43, 0.13, 0.23, 0.96],
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
}

/**
 * SectionTransition Component
 * 
 * Wraps section content with smooth animated transitions.
 * Automatically detects navigation direction for appropriate slide animations.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Section content to animate
 * @param {string} props.sectionKey - Unique key for the section (typically section path)
 * @param {string} props.variant - Animation variant ('slideRight', 'slideLeft', 'fade')
 * @param {string} props.className - Additional CSS classes
 */
function SectionTransition({ 
  children, 
  sectionKey,
  variant = 'fade',
  className = '' 
}) {
  const location = useLocation()
  
  // Use location pathname as key if sectionKey not provided
  const animationKey = sectionKey || location.pathname
  
  // Get the selected animation variant
  const selectedVariant = sectionVariants[variant] || sectionVariants.fade

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={animationKey}
        className={`section-transition ${className}`}
        variants={selectedVariant}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          width: '100%',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

SectionTransition.propTypes = {
  children: PropTypes.node.isRequired,
  sectionKey: PropTypes.string,
  variant: PropTypes.oneOf(['slideRight', 'slideLeft', 'fade']),
  className: PropTypes.string,
}

export default SectionTransition
export { sectionVariants }
