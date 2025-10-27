# Application Constants

This directory contains all constant definitions for modules, sections, and achievements in the LLM Education App.

## Overview

These constants ensure consistency across the application and provide a single source of truth for:

- **Module structure** - IDs, titles, descriptions, and sections
- **Section definitions** - Learning content organization
- **Achievement criteria** - Milestone tracking and rewards
- **Status enums** - Valid state values

## Files

### `modules.js`

Defines the complete learning path structure including all modules and their sections.

**Key Exports:**

#### Enums
- `MODULE_STATUS` - Valid module states (`locked`, `in-progress`, `completed`)
- `MODULE_IDS` - Numeric module identifiers (1, 2, 3)

#### Section IDs
- `MODULE_1_SECTIONS` - All section IDs for Module 1 (Introduction to LLMs)
  - `WHAT_ARE_LLMS`: 'intro_what_are_llms'
  - `BRIEF_HISTORY`: 'intro_brief_history'
  - `WHY_THEY_MATTER`: 'intro_why_they_matter'
  - `REAL_WORLD_APPLICATIONS`: 'intro_real_world_applications'
  - `BASIC_CAPABILITIES`: 'intro_basic_capabilities'

- `MODULE_2_SECTIONS` - All section IDs for Module 2 (Core Mechanics)
  - `TOKENIZATION_INTRO`, `TOKENIZATION_PROCESS`, `TOKENIZATION_EXAMPLES`
  - `EMBEDDINGS_INTRO`, `EMBEDDINGS_VECTORS`, `EMBEDDINGS_SIMILARITY`
  - `ATTENTION_INTRO`, `ATTENTION_MECHANISM`, `ATTENTION_VISUALIZATION`

- `MODULE_3_SECTIONS` - All section IDs for Module 3 (Comprehensive Overview)
  - `ARCHITECTURE_OVERVIEW`, `ARCHITECTURE_TRANSFORMERS`, `ARCHITECTURE_LAYERS`
  - `TRAINING_INTRO`, `TRAINING_PROCESS`, `TRAINING_DATA`, `TRAINING_OPTIMIZATION`
  - `INFERENCE_INTRO`, `INFERENCE_PROCESS`, `INFERENCE_OPTIMIZATION`
  - `PUTTING_IT_TOGETHER`

#### Metadata
- `MODULES_METADATA` - Complete module information including:
  - Module titles and descriptions
  - Section details with titles, descriptions, and estimated time
  - Prerequisites (Module 2 requires Module 1, Module 3 requires 1 & 2)
  - Learning objectives

#### Utility Functions
- `getModuleSectionIds(moduleId)` - Get all section IDs for a module
- `getSectionMetadata(moduleId, sectionId)` - Get section details
- `getModuleTotalTime(moduleId)` - Calculate total estimated time
- `hasPrerequisites(moduleId)` - Check if module has prerequisites
- `getPrerequisites(moduleId)` - Get prerequisite module IDs

### `achievements.js`

Defines all achievements, milestones, and reward criteria.

**Key Exports:**

#### Enums
- `ACHIEVEMENT_CATEGORIES` - Achievement types:
  - `PROGRESS` - Module completion achievements
  - `MASTERY` - Perfect score achievements
  - `MILESTONE` - Overall progress milestones
  - `ENGAGEMENT` - Usage pattern achievements
  - `SPECIAL` - Hidden/bonus achievements

- `ACHIEVEMENT_IDS` - All achievement identifiers

#### Achievements (Examples)
- **Progress**: `FIRST_STEPS`, `CORE_LEARNER`, `COMPREHENSIVE_MASTER`
- **Mastery**: `INTRO_MASTER`, `MECHANICS_MASTER`, `ARCHITECTURE_MASTER`
- **Milestone**: `HALFWAY_THERE`, `COURSE_COMPLETE`
- **Engagement**: `QUICK_START`, `DEDICATED_LEARNER`, `MARATHON_SESSION`, `CONSISTENT_LEARNER`
- **Special**: `EARLY_BIRD`, `NIGHT_OWL`, `SPEED_LEARNER`, `THOROUGH_READER`

#### Metadata
- `ACHIEVEMENTS_METADATA` - Complete achievement information including:
  - Title and description
  - Category and icon
  - Point values
  - Unlock criteria
  - Hidden status (for surprise achievements)

#### Utility Functions
- `getAchievementMetadata(achievementId)` - Get achievement details
- `getAchievementsByCategory(category)` - Filter by category
- `getVisibleAchievements()` - Get all non-hidden achievements
- `getHiddenAchievements()` - Get all hidden achievements
- `getTotalAchievementPoints()` - Calculate total possible points
- `getModuleAchievements(moduleId)` - Get achievements for a module

## Usage Examples

### Working with Modules

```javascript
import { 
  MODULE_IDS, 
  MODULE_STATUS,
  MODULE_1_SECTIONS,
  MODULES_METADATA,
  getModuleSectionIds,
  getModuleTotalTime
} from './constants/modules.js'

// Access module metadata
const module1 = MODULES_METADATA[MODULE_IDS.MODULE_1]
console.log(module1.title) // "Introduction to LLMs"
console.log(module1.sections.length) // 5 sections

// Get all section IDs for a module
const sections = getModuleSectionIds(1)
// ['intro_what_are_llms', 'intro_brief_history', ...]

// Calculate total time for module
const totalMinutes = getModuleTotalTime(1)
console.log(`Module 1 takes approximately ${totalMinutes} minutes`)

// Check module status
if (moduleProgress.status === MODULE_STATUS.COMPLETED) {
  console.log('Module completed!')
}

// Reference specific sections
const whatAreLLMs = MODULE_1_SECTIONS.WHAT_ARE_LLMS
// 'intro_what_are_llms'
```

