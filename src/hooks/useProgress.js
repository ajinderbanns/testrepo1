/**
 * useProgress Hook
 * 
 * Custom React hook for managing global progress state and operations.
 * Provides comprehensive progress tracking with automatic localStorage synchronization,
 * error handling, and reactive updates.
 * 
 * Features:
 * - Automatic localStorage persistence on updates
 * - Lazy initialization from localStorage
 * - Data validation and error handling
 * - Overall completion tracking
 * - Module list and status management
 * - Reset functionality
 * - Optimistic updates with rollback on storage failures
 * 
 * @module useProgress
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import {
  loadProgress,
  saveProgress,
  clearProgress,
  initializeProgress,
  calculateProgressPercentage,
  getModuleStatus,
  updateModuleCompletion,
  unlockAchievement,
  recordSession,
  isModuleComplete,
  isSectionComplete,
  getLastVisitedLocation,
  getNextModule,
} from '../utils/progressManager.js'
import { createInitialProgress } from '../types/progress.js'
import { MODULE_IDS } from '../constants/modules.js'

/**
 * useProgress Hook
 * 
 * Manages global progress state with automatic localStorage synchronization.
 * Provides functions for progress tracking, updates, and overall completion monitoring.
 * 
 * @param {string|null} [initialGender=null] - Gender preference for initializing new progress
 * @returns {Object} Progress state and management functions
 * @returns {Object|null} return.progress - Current progress data object (null if not initialized)
 * @returns {boolean} return.isLoading - True during initial data load
 * @returns {boolean} return.isInitialized - True if progress data exists
 * @returns {number} return.overallCompletion - Overall completion percentage (0-100)
 * @returns {Function} return.initialize - Initialize progress for new user
 * @returns {Function} return.reset - Clear all progress data
 * @returns {Function} return.markSectionComplete - Mark a section as complete
 * @returns {Function} return.markModuleComplete - Mark all sections in a module as complete
 * @returns {Function} return.updateCurrentPosition - Update current module/section position
 * @returns {Function} return.getModuleStatus - Get status of a specific module
 * @returns {Function} return.getModuleList - Get list of all modules with their status
 * @returns {Function} return.isModuleCompleted - Check if a module is completed
 * @returns {Function} return.isSectionCompleted - Check if a section is completed
 * @returns {Function} return.getLastLocation - Get last visited location for resume
 * @returns {Function} return.unlockAchievement - Award an achievement
 * @returns {Function} return.startSession - Start a new session
 * @returns {Function} return.endSession - End the current session
 * @returns {Object|null} return.error - Error object if last operation failed
 * 
 * @example
 * function ProgressDashboard() {
 *   const {
 *     progress,
 *     isLoading,
 *     overallCompletion,
 *     markSectionComplete,
 *     getModuleList
 *   } = useProgress('female')
 *   
 *   if (isLoading) return <p>Loading...</p>
 *   
 *   return (
 *     <div>
 *       <h2>Progress: {overallCompletion}%</h2>
 *       {getModuleList().map(module => (
 *         <div key={module.id}>
 *           <h3>{module.title} - {module.status}</h3>
 *           <p>{module.completionPercentage}% complete</p>
 *         </div>
 *       ))}
 *     </div>
 *   )
 * }
 */
