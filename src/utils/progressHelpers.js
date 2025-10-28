/**
 * Progress Helper Utilities
 * 
 * Utility functions for Continue Learning and Reset Progress features.
 * Provides intelligent resume point detection and progress reset functionality.
 * 
 * @module utils/progressHelpers
 */

import { MODULE_IDS, MODULES_METADATA, MODULE_STATUS } from '../constants/modules.js'
import { loadProgress, clearProgress as clearProgressData } from './progressManager.js'

/**
 * Resume Point Result Type
 * 
 * @typedef {Object} ResumePoint
 * @property {'no-progress'|'in-progress'|'all-complete'} status - Resume point status
 * @property {number|null} moduleId - Module ID to resume (1, 2, or 3)
 * @property {string|null} sectionId - Section ID to resume
 * @property {string|null} moduleTitle - Module title for display
 * @property {string|null} sectionTitle - Section title for display
 * @property {number} overallProgress - Overall completion percentage (0-100)
 * @property {string} message - User-friendly message describing the resume point
 */

/**
 * Get Resume Point
 * 
 * Analyzes current progress and determines the best location to resume learning.
 * Handles multiple scenarios:
 * - No progress: Returns Module 1, Section 1
 * - In progress: Returns last incomplete section or next section after last completed
 * - All complete: Returns completion state
 * - Corrupted data: Falls back to Module 1 start
 * 
 * @returns {ResumePoint} Resume point information
 * 
 * @example
 * const resumePoint = getResumePoint()
 * if (resumePoint.status === 'in-progress') {
 *   console.log(`Resume at: ${resumePoint.moduleTitle} - ${resumePoint.sectionTitle}`)
 * }
 */
export const getResumePoint = () => {
  try {
    // Load progress from localStorage
    const progressData = loadProgress()
    
    // Case 1: No progress data (first-time user or cleared)
    if (!progressData || !progressData.modules) {
      return {
        status: 'no-progress',
        moduleId: MODULE_IDS.MODULE_1,
        sectionId: null,
        moduleTitle: MODULES_METADATA[MODULE_IDS.MODULE_1].title,
        sectionTitle: null,
        overallProgress: 0,
        message: 'Start your learning journey with Module 1',
      }
    }

    // Calculate overall progress
    const moduleIds = [MODULE_IDS.MODULE_1, MODULE_IDS.MODULE_2, MODULE_IDS.MODULE_3]
    let totalSections = 0
    let completedSections = 0
    
    moduleIds.forEach((moduleId) => {
      const module = progressData.modules[moduleId]
      if (module && module.sections) {
        totalSections += module.sections.length
        completedSections += module.sections.filter((s) => s.completed).length
      }
    })
    
    const overallProgress = totalSections > 0 
      ? Math.round((completedSections / totalSections) * 100) 
      : 0

    // Case 2: All modules complete
    if (overallProgress === 100) {
      return {
        status: 'all-complete',
        moduleId: null,
        sectionId: null,
        moduleTitle: null,
        sectionTitle: null,
        overallProgress: 100,
        message: 'Congratulations! You have completed all modules',
      }
    }

    // Case 3: Find first incomplete section (resume in-progress learning)
    for (const moduleId of moduleIds) {
      const module = progressData.modules[moduleId]
      
      // Skip locked modules
      if (!module || module.status === MODULE_STATUS.LOCKED) {
        continue
      }

      // Check sections in this module
      if (module.sections && module.sections.length > 0) {
        // Find first incomplete section
        const incompleteSection = module.sections.find((section) => !section.completed)
        
        if (incompleteSection) {
          // Get section metadata for display
          const sectionMeta = MODULES_METADATA[moduleId].sections.find(
            (s) => s.id === incompleteSection.id
          )
          
          return {
            status: 'in-progress',
            moduleId: moduleId,
            sectionId: incompleteSection.id,
            moduleTitle: module.title,
            sectionTitle: sectionMeta?.title || incompleteSection.title,
            overallProgress,
            message: `Continue with ${module.title}`,
          }
        }
      }
    }

    // Case 4: User has started but somehow we can't find an incomplete section
    // This shouldn't happen if progress < 100%, but handle it gracefully
    // Return the last accessed location or Module 1
    const currentModule = progressData.currentModule || MODULE_IDS.MODULE_1
    const currentSection = progressData.currentSection || null
    
    return {
      status: 'in-progress',
      moduleId: currentModule,
      sectionId: currentSection,
      moduleTitle: MODULES_METADATA[currentModule]?.title || 'Module 1',
      sectionTitle: currentSection 
        ? MODULES_METADATA[currentModule]?.sections.find((s) => s.id === currentSection)?.title 
        : null,
      overallProgress,
      message: 'Resume your learning',
    }
  } catch (error) {
    // Case 5: Error/corrupted data - fallback to Module 1
    console.error('Error getting resume point:', error)
    
    return {
      status: 'no-progress',
      moduleId: MODULE_IDS.MODULE_1,
      sectionId: null,
      moduleTitle: MODULES_METADATA[MODULE_IDS.MODULE_1].title,
      sectionTitle: null,
      overallProgress: 0,
      message: 'Start your learning journey',
    }
  }
}

