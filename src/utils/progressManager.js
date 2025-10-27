/**
 * Progress Manager Utility Module
 * 
 * Comprehensive progress management module for the LLM Education App.
 * Handles all progress persistence, state management, and calculation operations.
 * 
 * @module utils/progressManager
 */

import {
  PROGRESS_STORAGE_KEY,
  SCHEMA_VERSION,
  createInitialProgress,
  validateProgressData,
  migrateProgressData as migrateProgressDataFromTypes,
  calculateModuleCompletion,
  calculateOverallCompletion,
  isModuleCompleted,
  isSectionCompleted as isSectionCompletedFromTypes,
  hasAchievement,
  hasActiveSession,
  getCurrentSession,
} from '../types/progress.js'

import {
  MODULE_IDS,
  MODULE_STATUS,
  MODULES_METADATA,
  getPrerequisites,
} from '../constants/modules.js'

import { ACHIEVEMENTS_METADATA } from '../constants/achievements.js'

// ============================================================================
// Core Operations - LocalStorage Persistence
// ============================================================================

/**
 * Save Progress Data to LocalStorage
 * 
 * Persists the complete progress data structure to localStorage with
 * comprehensive error handling including quota exceeded checks.
 * Updates the lastUpdated timestamp before saving.
 * 
 * @param {import('../types/progress.js').ProgressData} progressData - Complete progress data to save
 * @returns {boolean} Success status (true if saved, false on error)
 * 
 * @example
 * const success = saveProgress(progressData)
 * if (success) {
 *   console.log('Progress saved successfully')
 * } else {
 *   console.error('Failed to save progress')
 * }
 */
export const saveProgress = (progressData) => {
  try {
    // Validate input
    if (!progressData || typeof progressData !== 'object') {
      console.error('Invalid progress data: must be an object')
      return false
    }

    // Update timestamp
    const dataToSave = {
      ...progressData,
      lastUpdated: new Date().toISOString(),
    }

    // Serialize and save
    const serialized = JSON.stringify(dataToSave)
    localStorage.setItem(PROGRESS_STORAGE_KEY, serialized)
    
    console.log('Progress saved successfully at', dataToSave.lastUpdated)
    return true
  } catch (error) {
    // Handle localStorage errors
    console.error('Error saving progress to localStorage:', error)
    
    if (error.name === 'QuotaExceededError') {
      console.error('LocalStorage quota exceeded. Unable to save progress.')
      console.warn('Consider clearing old data or implementing server-side storage.')
    } else if (error.name === 'SecurityError') {
      console.error('LocalStorage access denied (private browsing or disabled storage).')
    } else {
      console.error('Unexpected error during save:', error.message)
    }
    
    return false
  }
}

/**
 * Load Progress Data from LocalStorage
 * 
 * Retrieves progress data from localStorage with comprehensive validation,
 * migration support, and graceful error handling. Returns null for first-time
 * users or when data is corrupted beyond recovery.
 * 
 * @returns {import('../types/progress.js').ProgressData|null} Loaded progress data or null
 * 
 * @example
 * const progress = loadProgress()
 * if (progress) {
 *   console.log('Progress loaded:', progress)
 * } else {
 *   console.log('No valid progress found - first-time user or corrupted data')
 * }
 */
export const loadProgress = () => {
  try {
    // Retrieve from localStorage
    const stored = localStorage.getItem(PROGRESS_STORAGE_KEY)
    
    // Return null if no stored data (first-time user)
    if (!stored) {
      console.log('No progress data found - first-time user')
      return null
    }

    // Parse JSON
    let data
    try {
      data = JSON.parse(stored)
    } catch (parseError) {
      console.error('Failed to parse progress data JSON:', parseError)
      console.warn('Corrupted data detected. Clearing invalid data.')
      localStorage.removeItem(PROGRESS_STORAGE_KEY)
      return null
    }

    // Check if migration is needed
    if (data.version && data.version < SCHEMA_VERSION) {
      console.log(`Migrating progress data from v${data.version} to v${SCHEMA_VERSION}`)
      try {
        data = migrateProgressDataFromTypes(data)
        console.log('Migration completed successfully')
        
        // Save migrated data
        saveProgress(data)
      } catch (migrationError) {
        console.error('Migration failed:', migrationError)
        console.warn('Unable to migrate data. Returning null.')
        return null
      }
    }

    // Validate data structure
    const validation = validateProgressData(data)
    if (!validation.valid) {
      console.error('Progress data validation failed:', validation.errors)
      console.warn('Data structure is invalid. Consider resetting progress.')
      
      // Attempt to salvage what we can, or return null
      // For safety, we return null to prevent app crashes
      return null
    }

    console.log('Progress loaded successfully')
    return data
  } catch (error) {
    // Handle localStorage access errors
    console.error('Error loading progress from localStorage:', error)
    
    if (error.name === 'SecurityError') {
      console.error('LocalStorage access denied (private browsing or disabled storage).')
    } else {
      console.error('Unexpected error during load:', error.message)
    }
    
    return null
  }
}

