/**
 * Navigation Helper Utilities
 * 
 * Utility functions for navigation, breadcrumbs, and module routing.
 * Provides intelligent path detection and navigation state management.
 * 
 * @module utils/navigationHelpers
 */

import { MODULE_IDS, MODULES_METADATA, MODULE_STATUS } from '../constants/modules.js'

/**
 * Get breadcrumb trail for current location
 * 
 * @param {string} pathname - Current route path
 * @param {Object} progress - Progress data object
 * @returns {Array} Breadcrumb items with label and path
 * 
 * @example
 * const breadcrumbs = getBreadcrumbs('/module/2/tokenization', progressData)
 * // Returns: [{ label: 'Home', path: '/' }, { label: 'Module 2', path: '/module/2' }, ...]
 */
export const getBreadcrumbs = (pathname, progress = null) => {
  const breadcrumbs = []
  
  // Always start with Home
  breadcrumbs.push({ label: 'Home', path: '/' })
  
  // Parse the pathname
  const parts = pathname.split('/').filter(Boolean)
  
  if (parts.length === 0) {
    return breadcrumbs
  }
  
  // Add Learning Dashboard if we're in the learn section
  if (parts[0] === 'learn') {
    breadcrumbs.push({ label: 'Learning Dashboard', path: '/learn' })
  }
  
  // Handle module routes
  if (parts[0] === 'module' && parts[1]) {
    const moduleId = parseInt(parts[1])
    const moduleData = MODULES_METADATA[moduleId]
    
    if (moduleData) {
      breadcrumbs.push({
        label: moduleData.title,
        path: `/module/${moduleId}`,
      })
      
      // Add section if present
      if (parts[2] && moduleData.sections) {
        const section = moduleData.sections.find(s => s.id === parts[2])
        if (section) {
          breadcrumbs.push({
            label: section.title,
            path: `/module/${moduleId}/${parts[2]}`,
          })
        }
      }
    }
  }
  
  return breadcrumbs
}

/**
 * Get navigation items with status
 * 
 * @param {Object} progress - Progress data object
 * @returns {Array} Navigation items with status information
 */
export const getNavigationItems = (progress = null) => {
  const moduleIds = [MODULE_IDS.MODULE_1, MODULE_IDS.MODULE_2, MODULE_IDS.MODULE_3]
  
  return moduleIds.map(moduleId => {
    const metadata = MODULES_METADATA[moduleId]
    let status = MODULE_STATUS.LOCKED
    let completionPercentage = 0
    
    if (progress && progress.modules && progress.modules[moduleId]) {
      const moduleProgress = progress.modules[moduleId]
      status = moduleProgress.status || MODULE_STATUS.LOCKED
      
      // Calculate completion percentage
      if (moduleProgress.sections && moduleProgress.sections.length > 0) {
        const completedCount = moduleProgress.sections.filter(s => s.completed).length
        completionPercentage = Math.round((completedCount / moduleProgress.sections.length) * 100)
      }
    } else if (moduleId === MODULE_IDS.MODULE_1) {
      // Module 1 is always unlocked
      status = MODULE_STATUS.IN_PROGRESS
    }
    
    return {
      id: moduleId,
      title: metadata.title,
      description: metadata.description,
      path: `/module/${moduleId}`,
      status,
      completionPercentage,
      isLocked: status === MODULE_STATUS.LOCKED,
      isCompleted: status === MODULE_STATUS.COMPLETED,
      isInProgress: status === MODULE_STATUS.IN_PROGRESS,
    }
  })
}

/**
 * Check if a route is active
 * 
 * @param {string} currentPath - Current pathname
 * @param {string} targetPath - Target path to check
 * @param {boolean} exact - Require exact match
 * @returns {boolean} Whether the route is active
 */
export const isRouteActive = (currentPath, targetPath, exact = false) => {
  if (exact) {
    return currentPath === targetPath
  }
  return currentPath.startsWith(targetPath)
}

/**
 * Get module ID from pathname
 * 
 * @param {string} pathname - Current route path
 * @returns {number|null} Module ID or null
 */
