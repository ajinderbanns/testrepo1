/**
 * ContinueLearning Component
 * 
 * Prominent card/button that shows the last visited module/section and allows
 * the user to quickly resume their learning journey. Handles multiple states:
 * - No progress: Show "Start Learning" CTA
 * - In progress: Show "Continue Learning" with module/section info
 * - All complete: Show completion state with optional restart
 * 
 * @component
 */

import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { getResumePoint, getModuleRoute } from '../utils/progressHelpers'
import { MODULE_IDS } from '../constants/modules'
import PropTypes from 'prop-types'

/**
 * ContinueLearning Component
 * 
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {Object} [props.style] - Additional inline styles
 */
function ContinueLearning({ className = '', style = {} }) {
  const navigate = useNavigate()
  const { theme } = useTheme()
  
  // Get resume point information
  const resumePoint = useMemo(() => getResumePoint(), [])

  /**
   * Handle Continue/Start Button Click
   */
  const handleContinue = () => {
    const { status, moduleId, sectionId } = resumePoint
    
    if (status === 'no-progress') {
      // Start from Module 1
      navigate(getModuleRoute(MODULE_IDS.MODULE_1))
    } else if (status === 'in-progress') {
      // Resume at last incomplete section
      navigate(getModuleRoute(moduleId, sectionId))
    } else if (status === 'all-complete') {
      // Go to dashboard/review
      navigate('/learn')
    }
  }

  /**
   * Render Different States
   */
  const renderContent = () => {
    const { status, moduleTitle, sectionTitle, overallProgress, message } = resumePoint

    // State 1: No Progress - Show Start CTA
    if (status === 'no-progress') {
      return (
        <>
          <div style={styles.icon(theme)}>
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
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          <div style={styles.content}>
            <h3 style={styles.title(theme)}>Start Learning</h3>
            <p style={styles.description(theme)}>{message}</p>
            <div style={styles.meta(theme)}>
              <span>Module 1: Introduction to LLMs</span>
            </div>
          </div>
        </>
      )
    }

    // State 2: In Progress - Show Continue with Details
    if (status === 'in-progress') {
      return (
        <>
          <div style={styles.icon(theme)}>
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
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div style={styles.content}>
            <h3 style={styles.title(theme)}>Continue Learning</h3>
            <p style={styles.description(theme)}>{moduleTitle}</p>
            {sectionTitle && (
              <div style={styles.section(theme)}>
                <span>Resume: {sectionTitle}</span>
              </div>
            )}
            <div style={styles.progress}>
              <div style={styles.progressBar(theme)}>
                <motion.div
                  style={styles.progressFill(theme, overallProgress)}
                  initial={{ width: 0 }}
                  animate={{ width: `${overallProgress}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              <span style={styles.progressText(theme)}>{overallProgress}% Complete</span>
            </div>
          </div>
        </>
      )
    }

    // State 3: All Complete - Show Completion
    if (status === 'all-complete') {
      return (
        <>
          <div style={styles.icon(theme)}>
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
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div style={styles.content}>
            <h3 style={styles.title(theme)}>All Complete! 🎉</h3>
            <p style={styles.description(theme)}>{message}</p>
            <div style={styles.meta(theme)}>
              <span>You've mastered all modules</span>
            </div>
          </div>
        </>
      )
    }

    return null
  }

  const { status } = resumePoint

  return (
    <motion.div
      className={`continue-learning-card ${className}`}
      style={{
        ...styles.card(theme),
        ...style,
      }}
      onClick={handleContinue}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleContinue()
        }
      }}
      aria-label={
        status === 'no-progress' 
          ? 'Start learning' 
          : status === 'all-complete' 
          ? 'Review modules' 
          : 'Continue learning'
      }
    >
      {renderContent()}
      
      {/* Arrow Icon */}
      <div style={styles.arrow(theme)}>
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
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </motion.div>
  )
}

// Styles
const styles = {
  card: (theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.lg,
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.surface.raised,
    borderRadius: theme.radii.large,
    border: `2px solid ${theme.colors.border.default}`,
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.2s ease',
    boxShadow: theme.shadows.medium,
    fontFamily: theme.typography.family.primary,
  }),

  icon: (theme) => ({
    flexShrink: 0,
    width: '64px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radii.medium,
    backgroundColor: theme.colors.primary.main + '20',
    color: theme.colors.primary.main,
  }),

  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  title: (theme) => ({
    fontSize: theme.typography.size.h3,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text.primary,
    margin: 0,
  }),

  description: (theme) => ({
    fontSize: theme.typography.size.body,
    color: theme.colors.text.secondary,
    margin: 0,
  }),

  section: (theme) => ({
    fontSize: theme.typography.size.bodySmall,
    color: theme.colors.primary.main,
    fontWeight: theme.typography.weight.semibold,
  }),

  meta: (theme) => ({
    fontSize: theme.typography.size.caption,
    color: theme.colors.text.tertiary,
    fontStyle: 'italic',
  }),

  progress: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    marginTop: '8px',
  },

  progressBar: (theme) => ({
    width: '100%',
    height: '8px',
    backgroundColor: theme.colors.surface.default,
    borderRadius: theme.radii.full,
    overflow: 'hidden',
    position: 'relative',
  }),

  progressFill: (theme, progress) => ({
    height: '100%',
    backgroundColor: theme.colors.primary.main,
    borderRadius: theme.radii.full,
    width: `${progress}%`,
  }),

  progressText: (theme) => ({
    fontSize: theme.typography.size.caption,
    color: theme.colors.text.tertiary,
    fontWeight: theme.typography.weight.semibold,
  }),

  arrow: (theme) => ({
    flexShrink: 0,
    color: theme.colors.primary.main,
    opacity: 0.7,
  }),
}

ContinueLearning.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
}

export default ContinueLearning