export const useProgress = (initialGender = null) => {
  // State for progress data
  const [progress, setProgress] = useState(null)
  
  // State for loading indicator
  const [isLoading, setIsLoading] = useState(true)
  
  // State for error handling
  const [error, setError] = useState(null)
  
  // Ref to track if component is mounted (prevent state updates after unmount)
  const isMounted = useRef(true)
  
  // Ref to track last saved state (for rollback on save failures)
  const lastSavedProgress = useRef(null)

  /**
   * Hydrate progress from localStorage on mount
   */
  useEffect(() => {
    isMounted.current = true
    
    const loadInitialProgress = () => {
      try {
        setError(null)
        const loadedProgress = loadProgress()
        
        if (loadedProgress) {
          setProgress(loadedProgress)
          lastSavedProgress.current = loadedProgress
        } else if (initialGender) {
          // Initialize new progress if gender is provided
          const newProgress = createInitialProgress(initialGender)
          const saved = saveProgress(newProgress)
          
          if (saved) {
            setProgress(newProgress)
            lastSavedProgress.current = newProgress
          } else {
            // Still set progress even if save failed (localStorage might be unavailable)
            setProgress(newProgress)
            setError({ type: 'save_failed', message: 'Could not save to localStorage' })
          }
        }
      } catch (err) {
        console.error('Error loading progress:', err)
        setError({ type: 'load_failed', message: err.message })
      } finally {
        if (isMounted.current) {
          setIsLoading(false)
        }
      }
    }
    
    loadInitialProgress()
    
    // Cleanup
    return () => {
      isMounted.current = false
    }
  }, [initialGender])

  /**
   * Save progress to localStorage with optimistic updates and rollback
   * 
   * @param {Object} newProgress - Updated progress data
   * @returns {boolean} Success status
   */
  const saveProgressWithRollback = useCallback((newProgress) => {
    const success = saveProgress(newProgress)
    
    if (success) {
      lastSavedProgress.current = newProgress
      setError(null)
      return true
    } else {
      // Rollback to last saved state
      console.error('Failed to save progress, rolling back')
      setProgress(lastSavedProgress.current)
      setError({ type: 'save_failed', message: 'Could not save to localStorage' })
      return false
    }
  }, [])

  /**
   * Initialize Progress for New User
   * 
   * @param {string} gender - User's gender preference ('male' or 'female')
   * @returns {boolean} Success status
   */
  const initialize = useCallback((gender) => {
    try {
      setError(null)
      const newProgress = initializeProgress(gender)
      
      if (newProgress) {
        setProgress(newProgress)
        lastSavedProgress.current = newProgress
        return true
      } else {
        setError({ type: 'init_failed', message: 'Could not initialize progress' })
        return false
      }
    } catch (err) {
      console.error('Error initializing progress:', err)
      setError({ type: 'init_failed', message: err.message })
      return false
    }
  }, [])

  /**
   * Reset All Progress Data
   * 
   * Clears all progress from localStorage and resets state.
   * 
   * @returns {boolean} Success status
   */
  const reset = useCallback(() => {
    try {
      setError(null)
      const success = clearProgress()
      
      if (success) {
        setProgress(null)
        lastSavedProgress.current = null
        return true
      } else {
        setError({ type: 'reset_failed', message: 'Could not clear progress' })
        return false
      }
    } catch (err) {
      console.error('Error resetting progress:', err)
      setError({ type: 'reset_failed', message: err.message })
      return false
    }
  }, [])

  /**
   * Mark Section as Complete
   * 
   * Updates progress to mark a specific section as completed.
   * Automatically recalculates module completion and unlocks next modules.
   * 
   * @param {number} moduleId - Module ID (1, 2, or 3)
   * @param {string} sectionId - Section ID
   * @returns {boolean} Success status
   */
  const markSectionComplete = useCallback((moduleId, sectionId) => {
    if (!progress) {
      console.error('Cannot mark section complete: progress not initialized')
      setError({ type: 'not_initialized', message: 'Progress not initialized' })
      return false
    }
    
    try {
      setError(null)
      const updatedProgress = updateModuleCompletion(moduleId, sectionId, progress)
      setProgress(updatedProgress)
      return saveProgressWithRollback(updatedProgress)
    } catch (err) {
      console.error('Error marking section complete:', err)
      setError({ type: 'update_failed', message: err.message })
      return false
    }
  }, [progress, saveProgressWithRollback])

  /**
   * Mark Module as Complete
   * 
   * Marks all sections in a module as complete.
   * Useful for testing or manual progression.
   * 
   * @param {number} moduleId - Module ID (1, 2, or 3)
   * @returns {boolean} Success status
   */
  const markModuleComplete = useCallback((moduleId) => {
    if (!progress) {
      console.error('Cannot mark module complete: progress not initialized')
      setError({ type: 'not_initialized', message: 'Progress not initialized' })
      return false
    }
    
    try {
      setError(null)
      const module = progress.modules[moduleId]
      if (!module) {
        console.error(`Module ${moduleId} not found`)
        setError({ type: 'module_not_found', message: `Module ${moduleId} not found` })
        return false
      }
      
      // Mark all sections as complete
      let updatedProgress = progress
      for (const section of module.sections) {
        if (!section.completed) {
          updatedProgress = updateModuleCompletion(moduleId, section.id, updatedProgress)
        }
      }
      
      setProgress(updatedProgress)
      return saveProgressWithRollback(updatedProgress)
    } catch (err) {
      console.error('Error marking module complete:', err)
      setError({ type: 'update_failed', message: err.message })
      return false
    }
  }, [progress, saveProgressWithRollback])

  /**
   * Update Current Position
   * 
   * Updates the current module and section the user is viewing.
   * Used for resume functionality.
   * 
   * @param {number} moduleId - Module ID
   * @param {string|null} sectionId - Section ID (null for module overview)
   * @returns {boolean} Success status
   */
  const updateCurrentPosition = useCallback((moduleId, sectionId = null) => {
    if (!progress) {
      console.error('Cannot update position: progress not initialized')
      setError({ type: 'not_initialized', message: 'Progress not initialized' })
      return false
    }
    
    try {
      setError(null)
      const updatedProgress = {
        ...progress,
        currentModule: moduleId,
        currentSection: sectionId,
        lastUpdated: new Date().toISOString(),
      }
      
      setProgress(updatedProgress)
      return saveProgressWithRollback(updatedProgress)
    } catch (err) {
      console.error('Error updating current position:', err)
      setError({ type: 'update_failed', message: err.message })
      return false
    }
  }, [progress, saveProgressWithRollback])

  /**
   * Get Module Status
   * 
   * Returns the status of a specific module.
   * 
   * @param {number} moduleId - Module ID (1, 2, or 3)
   * @returns {string} Module status ('completed', 'in-progress', or 'locked')
   */
  const getModuleStatusFn = useCallback((moduleId) => {
    if (!progress) {
      return 'locked'
    }
    return getModuleStatus(moduleId, progress)
  }, [progress])

  /**
   * Get Module List
   * 
   * Returns an array of all modules with their current status and completion.
   * 
   * @returns {Array<Object>} Array of module objects with status information
   */
  const getModuleList = useCallback(() => {
    if (!progress) {
      return []
    }
    
    return Object.values(progress.modules).map(module => ({
      id: module.id,
      title: module.title,
      status: module.status,
      completionPercentage: module.completionPercentage,
      sections: module.sections,
      startedAt: module.startedAt,
      completedAt: module.completedAt,
    }))
  }, [progress])

  /**
   * Check if Module is Completed
   * 
   * @param {number} moduleId - Module ID
   * @returns {boolean} True if module is completed
   */
  const isModuleCompleted = useCallback((moduleId) => {
    if (!progress) {
      return false
    }
    return isModuleComplete(moduleId, progress)
  }, [progress])

  /**
   * Check if Section is Completed
   * 
   * @param {number} moduleId - Module ID
   * @param {string} sectionId - Section ID
   * @returns {boolean} True if section is completed
   */
  const isSectionCompleted = useCallback((moduleId, sectionId) => {
    if (!progress) {
      return false
    }
    return isSectionComplete(moduleId, sectionId, progress)
  }, [progress])

  /**
   * Get Last Visited Location
   * 
   * Returns the last module and section the user visited.
   * 
   * @returns {Object} Location object with moduleId and sectionId
   */
  const getLastLocation = useCallback(() => {
    if (!progress) {
      return { moduleId: MODULE_IDS.MODULE_1, sectionId: null }
    }
    return getLastVisitedLocation(progress)
  }, [progress])

  /**
   * Unlock Achievement
   * 
   * Awards an achievement to the user.
   * 
   * @param {string} achievementId - Achievement ID
   * @returns {boolean} Success status
   */
  const unlockAchievementFn = useCallback((achievementId) => {
    if (!progress) {
      console.error('Cannot unlock achievement: progress not initialized')
      setError({ type: 'not_initialized', message: 'Progress not initialized' })
      return false
    }
    
    try {
      setError(null)
      const updatedProgress = unlockAchievement(achievementId, progress)
      setProgress(updatedProgress)
      return saveProgressWithRollback(updatedProgress)
    } catch (err) {
      console.error('Error unlocking achievement:', err)
      setError({ type: 'update_failed', message: err.message })
      return false
    }
  }, [progress, saveProgressWithRollback])

  /**
   * Start Session
   * 
   * Starts a new progress tracking session.
   * 
   * @returns {boolean} Success status
   */
  const startSession = useCallback(() => {
    if (!progress) {
      console.error('Cannot start session: progress not initialized')
      setError({ type: 'not_initialized', message: 'Progress not initialized' })
      return false
    }
    
    try {
      setError(null)
      const updatedProgress = recordSession(progress, 'start')
      setProgress(updatedProgress)
      return saveProgressWithRollback(updatedProgress)
    } catch (err) {
      console.error('Error starting session:', err)
      setError({ type: 'update_failed', message: err.message })
      return false
    }
  }, [progress, saveProgressWithRollback])

  /**
   * End Session
   * 
   * Ends the current progress tracking session.
   * 
   * @returns {boolean} Success status
   */
  const endSession = useCallback(() => {
    if (!progress) {
      console.error('Cannot end session: progress not initialized')
      setError({ type: 'not_initialized', message: 'Progress not initialized' })
      return false
    }
    
    try {
      setError(null)
      const updatedProgress = recordSession(progress, 'end')
      setProgress(updatedProgress)
      return saveProgressWithRollback(updatedProgress)
    } catch (err) {
      console.error('Error ending session:', err)
      setError({ type: 'update_failed', message: err.message })
      return false
    }
  }, [progress, saveProgressWithRollback])

  /**
   * Get Next Module
   * 
   * Returns the next available module after the current one.
   * 
   * @param {number} currentModuleId - Current module ID
   * @returns {number|null} Next module ID or null
   */
  const getNextModuleFn = useCallback((currentModuleId) => {
    if (!progress) {
      return null
    }
    return getNextModule(currentModuleId, progress)
  }, [progress])

  // Calculate overall completion percentage
  const overallCompletion = progress ? calculateProgressPercentage(progress) : 0
  
  // Check if progress is initialized
  const isInitialized = progress !== null

  return {
    progress,
    isLoading,
    isInitialized,
    overallCompletion,
    error,
    initialize,
    reset,
    markSectionComplete,
    markModuleComplete,
    updateCurrentPosition,
    getModuleStatus: getModuleStatusFn,
    getModuleList,
    isModuleCompleted,
    isSectionCompleted,
    getLastLocation,
    unlockAchievement: unlockAchievementFn,
    startSession,
    endSession,
    getNextModule: getNextModuleFn,
  }
}

export default useProgress
