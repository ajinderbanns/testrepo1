/**
 * Gender Preference LocalStorage Management
 * 
 * Utility module for persisting and retrieving gender preference settings.
 * Handles edge cases including first-time visitors, corrupted data, and private browsing mode.
 * 
 * @module localStorage
 */

/**
 * Storage Key for Gender Preference
 * 
 * Centralized key definition to prevent typos and ensure consistency.
 */
export const GENDER_STORAGE_KEY = 'llm_edu_gender_preference'

/**
 * Valid Gender Values
 * 
 * List of valid gender preference values.
 * Any other value will be treated as invalid/corrupted.
 */
const VALID_GENDERS = ['male', 'female']

/**
 * Save Gender Preference to LocalStorage
 * 
 * Saves the user's gender preference with a timestamp to localStorage.
 * Validates input and handles errors gracefully.
 * 
 * @param {string} gender - Gender preference to save ('male' or 'female')
 * @returns {boolean} Success status (true if saved successfully, false otherwise)
 * 
 * @example
 * const success = saveGenderPreference('female')
 * if (success) {
 *   console.log('Gender preference saved successfully')
 * } else {
 *   console.error('Failed to save gender preference')
 * }
 */
export const saveGenderPreference = (gender) => {
  try {
    // Validate gender value
    if (!VALID_GENDERS.includes(gender)) {
      console.error(
        `Invalid gender value: "${gender}". Must be one of: ${VALID_GENDERS.join(', ')}`
      )
      return false
    }

    // Create data object with timestamp
    const data = {
      gender: gender,
      timestamp: new Date().toISOString(),
    }

    // Serialize to JSON and store
    localStorage.setItem(GENDER_STORAGE_KEY, JSON.stringify(data))
    
    console.log(`Gender preference saved: ${gender} at ${data.timestamp}`)
    return true
  } catch (error) {
    // Handle localStorage access errors (quota exceeded, private browsing, etc.)
    console.error('Error saving gender preference to localStorage:', error)
    
    // Check if it's a quota exceeded error
    if (error.name === 'QuotaExceededError') {
      console.warn('LocalStorage quota exceeded. Unable to save gender preference.')
    }
    
    return false
  }
}

/**
 * Load Gender Preference from LocalStorage
 * 
 * Retrieves the user's gender preference from localStorage.
 * Handles edge cases: first-time visitors, corrupted data, invalid values.
 * 
 * @returns {string|null} Gender preference ('male' or 'female') or null if not set/invalid
 * 
 * @example
 * const gender = loadGenderPreference()
 * if (gender) {
 *   console.log(`User prefers: ${gender}`)
 * } else {
 *   console.log('No gender preference found - first-time visitor')
 * }
 */
export const loadGenderPreference = () => {
  try {
    const stored = localStorage.getItem(GENDER_STORAGE_KEY)

    // Return null if no stored value (first-time visitor)
    if (!stored) {
      return null
    }

    // Parse JSON data
    let data
    try {
      data = JSON.parse(stored)
    } catch (parseError) {
      console.warn('Corrupted data in localStorage: Unable to parse JSON. Clearing invalid data.')
      // Clear corrupted data
      localStorage.removeItem(GENDER_STORAGE_KEY)
      return null
    }

    // Validate data structure
    if (!data || typeof data !== 'object' || !data.gender) {
      console.warn('Invalid data structure in localStorage. Expected { gender, timestamp }. Clearing invalid data.')
      localStorage.removeItem(GENDER_STORAGE_KEY)
      return null
    }

    // Validate gender value
    if (!VALID_GENDERS.includes(data.gender)) {
      console.warn(
        `Invalid gender value in localStorage: "${data.gender}". Clearing invalid data.`
      )
      localStorage.removeItem(GENDER_STORAGE_KEY)
      return null
    }

    // Return valid gender preference
    return data.gender
  } catch (error) {
    // Handle localStorage access errors (private browsing, storage disabled, etc.)
    console.error('Error reading gender preference from localStorage:', error)
    return null
  }
}

/**
 * Clear Gender Preference from LocalStorage
 * 
 * Removes the gender preference from localStorage.
 * Useful for resetting user preference, testing, or debugging.
 * 
 * @returns {boolean} Success status
 * 
 * @example
 * clearGenderPreference()
 * console.log('Gender preference cleared - user will be re-prompted')
 */
export const clearGenderPreference = () => {
  try {
    localStorage.removeItem(GENDER_STORAGE_KEY)
    console.log('Gender preference cleared from localStorage')
    return true
  } catch (error) {
    console.error('Error clearing gender preference from localStorage:', error)
    return false
  }
}

/**
 * Check if User is First-Time Visitor
 * 
 * Determines if the user has ever set a gender preference.
 * Returns true if no valid preference exists in localStorage.
 * 
 * @returns {boolean} True if no gender preference is set (first-time visitor)
 * 
 * @example
 * if (isFirstVisit()) {
 *   console.log('Welcome! Please select your gender preference.')
 * } else {
 *   console.log('Welcome back!')
 * }
 */
export const isFirstVisit = () => {
  const preference = loadGenderPreference()
  return preference === null
}

/**
 * Get Gender Preference Metadata
 * 
 * Retrieves the full preference object including timestamp.
 * Useful for displaying when the preference was last updated.
 * 
 * @returns {Object|null} Preference object with gender and timestamp, or null if not set
 * @returns {string} return.gender - Gender preference ('male' or 'female')
 * @returns {string} return.timestamp - ISO 8601 timestamp of when preference was saved
 * 
 * @example
 * const metadata = getGenderPreferenceMetadata()
 * if (metadata) {
 *   console.log(`Gender: ${metadata.gender}, Set: ${metadata.timestamp}`)
 * }
 */
export const getGenderPreferenceMetadata = () => {
  try {
    const stored = localStorage.getItem(GENDER_STORAGE_KEY)

    if (!stored) {
      return null
    }

    const data = JSON.parse(stored)

    // Validate data structure
    if (!data || typeof data !== 'object' || !data.gender || !data.timestamp) {
      return null
    }

    // Validate gender value
    if (!VALID_GENDERS.includes(data.gender)) {
      return null
    }

    return {
      gender: data.gender,
      timestamp: data.timestamp,
    }
  } catch (error) {
    console.error('Error reading gender preference metadata:', error)
    return null
  }
}

/**
 * Check if LocalStorage is Available
 * 
 * Tests if localStorage is available and accessible.
 * Useful for detecting private browsing mode or disabled storage.
 * 
 * @returns {boolean} True if localStorage is available and functional
 * 
 * @example
 * if (!isLocalStorageAvailable()) {
 *   console.warn('LocalStorage is not available. Preferences will not persist.')
 * }
 */
export const isLocalStorageAvailable = () => {
  try {
    const testKey = '__storage_test__'
    localStorage.setItem(testKey, 'test')
    localStorage.removeItem(testKey)
    return true
  } catch (error) {
    console.warn('LocalStorage is not available. This may be due to private browsing mode or storage being disabled.')
    return false
  }
}
