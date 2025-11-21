/**
 * useContent Hook
 * 
 * Custom React hook for accessing gender-specific content throughout the application.
 * Provides easy access to module content, gamification elements, and UI copy.
 * 
 * Features:
 * - Access to current content based on theme/gender
 * - Module-specific content retrieval
 * - Gamification content (badges, achievements, celebrations)
 * - UI copy and labels
 * - Automatic updates when theme changes
 * 
 * @module useContent
 */

import { useContext } from 'react'
import { ContentContext } from '../contexts/ContentContext'

/**
 * useContent Hook
 * 
 * Access gender-specific content throughout the application.
 * Content automatically updates when theme/gender preference changes.
 * 
 * @returns {Object} Content state and helper functions
 * @returns {Object} return.content - Full content object for current theme
 * @returns {string} return.contentType - Current content type ('male', 'female', or 'neutral')
 * @returns {Function} return.getModuleContent - Get content for a specific module
 * @returns {Function} return.getGamificationContent - Get gamification elements
 * @returns {Function} return.getUIContent - Get UI copy and labels
 * 
 * @throws {Error} If used outside ContentProvider
 * 
 * @example
 * function ModuleSection() {
 *   const { getModuleContent } = useContent()
 *   const moduleContent = getModuleContent(1)
 *   
 *   return (
 *     <div>
 *       <h2>{moduleContent.title}</h2>
 *       <p>{moduleContent.intro.description}</p>
 *     </div>
 *   )
 * }
 * 
 * @example
 * // Accessing gamification content
 * function AchievementBadge({ type }) {
 *   const { getGamificationContent } = useContent()
 *   const gamification = getGamificationContent()
 *   
 *   return (
 *     <div>
 *       <span>{gamification.badges[type].name}</span>
 *       <span>{gamification.badges[type].icon}</span>
 *     </div>
 *   )
 * }
 * 
 * @example
 * // Accessing UI content
 * function NavigationButton() {
 *   const { getUIContent } = useContent()
 *   const ui = getUIContent()
 *   
 *   return <button>{ui.navigation.next}</button>
 * }
 */
export const useContent = () => {
  const context = useContext(ContentContext)
  
  if (!context) {
    throw new Error(
      'useContent must be used within a ContentProvider. ' +
      'Make sure your component is wrapped with <ContentProvider>.'
    )
  }
  
  return context
}

export default useContent
