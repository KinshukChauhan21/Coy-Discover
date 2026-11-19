# Coy — SDE Intern Assignment: Discover Tab & Product Features

[![Next.js](https://img.shields.io/badge/Next.js-16.4.6-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.1-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Tests-Passing-emerald?style=flat&logo=checkmarx)](https://github.com/)

A modern, high-performance, mobile-first swipe discovery feature built as a standalone application alongside Coy's existing double-blind crush experience.

---

## 📑 Table of Contents
1. [Assignment Overview](#-assignment-overview)
2. [Part A: Core Feature Proposals](#-part-a-core-feature-proposals)
3. [Part B: Discover Tab Architecture & Features](#-part-b-discover-tab-architecture--features)
4. [Double-Blind Privacy Safeguards](#-double-blind-privacy-safeguards)
5. [Backend API Documentation](#-backend-api-documentation)
6. [Tech Stack](#-tech-stack)
7. [Getting Started & Local Setup](#-getting-started--local-setup)
8. [Automated Test Suite](#-automated-test-suite)
9. [Project Structure](#-project-structure)

---

## 📌 Assignment Overview
This project fulfills the **Coy SDE Intern Assignment** requirements:
- **Part A:** In-depth user journey analysis of `https://app.getcoy.com` with two core feature proposals.
- **Part B:** A standalone swipe-based **"Discover"** tab with mobile drag gestures, desktop button/keyboard navigation, match celebration with confetti, mutual matches list, and persistent backend APIs.

---

## 💡 Part A: Core Feature Proposals
*(Full detailed document available in [PART_A_PRODUCT_PROPOSAL.md](file:///c:/Users/Kinshuk%20Chauhan/OneDrive/Desktop/Coy/PART_A_PRODUCT_PROPOSAL.md))*

### 1. "Coy Circles" — Verified Campus & Organization Crush Pools
- **The Problem:** Currently, adding a crush on Coy requires knowing their personal phone number or email address. In target cohorts (colleges, universities, workplaces), people frequently have crushes on batchmates, lab partners, or acquaintances whose numbers they don't have. Furthermore, cold SMS alerts can trigger spam skepticism.
- **The Solution:** Verified closed pools (e.g. `@university.edu`, student IDs) where users can add crushes via campus directory/handles without personal contact details. Features an anonymous aggregate "Community Ticker" (*"7 people in Engineering have secret crushes in Architecture!"*).
- **Why Required:** 
  - Drastically increases **viral K-factor** and network density in high-propensity social environments.
  - Removes the contact-number friction point, yielding a 3x-5x increase in crush additions.

### 2. "Zero-Knowledge Hint Engine & Anonymous Double-Blind Icebreakers"
- **The Problem:** When an anonymous notification arrives (*"Someone has a secret crush on you! Join Coy"*), recipients face choice paralysis with only 3–5 initial slots. Fearing they will "waste" a slot, many drop off right after phone OTP login.
- **The Solution:** Senders can attach up to 2 standardized, non-identifying clues from a vetted taxonomy (*"Where we met: In a lecture hall"*, *"Vibe: Your Spotify music taste"*). Users can also play a blind 2-way prompt game to verify mutual interest without identity leakage.
- **Why Required:** 
  - Solves the recipient guessing dilemma and dramatically lowers onboarding drop-off.
  - Serves as an organic driver for extra slots (referral invite links and slot purchases).

---

## 🚀 Part B: Discover Tab Architecture & Features

### 1. Profile Deck & Seeding
- **32 Diverse Mock Profiles:** Pre-seeded with rich data: high-resolution portraits, ages (19–26), colleges (BITS Pilani, IIT Delhi, St. Stephen's, SRCC, NIFT, Ashoka), cities, careers, bios, and interest badges.
- **Pre-Seeded Mutual Crushes:** Profiles such as **Ananya Sharma** (`prof_01`), **Tara Mukherjee** (`prof_03`), and **Meera Sen** (`prof_05`) have pre-seeded secret likes on the logged-in user to trigger instant matches during demos.

### 2. Smooth Swipe Physics & Gestures
- **Framer Motion Drag Engine:** Realistic physical card gestures with elastic resistance, dynamic tilt rotation (`[-18°, 18°]`), and release velocity threshold detection.
- **Real-Time Visual Stamps:** Dynamic **"LIKE"** (emerald green stamp) and **"PASS"** (crimson stamp) overlays with progressive opacity as the card is dragged left or right.
- **Card Deck Depth:** The next profile card is rendered directly behind the active card with scaled perspective (`scale: 0.95`, `y: 12px`, `opacity: 0.65`).
- **Desktop Friendly:** Large interactive Like / Pass action buttons and full **keyboard shortcuts** (← Left Arrow for Pass, → Right Arrow for Like).
- **Multiple Photo Carousel:** Tap the left/right edges of any card to flip through additional photos with Instagram-story-style progress dashes.

### 3. Match Celebration ("It's a Match!")
- Instant match trigger when a mutual like is detected.
- Multi-burst celebratory **confetti fireworks** (`canvas-confetti`).
- Intersecting glowing avatar comparison highlighting both users.
- Quick navigation to view matches or continue swiping.

### 4. Mutual Matches View & Interactive Chat Simulator
- Dedicated **Matches tab** displaying all confirmed mutual crushes with match timestamps.
- Interactive message drawer allowing users to send conversation starters with realistic simulated instant replies.

### 5. Clear Empty State & Deck Reset
- Friendly empty state when all profiles have been swiped.
- One-click **"Reset Demo Deck"** button (also available in the top bar) to restore all 32 profiles for repeated evaluation.

---

## 🔒 Double-Blind Privacy Safeguards
The core promise of Coy is: **Never reveal who has liked the user unless it is mutual.**

This has been strictly enforced at the architectural level:
1. **Zero Client Leakage in `/feed`:** The backend `getFeedProfiles()` function systematically sanitizes every profile object, stripping `hasLikedUser` before serializing JSON to the client.
2. **Inspection Proof:** Reviewers cannot inspect DevTools Network tab to determine who liked them.
3. **Double-Blind Swipes:** Matches are computed server-side in `recordSwipe()`. Even if a client inspects the database file directly, public API endpoints never expose incoming likes until both parties have swiped right.

---

## 📡 Backend API Documentation

All endpoints are available both at root (`/feed`, `/swipe`, `/matches`, `/reset`) and under `/api/*` (`/api/feed`, `/api/swipe`, `/api/matches`, `/api/reset`).

### 1. `GET /feed`
Returns all profiles that the user has not swiped on yet.
```json
{
  "profiles": [
    {
      "id": "prof_01",
      "name": "Ananya Sharma",
      "age": 22,
      "photo": "https://images.unsplash.com/...",
      "bio": "Golden hour enthusiast, vinyl collector...",
      "city": "New Delhi",
      "college": "St. Stephen's College",
      "interests": ["Indie Rock", "Film Photography", "Iced Matcha"]
    }
  ],
  "totalRemaining": 32,
  "totalSwiped": 0
}
```

### 2. `POST /swipe`
Records a user's swipe action and determines if a mutual match was created.
- **Request Body:**
```json
{
  "profileId": "prof_01",
  "action": "like"
}
```
- **Response (Mutual Match):**
```json
{
  "success": true,
  "action": "like",
  "isMatch": true,
  "match": {
    "id": "prof_01",
    "name": "Ananya Sharma",
    "age": 22,
    "photo": "https://images.unsplash.com/...",
    "city": "New Delhi"
  }
}
```

### 3. `GET /matches`
Returns all mutual matches with timestamps, ordered by most recent first.
```json
{
  "matches": [
    {
      "id": "prof_01",
      "name": "Ananya Sharma",
      "age": 22,
      "matchedAt": "2026-11-20T00:08:44.821Z"
    }
  ],
  "totalMatches": 1
}
```

### 4. `POST /reset`
Resets the persistent database back to the initial 32 mock profiles, clearing all swipe records and matches for a fresh demo.

---

## 🛠 Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Frontend Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation & Physics:** Framer Motion
- **Icons:** Lucide React
- **Confetti:** Canvas-Confetti
- **Persistence:** Atomic JSON file store (`data/db.json`)

---

## 💻 Getting Started & Local Setup

### Prerequisites
- Node.js (v18.x or v20.x or v24.x)
- npm or pnpm

### 1. Clone & Install
```bash
git clone https://github.com/KinshukChauhan21/Coy-Discover.git
cd Coy-Discover
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run Production Build
```bash
npm run build
npm start
```

---

## 🧪 Automated Test Suite
Run the built-in automated verification suite to test all backend routes, swipe matching logic, data persistence, and privacy sanitization:
```bash
npm test
```

**Test Output:**
```text
🧪 Starting Coy Discover Backend & Privacy Test Suite...

✓ Database reset successfully.
✓ GET /feed returned 32 profiles.
✓ Privacy Guarantee verified: ZERO profiles leaked "hasLikedUser" in feed.
✓ POST /swipe with PASS recorded correctly (isMatch = false).
✓ Profile swiped on never appears in feed again.
✓ POST /swipe with LIKE without mutual like does NOT create match (Double-blind upheld).
✓ POST /swipe with mutual LIKE triggered "It's a match!" successfully.
✓ GET /matches returned 1 mutual match (Ananya Sharma).
✓ Data persistence across sessions/reloads verified.
✓ Reset functionality restored 32 mock profiles cleanly.

🎉 ALL TESTS PASSED SUCCESSFULLY! 100% compliance with requirements.
```

---

## 📁 Project Structure
```text
Coy/
├── data/
│   └── db.json                   # Persistent database store
├── src/
│   ├── app/
│   │   ├── api/                  # API route re-exports (/api/feed, /api/swipe, etc.)
│   │   ├── feed/route.ts         # GET /feed endpoint
│   │   ├── swipe/route.ts        # POST /swipe endpoint
│   │   ├── matches/route.ts      # GET /matches endpoint
│   │   ├── reset/route.ts        # POST /reset endpoint
│   │   ├── globals.css           # Tailwind CSS imports & theme definitions
│   │   ├── layout.tsx            # Root HTML layout & meta tags
│   │   └── page.tsx              # Main mobile frame & tab container
│   ├── components/
│   │   ├── Navigation.tsx        # Top header & mobile bottom tab bar
│   │   ├── DiscoverTab.tsx       # Core swipe card deck & empty state
│   │   ├── ProfileCard.tsx       # Framer Motion gesture card & photo carousel
│   │   ├── MatchModal.tsx        # Confetti match celebration popup
│   │   ├── MatchesTab.tsx        # Mutual matches list & chat simulation
│   │   └── HomeTab.tsx           # Blank placeholder Home tab per spec
│   └── lib/
│       ├── types.ts              # TypeScript interfaces & types
│       ├── mockData.ts           # 32 seeded mock profiles
│       └── db.ts                 # Persistent CRUD operations & privacy sanitization
├── test/
│   └── backend.test.mjs          # Automated backend & privacy test suite
├── PART_A_PRODUCT_PROPOSAL.md    # In-depth Part A feature proposals
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 📬 Contact & Submission Details
- **Candidate:** Kinshuk Chauhan
- **Email:** kinshukchauhan32@gmail.com
- **Role:** SDE Intern at Coy (Gurgaon)
- **Submission Form:** [Google Form](https://forms.gle/YcyBf6Btr41DrWMG6)
