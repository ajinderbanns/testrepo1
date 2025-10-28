import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import { module1Content } from '../../data/modules/module1'
import '../../styles/modules/WhatAreLLMs.css'

/**
 * ConceptBlock Component
 * 
 * Renders different types of content blocks (paragraphs, callouts, lists)
 * with appropriate styling and animations.
 */
const ConceptBlock = ({ block, gender, theme }) => {
  // Get gender-specific content
  const getContent = (contentObj) => {
    if (typeof contentObj === 'string') return contentObj
    return contentObj[gender] || contentObj.male
  }

  const blockStyles = {
    marginBottom: theme.spacing.lg,
    lineHeight: theme.typography.lineHeight.relaxed,
  }

  const paragraphStyles = {
    ...blockStyles,
    fontSize: theme.typography.size.bodyLarge,
    color: theme.colors.text.primary,
  }

  const calloutStyles = {
    ...blockStyles,
    padding: theme.spacing.lg,
    borderRadius: theme.radii.medium,
    border: `${theme.borderWidth.medium} solid ${theme.colors.border.accent}`,
    backgroundColor: theme.colors.surface.raised,
    fontSize: theme.typography.size.body,
  }

  const listStyles = {
    ...blockStyles,
    listStyle: 'none',
    padding: 0,
  }

  const listItemStyles = {
    marginBottom: theme.spacing.md,
    paddingLeft: theme.spacing.lg,
    position: 'relative',
    fontSize: theme.typography.size.body,
    color: theme.colors.text.primary,
  }

  switch (block.type) {
    case 'paragraph':
      return (
        <motion.p
          className="concept-block concept-block--paragraph"
          style={paragraphStyles}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {getContent(block.content)}
        </motion.p>
      )

    case 'callout':
      return (
        <motion.div
          className={`concept-block concept-block--callout concept-block--${block.emphasis}`}
          style={calloutStyles}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div dangerouslySetInnerHTML={{ __html: getContent(block.content) }} />
        </motion.div>
      )

    case 'list':
      return (
        <motion.ul
          className="concept-block concept-block--list"
          style={listStyles}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {block.items.map((item, index) => (
            <motion.li
              key={index}
              style={listItemStyles}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <span
                className="list-bullet"
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '0.25em',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: theme.colors.primary.main,
                }}
              />
              <div dangerouslySetInnerHTML={{ __html: getContent(item) }} />
            </motion.li>
          ))}
        </motion.ul>
      )

    default:
      return null
  }
}

ConceptBlock.propTypes = {
  block: PropTypes.object.isRequired,
  gender: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
}

/**
 * ExampleCard Component
 * 
 * Displays practical examples with hover animations
 */
const ExampleCard = ({ example, gender, theme, index }) => {
  const getContent = (contentObj) => {
    if (typeof contentObj === 'string') return contentObj
    return contentObj[gender] || contentObj.male
  }

  const cardStyles = {
    padding: theme.spacing.lg,
    borderRadius: theme.radii.large,
    backgroundColor: theme.colors.surface.base,
    border: `${theme.borderWidth.thin} solid ${theme.colors.border.default}`,
    marginBottom: theme.spacing.lg,
    cursor: 'default',
  }

  const titleStyles = {
    fontSize: theme.typography.size.heading5,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.primary.main,
    marginBottom: theme.spacing.sm,
  }

  const descriptionStyles = {
    fontSize: theme.typography.size.body,
    color: theme.colors.text.secondary,
    lineHeight: theme.typography.lineHeight.relaxed,
  }

  return (
    <motion.div
      className="example-card"
      style={cardStyles}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{
        scale: 1.02,
        boxShadow: theme.shadows.large,
        transition: { duration: 0.2 },
      }}
    >
      <h4 style={titleStyles}>{example.title}</h4>
      <p style={descriptionStyles}>{getContent(example.description)}</p>
    </motion.div>
  )
}

ExampleCard.propTypes = {
  example: PropTypes.object.isRequired,
  gender: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
}

/**
 * AnalogyCard Component
 * 
 * Displays analogies with hover states and visual emphasis
 */
const AnalogyCard = ({ analogy, gender, theme, index }) => {
  const getContent = (contentObj) => {
    if (typeof contentObj === 'string') return contentObj
    return contentObj[gender] || contentObj.male
  }

  const cardStyles = {
    padding: theme.spacing.xl,
    borderRadius: theme.radii.xlarge,
    background: `linear-gradient(135deg, ${theme.colors.primary.main}15, ${theme.colors.secondary.main}15)`,
    border: `${theme.borderWidth.medium} solid ${theme.colors.border.accent}`,
    marginBottom: theme.spacing.lg,
    position: 'relative',
    overflow: 'hidden',
  }

  const textStyles = {
    fontSize: theme.typography.size.bodyLarge,
    color: theme.colors.text.primary,
    lineHeight: theme.typography.lineHeight.relaxed,
    fontStyle: 'italic',
    position: 'relative',
    zIndex: 1,
  }

  const iconStyles = {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    fontSize: theme.typography.size.heading2,
    opacity: 0.1,
    zIndex: 0,
  }

  return (
    <motion.div
      className="analogy-card"
      style={cardStyles}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{
        scale: 1.03,
        borderColor: theme.colors.primary.main,
        boxShadow: `0 8px 24px ${theme.colors.primary.main}30`,
        transition: { duration: 0.3 },
      }}
    >
      <div style={iconStyles}>💡</div>
      <p style={textStyles}>{getContent(analogy.text)}</p>
    </motion.div>
  )
}

