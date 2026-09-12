"use client";

import { useState, useRef, type CSSProperties } from "react";
import { ChevronsRight } from "lucide-react";
import { DialRoot, useDialKit } from "dialkit";
import "dialkit/styles.css";
import styles from "./cards-prototype.module.css";

export const cards = [
  { id: "support", illustrationWidth: 70.938, illustrationHeight: 73.801, label: "სერვისები და დახმარება", color: "#f8ecd7", ink: "#393939", x: 0, y: 5.77, width: 361.575, height: 380.813, angle: -14.6 },
  { id: "video", illustrationWidth: 98.879, illustrationHeight: 67.613, label: "ვიდეო ბიბლიოთეკა", color: "#ff8361", ink: "#301912", x: 203.6, y: 41.23, width: 333.255, height: 356.023, angle: -8.21 },
  { id: "resources", illustrationWidth: 92.197, illustrationHeight: 80.192, label: "რესურსები", color: "#0093d9", ink: "#ffffff", x: 394.63, y: 0, width: 306.458, height: 331.956, angle: -2.88 },
  { id: "faq", illustrationWidth: 79.501, illustrationHeight: 60.537, label: "ხშირად დასმული კითხვები", color: "#dddd62", ink: "#331a13", x: 584.27, y: 54.3, width: 302.694, height: 328.538, angle: 2.17 },
  { id: "quiz", illustrationWidth: 96.001, illustrationHeight: 85.191, label: "ქვიზები და სცენარები", color: "#a5d089", ink: "#393939", x: 755.99, y: 6.01, width: 359.652, height: 379.156, angle: 14.13 },
] as const;

const actionLabels: Record<string, string> = {
  support: "დახმარების ნახვა", video: "ვიდეოების ნახვა", resources: "რესურსების ნახვა",
  faq: "კითხვების ნახვა", quiz: "ქვიზების ნახვა",
};

type CardPalette = Partial<Record<(typeof cards)[number]["id"], { background: string; text: string }>>;

type DeckProps = { palette?: CardPalette; hoverDuration?: number; returnDuration?: number; clickDuration?: number; expandedScale?: number; onNavigate?: (id: string) => void };

