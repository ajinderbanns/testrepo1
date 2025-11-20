/**
 * MobileMenu Component
 * 
 * Slide-out mobile navigation drawer with:
 * - Smooth slide-in/out animation
 * - Touch-friendly interface
 * - Module navigation with status indicators
 * - Backdrop overlay
 * - Close on navigation or backdrop click
 * 
 * @component
 */

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'
import { useTheme } from '../../hooks/useTheme'
import { useNavigation } from '../../hooks/useNavigation'
import ModuleStatus from '../progress/ModuleStatus'
import './MobileMenu.css'

function MobileMenu({ isOpen, onClose, navigationItems }) {
  const { theme } = useTheme()
  const { isActive } = useNavigation()

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="mobile-menu__backdrop"
            style={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            className="mobile-menu__drawer"
            style={styles.drawer(theme)}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            role="dialog"
            aria-label="Mobile navigation menu"
          >
            {/* Header */}
            <div className="mobile-menu__header" style={styles.header(theme)}>
              <h2 style={styles.title(theme)}>Navigation</h2>
              <button
                className="mobile-menu__close"
                style={styles.closeButton(theme)}
                onClick={onClose}
                aria-label="Close menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="mobile-menu__nav" style={styles.nav}>
              {/* Home Link */}
              <Link
                to="/learn"
                style={{
                  ...styles.navLink(theme),
                  ...(isActive('/learn', true) ? styles.navLinkActive(theme) : {}),
                }}
                onClick={onClose}
              >
                <span style={styles.navLinkIcon}>🏠</span>
                <span style={styles.navLinkText}>Home</span>
              </Link>

              <div style={styles.divider(theme)} />

              {/* Module Links */}
              <div style={styles.modulesSection}>
                <h3 style={styles.sectionTitle(theme)}>Modules</h3>
                {navigationItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    style={{
                      ...styles.moduleLink(theme),
                      ...(isActive(item.path) ? styles.moduleLinkActive(theme) : {}),
                      ...(item.isLocked ? styles.moduleLinkLocked(theme) : {}),
                    }}
                    onClick={(e) => {
                      if (item.isLocked) {
                        e.preventDefault()
                      } else {
                        onClose()
                      }
                    }}
                  >
                    <div style={styles.moduleLinkContent}>
                      <span style={styles.moduleLinkTitle(theme)}>{item.title}</span>
                      <span style={styles.moduleLinkDescription(theme)}>{item.description}</span>
                    </div>
                    <div style={styles.moduleLinkStatus}>
                      <ModuleStatus
                        status={item.isCompleted ? 'completed' : item.isInProgress ? 'in-progress' : 'locked'}
                        showIcon={true}
                        size="small"
                        animated={false}
                      />
                      {!item.isLocked && item.completionPercentage > 0 && (
                        <span style={styles.progressText(theme)}>{item.completionPercentage}%</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </nav>

            {/* Footer */}
            <div className="mobile-menu__footer" style={styles.footer(theme)}>
              <p style={styles.footerText(theme)}>
                Use <kbd style={styles.kbd(theme)}>Cmd+M</kbd> to toggle menu
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  navigationItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      isLocked: PropTypes.bool,
      isCompleted: PropTypes.bool,
      isInProgress: PropTypes.bool,
      completionPercentage: PropTypes.number,
    })
  ).isRequired,
}

// Styles
const styles = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1100,
  },

  drawer: (theme) => ({
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '85%',
    maxWidth: '400px',
    backgroundColor: theme.colors.background.primary,
    boxShadow: theme.shadows.large,
    zIndex: 1101,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    fontFamily: theme.typography.family.primary,
  }),

  header: (theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
    borderBottom: `${theme.borderWidth.thin} solid ${theme.colors.border.default}`,
  }),

  title: (theme) => ({
    margin: 0,
    fontSize: theme.typography.size.h6,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text.primary,
  }),

  closeButton: (theme) => ({
    background: 'transparent',
    border: 'none',
    padding: theme.spacing.xs,
    cursor: 'pointer',
    color: theme.colors.text.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radii.medium,
    transition: 'all 0.2s ease',
  }),

  nav: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 0',
  },

  navLink: (theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    textDecoration: 'none',
    color: theme.colors.text.primary,
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.medium,
    transition: 'all 0.2s ease',
  }),

  navLinkActive: (theme) => ({
    backgroundColor: `${theme.colors.primary.main}10`,
    color: theme.colors.primary.main,
    fontWeight: theme.typography.weight.semibold,
  }),

  navLinkIcon: {
    fontSize: '1.25rem',
  },

  navLinkText: {
    flex: 1,
  },

  divider: (theme) => ({
    height: '1px',
    backgroundColor: theme.colors.border.default,
    margin: `${theme.spacing.sm} ${theme.spacing.lg}`,
  }),

  modulesSection: {
    display: 'flex',
    flexDirection: 'column',
  },

  sectionTitle: (theme) => ({
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    margin: 0,
  }),

  moduleLink: (theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    textDecoration: 'none',
    color: theme.colors.text.primary,
    transition: 'all 0.2s ease',
    minHeight: '72px',
  }),

  moduleLinkActive: (theme) => ({
    backgroundColor: `${theme.colors.primary.main}10`,
    borderLeft: `3px solid ${theme.colors.primary.main}`,
  }),

  moduleLinkLocked: (theme) => ({
    opacity: 0.5,
    cursor: 'not-allowed',
  }),

  moduleLinkContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },

  moduleLinkTitle: (theme) => ({
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text.primary,
  }),

  moduleLinkDescription: (theme) => ({
    fontSize: theme.typography.size.bodySmall,
    color: theme.colors.text.secondary,
  }),

  moduleLinkStatus: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '4px',
  },

  progressText: (theme) => ({
    fontSize: theme.typography.size.caption,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.weight.medium,
  }),

  footer: (theme) => ({
    padding: theme.spacing.lg,
    borderTop: `${theme.borderWidth.thin} solid ${theme.colors.border.default}`,
    marginTop: 'auto',
  }),

  footerText: (theme) => ({
    margin: 0,
    fontSize: theme.typography.size.caption,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
  }),

  kbd: (theme) => ({
    padding: '2px 6px',
    backgroundColor: theme.colors.surface.base,
    border: `${theme.borderWidth.thin} solid ${theme.colors.border.default}`,
    borderRadius: theme.radii.small,
    fontSize: theme.typography.size.caption,
    fontFamily: theme.typography.family.mono || 'monospace',
  }),
}

export default MobileMenu
