/**
 * Module 2 Section Structure and Content
 * 
 * Defines the routing structure, content, and metadata for Module 2 sections.
 * Used by Module2 page component for navigation and section rendering.
 * 
 * @module data/module2Structure
 */

import { MODULE_2_SECTIONS } from '../constants/modules.js'

/**
 * Module 2 Section Definitions
 * 
 * Each section includes:
 * - id: Section identifier (matches MODULE_2_SECTIONS)
 * - title: Display title for navigation
 * - path: URL path segment for routing
 * - order: Display order in navigation
 * - estimatedMinutes: Estimated completion time
 * - content: Section content component/text
 */
export const MODULE_2_SECTION_STRUCTURE = [
  {
    id: MODULE_2_SECTIONS.TOKENIZATION_INTRO,
    title: 'Introduction to Tokenization',
    shortTitle: 'Tokenization',
    path: 'tokenization',
    order: 1,
    estimatedMinutes: 8,
    description: 'How text is broken down into processable units',
    learningObjectives: [
      'Understand what tokenization is and why it matters',
      'See how text breaks into tokens visually',
      'Learn the difference between word and subword tokenization',
    ],
  },
  {
    id: MODULE_2_SECTIONS.TOKENIZATION_EXAMPLES,
    title: 'Interactive Tokenization',
    shortTitle: 'Try It',
    path: 'tokenization-demo',
    order: 2,
    estimatedMinutes: 10,
    description: 'Hands-on exploration of text tokenization',
    learningObjectives: [
      'Experiment with different text inputs',
      'Observe how tokenization handles various cases',
      'Practice with real-world examples',
    ],
  },
  {
    id: MODULE_2_SECTIONS.EMBEDDINGS_INTRO,
    title: 'Understanding Embeddings',
    shortTitle: 'Embeddings',
    path: 'embeddings',
    order: 3,
    estimatedMinutes: 10,
    description: 'Converting tokens into numerical representations',
    learningObjectives: [
      'Understand what embeddings are',
      'Learn how words become numbers',
      'Grasp the concept of vector spaces',
    ],
  },
  {
    id: MODULE_2_SECTIONS.EMBEDDINGS_SIMILARITY,
    title: 'Semantic Similarity',
    shortTitle: 'Similarity',
    path: 'similarity',
    order: 4,
    estimatedMinutes: 10,
    description: 'How embeddings capture meaning and relationships',
    learningObjectives: [
      'Explore how similar words cluster together',
      'Understand semantic relationships',
      'See word analogies in vector space',
    ],
  },
  {
    id: MODULE_2_SECTIONS.ATTENTION_INTRO,
    title: 'Attention Mechanism',
    shortTitle: 'Attention',
    path: 'attention',
    order: 5,
    estimatedMinutes: 10,
    description: 'The mechanism that revolutionized NLP',
    learningObjectives: [
      'Understand how attention works',
      'Learn why attention matters for understanding context',
      'See how tokens relate to each other',
    ],
  },
  {
    id: MODULE_2_SECTIONS.ATTENTION_VISUALIZATION,
    title: 'Visualizing Attention',
    shortTitle: 'See Attention',
    path: 'attention-viz',
    order: 6,
    estimatedMinutes: 12,
    description: 'Interactive visualization of attention patterns',
    learningObjectives: [
      'Visualize attention weights between tokens',
      'Explore different attention patterns',
      'Understand how context changes meaning',
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
  return MODULE_2_SECTION_STRUCTURE.find(section => section.path === path) || null
}

/**
 * Get section by ID
 * 
 * @param {string} sectionId - Section ID
 * @returns {Object|null} Section object or null if not found
 */
export const getSectionById = (sectionId) => {
  return MODULE_2_SECTION_STRUCTURE.find(section => section.id === sectionId) || null
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
  return MODULE_2_SECTION_STRUCTURE.find(section => section.order === nextOrder) || null
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
  return MODULE_2_SECTION_STRUCTURE.find(section => section.order === prevOrder) || null
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
  return section ? section.order === MODULE_2_SECTION_STRUCTURE.length : false
}
