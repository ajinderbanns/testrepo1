/**
 * Container Component
 * 
 * Responsive container with max-width constraints and horizontal padding.
 * Provides consistent layout boundaries across all viewport sizes.
 * 
 * Features:
 * - Max-width constraints based on size prop
 * - Responsive horizontal padding
 * - Optional centering
 * - Fluid/full-width variants
 * - Theme-aware spacing
 * 
 * @component
 * @example
 * <Container>
 *   <YourContent />
 * </Container>
 * 
 * @example
 * <Container size="lg" padding="lg" centered>
 *   <YourContent />
 * </Container>
 */

import React from 'react'
import PropTypes from 'prop-types'
import './Container.css'

const Container = ({
  children,
  size = 'default',
  padding = 'default',
  centered = true,
  fluid = false,
  as: Component = 'div',
  className = '',
  ...props
}) => {
  const classes = [
    'container',
    `container--${size}`,
    `container--padding-${padding}`,
    centered && 'container--centered',
    fluid && 'container--fluid',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}

Container.propTypes = {
  /** Content to be rendered inside the container */
  children: PropTypes.node.isRequired,
  
  /** Maximum width of the container */
  size: PropTypes.oneOf([
    'xs',      // 640px - Small content
    'sm',      // 768px - Mobile-first
    'default', // 1024px - Default
    'md',      // 1024px - Alias for default
    'lg',      // 1280px - Large desktop
    'xl',      // 1536px - Extra large
    'xxl',     // 1920px - Ultra-wide
    'full',    // 100% - Full width
  ]),
  
  /** Horizontal padding size */
  padding: PropTypes.oneOf([
    'none',    // No padding
    'xs',      // 0.5rem (8px)
    'sm',      // 0.75rem (12px)
    'default', // 1rem (16px)
    'md',      // 1rem (16px) - Alias
    'lg',      // 1.5rem (24px)
    'xl',      // 2rem (32px)
  ]),
  
  /** Center the container horizontally */
  centered: PropTypes.bool,
  
  /** Ignore max-width and use 100% width */
  fluid: PropTypes.bool,
  
  /** HTML element or React component to render as */
  as: PropTypes.elementType,
  
  /** Additional CSS class names */
  className: PropTypes.string,
}

export default Container
