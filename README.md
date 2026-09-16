# Digital Child Safety Hub

Full interactive prototype for the Digital Child Safety Hub.

The prototype includes:

- five illustrated category cards based on the supplied Figma designs;
- a 600ms lift-and-scale hover treatment;
- click-to-expand, card switching, and return interactions;
- responsive, keyboard, touch, and reduced-motion behavior; and
- the homepage and connected learning, resources, glossary, FAQ, and services pages.

## Run locally

This project uses Node.js and pnpm.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to reach the full homepage. The standalone cards playground has been removed.

## Review and developer handoff

Colors, typography, and motion use the approved project defaults.

The reusable `CardDeck` component uses plain React and CSS. A Laravel application can mount it through an existing React or Inertia entry point. See [docs/cards-handoff.md](docs/cards-handoff.md) for behavior, integration notes, current values, and remaining production decisions.

The homepage and connected pages are available without the prototype password gate.

## Main stack

- Next.js 16
- React 19 and TypeScript
- CSS Modules
- Lucide React

Run `pnpm build` to verify a production build.
