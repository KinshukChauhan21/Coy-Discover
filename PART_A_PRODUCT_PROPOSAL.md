# Coy SDE Intern Assignment — Part A: Product Analysis & Feature Proposals

**Candidate:** Kinshuk Chauhan  
**Role:** Software Development Engineer (SDE) Intern  
**Platform Reviewed:** [app.getcoy.com](https://app.getcoy.com)

---

## Executive Summary & App Experience Analysis
Coy occupies a unique and compelling niche in the consumer social space: **double-blind crush matching for real-world social circles**. Unlike conventional dating platforms (Tinder, Bumble, Hinge) where strangers swipe through public profiles, Coy solves the universal human fear of **rejection anxiety and social awkwardness** among people who already know each other.

Through hands-on evaluation of the live product flow:
1. **Phone OTP Login:** Frictionless, high-trust onboarding that anchors identity to a real phone number.
2. **Adding a Crush:** Clean, high-stakes action where users enter contact details under the guarantee of total secrecy.
3. **Email Verification:** Essential anti-abuse & verification step to prevent identity spoofing.
4. **The Invite Link (Viral Loop):** Organic referral mechanism enabling users to unlock extra crush slots by inviting peers.
5. **The Extra-Slots Screen:** Scarcity-driven monetization and viral incentive layer.

The core promise of Coy is **absolute privacy**: *No one ever finds out you liked them unless the feeling is 100% mutual.*

Based on this user journey, here are two proposed core features engineered to scale Coy's user retention, viral loops, and network density without violating its core privacy promise.

---

## Feature 1: "Coy Circles" — Verified Campus & Organization Crush Pools

### 1. The Problem
Currently on Coy, adding a crush requires knowing the person's exact phone number or email address. In target demographics (college universities, residential campuses, tech parks, creative communities), users often have crushes on:
- Classmates or batchmates whose personal phone numbers they do not possess.
- Acquaintances seen regularly in lectures, libraries, cafes, or clubs.
- People they follow on social media but feel intimidated to DM or ask for numbers directly.

Furthermore, an isolated SMS sent to a stranger's phone from a generic Coy shortcode often triggers **spam skepticism** or confusion if the recipient doesn't recognize the sender's social context.

### 2. The Solution: "Coy Circles"
- **Verified Closed Pools:** Users can verify their affiliation using an institution email (`@college.edu`, `@company.com`) or geo-fenced campus verification to enter their local "Circle" (e.g., *BITS Pilani Circle*, *Delhi University South Campus Circle*, *IIT Delhi Circle*).
- **Directory / Handle Matching:** Within a Circle, users can search by campus handle, name, or student directory to add someone to their secret crush slots—**without needing their private phone number**.
- **Anonymous Community Pulse (Crush Ticker):** A live aggregate feed displays anonymized social excitement without revealing identities:
  > *"7 people in Computer Science Department have secret crushes in Design!"*  
  > *"Someone from your 2024 batch just added you as a secret crush!"*
- **Privacy Edge Case Safeguard:** Strict double-blind enforcement: identity is never revealed until both users add each other within the Circle. To prevent brute-force discovery or bot enumeration, profiles are rate-limited and slots remain strictly capped.

### 3. Why This Feature is Required
1. **Accelerates High Network Density (K-Factor):** Consumer dating and crush apps succeed or fail based on localized network density (e.g., how Tinder originally launched campus-by-campus at USC). Circles create immediate viral density where crush dynamics are naturally strongest.
2. **Eliminates the Contact Info Barrier:** Removing the requirement for a personal phone number unlocks 3x–5x more crush additions.
3. **Organic Word-of-Mouth & Campus Buzz:** When students see their campus ticker ("Someone in your dorm added you!"), peer-to-peer discussions surge, fueling viral invite links and zero-cost user acquisition.

---

## Feature 2: "Zero-Knowledge Hint Engine & Anonymous Double-Blind Icebreakers"

### 1. The Problem
When a crush recipient receives Coy's notification (*"Someone has a secret crush on you! Join Coy to see if it's mutual"*), they face **intense decision paralysis**:
- Users only have 3 to 5 initial slots.
- The recipient wonders: *"Who could this be? Is it my friend, a coworker, someone from the gym, or an ex?"*
- Fear of "wasting" a limited slot on the wrong person leads to hesitance, causing drop-off immediately after Phone OTP login.

### 2. The Solution: "Zero-Knowledge Hint Engine"
- **Structured, Non-Identifying Clues:** When adding a crush, the sender can optionally select up to 2 standardized clues from a curated taxonomy:
  - *Context:* "We met through mutual friends" / "We share a college lecture" / "We worked on a project together" / "At an event/cafe".
  - *Vibe:* "You have great music taste" / "Your humor is unmatched" / "We talked at a party recently".
- **Blind Icebreaker Guessing Prompt:** If a recipient is intrigued, they can trigger an anonymous 2-way prompt (e.g., *"Did we hang out last weekend?"* or *"Where did we first talk?"*). Both enter an answer blindly; if both align, the app prompts both to confirm the match.
- **Privacy Edge Case Safeguard:** No free-form text input is permitted for hints to prevent harassment, doxxing, or dead giveaways. Clues are strictly pick-list driven, ensuring zero identity leakage while maintaining intriguing suspense.

### 3. Why This Feature is Required
1. **Solves the Recipient Activation Bottleneck:** Lowers cognitive friction upon receiving an anonymous alert. The hint gives just enough intrigue to motivate the user to claim their slots and guess.
2. **Drives High Slot Demand & Monetization:** If a user knows they have a crush who gave a specific hint, their desire to unlock extra slots (via the Invite Link or the Extra-Slots purchasing screen) increases dramatically.
3. **Transforms Cold SMS into a Gamified Experience:** Elevates the notification from a potentially ignored message into a fun, curiosity-driven social ritual.
