import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import './Badge.css'

/**
 * Badge Component
 * 
 * Status indicators and labels with different variants for different states.
 * Features theme-aware styling and subtle animations.
 * 
 * @component
 * @example
 * <Badge variant="completed">Completed</Badge>
 * 
 * @example
 * <Badge variant="in-progress" size="small">
 *   In Progress
 * </Badge>
 */
function Badge({
  children,
  variant = 'default',
  size = 'medium',
  pill = false,
  className = '',
  ...props
}) {
  const { theme } = useTheme()

  // Get variant-specific colors
  const getVariantStyles = () => {
    const variants = {
      default: {
        backgroundColor: theme.colors.surface.raised,
        color: theme.colors.text.primary,
        borderColor: theme.colors.border.default,
      },
      completed: {
        backgroundColor: theme.colors.semantic.successBg,
        color: theme.colors.semantic.successText,
        borderColor: theme.colors.semantic.successBorder,
      },
      'in-progress': {
        backgroundColor: theme.colors.primary.main + '15', // 15% opacity
        color: theme.colors.primary.main,
        borderColor: theme.colors.primary.main + '30',
      },
      locked: {
        backgroundColor: theme.colors.surface.base,
        color: theme.colors.text.disabled,
        borderColor: theme.colors.border.default,
      },
      success: {
        backgroundColor: theme.colors.semantic.successBg,
        color: theme.colors.semantic.successText,
        borderColor: theme.colors.semantic.successBorder,
      },
      warning: {
        backgroundColor: theme.colors.semantic.warningBg,
        color: theme.colors.semantic.warningText,
        borderColor: theme.colors.semantic.warningBorder,
      },
      error: {
        backgroundColor: theme.colors.semantic.errorBg,
        color: theme.colors.semantic.errorText,
        borderColor: theme.colors.semantic.errorBorder,
      },
      info: {
        backgroundColor: theme.colors.semantic.infoBg,
        color: theme.colors.semantic.infoText,
        borderColor: theme.colors.semantic.infoBorder,
      },
    }
    return variants[variant] || variants.default
  }

  // Get size-specific styles
  const getSizeStyles = () => {
    const sizes = {
      small: {
        fontSize: theme.typography.size.caption,
        padding: `${theme.spacing.xxs} ${theme.spacing.xs}`,
        fontWeight: theme.typography.weight.medium,
      },
      medium: {
        fontSize: theme.typography.size.bodySmall,
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        fontWeight: theme.typography.weight.semibold,
      },
      large: {
        fontSize: theme.typography.size.body,
        padding: `${theme.spacing.sm} ${theme.spacing.md}`,
        fontWeight: theme.typography.weight.semibold,
      },
    }
    return sizes[size]
  }

  const getBadgeStyles = () => {
    return {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.xxs,
      fontFamily: theme.typography.family.primary,
      borderRadius: pill ? theme.radii.full : theme.radii.small,
      border: `${theme.borderWidth.thin} solid`,
      textAlign: 'center',
      whiteSpace: 'nowrap',
      lineHeight: 1,
      transition: theme.transitions.fast,
      ...getVariantStyles(),
      ...getSizeStyles(),
    }
  }

  // Animation variants
  const badgeVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
  }

  // Add icon based on variant
  const getIcon = () => {
    const icons = {
      completed: '✓',
      'in-progress': '●',
      locked: '🔒',
      success: '✓',
      error: '✕',
      warning: '!',
      info: 'ℹ',
    }
    return icons[variant]
  }

  return (
    <motion.span
      className={`ui-badge ui-badge--${variant} ui-badge--${size} ${pill ? 'ui-badge--pill' : ''} ${className}`}
      style={getBadgeStyles()}
      variants={badgeVariants}
      initial="initial"
      whileHover="hover"
      role="status"
      {...props}
    >
      {getIcon() && <span className="ui-badge__icon">{getIcon()}</span>}
      {children}
    </motion.span>
  )
}

Badge.propTypes = {
  /** Badge content */
  children: PropTypes.node.isRequired,
  /** Badge variant/status */
  variant: PropTypes.oneOf([
    'default',
    'completed',
    'in-progress',
    'locked',
    'success',
    'warning',
    'error',
    'info',
  ]),
  /** Badge size */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Pill-shaped badge */
  pill: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
}

export default Badge
