# Custom React Hooks

This directory contains custom React hooks for the LLM Education App. These hooks encapsulate common functionality and provide clean, reusable APIs for components.

## Available Hooks

### Progress Tracking Hooks

#### `useProgress`

Global progress management hook for tracking overall course progress, managing modules, and handling localStorage persistence.

**Purpose**: Centralized progress state management with automatic persistence

**Key Features**:
- Automatic localStorage synchronization
- Overall completion tracking
- Module status management
- Progress initialization and reset
- Error handling and rollback on failures
- Session tracking
- Achievement unlocking

**Basic Usage**:

```javascript
import { useProgress } from '../hooks'

function ProgressDashboard() {
  const {
    progress,
    isLoading,
    overallCompletion,
    markSectionComplete,
    getModuleList,
  } = useProgress('female')

  if (isLoading) return <p>Loading...</p>

  return (
    <div>
      <h1>Overall Progress: {overallCompletion}%</h1>
      {getModuleList().map(module => (
        <div key={module.id}>
          <h2>{module.title}</h2>
          <p>Status: {module.status}</p>
          <p>{module.completionPercentage}% complete</p>
        </div>
      ))}
    </div>
  )
}
```

**Return Values**:

| Property | Type | Description |
|----------|------|-------------|
| `progress` | `Object\|null` | Complete progress data object |
| `isLoading` | `boolean` | True during initial data load |
| `isInitialized` | `boolean` | True if progress data exists |
| `overallCompletion` | `number` | Overall completion percentage (0-100) |
| `error` | `Object\|null` | Error object if operation failed |
| `initialize(gender)` | `Function` | Initialize progress for new user |
| `reset()` | `Function` | Clear all progress data |
| `markSectionComplete(moduleId, sectionId)` | `Function` | Mark a section as complete |
| `markModuleComplete(moduleId)` | `Function` | Mark all sections in module complete |
| `updateCurrentPosition(moduleId, sectionId)` | `Function` | Update current location |
| `getModuleStatus(moduleId)` | `Function` | Get module status |
| `getModuleList()` | `Function` | Get array of all modules |
| `isModuleCompleted(moduleId)` | `Function` | Check if module completed |
| `isSectionCompleted(moduleId, sectionId)` | `Function` | Check if section completed |
| `getLastLocation()` | `Function` | Get last visited location |
| `unlockAchievement(achievementId)` | `Function` | Award achievement |
| `startSession()` | `Function` | Start tracking session |
| `endSession()` | `Function` | End tracking session |
| `getNextModule(currentModuleId)` | `Function` | Get next available module |

**Advanced Examples**:

```javascript
// Initialize progress for new user
function OnboardingFlow() {
  const { initialize, isInitialized } = useProgress()

  const handleGenderSelect = (gender) => {
    const success = initialize(gender)
    if (success) {
      navigate('/modules')
    }
  }

  return (
    <div>
      <button onClick={() => handleGenderSelect('male')}>Male</button>
      <button onClick={() => handleGenderSelect('female')}>Female</button>
    </div>
  )
}

// Mark section complete and navigate
function SectionViewer({ moduleId, sectionId }) {
  const { markSectionComplete, getNextModule } = useProgress()

  const handleComplete = () => {
    const success = markSectionComplete(moduleId, sectionId)
    if (success) {
      const nextModule = getNextModule(moduleId)
      if (nextModule) {
        navigate(`/module/${nextModule}`)
      }
    }
  }

  return <button onClick={handleComplete}>Complete Section</button>
}

// Track sessions
function App() {
  const { startSession, endSession } = useProgress('female')

  useEffect(() => {
    startSession()
    return () => endSession()
  }, [])

  return <div>App Content</div>
}
```

---

#### `useModuleProgress`

Module-specific progress hook for managing individual module completion, sections, and navigation.

**Purpose**: Focused module-level operations with section management

**Key Features**:
- Module-specific state management
- Section completion tracking
- Navigation helpers (next/previous section)
- Section status queries
- Automatic localStorage persistence
- Section metadata access

**Basic Usage**:

