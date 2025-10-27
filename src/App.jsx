import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Landing, Learn, Module1, Module2, Module3 } from './pages'
import { ProtectedRoute } from './components'

function App() {
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
