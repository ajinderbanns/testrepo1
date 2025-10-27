import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import './Card.css'

/**
 * Card Component
 * 
 * Flexible container component for content sections with optional header and footer.
 * Features theme-aware styling, elevation shadows, and hover animations.
 * 
 * @component
 * @example
 * <Card>
 *   <p>Card content</p>
 * </Card>
 * 
 * @example
 * <Card 
 *   header={<h3>Card Title</h3>}
 *   footer={<button>Action</button>}
 *   elevated
 * >
 *   <p>Card with header and footer</p>
 * </Card>
 */
function Card({
  children,
  header = null,
  footer = null,
  elevated = false,
  hoverable = false,
  padding = 'medium',
  className = '',
  onClick,
  ...props
}) {
  const { theme } = useTheme()

  // Generate dynamic styles based on theme
  const getCardStyles = () => {
    const paddingValues = {
      none: '0',
      small: theme.spacing.sm,
      medium: theme.spacing.lg,
      large: theme.spacing.xl,
    }

    return {
      backgroundColor: theme.colors.surface.base,
      borderRadius: theme.radii.large,
      border: `${theme.borderWidth.thin} solid ${theme.colors.border.default}`,
      boxShadow: elevated ? theme.shadows.large : theme.shadows.small,
      transition: theme.transitions.default,
      cursor: onClick || hoverable ? 'pointer' : 'default',
      overflow: 'hidden',
    }
  }

  const getContentStyles = () => {
    const paddingValues = {
      none: '0',
      small: theme.spacing.sm,
      medium: theme.spacing.lg,
      large: theme.spacing.xl,
    }

    return {
      padding: paddingValues[padding],
    }
  }

  // Framer Motion variants
  const cardVariants = {
    initial: { scale: 1, y: 0 },
    hover: hoverable || onClick ? {
      scale: 1.02,
      y: -4,
      transition: { duration: 0.2 }
    } : {},
  }

  const handleClick = (e) => {
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <motion.div
      className={`ui-card ${elevated ? 'ui-card--elevated' : ''} ${hoverable ? 'ui-card--hoverable' : ''} ${className}`}
      style={getCardStyles()}
      onClick={handleClick}
      variants={cardVariants}
      initial="initial"
      whileHover={(hoverable || onClick) ? "hover" : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick(e)
        }
      } : undefined}
      {...props}
    >
      {header && (
        <div className="ui-card__header" style={{ 
          padding: getContentStyles().padding,
          borderBottom: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`
        }}>
          {header}
        </div>
      )}
      
      <div className="ui-card__content" style={getContentStyles()}>
        {children}
      </div>
      
      {footer && (
        <div className="ui-card__footer" style={{ 
          padding: getContentStyles().padding,
          borderTop: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`
        }}>
          {footer}
        </div>
      )}
    </motion.div>
  )
}

Card.propTypes = {
  /** Card content */
  children: PropTypes.node.isRequired,
  /** Optional header content */
  header: PropTypes.node,
  /** Optional footer content */
  footer: PropTypes.node,
  /** Elevated shadow style */
  elevated: PropTypes.bool,
  /** Hoverable animation effect */
  hoverable: PropTypes.bool,
  /** Internal padding size */
  padding: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Click handler */
  onClick: PropTypes.func,
}

export default Card
