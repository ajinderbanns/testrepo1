/**
 * TokenizationViz Component
 * 
 * Animated visualization showing text breaking down into tokens step-by-step.
 * Demonstrates the tokenization process with smooth transitions.
 * 
 * @component
 */

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'

const DEMO_TEXT = "Hello, world! How are you?"
const ANIMATION_STEPS = {
  FULL_TEXT: 'full',
  WORD_SPLIT: 'word-split',
  TOKEN_SPLIT: 'token-split',
  FINAL: 'final',
}

const tokenizeStepByStep = (text) => {
  // Step 1: Full text
  const fullText = [{ text, stage: 'full' }]
  
  // Step 2: Word-level split
  const words = text.split(' ').map(word => ({ text: word, stage: 'word' }))
  
  // Step 3: Token-level split (with punctuation separated)
  const tokens = []
  words.forEach(word => {
    let current = word.text
    const punctuation = /[.,!?;:'"()]$/
    
    if (punctuation.test(current)) {
      const punct = current[current.length - 1]
      const base = current.slice(0, -1)
      if (base) tokens.push({ text: base, stage: 'token', type: 'word' })
      tokens.push({ text: punct, stage: 'token', type: 'punct' })
    } else {
      tokens.push({ text: current, stage: 'token', type: 'word' })
    }
  })
  
  return { fullText, words, tokens }
}

function TokenizationViz() {
  const { theme } = useTheme()
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  
  const { fullText, words, tokens } = tokenizeStepByStep(DEMO_TEXT)
  
  const steps = [
    { name: 'Original Text', data: fullText, description: 'Raw input text as entered' },
    { name: 'Word Splitting', data: words, description: 'Text split into word units' },
    { name: 'Token Separation', data: tokens, description: 'Words and punctuation as tokens' },
  ]

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, 2000)
      return () => clearInterval(timer)
    }
  }, [isPlaying, steps.length])

  const handlePlay = () => {
    setCurrentStep(0)
    setIsPlaying(true)
  }

  const handleReset = () => {
    setCurrentStep(0)
    setIsPlaying(false)
  }

  const containerStyle = {
    backgroundColor: theme.colors.surface.raised,
    borderRadius: theme.radii.large,
    padding: theme.spacing.xl,
    border: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`,
  }

  const stageDisplayStyle = {
    minHeight: '150px',
    backgroundColor: theme.colors.surface.base,
    borderRadius: theme.radii.medium,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    border: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  }

  const getTokenStyle = (item) => {
    const baseStyle = {
      padding: '8px 14px',
      borderRadius: theme.radii.small,
      fontSize: theme.typography.size.body,
      fontFamily: theme.typography.family.mono,
      transition: theme.transitions.default,
    }

    if (item.stage === 'full') {
      return {
        ...baseStyle,
        backgroundColor: theme.colors.surface.raised,
        color: theme.colors.text.primary,
        border: `2px solid ${theme.colors.border.light}`,
        fontSize: theme.typography.size.bodyLarge,
      }
    }

    if (item.stage === 'word') {
      return {
        ...baseStyle,
        backgroundColor: theme.colors.primary.light + '30',
        color: theme.colors.text.primary,
        border: `2px solid ${theme.colors.primary.main}`,
        fontWeight: theme.typography.weight.medium,
      }
    }

    if (item.stage === 'token') {
      return {
        ...baseStyle,
        backgroundColor: item.type === 'punct' 
          ? theme.colors.accent.light + '30'
          : theme.colors.primary.main,
        color: item.type === 'punct' 
          ? theme.colors.text.primary
          : '#ffffff',
        border: `2px solid ${
          item.type === 'punct' ? theme.colors.accent.main : theme.colors.primary.dark
        }`,
        fontWeight: theme.typography.weight.semibold,
      }
    }

    return baseStyle
  }

  const controlButtonStyle = (isActive = false) => ({
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    backgroundColor: isActive 
      ? theme.colors.primary.main 
      : theme.colors.surface.raised,
    color: isActive 
      ? '#ffffff' 
      : theme.colors.text.primary,
    border: `${theme.borderWidth.thin} solid ${
      isActive ? theme.colors.primary.main : theme.colors.border.light
    }`,
    borderRadius: theme.radii.medium,
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.semibold,
    cursor: isPlaying && isActive ? 'not-allowed' : 'pointer',
    transition: theme.transitions.default,
    opacity: (isPlaying && isActive) ? 0.6 : 1,
  })

  const stepIndicatorStyle = (index) => ({
    flex: 1,
    height: '6px',
    backgroundColor: index <= currentStep 
      ? theme.colors.primary.main 
      : theme.colors.surface.raised,
    borderRadius: theme.radii.full,
    transition: theme.transitions.default,
  })

  return (
    <div style={containerStyle}>
      {/* Step Indicator */}
      <div style={{
        display: 'flex',
        gap: theme.spacing.xs,
        marginBottom: theme.spacing.lg,
      }}>
        {steps.map((_, index) => (
          <div key={index} style={stepIndicatorStyle(index)} />
        ))}
      </div>

      {/* Current Step Label */}
      <div style={{
        textAlign: 'center',
        marginBottom: theme.spacing.md,
      }}>
        <h4 style={{
          fontSize: theme.typography.size.heading5,
          fontWeight: theme.typography.weight.bold,
          color: theme.colors.primary.main,
          marginBottom: theme.spacing.xs,
        }}>
          {steps[currentStep].name}
        </h4>
        <p style={{
          fontSize: theme.typography.size.bodySmall,
          color: theme.colors.text.secondary,
          margin: 0,
        }}>
          {steps[currentStep].description}
        </p>
      </div>

      {/* Visualization Area */}
      <div style={stageDisplayStyle}>
        <AnimatePresence mode="wait">
          {steps[currentStep].data.map((item, index) => (
            <motion.div
              key={`${currentStep}-${index}`}
              style={getTokenStyle(item)}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
            >
              {item.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Token Count */}
      <motion.div
        style={{
          textAlign: 'center',
          padding: theme.spacing.md,
          backgroundColor: theme.colors.primary.light + '15',
          borderRadius: theme.radii.small,
          marginBottom: theme.spacing.lg,
        }}
        key={currentStep}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span style={{
          fontSize: theme.typography.size.body,
          color: theme.colors.text.primary,
          fontWeight: theme.typography.weight.semibold,
        }}>
          {steps[currentStep].data.length} {steps[currentStep].data.length === 1 ? 'unit' : 'units'}
        </span>
      </motion.div>

      {/* Controls */}
      <div style={{
        display: 'flex',
        gap: theme.spacing.sm,
        justifyContent: 'center',
      }}>
        <motion.button
          style={controlButtonStyle(!isPlaying)}
          onClick={handlePlay}
          disabled={isPlaying}
          whileHover={!isPlaying ? { scale: 1.05 } : {}}
          whileTap={!isPlaying ? { scale: 0.95 } : {}}
        >
          {isPlaying ? '▶ Playing...' : '▶ Play Animation'}
        </motion.button>
        <motion.button
          style={controlButtonStyle(false)}
          onClick={handleReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ↺ Reset
        </motion.button>
        <motion.button
          style={controlButtonStyle(false)}
          onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
          disabled={currentStep === 0 || isPlaying}
          whileHover={currentStep > 0 && !isPlaying ? { scale: 1.05 } : {}}
          whileTap={currentStep > 0 && !isPlaying ? { scale: 0.95 } : {}}
        >
          ← Prev
        </motion.button>
        <motion.button
          style={controlButtonStyle(false)}
          onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
          disabled={currentStep === steps.length - 1 || isPlaying}
          whileHover={currentStep < steps.length - 1 && !isPlaying ? { scale: 1.05 } : {}}
          whileTap={currentStep < steps.length - 1 && !isPlaying ? { scale: 0.95 } : {}}
        >
          Next →
        </motion.button>
      </div>
    </div>
  )
}

export default TokenizationViz
