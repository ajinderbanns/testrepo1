/**
 * Data Module - Central Export
 * 
 * Exports all data structures including module content, types, and helper functions.
 * 
 * @module data
 */

export * from './types.js'
export { default as module1Content, module1Content } from './modules/module1.js'
export * from './module1Structure.js'
export * from './module1Examples.js'
export { 
  default as walkthroughSteps,
  walkthroughSteps,
  getTotalSteps,
  getStepById,
  getStepByIndex,
  isFirstStep,
  isLastStep,
} from './walkthroughContent.js'
