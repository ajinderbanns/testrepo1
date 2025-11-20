/**
 * MiniQuiz Component
 * 
 * Interactive quiz component for checking understanding of Module 2 concepts.
 * Provides immediate feedback and explanations.
 * 
 * @component
 */

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'

function MiniQuiz({ questions, onComplete }) {
  const { theme } = useTheme()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const question = questions[currentQuestion]

  const handleAnswerSelect = (index) => {
    if (showExplanation) return
    
    setSelectedAnswer(index)
    setShowExplanation(true)
    
    if (index === question.correctIndex) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setIsComplete(true)
      if (onComplete) {
        onComplete(score + (selectedAnswer === question.correctIndex ? 1 : 0))
      }
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setIsComplete(false)
  }

  const containerStyle = {
    backgroundColor: theme.colors.surface.base,
    borderRadius: theme.radii.large,
    padding: theme.spacing.xl,
    border: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`,
    maxWidth: '700px',
    margin: '0 auto',
  }

  const headerStyle = {
    marginBottom: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    borderBottom: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`,
  }

  const questionTextStyle = {
    fontSize: theme.typography.size.heading5,
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  }

  const optionButtonStyle = (index) => {
    const isSelected = selectedAnswer === index
    const isCorrect = index === question.correctIndex
    const showAsCorrect = showExplanation && isCorrect
    const showAsWrong = showExplanation && isSelected && !isCorrect

    return {
      width: '100%',
      padding: theme.spacing.md,
      marginBottom: theme.spacing.sm,
      backgroundColor: showAsCorrect
        ? theme.colors.state.success.light + '30'
        : showAsWrong
        ? theme.colors.state.error.light + '30'
        : isSelected
        ? theme.colors.primary.light + '20'
        : theme.colors.surface.raised,
      border: `${theme.borderWidth.medium} solid ${
        showAsCorrect
          ? theme.colors.state.success.main
          : showAsWrong
          ? theme.colors.state.error.main
          : isSelected
          ? theme.colors.primary.main
          : theme.colors.border.light
      }`,
      borderRadius: theme.radii.medium,
      color: theme.colors.text.primary,
      fontSize: theme.typography.size.body,
      textAlign: 'left',
      cursor: showExplanation ? 'default' : 'pointer',
      transition: theme.transitions.default,
      fontWeight: isSelected ? theme.typography.weight.semibold : theme.typography.weight.normal,
    }
  }

  const buttonStyle = {
    padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
    backgroundColor: theme.colors.primary.main,
    color: '#ffffff',
    border: 'none',
    borderRadius: theme.radii.medium,
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.semibold,
    cursor: 'pointer',
    transition: theme.transitions.default,
  }

  const progressBarStyle = {
    height: '6px',
    backgroundColor: theme.colors.surface.raised,
    borderRadius: theme.radii.full,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
  }

  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100)
    const passed = percentage >= 70

    return (
      <motion.div
        style={containerStyle}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <div style={{
              fontSize: '4rem',
              marginBottom: theme.spacing.md,
            }}>
              {passed ? '🎉' : '💪'}
            </div>
          </motion.div>

          <h3 style={{
            fontSize: theme.typography.size.heading3,
            fontWeight: theme.typography.weight.bold,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.md,
          }}>
            {passed ? 'Great Job!' : 'Keep Learning!'}
          </h3>

          <p style={{
            fontSize: theme.typography.size.heading4,
            color: theme.colors.primary.main,
            fontWeight: theme.typography.weight.bold,
            marginBottom: theme.spacing.sm,
          }}>
            {score} / {questions.length} correct ({percentage}%)
          </p>

          <p style={{
            fontSize: theme.typography.size.body,
            color: theme.colors.text.secondary,
            marginBottom: theme.spacing.xl,
          }}>
            {passed
              ? "You've demonstrated solid understanding of these concepts!"
              : "Review the material and try again to improve your score."}
          </p>

          <motion.button
            style={buttonStyle}
            onClick={handleRestart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
          </motion.button>
        </div>
      </motion.div>
    )
  }

  return (
    <div style={containerStyle}>
      {/* Header with Progress */}
      <div style={headerStyle}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: theme.spacing.sm,
        }}>
          <span style={{
            fontSize: theme.typography.size.bodySmall,
            color: theme.colors.text.secondary,
            fontWeight: theme.typography.weight.semibold,
          }}>
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span style={{
            fontSize: theme.typography.size.bodySmall,
            color: theme.colors.text.secondary,
          }}>
            Score: {score}
          </span>
        </div>
        <div style={progressBarStyle}>
          <motion.div
            style={{
              height: '100%',
              backgroundColor: theme.colors.primary.main,
              borderRadius: theme.radii.full,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p style={questionTextStyle}>{question.question}</p>

        {/* Options */}
        <div style={{ marginBottom: theme.spacing.lg }}>
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              style={optionButtonStyle(index)}
              onClick={() => handleAnswerSelect(index)}
              whileHover={!showExplanation ? { scale: 1.02 } : {}}
              whileTap={!showExplanation ? { scale: 0.98 } : {}}
              disabled={showExplanation}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
                <span style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: theme.radii.full,
                  backgroundColor: selectedAnswer === index
                    ? theme.colors.primary.main
                    : theme.colors.surface.base,
                  color: selectedAnswer === index ? '#ffffff' : theme.colors.text.tertiary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: theme.typography.size.bodySmall,
                  fontWeight: theme.typography.weight.bold,
                  flexShrink: 0,
                }}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                backgroundColor: selectedAnswer === question.correctIndex
                  ? theme.colors.state.success.light + '20'
                  : theme.colors.state.error.light + '20',
                padding: theme.spacing.md,
                borderRadius: theme.radii.medium,
                borderLeft: `4px solid ${
                  selectedAnswer === question.correctIndex
                    ? theme.colors.state.success.main
                    : theme.colors.state.error.main
                }`,
                marginBottom: theme.spacing.lg,
              }}
            >
              <p style={{
                fontSize: theme.typography.size.body,
                color: theme.colors.text.primary,
                margin: 0,
                lineHeight: '1.6',
              }}>
                <strong>
                  {selectedAnswer === question.correctIndex ? '✓ Correct! ' : '✗ Not quite. '}
                </strong>
                {question.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Button */}
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center' }}
          >
            <motion.button
              style={buttonStyle}
              onClick={handleNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentQuestion < questions.length - 1 ? 'Next Question →' : 'See Results'}
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

MiniQuiz.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
      correctIndex: PropTypes.number.isRequired,
      explanation: PropTypes.string.isRequired,
    })
  ).isRequired,
  onComplete: PropTypes.func,
}

export default MiniQuiz
