/**
 * WalkthroughOverlay Component
 * 
 * Full-screen overlay component for the interactive walkthrough tutorial.
 * Features backdrop, step content, navigation controls, and progress indicator.
 * 
 * @component
 */

import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import WalkthroughStep from './WalkthroughStep'
import WalkthroughProgress from './WalkthroughProgress'
import { getStepByIndex } from '../../data/walkthroughContent'

/**
 * WalkthroughOverlay Component
 * 
 * Displays the walkthrough as a modal overlay with step navigation.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the overlay is visible
 * @param {number} props.currentStep - Current step index (0-based)
 * @param {number} props.totalSteps - Total number of steps
 * @param {Function} props.onNext - Callback for next button
 * @param {Function} props.onPrevious - Callback for previous button
 * @param {Function} props.onSkip - Callback for skip button
 * @param {Function} props.onClose - Callback for close button
 * @param {Function} [props.onStepClick] - Optional callback for clicking progress dots
 */
function WalkthroughOverlay({
  isOpen,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onSkip,
  onClose,
  onStepClick,
}) {
  const { theme } = useTheme()

  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onSkip()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onSkip])

  // Get current step data
  const step = getStepByIndex(currentStep)
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === totalSteps - 1

  // Styles
  const backdropStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    backdropFilter: 'blur(8px)',
    zIndex: 10000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.md,
  }

  const overlayStyles = {
    backgroundColor: theme.colors.surface.base,
    borderRadius: theme.radii.large,
    boxShadow: theme.shadows.xxlarge,
    maxWidth: '800px',
    width: '100%',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
  }

  const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottom: `1px solid ${theme.colors.border.light}`,
    flexShrink: 0,
  }

  const titleStyles = {
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text.secondary,
    margin: 0,
  }

  const closeButtonStyles = {
    background: 'none',
    border: 'none',
    fontSize: theme.typography.size.heading3,
    color: theme.colors.text.secondary,
    cursor: 'pointer',
    padding: theme.spacing.xs,
    lineHeight: 1,
    transition: theme.transitions.fast,
    borderRadius: theme.radii.small,
  }

  const contentStyles = {
    flex: 1,
    overflow: 'auto',
    padding: theme.spacing.lg,
  }

  const footerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderTop: `1px solid ${theme.colors.border.light}`,
    flexShrink: 0,
    gap: theme.spacing.md,
    flexWrap: 'wrap',
  }

  const buttonStyles = {
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    borderRadius: theme.radii.medium,
    border: 'none',
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.semibold,
    cursor: 'pointer',
    transition: theme.transitions.fast,
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
    whiteSpace: 'nowrap',
  }

  const primaryButtonStyles = {
    ...buttonStyles,
    backgroundColor: theme.colors.primary.main,
    color: theme.colors.primary.contrast,
  }

  const secondaryButtonStyles = {
    ...buttonStyles,
    backgroundColor: 'transparent',
    color: theme.colors.text.secondary,
    border: `1px solid ${theme.colors.border.default}`,
  }

  const skipButtonStyles = {
    ...buttonStyles,
    backgroundColor: 'transparent',
    color: theme.colors.text.tertiary,
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
  }

  // Animation variants
  const backdropVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    },
  }

  const overlayVariants = {
    initial: { 
      opacity: 0,
      scale: 0.9,
      y: 20,
    },
    animate: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.4,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: { duration: 0.3 }
    },
  }

  const overlayContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          style={backdropStyles}
          variants={backdropVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={(e) => {
            // Don't close on backdrop click - use skip button
            e.stopPropagation()
          }}
        >
          <motion.div
            style={overlayStyles}
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="walkthrough-title"
          >
            {/* Header */}
            <div style={headerStyles}>
              <h2 id="walkthrough-title" style={titleStyles}>
                Interactive Tutorial
              </h2>
              <button
                style={closeButtonStyles}
                onClick={onSkip}
                aria-label="Close tutorial"
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = theme.colors.surface.raised
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent'
                }}
              >
                ×
              </button>
            </div>

            {/* Content - Step */}
            <div style={contentStyles}>
              <AnimatePresence mode="wait">
                {step && (
                  <WalkthroughStep 
                    key={currentStep} 
                    step={step}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Footer - Navigation */}
            <div style={footerStyles}>
              {/* Skip button */}
              <button
                style={skipButtonStyles}
                onClick={onSkip}
                onMouseEnter={(e) => {
                  e.target.style.color = theme.colors.text.secondary
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = theme.colors.text.tertiary
                }}
              >
                Skip Tutorial
              </button>

              {/* Progress Indicator */}
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <WalkthroughProgress
                  currentStep={currentStep}
                  totalSteps={totalSteps}
                  onDotClick={onStepClick}
                />
              </div>

              {/* Navigation Buttons */}
              <div style={{ display: 'flex', gap: theme.spacing.sm }}>
                {/* Previous Button */}
                {!isFirstStep && (
                  <button
                    style={secondaryButtonStyles}
                    onClick={onPrevious}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = theme.colors.surface.raised
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent'
                    }}
                  >
                    ← Previous
                  </button>
                )}

                {/* Next/Finish Button */}
                <button
                  style={primaryButtonStyles}
                  onClick={onNext}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = theme.colors.primary.dark
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = theme.colors.primary.main
                  }}
                >
                  {isLastStep ? "Let's Go! 🚀" : 'Next →'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  // Render overlay in portal
  return createPortal(overlayContent, document.body)
}

WalkthroughOverlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onSkip: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onStepClick: PropTypes.func,
}

WalkthroughOverlay.defaultProps = {
  onStepClick: null,
}

export default WalkthroughOverlay
