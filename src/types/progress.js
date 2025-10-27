/**
 * Progress Data Type Definitions and Schema
 * 
 * Comprehensive type definitions and helper functions for the LLM Education App
 * progress tracking system. Uses JSDoc for type safety in JavaScript.
 * 
 * @module types/progress
 */

import { MODULE_IDS, MODULES_METADATA, MODULE_STATUS } from '../constants/modules.js'

/**
 * Primary storage key for progress data in localStorage
 */
export const PROGRESS_STORAGE_KEY = 'llm_edu_progress'

/**
 * Current schema version for migration handling
 */
export const SCHEMA_VERSION = 1

/**
 * Valid gender values
 */
export const VALID_GENDERS = ['male', 'female']

/**
 * Valid animation speed values
 */
export const VALID_ANIMATION_SPEEDS = ['slow', 'normal', 'fast']

/**
 * @typedef {Object} SectionProgress
 * @property {string} id - Section identifier (e.g., 'intro_what_are_llms')
 * @property {string} title - Section display title
 * @property {boolean} completed - Whether the section has been completed
 * @property {string|null} completedAt - ISO 8601 timestamp of completion, null if not completed
 */

/**
 * @typedef {Object} ModuleProgress
 * @property {number} id - Module identifier (1, 2, or 3)
 * @property {string} title - Module display title
 * @property {'completed'|'in-progress'|'locked'} status - Current module status
 * @property {SectionProgress[]} sections - Array of section progress objects
 * @property {number} completionPercentage - Percentage of sections completed (0-100)
 * @property {string|null} startedAt - ISO 8601 timestamp of when module was first started
 * @property {string|null} completedAt - ISO 8601 timestamp of when module was completed
 */

/**
 * @typedef {Object} Achievement
 * @property {string} id - Achievement identifier (e.g., 'first_steps')
 * @property {string} title - Achievement display title
 * @property {string} unlockedAt - ISO 8601 timestamp of when achievement was unlocked
 */

/**
 * @typedef {Object} SessionRecord
 * @property {string} sessionStart - ISO 8601 timestamp of session start
 * @property {string|null} sessionEnd - ISO 8601 timestamp of session end, null if ongoing
 * @property {number[]} modulesVisited - Array of module IDs visited during session
 */

/**
 * @typedef {Object} UserPreferences
 * @property {'slow'|'normal'|'fast'} animationSpeed - Animation playback speed preference
 * @property {boolean} autoplayAnimations - Whether animations should autoplay
 */

/**
 * @typedef {Object} ProgressData
 * @property {number} version - Schema version for migration handling
 * @property {'male'|'female'} gender - User's gender preference
 * @property {string} lastUpdated - ISO 8601 timestamp of last update
 * @property {number} currentModule - Currently active module ID (1, 2, or 3)
 * @property {string|null} currentSection - Currently active section identifier
 * @property {Object.<number, ModuleProgress>} modules - Map of module ID to module progress
 * @property {Achievement[]} achievements - Array of unlocked achievements
 * @property {SessionRecord[]} sessionHistory - Array of session records
 * @property {UserPreferences} preferences - User customization preferences
 */

/**
 * Create initial section progress object
 * 
 * @param {string} sectionId - The section identifier
 * @param {string} sectionTitle - The section title
 * @returns {SectionProgress} Initial section progress object
 * 
 * @example
 * const section = createInitialSection('intro_what_are_llms', 'What are LLMs?')
 */
export const createInitialSection = (sectionId, sectionTitle) => {
  return {
    id: sectionId,
    title: sectionTitle,
    completed: false,
    completedAt: null,
  }
}

/**
 * Create initial module progress object
 * 
 * @param {number} moduleId - The module ID
 * @param {boolean} isLocked - Whether the module should start as locked
 * @returns {ModuleProgress} Initial module progress object
 * 
 * @example
 * const module = createInitialModule(1, false)
 */