// ============================================================================
// Core Operations - Progress Updates
// ============================================================================

/**
 * Update Module Completion Status
 * 
 * Marks a section as complete and automatically recalculates the module's
 * completion percentage and status. If the module becomes complete, updates
 * status to 'completed' and unlocks the next module if applicable.
 * 
 * Returns a new progress data object (immutable update pattern).
 * 
 * @param {number} moduleId - Module ID (1, 2, or 3)
 * @param {string} sectionId - Section ID to mark as complete
 * @param {import('../types/progress.js').ProgressData} progressData - Current progress data
 * @returns {import('../types/progress.js').ProgressData} Updated progress data
 * 
 * @example
 * const updatedProgress = updateModuleCompletion(1, 'intro_what_are_llms', progressData)
 * saveProgress(updatedProgress)
 */
export const updateModuleCompletion = (moduleId, sectionId, progressData) => {
  if (!progressData || !progressData.modules) {
    console.error('Invalid progress data provided to updateModuleCompletion')
    return progressData
  }

  const module = progressData.modules[moduleId]
  if (!module) {
    console.error(`Module ${moduleId} not found in progress data`)
    return progressData
  }

  // Find the section
  const sectionIndex = module.sections.findIndex((s) => s.id === sectionId)
  if (sectionIndex === -1) {
    console.error(`Section ${sectionId} not found in module ${moduleId}`)
    return progressData
  }

  // If already completed, no need to update
  if (module.sections[sectionIndex].completed) {
    console.log(`Section ${sectionId} already completed`)
    return progressData
  }

  // Create updated sections array
  const now = new Date().toISOString()
  const updatedSections = [...module.sections]
  updatedSections[sectionIndex] = {
    ...updatedSections[sectionIndex],
    completed: true,
    completedAt: now,
  }

  // Calculate new completion percentage
  const completedCount = updatedSections.filter((s) => s.completed).length
  const totalCount = updatedSections.length
  const completionPercentage = Math.round((completedCount / totalCount) * 100)

  // Determine new module status
  let newStatus = module.status
  let completedAt = module.completedAt
  
  if (completionPercentage === 100) {
    newStatus = MODULE_STATUS.COMPLETED
    completedAt = now
    console.log(`Module ${moduleId} completed!`)
  } else if (module.status === MODULE_STATUS.LOCKED) {
    // If module was locked but a section completed, it's now in progress
    newStatus = MODULE_STATUS.IN_PROGRESS
  }

  // Update module
  const updatedModule = {
    ...module,
    sections: updatedSections,
    completionPercentage,
    status: newStatus,
    completedAt,
    startedAt: module.startedAt || now, // Set startedAt if not set
  }

  // Create updated modules object
  const updatedModules = {
    ...progressData.modules,
    [moduleId]: updatedModule,
  }

  // Check if we should unlock next module
  if (newStatus === MODULE_STATUS.COMPLETED) {
    const nextModuleId = moduleId + 1
    if (nextModuleId <= 3 && updatedModules[nextModuleId]) {
      const nextModule = updatedModules[nextModuleId]
      if (nextModule.status === MODULE_STATUS.LOCKED) {
        // Check if all prerequisites are met
        const prerequisites = getPrerequisites(nextModuleId)
        const allPrereqsMet = prerequisites.every((prereqId) => {
          return updatedModules[prereqId]?.status === MODULE_STATUS.COMPLETED
        })

        if (allPrereqsMet) {
          console.log(`Unlocking module ${nextModuleId}`)
          updatedModules[nextModuleId] = {
            ...nextModule,
            status: MODULE_STATUS.IN_PROGRESS,
            startedAt: now,
          }
        }
      }
    }
  }

  // Update current location
  const updatedProgress = {
    ...progressData,
    modules: updatedModules,
    currentModule: moduleId,
    currentSection: sectionId,
    lastUpdated: now,
  }

  console.log(`Section ${sectionId} in module ${moduleId} marked as complete`)
  return updatedProgress
}

