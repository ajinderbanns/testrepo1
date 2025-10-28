/**
 * TextCompletionPlayground Component
 * 
 * Interactive playground where users type prompts and see simulated
 * text generation responses with typing animation effects.
 * 
 * Features:
 * - Custom prompt input
 * - Pre-defined example prompts
 * - Animated text generation
 * - Local storage for custom prompts
 * - Gender-specific examples
 * 
 * @component
 */

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import { getExamplesByGender } from '../../data/module1Examples'
import SimulatedTextGenerator from './SimulatedTextGenerator'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Card from '../ui/Card'
import Tooltip from '../ui/Tooltip'

const STORAGE_KEY = 'llm-edu-custom-prompts'

/**
 * Load custom prompts from localStorage
 */
const loadCustomPrompts = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error loading custom prompts:', error)
    return []
  }
}

/**
 * Save custom prompts to localStorage
 */
const saveCustomPrompts = (prompts) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts.slice(0, 5))) // Keep last 5
  } catch (error) {
    console.error('Error saving custom prompts:', error)
  }
}

function TextCompletionPlayground() {
  const { theme, themeName } = useTheme()
  const [customPrompt, setCustomPrompt] = useState('')
  const [currentPrompt, setCurrentPrompt] = useState('')
  const [selectedExample, setSelectedExample] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [hasGenerated, setHasGenerated] = useState(false)
  const [customPrompts, setCustomPrompts] = useState([])

  const gender = themeName === 'female' ? 'female' : 'male'
  const examples = getExamplesByGender(gender, 'completion')

  // Load custom prompts on mount
  useEffect(() => {
    setCustomPrompts(loadCustomPrompts())
  }, [])

  /**
   * Handle example selection
   */
  const handleExampleSelect = (example) => {
    if (isGenerating) return
    
    setSelectedExample(example)
    setCurrentPrompt(example.prompt)
    setCustomPrompt('')
    setHasGenerated(false)
  }

  /**
   * Handle generate button click
   */
  const handleGenerate = () => {
    const promptToUse = customPrompt.trim() || selectedExample?.prompt

    if (!promptToUse) return

    // If custom prompt, save it
    if (customPrompt.trim()) {
      const newCustomPrompts = [customPrompt.trim(), ...customPrompts.filter(p => p !== customPrompt.trim())]
      setCustomPrompts(newCustomPrompts)
      saveCustomPrompts(newCustomPrompts)
      
      // For custom prompts, use the first example's tokens as placeholder
      setSelectedExample(examples[0])
      setCurrentPrompt(customPrompt.trim())
    }

    setIsGenerating(true)
    setHasGenerated(true)
  }

  /**
   * Handle generation complete
   */
  const handleGenerationComplete = () => {
    setIsGenerating(false)
  }

  /**
   * Handle reset
   */
  const handleReset = () => {
    setIsGenerating(false)
    setHasGenerated(false)
    setSelectedExample(null)
    setCurrentPrompt('')
    setCustomPrompt('')
  }

  return (
    <Card className="text-completion-playground" padding="large">
      {/* Header */}
      <div style={{ marginBottom: theme.spacing.lg }}>
        <h3 style={{
          fontSize: theme.typography.size.h3,
          fontWeight: theme.typography.weight.bold,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.sm,
        }}>
          Text Completion Playground
        </h3>
        <p style={{
          fontSize: theme.typography.size.body,
          color: theme.colors.text.secondary,
          lineHeight: '1.6',
        }}>
          Type a prompt or try an example to see how an LLM generates text token-by-token.
        </p>
      </div>

      {/* Example Selector */}
      <div style={{ marginBottom: theme.spacing.lg }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.sm,
          marginBottom: theme.spacing.md,
        }}>
          <span style={{
            fontSize: theme.typography.size.bodySmall,
            fontWeight: theme.typography.weight.semibold,
            color: theme.colors.text.secondary,
          }}>
            Try an example:
          </span>
          <Tooltip content="Click an example to see how it generates">
            <span style={{ 
              color: theme.colors.accent.main,
              cursor: 'help',
              fontSize: theme.typography.size.bodySmall,
            }}>
              ⓘ
            </span>
          </Tooltip>
        </div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: theme.spacing.sm,
        }}>
          {examples.map((example) => (
            <motion.button
              key={example.id}
              onClick={() => handleExampleSelect(example)}
              disabled={isGenerating}
              whileHover={{ scale: isGenerating ? 1 : 1.02 }}
              whileTap={{ scale: isGenerating ? 1 : 0.98 }}
              style={{
                padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                fontSize: theme.typography.size.bodySmall,
                fontWeight: theme.typography.weight.medium,
                color: selectedExample?.id === example.id 
                  ? theme.colors.primary.contrast 
                  : theme.colors.text.primary,
                backgroundColor: selectedExample?.id === example.id 
                  ? theme.colors.primary.main 
                  : theme.colors.surface.raised,
                border: `${theme.borderWidth.thin} solid ${
                  selectedExample?.id === example.id 
                    ? theme.colors.primary.main 
                    : theme.colors.border.default
                }`,
                borderRadius: theme.radii.medium,
                cursor: isGenerating ? 'not-allowed' : 'pointer',
                opacity: isGenerating ? 0.6 : 1,
                transition: theme.transitions.default,
              }}
            >
              {example.id.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Custom Prompt Input */}
      <div style={{ marginBottom: theme.spacing.lg }}>
        <Input
          label="Or write your own prompt"
          placeholder={gender === 'male' 
            ? 'e.g., How do I optimize database queries?' 
            : 'e.g., How can I improve my presentation skills?'}
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          disabled={isGenerating}
          fullWidth
          helperText="Your custom prompts are saved automatically"
        />

        {/* Recent Custom Prompts */}
        {customPrompts.length > 0 && !customPrompt && (
          <div style={{ marginTop: theme.spacing.md }}>
            <span style={{
              fontSize: theme.typography.size.caption,
              color: theme.colors.text.tertiary,
              display: 'block',
              marginBottom: theme.spacing.xs,
            }}>
              Recent prompts:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: theme.spacing.xs }}>
              {customPrompts.slice(0, 3).map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setCustomPrompt(prompt)}
                  disabled={isGenerating}
                  style={{
                    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                    fontSize: theme.typography.size.caption,
                    color: theme.colors.text.secondary,
                    backgroundColor: theme.colors.surface.base,
                    border: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`,
                    borderRadius: theme.radii.small,
                    cursor: isGenerating ? 'not-allowed' : 'pointer',
                    maxWidth: '200px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Prompt Display */}
      <AnimatePresence mode="wait">
        {currentPrompt && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              padding: theme.spacing.md,
              backgroundColor: theme.colors.background.secondary,
              borderLeft: `4px solid ${theme.colors.primary.main}`,
              borderRadius: theme.radii.medium,
              marginBottom: theme.spacing.lg,
            }}
          >
            <div style={{
              fontSize: theme.typography.size.bodySmall,
              fontWeight: theme.typography.weight.semibold,
              color: theme.colors.text.secondary,
              marginBottom: theme.spacing.xs,
            }}>
              Prompt:
            </div>
            <div style={{
              fontSize: theme.typography.size.body,
              color: theme.colors.text.primary,
              fontStyle: 'italic',
            }}>
              {currentPrompt}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generation Output */}
      <div style={{
        minHeight: '150px',
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.surface.base,
        border: `${theme.borderWidth.thin} solid ${theme.colors.border.default}`,
        borderRadius: theme.radii.large,
        marginBottom: theme.spacing.lg,
      }}>
        {!hasGenerated && !currentPrompt && (
          <div style={{
            textAlign: 'center',
            color: theme.colors.text.tertiary,
            fontSize: theme.typography.size.body,
            padding: theme.spacing.xl,
          }}>
            Select an example or write a prompt to get started
          </div>
        )}

        {hasGenerated && selectedExample && (
          <SimulatedTextGenerator
            tokens={selectedExample.tokens}
            speed={1}
            showProbability={true}
            autoStart={true}
            onComplete={handleGenerationComplete}
          />
        )}
      </div>

      {/* Controls */}
      <div style={{
        display: 'flex',
        gap: theme.spacing.md,
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        <Button
          variant="primary"
          onClick={handleGenerate}
          disabled={isGenerating || (!customPrompt.trim() && !selectedExample)}
          loading={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate Response'}
        </Button>
        
        {hasGenerated && (
          <Button
            variant="secondary"
            onClick={handleReset}
            disabled={isGenerating}
          >
            Try Another
          </Button>
        )}
      </div>

      {/* Info Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          marginTop: theme.spacing.lg,
          padding: theme.spacing.md,
          backgroundColor: theme.colors.background.tertiary,
          borderRadius: theme.radii.medium,
          fontSize: theme.typography.size.bodySmall,
          color: theme.colors.text.secondary,
          textAlign: 'center',
        }}
      >
        <strong>Tip:</strong> Notice how each word appears one at a time? That's how LLMs actually generate text—token by token, 
        predicting the most likely next piece based on context.
      </motion.div>
    </Card>
  )
}

export default TextCompletionPlayground
