/**
 * SimulatedTextGenerator Component
 * 
 * Reusable component for simulating LLM text generation token-by-token.
 * Features configurable speed, probability indicators, and callback hooks.
 * 
 * @component
 */

import React, { useState, useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'

/**
 * Token Display Component
 * Renders individual tokens with animation and optional probability indicator
 */
const TokenDisplay = ({ token, showProbability, theme, index }) => {
  const probabilityColor = token.probability >= 0.9 
    ? theme.colors.state.success.main
    : token.probability >= 0.75
    ? theme.colors.accent.main
    : theme.colors.state.warning.main

  return (
    <motion.span
      className="simulated-token"
      initial={{ opacity: 0, scale: 0.8, y: -5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.3, 
        ease: 'easeOut',
        delay: index * 0.02, // Slight cascade effect
      }}
      style={{
        display: 'inline-block',
        position: 'relative',
        whiteSpace: 'pre',
      }}
    >
      <span style={{ 
        color: theme.colors.text.primary,
        fontSize: theme.typography.size.body,
        fontFamily: theme.typography.family.primary,
      }}>
        {token.text}
      </span>
      {showProbability && (
        <motion.span
          className="token-probability"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.7, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          style={{
            position: 'absolute',
            top: '-22px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: theme.typography.size.caption,
            color: probabilityColor,
            fontWeight: theme.typography.weight.semibold,
            background: theme.colors.surface.overlay,
            padding: `${theme.spacing.xxs} ${theme.spacing.xs}`,
            borderRadius: theme.radii.small,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            boxShadow: theme.shadows.small,
            border: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`,
          }}
        >
          {(token.probability * 100).toFixed(0)}%
        </motion.span>
      )}
    </motion.span>
  )
}

TokenDisplay.propTypes = {
  token: PropTypes.shape({
    text: PropTypes.string.isRequired,
    probability: PropTypes.number.isRequired,
    delay: PropTypes.number,
  }).isRequired,
  showProbability: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
}

/**
 * Typing Cursor Component
 */
const TypingCursor = ({ theme }) => (
  <motion.span
    className="typing-cursor"
    initial={{ opacity: 1 }}
    animate={{ opacity: [1, 0, 1] }}
    transition={{ 
      duration: 0.8, 
      repeat: Infinity,
      ease: 'linear',
    }}
    style={{
      display: 'inline-block',
      width: '2px',
      height: '1.2em',
      backgroundColor: theme.colors.primary.main,
      marginLeft: '2px',
      verticalAlign: 'middle',
    }}
  />
)

TypingCursor.propTypes = {
  theme: PropTypes.object.isRequired,
}

/**
 * SimulatedTextGenerator Main Component
 */
function SimulatedTextGenerator({
  tokens = [],
  speed = 1,
  showProbability = true,
  autoStart = false,
  onComplete = null,
  onTokenGenerated = null,
  className = '',
}) {
  const { theme } = useTheme()
  const [generatedTokens, setGeneratedTokens] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const timeoutRef = useRef(null)
  const isMounted = useRef(true)

  // Cleanup on unmount
  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Auto-start if enabled
  useEffect(() => {
    if (autoStart && tokens.length > 0 && !isGenerating && currentIndex === 0) {
      startGeneration()
    }
  }, [autoStart, tokens])

  /**
   * Generate next token in sequence
   */
  const generateNextToken = useCallback((index) => {
    if (!isMounted.current || index >= tokens.length) {
      setIsGenerating(false)
      if (index >= tokens.length && onComplete) {
        onComplete()
      }
      return
    }

    const token = tokens[index]
    
    // Add token to display
    setGeneratedTokens(prev => [...prev, token])
    setCurrentIndex(index + 1)

    // Call token callback
    if (onTokenGenerated) {
      onTokenGenerated(token, index)
    }

    // Schedule next token if there are more
    if (index + 1 < tokens.length) {
      const nextToken = tokens[index + 1]
      const delay = (nextToken.delay || 100) / speed
      
      timeoutRef.current = setTimeout(() => {
        generateNextToken(index + 1)
      }, delay)
    } else {
      // Completed all tokens
      setIsGenerating(false)
      if (onComplete) {
        onComplete()
      }
    }
  }, [tokens, speed, onComplete, onTokenGenerated])

  /**
   * Start generation from beginning
   */
  const startGeneration = useCallback(() => {
    if (tokens.length === 0) return
    
    setGeneratedTokens([])
    setCurrentIndex(0)
    setIsGenerating(true)
    
    // Start with first token
    const firstToken = tokens[0]
    const delay = (firstToken.delay || 100) / speed
    
    timeoutRef.current = setTimeout(() => {
      generateNextToken(0)
    }, delay)
  }, [tokens, speed, generateNextToken])

  /**
   * Reset generation
   */
  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setGeneratedTokens([])
    setCurrentIndex(0)
    setIsGenerating(false)
  }, [])

  /**
   * Pause generation
   */
  const pause = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsGenerating(false)
  }, [])

  /**
   * Resume generation
   */
  const resume = useCallback(() => {
    if (currentIndex < tokens.length && !isGenerating) {
      setIsGenerating(true)
      generateNextToken(currentIndex)
    }
  }, [currentIndex, tokens, isGenerating, generateNextToken])

  return (
    <div className={`simulated-text-generator ${className}`}>
      <div 
        className="generated-text-display"
        style={{
          minHeight: '60px',
          lineHeight: '1.8',
          position: 'relative',
        }}
      >
        <AnimatePresence>
          {generatedTokens.map((token, index) => (
            <TokenDisplay
              key={`token-${index}`}
              token={token}
              showProbability={showProbability}
              theme={theme}
              index={index}
            />
          ))}
        </AnimatePresence>
        {isGenerating && <TypingCursor theme={theme} />}
      </div>
    </div>
  )
}

SimulatedTextGenerator.propTypes = {
  /** Array of token objects with text, probability, and delay */
  tokens: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      probability: PropTypes.number.isRequired,
      delay: PropTypes.number,
    })
  ).isRequired,
  /** Speed multiplier (1 = normal, 2 = 2x faster, 0.5 = half speed) */
  speed: PropTypes.number,
  /** Show probability indicators above tokens */
  showProbability: PropTypes.bool,
  /** Automatically start generation on mount */
  autoStart: PropTypes.bool,
  /** Callback when generation completes */
  onComplete: PropTypes.func,
  /** Callback for each token generated */
  onTokenGenerated: PropTypes.func,
  /** Additional CSS class name */
  className: PropTypes.string,
}

// Expose control methods via ref (for parent components)
export const useTextGeneratorControls = (generatorRef) => {
  return {
    start: () => generatorRef.current?.startGeneration(),
    pause: () => generatorRef.current?.pause(),
    resume: () => generatorRef.current?.resume(),
    reset: () => generatorRef.current?.reset(),
  }
}

export default SimulatedTextGenerator
