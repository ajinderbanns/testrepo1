/**
 * ResetProgress Component
 * 
 * Settings option that allows users to reset all their learning progress.
 * Includes a confirmation modal to prevent accidental resets and shows
 * success/error notifications after the action.
 * 
 * @component
 */

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import { useProgress } from '../../hooks/useProgress'
import { resetProgress } from '../../utils/progressHelpers'
import PropTypes from 'prop-types'

/**
 * ResetProgress Component
 * 
 * @param {Object} props - Component props
 * @param {Function} [props.onResetComplete] - Callback after successful reset
 * @param {string} [props.className] - Additional CSS classes
 */
function ResetProgress({ onResetComplete, className = '' }) {
  const { theme } = useTheme()
  const { reset: resetProgressHook, progress } = useProgress()
  
  const [showModal, setShowModal] = useState(false)
  const [isResetting, setIsResetting] = useState(false)
  const [notification, setNotification] = useState(null) // { type: 'success' | 'error', message: string }

  /**
   * Handle Reset Button Click - Show Confirmation Modal
   */
  const handleResetClick = () => {
    setShowModal(true)
  }

  /**
   * Handle Confirmation - Actually Reset Progress
   */
  const handleConfirmReset = async () => {
    setIsResetting(true)
    
    try {
      // Reset via hook (which updates React state)
      const hookSuccess = resetProgressHook()
      
      // Also clear from localStorage directly
      const storageSuccess = resetProgress()
      
      if (hookSuccess && storageSuccess) {
        // Success!
        setNotification({
          type: 'success',
          message: 'Progress reset successfully! Starting fresh.',
        })
        
        // Close modal
        setShowModal(false)
        
        // Call callback if provided
        if (onResetComplete) {
          setTimeout(() => onResetComplete(), 1500)
        }
        
        // Auto-hide notification after 5 seconds
        setTimeout(() => setNotification(null), 5000)
      } else {
        // Error
        setNotification({
          type: 'error',
          message: 'Failed to reset progress. Please try again.',
        })
      }
    } catch (error) {
      console.error('Error resetting progress:', error)
      setNotification({
        type: 'error',
        message: 'An error occurred while resetting progress.',
      })
    } finally {
      setIsResetting(false)
    }
  }

  /**
   * Handle Cancel - Close Modal
   */
  const handleCancel = () => {
    setShowModal(false)
  }

  /**
   * Get Progress Summary for Display
   */
  const getProgressSummary = () => {
    if (!progress || !progress.modules) {
      return 'No progress to reset'
    }

    const modules = Object.values(progress.modules)
    const completedModules = modules.filter((m) => m.status === 'completed').length
    const totalSections = modules.reduce((sum, m) => sum + (m.sections?.length || 0), 0)
    const completedSections = modules.reduce(
      (sum, m) => sum + (m.sections?.filter((s) => s.completed).length || 0),
      0
    )

    return `${completedSections} of ${totalSections} sections completed across ${completedModules} module(s)`
  }

  return (
    <div className={`reset-progress ${className}`} style={styles.container}>
      {/* Reset Button */}
      <motion.button
        onClick={handleResetClick}
        style={styles.resetButton(theme)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Reset all progress"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={styles.icon}
        >
          <polyline points="1 4 1 10 7 10" />
          <polyline points="23 20 23 14 17 14" />
          <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
        </svg>
        Reset All Progress
      </motion.button>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              style={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCancel}
            />

            {/* Modal */}
            <motion.div
              style={styles.modal(theme)}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="reset-modal-title"
            >
              {/* Warning Icon */}
              <div style={styles.warningIcon(theme)}>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>

              {/* Modal Content */}
              <h2 id="reset-modal-title" style={styles.modalTitle(theme)}>
                Reset All Progress?
              </h2>
              
              <p style={styles.modalDescription(theme)}>
                This action cannot be undone. All your learning progress, completed sections,
                and achievements will be permanently deleted.
              </p>

              <div style={styles.progressSummary(theme)}>
                <strong>Current Progress:</strong>
                <br />
                {getProgressSummary()}
              </div>

              <p style={styles.modalWarning(theme)}>
                Are you sure you want to start over?
              </p>

              {/* Modal Actions */}
              <div style={styles.modalActions}>
                <motion.button
                  onClick={handleCancel}
                  style={styles.cancelButton(theme)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isResetting}
                >
                  Cancel
                </motion.button>

                <motion.button
                  onClick={handleConfirmReset}
                  style={styles.confirmButton(theme)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isResetting}
                >
                  {isResetting ? 'Resetting...' : 'Yes, Reset Everything'}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success/Error Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            style={styles.notification(theme, notification.type)}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            {notification.type === 'success' ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            )}
            <span>{notification.message}</span>
            <button
              onClick={() => setNotification(null)}
              style={styles.closeNotification}
              aria-label="Close notification"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Styles
const styles = {
  container: {
    position: 'relative',
  },

  resetButton: (theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    backgroundColor: theme.colors.state.error.main,
    color: theme.colors.text.inverse,
    border: 'none',
    borderRadius: theme.radii.medium,
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.primary,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: theme.shadows.small,
  }),

  icon: {
    flexShrink: 0,
  },

  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 999,
    backdropFilter: 'blur(4px)',
  },

  modal: (theme) => ({
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.colors.surface.raised,
    borderRadius: theme.radii.large,
    padding: theme.spacing.xl,
    maxWidth: '500px',
    width: '90%',
    maxHeight: '90vh',
    overflow: 'auto',
    zIndex: 1000,
    boxShadow: theme.shadows.large,
    fontFamily: theme.typography.family.primary,
  }),

  warningIcon: (theme) => ({
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
    color: theme.colors.state.warning.main,
  }),

  modalTitle: (theme) => ({
    fontSize: theme.typography.size.h2,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  }),

  modalDescription: (theme) => ({
    fontSize: theme.typography.size.body,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
    lineHeight: 1.6,
  }),

  progressSummary: (theme) => ({
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface.default,
    borderRadius: theme.radii.medium,
    fontSize: theme.typography.size.bodySmall,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
    lineHeight: 1.6,
  }),

  modalWarning: (theme) => ({
    fontSize: theme.typography.size.body,
    color: theme.colors.state.error.main,
    fontWeight: theme.typography.weight.semibold,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  }),

  modalActions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
  },

  cancelButton: (theme) => ({
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    backgroundColor: theme.colors.surface.default,
    color: theme.colors.text.primary,
    border: `1px solid ${theme.colors.border.default}`,
    borderRadius: theme.radii.medium,
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.primary,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  }),

  confirmButton: (theme) => ({
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    backgroundColor: theme.colors.state.error.main,
    color: theme.colors.text.inverse,
    border: 'none',
    borderRadius: theme.radii.medium,
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.primary,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  }),

  notification: (theme, type) => ({
    position: 'fixed',
    top: theme.spacing.lg,
    right: theme.spacing.lg,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    padding: theme.spacing.md,
    backgroundColor:
      type === 'success' ? theme.colors.state.success.main : theme.colors.state.error.main,
    color: theme.colors.text.inverse,
    borderRadius: theme.radii.medium,
    boxShadow: theme.shadows.large,
    zIndex: 1001,
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.semibold,
    fontFamily: theme.typography.family.primary,
    maxWidth: '400px',
  }),

  closeNotification: {
    marginLeft: 'auto',
    background: 'none',
    border: 'none',
    color: 'inherit',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '0 4px',
    lineHeight: 1,
  },
}

ResetProgress.propTypes = {
  onResetComplete: PropTypes.func,
  className: PropTypes.string,
}

export default ResetProgress
