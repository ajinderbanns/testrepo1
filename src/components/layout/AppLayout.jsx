import React from 'react'
import PropTypes from 'prop-types'
import { AppHeader } from '../Navigation'
import SkipLink from '../SkipLink'
import Footer from './Footer'
import './AppLayout.css'

/**
 * AppLayout Component
 * Root-level wrapper component that provides consistent structure across the application
 * Includes AppHeader (enhanced navigation) and Footer, with main content area for children
 * Provides theme-aware styling hooks and responsive design
 * 
 * Accessibility Features:
 * - Skip link for keyboard navigation
 * - Semantic HTML structure
 * - Proper landmark regions
 * - ARIA labels where needed
 */
function AppLayout({ 
  children, 
  showHeader = true, 
  showFooter = true,
  showNav = true,
  className = '',
  contentClassName = '',
  mainId = 'main-content'
}) {
  return (
    <div className={`app-layout ${className}`} role="document">
      {/* Skip Link for Keyboard Users */}
      {showNav && <SkipLink href={`#${mainId}`} text="Skip to main content" />}
      
      {/* Enhanced Header with Navigation */}
      {showHeader && <AppHeader showNav={showNav} />}

      {/* Main Content Area with Semantic HTML and ARIA */}
      <main 
        id={mainId}
        className={`app-main ${contentClassName}`}
        role="main"
        aria-label="Main content"
      >
        {children}
      </main>

      {/* Footer Section */}
      {showFooter && <Footer />}
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
  showNav: PropTypes.bool,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  mainId: PropTypes.string,
}

export default AppLayout
