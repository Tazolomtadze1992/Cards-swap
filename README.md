# Cards Swap prototype

Interactive React prototype for the Digital Child Safety Hub card deck.

The prototype includes:

- five illustrated category cards based on the supplied Figma designs;
- a 600ms lift-and-scale hover treatment;
- click-to-expand, card switching, and return interactions;
- responsive, keyboard, touch, and reduced-motion behavior;
- DialKit controls for animation timing, expanded scale, and colors; and
- the supplied motion recording as an in-page reference.

## Run locally

This project uses Node.js and pnpm.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The dedicated review route is also available at `/prototypes/cards`.

## Review and developer handoff

Use the DialKit panel in the lower-right corner to test values. Settings are saved in the current browser, and **Copy parameters** produces values that can be shared back with the team.

The reusable `CardDeck` component uses plain React and CSS. A Laravel application can mount it through an existing React or Inertia entry point. See [docs/cards-handoff.md](docs/cards-handoff.md) for behavior, integration notes, current values, and remaining production decisions.

## Main stack

- Next.js 16
- React 19 and TypeScript
- CSS Modules
- DialKit
- Lucide React

Run `pnpm build` to verify a production build.