/** Standalone React component; navigation is supplied by the Laravel host. */
export function CardDeck({ hoverDuration = 600, returnDuration = 600, clickDuration = 650, expandedScale = 1.55, palette, onNavigate }: DeckProps) {
  const [active, setActive] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const close = () => {
    if (active) triggers.current[active]?.focus({ preventScroll: true });
    setActive(null);
    setNotice("");
  };
  return <section className={styles.design} data-expanded={!!active} aria-label="ინფორმაციის კატეგორიები"
    onKeyDown={event => { if (event.key === "Escape") close(); }}
    onClick={event => { if (!(event.target as HTMLElement).closest("[data-card-slot], button")) close(); }}>
    <h1>ერთი სივრცე ყველა საჭირო ინფორმაციისთვის</h1>
    <ul className={styles.deck}>
      {cards.map((card, index) => {
        const selected = active === card.id;
        const smallIndex = cards.filter(item => item.id !== active).findIndex(item => item.id === card.id);
        const centerX = card.x + card.width / 2;
        const centerY = card.y + card.height / 2;
        const targetX = selected ? 557.821 : 407.821 + smallIndex * 100;
        const targetY = selected ? 135 : 135 + 317.76 * expandedScale / 2 + 83;
        return <li key={card.id} className={styles.slot} data-card-slot data-selected={selected} data-small={!!active && !selected} style={{
          "--x": `${card.x / 11.15642}%`, "--y": `${card.y / 11.15642}cqw`,
          "--w": `${card.width / 11.15642}%`, "--h": `${card.height / 11.15642}cqw`,
          "--illustration-width": `${card.illustrationWidth / 11.15642}cqw`, "--illustration-height": `${card.illustrationHeight / 11.15642}cqw`,
          "--hover-duration": `${hoverDuration}ms`, "--return-duration": `${returnDuration}ms`,
          "--click-duration": `${clickDuration}ms`,
          "--move-x": active ? `${(targetX - centerX) / 11.15642}cqw` : "0cqw",
          "--move-y": active ? `${(targetY - centerY) / 11.15642}cqw` : "0cqw",
          "--mobile-x": `${(smallIndex - 1.5) * 56}px`,
          "--deck-scale": active ? selected ? expandedScale : 0.65 : 1,
          "--angle": `${active ? selected ? 0 : card.angle * 0.2 : card.angle}deg`,
          "--card-color": palette?.[card.id]?.background ?? card.color, "--card-ink": palette?.[card.id]?.text ?? card.ink,
          zIndex: active ? selected ? 10 : 20 + index : index,
        } as CSSProperties}>
          <div className={styles.hitArea}>
            <article className={styles.card} data-card={card.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/assets/cards/${card.id}.svg`} width={card.illustrationWidth} height={card.illustrationHeight} alt="" />
              <h2>{card.label}</h2>
              <button ref={element => { triggers.current[card.id] = element; }} className={styles.cardTrigger}
                aria-label={card.label} aria-expanded={selected} aria-controls={`card-action-${card.id}`}
                onClick={() => { setNotice(""); if (selected) close(); else setActive(card.id); }} />
              <button id={`card-action-${card.id}`} className={styles.cardAction} aria-hidden={!selected} tabIndex={selected ? 0 : -1}
                onClick={() => { if (onNavigate) onNavigate(card.id); else setNotice("ეს ღილაკი შესაბამის გვერდზე გადავა — ბმულს მოგვიანებით დავამატებთ."); }}>
                {actionLabels[card.id]}<ChevronsRight size={18} aria-hidden="true" />
              </button>
            </article>
          </div>
        </li>;
      })}
    </ul>
    {active && <button className={styles.closeDeck} onClick={close}>დაბრუნება <span aria-hidden="true">×</span></button>}
    <p className={styles.notice} role="status">{notice}</p>
  </section>;
}

export default function CardsPrototype() {
  const [view, setView] = useState("design");
  const timing = useDialKit("Card hover · milliseconds", {
    hoverDuration: [600, 100, 1500, 10],
    returnDuration: [600, 100, 1500, 10],
  }, { id: "cards-hover-timing-600", persist: true, defaultCollapsed: true });
  const click = useDialKit("Card click", {
    duration: [650, 200, 1600, 10],
    expandedScale: [1.55, 1.3, 1.7, 0.05],
  }, { id: "cards-click-v1", persist: true, defaultCollapsed: true });
  const colors = useDialKit("Colors", {
    page: { _collapsed: true, background: "#faf4ea", heading: "#005c53" },
    services: { _collapsed: true, background: cards[0].color, text: cards[0].ink },
    video: { _collapsed: true, background: cards[1].color, text: cards[1].ink },
    resources: { _collapsed: true, background: cards[2].color, text: cards[2].ink },
    faq: { _collapsed: true, background: cards[3].color, text: cards[3].ink },
    quizzes: { _collapsed: true, background: cards[4].color, text: cards[4].ink },
  }, { id: "cards-colors-v1", persist: true });
  return <main className={styles.playground} style={{
    "--page-background": colors.page.background, "--page-heading": colors.page.heading,
  } as CSSProperties}>
    <header className={styles.toolbar} lang="en">
      <div><strong>Card playground</strong><span>03 / Click interaction</span></div>
      <nav aria-label="Playground views">
        {[["design", "Design"], ["reference", "Motion reference"]].map(([id, label]) =>
          <button key={id} aria-pressed={view === id} onClick={() => setView(id)}>{label}</button>)}
        <a href="https://www.figma.com/design/YqyCMj54On5xNGIHkZ1t6k/First-Design-Draft?node-id=396-7803" target="_blank" rel="noreferrer">Figma ↗</a>
      </nav>
    </header>
    {view === "design" ? <CardDeck hoverDuration={timing.hoverDuration} returnDuration={timing.returnDuration} clickDuration={click.duration} expandedScale={click.expandedScale} palette={{ support: colors.services, video: colors.video, resources: colors.resources, faq: colors.faq, quiz: colors.quizzes }} /> : <section className={styles.reference} lang="en">
      <h1>Interaction reference</h1>
      <p>Fan → expanded card with a smaller deck below → return to fan.</p>
      <video controls playsInline preload="metadata" src="/assets/cards/motion-reference.mp4" aria-label="Original card interaction recording" />
      <p>Click reference: enlarge, gather the remaining cards, and return to the fan.</p>
    </section>}
    <footer className={styles.footer} lang="en">Click a card to open it. Click another to switch; click the background or press Escape to return.</footer>
    <DialRoot position="bottom-right" theme="light" productionEnabled />
  </main>;
}
