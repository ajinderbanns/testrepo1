/**
 * SectionReveal Component
 * 
 * Reveals sections with scroll-triggered animations using Framer Motion's
 * viewport detection. Ideal for landing pages and content-heavy pages.
 * 
 * @component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { contentReveal, staggerChildren } from './presets'
import { useAnimationConfig } from '../hooks/useAnimationConfig'

/**
 * SectionReveal
 * 
 * Animates content when it enters the viewport.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Section content
 * @param {string} props.preset - Animation preset ('fadeInUp', 'fadeInDown', etc.)
 * @param {Object} props.variants - Custom animation variants (overrides preset)
 * @param {number} props.delay - Animation delay in seconds
 * @param {boolean} props.once - Whether to animate only once
 * @param {number} props.threshold - Viewport intersection threshold (0-1)
 * @param {boolean} props.stagger - Whether to enable stagger for children
 * @param {string} props.staggerSpeed - Stagger speed ('fast', 'normal', 'dramatic')
 * @param {string} props.as - HTML element to render as
 * @param {Object} props.style - Additional inline styles
 * @param {string} props.className - CSS class name
 * 
 * @example
 * <SectionReveal preset="fadeInUp" once>
 *   <h2>Section Title</h2>
 *   <p>Section content...</p>
 * </SectionReveal>
 * 
 * @example
 * // With stagger for list items
 * <SectionReveal stagger staggerSpeed="fast">
 *   {items.map(item => (
 *     <motion.div key={item.id} variants={staggerChildren.item}>
 *       {item.content}
 *     </motion.div>
 *   ))}
 * </SectionReveal>
 */
const SectionReveal = ({
  children,
  preset = 'fadeInUp',
  variants = null,
  delay = 0,
  once = true,
  threshold = 0.1,
  stagger = false,
  staggerSpeed = 'normal',
  as = 'div',
  style = {},
  className = '',
  ...otherProps
}) => {
  const animConfig = useAnimationConfig()
  
  // Determine which variants to use
  let animationVariants
  if (variants) {
    animationVariants = variants
  } else if (stagger) {
    const staggerPreset = staggerSpeed === 'fast' 
      ? 'containerFast' 
      : staggerSpeed === 'dramatic'
      ? 'containerDramatic'
      : 'container'
    animationVariants = staggerChildren[staggerPreset]
  } else {
    animationVariants = contentReveal[preset] || contentReveal.fadeInUp
  }
  
  // Apply delay if specified and not using stagger
  const variantsWithDelay = !stagger && delay > 0 && animationVariants.visible ? {
    ...animationVariants,
    visible: {
      ...animationVariants.visible,
      transition: {
        ...animationVariants.visible.transition,
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
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      style={style}
      className={className}
      {...otherProps}
    >
      {children}
    </MotionComponent>
  )
}

SectionReveal.propTypes = {
  children: PropTypes.node.isRequired,
  preset: PropTypes.oneOf([
    'fadeInUp',
    'fadeInDown',
    'fadeInLeft',
    'fadeInRight',
    'scaleIn',
    'popIn',
  ]),
  variants: PropTypes.object,
  delay: PropTypes.number,
  once: PropTypes.bool,
  threshold: PropTypes.number,
  stagger: PropTypes.bool,
  staggerSpeed: PropTypes.oneOf(['fast', 'normal', 'dramatic']),
  as: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
}

export default SectionReveal
