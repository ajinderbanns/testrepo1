import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { motion, useSpring, useTransform } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'

/**
 * ProgressBar Component
 * 
 * Enhanced linear progress bar with smooth animated fill and number counting animation.
 * Features theme-aware styling, micro-interactions, and accessibility support.
 * 
 * @component
 * @example
 * <ProgressBar value={75} showLabel />
 * 
 * @example
 * <ProgressBar 
 *   value={50} 
 *   color="success"
 *   size="large"
 *   animated
 * />
 */
function ProgressBar({
  value = 0,
  size = 'medium',
  showLabel = true,
  color = 'primary',
  animated = true,
  className = '',
  style = {},
  onComplete = null,
  ...props
}) {
  const { theme } = useTheme()
  const [prevValue, setPrevValue] = useState(0)

  // Clamp value between 0 and 100
  const clampedValue = Math.min(Math.max(value, 0), 100)

  // Smooth spring animation for progress value
  const springValue = useSpring(clampedValue, {
    stiffness: 50,
    damping: 20,
    mass: 0.5,
  })

  // Animated number counting
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!animated) {
      setDisplayValue(clampedValue)
      return
    }

    // Animate the number counting
    const duration = 1000 // 1 second
    const startTime = Date.now()
    const startValue = prevValue

    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      
      // Easing function (ease-out)
      const eased = 1 - Math.pow(1 - progress, 3)
      const currentValue = startValue + (clampedValue - startValue) * eased

      setDisplayValue(Math.round(currentValue))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Call onComplete callback when reaching 100%
        if (clampedValue === 100 && onComplete) {
          onComplete()
        }
      }
    }

    requestAnimationFrame(animate)
    setPrevValue(clampedValue)
  }, [clampedValue, animated, prevValue, onComplete])

  // Get color based on prop or theme
  const getColor = () => {
    if (typeof color === 'string') {
      const colors = {
        primary: theme.colors.primary.main,
        secondary: theme.colors.secondary.main,
        success: theme.colors.state.success.main,
        warning: theme.colors.state.warning.main,
        error: theme.colors.state.error.main,
        accent: theme.colors.accent.main,
      }
      return colors[color] || color
    }
    return color
  }

  // Get size configuration
  const getSizeConfig = () => {
    const sizes = {
      small: { height: '6px', labelSize: theme.typography.size.caption },
      medium: { height: '10px', labelSize: theme.typography.size.bodySmall },
      large: { height: '16px', labelSize: theme.typography.size.body },
    }
    return sizes[size] || sizes.medium
  }

  const sizeConfig = getSizeConfig()
  const progressColor = getColor()

  const trackStyles = {
    width: '100%',
    height: sizeConfig.height,
    backgroundColor: theme.colors.surface.raised,
    borderRadius: theme.radii.full,
    overflow: 'hidden',
    position: 'relative',
    boxShadow: theme.shadows.inner,
  }

  const fillStyles = {
    height: '100%',
    backgroundColor: progressColor,
    borderRadius: theme.radii.full,
    position: 'relative',
    overflow: 'hidden',
  }

  const glowStyles = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '30%',
    background: `linear-gradient(90deg, transparent, ${progressColor}88)`,
    animation: 'shimmer 2s infinite',
  }

  return (
    <div 
      className={`progress-bar ${className}`}
      style={{
        width: '100%',
        ...style,
      }}
      {...props}
    >
      <div className="progress-bar__track" style={trackStyles}>
        <motion.div
          className="progress-bar__fill"
          style={{
            ...fillStyles,
            width: animated ? useTransform(springValue, (v) => `${v}%`) : `${clampedValue}%`,
          }}
          initial={animated ? { width: 0 } : false}
          animate={animated ? { width: `${clampedValue}%` } : false}
          transition={{
            duration: 0.8,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progress: ${clampedValue}%`}
        >
          {animated && clampedValue > 0 && (
            <div style={glowStyles} />
          )}
        </motion.div>
      </div>

      {showLabel && (
        <motion.div
          className="progress-bar__label"
          style={{
            marginTop: theme.spacing.xs,
            fontSize: sizeConfig.labelSize,
            fontWeight: theme.typography.weight.semibold,
            color: theme.colors.text.secondary,
            textAlign: 'center',
            fontFamily: theme.typography.family.primary,
          }}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <motion.span
            key={displayValue}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            style={{
              display: 'inline-block',
              color: clampedValue === 100 ? theme.colors.state.success.main : theme.colors.text.primary,
            }}
          >
            {displayValue}%
          </motion.span>
        </motion.div>
      )}

      <style>{`
        @keyframes shimmer {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  )
}

ProgressBar.propTypes = {
  /** Progress value (0-100) */
  value: PropTypes.number,
  /** Size preset */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Show percentage label */
  showLabel: PropTypes.bool,
  /** Color variant or custom color string */
  color: PropTypes.oneOfType([
    PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'error', 'accent']),
    PropTypes.string,
  ]),
  /** Enable smooth animations */
  animated: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Custom styles */
  style: PropTypes.object,
  /** Callback when progress reaches 100% */
  onComplete: PropTypes.func,
}

export default ProgressBar
