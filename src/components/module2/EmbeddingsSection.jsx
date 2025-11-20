/**
 * EmbeddingsSection Component
 * 
 * Educational section explaining embeddings with gender-specific content,
 * visual demonstrations, and the embedding space visualization.
 * 
 * @component
 */

import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import { embeddingsContent } from '../../data/module2Content'
import EmbeddingSpaceViz from './EmbeddingSpaceViz'

function EmbeddingsSection() {
  const { theme, themeName } = useTheme()
  const content = embeddingsContent[themeName] || embeddingsContent.male

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

  const codeBlockStyle = {
    backgroundColor: theme.colors.surface.base,
    padding: theme.spacing.md,
    borderRadius: theme.radii.small,
    fontFamily: theme.typography.family.mono,
    fontSize: theme.typography.size.bodySmall,
    color: theme.colors.primary.main,
    whiteSpace: 'pre-line',
    marginTop: theme.spacing.md,
    border: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`,
  }

  const exampleItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
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

      {/* Vector Space Concept */}
      <motion.div
        style={sectionStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 style={headingStyle}>{content.vectors.title}</h3>
        
        <div style={cardStyle}>
          <p style={textStyle}>{content.vectors.concept}</p>
          
          <div style={codeBlockStyle}>
            {content.vectors.example}
          </div>
        </div>
      </motion.div>

      {/* Interactive Visualization */}
      <motion.div
        style={sectionStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 style={subheadingStyle}>Explore the Embedding Space</h3>
        <p style={textStyle}>
          Click on words to see their relationships in the vector space. Words with similar 
          meanings cluster together!
        </p>
        <EmbeddingSpaceViz />
      </motion.div>

      {/* Similarity Explanation */}
      <motion.div
        style={sectionStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 style={headingStyle}>{content.similarity.title}</h3>
        
        <div style={cardStyle}>
          <p style={textStyle}>{content.similarity.explanation}</p>
          
          <h4 style={{
            fontSize: theme.typography.size.heading6,
            fontWeight: theme.typography.weight.semibold,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.md,
            marginTop: theme.spacing.lg,
          }}>
            Examples of Semantic Similarity:
          </h4>
          
          {content.similarity.examples.map((example, index) => (
            <motion.div
              key={index}
              style={exampleItemStyle}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
            >
              <span style={{
                fontSize: theme.typography.size.heading6,
                color: theme.colors.primary.main,
              }}>
                •
              </span>
              <span style={{
                fontSize: theme.typography.size.body,
                color: theme.colors.text.secondary,
              }}>
                {example}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Mathematical Insight */}
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
          🔢 The Math Behind It
        </h4>
        <p style={{
          fontSize: theme.typography.size.body,
          color: theme.colors.text.primary,
          margin: 0,
          lineHeight: '1.7',
        }}>
          Embeddings typically have hundreds of dimensions (often 768, 1024, or more). We use 
          cosine similarity to measure how alike two words are: similarity = (A · B) / (||A|| × ||B||). 
          A result close to 1 means very similar, close to 0 means unrelated, and negative values 
          mean opposite meanings.
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
          Embeddings are the bridge between human language and machine learning. By converting 
          words into numerical vectors, LLMs can perform mathematical operations on meaning itself—
          enabling them to understand context, find relationships, and generate coherent text. 
          The positioning of words in embedding space reflects their semantic relationships learned 
          from vast amounts of text data.
        </p>
      </motion.div>
    </div>
  )
}

export default EmbeddingsSection