export const createInitialModule = (moduleId, isLocked = true) => {
  const metadata = MODULES_METADATA[moduleId]
  
  if (!metadata) {
    throw new Error(`Invalid module ID: ${moduleId}`)
  }

  const sections = metadata.sections.map((section) =>
    createInitialSection(section.id, section.title)
  )

  return {
    id: moduleId,
    title: metadata.title,
    status: isLocked ? MODULE_STATUS.LOCKED : MODULE_STATUS.IN_PROGRESS,
    sections: sections,
    completionPercentage: 0,
    startedAt: isLocked ? null : new Date().toISOString(),
    completedAt: null,
  }
}

/**
 * Create default user preferences object
 * 
 * @returns {UserPreferences} Default preferences
 * 
 * @example
 * const prefs = createDefaultPreferences()
 */
export const createDefaultPreferences = () => {
  return {
    animationSpeed: 'normal',
    autoplayAnimations: true,
  }
}

/**
 * Create initial/default progress data object
 * 
 * @param {'male'|'female'} gender - User's gender preference
 * @returns {ProgressData} Complete initial progress data structure
 * 
 * @example
 * const progress = createInitialProgress('female')
 */
export const createInitialProgress = (gender) => {
  if (!VALID_GENDERS.includes(gender)) {
    throw new Error(`Invalid gender: ${gender}. Must be one of: ${VALID_GENDERS.join(', ')}`)
  }

  const now = new Date().toISOString()

  return {
    version: SCHEMA_VERSION,
    gender: gender,
    lastUpdated: now,
    currentModule: MODULE_IDS.MODULE_1,
    currentSection: null,
    modules: {
      [MODULE_IDS.MODULE_1]: createInitialModule(MODULE_IDS.MODULE_1, false), // First module starts unlocked
      [MODULE_IDS.MODULE_2]: createInitialModule(MODULE_IDS.MODULE_2, true),
      [MODULE_IDS.MODULE_3]: createInitialModule(MODULE_IDS.MODULE_3, true),
    },
    achievements: [],
    sessionHistory: [],
    preferences: createDefaultPreferences(),
  }
}

/**
 * Calculate completion percentage for a module
 * 
 * @param {ModuleProgress} moduleProgress - The module progress object
 * @returns {number} Completion percentage (0-100)
 * 
 * @example
 * const percentage = calculateModuleCompletion(moduleProgress)
 */
export const calculateModuleCompletion = (moduleProgress) => {
  if (!moduleProgress || !moduleProgress.sections || moduleProgress.sections.length === 0) {
    return 0
  }

  const completedSections = moduleProgress.sections.filter((section) => section.completed).length
  const totalSections = moduleProgress.sections.length

  return Math.round((completedSections / totalSections) * 100)
}

/**
 * Calculate overall course completion percentage
 * 
 * @param {ProgressData} progressData - The complete progress data object
 * @returns {number} Overall completion percentage (0-100)
 * 
 * @example
 * const percentage = calculateOverallCompletion(progressData)
 */
export const calculateOverallCompletion = (progressData) => {
  if (!progressData || !progressData.modules) {
    return 0
  }

  const moduleIds = Object.keys(progressData.modules).map(Number)
  const totalModules = moduleIds.length

  if (totalModules === 0) {
    return 0
  }

  const totalCompletion = moduleIds.reduce((sum, moduleId) => {
    const module = progressData.modules[moduleId]
    return sum + calculateModuleCompletion(module)
  }, 0)

  return Math.round(totalCompletion / totalModules)
}

/**
 * Validate progress data structure
 * 
 * Checks if the loaded data matches the expected schema structure.
 * Returns an object with validation results and any error messages.
 * 
 * @param {*} data - Data to validate
 * @returns {{valid: boolean, errors: string[]}} Validation result
 * 
 * @example
 * const result = validateProgressData(loadedData)
 * if (result.valid) {
 *   console.log('Data is valid')
 * } else {
 *   console.error('Validation errors:', result.errors)
 * }
 */
