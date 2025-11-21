/**
 * ContentContext - Gender-Specific Content Management
 * 
 * Provides content variations based on gender/theme selection.
 * Handles dynamic content delivery, smooth transitions, and fallbacks.
 * 
 * Features:
 * - Content state management (male/female/neutral variations)
 * - Automatic synchronization with ThemeContext
 * - Smooth content switching without data loss
 * - Fallback to neutral content
 * - Module-specific content delivery
 * - Gamification content (badges, celebrations)
 * 
 * Usage:
 * ```jsx
 * import { ContentProvider } from './contexts/ContentContext'
 * 
 * function App() {
 *   return (
 *     <ContentProvider>
 *       <YourApp />
 *     </ContentProvider>
 *   )
 * }
 * ```
 * 
 * @module ContentContext
 */

import React, { createContext, useMemo, useContext } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '../hooks/useTheme'
import { maleContent } from '../data/content-male'
import { femaleContent } from '../data/content-female'
import { neutralContent } from '../data/content-neutral'

/**
 * Content Context
 * 
 * Context object for gender-specific content access.
 * Use with useContext(ContentContext) or the custom useContent hook.
 */
export const ContentContext = createContext({
  content: neutralContent,
  contentType: 'neutral',
  getModuleContent: () => ({}),
  getGamificationContent: () => ({}),
  getUIContent: () => ({}),
})

/**
 * Get Content by Theme Name
 * 
 * Returns the appropriate content object based on theme/gender selection.
 * Falls back to neutral content if theme is not recognized.
 * 
 * @param {string} themeName - Theme name ('male', 'female', or 'neutral')
 * @returns {Object} Content object with all variations
 */
const getContentByTheme = (themeName) => {
  const contentMap = {
    male: maleContent,
    female: femaleContent,
    neutral: neutralContent,
  }
  return contentMap[themeName] || neutralContent
}

/**
 * ContentProvider Component
 * 
 * Wraps the application and provides gender-specific content to all child components.
 * Automatically syncs with ThemeContext to deliver appropriate content variations.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 * 
 * @example
 * <ContentProvider>
 *   <App />
 * </ContentProvider>
 */
export const ContentProvider = ({ children }) => {
  // Get current theme from ThemeContext
  const { themeName } = useTheme()
  
  // Get content based on current theme
  const content = useMemo(() => {
    return getContentByTheme(themeName)
  }, [themeName])
  
  /**
   * Get Module-Specific Content
   * 
   * Retrieves all content for a specific module including examples,
   * analogies, exercises, and UI copy.
   * 
   * @param {number} moduleId - Module ID (1, 2, or 3)
   * @returns {Object} Module content object
   */
  const getModuleContent = useMemo(() => {
    return (moduleId) => {
      const moduleKey = `module${moduleId}`
      return content.modules?.[moduleKey] || {}
    }
  }, [content])
  
  /**
   * Get Gamification Content
   * 
   * Retrieves gamification elements like badge names, achievement titles,
   * celebration messages, and progress indicators.
   * 
   * @returns {Object} Gamification content object
   */
  const getGamificationContent = useMemo(() => {
    return () => {
      return content.gamification || {}
    }
  }, [content])
  
  /**
   * Get UI Content
   * 
   * Retrieves general UI copy like labels, buttons, instructions,
   * and helper text.
   * 
   * @returns {Object} UI content object
   */
  const getUIContent = useMemo(() => {
    return () => {
      return content.ui || {}
    }
  }, [content])
  
  // Context value with memoization to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      content,
      contentType: themeName,
      getModuleContent,
      getGamificationContent,
      getUIContent,
    }),
    [content, themeName, getModuleContent, getGamificationContent, getUIContent]
  )
  
  return (
    <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>
  )
}

ContentProvider.propTypes = {
  /** Child components to wrap with content provider */
  children: PropTypes.node.isRequired,
}

/**
 * useContent Hook (convenience export)
 * 
 * Custom hook to access content context.
 * Provides error checking and helpful error messages.
 * 
 * @returns {Object} Content context value
 * @throws {Error} If used outside ContentProvider
 */
export const useContent = () => {
  const context = useContext(ContentContext)
  
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider')
  }
  
  return context
}

export default ContentProvider