/**
 * Calculate Overall Progress Percentage
 * 
 * Computes the overall course completion percentage (0-100) based on
 * completion of all modules and sections. Uses simple average of module
 * completion percentages.
 * 
 * @param {import('../types/progress.js').ProgressData} progressData - Current progress data
 * @returns {number} Overall completion percentage (0-100)
 * 
 * @example
 * const percentage = calculateProgressPercentage(progressData)
 * console.log(`Course ${percentage}% complete`)
 */
export const calculateProgressPercentage = (progressData) => {
  if (!progressData || !progressData.modules) {
    console.warn('Invalid progress data provided to calculateProgressPercentage')
    return 0
  }

  // Use existing helper from types/progress.js
  return calculateOverallCompletion(progressData)
}

/**
 * Get Module Status
 * 
 * Returns the current status of a module with prerequisite-based locking logic.
 * A module is locked if any of its prerequisites are not completed.
 * 
 * @param {number} moduleId - Module ID (1, 2, or 3)
 * @param {import('../types/progress.js').ProgressData} progressData - Current progress data
 * @returns {'completed'|'in-progress'|'locked'} Module status
 * 
 * @example
 * const status = getModuleStatus(2, progressData)
 * if (status === 'locked') {
 *   console.log('Complete previous modules first')
 * }
 */
export const getModuleStatus = (moduleId, progressData) => {
  if (!progressData || !progressData.modules) {
    console.warn('Invalid progress data provided to getModuleStatus')
    return MODULE_STATUS.LOCKED
  }

  const module = progressData.modules[moduleId]
  if (!module) {
    console.warn(`Module ${moduleId} not found`)
    return MODULE_STATUS.LOCKED
  }

  // Check prerequisites
  const prerequisites = getPrerequisites(moduleId)
  if (prerequisites.length > 0) {
    const allPrereqsMet = prerequisites.every((prereqId) => {
      const prereqModule = progressData.modules[prereqId]
      return prereqModule && prereqModule.status === MODULE_STATUS.COMPLETED
    })

    // If prerequisites not met, module should be locked
    if (!allPrereqsMet) {
      return MODULE_STATUS.LOCKED
    }
  }

  return module.status
}

/**
 * Unlock Achievement
 * 
 * Awards an achievement to the user if not already unlocked.
 * Prevents duplicate achievements and persists the unlock timestamp.
 * Returns updated progress data.
 * 
 * @param {string} achievementId - Achievement ID to unlock
 * @param {import('../types/progress.js').ProgressData} progressData - Current progress data
 * @returns {import('../types/progress.js').ProgressData} Updated progress data
 * 
 * @example
 * const updated = unlockAchievement('first_steps', progressData)
 * saveProgress(updated)
 */
export const unlockAchievement = (achievementId, progressData) => {
  if (!progressData || !progressData.achievements) {
    console.error('Invalid progress data provided to unlockAchievement')
    return progressData
  }

  // Check if achievement exists in metadata
  const achievementMeta = ACHIEVEMENTS_METADATA[achievementId]
  if (!achievementMeta) {
    console.error(`Achievement ${achievementId} not found in metadata`)
    return progressData
  }

  // Check for duplicates
  const alreadyUnlocked = hasAchievement(progressData, achievementId)
  if (alreadyUnlocked) {
    console.log(`Achievement ${achievementId} already unlocked`)
    return progressData
  }

  // Create achievement record
  const achievement = {
    id: achievementId,
    title: achievementMeta.title,
    unlockedAt: new Date().toISOString(),
  }

  // Add to achievements array
  const updatedAchievements = [...progressData.achievements, achievement]

  const updatedProgress = {
    ...progressData,
    achievements: updatedAchievements,
    lastUpdated: new Date().toISOString(),
  }

  console.log(`Achievement unlocked: ${achievementMeta.title} (${achievementId})`)
  return updatedProgress
}

