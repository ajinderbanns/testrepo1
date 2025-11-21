/**
 * PromptVariationDemo Component
 * 
 * Demonstrates how different prompt variations produce different outputs.
 * Shows 2-3 variations side-by-side to highlight the importance of prompt engineering.
 * 
 * Features:
 * - Side-by-side comparison view
 * - Quality indicators
 * - Gender-specific examples
 * - Interactive selection between examples
 * 
 * @component
 */

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import { useContent } from '../../hooks/useContent'
import { getExamplesByGender } from '../../data/module1Examples'
import Card from '../ui/Card'
import Button from '../ui/Button'

/**
 * Quality Badge Component
 */
const QualityBadge = ({ quality, theme }) => {
  const config = {
    basic: {
      label: 'Basic',
      color: theme.colors.state.warning.main,
      bg: theme.colors.state.warning.light || theme.colors.background.secondary,
    },
    detailed: {
      label: 'Detailed',
      color: theme.colors.accent.main,
      bg: theme.colors.accent.light || theme.colors.background.secondary,
    },
    excellent: {
      label: 'Excellent',
      color: theme.colors.state.success.main,
      bg: theme.colors.state.success.light || theme.colors.background.secondary,
    },
  }

  const { label, color, bg } = config[quality] || config.basic

  return (
    <span style={{
      display: 'inline-block',
      padding: `${theme.spacing.xxs} ${theme.spacing.sm}`,
      fontSize: theme.typography.size.caption,
      fontWeight: theme.typography.weight.semibold,
      color: color,
      backgroundColor: bg,
      borderRadius: theme.radii.small,
      border: `${theme.borderWidth.thin} solid ${color}`,
    }}>
      {label}
    </span>
  )
}

/**
 * Variation Card Component
 */
