# Digital Child Safety Hub prototype

## Purpose

This project turns the selected Figma homepage directions into a real, reviewable web prototype. It is currently intended for design review, interaction testing, and stakeholder direction selection rather than production launch.

## Current directions

- `10.00`: calm retro direction with the larger rainbow transition into FAQ.
- `10.10`: a tighter variation with the compact FAQ visual marker.
- A third direction can be added to the existing switcher without duplicating page logic.

Figma source nodes:

- `10.00`: `179:4324`
- `10.10`: `179:3970`

## Product principles

- Georgian-first content and typography.
- Child-friendly without trivializing safeguarding topics.
- Learning and support are equally visible, but visually distinct.
- No invented hotline numbers or unapproved emergency claims.
- Registration and progress-storage language remains explicit.
- Motion is restrained, supports comprehension, and respects reduced-motion settings.

## Technical foundation

- Next.js App Router with TypeScript.
- Motion for interface animation.
- Local Figma-exported illustration assets.
- Responsive layouts for desktop, tablet, and phone.
- URL-selectable directions through `?direction=10.00` or `?direction=10.10`.
- dotLottie is installed for the approved animation pass later.
