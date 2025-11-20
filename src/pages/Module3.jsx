/**
 * Module3 Page Component
 * 
 * Main page for Module 3: Comprehensive Overview
 * Covers training, inference, architecture, and synthesis with interactive visualizations
 */

import React, { useEffect, useState, useCallback } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { useModuleProgress } from '../hooks/useModuleProgress'
import { useProgress } from '../hooks/useProgress'
import {
  TrainingVisualization,
  InferenceVisualization,
  ArchitectureVisualization,
  SynthesisSection,
  ModuleNavigation,
} from '../components/module3'
import { CompletionModal } from '../components/module1'
import {
  MODULE_3_SECTION_STRUCTURE,
  getSectionByPath,
  getNextSection,
  getPreviousSection,
  isFirstSection,
  isLastSection,
} from '../data/module3Structure'
import '../styles/modules/module3.css'

function Module3() {
  const { theme } = useTheme()
  const { sectionPath } = useParams()
  const navigate = useNavigate()
  const { markSectionComplete, completionPercentage, isSectionCompleted } = useModuleProgress(3)
  const { overallCompletion } = useProgress()
  
  const [showCompletionModal, setShowCompletionModal] = useState(false)
  const [showMobileNav, setShowMobileNav] = useState(false)
  const [navigationDirection, setNavigationDirection] = useState('fade')
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Get current section
  const currentSection = getSectionByPath(sectionPath || 'training')
  const currentPath = currentSection?.path || 'training'

  // Check if module just completed
  useEffect(() => {
    if (completionPercentage === 100 && !showCompletionModal) {
      const timer = setTimeout(() => {
        setShowCompletionModal(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [completionPercentage, showCompletionModal])

  // Navigation handlers
  const handleNextSection = useCallback(() => {
    const nextSection = getNextSection(currentPath)
    if (nextSection) {
      setNavigationDirection('slideRight')
      navigate(`/module/3/${nextSection.path}`)
    }
  }, [currentPath, navigate])

  const handlePreviousSection = useCallback(() => {
    const prevSection = getPreviousSection(currentPath)
    if (prevSection) {
      setNavigationDirection('slideLeft')
      navigate(`/module/3/${prevSection.path}`)
    }
  }, [currentPath, navigate])

  const handleSectionComplete = useCallback(() => {
    if (currentSection) {
      markSectionComplete(currentSection.id)
      // Auto-navigate to next section after a brief delay
      const timer = setTimeout(() => {
        handleNextSection()
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [currentSection, markSectionComplete, handleNextSection])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return
      }

      if (e.key === 'ArrowRight' && !isLastSection(currentPath)) {
        handleNextSection()
      } else if (e.key === 'ArrowLeft' && !isFirstSection(currentPath)) {
        handlePreviousSection()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [currentPath, handleNextSection, handlePreviousSection])

  // Render section content
  const renderSectionContent = () => {
    if (!currentSection) {
      return (
        <div style={{ textAlign: 'center', padding: theme.spacing.xxl }}>
          <h2 style={{ color: theme.colors.text.primary }}>Section not found</h2>
          <p style={{ color: theme.colors.text.secondary }}>
            Please select a section from the navigation.
          </p>
        </div>
      )
    }

    switch (currentSection.path) {
      case 'training':
        return (
          <div>
            <h2 style={{
              fontSize: theme.typography.size.heading2,
              fontWeight: theme.typography.weight.bold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.lg,
              textAlign: 'center',
            }}>
              {currentSection.title}
            </h2>
            <TrainingVisualization />
          </div>
        )

      case 'inference':
        return (
          <div>
            <h2 style={{
              fontSize: theme.typography.size.heading2,
              fontWeight: theme.typography.weight.bold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.lg,
              textAlign: 'center',
            }}>
              {currentSection.title}
            </h2>
            <InferenceVisualization />
          </div>
        )

      case 'architecture':
        return (
          <div>
            <h2 style={{
              fontSize: theme.typography.size.heading2,
              fontWeight: theme.typography.weight.bold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.lg,
              textAlign: 'center',
            }}>
              {currentSection.title}
            </h2>
            <ArchitectureVisualization />
          </div>
        )

      case 'synthesis':
        return <SynthesisSection />

      default:
        return null
    }
  }

  // Main layout styles
  const pageContainerStyle = {
    minHeight: '100vh',
    backgroundColor: theme.colors.background.primary,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xxxl,
  }

  const contentWrapperStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: `0 ${theme.spacing.lg}`,
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '280px 1fr',
    gap: theme.spacing.xl,
    alignItems: 'start',
  }

  const mainContentStyle = {
    backgroundColor: theme.colors.surface.base,
    borderRadius: theme.radii.large,
    padding: isMobile ? theme.spacing.lg : theme.spacing.xxl,
    boxShadow: theme.shadows.medium,
    minHeight: '600px',
  }

  const navigationButtonsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing.xxl,
    paddingTop: theme.spacing.xl,
    borderTop: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`,
    gap: theme.spacing.md,
    flexWrap: 'wrap',
  }

  const buttonStyle = (variant = 'primary') => ({
    padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
    backgroundColor: variant === 'primary' 
      ? theme.colors.primary.main 
      : 'transparent',
    color: variant === 'primary' 
      ? theme.colors.primary.contrast 
      : theme.colors.text.primary,
    border: variant === 'primary' 
      ? 'none' 
      : `${theme.borderWidth.thin} solid ${theme.colors.border.default}`,
    borderRadius: theme.radii.medium,
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.semibold,
    cursor: 'pointer',
    transition: theme.transitions.default,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
  })

  return (
    <div style={pageContainerStyle}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPath}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={contentWrapperStyle}
        >
          {/* Sidebar Navigation - Desktop */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              style={{ position: 'sticky', top: theme.spacing.xl }}
            >
              <ModuleNavigation 
                currentPath={currentPath}
                onSectionChange={(section) => {
                  console.log('Section changed:', section)
                }}
              />
            </motion.div>
          )}

          {/* Main Content */}
          <div>
            {/* Mobile Navigation Toggle */}
            {isMobile && (
              <motion.button
                onClick={() => setShowMobileNav(!showMobileNav)}
                style={{
                  ...buttonStyle('secondary'),
                  marginBottom: theme.spacing.md,
                  width: '100%',
                  justifyContent: 'center',
                }}
                whileTap={{ scale: 0.98 }}
              >
                {showMobileNav ? '✕ Hide' : '☰ Show'} Navigation
              </motion.button>
            )}

            {/* Mobile Navigation Drawer */}
            {isMobile && showMobileNav && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ marginBottom: theme.spacing.md }}
              >
                <ModuleNavigation 
                  currentPath={currentPath}
                  onSectionChange={(section) => {
                    setShowMobileNav(false)
                  }}
                />
              </motion.div>
            )}

            {/* Section Content */}
            <motion.div
              key={currentPath}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
              style={mainContentStyle}
            >
              {renderSectionContent()}

              {/* Section Navigation Buttons */}
              <div style={navigationButtonsStyle}>
                {/* Previous Button */}
                <div>
                  {!isFirstSection(currentPath) && (
                    <motion.button
                      onClick={handlePreviousSection}
                      style={buttonStyle('secondary')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>←</span>
                      <span>Previous</span>
                    </motion.button>
                  )}
                </div>

                {/* Next/Complete Button */}
                <div style={{ marginLeft: 'auto' }}>
                  {!isLastSection(currentPath) ? (
                    <motion.button
                      onClick={() => {
                        if (!isSectionCompleted(currentSection.id)) {
                          markSectionComplete(currentSection.id)
                        }
                        handleNextSection()
                      }}
                      style={buttonStyle('primary')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Continue</span>
                      <span>→</span>
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={() => {
                        if (!isSectionCompleted(currentSection.id)) {
                          markSectionComplete(currentSection.id)
                        }
                      }}
                      style={buttonStyle('primary')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>✓ Complete Module</span>
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Completion Modal */}
      {showCompletionModal && (
        <CompletionModal
          isOpen={showCompletionModal}
          onClose={() => setShowCompletionModal(false)}
          moduleNumber={3}
          moduleTitle="Comprehensive Overview"
          onContinue={() => {
            setShowCompletionModal(false)
            navigate('/learn')
          }}
        />
      )}
    </div>
  )
}

export default Module3
