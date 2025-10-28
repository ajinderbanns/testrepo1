/**
 * PageTransition Component
 * 
 * Wraps page content with smooth page transitions for route changes.
 * Integrates with React Router and Framer Motion.
 * 
 * @component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { pageTransitions } from './presets'
import { useAnimationConfig } from '../hooks/useAnimationConfig'

/**
 * PageTransition
 * 
 * Applies page transition animations when route changes.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content
 * @param {string} props.transition - Transition type ('fade', 'slideRight', 'slideLeft', 'scaleUp', 'blur')
 * @param {string} props.pageKey - Unique key for the page (typically route path)
 * @param {Object} props.style - Additional inline styles
 * @param {string} props.className - CSS class name
 * 
 * @example
 * // In App.jsx with React Router
 * import { useLocation } from 'react-router-dom'
 * import PageTransition from '@/animations/PageTransition'
 * 
 * function App() {
 *   const location = useLocation()
 *   
 *   return (
 *     <PageTransition pageKey={location.pathname} transition="fade">
 *       <Routes location={location}>
 *         <Route path="/" element={<Home />} />
 *         <Route path="/about" element={<About />} />
 *       </Routes>
 *     </PageTransition>
 *   )
 * }
 */
const PageTransition = ({
  children,
  transition = 'fade',
  pageKey,
  style = {},
  className = '',
}) => {
  const animConfig = useAnimationConfig()
  
  // Get transition variants
  const variants = pageTransitions[transition] || pageTransitions.fade
  
  // Disable animations if user prefers reduced motion
  if (!animConfig.enabled) {
    return (
      <div style={style} className={className}>
        {children}
      </div>
    )
  }
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          width: '100%',
          ...style,
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
  transition: PropTypes.oneOf(['fade', 'slideRight', 'slideLeft', 'scaleUp', 'blur']),
  pageKey: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
}

export default PageTransition
