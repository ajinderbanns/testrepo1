/**
 * AppHeader Component
 * 
 * Enhanced navigation header with:
 * - Logo/branding with link to home
 * - Main navigation links (Home, Modules, Progress)
 * - Module status indicators
 * - Mobile menu toggle
 * - Theme-aware styling
 * - Responsive design
 * 
 * @component
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { useTheme } from '../../hooks/useTheme'
import { useNavigation } from '../../hooks/useNavigation'
import MobileMenu from './MobileMenu'
import './AppHeader.css'

function AppHeader({ showNav = true, className = '' }) {
  const { theme } = useTheme()
  const {
    navigationItems,
    isActive,
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
    hideNavigation,
  } = useNavigation()

  // Don't show navigation on landing page
  if (hideNavigation) {
    return (
      <header className={`app-header app-header--minimal ${className}`} style={styles.header(theme)}>
        <div className="app-header__content" style={styles.content}>
          <div className="app-header__brand" style={styles.brand}>
            <Link to="/" style={styles.brandLink(theme)}>
              <h1 style={styles.brandTitle(theme)}>LLM Education</h1>
            </Link>
          </div>
        </div>
      </header>
    )
  }

  // Full navigation header
  return (
    <header className={`app-header ${className}`} style={styles.header(theme)} role="banner">
      <div className="app-header__content" style={styles.content}>
        {/* Logo/Brand */}
        <div className="app-header__brand" style={styles.brand}>
          <Link 
            to="/learn" 
            style={styles.brandLink(theme)}
            aria-label="LLM Education - Home"
          >
            <motion.h1
              style={styles.brandTitle(theme)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              LLM Education
            </motion.h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        {showNav && (
          <nav 
            className="app-header__nav" 
            style={styles.nav}
            role="navigation"
            aria-label="Main navigation"
          >
            <ul style={styles.navList} role="list">
              {/* Home Link */}
              <li style={styles.navItem}>
                <Link
                  to="/learn"
                  style={{
                    ...styles.navLink(theme),
                    ...(isActive('/learn', true) ? styles.navLinkActive(theme) : {}),
                  }}
                  aria-current={isActive('/learn', true) ? 'page' : undefined}
                >
                  Home
                </Link>
              </li>

              {/* Module Links with Status */}
              {navigationItems.map((item) => (
                <li key={item.id} style={styles.navItem}>
                  <Link
                    to={item.path}
                    style={{
                      ...styles.navLink(theme),
                      ...(isActive(item.path) ? styles.navLinkActive(theme) : {}),
                      ...(item.isLocked ? styles.navLinkLocked(theme) : {}),
                    }}
                    onClick={(e) => {
                      if (item.isLocked) {
                        e.preventDefault()
                      }
                    }}
                    aria-label={`${item.title}${item.isCompleted ? ' - Completed' : item.isInProgress ? ' - In Progress' : item.isLocked ? ' - Locked' : ''}`}
                    aria-disabled={item.isLocked}
                    aria-current={isActive(item.path) ? 'page' : undefined}
                    title={item.isLocked ? `Complete previous modules to unlock` : item.description}
                  >
                    <span>{item.title}</span>
                    {item.isCompleted && (
                      <span style={styles.statusBadge(theme, 'completed')} aria-hidden="true">✓</span>
                    )}
                    {item.isInProgress && !item.isCompleted && (
                      <span style={styles.statusBadge(theme, 'in-progress')} aria-hidden="true">●</span>
                    )}
                    {item.isLocked && (
                      <span style={styles.statusBadge(theme, 'locked')} aria-hidden="true">🔒</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Mobile Menu Toggle */}
        {showNav && (
          <button
            className="app-header__mobile-toggle touch-target-min"
            style={styles.mobileToggle(theme, isMobileMenuOpen)}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            type="button"
          >
            <span style={styles.menuIcon(theme, isMobileMenuOpen, 0)} aria-hidden="true" />
            <span style={styles.menuIcon(theme, isMobileMenuOpen, 1)} aria-hidden="true" />
            <span style={styles.menuIcon(theme, isMobileMenuOpen, 2)} aria-hidden="true" />
            <span className="sr-only">{isMobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {showNav && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
          navigationItems={navigationItems}
        />
      )}
    </header>
  )
}

AppHeader.propTypes = {
  showNav: PropTypes.bool,
  className: PropTypes.string,
}

// Styles
const styles = {
  header: (theme) => ({
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: theme.colors.surface.raised,
    borderBottom: `${theme.borderWidth.thin} solid ${theme.colors.border.default}`,
    boxShadow: theme.shadows.small,
    fontFamily: theme.typography.family.primary,
  }),

  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 24px',
    height: '64px',
  },

  brand: {
    display: 'flex',
    alignItems: 'center',
  },

  brandLink: (theme) => ({
    textDecoration: 'none',
    color: theme.colors.text.primary,
    display: 'flex',
    alignItems: 'center',
  }),

  brandTitle: (theme) => ({
    fontSize: theme.typography.size.h6,
    fontWeight: theme.typography.weight.bold,
    margin: 0,
    color: theme.colors.primary.main,
  }),

  nav: {
    display: 'flex',
    alignItems: 'center',
  },

  navList: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    gap: '8px',
  },

  navItem: {
    margin: 0,
    padding: 0,
  },

  navLink: (theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    textDecoration: 'none',
    color: theme.colors.text.secondary,
    fontSize: theme.typography.size.bodySmall,
    fontWeight: theme.typography.weight.medium,
    borderRadius: theme.radii.medium,
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
  }),

  navLinkActive: (theme) => ({
    color: theme.colors.primary.main,
    backgroundColor: `${theme.colors.primary.main}15`,
    fontWeight: theme.typography.weight.semibold,
  }),

  navLinkLocked: (theme) => ({
    color: theme.colors.text.disabled,
    cursor: 'not-allowed',
    opacity: 0.6,
  }),

  statusBadge: (theme, status) => {
    const configs = {
      completed: {
        color: theme.colors.state.success.main,
      },
      'in-progress': {
        color: theme.colors.primary.main,
      },
      locked: {
        fontSize: '0.75em',
      },
    }
    return {
      fontSize: '0.875em',
      marginLeft: '4px',
      ...(configs[status] || {}),
    }
  },

  mobileToggle: (theme, isOpen) => ({
    display: 'none',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '32px',
    height: '32px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    zIndex: 10,
  }),

  menuIcon: (theme, isOpen, index) => {
    const baseStyle = {
      width: '100%',
      height: '2px',
      backgroundColor: theme.colors.text.primary,
      borderRadius: theme.radii.small,
      transition: 'all 0.3s ease',
      transformOrigin: 'center',
    }

    if (!isOpen) return baseStyle

    // Animate to X when open
    if (index === 0) {
      return {
        ...baseStyle,
        transform: 'rotate(45deg) translateY(8px)',
      }
    }
    if (index === 1) {
      return {
        ...baseStyle,
        opacity: 0,
      }
    }
    if (index === 2) {
      return {
        ...baseStyle,
        transform: 'rotate(-45deg) translateY(-8px)',
      }
    }
    return baseStyle
  },
}

export default AppHeader
