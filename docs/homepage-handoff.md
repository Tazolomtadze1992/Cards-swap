# Homepage prototype

> Update: The live tuning panel and its dependency have been removed. The project now uses the approved defaults; tuning references below describe earlier review work.
Source: Figma `YqyCMj54On5xNGIHkZ1t6k`, node `396:7780`.

`/prototypes/homepage` adds the original hero and FAQ around the shared `CardDeck`. `/` and `/prototypes/cards` retain the standalone cards playground. A top navigation switches between the two views during local development. It is hidden in production so people using the shared live cards link see only the cards prototype and its DialKit color controls. The homepage remains available by its direct route. Both use the existing persisted Colors panel, dark theme, approved heading/resources colors, 600ms hover and 1.45 expanded scale.

Hero and FAQ artwork are exact downloaded Figma exports in `public/assets/homepage`. Layout uses CSS modules, with the desktop design adapted to a narrow screen layout. No extra runtime dependencies were added.

The FAQ reuses the card deck's `public/assets/cards/faq.svg` illustration at the Figma-specified `220.156 × 167.643px` desktop size. FAQ rows use 20% black backgrounds and 32px padding on every side. The homepage shows the first six questions. The `ყველას ნახვა` button follows the rows with the Figma-specified 20% black pill, 32px horizontal padding and 16px vertical padding, and opens `/prototypes/faq`.

FAQ answers are temporary Georgian review copy approved for this prototype, not final editorial content. Native details/summary provides keyboard-operable, single-open accordions. The homepage navigation opens `/prototypes/resources`, `/prototypes/glossary`, and `/prototypes/faq`. The Resources and FAQ cards preserve the deck choreography: the first click expands the card, and a second click anywhere on the large card opens its page. Contact currently points to the support-related FAQ; wire the final contact destination when supplied. Other card action destinations still belong to the Laravel host via `onNavigate`.

Validation: production build; desktop 1440px and mobile 390px rendering without horizontal overflow; all images loaded; FAQ open/switch; resource-card expand/Escape; both mode links; no browser runtime errors.