export const getModuleIdFromPath = (pathname) => {
  const match = pathname.match(/\/module\/(\d+)/)
  return match ? parseInt(match[1]) : null
}

/**
 * Get section ID from pathname
 * 
 * @param {string} pathname - Current route path
 * @returns {string|null} Section ID or null
 */
export const getSectionIdFromPath = (pathname) => {
  const match = pathname.match(/\/module\/\d+\/([^/]+)/)
  return match ? match[1] : null
}

/**
 * Get unlock message for locked module
 * 
 * @param {number} moduleId - Module ID
 * @param {Object} progress - Progress data object
 * @returns {string} Message explaining how to unlock
 */
export const getUnlockMessage = (moduleId, progress = null) => {
  if (moduleId === MODULE_IDS.MODULE_1) {
    return 'Start your learning journey!'
  }
  
  const previousModuleId = moduleId - 1
  const previousModule = MODULES_METADATA[previousModuleId]
  
  if (!previousModule) {
    return 'Complete previous modules to unlock'
  }
  
  // Check if previous module is complete
  if (progress && progress.modules && progress.modules[previousModuleId]) {
    const prevModuleProgress = progress.modules[previousModuleId]
    if (prevModuleProgress.status === MODULE_STATUS.COMPLETED) {
      return 'Module unlocked! Start learning.'
    }
  }
  
  return `Complete "${previousModule.title}" to unlock this module`
}

/**
 * Get next module in sequence
 * 
 * @param {number} currentModuleId - Current module ID
 * @param {Object} progress - Progress data object
 * @returns {Object|null} Next module information or null
 */
export const getNextModule = (currentModuleId, progress = null) => {
  const nextModuleId = currentModuleId + 1
  
  if (nextModuleId > MODULE_IDS.MODULE_3) {
    return null
  }
  
  const nextModule = MODULES_METADATA[nextModuleId]
  if (!nextModule) {
    return null
  }
  
  let status = MODULE_STATUS.LOCKED
  if (progress && progress.modules && progress.modules[nextModuleId]) {
    status = progress.modules[nextModuleId].status
  }
  
  return {
    id: nextModuleId,
    title: nextModule.title,
    path: `/module/${nextModuleId}`,
    status,
    isLocked: status === MODULE_STATUS.LOCKED,
  }
}

/**
 * Get previous module in sequence
 * 
 * @param {number} currentModuleId - Current module ID
 * @returns {Object|null} Previous module information or null
 */
export const getPreviousModule = (currentModuleId) => {
  const prevModuleId = currentModuleId - 1
  
  if (prevModuleId < MODULE_IDS.MODULE_1) {
    return null
  }
  
  const prevModule = MODULES_METADATA[prevModuleId]
  if (!prevModule) {
    return null
  }
  
  return {
    id: prevModuleId,
    title: prevModule.title,
    path: `/module/${prevModuleId}`,
  }
}

/**
 * Format module completion percentage
 * 
 * @param {number} percentage - Completion percentage (0-100)
 * @returns {string} Formatted percentage string
 */
export const formatCompletionPercentage = (percentage) => {
  if (percentage === 0) return '0%'
  if (percentage === 100) return 'Complete'
  return `${percentage}%`
}

/**
 * Get keyboard navigation config
 * 
 * @returns {Object} Keyboard shortcuts and handlers
 */
export const getKeyboardShortcuts = () => {
  return {
    'ArrowLeft': 'Navigate to previous module',
    'ArrowRight': 'Navigate to next module',
    'ArrowUp': 'Navigate to previous section',
    'ArrowDown': 'Navigate to next section',
    'h': 'Go to home',
    'm': 'Toggle mobile menu',
    'Escape': 'Close menu/modal',
  }
}

/**
 * Smooth scroll to element
 * 
 * @param {string} elementId - ID of element to scroll to
 * @param {number} offset - Offset from top in pixels
 */
export const smoothScrollTo = (elementId, offset = 80) => {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

/**
 * Check if navigation should be hidden
 * 
 * @param {string} pathname - Current route path
 * @returns {boolean} Whether navigation should be hidden
 */
export const shouldHideNavigation = (pathname) => {
  // Hide navigation on landing page
  return pathname === '/'
}
