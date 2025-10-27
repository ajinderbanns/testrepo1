import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Header.css'

/**
 * Header Component
 * Top navigation/branding component that adapts to different page contexts
 * Provides responsive navigation across desktop, tablet, and mobile viewports
 */
function Header({ showNav = true, className = '' }) {
  const location = useLocation()
  const isLanding = location.pathname === '/'

  // Navigation links configuration
  const navLinks = [
    { to: '/learn', label: 'Learn' },
    { to: '/module/1', label: 'Module 1' },
    { to: '/module/2', label: 'Module 2' },
    { to: '/module/3', label: 'Module 3' },
  ]

  return (
    <header className={`app-header ${className}`}>
      <div className="header-content">
        {/* Logo/Brand Section */}
        <div className="header-brand">
          <Link to="/" className="brand-link">
            <h1 className="brand-title">LLM Education</h1>
          </Link>
        </div>

        {/* Navigation Section - Hidden on landing page or when showNav is false */}
        {showNav && !isLanding && (
          <nav className="header-nav">
            <ul className="nav-list">
              {navLinks.map((link) => (
                <li key={link.to} className="nav-item">
                  <Link
                    to={link.to}
                    className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Mobile Menu Toggle (placeholder for future implementation) */}
        {showNav && !isLanding && (
          <button className="mobile-menu-toggle" aria-label="Toggle navigation menu">
            <span className="menu-icon"></span>
          </button>
        )}
      </div>
    </header>
  )
}

Header.propTypes = {
  showNav: PropTypes.bool,
  className: PropTypes.string,
}

export default Header
