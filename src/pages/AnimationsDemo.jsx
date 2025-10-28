/**
 * Animations Demo Page
 * 
 * Comprehensive showcase of all animation presets and visualization components.
 * Demonstrates the animation library and LLM visualizations with interactive examples.
 * 
 * @component
 */

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { useAnimationConfig } from '../hooks/useAnimationConfig'
import {
  TransitionWrapper,
  SectionReveal,
  pageTransitions,
  contentReveal,
  staggerChildren,
  hoverEffects,
  buttonInteractions,
  cardInteractions,
} from '../animations'
import {
  TokenFlow,
  AttentionHeatmap,
  EmbeddingSpace,
  NeuralNetworkViz,
  TextGeneration,
} from '../visualizations'

/**
 * Section component with consistent styling
 */
const Section = ({ title, children, style = {} }) => {
  const { theme } = useTheme()
  const animConfig = useAnimationConfig()
  
  return (
    <SectionReveal preset="fadeInUp" once>
      <section
        style={{
          marginBottom: theme.spacing.xxxl,
          padding: theme.spacing.xl,
          backgroundColor: animConfig.colors.backgroundSecondary,
          borderRadius: theme.radii.large,
          border: `1px solid ${animConfig.colors.border}`,
          ...style,
        }}
      >
        <h2
          style={{
            fontSize: theme.typography.size.heading2,
            fontWeight: theme.typography.weight.bold,
            color: animConfig.colors.text,
            marginBottom: theme.spacing.xl,
            textAlign: 'center',
          }}
        >
          {title}
        </h2>
        {children}
      </section>
    </SectionReveal>
  )
}

/**
 * Demo card component
 */
const DemoCard = ({ title, description, children }) => {
  const { theme } = useTheme()
  const animConfig = useAnimationConfig()
  
  return (
    <motion.div
      {...cardInteractions.subtle}
      style={{
        padding: theme.spacing.lg,
        backgroundColor: animConfig.colors.background,
        borderRadius: theme.radii.medium,
        border: `1px solid ${animConfig.colors.border}`,
        marginBottom: theme.spacing.lg,
      }}
    >
      <h3
        style={{
          fontSize: theme.typography.size.heading4,
          fontWeight: theme.typography.weight.semibold,
          color: animConfig.colors.text,
          marginBottom: theme.spacing.sm,
        }}
      >
        {title}
      </h3>
      {description && (
        <p
          style={{
            fontSize: theme.typography.size.bodySmall,
            color: animConfig.colors.textSecondary,
            marginBottom: theme.spacing.md,
          }}
        >
          {description}
        </p>
      )}
      {children}
    </motion.div>
  )
}

/**
 * AnimationsDemo Page Component
 */
