/**
 * TransitionWrapper Component
 * 
 * Flexible wrapper component for applying Framer Motion animations.
 * Supports custom variants, preset animations, and respects user preferences.
 * 
 * @component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { contentReveal } from './presets'
import { useAnimationConfig } from '../hooks/useAnimationConfig'

/**
 * TransitionWrapper
 * 
 * Wrapper component that applies motion animations with automatic
 * reduced-motion support.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {Object} props.variants - Animation variants (overrides preset)
 * @param {string} props.preset - Preset name from contentReveal
 * @param {string} props.initial - Initial animation state
 * @param {string} props.animate - Animate to state
 * @param {string} props.exit - Exit animation state
 * @param {number} props.delay - Animation delay in seconds
 * @param {boolean} props.once - Whether to animate only once
 * @param {string} props.as - HTML element or component to render as
 * @param {Object} props.style - Additional inline styles
 * @param {string} props.className - CSS class name
 * 
 * @example
 * <TransitionWrapper preset="fadeInUp" delay={0.2}>
 *   <h1>Hello World</h1>
 * </TransitionWrapper>
 * 
 * @example
 * // With custom variants
 * <TransitionWrapper variants={customVariants} initial="hidden" animate="visible">
 *   <Content />
 * </TransitionWrapper>
 */
const TransitionWrapper = ({
  children,
  variants = null,
  preset = 'fadeInUp',
  initial = 'hidden',
  animate = 'visible',
  exit = null,
  delay = 0,
  once = false,
  as = 'div',
  style = {},
  className = '',
  ...otherProps
}) => {
  const animConfig = useAnimationConfig()
  
  // Use provided variants or preset
  const animationVariants = variants || contentReveal[preset] || contentReveal.fadeInUp
  
  // Apply delay to variants if specified
  const variantsWithDelay = delay > 0 && animationVariants[animate] ? {
    ...animationVariants,
    [animate]: {
      ...animationVariants[animate],
      transition: {
        ...animationVariants[animate].transition,
        delay,
      },
    },
  } : animationVariants
  
  // Disable animations if user prefers reduced motion
  if (!animConfig.enabled) {
    const Component = as
    return (
      <Component style={style} className={className} {...otherProps}>
        {children}
      </Component>
    )
  }
  
  const MotionComponent = motion[as] || motion.div
  
  return (
    <MotionComponent
      variants={variantsWithDelay}
      initial={initial}
      animate={animate}
      exit={exit}
      viewport={{ once }}
      style={style}
      className={className}
      {...otherProps}
    >
      {children}
    </MotionComponent>
  )
}

TransitionWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  variants: PropTypes.object,
  preset: PropTypes.oneOf([
    'fadeInUp',
    'fadeInDown',
    'fadeInLeft',
    'fadeInRight',
    'scaleIn',
    'popIn',
  ]),
  initial: PropTypes.string,
  animate: PropTypes.string,
  exit: PropTypes.string,
  delay: PropTypes.number,
  once: PropTypes.bool,
  as: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
}

export default TransitionWrapper
