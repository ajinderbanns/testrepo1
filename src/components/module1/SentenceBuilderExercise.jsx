/**
 * SentenceBuilderExercise Component
 * 
 * Interactive exercise where users select the most likely next words/tokens
 * to complete a sentence, demonstrating how LLMs predict text.
 * 
 * Features:
 * - Step-by-step word selection
 * - Multiple choice options with probability hints
 * - Immediate feedback
 * - Progress tracking
 * - Gender-specific exercises
 * 
 * @component
 */

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import { getExamplesByGender } from '../../data/module1Examples'
import Card from '../ui/Card'
import Button from '../ui/Button'
import ProgressBar from '../ui/ProgressBar'
import Tooltip from '../ui/Tooltip'

/**
 * Option Button Component
 */
const OptionButton = ({ 
  option, 
  isSelected, 
  isCorrect, 
  isIncorrect, 
  showFeedback,
  onClick, 
  disabled,
  theme 
}) => {
  const getButtonStyle = () => {
    if (showFeedback) {
      if (isCorrect) {
        return {
          backgroundColor: theme.colors.state.success.light || theme.colors.background.secondary,
          borderColor: theme.colors.state.success.main,
          color: theme.colors.state.success.main,
          borderWidth: theme.borderWidth.medium,
        }
      }
      if (isIncorrect) {
        return {
          backgroundColor: theme.colors.state.error.light || theme.colors.background.secondary,
          borderColor: theme.colors.state.error.main,
          color: theme.colors.state.error.main,
          borderWidth: theme.borderWidth.medium,
        }
      }
    }
    
    if (isSelected) {
      return {
        backgroundColor: theme.colors.primary.main,
        borderColor: theme.colors.primary.main,
        color: theme.colors.primary.contrast,
        borderWidth: theme.borderWidth.medium,
      }
    }
    
    return {
      backgroundColor: theme.colors.surface.base,
      borderColor: theme.colors.border.default,
      color: theme.colors.text.primary,
      borderWidth: theme.borderWidth.thin,
    }
  }

  const buttonStyle = getButtonStyle()

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      style={{
        ...buttonStyle,
        width: '100%',
        padding: theme.spacing.md,
        border: `solid`,
        borderRadius: theme.radii.medium,
        fontSize: theme.typography.size.body,
        fontWeight: theme.typography.weight.medium,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled && !showFeedback ? 0.6 : 1,
        transition: theme.transitions.default,
        textAlign: 'left',
        position: 'relative',
        boxShadow: isSelected || showFeedback ? theme.shadows.small : 'none',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'monospace', fontSize: theme.typography.size.bodyLarge }}>
          {option.text}
        </span>
        <span style={{ 
          fontSize: theme.typography.size.caption,
          opacity: 0.7,
          fontWeight: theme.typography.weight.semibold,
        }}>
          {(option.probability * 100).toFixed(0)}%
        </span>
      </div>
      
      {showFeedback && (isCorrect || isIncorrect) && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginTop: theme.spacing.sm,
            fontSize: theme.typography.size.bodySmall,
            fontStyle: 'italic',
            color: isCorrect 
              ? theme.colors.state.success.main 
              : theme.colors.state.error.main,
          }}
        >
          {option.feedback}
        </motion.div>
      )}
    </motion.button>
  )
}

/**
 * Main SentenceBuilderExercise Component
 */