AnalogyCard.propTypes = {
  analogy: PropTypes.object.isRequired,
  gender: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
}

/**
 * WhatAreLLMs Component
 * 
 * Main component that renders the "What are LLMs?" section from Module 1.
 * Features gender-appropriate content, Framer Motion animations, and progressive reveal.
 * 
 * @component
 * @example
 * <WhatAreLLMs />
 */
function WhatAreLLMs({ className = '', ...props }) {
  const { theme, themeName } = useTheme()

  // Get the "What are LLMs?" section from module 1
  const sectionData = module1Content.sections.find(
    (section) => section.id === 'intro_what_are_llms'
  )

  if (!sectionData) {
    console.error('WhatAreLLMs: Section data not found')
    return null
  }

  // Determine gender for content selection
  const gender = themeName === 'female' ? 'female' : 'male'

  // Get gender-specific content
  const getContent = (contentObj) => {
    if (typeof contentObj === 'string') return contentObj
    return contentObj[gender] || contentObj.male
  }

  // Container styles
  const containerStyles = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: `${theme.spacing.xxl} ${theme.spacing.lg}`,
  }

  const headerStyles = {
    marginBottom: theme.spacing.xxl,
  }

  const titleStyles = {
    fontSize: theme.typography.size.heading1,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
    background: `linear-gradient(135deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  }

  const introductionStyles = {
    fontSize: theme.typography.size.bodyLarge,
    color: theme.colors.text.secondary,
    lineHeight: theme.typography.lineHeight.relaxed,
    marginBottom: theme.spacing.xl,
  }

  const sectionHeadingStyles = {
    fontSize: theme.typography.size.heading3,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.xxl,
    marginBottom: theme.spacing.lg,
  }

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  // Animation variants for children
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.section
      className={`what-are-llms ${className}`}
      style={containerStyles}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      {...props}
    >
      {/* Header Section */}
      <motion.header style={headerStyles} variants={itemVariants}>
        <motion.h1
          style={titleStyles}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {sectionData.title}
        </motion.h1>

        <motion.p
          style={introductionStyles}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {getContent(sectionData.introduction)}
        </motion.p>
      </motion.header>

      {/* Content Blocks Section */}
      <motion.div
        className="content-blocks"
        variants={itemVariants}
        style={{ marginBottom: theme.spacing.xxl }}
      >
        {sectionData.contentBlocks.map((block, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
          >
            <ConceptBlock block={block} gender={gender} theme={theme} />
          </motion.div>
        ))}
      </motion.div>

      {/* Examples Section */}
      {sectionData.examples && sectionData.examples.length > 0 && (
        <motion.div
          className="examples-section"
          variants={itemVariants}
          style={{ marginBottom: theme.spacing.xxl }}
        >
          <motion.h2
            style={sectionHeadingStyles}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            Real-World Examples
          </motion.h2>

          {sectionData.examples.map((example, index) => (
            <ExampleCard
              key={index}
              example={example}
              gender={gender}
              theme={theme}
              index={index}
            />
          ))}
        </motion.div>
      )}

      {/* Analogies Section */}
      {sectionData.analogies && sectionData.analogies.length > 0 && (
        <motion.div
          className="analogies-section"
          variants={itemVariants}
        >
          <motion.h2
            style={sectionHeadingStyles}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            Think of It This Way
          </motion.h2>

          {sectionData.analogies.map((analogy, index) => (
            <AnalogyCard
              key={index}
              analogy={analogy}
              gender={gender}
              theme={theme}
              index={index}
            />
          ))}
        </motion.div>
      )}

      {/* Learning Objectives (optional footer) */}
      {sectionData.metadata?.learningObjectives && (
        <motion.div
          className="learning-objectives"
          style={{
            marginTop: theme.spacing.xxl,
            padding: theme.spacing.lg,
            borderRadius: theme.radii.medium,
            backgroundColor: theme.colors.background.secondary,
            borderLeft: `${theme.borderWidth.heavy} solid ${theme.colors.primary.main}`,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.0 }}
        >
          <h3
            style={{
              fontSize: theme.typography.size.heading5,
              fontWeight: theme.typography.weight.semibold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.sm,
            }}
          >
            What You'll Learn
          </h3>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            {sectionData.metadata.learningObjectives.map((objective, index) => (
              <motion.li
                key={index}
                style={{
                  fontSize: theme.typography.size.body,
                  color: theme.colors.text.secondary,
                  marginBottom: theme.spacing.xs,
                  paddingLeft: theme.spacing.md,
                  position: 'relative',
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 2.2 + index * 0.1 }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    color: theme.colors.primary.main,
                  }}
                >
                  ✓
                </span>
                {objective}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.section>
  )
}

WhatAreLLMs.propTypes = {
  /** Additional CSS classes */
  className: PropTypes.string,
}

export default WhatAreLLMs
