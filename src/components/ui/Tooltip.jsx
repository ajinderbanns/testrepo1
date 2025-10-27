import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import './Tooltip.css'

/**
 * Tooltip Component
 * 
 * Hover/focus-triggered informational popup with positioning logic.
 * Features smooth fade animations and automatic positioning.
 * 
 * @component
 * @example
 * <Tooltip content="This is helpful info">
 *   <button>Hover me</button>
 * </Tooltip>
 * 
 * @example
 * <Tooltip 
 *   content="Additional details here" 
 *   position="right"
 *   delay={500}
 * >
 *   <span>Info icon</span>
 * </Tooltip>
 */
function Tooltip({
  children,
  content,
  position = 'top',
  delay = 200,
  className = '',
  ...props
}) {
  const { theme } = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const [timeoutId, setTimeoutId] = useState(null)

  const showTooltip = () => {
    const id = setTimeout(() => {
      setIsVisible(true)
    }, delay)
    setTimeoutId(id)
  }

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    setIsVisible(false)
  }

  const getTooltipStyles = () => {
    return {
      backgroundColor: theme.colors.surface.overlay,
      color: theme.colors.text.primary,
      fontSize: theme.typography.size.bodySmall,
      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
      borderRadius: theme.radii.medium,
      boxShadow: theme.shadows.large,
      border: `${theme.borderWidth.thin} solid ${theme.colors.border.default}`,
      maxWidth: '250px',
      wordWrap: 'break-word',
      zIndex: theme.zIndex.tooltip,
    }
  }

  // Position-specific arrow styles
  const getPositionStyles = () => {
    const offset = '8px'
    const positions = {
      top: {
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginBottom: offset,
      },
      bottom: {
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginTop: offset,
      },
      left: {
        right: '100%',
        top: '50%',
        transform: 'translateY(-50%)',
        marginRight: offset,
      },
      right: {
        left: '100%',
        top: '50%',
        transform: 'translateY(-50%)',
        marginLeft: offset,
      },
    }
    return positions[position]
  }

  // Animation variants
  const tooltipVariants = {
    initial: { 
      opacity: 0,
      scale: 0.9,
      ...(position === 'top' && { y: 5 }),
      ...(position === 'bottom' && { y: -5 }),
      ...(position === 'left' && { x: 5 }),
      ...(position === 'right' && { x: -5 }),
    },
    animate: { 
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: { 
        duration: 0.2,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.15 }
    },
  }

  return (
    <div 
      className={`ui-tooltip-wrapper ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      {...props}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && content && (
          <motion.div
            className={`ui-tooltip ui-tooltip--${position}`}
            style={{
              ...getTooltipStyles(),
              ...getPositionStyles(),
            }}
            variants={tooltipVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            role="tooltip"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

Tooltip.propTypes = {
  /** Trigger element */
  children: PropTypes.node.isRequired,
  /** Tooltip content */
  content: PropTypes.node.isRequired,
  /** Tooltip position */
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  /** Delay before showing (ms) */
  delay: PropTypes.number,
  /** Additional CSS classes */
  className: PropTypes.string,
}

export default Tooltip
