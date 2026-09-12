# Card prototype — stage 03

Review route: `/prototypes/cards`.

## Design and behavior

The resting layout uses the exact exported SVG illustrations, font, colors, labels, and rotations from Figma node `396:7803`. Expanded card treatment follows node `604:1893`: title moves beneath the illustration and a rounded, translucent action button appears near the bottom. The mockup pairs a puzzle illustration with FAQ text; the implementation intentionally preserves the correct category labels across all five cards. Button labels other than the supplied FAQ label are provisional.

Hover retains the approved 600ms entry and return timing, with a 3% lift and 1.03 scale. A stationary rotated hit area prevents edge flicker.

Click enlarges and straightens the selected card at center, moves its title up, and reveals its action. Remaining cards gather underneath at 0.65 scale, retaining their order and a small angle. They slightly overlap the selected card without covering its action. Click another card to switch. Click the active card or background, or press Escape to close. Native buttons support keyboard and touch activation. Reduced-motion settings disable geometric transitions. Mobile uses a compact fixed-size expanded layout and smaller selection row.

The starting click calibration is 650ms, cubic-bezier(0.22, 1, 0.36, 1), with 1.45 enlarged scale; this approximates the recording rather than claiming exact original timing. Interrupted transitions resume from their current values.

## Approved motion values

The live prototype fixes hover and return duration at 600ms, click duration at 650ms, and desktop expanded scale at 1.45. `CardDeck` still accepts these as props for developer integration, but the reviewer-facing DialKit does not expose them. The mobile expanded size is constrained independently for readability.

## Developer integration

The preview shell uses Next.js, React, TypeScript and CSS modules. CardDeck uses no Next.js APIs and receives timing, scale and optional onNavigate(categoryId) props. The Laravel host supplies the destination navigation callback. Without a callback, the action remains inert. Transfer CardDeck, the card data and labels, the CSS module, font and five SVG assets to the Laravel React entry or existing Inertia React page. Adjust asset URLs to the host base path. DialKit belongs to the review wrapper and is not required by CardDeck.

The existing local font is used for review; confirm web embedding rights before production delivery. Next steps are visual tuning and real destination wiring.

## Validation

Production build and TypeScript passed. Browser checks covered opening, switching, action activation, and Escape return. Real-device touch testing remains for final handoff.

## Color review

Colors is the only reviewer-facing DialKit panel. It groups page background/heading and background/text controls for each category. Defaults use the approved palette, including `#5EA8FF` for the resources card and its book illustration. Card colors apply consistently to resting, hovering, expanded and small-deck states; the translucent action background follows its card and its text/chevrons inherit the text color. Colors persist on each reviewer’s browser under `cards-colors-v2`; DialKit versions and Copy parameters allow comparison and sharing. CardDeck accepts an optional palette prop independently of DialKit.
