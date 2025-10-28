/**
 * Grid Component
 * 
 * Responsive grid layout with 12-column system.
 * Provides flexible, configurable grid layouts with gap control.
 * 
 * Features:
 * - 12-column grid system
 * - Responsive column layouts
 * - Configurable row and column gaps
 * - Auto-fit and auto-fill modes
 * - Theme-aware spacing
 * 
 * @component
 * @example
 * // Basic 3-column grid
 * <Grid columns={3} gap="lg">
 *   <Item />
 *   <Item />
 *   <Item />
 * </Grid>
 * 
 * @example
 * // Responsive grid
 * <Grid 
 *   columns={{ mobile: 1, tablet: 2, desktop: 4 }}
 *   gap="md"
 * >
 *   <Item />
 *   <Item />
 *   <Item />
 * </Grid>
 */

import React from 'react'
import PropTypes from 'prop-types'
import './Grid.css'

const Grid = ({
  children,
  columns = 'auto',
  gap = 'md',
  rowGap,
  columnGap,
  align = 'stretch',
  justify = 'stretch',
  autoFlow = 'row',
  minColumnWidth,
  as: Component = 'div',
  className = '',
  style,
  ...props
}) => {
  // Handle responsive columns object
  const getColumnClasses = () => {
    if (typeof columns === 'object') {
      return Object.entries(columns)
        .map(([breakpoint, count]) => `grid--cols-${breakpoint}-${count}`)
        .join(' ')
    }
    return columns === 'auto' ? 'grid--cols-auto' : `grid--cols-${columns}`
  }

  const classes = [
    'grid',
    getColumnClasses(),
    gap && `grid--gap-${gap}`,
    rowGap && `grid--row-gap-${rowGap}`,
    columnGap && `grid--column-gap-${columnGap}`,
    `grid--align-${align}`,
    `grid--justify-${justify}`,
    `grid--flow-${autoFlow}`,
    minColumnWidth && 'grid--auto-fit',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // Custom inline styles for min column width
  const customStyle = {
    ...style,
    ...(minColumnWidth && {
      gridTemplateColumns: `repeat(auto-fit, minmax(min(${minColumnWidth}, 100%), 1fr))`,
    }),
  }

  return (
    <Component className={classes} style={customStyle} {...props}>
      {children}
    </Component>
  )
}

Grid.propTypes = {
  /** Content to be laid out in grid */
  children: PropTypes.node.isRequired,
  
  /** Number of columns or responsive object */
  columns: PropTypes.oneOfType([
    PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    PropTypes.shape({
      mobile: PropTypes.number,
      tablet: PropTypes.number,
      desktop: PropTypes.number,
      wide: PropTypes.number,
    }),
  ]),
  
  /** Gap between rows and columns (uses theme spacing scale) */
  gap: PropTypes.oneOf([
    'none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl',
  ]),
  
  /** Gap between rows only */
  rowGap: PropTypes.oneOf([
    'none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl',
  ]),
  
  /** Gap between columns only */
  columnGap: PropTypes.oneOf([
    'none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl',
  ]),
  
  /** Vertical alignment of grid items */
  align: PropTypes.oneOf([
    'start',     // Top aligned
    'center',    // Center aligned
    'end',       // Bottom aligned
    'stretch',   // Full height (default)
    'baseline',  // Baseline aligned
  ]),
  
  /** Horizontal alignment of grid items */
  justify: PropTypes.oneOf([
    'start',        // Left aligned
    'center',       // Center aligned
    'end',          // Right aligned
    'stretch',      // Full width (default)
    'space-between',// Space between
    'space-around', // Space around
    'space-evenly', // Equal space
  ]),
  
  /** Grid auto-flow direction */
  autoFlow: PropTypes.oneOf(['row', 'column', 'row-dense', 'column-dense']),
  
  /** Minimum column width for auto-fit mode (e.g., '250px', '15rem') */
  minColumnWidth: PropTypes.string,
  
  /** HTML element or React component to render as */
  as: PropTypes.elementType,
  
  /** Additional CSS class names */
  className: PropTypes.string,
  
  /** Inline styles */
  style: PropTypes.object,
}

export default Grid
