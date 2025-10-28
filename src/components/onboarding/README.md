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

- Next step: Theme preview and confirmation (ticket #39)
- Theme system: `/src/styles/themes/`
- UI components: `/src/components/ui/`
