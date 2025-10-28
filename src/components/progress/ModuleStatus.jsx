import React from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'

/**
 * ModuleStatus Component
 * 
 * Badge component for displaying module status with 3 visual states:
 * - completed: Module is finished
 * - in-progress: Module is currently being worked on
 * - locked: Module is not yet accessible
 * 
 * Features smooth state transitions, icons, and theme-aware styling.
 * 
 * @component
 * @example
 * <ModuleStatus status="completed" />
 * 
 * @example
 * <ModuleStatus 
 *   status="in-progress"
 *   label="Module 2"
 *   size="large"
 *   showIcon
 * />
 */
function ModuleStatus({
  status = 'locked',
  label = null,
  size = 'medium',
  showIcon = true,
  animated = true,
  className = '',
  style = {},
  ...props
}) {
  const { theme } = useTheme()

  // Get status configuration
  const getStatusConfig = () => {
    const configs = {
      completed: {
        icon: '✓',
        label: 'Completed',
        bgColor: theme.colors.semantic.successBg,
        textColor: theme.colors.semantic.successText,
        borderColor: theme.colors.semantic.successBorder,
        iconBg: theme.colors.state.success.main,
        pulseColor: theme.colors.state.success.main,
        ariaLabel: 'Status: Completed',
      },
      'in-progress': {
        icon: '●',
        label: 'In Progress',
        bgColor: `${theme.colors.primary.main}15`,
        textColor: theme.colors.primary.main,
        borderColor: `${theme.colors.primary.main}30`,
        iconBg: theme.colors.primary.main,
        pulseColor: theme.colors.primary.main,
        ariaLabel: 'Status: In Progress',
      },
      locked: {
        icon: '🔒',
        label: 'Locked',
        bgColor: theme.colors.surface.base,
        textColor: theme.colors.text.disabled,
        borderColor: theme.colors.border.default,
        iconBg: theme.colors.text.disabled,
        pulseColor: 'transparent',
        ariaLabel: 'Status: Locked',
      },
    }
    return configs[status] || configs.locked
  }

  // Get size configuration
  const getSizeConfig = () => {
    const sizes = {
      small: {
        fontSize: theme.typography.size.caption,
        padding: `${theme.spacing.xxs} ${theme.spacing.sm}`,
        iconSize: '12px',
        gap: theme.spacing.xxs,
      },
      medium: {
        fontSize: theme.typography.size.bodySmall,
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        iconSize: '14px',
        gap: theme.spacing.xs,
      },
      large: {
        fontSize: theme.typography.size.body,
        padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
        iconSize: '16px',
        gap: theme.spacing.sm,
      },
    }
    return sizes[size] || sizes.medium
  }

  const statusConfig = getStatusConfig()
  const sizeConfig = getSizeConfig()

  const badgeStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: sizeConfig.gap,
    fontFamily: theme.typography.family.primary,
    fontSize: sizeConfig.fontSize,
    fontWeight: theme.typography.weight.semibold,
    padding: sizeConfig.padding,
    borderRadius: theme.radii.full,
    border: `${theme.borderWidth.medium} solid ${statusConfig.borderColor}`,
    backgroundColor: statusConfig.bgColor,
    color: statusConfig.textColor,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    lineHeight: 1,
    position: 'relative',
    overflow: 'visible',
    ...style,
  }

  const iconStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: sizeConfig.iconSize,
    lineHeight: 1,
  }

  // Animation variants for the badge
  const badgeVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }
    },
    exit: { 
      scale: 0.8, 
      opacity: 0,
      transition: { duration: 0.2 }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    },
  }

  // Icon animation variants
  const iconVariants = {
    completed: {
      scale: [1, 1.3, 1],
      rotate: [0, 0, 360],
      transition: {
        duration: 0.6,
        ease: 'easeInOut',
      }
    },
    'in-progress': {
      scale: [1, 1.2, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }
    },
    locked: {
      scale: 1,
    },
  }

  // Pulse animation for in-progress status
  const pulseVariants = {
    'in-progress': {
      scale: [1, 1.5],
      opacity: [0.6, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeOut',
      }
    },
  }

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={status}
        className={`module-status module-status--${status} ${className}`}
        style={badgeStyles}
        variants={animated ? badgeVariants : undefined}
        initial={animated ? 'initial' : false}
        animate={animated ? 'animate' : false}
        exit={animated ? 'exit' : false}
        whileHover={animated ? 'hover' : undefined}
        whileTap={animated ? 'tap' : undefined}
        role="status"
        aria-label={statusConfig.ariaLabel}
        {...props}
      >
        {/* Pulse effect for in-progress */}
        {status === 'in-progress' && animated && (
          <motion.span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              height: '100%',
              borderRadius: theme.radii.full,
              border: `2px solid ${statusConfig.pulseColor}`,
              pointerEvents: 'none',
            }}
            variants={pulseVariants}
            animate="in-progress"
          />
        )}

        {showIcon && (
          <motion.span
            className="module-status__icon"
            style={iconStyles}
            variants={animated ? iconVariants : undefined}
            animate={animated ? status : false}
          >
            {statusConfig.icon}
          </motion.span>
        )}

        <span className="module-status__label">
          {label || statusConfig.label}
        </span>

        {/* Completed checkmark animation overlay */}
        {status === 'completed' && animated && (
          <motion.span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: `calc(${sizeConfig.iconSize} * 3)`,
              pointerEvents: 'none',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
            }}
            transition={{ 
              duration: 0.8,
              times: [0, 0.5, 1],
            }}
          >
            ✓
          </motion.span>
        )}
      </motion.span>
    </AnimatePresence>
  )
}

ModuleStatus.propTypes = {
  /** Module status */
  status: PropTypes.oneOf(['completed', 'in-progress', 'locked']).isRequired,
  /** Custom label text (overrides default) */
  label: PropTypes.string,
  /** Badge size */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Show status icon */
  showIcon: PropTypes.bool,
  /** Enable animations */
  animated: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Custom styles */
  style: PropTypes.object,
}

export default ModuleStatus
