/**
 * GamificationBadge Component
 * 
 * Achievement badge component with gender-specific styling and naming.
 * Displays badges with theme-appropriate icons, names, and descriptions.
 * 
 * Features:
 * - Content-aware badge names and icons
 * - Theme-specific styling
 * - Animation on unlock
 * - Locked/unlocked states
 * 
 * @component
 * @example
 * <GamificationBadge 
 *   type="firstStep"
 *   unlocked={true}
 * />
 * 
 * @example
 * <GamificationBadge 
 *   type="moduleComplete"
 *   unlocked={false}
 *   size="large"
 * />
 */

import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { useContent } from '../hooks/useContent'

function GamificationBadge({
  type = 'firstStep',
  unlocked = false,
  size = 'medium',
  showDescription = true,
  animated = true,
  className = '',
  style = {},
  onUnlock = null,
  ...props
}) {
  const { theme } = useTheme()
  const { getGamificationContent } = useContent()
  
  // Get badge content based on current theme/gender
  const gamification = getGamificationContent()
  const badge = gamification.badges?.[type] || {
    name: 'Badge',
    icon: '🎯',
    description: 'Achievement badge',
  }
  
  // Size configurations
  const sizeConfig = {
    small: {
      iconSize: '32px',
      fontSize: theme.typography.size.bodySmall,
      padding: theme.spacing.sm,
      iconFontSize: '20px',
    },
    medium: {
      iconSize: '64px',
      fontSize: theme.typography.size.body,
      padding: theme.spacing.md,
      iconFontSize: '32px',
    },
    large: {
      iconSize: '96px',
      fontSize: theme.typography.size.bodyLarge,
      padding: theme.spacing.lg,
      iconFontSize: '48px',
    },
  }
  
  const config = sizeConfig[size] || sizeConfig.medium
  
  // Badge styles
  const badgeStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    padding: config.padding,
    borderRadius: theme.radii.large,
    backgroundColor: unlocked 
      ? theme.colors.surface.raised 
      : theme.colors.surface.base,
    border: `2px solid ${unlocked 
      ? theme.colors.primary.main 
      : theme.colors.border.default}`,
    boxShadow: unlocked 
      ? `0 4px 12px ${theme.colors.primary.main}30`
      : 'none',
    opacity: unlocked ? 1 : 0.5,
    transition: theme.transitions.standard,
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    ...style,
  }
  
  // Icon container styles
  const iconContainerStyles = {
    width: config.iconSize,
    height: config.iconSize,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radii.full,
    backgroundColor: unlocked 
      ? `${theme.colors.primary.main}20`
      : theme.colors.surface.base,
    fontSize: config.iconFontSize,
    filter: unlocked ? 'none' : 'grayscale(100%)',
  }
  
  // Text styles
  const nameStyles = {
    fontSize: config.fontSize,
    fontWeight: theme.typography.weight.bold,
    color: unlocked 
      ? theme.colors.text.primary 
      : theme.colors.text.disabled,
    fontFamily: theme.typography.family.primary,
  }
  
  const descriptionStyles = {
    fontSize: theme.typography.size.bodySmall,
    color: unlocked 
      ? theme.colors.text.secondary 
      : theme.colors.text.disabled,
    fontFamily: theme.typography.family.primary,
    maxWidth: '200px',
  }
  
  // Animation variants
  const badgeVariants = {
    locked: { 
      scale: 1,
      rotate: 0,
    },
    unlocked: { 
      scale: [1, 1.1, 1],
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 0.6,
        ease: 'easeInOut',
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      }
    },
  }
  
  const iconVariants = {
    locked: {
      scale: 1,
    },
    unlocked: {
      scale: [1, 1.3, 1],
      rotate: [0, 360],
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      }
    },
  }
  
  const glowVariants = {
    unlocked: {
      opacity: [0, 0.5, 0],
      scale: [0.8, 1.2, 1.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatDelay: 2,
      }
    },
  }
  
  // Handle unlock animation
  React.useEffect(() => {
    if (unlocked && onUnlock && animated) {
      onUnlock()
    }
  }, [unlocked, onUnlock, animated])
  
  return (
    <motion.div
      className={`gamification-badge ${unlocked ? 'unlocked' : 'locked'} ${className}`}
      style={badgeStyles}
      variants={animated ? badgeVariants : undefined}
      initial="locked"
      animate={unlocked ? 'unlocked' : 'locked'}
      whileHover={unlocked ? 'hover' : undefined}
      {...props}
    >
      {/* Glow effect for unlocked badges */}
      {unlocked && animated && (
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            borderRadius: theme.radii.large,
            background: `radial-gradient(circle, ${theme.colors.primary.main}40 0%, transparent 70%)`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
          variants={glowVariants}
          animate="unlocked"
        />
      )}
      
      {/* Icon */}
      <motion.div
        style={iconContainerStyles}
        variants={animated ? iconVariants : undefined}
        animate={unlocked ? 'unlocked' : 'locked'}
      >
        <span style={{ zIndex: 1 }}>
          {unlocked ? badge.icon : '🔒'}
        </span>
      </motion.div>
      
      {/* Badge name */}
      <div style={nameStyles}>
        {unlocked ? badge.name : 'Locked'}
      </div>
      
      {/* Badge description */}
      {showDescription && (
        <div style={descriptionStyles}>
          {unlocked ? badge.description : 'Complete requirements to unlock'}
        </div>
      )}
    </motion.div>
  )
}

GamificationBadge.propTypes = {
  /** Badge type (matches key in gamification.badges) */
  type: PropTypes.oneOf([
    'firstStep',
    'moduleComplete',
    'allModules',
    'perfectScore',
    'speedRun',
    'explorer',
  ]).isRequired,
  /** Whether the badge is unlocked */
  unlocked: PropTypes.bool,
  /** Badge size */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Show description text */
  showDescription: PropTypes.bool,
  /** Enable animations */
  animated: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object,
  /** Callback when badge is unlocked */
  onUnlock: PropTypes.func,
}

export default GamificationBadge
