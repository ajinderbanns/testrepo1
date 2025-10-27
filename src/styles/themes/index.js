/**
 * Theme System - Central Export
 * 
 * This module exports all theme configurations and utilities for the application.
 * 
 * Available themes:
 * - maleTheme: Bold, neon, high-contrast (Euphoria-inspired)
 * - femaleTheme: Warm, soft, inviting (Summer/Sex Ed-inspired)
 * 
 * Usage with ThemeProvider:
 * ```jsx
 * import { ThemeProvider } from 'styled-components' // or @emotion/react
 * import { maleTheme, femaleTheme } from '@/styles/themes'
 * 
 * function App() {
 *   const [selectedTheme, setSelectedTheme] = useState('male')
 *   const theme = selectedTheme === 'male' ? maleTheme : femaleTheme
 *   
 *   return (
 *     <ThemeProvider theme={theme}>
 *       <YourApp />
 *     </ThemeProvider>
 *   )
 * }
 * ```
 * 
 * Usage with React Context (custom implementation):
 * ```jsx
 * import { themes, getTheme } from '@/styles/themes'
 * 
 * const ThemeContext = React.createContext()
 * 
 * function ThemeProvider({ children }) {
 *   const [currentTheme, setCurrentTheme] = useState('male')
 *   const theme = getTheme(currentTheme)
 *   
 *   return (
 *     <ThemeContext.Provider value={{ theme, setCurrentTheme }}>
 *       {children}
 *     </ThemeContext.Provider>
 *   )
 * }
 * ```
 * 
 * Accessing theme tokens in components:
 * ```jsx
 * // With styled-components/Emotion
 * const Button = styled.button`
 *   background-color: ${props => props.theme.colors.primary.main};
 *   padding: ${props => props.theme.spacing.md};
 *   font-size: ${props => props.theme.typography.size.body};
 *   border-radius: ${props => props.theme.radii.medium};
 *   box-shadow: ${props => props.theme.shadows.medium};
 * `
 * 
 * // With inline styles (React Context)
 * function MyComponent() {
 *   const { theme } = useTheme()
 *   
 *   return (
 *     <div style={{
 *       backgroundColor: theme.colors.primary.main,
 *       padding: theme.spacing.md,
 *       fontSize: theme.typography.size.body,
 *     }}>
 *       Content
 *     </div>
 *   )
 * }
 * ```
 * 
 * @module themes
 */

// Import base theme
export { baseTheme } from './base.js'

// Import specific themes
export { maleTheme } from './maleTheme.js'
export { femaleTheme } from './femaleTheme.js'

// Import default exports
import maleTheme from './maleTheme.js'
import femaleTheme from './femaleTheme.js'

/**
 * Themes Object
 * 
 * Collection of all available themes indexed by name.
 * Useful for dynamic theme switching.
 */
export const themes = {
  male: maleTheme,
  female: femaleTheme,
}

/**
 * Get Theme by Name
 * 
 * Utility function to retrieve a theme by its name.
 * Falls back to maleTheme if theme name is invalid.
 * 
 * @param {string} themeName - Name of the theme ('male' or 'female')
 * @returns {Object} Theme configuration object
 * 
 * @example
 * const theme = getTheme('female')
 * console.log(theme.colors.primary.main) // '#FF7F50' (coral)
 */
export const getTheme = (themeName) => {
  return themes[themeName] || themes.male
}

/**
 * Theme Names
 * 
 * Array of available theme names.
 * Useful for building theme selectors or validators.
 */
export const themeNames = Object.keys(themes)

/**
 * Default Theme
 * 
 * The default theme to use when no theme is specified.
 */
export const defaultTheme = maleTheme

/**
 * Theme Validator
 * 
 * Checks if a theme name is valid.
 * 
 * @param {string} themeName - Name to validate
 * @returns {boolean} True if theme exists
 * 
 * @example
 * isValidTheme('male') // true
 * isValidTheme('invalid') // false
 */
export const isValidTheme = (themeName) => {
  return themeNames.includes(themeName)
}

/**
 * Theme Metadata Extractor
 * 
 * Extracts metadata from all themes for display purposes.
 * Useful for building theme selection UIs.
 * 
 * @returns {Array} Array of theme metadata objects
 * 
 * @example
 * const metadata = getThemeMetadata()
 * // [
 * //   { name: 'male', variant: 'euphoria', description: '...', ... },
 * //   { name: 'female', variant: 'summer-sex-ed', description: '...', ... }
 * // ]
 */
export const getThemeMetadata = () => {
  return themeNames.map(name => ({
    name: themes[name].name,
    variant: themes[name].variant,
    ...themes[name].meta,
  }))
}

// Default export (primary male theme)
export default maleTheme
