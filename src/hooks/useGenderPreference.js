/**
 * useGenderPreference Hook
 * 
 * Custom React hook for managing gender preference state and persistence.
 * Provides easy access to gender preference with automatic localStorage synchronization.
 * 
 * Features:
 * - State management for gender preference
 * - Automatic localStorage persistence
 * - First-time visitor detection
 * - Error handling for storage operations
 * - Metadata access (timestamp, etc.)
 * 
 * @module useGenderPreference
 */

import { useState, useEffect, useCallback } from 'react'
import {
  loadGenderPreference,
  saveGenderPreference,
  clearGenderPreference,
  isFirstVisit,
  getGenderPreferenceMetadata,
  isLocalStorageAvailable,
} from '../utils/localStorage'

/**
 * useGenderPreference Hook
 * 
 * Manages gender preference state with localStorage synchronization.
 * Initializes from localStorage and provides functions to update/clear preference.
 * 
 * @returns {Object} Gender preference state and functions
 * @returns {string|null} return.gender - Current gender preference ('male', 'female', or null)
 * @returns {Function} return.setGender - Function to set gender preference
 * @returns {Function} return.clearGender - Function to clear gender preference
 * @returns {boolean} return.isFirstVisit - True if no preference is set
 * @returns {boolean} return.isLoading - True during initial hydration
 * @returns {Object|null} return.metadata - Preference metadata (gender, timestamp)
 * @returns {boolean} return.storageAvailable - True if localStorage is functional
 * 
 * @example
 * function GenderSelection() {
 *   const { gender, setGender, isFirstVisit } = useGenderPreference()
 *   
 *   if (!isFirstVisit) {
 *     return <p>Current preference: {gender}</p>
 *   }
 *   
 *   return (
 *     <div>
 *       <button onClick={() => setGender('male')}>Male</button>
 *       <button onClick={() => setGender('female')}>Female</button>
 *     </div>
 *   )
 * }
 * 
 * @example
 * // With metadata
 * function PreferenceInfo() {
 *   const { gender, metadata, clearGender } = useGenderPreference()
 *   
 *   return (
 *     <div>
 *       <p>Gender: {gender}</p>
 *       <p>Set on: {metadata?.timestamp}</p>
 *       <button onClick={clearGender}>Reset</button>
 *     </div>
 *   )
 * }
 */
export const useGenderPreference = () => {
  // State for gender preference
  const [gender, setGenderState] = useState(null)
  
  // State for loading during hydration
  const [isLoading, setIsLoading] = useState(true)
  
  // State for metadata
  const [metadata, setMetadata] = useState(null)
  
  // Check if localStorage is available
  const [storageAvailable] = useState(() => isLocalStorageAvailable())

  /**
   * Hydrate state from localStorage on mount
   * This runs once when the component first mounts
   */
  useEffect(() => {
    try {
      const storedGender = loadGenderPreference()
      const storedMetadata = getGenderPreferenceMetadata()
      
      setGenderState(storedGender)
      setMetadata(storedMetadata)
      
      if (!storageAvailable) {
        console.warn('LocalStorage is not available. Gender preference will not persist across sessions.')
      }
    } catch (error) {
      console.error('Error hydrating gender preference from localStorage:', error)
    } finally {
      // Mark hydration as complete
      setIsLoading(false)
    }
  }, [storageAvailable])

  /**
   * Set Gender Preference
   * 
   * Updates the gender preference in state and localStorage.
   * 
   * @param {string} newGender - Gender to set ('male' or 'female')
   * @returns {boolean} Success status
   */
  const setGender = useCallback(
    (newGender) => {
      try {
        // Validate input
        if (!newGender || (newGender !== 'male' && newGender !== 'female')) {
          console.error(`Invalid gender value: "${newGender}". Must be 'male' or 'female'.`)
          return false
        }

        // Save to localStorage
        const success = saveGenderPreference(newGender)
        
        if (success) {
          // Update state
          setGenderState(newGender)
          
          // Update metadata
          const newMetadata = getGenderPreferenceMetadata()
          setMetadata(newMetadata)
          
          return true
        } else {
          console.error('Failed to save gender preference to localStorage')
          return false
        }
      } catch (error) {
        console.error('Error setting gender preference:', error)
        return false
      }
    },
    []
  )

  /**
   * Clear Gender Preference
   * 
   * Removes the gender preference from state and localStorage.
   * Useful for allowing users to change their preference or for testing.
   * 
   * @returns {boolean} Success status
   */
  const clearGender = useCallback(() => {
    try {
      const success = clearGenderPreference()
      
      if (success) {
        // Update state
        setGenderState(null)
        setMetadata(null)
        
        return true
      } else {
        console.error('Failed to clear gender preference from localStorage')
        return false
      }
    } catch (error) {
      console.error('Error clearing gender preference:', error)
      return false
    }
  }, [])

  /**
   * Check if First Visit
   * 
   * Returns true if no gender preference is currently set.
   */
  const isFirst = gender === null

  return {
    gender,
    setGender,
    clearGender,
    isFirstVisit: isFirst,
    isLoading,
    metadata,
    storageAvailable,
  }
}

export default useGenderPreference
