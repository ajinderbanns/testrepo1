/**
 * ArchitectureVisualization Component
 * 
 * Simplified transformer architecture diagram with animated information flow
 * through layers. Shows high-level blocks with attention and feed-forward networks.
 * 
 * @component
 */

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import { architectureConfig } from '../../data/module3Content'

function ArchitectureVisualization() {
  const { theme } = useTheme()
  const [activeLayer, setActiveLayer] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [flowProgress, setFlowProgress] = useState(0)

  // Auto-animate information flow
  useEffect(() => {
    if (!isAnimating) return

    const interval = setInterval(() => {
      setFlowProgress((prev) => {
        const next = prev + 1
        if (next > architectureConfig.layers.length) {
          return 0
        }
        return next
      })
    }, architectureConfig.flowAnimation.stagger)

    return () => clearInterval(interval)
  }, [isAnimating])

  const handleStart = () => {
    setIsAnimating(true)
    setFlowProgress(0)
  }

  const handleStop = () => {
    setIsAnimating(false)
  }

  const handleReset = () => {
    setIsAnimating(false)
    setFlowProgress(0)
    setActiveLayer(null)
  }

  const getLayerColor = (layer) => {
    switch (layer.color) {
      case 'primary':
        return theme.colors.primary.main
      case 'accent':
        return theme.colors.accent.main
      case 'success':
        return theme.colors.state.success.main
      case 'warning':
        return theme.colors.state.warning.main
      default:
        return theme.colors.primary.main
    }
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
          Transformer Architecture
        </h3>
        <p style={{
          fontSize: theme.typography.size.body,
          color: theme.colors.text.secondary,
          lineHeight: '1.7',
        }}>
          See how information flows through the layers of a transformer model
        </p>
      </div>

      {/* Architecture Diagram */}
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
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.lg,
          position: 'relative',
        }}>
          {architectureConfig.layers.map((layer, index) => {
            const isActive = flowProgress === index + 1
            const isPassed = flowProgress > index + 1
            const layerColor = getLayerColor(layer)

            return (
              <React.Fragment key={index}>
                {/* Connection Line */}
                {index > 0 && (
                  <div style={{
                    position: 'relative',
                    height: '40px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <div style={{
                      width: '3px',
                      height: '100%',
                      backgroundColor: isPassed 
                        ? theme.colors.primary.main 
                        : theme.colors.border.light,
                      transition: 'background-color 0.5s ease',
                    }} />
                    {/* Animated flow particle */}
                    {isActive && (
                      <motion.div
                        initial={{ top: 0 }}
                        animate={{ top: '100%' }}
                        transition={{ duration: 0.3, ease: 'linear' }}
                        style={{
                          position: 'absolute',
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: theme.colors.primary.main,
                          boxShadow: `0 0 15px ${theme.colors.primary.main}`,
                        }}
                      />
                    )}
                  </div>
                )}

                {/* Layer Block */}
                <motion.div
                  onClick={() => setActiveLayer(activeLayer === index ? null : index)}
                  onHoverStart={() => !isAnimating && setActiveLayer(index)}
                  onHoverEnd={() => !isAnimating && setActiveLayer(null)}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    backgroundColor: isActive || activeLayer === index
                      ? `${layerColor}20`
                      : theme.colors.surface.base,
                    border: `${theme.borderWidth.medium} solid ${
                      isActive || isPassed
                        ? layerColor
                        : theme.colors.border.light
                    }`,
                    borderRadius: theme.radii.large,
                    padding: theme.spacing.lg,
                    cursor: 'pointer',
                    transition: theme.transitions.default,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Pulse effect for active layer */}
                  {isActive && (
                    <motion.div
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: layerColor,
                        borderRadius: theme.radii.large,
                      }}
                    />
                  )}

                  <div style={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing.md,
                  }}>
                    {/* Layer Icon/Number */}
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: theme.radii.medium,
                      backgroundColor: isActive || isPassed ? layerColor : theme.colors.surface.raised,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isActive || isPassed ? '#ffffff' : theme.colors.text.secondary,
                      fontWeight: theme.typography.weight.bold,
                      fontSize: theme.typography.size.heading5,
                      flexShrink: 0,
                      transition: theme.transitions.default,
                    }}>
                      {index + 1}
                    </div>

                    {/* Layer Info */}
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontSize: theme.typography.size.heading6,
                        fontWeight: theme.typography.weight.bold,
                        color: theme.colors.text.primary,
                        marginBottom: theme.spacing.xs,
                      }}>
                        {layer.name}
                      </h4>
                      <p style={{
                        fontSize: theme.typography.size.bodySmall,
                        color: theme.colors.text.secondary,
                        lineHeight: '1.5',
                        margin: 0,
                      }}>
                        {layer.description}
                      </p>

                      {/* Special attention heads indicator */}
                      {layer.heads && (
                        <div style={{
                          marginTop: theme.spacing.sm,
                          display: 'flex',
                          gap: theme.spacing.xs,
                          flexWrap: 'wrap',
                        }}>
                          {Array.from({ length: layer.heads }).map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: isActive ? 1 : 0.5, scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                              style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: isActive ? layerColor : theme.colors.border.default,
                              }}
                            />
                          ))}
                          <span style={{
                            fontSize: theme.typography.size.caption,
                            color: theme.colors.text.tertiary,
                            marginLeft: theme.spacing.xs,
                          }}>
                            {layer.heads} attention heads
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: layerColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff',
                          fontSize: theme.typography.size.bodySmall,
                        }}
                      >
                        ⚡
                      </motion.div>
                    )}
                  </div>

                  {/* Expanded details */}
                  <AnimatePresence>
                    {activeLayer === index && !isAnimating && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          marginTop: theme.spacing.md,
                          paddingTop: theme.spacing.md,
                          borderTop: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`,
                        }}
                      >
                        <div style={{
                          fontSize: theme.typography.size.bodySmall,
                          color: theme.colors.text.secondary,
                          lineHeight: '1.6',
                        }}>
                          {layer.type === 'attention' && (
                            <p>
                              The attention mechanism allows the model to weigh the importance of different 
                              tokens when processing each position. Multiple attention heads enable the model 
                              to focus on different aspects simultaneously.
                            </p>
                          )}
                          {layer.type === 'feedforward' && (
                            <p>
                              The feed-forward network processes each token independently, applying learned 
                              transformations to extract features and patterns from the attention output.
                            </p>
                          )}
                          {layer.type === 'embedding' && (
                            <p>
                              Input tokens are converted into dense numerical vectors that capture semantic 
                              meaning. Similar words have similar embeddings.
                            </p>
                          )}
                          {layer.type === 'positional' && (
                            <p>
                              Positional encodings add information about token positions in the sequence, 
                              helping the model understand word order.
                            </p>
                          )}
                          {layer.type === 'output' && (
                            <p>
                              The final layer produces probability distributions over the vocabulary, 
                              determining which token is most likely to come next.
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </React.Fragment>
            )
          })}
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
          onClick={isAnimating ? handleStop : handleStart}
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
          }}
        >
          {isAnimating ? '⏸ Pause Flow' : '▶ Animate Flow'}
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

      {/* Information Box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{
          backgroundColor: theme.colors.surface.raised,
          borderRadius: theme.radii.large,
          padding: theme.spacing.xl,
          boxShadow: theme.shadows.small,
        }}
      >
        <h4 style={{
          fontSize: theme.typography.size.heading5,
          fontWeight: theme.typography.weight.bold,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.md,
        }}>
          How It Works Together
        </h4>
        <p style={{
          fontSize: theme.typography.size.body,
          color: theme.colors.text.secondary,
          lineHeight: '1.7',
          marginBottom: theme.spacing.md,
        }}>
          Each layer in the transformer builds on the previous one, creating increasingly sophisticated 
          representations of the input text. The attention mechanism is key - it allows the model to 
          dynamically focus on relevant parts of the input when processing each token.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: theme.spacing.md,
          marginTop: theme.spacing.lg,
        }}>
          {[
            { icon: '🔄', title: 'Parallel Processing', desc: 'All tokens processed simultaneously' },
            { icon: '🎯', title: 'Attention Focus', desc: 'Dynamically weighs token importance' },
            { icon: '📚', title: 'Deep Learning', desc: 'Multiple layers extract complex patterns' },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                padding: theme.spacing.md,
                backgroundColor: theme.colors.surface.base,
                borderRadius: theme.radii.medium,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2em', marginBottom: theme.spacing.sm }}>
                {item.icon}
              </div>
              <h5 style={{
                fontSize: theme.typography.size.bodyLarge,
                fontWeight: theme.typography.weight.semibold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.xs,
              }}>
                {item.title}
              </h5>
              <p style={{
                fontSize: theme.typography.size.bodySmall,
                color: theme.colors.text.secondary,
                margin: 0,
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default ArchitectureVisualization
