/**
 * TokenFlow Visualization Component
 * 
 * Interactive visualization showing how text is broken into tokens.
 * Demonstrates tokenization process with smooth animations and transitions.
 * 
 * Features:
 * - Text-to-token transformation animation
 * - Individual token highlighting
 * - Theme-aware colors
 * - Interactive hover states
 * - Responsive design
 * 
 * @component
 */

import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { useAnimationConfig } from '../hooks/useAnimationConfig'
import { staggerChildren } from '../animations/presets'

/**
 * Simple tokenizer simulation
 * In production, this would use a real tokenizer like GPT's BPE
 */
const tokenizeText = (text) => {
  // Simple word-based tokenization with punctuation handling
  const tokens = []
  let currentToken = ''
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    
    if (char === ' ') {
      if (currentToken) {
        tokens.push(currentToken)
        currentToken = ''
      }
      tokens.push(' ')
    } else if (/[.,!?;:]/.test(char)) {
      if (currentToken) {
        tokens.push(currentToken)
        currentToken = ''
      }
      tokens.push(char)
    } else {
      currentToken += char
    }
  }
  
  if (currentToken) {
    tokens.push(currentToken)
  }
  
  return tokens
}

/**
 * Token Display Component
 */
const Token = ({ text, index, isHighlighted, onHover, theme, colors }) => {
  const isSpace = text === ' '
  const isPunctuation = /[.,!?;:]/.test(text)
  
  const tokenStyle = {
    display: 'inline-block',
    padding: isSpace ? '0' : '4px 8px',
    margin: '2px',
    borderRadius: theme.radii.small,
    backgroundColor: isHighlighted 
      ? colors.primary 
      : isPunctuation 
      ? colors.surfaceRaised 
      : colors.surface,
    color: isHighlighted 
      ? '#FFFFFF' 
      : colors.text,
    border: `1px solid ${isHighlighted ? colors.primary : colors.border}`,
    fontSize: theme.typography.size.bodySmall,
    fontFamily: theme.typography.family.mono,
    cursor: 'pointer',
    transition: `all ${theme.transitions.duration.fast}`,
    whiteSpace: isSpace ? 'pre' : 'normal',
  }
  
  if (isSpace) {
    return <span style={{ display: 'inline-block', width: '4px' }} />
  }
  
  return (
    <motion.span
      variants={staggerChildren.itemScale}
      style={tokenStyle}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      whileHover={{
        scale: 1.1,
        y: -2,
        transition: { duration: 0.2 },
      }}
    >
      {text}
    </motion.span>
  )
}

Token.propTypes = {
  text: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isHighlighted: PropTypes.bool.isRequired,
  onHover: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  colors: PropTypes.object.isRequired,
}

/**
 * TokenFlow Component
 */
