## Zustand Todo Example (React + TypeScript)

A minimal React 18 + TypeScript project demonstrating global state management with Zustand. It includes a simple Todo app, filtering, and examples of organizing state with slices and custom hooks. A mock API is provided via `json-server` using `src/db.json`.

### Tech stack
- React 18, TypeScript
- Zustand (state), Immer (immutability helpers)
- json-server (mock API)

### Getting started
1. Install dependencies:
   - `yarn`
2. Start the app (http://localhost:3000):
   - `yarn start`
3. Start the mock API (http://localhost:3001):
   - `yarn server`

### Scripts
- `yarn start`: Run the development server

### Project structure (high level)
- `src/store/`
  - `sliceTodos.ts`: Todos slice (state + actions)
  - `sliceExample.ts`: Additional slice example
  - `useStoreTodos.ts`, `useStoreFilter.ts`: Typed hooks/selectors
- `src/components/`: UI components (Todo list, item, form, filters, etc.)
- `src/db.json`: Mock data for `json-server`

### Notes
- The UI and examples focus on clear Zustand patterns: slices, selectors, and derived state.
- Adjust API data in `src/db.json` as needed; endpoints are served under `http://localhost:3001`.
