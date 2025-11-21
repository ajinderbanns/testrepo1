/**
 * CompletionModal Component
 * 
 * Celebratory modal displayed when a module is completed.
 * Features confetti-like particle animations and glow effects.
 * 
 * @component
 */

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { useContent } from '../../hooks/useContent'
import Modal from '../ui/Modal'

/**
 * Confetti particle component
 */
function ConfettiParticle({ delay, color, startX, startY }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${startX}%`,
        top: `${startY}%`,
        width: '10px',
        height: '10px',
        backgroundColor: color,
        borderRadius: '50%',
      }}
      initial={{
        opacity: 1,
        scale: 0,
        y: 0,
        x: 0,
      }}
      animate={{
        opacity: [1, 1, 0],
        scale: [0, 1, 0.5],
        y: [0, Math.random() * 200 - 100],
        x: [0, Math.random() * 200 - 100],
        rotate: [0, Math.random() * 360],
      }}
      transition={{
        duration: 2,
        delay: delay,
        ease: 'easeOut',
      }}
    />
  )
}

/**
 * CompletionModal Component
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Callback when modal closes
 * @param {string} props.moduleName - Name of the completed module
 * @param {number} props.moduleId - ID of the completed module
 * @param {number} props.completionPercentage - Overall completion percentage
 * @param {number} props.nextModuleId - ID of the next module (if available)
 */
function CompletionModal({ 
  isOpen, 
  onClose, 
  moduleName = 'Module',
  moduleId,
  completionPercentage = 100,
  nextModuleId = null,
}) {
  const { theme } = useTheme()
  const { getGamificationContent } = useContent()
  const navigate = useNavigate()
  const [showConfetti, setShowConfetti] = useState(false)
  
  // Get content-aware celebration text
  const gamification = getGamificationContent()
  const celebrationText = gamification.celebrations?.moduleComplete

  // Trigger confetti animation when modal opens
  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true)
      // Reset confetti after animation
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleContinue = () => {
    onClose()
    if (nextModuleId) {
      navigate(`/module/${nextModuleId}`)
    } else {
      navigate('/learn')
    }
  }

  const handleBackToDashboard = () => {
    onClose()
    navigate('/learn')
  }

  // Generate confetti particles
  const confettiColors = [
    theme.colors.primary.main,
    theme.colors.secondary.main,
    theme.colors.state.success.main,
    theme.colors.accent.purple,
    theme.colors.accent.cyan,
  ]

  const confettiParticles = showConfetti
    ? Array.from({ length: 30 }, (_, i) => ({
        id: i,
        delay: (i % 10) * 0.1,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        startX: 30 + Math.random() * 40,
        startY: 40 + Math.random() * 20,
      }))
    : []

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="medium"
      closeOnBackdropClick={false}
      closeOnEscape={true}
      showCloseButton={true}
    >
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        padding: theme.spacing.xl,
        textAlign: 'center',
      }}>
        {/* Confetti particles */}
        {confettiParticles.map((particle) => (
          <ConfettiParticle
            key={particle.id}
            delay={particle.delay}
            color={particle.color}
            startX={particle.startX}
            startY={particle.startY}
          />
        ))}

        {/* Glow effect behind icon */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '200px',
            height: '200px',
            background: `radial-gradient(circle, ${theme.colors.primary.main}40 0%, transparent 70%)`,
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />

        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
          style={{
            fontSize: '80px',
            marginBottom: theme.spacing.lg,
            position: 'relative',
            zIndex: 1,
          }}
        >
          🎉
        </motion.div>

        {/* Congratulations text */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            fontSize: theme.typography.size.heading3,
            fontWeight: theme.typography.weight.bold,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.md,
          }}
        >
          {celebrationText?.title || 'Congratulations!'}
        </motion.h2>

        {/* Completion message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            fontSize: theme.typography.size.bodyLarge,
            color: theme.colors.text.secondary,
            marginBottom: theme.spacing.lg,
            lineHeight: '1.6',
          }}
        >
          {celebrationText?.message || `You've completed ${moduleName}!`}
          {nextModuleId && ' Ready to continue to the next module?'}
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{
            display: 'inline-block',
            padding: theme.spacing.md,
            backgroundColor: theme.colors.surface.raised,
            borderRadius: theme.radii.medium,
            marginBottom: theme.spacing.xl,
          }}
        >
          <div style={{
            fontSize: theme.typography.size.heading2,
            fontWeight: theme.typography.weight.bold,
            color: theme.colors.primary.main,
            marginBottom: theme.spacing.xs,
          }}>
            {completionPercentage}%
          </div>
          <div style={{
            fontSize: theme.typography.size.bodySmall,
            color: theme.colors.text.tertiary,
          }}>
            Overall Progress
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          style={{
            display: 'flex',
            gap: theme.spacing.md,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {nextModuleId ? (
            <>
              <button
                onClick={handleContinue}
                style={{
                  padding: `${theme.spacing.md} ${theme.spacing.xl}`,
                  backgroundColor: theme.colors.primary.main,
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: theme.radii.medium,
                  fontSize: theme.typography.size.body,
                  fontWeight: theme.typography.weight.semibold,
                  cursor: 'pointer',
                  transition: theme.transitions.default,
                }}
              >
                Continue to Next Module →
              </button>
              <button
                onClick={handleBackToDashboard}
                style={{
                  padding: `${theme.spacing.md} ${theme.spacing.xl}`,
                  backgroundColor: 'transparent',
                  color: theme.colors.text.secondary,
                  border: `${theme.borderWidth.medium} solid ${theme.colors.border.default}`,
                  borderRadius: theme.radii.medium,
                  fontSize: theme.typography.size.body,
                  fontWeight: theme.typography.weight.medium,
                  cursor: 'pointer',
                  transition: theme.transitions.default,
                }}
              >
                Back to Dashboard
              </button>
            </>
          ) : (
            <button
              onClick={handleBackToDashboard}
              style={{
                padding: `${theme.spacing.md} ${theme.spacing.xl}`,
                backgroundColor: theme.colors.primary.main,
                color: '#ffffff',
                border: 'none',
                borderRadius: theme.radii.medium,
                fontSize: theme.typography.size.body,
                fontWeight: theme.typography.weight.semibold,
                cursor: 'pointer',
                transition: theme.transitions.default,
              }}
            >
              Back to Dashboard
            </button>
          )}
        </motion.div>
      </div>
    </Modal>
  )
}

ConfettiParticle.propTypes = {
  delay: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  startX: PropTypes.number.isRequired,
  startY: PropTypes.number.isRequired,
}

CompletionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  moduleName: PropTypes.string,
  moduleId: PropTypes.number,
  completionPercentage: PropTypes.number,
  nextModuleId: PropTypes.number,
}

export default CompletionModal
