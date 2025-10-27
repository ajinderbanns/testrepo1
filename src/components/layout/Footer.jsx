import React from 'react'
import PropTypes from 'prop-types'
import './Footer.css'

/**
 * Footer Component
 * Bottom section with credits/links
 * Provides consistent footer across all pages with responsive design
 */
function Footer({ className = '', showLinks = true }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={`app-footer ${className}`}>
      <div className="footer-content">
        {/* Footer Links Section */}
        {showLinks && (
          <nav className="footer-nav">
            <ul className="footer-links">
              <li className="footer-link-item">
                <a href="#about" className="footer-link">
                  About
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#privacy" className="footer-link">
                  Privacy
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#contact" className="footer-link">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        )}

        {/* Copyright Section */}
        <div className="footer-copyright">
          <p>&copy; {currentYear} LLM Education. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  className: PropTypes.string,
  showLinks: PropTypes.bool,
}

export default Footer
