# Motion correction plans

| Order | Plan | Dependencies | Status |
| --- | --- | --- | --- |
| 1 | [Synchronize native dialog and backdrop](001-synchronize-dialog-backdrop.md) | Existing first motion pass | DONE |

Verified synchronized WAAPI timing, cancellation, reduced-motion and keyboard branches with focused tests; TypeScript/ESLint passed. Browser checked age-picker Continue, service modal pointer close, Enter/Escape, focus return, and scroll-lock cleanup. No frame-by-frame recording was available.
