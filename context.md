# API Key Speedrun

## Overview
A prank/game web app that mimics Google Cloud's UI and challenges users to generate a fake API key as fast as possible. Intentionally confusing UX patterns make it a frustrating speedrun. Every run is randomized.

## Tech Stack
- **Vite** + **React** + **Tailwind CSS v4**
- **Neon** (optional) for global leaderboard via `@neondatabase/serverless` — falls back to localStorage if not configured
- Single-page app with state machine game flow

## Architecture
- `App.jsx` — Root component, manages screen state (landing/game/victory), timer, leaderboard (Supabase + localStorage fallback)
- `lib/supabase.js` — Supabase client init, fetchLeaderboard(), saveScore()
- `components/GameScreen.jsx` — Core game logic, state machine orchestrating all trap stages + popup system
- `components/LandingPage.jsx` — Welcome screen + global leaderboard display
- `components/VictoryScreen.jsx` — Results, fake key display, async score submission
- `components/PopupSystem.jsx` — Intrusive popups: tutorial, survey, session warning, upgrade prompt, cookie v2, feature spotlight, chat widget

## Game State Machine
```
PROJECT_SELECT → SIDEBAR_NAV → (DEPRECATED_PAGE trap) → CREDENTIALS_PAGE
→ TOS_MODAL → BILLING_MODAL → (PAYMENT_SETUP if needed)
→ REGION_SELECTOR → RESTRICTIONS_MODAL → QUOTA_REQUEST
→ CAPTCHA (3 rounds) → EMAIL_VERIFICATION → GENERATE_KEY (5 attempts) → VICTORY
```

## UX Traps (14 stages)
1. **Project Selector** — 34 near-identical names, correct one randomized each run, "Starred" tab is a trap
2. **Sidebar** — 25+ items, "API Keys (Legacy)" leads to deprecated page
3. **TOS Modal** — Checkbox position randomized (paragraphs 3-8), decoy checkboxes that trigger warnings
4. **Billing Modal** — 10 accounts with randomized names/statuses, "Payment Required" triggers PaymentSetup
5. **Payment Setup** — Fake credit card form, 10-15s verification, first attempt always "declined"
6. **Region Selector** — 38 regions, correct one randomized, some show "unavailable" after 5-8s spinner
7. **Restrictions Modal** — Correct API randomized from pool of 5 similar names, max 3 selections, deprecated Gemini decoys
8. **Quota Request** — 50-char minimum justification, 15-20s processing, first attempt always denied
9. **Captcha** — 3 rounds with different themes (keys/clouds/locks), 3-5s loading between rounds
10. **Email Verification** — First code "expires", must resend, code appears in toast after 10s delay
11. **Generate Key** — Hidden checkbox position randomized, 5 attempts needed, different failure modes
12. **Cookie Banner** — Covers 40% of screen, "Accept" is tiny text
13. **Toast Spam** — Random notifications every 10-18 seconds
14. **Popup System** — Welcome tutorial (20s), survey, session warning, upgrade prompt, cookie v2, feature spotlight, chat widget

## Randomization
Every run randomizes:
- Correct project ID
- Billing account names, statuses, and which is valid
- TOS checkbox paragraph position + decoy positions
- Correct API name from pool of 5
- API list order
- Correct region
- Captcha round themes and grid order
- Hidden checkbox position in GenerateKeyPage
- Failure mode order

## Estimated Minimum Time: ~5-6 minutes for a perfect run

## Neon Setup (optional)
Set env var `VITE_NEON_DATABASE_URL` to your Neon connection string.
Create table:
```sql
CREATE TABLE leaderboard (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  time_ms INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```
Without Neon, leaderboard is localStorage only.

## Key File Paths
- Entry: `src/main.jsx`
- Styles: `src/index.css` (Tailwind)
- Components: `src/components/*.jsx`
- Neon DB: `src/lib/supabase.js` (named for backward compat)

## Running
```bash
npm run dev   # dev server
npm run build # production build
```
