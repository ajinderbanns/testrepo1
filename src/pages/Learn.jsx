import React from 'react'
import { Link } from 'react-router-dom'

function Learn() {
  return (
    <div className="learn-page">
      <h1>Learning Dashboard</h1>
      <p>Module Overview - Choose a module to begin learning</p>
      
      <div className="modules-list">
        <div className="module-card">
          <h2>Module 1</h2>
          <p>Introduction to LLMs (Basics)</p>
          <Link to="/module/1">Start Module 1</Link>
        </div>
        
        <div className="module-card">
          <h2>Module 2</h2>
          <p>Core Mechanics (Tokenization, Attention, Embeddings)</p>
          <Link to="/module/2">Start Module 2</Link>
        </div>
        
        <div className="module-card">
          <h2>Module 3</h2>
          <p>Comprehensive Overview (Training, Inference, Architecture)</p>
          <Link to="/module/3">Start Module 3</Link>
        </div>
      </div>
    </div>
  )
}

export default Learn
