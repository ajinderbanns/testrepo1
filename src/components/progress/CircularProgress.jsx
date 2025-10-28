import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { motion, useSpring, useTransform } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'

/**
 * CircularProgress Component
 * 
 * Ring-style progress indicator with animated SVG stroke.
 * Features smooth animations, number counting, and theme-aware styling.
 * 
 * @component
 * @example
 * <CircularProgress value={75} size={120} />
 * 
 * @example
 * <CircularProgress 
 *   value={100}
 *   size={150}
 *   color="success"
 *   strokeWidth={12}
 *   showLabel
 * />
 */
function CircularProgress({
  value = 0,
  size = 120,
  strokeWidth = 10,
  color = 'primary',
  showLabel = true,
  showPercentage = true,
  label = null,
  animated = true,
  className = '',
  style = {},
  ...props
}) {
  const { theme } = useTheme()
  const [prevValue, setPrevValue] = useState(0)

  // Clamp value between 0 and 100
  const clampedValue = Math.min(Math.max(value, 0), 100)

  // Smooth spring animation for progress value
  const springValue = useSpring(clampedValue, {
    stiffness: 60,
    damping: 25,
    mass: 0.5,
  })

  // Animated number counting
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!animated) {
      setDisplayValue(clampedValue)
      return
    }

    const duration = 1000
    const startTime = Date.now()
    const startValue = prevValue

    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      
      // Easing function (ease-out cubic)
      const eased = 1 - Math.pow(1 - progress, 3)
      const currentValue = startValue + (clampedValue - startValue) * eased

      setDisplayValue(Math.round(currentValue))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
    setPrevValue(clampedValue)
  }, [clampedValue, animated, prevValue])

  // Get color based on prop
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

  const progressColor = getColor()

  // Calculate circle parameters
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (clampedValue / 100) * circumference

  // Calculate center position
  const center = size / 2

  // Dynamic gradient ID to avoid conflicts
  const gradientId = `circular-gradient-${Math.random().toString(36).substr(2, 9)}`

  // Calculate font sizes based on circle size
  const percentageSize = size / 4
  const labelSize = size / 8

  return (
    <div
      className={`circular-progress ${className}`}
      style={{
        width: size,
        height: size,
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Progress: ${clampedValue}%`}
      {...props}
    >
      {/* SVG Circle */}
      <svg
        width={size}
        height={size}
        style={{ 
          transform: 'rotate(-90deg)',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <defs>
          {/* Gradient for the progress stroke */}
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={progressColor} stopOpacity="1" />
            <stop offset="100%" stopColor={progressColor} stopOpacity="0.7" />
          </linearGradient>

          {/* Glow filter */}
          <filter id={`glow-${gradientId}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={theme.colors.surface.raised}
          strokeWidth={strokeWidth}
        />

        {/* Progress circle with animation */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={animated ? { strokeDashoffset: circumference } : false}
          animate={animated ? {
            strokeDashoffset: offset,
          } : {
            strokeDashoffset: offset,
          }}
          transition={animated ? {
            duration: 1,
            ease: [0.43, 0.13, 0.23, 0.96],
          } : undefined}
          filter={clampedValue > 0 ? `url(#glow-${gradientId})` : undefined}
          style={{
            filter: clampedValue === 100 ? `drop-shadow(0 0 8px ${progressColor})` : undefined,
          }}
        />

        {/* Animated endpoint circle */}
        {clampedValue > 0 && animated && (
          <motion.circle
            cx={center + radius * Math.cos((clampedValue / 100) * 2 * Math.PI)}
            cy={center + radius * Math.sin((clampedValue / 100) * 2 * Math.PI)}
            r={strokeWidth / 2}
            fill={progressColor}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
          />
        )}
      </svg>

      {/* Center content */}
      {(showLabel || showPercentage) && (
        <div
          className="circular-progress__content"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: theme.spacing.xxs,
            pointerEvents: 'none',
          }}
        >
          {showPercentage && (
            <motion.div
              style={{
                fontSize: percentageSize,
                fontWeight: theme.typography.weight.bold,
                color: clampedValue === 100 ? progressColor : theme.colors.text.primary,
                fontFamily: theme.typography.family.primary,
                lineHeight: 1,
              }}
              initial={animated ? { scale: 0.5, opacity: 0 } : false}
              animate={animated ? { scale: 1, opacity: 1 } : false}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <motion.span
                key={displayValue}
                initial={animated ? { scale: 1.2 } : false}
                animate={animated ? { scale: 1 } : false}
                transition={{ duration: 0.2 }}
              >
                {displayValue}%
              </motion.span>
            </motion.div>
          )}

          {label && (
            <motion.div
              style={{
                fontSize: labelSize,
                fontWeight: theme.typography.weight.medium,
                color: theme.colors.text.secondary,
                fontFamily: theme.typography.family.primary,
                lineHeight: 1,
              }}
              initial={animated ? { opacity: 0, y: 5 } : false}
              animate={animated ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              {label}
            </motion.div>
          )}
        </div>
      )}

      {/* Completion celebration effect */}
      {clampedValue === 100 && animated && (
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: size * 1.2,
            height: size * 1.2,
            borderRadius: '50%',
            border: `3px solid ${progressColor}`,
            pointerEvents: 'none',
          }}
          initial={{ scale: 0.8, opacity: 0.8 }}
          animate={{ 
            scale: 1.4,
            opacity: 0,
          }}
          transition={{ 
            duration: 0.8,
            ease: 'easeOut',
          }}
        />
      )}
    </div>
  )
}

CircularProgress.propTypes = {
  /** Progress value (0-100) */
  value: PropTypes.number,
  /** Circle diameter in pixels */
  size: PropTypes.number,
  /** Stroke width in pixels */
  strokeWidth: PropTypes.number,
  /** Color variant or custom color string */
  color: PropTypes.oneOfType([
    PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'error', 'accent']),
    PropTypes.string,
  ]),
  /** Show center content */
  showLabel: PropTypes.bool,
  /** Show percentage value */
  showPercentage: PropTypes.bool,
  /** Custom label text */
  label: PropTypes.string,
  /** Enable smooth animations */
  animated: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Custom styles */
  style: PropTypes.object,
}

export default CircularProgress
