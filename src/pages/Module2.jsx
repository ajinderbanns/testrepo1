/**
 * Module2 Page Component
 * 
 * Main page for Module 2: Core Mechanics
 * Covers tokenization, attention mechanisms, and embeddings with interactive sections
 */

import React, { useEffect, useState, useCallback } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { useModuleProgress } from '../hooks/useModuleProgress'
import { useProgress } from '../hooks/useProgress'
import {
  TokenizationSection,
  InteractiveTokenizer,
  EmbeddingsSection,
  AttentionSection,
  ModuleNavigation,
  MiniQuiz,
} from '../components/module2'
import { CompletionModal } from '../components/module1'
import {
  MODULE_2_SECTION_STRUCTURE,
  getSectionByPath,
  getNextSection,
  getPreviousSection,
  isFirstSection,
  isLastSection,
} from '../data/module2Structure'
import { quizQuestions } from '../data/module2Content'

function Module2() {
  const { theme } = useTheme()
  const { sectionPath } = useParams()
  const navigate = useNavigate()
  const { markSectionComplete, completionPercentage, isSectionCompleted } = useModuleProgress(2)
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
  const currentSection = getSectionByPath(sectionPath || 'tokenization')
  const currentPath = currentSection?.path || 'tokenization'

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
      navigate(`/module/2/${nextSection.path}`)
    }
  }, [currentPath, navigate])

  const handlePreviousSection = useCallback(() => {
    const prevSection = getPreviousSection(currentPath)
    if (prevSection) {
      setNavigationDirection('slideLeft')
      navigate(`/module/2/${prevSection.path}`)
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
      case 'tokenization':
        return <TokenizationSection />

      case 'tokenization-demo':
        return (
          <div>
            <h2 style={{
              fontSize: theme.typography.size.heading2,
              fontWeight: theme.typography.weight.bold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.lg,
              textAlign: 'center',
            }}>
              Interactive Tokenization Demo
            </h2>
            <InteractiveTokenizer />
            <div style={{ marginTop: theme.spacing.xl }}>
              <MiniQuiz 
                questions={quizQuestions.tokenization}
                onComplete={(score) => {
                  console.log('Quiz completed with score:', score)
                  if (score >= quizQuestions.tokenization.length * 0.7) {
                    handleSectionComplete()
                  }
                }}
              />
            </div>
          </div>
        )

      case 'embeddings':
        return <EmbeddingsSection />

      case 'similarity':
        return (
          <div>
            <h2 style={{
              fontSize: theme.typography.size.heading2,
              fontWeight: theme.typography.weight.bold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.lg,
              textAlign: 'center',
            }}>
              Understanding Semantic Similarity
            </h2>
            <div style={{ marginBottom: theme.spacing.xl }}>
              <p style={{
                fontSize: theme.typography.size.body,
                color: theme.colors.text.secondary,
                lineHeight: '1.7',
                maxWidth: '800px',
                margin: '0 auto',
                textAlign: 'center',
                marginBottom: theme.spacing.lg,
              }}>
                Words with similar meanings cluster together in embedding space. Explore the 
                interactive visualization and test your understanding with the quiz below.
              </p>
            </div>
            <MiniQuiz 
              questions={quizQuestions.embeddings}
              onComplete={(score) => {
                console.log('Quiz completed with score:', score)
                if (score >= quizQuestions.embeddings.length * 0.7) {
                  handleSectionComplete()
                }
              }}
            />
          </div>
        )

      case 'attention':
        return <AttentionSection />

      case 'attention-viz':
        return (
          <div>
            <h2 style={{
              fontSize: theme.typography.size.heading2,
              fontWeight: theme.typography.weight.bold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.lg,
              textAlign: 'center',
            }}>
              Attention Patterns in Practice
            </h2>
            <div style={{ marginBottom: theme.spacing.xl }}>
              <p style={{
                fontSize: theme.typography.size.body,
                color: theme.colors.text.secondary,
                lineHeight: '1.7',
                maxWidth: '800px',
                margin: '0 auto',
                textAlign: 'center',
                marginBottom: theme.spacing.lg,
              }}>
                See how attention weights reveal which words the model considers most important 
                for understanding each token. Test your knowledge with the quiz below.
              </p>
            </div>
            <MiniQuiz 
              questions={quizQuestions.attention}
              onComplete={(score) => {
                console.log('Quiz completed with score:', score)
                if (score >= quizQuestions.attention.length * 0.7) {
                  handleSectionComplete()
                }
              }}
            />
          </div>
        )

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
  }

  const mainContentStyle = {
    minHeight: '500px',
  }

  const navigationControlsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.xxl,
    paddingTop: theme.spacing.lg,
    borderTop: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`,
  }

  const navButtonStyle = (disabled = false) => ({
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    backgroundColor: disabled ? theme.colors.surface.raised : theme.colors.primary.main,
    color: disabled ? theme.colors.text.tertiary : '#ffffff',
    border: 'none',
    borderRadius: theme.radii.medium,
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.semibold,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: theme.transitions.default,
    opacity: disabled ? 0.5 : 1,
  })

  const completeSectionButtonStyle = {
    padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
    backgroundColor: theme.colors.state.success.main,
    color: '#ffffff',
    border: 'none',
    borderRadius: theme.radii.medium,
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.bold,
    cursor: 'pointer',
    transition: theme.transitions.default,
  }

  return (
    <div style={pageContainerStyle}>
      <div style={contentWrapperStyle}>
        {/* Navigation Sidebar */}
        {!isMobile && (
          <div>
            <ModuleNavigation 
              currentPath={currentPath}
              onSectionChange={(section) => {
                console.log('Section changed to:', section.title)
              }}
            />
          </div>
        )}

        {/* Main Content */}
        <div style={mainContentStyle}>
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderSectionContent()}

            {/* Navigation Controls */}
            <div style={navigationControlsStyle}>
              <motion.button
                style={navButtonStyle(isFirstSection(currentPath))}
                onClick={handlePreviousSection}
                disabled={isFirstSection(currentPath)}
                whileHover={!isFirstSection(currentPath) ? { scale: 1.05 } : {}}
                whileTap={!isFirstSection(currentPath) ? { scale: 0.95 } : {}}
              >
                ← Previous
              </motion.button>

              {!isSectionCompleted(currentSection?.id) && (
                <motion.button
                  style={completeSectionButtonStyle}
                  onClick={handleSectionComplete}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ✓ Complete Section
                </motion.button>
              )}

              <motion.button
                style={navButtonStyle(isLastSection(currentPath))}
                onClick={handleNextSection}
                disabled={isLastSection(currentPath)}
                whileHover={!isLastSection(currentPath) ? { scale: 1.05 } : {}}
                whileTap={!isLastSection(currentPath) ? { scale: 0.95 } : {}}
              >
                Next →
              </motion.button>
            </div>

            {/* Back to Dashboard Link */}
            <div style={{ textAlign: 'center', marginTop: theme.spacing.xl }}>
              <Link
                to="/learn"
                style={{
                  color: theme.colors.text.secondary,
                  fontSize: theme.typography.size.body,
                  textDecoration: 'none',
                  transition: theme.transitions.default,
                }}
              >
                ← Back to Learning Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Completion Modal */}
      {showCompletionModal && (
        <CompletionModal
          moduleId={2}
          onClose={() => setShowCompletionModal(false)}
        />
      )}
    </div>
  )
}

export default Module2
