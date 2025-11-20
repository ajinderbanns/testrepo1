/**
 * InferenceVisualization Component
 * 
 * Real-time demonstration of inference process showing prompt processing,
 * token generation, and output creation with step-by-step explanations.
 * 
 * @component
 */

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import { inferenceExamples } from '../../data/module3Content'

function InferenceVisualization() {
  const { theme, themeName } = useTheme()
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentTokenIndex, setCurrentTokenIndex] = useState(0)
  const [generatedTokens, setGeneratedTokens] = useState([])
  const [showExplanation, setShowExplanation] = useState(true)
  
  const gender = themeName === 'female' ? 'female' : 'male'
  const example = inferenceExamples[gender]

  // Auto-generate tokens
  useEffect(() => {
    if (!isGenerating || currentTokenIndex >= example.steps.length) {
      if (currentTokenIndex >= example.steps.length) {
        setIsGenerating(false)
      }
      return
    }

    const timer = setTimeout(() => {
      const nextToken = example.steps[currentTokenIndex]
      setGeneratedTokens(prev => [...prev, nextToken])
      setCurrentTokenIndex(prev => prev + 1)
    }, 800)

    return () => clearTimeout(timer)
  }, [isGenerating, currentTokenIndex, example.steps])

  const handleStart = () => {
    setIsGenerating(true)
    setCurrentTokenIndex(0)
    setGeneratedTokens([])
  }

  const handlePause = () => {
    setIsGenerating(false)
  }

  const handleReset = () => {
    setIsGenerating(false)
    setCurrentTokenIndex(0)
    setGeneratedTokens([])
  }

  const getProbabilityColor = (probability) => {
    if (probability >= 0.9) return theme.colors.state.success.main
    if (probability >= 0.75) return theme.colors.accent.main
    return theme.colors.state.warning.main
  }

  return (
    <div style={{
      width: '100%',
      maxWidth: '1000px',
      margin: '0 auto',
    }}>
      {/* Header */}
      <div style={{
        marginBottom: theme.spacing.xl,
        textAlign: 'center',
      }}>
        <h3 style={{
          fontSize: theme.typography.size.heading3,
          fontWeight: theme.typography.weight.bold,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.md,
        }}>
          Step-by-Step Text Generation
        </h3>
        <p style={{
          fontSize: theme.typography.size.body,
          color: theme.colors.text.secondary,
          lineHeight: '1.7',
        }}>
          Watch how the model generates text one token at a time
        </p>
      </div>

      {/* Prompt Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          backgroundColor: theme.colors.surface.raised,
          borderRadius: theme.radii.large,
          padding: theme.spacing.xl,
          marginBottom: theme.spacing.xl,
          boxShadow: theme.shadows.medium,
        }}
      >
        <div style={{
          fontSize: theme.typography.size.bodySmall,
          color: theme.colors.text.tertiary,
          marginBottom: theme.spacing.sm,
          fontWeight: theme.typography.weight.semibold,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          User Prompt
        </div>
        <div style={{
          fontSize: theme.typography.size.heading5,
          color: theme.colors.text.primary,
          fontWeight: theme.typography.weight.medium,
          padding: theme.spacing.md,
          backgroundColor: theme.colors.surface.base,
          borderRadius: theme.radii.medium,
          borderLeft: `4px solid ${theme.colors.primary.main}`,
        }}>
          {example.prompt}
        </div>
      </motion.div>

      {/* Generated Output */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          backgroundColor: theme.colors.surface.raised,
          borderRadius: theme.radii.large,
          padding: theme.spacing.xl,
          marginBottom: theme.spacing.xl,
          boxShadow: theme.shadows.medium,
          minHeight: '200px',
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: theme.spacing.lg,
        }}>
          <div style={{
            fontSize: theme.typography.size.bodySmall,
            color: theme.colors.text.tertiary,
            fontWeight: theme.typography.weight.semibold,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            Generated Output
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.sm,
          }}>
            <span style={{
              fontSize: theme.typography.size.bodySmall,
              color: theme.colors.text.secondary,
            }}>
              Tokens: {generatedTokens.length} / {example.steps.length}
            </span>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.xs,
              fontSize: theme.typography.size.bodySmall,
              color: theme.colors.text.secondary,
              cursor: 'pointer',
            }}>
              <input
                type="checkbox"
                checked={showExplanation}
                onChange={(e) => setShowExplanation(e.target.checked)}
                style={{ cursor: 'pointer' }}
              />
              Show explanations
            </label>
          </div>
        </div>

        {/* Token Display */}
        <div style={{
          padding: theme.spacing.lg,
          backgroundColor: theme.colors.surface.base,
          borderRadius: theme.radii.medium,
          minHeight: '120px',
          fontSize: theme.typography.size.body,
          lineHeight: '2',
          fontFamily: theme.typography.family.mono,
        }}>
          <AnimatePresence>
            {generatedTokens.map((tokenData, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                  display: 'inline-block',
                  position: 'relative',
                  color: theme.colors.text.primary,
                  marginRight: tokenData.token === ' ' ? '0' : '2px',
                }}
              >
                <span style={{
                  backgroundColor: `${getProbabilityColor(tokenData.probability)}20`,
                  padding: '2px 4px',
                  borderRadius: theme.radii.small,
                  borderBottom: `2px solid ${getProbabilityColor(tokenData.probability)}`,
                }}
                title={`Probability: ${(tokenData.probability * 100).toFixed(0)}%`}
                >
                  {tokenData.token}
                </span>
                {showExplanation && index === generatedTokens.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      marginTop: theme.spacing.sm,
                      padding: theme.spacing.sm,
                      backgroundColor: theme.colors.surface.overlay,
                      color: theme.colors.text.primary,
                      fontSize: theme.typography.size.bodySmall,
                      borderRadius: theme.radii.small,
                      boxShadow: theme.shadows.medium,
                      whiteSpace: 'nowrap',
                      zIndex: 10,
                      maxWidth: '300px',
                      fontFamily: theme.typography.family.primary,
                    }}
                  >
                    <div style={{
                      color: getProbabilityColor(tokenData.probability),
                      fontWeight: theme.typography.weight.bold,
                      marginBottom: theme.spacing.xxs,
                    }}>
                      {(tokenData.probability * 100).toFixed(0)}% confidence
                    </div>
                    <div style={{
                      whiteSpace: 'normal',
                      lineHeight: '1.4',
                    }}>
                      {tokenData.explanation}
                    </div>
                  </motion.div>
                )}
              </motion.span>
            ))}
            {isGenerating && (
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '1em',
                  backgroundColor: theme.colors.primary.main,
                  marginLeft: '2px',
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Controls */}
      <div style={{
        display: 'flex',
        gap: theme.spacing.md,
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: theme.spacing.xl,
      }}>
        <motion.button
          onClick={isGenerating ? handlePause : handleStart}
          disabled={currentTokenIndex >= example.steps.length && !isGenerating}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
            backgroundColor: theme.colors.primary.main,
            color: theme.colors.primary.contrast,
            border: 'none',
            borderRadius: theme.radii.medium,
            fontSize: theme.typography.size.body,
            fontWeight: theme.typography.weight.semibold,
            cursor: 'pointer',
            boxShadow: theme.shadows.small,
            opacity: (currentTokenIndex >= example.steps.length && !isGenerating) ? 0.5 : 1,
          }}
        >
          {isGenerating ? '⏸ Pause' : currentTokenIndex === 0 ? '▶ Start Generation' : '▶ Resume'}
        </motion.button>
        <motion.button
          onClick={handleReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
            backgroundColor: 'transparent',
            color: theme.colors.text.primary,
            border: `${theme.borderWidth.thin} solid ${theme.colors.border.default}`,
            borderRadius: theme.radii.medium,
            fontSize: theme.typography.size.body,
            fontWeight: theme.typography.weight.semibold,
            cursor: 'pointer',
          }}
        >
          ↻ Reset
        </motion.button>
      </div>

      {/* Probability Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{
          backgroundColor: theme.colors.surface.raised,
          borderRadius: theme.radii.large,
          padding: theme.spacing.lg,
          boxShadow: theme.shadows.small,
        }}
      >
        <h4 style={{
          fontSize: theme.typography.size.heading6,
          fontWeight: theme.typography.weight.semibold,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.md,
        }}>
          Understanding Probabilities
        </h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: theme.spacing.md,
        }}>
          {[
            { range: '90-100%', color: theme.colors.state.success.main, label: 'High confidence', desc: 'Very likely choice' },
            { range: '75-89%', color: theme.colors.accent.main, label: 'Good confidence', desc: 'Likely choice' },
            { range: 'Below 75%', color: theme.colors.state.warning.main, label: 'Lower confidence', desc: 'Less certain' },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: theme.spacing.sm,
              }}
            >
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: theme.radii.small,
                backgroundColor: `${item.color}40`,
                border: `2px solid ${item.color}`,
                flexShrink: 0,
                marginTop: '2px',
              }} />
              <div>
                <div style={{
                  fontSize: theme.typography.size.bodySmall,
                  fontWeight: theme.typography.weight.semibold,
                  color: theme.colors.text.primary,
                }}>
                  {item.label}
                </div>
                <div style={{
                  fontSize: theme.typography.size.caption,
                  color: theme.colors.text.tertiary,
                }}>
                  {item.range} - {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default InferenceVisualization
