/**
 * Animations Module - Central Export
 * 
 * This module exports all animation presets, utilities, and wrapper components
 * for consistent, cinematic animations across the application.
 * 
 * Components:
 * - TransitionWrapper: Flexible wrapper for applying motion animations
 * - PageTransition: Route change transitions
 * - SectionReveal: Scroll-triggered section animations
 * 
 * Presets:
 * - pageTransitions: Route/page transition variants
 * - contentReveal: Content reveal animations
 * - staggerChildren: Stagger container and item variants
 * - hoverEffects: Micro-interactions for hover states
 * - buttonInteractions: Button-specific animations
 * - cardInteractions: Card hover/click animations
 * - modalAnimations: Modal/dialog animations
 * - notificationAnimations: Toast/notification animations
 * - loadingAnimations: Loading indicator animations
 * - textAnimations: Text reveal animations
 * 
 * Usage:
 * ```jsx
 * import { 
 *   TransitionWrapper, 
 *   PageTransition, 
 *   SectionReveal,
 *   pageTransitions,
 *   contentReveal,
 *   hoverEffects
 * } from '@/animations'
 * 
 * // Use wrapper components
 * <TransitionWrapper preset="fadeInUp" delay={0.2}>
 *   <Content />
 * </TransitionWrapper>
 * 
 * // Use with custom motion components
 * <motion.div variants={contentReveal.fadeInUp} initial="hidden" animate="visible">
 *   <Content />
 * </motion.div>
 * ```
 * 
 * @module animations
 */

// Wrapper components
export { default as TransitionWrapper } from './TransitionWrapper.jsx'
export { default as PageTransition } from './PageTransition.jsx'
export { default as SectionReveal } from './SectionReveal.jsx'

// Animation presets
export {
  pageTransitions,
  contentReveal,
  staggerChildren,
  hoverEffects,
  buttonInteractions,
  cardInteractions,
  modalAnimations,
  notificationAnimations,
  loadingAnimations,
  textAnimations,
} from './presets.js'

// Re-export default presets
export { default as presets } from './presets.js'
