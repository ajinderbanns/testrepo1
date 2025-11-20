/**
 * Breadcrumbs Component
 * 
 * Navigation breadcrumb trail showing current location hierarchy.
 * Features:
 * - Automatic breadcrumb generation from route
 * - Links to parent pages
 * - Current page highlighted (no link)
 * - Responsive design with ellipsis on mobile
 * - Animated transitions
 * 
 * @component
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { useTheme } from '../../hooks/useTheme'
import { useNavigation } from '../../hooks/useNavigation'
import './Breadcrumbs.css'

function Breadcrumbs({ className = '', maxItems = 4, showHome = true }) {
  const { theme } = useTheme()
  const { breadcrumbs } = useNavigation()

  // Filter breadcrumbs based on showHome
  const visibleBreadcrumbs = showHome ? breadcrumbs : breadcrumbs.slice(1)

  // Don't render if only one breadcrumb (home)
  if (visibleBreadcrumbs.length <= 1) {
    return null
  }

  // Collapse breadcrumbs if too many
  const shouldCollapse = visibleBreadcrumbs.length > maxItems
  let displayBreadcrumbs = visibleBreadcrumbs

  if (shouldCollapse) {
    // Show first, ellipsis, and last 2
    displayBreadcrumbs = [
      visibleBreadcrumbs[0],
      { label: '...', path: null, isEllipsis: true },
      ...visibleBreadcrumbs.slice(-2),
    ]
  }

  return (
    <nav
      className={`breadcrumbs ${className}`}
      style={styles.nav(theme)}
      aria-label="Breadcrumb"
    >
      <ol style={styles.list}>
        {displayBreadcrumbs.map((crumb, index) => {
          const isLast = index === displayBreadcrumbs.length - 1
          const isEllipsis = crumb.isEllipsis

          return (
            <motion.li
              key={crumb.path || `ellipsis-${index}`}
              style={styles.item}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {!isLast && !isEllipsis ? (
                <>
                  <Link to={crumb.path} style={styles.link(theme)}>
                    {crumb.label}
                  </Link>
                  <span style={styles.separator(theme)} aria-hidden="true">
                    /
                  </span>
                </>
              ) : isEllipsis ? (
                <>
                  <span style={styles.ellipsis(theme)}>{crumb.label}</span>
                  <span style={styles.separator(theme)} aria-hidden="true">
                    /
                  </span>
                </>
              ) : (
                <span style={styles.current(theme)} aria-current="page">
                  {crumb.label}
                </span>
              )}
            </motion.li>
          )
        })}
      </ol>
    </nav>
  )
}

Breadcrumbs.propTypes = {
  className: PropTypes.string,
  maxItems: PropTypes.number,
  showHome: PropTypes.bool,
}

// Styles
const styles = {
  nav: (theme) => ({
    padding: `${theme.spacing.sm} 0`,
    fontFamily: theme.typography.family.primary,
  }),

  list: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    gap: '8px',
  },

  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },

  link: (theme) => ({
    textDecoration: 'none',
    color: theme.colors.text.secondary,
    fontSize: theme.typography.size.bodySmall,
    fontWeight: theme.typography.weight.medium,
    transition: 'color 0.2s ease',
    padding: '4px 8px',
    borderRadius: theme.radii.small,
  }),

  current: (theme) => ({
    color: theme.colors.text.primary,
    fontSize: theme.typography.size.bodySmall,
    fontWeight: theme.typography.weight.semibold,
    padding: '4px 8px',
  }),

  ellipsis: (theme) => ({
    color: theme.colors.text.disabled,
    fontSize: theme.typography.size.bodySmall,
    padding: '4px 8px',
  }),

  separator: (theme) => ({
    color: theme.colors.text.disabled,
    fontSize: theme.typography.size.bodySmall,
    userSelect: 'none',
  }),
}

export default Breadcrumbs
