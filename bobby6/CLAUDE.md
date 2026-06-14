# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, no-build photo-matching game built for a 7-month anniversary (November–June). The user matches Spanish month tags to scrambled photos. No framework, no bundler — open `index.html` directly in a browser.

## Running it

```bash
# Any local static server works:
python3 -m http.server 8080
# then open http://localhost:8080
```

Or just open `index.html` directly in a browser (file:// works fine since there are no API calls).

## Photo assets

Photos go in `img/` and must be named exactly:
`november.jpg`, `december.jpg`, `january.jpg`, `february.jpg`, `march.jpg`, `april.jpg`, `may.jpg`, `june.jpg`

The `MONTHS` array in `game.js` is the single source of truth — each entry has `en` (filename key), `es` (displayed tag label), and `desc` (description shown on correct match). Keep it in sync if photos are added or removed.

## Architecture

Three screens (`#intro`, `#game`, `#celebration`) live in one HTML file; only one is visible at a time via the `.hidden` class. All game state lives in `game.js` module-level variables (`selectedTag`, `matchedCount`). `initGame()` resets everything and re-renders both the tag strip and the photo grid from a fresh shuffle each time.

**Matching logic:** clicking a `.month-tag` sets `selectedTag`; clicking a `.photo-card` compares `dataset.month` on both. Correct → `.correct` on the card + `.matched` on the tag, then the month label and description slide in via `max-height` transitions. Wrong → `.wrong` (CSS shake animation, removed on `animationend`).

**Tags:** displayed in fixed chronological order (Noviembre → Junio), not shuffled. Photos are shuffled each game.

**Hover preview:** a single `#photo-preview` overlay (created in JS, appended to `body`) shows the full uncropped image on `mouseenter`. It is suppressed while a tag is selected — both by the `mouseenter` guard (`if (!selectedTag)`) and by hiding it immediately when a tag is clicked.

**Photo grid:** fixed 4-column layout (`repeat(4, 200px)`), rows grow automatically when descriptions expand after correct matches.
