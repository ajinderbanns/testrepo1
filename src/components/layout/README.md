# Layout Components

This directory contains foundational layout components that provide consistent structure across the application.

## Components

### AppLayout
Root-level wrapper component that provides the main application structure.

**Props:**
- `children` (node): Content to be rendered in the main area
- `showHeader` (bool): Whether to display the header (default: true)
- `showFooter` (bool): Whether to display the footer (default: true)
- `showNav` (bool): Whether to show navigation in header (default: true)
- `className` (string): Additional CSS classes for the layout wrapper
- `contentClassName` (string): Additional CSS classes for the main content area

**Usage:**
```jsx
import { AppLayout } from '@/components/layout'

function MyPage() {
  return (
    <AppLayout>
      <h1>Page Content</h1>
    </AppLayout>
  )
}
```

### PageTransition
Framer Motion wrapper for smooth page-to-page animations.

**Props:**
- `children` (node, required): Content to be animated
- `variant` (string): Animation variant - 'fade', 'slideRight', 'slideLeft', or 'cinematic' (default: 'fade')
- `className` (string): Additional CSS classes
- `animatePresence` (bool): Whether to use AnimatePresence for exit animations (default: true)

**Animation Variants:**
- `fade`: Simple fade with subtle scale effect
- `slideRight`: Slide in from right, exit to left
- `slideLeft`: Slide in from left, exit to right
- `cinematic`: Cinematic fade with blur effect

**Usage:**
```jsx
import { PageTransition } from '@/components/layout'

function MyPage() {
  return (
    <PageTransition variant="fade">
      <h1>Page Content</h1>
    </PageTransition>
  )
}
```

### Header
Top navigation/branding component with responsive design.

**Props:**
- `showNav` (bool): Whether to show navigation links (default: true)
- `className` (string): Additional CSS classes

**Features:**
- Sticky positioning
- Responsive navigation
- Active link highlighting
- Mobile menu toggle (placeholder for future implementation)

**Usage:**
```jsx
import { Header } from '@/components/layout'

function MyLayout() {
  return <Header showNav={true} />
}
```

### Footer
Bottom section with optional credits/links.

**Props:**
- `className` (string): Additional CSS classes
- `showLinks` (bool): Whether to show footer links (default: true)

**Usage:**
```jsx
import { Footer } from '@/components/layout'

function MyLayout() {
  return <Footer showLinks={true} />
}
```

## Composable Layout Pattern

These components are designed to be composable. The recommended pattern is:

```jsx
import { AppLayout, PageTransition } from '@/components/layout'

function App() {
  return (
    <AppLayout>
      <PageTransition variant="fade">
        {/* Your page content here */}
      </PageTransition>
    </AppLayout>
  )
}
```

## Responsive Design

All layout components are responsive and work across:
- Desktop (1280px+)
- Tablet (768px - 1279px)
- Mobile (< 768px)

## Accessibility

- Components respect `prefers-reduced-motion` for animations
- Proper semantic HTML structure (header, main, footer, nav)
- ARIA labels where appropriate
- Keyboard navigation support

## Performance

- Hardware-accelerated animations for smooth 60fps performance
- `will-change` and `transform: translateZ(0)` for GPU acceleration
- Optimized animation durations and easing functions
- No layout shifts or flickers during transitions

## Theme Support

Components include theme-aware styling hooks and automatically adapt to:
- System color scheme preference (dark/light mode)
- Custom theme attributes (data-theme='dark' or 'light')

Design tokens will be added in a later task to provide comprehensive theming support.