export const validateProgressData = (data) => {
  const errors = []

  // Check if data exists and is an object
  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Data must be an object'] }
  }

  // Check required top-level fields
  if (typeof data.version !== 'number') {
    errors.push('version must be a number')
  }

  if (!VALID_GENDERS.includes(data.gender)) {
    errors.push(`gender must be one of: ${VALID_GENDERS.join(', ')}`)
  }

  if (typeof data.lastUpdated !== 'string') {
    errors.push('lastUpdated must be a string (ISO 8601 timestamp)')
  }

  if (typeof data.currentModule !== 'number' || ![1, 2, 3].includes(data.currentModule)) {
    errors.push('currentModule must be 1, 2, or 3')
  }

  if (data.currentSection !== null && typeof data.currentSection !== 'string') {
    errors.push('currentSection must be a string or null')
  }

  // Check modules object
  if (!data.modules || typeof data.modules !== 'object') {
    errors.push('modules must be an object')
  } else {
    // Validate each module
    [1, 2, 3].forEach((moduleId) => {
      const module = data.modules[moduleId]
      if (!module) {
        errors.push(`Module ${moduleId} is missing`)
      } else {
        if (module.id !== moduleId) {
          errors.push(`Module ${moduleId} has incorrect id: ${module.id}`)
        }
        if (typeof module.title !== 'string') {
          errors.push(`Module ${moduleId} title must be a string`)
        }
        if (!Object.values(MODULE_STATUS).includes(module.status)) {
          errors.push(`Module ${moduleId} has invalid status: ${module.status}`)
        }
        if (!Array.isArray(module.sections)) {
          errors.push(`Module ${moduleId} sections must be an array`)
        }
        if (typeof module.completionPercentage !== 'number') {
          errors.push(`Module ${moduleId} completionPercentage must be a number`)
        }
      }
    })
  }

  // Check achievements array
  if (!Array.isArray(data.achievements)) {
    errors.push('achievements must be an array')
  }

  // Check sessionHistory array
  if (!Array.isArray(data.sessionHistory)) {
    errors.push('sessionHistory must be an array')
  }

  // Check preferences object
  if (!data.preferences || typeof data.preferences !== 'object') {
    errors.push('preferences must be an object')
  } else {
    if (!VALID_ANIMATION_SPEEDS.includes(data.preferences.animationSpeed)) {
      errors.push(`preferences.animationSpeed must be one of: ${VALID_ANIMATION_SPEEDS.join(', ')}`)
    }
    if (typeof data.preferences.autoplayAnimations !== 'boolean') {
      errors.push('preferences.autoplayAnimations must be a boolean')
    }
  }

  return {
    valid: errors.length === 0,
    errors: errors,
  }
}

/**
 * Migration function for future schema updates
 * 
 * Transforms old schema versions to the current version.
 * Currently handles v1, but prepared for future versions.
 * 
 * @param {ProgressData} data - Progress data to migrate
 * @returns {ProgressData} Migrated progress data
 * 
 * @example
 * const migratedData = migrateProgressData(oldData)
 */
export const migrateProgressData = (data) => {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid data for migration')
  }

  let migratedData = { ...data }

  // Handle missing version (treat as v1)
  if (!migratedData.version) {
    migratedData.version = 1
  }

  // Future migration paths
  // if (migratedData.version === 1) {
  //   // Migrate v1 to v2
  //   migratedData = migrateV1ToV2(migratedData)
  // }
  // if (migratedData.version === 2) {
  //   // Migrate v2 to v3
  //   migratedData = migrateV2ToV3(migratedData)
  // }

  // Update to current version if needed
  if (migratedData.version < SCHEMA_VERSION) {
    migratedData.version = SCHEMA_VERSION
    migratedData.lastUpdated = new Date().toISOString()
  }

  return migratedData
}

/**
 * Check if a module is unlocked
 * 
 * @param {ProgressData} progressData - The complete progress data object
 * @param {number} moduleId - The module ID to check
 * @returns {boolean} True if the module is unlocked (not locked)
 * 
 * @example
 * const isUnlocked = isModuleUnlocked(progressData, 2)
 */
