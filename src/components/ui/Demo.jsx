import React, { useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import Button from './Button'
import Card from './Card'
import Input from './Input'
import Modal from './Modal'
import Tooltip from './Tooltip'
import ProgressBar from './ProgressBar'
import Badge from './Badge'

/**
 * UI Component Demo Page
 * 
 * Demonstrates all UI components in both male and female themes.
 * Use this page to test components and see them in action.
 * 
 * To use: Import this component and render it in your app
 * Example: <UIDemo />
 */
function UIDemo() {
  const { theme, themeName, switchTheme } = useTheme()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [inputError, setInputError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(65)

  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)
    
    // Simple validation
    if (value && value.length < 3) {
      setInputError('Must be at least 3 characters')
    } else {
      setInputError('')
    }
  }

  const simulateLoading = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  const containerStyle = {
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background.primary,
    minHeight: '100vh',
    color: theme.colors.text.primary,
    fontFamily: theme.typography.family.primary,
  }

  const sectionStyle = {
    marginBottom: theme.spacing.xxl,
  }

  const titleStyle = {
    fontSize: theme.typography.size.heading2,
    fontWeight: theme.typography.weight.bold,
    marginBottom: theme.spacing.lg,
    color: theme.colors.text.primary,
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  }

  const flexStyle = {
    display: 'flex',
    gap: theme.spacing.md,
    flexWrap: 'wrap',
    alignItems: 'center',
  }

  return (
    <div style={containerStyle}>
      {/* Theme Switcher */}
      <div style={{ ...sectionStyle, textAlign: 'center' }}>
        <h1 style={{ fontSize: theme.typography.size.heading1, marginBottom: theme.spacing.md }}>
          UI Component Library Demo
        </h1>
        <p style={{ color: theme.colors.text.secondary, marginBottom: theme.spacing.lg }}>
          Current Theme: <strong>{themeName}</strong>
        </p>
        <div style={flexStyle} style={{ justifyContent: 'center' }}>
          <Button
            variant="primary"
            onClick={() => switchTheme('male')}
            disabled={themeName === 'male'}
          >
            Male Theme (Euphoria)
          </Button>
          <Button
            variant="primary"
            onClick={() => switchTheme('female')}
            disabled={themeName === 'female'}
          >
            Female Theme (Summer)
          </Button>
        </div>
      </div>

      {/* Buttons */}
      <section style={sectionStyle}>
        <h2 style={titleStyle}>Buttons</h2>
        
        <div style={{ marginBottom: theme.spacing.lg }}>
          <h3 style={{ marginBottom: theme.spacing.md, color: theme.colors.text.secondary }}>Variants</h3>
          <div style={flexStyle}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
          </div>
        </div>

        <div style={{ marginBottom: theme.spacing.lg }}>
          <h3 style={{ marginBottom: theme.spacing.md, color: theme.colors.text.secondary }}>Sizes</h3>
          <div style={flexStyle}>
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
          </div>
        </div>

        <div style={{ marginBottom: theme.spacing.lg }}>
          <h3 style={{ marginBottom: theme.spacing.md, color: theme.colors.text.secondary }}>States</h3>
          <div style={flexStyle}>
            <Button loading={isLoading} onClick={simulateLoading}>
              {isLoading ? 'Loading...' : 'Click to Load'}
            </Button>
            <Button disabled>Disabled</Button>
            <Button fullWidth>Full Width</Button>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section style={sectionStyle}>
        <h2 style={titleStyle}>Cards</h2>
        <div style={gridStyle}>
          <Card>
            <h3 style={{ marginBottom: theme.spacing.sm }}>Basic Card</h3>
            <p style={{ color: theme.colors.text.secondary }}>
              This is a simple card with default styling.
            </p>
          </Card>

          <Card
            header={<strong>Card with Header</strong>}
            footer={<Button size="small">Action</Button>}
            elevated
          >
            <p style={{ color: theme.colors.text.secondary }}>
              Elevated card with header and footer sections.
            </p>
          </Card>

          <Card hoverable onClick={() => alert('Card clicked!')}>
            <h3 style={{ marginBottom: theme.spacing.sm }}>Interactive Card</h3>
            <p style={{ color: theme.colors.text.secondary }}>
              Click me! I have hover effects and am clickable.
            </p>
          </Card>
        </div>
      </section>

      {/* Inputs */}
      <section style={sectionStyle}>
        <h2 style={titleStyle}>Inputs</h2>
        <div style={{ maxWidth: '600px' }}>
          <Input
            label="Name"
            placeholder="Enter your name"
            value={inputValue}
            onChange={handleInputChange}
            error={inputError}
            helperText="Enter at least 3 characters"
            fullWidth
            style={{ marginBottom: theme.spacing.lg }}
          />
          
          <Input
            label="Email"
            type="email"
            placeholder="email@example.com"
            required
            fullWidth
            style={{ marginBottom: theme.spacing.lg }}
          />
          
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            disabled
            fullWidth
          />
        </div>
      </section>

      {/* Modal */}
      <section style={sectionStyle}>
        <h2 style={titleStyle}>Modal</h2>
        <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
        
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Example Modal"
          size="medium"
        >
          <p style={{ marginBottom: theme.spacing.lg }}>
            This is a modal with backdrop blur and smooth animations.
          </p>
          <div style={flexStyle}>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              Confirm
            </Button>
            <Button variant="tertiary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </Modal>
      </section>

      {/* Tooltips */}
      <section style={sectionStyle}>
        <h2 style={titleStyle}>Tooltips</h2>
        <div style={flexStyle}>
          <Tooltip content="Top tooltip" position="top">
            <Button>Hover Top</Button>
          </Tooltip>
          <Tooltip content="Bottom tooltip" position="bottom">
            <Button>Hover Bottom</Button>
          </Tooltip>
          <Tooltip content="Left tooltip" position="left">
            <Button>Hover Left</Button>
          </Tooltip>
          <Tooltip content="Right tooltip" position="right">
            <Button>Hover Right</Button>
          </Tooltip>
        </div>
      </section>

      {/* Progress Bars */}
      <section style={sectionStyle}>
        <h2 style={titleStyle}>Progress Bars</h2>
        
        <div style={{ marginBottom: theme.spacing.xl }}>
          <h3 style={{ marginBottom: theme.spacing.md, color: theme.colors.text.secondary }}>Linear</h3>
          <ProgressBar value={progress} showLabel style={{ marginBottom: theme.spacing.md }} />
          <ProgressBar value={progress} size="small" color="success" style={{ marginBottom: theme.spacing.md }} />
          <ProgressBar value={progress} size="large" color="warning" />
          <div style={{ marginTop: theme.spacing.md }}>
            <Button size="small" onClick={() => setProgress(Math.min(progress + 10, 100))}>+10%</Button>
            {' '}
            <Button size="small" onClick={() => setProgress(Math.max(progress - 10, 0))}>-10%</Button>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: theme.spacing.md, color: theme.colors.text.secondary }}>Circular</h3>
          <div style={flexStyle}>
            <ProgressBar value={progress} variant="circular" size="small" showLabel />
            <ProgressBar value={progress} variant="circular" size="medium" showLabel color="success" />
            <ProgressBar value={progress} variant="circular" size="large" showLabel color="error" />
          </div>
        </div>
      </section>

      {/* Badges */}
      <section style={sectionStyle}>
        <h2 style={titleStyle}>Badges</h2>
        
        <div style={{ marginBottom: theme.spacing.lg }}>
          <h3 style={{ marginBottom: theme.spacing.md, color: theme.colors.text.secondary }}>Status Variants</h3>
          <div style={flexStyle}>
            <Badge variant="completed">Completed</Badge>
            <Badge variant="in-progress">In Progress</Badge>
            <Badge variant="locked">Locked</Badge>
            <Badge variant="default">Default</Badge>
          </div>
        </div>

        <div style={{ marginBottom: theme.spacing.lg }}>
          <h3 style={{ marginBottom: theme.spacing.md, color: theme.colors.text.secondary }}>Semantic Variants</h3>
          <div style={flexStyle}>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </div>

        <div style={{ marginBottom: theme.spacing.lg }}>
          <h3 style={{ marginBottom: theme.spacing.md, color: theme.colors.text.secondary }}>Sizes</h3>
          <div style={flexStyle}>
            <Badge size="small">Small</Badge>
            <Badge size="medium">Medium</Badge>
            <Badge size="large">Large</Badge>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: theme.spacing.md, color: theme.colors.text.secondary }}>Pill Shape</h3>
          <div style={flexStyle}>
            <Badge pill>Pill Badge</Badge>
            <Badge pill variant="success">New Feature</Badge>
            <Badge pill variant="warning">Beta</Badge>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        textAlign: 'center', 
        padding: theme.spacing.xl,
        marginTop: theme.spacing.xxxl,
        borderTop: `${theme.borderWidth.thin} solid ${theme.colors.border.default}`
      }}>
        <p style={{ color: theme.colors.text.tertiary }}>
          UI Component Library Demo - Theme: {themeName}
        </p>
      </footer>
    </div>
  )
}

export default UIDemo
