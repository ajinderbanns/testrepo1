import React from 'react'
import { Link } from 'react-router-dom'

function Module1() {
  return (
    <div className="module-page">
      <h1>Module 1: Introduction to LLMs</h1>
      <p>Learn the basics of Large Language Models</p>
      {/* Module content will be implemented in later tasks */}
      
      <nav className="module-navigation">
        <Link to="/learn">← Back to Dashboard</Link>
      </nav>
    </div>
  )
}

export default Module1