```javascript
import { useModuleProgress } from '../hooks'

function ModulePage({ moduleId }) {
  const {
    moduleData,
    status,
    completionPercentage,
    sections,
    markSectionComplete,
    getNextSection,
  } = useModuleProgress(moduleId)

  if (status === 'locked') {
    return <p>Complete previous modules to unlock</p>
  }

  return (
    <div>
      <h2>{moduleData.title}</h2>
      <progress value={completionPercentage} max={100} />
      
      {sections.map(section => (
        <div key={section.id}>
          <h3>{section.title}</h3>
          <span>{section.completed ? '✓' : '○'}</span>
          <button onClick={() => markSectionComplete(section.id)}>
            Mark Complete
          </button>
        </div>
      ))}
    </div>
  )
}
```

**Return Values**:

| Property | Type | Description |
|----------|------|-------------|
| `moduleData` | `Object\|null` | Current module progress data |
| `isLoading` | `boolean` | True during initial data load |
| `status` | `string` | Module status ('completed', 'in-progress', 'locked') |
| `completionPercentage` | `number` | Module completion (0-100) |
| `sections` | `Array<Object>` | Array of section progress objects |
| `completedSectionsCount` | `number` | Count of completed sections |
| `totalSectionsCount` | `number` | Total sections in module |
| `isCompleted` | `boolean` | True if module completed |
| `isLocked` | `boolean` | True if module locked |
| `isInProgress` | `boolean` | True if module in progress |
| `error` | `Object\|null` | Error object if operation failed |
| `markSectionComplete(sectionId)` | `Function` | Mark section complete |
| `isSectionCompleted(sectionId)` | `Function` | Check section completion |
| `getNextSection(sectionId)` | `Function` | Get next section |
| `getPreviousSection(sectionId)` | `Function` | Get previous section |
| `getSectionByIndex(index)` | `Function` | Get section by index |
| `getCurrentSectionIndex(sectionId)` | `Function` | Get section index |
| `isFirstSection(sectionId)` | `Function` | Check if first section |
| `isLastSection(sectionId)` | `Function` | Check if last section |
| `getFirstIncompleteSection()` | `Function` | Get first incomplete section |
| `getSectionProgress(sectionId)` | `Function` | Get section with metadata |

**Advanced Examples**:

```javascript
// Section navigation
function SectionViewer({ moduleId, sectionId }) {
  const {
    markSectionComplete,
    getNextSection,
    getPreviousSection,
    isFirstSection,
    isLastSection,
  } = useModuleProgress(moduleId)

  const handleNext = () => {
    markSectionComplete(sectionId)
    const next = getNextSection(sectionId)
    if (next) {
      navigate(`/module/${moduleId}/section/${next.id}`)
    }
  }

  const handlePrevious = () => {
    const prev = getPreviousSection(sectionId)
    if (prev) {
      navigate(`/module/${moduleId}/section/${prev.id}`)
    }
  }

  return (
    <div>
      <button onClick={handlePrevious} disabled={isFirstSection(sectionId)}>
        Previous
      </button>
      <button onClick={handleNext} disabled={isLastSection(sectionId)}>
        Next
      </button>
    </div>
  )
}

// Resume from last incomplete section
function ModuleResume({ moduleId }) {
  const { getFirstIncompleteSection } = useModuleProgress(moduleId)

  const handleResume = () => {
    const section = getFirstIncompleteSection()
    if (section) {
      navigate(`/module/${moduleId}/section/${section.id}`)
    } else {
      // All sections complete
      navigate(`/module/${moduleId}/complete`)
    }
  }

  return <button onClick={handleResume}>Resume Module</button>
}

// Section list with metadata
function SectionList({ moduleId }) {
  const { sections, getSectionProgress, isSectionCompleted } = useModuleProgress(moduleId)

  return (
    <ul>
      {sections.map(section => {
        const progress = getSectionProgress(section.id)
        return (
          <li key={section.id}>
            <h4>{progress.title}</h4>
            <p>{progress.description}</p>
            <span>{progress.estimatedMinutes} minutes</span>
            <span>{isSectionCompleted(section.id) ? '✓' : '○'}</span>
          </li>
        )
      })}
    </ul>
  )
}
```

---

### Other Hooks

#### `useTheme`

Access theme context (colors, typography, spacing).

**Usage**:
```javascript
const { theme, themeName, switchTheme } = useTheme()
```

#### `useGenderPreference`

Manage gender preference with localStorage persistence.

**Usage**:
```javascript
const { gender, setGender, isFirstVisit } = useGenderPreference()
```

