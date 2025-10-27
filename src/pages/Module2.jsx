import React from 'react'
import { Link } from 'react-router-dom'

function Module2() {
  return (
    <div className="module-page">
      <h1>Module 2: Core Mechanics</h1>
      <p>Explore Tokenization, Attention, and Embeddings</p>
      {/* Module content will be implemented in later tasks */}
      
      <nav className="module-navigation">
        <Link to="/learn">← Back to Dashboard</Link>
      </nav>
    </div>
  )
}

export default Module2
