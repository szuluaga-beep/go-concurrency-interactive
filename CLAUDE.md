# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive educational web application for teaching Go concurrency concepts. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. The app provides five educational sections with interactive visualizations to help students learn concurrency patterns in Go.

## Development Commands

```bash
# Development server (runs on http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code (uses Biome)
npm run lint

# Format code (uses Biome)
npm run format
```

## Architecture

### App Structure (Next.js App Router)

The application uses Next.js App Router with a sidebar-based navigation layout:

- **Root Layout** (`src/app/layout.tsx`): Wraps all pages with:
  - `ThemeProvider` for light/dark mode (using next-themes)
  - `SidebarProvider` and `AppSidebar` for persistent navigation
  - Public Sans font from Google Fonts

- **Pages** (5 educational sections):
  - `/` - Home/landing page
  - `/threads` - CPU threads visualization and education
  - `/why-go` - Reasons to learn Go for concurrency
  - `/visualization` - Interactive concurrency simulator
  - `/goroutines` - Goroutines concepts and examples
  - `/channels` - Channels concepts and patterns

### Component Architecture

**Interactive Visualizers:**
- `cpu-threads-visualizer.tsx` - Simulates CPU threads executing tasks from a queue
  - Uses React state management with refs for animation consistency
  - Demonstrates thread lifecycle: idle → executing → completed → reloaded
  - Interactive controls for thread count (1-8) and task queue management

**Layout Components:**
- `app-sidebar.tsx` - Main navigation sidebar
  - Uses Next.js `usePathname()` for active route detection
  - Navigation items defined in `navItems` array with icons from lucide-react
  - Displays route descriptions under menu items

**UI Components:**
- Located in `src/components/ui/` - shadcn/ui components
- Key components: Button, Card, Sidebar, Tabs, Tooltip, Separator, Sheet
- All follow Radix UI patterns with Tailwind CSS styling

### Styling System

- **Tailwind CSS v4** with custom color palette:
  - Primary: `#00825A` (dark green - Go branding)
  - Secondary: `#B0F2AE` (light green)
  - Accent: `#DFFF61` (yellow)
  - Info: `#99D1FC` (light blue)
- Theme tokens defined in `src/app/globals.css`
- Dark mode support via CSS variables
- Uses `clsx` and `tailwind-merge` for conditional class composition

### Path Aliases

TypeScript is configured with path alias `@/*` pointing to `src/*`:
```typescript
import { Button } from "@/components/ui/button";
```

## Code Quality

**Linting and Formatting:**
- Uses **Biome** (not ESLint/Prettier) for both linting and formatting
- Configuration in `biome.json`:
  - 2-space indentation
  - Recommended rules for Next.js and React domains
  - Import organization enabled
  - Ignores `noUnknownAtRules` for CSS

**TypeScript:**
- Strict mode enabled
- Target: ES2017
- JSX: react-jsx (React 19)
- All pages use `"use client"` directive for client-side interactivity

## Key Patterns

**State Management in Visualizers:**
When creating interactive animations, use the ref pattern from `cpu-threads-visualizer.tsx`:
```typescript
const [state, setState] = useState(initialValue);
const stateRef = useRef(initialValue);

useEffect(() => {
  stateRef.current = state;
}, [state]);
```
This ensures intervals/timeouts access current state values.

**Page Structure:**
Educational pages follow this pattern:
1. Page title and description
2. Conceptual explanation cards
3. Code examples with syntax highlighting
4. Interactive visualizations (where applicable)

**Navigation:**
All route changes should be added to `navItems` array in `src/components/app-sidebar.tsx` with:
- `title`: Display name
- `href`: Route path
- `icon`: Lucide icon component
- `description`: Optional tooltip text

## Dependencies

**Core:**
- Next.js 16.0.1 with React 19.2.0
- TypeScript 5
- Tailwind CSS v4

**UI:**
- shadcn/ui components (Radix UI primitives)
- lucide-react for icons
- next-themes for theme switching

**Dev Tools:**
- @biomejs/biome 2.2.0 for linting/formatting
- babel-plugin-react-compiler for React optimizations
