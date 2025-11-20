import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Landing, Learn, Module1, Module2, Module3 } from './pages'
import { ProtectedRoute, PageTransition } from './components'
import { loadGenderPreference } from './utils/localStorage'
import { useTheme } from './hooks/useTheme'

function App() {
  // Track hydration state to prevent theme flash
  const [isHydrated, setIsHydrated] = useState(false)
  const { switchTheme } = useTheme()
  const location = useLocation()

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
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* Public route - Landing page with gender selection */}
        <Route 
          path="/" 
          element={
            <PageTransition variant="fade">
              <Landing />
            </PageTransition>
          } 
        />
        
        {/* Protected routes - require gender selection */}
        <Route
          path="/learn"
          element={
            <ProtectedRoute>
              <PageTransition variant="fade">
                <Learn />
              </PageTransition>
            </ProtectedRoute>
          }
        />
        
        {/* Module 1 with nested section routes */}
        <Route
          path="/module/1"
          element={
            <ProtectedRoute>
              <PageTransition variant="slideRight">
                <Module1 />
              </PageTransition>
            </ProtectedRoute>
          }
        >
          {/* Default redirect to intro section */}
          <Route index element={<Navigate to="intro" replace />} />
          {/* Section routes */}
          <Route path=":sectionPath" element={<Module1 />} />
        </Route>
        
        {/* Module 2 with nested section routes */}
        <Route
          path="/module/2"
          element={
            <ProtectedRoute>
              <PageTransition variant="slideRight">
                <Module2 />
              </PageTransition>
            </ProtectedRoute>
          }
        >
          {/* Default redirect to tokenization section */}
          <Route index element={<Navigate to="tokenization" replace />} />
          {/* Section routes */}
          <Route path=":sectionPath" element={<Module2 />} />
        </Route>
        
        {/* Module 3 with nested section routes */}
        <Route
          path="/module/3"
          element={
            <ProtectedRoute>
              <PageTransition variant="slideRight">
                <Module3 />
              </PageTransition>
            </ProtectedRoute>
          }
        >
          {/* Default redirect to training section */}
          <Route index element={<Navigate to="training" replace />} />
          {/* Section routes */}
          <Route path=":sectionPath" element={<Module3 />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default App
