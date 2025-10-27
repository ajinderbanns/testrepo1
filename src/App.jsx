import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Landing, Learn, Module1, Module2, Module3 } from './pages'
import { ProtectedRoute } from './components'
import { loadGenderPreference } from './utils/localStorage'
import { useTheme } from './hooks/useTheme'

function App() {
  // Track hydration state to prevent theme flash
  const [isHydrated, setIsHydrated] = useState(false)
  const { switchTheme } = useTheme()

  /**
   * State Hydration on Mount
   * 
   * Load gender preference from localStorage and apply corresponding theme
   * before first render to prevent visual flash.
   */
  useEffect(() => {
    try {
      // Load gender preference from localStorage
      const storedGender = loadGenderPreference()
      
      if (storedGender) {
        // Apply theme based on gender preference
        // This ensures theme is set before content renders
        switchTheme(storedGender)
        console.log(`Gender preference loaded: ${storedGender}. Theme applied.`)
      } else {
        // First-time visitor - no preference set
        // Theme will remain at default (male) or neutral
        console.log('No gender preference found - first-time visitor')
      }
    } catch (error) {
      console.error('Error during app state hydration:', error)
    } finally {
      // Mark hydration as complete
      setIsHydrated(true)
    }
  }, [switchTheme])

  // Don't render routes until hydration is complete
  // This prevents theme flash on initial load
  if (!isHydrated) {
    return null // Or a minimal loading indicator if desired
  }

  return (
    <Routes>
      {/* Public route - Landing page with gender selection */}
      <Route path="/" element={<Landing />} />
      
      {/* Protected routes - require gender selection */}
      <Route
        path="/learn"
        element={
          <ProtectedRoute>
            <Learn />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/module/1"
        element={
          <ProtectedRoute>
            <Module1 />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/module/2"
        element={
          <ProtectedRoute>
            <Module2 />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/module/3"
        element={
          <ProtectedRoute>
            <Module3 />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
