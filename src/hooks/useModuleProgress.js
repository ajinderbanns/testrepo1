/**
 * useModuleProgress Hook
 * 
 * Custom React hook for managing module-specific progress operations.
 * Provides focused functionality for working with a single module's progress,
 * including section completion, navigation helpers, and status tracking.
 * 
 * Features:
 * - Module-specific state management
 * - Section completion tracking
 * - Navigation helpers (next/previous section)
 * - Automatic localStorage persistence
 * - Current position tracking within module
 * - Section status queries
 * 
 * @module useModuleProgress
 */

import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  loadProgress,
  saveProgress,
  updateModuleCompletion,
  getModuleStatus,
  isSectionComplete as isSectionCompleteUtil,
} from '../utils/progressManager.js'
import { MODULES_METADATA } from '../constants/modules.js'

/**
 * useModuleProgress Hook
 * 
 * Manages progress state for a specific module with automatic localStorage synchronization.
 * Provides functions for section completion, navigation, and status queries.
 * 
 * @param {number} moduleId - Module ID to track (1, 2, or 3)
 * @returns {Object} Module progress state and management functions
 * @returns {Object|null} return.moduleData - Current module progress data
 * @returns {boolean} return.isLoading - True during initial data load
 * @returns {string} return.status - Module status ('completed', 'in-progress', 'locked')
 * @returns {number} return.completionPercentage - Module completion percentage (0-100)
 * @returns {Array<Object>} return.sections - Array of section progress objects
 * @returns {number} return.completedSectionsCount - Number of completed sections
 * @returns {number} return.totalSectionsCount - Total number of sections in module
 * @returns {Function} return.markSectionComplete - Mark a section as complete
 * @returns {Function} return.isSectionCompleted - Check if a section is completed
 * @returns {Function} return.getNextSection - Get next section in sequence
 * @returns {Function} return.getPreviousSection - Get previous section in sequence
 * @returns {Function} return.getSectionByIndex - Get section by index
 * @returns {Function} return.getCurrentSectionIndex - Get index of current section
 * @returns {Function} return.isFirstSection - Check if section is first
 * @returns {Function} return.isLastSection - Check if section is last
 * @returns {Object|null} return.error - Error object if last operation failed
 * 
 * @example
 * function ModulePage({ moduleId }) {
 *   const {
 *     moduleData,
 *     status,
 *     completionPercentage,
 *     sections,
 *     markSectionComplete,
 *     getNextSection,
 *   } = useModuleProgress(moduleId)
 *   
 *   if (status === 'locked') {
 *     return <p>Complete previous modules first</p>
 *   }
 *   
 *   return (
 *     <div>
 *       <h2>{moduleData.title}</h2>
 *       <progress value={completionPercentage} max={100} />
 *       {sections.map(section => (
 *         <div key={section.id}>
 *           <h3>{section.title}</h3>
 *           {section.completed ? '✓' : '○'}
 *           <button onClick={() => markSectionComplete(section.id)}>
 *             Complete
 *           </button>
 *         </div>
 *       ))}
 *     </div>
 *   )
 * }
 */
