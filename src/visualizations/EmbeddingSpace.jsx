/**
 * EmbeddingSpace Visualization Component
 * 
 * 2D visualization of word embeddings showing semantic relationships.
 * Uses Canvas for performance with clustering and similarity visualization.
 * 
 * Features:
 * - Interactive 2D scatter plot
 * - Word labels with hover effects
 * - Semantic clustering visualization
 * - Theme-aware colors
 * - Smooth animations
 * - Touch/mouse interactions
 * 
 * @component
 */

import React, { useRef, useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { useAnimationConfig } from '../hooks/useAnimationConfig'
import { createRAF, lerp, clamp } from '../utils/animationHelpers'

/**
 * Sample word embeddings (simplified 2D projection)
 * In production, these would be real embeddings projected to 2D via t-SNE/UMAP
 */
const sampleEmbeddings = {
  animals: [
    { word: 'dog', x: 0.2, y: 0.3, cluster: 'animals' },
    { word: 'cat', x: 0.25, y: 0.35, cluster: 'animals' },
    { word: 'bird', x: 0.15, y: 0.25, cluster: 'animals' },
    { word: 'fish', x: 0.3, y: 0.2, cluster: 'animals' },
  ],
  food: [
    { word: 'pizza', x: 0.7, y: 0.7, cluster: 'food' },
    { word: 'burger', x: 0.75, y: 0.65, cluster: 'food' },
    { word: 'pasta', x: 0.65, y: 0.75, cluster: 'food' },
    { word: 'salad', x: 0.8, y: 0.7, cluster: 'food' },
  ],
  tech: [
    { word: 'computer', x: 0.8, y: 0.2, cluster: 'tech' },
    { word: 'phone', x: 0.85, y: 0.25, cluster: 'tech' },
    { word: 'tablet', x: 0.75, y: 0.15, cluster: 'tech' },
    { word: 'laptop', x: 0.9, y: 0.2, cluster: 'tech' },
  ],
  emotions: [
    { word: 'happy', x: 0.3, y: 0.8, cluster: 'emotions' },
    { word: 'sad', x: 0.2, y: 0.85, cluster: 'emotions' },
    { word: 'angry', x: 0.35, y: 0.75, cluster: 'emotions' },
    { word: 'excited', x: 0.25, y: 0.9, cluster: 'emotions' },
  ],
}

const allEmbeddings = Object.values(sampleEmbeddings).flat()

/**
 * EmbeddingSpace Component
 */
const EmbeddingSpace = ({
  width = 600,
  height = 500,
  embeddings = allEmbeddings,
  showClusters = true,
  interactive = true,
}) => {
  const canvasRef = useRef(null)
  const { theme } = useTheme()
  const animConfig = useAnimationConfig()
  const [hoveredWord, setHoveredWord] = useState(null)
  const [selectedWord, setSelectedWord] = useState(null)
  const animationRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })
  
  // Animation state
  const animState = useRef({
    points: embeddings.map(e => ({
      ...e,
      currentX: e.x,
      currentY: e.y,
      targetX: e.x,
      targetY: e.y,
      scale: 1,
      opacity: 1,
    })),
    time: 0,
  })
  
  // Cluster colors based on theme
  const clusterColors = {
    animals: animConfig.colors.primary,
    food: animConfig.colors.accent,
    tech: animConfig.colors.secondary,
    emotions: animConfig.colors.success,
  }
  
  // Draw function
  const draw = useCallback((deltaTime) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    const { width, height } = canvas
    
    // Clear canvas
    ctx.fillStyle = animConfig.colors.background
    ctx.fillRect(0, 0, width, height)
    
    animState.current.time += deltaTime
    
    // Update and draw points
    animState.current.points.forEach((point, i) => {
      // Smooth interpolation
      point.currentX = lerp(point.currentX, point.targetX, 0.1)
      point.currentY = lerp(point.currentY, point.targetY, 0.1)
      
      // Convert normalized coords to canvas coords
      const px = point.currentX * width
      const py = point.currentY * height
      
      // Determine if hovered
      const isHovered = hoveredWord === point.word
      const isSelected = selectedWord === point.word
      
      // Draw cluster background if enabled
      if (showClusters && !isSelected) {
        const clusterRadius = isHovered ? 35 : 30
        ctx.beginPath()
        ctx.arc(px, py, clusterRadius, 0, Math.PI * 2)
        ctx.fillStyle = clusterColors[point.cluster] + '20'
        ctx.fill()
      }
      
      // Draw point
      const radius = isHovered || isSelected ? 8 : 5
      ctx.beginPath()
      ctx.arc(px, py, radius, 0, Math.PI * 2)
      ctx.fillStyle = clusterColors[point.cluster] || animConfig.colors.text
      ctx.fill()
      
      // Draw word label
      ctx.font = `${isHovered || isSelected ? 'bold ' : ''}14px ${theme.typography.family.primary}`
      ctx.fillStyle = animConfig.colors.text
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      ctx.fillText(point.word, px, py + radius + 5)
      
      // Draw connection lines to selected word
      if (selectedWord && selectedWord !== point.word) {
        const selectedPoint = animState.current.points.find(p => p.word === selectedWord)
        if (selectedPoint) {
          const spx = selectedPoint.currentX * width
          const spy = selectedPoint.currentY * height
          
          // Calculate distance
          const dx = px - spx
          const dy = py - spy
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = Math.sqrt(width * width + height * height)
          const similarity = 1 - (distance / maxDistance)
          
          if (similarity > 0.3) {
            ctx.beginPath()
            ctx.moveTo(spx, spy)
            ctx.lineTo(px, py)
            ctx.strokeStyle = animConfig.colors.primary + Math.floor(similarity * 100).toString(16).padStart(2, '0')
            ctx.lineWidth = similarity * 3
            ctx.stroke()
          }
        }
      }
    })
    
    // Draw legend if clusters shown
    if (showClusters) {
      const clusters = [...new Set(embeddings.map(e => e.cluster))]
      let legendY = 20
      
      clusters.forEach(cluster => {
        ctx.fillStyle = clusterColors[cluster]
        ctx.fillRect(20, legendY, 15, 15)
        
        ctx.font = `12px ${theme.typography.family.primary}`
        ctx.fillStyle = animConfig.colors.text
        ctx.textAlign = 'left'
        ctx.textBaseline = 'top'
        ctx.fillText(cluster, 45, legendY)
        
        legendY += 25
      })
    }
  }, [animConfig, theme, hoveredWord, selectedWord, showClusters, embeddings, clusterColors])
  
  // Handle mouse move
  const handleMouseMove = useCallback((e) => {
    if (!interactive) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width)
    const y = ((e.clientY - rect.top) / rect.height)
    
    mousePos.current = { x, y }
    
    // Check if hovering over a point
    let foundWord = null
    const threshold = 0.04 // Hover threshold
    
    for (const point of animState.current.points) {
      const dx = x - point.currentX
      const dy = y - point.currentY
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < threshold) {
        foundWord = point.word
        break
      }
    }
    
    setHoveredWord(foundWord)
  }, [interactive])
  
  // Handle click
  const handleClick = useCallback(() => {
    if (!interactive) return
    if (hoveredWord) {
      setSelectedWord(hoveredWord === selectedWord ? null : hoveredWord)
    }
  }, [interactive, hoveredWord, selectedWord])
  
  // Setup canvas and animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    // Set canvas size
    canvas.width = width
    canvas.height = height
    
    // Start animation loop
    const fps = animConfig.targetFPS
    animationRef.current = createRAF(draw, fps)
    animationRef.current.start()
    
    return () => {
      if (animationRef.current) {
        animationRef.current.stop()
      }
    }
  }, [width, height, draw, animConfig.targetFPS])
  
  const containerStyle = {
    width: '100%',
    maxWidth: `${width}px`,
    margin: '0 auto',
    padding: theme.spacing.lg,
    backgroundColor: animConfig.colors.background,
    borderRadius: theme.radii.large,
    border: `1px solid ${animConfig.colors.border}`,
  }
  
  const titleStyle = {
    fontSize: theme.typography.size.heading4,
    fontWeight: theme.typography.weight.bold,
    color: animConfig.colors.text,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  }
  
  const canvasContainerStyle = {
    position: 'relative',
    width: '100%',
    backgroundColor: animConfig.colors.backgroundSecondary,
    borderRadius: theme.radii.medium,
    overflow: 'hidden',
    border: `1px solid ${animConfig.colors.border}`,
  }
  
  const infoStyle = {
    marginTop: theme.spacing.md,
    padding: theme.spacing.sm,
    backgroundColor: animConfig.colors.surfaceRaised,
    borderRadius: theme.radii.small,
    color: animConfig.colors.textSecondary,
    fontSize: theme.typography.size.bodySmall,
    textAlign: 'center',
  }
  
  return (
    <div style={containerStyle}>
      <div style={titleStyle}>Word Embedding Space</div>
      
      <div style={canvasContainerStyle}>
        <canvas
          ref={canvasRef}
          style={{ display: 'block', width: '100%', height: 'auto', cursor: interactive ? 'pointer' : 'default' }}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        />
      </div>
      
      <motion.div
        style={infoStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {selectedWord ? (
          <>
            Selected: <strong style={{ color: animConfig.colors.primary }}>{selectedWord}</strong>
            {' • '}Lines show semantic similarity
          </>
        ) : (
          <>
            {hoveredWord ? (
              <>Hovering: <strong>{hoveredWord}</strong> • Click to see connections</>
            ) : (
              'Hover over words to explore • Click to see semantic connections'
            )}
          </>
        )}
      </motion.div>
    </div>
  )
}

EmbeddingSpace.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  embeddings: PropTypes.arrayOf(PropTypes.shape({
    word: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    cluster: PropTypes.string.isRequired,
  })),
  showClusters: PropTypes.bool,
  interactive: PropTypes.bool,
}

export default EmbeddingSpace
