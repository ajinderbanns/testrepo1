/**
 * TextGeneration Visualization Component
 * 
 * Interactive visualization demonstrating how LLMs generate text token-by-token.
 * Features pre-scripted examples with timing, probability indicators, and
 * theme-aware styling.
 * 
 * Features:
 * - Token-by-token reveal animation
 * - Probability indicators showing prediction confidence
 * - Play/pause/reset controls
 * - Multiple example prompts
 * - Responsive design for mobile/desktop
 * - Theme-specific color schemes
 * 
 * @component
 * @example
 * <TextGeneration />
 */

import React, { useState, useEffect, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { textGenerationExamples } from './textGenerationExamples'
import '../styles/visualizations/TextGeneration.css'

/**
 * Play state constants
 */
const PlayState = {
  IDLE: 'idle',
  PLAYING: 'playing',
  PAUSED: 'paused',
  COMPLETED: 'completed',
}

/**
 * TokenDisplay Component
 * 
 * Renders a single token with probability indicator
 */
const TokenDisplay = ({ token, theme, showProbability }) => {
  const probabilityColor = token.probability >= 0.9 
    ? theme.colors.state.success.main
    : token.probability >= 0.75
    ? theme.colors.accent.main
    : theme.colors.state.warning.main

  return (
    <motion.span
      className="token-display"
      initial={{ opacity: 0, scale: 0.8, y: -5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        display: 'inline-block',
        position: 'relative',
        whiteSpace: token.text === '\n\n' ? 'normal' : 'pre',
      }}
    >
      {token.text === '\n\n' ? (
        <br style={{ display: 'block', content: '""', marginTop: theme.spacing.md }} />
      ) : token.text === '\n' ? (
        <br />
      ) : (
        <>
          <span style={{ 
            color: theme.colors.text.primary,
            fontSize: theme.typography.size.body,
            fontFamily: theme.typography.family.primary,
          }}>
            {token.text}
          </span>
          {showProbability && (
            <motion.span
              className="probability-indicator"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.7, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              style={{
                position: 'absolute',
                top: '-20px',
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
              }}
            >
              {(token.probability * 100).toFixed(0)}%
            </motion.span>
          )}
        </>
      )}
    </motion.span>
  )
}

TokenDisplay.propTypes = {
  token: PropTypes.shape({
    text: PropTypes.string.isRequired,
    probability: PropTypes.number.isRequired,
  }).isRequired,
  theme: PropTypes.object.isRequired,
  showProbability: PropTypes.bool.isRequired,
}

/**
 * ControlButton Component
 * 
 * Styled button for play/pause/reset controls
 */
const ControlButton = ({ onClick, disabled, children, variant = 'primary', theme }) => {
  const variantStyles = {
    primary: {
      backgroundColor: theme.colors.primary.main,
      color: theme.colors.primary.contrast,
      border: 'none',
    },
    secondary: {
      backgroundColor: 'transparent',
      color: theme.colors.text.primary,
      border: `${theme.borderWidth.thin} solid ${theme.colors.border.default}`,
    },
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      style={{
        ...variantStyles[variant],
        padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
        borderRadius: theme.radii.medium,
        fontSize: theme.typography.size.body,
        fontWeight: theme.typography.weight.semibold,
        fontFamily: theme.typography.family.primary,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: theme.transitions.default,
        boxShadow: variant === 'primary' ? theme.shadows.small : 'none',
        minWidth: '100px',
      }}
    >
      {children}
    </motion.button>
  )
}

ControlButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  theme: PropTypes.object.isRequired,
}

/**
 * Main TextGeneration Component
 */
