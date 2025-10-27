/**
 * Module and Section ID Definitions
 * 
 * Central registry of all modules and their sections for the LLM Education App.
 * These IDs must match the structure used in the progress tracking schema.
 * 
 * @module constants/modules
 */

/**
 * Module Status Enum
 * 
 * Possible states for a module's completion status.
 */
export const MODULE_STATUS = {
  LOCKED: 'locked',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
}

/**
 * Module IDs
 * 
 * Numeric identifiers for each module.
 */
export const MODULE_IDS = {
  MODULE_1: 1,
  MODULE_2: 2,
  MODULE_3: 3,
}

/**
 * Section IDs for Module 1: Introduction to LLMs
 * 
 * Covers foundational concepts and what LLMs are.
 */
export const MODULE_1_SECTIONS = {
  WHAT_ARE_LLMS: 'intro_what_are_llms',
  BRIEF_HISTORY: 'intro_brief_history',
  WHY_THEY_MATTER: 'intro_why_they_matter',
  REAL_WORLD_APPLICATIONS: 'intro_real_world_applications',
  BASIC_CAPABILITIES: 'intro_basic_capabilities',
}

/**
 * Section IDs for Module 2: Core Mechanics
 * 
 * Explores tokenization, attention mechanisms, and embeddings.
 */
export const MODULE_2_SECTIONS = {
  TOKENIZATION_INTRO: 'mechanics_tokenization_intro',
  TOKENIZATION_PROCESS: 'mechanics_tokenization_process',
  TOKENIZATION_EXAMPLES: 'mechanics_tokenization_examples',
  EMBEDDINGS_INTRO: 'mechanics_embeddings_intro',
  EMBEDDINGS_VECTORS: 'mechanics_embeddings_vectors',
  EMBEDDINGS_SIMILARITY: 'mechanics_embeddings_similarity',
  ATTENTION_INTRO: 'mechanics_attention_intro',
  ATTENTION_MECHANISM: 'mechanics_attention_mechanism',
  ATTENTION_VISUALIZATION: 'mechanics_attention_visualization',
}

/**
 * Section IDs for Module 3: Comprehensive Overview
 * 
 * Deep dive into training, inference, and architecture.
 */
export const MODULE_3_SECTIONS = {
  ARCHITECTURE_OVERVIEW: 'overview_architecture_overview',
  ARCHITECTURE_TRANSFORMERS: 'overview_architecture_transformers',
  ARCHITECTURE_LAYERS: 'overview_architecture_layers',
  TRAINING_INTRO: 'overview_training_intro',
  TRAINING_PROCESS: 'overview_training_process',
  TRAINING_DATA: 'overview_training_data',
  TRAINING_OPTIMIZATION: 'overview_training_optimization',
  INFERENCE_INTRO: 'overview_inference_intro',
  INFERENCE_PROCESS: 'overview_inference_process',
  INFERENCE_OPTIMIZATION: 'overview_inference_optimization',
  PUTTING_IT_TOGETHER: 'overview_putting_it_together',
}

/**
 * Module Metadata
 * 
 * Comprehensive information about each module including title, description,
 * section order, and learning objectives.
 */
