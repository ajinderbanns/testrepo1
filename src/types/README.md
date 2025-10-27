# Progress Tracking Types and Schema

This directory contains the comprehensive type definitions and schema design for the LLM Education App's progress tracking system using LocalStorage.

## Overview

The progress tracking system uses a structured schema stored in LocalStorage under the key `llm_edu_progress`. The schema supports:

- **Module and section completion tracking**
- **Achievement and milestone unlocking**
- **Session history and analytics**
- **User preferences and customization**
- **Schema versioning for future migrations**

## Files

### `progress.js`
Contains all type definitions (JSDoc), helper functions, and validation logic for progress tracking.

**Key Exports:**
- `PROGRESS_STORAGE_KEY` - LocalStorage key constant
- `SCHEMA_VERSION` - Current schema version (1)
- Type definitions (JSDoc):
  - `ProgressData` - Root progress object
  - `ModuleProgress` - Module completion tracking
  - `SectionProgress` - Section completion tracking
  - `Achievement` - Unlocked achievement data
  - `SessionRecord` - Session history entry
  - `UserPreferences` - User settings
- Factory functions:
  - `createInitialProgress(gender)` - Create fresh progress object
  - `createInitialModule(moduleId, isLocked)` - Create module progress
  - `createInitialSection(sectionId, title)` - Create section progress
  - `createDefaultPreferences()` - Create default preferences
- Utility functions:
  - `calculateModuleCompletion(moduleProgress)` - Get module completion %
  - `calculateOverallCompletion(progressData)` - Get overall completion %
  - `validateProgressData(data)` - Validate schema structure
  - `migrateProgressData(data)` - Migrate old schema versions
- Query functions:
  - `isModuleUnlocked(progressData, moduleId)` - Check unlock status
  - `isModuleCompleted(progressData, moduleId)` - Check completion
  - `isSectionCompleted(progressData, moduleId, sectionId)` - Check section
  - `hasAchievement(progressData, achievementId)` - Check achievement
  - `hasActiveSession(progressData)` - Check for ongoing session

## Schema Structure

```javascript
{
  version: 1,
  gender: "male" | "female",
  lastUpdated: "ISO8601 timestamp",
  currentModule: 1 | 2 | 3,
  currentSection: "string_identifier" | null,
  modules: {
    1: {
      id: 1,
      title: "Introduction to LLMs",
      status: "completed" | "in-progress" | "locked",
      sections: [
        {
          id: "intro_what_are_llms",
          title: "What are LLMs?",
          completed: true,
          completedAt: "ISO8601 timestamp" | null
        }
        // ... more sections
      ],
      completionPercentage: 100,
      startedAt: "ISO8601 timestamp" | null,
      completedAt: "ISO8601 timestamp" | null
    }
    // ... modules 2 and 3
  },
  achievements: [
    {
      id: "first_module_complete",
      title: "First Steps",
      unlockedAt: "ISO8601 timestamp"
    }
  ],
  sessionHistory: [
    {
      sessionStart: "ISO8601 timestamp",
      sessionEnd: "ISO8601 timestamp" | null,
      modulesVisited: [1, 2]
    }
  ],
  preferences: {
    animationSpeed: "normal" | "fast" | "slow",
    autoplayAnimations: true | false
  }
}
```

## Usage Examples

### Creating Initial Progress

```javascript
import { createInitialProgress } from './types/progress.js'

// Create fresh progress for a new user
const progress = createInitialProgress('female')
```

### Validating Loaded Data

```javascript
import { validateProgressData } from './types/progress.js'

const loadedData = JSON.parse(localStorage.getItem('llm_edu_progress'))
const validation = validateProgressData(loadedData)

if (!validation.valid) {
  console.error('Invalid progress data:', validation.errors)
  // Handle invalid data (reset, migrate, etc.)
}
```

### Calculating Progress

```javascript
import { 
  calculateModuleCompletion,
  calculateOverallCompletion 
} from './types/progress.js'

// Get completion for specific module
const module1Completion = calculateModuleCompletion(progressData.modules[1])
console.log(`Module 1: ${module1Completion}% complete`)

// Get overall course completion
const overallCompletion = calculateOverallCompletion(progressData)
console.log(`Overall: ${overallCompletion}% complete`)
```

### Checking Status

```javascript
import { 
  isModuleUnlocked,
  isModuleCompleted,
  isSectionCompleted,
  hasAchievement
} from './types/progress.js'

// Check if Module 2 is unlocked
if (isModuleUnlocked(progressData, 2)) {
  console.log('Module 2 is available!')
}

// Check if a section is completed
if (isSectionCompleted(progressData, 1, 'intro_what_are_llms')) {
  console.log('Section completed!')
}

// Check if user has earned an achievement
if (hasAchievement(progressData, 'first_steps')) {
  console.log('Achievement unlocked!')
}
```

## Migration Strategy

The schema includes a `version` field for future updates:

```javascript
import { migrateProgressData } from './types/progress.js'

// Automatically migrate old schema to current version
const loadedData = JSON.parse(localStorage.getItem('llm_edu_progress'))
const migratedData = migrateProgressData(loadedData)
```

Migration functions will be added as needed when schema changes occur.

## Type Safety

Although this is a JavaScript project, JSDoc type definitions provide:

- **IntelliSense** in VS Code and other IDEs
- **Type checking** with `@ts-check` comments
- **Documentation** for all data structures
- **Autocomplete** for object properties

To enable type checking in a file:

```javascript
// @ts-check
import { ProgressData } from './types/progress.js'

/** @type {ProgressData} */
const progress = createInitialProgress('male')
```

## Related Files

- `/src/constants/modules.js` - Module and section ID definitions
- `/src/constants/achievements.js` - Achievement definitions
- `/src/utils/localStorage.js` - Existing gender preference storage (to be extended)

## Future Extensibility

The schema is designed to support:

- ✅ Adding new modules (just update MODULE_IDS and MODULES_METADATA)
- ✅ Adding new sections within modules
- ✅ Adding new achievement types and criteria
- ✅ Adding new user preferences
- ✅ Adding new session metrics
- ✅ Schema version migrations for breaking changes

## Notes

- All timestamps use ISO 8601 format for consistency and timezone support
- Completion percentages are integers (0-100) for simplicity
- Module status enum ensures valid states only
- First module (Module 1) starts unlocked by default
- Sessions can be ongoing (sessionEnd = null) or completed
