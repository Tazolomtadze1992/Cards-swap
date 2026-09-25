"use client";

import { useState, useRef, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { ChevronsRight } from "lucide-react";
import styles from "./cards-prototype.module.css";
import { MobileCardStack } from "./mobile-card-stack";
import { labelText } from "../homepage-prototype/label-text";
import { HomepageHero, HomepageFaq } from "../homepage-prototype/homepage-sections";

export const cards = [
  { id: "support", illustrationWidth: 70.938, illustrationHeight: 73.801, label: "სერვისები და დახმარება", color: "#f0fe83", ink: "#332b2d", x: 0, y: 5.77, width: 361.575, height: 380.813, angle: -14.6 },
  { id: "video", illustrationWidth: 98.879, illustrationHeight: 67.613, label: "ვიდეო ბიბლიოთეკა", color: "#ff8361", ink: "#3d1f17", x: 203.6, y: 41.23, width: 333.255, height: 356.023, angle: -8.21 },
  { id: "resources", illustrationWidth: 92.197, illustrationHeight: 80.192, label: "რესურსები", color: "#97e54c", ink: "#FAF4EA", x: 394.63, y: 0, width: 306.458, height: 331.956, angle: -2.88 },
  { id: "faq", illustrationWidth: 79.501, illustrationHeight: 60.537, label: "ხშირად დასმული კითხვები", color: "#5ea8ff", ink: "#ffffff", x: 584.27, y: 54.3, width: 302.694, height: 328.538, angle: 2.17 },
  { id: "quiz", illustrationWidth: 96.001, illustrationHeight: 85.191, label: "ქვიზები და სცენარები", color: "#ccacb5", ink: "#31402c", x: 755.99, y: 6.01, width: 359.652, height: 379.156, angle: 14.13 },
] as const;

const actionLabels: Record<string, string> = {
  support: "დახმარების ნახვა", video: "ვიდეოების ნახვა", resources: "რესურსების ნახვა",
  faq: "კითხვების ნახვა", quiz: "ქვიზების ნახვა",
};

type CardPalette = Partial<Record<(typeof cards)[number]["id"], { background: string; text: string }>>;

type CardColors = {
  page: { background: string; heading: string };
  services: { background: string; text: string };
  video: { background: string; text: string };
  resources: { background: string; text: string };
  faq: { background: string; text: string };
  quizzes: { background: string; text: string };
};

const defaultColors: CardColors = {
  page: { background: "#FAF4EA", heading: "#3F6CC7" },
  services: { background: cards[0].color, text: cards[0].ink },
  video: { background: cards[1].color, text: cards[1].ink },
  resources: { background: cards[2].color, text: cards[2].ink },
  faq: { background: cards[3].color, text: cards[3].ink },
  quizzes: { background: cards[4].color, text: cards[4].ink },
};

type DeckProps = { homepage?: boolean; palette?: CardPalette; hoverDuration?: number; returnDuration?: number; clickDuration?: number; expandedScale?: number; onNavigate?: (id: string) => void };

/** Standalone React component; navigation is supplied by the Laravel host. */
export function CardDeck({ homepage = false, hoverDuration = 600, returnDuration = 600, clickDuration = 650, expandedScale = 1.45, palette, onNavigate }: DeckProps) {
  const [active, setActive] = useState<string | null>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const close = () => {
    if (active) triggers.current[active]?.focus({ preventScroll: true });
    setActive(null);
  };
  return <section className={styles.design} data-expanded={!!active} aria-label="ინფორმაციის კატეგორიები"
    onKeyDown={event => { if (event.key === "Escape") close(); }}
    onClick={event => { if (!(event.target as HTMLElement).closest("[data-card-slot], button")) close(); }}>
    {homepage ? <h2 className={styles.sectionHeading}>ერთი სივრცე ყველა საჭირო ინფორმაციისთვის</h2> : <h1>ერთი სივრცე ყველა საჭირო ინფორმაციისთვის</h1>}
    <MobileCardStack cards={cards} palette={palette} onNavigate={onNavigate} />
    <ul className={styles.deck}>
      {cards.map((card, index) => {
        const selected = active === card.id;
        const smallIndex = cards.filter(item => item.id !== active).findIndex(item => item.id === card.id);
        const centerX = card.x + card.width / 2;
        const centerY = card.y + card.height / 2;
        const targetX = selected ? 557.821 : 407.821 + smallIndex * 100;
        const targetY = selected ? 135 : 135 + 317.76 * expandedScale / 2 + 83;
        return <li key={card.id} id={`card-${card.id}`} className={styles.slot} data-card-slot data-selected={selected} data-small={!!active && !selected} style={{
          "--fan-offset-x": active ? `${selected ? 0 : -150 + smallIndex * 100}px` : `calc(${(centerX - 557.821) / 755.99} * (100cqw - 362px))`,
          "--fan-offset-y": `${active ? selected ? -24 : 135 + 317.76 * expandedScale / 2 + 83 - 159 : centerY - 159}px`,
          "--fixed-illustration-width": `${card.illustrationWidth}px`,
          "--fixed-illustration-height": `${card.illustrationHeight}px`,
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
                onClick={() => {
                  if (selected && onNavigate) { onNavigate(card.id); return; }
                  if (selected) close();
                  else setActive(card.id);
                }} />
              <span id={`card-action-${card.id}`} className={styles.cardAction} aria-hidden={!selected}>
                {labelText(actionLabels[card.id])}<ChevronsRight size={18} aria-hidden="true" />
              </span>
            </article>
          </div>
        </li>;
      })}
    </ul>
  </section>;
}

function CardsPrototypeView({ homepage = false, colors }: { homepage?: boolean; colors: CardColors }) {
  const router = useRouter();
  return <main className={styles.playground} style={{
    "--page-background": colors.page.background, "--page-heading": colors.page.heading,
  } as CSSProperties}>
    {homepage && <HomepageHero />}
    <div id="homepage-cards"><CardDeck homepage={homepage} onNavigate={homepage ? id => {
      if (id === "faq") router.push("/prototypes/faq");
      if (id === "resources" || id === "video") router.push("/prototypes/resources");
      if (id === "support") router.push("/prototypes/services");
      if (id === "quiz") router.push("/prototypes/learning");
    } : undefined} palette={{ support: colors.services, video: colors.video, resources: colors.resources, faq: colors.faq, quiz: colors.quizzes }} /></div>
    {homepage && <HomepageFaq />}
  </main>;
}

export default function CardsPrototype({ homepage = false }: { homepage?: boolean }) {
  return <CardsPrototypeView homepage={homepage} colors={defaultColors} />;
}
