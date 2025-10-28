import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import Tooltip from '../ui/Tooltip'
import '../../styles/GenderSelection.css'

/**
 * GenderSelection Component
 * 
 * Interactive gender selection interface with visual theme previews.
 * Features two cards showing male (Euphoria-inspired) and female (warm, peachy) theme aesthetics.
 * 
 * Design Features:
 * - Equal prominence for both options (no default selection)
 * - Hover animations for interactive feedback
 * - Selection animations with checkmark and highlight
 * - Responsive layout (stack on mobile, side-by-side on desktop)
 * - Optional "Why we ask" explanation tooltip
 * - Sample UI elements showcasing each theme's aesthetic
 * 
 * @component
 * @example
 * <GenderSelection 
 *   onSelect={(gender) => console.log('Selected:', gender)}
 * />
 */
function GenderSelection({ onSelect, className = '' }) {
  const [selectedGender, setSelectedGender] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Handle card selection
  const handleSelect = (gender) => {
    if (selectedGender === gender || isTransitioning) return
    
    setSelectedGender(gender)
    setIsTransitioning(true)
    
    // Call parent callback after selection animation
    setTimeout(() => {
      if (onSelect) {
        onSelect(gender)
      }
      setIsTransitioning(false)
    }, 600)
  }

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    selected: {
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  }

  // Checkmark animation
  const checkmarkVariants = {
    hidden: { scale: 0, rotate: -180, opacity: 0 },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  }

  // Glow effect animation
  const glowVariants = {
    idle: { opacity: 0.3 },
    hover: {
      opacity: 0.6,
      scale: 1.1,
      transition: { duration: 0.3 },
    },
    selected: {
      opacity: 0.8,
      scale: 1.2,
      transition: { duration: 0.4 },
    },
  }

  return (
    <div className={`gender-selection ${className}`}>
      {/* Header Section */}
      <motion.div
        className="gender-selection__header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="gender-selection__title">Choose Your Experience</h2>
        <p className="gender-selection__subtitle">
          Select a visual theme that resonates with you
        </p>
        
        {/* Optional "Why we ask" tooltip */}
        <Tooltip
          content="We customize the visual aesthetic to create a more personalized learning experience. This choice only affects colors and design style."
          position="bottom"
          delay={100}
        >
          <button className="gender-selection__info-button" aria-label="Why we ask this">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="gender-selection__info-text">Why we ask this</span>
          </button>
        </Tooltip>
      </motion.div>

      {/* Cards Container */}
      <motion.div
        className="gender-selection__cards"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Male Theme Card - Euphoria Inspired */}
        <motion.div
          className={`gender-selection__card gender-selection__card--male ${
            selectedGender === 'male' ? 'gender-selection__card--selected' : ''
          }`}
          variants={cardVariants}
          whileHover={!selectedGender ? 'hover' : undefined}
          animate={selectedGender === 'male' ? 'selected' : 'visible'}
          onClick={() => handleSelect('male')}
          role="button"
          tabIndex={0}
          aria-label="Select male theme: Bold, neon, high contrast"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleSelect('male')
            }
          }}
        >
          {/* Glow Effect */}
          <motion.div
            className="gender-selection__card-glow gender-selection__card-glow--male"
            variants={glowVariants}
            initial="idle"
            whileHover={!selectedGender ? 'hover' : undefined}
            animate={selectedGender === 'male' ? 'selected' : 'idle'}
          />

          {/* Card Content */}
          <div className="gender-selection__card-content">
            {/* Theme Preview */}
            <div className="gender-selection__preview">
              <div className="gender-selection__preview-bg gender-selection__preview-bg--male" />
              
              {/* Color Swatches */}
              <div className="gender-selection__swatches">
                <div className="gender-selection__swatch" style={{ backgroundColor: '#9333EA' }} />
                <div className="gender-selection__swatch" style={{ backgroundColor: '#3B82F6' }} />
                <div className="gender-selection__swatch" style={{ backgroundColor: '#EC4899' }} />
                <div className="gender-selection__swatch" style={{ backgroundColor: '#F97316' }} />
              </div>

              {/* Sample UI Elements */}
              <div className="gender-selection__samples gender-selection__samples--male">
                <div className="gender-selection__sample-button">Explore</div>
                <div className="gender-selection__sample-badge">NEW</div>
                <div className="gender-selection__sample-text">Bold & Dynamic</div>
              </div>
            </div>

            {/* Theme Info */}
            <div className="gender-selection__info">
              <h3 className="gender-selection__card-title">Bold & Vibrant</h3>
              <p className="gender-selection__card-description">
                High contrast colors with neon accents and modern aesthetics
              </p>
              <div className="gender-selection__tags">
                <span className="gender-selection__tag">Euphoria-inspired</span>
                <span className="gender-selection__tag">Energetic</span>
              </div>
            </div>
          </div>

          {/* Selection Checkmark */}
          <AnimatePresence>
            {selectedGender === 'male' && (
              <motion.div
                className="gender-selection__checkmark"
                variants={checkmarkVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="11" fill="currentColor" />
                  <path d="M7 12L10.5 15.5L17 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Female Theme Card - Warm & Peachy */}
        <motion.div
          className={`gender-selection__card gender-selection__card--female ${
            selectedGender === 'female' ? 'gender-selection__card--selected' : ''
          }`}
          variants={cardVariants}
          whileHover={!selectedGender ? 'hover' : undefined}
          animate={selectedGender === 'female' ? 'selected' : 'visible'}
          onClick={() => handleSelect('female')}
          role="button"
          tabIndex={0}
          aria-label="Select female theme: Warm, soft, inviting"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleSelect('female')
            }
          }}
        >
          {/* Glow Effect */}
          <motion.div
            className="gender-selection__card-glow gender-selection__card-glow--female"
            variants={glowVariants}
            initial="idle"
            whileHover={!selectedGender ? 'hover' : undefined}
            animate={selectedGender === 'female' ? 'selected' : 'idle'}
          />

          {/* Card Content */}
          <div className="gender-selection__card-content">
            {/* Theme Preview */}
            <div className="gender-selection__preview">
              <div className="gender-selection__preview-bg gender-selection__preview-bg--female" />
              
              {/* Color Swatches */}
              <div className="gender-selection__swatches">
                <div className="gender-selection__swatch" style={{ backgroundColor: '#FF7F50' }} />
                <div className="gender-selection__swatch" style={{ backgroundColor: '#FFB6C1' }} />
                <div className="gender-selection__swatch" style={{ backgroundColor: '#FFD93D' }} />
                <div className="gender-selection__swatch" style={{ backgroundColor: '#FFDAB9' }} />
              </div>

              {/* Sample UI Elements */}
              <div className="gender-selection__samples gender-selection__samples--female">
                <div className="gender-selection__sample-button">Explore</div>
                <div className="gender-selection__sample-badge">NEW</div>
                <div className="gender-selection__sample-text">Warm & Inviting</div>
              </div>
            </div>

            {/* Theme Info */}
            <div className="gender-selection__info">
              <h3 className="gender-selection__card-title">Warm & Inviting</h3>
              <p className="gender-selection__card-description">
                Soft peachy tones with sunset vibes and friendly aesthetics
              </p>
              <div className="gender-selection__tags">
                <span className="gender-selection__tag">Summer-inspired</span>
                <span className="gender-selection__tag">Comforting</span>
              </div>
            </div>
          </div>

          {/* Selection Checkmark */}
          <AnimatePresence>
            {selectedGender === 'female' && (
              <motion.div
                className="gender-selection__checkmark"
                variants={checkmarkVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="11" fill="currentColor" />
                  <path d="M7 12L10.5 15.5L17 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Helper Text */}
      {!selectedGender && (
        <motion.p
          className="gender-selection__helper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Select a theme to continue
        </motion.p>
      )}
    </div>
  )
}

GenderSelection.propTypes = {
  /** Callback function when a gender/theme is selected */
  onSelect: PropTypes.func,
  /** Additional CSS classes */
  className: PropTypes.string,
}

export default GenderSelection