---

## Best Practices

### 1. Error Handling

Always check for errors and handle them gracefully:

```javascript
const { markSectionComplete, error } = useProgress()

const handleComplete = () => {
  const success = markSectionComplete(moduleId, sectionId)
  if (!success && error) {
    console.error('Failed to save progress:', error.message)
    showNotification('Progress could not be saved. Please try again.')
  }
}
```

### 2. Loading States

Always handle loading states for better UX:

```javascript
const { progress, isLoading } = useProgress()

if (isLoading) {
  return <LoadingSpinner />
}

if (!progress) {
  return <OnboardingScreen />
}

return <MainContent />
```

### 3. Optimistic Updates

The hooks implement optimistic updates with automatic rollback on save failures. No additional handling needed:

```javascript
// This updates UI immediately, and rolls back if save fails
markSectionComplete(moduleId, sectionId)
```

### 4. Multiple Components

Multiple components can use these hooks simultaneously without conflicts. Each hook manages its own state and syncs with localStorage:

```javascript
// Component A
function HeaderProgress() {
  const { overallCompletion } = useProgress()
  return <ProgressBar value={overallCompletion} />
}

// Component B
function SectionPage() {
  const { markSectionComplete } = useProgress()
  return <button onClick={() => markSectionComplete(1, 'intro')}>Complete</button>
}
```

### 5. Performance Considerations

Hooks use `useMemo` and `useCallback` to prevent unnecessary re-renders:

```javascript
// This won't cause re-renders unless progress actually changes
const { getModuleList, isModuleCompleted } = useProgress()
```

---

## Data Persistence

### LocalStorage Structure

Progress data is stored in localStorage with the key `llm_edu_progress`:

```json
{
  "version": 1,
  "gender": "female",
  "lastUpdated": "2024-01-15T12:00:00.000Z",
  "currentModule": 1,
  "currentSection": "intro_what_are_llms",
  "modules": {
    "1": {
      "id": 1,
      "title": "Introduction to LLMs",
      "status": "in-progress",
      "sections": [
        {
          "id": "intro_what_are_llms",
          "title": "What are LLMs?",
          "completed": true,
          "completedAt": "2024-01-15T12:00:00.000Z"
        }
      ],
      "completionPercentage": 20,
      "startedAt": "2024-01-15T11:00:00.000Z",
      "completedAt": null
    }
  },
  "achievements": [],
  "sessionHistory": [],
  "preferences": {
    "animationSpeed": "normal",
    "autoplayAnimations": true
  }
}
```

### Data Validation

The hooks automatically:
- Validate data structure on load
- Handle corrupted data gracefully
- Migrate old schema versions
- Provide fallbacks for missing data

### Storage Failures

If localStorage is unavailable (private browsing, quota exceeded):
- Hooks will still function with in-memory state
- Error objects will indicate storage failures
- UI should inform users that progress won't persist

---

## Testing

### Testing with Progress Hooks

```javascript
import { renderHook, act } from '@testing-library/react'
import { useProgress } from './useProgress'

test('marks section as complete', () => {
  const { result } = renderHook(() => useProgress('female'))
  
  act(() => {
    result.current.markSectionComplete(1, 'intro_what_are_llms')
  })
  
  expect(result.current.isSectionCompleted(1, 'intro_what_are_llms')).toBe(true)
})
```

### Resetting Progress for Testing

```javascript
import { useProgress } from './useProgress'

function TestResetButton() {
  const { reset } = useProgress()
  
  return <button onClick={reset}>Reset All Progress</button>
}
```

---

## Dependencies

These hooks depend on:

- **Utils**: `/src/utils/progressManager.js` - Progress utility functions
- **Types**: `/src/types/progress.js` - Progress data schema and validation
- **Constants**: `/src/constants/modules.js` - Module metadata and IDs

---

## Migration Notes

If the progress data schema changes in the future:

1. Update `SCHEMA_VERSION` in `/src/types/progress.js`
2. Implement migration logic in `migrateProgressData()`
3. The hooks will automatically migrate data on load
4. Users' progress will be preserved during migration

---

## Support

For issues, questions, or feature requests related to these hooks, refer to:

- Progress data structure: `/src/types/progress.js`
- Progress utilities: `/src/utils/progressManager.js`
- Module definitions: `/src/constants/modules.js`
