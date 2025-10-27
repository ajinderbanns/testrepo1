import React from 'react'
import { Navigate } from 'react-router-dom'

/**
 * ProtectedRoute component that guards routes requiring gender selection
 * Checks LocalStorage for 'genderPreference' key
 * Redirects to landing page (/) if not found
 */
function ProtectedRoute({ children }) {
  // Check if gender preference exists in LocalStorage
  const genderPreference = localStorage.getItem('genderPreference')
  
  // If no gender preference is set, redirect to landing page
  if (!genderPreference) {
    return <Navigate to="/" replace />
  }
  
  // If gender preference exists, render the protected content
  return children
}

export default ProtectedRoute
