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
export * from './module2Structure.js'
export * from './module2Content.js'
export * from './module3Structure.js'
export * from './module3Content.js'
export { 
  default as walkthroughSteps,
  walkthroughSteps,
  getTotalSteps,
  getStepById,
  getStepByIndex,
  isFirstStep,
  isLastStep,
} from './walkthroughContent.js'
