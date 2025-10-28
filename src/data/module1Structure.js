/**
 * Module 1 Section Structure and Content
 * 
 * Defines the routing structure, content, and metadata for Module 1 sections.
 * Used by Module1 page component for navigation and section rendering.
 * 
 * @module data/module1Structure
 */

import { MODULE_1_SECTIONS } from '../constants/modules.js'

/**
 * Module 1 Section Definitions
 * 
 * Each section includes:
 * - id: Section identifier (matches MODULE_1_SECTIONS)
 * - title: Display title for navigation
 * - path: URL path segment for routing
 * - order: Display order in navigation
 * - estimatedMinutes: Estimated completion time
 * - content: Section content component/text
 */
export const MODULE_1_SECTION_STRUCTURE = [
  {
    id: MODULE_1_SECTIONS.WHAT_ARE_LLMS,
    title: 'Introduction',
    shortTitle: 'Intro',
    path: 'intro',
    order: 1,
    estimatedMinutes: 5,
    description: 'Understanding what Large Language Models are and their fundamental concepts',
    learningObjectives: [
      'Define what a Large Language Model is',
      'Understand the basic architecture',
      'Identify key characteristics of LLMs',
    ],
  },
  {
    id: MODULE_1_SECTIONS.BRIEF_HISTORY,
    title: 'Text Generation',
    shortTitle: 'Generation',
    path: 'text-generation',
    order: 2,
    estimatedMinutes: 10,
    description: 'Explore how LLMs generate text through interactive examples',
    learningObjectives: [
      'Understand token-by-token generation',
      'See how prompts influence outputs',
      'Learn about probability and sampling',
    ],
  },
  {
    id: MODULE_1_SECTIONS.WHY_THEY_MATTER,
    title: 'Interactive Examples',
    shortTitle: 'Examples',
    path: 'examples',
    order: 3,
    estimatedMinutes: 12,
    description: 'Hands-on practice with text completion and prompt engineering',
    learningObjectives: [
      'Experiment with different prompts',
      'Observe variation in outputs',
      'Practice prompt engineering basics',
    ],
  },
  {
    id: MODULE_1_SECTIONS.REAL_WORLD_APPLICATIONS,
    title: 'Exercises',
    shortTitle: 'Practice',
    path: 'exercises',
    order: 4,
    estimatedMinutes: 10,
    description: 'Practice exercises to reinforce learning',
    learningObjectives: [
      'Apply learned concepts',
      'Complete interactive exercises',
      'Test understanding',
    ],
  },
  {
    id: MODULE_1_SECTIONS.BASIC_CAPABILITIES,
    title: 'Summary',
    shortTitle: 'Summary',
    path: 'summary',
    order: 5,
    estimatedMinutes: 5,
    description: 'Review key concepts and prepare for the next module',
    learningObjectives: [
      'Review core concepts',
      'Assess understanding',
      'Preview next module',
    ],
  },
]

/**
 * Get section by path
 * 
 * @param {string} path - Section path
 * @returns {Object|null} Section object or null if not found
 */
export const getSectionByPath = (path) => {
  return MODULE_1_SECTION_STRUCTURE.find(section => section.path === path) || null
}

/**
 * Get section by ID
 * 
 * @param {string} sectionId - Section ID
 * @returns {Object|null} Section object or null if not found
 */
export const getSectionById = (sectionId) => {
  return MODULE_1_SECTION_STRUCTURE.find(section => section.id === sectionId) || null
}

/**
 * Get next section
 * 
 * @param {string} currentPath - Current section path
 * @returns {Object|null} Next section or null if at end
 */
export const getNextSection = (currentPath) => {
  const currentSection = getSectionByPath(currentPath)
  if (!currentSection) return null
  
  const nextOrder = currentSection.order + 1
  return MODULE_1_SECTION_STRUCTURE.find(section => section.order === nextOrder) || null
}

/**
 * Get previous section
 * 
 * @param {string} currentPath - Current section path
 * @returns {Object|null} Previous section or null if at start
 */
export const getPreviousSection = (currentPath) => {
  const currentSection = getSectionByPath(currentPath)
  if (!currentSection) return null
  
  const prevOrder = currentSection.order - 1
  return MODULE_1_SECTION_STRUCTURE.find(section => section.order === prevOrder) || null
}

/**
 * Check if section is first
 * 
 * @param {string} path - Section path
 * @returns {boolean} True if first section
 */
export const isFirstSection = (path) => {
  const section = getSectionByPath(path)
  return section ? section.order === 1 : false
}

/**
 * Check if section is last
 * 
 * @param {string} path - Section path
 * @returns {boolean} True if last section
 */
export const isLastSection = (path) => {
  const section = getSectionByPath(path)
  return section ? section.order === MODULE_1_SECTION_STRUCTURE.length : false
}
