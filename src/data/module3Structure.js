/**
 * Module 3 Section Structure and Content
 * 
 * Defines the routing structure, content, and metadata for Module 3 sections.
 * Used by Module3 page component for navigation and section rendering.
 * 
 * @module data/module3Structure
 */

import { MODULE_3_SECTIONS } from '../constants/modules.js'

/**
 * Module 3 Section Definitions
 * 
 * Each section includes:
 * - id: Section identifier (matches MODULE_3_SECTIONS)
 * - title: Display title for navigation
 * - path: URL path segment for routing
 * - order: Display order in navigation
 * - estimatedMinutes: Estimated completion time
 * - content: Section content component/text
 */
export const MODULE_3_SECTION_STRUCTURE = [
  {
    id: MODULE_3_SECTIONS.TRAINING_INTRO,
    title: 'How LLMs Learn',
    shortTitle: 'Training',
    path: 'training',
    order: 1,
    estimatedMinutes: 12,
    description: 'Understanding how models learn from data using accessible analogies',
    learningObjectives: [
      'Understand the training loop concept',
      'Learn how models improve through feedback',
      'Grasp pattern recognition in neural networks',
    ],
  },
  {
    id: MODULE_3_SECTIONS.INFERENCE_INTRO,
    title: 'Putting It All Together',
    shortTitle: 'Inference',
    path: 'inference',
    order: 2,
    estimatedMinutes: 10,
    description: 'Step-by-step demonstration of how inference works',
    learningObjectives: [
      'See how prompts are processed',
      'Understand token generation in real-time',
      'Learn about sampling strategies',
    ],
  },
  {
    id: MODULE_3_SECTIONS.ARCHITECTURE_OVERVIEW,
    title: 'Under the Hood',
    shortTitle: 'Architecture',
    path: 'architecture',
    order: 3,
    estimatedMinutes: 15,
    description: 'High-level view of transformer architecture',
    learningObjectives: [
      'Understand the transformer structure',
      'See how information flows through layers',
      'Learn about attention and feed-forward networks',
    ],
  },
  {
    id: MODULE_3_SECTIONS.PUTTING_IT_TOGETHER,
    title: 'Bringing It Home',
    shortTitle: 'Synthesis',
    path: 'synthesis',
    order: 4,
    estimatedMinutes: 10,
    description: 'Comprehensive review tying together all concepts',
    learningObjectives: [
      'Synthesize knowledge from all three modules',
      'Connect training, inference, and architecture',
      'Apply understanding to real-world scenarios',
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
  return MODULE_3_SECTION_STRUCTURE.find(section => section.path === path) || null
}

/**
 * Get section by ID
 * 
 * @param {string} sectionId - Section ID
 * @returns {Object|null} Section object or null if not found
 */
export const getSectionById = (sectionId) => {
  return MODULE_3_SECTION_STRUCTURE.find(section => section.id === sectionId) || null
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
  return MODULE_3_SECTION_STRUCTURE.find(section => section.order === nextOrder) || null
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
  return MODULE_3_SECTION_STRUCTURE.find(section => section.order === prevOrder) || null
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
  return section ? section.order === MODULE_3_SECTION_STRUCTURE.length : false
}
