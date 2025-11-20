/**
 * ModuleNavigation Component for Module 3
 * 
 * Navigation sidebar/list for Module 3 sections with progress indicators,
 * active state styling, and completion badges.
 * 
 * @component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'
import { useModuleProgress } from '../../hooks/useModuleProgress'
import { MODULE_3_SECTION_STRUCTURE } from '../../data/module3Structure'

function ModuleNavigation({ 
  currentPath, 
  onSectionChange,
  className = '' 
}) {
  const { theme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const { isSectionCompleted, completionPercentage } = useModuleProgress(3)

  const handleSectionClick = (section) => {
    const newPath = `/module/3/${section.path}`
    navigate(newPath)
    if (onSectionChange) {
      onSectionChange(section)
    }
  }

  const isActive = (sectionPath) => {
    return currentPath === sectionPath || location.pathname.includes(sectionPath)
  }

  const getSectionStatus = (section) => {
    const completed = isSectionCompleted(section.id)
    const active = isActive(section.path)
    
    if (completed) return 'completed'
    if (active) return 'active'
    return 'pending'
  }

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface.base,
    borderRadius: theme.radii.medium,
    border: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`,
  }

  const headerStyles = {
    marginBottom: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    borderBottom: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`,
  }

  const titleStyles = {
    fontSize: theme.typography.size.heading6,
    fontWeight: theme.typography.weight.bold,
    color: theme.colors.text.primary,
    margin: 0,
    marginBottom: theme.spacing.xs,
  }

  const getSectionItemStyles = (status) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    backgroundColor: status === 'active' 
      ? theme.colors.primary.light + '20'
      : 'transparent',
    borderRadius: theme.radii.small,
    border: `${theme.borderWidth.thin} solid ${
      status === 'active' 
        ? theme.colors.primary.main
        : 'transparent'
    }`,
    cursor: 'pointer',
    transition: theme.transitions.default,
    textDecoration: 'none',
    color: 'inherit',
  })

  const sectionNumberStyles = (status) => ({
    width: '24px',
    height: '24px',
    borderRadius: theme.radii.full,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: theme.typography.size.bodySmall,
    fontWeight: theme.typography.weight.semibold,
    backgroundColor: status === 'completed'
      ? theme.colors.state.success.main
      : status === 'active'
        ? theme.colors.primary.main
        : theme.colors.surface.raised,
    color: status === 'completed' || status === 'active'
      ? '#ffffff'
      : theme.colors.text.secondary,
    flexShrink: 0,
  })

  const sectionTextStyles = (status) => ({
    fontSize: theme.typography.size.body,
    fontWeight: status === 'active' 
      ? theme.typography.weight.semibold
      : theme.typography.weight.medium,
    color: status === 'completed'
      ? theme.colors.text.secondary
      : status === 'active'
        ? theme.colors.text.primary
        : theme.colors.text.secondary,
    flex: 1,
  })

  const estimateStyles = {
    fontSize: theme.typography.size.bodySmall,
    color: theme.colors.text.tertiary,
    marginLeft: 'auto',
    flexShrink: 0,
  }

  return (
    <nav className={`module-navigation ${className}`} style={containerStyles}>
      {/* Header */}
      <div style={headerStyles}>
        <h3 style={titleStyles}>Module Sections</h3>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.xs,
        }}>
          <div style={{
            flex: 1,
            height: '6px',
            backgroundColor: theme.colors.surface.raised,
            borderRadius: theme.radii.full,
            overflow: 'hidden',
          }}>
            <motion.div
              style={{
                height: '100%',
                backgroundColor: theme.colors.primary.main,
                borderRadius: theme.radii.full,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
            />
          </div>
          <span style={{
            fontSize: theme.typography.size.bodySmall,
            color: theme.colors.text.secondary,
            fontWeight: theme.typography.weight.semibold,
            minWidth: '40px',
            textAlign: 'right',
          }}>
            {completionPercentage}%
          </span>
        </div>
      </div>

      {/* Section List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.xs }}>
        {MODULE_3_SECTION_STRUCTURE.map((section) => {
          const status = getSectionStatus(section)
          
          return (
            <motion.button
              key={section.id}
              onClick={() => handleSectionClick(section)}
              style={getSectionItemStyles(status)}
              whileHover={{
                backgroundColor: status === 'active'
                  ? theme.colors.primary.light + '30'
                  : theme.colors.surface.raised,
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div style={sectionNumberStyles(status)}>
                {status === 'completed' ? '✓' : section.order}
              </div>
              <span style={sectionTextStyles(status)}>
                {section.shortTitle}
              </span>
              {section.estimatedMinutes && (
                <span style={estimateStyles}>
                  {section.estimatedMinutes}m
                </span>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Module Info */}
      <div style={{
        marginTop: theme.spacing.md,
        paddingTop: theme.spacing.md,
        borderTop: `${theme.borderWidth.thin} solid ${theme.colors.border.light}`,
        fontSize: theme.typography.size.bodySmall,
        color: theme.colors.text.tertiary,
        textAlign: 'center',
      }}>
        Module 3 of 3
      </div>
    </nav>
  )
}

ModuleNavigation.propTypes = {
  currentPath: PropTypes.string,
  onSectionChange: PropTypes.func,
  className: PropTypes.string,
}

export default ModuleNavigation
