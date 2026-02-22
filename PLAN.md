# balo Demo — Executive Build Plan

## Objective

Build a polished, mobile-viewport-only demo of **balo** — a chat app targeting the Central Asian market with ambient AI features. This is a **mock/prototype** for screen-recording purposes (not a real backend). The recording will be composited onto a phone frame in post-production.

---

## What We're Showing

Three things, per Saeed's brief:

1. **Design quality** — The UI speaks for itself. Clean, polished, distinctive.
2. **Ambient mood detection** — As conversation tone shifts, the background atmosphere changes in real-time (color, clouds, intensity).
3. **Smoothness** — Transitions, animations, load times — everything feels fluid and native.

---

## Screens

### 1. Home Screen (Contact Constellation)

From the Figma design (`iPhone 16 & 17 Pro Max - 23.png`):

- **"belo" logo** top-left, search icon top-right
- **Contacts displayed as a constellation/graph** — NOT a traditional list. Circular avatar photos are arranged organically with thin, ethereal holographic lines connecting them (like a social graph visualization)
- Each avatar has a **mood-colored aura/glow** around it (reflecting the emotional tone of the most recent conversation — the "Mood at a Glance" feature from the landing page)
- **Floating "+" FAB** bottom-right for new chat
- Background: deep purple-to-dark gradient
- Tapping an avatar navigates into that chat

### 2. Chat Screen

From the Figma design (`balo_version_final.png`):

- **Top bar**: back arrow, avatar (with holographic aura effect), phone/video call icons, copy/share icon. Contact name below avatar.
- **Messages**: clean, minimal — left-aligned (received) and right-aligned (sent). Very subtle or no bubble backgrounds. White/light text on the atmospheric background.
- **Background**: the core ambient AI feature — a moody, cloudy/nebula-like atmospheric texture that **shifts color and intensity** based on conversation sentiment:
  - Neutral/calm → deep purple/indigo (default)
  - Positive/warm → warmer purple, hints of rose/magenta
  - Tense/negative → darker, cooler, more turbulent clouds
  - Excited/energetic → brighter, more saturated, livelier movement
- **Input bar**: bottom of screen, "+" button left, "balo"-branded text input
- **"Seen Now"** read receipts in subtle muted text
- **Date separator**: "Today" pill

### 3. Profile Screen (stretch goal)

- Not in the current designs but mentioned by the user as a possibility
- Skip for v1 unless time allows

---

## The Demo Script (Choreographed Flow)

Since this is a mock, we'll **script the entire interaction** with pre-defined messages and timed mood shifts:

1. Open app → Home screen loads with constellation animation (avatars fade/float in)
2. User taps "Saeed" avatar → smooth transition into chat screen
3. Chat loads with a few prior messages (neutral mood — purple atmosphere)
4. User types "Hey, are you coming tonight?" → sends
5. Reply appears: "No" → mood shifts slightly cooler/darker
6. User types "Is everything alright?" → sends
7. Reply: "Idk to be honest." → mood shifts more noticeably — clouds become more turbulent, color cools
8. Optionally: user sends a warm/supportive message → mood warms back up (rose tones)

This gives us the full arc: smooth UI → mood detection in action → emotional shift visible.

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Next.js 14+ (App Router)** | Fast setup, good DX |
| Styling | **Tailwind CSS** | Rapid iteration |
| Animations | **Framer Motion** | Smooth, declarative animations for page transitions, avatar floats, mood shifts |
| Atmospheric BG | **CSS gradients + canvas/WebGL** | Cloudy nebula effect — likely a layered approach with animated gradient blobs or a simple shader |
| Viewport | **Mobile-only (390×844)** | iPhone 16 Pro Max dimensions, locked viewport |
| State | **Simple React state** | No backend — all mock data, scripted message flow with timers |

---

## Key Technical Challenges

### 1. Atmospheric Background (Mood Shift)
The signature feature. Approach:
- Layer multiple semi-transparent radial gradients / blurred blobs
- Animate their positions, colors, and opacity with Framer Motion or CSS keyframes
- Parameterize by a `mood` value (0–1 scale, or categorical) that drives the color palette and animation speed
- Transition smoothly between mood states over ~2-3 seconds

### 2. Constellation Contact Layout
- Position avatars in a predefined organic layout (not grid, not list)
- Draw thin SVG lines between connected contacts
- Add holographic/iridescent aura effect around each avatar (CSS glow + subtle animated gradient border)
- Entrance animation: avatars and lines fade/float into position

### 3. Holographic Avatar Auras
From the designs, each avatar has thin organic lines that look slightly holographic:
- SVG paths with gradient strokes (shifting hue for holographic feel)
- Subtle animated shimmer using CSS or SVG animation
- Per-avatar mood-colored glow (box-shadow or filter)

### 4. Smooth Page Transitions
- Framer Motion `AnimatePresence` for route transitions
- Chat screen slides up or fades in from the tapped avatar position
- Messages animate in with stagger

---

## Mock Data

- **Contacts**: ~8-10 people with Central Asian names and avatar photos (will need placeholder images — can use the ones from Figma or stock photos)
- **Messages**: Pre-scripted conversation with Saeed (as shown in design)
- **Mood timeline**: Hardcoded mood values keyed to message indices

---

## Phone Frame Wrapper (Nice-to-Have)

Options for presenting in a phone frame without post-production:
1. **CSS phone frame**: Wrap the viewport in a phone bezel SVG/CSS — simple, works in browser
2. **Device preview libraries**: e.g., `react-device-frameset` or similar
3. **Skip it**: Just screen-record the mobile viewport and composite in post

Recommend starting without it and adding if time allows.

---

## File Structure (Planned)

```
belo_demo/
├── app/
│   ├── layout.tsx          # Root layout, mobile viewport lock, fonts
│   ├── page.tsx            # Home screen (constellation)
│   └── chat/
│       └── [id]/
│           └── page.tsx    # Chat screen
├── components/
│   ├── Constellation.tsx   # Contact graph layout
│   ├── Avatar.tsx          # Avatar with holographic aura
│   ├── AtmosphericBG.tsx   # Mood-shifting background
│   ├── ChatBubble.tsx      # Message bubble
│   ├── ChatInput.tsx       # Input bar
│   ├── MoodTransition.tsx  # Mood state manager + transition
│   └── PhoneFrame.tsx      # Optional device wrapper
├── lib/
│   ├── mockData.ts         # Contacts, messages, mood timeline
│   └── moodEngine.ts       # Mood value calculation from messages
├── public/
│   └── avatars/            # Avatar images
├── PLAN.md
└── refs/                   # Designer references (existing)
```

---

## Build Order

1. **Project setup** — Next.js + Tailwind + Framer Motion, mobile viewport lock
2. **Atmospheric background** — Get the mood-shifting cloudy effect working standalone
3. **Chat screen** — Messages, input bar, mood shifts as messages appear
4. **Avatar component** — Circular photo with holographic aura effect
5. **Home screen** — Constellation layout with avatars and connecting lines
6. **Page transitions** — Smooth navigation between home and chat
7. **Demo choreography** — Script the timed message flow for recording
8. **Polish** — Timing, easing, final color tuning, any stretch goals