export const useModuleProgress = (moduleId) => {
  // Validate moduleId
  if (!moduleId || ![1, 2, 3].includes(moduleId)) {
    throw new Error(`Invalid moduleId: ${moduleId}. Must be 1, 2, or 3.`)
  }

  // State for module progress data
  const [moduleData, setModuleData] = useState(null)
  
  // State for loading indicator
  const [isLoading, setIsLoading] = useState(true)
  
  // State for error handling
  const [error, setError] = useState(null)
  
  // State for full progress data (needed for context)
  const [progressData, setProgressData] = useState(null)

  /**
   * Load module progress from localStorage
   */
  useEffect(() => {
    const loadModuleProgress = () => {
      try {
        setError(null)
        const progress = loadProgress()
        
        if (progress && progress.modules && progress.modules[moduleId]) {
          setProgressData(progress)
          setModuleData(progress.modules[moduleId])
        } else {
          // Module not found or progress not initialized
          setModuleData(null)
          setProgressData(null)
        }
      } catch (err) {
        console.error(`Error loading module ${moduleId} progress:`, err)
        setError({ type: 'load_failed', message: err.message })
        setModuleData(null)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadModuleProgress()
  }, [moduleId])

  /**
   * Mark Section as Complete
   * 
   * Updates progress to mark a specific section in this module as completed.
   * 
   * @param {string} sectionId - Section ID to mark as complete
   * @returns {boolean} Success status
   */
  const markSectionComplete = useCallback((sectionId) => {
    if (!progressData) {
      console.error('Cannot mark section complete: progress not initialized')
      setError({ type: 'not_initialized', message: 'Progress not initialized' })
      return false
    }
    
    try {
      setError(null)
      const updatedProgress = updateModuleCompletion(moduleId, sectionId, progressData)
      const success = saveProgress(updatedProgress)
      
      if (success) {
        setProgressData(updatedProgress)
        setModuleData(updatedProgress.modules[moduleId])
        return true
      } else {
        setError({ type: 'save_failed', message: 'Could not save to localStorage' })
        return false
      }
    } catch (err) {
      console.error('Error marking section complete:', err)
      setError({ type: 'update_failed', message: err.message })
      return false
    }
  }, [moduleId, progressData])

  /**
   * Check if Section is Completed
   * 
   * @param {string} sectionId - Section ID to check
   * @returns {boolean} True if section is completed
   */
  const isSectionCompleted = useCallback((sectionId) => {
    if (!progressData) {
      return false
    }
    return isSectionCompleteUtil(moduleId, sectionId, progressData)
  }, [moduleId, progressData])

  /**
   * Get Next Section
   * 
   * Returns the next section in sequence after the given section.
   * Returns null if current section is the last one.
   * 
   * @param {string} currentSectionId - Current section ID
   * @returns {Object|null} Next section object or null
   */
  const getNextSection = useCallback((currentSectionId) => {
    if (!moduleData || !moduleData.sections) {
      return null
    }
    
    const currentIndex = moduleData.sections.findIndex(s => s.id === currentSectionId)
    if (currentIndex === -1 || currentIndex === moduleData.sections.length - 1) {
      return null
    }
    
    return moduleData.sections[currentIndex + 1]
  }, [moduleData])

  /**
   * Get Previous Section
   * 
   * Returns the previous section in sequence before the given section.
   * Returns null if current section is the first one.
   * 
   * @param {string} currentSectionId - Current section ID
   * @returns {Object|null} Previous section object or null
   */
  const getPreviousSection = useCallback((currentSectionId) => {
    if (!moduleData || !moduleData.sections) {
      return null
    }
    
    const currentIndex = moduleData.sections.findIndex(s => s.id === currentSectionId)
    if (currentIndex <= 0) {
      return null
    }
    
    return moduleData.sections[currentIndex - 1]
  }, [moduleData])

  /**
   * Get Section by Index
   * 
   * Returns a section by its index in the sections array.
   * 
   * @param {number} index - Section index (0-based)
   * @returns {Object|null} Section object or null if index is invalid
   */
  const getSectionByIndex = useCallback((index) => {
    if (!moduleData || !moduleData.sections) {
      return null
    }
    
    if (index < 0 || index >= moduleData.sections.length) {
      return null
    }
    
    return moduleData.sections[index]
  }, [moduleData])

  /**
   * Get Current Section Index
   * 
   * Returns the index of the given section in the sections array.
   * 
   * @param {string} sectionId - Section ID
   * @returns {number} Section index (0-based), or -1 if not found
   */
  const getCurrentSectionIndex = useCallback((sectionId) => {
    if (!moduleData || !moduleData.sections) {
      return -1
    }
    
    return moduleData.sections.findIndex(s => s.id === sectionId)
  }, [moduleData])

  /**
   * Check if Section is First
   * 
   * Returns true if the given section is the first in the module.
   * 
   * @param {string} sectionId - Section ID
   * @returns {boolean} True if section is first
   */
  const isFirstSection = useCallback((sectionId) => {
    return getCurrentSectionIndex(sectionId) === 0
  }, [getCurrentSectionIndex])

  /**
   * Check if Section is Last
   * 
   * Returns true if the given section is the last in the module.
   * 
   * @param {string} sectionId - Section ID
   * @returns {boolean} True if section is last
   */
  const isLastSection = useCallback((sectionId) => {
    if (!moduleData || !moduleData.sections) {
      return false
    }
    
    const index = getCurrentSectionIndex(sectionId)
    return index === moduleData.sections.length - 1
  }, [moduleData, getCurrentSectionIndex])

  /**
   * Get First Incomplete Section
   * 
   * Returns the first section that hasn't been completed yet.
   * Returns null if all sections are completed.
   * 
   * @returns {Object|null} First incomplete section or null
   */
  const getFirstIncompleteSection = useCallback(() => {
    if (!moduleData || !moduleData.sections) {
      return null
    }
    
    return moduleData.sections.find(section => !section.completed) || null
  }, [moduleData])

  /**
   * Get Section Progress
   * 
   * Returns detailed progress information for a specific section.
   * 
   * @param {string} sectionId - Section ID
   * @returns {Object|null} Section progress object or null
   */
  const getSectionProgress = useCallback((sectionId) => {
    if (!moduleData || !moduleData.sections) {
      return null
    }
    
    const section = moduleData.sections.find(s => s.id === sectionId)
    if (!section) {
      return null
    }
    
    // Get metadata from MODULES_METADATA
    const metadata = MODULES_METADATA[moduleId]?.sections.find(s => s.id === sectionId)
    
    return {
      ...section,
      description: metadata?.description,
      estimatedMinutes: metadata?.estimatedMinutes,
    }
  }, [moduleId, moduleData])

  // Compute derived values
  const status = useMemo(() => {
    if (!progressData) {
      return 'locked'
    }
    return getModuleStatus(moduleId, progressData)
  }, [moduleId, progressData])

  const completionPercentage = useMemo(() => {
    return moduleData?.completionPercentage || 0
  }, [moduleData])

  const sections = useMemo(() => {
    return moduleData?.sections || []
  }, [moduleData])

  const completedSectionsCount = useMemo(() => {
    return sections.filter(s => s.completed).length
  }, [sections])

  const totalSectionsCount = useMemo(() => {
    return sections.length
  }, [sections])

  const isCompleted = useMemo(() => {
    return status === 'completed'
  }, [status])

  const isLocked = useMemo(() => {
    return status === 'locked'
  }, [status])

  const isInProgress = useMemo(() => {
    return status === 'in-progress'
  }, [status])

  return {
    moduleData,
    isLoading,
    status,
    completionPercentage,
    sections,
    completedSectionsCount,
    totalSectionsCount,
    isCompleted,
    isLocked,
    isInProgress,
    error,
    markSectionComplete,
    isSectionCompleted,
    getNextSection,
    getPreviousSection,
    getSectionByIndex,
    getCurrentSectionIndex,
    isFirstSection,
    isLastSection,
    getFirstIncompleteSection,
    getSectionProgress,
  }
}

export default useModuleProgress
