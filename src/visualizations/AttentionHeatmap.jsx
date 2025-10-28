/**
 * AttentionHeatmap Visualization Component
 * 
 * Interactive matrix visualization showing attention weights between tokens.
 * Demonstrates how transformer models attend to different parts of the input.
 * 
 * Features:
 * - Interactive heatmap matrix
 * - Hover to see attention scores
 * - Theme-aware gradient colors
 * - Smooth animations
 * - Responsive design
 * 
 * @component
 */

import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { useAnimationConfig } from '../hooks/useAnimationConfig'
import { lerpColor } from '../utils/animationHelpers'

/**
 * Generate sample attention weights
 * In production, this would come from a real model
 */
const generateAttentionWeights = (tokens, pattern = 'diagonal') => {
  const size = tokens.length
  const weights = []
  
  for (let i = 0; i < size; i++) {
    const row = []
    for (let j = 0; j < size; j++) {
      let weight
      
      switch (pattern) {
        case 'diagonal':
          // Strong attention to nearby tokens
          weight = Math.max(0, 1 - Math.abs(i - j) * 0.2)
          break
        case 'causal':
          // Can only attend to previous tokens
          weight = j <= i ? Math.random() * 0.5 + 0.3 : 0
          break
        case 'focused':
          // Strong attention to specific tokens
          if (j === Math.floor(size / 2) || i === j) {
            weight = 0.8 + Math.random() * 0.2
          } else {
            weight = Math.random() * 0.3
          }
          break
        default:
          weight = Math.random()
      }
      
      row.push(Math.min(1, Math.max(0, weight)))
    }
    weights.push(row)
  }
  
  return weights
}

/**
 * HeatmapCell Component
 */
