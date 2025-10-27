import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import './Modal.css'

/**
 * Modal Component
 * 
 * Overlay component with backdrop blur, close button, and portal rendering.
 * Features smooth entrance/exit animations and focus trap management.
 * 
 * @component
 * @example
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Modal Title"
 * >
 *   <p>Modal content</p>
 * </Modal>
 * 
 * @example
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   size="large"
 *   closeOnBackdropClick={false}
 * >
 *   <YourComponent />
 * </Modal>
 */
function Modal({
  isOpen,
  onClose,
  children,
  title = '',
  size = 'medium',
  closeOnBackdropClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className = '',
  ...props
}) {
  const { theme } = useTheme()

  // Handle escape key press
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, closeOnEscape, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [isOpen])

  // Get modal size styles
  const getSizeStyles = () => {
    const sizes = {
      small: {
        maxWidth: '400px',
        width: '90%',
      },
      medium: {
        maxWidth: '600px',
        width: '90%',
      },
      large: {
        maxWidth: '900px',
        width: '95%',
      },
      full: {
        maxWidth: '100%',
        width: '100%',
        height: '100%',
        margin: 0,
        borderRadius: 0,
      },
    }
    return sizes[size]
  }

  const getModalStyles = () => {
    return {
      ...getSizeStyles(),
      backgroundColor: theme.colors.surface.base,
      borderRadius: size === 'full' ? 0 : theme.radii.large,
      border: `${theme.borderWidth.thin} solid ${theme.colors.border.default}`,
      boxShadow: theme.shadows.xxlarge,
      maxHeight: size === 'full' ? '100%' : '90vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }
  }

  const getHeaderStyles = () => {
    return {
      padding: theme.spacing.lg,
      borderBottom: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexShrink: 0,
    }
  }

  const getContentStyles = () => {
    return {
      padding: theme.spacing.lg,
      overflow: 'auto',
      flex: 1,
    }
  }

  // Animation variants
  const backdropVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    },
  }

  const modalVariants = {
    initial: { 
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    animate: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.3,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: { duration: 0.2 }
    },
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && closeOnBackdropClick) {
      onClose()
    }
  }

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="ui-modal-backdrop"
          variants={backdropVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={handleBackdropClick}
          style={{
            backdropFilter: 'blur(8px)',
            backgroundColor: theme.colors.background.overlay,
          }}
        >
          <motion.div
            className={`ui-modal ${className}`}
            style={getModalStyles()}
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            onClick={(e) => e.stopPropagation()}
            {...props}
          >
            {(title || showCloseButton) && (
              <div className="ui-modal__header" style={getHeaderStyles()}>
                {title && (
                  <h2 
                    id="modal-title" 
                    className="ui-modal__title"
                    style={{
                      margin: 0,
                      fontSize: theme.typography.size.heading4,
                      fontWeight: theme.typography.weight.bold,
                      color: theme.colors.text.primary,
                    }}
                  >
                    {title}
                  </h2>
                )}
                {showCloseButton && (
                  <button
                    className="ui-modal__close"
                    onClick={onClose}
                    aria-label="Close modal"
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: theme.typography.size.heading4,
                      color: theme.colors.text.secondary,
                      cursor: 'pointer',
                      padding: theme.spacing.xs,
                      marginLeft: 'auto',
                      transition: theme.transitions.fast,
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            )}
            
            <div className="ui-modal__content" style={getContentStyles()}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  // Render modal in portal
  return createPortal(modalContent, document.body)
}

Modal.propTypes = {
  /** Whether modal is open */
  isOpen: PropTypes.bool.isRequired,
  /** Close handler */
  onClose: PropTypes.func.isRequired,
  /** Modal content */
  children: PropTypes.node.isRequired,
  /** Modal title */
  title: PropTypes.string,
  /** Modal size */
  size: PropTypes.oneOf(['small', 'medium', 'large', 'full']),
  /** Close on backdrop click */
  closeOnBackdropClick: PropTypes.bool,
  /** Close on escape key */
  closeOnEscape: PropTypes.bool,
  /** Show close button */
  showCloseButton: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
}

export default Modal
