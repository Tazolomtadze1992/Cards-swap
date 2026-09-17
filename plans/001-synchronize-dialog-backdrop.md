# 001 — Synchronize native dialog and backdrop motion

- Commit: 7939c55 (working tree includes first motion pass and unrelated user work)
- Severity: HIGH
- Category: Cohesion and spatial consistency
- Scope: shared motion helper plus native service dialog and age picker call sites; no other timing changes.

## Problem and evidence
Repository root: /Users/tazo/.codex/.chatgpt-projects/g-p-6a5f9117c004819196667a75fcdf57d5/digital-child-safety-hub
`src/components/motion/surface-motion.tsx:36` animates the surface element only:
`const animation = element.animate([...], { duration, easing: surfaceEase, fill: "both" });`
`src/components/ui/modal.module.css:3` has a static native backdrop:
`.dialog::backdrop { background: var(--color-overlay-soft); }`
`src/components/homepage-prototype/learning.module.css:13` likewise has a static backdrop with blur(8px).
`src/components/ui/modal.tsx` waits for the surface animation to finish before unmounting. The age picker similarly waits before closing/navigating. Thus the surface fades to invisible while the backdrop remains fully dark, then the backdrop is removed. User reports precisely this two-stage disappearance.

## Target and conventions
Preserve existing dialogMotion: entry 200ms, exit 150ms, scale(.98), easing cubic-bezier(0.25, 1, 0.5, 1). Synchronize backdrop opacity 0→1 / 1→0 with the same start time, duration and easing as the native dialog surface. Keep backdrop in the top layer until both finish. Reduced motion: both opacity-only, at most120ms; keyboard: both instant. Preserve blur strength and colors, never animate blur. Existing surface-motion.tsx is the timing/convention exemplar; no parallel library or token system.

## Implementation steps
1. Implement dedicated native-dialog motion coordination (not automatic behavior for every surface), preferably WAAPI pseudoElement ::backdrop effect. Handle actual browser support safely; avoid invalid commitStyles on pseudo-elements. Ensure interruption does not reset backdrop to full opacity and cleanup cancels all animation effects/listeners.
2. Update native service dialogs and age picker to call the coordinated helper, retaining focus, scroll locking, dismissal, routing, and current layouts.
3. Check Vaul sheets' native overlay/sheet timing for this specific mismatch; do not alter their gesture behavior unless the same defect is demonstrated.
4. Run TypeScript and focused ESLint, and a targeted synchronization test for timelines, reduced motion and keyboard duration.

## Scope boundaries
No redesign, filter/menu/card changes, library installation, commits or unrelated cleanup. Preserve all pre-existing working-tree changes. No generic audit beyond this bug.

## Verification
Check age-picker Continue and X, desktop service modal close/Escape/outside-click, reopening, and modal-to-modal navigation. Both overlay and panel must start fading in the same frame and finish together. No fully dimmed frame after the dialog becomes invisible. Check cancelled entry followed by exit, reduced-motion fade-only and instant keyboard paths. Review recorded/slow motion if available; report if tooling cannot record. Real-device Vaul gesture feel remains outside this native-dialog correction.
