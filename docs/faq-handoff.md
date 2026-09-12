# FAQ page prototype

Source: Figma `YqyCMj54On5xNGIHkZ1t6k`, node `637:3463`.

The full page is available at `/prototypes/faq`. It reuses the homepage header, the approved FAQ card illustration, and the same native single-open accordion component as the homepage. The homepage renders the first six entries; the FAQ page renders all twelve entries from `src/components/homepage-prototype/faq-data.ts`.

Homepage navigation and the homepage `ყველას ნახვა` button open this page directly. In both card decks, the FAQ card's first click runs the existing 650ms expansion choreography. The expanded card is one unified click target: a second click anywhere on the large card, including its visible action label, opens this page.

The twelve Georgian answers are temporary prototype copy and need editorial approval before production handoff. The first five question titles follow the supplied Figma page; the remaining questions complete the prototype dataset. Layout adapts the 1191px Figma accordion to narrow screens without horizontal overflow.