const AnimationsDemo = () => {
  const { theme } = useTheme()
  const animConfig = useAnimationConfig()
  const [pageTransition, setPageTransition] = useState('fade')
  const [contentPreset, setContentPreset] = useState('fadeInUp')
  
  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: animConfig.colors.background,
    padding: `${theme.spacing.xxxl} ${theme.spacing.lg}`,
  }
  
  const headerStyle = {
    textAlign: 'center',
    marginBottom: theme.spacing.xxxl,
  }
  
  const titleStyle = {
    fontSize: theme.typography.size.heading1,
    fontWeight: theme.typography.weight.bold,
    color: animConfig.colors.text,
    marginBottom: theme.spacing.md,
  }
  
  const subtitleStyle = {
    fontSize: theme.typography.size.bodyLarge,
    color: animConfig.colors.textSecondary,
    maxWidth: '800px',
    margin: '0 auto',
  }
  
  const contentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
  }
  
  const buttonGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg,
  }
  
  const demoButtonStyle = (isActive) => ({
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    backgroundColor: isActive ? animConfig.colors.primary : animConfig.colors.surface,
    color: isActive ? '#FFFFFF' : animConfig.colors.text,
    border: `1px solid ${isActive ? animConfig.colors.primary : animConfig.colors.border}`,
    borderRadius: theme.radii.medium,
    fontSize: theme.typography.size.body,
    fontWeight: theme.typography.weight.semibold,
    cursor: 'pointer',
    transition: `all ${theme.transitions.duration.fast}`,
  })
  
  return (
    <div style={containerStyle}>
      <TransitionWrapper preset="fadeInDown">
        <header style={headerStyle}>
          <h1 style={titleStyle}>Animation Library & LLM Visualizations</h1>
          <p style={subtitleStyle}>
            Comprehensive showcase of animation presets, transition wrappers, and
            interactive LLM concept visualizations.
          </p>
        </header>
      </TransitionWrapper>
      
      <div style={contentStyle}>
        {/* LLM Visualizations Section */}
        <Section title="LLM Visualizations">
          <DemoCard
            title="Token Flow"
            description="Interactive visualization showing how text is broken into tokens"
          >
            <TokenFlow 
              initialText="Large Language Models process text as tokens."
              autoTokenize={false}
            />
          </DemoCard>
          
          <DemoCard
            title="Attention Heatmap"
            description="Matrix visualization showing attention weights between tokens"
          >
            <AttentionHeatmap 
              pattern="diagonal"
              cellSize={40}
            />
          </DemoCard>
          
          <DemoCard
            title="Embedding Space"
            description="2D visualization of word embeddings showing semantic relationships"
          >
            <EmbeddingSpace 
              width={600}
              height={400}
              showClusters={true}
            />
          </DemoCard>
          
          <DemoCard
            title="Neural Network"
            description="Animated neural network with layers, nodes, and activation flows"
          >
            <NeuralNetworkViz 
              width={700}
              height={400}
              layerSizes={[4, 6, 6, 3]}
              autoPlay={false}
            />
          </DemoCard>
          
          <DemoCard
            title="Text Generation"
            description="Token-by-token text generation with probability indicators"
          >
            <TextGeneration 
              autoPlay={false}
              showProbabilityIndicators={true}
              speed={1}
            />
          </DemoCard>
        </Section>
        
        {/* Page Transitions Section */}
        <Section title="Page Transitions">
          <DemoCard
            title="Transition Variants"
            description="Select a transition to preview"
          >
            <div style={buttonGridStyle}>
              {Object.keys(pageTransitions).map((key) => (
                <motion.button
                  key={key}
                  style={demoButtonStyle(pageTransition === key)}
                  onClick={() => setPageTransition(key)}
                  {...buttonInteractions.primary}
                >
                  {key}
                </motion.button>
              ))}
            </div>
            
            <motion.div
              key={pageTransition}
              variants={pageTransitions[pageTransition]}
              initial="initial"
              animate="animate"
              style={{
                marginTop: theme.spacing.xl,
                padding: theme.spacing.xl,
                backgroundColor: animConfig.colors.surfaceRaised,
                borderRadius: theme.radii.medium,
                textAlign: 'center',
              }}
            >
              <p style={{ color: animConfig.colors.text, fontSize: theme.typography.size.heading4 }}>
                {pageTransition} Transition
              </p>
            </motion.div>
          </DemoCard>
        </Section>
        
        {/* Content Reveal Section */}
        <Section title="Content Reveal Animations">
          <DemoCard
            title="Reveal Presets"
            description="Select a preset to preview"
          >
            <div style={buttonGridStyle}>
              {Object.keys(contentReveal).map((key) => (
                <motion.button
                  key={key}
                  style={demoButtonStyle(contentPreset === key)}
                  onClick={() => setContentPreset(key)}
                  {...buttonInteractions.secondary}
                >
                  {key}
                </motion.button>
              ))}
            </div>
            
            <motion.div
              key={contentPreset}
              variants={contentReveal[contentPreset]}
              initial="hidden"
              animate="visible"
              style={{
                marginTop: theme.spacing.xl,
                padding: theme.spacing.xl,
                backgroundColor: animConfig.colors.surfaceRaised,
                borderRadius: theme.radii.medium,
                textAlign: 'center',
              }}
            >
              <p style={{ color: animConfig.colors.text, fontSize: theme.typography.size.heading4 }}>
                {contentPreset}
              </p>
            </motion.div>
          </DemoCard>
        </Section>
        
        {/* Stagger Children Section */}
        <Section title="Stagger Animations">
          <DemoCard
            title="Staggered List"
            description="Items animate in sequence"
          >
            <motion.div
              variants={staggerChildren.container}
              initial="hidden"
              animate="visible"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: theme.spacing.md,
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <motion.div
                  key={item}
                  variants={staggerChildren.itemScale}
                  style={{
                    padding: theme.spacing.lg,
                    backgroundColor: animConfig.colors.surfaceRaised,
                    borderRadius: theme.radii.medium,
                    textAlign: 'center',
                    color: animConfig.colors.text,
                    fontSize: theme.typography.size.heading5,
                    fontWeight: theme.typography.weight.semibold,
                  }}
                >
                  Item {item}
                </motion.div>
              ))}
            </motion.div>
          </DemoCard>
        </Section>
        
        {/* Hover Effects Section */}
        <Section title="Hover & Interaction Effects">
          <DemoCard
            title="Hover Presets"
            description="Hover over elements to see effects"
          >
            <div style={buttonGridStyle}>
              <motion.div
                {...hoverEffects.lift}
                style={{
                  padding: theme.spacing.lg,
                  backgroundColor: animConfig.colors.primary,
                  borderRadius: theme.radii.medium,
                  textAlign: 'center',
                  color: '#FFFFFF',
                  fontWeight: theme.typography.weight.semibold,
                }}
              >
                Lift
              </motion.div>
              
              <motion.div
                {...hoverEffects.scale}
                style={{
                  padding: theme.spacing.lg,
                  backgroundColor: animConfig.colors.accent,
                  borderRadius: theme.radii.medium,
                  textAlign: 'center',
                  color: '#FFFFFF',
                  fontWeight: theme.typography.weight.semibold,
                }}
              >
                Scale
              </motion.div>
              
              <motion.div
                {...hoverEffects.bounce}
                style={{
                  padding: theme.spacing.lg,
                  backgroundColor: animConfig.colors.secondary,
                  borderRadius: theme.radii.medium,
                  textAlign: 'center',
                  color: '#FFFFFF',
                  fontWeight: theme.typography.weight.semibold,
                }}
              >
                Bounce
              </motion.div>
              
              <motion.div
                {...hoverEffects.shake}
                style={{
                  padding: theme.spacing.lg,
                  backgroundColor: animConfig.colors.success,
                  borderRadius: theme.radii.medium,
                  textAlign: 'center',
                  color: '#FFFFFF',
                  fontWeight: theme.typography.weight.semibold,
                }}
              >
                Shake
              </motion.div>
            </div>
          </DemoCard>
        </Section>
      </div>
    </div>
  )
}

export default AnimationsDemo
