# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Adorably.online is a React-based UI prompt catalog showcasing 51 premium design effects. Users can browse, preview live interactive examples, copy prompts/code, and optionally generate new code via Gemini AI.

## Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Setup

Set `GEMINI_API_KEY` in `.env.local` for AI code generation features.

## Architecture

### Tech Stack
- React 19 with TypeScript
- React Router DOM v7 for routing
- Vite for bundling
- Tailwind CSS (loaded via CDN in index.html with custom config)
- Gemini AI (@google/genai) for code generation
- lucide-react for icons

### File Structure
```
├── App.tsx              # Router setup with BrowserRouter and Routes
├── index.tsx            # React entry point
├── types.ts             # TypeScript interfaces (DesignPrompt, User, GeneratedCodeResponse)
├── constants.ts         # DESIGN_PROMPTS array (51 prompt definitions)
├── exampleCode.ts       # CODE_EXAMPLES map (prompt ID → static code strings)
├── context/
│   └── AppContext.tsx   # Global state (theme, user, favorites, auth modal)
├── pages/
│   ├── HomePage.tsx     # Catalog view with search, filters, grid/list view
│   └── PromptDetailPage.tsx # Single prompt detail with live demo, code viewer
├── components/
│   ├── Layout.tsx       # Shared layout with header, footer, auth modal
│   ├── PromptCard.tsx   # Card display (grid/list view modes)
│   ├── PromptDetail.tsx # (Legacy) Full detail view component
│   ├── LiveExamples.tsx # Live preview components (one per prompt)
│   ├── CodeViewer.tsx   # Code display with static/AI generation modes
│   └── AuthModal.tsx    # Mock authentication modal
├── services/
│   └── geminiService.ts # Gemini API integration
└── index.html           # Tailwind config, custom animations, importmap
```

### Routes
- `/` - Home page with catalog, search, and filters
- `/prompt/:id` - Prompt detail page with live demo and code viewer

### Key Patterns

**Global State**: `AppContext` provides theme (dark/light), user authentication, favorites management, and auth modal state via React Context.

**Prompt Data Flow**: `constants.ts` defines prompts → `HomePage` filters/displays → `PromptCard` renders → Navigate to `/prompt/:id` → `PromptDetailPage` shows full view

**Live Previews**: `LiveExamples.tsx` exports `getExampleComponent(id)` which returns the corresponding preview component

**Code Display**: `exampleCode.ts` maps prompt IDs to static code. `CodeViewer` shows static code by default, can generate fresh code via Gemini.

**Tailwind Configuration**: Custom animations (orbit, morph, gradient-rotate, etc.) are defined inline in `index.html` under `tailwind.config`. The project uses class-based dark mode.

### Path Alias
`@/*` maps to project root (configured in tsconfig.json and vite.config.ts)

## Categories
Prompts are categorized as: Hero, Card, Layout, Animation, Interaction, Background
