/**
 * WalkthroughStep Component
 * 
 * Displays individual walkthrough step content with icon, title, description, and features.
 * Includes animations for smooth transitions between steps.
 * 
 * @component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'

/**
 * WalkthroughStep Component
 * 
 * Renders a single step of the walkthrough with animated content.
 * 
 * @param {Object} props
 * @param {Object} props.step - Step data object
 * @param {string} props.step.icon - Emoji or icon for the step
 * @param {string} props.step.title - Step title
 * @param {string} props.step.content - Step description/content
 * @param {Array<string>} [props.step.features] - Optional list of features
 * @param {string} [props.step.animation] - Animation type
 */
function WalkthroughStep({ step }) {
  const { theme } = useTheme()

  if (!step) {
    return null
  }

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: theme.spacing.xl,
    maxWidth: '600px',
    margin: '0 auto',
  }

  const iconStyles = {
    fontSize: '4rem',
    marginBottom: theme.spacing.lg,
    lineHeight: 1,
  }

  const titleStyles = {
    fontSize: theme.typography.size.heading2,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
    lineHeight: theme.typography.lineHeight.tight,
  }

  const contentStyles = {
    fontSize: theme.typography.size.body,
    lineHeight: theme.typography.lineHeight.relaxed,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.lg,
  }

  const featuresContainerStyles = {
    width: '100%',
    marginTop: theme.spacing.lg,
  }

  const featureItemStyles = {
    display: 'flex',
    alignItems: 'flex-start',
    textAlign: 'left',
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.surface.raised,
    borderRadius: theme.radii.medium,
    fontSize: theme.typography.size.small,
    color: theme.colors.text.secondary,
    transition: theme.transitions.fast,
  }

  // Animation variants based on step animation type
  const getAnimationVariants = () => {
    const baseVariants = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    }

    switch (step.animation) {
      case 'slide-up':
        return {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          exit: { opacity: 0, y: -30, transition: { duration: 0.3 } },
        }
      case 'slide-left':
        return {
          initial: { opacity: 0, x: 30 },
          animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
          exit: { opacity: 0, x: -30, transition: { duration: 0.3 } },
        }
      case 'slide-right':
        return {
          initial: { opacity: 0, x: -30 },
          animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
          exit: { opacity: 0, x: 30, transition: { duration: 0.3 } },
        }
      case 'zoom-in':
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
          exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
        }
      case 'pulse':
        return {
          initial: { opacity: 0, scale: 1 },
          animate: { 
            opacity: 1, 
            scale: [1, 1.05, 1],
            transition: { duration: 0.6, times: [0, 0.5, 1] }
          },
          exit: { opacity: 0, transition: { duration: 0.3 } },
        }
      case 'bounce':
        return {
          initial: { opacity: 0, y: -20 },
          animate: { 
            opacity: 1, 
            y: [0, -10, 0],
            transition: { duration: 0.6, times: [0, 0.5, 1] }
          },
          exit: { opacity: 0, transition: { duration: 0.3 } },
        }
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: { duration: 0.5 } },
          exit: { opacity: 0, transition: { duration: 0.3 } },
        }
    }
  }

  const iconVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: 'spring',
        stiffness: 200,
        damping: 20,
        delay: 0.1
      }
    },
  }

  const featureVariants = {
    initial: { opacity: 0, x: -10 },
    animate: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.3,
      },
    }),
  }

  return (
    <motion.div
      style={containerStyles}
      variants={getAnimationVariants()}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Icon */}
      {step.icon && (
        <motion.div
          style={iconStyles}
          variants={iconVariants}
          initial="initial"
          animate="animate"
        >
          {step.icon}
        </motion.div>
      )}

      {/* Title */}
      <motion.h2
        style={titleStyles}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {step.title}
      </motion.h2>

      {/* Content */}
      <motion.p
        style={contentStyles}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        {step.content}
      </motion.p>

      {/* Features List */}
      {step.features && step.features.length > 0 && (
        <motion.div 
          style={featuresContainerStyles}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          {step.features.map((feature, index) => (
            <motion.div
              key={index}
              style={featureItemStyles}
              variants={featureVariants}
              custom={index}
              initial="initial"
              animate="animate"
              whileHover={{
                backgroundColor: theme.colors.surface.overlay,
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              {feature}
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

WalkthroughStep.propTypes = {
  step: PropTypes.shape({
    id: PropTypes.string.isRequired,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    animation: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string),
    highlights: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
}

export default WalkthroughStep
