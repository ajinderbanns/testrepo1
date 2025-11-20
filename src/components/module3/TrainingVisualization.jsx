/**
 * TrainingVisualization Component
 * 
 * Interactive visualization showing the training loop concept with accessible analogies.
 * Features animated feedback loops, improvement over time, and data flow visualization.
 * 
 * @component
 */

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import { trainingExamples } from '../../data/module3Content'

function TrainingVisualization() {
  const { theme, themeName } = useTheme()
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [accuracy, setAccuracy] = useState(20)
  const canvasRef = useRef(null)
  
  const gender = themeName === 'female' ? 'female' : 'male'
  const example = trainingExamples[gender]

  const trainingSteps = [
    { label: 'Data Input', description: 'Model receives examples from training data' },
    { label: 'Prediction', description: 'Model attempts to generate output' },
    { label: 'Comparison', description: 'Compare prediction with correct answer' },
    { label: 'Adjustment', description: 'Update model parameters to improve' },
  ]

  // Canvas animation for data flow
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !isAnimating) return

    const ctx = canvas.getContext('2d')
    const particles = []
    let animationId

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Particle class for flowing data
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = -10
        this.speed = 1 + Math.random() * 2
        this.size = 2 + Math.random() * 3
        this.opacity = 0.5 + Math.random() * 0.5
      }

      update() {
        this.y += this.speed
        if (this.y > canvas.height) {
          this.y = -10
          this.x = Math.random() * canvas.width
        }
      }

      draw(ctx) {
        ctx.fillStyle = `${theme.colors.primary.main}${Math.floor(this.opacity * 255).toString(16)}`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw(ctx)
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isAnimating, theme])

  // Auto-advance training steps
  useEffect(() => {
    if (!isAnimating) return

    const timer = setTimeout(() => {
      if (currentStep < trainingSteps.length - 1) {
        setCurrentStep(prev => prev + 1)
        // Increase accuracy gradually
        setAccuracy(prev => Math.min(95, prev + 15))
      } else {
        setCurrentStep(0)
        setAccuracy(prev => Math.min(95, prev + 5))
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [isAnimating, currentStep])

  const handleStart = () => {
    setIsAnimating(true)
    setCurrentStep(0)
    setAccuracy(20)
  }

  const handleStop = () => {
    setIsAnimating(false)
  }

  const handleReset = () => {
    setIsAnimating(false)
    setCurrentStep(0)
    setAccuracy(20)
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
          {example.title}
        </h3>
        <p style={{
          fontSize: theme.typography.size.body,
          color: theme.colors.text.secondary,
          lineHeight: '1.7',
        }}>
          {example.scenario}
        </p>
      </div>

      {/* Main Visualization */}
      <div style={{
        backgroundColor: theme.colors.surface.raised,
        borderRadius: theme.radii.large,
        padding: theme.spacing.xl,
        marginBottom: theme.spacing.xl,
        boxShadow: theme.shadows.medium,
      }}>
        {/* Training Loop Diagram */}
        <div style={{
          position: 'relative',
          minHeight: '400px',
          marginBottom: theme.spacing.xl,
        }}>
          {/* Canvas for particle effects */}
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: theme.radii.medium,
              opacity: isAnimating ? 0.6 : 0,
              transition: 'opacity 0.5s ease',
            }}
          />

          {/* Training Steps */}
          <div style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: theme.spacing.lg,
            zIndex: 1,
          }}>
            {trainingSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: currentStep === index && isAnimating ? 1.05 : 1,
                }}
                transition={{ delay: index * 0.1 }}
                style={{
                  backgroundColor: currentStep === index && isAnimating
                    ? theme.colors.primary.light + '40'
                    : theme.colors.surface.base,
                  padding: theme.spacing.lg,
                  borderRadius: theme.radii.medium,
                  border: `${theme.borderWidth.medium} solid ${
                    currentStep === index && isAnimating
                      ? theme.colors.primary.main
                      : theme.colors.border.light
                  }`,
                  textAlign: 'center',
                  transition: theme.transitions.default,
                }}
              >
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: theme.radii.full,
                  backgroundColor: currentStep === index && isAnimating
                    ? theme.colors.primary.main
                    : theme.colors.surface.raised,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  marginBottom: theme.spacing.md,
                  color: currentStep === index && isAnimating
                    ? theme.colors.primary.contrast
                    : theme.colors.text.secondary,
                  fontWeight: theme.typography.weight.bold,
                  fontSize: theme.typography.size.heading5,
                }}>
                  {index + 1}
                </div>
                <h4 style={{
                  fontSize: theme.typography.size.heading6,
                  fontWeight: theme.typography.weight.semibold,
                  color: theme.colors.text.primary,
                  marginBottom: theme.spacing.sm,
                }}>
                  {step.label}
                </h4>
                <p style={{
                  fontSize: theme.typography.size.bodySmall,
                  color: theme.colors.text.secondary,
                  lineHeight: '1.5',
                }}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Accuracy Meter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              marginTop: theme.spacing.xl,
              padding: theme.spacing.lg,
              backgroundColor: theme.colors.surface.base,
              borderRadius: theme.radii.medium,
              border: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`,
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: theme.spacing.sm,
            }}>
              <span style={{
                fontSize: theme.typography.size.body,
                color: theme.colors.text.primary,
                fontWeight: theme.typography.weight.semibold,
              }}>
                Model Accuracy
              </span>
              <span style={{
                fontSize: theme.typography.size.heading5,
                color: theme.colors.primary.main,
                fontWeight: theme.typography.weight.bold,
              }}>
                {accuracy}%
              </span>
            </div>
            <div style={{
              height: '12px',
              backgroundColor: theme.colors.surface.raised,
              borderRadius: theme.radii.full,
              overflow: 'hidden',
            }}>
              <motion.div
                initial={{ width: '20%' }}
                animate={{ width: `${accuracy}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: `linear-gradient(90deg, ${theme.colors.state.warning.main}, ${theme.colors.state.success.main})`,
                  borderRadius: theme.radii.full,
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Controls */}
        <div style={{
          display: 'flex',
          gap: theme.spacing.md,
          justifyContent: 'center',
          flexWrap: 'wrap',
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
            {isAnimating ? '⏸ Pause Training' : '▶ Start Training'}
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
      </div>

      {/* Example Data */}
      <div style={{
        backgroundColor: theme.colors.surface.raised,
        borderRadius: theme.radii.large,
        padding: theme.spacing.xl,
        boxShadow: theme.shadows.medium,
      }}>
        <h4 style={{
          fontSize: theme.typography.size.heading5,
          fontWeight: theme.typography.weight.bold,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.lg,
        }}>
          Training Data Examples
        </h4>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.md,
        }}>
          {example.dataExamples.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                padding: theme.spacing.md,
                backgroundColor: theme.colors.surface.base,
                borderRadius: theme.radii.medium,
                borderLeft: `4px solid ${theme.colors.primary.main}`,
              }}
            >
              <div style={{
                fontSize: theme.typography.size.bodySmall,
                color: theme.colors.text.tertiary,
                marginBottom: theme.spacing.xs,
                fontWeight: theme.typography.weight.semibold,
              }}>
                INPUT
              </div>
              <div style={{
                fontSize: theme.typography.size.body,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.sm,
              }}>
                {item.input}
              </div>
              <div style={{
                fontSize: theme.typography.size.bodySmall,
                color: theme.colors.text.tertiary,
                marginBottom: theme.spacing.xs,
                fontWeight: theme.typography.weight.semibold,
              }}>
                EXPECTED OUTPUT
              </div>
              <div style={{
                fontSize: theme.typography.size.body,
                color: theme.colors.text.secondary,
              }}>
                {item.output}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Improvement Steps */}
        <div style={{ marginTop: theme.spacing.xl }}>
          <h4 style={{
            fontSize: theme.typography.size.heading6,
            fontWeight: theme.typography.weight.semibold,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.md,
          }}>
            How the Model Improves
          </h4>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}>
            {example.improvementSteps.map((step, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                style={{
                  padding: theme.spacing.sm,
                  color: theme.colors.text.secondary,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: theme.spacing.sm,
                  lineHeight: '1.6',
                }}
              >
                <span style={{ 
                  color: theme.colors.primary.main,
                  fontWeight: theme.typography.weight.bold,
                }}>
                  {index + 1}.
                </span>
                {step}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TrainingVisualization
