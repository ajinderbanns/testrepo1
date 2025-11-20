/**
 * TokenizationSection Component
 * 
 * Educational section explaining tokenization with gender-specific content,
 * visual demonstrations, and interactive examples.
 * 
 * @component
 */

import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import { tokenizationContent } from '../../data/module2Content'
import TokenizationViz from './TokenizationViz'

function TokenizationSection() {
  const { theme, themeName } = useTheme()
  const content = tokenizationContent[themeName] || tokenizationContent.male

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

  const stepListStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  }

  const stepItemStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.surface.base,
    borderRadius: theme.radii.small,
  }

  const stepNumberStyle = {
    backgroundColor: theme.colors.primary.main,
    color: '#ffffff',
    width: '28px',
    height: '28px',
    borderRadius: theme.radii.full,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: theme.typography.size.bodySmall,
    fontWeight: theme.typography.weight.bold,
    flexShrink: 0,
  }

  const exampleCardStyle = {
    backgroundColor: theme.colors.surface.base,
    borderRadius: theme.radii.small,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    border: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`,
  }

  const codeStyle = {
    fontFamily: theme.typography.family.mono,
    fontSize: theme.typography.size.bodySmall,
    backgroundColor: theme.colors.surface.raised,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radii.small,
    color: theme.colors.primary.main,
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

      {/* Visual Demo */}
      <motion.div
        style={sectionStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 style={subheadingStyle}>See It In Action</h3>
        <TokenizationViz />
      </motion.div>

      {/* Process Explanation */}
      <motion.div
        style={sectionStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 style={headingStyle}>{content.process.title}</h3>
        
        <div style={cardStyle}>
          <ul style={stepListStyle}>
            {content.process.steps.map((step, index) => (
              <motion.li
                key={index}
                style={stepItemStyle}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              >
                <div style={stepNumberStyle}>{index + 1}</div>
                <div style={{ flex: 1 }}>
                  <span style={{ 
                    color: theme.colors.text.primary, 
                    fontWeight: theme.typography.weight.medium 
                  }}>
                    {step}
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>

          <div style={{
            marginTop: theme.spacing.lg,
            padding: theme.spacing.md,
            backgroundColor: theme.colors.surface.base,
            borderRadius: theme.radii.small,
          }}>
            <p style={{
              fontSize: theme.typography.size.bodySmall,
              color: theme.colors.text.secondary,
              marginBottom: theme.spacing.xs,
              fontWeight: theme.typography.weight.semibold,
            }}>
              🔧 Technical Note:
            </p>
            <p style={{
              fontSize: theme.typography.size.bodySmall,
              color: theme.colors.text.secondary,
              margin: 0,
              lineHeight: '1.6',
            }}>
              {content.process.techNote}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Examples */}
      <motion.div
        style={sectionStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 style={subheadingStyle}>Real-World Examples</h3>
        
        {content.examples.map((example, index) => (
          <motion.div
            key={index}
            style={exampleCardStyle}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
          >
            <div style={{
              marginBottom: theme.spacing.sm,
              padding: theme.spacing.sm,
              backgroundColor: theme.colors.surface.raised,
              borderRadius: theme.radii.small,
              borderLeft: `3px solid ${theme.colors.primary.main}`,
            }}>
              <code style={codeStyle}>{example.text}</code>
            </div>
            <p style={{
              fontSize: theme.typography.size.bodySmall,
              color: theme.colors.text.tertiary,
              margin: 0,
              fontStyle: 'italic',
            }}>
              {example.context}
            </p>
          </motion.div>
        ))}
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
          Tokenization is the first critical step in how LLMs process text. By breaking language 
          into manageable pieces, models can understand and generate text efficiently. Different 
          tokenization strategies affect model performance, vocabulary size, and how well they 
          handle new or rare words.
        </p>
      </motion.div>
    </div>
  )
}

export default TokenizationSection
