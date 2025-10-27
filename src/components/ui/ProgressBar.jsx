import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import './ProgressBar.css'

/**
 * ProgressBar Component
 * 
 * Visual indicator for completion tracking with linear and circular variants.
 * Features smooth animated transitions and theme-aware styling.
 * 
 * @component
 * @example
 * <ProgressBar value={75} />
 * 
 * @example
 * <ProgressBar 
 *   value={50} 
 *   variant="circular" 
 *   size={100}
 *   showLabel
 * />
 */
function ProgressBar({
  value = 0,
  variant = 'linear',
  size = 'medium',
  showLabel = false,
  color = 'primary',
  className = '',
  ...props
}) {
  const { theme } = useTheme()
  
  // Clamp value between 0 and 100
  const clampedValue = Math.min(Math.max(value, 0), 100)

  // Get color based on prop
  const getColor = () => {
    const colors = {
      primary: theme.colors.primary.main,
      secondary: theme.colors.secondary.main,
      success: theme.colors.state.success.main,
      warning: theme.colors.state.warning.main,
      error: theme.colors.state.error.main,
    }
    return colors[color] || theme.colors.primary.main
  }

  // Linear variant
  if (variant === 'linear') {
    const getLinearSize = () => {
      const sizes = {
        small: { height: '4px' },
        medium: { height: '8px' },
        large: { height: '12px' },
      }
      return sizes[size] || sizes.medium
    }

    const trackStyles = {
      width: '100%',
      height: getLinearSize().height,
      backgroundColor: theme.colors.surface.raised,
      borderRadius: theme.radii.full,
      overflow: 'hidden',
      position: 'relative',
    }

    const fillStyles = {
      height: '100%',
      backgroundColor: getColor(),
      borderRadius: theme.radii.full,
      transition: theme.transitions.default,
    }

    return (
      <div className={`ui-progress ${className}`} {...props}>
        <div className="ui-progress-track" style={trackStyles}>
          <motion.div
            className="ui-progress-fill"
            style={fillStyles}
            initial={{ width: 0 }}
            animate={{ width: `${clampedValue}%` }}
            transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
            role="progressbar"
            aria-valuenow={clampedValue}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        {showLabel && (
          <div 
            className="ui-progress-label"
            style={{
              marginTop: theme.spacing.xs,
              fontSize: theme.typography.size.bodySmall,
              color: theme.colors.text.secondary,
              textAlign: 'center',
            }}
          >
            {Math.round(clampedValue)}%
          </div>
        )}
      </div>
    )
  }

  // Circular variant
  if (variant === 'circular') {
    const getCircularSize = () => {
      const sizes = {
        small: 60,
        medium: 100,
        large: 140,
      }
      return typeof size === 'number' ? size : sizes[size] || sizes.medium
    }

    const circleSize = getCircularSize()
    const strokeWidth = circleSize / 10
    const radius = (circleSize - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (clampedValue / 100) * circumference

    return (
      <div 
        className={`ui-progress ui-progress--circular ${className}`}
        style={{ 
          width: circleSize, 
          height: circleSize,
          position: 'relative',
        }}
        {...props}
      >
        <svg
          width={circleSize}
          height={circleSize}
          style={{ transform: 'rotate(-90deg)' }}
        >
          {/* Background circle */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="none"
            stroke={theme.colors.surface.raised}
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <motion.circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
            role="progressbar"
            aria-valuenow={clampedValue}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </svg>
        {showLabel && (
          <div
            className="ui-progress-label ui-progress-label--circular"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: circleSize / 5,
              fontWeight: theme.typography.weight.bold,
              color: theme.colors.text.primary,
            }}
          >
            {Math.round(clampedValue)}%
          </div>
        )}
      </div>
    )
  }

  return null
}

ProgressBar.propTypes = {
  /** Progress value (0-100) */
  value: PropTypes.number,
  /** Progress bar variant */
  variant: PropTypes.oneOf(['linear', 'circular']),
  /** Size preset or custom number (for circular) */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(['small', 'medium', 'large']),
    PropTypes.number,
  ]),
  /** Show percentage label */
  showLabel: PropTypes.bool,
  /** Color variant */
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'error']),
  /** Additional CSS classes */
  className: PropTypes.string,
}

export default ProgressBar
