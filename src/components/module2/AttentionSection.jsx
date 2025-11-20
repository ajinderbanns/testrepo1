/**
 * AttentionSection Component
 * 
 * Educational section explaining attention mechanisms with gender-specific content,
 * visual demonstrations, and interactive attention heatmap.
 * 
 * @component
 */

import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import { attentionContent } from '../../data/module2Content'
import AttentionViz from './AttentionViz'

function AttentionSection() {
  const { theme, themeName } = useTheme()
  const content = attentionContent[themeName] || attentionContent.male

  const containerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: theme.spacing.lg,
  }

  const sectionStyle = {
    marginBottom: theme.spacing.xxl,
  }

  const headingStyle = {
    fontSize: theme.typography.size.heading3,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  }

  const subheadingStyle = {
    fontSize: theme.typography.size.heading5,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.xl,
  }

  const textStyle = {
    fontSize: theme.typography.size.body,
    color: theme.colors.text.secondary,
    lineHeight: '1.7',
    marginBottom: theme.spacing.lg,
  }

  const cardStyle = {
    backgroundColor: theme.colors.surface.raised,
    borderRadius: theme.radii.medium,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
    border: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`,
  }

  const analogyBoxStyle = {
    backgroundColor: theme.colors.primary.light + '15',
    borderLeft: `4px solid ${theme.colors.primary.main}`,
    borderRadius: theme.radii.small,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  }

  const formulaBoxStyle = {
    backgroundColor: theme.colors.surface.base,
    padding: theme.spacing.lg,
    borderRadius: theme.radii.small,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
    border: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`,
  }

  const exampleCardStyle = {
    backgroundColor: theme.colors.surface.base,
    borderRadius: theme.radii.small,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    border: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`,
  }

  return (
    <div style={containerStyle}>
      {/* Introduction */}
      <motion.div
        style={sectionStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 style={headingStyle}>{content.intro.title}</h2>
        <p style={textStyle}>{content.intro.description}</p>

        <div style={analogyBoxStyle}>
          <p style={{ ...textStyle, marginBottom: 0 }}>
            <strong style={{ color: theme.colors.primary.main }}>💡 Analogy: </strong>
            {content.intro.analogy}
          </p>
        </div>
      </motion.div>

      {/* Mechanism Explanation */}
      <motion.div
        style={sectionStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 style={headingStyle}>{content.mechanism.title}</h3>
        
        <div style={cardStyle}>
          <p style={textStyle}>{content.mechanism.concept}</p>
          
          <div style={formulaBoxStyle}>
            <p style={{
              fontFamily: theme.typography.family.mono,
              fontSize: theme.typography.size.body,
              color: theme.colors.primary.main,
              margin: 0,
              textAlign: 'center',
              fontWeight: theme.typography.weight.semibold,
            }}>
              {content.mechanism.formula}
            </p>
          </div>
          
          <p style={{
            ...textStyle,
            marginTop: theme.spacing.md,
            padding: theme.spacing.md,
            backgroundColor: theme.colors.surface.base,
            borderRadius: theme.radii.small,
            marginBottom: 0,
          }}>
            <strong>In simple terms: </strong>
            {content.mechanism.interpretation}
          </p>
        </div>
      </motion.div>

      {/* Interactive Visualization */}
      <motion.div
        style={sectionStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 style={subheadingStyle}>Visualize Attention</h3>
        <p style={textStyle}>
          See how different words pay attention to each other. Darker colors mean stronger 
          attention—the model is focusing more on those connections.
        </p>
        <AttentionViz />
      </motion.div>

      {/* Attention Patterns */}
      <motion.div
        style={sectionStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 style={headingStyle}>{content.patterns.title}</h3>
        
        {content.patterns.examples.map((example, index) => (
          <motion.div
            key={index}
            style={exampleCardStyle}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
          >
            <div style={{
              marginBottom: theme.spacing.md,
              padding: theme.spacing.sm,
              backgroundColor: theme.colors.surface.raised,
              borderRadius: theme.radii.small,
              borderLeft: `3px solid ${theme.colors.primary.main}`,
            }}>
              <p style={{
                fontFamily: theme.typography.family.mono,
                fontSize: theme.typography.size.body,
                color: theme.colors.text.primary,
                margin: 0,
                fontWeight: theme.typography.weight.medium,
              }}>
                "{example.sentence}"
              </p>
            </div>
            <p style={{
              fontSize: theme.typography.size.bodySmall,
              color: theme.colors.text.secondary,
              margin: 0,
              lineHeight: '1.6',
            }}>
              <strong style={{ color: theme.colors.text.primary }}>Focus: </strong>
              {example.focus}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Why It Matters */}
      <motion.div
        style={{
          ...cardStyle,
          backgroundColor: theme.colors.accent.light + '10',
          borderColor: theme.colors.accent.main,
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h4 style={{
          fontSize: theme.typography.size.heading6,
          fontWeight: theme.typography.weight.bold,
          color: theme.colors.accent.main,
          marginBottom: theme.spacing.md,
        }}>
          🎯 Why Attention Revolutionized NLP
        </h4>
        <p style={{
          fontSize: theme.typography.size.body,
          color: theme.colors.text.primary,
          margin: 0,
          lineHeight: '1.7',
        }}>
          Before attention mechanisms, models processed text sequentially and struggled with 
          long-range dependencies. Attention allows models to directly connect any two words 
          in a sentence, regardless of distance. This breakthrough enabled the creation of 
          powerful models like GPT and BERT that understand context in unprecedented ways.
        </p>
      </motion.div>

      {/* Key Takeaway */}
      <motion.div
        style={{
          ...cardStyle,
          backgroundColor: theme.colors.primary.light + '10',
          borderColor: theme.colors.primary.main,
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h4 style={{
          fontSize: theme.typography.size.heading6,
          fontWeight: theme.typography.weight.bold,
          color: theme.colors.primary.main,
          marginBottom: theme.spacing.md,
        }}>
          ✨ Key Takeaway
        </h4>
        <p style={{
          fontSize: theme.typography.size.body,
          color: theme.colors.text.primary,
          margin: 0,
          lineHeight: '1.7',
        }}>
          Attention mechanisms are the secret sauce that makes modern LLMs work. By allowing 
          the model to dynamically focus on relevant parts of the input, attention enables deep 
          understanding of context, relationships, and meaning. It's what allows ChatGPT to 
          remember what "it" refers to, understand nuance, and generate coherent multi-sentence 
          responses.
        </p>
      </motion.div>
    </div>
  )
}

export default AttentionSection
