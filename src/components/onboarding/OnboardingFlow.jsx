import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import GenderSelection from './GenderSelection'
import ThemePreview from './ThemePreview'
import { loadGenderPreference } from '../../utils/localStorage'
import '../../styles/OnboardingFlow.css'

/**
 * OnboardingFlow Component
 * 
 * Orchestrates the multi-step onboarding flow:
 * 1. Gender/Theme Selection
 * 2. Theme Preview & Confirmation
 * 3. Navigate to Learning Modules
 * 
 * Features:
 * - Step-based state management
 * - Smooth transitions between steps
 * - Automatic redirect if user already has preference
 * - Back navigation support
 * 
 * @component
 */
function OnboardingFlow() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState('selection') // 'selection' | 'preview'
  const [selectedGender, setSelectedGender] = useState(null)

  // Check if user already has a preference
  React.useEffect(() => {
    const existingPreference = loadGenderPreference()
    if (existingPreference) {
      // User already completed onboarding, redirect to learn page
      navigate('/learn')
    }
  }, [navigate])

  // Handle gender selection from step 1
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender)
    // Move to preview step
    setCurrentStep('preview')
  }

  // Handle back from preview to selection
  const handleBackToSelection = () => {
    setCurrentStep('selection')
  }

  // Handle final confirmation
  const handleConfirm = () => {
    // ThemePreview handles localStorage persistence
    // Navigate to learning modules
    navigate('/learn')
  }

  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <div className="onboarding-flow">
      <AnimatePresence mode="wait">
        {currentStep === 'selection' && (
          <motion.div
            key="selection"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <GenderSelection onSelect={handleGenderSelect} />
          </motion.div>
        )}

        {currentStep === 'preview' && selectedGender && (
          <motion.div
            key="preview"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ThemePreview
              selectedGender={selectedGender}
              onConfirm={handleConfirm}
              onBack={handleBackToSelection}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default OnboardingFlow
