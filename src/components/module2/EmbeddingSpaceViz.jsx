/**
 * EmbeddingSpaceViz Component
 * 
 * Wrapper for the EmbeddingSpace visualization component with Module 2 specific configuration.
 * Shows word embeddings in 2D space with semantic clustering.
 * 
 * @component
 */

import React from 'react'
import EmbeddingSpace from '../../visualizations/EmbeddingSpace'
import { interactiveExamples } from '../../data/module2Content'

function EmbeddingSpaceViz() {
  // Generate word data from our content clusters
  const generateWordData = () => {
    const words = []
    const clusters = interactiveExamples.embeddings.clusters
    
    clusters.forEach((cluster, clusterIndex) => {
      // Calculate cluster center position in a circle layout
      const angle = (clusterIndex / clusters.length) * Math.PI * 2
      const clusterRadius = 150
      const centerX = 300 + Math.cos(angle) * clusterRadius
      const centerY = 250 + Math.sin(angle) * clusterRadius
      
      // Position words around cluster center
      cluster.words.forEach((word, wordIndex) => {
        const wordAngle = (wordIndex / cluster.words.length) * Math.PI * 2
        const wordRadius = 40 + Math.random() * 20
        
        words.push({
          word,
          x: centerX + Math.cos(wordAngle) * wordRadius,
          y: centerY + Math.sin(wordAngle) * wordRadius,
          cluster: clusterIndex,
        })
      })
    })
    
    return words
  }

  const wordData = generateWordData()
  
  // Create cluster labels for the legend
  const clusterLabels = interactiveExamples.embeddings.clusters.map(c => c.name)

  return (
    <EmbeddingSpace
      words={wordData}
      width={600}
      height={500}
      clusterLabels={clusterLabels}
    />
  )
}

export default EmbeddingSpaceViz
