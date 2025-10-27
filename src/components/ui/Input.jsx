import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import './Input.css'

/**
 * Input Component
 * 
 * Text input component with label, error states, and validation feedback.
 * Features theme-aware styling and smooth animations for state changes.
 * 
 * @component
 * @example
 * <Input 
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 * />
 * 
 * @example
 * <Input 
 *   label="Password"
 *   type="password"
 *   error="Password must be at least 8 characters"
 *   required
 * />
 */
function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = '',
  helperText = '',
  disabled = false,
  required = false,
  fullWidth = false,
  className = '',
  id,
  name,
  ...props
}) {
  const { theme } = useTheme()
  const [isFocused, setIsFocused] = useState(false)
  const inputId = id || `input-${name || Math.random().toString(36).substr(2, 9)}`

  // Generate dynamic styles based on theme and state
  const getInputStyles = () => {
    const hasError = Boolean(error)

    return {
      width: fullWidth ? '100%' : 'auto',
      padding: `${theme.spacing.sm} ${theme.spacing.md}`,
      fontSize: theme.typography.size.body,
      fontFamily: theme.typography.family.primary,
      color: theme.colors.text.primary,
      backgroundColor: theme.colors.surface.base,
      border: `${theme.borderWidth.medium} solid ${
        hasError 
          ? theme.colors.state.error.main 
          : isFocused 
            ? theme.colors.border.focus 
            : theme.colors.border.default
      }`,
      borderRadius: theme.radii.medium,
      outline: 'none',
      transition: theme.transitions.default,
      cursor: disabled ? 'not-allowed' : 'text',
      opacity: disabled ? 0.6 : 1,
    }
  }

  const getLabelStyles = () => {
    return {
      display: 'block',
      marginBottom: theme.spacing.xs,
      fontSize: theme.typography.size.bodySmall,
      fontWeight: theme.typography.weight.medium,
      color: error ? theme.colors.state.error.main : theme.colors.text.secondary,
    }
  }

  const getHelperTextStyles = () => {
    return {
      marginTop: theme.spacing.xs,
      fontSize: theme.typography.size.caption,
      color: error ? theme.colors.state.error.main : theme.colors.text.tertiary,
    }
  }

  // Framer Motion variants for error message
  const errorVariants = {
    initial: { opacity: 0, y: -5 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0, 
      y: -5,
      transition: { duration: 0.15 }
    },
  }

  return (
    <div className={`ui-input-wrapper ${className}`} style={{ width: fullWidth ? '100%' : 'auto' }}>
      {label && (
        <label htmlFor={inputId} style={getLabelStyles()}>
          {label}
          {required && <span className="ui-input__required"> *</span>}
        </label>
      )}
      
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`ui-input ${error ? 'ui-input--error' : ''} ${isFocused ? 'ui-input--focused' : ''}`}
        style={getInputStyles()}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        {...props}
      />
      
      {error && (
        <motion.div
          id={`${inputId}-error`}
          className="ui-input__error"
          style={getHelperTextStyles()}
          variants={errorVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          role="alert"
        >
          {error}
        </motion.div>
      )}
      
      {!error && helperText && (
        <div
          id={`${inputId}-helper`}
          className="ui-input__helper"
          style={getHelperTextStyles()}
        >
          {helperText}
        </div>
      )}
    </div>
  )
}

Input.propTypes = {
  /** Input label */
  label: PropTypes.string,
  /** Input type */
  type: PropTypes.string,
  /** Input value */
  value: PropTypes.string,
  /** Change handler */
  onChange: PropTypes.func,
  /** Placeholder text */
  placeholder: PropTypes.string,
  /** Error message */
  error: PropTypes.string,
  /** Helper text */
  helperText: PropTypes.string,
  /** Disabled state */
  disabled: PropTypes.bool,
  /** Required field */
  required: PropTypes.bool,
  /** Full width input */
  fullWidth: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Input ID */
  id: PropTypes.string,
  /** Input name */
  name: PropTypes.string,
}

export default Input