function SentenceBuilderExercise() {
  const { theme, themeName } = useTheme()
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [builtSentence, setBuiltSentence] = useState('')

  const gender = themeName === 'female' ? 'female' : 'male'
  const exercises = getExamplesByGender(gender, 'builder')
  const currentExercise = exercises[selectedExerciseIndex]
  const currentStepData = currentExercise.steps[currentStep]
  const progress = ((currentStep + (showFeedback ? 1 : 0)) / currentExercise.steps.length) * 100

  // Initialize built sentence
  useEffect(() => {
    setBuiltSentence(currentExercise.context)
  }, [currentExercise])

  /**
   * Handle option selection
   */
  const handleOptionSelect = (option) => {
    if (showFeedback) return

    const newSelectedOptions = [...selectedOptions]
    newSelectedOptions[currentStep] = option
    setSelectedOptions(newSelectedOptions)
    setShowFeedback(true)

    // Update built sentence
    setBuiltSentence(prev => prev + option.text)
  }

  /**
   * Handle next step
   */
  const handleNext = () => {
    if (currentStep < currentExercise.steps.length - 1) {
      setCurrentStep(currentStep + 1)
      setShowFeedback(false)
    } else {
      setIsComplete(true)
    }
  }

  /**
   * Handle reset
   */
  const handleReset = () => {
    setCurrentStep(0)
    setSelectedOptions([])
    setShowFeedback(false)
    setIsComplete(false)
    setBuiltSentence(currentExercise.context)
  }

  /**
   * Handle exercise change
   */
  const handleExerciseChange = (index) => {
    setSelectedExerciseIndex(index)
    setCurrentStep(0)
    setSelectedOptions([])
    setShowFeedback(false)
    setIsComplete(false)
  }

  const selectedOption = selectedOptions[currentStep]
  const isCorrect = selectedOption?.text === currentStepData.correctOption

  return (
    <Card className="sentence-builder-exercise" padding="large">
      {/* Header */}
      <div style={{ marginBottom: theme.spacing.lg }}>
        <h3 style={{
          fontSize: theme.typography.size.h3,
          fontWeight: theme.typography.weight.bold,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.sm,
        }}>
          {currentExercise.title}
        </h3>
        <p style={{
          fontSize: theme.typography.size.body,
          color: theme.colors.text.secondary,
          lineHeight: '1.6',
        }}>
          {currentExercise.description}
        </p>
      </div>

      {/* Exercise Selector */}
      {exercises.length > 1 && (
        <div style={{ 
          marginBottom: theme.spacing.lg,
          display: 'flex',
          gap: theme.spacing.sm,
          flexWrap: 'wrap',
        }}>
          {exercises.map((exercise, index) => (
            <Button
              key={exercise.id}
              variant={selectedExerciseIndex === index ? 'primary' : 'tertiary'}
              size="small"
              onClick={() => handleExerciseChange(index)}
              disabled={!isComplete && selectedExerciseIndex !== index}
            >
              Exercise {index + 1}
            </Button>
          ))}
        </div>
      )}

      {/* Progress Bar */}
      <div style={{ marginBottom: theme.spacing.xl }}>
        <ProgressBar 
          value={progress} 
          max={100}
          showLabel
          label={`Step ${currentStep + 1} of ${currentExercise.steps.length}`}
        />
      </div>

      {/* Built Sentence Display */}
      <motion.div
        layout
        style={{
          padding: theme.spacing.lg,
          backgroundColor: theme.colors.background.secondary,
          borderRadius: theme.radii.large,
          marginBottom: theme.spacing.xl,
          minHeight: '80px',
          border: `${theme.borderWidth.thin} solid ${theme.colors.border.default}`,
        }}
      >
        <div style={{
          fontSize: theme.typography.size.caption,
          fontWeight: theme.typography.weight.semibold,
          color: theme.colors.text.secondary,
          marginBottom: theme.spacing.sm,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          {isComplete ? 'Completed:' : 'Building:'}
        </div>
        <div style={{
          fontSize: theme.typography.size.bodyLarge,
          color: theme.colors.text.primary,
          lineHeight: '1.8',
          fontFamily: 'monospace',
          whiteSpace: 'pre-wrap',
        }}>
          {builtSentence}
          {!isComplete && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{
                display: 'inline-block',
                width: '2px',
                height: '1.2em',
                backgroundColor: theme.colors.primary.main,
                marginLeft: '2px',
                verticalAlign: 'middle',
              }}
            />
          )}
        </div>
      </motion.div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {!isComplete && (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Question */}
            <div style={{
              marginBottom: theme.spacing.lg,
              padding: theme.spacing.md,
              backgroundColor: theme.colors.background.tertiary,
              borderRadius: theme.radii.medium,
              borderLeft: `4px solid ${theme.colors.primary.main}`,
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.sm,
              }}>
                <span style={{
                  fontSize: theme.typography.size.h3,
                  flexShrink: 0,
                }}>
                  🤔
                </span>
                <p style={{
                  fontSize: theme.typography.size.bodyLarge,
                  fontWeight: theme.typography.weight.semibold,
                  color: theme.colors.text.primary,
                  margin: 0,
                }}>
                  {currentStepData.prompt}
                </p>
              </div>
            </div>

            {/* Options */}
            <div style={{
              display: 'grid',
              gap: theme.spacing.md,
              marginBottom: theme.spacing.lg,
            }}>
              {currentStepData.options.map((option, index) => (
                <OptionButton
                  key={index}
                  option={option}
                  isSelected={selectedOption?.text === option.text}
                  isCorrect={showFeedback && option.text === currentStepData.correctOption}
                  isIncorrect={showFeedback && selectedOption?.text === option.text && option.text !== currentStepData.correctOption}
                  showFeedback={showFeedback}
                  onClick={() => handleOptionSelect(option)}
                  disabled={showFeedback}
                  theme={theme}
                />
              ))}
            </div>

            {/* Next Button */}
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: theme.spacing.md,
                }}
              >
                <Button
                  variant="primary"
                  onClick={handleNext}
                >
                  {currentStep < currentExercise.steps.length - 1 ? 'Next Step' : 'Complete'}
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion Screen */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            style={{
              textAlign: 'center',
              padding: theme.spacing.xl,
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              style={{
                fontSize: '4rem',
                marginBottom: theme.spacing.lg,
              }}
            >
              🎉
            </motion.div>
            
            <h4 style={{
              fontSize: theme.typography.size.h3,
              fontWeight: theme.typography.weight.bold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md,
            }}>
              Excellent Work!
            </h4>
            
            <p style={{
              fontSize: theme.typography.size.body,
              color: theme.colors.text.secondary,
              marginBottom: theme.spacing.xl,
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}>
              You've successfully demonstrated how LLMs predict text by selecting the most likely next tokens.
              This is exactly how language models generate responses—one token at a time, always choosing
              based on probability distributions.
            </p>

            {/* Completed Text Display */}
            <div style={{
              padding: theme.spacing.lg,
              backgroundColor: theme.colors.accent.light || theme.colors.background.secondary,
              borderRadius: theme.radii.large,
              marginBottom: theme.spacing.xl,
              border: `${theme.borderWidth.medium} solid ${theme.colors.accent.main}`,
            }}>
              <div style={{
                fontSize: theme.typography.size.bodySmall,
                fontWeight: theme.typography.weight.semibold,
                color: theme.colors.text.secondary,
                marginBottom: theme.spacing.sm,
                textTransform: 'uppercase',
              }}>
                Final Result:
              </div>
              <div style={{
                fontSize: theme.typography.size.bodyLarge,
                color: theme.colors.text.primary,
                lineHeight: '1.8',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
              }}>
                {currentExercise.completedText || builtSentence}
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: theme.spacing.md,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              <Button
                variant="primary"
                onClick={handleReset}
              >
                Try Again
              </Button>
              {selectedExerciseIndex < exercises.length - 1 && (
                <Button
                  variant="secondary"
                  onClick={() => handleExerciseChange(selectedExerciseIndex + 1)}
                >
                  Next Exercise
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

export default SentenceBuilderExercise
