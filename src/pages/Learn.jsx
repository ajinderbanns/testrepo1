import React from 'react'
import ContinueLearning from '../components/ContinueLearning'
import ResetProgress from '../components/settings/ResetProgress'
import { LearningPathMap } from '../components/Navigation'
import { WalkthroughOverlay } from '../components/Walkthrough'
import { useWalkthrough } from '../hooks/useWalkthrough'

function Learn() {
  const {
    isVisible,
    currentStep,
    totalSteps,
    showWalkthrough,
    goToNextStep,
    goToPreviousStep,
    skipWalkthrough,
    goToStep,
  } = useWalkthrough({ autoShow: true })

  const [isHelpHovered, setIsHelpHovered] = React.useState(false)

  return (
    <div className="learn-page" style={styles.page}>
      {/* Help Button */}
      <button
        onClick={showWalkthrough}
        style={{
          ...styles.helpButton,
          transform: isHelpHovered ? 'scale(1.1)' : 'scale(1)',
          boxShadow: isHelpHovered
            ? '0 6px 16px rgba(0, 0, 0, 0.2)'
            : '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}
        onMouseEnter={() => setIsHelpHovered(true)}
        onMouseLeave={() => setIsHelpHovered(false)}
        aria-label="Show tutorial"
        title="Show tutorial"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <h1 style={styles.title}>Learning Dashboard</h1>
      <p style={styles.subtitle}>Track your progress and continue your learning journey</p>
      
      {/* Continue Learning Card */}
      <div style={styles.continueSection}>
        <ContinueLearning />
      </div>
      
      {/* Learning Path Map - Visual Journey */}
      <div style={styles.pathSection}>
        <LearningPathMap variant="vertical" />
      </div>

      {/* Settings Section */}
      <div style={styles.settingsSection}>
        <h2 style={styles.sectionTitle}>Settings</h2>
        <ResetProgress />
      </div>

      {/* Walkthrough Overlay */}
      <WalkthroughOverlay
        isOpen={isVisible}
        currentStep={currentStep}
        totalSteps={totalSteps}
        onNext={goToNextStep}
        onPrevious={goToPreviousStep}
        onSkip={skipWalkthrough}
        onClose={skipWalkthrough}
        onStepClick={goToStep}
      />
    </div>
  )
}

// Basic styles
const styles = {
  page: {
    padding: '32px',
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
  },
  helpButton: {
    position: 'fixed',
    top: '24px',
    right: '24px',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.2s ease',
    zIndex: 1000,
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: '32px',
  },
  continueSection: {
    marginBottom: '48px',
  },
  pathSection: {
    marginBottom: '48px',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    marginBottom: '16px',
  },
  settingsSection: {
    marginTop: '48px',
    paddingTop: '32px',
    borderTop: '1px solid #ddd',
  },
}

export default Learn
