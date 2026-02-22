# belo Demo Script

## Overview
A scripted walkthrough showing belo's ambient AI mood detection. The background shifts color in real-time based on the emotional tone of the conversation.

---

## Screen 1: Home (Contacts)

1. **Open the app** — the constellation screen loads with avatars fading in and the vector rings slowly rotating.
2. **Pause for ~3 seconds** — let the viewer take in the design.
3. **Tap Saeed's avatar** (top of the circle) — the screen fades out and the chat slides up.

---

## Screen 2: Chat with Saeed

The chat opens with **yesterday's messages** already visible and a warm rose/amber background (mood: 0.85).

### Pre-loaded messages (Yesterday)
These appear automatically — you don't type anything.

| Sender | Message |
|--------|---------|
| Saeed | "Last night was so fun haha" |
| You | "Literally the best time" |
| Saeed | "We gotta do that again soon" |

### Live demo flow

After ~1.5 seconds, the **"Today" divider** appears and Saeed starts typing.

| Step | What happens | You type | Background shift |
|------|-------------|----------|-----------------|
| 1 | Saeed sends: **"Heyy we're all going out tonight, you coming?"** | — | Stays warm |
| 2 | You reply | **Maybe** | Cools down — shifts toward purple/mauve |
| 3 | Saeed sends: **"Come on it'll be fun"** | — | Stays cool |
| 4 | You reply | **I've just been feeling off lately** | Gets cold — shifts to dark blue/teal |
| 5 | Saeed sends: **"Wait what's going on? Talk to me"** | — | Gets darker |
| 6 | You reply | **It's nothing, forget it** | Darkest point — near black, stars dim |
| 7 | Saeed sends: **"Hey. You're not alone in this. I'm coming over."** | — | Warms back up — rose/amber returns |

### Timing
- After you send a message, Saeed's typing indicator (three dots) appears for ~1.5-2.5 seconds before his reply.
- You can type anything — the mood shift is driven by the script, not your actual words.
- But for the cleanest demo, type the exact phrases above.

---

## Tips for recording
- Use an iPhone (or emulator at 430x932) for the intended mobile viewport.
- Go slow — let each background shift breathe for a moment before sending the next message.
- The biggest visual moments are **step 4** (the big drop) and **step 7** (the recovery).
- The whole flow should take about 60-90 seconds.