function TextGeneration({ 
  autoPlay = false,
  showProbabilityIndicators = true,
  speed = 1,
}) {
  const { theme, themeName } = useTheme()
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0)
  const [playState, setPlayState] = useState(PlayState.IDLE)
  const [generatedTokens, setGeneratedTokens] = useState([])
  const [currentTokenIndex, setCurrentTokenIndex] = useState(0)
  const timeoutRef = useRef(null)
  
  // Get current example based on gender
  const currentExample = textGenerationExamples[currentExampleIndex]
  const gender = themeName === 'female' ? 'female' : 'male'
  const tokens = currentExample.tokens[gender]

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Auto-play on mount if enabled
  useEffect(() => {
    if (autoPlay && playState === PlayState.IDLE) {
      handlePlay()
    }
  }, [autoPlay])

  /**
   * Generate next token
   */
  const generateNextToken = useCallback((index) => {
    if (index >= tokens.length) {
      setPlayState(PlayState.COMPLETED)
      return
    }

    const token = tokens[index]
    
    // Add token to display
    setGeneratedTokens(prev => [...prev, token])
    setCurrentTokenIndex(index + 1)

    // Schedule next token if there are more
    if (index + 1 < tokens.length) {
      const nextToken = tokens[index + 1]
      timeoutRef.current = setTimeout(() => {
        generateNextToken(index + 1)
      }, nextToken.delay / speed)
    } else {
      // Completed all tokens
      setPlayState(PlayState.COMPLETED)
    }
  }, [tokens, speed])

  /**
   * Handle play button
   */
  const handlePlay = useCallback(() => {
    if (playState === PlayState.IDLE || playState === PlayState.COMPLETED) {
      // Start from beginning
      setGeneratedTokens([])
      setCurrentTokenIndex(0)
      setPlayState(PlayState.PLAYING)
      
      // Start generation from first token
      if (tokens.length > 0) {
        const firstToken = tokens[0]
        timeoutRef.current = setTimeout(() => {
          generateNextToken(0)
        }, firstToken.delay / speed)
      }
    } else if (playState === PlayState.PAUSED) {
      // Resume from current position
      setPlayState(PlayState.PLAYING)
      if (currentTokenIndex < tokens.length) {
        const nextToken = tokens[currentTokenIndex]
        timeoutRef.current = setTimeout(() => {
          generateNextToken(currentTokenIndex)
        }, nextToken.delay / speed)
      }
    }
  }, [playState, tokens, speed, generateNextToken, currentTokenIndex])

  /**
   * Handle pause button
   */
  const handlePause = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setPlayState(PlayState.PAUSED)
  }, [])

  /**
   * Handle reset button
   */
  const handleReset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setPlayState(PlayState.IDLE)
    setGeneratedTokens([])
    setCurrentTokenIndex(0)
  }, [])

  /**
   * Handle example change
   */
  const handleExampleChange = useCallback((index) => {
    handleReset()
    setCurrentExampleIndex(index)
  }, [handleReset])

  // Container styles
  const containerStyles = {
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.surface.base,
    borderRadius: theme.radii.xlarge,
    boxShadow: theme.shadows.large,
    border: `${theme.borderWidth.thin} solid ${theme.colors.border.default}`,
  }

  const headerStyles = {
    marginBottom: theme.spacing.xl,
  }

  const titleStyles = {
    fontSize: theme.typography.size.heading3,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
    fontFamily: theme.typography.family.heading,
  }

  const descriptionStyles = {
    fontSize: theme.typography.size.body,
    color: theme.colors.text.secondary,
    lineHeight: theme.typography.lineHeight.relaxed,
    marginBottom: theme.spacing.lg,
  }

  const exampleSelectorStyles = {
    display: 'flex',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.xl,
    flexWrap: 'wrap',
  }

  const promptContainerStyles = {
    backgroundColor: theme.colors.background.secondary,
    padding: theme.spacing.lg,
    borderRadius: theme.radii.medium,
    marginBottom: theme.spacing.xl,
    border: `${theme.borderWidth.medium} solid ${theme.colors.border.accent}`,
  }

  const promptLabelStyles = {
    fontSize: theme.typography.size.bodySmall,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: theme.spacing.xs,
  }

  const promptTextStyles = {
    fontSize: theme.typography.size.bodyLarge,
    fontWeight: theme.typography.weight.medium,
    color: theme.colors.text.primary,
    fontStyle: 'italic',
  }

  const outputContainerStyles = {
    backgroundColor: theme.colors.background.tertiary,
    padding: theme.spacing.xl,
    borderRadius: theme.radii.medium,
    minHeight: '200px',
    marginBottom: theme.spacing.xl,
    border: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`,
    position: 'relative',
    lineHeight: theme.typography.lineHeight.relaxed,
  }

  const controlsContainerStyles = {
    display: 'flex',
    gap: theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  }

  const progressBarStyles = {
    width: '100%',
    height: '4px',
    backgroundColor: theme.colors.border.light,
    borderRadius: theme.radii.full,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
  }

  const progressFillStyles = {
    height: '100%',
    backgroundColor: theme.colors.primary.main,
    transition: 'width 0.1s linear',
    width: `${(generatedTokens.length / tokens.length) * 100}%`,
  }

  return (
    <motion.div
      className="text-generation-viz"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={containerStyles}
    >
      {/* Header */}
      <div style={headerStyles}>
        <h2 style={titleStyles}>
          How LLMs Generate Text
        </h2>
        <p style={descriptionStyles}>
          Watch as the model generates a response token-by-token, with each word
          predicted based on the context. The percentage shows the model's confidence
          in each token choice.
        </p>
      </div>

      {/* Example Selector */}
      <div className="example-selector" style={exampleSelectorStyles}>
        {textGenerationExamples.map((example, index) => (
          <ControlButton
            key={example.id}
            onClick={() => handleExampleChange(index)}
            disabled={playState === PlayState.PLAYING}
            variant={index === currentExampleIndex ? 'primary' : 'secondary'}
            theme={theme}
          >
            {typeof example.title === 'string' ? example.title : example.title[gender]}
          </ControlButton>
        ))}
      </div>

      {/* Current Example Description */}
      <motion.p
        key={currentExampleIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          ...descriptionStyles,
          fontSize: theme.typography.size.bodySmall,
          fontStyle: 'italic',
        }}
      >
        {typeof currentExample.description === 'string' 
          ? currentExample.description 
          : currentExample.description[gender]}
      </motion.p>

      {/* Prompt Display */}
      <div className="prompt-container" style={promptContainerStyles}>
        <div style={promptLabelStyles}>Prompt</div>
        <div style={promptTextStyles}>
          {typeof currentExample.prompt === 'string'
            ? currentExample.prompt
            : currentExample.prompt[gender]}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar" style={progressBarStyles}>
        <div style={progressFillStyles} />
      </div>

      {/* Generated Output */}
      <div className="output-container" style={outputContainerStyles}>
        {generatedTokens.length === 0 && playState === PlayState.IDLE && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              color: theme.colors.text.tertiary,
              fontStyle: 'italic',
              fontSize: theme.typography.size.body,
            }}
          >
            Press Play to watch text generation...
          </motion.div>
        )}
        
        <AnimatePresence mode="sync">
          {generatedTokens.map((token, index) => (
            <TokenDisplay
              key={`${currentExampleIndex}-${index}`}
              token={token}
              theme={theme}
              showProbability={showProbabilityIndicators && index === generatedTokens.length - 1}
            />
          ))}
        </AnimatePresence>

        {/* Typing cursor */}
        {playState === PlayState.PLAYING && (
          <motion.span
            className="typing-cursor"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            style={{
              display: 'inline-block',
              width: '2px',
              height: '1em',
              backgroundColor: theme.colors.primary.main,
              marginLeft: '2px',
              verticalAlign: 'text-bottom',
            }}
          />
        )}
      </div>

      {/* Controls */}
      <div className="controls-container" style={controlsContainerStyles}>
        {(playState === PlayState.IDLE || playState === PlayState.PAUSED || playState === PlayState.COMPLETED) && (
          <ControlButton
            onClick={handlePlay}
            variant="primary"
            theme={theme}
          >
            {playState === PlayState.COMPLETED ? '↻ Replay' : '▶ Play'}
          </ControlButton>
        )}

        {playState === PlayState.PLAYING && (
          <ControlButton
            onClick={handlePause}
            variant="primary"
            theme={theme}
          >
            ⏸ Pause
          </ControlButton>
        )}

        <ControlButton
          onClick={handleReset}
          disabled={playState === PlayState.IDLE}
          variant="secondary"
          theme={theme}
        >
          Reset
        </ControlButton>

        <div 
          className="token-count"
          style={{
            fontSize: theme.typography.size.bodySmall,
            color: theme.colors.text.tertiary,
            padding: `${theme.spacing.sm} ${theme.spacing.md}`,
          }}
        >
          {generatedTokens.length} / {tokens.length} tokens
        </div>
      </div>
    </motion.div>
  )
}

TextGeneration.propTypes = {
  /** Auto-play visualization on mount */
  autoPlay: PropTypes.bool,
  /** Show probability indicators above tokens */
  showProbabilityIndicators: PropTypes.bool,
  /** Animation speed multiplier (higher = faster) */
  speed: PropTypes.number,
}

export default TextGeneration
