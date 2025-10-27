import React from 'react'
import { Link } from 'react-router-dom'

function Module3() {
  return (
    <div className="module-page">
      <h1>Module 3: Comprehensive Overview</h1>
      <p>Deep dive into Training, Inference, and Architecture</p>
      {/* Module content will be implemented in later tasks */}
      
      <nav className="module-navigation">
        <Link to="/learn">← Back to Dashboard</Link>
      </nav>
    </div>
  )
}

export default Module3
