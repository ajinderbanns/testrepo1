/**
 * Walkthrough LocalStorage Management
 * 
 * Utility module for persisting and retrieving walkthrough completion status.
 * Handles edge cases including first-time visitors, corrupted data, and private browsing mode.
 * 
 * @module walkthroughStorage
 */

/**
 * Storage Key for Walkthrough Status
 * 
 * Centralized key definition to prevent typos and ensure consistency.
 */
export const WALKTHROUGH_STORAGE_KEY = 'llm_edu_walkthrough_completed'

/**
 * Save Walkthrough Completion Status
 * 
 * Marks the walkthrough as completed with a timestamp.
 * 
 * @returns {boolean} Success status (true if saved successfully, false otherwise)
 * 
 * @example
 * const success = saveWalkthroughCompleted()
 * if (success) {
 *   console.log('Walkthrough marked as completed')
 * }
 */
export const saveWalkthroughCompleted = () => {
  try {
    const data = {
      completed: true,
      timestamp: new Date().toISOString(),
    }

    localStorage.setItem(WALKTHROUGH_STORAGE_KEY, JSON.stringify(data))
    console.log(`Walkthrough marked as completed at ${data.timestamp}`)
    return true
  } catch (error) {
    console.error('Error saving walkthrough status to localStorage:', error)
    
    if (error.name === 'QuotaExceededError') {
      console.warn('LocalStorage quota exceeded. Unable to save walkthrough status.')
    }
    
    return false
  }
}

/**
 * Check if Walkthrough is Completed
 * 
 * Retrieves the walkthrough completion status from localStorage.
 * Returns false if not completed, corrupted, or on first visit.
 * 
 * @returns {boolean} True if walkthrough has been completed, false otherwise
 * 
 * @example
 * if (isWalkthroughCompleted()) {
 *   console.log('User has completed the walkthrough')
 * } else {
 *   console.log('Show walkthrough to user')
 * }
 */
export const isWalkthroughCompleted = () => {
  try {
    const stored = localStorage.getItem(WALKTHROUGH_STORAGE_KEY)

    // Return false if no stored value (first-time visitor)
    if (!stored) {
      return false
    }

    // Parse JSON data
    let data
    try {
      data = JSON.parse(stored)
    } catch (parseError) {
      console.warn('Corrupted walkthrough data in localStorage. Clearing invalid data.')
      localStorage.removeItem(WALKTHROUGH_STORAGE_KEY)
      return false
    }

    // Validate data structure
    if (!data || typeof data !== 'object' || typeof data.completed !== 'boolean') {
      console.warn('Invalid walkthrough data structure. Clearing invalid data.')
      localStorage.removeItem(WALKTHROUGH_STORAGE_KEY)
      return false
    }

    return data.completed === true
  } catch (error) {
    console.error('Error reading walkthrough status from localStorage:', error)
    return false
  }
}

/**
 * Reset Walkthrough Status
 * 
 * Clears the walkthrough completion status, allowing it to be shown again.
 * Useful for testing or if users want to view the tutorial again.
 * 
 * @returns {boolean} Success status
 * 
 * @example
 * resetWalkthrough()
 * console.log('Walkthrough reset - will show on next visit')
 */
export const resetWalkthrough = () => {
  try {
    localStorage.removeItem(WALKTHROUGH_STORAGE_KEY)
    console.log('Walkthrough status cleared from localStorage')
    return true
  } catch (error) {
    console.error('Error clearing walkthrough status from localStorage:', error)
    return false
  }
}

/**
 * Get Walkthrough Metadata
 * 
 * Retrieves the full walkthrough status object including timestamp.
 * Useful for debugging or showing when the user completed the walkthrough.
 * 
 * @returns {Object|null} Status object with completed flag and timestamp, or null if not set
 * @returns {boolean} return.completed - Completion status
 * @returns {string} return.timestamp - ISO 8601 timestamp of completion
 * 
 * @example
 * const metadata = getWalkthroughMetadata()
 * if (metadata) {
 *   console.log(`Completed: ${metadata.completed}, At: ${metadata.timestamp}`)
 * }
 */
export const getWalkthroughMetadata = () => {
  try {
    const stored = localStorage.getItem(WALKTHROUGH_STORAGE_KEY)

    if (!stored) {
      return null
    }

    const data = JSON.parse(stored)

    // Validate data structure
    if (!data || typeof data !== 'object' || !data.timestamp) {
      return null
    }

    return {
      completed: data.completed === true,
      timestamp: data.timestamp,
    }
  } catch (error) {
    console.error('Error reading walkthrough metadata:', error)
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
 *   console.warn('LocalStorage not available. Walkthrough status will not persist.')
 * }
 */
export const isLocalStorageAvailable = () => {
  try {
    const testKey = '__walkthrough_test__'
    localStorage.setItem(testKey, 'test')
    localStorage.removeItem(testKey)
    return true
  } catch (error) {
    console.warn('LocalStorage is not available. This may be due to private browsing mode.')
    return false
  }
}