### Working with Achievements

```javascript
import {
  ACHIEVEMENT_IDS,
  ACHIEVEMENT_CATEGORIES,
  ACHIEVEMENTS_METADATA,
  getAchievementsByCategory,
  getTotalAchievementPoints
} from './constants/achievements.js'

// Access achievement metadata
const firstSteps = ACHIEVEMENTS_METADATA[ACHIEVEMENT_IDS.FIRST_STEPS]
console.log(firstSteps.title) // "First Steps"
console.log(firstSteps.points) // 100
console.log(firstSteps.icon) // "🎯"

// Get all progress achievements
const progressAchievements = getAchievementsByCategory(
  ACHIEVEMENT_CATEGORIES.PROGRESS
)
console.log(`${progressAchievements.length} progress achievements`)

// Calculate gamification stats
const totalPoints = getTotalAchievementPoints()
console.log(`${totalPoints} total achievement points available`)

// Check achievement criteria
const achievement = ACHIEVEMENTS_METADATA[ACHIEVEMENT_IDS.FIRST_STEPS]
if (achievement.criteria.type === 'module_complete') {
  console.log(`Complete module ${achievement.criteria.moduleId}`)
}
```

### Combining Constants with Progress Data

```javascript
import { MODULE_IDS, MODULES_METADATA } from './constants/modules.js'
import { ACHIEVEMENT_IDS, ACHIEVEMENTS_METADATA } from './constants/achievements.js'
import { isModuleCompleted, hasAchievement } from './types/progress.js'

// Check if user should unlock achievement
if (isModuleCompleted(progressData, MODULE_IDS.MODULE_1)) {
  const achievement = ACHIEVEMENTS_METADATA[ACHIEVEMENT_IDS.FIRST_STEPS]
  
  if (!hasAchievement(progressData, ACHIEVEMENT_IDS.FIRST_STEPS)) {
    // Unlock "First Steps" achievement
    console.log(`🎉 Achievement unlocked: ${achievement.title}`)
  }
}
```

## Module Structure Summary

### Module 1: Introduction to LLMs (5 sections, ~36 minutes)
- What are LLMs?
- A Brief History
- Why They Matter
- Real-World Applications
- Basic Capabilities

**Learning Objectives:**
- Define what a Large Language Model is
- Understand the historical context of LLMs
- Identify real-world applications
- Recognize capabilities and limitations

### Module 2: Core Mechanics (9 sections, ~89 minutes)
**Tokenization:**
- Introduction to Tokenization
- The Tokenization Process
- Tokenization Examples

**Embeddings:**
- Introduction to Embeddings
- Embedding Vectors
- Semantic Similarity

**Attention:**
- Introduction to Attention
- Attention Mechanism
- Visualizing Attention

**Learning Objectives:**
- Understand how text is tokenized
- Explain embeddings and their importance
- Describe the attention mechanism
- Visualize attention patterns

**Prerequisites:** Module 1

### Module 3: Comprehensive Overview (11 sections, ~121 minutes)
**Architecture:**
- Architecture Overview
- Transformer Architecture
- Layers and Components

**Training:**
- Introduction to Training
- The Training Process
- Training Data
- Optimization Techniques

**Inference:**
- Introduction to Inference
- The Inference Process
- Inference Optimization

**Synthesis:**
- Putting It All Together

**Learning Objectives:**
- Understand transformer architecture
- Explain the training process
- Describe inference and text generation
- Identify optimization techniques
- Synthesize all concepts

**Prerequisites:** Modules 1 & 2

## Achievement Categories Summary

### Progress Achievements (3 total, 450 points)
Earned by completing modules

### Mastery Achievements (3 total, 225 points)
Earned by completing all sections perfectly

### Milestone Achievements (2 total, 575 points)
Earned by reaching overall progress milestones

### Engagement Achievements (4 total, 475 points)
Earned through consistent usage patterns

### Special Achievements (4 total, 350 points)
Hidden achievements for bonus challenges

**Total: 16 achievements, 2,075 points**

## Design Principles

1. **Immutability** - Constants never change at runtime
2. **Single Source of Truth** - All IDs defined in one place
3. **Type Safety** - String literals for IDs prevent typos
4. **Discoverability** - Descriptive names and exports
5. **Extensibility** - Easy to add new modules/sections/achievements
6. **Documentation** - Comprehensive JSDoc comments

## Adding New Content

### Adding a New Section
1. Add section ID to appropriate `MODULE_X_SECTIONS` object
2. Add section metadata to `MODULES_METADATA[moduleId].sections`
3. Update learning objectives if needed

### Adding a New Module
1. Add module ID to `MODULE_IDS`
2. Create new `MODULE_X_SECTIONS` object
3. Add metadata to `MODULES_METADATA`
4. Update prerequisites for dependent modules

### Adding a New Achievement
1. Add achievement ID to `ACHIEVEMENT_IDS`
2. Add metadata to `ACHIEVEMENTS_METADATA`
3. Define unlock criteria
4. Implement unlock logic in progress management

## Related Files

- `/src/types/progress.js` - Uses these constants for progress tracking
- `/src/pages/Module1.jsx`, `/src/pages/Module2.jsx`, `/src/pages/Module3.jsx` - Module pages
- `/src/components/layout/Header.jsx` - Module navigation
