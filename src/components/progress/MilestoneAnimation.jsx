import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import { useContent } from '../../hooks/useContent'

/**
 * MilestoneAnimation Component
 * 
 * Celebration component for achievements and milestone completion.
 * Features scale animations, glow effects, and optional confetti-like particles.
 * 
 * @component
 * @example
 * <MilestoneAnimation 
 *   show={true}
 *   title="Module Completed!"
 *   icon="🎉"
 * />
 * 
 * @example
 * <MilestoneAnimation 
 *   show={achievementUnlocked}
 *   type="achievement"
 *   title="First Step!"
 *   message="You've completed your first module"
 *   onComplete={handleAnimationComplete}
 * />
 */
function MilestoneAnimation({
  show = false,
  type = 'success',
  title = null,
  message = null,
  icon = null,
  duration = 3000,
  showConfetti = true,
  onComplete = null,
  className = '',
  style = {},
  ...props
}) {
  const { theme } = useTheme()
  const { getGamificationContent } = useContent()
  const [particles, setParticles] = useState([])
  
  // Get content-aware celebration text
  const gamification = getGamificationContent()
  const celebrations = gamification.celebrations || {}
  
  // Determine which celebration content to use
  const getCelebrationContent = () => {
    const celebrationMap = {
      success: celebrations.sectionComplete,
      achievement: celebrations.moduleComplete,
      milestone: celebrations.moduleComplete,
      levelUp: celebrations.allComplete,
    }
    
    const celebration = celebrationMap[type] || celebrations.sectionComplete || {
      title: 'Achievement Unlocked!',
      message: 'Great work!',
      icon: '🎉',
    }
    
    return {
      title: title || celebration.title,
      message: message || celebration.message,
      icon: icon || celebration.icon,
    }
  }
  
  const celebrationContent = getCelebrationContent()

  // Generate confetti particles
  useEffect(() => {
    if (show && showConfetti) {
      const particleCount = 20
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        rotation: Math.random() * 360,
        delay: Math.random() * 0.3,
        color: getRandomColor(),
        size: Math.random() * 8 + 4,
      }))
      setParticles(newParticles)
    }
  }, [show, showConfetti])

  // Auto-hide after duration
  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        if (onComplete) {
          onComplete()
        }
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [show, duration, onComplete])

  // Get random confetti color
  const getRandomColor = () => {
    const colors = [
      theme.colors.primary.main,
      theme.colors.secondary.main,
      theme.colors.accent.main,
      theme.colors.state.success.main,
      theme.colors.state.warning.main,
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // Get type-specific configuration
  const getTypeConfig = () => {
    const configs = {
      success: {
        bgColor: theme.colors.semantic.successBg,
        borderColor: theme.colors.semantic.successBorder,
        textColor: theme.colors.semantic.successText,
        glowColor: theme.colors.state.success.main,
      },
      achievement: {
        bgColor: `${theme.colors.primary.main}15`,
        borderColor: `${theme.colors.primary.main}30`,
        textColor: theme.colors.primary.main,
        glowColor: theme.colors.primary.main,
      },
      milestone: {
        bgColor: `${theme.colors.accent.main}15`,
        borderColor: `${theme.colors.accent.main}30`,
        textColor: theme.colors.accent.main,
        glowColor: theme.colors.accent.main,
      },
      levelUp: {
        bgColor: `${theme.colors.secondary.main}15`,
        borderColor: `${theme.colors.secondary.main}30`,
        textColor: theme.colors.secondary.main,
        glowColor: theme.colors.secondary.main,
      },
    }
    return configs[type] || configs.success
  }

  const typeConfig = getTypeConfig()

  // Container animation variants
  const containerVariants = {
    hidden: { 
      scale: 0,
      opacity: 0,
      rotate: -180,
    },
    visible: { 
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        mass: 1,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    },
    exit: { 
      scale: 0,
      opacity: 0,
      rotate: 180,
      transition: {
        duration: 0.3,
      }
    },
  }

  // Icon animation variants
  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: [0, 1.3, 1],
      rotate: [0, 0, 360],
      transition: {
        duration: 0.8,
        times: [0, 0.6, 1],
      }
    },
  }

  // Text animation variants
  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }
    },
  }

  // Particle animation variants
  const particleVariants = {
    hidden: { scale: 0, opacity: 0, x: 0, y: 0 },
    visible: (custom) => ({
      scale: [0, 1, 1, 0],
      opacity: [0, 1, 1, 0],
      x: [0, custom.x, custom.x * 1.5, custom.x * 2],
      y: [0, custom.y, custom.y * 1.5, custom.y * 2],
      rotate: [0, custom.rotation, custom.rotation * 2],
      transition: {
        duration: 1.5,
        delay: custom.delay,
        ease: 'easeOut',
      }
    }),
  }

  const cardStyles = {
    position: 'relative',
    padding: `${theme.spacing.xl} ${theme.spacing.xxl}`,
    borderRadius: theme.radii.xlarge,
    backgroundColor: typeConfig.bgColor,
    border: `3px solid ${typeConfig.borderColor}`,
    boxShadow: `0 8px 32px rgba(0, 0, 0, 0.1), 0 0 40px ${typeConfig.glowColor}40`,
    backdropFilter: 'blur(10px)',
    maxWidth: '400px',
    textAlign: 'center',
    overflow: 'visible',
    ...style,
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`milestone-animation ${className}`}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: theme.zIndex.modal,
            pointerEvents: 'none',
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          {...props}
        >
          {/* Glow effect background */}
          <motion.div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '120%',
              height: '120%',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${typeConfig.glowColor}40 0%, transparent 70%)`,
              filter: 'blur(20px)',
              zIndex: -1,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Main card */}
          <motion.div style={cardStyles}>
            {/* Icon */}
            <motion.div
              variants={iconVariants}
              style={{
                fontSize: '4rem',
                marginBottom: theme.spacing.md,
                display: 'inline-block',
              }}
            >
              {celebrationContent.icon}
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={textVariants}
              style={{
                fontSize: theme.typography.size.heading3,
                fontWeight: theme.typography.weight.bold,
                color: typeConfig.textColor,
                marginBottom: message ? theme.spacing.sm : 0,
                fontFamily: theme.typography.family.primary,
              }}
            >
              {celebrationContent.title}
            </motion.h2>

            {/* Message */}
            {celebrationContent.message && (
              <motion.p
                variants={textVariants}
                style={{
                  fontSize: theme.typography.size.body,
                  color: theme.colors.text.secondary,
                  fontFamily: theme.typography.family.primary,
                  margin: 0,
                }}
              >
                {celebrationContent.message}
              </motion.p>
            )}

            {/* Confetti particles */}
            {showConfetti && particles.map((particle) => (
              <motion.div
                key={particle.id}
                custom={particle}
                variants={particleVariants}
                initial="hidden"
                animate="visible"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  backgroundColor: particle.color,
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }}
              />
            ))}
          </motion.div>

          {/* Expanding rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: `2px solid ${typeConfig.glowColor}`,
                pointerEvents: 'none',
              }}
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{
                scale: 2,
                opacity: 0,
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                ease: 'easeOut',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

MilestoneAnimation.propTypes = {
  /** Show/hide the animation */
  show: PropTypes.bool,
  /** Animation type/theme */
  type: PropTypes.oneOf(['success', 'achievement', 'milestone', 'levelUp']),
  /** Main title text */
  title: PropTypes.string,
  /** Optional message/description */
  message: PropTypes.string,
  /** Emoji or icon to display */
  icon: PropTypes.string,
  /** Duration in ms before auto-hiding (0 for manual control) */
  duration: PropTypes.number,
  /** Show confetti particles */
  showConfetti: PropTypes.bool,
  /** Callback when animation completes */
  onComplete: PropTypes.func,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Custom styles */
  style: PropTypes.object,
}

export default MilestoneAnimation