/**
 * Record Session
 * 
 * Manages session history by either starting a new session or ending the
 * current active session. If there's an active session, ends it. If no
 * active session, starts a new one.
 * 
 * @param {import('../types/progress.js').ProgressData} progressData - Current progress data
 * @param {'start'|'end'} action - Action to perform ('start' or 'end')
 * @returns {import('../types/progress.js').ProgressData} Updated progress data
 * 
 * @example
 * // Start a new session
 * let progress = recordSession(progressData, 'start')
 * 
 * // End the current session
 * progress = recordSession(progress, 'end')
 */
export const recordSession = (progressData, action = 'start') => {
  if (!progressData || !progressData.sessionHistory) {
    console.error('Invalid progress data provided to recordSession')
    return progressData
  }

  const now = new Date().toISOString()

  if (action === 'start') {
    // Check if there's already an active session
    if (hasActiveSession(progressData)) {
      console.warn('Active session already exists. End it first before starting a new one.')
      return progressData
    }

    // Create new session
    const newSession = {
      sessionStart: now,
      sessionEnd: null,
      modulesVisited: [progressData.currentModule],
    }

    const updatedSessionHistory = [...progressData.sessionHistory, newSession]

    console.log('New session started at', now)
    return {
      ...progressData,
      sessionHistory: updatedSessionHistory,
      lastUpdated: now,
    }
  } else if (action === 'end') {
    // End the current active session
    const currentSession = getCurrentSession(progressData)
    
    if (!currentSession) {
      console.warn('No session to end')
      return progressData
    }

    if (currentSession.sessionEnd !== null) {
      console.warn('Current session is already ended')
      return progressData
    }

    // Update the last session with end time
    const updatedSessionHistory = [...progressData.sessionHistory]
    updatedSessionHistory[updatedSessionHistory.length - 1] = {
      ...currentSession,
      sessionEnd: now,
    }

    console.log('Session ended at', now)
    return {
      ...progressData,
      sessionHistory: updatedSessionHistory,
      lastUpdated: now,
    }
  } else {
    console.error(`Invalid action: ${action}. Must be 'start' or 'end'.`)
    return progressData
  }
}

// ============================================================================
// State Detection Helpers
// ============================================================================

/**
 * Check if Module is Complete
 * 
 * Boolean check to determine if a module has been fully completed.
 * 
 * @param {number} moduleId - Module ID (1, 2, or 3)
 * @param {import('../types/progress.js').ProgressData} progressData - Current progress data
 * @returns {boolean} True if module is completed
 * 
 * @example
 * if (isModuleComplete(1, progressData)) {
 *   console.log('Module 1 is complete!')
 * }
 */
export const isModuleComplete = (moduleId, progressData) => {
  if (!progressData || !progressData.modules) {
    return false
  }

  // Use existing helper from types/progress.js
  return isModuleCompleted(progressData, moduleId)
}

/**
 * Check if Section is Complete
 * 
 * Boolean check to determine if a specific section has been completed.
 * 
 * @param {number} moduleId - Module ID (1, 2, or 3)
 * @param {string} sectionId - Section ID
 * @param {import('../types/progress.js').ProgressData} progressData - Current progress data
 * @returns {boolean} True if section is completed
 * 
 * @example
 * if (isSectionComplete(1, 'intro_what_are_llms', progressData)) {
 *   console.log('Section is complete!')
 * }
 */
export const isSectionComplete = (moduleId, sectionId, progressData) => {
  if (!progressData || !progressData.modules) {
    return false
  }

  // Use existing helper from types/progress.js
  return isSectionCompletedFromTypes(progressData, moduleId, sectionId)
}

/**
 * Get Last Visited Location
 * 
 * Returns the last location the user visited for resume functionality.
 * Returns the currentModule and currentSection from progress data.
 * 
 * @param {import('../types/progress.js').ProgressData} progressData - Current progress data
 * @returns {{moduleId: number, sectionId: string|null}} Last visited location
 * 
 * @example
 * const location = getLastVisitedLocation(progressData)
 * console.log(`Resume at Module ${location.moduleId}, Section ${location.sectionId}`)
 */
