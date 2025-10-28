/**
 * NeuralNetworkViz Component
 * 
 * Animated neural network visualization showing layers, nodes, connections,
 * and activation flows. Uses Canvas for 60fps performance.
 * 
 * Features:
 * - Multi-layer neural network rendering
 * - Animated activation flow (signals traveling through network)
 * - Interactive node highlighting
 * - Connection weight visualization
 * - Theme-aware colors
 * - Smooth 60fps animations
 * - Responsive design
 * 
 * @component
 */

import React, { useRef, useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { useAnimationConfig } from '../hooks/useAnimationConfig'
import { createRAF, lerp } from '../utils/animationHelpers'

/**
 * Generate network structure
 */
const createNetwork = (layerSizes) => {
  const layers = []
  
  layerSizes.forEach((size, layerIndex) => {
    const nodes = []
    for (let i = 0; i < size; i++) {
      nodes.push({
        id: `${layerIndex}-${i}`,
        layer: layerIndex,
        index: i,
        activation: 0,
        targetActivation: 0,
      })
    }
    layers.push(nodes)
  })
  
  // Generate connections
  const connections = []
  for (let l = 0; l < layers.length - 1; l++) {
    const currentLayer = layers[l]
    const nextLayer = layers[l + 1]
    
    currentLayer.forEach(fromNode => {
      nextLayer.forEach(toNode => {
        connections.push({
          from: fromNode.id,
          to: toNode.id,
          weight: (Math.random() - 0.5) * 2, // Random weight -1 to 1
          signal: 0,
        })
      })
    })
  }
  
  return { layers, connections }
}

/**
 * Particle class for activation signals
 */
class ActivationParticle {
  constructor(fromX, fromY, toX, toY, color) {
    this.fromX = fromX
    this.fromY = fromY
    this.toX = toX
    this.toY = toY
    this.progress = 0
    this.speed = 0.02 + Math.random() * 0.02
    this.color = color
    this.active = true
  }
  
  update() {
    this.progress += this.speed
    if (this.progress >= 1) {
      this.active = false
    }
  }
  
  draw(ctx) {
    if (!this.active) return
    
    const x = lerp(this.fromX, this.toX, this.progress)
    const y = lerp(this.fromY, this.toY, this.progress)
    
    const opacity = Math.sin(this.progress * Math.PI)
    
    ctx.beginPath()
    ctx.arc(x, y, 3, 0, Math.PI * 2)
    ctx.fillStyle = this.color + Math.floor(opacity * 255).toString(16).padStart(2, '0')
    ctx.fill()
    
    // Trail effect
    const trailLength = 10
    for (let i = 1; i <= trailLength; i++) {
      const trailProgress = Math.max(0, this.progress - i * 0.02)
      const tx = lerp(this.fromX, this.toX, trailProgress)
      const ty = lerp(this.fromY, this.toY, trailProgress)
      const trailOpacity = opacity * (1 - i / trailLength)
      
      ctx.beginPath()
      ctx.arc(tx, ty, 2, 0, Math.PI * 2)
      ctx.fillStyle = this.color + Math.floor(trailOpacity * 255).toString(16).padStart(2, '0')
      ctx.fill()
    }
  }
}

/**
 * NeuralNetworkViz Component
 */
const NeuralNetworkViz = ({
  width = 700,
  height = 500,
  layerSizes = [4, 6, 6, 3],
  autoPlay = true,
  speed = 1,
}) => {
  const canvasRef = useRef(null)
  const { theme } = useTheme()
  const animConfig = useAnimationConfig()
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [hoveredNode, setHoveredNode] = useState(null)
  const animationRef = useRef(null)
  
  // Network state
  const networkRef = useRef(createNetwork(layerSizes))
  const particlesRef = useRef([])
  const lastActivationTime = useRef(0)
  
  // Calculate node positions
  const calculatePositions = useCallback((canvas) => {
    const { layers } = networkRef.current
    const padding = 80
    const usableWidth = canvas.width - padding * 2
    const usableHeight = canvas.height - padding * 2
    
    const positions = {}
    
    layers.forEach((layer, layerIndex) => {
      const x = padding + (layerIndex / (layers.length - 1)) * usableWidth
      const layerHeight = usableHeight
      const nodeSpacing = layerHeight / (layer.length + 1)
      
      layer.forEach((node, nodeIndex) => {
        const y = padding + nodeSpacing * (nodeIndex + 1)
        positions[node.id] = { x, y }
      })
    })
    
    return positions
  }, [])
  
  // Trigger forward pass
  const triggerActivation = useCallback((positions) => {
    const { layers } = networkRef.current
    
    // Reset all activations
    layers.forEach(layer => {
      layer.forEach(node => {
        node.activation = 0
        node.targetActivation = 0
      })
    })
    
    // Activate input layer
    layers[0].forEach(node => {
      node.targetActivation = Math.random() * 0.5 + 0.5
    })
    
    // Propagate through network
    setTimeout(() => {
      for (let l = 0; l < layers.length - 1; l++) {
        const currentLayer = layers[l]
        const nextLayer = layers[l + 1]
        
        setTimeout(() => {
          nextLayer.forEach(toNode => {
            let sum = 0
            currentLayer.forEach(fromNode => {
              sum += fromNode.targetActivation * (Math.random() * 0.5 + 0.5)
            })
            toNode.targetActivation = Math.min(1, sum / currentLayer.length)
          })
          
          // Create particles
          currentLayer.forEach(fromNode => {
            const fromPos = positions[fromNode.id]
            nextLayer.forEach(toNode => {
              const toPos = positions[toNode.id]
              if (fromNode.targetActivation > 0.2) {
                particlesRef.current.push(
                  new ActivationParticle(
                    fromPos.x,
                    fromPos.y,
                    toPos.x,
                    toPos.y,
                    animConfig.colors.accent
                  )
                )
              }
            })
          })
        }, l * 300 / speed)
      }
    }, 100)
  }, [animConfig.colors.accent, speed])
  
  // Draw function
  const draw = useCallback((deltaTime) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    const { layers, connections } = networkRef.current
    
    // Clear canvas
    ctx.fillStyle = animConfig.colors.background
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    const positions = calculatePositions(canvas)
    
    // Draw connections
    ctx.lineWidth = 1
    connections.forEach(conn => {
      const fromPos = positions[conn.from]
      const toPos = positions[conn.to]
      
      if (!fromPos || !toPos) return
      
      const opacity = Math.abs(conn.weight) * 0.3
      const color = conn.weight > 0 
        ? animConfig.colors.primary 
        : animConfig.colors.error
      
      ctx.beginPath()
      ctx.moveTo(fromPos.x, fromPos.y)
      ctx.lineTo(toPos.x, toPos.y)
      ctx.strokeStyle = color + Math.floor(opacity * 255).toString(16).padStart(2, '0')
      ctx.stroke()
    })
    
    // Update and draw particles
    particlesRef.current = particlesRef.current.filter(particle => {
      particle.update()
      particle.draw(ctx)
      return particle.active
    })
    
    // Draw nodes
    layers.forEach((layer, layerIndex) => {
      layer.forEach(node => {
        const pos = positions[node.id]
        if (!pos) return
        
        // Smooth activation
        node.activation = lerp(node.activation, node.targetActivation, 0.1)
        
        const isHovered = hoveredNode === node.id
        const radius = isHovered ? 12 : 10
        
        // Node glow based on activation
        if (node.activation > 0.1) {
          ctx.beginPath()
          ctx.arc(pos.x, pos.y, radius + 5, 0, Math.PI * 2)
          ctx.fillStyle = animConfig.colors.primary + 
            Math.floor(node.activation * 50).toString(16).padStart(2, '0')
          ctx.fill()
        }
        
        // Node circle
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2)
        
        // Color based on activation
        const nodeColor = node.activation > 0.5 
          ? animConfig.colors.accent 
          : node.activation > 0.2
          ? animConfig.colors.primary
          : animConfig.colors.surface
        
        ctx.fillStyle = nodeColor
        ctx.fill()
        
        ctx.strokeStyle = animConfig.colors.border
        ctx.lineWidth = 2
        ctx.stroke()
      })
    })
    
    // Draw layer labels
    ctx.font = `12px ${theme.typography.family.primary}`
    ctx.fillStyle = animConfig.colors.textSecondary
    ctx.textAlign = 'center'
    
    const layerNames = ['Input', ...Array(layers.length - 2).fill('Hidden'), 'Output']
    layers.forEach((layer, layerIndex) => {
      const x = positions[layer[0].id].x
      ctx.fillText(layerNames[layerIndex], x, 30)
      ctx.fillText(`(${layer.length})`, x, 45)
    })
    
    // Auto-play
    if (isPlaying) {
      const now = Date.now()
      if (now - lastActivationTime.current > 3000 / speed) {
        triggerActivation(positions)
        lastActivationTime.current = now
      }
    }
  }, [animConfig, theme, hoveredNode, isPlaying, calculatePositions, triggerActivation, speed])
  
  // Handle mouse move
  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const positions = calculatePositions(canvas)
    const { layers } = networkRef.current
    
    let foundNode = null
    layers.forEach(layer => {
      layer.forEach(node => {
        const pos = positions[node.id]
        if (!pos) return
        
        const dx = x - pos.x
        const dy = y - pos.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 15) {
          foundNode = node.id
        }
      })
    })
    
    setHoveredNode(foundNode)
  }, [calculatePositions])
  
  // Setup canvas and animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    canvas.width = width
    canvas.height = height
    
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
  
  const controlsStyle = {
    marginTop: theme.spacing.md,
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  }
  
  const buttonStyle = {
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    backgroundColor: animConfig.colors.primary,
    color: '#FFFFFF',
    border: 'none',
    borderRadius: theme.radii.medium,
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.semibold,
    cursor: 'pointer',
  }
  
  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'transparent',
    color: animConfig.colors.text,
    border: `1px solid ${animConfig.colors.border}`,
  }
  
  return (
    <div style={containerStyle}>
      <div style={titleStyle}>Neural Network Visualization</div>
      
      <div style={canvasContainerStyle}>
        <canvas
          ref={canvasRef}
          style={{ display: 'block', width: '100%', height: 'auto', cursor: 'pointer' }}
          onMouseMove={handleMouseMove}
        />
      </div>
      
      <div style={controlsStyle}>
        <motion.button
          style={buttonStyle}
          onClick={() => {
            const positions = calculatePositions(canvasRef.current)
            triggerActivation(positions)
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Trigger Activation
        </motion.button>
        
        <motion.button
          style={secondaryButtonStyle}
          onClick={() => setIsPlaying(!isPlaying)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? 'Pause' : 'Play'} Auto
        </motion.button>
      </div>
    </div>
  )
}

NeuralNetworkViz.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  layerSizes: PropTypes.arrayOf(PropTypes.number),
  autoPlay: PropTypes.bool,
  speed: PropTypes.number,
}

export default NeuralNetworkViz
