# Homepage prototype

Source: Figma `YqyCMj54On5xNGIHkZ1t6k`, node `396:7780`.

`/prototypes/homepage` adds the original hero and FAQ around the shared `CardDeck`. `/` and `/prototypes/cards` retain the standalone cards playground. A top navigation switches between the two views. Both use the existing persisted Colors panel, dark theme, approved heading/resources colors, 600ms hover and 1.45 expanded scale.

Hero and FAQ artwork are exact downloaded Figma exports in `public/assets/homepage`. Layout uses CSS modules, with the desktop design adapted to a narrow screen layout. No extra runtime dependencies were added.

FAQ answers are temporary Georgian review copy approved for this prototype, not final editorial content. The repeated final FAQ title matches Figma. Native details/summary provides keyboard-operable, single-open accordions. Navigation targets the available page sections; the glossary label is inactive because no glossary design is part of this homepage. Contact currently points to the support-related FAQ; wire the final contact destination when supplied. Existing card action destinations still belong to the Laravel host via `onNavigate`.

Validation: production build; desktop 1440px and mobile 390px rendering without horizontal overflow; all images loaded; FAQ open/switch; resource-card expand/Escape; both mode links; no browser runtime errors.
