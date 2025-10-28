/**
 * useWalkthrough Hook
 * 
 * Custom React hook for managing walkthrough state and visibility.
 * Provides control over showing/hiding the walkthrough and tracking completion.
 * 
 * Features:
 * - Automatic detection of first-time users
 * - Manual control to show/hide walkthrough
 * - LocalStorage persistence of completion status
 * - Current step management
 * - Skip functionality
 * 
 * @module useWalkthrough
 */

import { useState, useEffect, useCallback } from 'react'
import {
  isWalkthroughCompleted,
  saveWalkthroughCompleted,
  resetWalkthrough,
  isLocalStorageAvailable,
} from '../utils/walkthroughStorage'
import { getTotalSteps } from '../data/walkthroughContent'

/**
 * useWalkthrough Hook
 * 
 * Manages walkthrough visibility, completion status, and step navigation.
 * 
 * @param {Object} options - Configuration options
 * @param {boolean} [options.autoShow=false] - Automatically show walkthrough if not completed
 * @returns {Object} Walkthrough state and control functions
 * 
 * @example
 * function MyComponent() {
 *   const { 
 *     isVisible, 
 *     showWalkthrough, 
 *     hideWalkthrough,
 *     currentStep,
 *     goToNextStep,
 *     goToPreviousStep,
 *   } = useWalkthrough({ autoShow: true })
 *   
 *   return (
 *     <div>
 *       {isVisible && <WalkthroughOverlay />}
 *       <button onClick={showWalkthrough}>Show Tutorial</button>
 *     </div>
 *   )
 * }
 */
export const useWalkthrough = ({ autoShow = false } = {}) => {
  // State for walkthrough visibility
  const [isVisible, setIsVisible] = useState(false)
  
  // State for completion status
  const [isCompleted, setIsCompleted] = useState(true) // Default to true to prevent flash
  
  // State for current step (0-indexed)
  const [currentStep, setCurrentStep] = useState(0)
  
  // State for loading
  const [isLoading, setIsLoading] = useState(true)
  
  // Check if localStorage is available
  const [storageAvailable] = useState(() => isLocalStorageAvailable())

  // Total number of steps
  const totalSteps = getTotalSteps()

  /**
   * Initialize walkthrough state from localStorage
   */
  useEffect(() => {
    try {
      const completed = isWalkthroughCompleted()
      setIsCompleted(completed)
      
      // Auto-show if not completed and autoShow is enabled
      if (!completed && autoShow) {
        setIsVisible(true)
      }
      
      if (!storageAvailable) {
        console.warn('LocalStorage not available. Walkthrough status will not persist.')
      }
    } catch (error) {
      console.error('Error initializing walkthrough state:', error)
    } finally {
      setIsLoading(false)
    }
  }, [autoShow, storageAvailable])

  /**
   * Show Walkthrough
   * 
   * Opens the walkthrough overlay and resets to first step.
   */
  const showWalkthrough = useCallback(() => {
    setCurrentStep(0)
    setIsVisible(true)
  }, [])

  /**
   * Hide Walkthrough
   * 
   * Closes the walkthrough overlay without marking as completed.
   */
  const hideWalkthrough = useCallback(() => {
    setIsVisible(false)
  }, [])

  /**
   * Complete Walkthrough
   * 
   * Marks walkthrough as completed and hides it.
   * Persists completion status to localStorage.
   */
  const completeWalkthrough = useCallback(() => {
    try {
      const success = saveWalkthroughCompleted()
      
      if (success) {
        setIsCompleted(true)
        setIsVisible(false)
        setCurrentStep(0)
        return true
      } else {
        console.error('Failed to save walkthrough completion status')
        return false
      }
    } catch (error) {
      console.error('Error completing walkthrough:', error)
      return false
    }
  }, [])

  /**
   * Skip Walkthrough
   * 
   * Marks walkthrough as completed and hides it immediately.
   * Same as completeWalkthrough but semantically clearer for skip action.
   */
  const skipWalkthrough = useCallback(() => {
    return completeWalkthrough()
  }, [completeWalkthrough])

  /**
   * Reset Walkthrough Status
   * 
   * Clears completion status from localStorage.
   * Useful for testing or allowing users to re-watch.
   */
  const resetWalkthroughStatus = useCallback(() => {
    try {
      const success = resetWalkthrough()
      
      if (success) {
        setIsCompleted(false)
        setCurrentStep(0)
        return true
      } else {
        console.error('Failed to reset walkthrough status')
        return false
      }
    } catch (error) {
      console.error('Error resetting walkthrough:', error)
      return false
    }
  }, [])

  /**
   * Go to Next Step
   * 
   * Advances to the next step if available.
   * If on last step, completes the walkthrough.
   */
  const goToNextStep = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      // Last step - complete walkthrough
      completeWalkthrough()
    }
  }, [currentStep, totalSteps, completeWalkthrough])

  /**
   * Go to Previous Step
   * 
   * Goes back to the previous step if available.
   */
  const goToPreviousStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }, [currentStep])

  /**
   * Go to Specific Step
   * 
   * Jumps to a specific step by index.
   * 
   * @param {number} stepIndex - Zero-based step index
   */
  const goToStep = useCallback(
    (stepIndex) => {
      if (stepIndex >= 0 && stepIndex < totalSteps) {
        setCurrentStep(stepIndex)
      } else {
        console.warn(`Invalid step index: ${stepIndex}. Must be between 0 and ${totalSteps - 1}`)
      }
    },
    [totalSteps]
  )

  /**
   * Check if on First Step
   */
  const isFirstStep = currentStep === 0

  /**
   * Check if on Last Step
   */
  const isLastStep = currentStep === totalSteps - 1

  return {
    // Visibility state
    isVisible,
    isCompleted,
    isLoading,
    
    // Step navigation
    currentStep,
    totalSteps,
    isFirstStep,
    isLastStep,
    
    // Control functions
    showWalkthrough,
    hideWalkthrough,
    completeWalkthrough,
    skipWalkthrough,
    resetWalkthroughStatus,
    
    // Step navigation functions
    goToNextStep,
    goToPreviousStep,
    goToStep,
    
    // Storage availability
    storageAvailable,
  }
}

export default useWalkthrough
