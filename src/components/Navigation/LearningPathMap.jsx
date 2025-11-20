/**
 * LearningPathMap Component
 * 
 * Visual journey map showing all modules in sequence with:
 * - Visual path/flow connecting modules
 * - Status indicators for each module
 * - Progress visualization
 * - Interactive module cards
 * - Locked/unlocked states
 * - Responsive design (horizontal scroll on mobile)
 * - Animated transitions
 * 
 * @component
 */

import React from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { useTheme } from '../../hooks/useTheme'
import { useNavigation } from '../../hooks/useNavigation'
import ModuleCard from './ModuleCard'
import { useProgress } from '../../hooks/useProgress'
import './LearningPathMap.css'

function LearningPathMap({ className = '', variant = 'vertical' }) {
  const { theme } = useTheme()
  const { navigationItems, navigateToModule } = useNavigation()
  const { progress } = useProgress()

  const isVertical = variant === 'vertical'

  // Animation variants for staggered appearance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: isVertical ? 20 : 0,
      x: isVertical ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1, ease: 'easeInOut' },
        opacity: { duration: 0.5 },
      },
    },
  }

  return (
    <motion.div
      className={`learning-path-map learning-path-map--${variant} ${className}`}
      style={styles.container(theme, isVertical)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Progress Overview */}
      <div style={styles.overview(theme)}>
        <h2 style={styles.overviewTitle(theme)}>Your Learning Journey</h2>
        <p style={styles.overviewDescription(theme)}>
          Follow the path to master Large Language Models
        </p>
      </div>

      {/* Module Path */}
      <div className="learning-path-map__path" style={styles.path(isVertical)}>
        {navigationItems.map((item, index) => {
          const isLastItem = index === navigationItems.length - 1

          return (
            <React.Fragment key={item.id}>
              {/* Module Card */}
              <motion.div
                className="learning-path-map__module"
                style={styles.moduleWrapper}
                variants={itemVariants}
              >
                <ModuleCard
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  status={item.isCompleted ? 'completed' : item.isInProgress ? 'in-progress' : 'locked'}
                  completionPercentage={item.completionPercentage}
                  estimatedMinutes={calculateEstimatedTime(item.id)}
                  isLocked={item.isLocked}
                  progress={progress}
                  onClick={() => !item.isLocked && navigateToModule(item.id)}
                />
              </motion.div>

              {/* Connector Line/Arrow */}
              {!isLastItem && (
                <motion.div
                  className="learning-path-map__connector"
                  style={styles.connector(theme, isVertical)}
                  variants={itemVariants}
                >
                  <svg
                    width={isVertical ? '60' : '100'}
                    height={isVertical ? '60' : '60'}
                    viewBox={isVertical ? '0 0 60 60' : '0 0 100 60'}
                    style={styles.connectorSvg}
                  >
                    {isVertical ? (
                      // Vertical connector
                      <>
                        <motion.path
                          d="M 30 0 L 30 60"
                          stroke={theme.colors.border.default}
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="5,5"
                          variants={pathVariants}
                        />
                        <motion.circle
                          cx="30"
                          cy="50"
                          r="4"
                          fill={navigationItems[index + 1]?.isLocked ? theme.colors.text.disabled : theme.colors.primary.main}
                          variants={itemVariants}
                        />
                      </>
                    ) : (
                      // Horizontal connector
                      <>
                        <motion.path
                          d="M 0 30 L 100 30"
                          stroke={theme.colors.border.default}
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="5,5"
                          variants={pathVariants}
                        />
                        <motion.circle
                          cx="90"
                          cy="30"
                          r="4"
                          fill={navigationItems[index + 1]?.isLocked ? theme.colors.text.disabled : theme.colors.primary.main}
                          variants={itemVariants}
                        />
                      </>
                    )}
                  </svg>
                </motion.div>
              )}
            </React.Fragment>
          )
        })}
      </div>

      {/* Completion Badge */}
      {navigationItems.every(item => item.isCompleted) && (
        <motion.div
          style={styles.completionBadge(theme)}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span style={styles.completionText(theme)}>All Modules Complete!</span>
        </motion.div>
      )}
    </motion.div>
  )
}

LearningPathMap.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['vertical', 'horizontal']),
}

// Helper function to calculate estimated time
const calculateEstimatedTime = (moduleId) => {
  const times = {
    1: 36, // Module 1: ~36 minutes
    2: 89, // Module 2: ~89 minutes
    3: 106, // Module 3: ~106 minutes
  }
  return times[moduleId] || 0
}

// Styles
const styles = {
  container: (theme, isVertical) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xl,
    padding: theme.spacing.lg,
    fontFamily: theme.typography.family.primary,
  }),

  overview: (theme) => ({
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  }),

  overviewTitle: (theme) => ({
    margin: 0,
    marginBottom: theme.spacing.sm,
    fontSize: theme.typography.size.h4,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text.primary,
  }),

  overviewDescription: (theme) => ({
    margin: 0,
    fontSize: theme.typography.size.body,
    color: theme.colors.text.secondary,
  }),

  path: (isVertical) => ({
    display: 'flex',
    flexDirection: isVertical ? 'column' : 'row',
    alignItems: 'center',
    gap: 0,
    width: '100%',
    maxWidth: isVertical ? '800px' : '100%',
    margin: '0 auto',
    overflowX: isVertical ? 'visible' : 'auto',
    overflowY: 'visible',
    padding: '20px 0',
  }),

  moduleWrapper: {
    width: '100%',
    maxWidth: '600px',
    flexShrink: 0,
  },

  connector: (theme, isVertical) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    margin: isVertical ? `${theme.spacing.sm} 0` : `0 ${theme.spacing.sm}`,
  }),

  connectorSvg: {
    display: 'block',
  },

  completionBadge: (theme) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
    padding: theme.spacing.xl,
    backgroundColor: `${theme.colors.state.success.main}15`,
    border: `2px solid ${theme.colors.state.success.main}`,
    borderRadius: theme.radii.large,
    color: theme.colors.state.success.main,
    marginTop: theme.spacing.xl,
  }),

  completionText: (theme) => ({
    fontSize: theme.typography.size.h6,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.state.success.main,
  }),
}

export default LearningPathMap
