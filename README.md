# FinSight — BLV-First Banking Copilot (Prototype)

A working prototype of FinSight, a guided decision system for blind and low vision users to complete high-stakes banking tasks with confidence.

## Features

- **Audio Guide (TTS)**: Every screen automatically reads key information aloud via Web Speech API
- **Voice Input (STT)**: Users can speak commands like "Send $120 to John" — the system recognizes, confirms, and auto-transitions
- **Step-by-step guided flow**: Entry → Disclaimer → Recipient → Amount → Review → 10s Countdown → Success
- **Accessibility**: ARIA live regions, focus management, large tap targets, high contrast
- **10-second deliberation countdown**: Core differentiator — prevents irreversible mistakes

## How to Use

1. Open the prototype in Chrome (recommended for best Speech API support)
2. Allow microphone access when prompted
3. Tap the mic button in the bottom bar, or tap/click UI elements directly
4. Try saying: "Send $500 to John" on the entry screen

## Voice Commands by Screen

| Screen | Commands |
|--------|----------|
| Entry | "Send money", "Send $500 to John" |
| Disclaimer | "Continue", "Yes" |
| Recipient | Say any name: "John", "Sarah" |
| Amount | "$120", "Fifty dollars", "Two hundred" |
| Review | "Send", "Confirm", "Cancel", "Change amount" |
| Countdown | "Cancel", "Stop", "Send now" |
| Success | "Done" |

## Requirements

- HTTPS (required for microphone/STT)
- Chrome or Edge recommended
- Microphone access for voice input

## Team

FinSight Capstone — UC Berkeley MIMS 2026
