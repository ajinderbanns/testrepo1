/**
 * AttentionViz Component
 * 
 * Wrapper for the AttentionHeatmap visualization with Module 2 specific examples.
 * Shows attention patterns between tokens in sample sentences.
 * 
 * @component
 */

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import AttentionHeatmap from '../../visualizations/AttentionHeatmap'
import { interactiveExamples } from '../../data/module2Content'

function AttentionViz() {
  const { theme } = useTheme()
  const [selectedExample, setSelectedExample] = useState(0)
  
  const examples = interactiveExamples.attention
  const currentExample = examples[selectedExample]

  // Tokenize the sentence
  const tokens = currentExample.sentence
    .replace(/[.,!?]/g, ' $& ')
    .split(' ')
    .filter(t => t.trim())

  const containerStyle = {
    backgroundColor: theme.colors.surface.raised,
    borderRadius: theme.radii.large,
    padding: theme.spacing.xl,
    border: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`,
  }

  const buttonStyle = (isSelected) => ({
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    backgroundColor: isSelected 
      ? theme.colors.primary.main 
      : theme.colors.surface.base,
    color: isSelected 
      ? '#ffffff' 
      : theme.colors.text.primary,
    border: `${theme.borderWidth.thin} solid ${
      isSelected ? theme.colors.primary.main : theme.colors.border.light
    }`,
    borderRadius: theme.radii.medium,
    fontSize: theme.typography.size.bodySmall,
    fontWeight: theme.typography.weight.medium,
    cursor: 'pointer',
    transition: theme.transitions.default,
    textAlign: 'left',
  })

  const descriptionStyle = {
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.primary.light + '10',
    borderRadius: theme.radii.small,
    borderLeft: `3px solid ${theme.colors.primary.main}`,
  }

  return (
    <div style={containerStyle}>
      {/* Example Selector */}
      <div style={{ marginBottom: theme.spacing.lg }}>
        <label style={{
          display: 'block',
          marginBottom: theme.spacing.sm,
          color: theme.colors.text.primary,
          fontSize: theme.typography.size.body,
          fontWeight: theme.typography.weight.semibold,
        }}>
          Choose an example sentence:
        </label>
        <div style={{
          display: 'grid',
          gap: theme.spacing.sm,
          gridTemplateColumns: '1fr',
        }}>
          {examples.map((example, index) => (
            <motion.button
              key={index}
              style={buttonStyle(selectedExample === index)}
              onClick={() => setSelectedExample(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div style={{
                fontSize: theme.typography.size.body,
                fontWeight: theme.typography.weight.medium,
                marginBottom: theme.spacing.xs,
              }}>
                "{example.sentence}"
              </div>
              <div style={{
                fontSize: theme.typography.size.bodySmall,
                color: selectedExample === index 
                  ? 'rgba(255, 255, 255, 0.8)' 
                  : theme.colors.text.tertiary,
                fontStyle: 'italic',
              }}>
                {example.description}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Visualization */}
      <div style={{ marginBottom: theme.spacing.lg }}>
        <AttentionHeatmap
          tokens={tokens}
          pattern="focused"
          showControls={true}
        />
      </div>

      {/* Description */}
      <motion.div
        style={descriptionStyle}
        key={selectedExample}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p style={{
          margin: 0,
          fontSize: theme.typography.size.bodySmall,
          color: theme.colors.text.secondary,
          lineHeight: '1.6',
        }}>
          <strong style={{ color: theme.colors.text.primary }}>💡 What's happening: </strong>
          {currentExample.description}
        </p>
      </motion.div>

      {/* Instructions */}
      <div style={{
        marginTop: theme.spacing.md,
        padding: theme.spacing.sm,
        backgroundColor: theme.colors.surface.base,
        borderRadius: theme.radii.small,
        border: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`,
      }}>
        <p style={{
          margin: 0,
          fontSize: theme.typography.size.bodySmall,
          color: theme.colors.text.tertiary,
          textAlign: 'center',
        }}>
          Hover over cells to see attention scores • Darker colors = stronger attention
        </p>
      </div>
    </div>
  )
}

export default AttentionViz
