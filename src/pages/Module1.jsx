import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import {
  TextCompletionPlayground,
  PromptVariationDemo,
  SentenceBuilderExercise,
} from '../components/module1'
import '../styles/modules/Module1Playgrounds.css'

function Module1() {
  const { theme } = useTheme()

  return (
    <div 
      className="module-page"
      style={{
        minHeight: '100vh',
        backgroundColor: theme.colors.background.primary,
        padding: theme.spacing.xl,
      }}
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          marginBottom: theme.spacing.xxl,
        }}
      >
        <h1 style={{
          fontSize: theme.typography.size.h1,
          fontWeight: theme.typography.weight.bold,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.md,
        }}>
          Module 1: Introduction to LLMs
        </h1>
        <p style={{
          fontSize: theme.typography.size.bodyLarge,
          color: theme.colors.text.secondary,
          lineHeight: '1.6',
          maxWidth: '800px',
        }}>
          Learn the basics of Large Language Models through interactive examples 
          and hands-on exercises. Explore how LLMs generate text, understand 
          the importance of prompt engineering, and build your intuition about 
          how these powerful AI systems work.
        </p>
      </motion.div>

      {/* Interactive Components Container */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.xxl,
        }}
      >
        {/* Text Completion Playground */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <TextCompletionPlayground />
        </motion.div>

        {/* Prompt Variation Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <PromptVariationDemo />
        </motion.div>

        {/* Sentence Builder Exercise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SentenceBuilderExercise />
        </motion.div>
      </div>

      {/* Navigation Footer */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="module-navigation"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          marginTop: theme.spacing.xxl,
          paddingTop: theme.spacing.xl,
          borderTop: `${theme.borderWidth.thin} solid ${theme.colors.border.default}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: theme.spacing.md,
        }}
      >
        <Link 
          to="/learn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.xs,
            color: theme.colors.text.link,
            textDecoration: 'none',
            fontSize: theme.typography.size.body,
            fontWeight: theme.typography.weight.medium,
            transition: theme.transitions.default,
          }}
        >
          ← Back to Dashboard
        </Link>

        <div style={{
          fontSize: theme.typography.size.bodySmall,
          color: theme.colors.text.tertiary,
        }}>
          Module 1 of 3
        </div>
      </motion.nav>
    </div>
  )
}

export default Module1
