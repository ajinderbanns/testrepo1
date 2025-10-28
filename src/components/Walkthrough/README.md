# Walkthrough Components

Interactive tutorial overlay system for guiding users through the application on their first visit.

## Overview

The Walkthrough system provides a multi-step tutorial that:
- Automatically displays on first visit after gender selection
- Can be manually accessed via help button
- Features smooth Framer Motion animations
- Is fully mobile responsive
- Tracks completion status in LocalStorage

## Components

### WalkthroughOverlay

Main overlay component that handles the full-screen tutorial experience.

**Props:**
- `isOpen` (boolean): Controls visibility
- `currentStep` (number): Current step index (0-based)
- `totalSteps` (number): Total number of steps
- `onNext` (function): Handler for next button
- `onPrevious` (function): Handler for previous button
- `onSkip` (function): Handler for skip button
- `onClose` (function): Handler for close button
- `onStepClick` (function): Optional handler for progress dot clicks

**Features:**
- Portal rendering to body
- Backdrop with blur effect
- Escape key support
- Body scroll lock when open
- Progress indicator
- Navigation controls

### WalkthroughStep

Renders individual step content with animations.

**Props:**
- `step` (object): Step data containing title, content, icon, features, etc.

**Features:**
- Icon animations
- Multiple animation variants (slide-up, slide-left, zoom-in, pulse, etc.)
- Feature list with staggered animations
- Theme-aware styling

### WalkthroughProgress

Progress indicator showing current step position.

**Props:**
- `currentStep` (number): Current step index
- `totalSteps` (number): Total number of steps
- `onDotClick` (function): Optional callback for dot clicks

**Features:**
- Visual progress dots
- Active state highlighting
- Clickable dots for navigation (optional)
- Accessibility support

## Hook: useWalkthrough

Custom hook for managing walkthrough state.

**Options:**
- `autoShow` (boolean): Automatically show if not completed (default: false)

**Returns:**
```javascript
{
  isVisible,           // Whether overlay is visible
  isCompleted,         // Whether user completed walkthrough
  isLoading,           // Loading state during initialization
  currentStep,         // Current step index
  totalSteps,          // Total number of steps
  isFirstStep,         // Boolean flag
  isLastStep,          // Boolean flag
  showWalkthrough,     // Function to show overlay
  hideWalkthrough,     // Function to hide overlay
  completeWalkthrough, // Function to mark as completed
  skipWalkthrough,     // Function to skip (marks as completed)
  resetWalkthroughStatus, // Function to reset completion status
  goToNextStep,        // Navigate to next step
  goToPreviousStep,    // Navigate to previous step
  goToStep,            // Jump to specific step
  storageAvailable,    // Whether localStorage is available
}
```

## Usage

### Basic Implementation

```jsx
import { WalkthroughOverlay } from '../components/Walkthrough'
import { useWalkthrough } from '../hooks/useWalkthrough'

function MyPage() {
  const {
    isVisible,
    currentStep,
    totalSteps,
    showWalkthrough,
    goToNextStep,
    goToPreviousStep,
    skipWalkthrough,
    goToStep,
  } = useWalkthrough({ autoShow: true })

  return (
    <div>
      {/* Help button for manual access */}
      <button onClick={showWalkthrough}>
        Show Tutorial
      </button>

      {/* Your page content */}
      <YourContent />

      {/* Walkthrough overlay */}
      <WalkthroughOverlay
        isOpen={isVisible}
        currentStep={currentStep}
        totalSteps={totalSteps}
        onNext={goToNextStep}
        onPrevious={goToPreviousStep}
        onSkip={skipWalkthrough}
        onClose={skipWalkthrough}
        onStepClick={goToStep}
      />
    </div>
  )
}
```

### Auto-show on First Visit

The walkthrough automatically appears for first-time users when `autoShow: true` is passed to the hook:

```jsx
const walkthrough = useWalkthrough({ autoShow: true })
```

### Manual Trigger

Users can manually open the walkthrough anytime:

```jsx
<button onClick={walkthrough.showWalkthrough}>
  Show Tutorial
</button>
```

## Content Configuration

Walkthrough steps are defined in `/src/data/walkthroughContent.js`:

```javascript
export const walkthroughSteps = [
  {
    id: 'welcome',
    title: 'Welcome!',
    content: 'Description text...',
    icon: '👋',
    animation: 'fade-in',
    features: [
      '✨ Feature 1',
      '🚀 Feature 2',
    ],
  },
  // More steps...
]
```

### Animation Types

- `fade-in`: Simple fade animation
- `slide-up`: Slide up from bottom
- `slide-left`: Slide in from right
- `slide-right`: Slide in from left
- `zoom-in`: Scale up animation
- `pulse`: Pulsing scale animation
- `bounce`: Bouncing animation

## LocalStorage

The walkthrough uses LocalStorage to track completion status:

**Key:** `llm_edu_walkthrough_completed`

**Data Structure:**
```json
{
  "completed": true,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Utilities

```javascript
import {
  saveWalkthroughCompleted,
  isWalkthroughCompleted,
  resetWalkthrough,
  getWalkthroughMetadata,
} from '../utils/walkthroughStorage'

// Mark as completed
saveWalkthroughCompleted()

// Check if completed
const completed = isWalkthroughCompleted()

// Reset (for testing or replay)
resetWalkthrough()

// Get metadata
const meta = getWalkthroughMetadata()
// { completed: true, timestamp: "..." }
```

## Accessibility

- Full keyboard navigation support
- ARIA labels and roles
- Screen reader announcements
- Focus management
- Escape key to close

## Mobile Responsive

- Touch-friendly controls
- Responsive layout
- Appropriate sizing for mobile screens
- Smooth touch interactions

## Edge Cases Handled

1. **LocalStorage unavailable**: Gracefully degrades
2. **Browser closed mid-walkthrough**: State preserved
3. **Cleared storage**: Walkthrough shows again
4. **Returning users**: Can manually trigger via help button
5. **Multiple tabs**: Each tab maintains independent state

## Styling

Components use the theme system for consistent styling:
- Theme colors from `useTheme` hook
- Responsive spacing
- Smooth transitions
- Blur backdrop effect
- Professional shadows

## Best Practices

1. Keep step content concise (2-3 sentences max)
2. Use icons/emojis for visual appeal
3. Limit features list to 3-5 items per step
4. Test on mobile devices
5. Ensure animations are smooth
6. Test with different themes
7. Handle edge cases (storage disabled, etc.)

## Testing

To test the walkthrough:

```javascript
// Reset walkthrough status
import { resetWalkthrough } from '../utils/walkthroughStorage'
resetWalkthrough()

// Reload page to trigger auto-show
```

## Future Enhancements

Potential improvements:
- Spotlight highlighting for UI elements
- Interactive hotspots
- Video/GIF support
- Multi-language support
- Analytics tracking
- Custom positioning per step
- Skip with confirmation modal
