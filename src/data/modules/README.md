# Module Content Structure

This directory contains learning content for all modules in the LLM Education App. Content is structured to support gender-differentiated learning paths while maintaining identical educational objectives.

## Overview

Each module file exports a complete content structure with sections, examples, analogies, and metadata. The content uses gender-specific variants to provide culturally resonant examples and analogies that enhance engagement and understanding.

## Content Schema

### Module Structure
```javascript
{
  moduleId: number,
  title: string,
  description: string,
  sections: SectionContent[],
  metadata: {
    totalEstimatedMinutes: number,
    prerequisites: string[],
    learningOutcomes: string[]
  }
}
```

### Section Structure
```javascript
{
  id: string,
  title: string,
  introduction: { male: string, female: string },
  contentBlocks: ContentBlock[],
  examples: ExampleItem[],
  analogies: AnalogyItem[],
  visualReferences: string[],
  metadata: {
    order: number,
    estimatedMinutes: number,
    learningObjectives: string[],
    keywords: string[]
  }
}
```

### Gender Variants

All content that varies by gender uses the `GenderVariant` structure:
```javascript
{
  male: string,
  female: string
}
```

**Design Philosophy:**
- **Male variants** tend to reference: tech, gaming, sports, productivity tools, systematic processes
- **Female variants** tend to reference: social dynamics, creative expression, communication patterns, relational contexts
- Both variants teach the same concepts with equivalent depth
- Focus on cultural resonance, not stereotypes

## Using Module Content

### Import Content
```javascript
import { module1Content } from '../data/modules/module1.js'
import { getContentForGender, getExamplesForGender } from '../data/types.js'
```

### Render Gender-Specific Content
```javascript
// Get user's gender preference from context/state
const userGender = 'female' // or 'male'

// Get introduction text
const intro = getContentForGender(section.introduction, userGender)

// Get examples
const examples = getExamplesForGender(section, userGender)

// Render content blocks
section.contentBlocks.forEach(block => {
  if (block.content) {
    const text = getContentForGender(block.content, userGender)
    // Render text
  }
})
```

### Calculate Progress
```javascript
import { calculateReadingTime } from '../data/types.js'

const section = module1Content.sections[0]
const estimatedTime = calculateReadingTime(section) // Returns minutes
```

## Module 1: Introduction to LLMs

**File:** `module1.js`

**Sections:**
1. **What are LLMs?** (5 min) - Fundamental concepts and definitions
2. **How They Generate Text** (7 min) - Text generation process explained
3. **Real-World Applications** (10 min) - Practical uses and examples

**Total Time:** 22 minutes

**Learning Outcomes:**
- Understand what Large Language Models are and how they work
- Explain the text generation process from prompt to response
- Identify and evaluate real-world LLM applications
- Recognize the strengths and limitations of LLM technology

## Extending Content

### Adding a New Section

1. Create section object with required structure:
```javascript
const newSection = {
  id: 'unique_section_id',
  title: 'Section Title',
  introduction: {
    male: 'Male-focused intro...',
    female: 'Female-focused intro...'
  },
  contentBlocks: [...],
  examples: [...],
  analogies: [...],
  visualReferences: ['viz-component-name'],
  metadata: {
    order: 4,
    estimatedMinutes: 8,
    learningObjectives: [...],
    keywords: [...]
  }
}
```

2. Add to module's sections array
3. Update module metadata with new total time

### Adding a New Module

1. Create new file: `src/data/modules/moduleX.js`
2. Follow the same structure as `module1.js`
3. Export from `src/data/index.js`
4. Update constants in `src/constants/modules.js` if needed

## Best Practices

1. **Maintain Parity:** Both gender variants should teach the same concepts with equal depth
2. **Cultural Resonance:** Use examples that feel authentic to the target audience without reinforcing stereotypes
3. **Appropriate Complexity:** Target 18-25 year-old learners (college level)
4. **Clear Learning Objectives:** Each section should have specific, measurable learning outcomes
5. **Visual Integration:** Reference visualization components that will be built separately
6. **Consistent Tone:** Maintain an engaging, conversational tone that feels like a knowledgeable peer

## Type Definitions

Full type definitions with JSDoc comments are available in `src/data/types.js`. Import these types for IDE autocomplete and type checking:

```javascript
/**
 * @type {import('../data/types.js').ModuleContent}
 */
export const moduleXContent = { ... }
```
