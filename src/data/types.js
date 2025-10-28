/**
 * Content Data Type Definitions
 * 
 * Type definitions for module learning content with gender-differentiated variants.
 * Uses JSDoc for type safety in JavaScript.
 * 
 * @module data/types
 */

/**
 * @typedef {Object} GenderVariant
 * @property {string} male - Content variant for male users
 * @property {string} female - Content variant for female users
 */

/**
 * @typedef {Object} ExampleItem
 * @property {string} title - Example title or heading
 * @property {GenderVariant} description - Gender-specific example description
 * @property {string} [code] - Optional code snippet or technical detail
 */

/**
 * @typedef {Object} AnalogyItem
 * @property {GenderVariant} text - Gender-specific analogy text
 * @property {string} [visualRef] - Optional reference to a visual asset
 */

/**
 * @typedef {Object} ContentBlock
 * @property {string} type - Block type ('paragraph', 'list', 'callout', 'interactive')
 * @property {GenderVariant} [content] - Gender-specific text content
 * @property {Array<GenderVariant>} [items] - For list-type blocks
 * @property {string} [emphasis] - Emphasis level ('info', 'tip', 'warning')
 */

/**
 * @typedef {Object} SectionContent
 * @property {string} id - Section identifier (e.g., 'intro_what_are_llms')
 * @property {string} title - Section display title (gender-neutral)
 * @property {GenderVariant} introduction - Opening paragraph with gender-specific framing
 * @property {ContentBlock[]} contentBlocks - Array of content blocks
 * @property {ExampleItem[]} examples - Gender-specific examples
 * @property {AnalogyItem[]} analogies - Gender-specific analogies
 * @property {string[]} [visualReferences] - References to visualization components
 * @property {Object} metadata - Section metadata
 * @property {number} metadata.order - Display order within module
 * @property {number} metadata.estimatedMinutes - Estimated reading time
 * @property {string[]} metadata.learningObjectives - What the user will learn
 * @property {string[]} [metadata.keywords] - Key terms covered in section
 */

/**
 * @typedef {Object} ModuleContent
 * @property {number} moduleId - Module identifier (1, 2, or 3)
 * @property {string} title - Module title
 * @property {string} description - Module description
 * @property {SectionContent[]} sections - Array of section content objects
 * @property {Object} metadata - Module-level metadata
 * @property {number} metadata.totalEstimatedMinutes - Total time for module
 * @property {string[]} metadata.prerequisites - Required prior knowledge
 * @property {string[]} metadata.learningOutcomes - Overall module outcomes
 */

/**
 * Validate content structure for gender variants
 * 
 * @param {GenderVariant} variant - Gender variant to validate
 * @returns {{valid: boolean, errors: string[]}} Validation result
 */
export const validateGenderVariant = (variant) => {
  const errors = []

  if (!variant || typeof variant !== 'object') {
    errors.push('Gender variant must be an object')
    return { valid: false, errors }
  }

  if (!variant.male || typeof variant.male !== 'string') {
    errors.push('Male variant must be a non-empty string')
  }

  if (!variant.female || typeof variant.female !== 'string') {
    errors.push('Female variant must be a non-empty string')
  }

  return { valid: errors.length === 0, errors }
}

/**
 * Get content variant based on user gender preference
 * 
 * @param {GenderVariant} variant - Gender variant object
 * @param {'male'|'female'} gender - User's gender preference
 * @returns {string} Appropriate content variant
 */
export const getContentForGender = (variant, gender) => {
  if (!variant || typeof variant !== 'object') {
    return ''
  }

  return gender === 'female' ? variant.female : variant.male
}

/**
 * Calculate total reading time for a section
 * 
 * @param {SectionContent} section - Section content object
 * @returns {number} Estimated reading time in minutes
 */
export const calculateReadingTime = (section) => {
  if (!section || !section.metadata) {
    return 0
  }

  return section.metadata.estimatedMinutes || 0
}

/**
 * Get all examples for a section based on gender
 * 
 * @param {SectionContent} section - Section content object
 * @param {'male'|'female'} gender - User's gender preference
 * @returns {Array<{title: string, description: string, code?: string}>} Processed examples
 */
export const getExamplesForGender = (section, gender) => {
  if (!section || !section.examples) {
    return []
  }

  return section.examples.map((example) => ({
    title: example.title,
    description: getContentForGender(example.description, gender),
    code: example.code,
  }))
}

/**
 * Get all analogies for a section based on gender
 * 
 * @param {SectionContent} section - Section content object
 * @param {'male'|'female'} gender - User's gender preference
 * @returns {Array<{text: string, visualRef?: string}>} Processed analogies
 */
export const getAnalogiesForGender = (section, gender) => {
  if (!section || !section.analogies) {
    return []
  }

  return section.analogies.map((analogy) => ({
    text: getContentForGender(analogy.text, gender),
    visualRef: analogy.visualRef,
  }))
}