export const MODULES_METADATA = {
  [MODULE_IDS.MODULE_1]: {
    id: MODULE_IDS.MODULE_1,
    title: 'Introduction to LLMs',
    description: 'Learn the basics of Large Language Models',
    sections: [
      {
        id: MODULE_1_SECTIONS.WHAT_ARE_LLMS,
        title: 'What are LLMs?',
        description: 'Understanding the fundamentals of Large Language Models',
        estimatedMinutes: 5,
      },
      {
        id: MODULE_1_SECTIONS.BRIEF_HISTORY,
        title: 'A Brief History',
        description: 'Evolution of language models from early NLP to modern LLMs',
        estimatedMinutes: 8,
      },
      {
        id: MODULE_1_SECTIONS.WHY_THEY_MATTER,
        title: 'Why They Matter',
        description: 'The significance and impact of LLMs in modern technology',
        estimatedMinutes: 6,
      },
      {
        id: MODULE_1_SECTIONS.REAL_WORLD_APPLICATIONS,
        title: 'Real-World Applications',
        description: 'Practical uses of LLMs across various industries',
        estimatedMinutes: 10,
      },
      {
        id: MODULE_1_SECTIONS.BASIC_CAPABILITIES,
        title: 'Basic Capabilities',
        description: 'Understanding what LLMs can and cannot do',
        estimatedMinutes: 7,
      },
    ],
    prerequisites: [],
    learningObjectives: [
      'Define what a Large Language Model is',
      'Understand the historical context of LLMs',
      'Identify real-world applications',
      'Recognize the capabilities and limitations of LLMs',
    ],
  },
  [MODULE_IDS.MODULE_2]: {
    id: MODULE_IDS.MODULE_2,
    title: 'Core Mechanics',
    description: 'Explore Tokenization, Attention, and Embeddings',
    sections: [
      {
        id: MODULE_2_SECTIONS.TOKENIZATION_INTRO,
        title: 'Introduction to Tokenization',
        description: 'How text is broken down into processable units',
        estimatedMinutes: 8,
      },
      {
        id: MODULE_2_SECTIONS.TOKENIZATION_PROCESS,
        title: 'The Tokenization Process',
        description: 'Step-by-step breakdown of tokenization algorithms',
        estimatedMinutes: 12,
      },
      {
        id: MODULE_2_SECTIONS.TOKENIZATION_EXAMPLES,
        title: 'Tokenization Examples',
        description: 'Interactive examples of text tokenization',
        estimatedMinutes: 10,
      },
      {
        id: MODULE_2_SECTIONS.EMBEDDINGS_INTRO,
        title: 'Introduction to Embeddings',
        description: 'Converting tokens into numerical representations',
        estimatedMinutes: 10,
      },
      {
        id: MODULE_2_SECTIONS.EMBEDDINGS_VECTORS,
        title: 'Embedding Vectors',
        description: 'Understanding vector spaces and dimensions',
        estimatedMinutes: 12,
      },
      {
        id: MODULE_2_SECTIONS.EMBEDDINGS_SIMILARITY,
        title: 'Semantic Similarity',
        description: 'How embeddings capture meaning and relationships',
        estimatedMinutes: 10,
      },
      {
        id: MODULE_2_SECTIONS.ATTENTION_INTRO,
        title: 'Introduction to Attention',
        description: 'The mechanism that revolutionized NLP',
        estimatedMinutes: 10,
      },
      {
        id: MODULE_2_SECTIONS.ATTENTION_MECHANISM,
        title: 'Attention Mechanism',
        description: 'How attention weights are calculated and applied',
        estimatedMinutes: 15,
      },
      {
        id: MODULE_2_SECTIONS.ATTENTION_VISUALIZATION,
        title: 'Visualizing Attention',
        description: 'Interactive visualization of attention patterns',
        estimatedMinutes: 12,
      },
    ],
    prerequisites: [MODULE_IDS.MODULE_1],
    learningObjectives: [
      'Understand how text is tokenized for processing',
      'Explain what embeddings are and why they matter',
      'Describe the attention mechanism',
      'Visualize how attention focuses on relevant information',
    ],
  },
  [MODULE_IDS.MODULE_3]: {
    id: MODULE_IDS.MODULE_3,
    title: 'Comprehensive Overview',
    description: 'Deep dive into Training, Inference, and Architecture',
    sections: [
      {
        id: MODULE_3_SECTIONS.ARCHITECTURE_OVERVIEW,
        title: 'Architecture Overview',
        description: 'High-level view of LLM architecture',
        estimatedMinutes: 10,
      },
      {
        id: MODULE_3_SECTIONS.ARCHITECTURE_TRANSFORMERS,
        title: 'Transformer Architecture',
        description: 'Understanding the transformer model structure',
        estimatedMinutes: 15,
      },
      {
        id: MODULE_3_SECTIONS.ARCHITECTURE_LAYERS,
        title: 'Layers and Components',
        description: 'Detailed look at attention layers, feed-forward networks, and more',
        estimatedMinutes: 12,
      },
      {
        id: MODULE_3_SECTIONS.TRAINING_INTRO,
        title: 'Introduction to Training',
        description: 'How LLMs learn from data',
        estimatedMinutes: 10,
      },
      {
        id: MODULE_3_SECTIONS.TRAINING_PROCESS,
        title: 'The Training Process',
        description: 'Step-by-step walkthrough of model training',
        estimatedMinutes: 15,
      },
      {
        id: MODULE_3_SECTIONS.TRAINING_DATA,
        title: 'Training Data',
        description: 'Data requirements, quality, and preprocessing',
        estimatedMinutes: 12,
      },
      {
        id: MODULE_3_SECTIONS.TRAINING_OPTIMIZATION,
        title: 'Optimization Techniques',
        description: 'Methods for efficient training and fine-tuning',
        estimatedMinutes: 12,
      },
      {
        id: MODULE_3_SECTIONS.INFERENCE_INTRO,
        title: 'Introduction to Inference',
        description: 'How trained models generate text',
        estimatedMinutes: 8,
      },
      {
        id: MODULE_3_SECTIONS.INFERENCE_PROCESS,
        title: 'The Inference Process',
        description: 'Text generation and sampling strategies',
        estimatedMinutes: 12,
      },
      {
        id: MODULE_3_SECTIONS.INFERENCE_OPTIMIZATION,
        title: 'Inference Optimization',
        description: 'Techniques for faster and more efficient inference',
        estimatedMinutes: 10,
      },
      {
        id: MODULE_3_SECTIONS.PUTTING_IT_TOGETHER,
        title: 'Putting It All Together',
        description: 'Comprehensive review and synthesis of all concepts',
        estimatedMinutes: 15,
      },
    ],
    prerequisites: [MODULE_IDS.MODULE_1, MODULE_IDS.MODULE_2],
    learningObjectives: [
      'Understand transformer architecture in detail',
      'Explain the training process for LLMs',
      'Describe how inference and text generation work',
      'Identify optimization techniques for training and inference',
      'Synthesize all learned concepts into a comprehensive understanding',
    ],
  },
}

