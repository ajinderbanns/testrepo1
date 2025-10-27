/**
 * useTheme Hook
 * 
 * Custom React hook for accessing theme context in components.
 * Provides easy access to current theme object and theme switching function.
 * 
 * This hook must be used within a ThemeProvider component tree.
 * 
 * @module useTheme
 */

import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

/**
 * useTheme Hook
 * 
 * Access theme state and functions from any component.
 * 
 * @returns {Object} Theme context value
 * @returns {Object} return.theme - Current theme object with all design tokens
 * @returns {string} return.themeName - Current theme name ('male', 'female', or 'neutral')
 * @returns {Function} return.switchTheme - Function to switch themes
 * @returns {string[]} return.availableThemes - Array of available theme names
 * 
 * @throws {Error} If used outside of ThemeProvider
 * 
 * @example
 * // Basic usage
 * function MyComponent() {
 *   const { theme, themeName, switchTheme } = useTheme()
 *   
 *   return (
 *     <div style={{ backgroundColor: theme.colors.primary.main }}>
 *       <p>Current theme: {themeName}</p>
 *       <button onClick={() => switchTheme('female')}>
 *         Switch to Female Theme
 *       </button>
 *     </div>
 *   )
 * }
 * 
 * @example
 * // Using with styled components
 * function StyledComponent() {
 *   const { theme } = useTheme()
 *   
 *   return (
 *     <div
 *       style={{
 *         color: theme.colors.text.primary,
 *         padding: theme.spacing.md,
 *         borderRadius: theme.radii.medium,
 *         fontSize: theme.typography.size.body,
 *       }}
 *     >
 *       Content
 *     </div>
 *   )
 * }
 * 
 * @example
 * // Theme switcher component
 * function ThemeSwitcher() {
 *   const { themeName, switchTheme, availableThemes } = useTheme()
 *   
 *   return (
 *     <div>
 *       <h3>Select Theme:</h3>
 *       {availableThemes.map(theme => (
 *         <button
 *           key={theme}
 *           onClick={() => switchTheme(theme)}
 *           disabled={themeName === theme}
 *         >
 *           {theme.charAt(0).toUpperCase() + theme.slice(1)}
 *         </button>
 *       ))}
 *     </div>
 *   )
 * }
 */
export const useTheme = () => {
  const context = useContext(ThemeContext)
  
  // Ensure hook is used within ThemeProvider
  if (!context) {
    throw new Error(
      'useTheme must be used within a ThemeProvider. ' +
      'Wrap your app or component tree with <ThemeProvider>...</ThemeProvider>'
    )
  }
  
  return context
}

export default useTheme