const HeatmapCell = ({ 
  weight, 
  fromToken, 
  toToken, 
  onHover, 
  isHovered,
  cellSize,
  lowColor,
  highColor,
  theme,
}) => {
  const color = lerpColor(lowColor, highColor, weight)
  
  const cellStyle = {
    width: `${cellSize}px`,
    height: `${cellSize}px`,
    backgroundColor: color,
    border: isHovered 
      ? `2px solid ${highColor}` 
      : `1px solid rgba(255, 255, 255, 0.1)`,
    cursor: 'pointer',
    transition: `all ${theme.transitions.duration.fast}`,
  }
  
  return (
    <motion.div
      style={cellStyle}
      onMouseEnter={onHover}
      whileHover={{ scale: 1.2, zIndex: 10 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      title={`${fromToken} → ${toToken}: ${(weight * 100).toFixed(1)}%`}
    />
  )
}

HeatmapCell.propTypes = {
  weight: PropTypes.number.isRequired,
  fromToken: PropTypes.string.isRequired,
  toToken: PropTypes.string.isRequired,
  onHover: PropTypes.func.isRequired,
  isHovered: PropTypes.bool.isRequired,
  cellSize: PropTypes.number.isRequired,
  lowColor: PropTypes.string.isRequired,
  highColor: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
}

/**
 * AttentionHeatmap Component
 */
const AttentionHeatmap = ({
  tokens: propTokens = null,
  pattern = 'diagonal',
  cellSize = 40,
  showLabels = true,
}) => {
  const { theme } = useTheme()
  const animConfig = useAnimationConfig()
  
  const defaultTokens = ['The', 'cat', 'sat', 'on', 'the', 'mat']
  const tokens = propTokens || defaultTokens
  
  const [hoveredCell, setHoveredCell] = useState(null)
  const [selectedPattern, setSelectedPattern] = useState(pattern)
  
  const attentionWeights = useMemo(
    () => generateAttentionWeights(tokens, selectedPattern),
    [tokens, selectedPattern]
  )
  
  // Theme-aware colors
  const lowColor = animConfig.colors.backgroundSecondary
  const highColor = animConfig.colors.primary
  
  const containerStyle = {
    width: '100%',
    maxWidth: '900px',
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
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  }
  
  const controlsStyle = {
    display: 'flex',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
    flexWrap: 'wrap',
    justifyContent: 'center',
  }
  
  const buttonStyle = (isActive) => ({
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    backgroundColor: isActive ? animConfig.colors.primary : 'transparent',
    color: isActive ? '#FFFFFF' : animConfig.colors.text,
    border: `1px solid ${isActive ? animConfig.colors.primary : animConfig.colors.border}`,
    borderRadius: theme.radii.small,
    fontSize: theme.typography.size.bodySmall,
    fontWeight: theme.typography.weight.semibold,
    cursor: 'pointer',
    transition: `all ${theme.transitions.duration.fast}`,
  })
  
  const heatmapContainerStyle = {
    display: 'flex',
    gap: theme.spacing.md,
    overflowX: 'auto',
    padding: theme.spacing.md,
    backgroundColor: animConfig.colors.backgroundSecondary,
    borderRadius: theme.radii.medium,
  }
  
  const matrixStyle = {
    display: 'flex',
    flexDirection: 'column',
  }
  
  const rowStyle = {
    display: 'flex',
  }
  
  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: `${cellSize}px`,
    height: `${cellSize}px`,
    fontSize: theme.typography.size.caption,
    fontWeight: theme.typography.weight.semibold,
    color: animConfig.colors.textSecondary,
    fontFamily: theme.typography.family.mono,
  }
  
  const infoStyle = {
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: animConfig.colors.surfaceRaised,
    borderRadius: theme.radii.small,
    color: animConfig.colors.textSecondary,
    fontSize: theme.typography.size.bodySmall,
    textAlign: 'center',
  }
  
  const legendStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
  }
  
  const gradientStyle = {
    width: '200px',
    height: '20px',
    background: `linear-gradient(to right, ${lowColor}, ${highColor})`,
    borderRadius: theme.radii.small,
    border: `1px solid ${animConfig.colors.border}`,
  }
  
  return (
    <div style={containerStyle}>
      <div style={titleStyle}>Attention Heatmap</div>
      
      <div style={controlsStyle}>
        <motion.button
          style={buttonStyle(selectedPattern === 'diagonal')}
          onClick={() => setSelectedPattern('diagonal')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Local Attention
        </motion.button>
        
        <motion.button
          style={buttonStyle(selectedPattern === 'causal')}
          onClick={() => setSelectedPattern('causal')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Causal Attention
        </motion.button>
        
        <motion.button
          style={buttonStyle(selectedPattern === 'focused')}
          onClick={() => setSelectedPattern('focused')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Focused Attention
        </motion.button>
      </div>
      
      <div style={heatmapContainerStyle}>
        {showLabels && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ ...labelStyle, height: `${cellSize}px` }} />
            {tokens.map((token, i) => (
              <div key={i} style={labelStyle}>
                {token}
              </div>
            ))}
          </div>
        )}
        
        <div style={matrixStyle}>
          {showLabels && (
            <div style={rowStyle}>
              {tokens.map((token, j) => (
                <div key={j} style={labelStyle}>
                  {token}
                </div>
              ))}
            </div>
          )}
          
          {attentionWeights.map((row, i) => (
            <div key={i} style={rowStyle}>
              {row.map((weight, j) => (
                <HeatmapCell
                  key={`${i}-${j}`}
                  weight={weight}
                  fromToken={tokens[i]}
                  toToken={tokens[j]}
                  onHover={() => setHoveredCell({ i, j, weight })}
                  isHovered={hoveredCell?.i === i && hoveredCell?.j === j}
                  cellSize={cellSize}
                  lowColor={lowColor}
                  highColor={highColor}
                  theme={theme}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div style={legendStyle}>
        <span style={{ 
          color: animConfig.colors.textSecondary,
          fontSize: theme.typography.size.bodySmall,
        }}>
          Low
        </span>
        <div style={gradientStyle} />
        <span style={{ 
          color: animConfig.colors.textSecondary,
          fontSize: theme.typography.size.bodySmall,
        }}>
          High
        </span>
      </div>
      
      {hoveredCell && (
        <motion.div
          style={infoStyle}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <strong>{tokens[hoveredCell.i]}</strong> attending to{' '}
          <strong>{tokens[hoveredCell.j]}</strong> with weight{' '}
          <strong style={{ color: animConfig.colors.primary }}>
            {(hoveredCell.weight * 100).toFixed(1)}%
          </strong>
        </motion.div>
      )}
    </div>
  )
}

AttentionHeatmap.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.string),
  pattern: PropTypes.oneOf(['diagonal', 'causal', 'focused']),
  cellSize: PropTypes.number,
  showLabels: PropTypes.bool,
}

export default AttentionHeatmap
