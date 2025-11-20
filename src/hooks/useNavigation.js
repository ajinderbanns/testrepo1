/**
 * useNavigation Hook
 * 
 * Custom React hook for navigation state management.
 * Provides current location info, breadcrumbs, navigation items with status,
 * and keyboard navigation support.
 * 
 * @module useNavigation
 */

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useProgress } from './useProgress'
import {
  getBreadcrumbs,
  getNavigationItems,
  isRouteActive,
  getModuleIdFromPath,
  getSectionIdFromPath,
  getNextModule,
  getPreviousModule,
  shouldHideNavigation,
} from '../utils/navigationHelpers'

/**
 * useNavigation Hook
 * 
 * Manages navigation state, breadcrumbs, and provides navigation utilities.
 * 
 * @returns {Object} Navigation state and functions
 * @returns {Object} return.location - Current location object from React Router
 * @returns {string} return.pathname - Current pathname
 * @returns {Array} return.breadcrumbs - Breadcrumb trail for current location
 * @returns {Array} return.navigationItems - Navigation items with progress status
 * @returns {number|null} return.currentModuleId - Current module ID if in module
 * @returns {string|null} return.currentSectionId - Current section ID if in section
 * @returns {boolean} return.isModulePage - Whether currently on a module page
 * @returns {boolean} return.hideNavigation - Whether navigation should be hidden
 * @returns {Function} return.isActive - Check if a route is active
 * @returns {Function} return.navigateToModule - Navigate to a module
 * @returns {Function} return.navigateToSection - Navigate to a section
 * @returns {Function} return.goToNextModule - Navigate to next module
 * @returns {Function} return.goToPreviousModule - Navigate to previous module
 * @returns {Function} return.goHome - Navigate to home/dashboard
 * 
 * @example
 * function MyComponent() {
 *   const {
 *     breadcrumbs,
 *     navigationItems,
 *     currentModuleId,
 *     isActive,
 *     navigateToModule
 *   } = useNavigation()
 *   
 *   return (
 *     <div>
 *       {breadcrumbs.map(crumb => <span key={crumb.path}>{crumb.label}</span>)}
 *       {navigationItems.map(item => (
 *         <button onClick={() => navigateToModule(item.id)}>
 *           {item.title}
 *         </button>
 *       ))}
 *     </div>
 *   )
 * }
 */
export const useNavigation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { progress } = useProgress()
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Extract current location info
  const pathname = location.pathname
  const currentModuleId = useMemo(() => getModuleIdFromPath(pathname), [pathname])
  const currentSectionId = useMemo(() => getSectionIdFromPath(pathname), [pathname])
  const isModulePage = currentModuleId !== null
  const hideNavigation = useMemo(() => shouldHideNavigation(pathname), [pathname])
  
  // Get breadcrumbs for current location
  const breadcrumbs = useMemo(() => getBreadcrumbs(pathname, progress), [pathname, progress])
  
  // Get navigation items with progress status
  const navigationItems = useMemo(() => getNavigationItems(progress), [progress])
  
  // Check if a route is active
  const isActive = useCallback(
    (path, exact = false) => isRouteActive(pathname, path, exact),
    [pathname]
  )
  
  // Navigation functions
  const navigateToModule = useCallback(
    (moduleId) => {
      navigate(`/module/${moduleId}`)
      setIsMobileMenuOpen(false)
    },
    [navigate]
  )
  
  const navigateToSection = useCallback(
    (moduleId, sectionId) => {
      navigate(`/module/${moduleId}/${sectionId}`)
      setIsMobileMenuOpen(false)
    },
    [navigate]
  )
  
  const goToNextModule = useCallback(() => {
    if (currentModuleId) {
      const nextModule = getNextModule(currentModuleId, progress)
      if (nextModule && !nextModule.isLocked) {
        navigate(nextModule.path)
      }
    }
  }, [currentModuleId, progress, navigate])
  
  const goToPreviousModule = useCallback(() => {
    if (currentModuleId) {
      const prevModule = getPreviousModule(currentModuleId)
      if (prevModule) {
        navigate(prevModule.path)
      }
    }
  }, [currentModuleId, navigate])
  
  const goHome = useCallback(() => {
    navigate('/learn')
    setIsMobileMenuOpen(false)
  }, [navigate])
  
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])
  
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't handle keyboard shortcuts if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return
      }
      
      switch (e.key) {
        case 'ArrowRight':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            goToNextModule()
          }
          break
        case 'ArrowLeft':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            goToPreviousModule()
          }
          break
        case 'h':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            goHome()
          }
          break
        case 'm':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            toggleMobileMenu()
          }
          break
        case 'Escape':
          if (isMobileMenuOpen) {
            e.preventDefault()
            closeMobileMenu()
          }
          break
        default:
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNextModule, goToPreviousModule, goHome, toggleMobileMenu, closeMobileMenu, isMobileMenuOpen])
  
  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])
  
  return {
    // Location info
    location,
    pathname,
    breadcrumbs,
    
    // Navigation items
    navigationItems,
    
    // Current state
    currentModuleId,
    currentSectionId,
    isModulePage,
    hideNavigation,
    
    // Mobile menu state
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
    
    // Utility functions
    isActive,
    
    // Navigation functions
    navigateToModule,
    navigateToSection,
    goToNextModule,
    goToPreviousModule,
    goHome,
  }
}

export default useNavigation
