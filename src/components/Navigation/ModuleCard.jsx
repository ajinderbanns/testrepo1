/**
 * ModuleCard Component
 * 
 * Card component for displaying module information with:
 * - Module title and description
 * - Status badge (completed, in-progress, locked)
 * - Progress bar
 * - Estimated time
 * - Interactive hover effects
 * - Lock state with unlock message
 * 
 * @component
 */

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { useTheme } from '../../hooks/useTheme'
import ModuleStatus from '../progress/ModuleStatus'
import { getUnlockMessage } from '../../utils/navigationHelpers'
import './ModuleCard.css'

function ModuleCard({
  id,
  title,
  description,
  status,
  completionPercentage = 0,
  estimatedMinutes = 0,
  isLocked = false,
  progress = null,
  className = '',
  onClick,
}) {
  const { theme } = useTheme()
  const navigate = useNavigate()

  const handleClick = () => {
    if (isLocked) {
      return
    }
    if (onClick) {
      onClick()
    } else {
      navigate(`/module/${id}`)
    }
  }

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !isLocked) {
      e.preventDefault()
      handleClick()
    }
  }

  const unlockMessage = isLocked ? getUnlockMessage(id, progress) : null

  return (
    <motion.div
      className={`module-card ${isLocked ? 'module-card--locked' : ''} ${className}`}
      style={styles.card(theme, isLocked)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      whileHover={!isLocked ? { scale: 1.02, y: -4 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2 }}
      role="button"
      tabIndex={0}
      aria-label={`${title}: ${description}`}
      aria-disabled={isLocked}
    >
      {/* Header */}
      <div className="module-card__header" style={styles.header}>
        <div style={styles.titleSection}>
          <h3 style={styles.title(theme)}>{title}</h3>
          <ModuleStatus status={status} size="small" animated={true} />
        </div>
        {!isLocked && estimatedMinutes > 0 && (
          <div style={styles.meta(theme)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{estimatedMinutes} min</span>
          </div>
        )}
      </div>

      {/* Description */}
      <p style={styles.description(theme)}>{description}</p>

      {/* Progress Bar (only if not locked and has progress) */}
      {!isLocked && completionPercentage > 0 && (
        <div className="module-card__progress" style={styles.progressSection}>
          <div style={styles.progressBar(theme)}>
            <motion.div
              style={styles.progressFill(theme)}
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <span style={styles.progressText(theme)}>{completionPercentage}%</span>
        </div>
      )}

      {/* Lock Message */}
      {isLocked && unlockMessage && (
        <div style={styles.lockMessage(theme)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>{unlockMessage}</span>
        </div>
      )}

      {/* Action Indicator */}
      {!isLocked && (
        <div style={styles.actionIndicator(theme)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      )}
    </motion.div>
  )
}

ModuleCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['completed', 'in-progress', 'locked']).isRequired,
  completionPercentage: PropTypes.number,
  estimatedMinutes: PropTypes.number,
  isLocked: PropTypes.bool,
  progress: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func,
}

// Styles
const styles = {
  card: (theme, isLocked) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface.raised,
    borderRadius: theme.radii.large,
    border: `${theme.borderWidth.thin} solid ${theme.colors.border.default}`,
    cursor: isLocked ? 'not-allowed' : 'pointer',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.2s ease',
    boxShadow: theme.shadows.medium,
    fontFamily: theme.typography.family.primary,
    opacity: isLocked ? 0.7 : 1,
  }),

  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '12px',
  },

  titleSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1,
  },

  title: (theme) => ({
    margin: 0,
    fontSize: theme.typography.size.h6,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text.primary,
  }),

  meta: (theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: theme.typography.size.caption,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.weight.medium,
  }),

  description: (theme) => ({
    margin: 0,
    fontSize: theme.typography.size.body,
    color: theme.colors.text.secondary,
    lineHeight: 1.6,
  }),

  progressSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },

  progressBar: (theme) => ({
    flex: 1,
    height: '8px',
    backgroundColor: theme.colors.surface.base,
    borderRadius: theme.radii.full,
    overflow: 'hidden',
  }),

  progressFill: (theme) => ({
    height: '100%',
    backgroundColor: theme.colors.primary.main,
    borderRadius: theme.radii.full,
    transition: 'width 0.8s ease',
  }),

  progressText: (theme) => ({
    fontSize: theme.typography.size.bodySmall,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text.secondary,
    minWidth: '40px',
    textAlign: 'right',
  }),

  lockMessage: (theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: theme.spacing.sm,
    backgroundColor: `${theme.colors.primary.main}10`,
    borderRadius: theme.radii.medium,
    fontSize: theme.typography.size.bodySmall,
    color: theme.colors.text.secondary,
  }),

  actionIndicator: (theme) => ({
    position: 'absolute',
    bottom: theme.spacing.lg,
    right: theme.spacing.lg,
    color: theme.colors.primary.main,
    opacity: 0.7,
  }),
}

export default ModuleCard
