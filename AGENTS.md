# AGENTS.md
## Environment
- Node.js is managed via nvm in `~/.nvm`. All `node`/`npm` commands require loading nvm first:
  ```bash
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
  ```
- Node.js 22+ is required (installed via `nvm install 22`).

## Commands
- Install dependencies: `npm install`
- Start dev server: `npm run dev` (add `--host 0.0.0.0` for network access)
- Build production bundle: `npm run build` (output: `dist/`)

## Project Quirks
- Tailwind CSS is configured via `@tailwindcss/vite` plugin in `vite.config.js` (no separate `tailwind.config.js`).
- Persistence uses `localStorage` key `team-drawer-players` (see `src/hooks/usePlayers.js`).
- No backend, test framework, or linting configured.
