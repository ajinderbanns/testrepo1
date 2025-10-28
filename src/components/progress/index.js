/**
 * Progress Visualization Components - Barrel Export
 * 
 * Specialized components for visualizing module progress and achievements.
 * All components feature Framer Motion animations, theme integration,
 * and accessibility support.
 * 
 * Components:
 * - ProgressBar: Linear progress bar with animated fill and number counting
 * - CircularProgress: Ring-style progress indicator with SVG animations
 * - ModuleStatus: Status badge with 3 states (completed/in-progress/locked)
 * - MilestoneAnimation: Celebration component for achievements
 * 
 * Usage:
 * ```js
 * import { ProgressBar, CircularProgress, ModuleStatus, MilestoneAnimation } from '@/components/progress'
 * ```
 * 
 * Or import individually:
 * ```js
 * import ProgressBar from '@/components/progress/ProgressBar'
 * ```
 * 
 * @module components/progress
 */

// Component exports
export { default as ProgressBar } from './ProgressBar.jsx'
export { default as CircularProgress } from './CircularProgress.jsx'
export { default as ModuleStatus } from './ModuleStatus.jsx'
export { default as MilestoneAnimation } from './MilestoneAnimation.jsx'
export { default as ProgressDemo } from './ProgressDemo.jsx'
