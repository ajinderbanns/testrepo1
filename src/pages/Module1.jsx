import React, { useEffect, useState, useCallback } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { useContent } from '../hooks/useContent'
import { useModuleProgress } from '../hooks/useModuleProgress'
import { useProgress } from '../hooks/useProgress'
import {
  TextCompletionPlayground,
  PromptVariationDemo,
  SentenceBuilderExercise,
  ModuleNavigation,
  SectionTransition,
  CompletionModal,
} from '../components/module1'
import {
  MODULE_1_SECTION_STRUCTURE,
  getSectionByPath,
  getNextSection,
  getPreviousSection,
  isFirstSection,
  isLastSection,
} from '../data/module1Structure'
import '../styles/modules/Module1Playgrounds.css'

function Module1() {
  const { theme } = useTheme()
  const { getModuleContent, getUIContent } = useContent()
  const { sectionPath } = useParams()
  const navigate = useNavigate()
  const { markSectionComplete, completionPercentage, status } = useModuleProgress(1)
  const { overallCompletion, isModuleCompleted } = useProgress()
  
  // Get content for Module 1
  const moduleContent = getModuleContent(1)
  const uiContent = getUIContent()
  
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
  const currentSection = getSectionByPath(sectionPath || 'intro')
  const currentPath = currentSection?.path || 'intro'

  // Check if module just completed
  useEffect(() => {
    if (completionPercentage === 100 && !showCompletionModal) {
      // Small delay to allow the last section completion animation
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
      navigate(`/module/1/${nextSection.path}`)
    }
  }, [currentPath, navigate])

  const handlePreviousSection = useCallback(() => {
    const prevSection = getPreviousSection(currentPath)
    if (prevSection) {
      setNavigationDirection('slideLeft')
      navigate(`/module/1/${prevSection.path}`)
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
      // Don't trigger if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return
      }

      // Arrow keys for navigation
      if (e.key === 'ArrowRight' && !isLastSection(currentPath)) {
        handleNextSection()
      } else if (e.key === 'ArrowLeft' && !isFirstSection(currentPath)) {
        handlePreviousSection()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [currentPath, handleNextSection, handlePreviousSection])

  // Render section content based on current section
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

    // Map section paths to content
    switch (currentSection.path) {
      case 'intro':
        return (
          <div>
            <h2 style={{
              fontSize: theme.typography.size.heading2,
              fontWeight: theme.typography.weight.bold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.lg,
            }}>
              {currentSection.title}
            </h2>
            <p style={{
              fontSize: theme.typography.size.bodyLarge,
              color: theme.colors.text.secondary,
              lineHeight: '1.6',
              marginBottom: theme.spacing.xl,
            }}>
              {moduleContent.intro?.description ||
               'Learn the basics of Large Language Models through interactive examples and hands-on exercises.'}
            </p>
            <div style={{
              padding: theme.spacing.lg,
              backgroundColor: theme.colors.surface.raised,
              borderRadius: theme.radii.medium,
              marginBottom: theme.spacing.lg,
            }}>
              <h3 style={{
                fontSize: theme.typography.size.heading5,
                fontWeight: theme.typography.weight.semibold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.md,
              }}>
                What you'll learn:
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}>
                {currentSection.learningObjectives.map((objective, index) => (
                  <li key={index} style={{
                    padding: theme.spacing.sm,
                    color: theme.colors.text.secondary,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: theme.spacing.sm,
                  }}>
                    <span style={{ color: theme.colors.primary.main }}>✓</span>
                    {objective}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )

      case 'text-generation':
        return (
          <div>
            <h2 style={{
              fontSize: theme.typography.size.heading2,
              fontWeight: theme.typography.weight.bold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.lg,
            }}>
              {currentSection.title}
            </h2>
            <TextCompletionPlayground />
          </div>
        )

      case 'examples':
        return (
          <div>
            <h2 style={{
              fontSize: theme.typography.size.heading2,
              fontWeight: theme.typography.weight.bold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.lg,
            }}>
              {currentSection.title}
            </h2>
            <PromptVariationDemo />
          </div>
        )

      case 'exercises':
        return (
          <div>
            <h2 style={{
              fontSize: theme.typography.size.heading2,
              fontWeight: theme.typography.weight.bold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.lg,
            }}>
              {currentSection.title}
            </h2>
            <SentenceBuilderExercise />
          </div>
        )

      case 'summary':
        return (
          <div>
            <h2 style={{
              fontSize: theme.typography.size.heading2,
              fontWeight: theme.typography.weight.bold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.lg,
            }}>
              {currentSection.title}
            </h2>
            <div style={{
              padding: theme.spacing.xl,
              backgroundColor: theme.colors.surface.raised,
              borderRadius: theme.radii.medium,
              marginBottom: theme.spacing.lg,
            }}>
              <h3 style={{
                fontSize: theme.typography.size.heading4,
                fontWeight: theme.typography.weight.semibold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.md,
              }}>
                Key Takeaways
              </h3>
              <p style={{
                fontSize: theme.typography.size.body,
                color: theme.colors.text.secondary,
                lineHeight: '1.6',
                marginBottom: theme.spacing.lg,
              }}>
                Congratulations on completing Module 1! You've learned the fundamentals
                of Large Language Models, explored how they generate text, and practiced
                prompt engineering techniques.
              </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}>
                {[
                  'LLMs generate text token-by-token using probability distributions',
                  'Prompt engineering significantly affects output quality',
                  'Understanding the basics prepares you for deeper concepts',
                ].map((point, index) => (
                  <li key={index} style={{
                    padding: theme.spacing.sm,
                    color: theme.colors.text.secondary,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: theme.spacing.sm,
                  }}>
                    <span style={{ color: theme.colors.primary.main }}>✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div 
      className="module-page"
      style={{
        minHeight: '100vh',
        backgroundColor: theme.colors.background.primary,
      }}
    >
      {/* Mobile Navigation Toggle */}
      {isMobile && (
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: theme.colors.surface.base,
          borderBottom: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`,
          padding: theme.spacing.md,
        }}>
          <button
            onClick={() => setShowMobileNav(!showMobileNav)}
            style={{
              width: '100%',
              padding: theme.spacing.md,
              backgroundColor: theme.colors.primary.main,
              color: '#ffffff',
              border: 'none',
              borderRadius: theme.radii.medium,
              fontSize: theme.typography.size.body,
              fontWeight: theme.typography.weight.semibold,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>Section Navigation</span>
            <span>{showMobileNav ? '▲' : '▼'}</span>
          </button>
          {showMobileNav && (
            <div style={{ marginTop: theme.spacing.md }}>
              <ModuleNavigation currentPath={currentPath} />
            </div>
          )}
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '280px 1fr',
        gap: theme.spacing.xl,
        maxWidth: '1400px',
        margin: '0 auto',
        padding: theme.spacing.xl,
      }}>
        {/* Sidebar Navigation - Desktop only */}
        {!isMobile && (
          <aside style={{ position: 'sticky', top: theme.spacing.xl, height: 'fit-content' }}>
            <ModuleNavigation currentPath={currentPath} />
          </aside>
        )}

        {/* Main Content */}
        <main>
          <SectionTransition 
            sectionKey={currentPath}
            variant={navigationDirection}
          >
            <div style={{
              backgroundColor: theme.colors.surface.base,
              borderRadius: theme.radii.large,
              padding: theme.spacing.xl,
              minHeight: '600px',
            }}>
              {renderSectionContent()}

              {/* Section Navigation Buttons */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: theme.spacing.xxl,
                paddingTop: theme.spacing.xl,
                borderTop: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`,
                gap: theme.spacing.md,
                flexWrap: 'wrap',
              }}>
                <button
                  onClick={handlePreviousSection}
                  disabled={isFirstSection(currentPath)}
                  style={{
                    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                    backgroundColor: isFirstSection(currentPath) 
                      ? theme.colors.surface.raised
                      : 'transparent',
                    color: isFirstSection(currentPath)
                      ? theme.colors.text.tertiary
                      : theme.colors.text.link,
                    border: `${theme.borderWidth.medium} solid ${
                      isFirstSection(currentPath)
                        ? theme.colors.border.light
                        : theme.colors.border.default
                    }`,
                    borderRadius: theme.radii.medium,
                    fontSize: theme.typography.size.body,
                    fontWeight: theme.typography.weight.medium,
                    cursor: isFirstSection(currentPath) ? 'not-allowed' : 'pointer',
                    transition: theme.transitions.default,
                    opacity: isFirstSection(currentPath) ? 0.5 : 1,
                  }}
                >
                  ← Previous
                </button>

                <button
                  onClick={handleSectionComplete}
                  style={{
                    padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
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
                  {isLastSection(currentPath) ? 'Complete Module' : 'Complete & Continue'}
                </button>

                <button
                  onClick={handleNextSection}
                  disabled={isLastSection(currentPath)}
                  style={{
                    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                    backgroundColor: isLastSection(currentPath)
                      ? theme.colors.surface.raised
                      : 'transparent',
                    color: isLastSection(currentPath)
                      ? theme.colors.text.tertiary
                      : theme.colors.text.link,
                    border: `${theme.borderWidth.medium} solid ${
                      isLastSection(currentPath)
                        ? theme.colors.border.light
                        : theme.colors.border.default
                    }`,
                    borderRadius: theme.radii.medium,
                    fontSize: theme.typography.size.body,
                    fontWeight: theme.typography.weight.medium,
                    cursor: isLastSection(currentPath) ? 'not-allowed' : 'pointer',
                    transition: theme.transitions.default,
                    opacity: isLastSection(currentPath) ? 0.5 : 1,
                  }}
                >
                  Next →
                </button>
              </div>

              {/* Back to Dashboard Link */}
              <div style={{
                marginTop: theme.spacing.lg,
                textAlign: 'center',
              }}>
                <Link 
                  to="/learn"
                  style={{
                    color: theme.colors.text.link,
                    textDecoration: 'none',
                    fontSize: theme.typography.size.body,
                    fontWeight: theme.typography.weight.medium,
                    transition: theme.transitions.default,
                  }}
                >
                  ← Back to Dashboard
                </Link>
              </div>
            </div>
          </SectionTransition>
        </main>
      </div>

      {/* Completion Modal */}
      <CompletionModal
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        moduleName="Module 1: Introduction to LLMs"
        moduleId={1}
        completionPercentage={overallCompletion}
        nextModuleId={2}
      />

      {/* Keyboard Shortcuts Hint - Desktop only */}
      {!isMobile && (
        <div style={{
          position: 'fixed',
          bottom: theme.spacing.md,
          right: theme.spacing.md,
          padding: theme.spacing.sm,
          backgroundColor: theme.colors.surface.raised,
          borderRadius: theme.radii.small,
          fontSize: theme.typography.size.bodySmall,
          color: theme.colors.text.tertiary,
          opacity: 0.7,
        }}>
          Use ← → arrow keys to navigate
        </div>
      )}
    </div>
  )
}

export default Module1
