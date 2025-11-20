# Navigation Components

A comprehensive navigation system for the LLM Education App with progress tracking, responsive design, and smooth animations.

## Overview

The Navigation system provides:
- **AppHeader**: Enhanced navigation header with module links and status indicators
- **MobileMenu**: Touch-friendly slide-out navigation drawer
- **Breadcrumbs**: Contextual navigation trail showing current location
- **ModuleCard**: Interactive cards displaying module information and progress
- **LearningPathMap**: Visual journey map showing all modules in sequence

## Components

### AppHeader

Enhanced navigation header with main navigation links and module status indicators.

**Features:**
- Logo/branding with link to home
- Main navigation links (Home, Modules)
- Module status badges (completed ✓, in-progress ●, locked 🔒)
- Mobile menu toggle
- Theme-aware styling
- Responsive design

**Usage:**
```jsx
import { AppHeader } from '../components/Navigation'

<AppHeader showNav={true} />
```

**Props:**
- `showNav` (boolean): Whether to show navigation links (default: true)
- `className` (string): Additional CSS classes

### MobileMenu

Slide-out mobile navigation drawer with touch-friendly interface.

**Features:**
- Smooth slide-in/out animation
- Module navigation with status indicators
- Touch-optimized tap targets
- Backdrop overlay
- Keyboard support (Escape to close)
- Auto-close on navigation

**Usage:**
```jsx
import { MobileMenu } from '../components/Navigation'
import { useNavigation } from '../hooks'

function MyComponent() {
  const { isMobileMenuOpen, closeMobileMenu, navigationItems } = useNavigation()
  
  return (
    <MobileMenu
      isOpen={isMobileMenuOpen}
      onClose={closeMobileMenu}
      navigationItems={navigationItems}
    />
  )
}
```

**Props:**
- `isOpen` (boolean): Whether menu is visible (required)
- `onClose` (function): Callback when menu should close (required)
- `navigationItems` (array): Navigation items with module info (required)

### Breadcrumbs

Navigation breadcrumb trail showing current location hierarchy.

**Features:**
- Automatic breadcrumb generation from route
- Links to parent pages
- Current page highlighted (no link)
- Collapsible with ellipsis for long paths
- Animated transitions
- Responsive design

**Usage:**
```jsx
import { Breadcrumbs } from '../components/Navigation'

<Breadcrumbs maxItems={4} showHome={true} />
```

**Props:**
- `className` (string): Additional CSS classes
- `maxItems` (number): Maximum items before collapsing (default: 4)
- `showHome` (boolean): Whether to show home breadcrumb (default: true)

### ModuleCard

Card component for displaying module information with status and progress.

**Features:**
- Module title and description
- Status badge (completed, in-progress, locked)
- Progress bar with percentage
- Estimated time indicator
- Interactive hover effects
- Lock state with unlock message
- Keyboard accessible

**Usage:**
```jsx
import { ModuleCard } from '../components/Navigation'

<ModuleCard
  id={1}
  title="Module 1"
  description="Introduction to LLMs"
  status="in-progress"
  completionPercentage={45}
  estimatedMinutes={36}
  isLocked={false}
/>
```

**Props:**
- `id` (number): Module ID (required)
- `title` (string): Module title (required)
- `description` (string): Module description (required)
- `status` (string): Module status - 'completed', 'in-progress', or 'locked' (required)
- `completionPercentage` (number): Completion percentage 0-100 (default: 0)
- `estimatedMinutes` (number): Estimated time in minutes (default: 0)
- `isLocked` (boolean): Whether module is locked (default: false)
- `progress` (object): Progress data object
- `className` (string): Additional CSS classes
- `onClick` (function): Custom click handler

### LearningPathMap

Visual journey map showing all modules in sequence with progress visualization.

**Features:**
- Visual path/flow connecting modules
- Status indicators for each module
- Progress visualization
- Interactive module cards
- Locked/unlocked states
- Responsive design (horizontal scroll on mobile)
- Animated transitions
- Completion badge when all modules done

**Usage:**
```jsx
import { LearningPathMap } from '../components/Navigation'

<LearningPathMap variant="vertical" />
```

**Props:**
- `className` (string): Additional CSS classes
- `variant` (string): Layout variant - 'vertical' or 'horizontal' (default: 'vertical')

## Hooks

### useNavigation

Custom hook for navigation state management.

**Features:**
- Current location info and path parsing
- Breadcrumb generation
- Navigation items with progress status
- Module/section identification
- Navigation functions
- Mobile menu state
- Keyboard navigation support

