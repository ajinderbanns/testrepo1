/**
 * Visualizations Module - Central Export
 * 
 * This module exports all visualization components for the application.
 * 
 * Available visualizations:
 * - TextGeneration: Interactive token-by-token text generation visualization
 * - TokenFlow: Text-to-token transformation animation
 * - AttentionHeatmap: Attention mechanism matrix visualization
 * - EmbeddingSpace: 2D word embedding visualization with clustering
 * - NeuralNetworkViz: Animated neural network with activation flows
 * 
 * Usage:
 * ```jsx
 * import { 
 *   TextGeneration, 
 *   TokenFlow, 
 *   AttentionHeatmap, 
 *   EmbeddingSpace, 
 *   NeuralNetworkViz 
 * } from '@/visualizations'
 * 
 * function MyComponent() {
 *   return (
 *     <>
 *       <TextGeneration autoPlay={false} />
 *       <TokenFlow initialText="Hello world" />
 *       <AttentionHeatmap pattern="diagonal" />
 *       <EmbeddingSpace showClusters={true} />
 *       <NeuralNetworkViz autoPlay={true} />
 *     </>
 *   )
 * }
 * ```
 * 
 * @module visualizations
 */

// Text generation visualizations
export { default as TextGeneration } from './TextGeneration.jsx'
export { textGenerationExamples } from './textGenerationExamples.js'

// LLM concept visualizations
export { default as TokenFlow } from './TokenFlow.jsx'
export { default as AttentionHeatmap } from './AttentionHeatmap.jsx'
export { default as EmbeddingSpace } from './EmbeddingSpace.jsx'
export { default as NeuralNetworkViz } from './NeuralNetworkViz.jsx'

// Default export
export { default } from './TextGeneration.jsx'
