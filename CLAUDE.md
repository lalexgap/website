# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for Alex Gap hosted at www.alexgap.ca - a React-based single-page application built with Vite that showcases projects, resume, and personal information.

## Tech Stack

- **React 19.1.1** with TypeScript 5.9.2
- **Vite 6.3.5** as build tool
- **Material-UI 6.5.0** for components and styling
- **React Router DOM 7.8.1** for routing
- **React Markdown 9.1.0** for resume rendering

## Commands

```bash
yarn dev              # Start development server on port 5173
yarn build            # TypeScript compilation + Vite build
yarn lint             # ESLint with TypeScript support
yarn format           # Format code with Prettier
yarn preview          # Preview production build
```

## Architecture

### Routing Structure
- `/` and `/about` → About page
- `/resume` → Dynamic resume from GitHub with PDF download
- `/projects` → Projects showcase

### Resume System
- **Dynamic Fetching**: Resume component fetches markdown from `https://raw.githubusercontent.com/lalexgap/resume/main/resume.md`
- **PDF Generation**: Custom Vite plugin (`convert-resume-plugin.ts`) uses Pandoc to convert markdown to PDF
- **Caching**: PDF regenerates every 6 hours, served at `/resume.pdf` endpoint
- **Requirements**: System must have Pandoc installed

### Theme Configuration
Located in `src/theme.ts`:
- Primary color: `#294C60`
- Background: `#a3d9ff`
- Typography: 'Bungee Shade' font for headers
- Custom text colors and MUI theme overrides

### Key Files
- `src/main.tsx` - App entry with routing setup
- `src/routes/` - Page components (About, Resume, Projects)
- `convert-resume-plugin.ts` - Vite plugin for PDF generation
- `eslint.config.js` - ESLint 9+ flat config with TypeScript/React/Prettier

## Development Notes

- **ESLint**: Uses flat config format (ESLint 9+), not legacy .eslintrc
- **Node Requirement**: Node >=22.0.0
- **Package Manager**: Yarn
- **No Test Framework**: Currently no testing setup