export const getLastVisitedLocation = (progressData) => {
  if (!progressData) {
    console.warn('No progress data provided to getLastVisitedLocation')
    return { moduleId: MODULE_IDS.MODULE_1, sectionId: null }
  }

  return {
    moduleId: progressData.currentModule || MODULE_IDS.MODULE_1,
    sectionId: progressData.currentSection || null,
  }
}

/**
 * Get Next Module
 * 
 * Determines the next unlocked module after the current one.
 * Returns null if there's no next module or if the next module is locked.
 * 
 * @param {number} currentModuleId - Current module ID
 * @param {import('../types/progress.js').ProgressData} progressData - Current progress data
 * @returns {number|null} Next module ID or null if none available
 * 
 * @example
 * const nextModule = getNextModule(1, progressData)
 * if (nextModule) {
 *   console.log(`Next module: ${nextModule}`)
 * } else {
 *   console.log('No next module available')
 * }
 */
export const getNextModule = (currentModuleId, progressData) => {
  if (!progressData || !progressData.modules) {
    console.warn('Invalid progress data provided to getNextModule')
    return null
  }

  // Find the next module ID
  const nextModuleId = currentModuleId + 1

  // Check if next module exists (max is 3)
  if (nextModuleId > 3) {
    return null
  }

  // Check if next module is unlocked
  const nextModuleStatus = getModuleStatus(nextModuleId, progressData)
  if (nextModuleStatus === MODULE_STATUS.LOCKED) {
    return null
  }

  return nextModuleId
}

// ============================================================================
// Migration and Validation
// ============================================================================

/**
 * Migrate Progress Data
 * 
 * Transforms legacy progress schemas to the current version.
 * Checks version field and applies migrations sequentially.
 * Logs migration events for debugging and preserves user data.
 * 
 * This is a wrapper around the migration function from types/progress.js
 * with additional logging and error handling.
 * 
 * @param {*} oldData - Old progress data to migrate
 * @returns {import('../types/progress.js').ProgressData|null} Migrated data or null on failure
 * 
 * @example
 * const migratedData = migrateProgressData(oldData)
 * if (migratedData) {
 *   saveProgress(migratedData)
 * }
 */
export const migrateProgressData = (oldData) => {
  if (!oldData || typeof oldData !== 'object') {
    console.error('Invalid data provided for migration')
    return null
  }

  try {
    const oldVersion = oldData.version || 0
    console.log(`Starting migration from version ${oldVersion} to ${SCHEMA_VERSION}`)
    
    const migratedData = migrateProgressDataFromTypes(oldData)
    
    console.log('Migration completed successfully')
    console.log('Migration log:', {
      oldVersion,
      newVersion: migratedData.version,
      timestamp: new Date().toISOString(),
      preservedFields: Object.keys(migratedData),
    })
    
    return migratedData
  } catch (error) {
    console.error('Migration failed:', error)
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
    })
    return null
  }
}

// ============================================================================
// Utility Exports
// ============================================================================

/**
 * Clear all progress data from localStorage
 * 
 * Removes progress data completely. Useful for testing, debugging,
 * or when user wants to reset their progress.
 * 
 * @returns {boolean} Success status
 * 
 * @example
 * if (clearProgress()) {
 *   console.log('Progress cleared successfully')
 * }
 */
export const clearProgress = () => {
  try {
    localStorage.removeItem(PROGRESS_STORAGE_KEY)
    console.log('Progress data cleared from localStorage')
    return true
  } catch (error) {
    console.error('Error clearing progress:', error)
    return false
  }
}

/**
 * Initialize progress for a new user
 * 
 * Creates initial progress data for a first-time user with the specified
 * gender preference. Saves to localStorage automatically.
 * 
 * @param {'male'|'female'} gender - User's gender preference
 * @returns {import('../types/progress.js').ProgressData|null} Created progress data or null on error
 * 
 * @example
 * const progress = initializeProgress('female')
 * if (progress) {
 *   console.log('Progress initialized for new user')
 * }
 */
export const initializeProgress = (gender) => {
  try {
    const initialProgress = createInitialProgress(gender)
    const saved = saveProgress(initialProgress)
    
    if (saved) {
      console.log('Progress initialized and saved for new user')
      return initialProgress
    } else {
      console.error('Failed to save initial progress')
      return null
    }
  } catch (error) {
    console.error('Error initializing progress:', error)
    return null
  }
}
