/**
 * WalkthroughProgress Component
 * 
 * Visual progress indicator showing current step position.
 * Displays progress dots with current step highlighted.
 * 
 * @component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'

/**
 * WalkthroughProgress Component
 * 
 * Shows a series of dots representing walkthrough steps.
 * Current step is highlighted with animation.
 * 
 * @param {Object} props
 * @param {number} props.currentStep - Current step index (0-based)
 * @param {number} props.totalSteps - Total number of steps
 * @param {Function} [props.onDotClick] - Optional callback when dot is clicked
 */
function WalkthroughProgress({ currentStep, totalSteps, onDotClick }) {
  const { theme } = useTheme()

  const containerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.sm,
    padding: theme.spacing.md,
  }

  const getDotStyles = (index) => {
    const isActive = index === currentStep
    const isPast = index < currentStep
    
    return {
      width: isActive ? '12px' : '8px',
      height: isActive ? '12px' : '8px',
      borderRadius: '50%',
      backgroundColor: isActive 
        ? theme.colors.primary.main
        : isPast
        ? theme.colors.primary.light
        : theme.colors.border.default,
      cursor: onDotClick ? 'pointer' : 'default',
      transition: theme.transitions.medium,
      border: isActive ? `2px solid ${theme.colors.primary.contrast}` : 'none',
      boxShadow: isActive ? theme.shadows.medium : 'none',
    }
  }

  const dotVariants = {
    inactive: {
      scale: 1,
      opacity: 0.6,
    },
    active: {
      scale: 1.2,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    past: {
      scale: 1,
      opacity: 0.8,
    },
  }

  const handleDotClick = (index) => {
    if (onDotClick && index <= currentStep) {
      onDotClick(index)
    }
  }

  return (
    <div style={containerStyles} role="navigation" aria-label="Walkthrough progress">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isActive = index === currentStep
        const isPast = index < currentStep
        
        return (
          <motion.div
            key={index}
            style={getDotStyles(index)}
            variants={dotVariants}
            animate={isActive ? 'active' : isPast ? 'past' : 'inactive'}
            onClick={() => handleDotClick(index)}
            whileHover={onDotClick && index <= currentStep ? { scale: 1.3 } : {}}
            role="button"
            tabIndex={onDotClick && index <= currentStep ? 0 : -1}
            aria-label={`Step ${index + 1} of ${totalSteps}`}
            aria-current={isActive ? 'step' : undefined}
            onKeyDown={(e) => {
              if ((e.key === 'Enter' || e.key === ' ') && onDotClick && index <= currentStep) {
                e.preventDefault()
                handleDotClick(index)
              }
            }}
          />
        )
      })}
      
      {/* Screen reader text */}
      <span 
        style={{ 
          position: 'absolute', 
          width: '1px', 
          height: '1px', 
          padding: 0, 
          margin: '-1px', 
          overflow: 'hidden', 
          clip: 'rect(0, 0, 0, 0)', 
          whiteSpace: 'nowrap', 
          border: 0 
        }}
      >
        Step {currentStep + 1} of {totalSteps}
      </span>
    </div>
  )
}

WalkthroughProgress.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  onDotClick: PropTypes.func,
}

WalkthroughProgress.defaultProps = {
  onDotClick: null,
}

export default WalkthroughProgress
