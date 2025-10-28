import React from 'react'
import { Link } from 'react-router-dom'
import ContinueLearning from '../components/ContinueLearning'
import ResetProgress from '../components/settings/ResetProgress'

function Learn() {
  return (
    <div className="learn-page" style={styles.page}>
      <h1 style={styles.title}>Learning Dashboard</h1>
      <p style={styles.subtitle}>Track your progress and continue your learning journey</p>
      
      {/* Continue Learning Card */}
      <div style={styles.continueSection}>
        <ContinueLearning />
      </div>
      
      {/* Modules List */}
      <div style={styles.modulesSection}>
        <h2 style={styles.sectionTitle}>All Modules</h2>
        <div className="modules-list" style={styles.modulesList}>
          <div className="module-card" style={styles.moduleCard}>
            <h3>Module 1</h3>
            <p>Introduction to LLMs (Basics)</p>
            <Link to="/module/1" style={styles.link}>Start Module 1</Link>
          </div>
          
          <div className="module-card" style={styles.moduleCard}>
            <h3>Module 2</h3>
            <p>Core Mechanics (Tokenization, Attention, Embeddings)</p>
            <Link to="/module/2" style={styles.link}>Start Module 2</Link>
          </div>
          
          <div className="module-card" style={styles.moduleCard}>
            <h3>Module 3</h3>
            <p>Comprehensive Overview (Training, Inference, Architecture)</p>
            <Link to="/module/3" style={styles.link}>Start Module 3</Link>
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div style={styles.settingsSection}>
        <h2 style={styles.sectionTitle}>Settings</h2>
        <ResetProgress />
      </div>
    </div>
  )
}

// Basic styles
const styles = {
  page: {
    padding: '32px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: '32px',
  },
  continueSection: {
    marginBottom: '48px',
  },
  modulesSection: {
    marginBottom: '48px',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    marginBottom: '16px',
  },
  modulesList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
  },
  moduleCard: {
    padding: '24px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  link: {
    display: 'inline-block',
    marginTop: '12px',
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '4px',
  },
  settingsSection: {
    marginTop: '48px',
    paddingTop: '32px',
    borderTop: '1px solid #ddd',
  },
}

export default Learn
