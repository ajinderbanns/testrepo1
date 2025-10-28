import React from 'react'
import { OnboardingFlow } from '../components/onboarding'

/**
 * Landing Page
 * 
 * Entry point for new users. Presents the onboarding flow:
 * 1. Gender/Theme Selection
 * 2. Theme Preview & Confirmation
 * 
 * Existing users with saved preferences are automatically
 * redirected to the learning modules.
 */
function Landing() {
  return (
    <div className="landing-page">
      <OnboardingFlow />
    </div>
  )
}

export default Landing
