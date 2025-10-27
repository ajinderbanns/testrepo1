/**
 * ThemeContext - Theme Management with React Context API
 * 
 * Provides theme state and switching functionality to the entire application.
 * Handles localStorage persistence, CSS variable application, and smooth transitions.
 * 
 * Features:
 * - Theme state management (male/female/neutral)
 * - LocalStorage persistence
 * - Automatic theme loading on app start
 * - CSS custom properties for global theme access
 * - Theme switching function with smooth transitions
 * 
 * Usage:
 * ```jsx
 * import { ThemeProvider } from './contexts/ThemeContext'
 * 
 * function App() {
 *   return (
 *     <ThemeProvider>
 *       <YourApp />
 *     </ThemeProvider>
 *   )
 * }
 * ```
 * 
 * @module ThemeContext
 */

import React, { createContext, useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { themes, getTheme } from '../styles/themes'
import { getStoredTheme, setStoredTheme } from '../utils/storage'

/**
 * Theme Context
 * 
 * Context object for theme state and functions.
 * Use with useContext(ThemeContext) or the custom useTheme hook.
 */
export const ThemeContext = createContext({
  theme: themes.male,
  themeName: 'male',
  switchTheme: () => {},
  availableThemes: ['male', 'female', 'neutral'],
})

/**
 * Default Theme Configuration
 * 
 * The default theme to use when:
 * - No theme is stored in localStorage (first-time visitor)
 * - Stored theme is invalid
 * - 'neutral' theme is selected (maps to male theme)
 */
const DEFAULT_THEME_NAME = 'male'

/**
 * Apply Theme to Root Element
 * 
 * Applies theme colors as CSS custom properties to the :root element.
 * This allows global access to theme values via CSS variables.
 * 
 * @param {Object} theme - Theme object containing colors and other tokens
 * 
 * @example
 * applyThemeToRoot(maleTheme)
 * // Now you can use: background-color: var(--color-primary-main)
 */
const applyThemeToRoot = (theme) => {
  const root = document.documentElement
  
  // Apply color variables
  if (theme.colors) {
    // Primary colors
    if (theme.colors.primary) {
      root.style.setProperty('--color-primary-main', theme.colors.primary.main)
      root.style.setProperty('--color-primary-light', theme.colors.primary.light)
      root.style.setProperty('--color-primary-dark', theme.colors.primary.dark)
      root.style.setProperty('--color-primary-darker', theme.colors.primary.darker)
      root.style.setProperty('--color-primary-contrast', theme.colors.primary.contrast)
    }
    
    // Secondary colors
    if (theme.colors.secondary) {
      root.style.setProperty('--color-secondary-main', theme.colors.secondary.main)
      root.style.setProperty('--color-secondary-light', theme.colors.secondary.light)
      root.style.setProperty('--color-secondary-dark', theme.colors.secondary.dark)
      root.style.setProperty('--color-secondary-darker', theme.colors.secondary.darker)
      root.style.setProperty('--color-secondary-contrast', theme.colors.secondary.contrast)
    }
    
    // Accent colors
    if (theme.colors.accent) {
      root.style.setProperty('--color-accent-main', theme.colors.accent.main)
      root.style.setProperty('--color-accent-light', theme.colors.accent.light)
      root.style.setProperty('--color-accent-dark', theme.colors.accent.dark)
    }
    
    // Background colors
    if (theme.colors.background) {
      root.style.setProperty('--color-bg-primary', theme.colors.background.primary)
      root.style.setProperty('--color-bg-secondary', theme.colors.background.secondary)
      root.style.setProperty('--color-bg-tertiary', theme.colors.background.tertiary)
      root.style.setProperty('--color-bg-elevated', theme.colors.background.elevated)
    }
    
    // Surface colors
    if (theme.colors.surface) {
      root.style.setProperty('--color-surface-base', theme.colors.surface.base)
      root.style.setProperty('--color-surface-raised', theme.colors.surface.raised)
      root.style.setProperty('--color-surface-overlay', theme.colors.surface.overlay)
    }
    
    // Text colors
    if (theme.colors.text) {
      root.style.setProperty('--color-text-primary', theme.colors.text.primary)
      root.style.setProperty('--color-text-secondary', theme.colors.text.secondary)
      root.style.setProperty('--color-text-tertiary', theme.colors.text.tertiary)
      root.style.setProperty('--color-text-disabled', theme.colors.text.disabled)
      root.style.setProperty('--color-text-inverse', theme.colors.text.inverse)
      root.style.setProperty('--color-text-link', theme.colors.text.link)
    }
    
    // Border colors
    if (theme.colors.border) {
      root.style.setProperty('--color-border-default', theme.colors.border.default)
      root.style.setProperty('--color-border-light', theme.colors.border.light)
      root.style.setProperty('--color-border-dark', theme.colors.border.dark)
      root.style.setProperty('--color-border-focus', theme.colors.border.focus)
      root.style.setProperty('--color-border-accent', theme.colors.border.accent)
    }
    
    // State colors
    if (theme.colors.state) {
      root.style.setProperty('--color-success', theme.colors.state.success)
      root.style.setProperty('--color-warning', theme.colors.state.warning)
      root.style.setProperty('--color-error', theme.colors.state.error)
      root.style.setProperty('--color-info', theme.colors.state.info)
    }
  }
  
  // Apply spacing variables (from base theme)
  if (theme.spacing) {
    Object.entries(theme.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value)
    })
  }
  
  // Apply border radius variables
  if (theme.radii) {
    Object.entries(theme.radii).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, value)
    })
  }
  
  // Store theme name as data attribute for CSS selectors
  root.setAttribute('data-theme', theme.name || 'male')
}