const TokenFlow = ({
  initialText = 'Hello! How can I help you today?',
  autoTokenize = true,
  showTokenCount = true,
}) => {
  const { theme } = useTheme()
  const animConfig = useAnimationConfig()
  const [inputText, setInputText] = useState(initialText)
  const [isTokenized, setIsTokenized] = useState(false)
  const [hoveredToken, setHoveredToken] = useState(null)
  
  const tokens = useMemo(() => tokenizeText(inputText), [inputText])
  
  useEffect(() => {
    if (autoTokenize) {
      const timer = setTimeout(() => setIsTokenized(true), 500)
      return () => clearTimeout(timer)
    }
  }, [autoTokenize])
  
  const containerStyle = {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    padding: theme.spacing.lg,
    backgroundColor: animConfig.colors.background,
    borderRadius: theme.radii.large,
    border: `1px solid ${animConfig.colors.border}`,
  }
  
  const inputContainerStyle = {
    marginBottom: theme.spacing.lg,
  }
  
  const labelStyle = {
    display: 'block',
    marginBottom: theme.spacing.sm,
    color: animConfig.colors.textSecondary,
    fontSize: theme.typography.size.bodySmall,
    fontWeight: theme.typography.weight.semibold,
  }
  
  const textareaStyle = {
    width: '100%',
    minHeight: '80px',
    padding: theme.spacing.md,
    backgroundColor: animConfig.colors.backgroundSecondary,
    color: animConfig.colors.text,
    border: `1px solid ${animConfig.colors.border}`,
    borderRadius: theme.radii.medium,
    fontSize: theme.typography.size.body,
    fontFamily: theme.typography.family.primary,
    resize: 'vertical',
    outline: 'none',
    transition: `border-color ${theme.transitions.duration.fast}`,
  }
  
  const buttonStyle = {
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    backgroundColor: animConfig.colors.primary,
    color: '#FFFFFF',
    border: 'none',
    borderRadius: theme.radii.medium,
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.semibold,
    cursor: 'pointer',
    transition: `all ${theme.transitions.duration.fast}`,
  }
  
  const tokenContainerStyle = {
    padding: theme.spacing.lg,
    backgroundColor: animConfig.colors.backgroundSecondary,
    borderRadius: theme.radii.medium,
    minHeight: '120px',
    border: `1px solid ${animConfig.colors.border}`,
  }
  
  const infoStyle = {
    marginTop: theme.spacing.md,
    padding: theme.spacing.sm,
    backgroundColor: animConfig.colors.surfaceRaised,
    borderRadius: theme.radii.small,
    color: animConfig.colors.textSecondary,
    fontSize: theme.typography.size.bodySmall,
    textAlign: 'center',
  }
  
  const handleTokenize = () => {
    setIsTokenized(true)
  }
  
  const handleReset = () => {
    setIsTokenized(false)
    setHoveredToken(null)
  }
  
  return (
    <div style={containerStyle}>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>
          Input Text
        </label>
        <textarea
          style={textareaStyle}
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value)
            setIsTokenized(false)
          }}
          placeholder="Enter text to tokenize..."
          onFocus={(e) => {
            e.target.style.borderColor = animConfig.colors.primary
          }}
          onBlur={(e) => {
            e.target.style.borderColor = animConfig.colors.border
          }}
        />
      </div>
      
      <div style={{ display: 'flex', gap: theme.spacing.sm, marginBottom: theme.spacing.lg }}>
        <motion.button
          style={buttonStyle}
          onClick={handleTokenize}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!inputText || isTokenized}
        >
          Tokenize
        </motion.button>
        
        <motion.button
          style={{
            ...buttonStyle,
            backgroundColor: 'transparent',
            color: animConfig.colors.text,
            border: `1px solid ${animConfig.colors.border}`,
          }}
          onClick={handleReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!isTokenized}
        >
          Reset
        </motion.button>
      </div>
      
      <div>
        <label style={labelStyle}>
          {isTokenized ? 'Tokens' : 'Original Text'}
        </label>
        
        <div style={tokenContainerStyle}>
          {!isTokenized ? (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                color: animConfig.colors.text,
                fontSize: theme.typography.size.body,
                lineHeight: theme.typography.lineHeight.relaxed,
              }}
            >
              {inputText || 'Enter text above...'}
            </motion.div>
          ) : (
            <AnimatePresence>
              <motion.div
                variants={staggerChildren.container}
                initial="hidden"
                animate="visible"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '2px',
                  alignItems: 'center',
                }}
              >
                {tokens.map((token, index) => (
                  <Token
                    key={index}
                    text={token}
                    index={index}
                    isHighlighted={hoveredToken === index}
                    onHover={setHoveredToken}
                    theme={theme}
                    colors={animConfig.colors}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
        
        {showTokenCount && isTokenized && (
          <motion.div
            style={infoStyle}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Total tokens: <strong>{tokens.filter(t => t !== ' ').length}</strong>
            {hoveredToken !== null && (
              <span style={{ marginLeft: theme.spacing.md }}>
                • Token {hoveredToken + 1}: "<strong>{tokens[hoveredToken]}</strong>"
              </span>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

TokenFlow.propTypes = {
  initialText: PropTypes.string,
  autoTokenize: PropTypes.bool,
  showTokenCount: PropTypes.bool,
}

export default TokenFlow
