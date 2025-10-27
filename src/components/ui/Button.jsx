import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import './Button.css'

/**
 * Button Component
 * 
 * Versatile button component with multiple variants, sizes, and states.
 * Features theme-aware styling and Framer Motion animations.
 * 
 * Variants:
 * - primary: Main call-to-action button
 * - secondary: Less prominent actions
 * - tertiary: Minimal, text-like button
 * 
 * @component
 * @example
 * <Button variant="primary" onClick={handleClick}>
 *   Click Me
 * </Button>
 * 
 * @example
 * <Button variant="secondary" size="small" loading>
 *   Loading...
 * </Button>
 */
function Button({
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  const { theme } = useTheme()

  // Generate dynamic styles based on theme and variant
  const getButtonStyles = () => {
    const baseStyles = {
      fontFamily: theme.typography.family.primary,
      borderRadius: theme.radii.medium,
      transition: theme.transitions.default,
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      width: fullWidth ? '100%' : 'auto',
    }

    // Size-specific styles
    const sizeStyles = {
      small: {
        fontSize: theme.typography.size.bodySmall,
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        fontWeight: theme.typography.weight.medium,
      },
      medium: {
        fontSize: theme.typography.size.body,
        padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
        fontWeight: theme.typography.weight.semibold,
      },
      large: {
        fontSize: theme.typography.size.bodyLarge,
        padding: `${theme.spacing.md} ${theme.spacing.xl}`,
        fontWeight: theme.typography.weight.bold,
      },
    }

    // Variant-specific styles
    const variantStyles = {
      primary: {
        backgroundColor: theme.colors.primary.main,
        color: theme.colors.primary.contrast,
        border: 'none',
        boxShadow: theme.shadows.medium,
      },
      secondary: {
        backgroundColor: theme.colors.secondary.main,
        color: theme.colors.secondary.contrast,
        border: 'none',
        boxShadow: theme.shadows.small,
      },
      tertiary: {
        backgroundColor: 'transparent',
        color: theme.colors.text.primary,
        border: `${theme.borderWidth.thin} solid ${theme.colors.border.default}`,
        boxShadow: 'none',
      },
    }

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...variantStyles[variant],
    }
  }

  // Framer Motion variants for animations
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.03,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.97,
      transition: { duration: 0.1 }
    },
  }

  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault()
      return
    }
    onClick?.(e)
  }

  return (
    <motion.button
      type={type}
      className={`ui-button ui-button--${variant} ui-button--${size} ${className}`}
      style={getButtonStyles()}
      onClick={handleClick}
      disabled={disabled || loading}
      variants={buttonVariants}
      initial="initial"
      whileHover={!disabled && !loading ? "hover" : undefined}
      whileTap={!disabled && !loading ? "tap" : undefined}
      aria-busy={loading}
      aria-disabled={disabled}
      {...props}
    >
      {loading ? (
        <span className="button-loading">
          <span className="button-spinner" />
          Loading...
        </span>
      ) : (
        children
      )}
    </motion.button>
  )
}

Button.propTypes = {
  /** Button content */
  children: PropTypes.node.isRequired,
  /** Button variant style */
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  /** Button size */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Loading state */
  loading: PropTypes.bool,
  /** Disabled state */
  disabled: PropTypes.bool,
  /** Full width button */
  fullWidth: PropTypes.bool,
  /** Click handler */
  onClick: PropTypes.func,
  /** Button type */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** Additional CSS classes */
  className: PropTypes.string,
}

export default Button
