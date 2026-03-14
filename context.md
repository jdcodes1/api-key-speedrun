# API Key Speedrun

## Overview
A prank/game web app that mimics Google Cloud's UI and challenges users to generate a fake API key as fast as possible. Intentionally confusing UX patterns make it a frustrating speedrun.

## Tech Stack
- **Vite** + **React** + **Tailwind CSS v4**
- No backend — leaderboard stored in localStorage
- Single-page app with state machine game flow

## Architecture
- `App.jsx` — Root component, manages screen state (landing/game/victory), timer, leaderboard
- `components/GameScreen.jsx` — Core game logic, state machine orchestrating all trap stages
- `components/LandingPage.jsx` — Welcome screen + leaderboard display
- `components/VictoryScreen.jsx` — Results, fake key display, score submission

## Game State Machine
```
PROJECT_SELECT → SIDEBAR_NAV → CREDENTIALS_PAGE
→ TOS_MODAL → BILLING_MODAL → RESTRICTIONS_MODAL → CAPTCHA
→ GENERATE_KEY (3 attempts needed) → VICTORY
```

## UX Traps Implemented
1. **Project Selector** — 17 near-identical project names, only one works
2. **Sidebar** — 25+ items, "API Keys (Legacy)" is a trap that leads to deprecated page
3. **TOS Modal** — Checkbox hidden in paragraph 4, Cancel styled as primary button
4. **Billing Modal** — Must select correct account + check confirmation box, "Skip" button is a trap
5. **Restrictions Modal** — 100+ APIs, must find "Generative Language API" (not "Gemini API" which is deprecated)
6. **Captcha** — "Select all images containing API keys" with emoji grid
7. **Generate Key** — Greyed out until hidden checkbox found, 2nd attempt fakes session expiry
8. **Cookie Banner** — Covers 40% of screen, "Accept" is tiny text link
9. **Toast Spam** — Random notifications every 12-22 seconds
10. **Auto-scroll** — Randomly scrolls to top on certain pages

## Key File Paths
- Entry: `src/main.jsx`
- Styles: `src/index.css` (Tailwind)
- Components: `src/components/*.jsx`

## Running
```bash
npm run dev   # dev server
npm run build # production build
```
