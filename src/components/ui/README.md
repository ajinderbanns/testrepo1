# UI Component Library

A comprehensive, theme-aware UI component library featuring Framer Motion animations and responsive design. All components automatically adapt to the male (Euphoria-inspired) and female (Summer I Turned Pretty-inspired) themes.

## Components

### Button
Versatile button component with multiple variants and loading states.

**Props:**
- `variant`: 'primary' | 'secondary' | 'tertiary' (default: 'primary')
- `size`: 'small' | 'medium' | 'large' (default: 'medium')
- `loading`: boolean (default: false)
- `disabled`: boolean (default: false)
- `fullWidth`: boolean (default: false)
- `type`: 'button' | 'submit' | 'reset' (default: 'button')

**Example:**
```jsx
import { Button } from '@/components/ui'

<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>

<Button variant="secondary" size="small" loading>
  Loading...
</Button>
```

### Card
Flexible container component with optional header and footer.

**Props:**
- `header`: ReactNode (optional header content)
- `footer`: ReactNode (optional footer content)
- `elevated`: boolean (default: false) - adds elevated shadow
- `hoverable`: boolean (default: false) - adds hover animation
- `padding`: 'none' | 'small' | 'medium' | 'large' (default: 'medium')
- `onClick`: function (makes card interactive)

**Example:**
```jsx
import { Card } from '@/components/ui'

<Card
  header={<h3>Card Title</h3>}
  footer={<Button>Action</Button>}
  elevated
  hoverable
>
  <p>Card content goes here</p>
</Card>
```

### Input
Text input with label, error states, and validation feedback.

**Props:**
- `label`: string (input label)
- `type`: string (default: 'text')
- `value`: string
- `onChange`: function
- `placeholder`: string
- `error`: string (error message)
- `helperText`: string (helper text)
- `disabled`: boolean (default: false)
- `required`: boolean (default: false)
- `fullWidth`: boolean (default: false)

**Example:**
```jsx
import { Input } from '@/components/ui'

<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter your email"
  required
/>

<Input
  label="Password"
  type="password"
  error="Password must be at least 8 characters"
/>
```

### Modal
Overlay component with backdrop blur and portal rendering.

**Props:**
- `isOpen`: boolean (required)
- `onClose`: function (required)
- `title`: string
- `size`: 'small' | 'medium' | 'large' | 'full' (default: 'medium')
- `closeOnBackdropClick`: boolean (default: true)
- `closeOnEscape`: boolean (default: true)
- `showCloseButton`: boolean (default: true)

**Example:**
```jsx
import { Modal } from '@/components/ui'

<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Confirm Action"
  size="medium"
>
  <p>Are you sure you want to proceed?</p>
  <Button onClick={handleConfirm}>Confirm</Button>
</Modal>
```

### Tooltip
Hover/focus-triggered informational popup with positioning.

**Props:**
- `content`: ReactNode (required - tooltip content)
- `position`: 'top' | 'bottom' | 'left' | 'right' (default: 'top')
- `delay`: number (delay in ms, default: 200)

**Example:**
```jsx
import { Tooltip } from '@/components/ui'

<Tooltip content="This is helpful information" position="top">
  <button>Hover me</button>
</Tooltip>

<Tooltip content="Additional details" position="right" delay={500}>
  <span>ℹ️</span>
</Tooltip>
```

### ProgressBar
Visual indicator for completion tracking with linear and circular variants.

**Props:**
- `value`: number (0-100, default: 0)
- `variant`: 'linear' | 'circular' (default: 'linear')
- `size`: 'small' | 'medium' | 'large' | number (default: 'medium')
- `showLabel`: boolean (default: false)
- `color`: 'primary' | 'secondary' | 'success' | 'warning' | 'error' (default: 'primary')

**Example:**
```jsx
import { ProgressBar } from '@/components/ui'

<ProgressBar value={75} showLabel />

<ProgressBar
  value={50}
  variant="circular"
  size={120}
  color="success"
  showLabel
/>
```

### Badge
Status indicators and labels for different states.

**Props:**
- `variant`: 'default' | 'completed' | 'in-progress' | 'locked' | 'success' | 'warning' | 'error' | 'info' (default: 'default')
- `size`: 'small' | 'medium' | 'large' (default: 'medium')
- `pill`: boolean (default: false) - pill-shaped badge

**Example:**
```jsx
import { Badge } from '@/components/ui'

<Badge variant="completed">Completed</Badge>
<Badge variant="in-progress" size="small">In Progress</Badge>
<Badge variant="locked">Locked</Badge>
<Badge variant="success" pill>New</Badge>
```

## Theme Integration

All components automatically read from the ThemeContext and adapt their styling based on the active theme:

- **Male Theme (Euphoria)**: Bold, high-contrast, neon accents with purple/blue/pink colors
- **Female Theme (Summer)**: Warm, soft tones with peachy/coral colors

Components use design tokens from:
- `theme.colors.*` - Color palettes
- `theme.spacing.*` - Spacing values
- `theme.typography.*` - Font sizes, weights, families
- `theme.radii.*` - Border radius values
- `theme.shadows.*` - Box shadow elevations
- `theme.transitions.*` - Animation timings

## Animations

All components feature Framer Motion animations:
- **Hover effects**: Subtle scale, glow, and color shifts
- **Click/tap feedback**: Scale animations on interaction
- **Enter/exit**: Smooth transitions for Modal and Tooltip
- **State transitions**: Animated changes for loading, error, and disabled states
- **Duration**: 200-300ms for optimal UX

## Accessibility

Components include:
- **Keyboard navigation**: Full keyboard support with focus management
- **ARIA labels**: Proper ARIA attributes for screen readers
- **Focus states**: Visible focus indicators
- **Semantic HTML**: Correct use of HTML elements and roles
- **Error announcements**: Screen reader announcements for errors

## Best Practices

1. **Import efficiently**: Use named imports from the barrel export
   ```jsx
   import { Button, Card, Input } from '@/components/ui'
   ```

2. **Consistent sizing**: Use size props to maintain visual hierarchy

3. **Theme awareness**: Let components handle theme styling automatically

4. **Loading states**: Always provide feedback for async operations
   ```jsx
   <Button loading={isSubmitting}>Submit</Button>
   ```

5. **Error handling**: Display clear error messages
   ```jsx
   <Input error={errors.email} />
   ```

6. **Accessibility**: Add appropriate labels and ARIA attributes
   ```jsx
   <Input label="Email" required />
   ```

## Responsive Design

All components are responsive and work seamlessly on:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)

Components automatically adjust:
- Font sizes on smaller screens
- Padding/spacing for touch targets
- Modal sizes to fit viewport
- Shadow intensity for different themes

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies

- React 18+
- Framer Motion 11+
- PropTypes (for prop validation)

## Future Enhancements

Potential additions to the component library:
- Dropdown/Select component
- Checkbox and Radio components
- Toggle/Switch component
- Tabs component
- Accordion component
- Alert/Notification component
- Skeleton loader component
