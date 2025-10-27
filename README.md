# LLM Education App

An educational application powered by LLM technology for interactive learning experiences.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

### Build

Create a production build:
```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview

Preview the production build locally:
```bash
npm run preview
```

### Lint

Run ESLint to check code quality:
```bash
npm run lint
```

## Tech Stack

- **React 18** - UI library
- **Vite 5** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **JavaScript** - Programming language

## Project Structure

```
llm-education-app/
├── public/          # Static assets
├── src/             # Source files
│   ├── App.jsx      # Main App component
│   ├── main.jsx     # Entry point
│   └── index.css    # Global styles
├── index.html       # HTML template
├── vite.config.js   # Vite configuration
└── package.json     # Project metadata and dependencies
```

## Development Notes

- Hot Module Replacement (HMR) is enabled for rapid development
- The project uses JavaScript (not TypeScript) for simplicity
- React Router DOM is installed and ready for routing implementation

## Version

Current version: 0.1.0
