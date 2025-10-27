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
