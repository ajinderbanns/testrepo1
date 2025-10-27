/**
 * LocalStorage Utilities
 * 
 * Helper functions for storing and retrieving data from localStorage
 * with proper error handling for edge cases.
 * 
 * @module storage
 */

/**
 * Storage Keys
 * 
 * Centralized storage key definitions to prevent typos and ensure consistency.
 */
export const STORAGE_KEYS = {
  THEME: 'app_theme_preference',
}

/**
 * Valid Theme Names
 * 
 * List of valid theme names that can be stored.
 * Any other value will be treated as invalid.
 */
const VALID_THEMES = ['male', 'female', 'neutral']

/**
 * Get Stored Theme Preference
 * 
 * Retrieves the user's theme preference from localStorage.
 * Handles edge cases: cleared storage, invalid values, first-time visitors.
 * 
 * @returns {string|null} Theme name ('male', 'female', 'neutral') or null if not set or invalid
 * 
 * @example
 * const theme = getStoredTheme()
 * if (theme) {
 *   console.log(`User prefers: ${theme}`)
 * } else {
 *   console.log('No theme preference found, using default')
 * }
 */
export const getStoredTheme = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.THEME)
    
    // Return null if no stored value (first-time visitor)
    if (!stored) {
      return null
    }
    
    // Validate the stored value
    if (!VALID_THEMES.includes(stored)) {
      console.warn(`Invalid theme stored in localStorage: "${stored}". Clearing invalid value.`)
      localStorage.removeItem(STORAGE_KEYS.THEME)
      return null
    }
    
    return stored
  } catch (error) {
    // Handle localStorage access errors (private browsing, storage disabled, etc.)
    console.error('Error reading from localStorage:', error)
    return null
  }
}

/**
 * Set Theme Preference in Storage
 * 
 * Saves the user's theme preference to localStorage.
 * Validates the theme name before storing.
 * 
 * @param {string} themeName - Theme name to store ('male', 'female', or 'neutral')
 * @returns {boolean} Success status (true if stored successfully, false otherwise)
 * 
 * @example
 * const success = setStoredTheme('female')
 * if (success) {
 *   console.log('Theme preference saved')
 * } else {
 *   console.error('Failed to save theme preference')
 * }
 */
export const setStoredTheme = (themeName) => {
  try {
    // Validate theme name
    if (!VALID_THEMES.includes(themeName)) {
      console.error(`Invalid theme name: "${themeName}". Must be one of: ${VALID_THEMES.join(', ')}`)
      return false
    }
    
    localStorage.setItem(STORAGE_KEYS.THEME, themeName)
    return true
  } catch (error) {
    // Handle localStorage access errors (quota exceeded, private browsing, etc.)
    console.error('Error writing to localStorage:', error)
    return false
  }
}

/**
 * Remove Stored Theme Preference
 * 
 * Clears the theme preference from localStorage.
 * Useful for resetting to default or testing.
 * 
 * @returns {boolean} Success status
 * 
 * @example
 * removeStoredTheme()
 */
export const removeStoredTheme = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.THEME)
    return true
  } catch (error) {
    console.error('Error removing theme from localStorage:', error)
    return false
  }
}

/**
 * Check if LocalStorage is Available
 * 
 * Tests if localStorage is available and accessible.
 * Useful for detecting private browsing mode or disabled storage.
 * 
 * @returns {boolean} True if localStorage is available
 * 
 * @example
 * if (isStorageAvailable()) {
 *   console.log('localStorage is available')
 * } else {
 *   console.log('localStorage is not available (private browsing?)')
 * }
 */
export const isStorageAvailable = () => {
  try {
    const testKey = '__storage_test__'
    localStorage.setItem(testKey, 'test')
    localStorage.removeItem(testKey)
    return true
  } catch (error) {
    return false
  }
}
