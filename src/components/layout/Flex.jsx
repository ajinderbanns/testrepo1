/**
 * Flex Component
 * 
 * Flexible layout component using flexbox with alignment and spacing utilities.
 * Provides horizontal or vertical layouts with fine-grained control.
 * 
 * Features:
 * - Horizontal and vertical layouts
 * - Alignment and justification controls
 * - Gap spacing using theme scale
 * - Wrap support
 * - Flexible grow/shrink behavior
 * - Theme-aware spacing
 * 
 * @component
 * @example
 * // Horizontal layout
 * <Flex align="center" justify="space-between" gap="md">
 *   <Item1 />
 *   <Item2 />
 *   <Item3 />
 * </Flex>
 * 
 * @example
 * // Vertical layout
 * <Flex direction="column" align="stretch" gap="lg">
 *   <Item1 />
 *   <Item2 />
 * </Flex>
 */

import React from 'react'
import PropTypes from 'prop-types'
import './Flex.css'

const Flex = ({
  children,
  direction = 'row',
  align = 'stretch',
  justify = 'flex-start',
  gap = 'none',
  wrap = false,
  inline = false,
  as: Component = 'div',
  className = '',
  ...props
}) => {
  const classes = [
    inline ? 'flex-inline' : 'flex',
    `flex--direction-${direction}`,
    `flex--align-${align}`,
    `flex--justify-${justify}`,
    gap !== 'none' && `flex--gap-${gap}`,
    wrap && 'flex--wrap',
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

Flex.propTypes = {
  /** Content to be laid out with flexbox */
  children: PropTypes.node.isRequired,
  
  /** Flex direction */
  direction: PropTypes.oneOf([
    'row',            // Horizontal (default)
    'row-reverse',    // Horizontal reversed
    'column',         // Vertical
    'column-reverse', // Vertical reversed
  ]),
  
  /** Cross-axis alignment */
  align: PropTypes.oneOf([
    'flex-start',  // Start of cross axis
    'center',      // Center of cross axis
    'flex-end',    // End of cross axis
    'stretch',     // Stretch to fill (default)
    'baseline',    // Baseline aligned
  ]),
  
  /** Main-axis justification */
  justify: PropTypes.oneOf([
    'flex-start',    // Start (default)
    'center',        // Center
    'flex-end',      // End
    'space-between', // Space between items
    'space-around',  // Space around items
    'space-evenly',  // Equal space
  ]),
  
  /** Gap between items (uses theme spacing scale) */
  gap: PropTypes.oneOf([
    'none',  // 0 (default)
    'xxs',   // 0.25rem (4px)
    'xs',    // 0.5rem (8px)
    'sm',    // 0.75rem (12px)
    'md',    // 1rem (16px)
    'lg',    // 1.5rem (24px)
    'xl',    // 2rem (32px)
    'xxl',   // 3rem (48px)
    'xxxl',  // 4rem (64px)
  ]),
  
  /** Allow items to wrap to multiple lines */
  wrap: PropTypes.bool,
  
  /** Use inline-flex instead of flex */
  inline: PropTypes.bool,
  
  /** HTML element or React component to render as */
  as: PropTypes.elementType,
  
  /** Additional CSS class names */
  className: PropTypes.string,
}

export default Flex
