/**
 * useKeyboardNavigation Hook
 * 
 * Provides keyboard navigation utilities for accessible interactions.
 * Includes common keyboard shortcuts and event handlers.
 * 
 * @returns {Object} Keyboard navigation utilities
 */

import { useEffect, useCallback, useState } from 'react'

export const useKeyboardNavigation = () => {
  const [isUsingKeyboard, setIsUsingKeyboard] = useState(false)

  // Track keyboard vs mouse usage
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        setIsUsingKeyboard(true)
        document.body.classList.add('using-keyboard')
        document.body.classList.remove('using-mouse')
      }
    }

    const handleMouseDown = () => {
      setIsUsingKeyboard(false)
      document.body.classList.add('using-mouse')
      document.body.classList.remove('using-keyboard')
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('mousedown', handleMouseDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])

  /**
   * Handle Enter and Space key presses for clickable elements
   */
  const handleActivation = useCallback((callback) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      callback(e)
    }
  }, [])

  /**
   * Handle Escape key press
   */
  const handleEscape = useCallback((callback) => {
    useEffect(() => {
      const handler = (e) => {
        if (e.key === 'Escape') {
          callback(e)
        }
      }
      window.addEventListener('keydown', handler)
      return () => window.removeEventListener('keydown', handler)
    }, [callback])
  }, [])

  /**
   * Handle arrow key navigation
   */
  const handleArrowNavigation = useCallback((options = {}) => (e) => {
    const {
      onUp,
      onDown,
      onLeft,
      onRight,
      preventDefault = true,
    } = options

    if (preventDefault) {
      e.preventDefault()
    }

    switch (e.key) {
      case 'ArrowUp':
        onUp?.(e)
        break
      case 'ArrowDown':
        onDown?.(e)
        break
      case 'ArrowLeft':
        onLeft?.(e)
        break
      case 'ArrowRight':
        onRight?.(e)
        break
      default:
        break
    }
  }, [])

  /**
   * Focus trap for modals and dialogs
   */
  const useFocusTrap = useCallback((containerRef, isActive) => {
    useEffect(() => {
      if (!isActive || !containerRef.current) return

      const container = containerRef.current
      const focusableElements = container.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      const handleTabKey = (e) => {
        if (e.key !== 'Tab') return

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }

      container.addEventListener('keydown', handleTabKey)
      
      // Focus first element
      firstElement?.focus()

      return () => {
        container.removeEventListener('keydown', handleTabKey)
      }
    }, [containerRef, isActive])
  }, [])

  /**
   * Handle keyboard shortcuts
   */
  const useKeyboardShortcut = useCallback((shortcuts) => {
    useEffect(() => {
      const handler = (e) => {
        const key = e.key.toLowerCase()
        const ctrl = e.ctrlKey || e.metaKey
        const shift = e.shiftKey
        const alt = e.altKey

        Object.entries(shortcuts).forEach(([combo, callback]) => {
          const parts = combo.toLowerCase().split('+')
          const comboKey = parts[parts.length - 1]
          const needsCtrl = parts.includes('ctrl') || parts.includes('cmd')
          const needsShift = parts.includes('shift')
          const needsAlt = parts.includes('alt')

          if (
            key === comboKey &&
            ctrl === needsCtrl &&
            shift === needsShift &&
            alt === needsAlt
          ) {
            e.preventDefault()
            callback(e)
          }
        })
      }

      window.addEventListener('keydown', handler)
      return () => window.removeEventListener('keydown', handler)
    }, [shortcuts])
  }, [])

  return {
    isUsingKeyboard,
    handleActivation,
    handleEscape,
    handleArrowNavigation,
    useFocusTrap,
    useKeyboardShortcut,
  }
}

export default useKeyboardNavigation
