/**
 * InteractiveTokenizer Component
 * 
 * Interactive component allowing users to input text and see it tokenized in real-time.
 * Shows token count, individual tokens with highlighting, and example sentences.
 * 
 * @component
 */

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import { interactiveExamples } from '../../data/module2Content'
import { staggerChildren } from '../../animations/presets'

/**
 * Simple tokenizer simulation
 * Handles words, punctuation, and spaces
 */
const tokenizeText = (text) => {
  if (!text) return []
  
  const tokens = []
  let currentToken = ''
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    
    if (char === ' ') {
      if (currentToken) {
        tokens.push({ text: currentToken, type: 'word' })
        currentToken = ''
      }
      tokens.push({ text: ' ', type: 'space' })
    } else if (/[.,!?;:'"()[\]{}]/.test(char)) {
      if (currentToken) {
        tokens.push({ text: currentToken, type: 'word' })
        currentToken = ''
      }
      tokens.push({ text: char, type: 'punctuation' })
    } else if (/[0-9]/.test(char)) {
      currentToken += char
    } else {
      currentToken += char
    }
  }
  
  if (currentToken) {
    tokens.push({ text: currentToken, type: 'word' })
  }
  
  return tokens
}

/**
 * Token Component
 */
const Token = ({ token, index, isHighlighted, onHover, theme }) => {
  const { text, type } = token
  
  if (type === 'space') {
    return <span style={{ display: 'inline-block', width: '8px' }} />
  }
  
  const getTokenColor = () => {
    if (isHighlighted) return '#ffffff'
    if (type === 'punctuation') return theme.colors.accent.main
    if (type === 'word') return theme.colors.text.primary
    return theme.colors.text.secondary
  }
  
  const getBackgroundColor = () => {
    if (isHighlighted) return theme.colors.primary.main
    if (type === 'punctuation') return theme.colors.accent.light + '20'
    return theme.colors.surface.raised
  }
  
  return (
    <motion.span
      variants={staggerChildren.itemScale}
      style={{
        display: 'inline-block',
        padding: '6px 10px',
        margin: '4px',
        borderRadius: theme.radii.small,
        backgroundColor: getBackgroundColor(),
        color: getTokenColor(),
        border: `${theme.borderWidth.thin} solid ${
          isHighlighted ? theme.colors.primary.main : theme.colors.border.light
        }`,
        fontSize: theme.typography.size.body,
        fontFamily: theme.typography.family.mono,
        cursor: 'pointer',
        transition: theme.transitions.default,
        fontWeight: type === 'word' ? theme.typography.weight.medium : theme.typography.weight.normal,
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      whileHover={{
        scale: 1.08,
        y: -3,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      {text}
    </motion.span>
  )
}

function InteractiveTokenizer() {
  const { theme } = useTheme()
  const [inputText, setInputText] = useState(interactiveExamples.tokenization[0])
  const [hoveredTokenIndex, setHoveredTokenIndex] = useState(null)
  const [selectedExample, setSelectedExample] = useState(null)
  
  const tokens = useMemo(() => tokenizeText(inputText), [inputText])
  const wordTokens = tokens.filter(t => t.type === 'word')
  const punctuationTokens = tokens.filter(t => t.type === 'punctuation')

  const containerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: theme.spacing.lg,
  }

  const cardStyle = {
    backgroundColor: theme.colors.surface.base,
    borderRadius: theme.radii.large,
    padding: theme.spacing.xl,
    border: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`,
    marginBottom: theme.spacing.lg,
  }

  const labelStyle = {
    display: 'block',
    marginBottom: theme.spacing.sm,
    color: theme.colors.text.primary,
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.semibold,
  }

  const textareaStyle = {
    width: '100%',
    minHeight: '100px',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface.raised,
    color: theme.colors.text.primary,
    border: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`,
    borderRadius: theme.radii.medium,
    fontSize: theme.typography.size.body,
    fontFamily: theme.typography.family.primary,
    resize: 'vertical',
    outline: 'none',
    transition: theme.transitions.default,
  }

  const statsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  }

  const statBoxStyle = {
    backgroundColor: theme.colors.surface.raised,
    padding: theme.spacing.md,
    borderRadius: theme.radii.medium,
    textAlign: 'center',
    border: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`,
  }

  const statNumberStyle = {
    fontSize: theme.typography.size.heading3,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.primary.main,
    marginBottom: theme.spacing.xs,
  }

  const statLabelStyle = {
    fontSize: theme.typography.size.bodySmall,
    color: theme.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  }

  const tokensDisplayStyle = {
    backgroundColor: theme.colors.surface.raised,
    borderRadius: theme.radii.medium,
    padding: theme.spacing.lg,
    minHeight: '120px',
    border: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: theme.spacing.xs,
  }

  const exampleButtonStyle = (isSelected) => ({
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    backgroundColor: isSelected 
      ? theme.colors.primary.main 
      : theme.colors.surface.raised,
    color: isSelected 
      ? '#ffffff' 
      : theme.colors.text.secondary,
    border: `${theme.borderWidth.thin} solid ${
      isSelected ? theme.colors.primary.main : theme.colors.border.light
    }`,
    borderRadius: theme.radii.full,
    fontSize: theme.typography.size.bodySmall,
    fontWeight: theme.typography.weight.medium,
    cursor: 'pointer',
    transition: theme.transitions.default,
  })

  const handleExampleClick = (example, index) => {
    setInputText(example)
    setSelectedExample(index)
    setHoveredTokenIndex(null)
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Input Area */}
        <div>
          <label style={labelStyle}>
            Enter text to tokenize:
          </label>
          <textarea
            style={textareaStyle}
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value)
              setSelectedExample(null)
            }}
            placeholder="Type or paste text here..."
            onFocus={(e) => {
              e.target.style.borderColor = theme.colors.primary.main
            }}
            onBlur={(e) => {
              e.target.style.borderColor = theme.colors.border.light
            }}
          />
        </div>

        {/* Quick Examples */}
        <div style={{ marginTop: theme.spacing.lg }}>
          <label style={labelStyle}>
            Try these examples:
          </label>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: theme.spacing.sm,
          }}>
            {interactiveExamples.tokenization.map((example, index) => (
              <motion.button
                key={index}
                style={exampleButtonStyle(selectedExample === index)}
                onClick={() => handleExampleClick(example, index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {example.length > 30 ? example.substring(0, 30) + '...' : example}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div style={statsContainerStyle}>
          <motion.div
            style={statBoxStyle}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div style={statNumberStyle}>{tokens.length}</div>
            <div style={statLabelStyle}>Total Tokens</div>
          </motion.div>
          <motion.div
            style={statBoxStyle}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div style={statNumberStyle}>{wordTokens.length}</div>
            <div style={statLabelStyle}>Words</div>
          </motion.div>
          <motion.div
            style={statBoxStyle}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div style={statNumberStyle}>{punctuationTokens.length}</div>
            <div style={statLabelStyle}>Punctuation</div>
          </motion.div>
          <motion.div
            style={statBoxStyle}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div style={statNumberStyle}>{inputText.length}</div>
            <div style={statLabelStyle}>Characters</div>
          </motion.div>
        </div>

        {/* Tokens Display */}
        <div>
          <label style={labelStyle}>
            Tokenized Output:
          </label>
          <motion.div
            style={tokensDisplayStyle}
            variants={staggerChildren.container}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="popLayout">
              {tokens.length === 0 ? (
                <motion.p
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    color: theme.colors.text.tertiary,
                    fontSize: theme.typography.size.body,
                    fontStyle: 'italic',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Enter text above to see tokens...
                </motion.p>
              ) : (
                tokens.map((token, index) => (
                  <Token
                    key={`${token.text}-${index}`}
                    token={token}
                    index={index}
                    isHighlighted={hoveredTokenIndex === index}
                    onHover={setHoveredTokenIndex}
                    theme={theme}
                  />
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Hover Info */}
        {hoveredTokenIndex !== null && (
          <motion.div
            style={{
              marginTop: theme.spacing.md,
              padding: theme.spacing.sm,
              backgroundColor: theme.colors.primary.light + '15',
              borderRadius: theme.radii.small,
              borderLeft: `3px solid ${theme.colors.primary.main}`,
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p style={{
              margin: 0,
              fontSize: theme.typography.size.bodySmall,
              color: theme.colors.text.secondary,
            }}>
              <strong>Token {hoveredTokenIndex + 1}:</strong>{' '}
              "{tokens[hoveredTokenIndex].text}" • Type: {tokens[hoveredTokenIndex].type}
            </p>
          </motion.div>
        )}
      </div>

      {/* Info Box */}
      <motion.div
        style={{
          padding: theme.spacing.lg,
          backgroundColor: theme.colors.surface.raised,
          borderRadius: theme.radii.medium,
          border: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h4 style={{
          fontSize: theme.typography.size.heading6,
          fontWeight: theme.typography.weight.semibold,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.sm,
        }}>
          💡 Understanding the Output
        </h4>
        <p style={{
          fontSize: theme.typography.size.bodySmall,
          color: theme.colors.text.secondary,
          margin: 0,
          lineHeight: '1.6',
        }}>
          This is a simplified word-level tokenizer. Real LLMs use more sophisticated methods 
          like Byte-Pair Encoding (BPE) or WordPiece that can break words into subword units. 
          This helps handle rare words, typos, and words in multiple languages more effectively.
        </p>
      </motion.div>
    </div>
  )
}

export default InteractiveTokenizer
