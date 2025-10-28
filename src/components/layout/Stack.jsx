/**
 * Stack Component
 * 
 * Vertical layout component with configurable gap spacing.
 * Uses flexbox for consistent vertical spacing between children.
 * 
 * Features:
 * - Configurable gap sizes using theme spacing scale
 * - Horizontal and vertical alignment options
 * - Divider support between items
 * - Responsive gap sizes
 * - Theme-aware spacing
 * 
 * @component
 * @example
 * <Stack gap="md">
 *   <Component1 />
 *   <Component2 />
 *   <Component3 />
 * </Stack>
 * 
 * @example
 * <Stack gap="lg" align="center" dividers>
 *   <Item1 />
 *   <Item2 />
 * </Stack>
 */

import React from 'react'
import PropTypes from 'prop-types'
import './Stack.css'

const Stack = ({
  children,
  gap = 'md',
  align = 'stretch',
  justify = 'flex-start',
  dividers = false,
  dividerColor,
  wrap = false,
  as: Component = 'div',
  className = '',
  ...props
}) => {
  const classes = [
    'stack',
    `stack--gap-${gap}`,
    `stack--align-${align}`,
    `stack--justify-${justify}`,
    dividers && 'stack--dividers',
    wrap && 'stack--wrap',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const style = dividerColor
    ? { '--stack-divider-color': dividerColor, ...props.style }
    : props.style

  return (
    <Component className={classes} style={style} {...props}>
      {children}
    </Component>
  )
}

Stack.propTypes = {
  /** Content to be stacked vertically */
  children: PropTypes.node.isRequired,
  
  /** Vertical gap between items (uses theme spacing scale) */
  gap: PropTypes.oneOf([
    'none',  // 0
    'xxs',   // 0.25rem (4px)
    'xs',    // 0.5rem (8px)
    'sm',    // 0.75rem (12px)
    'md',    // 1rem (16px) - default
    'lg',    // 1.5rem (24px)
    'xl',    // 2rem (32px)
    'xxl',   // 3rem (48px)
    'xxxl',  // 4rem (64px)
  ]),
  
  /** Horizontal alignment of items */
  align: PropTypes.oneOf([
    'flex-start',  // Left aligned
    'center',      // Center aligned
    'flex-end',    // Right aligned
    'stretch',     // Full width (default)
    'baseline',    // Baseline aligned
  ]),
  
  /** Vertical distribution of items */
  justify: PropTypes.oneOf([
    'flex-start',    // Top (default)
    'center',        // Center
    'flex-end',      // Bottom
    'space-between', // Space between items
    'space-around',  // Space around items
    'space-evenly',  // Equal space
  ]),
  
  /** Show dividers between items */
  dividers: PropTypes.bool,
  
  /** Custom divider color (CSS color value) */
  dividerColor: PropTypes.string,
  
  /** Allow items to wrap to multiple columns */
  wrap: PropTypes.bool,
  
  /** HTML element or React component to render as */
  as: PropTypes.elementType,
  
  /** Additional CSS class names */
  className: PropTypes.string,
  
  /** Inline styles */
  style: PropTypes.object,
}

export default Stack