export const isModuleUnlocked = (progressData, moduleId) => {
  const module = progressData.modules[moduleId]
  return module && module.status !== MODULE_STATUS.LOCKED
}

/**
 * Check if a module is completed
 * 
 * @param {ProgressData} progressData - The complete progress data object
 * @param {number} moduleId - The module ID to check
 * @returns {boolean} True if the module is completed
 * 
 * @example
 * const isCompleted = isModuleCompleted(progressData, 1)
 */
export const isModuleCompleted = (progressData, moduleId) => {
  const module = progressData.modules[moduleId]
  return module && module.status === MODULE_STATUS.COMPLETED
}

/**
 * Get completed sections count for a module
 * 
 * @param {ModuleProgress} moduleProgress - The module progress object
 * @returns {number} Number of completed sections
 * 
 * @example
 * const count = getCompletedSectionsCount(moduleProgress)
 */
export const getCompletedSectionsCount = (moduleProgress) => {
  if (!moduleProgress || !moduleProgress.sections) {
    return 0
  }
  return moduleProgress.sections.filter((section) => section.completed).length
}

/**
 * Get total sections count for a module
 * 
 * @param {ModuleProgress} moduleProgress - The module progress object
 * @returns {number} Total number of sections
 * 
 * @example
 * const total = getTotalSectionsCount(moduleProgress)
 */
export const getTotalSectionsCount = (moduleProgress) => {
  if (!moduleProgress || !moduleProgress.sections) {
    return 0
  }
  return moduleProgress.sections.length
}

/**
 * Check if a section is completed
 * 
 * @param {ProgressData} progressData - The complete progress data object
 * @param {number} moduleId - The module ID
 * @param {string} sectionId - The section ID
 * @returns {boolean} True if the section is completed
 * 
 * @example
 * const isCompleted = isSectionCompleted(progressData, 1, 'intro_what_are_llms')
 */
export const isSectionCompleted = (progressData, moduleId, sectionId) => {
  const module = progressData.modules[moduleId]
  if (!module || !module.sections) {
    return false
  }

  const section = module.sections.find((s) => s.id === sectionId)
  return section ? section.completed : false
}

/**
 * Get achievement by ID
 * 
 * @param {ProgressData} progressData - The complete progress data object
 * @param {string} achievementId - The achievement ID
 * @returns {Achievement|null} Achievement object or null if not unlocked
 * 
 * @example
 * const achievement = getAchievement(progressData, 'first_steps')
 */
export const getAchievement = (progressData, achievementId) => {
  if (!progressData || !progressData.achievements) {
    return null
  }
  return progressData.achievements.find((a) => a.id === achievementId) || null
}

/**
 * Check if an achievement is unlocked
 * 
 * @param {ProgressData} progressData - The complete progress data object
 * @param {string} achievementId - The achievement ID
 * @returns {boolean} True if the achievement is unlocked
 * 
 * @example
 * const isUnlocked = hasAchievement(progressData, 'first_steps')
 */
export const hasAchievement = (progressData, achievementId) => {
  return getAchievement(progressData, achievementId) !== null
}

/**
 * Get the most recent session
 * 
 * @param {ProgressData} progressData - The complete progress data object
 * @returns {SessionRecord|null} Most recent session or null if no sessions
 * 
 * @example
 * const lastSession = getCurrentSession(progressData)
 */
export const getCurrentSession = (progressData) => {
  if (!progressData || !progressData.sessionHistory || progressData.sessionHistory.length === 0) {
    return null
  }
  return progressData.sessionHistory[progressData.sessionHistory.length - 1]
}

/**
 * Check if there's an active (ongoing) session
 * 
 * @param {ProgressData} progressData - The complete progress data object
 * @returns {boolean} True if there's an active session (sessionEnd is null)
 * 
 * @example
 * const isActive = hasActiveSession(progressData)
 */
export const hasActiveSession = (progressData) => {
  const currentSession = getCurrentSession(progressData)
  return currentSession !== null && currentSession.sessionEnd === null
}
