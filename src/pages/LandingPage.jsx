import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'
import { useTheme } from '../hooks/useTheme'
import '../styles/LandingPage.css'

/**
 * LandingPage Component
 * 
 * Cinematic landing page with entrance animations and gender-neutral design.
 * Features compelling introduction copy, abstract visuals, and prominent CTA.
 * 
 * Design Philosophy:
 * - Gender-neutral aesthetic balancing warm (peachy/coral) and cool (purple/blue) tones
 * - Cinematic entrance sequence with Framer Motion animations
 * - Abstract visualizations suggesting AI/learning concepts
 * - Mobile-first responsive design
 * - Full accessibility support
 * 
 * @component
 */
function LandingPage() {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const [isLoaded, setIsLoaded] = useState(false)

  // Trigger entrance animations after mount
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Navigation handler
  const handleGetStarted = () => {
    navigate('/learn')
  }

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // Custom easing for smooth feel
      },
    },
  }

  const heroVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  // Floating animation for background elements
  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  const floatingVariants2 = {
    animate: {
      y: [0, 15, 0],
      x: [0, -15, 0],
      rotate: [0, -5, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <div className="landing-page" role="main">
      {/* Animated Background Elements */}
      <div className="landing-background" aria-hidden="true">
        {/* Gradient Orbs - Gender-neutral blend of warm and cool */}
        <motion.div
          className="gradient-orb gradient-orb-1"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="gradient-orb gradient-orb-2"
          variants={floatingVariants2}
          animate="animate"
        />
        <motion.div
          className="gradient-orb gradient-orb-3"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '1s' }}
        />
        
        {/* Abstract Neural Network Pattern */}
        <div className="neural-network">
          <svg className="network-svg" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(147, 51, 234, 0.2)" />
                <stop offset="100%" stopColor="rgba(255, 127, 80, 0.2)" />
              </linearGradient>
              <linearGradient id="lineGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
                <stop offset="100%" stopColor="rgba(255, 182, 193, 0.2)" />
              </linearGradient>
            </defs>
            
            {/* Connection Lines */}
            <motion.line
              x1="100" y1="100" x2="300" y2="200"
              stroke="url(#lineGradient1)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 2, delay: 0.5 }}
            />
            <motion.line
              x1="300" y1="200" x2="500" y2="150"
              stroke="url(#lineGradient2)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 2, delay: 0.8 }}
            />
            <motion.line
              x1="500" y1="150" x2="700" y2="250"
              stroke="url(#lineGradient1)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 2, delay: 1.1 }}
            />
            <motion.line
              x1="200" y1="400" x2="400" y2="350"
              stroke="url(#lineGradient2)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 2, delay: 1.4 }}
            />
            <motion.line
              x1="400" y1="350" x2="600" y2="450"
              stroke="url(#lineGradient1)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 2, delay: 1.7 }}
            />
            
            {/* Nodes */}
            {[
              { cx: 100, cy: 100, delay: 0.5 },
              { cx: 300, cy: 200, delay: 0.8 },
              { cx: 500, cy: 150, delay: 1.1 },
              { cx: 700, cy: 250, delay: 1.4 },
              { cx: 200, cy: 400, delay: 1.7 },
              { cx: 400, cy: 350, delay: 2.0 },
              { cx: 600, cy: 450, delay: 2.3 },
            ].map((node, i) => (
              <motion.circle
                key={i}
                cx={node.cx}
                cy={node.cy}
                r="4"
                fill="currentColor"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.8 }}
                transition={{ duration: 0.5, delay: node.delay }}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Main Content Container */}
      <motion.div
        className="landing-container"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? 'visible' : 'hidden'}
      >
        {/* Hero Section */}
        <motion.section
          className="hero-section"
          variants={heroVariants}
        >
          <motion.div className="hero-content" variants={itemVariants}>
            <h1 className="hero-title">
              <span className="hero-title-line">Understanding</span>
              <span className="hero-title-line hero-title-gradient">Language Models</span>
              <span className="hero-title-line">One Concept at a Time</span>
            </h1>
            
            <motion.p className="hero-subtitle" variants={itemVariants}>
              Explore the fascinating world of AI language models through
              interactive lessons designed for curious minds
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Feature Cards Section */}
        <motion.section 
          className="features-section"
          variants={itemVariants}
        >
          <div className="features-grid">
            <motion.div 
              className="feature-card"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="feature-icon" aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-title">Interactive Learning</h3>
              <p className="feature-description">
                Hands-on exploration of how AI understands and generates language
              </p>
            </motion.div>

            <motion.div 
              className="feature-card"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="feature-icon" aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="feature-title">At Your Own Pace</h3>
              <p className="feature-description">
                Learn when you want, how you want, with progress saved along the way
              </p>
            </motion.div>

            <motion.div 
              className="feature-card"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="feature-icon" aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 11.08V12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C14.76 2 17.25 3.09 19.07 4.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-title">Real Understanding</h3>
              <p className="feature-description">
                Move beyond buzzwords to genuinely understand how LLMs work
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Journey Section */}
        <motion.section 
          className="journey-section"
          variants={itemVariants}
        >
          <h2 className="section-title">Your Learning Journey</h2>
          <p className="section-description">
            From tokens to transformers, discover the building blocks of modern AI.
            Each module builds on the last, creating a comprehensive understanding
            of language models that you can apply in the real world.
          </p>
          
          <div className="journey-steps">
            <motion.div 
              className="journey-step"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="step-number">01</div>
              <h3 className="step-title">Tokenization</h3>
              <p className="step-description">
                Learn how AI breaks down language into digestible pieces
              </p>
            </motion.div>

            <motion.div 
              className="journey-step"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="step-number">02</div>
              <h3 className="step-title">Embeddings</h3>
              <p className="step-description">
                Discover how words become meaningful mathematical representations
              </p>
            </motion.div>

            <motion.div 
              className="journey-step"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="step-number">03</div>
              <h3 className="step-title">Architecture</h3>
              <p className="step-description">
                Explore the transformer model that powers modern AI
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="cta-section"
          variants={itemVariants}
        >
          <motion.div
            className="cta-content"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="cta-title">Ready to Begin?</h2>
            <p className="cta-description">
              Start your journey into the world of language models today.
              No prerequisites required—just curiosity.
            </p>
            <Button
              variant="primary"
              size="large"
              onClick={handleGetStarted}
              className="cta-button"
              aria-label="Get started with learning about language models"
            >
              Get Started
            </Button>
          </motion.div>
        </motion.section>
      </motion.div>
    </div>
  )
}

export default LandingPage