/**
 * ThemeProvider Component
 * 
 * Wraps the application and provides theme context to all child components.
 * Manages theme state, localStorage persistence, and CSS variable application.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 * @param {string} [props.defaultTheme] - Optional default theme override
 * 
 * @example
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * 
 * @example
 * // With custom default theme
 * <ThemeProvider defaultTheme="female">
 *   <App />
 * </ThemeProvider>
 */
export const ThemeProvider = ({ children, defaultTheme = DEFAULT_THEME_NAME }) => {
  // Initialize theme state
  // Priority: localStorage > defaultTheme prop > DEFAULT_THEME_NAME
  const [themeName, setThemeName] = useState(() => {
    const stored = getStoredTheme()
    
    // Handle 'neutral' theme by mapping to male theme
    if (stored === 'neutral') {
      return DEFAULT_THEME_NAME
    }
    
    return stored || defaultTheme
  })
  
  // Get the actual theme object based on theme name
  const theme = useMemo(() => {
    return getTheme(themeName)
  }, [themeName])
  
  /**
   * Switch Theme Function
   * 
   * Changes the current theme and persists the choice to localStorage.
   * Triggers CSS variable updates and smooth transitions.
   * 
   * @param {string} newThemeName - Name of the theme to switch to
   * 
   * @example
   * switchTheme('female')
   */
  const switchTheme = (newThemeName) => {
    // Handle 'neutral' theme by mapping to default theme
    const targetTheme = newThemeName === 'neutral' ? DEFAULT_THEME_NAME : newThemeName
    
    // Validate theme exists
    if (!themes[targetTheme]) {
      console.error(`Theme "${newThemeName}" does not exist. Available themes: ${Object.keys(themes).join(', ')}`)
      return
    }
    
    // Update state (triggers re-render and useEffect)
    setThemeName(targetTheme)
    
    // Persist to localStorage
    const success = setStoredTheme(newThemeName) // Store the original name (including 'neutral')
    if (!success) {
      console.warn('Failed to persist theme preference to localStorage')
    }
  }
  
  // Apply theme to DOM on mount and when theme changes
  useEffect(() => {
    applyThemeToRoot(theme)
  }, [theme])
  
  // Context value with memoization to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      theme,
      themeName,
      switchTheme,
      availableThemes: ['male', 'female', 'neutral'],
    }),
    [theme, themeName]
  )
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  defaultTheme: PropTypes.oneOf(['male', 'female', 'neutral']),
}
