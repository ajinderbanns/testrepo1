import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import Button from '../ui/Button'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import { saveGenderPreference } from '../../utils/localStorage'
import '../../styles/ThemePreview.css'

/**
 * ThemePreview Component
 * 
 * Full-screen preview showing selected theme applied to sample learning content.
 * Users can confirm their selection or go back to change it.
 * 
 * Features:
 * - Full-screen immersive preview of selected theme
 * - Sample module card with realistic content
 * - Typography samples (headings, body text)
 * - UI component samples (buttons, badges)
 * - Simple visualization/abstract representation
 * - Confirmation flow with localStorage persistence
 * - Back navigation to gender selection
 * - Smooth Framer Motion animations
 * 
 * @component
 * @example
 * <ThemePreview 
 *   selectedGender="female"
 *   onConfirm={() => navigate('/learn')}
 *   onBack={() => setStep('selection')}
 * />
 */
function ThemePreview({ selectedGender, onConfirm, onBack, className = '' }) {
  const navigate = useNavigate()
  const { theme, switchTheme } = useTheme()
  const [isExiting, setIsExiting] = useState(false)

  // Apply selected theme on mount
  useEffect(() => {
    if (selectedGender) {
      switchTheme(selectedGender)
    }
  }, [selectedGender, switchTheme])

  // Handle confirmation - save to localStorage and proceed
  const handleConfirm = () => {
    setIsExiting(true)
    
    // Save gender preference to localStorage
    const saved = saveGenderPreference(selectedGender)
    
    if (saved) {
      // Delay navigation for exit animation
      setTimeout(() => {
        if (onConfirm) {
          onConfirm()
        } else {
          // Default: navigate to learning modules
          navigate('/learn')
        }
      }, 600)
    } else {
      // If save fails, still allow progression but log warning
      console.warn('Failed to save gender preference, but allowing user to proceed')
      setTimeout(() => {
        if (onConfirm) {
          onConfirm()
        } else {
          navigate('/learn')
        }
      }, 600)
    }
  }

  // Handle back navigation
  const handleBack = () => {
    if (onBack) {
      onBack()
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  }

  // Floating animation for visualization
  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  // Get theme-specific content
  const themeName = selectedGender === 'male' ? 'Bold & Vibrant' : 'Warm & Inviting'
  const themeDescription = selectedGender === 'male' 
    ? 'High contrast colors with neon accents and modern aesthetics'
    : 'Soft peachy tones with sunset vibes and friendly aesthetics'

  return (
    <motion.div
      className={`theme-preview ${className}`}
      style={{ backgroundColor: theme.colors.background.primary }}
      variants={containerVariants}
      initial="hidden"
      animate={isExiting ? 'exit' : 'visible'}
      exit="exit"
    >
      {/* Background decorative elements */}
      <div className="theme-preview__background" aria-hidden="true">
        <motion.div
          className="theme-preview__gradient-orb theme-preview__gradient-orb--1"
          style={{
            background: `radial-gradient(circle, ${theme.colors.primary.main}40 0%, transparent 70%)`,
          }}
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="theme-preview__gradient-orb theme-preview__gradient-orb--2"
          style={{
            background: `radial-gradient(circle, ${theme.colors.secondary.main}40 0%, transparent 70%)`,
          }}
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.div
          className="theme-preview__gradient-orb theme-preview__gradient-orb--3"
          style={{
            background: `radial-gradient(circle, ${theme.colors.accent.main}40 0%, transparent 70%)`,
          }}
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
      </div>

      {/* Main content */}
      <div className="theme-preview__container">
        {/* Header */}
        <motion.header className="theme-preview__header" variants={itemVariants}>
          <button
            className="theme-preview__back-button"
            onClick={handleBack}
            aria-label="Go back to theme selection"
            style={{
              color: theme.colors.text.primary,
              borderColor: theme.colors.border.default,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Go Back
          </button>
          
          <motion.div className="theme-preview__header-content" variants={itemVariants}>
            <h1 
              className="theme-preview__title"
              style={{ color: theme.colors.text.primary }}
            >
              {themeName}
            </h1>
            <p 
              className="theme-preview__subtitle"
              style={{ color: theme.colors.text.secondary }}
            >
              {themeDescription}
            </p>
          </motion.div>
        </motion.header>

        {/* Preview content */}
        <motion.main className="theme-preview__content" variants={itemVariants}>
          {/* Sample Module Card */}
          <motion.div className="theme-preview__sample-card" variants={cardVariants}>
            <Card elevated padding="large" className="preview-module-card">
              <div className="preview-module-card__header">
                <div className="preview-module-card__meta">
                  <Badge 
                    variant="in-progress" 
                    className="preview-module-badge"
                  >
                    Module 1
                  </Badge>
                  <span 
                    className="preview-module-card__duration"
                    style={{ color: theme.colors.text.tertiary }}
                  >
                    15 min
                  </span>
                </div>
                <h2 
                  className="preview-module-card__title"
                  style={{ color: theme.colors.text.primary }}
                >
                  Introduction to Language Models
                </h2>
                <p 
                  className="preview-module-card__description"
                  style={{ color: theme.colors.text.secondary }}
                >
                  Discover how AI understands and generates human language. 
                  Explore the fundamentals of neural networks and token processing 
                  through interactive visualizations.
                </p>
              </div>

              {/* Sample Visualization Area */}
              <div 
                className="preview-visualization"
                style={{
                  background: theme.colors.surface.raised,
                  borderColor: theme.colors.border.light,
                }}
              >
                <div className="preview-visualization__content">
                  {/* Abstract representation of data flow */}
                  <svg 
                    className="preview-visualization__svg" 
                    viewBox="0 0 400 200" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="vizGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={theme.colors.primary.main} stopOpacity="0.6" />
                        <stop offset="50%" stopColor={theme.colors.secondary.main} stopOpacity="0.6" />
                        <stop offset="100%" stopColor={theme.colors.accent.main} stopOpacity="0.6" />
                      </linearGradient>
                    </defs>
                    
                    {/* Connection lines */}
                    <motion.line
                      x1="50" y1="100" x2="150" y2="60"
                      stroke="url(#vizGradient)"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                    <motion.line
                      x1="50" y1="100" x2="150" y2="140"
                      stroke="url(#vizGradient)"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.6 }}
                    />
                    <motion.line
                      x1="150" y1="60" x2="250" y2="100"
                      stroke="url(#vizGradient)"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.7 }}
                    />
                    <motion.line
                      x1="150" y1="140" x2="250" y2="100"
                      stroke="url(#vizGradient)"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.8 }}
                    />
                    <motion.line
                      x1="250" y1="100" x2="350" y2="100"
                      stroke="url(#vizGradient)"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.9 }}
                    />
                    
                    {/* Nodes */}
                    {[
                      { cx: 50, cy: 100, delay: 0.5 },
                      { cx: 150, cy: 60, delay: 0.7 },
                      { cx: 150, cy: 140, delay: 0.7 },
                      { cx: 250, cy: 100, delay: 0.9 },
                      { cx: 350, cy: 100, delay: 1.1 },
                    ].map((node, i) => (
                      <motion.circle
                        key={i}
                        cx={node.cx}
                        cy={node.cy}
                        r="8"
                        fill={theme.colors.primary.main}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, delay: node.delay }}
                      />
                    ))}
                  </svg>
                  
                  <p 
                    className="preview-visualization__label"
                    style={{ color: theme.colors.text.tertiary }}
                  >
                    Sample Visualization
                  </p>
                </div>
              </div>

              {/* Sample UI Elements */}
              <div className="preview-module-card__actions">
                <Button variant="primary" size="medium">
                  Start Learning
                </Button>
                <Button variant="tertiary" size="medium">
                  Learn More
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Typography Samples */}
          <motion.div 
            className="theme-preview__typography-samples"
            variants={itemVariants}
          >
            <div className="typography-sample">
              <h3 
                className="typography-sample__label"
                style={{ color: theme.colors.text.tertiary }}
              >
                Sample Heading
              </h3>
              <h2 
                className="typography-sample__heading"
                style={{ color: theme.colors.text.primary }}
              >
                Understanding Neural Networks
              </h2>
            </div>
            
            <div className="typography-sample">
              <h3 
                className="typography-sample__label"
                style={{ color: theme.colors.text.tertiary }}
              >
                Sample Body Text
              </h3>
              <p 
                className="typography-sample__text"
                style={{ color: theme.colors.text.secondary }}
              >
                Language models process text by breaking it into tokens and analyzing 
                patterns in vast amounts of training data. This enables them to 
                understand context and generate human-like responses.
              </p>
            </div>
          </motion.div>
        </motion.main>

        {/* Confirmation footer */}
        <motion.footer 
          className="theme-preview__footer"
          variants={itemVariants}
          style={{
            borderTopColor: theme.colors.border.default,
          }}
        >
          <div className="theme-preview__footer-content">
            <div className="theme-preview__footer-text">
              <h3 
                className="theme-preview__footer-title"
                style={{ color: theme.colors.text.primary }}
              >
                Ready to start learning?
              </h3>
              <p 
                className="theme-preview__footer-description"
                style={{ color: theme.colors.text.secondary }}
              >
                You can always change your theme preference later in settings
              </p>
            </div>
            
            <Button 
              variant="primary" 
              size="large" 
              onClick={handleConfirm}
              className="theme-preview__confirm-button"
            >
              Looks Good! Let's Go
            </Button>
          </div>
        </motion.footer>
      </div>
    </motion.div>
  )
}

ThemePreview.propTypes = {
  /** Selected gender/theme ('male' or 'female') */
  selectedGender: PropTypes.oneOf(['male', 'female']).isRequired,
  /** Callback when user confirms theme selection */
  onConfirm: PropTypes.func,
  /** Callback when user wants to go back to selection */
  onBack: PropTypes.func.isRequired,
  /** Additional CSS classes */
  className: PropTypes.string,
}

export default ThemePreview