const VariationCard = ({ variation, index, theme, isRevealed }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.15 }}
      style={{
        flex: 1,
        minWidth: '280px',
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.surface.base,
        border: `${theme.borderWidth.medium} solid ${
          variation.quality === 'excellent' 
            ? theme.colors.state.success.main 
            : variation.quality === 'detailed'
            ? theme.colors.accent.main
            : theme.colors.border.default
        }`,
        borderRadius: theme.radii.large,
        transition: theme.transitions.default,
      }}
    >
      {/* Label and Quality Badge */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
      }}>
        <h4 style={{
          fontSize: theme.typography.size.bodyLarge,
          fontWeight: theme.typography.weight.bold,
          color: theme.colors.text.primary,
          margin: 0,
        }}>
          {variation.label}
        </h4>
        {isRevealed && <QualityBadge quality={variation.quality} theme={theme} />}
      </div>

      {/* Prompt */}
      <div style={{
        marginBottom: theme.spacing.md,
        padding: theme.spacing.sm,
        backgroundColor: theme.colors.background.secondary,
        borderRadius: theme.radii.medium,
        borderLeft: `3px solid ${theme.colors.primary.main}`,
      }}>
        <div style={{
          fontSize: theme.typography.size.caption,
          fontWeight: theme.typography.weight.semibold,
          color: theme.colors.text.secondary,
          marginBottom: theme.spacing.xs,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          Prompt:
        </div>
        <div style={{
          fontSize: theme.typography.size.bodySmall,
          color: theme.colors.text.primary,
          fontStyle: 'italic',
          lineHeight: '1.5',
        }}>
          "{variation.prompt}"
        </div>
      </div>

      {/* Output */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              marginTop: theme.spacing.md,
              padding: theme.spacing.md,
              backgroundColor: theme.colors.background.tertiary,
              borderRadius: theme.radii.medium,
            }}>
              <div style={{
                fontSize: theme.typography.size.caption,
                fontWeight: theme.typography.weight.semibold,
                color: theme.colors.text.secondary,
                marginBottom: theme.spacing.sm,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Output:
              </div>
              <div style={{
                fontSize: theme.typography.size.bodySmall,
                color: theme.colors.text.primary,
                lineHeight: '1.7',
                whiteSpace: 'pre-wrap',
              }}>
                {variation.output}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/**
 * Main PromptVariationDemo Component
 */
function PromptVariationDemo() {
  const { theme, themeName } = useTheme()
  const { getUIContent } = useContent()
  const [selectedExampleIndex, setSelectedExampleIndex] = useState(0)
  const [isRevealed, setIsRevealed] = useState(false)

  const gender = themeName === 'female' ? 'female' : 'male'
  const examples = getExamplesByGender(gender, 'variations')
  const currentExample = examples[selectedExampleIndex]
  const uiContent = getUIContent()

  /**
   * Handle example selection
   */
  const handleExampleSelect = (index) => {
    setSelectedExampleIndex(index)
    setIsRevealed(false)
  }

  /**
   * Handle reveal toggle
   */
  const handleReveal = () => {
    setIsRevealed(!isRevealed)
  }

  return (
    <Card className="prompt-variation-demo" padding="large">
      {/* Header */}
      <div style={{ marginBottom: theme.spacing.lg }}>
        <h3 style={{
          fontSize: theme.typography.size.h3,
          fontWeight: theme.typography.weight.bold,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.sm,
        }}>
          Prompt Variation Demo
        </h3>
        <p style={{
          fontSize: theme.typography.size.body,
          color: theme.colors.text.secondary,
          lineHeight: '1.6',
        }}>
          {currentExample.description}
        </p>
      </div>

      {/* Example Selector */}
      {examples.length > 1 && (
        <div style={{ 
          marginBottom: theme.spacing.xl,
          display: 'flex',
          gap: theme.spacing.sm,
          flexWrap: 'wrap',
        }}>
          {examples.map((example, index) => (
            <motion.button
              key={example.id}
              onClick={() => handleExampleSelect(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                fontSize: theme.typography.size.body,
                fontWeight: theme.typography.weight.semibold,
                color: selectedExampleIndex === index 
                  ? theme.colors.primary.contrast 
                  : theme.colors.text.primary,
                backgroundColor: selectedExampleIndex === index 
                  ? theme.colors.primary.main 
                  : theme.colors.surface.raised,
                border: `${theme.borderWidth.medium} solid ${
                  selectedExampleIndex === index 
                    ? theme.colors.primary.main 
                    : theme.colors.border.default
                }`,
                borderRadius: theme.radii.medium,
                cursor: 'pointer',
                transition: theme.transitions.default,
                boxShadow: selectedExampleIndex === index ? theme.shadows.small : 'none',
              }}
            >
              {example.title}
            </motion.button>
          ))}
        </div>
      )}

      {/* Variations Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedExampleIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          style={{
            display: 'flex',
            gap: theme.spacing.lg,
            marginBottom: theme.spacing.xl,
            flexWrap: 'wrap',
          }}
        >
          {currentExample.variations.map((variation, index) => (
            <VariationCard
              key={index}
              variation={variation}
              index={index}
              theme={theme}
              isRevealed={isRevealed}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: theme.spacing.md,
        marginBottom: theme.spacing.lg,
      }}>
        <Button
          variant="primary"
          onClick={handleReveal}
        >
          {isRevealed ? 'Hide Outputs' : 'Reveal Outputs'}
        </Button>
      </div>

      {/* Insight Box */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            style={{
              padding: theme.spacing.lg,
              backgroundColor: theme.colors.accent.light || theme.colors.background.secondary,
              borderLeft: `4px solid ${theme.colors.accent.main}`,
              borderRadius: theme.radii.medium,
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: theme.spacing.md,
            }}>
              <span style={{
                fontSize: theme.typography.size.h3,
                flexShrink: 0,
              }}>
                💡
              </span>
              <div>
                <h4 style={{
                  fontSize: theme.typography.size.bodyLarge,
                  fontWeight: theme.typography.weight.bold,
                  color: theme.colors.text.primary,
                  marginBottom: theme.spacing.xs,
                  marginTop: 0,
                }}>
                  Key Takeaway
                </h4>
                <p style={{
                  fontSize: theme.typography.size.body,
                  color: theme.colors.text.primary,
                  lineHeight: '1.6',
                  margin: 0,
                }}>
                  Notice how adding specificity, context, and clear requirements dramatically improves the quality
                  of LLM outputs. The more precise your prompt, the better the model can predict what you're looking for.
                  This is the foundation of "prompt engineering"—crafting inputs that get you closer to your desired outcome.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

export default PromptVariationDemo
