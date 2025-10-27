import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Footer from './Footer'
import './AppLayout.css'

/**
 * AppLayout Component
 * Root-level wrapper component that provides consistent structure across the application
 * Includes Header and Footer, with main content area for children
 * Provides theme-aware styling hooks and responsive design
 */
function AppLayout({ 
  children, 
  showHeader = true, 
  showFooter = true,
  showNav = true,
  className = '',
  contentClassName = ''
}) {
  return (
    <div className={`app-layout ${className}`}>
      {/* Header Section */}
      {showHeader && <Header showNav={showNav} />}

      {/* Main Content Area */}
      <main className={`app-main ${contentClassName}`}>
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
}

export default AppLayout
