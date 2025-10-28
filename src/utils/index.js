/**
 * Utilities Module - Central Export
 * 
 * Exports all utility functions used throughout the application.
 * 
 * @module utils
 */

export {
  getStoredTheme,
  setStoredTheme,
  removeStoredTheme,
  isStorageAvailable,
  STORAGE_KEYS,
} from './storage'

export {
  saveGenderPreference,
  loadGenderPreference,
  clearGenderPreference,
  isFirstVisit,
  getGenderPreferenceMetadata,
  isLocalStorageAvailable,
  GENDER_STORAGE_KEY,
} from './localStorage'

export {
  saveProgress,
  loadProgress,
  updateModuleCompletion,
  calculateProgressPercentage,
  getModuleStatus,
  unlockAchievement,
  recordSession,
  isModuleComplete,
  isSectionComplete,
  getLastVisitedLocation,
  getNextModule,
  migrateProgressData,
  clearProgress,
  initializeProgress,
} from './progressManager'

export {
  getResumePoint,
  resetProgress,
  getModuleRoute,
  getNextIncompleteSection,
  hasStartedLearning,
} from './progressHelpers'

export {
  saveWalkthroughCompleted,
  isWalkthroughCompleted,
  resetWalkthrough,
  getWalkthroughMetadata,
  WALKTHROUGH_STORAGE_KEY,
} from './walkthroughStorage'