/**
 * Get all section IDs for a specific module
 * 
 * @param {number} moduleId - The module ID (1, 2, or 3)
 * @returns {string[]} Array of section IDs for the module
 * 
 * @example
 * const sections = getModuleSectionIds(1)
 * // Returns: ['intro_what_are_llms', 'intro_brief_history', ...]
 */
export const getModuleSectionIds = (moduleId) => {
  const metadata = MODULES_METADATA[moduleId]
  return metadata ? metadata.sections.map((section) => section.id) : []
}

/**
 * Get section metadata by ID
 * 
 * @param {number} moduleId - The module ID
 * @param {string} sectionId - The section ID
 * @returns {Object|null} Section metadata or null if not found
 * 
 * @example
 * const section = getSectionMetadata(1, 'intro_what_are_llms')
 * // Returns: { id: 'intro_what_are_llms', title: 'What are LLMs?', ... }
 */
export const getSectionMetadata = (moduleId, sectionId) => {
  const metadata = MODULES_METADATA[moduleId]
  if (!metadata) return null
  
  return metadata.sections.find((section) => section.id === sectionId) || null
}

/**
 * Get total estimated time for a module
 * 
 * @param {number} moduleId - The module ID
 * @returns {number} Total estimated minutes for the module
 * 
 * @example
 * const totalTime = getModuleTotalTime(1)
 * // Returns: 36 (sum of all section times)
 */
export const getModuleTotalTime = (moduleId) => {
  const metadata = MODULES_METADATA[moduleId]
  if (!metadata) return 0
  
  return metadata.sections.reduce((total, section) => total + section.estimatedMinutes, 0)
}

/**
 * Check if a module has prerequisites
 * 
 * @param {number} moduleId - The module ID
 * @returns {boolean} True if the module has prerequisites
 * 
 * @example
 * const hasPrereqs = hasPrerequisites(2)
 * // Returns: true (Module 2 requires Module 1)
 */
export const hasPrerequisites = (moduleId) => {
  const metadata = MODULES_METADATA[moduleId]
  return metadata ? metadata.prerequisites.length > 0 : false
}

/**
 * Get prerequisites for a module
 * 
 * @param {number} moduleId - The module ID
 * @returns {number[]} Array of prerequisite module IDs
 * 
 * @example
 * const prereqs = getPrerequisites(3)
 * // Returns: [1, 2] (Module 3 requires Modules 1 and 2)
 */
export const getPrerequisites = (moduleId) => {
  const metadata = MODULES_METADATA[moduleId]
  return metadata ? metadata.prerequisites : []
}
