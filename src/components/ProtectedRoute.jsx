import React from 'react'
import { Navigate } from 'react-router-dom'
import { loadGenderPreference } from '../utils/localStorage'

/**
 * ProtectedRoute component that guards routes requiring gender selection
 * 
 * Uses the localStorage utility to check for gender preference.
 * Redirects to landing page (/) if not found or invalid.
 * 
 * Features:
 * - Validates gender preference using utility functions
 * - Handles corrupted/invalid data gracefully
 * - Works even when localStorage is unavailable (private browsing)
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Protected content to render
 * @returns {React.ReactNode} Children if authenticated, Navigate otherwise
 */
function ProtectedRoute({ children }) {
  // Load gender preference using utility function
  // This handles all edge cases: null, invalid, corrupted data
  const genderPreference = loadGenderPreference()
  
  // If no valid gender preference is set, redirect to landing page
  if (!genderPreference) {
    return <Navigate to="/" replace />
  }
  
  // If gender preference exists and is valid, render the protected content
  return children
}

export default ProtectedRoute
