/**
 * Visualizations Module - Central Export
 * 
 * This module exports all visualization components for the application.
 * 
 * Available visualizations:
 * - TextGeneration: Interactive token-by-token text generation visualization
 * 
 * Usage:
 * ```jsx
 * import { TextGeneration } from '@/visualizations'
 * 
 * function MyComponent() {
 *   return <TextGeneration autoPlay={false} showProbabilityIndicators={true} />
 * }
 * ```
 * 
 * @module visualizations
 */

export { default as TextGeneration } from './TextGeneration.jsx'
export { textGenerationExamples } from './textGenerationExamples.js'

// Default export
export { default } from './TextGeneration.jsx'
