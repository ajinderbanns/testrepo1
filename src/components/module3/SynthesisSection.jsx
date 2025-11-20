/**
 * SynthesisSection Component
 * 
 * Final section that ties together concepts from all three modules,
 * showing how everything connects with interactive challenges.
 * 
 * @component
 */

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import { synthesisContent } from '../../data/module3Content'
import { useNavigate } from 'react-router-dom'

function SynthesisSection() {
  const { theme } = useTheme()
  const navigate = useNavigate()
  const [selectedConnection, setSelectedConnection] = useState(null)
  const [challengeStep, setChallengeStep] = useState(0)

  const handleChallengeNext = () => {
    if (challengeStep < synthesisContent.interactiveChallenge.stages.length - 1) {
      setChallengeStep(prev => prev + 1)
    }
  }

  const handleChallengeReset = () => {
    setChallengeStep(0)
  }

  const getModuleColor = (moduleNum) => {
    const colors = {
      1: theme.colors.primary.main,
      2: theme.colors.accent.main,
      3: theme.colors.state.success.main,
    }
    return colors[moduleNum] || theme.colors.primary.main
  }

  return (
    <div style={{
      width: '100%',
      maxWidth: '1000px',
      margin: '0 auto',
    }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          marginBottom: theme.spacing.xl,
          textAlign: 'center',
        }}
      >
        <h3 style={{
          fontSize: theme.typography.size.heading2,
          fontWeight: theme.typography.weight.bold,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.md,
        }}>
          Bringing It All Together
        </h3>
        <p style={{
          fontSize: theme.typography.size.bodyLarge,
          color: theme.colors.text.secondary,
          lineHeight: '1.7',
          maxWidth: '700px',
          margin: '0 auto',
        }}>
          You've learned about text generation, tokenization, attention, training, 
          inference, and architecture. Now let's see how these concepts connect.
        </p>
      </motion.div>

      {/* Concept Connections */}
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
        }}
      >
        <h4 style={{
          fontSize: theme.typography.size.heading4,
          fontWeight: theme.typography.weight.bold,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.lg,
        }}>
          How Concepts Connect
        </h4>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.md,
        }}>
          {synthesisContent.conceptConnections.map((item, index) => (
            <motion.div
              key={index}
              onClick={() => setSelectedConnection(selectedConnection === index ? null : index)}
              whileHover={{ scale: 1.01 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              style={{
                padding: theme.spacing.lg,
                backgroundColor: selectedConnection === index 
                  ? theme.colors.surface.base 
                  : 'transparent',
                border: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`,
                borderRadius: theme.radii.medium,
                cursor: 'pointer',
                transition: theme.transitions.default,
              }}
            >
              {/* Module badges */}
              <div style={{
                display: 'flex',
                gap: theme.spacing.xs,
                marginBottom: theme.spacing.sm,
              }}>
                {item.modules.map((moduleNum) => (
                  <span
                    key={moduleNum}
                    style={{
                      padding: `${theme.spacing.xxs} ${theme.spacing.sm}`,
                      backgroundColor: `${getModuleColor(moduleNum)}30`,
                      color: getModuleColor(moduleNum),
                      borderRadius: theme.radii.small,
                      fontSize: theme.typography.size.caption,
                      fontWeight: theme.typography.weight.semibold,
                    }}
                  >
                    Module {moduleNum}
                  </span>
                ))}
              </div>

              {/* Connection description */}
              <p style={{
                fontSize: theme.typography.size.body,
                color: theme.colors.text.primary,
                fontWeight: theme.typography.weight.medium,
                marginBottom: selectedConnection === index ? theme.spacing.md : 0,
                lineHeight: '1.6',
              }}>
                {item.connection}
              </p>

              {/* Expanded example */}
              {selectedConnection === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    padding: theme.spacing.md,
                    backgroundColor: theme.colors.surface.raised,
                    borderRadius: theme.radii.small,
                    borderLeft: `4px solid ${theme.colors.primary.main}`,
                  }}
                >
                  <div style={{
                    fontSize: theme.typography.size.bodySmall,
                    color: theme.colors.text.tertiary,
                    marginBottom: theme.spacing.xs,
                    fontWeight: theme.typography.weight.semibold,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    Example
                  </div>
                  <p style={{
                    fontSize: theme.typography.size.body,
                    color: theme.colors.text.secondary,
                    margin: 0,
                    lineHeight: '1.6',
                  }}>
                    {item.example}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Key Takeaways */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          backgroundColor: theme.colors.surface.raised,
          borderRadius: theme.radii.large,
          padding: theme.spacing.xl,
          marginBottom: theme.spacing.xl,
          boxShadow: theme.shadows.medium,
        }}
      >
        <h4 style={{
          fontSize: theme.typography.size.heading4,
          fontWeight: theme.typography.weight.bold,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.lg,
        }}>
          Key Takeaways
        </h4>

        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.md,
        }}>
          {synthesisContent.keyTakeaways.map((takeaway, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: theme.spacing.md,
                padding: theme.spacing.md,
                backgroundColor: theme.colors.surface.base,
                borderRadius: theme.radii.medium,
              }}
            >
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: theme.radii.full,
                backgroundColor: theme.colors.primary.main,
                color: theme.colors.primary.contrast,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: theme.typography.size.body,
                fontWeight: theme.typography.weight.bold,
                flexShrink: 0,
              }}>
                {index + 1}
              </div>
              <p style={{
                fontSize: theme.typography.size.body,
                color: theme.colors.text.primary,
                lineHeight: '1.6',
                margin: 0,
              }}>
                {takeaway}
              </p>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Interactive Challenge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        style={{
          backgroundColor: theme.colors.surface.raised,
          borderRadius: theme.radii.large,
          padding: theme.spacing.xl,
          marginBottom: theme.spacing.xl,
          boxShadow: theme.shadows.medium,
          border: `${theme.borderWidth.medium} solid ${theme.colors.primary.main}`,
        }}
      >
        <div style={{
          textAlign: 'center',
          marginBottom: theme.spacing.lg,
        }}>
          <h4 style={{
            fontSize: theme.typography.size.heading4,
            fontWeight: theme.typography.weight.bold,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.sm,
          }}>
            {synthesisContent.interactiveChallenge.title}
          </h4>
          <p style={{
            fontSize: theme.typography.size.body,
            color: theme.colors.text.secondary,
            lineHeight: '1.6',
          }}>
            {synthesisContent.interactiveChallenge.description}
          </p>
        </div>

        {/* Challenge Prompt */}
        <div style={{
          padding: theme.spacing.lg,
          backgroundColor: theme.colors.surface.base,
          borderRadius: theme.radii.medium,
          marginBottom: theme.spacing.lg,
          borderLeft: `4px solid ${theme.colors.primary.main}`,
        }}>
          <div style={{
            fontSize: theme.typography.size.bodySmall,
            color: theme.colors.text.tertiary,
            marginBottom: theme.spacing.xs,
            fontWeight: theme.typography.weight.semibold,
          }}>
            PROMPT
          </div>
          <div style={{
            fontSize: theme.typography.size.heading6,
            color: theme.colors.text.primary,
            fontWeight: theme.typography.weight.medium,
          }}>
            {synthesisContent.interactiveChallenge.prompt}
          </div>
        </div>

        {/* Challenge Steps */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.md,
          marginBottom: theme.spacing.lg,
        }}>
          {synthesisContent.interactiveChallenge.stages.map((stage, index) => {
            const isActive = index === challengeStep
            const isPassed = index < challengeStep

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0.5, scale: 0.98 }}
                animate={{ 
                  opacity: isActive ? 1 : isPassed ? 0.7 : 0.5,
                  scale: isActive ? 1 : 0.98,
                }}
                style={{
                  padding: theme.spacing.lg,
                  backgroundColor: isActive 
                    ? theme.colors.primary.light + '20'
                    : theme.colors.surface.base,
                  border: `${theme.borderWidth.medium} solid ${
                    isActive 
                      ? theme.colors.primary.main 
                      : theme.colors.border.light
                  }`,
                  borderRadius: theme.radii.medium,
                  transition: theme.transitions.default,
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.md,
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: theme.radii.full,
                    backgroundColor: isPassed 
                      ? theme.colors.state.success.main
                      : isActive 
                        ? theme.colors.primary.main 
                        : theme.colors.surface.raised,
                    color: isPassed || isActive ? '#ffffff' : theme.colors.text.secondary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: theme.typography.size.body,
                    fontWeight: theme.typography.weight.bold,
                    flexShrink: 0,
                  }}>
                    {isPassed ? '✓' : index + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: theme.typography.size.bodySmall,
                      color: theme.colors.text.tertiary,
                      textTransform: 'uppercase',
                      marginBottom: theme.spacing.xxs,
                      fontWeight: theme.typography.weight.semibold,
                    }}>
                      Stage: {stage.stage}
                    </div>
                    <div style={{
                      fontSize: theme.typography.size.body,
                      color: theme.colors.text.primary,
                      fontWeight: theme.typography.weight.medium,
                    }}>
                      {stage.question}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Challenge Controls */}
        <div style={{
          display: 'flex',
          gap: theme.spacing.md,
          justifyContent: 'center',
        }}>
          <motion.button
            onClick={handleChallengeNext}
            disabled={challengeStep >= synthesisContent.interactiveChallenge.stages.length - 1}
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
              cursor: challengeStep >= synthesisContent.interactiveChallenge.stages.length - 1 ? 'not-allowed' : 'pointer',
              opacity: challengeStep >= synthesisContent.interactiveChallenge.stages.length - 1 ? 0.5 : 1,
              boxShadow: theme.shadows.small,
            }}
          >
            Next Stage →
          </motion.button>
          <motion.button
            onClick={handleChallengeReset}
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
      </motion.div>

      {/* Congratulations / Next Steps */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        style={{
          backgroundColor: `${theme.colors.state.success.main}15`,
          borderRadius: theme.radii.large,
          padding: theme.spacing.xxl,
          textAlign: 'center',
          border: `${theme.borderWidth.medium} solid ${theme.colors.state.success.main}`,
        }}
      >
        <div style={{ fontSize: '3em', marginBottom: theme.spacing.md }}>
          🎉
        </div>
        <h4 style={{
          fontSize: theme.typography.size.heading3,
          fontWeight: theme.typography.weight.bold,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.md,
        }}>
          You've Completed Your LLM Journey!
        </h4>
        <p style={{
          fontSize: theme.typography.size.body,
          color: theme.colors.text.secondary,
          lineHeight: '1.7',
          maxWidth: '600px',
          margin: '0 auto',
          marginBottom: theme.spacing.xl,
        }}>
          You now have a comprehensive understanding of how Large Language Models work, 
          from the basics of text generation to the intricate details of transformer architecture. 
          This knowledge empowers you to use and understand these powerful AI systems more effectively.
        </p>
        <motion.button
          onClick={() => navigate('/learn')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: `${theme.spacing.md} ${theme.spacing.xxl}`,
            backgroundColor: theme.colors.primary.main,
            color: theme.colors.primary.contrast,
            border: 'none',
            borderRadius: theme.radii.medium,
            fontSize: theme.typography.size.bodyLarge,
            fontWeight: theme.typography.weight.bold,
            cursor: 'pointer',
            boxShadow: theme.shadows.large,
          }}
        >
          Return to Dashboard
        </motion.button>
      </motion.div>
    </div>
  )
}

export default SynthesisSection