/**
 * Reset Progress
 * 
 * Clears all progress data from localStorage. This is a destructive operation
 * that should only be called after user confirmation.
 * 
 * Note: This function does not handle confirmation UI - that should be done
 * in the calling component (ResetProgress.jsx).
 * 
 * @returns {boolean} Success status (true if cleared, false on error)
 * 
 * @example
 * if (userConfirmed) {
 *   const success = resetProgress()
 *   if (success) {
 *     console.log('Progress reset successfully')
 *     // Show success notification
 *   } else {
 *     console.error('Failed to reset progress')
 *     // Show error notification
 *   }
 * }
 */
export const resetProgress = () => {
  try {
    // Clear progress data from localStorage
    const success = clearProgressData()
    
    if (success) {
      console.log('Progress reset successfully')
      return true
    } else {
      console.error('Failed to clear progress data')
      return false
    }
  } catch (error) {
    console.error('Error resetting progress:', error)
    return false
  }
}

/**
 * Get Module Route
 * 
 * Helper function to generate the correct route path for a given module and section.
 * 
 * @param {number} moduleId - Module ID (1, 2, or 3)
 * @param {string|null} sectionId - Section ID (optional)
 * @returns {string} Route path
 * 
 * @example
 * const route = getModuleRoute(1, 'intro_what_are_llms')
 * // Returns: '/module/1'
 * 
 * const route = getModuleRoute(2)
 * // Returns: '/module/2'
 */
export const getModuleRoute = (moduleId, sectionId = null) => {
  if (!moduleId) {
    return '/learn'
  }
  
  // For now, all modules use the simple /module/:id pattern
  // Section navigation is handled within the module pages
  return `/module/${moduleId}`
}

/**
 * Get Next Incomplete Section
 * 
 * Helper function to find the next incomplete section in a module.
 * Useful for sequential navigation and progress tracking.
 * 
 * @param {number} moduleId - Module ID
 * @param {Object} progressData - Progress data object
 * @returns {{sectionId: string, sectionTitle: string}|null} Next incomplete section or null
 * 
 * @example
 * const nextSection = getNextIncompleteSection(1, progressData)
 * if (nextSection) {
 *   console.log(`Next: ${nextSection.sectionTitle}`)
 * }
 */
export const getNextIncompleteSection = (moduleId, progressData) => {
  try {
    if (!progressData || !progressData.modules) {
      return null
    }

    const module = progressData.modules[moduleId]
    if (!module || !module.sections) {
      return null
    }

    // Find first incomplete section
    const incompleteSection = module.sections.find((section) => !section.completed)
    
    if (!incompleteSection) {
      return null
    }

    // Get metadata for title
    const sectionMeta = MODULES_METADATA[moduleId]?.sections.find(
      (s) => s.id === incompleteSection.id
    )

    return {
      sectionId: incompleteSection.id,
      sectionTitle: sectionMeta?.title || incompleteSection.title,
    }
  } catch (error) {
    console.error('Error getting next incomplete section:', error)
    return null
  }
}

/**
 * Check if User Has Started Learning
 * 
 * Quick check to see if the user has any progress at all.
 * 
 * @returns {boolean} True if user has started learning
 * 
 * @example
 * if (hasStartedLearning()) {
 *   console.log('Welcome back!')
 * } else {
 *   console.log('Welcome! Let\'s get started.')
 * }
 */
export const hasStartedLearning = () => {
  try {
    const progressData = loadProgress()
    
    if (!progressData || !progressData.modules) {
      return false
    }

    // Check if any section in any module is completed
    const moduleIds = [MODULE_IDS.MODULE_1, MODULE_IDS.MODULE_2, MODULE_IDS.MODULE_3]
    
    for (const moduleId of moduleIds) {
      const module = progressData.modules[moduleId]
      if (module && module.sections) {
        const hasCompletedSection = module.sections.some((section) => section.completed)
        if (hasCompletedSection) {
          return true
        }
      }
    }

    return false
  } catch (error) {
    console.error('Error checking learning status:', error)
    return false
  }
}
