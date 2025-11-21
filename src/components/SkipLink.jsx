/**
 * SkipLink Component
 * 
 * Provides keyboard users with the ability to skip navigation and jump directly
 * to main content. Improves accessibility for screen reader and keyboard users.
 * 
 * Features:
 * - Hidden until focused (keyboard only)
 * - Smooth scroll to target
 * - WCAG 2.1 AA compliant
 * - Visible focus indicator
 * 
 * @component
 */

import React from 'react'
import PropTypes from 'prop-types'
import '@styles/accessibility.css'

const SkipLink = ({ 
  href = '#main-content',
  text = 'Skip to main content',
  className = '',
  ...props 
}) => {
  const handleClick = (e) => {
    e.preventDefault()
    const target = document.querySelector(href)
    
    if (target) {
      // Set tabindex to make element focusable
      target.setAttribute('tabindex', '-1')
      
      // Focus the target element
      target.focus()
      
      // Smooth scroll to target
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      
      // Remove tabindex after focus (cleanup)
      target.addEventListener('blur', () => {
        target.removeAttribute('tabindex')
      }, { once: true })
    }
  }

  return (
    <a
      href={href}
      className={`skip-link ${className}`}
      onClick={handleClick}
      {...props}
    >
      {text}
    </a>
  )
}

SkipLink.propTypes = {
  /** Target element ID (with #) */
  href: PropTypes.string,
  /** Text to display when focused */
  text: PropTypes.string,
  /** Additional CSS classes */
  className: PropTypes.string,
}

export default SkipLink
