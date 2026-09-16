# Services handoff

The services page lives at `/prototypes/services`. `services-page.tsx` opens overview, people, referral, Barnahus and contact dialogs. The “help needed—where to start” row is currently static and requires its intended flow before launch.

Dialogs reuse `src/components/ui/modal.tsx` and reading content styles. Contact cards reuse `src/components/services/service-contact-card.tsx`; their heading area stacks title, left-aligned pills and description. Contact data is in `services-contacts-data.ts`. Telephone links and copy controls should retain their semantic behavior; no test calls should be placed during QA.

`ExplainedText` and `TermExplanation` supply bold colored definitions from a limited glossary/service term list. Mouse users can hover; tap/click pins the explanation, and the close control dismisses it. Matching currently uses exact words, not Georgian word inflections. Extend content mappings deliberately when integrating approved copy.

Content and service details require owner approval and an update process. This handoff records the existing implementation; it does not independently verify the service information. Preserve dialog focus management, scroll handling and readable multiline heading spacing when porting.
