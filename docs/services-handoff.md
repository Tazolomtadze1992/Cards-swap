# Services handoff

The services page lives at `/prototypes/services`. `services-page.tsx` opens overview, people, referral, Barnahus and contact dialogs. The “help needed—where to start” row opens `services-start-dialog.tsx`, based on N5 section 2 and its visual map. It presents urgent help openly, four expandable explanations of possible help routes, and a visible fallback for when the first person cannot help. Its services action opens the existing contact dialog. This is an informational guide, not a questionnaire or mandatory sequence.

Dialogs reuse `src/components/ui/modal.tsx` and reading content styles. Contact cards reuse `src/components/services/service-contact-card.tsx`; their heading area stacks title, left-aligned pills and description. Contact data is in `services-contacts-data.ts`. Telephone links and copy controls should retain their semantic behavior; no test calls should be placed during QA.

`ExplainedText` and `TermExplanation` supply bold colored definitions from a limited glossary/service term list. Mouse users can hover; tap/click pins the explanation, and the close control dismisses it. Matching currently uses exact words, not Georgian word inflections. Extend content mappings deliberately when integrating approved copy.

Content and service details require owner approval and an update process. This handoff records the existing implementation; it does not independently verify the service information. Preserve dialog focus management, scroll handling and readable multiline heading spacing when porting.
