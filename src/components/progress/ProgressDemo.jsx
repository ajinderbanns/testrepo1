import React, { useState, useEffect } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { ProgressBar, CircularProgress, ModuleStatus, MilestoneAnimation } from './index'

/**
 * Progress Components Demo Page
 * 
 * Interactive demonstration of all progress visualization components.
 * Shows various states, animations, and theme integration.
 * 
 * Usage: Import and render this component to test progress components
 * Example: <ProgressDemo />
 */
function ProgressDemo() {
  const { theme, themeName, switchTheme } = useTheme()
  
  // State for interactive demos
  const [linearProgress, setLinearProgress] = useState(65)
  const [circularProgress, setCircularProgress] = useState(75)
  const [moduleStatus, setModuleStatus] = useState('in-progress')
  const [showMilestone, setShowMilestone] = useState(false)
  const [milestoneType, setMilestoneType] = useState('success')

  // Auto-increment demo
  const [autoProgress, setAutoProgress] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setAutoProgress((prev) => (prev >= 100 ? 0 : prev + 1))
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const containerStyle = {
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background.primary,
    minHeight: '100vh',
    color: theme.colors.text.primary,
    fontFamily: theme.typography.family.primary,
  }

  const sectionStyle = {
    marginBottom: theme.spacing.xxxl,
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.surface.base,
    borderRadius: theme.radii.large,
    boxShadow: theme.shadows.medium,
  }

  const titleStyle = {
    fontSize: theme.typography.size.heading2,
    fontWeight: theme.typography.weight.bold,
    marginBottom: theme.spacing.lg,
    color: theme.colors.text.primary,
  }

  const subtitleStyle = {
    fontSize: theme.typography.size.heading4,
    fontWeight: theme.typography.weight.semibold,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.lg,
    color: theme.colors.text.secondary,
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  }

  const flexStyle = {
    display: 'flex',
    gap: theme.spacing.md,
    flexWrap: 'wrap',
    alignItems: 'center',
  }

  const controlStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.radii.medium,
    marginBottom: theme.spacing.lg,
  }

  const buttonStyle = {
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    borderRadius: theme.radii.medium,
    border: 'none',
    backgroundColor: theme.colors.primary.main,
    color: theme.colors.primary.contrast,
    fontSize: theme.typography.size.bodySmall,
    fontWeight: theme.typography.weight.semibold,
    cursor: 'pointer',
    transition: theme.transitions.fast,
    fontFamily: theme.typography.family.primary,
  }

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: theme.spacing.xxl }}>
        <h1 style={{ 
          fontSize: theme.typography.size.heading1, 
          fontWeight: theme.typography.weight.bold,
          marginBottom: theme.spacing.md 
        }}>
          Progress Components Demo
        </h1>
        <p style={{ color: theme.colors.text.secondary, marginBottom: theme.spacing.lg }}>
          Current Theme: <strong>{themeName}</strong>
        </p>
        <div style={{ ...flexStyle, justifyContent: 'center' }}>
          <button
            style={{
              ...buttonStyle,
              opacity: themeName === 'male' ? 0.5 : 1,
            }}
            onClick={() => switchTheme('male')}
            disabled={themeName === 'male'}
          >
            Male Theme (Euphoria)
          </button>
          <button
            style={{
              ...buttonStyle,
              opacity: themeName === 'female' ? 0.5 : 1,
            }}
            onClick={() => switchTheme('female')}
            disabled={themeName === 'female'}
          >
            Female Theme (Summer)
          </button>
        </div>
      </div>

      {/* ProgressBar Section */}
      <section style={sectionStyle}>
        <h2 style={titleStyle}>ProgressBar Component</h2>
        <p style={{ color: theme.colors.text.secondary, marginBottom: theme.spacing.lg }}>
          Linear progress bar with smooth animated fill and number counting animation.
        </p>

        <div style={controlStyle}>
          <label style={{ fontWeight: theme.typography.weight.semibold }}>
            Progress: {linearProgress}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={linearProgress}
            onChange={(e) => setLinearProgress(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <h3 style={subtitleStyle}>Sizes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.lg }}>
          <div>
            <p style={{ fontSize: theme.typography.size.bodySmall, marginBottom: theme.spacing.xs }}>Small</p>
            <ProgressBar value={linearProgress} size="small" showLabel />
          </div>
          <div>
            <p style={{ fontSize: theme.typography.size.bodySmall, marginBottom: theme.spacing.xs }}>Medium (Default)</p>
            <ProgressBar value={linearProgress} size="medium" showLabel />
          </div>
          <div>
            <p style={{ fontSize: theme.typography.size.bodySmall, marginBottom: theme.spacing.xs }}>Large</p>
            <ProgressBar value={linearProgress} size="large" showLabel />
          </div>
        </div>

        <h3 style={subtitleStyle}>Colors</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.lg }}>
          <div>
            <p style={{ fontSize: theme.typography.size.bodySmall, marginBottom: theme.spacing.xs }}>Primary</p>
            <ProgressBar value={linearProgress} color="primary" showLabel />
          </div>
          <div>
            <p style={{ fontSize: theme.typography.size.bodySmall, marginBottom: theme.spacing.xs }}>Secondary</p>
            <ProgressBar value={linearProgress} color="secondary" showLabel />
          </div>
          <div>
            <p style={{ fontSize: theme.typography.size.bodySmall, marginBottom: theme.spacing.xs }}>Success</p>
            <ProgressBar value={linearProgress} color="success" showLabel />
          </div>
          <div>
            <p style={{ fontSize: theme.typography.size.bodySmall, marginBottom: theme.spacing.xs }}>Warning</p>
            <ProgressBar value={linearProgress} color="warning" showLabel />
          </div>
          <div>
            <p style={{ fontSize: theme.typography.size.bodySmall, marginBottom: theme.spacing.xs }}>Error</p>
            <ProgressBar value={linearProgress} color="error" showLabel />
          </div>
        </div>

        <h3 style={subtitleStyle}>Auto-Incrementing (Animation Test)</h3>
        <ProgressBar value={autoProgress} showLabel animated />
      </section>

      {/* CircularProgress Section */}
      <section style={sectionStyle}>
        <h2 style={titleStyle}>CircularProgress Component</h2>
        <p style={{ color: theme.colors.text.secondary, marginBottom: theme.spacing.lg }}>
          Ring-style progress indicator with animated SVG stroke and number counting.
        </p>

        <div style={controlStyle}>
          <label style={{ fontWeight: theme.typography.weight.semibold }}>
            Progress: {circularProgress}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={circularProgress}
            onChange={(e) => setCircularProgress(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <h3 style={subtitleStyle}>Sizes & Colors</h3>
        <div style={gridStyle}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: theme.typography.size.bodySmall, marginBottom: theme.spacing.md }}>Small - Primary</p>
            <CircularProgress value={circularProgress} size={80} color="primary" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: theme.typography.size.bodySmall, marginBottom: theme.spacing.md }}>Medium - Success</p>
            <CircularProgress value={circularProgress} size={120} color="success" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: theme.typography.size.bodySmall, marginBottom: theme.spacing.md }}>Large - Accent</p>
            <CircularProgress value={circularProgress} size={160} color="accent" strokeWidth={12} />
          </div>
        </div>

        <h3 style={subtitleStyle}>With Labels</h3>
        <div style={flexStyle}>
          <CircularProgress 
            value={circularProgress} 
            size={140} 
            label="Module 1" 
            color="primary"
          />
          <CircularProgress 
            value={100} 
            size={140} 
            label="Completed" 
            color="success"
          />
          <CircularProgress 
            value={0} 
            size={140} 
            label="Not Started" 
            color="error"
          />
        </div>
      </section>

      {/* ModuleStatus Section */}
      <section style={sectionStyle}>
        <h2 style={titleStyle}>ModuleStatus Component</h2>
        <p style={{ color: theme.colors.text.secondary, marginBottom: theme.spacing.lg }}>
          Status badge with 3 states and smooth transition animations.
        </p>

        <div style={controlStyle}>
          <label style={{ fontWeight: theme.typography.weight.semibold }}>Current Status:</label>
          <div style={flexStyle}>
            <button
              style={{
                ...buttonStyle,
                backgroundColor: moduleStatus === 'locked' ? theme.colors.primary.main : theme.colors.surface.raised,
                color: moduleStatus === 'locked' ? theme.colors.primary.contrast : theme.colors.text.primary,
              }}
              onClick={() => setModuleStatus('locked')}
            >
              Locked
            </button>
            <button
              style={{
                ...buttonStyle,
                backgroundColor: moduleStatus === 'in-progress' ? theme.colors.primary.main : theme.colors.surface.raised,
                color: moduleStatus === 'in-progress' ? theme.colors.primary.contrast : theme.colors.text.primary,
              }}
              onClick={() => setModuleStatus('in-progress')}
            >
              In Progress
            </button>
            <button
              style={{
                ...buttonStyle,
                backgroundColor: moduleStatus === 'completed' ? theme.colors.primary.main : theme.colors.surface.raised,
                color: moduleStatus === 'completed' ? theme.colors.primary.contrast : theme.colors.text.primary,
              }}
              onClick={() => setModuleStatus('completed')}
            >
              Completed
            </button>
          </div>
        </div>

        <h3 style={subtitleStyle}>Current State</h3>
        <div style={{ ...flexStyle, marginBottom: theme.spacing.xl }}>
          <ModuleStatus status={moduleStatus} size="large" />
        </div>

        <h3 style={subtitleStyle}>All States</h3>
        <div style={flexStyle}>
          <ModuleStatus status="locked" />
          <ModuleStatus status="in-progress" />
          <ModuleStatus status="completed" />
        </div>

        <h3 style={subtitleStyle}>Sizes</h3>
        <div style={flexStyle}>
          <ModuleStatus status="completed" size="small" />
          <ModuleStatus status="in-progress" size="medium" />
          <ModuleStatus status="locked" size="large" />
        </div>

        <h3 style={subtitleStyle}>Custom Labels</h3>
        <div style={flexStyle}>
          <ModuleStatus status="completed" label="Module 1" />
          <ModuleStatus status="in-progress" label="Module 2" />
          <ModuleStatus status="locked" label="Module 3" />
        </div>

        <h3 style={subtitleStyle}>Without Icons</h3>
        <div style={flexStyle}>
          <ModuleStatus status="completed" showIcon={false} />
          <ModuleStatus status="in-progress" showIcon={false} />
          <ModuleStatus status="locked" showIcon={false} />
        </div>
      </section>

      {/* MilestoneAnimation Section */}
      <section style={sectionStyle}>
        <h2 style={titleStyle}>MilestoneAnimation Component</h2>
        <p style={{ color: theme.colors.text.secondary, marginBottom: theme.spacing.lg }}>
          Celebration component for achievements with scale, glow, and confetti effects.
        </p>

        <div style={controlStyle}>
          <label style={{ fontWeight: theme.typography.weight.semibold }}>Animation Type:</label>
          <div style={flexStyle}>
            <button
              style={buttonStyle}
              onClick={() => {
                setMilestoneType('success')
                setShowMilestone(true)
              }}
            >
              Success
            </button>
            <button
              style={buttonStyle}
              onClick={() => {
                setMilestoneType('achievement')
                setShowMilestone(true)
              }}
            >
              Achievement
            </button>
            <button
              style={buttonStyle}
              onClick={() => {
                setMilestoneType('milestone')
                setShowMilestone(true)
              }}
            >
              Milestone
            </button>
            <button
              style={buttonStyle}
              onClick={() => {
                setMilestoneType('levelUp')
                setShowMilestone(true)
              }}
            >
              Level Up
            </button>
          </div>
        </div>

        <p style={{ 
          color: theme.colors.text.secondary, 
          fontSize: theme.typography.size.bodySmall,
          fontStyle: 'italic' 
        }}>
          Click any button above to trigger the celebration animation!
        </p>
      </section>

      {/* Milestone Animation */}
      <MilestoneAnimation
        show={showMilestone}
        type={milestoneType}
        title={
          milestoneType === 'success' ? 'Module Completed!' :
          milestoneType === 'achievement' ? 'Achievement Unlocked!' :
          milestoneType === 'milestone' ? 'Milestone Reached!' :
          'Level Up!'
        }
        message={
          milestoneType === 'success' ? 'Great job completing this module!' :
          milestoneType === 'achievement' ? 'You\'ve earned a new achievement!' :
          milestoneType === 'milestone' ? 'You\'ve reached an important milestone!' :
          'Congratulations on leveling up!'
        }
        icon={
          milestoneType === 'success' ? '🎉' :
          milestoneType === 'achievement' ? '🏆' :
          milestoneType === 'milestone' ? '⭐' :
          '🚀'
        }
        duration={3000}
        onComplete={() => setShowMilestone(false)}
      />

      {/* Integration Example */}
      <section style={sectionStyle}>
        <h2 style={titleStyle}>Integration Example</h2>
        <p style={{ color: theme.colors.text.secondary, marginBottom: theme.spacing.lg }}>
          Example of how components work together in a real module progress display.
        </p>

        <div style={{
          padding: theme.spacing.lg,
          backgroundColor: theme.colors.background.secondary,
          borderRadius: theme.radii.medium,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: theme.spacing.lg }}>
            <div>
              <h3 style={{ fontSize: theme.typography.size.heading4, marginBottom: theme.spacing.xs }}>
                Module 1: Introduction to LLMs
              </h3>
              <ModuleStatus status="completed" size="small" />
            </div>
            <CircularProgress value={100} size={80} color="success" />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: theme.spacing.lg }}>
            <div>
              <h3 style={{ fontSize: theme.typography.size.heading4, marginBottom: theme.spacing.xs }}>
                Module 2: How LLMs Work
              </h3>
              <ModuleStatus status="in-progress" size="small" />
            </div>
            <CircularProgress value={65} size={80} color="primary" />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: theme.typography.size.heading4, marginBottom: theme.spacing.xs }}>
                Module 3: Advanced Topics
              </h3>
              <ModuleStatus status="locked" size="small" />
            </div>
            <CircularProgress value={0} size={80} color="secondary" />
          </div>

          <div style={{ marginTop: theme.spacing.xl }}>
            <p style={{ 
              fontSize: theme.typography.size.bodySmall, 
              color: theme.colors.text.secondary,
              marginBottom: theme.spacing.xs 
            }}>
              Overall Progress
            </p>
            <ProgressBar value={55} color="primary" showLabel size="large" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProgressDemo
