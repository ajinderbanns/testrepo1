# Onboarding Components

This directory contains components for the user onboarding flow.

## GenderSelection

Interactive gender/theme selection component with visual theme previews.

### Features

- **Two Theme Options**: Bold & Vibrant (male theme) and Warm & Inviting (female theme)
- **Visual Previews**: Each card showcases the theme with:
  - Animated gradient backgrounds
  - Color swatches
  - Sample UI elements (buttons, badges, text)
- **Smooth Animations**: Built with Framer Motion
  - Entrance animations
  - Hover effects (lift, scale, glow)
  - Selection animations with checkmark
- **Responsive Design**: Stacks vertically on mobile, side-by-side on desktop
- **Accessibility**: Full keyboard navigation, ARIA labels, reduced motion support
- **Explanation Tooltip**: "Why we ask this" button with informative tooltip

### Usage

```jsx
import { GenderSelection } from '@/components/onboarding'

function OnboardingPage() {
  const handleSelection = (gender) => {
    console.log('Selected theme:', gender) // 'male' or 'female'
    // Handle selection (e.g., navigate to next step)
  }

  return (
    <div>
      <GenderSelection onSelect={handleSelection} />
    </div>
  )
}
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onSelect` | `function` | No | Callback when a theme is selected. Receives gender string ('male' or 'female') |
| `className` | `string` | No | Additional CSS classes |

### Theme Descriptions

#### Bold & Vibrant (Male Theme)
- **Aesthetic**: Euphoria-inspired, high contrast, neon accents
- **Colors**: Purple (#9333EA), Blue (#3B82F6), Hot Pink (#EC4899), Orange (#F97316)
- **Style**: Modern, edgy, energetic, dramatic
- **Typography**: Bold, modern sans-serif

#### Warm & Inviting (Female Theme)
- **Aesthetic**: Summer/Sex Ed-inspired, soft, warm, comforting
- **Colors**: Coral (#FF7F50), Pink (#FFB6C1), Yellow (#FFD93D), Peach (#FFDAB9)
- **Style**: Friendly, approachable, youthful, optimistic
- **Typography**: Friendly, warm sans-serif

### Design Philosophy

- **Equal Prominence**: Both options presented with equal visual weight
- **No Default Selection**: User must make an explicit choice
- **Visual Feedback**: Clear hover and selection states
- **Significant but Not Overwhelming**: Selection feels important but pressure-free
- **Touch-Friendly**: Large tap targets and smooth touch interactions on mobile

### State Management

The component manages selection state internally but **does not persist** the choice. The selection is passed to the parent component via the `onSelect` callback, where it should be:
1. Stored temporarily in the onboarding flow state
2. Confirmed in the next step (ticket #39)
3. Persisted to storage/backend after confirmation

### Accessibility

- **Keyboard Navigation**: Full support for Enter/Space key selection
- **ARIA Labels**: Descriptive labels for screen readers
- **Focus Management**: Clear focus indicators
- **Reduced Motion**: Respects `prefers-reduced-motion` preference
- **High Contrast**: Enhanced borders in high contrast mode
- **Color Independence**: Does not rely solely on color for information

### Browser Support

- Modern browsers with CSS Grid support
- Framer Motion requires JavaScript
- Fallbacks for browsers without backdrop-filter

### Related

- Next step: Theme preview and confirmation (ThemePreview component)
- Theme system: `/src/styles/themes/`
- UI components: `/src/components/ui/`

---

## ThemePreview

Full-screen preview component showing selected theme applied to sample learning content.

### Features

- **Full-Screen Immersive Preview**: Shows authentic representation of learning interface
- **Sample Content**: Includes module card, typography, UI elements, and visualization
- **Theme Application**: Applies exact theme colors and styling using theme system
- **Confirmation Flow**: Persists gender preference to localStorage on confirmation
- **Back Navigation**: Returns to gender selection if user wants to change
- **Smooth Animations**: Framer Motion entrance and exit transitions
- **Responsive Design**: Works across all device sizes

### Usage

```jsx
import { ThemePreview } from '@/components/onboarding'

function OnboardingFlow() {
  const [selectedGender, setSelectedGender] = useState('female')
  
  const handleConfirm = () => {
    navigate('/learn')
  }
  
  const handleBack = () => {
    setStep('selection')
  }
  
  return (
    <ThemePreview
      selectedGender={selectedGender}
      onConfirm={handleConfirm}
      onBack={handleBack}
    />
  )
}
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `selectedGender` | `'male' \| 'female'` | Yes | The theme to preview |
| `onConfirm` | `function` | No | Callback when user confirms selection. Defaults to navigating to /learn |
| `onBack` | `function` | Yes | Callback when user wants to go back to selection |
| `className` | `string` | No | Additional CSS classes |

### Sample Content Includes

- **Module Card**: Realistic module preview with badge, title, description
- **Visualization**: Abstract SVG representation of data flow
- **UI Elements**: Buttons, badges in selected theme
- **Typography Samples**: Heading and body text examples
- **Colors**: Full color palette representation

### LocalStorage Persistence

The component automatically saves the gender preference to localStorage using `saveGenderPreference()` when the user clicks the confirmation button. This ensures the preference persists across sessions.

### Accessibility

- **Keyboard Navigation**: Back button supports keyboard interaction
- **ARIA Labels**: Descriptive labels for screen readers
- **Reduced Motion**: Respects `prefers-reduced-motion` preference
- **High Contrast**: Supports high contrast mode

---

## OnboardingFlow

Multi-step orchestrator component that manages the complete onboarding experience.

### Features

- **Step-based Flow Management**: Handles transitions between selection and preview steps
- **State Management**: Tracks selected gender and current step
- **Auto-redirect**: Redirects returning users who already have preferences
- **Smooth Transitions**: Framer Motion page transitions between steps
- **Back Navigation**: Supports returning to previous step

### Usage

```jsx
import { OnboardingFlow } from '@/components/onboarding'

function Landing() {
  return (
    <div className="landing-page">
      <OnboardingFlow />
    </div>
  )
}
```

### Flow Steps

1. **Gender Selection**: User chooses between male or female theme
2. **Theme Preview**: User sees full-screen preview of selected theme and confirms
3. **Navigation**: User is redirected to /learn after confirmation

### Props

The component doesn't accept props - it manages its own state and navigation.

### Implementation Details

- Checks for existing preference on mount
- Manages step transitions with AnimatePresence
- Passes callbacks between steps
- Handles final navigation after confirmation
