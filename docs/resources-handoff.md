# Resources prototype handoff

Source: Figma `YqyCMj54On5xNGIHkZ1t6k`, node `681:4366`.

The page is available at `/prototypes/resources` and reuses the homepage header. The homepage Resources navigation item opens it directly. The Resources card keeps the deck choreography: its first click expands the card and a second click anywhere on the expanded card opens this page. The stakeholder cards-only playground remains self-contained and never navigates away.

Resource type and age use compact dropdowns. Resource type supports multiple selections while age is a single-select choice (`ყველა ასაკი`, `6–9`, `9–13`, `13–18`). Both filters combine, the file count updates immediately, and the clear action resets both controls. The selected states use native checkboxes and radio inputs.

Each resource card shows its age as a 14px pill with a 15% black fill. Document cards place it at the top-right; video cards align it at the lower-right beside the 26px title.

The 23 Georgian resource entries are temporary prototype content. The two video thumbnails and resource illustrations are exact exported Figma assets; final video URLs and downloadable files still need to be connected by the Laravel application.
