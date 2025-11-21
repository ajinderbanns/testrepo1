import React, { useEffect, useState, lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ProtectedRoute, PageTransition } from './components'
import { ContentProvider } from './contexts/ContentContext'
import { loadGenderPreference } from './utils/localStorage'
import { useTheme } from './hooks/useTheme'

// Code splitting: Lazy load pages for better performance
const Landing = lazy(() => import('./pages/Landing'))
const Learn = lazy(() => import('./pages/Learn'))
const Module1 = lazy(() => import('./pages/Module1'))
const Module2 = lazy(() => import('./pages/Module2'))
const Module3 = lazy(() => import('./pages/Module3'))

// Loading fallback component
const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontSize: '1.2rem',
    color: 'var(--color-text-secondary, #666)',
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: '48px',
        height: '48px',
        border: '4px solid rgba(100, 108, 255, 0.2)',
        borderTopColor: '#646cff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 1rem',
      }} />
      <p>Loading...</p>
    </div>
  </div>
)

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
    <ContentProvider>
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
    </ContentProvider>
  )
}

export default App
