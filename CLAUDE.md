# Claude Development Guide

## Project Overview

This is Alex Gap's personal website hosted at www.alexgap.ca. It's a React-based single-page application built with Vite that showcases projects, resume, and personal information.

## Tech Stack

- **Frontend Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 6.3.5
- **Styling**: Material-UI 6.5.0 + Emotion
- **Routing**: React Router DOM 7.8.1
- **Content**: React Markdown for resume rendering
- **Icons**: Material-UI Icons 6.5.0
- **Carousel**: Various carousel libraries for project showcase
- **Package Manager**: Yarn

## Project Structure

```
/Users/lagap/code/website/
├── src/
│   ├── main.tsx              # App entry point with routing setup
│   ├── index.css             # Global styles
│   ├── NavBar.tsx            # Navigation component
│   ├── Footer.tsx            # Footer component
│   └── routes/
│       ├── About.tsx         # Home/About page
│       ├── Resume.tsx        # Resume page (fetches from GitHub)
│       ├── Projects.tsx      # Projects showcase
├── public/                   # Static assets (images, icons)
├── convert-resume-plugin.ts  # Custom Vite plugin for PDF generation
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── eslint.config.js         # ESLint configuration (flat config format)
├── tailwind.config.js      # Tailwind CSS configuration
└── postcss.config.js       # PostCSS configuration
```

## Available Scripts

```bash
# Development
yarn dev              # Start development server

# Building
yarn build            # TypeScript compilation + Vite build

# Code Quality
yarn lint             # Run ESLint with TypeScript support
yarn format           # Format code with Prettier

# Preview
yarn preview          # Preview production build locally
```

## Key Features & Architecture

### 1. Resume Integration
- **Dynamic Resume Fetching**: The Resume component fetches the latest markdown from GitHub repo (lalexgap/resume)
- **PDF Generation**: Custom Vite plugin (`convert-resume-plugin.ts`) uses Pandoc to convert markdown to PDF
- **Auto-refresh**: PDF regenerates every 6 hours to ensure freshness

### 2. Material-UI Theme
- **Custom Theme** (`/Users/lagap/code/website/src/theme.ts`):
  - Primary color: `#294C60`
  - Background: `#a3d9ff`
  - Custom typography using 'Bungee Shade' font
  - Responsive design patterns

### 3. Routing Structure
- `/` and `/about` → About page
- `/resume` → Resume page (markdown + PDF download)
- `/projects` → Projects showcase with carousel

### 4. Component Architecture
- **Layout**: NavBar + main content + Footer pattern
- **Responsive**: Mobile-first design with MUI breakpoints
- **State Management**: Local state with React hooks (no global state)

## Development Guidelines

### Code Style
- **ESLint Config**: Flat config format (eslint.config.js) with TypeScript + React hooks + Prettier integration
- **TypeScript**: Strict mode enabled with comprehensive linting rules
- **Formatting**: Prettier with plugin integration

### Dependencies Management
- **Core Dependencies**: React, Material-UI, React Router, React Markdown
- **Build Tools**: Vite, TypeScript, ESLint, Prettier
- **No Testing Framework**: Currently no test setup (consider adding Jest/Vitest if tests needed)

### File Conventions
- **Components**: PascalCase `.tsx` files
- **Routes**: Organized in `/src/routes/` directory
- **Assets**: Static files in `/public/` directory
- **Styling**: Emotion/styled-components + MUI theme system

## External Dependencies

### Resume System
- **GitHub Integration**: Fetches from `https://raw.githubusercontent.com/lalexgap/resume/main/resume.md`
- **Pandoc Requirement**: System must have Pandoc installed for PDF generation
- **Generated Files**: PDFs stored in `./public/generated/resume.pdf`

### Font Dependencies
- **Google Fonts**: 'Bungee Shade' loaded via CDN in `index.html`
- **Material Icons**: Via `@mui/icons-material` package

## Development Workflow

### Starting Development
1. Install dependencies: `yarn install`
2. Ensure Pandoc is installed for resume PDF generation
3. Start dev server: `yarn dev`
4. Access at `http://localhost:5173`

### Making Changes
1. **UI Changes**: Modify components in `/src/routes/` or main components
2. **Styling**: Update theme in `/src/theme.ts` or component-level styling
3. **Content**: Projects data is hardcoded in `Projects.tsx`
4. **Resume**: Changes auto-sync from GitHub repository

### Building for Production
1. Run: `yarn build`
2. Output generated in `/dist/` directory
3. Preview: `yarn preview`

## Special Considerations

### Resume Plugin
- Custom Vite plugin handles resume PDF generation
- Requires Pandoc system dependency
- Implements caching with 6-hour refresh cycle
- Serves PDFs at `/resume.pdf` endpoint

### Image Assets
- Project images stored in `/public/` directory
- Referenced by filename in `Projects.tsx` component
- No image optimization currently implemented

### Performance
- No lazy loading implemented
- No code splitting beyond Vite defaults
- Consider adding if performance becomes an issue

## Common Tasks

### Adding New Project
1. Add image to `/public/` directory
2. Update projects array in `/Users/lagap/code/website/src/routes/Projects.tsx`

### Updating Styling
1. Global changes: `/Users/lagap/code/website/src/theme.ts`
2. Component-specific: Use MUI's `sx` prop or styled-components

### Adding New Route
1. Create component in `/src/routes/`
2. Add route to `/Users/lagap/code/website/src/main.tsx`
3. Update navigation in `/Users/lagap/code/website/src/NavBar.tsx`

## Troubleshooting

### PDF Generation Issues
- Ensure Pandoc is installed and accessible
- Check network access to GitHub for resume fetching
- Verify `/public/generated/` directory exists and is writable

### Build Issues
- Run `yarn lint` to check for TypeScript/ESLint errors
- Ensure all imports are correctly typed
- Check for missing dependencies

### ESLint Issues
- Project uses ESLint 9+ with flat config format (eslint.config.js)
- Legacy .eslintrc.* files are not supported
- Ensure React imports are explicit when using JSX

### Development Server Issues
- Clear Vite cache: Remove `node_modules/.vite/`
- Restart development server
- Check for port conflicts (default: 5173)