**Usage:**
```jsx
import { useNavigation } from '../hooks'

function MyComponent() {
  const {
    pathname,
    breadcrumbs,
    navigationItems,
    currentModuleId,
    isActive,
    navigateToModule,
    goHome,
  } = useNavigation()
  
  return (
    <div>
      <h1>Current Module: {currentModuleId}</h1>
      {breadcrumbs.map(crumb => (
        <span key={crumb.path}>{crumb.label}</span>
      ))}
    </div>
  )
}
```

**Returns:**
- `location`: Current location object from React Router
- `pathname`: Current pathname
- `breadcrumbs`: Breadcrumb trail array
- `navigationItems`: Navigation items with progress status
- `currentModuleId`: Current module ID (or null)
- `currentSectionId`: Current section ID (or null)
- `isModulePage`: Whether on a module page
- `hideNavigation`: Whether navigation should be hidden
- `isMobileMenuOpen`: Mobile menu open state
- `isActive(path, exact)`: Check if route is active
- `navigateToModule(moduleId)`: Navigate to module
- `navigateToSection(moduleId, sectionId)`: Navigate to section
- `goToNextModule()`: Navigate to next module
- `goToPreviousModule()`: Navigate to previous module
- `goHome()`: Navigate to home/dashboard
- `toggleMobileMenu()`: Toggle mobile menu
- `closeMobileMenu()`: Close mobile menu

## Utilities

### navigationHelpers.js

Utility functions for navigation and routing.

**Functions:**
- `getBreadcrumbs(pathname, progress)`: Generate breadcrumb trail
- `getNavigationItems(progress)`: Get navigation items with status
- `isRouteActive(currentPath, targetPath, exact)`: Check if route is active
- `getModuleIdFromPath(pathname)`: Extract module ID from path
- `getSectionIdFromPath(pathname)`: Extract section ID from path
- `getUnlockMessage(moduleId, progress)`: Get unlock message for locked module
- `getNextModule(currentModuleId, progress)`: Get next module info
- `getPreviousModule(currentModuleId)`: Get previous module info
- `formatCompletionPercentage(percentage)`: Format percentage string
- `getKeyboardShortcuts()`: Get keyboard shortcut config
- `smoothScrollTo(elementId, offset)`: Smooth scroll to element
- `shouldHideNavigation(pathname)`: Check if navigation should be hidden

## Keyboard Navigation

The navigation system supports keyboard shortcuts:

- **Ctrl/Cmd + ←**: Navigate to previous module
- **Ctrl/Cmd + →**: Navigate to next module
- **Ctrl/Cmd + H**: Go to home
- **Ctrl/Cmd + M**: Toggle mobile menu
- **Escape**: Close mobile menu/modal
- **Tab**: Navigate through links
- **Enter/Space**: Activate focused element

## Responsive Design

### Desktop (> 768px)
- Full horizontal navigation bar
- All module links visible
- Breadcrumbs with full path

### Tablet (768px - 1024px)
- Condensed navigation links
- Smaller padding and gaps

### Mobile (< 768px)
- Hamburger menu toggle
- Slide-out navigation drawer
- Horizontal scrolling for learning path map
- Bottom navigation option

## Theme Integration

All navigation components are theme-aware and support:
- Male/Female/Neutral theme variants
- CSS custom properties for colors
- Dynamic color switching
- Consistent visual styling

## Accessibility

Navigation components follow accessibility best practices:
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Screen reader friendly
- Touch-friendly tap targets (min 48px)

## Animation

Smooth animations powered by Framer Motion:
- Page transitions (fade, slide)
- Mobile menu slide-in/out
- Breadcrumb stagger
- Module card hover effects
- Progress bar animations
- Path drawing animations

## Integration

### In App.jsx
```jsx
import { AnimatePresence } from 'framer-motion'
import { PageTransition } from './components'

<AnimatePresence mode="wait" initial={false}>
  <Routes location={location} key={location.pathname}>
    <Route path="/learn" element={
      <PageTransition variant="fade">
        <Learn />
      </PageTransition>
    } />
  </Routes>
</AnimatePresence>
```

### In AppLayout.jsx
```jsx
import { AppHeader } from '../Navigation'

<AppHeader showNav={true} />
```

### In Pages
```jsx
import { Breadcrumbs, LearningPathMap } from '../components/Navigation'

<Breadcrumbs />
<LearningPathMap variant="vertical" />
```

## Performance

The navigation system is optimized for performance:
- Memoized navigation items
- Lazy rendering for mobile menu
- Efficient re-renders with React.memo
- CSS transforms for animations
- Smooth 60fps animations

## Testing

Test navigation components with:
- Route navigation
- Progress state changes
- Mobile menu interactions
- Keyboard shortcuts
- Locked/unlocked states
- Theme switching

## Future Enhancements

Potential improvements:
- Search functionality in navigation
- Recent/favorite modules
- Notification badges
- Voice navigation commands
- Gesture support for mobile
- Customizable keyboard shortcuts
