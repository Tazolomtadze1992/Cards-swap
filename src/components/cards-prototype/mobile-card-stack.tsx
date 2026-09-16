"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform, type PanInfo } from "motion/react";
import { ChevronsRight } from "lucide-react";
import { Button } from "../ui/button";
import { labelText } from "../homepage-prototype/label-text";
import styles from "./mobile-card-stack.module.css";

type StackCard = { id: string; label: string; color: string; ink: string };
type Props = { cards: readonly StackCard[]; palette?: Partial<Record<string, { background: string; text: string }>>; onNavigate?: (id: string) => void };
const descriptions: Record<string, string> = {
  support: "იპოვე სანდო დახმარება და გაიგე, ვის შეგიძლია მიმართო.",
  video: "უყურე მოკლე ვიდეოებს და გაიგე მეტი ონლაინ უსაფრთხოებაზე.",
  resources: "აღმოაჩინე სასარგებლო მასალა და პრაქტიკული რჩევები.",
  faq: "იპოვე პასუხები ონლაინ უსაფრთხოების შესახებ შენს კითხვებზე.",
  quiz: "გამოცადე შენი ცოდნა და ივარჯიშე რეალურ სიტუაციებში.",
};
const actions: Record<string, string> = {
  support: "დახმარების ნახვა", video: "ვიდეოების ნახვა", resources: "რესურსების ნახვა",
  faq: "კითხვების ნახვა", quiz: "ქვიზების ნახვა",
};
const settle = { type: "spring" as const, stiffness: 330, damping: 30, mass: 0.85 };
const stackPose = (rank: number) => ({ x: rank * 5, y: rank * 3, rotate: rank * 2, scale: 1 - rank * 0.012 });

export function MobileCardStack({ cards, palette, onNavigate }: Props) {
  const [order, setOrder] = useState(() => cards.map(card => card.id));
  const [departing, setDeparting] = useState<string | null>(null);
  const nextRef = useRef<(() => void) | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    const slot = stackRef.current?.firstElementChild as HTMLElement | null;
    if (!root || !slot) return;
    const centerStack = () => {
      const width = slot.offsetWidth;
      const height = slot.offsetHeight;
      if (!width || !height) return;
      // Include the rotated rear cards in the resting stack's horizontal bounds.
      const edges = cards.flatMap((_, rank) => {
        const pose = stackPose(rank);
        const angle = pose.rotate * Math.PI / 180;
        return [0, width].flatMap(x => [0, height].map(y =>
          width / 2 + pose.x + pose.scale * (
            (x - width / 2) * Math.cos(angle) - (y - height * 0.85) * Math.sin(angle)
          )
        ));
      });
      const offset = (width - Math.min(...edges) - Math.max(...edges)) / 2;
      root.style.transform = `translateX(${offset}px)`;
    };
    const observer = new ResizeObserver(centerStack);
    observer.observe(slot);
    return () => observer.disconnect();
  }, [cards]);

  return <div ref={rootRef} className={styles.root} role="region" aria-roledescription="კარუსელი" aria-label="ინფორმაციის კატეგორიები" tabIndex={0}
    onKeyDown={event => {
      if ((event.key === "ArrowRight" || event.key === "ArrowLeft") && !departing) {
        event.preventDefault(); nextRef.current?.();
      }
    }}>
    <div ref={stackRef} className={styles.stack}>
      {cards.map(card => {
        const rank = order.indexOf(card.id);
        const visualRank = departing && rank > 0 ? rank - 1 : rank;
        return <motion.div key={card.id} className={styles.slot} data-stack-card={card.id} data-front={rank === 0}
          aria-hidden={rank !== 0} inert={rank !== 0}
          style={{ zIndex: cards.length - rank }}
          initial={false} animate={stackPose(visualRank)}
          transition={reduced ? { duration: 0.1 } : settle}>
          <SwipeCard card={card} color={palette?.[card.id]} front={rank === 0} blocked={departing !== null}
            onStart={() => setDeparting(card.id)} onCycle={() => {
              setOrder(current => [...current.slice(1), current[0]]);
              setDeparting(null);
            }} nextRef={nextRef} onNavigate={onNavigate} />
        </motion.div>;
      })}
    </div>
    <span className={styles.srOnly} aria-live="polite">{cards.find(card => card.id === order[0])?.label}</span>
    <button className={styles.keyboardNext} onClick={() => nextRef.current?.()}>შემდეგი ბარათი</button>
  </div>;
}

function SwipeCard({ card, color, front, blocked, onStart, onCycle, nextRef, onNavigate }: {
  card: StackCard; color?: { background: string; text: string }; front: boolean; blocked: boolean;
  onStart: () => void; onCycle: () => void; nextRef: React.RefObject<(() => void) | null>; onNavigate?: (id: string) => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-12, 0, 12]);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const swiping = useRef(false);
  const dragged = useRef(false);
  const animation = useRef<ReturnType<typeof animate> | null>(null);
  const mounted = useRef(true);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; animation.current?.stop(); }; }, []);

  async function cycle(direction = -1, velocity = 0) {
    if (!front || blocked || swiping.current) return;
    swiping.current = true;
    onStart();
    const clearance = (ref.current?.offsetWidth ?? 300) + 24;
    if (!reduced && direction * x.get() < clearance) {
      let clearStack!: () => void;
      const cleared = new Promise<void>(resolve => { clearStack = resolve; });
      // Aim beyond the clearance point so the card never parks at an outer
      // spring endpoint. Hand it to the back of the deck while still moving.
      animation.current = animate(x, direction * (clearance + 96), {
        ...settle, stiffness: 420, velocity,
        onUpdate: value => { if (direction * value >= clearance) clearStack(); },
      });
      await Promise.race([cleared, animation.current]);
      animation.current.stop();
    }
    if (!mounted.current) return;
    onCycle();
    // Turn immediately into the return instead of carrying outward momentum
    // into a second pause behind the deck.
    animation.current = animate(x, 0, reduced ? { duration: 0.1 } : { ...settle, velocity: 0 });
    await animation.current;
    swiping.current = false;
  }
  useEffect(() => {
    if (front) nextRef.current = () => { void cycle(); };
    return () => { if (front) nextRef.current = null; };
  });

  function release(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    const threshold = (ref.current?.offsetWidth ?? 300) * 0.22;
    const flick = Math.abs(info.velocity.x) > 450 && Math.abs(info.offset.x) > 12;
    if (Math.abs(info.offset.x) > threshold || flick) {
      void cycle(Math.sign(flick ? info.velocity.x : info.offset.x) || -1, info.velocity.x);
    } else {
      animation.current = animate(x, 0, reduced ? { duration: 0.1 } : { ...settle, velocity: info.velocity.x });
    }
  }
  return <motion.article ref={ref} className={styles.card}
    style={{ x, rotate: reduced ? 0 : rotate, background: color?.background ?? card.color, color: color?.text ?? card.ink }}
    drag={front && !blocked ? "x" : false} dragMomentum={false}
    onDragStart={() => { animation.current?.stop(); dragged.current = true; }} onDragEnd={release}
    onPointerDownCapture={() => { dragged.current = false; }}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={`/assets/cards/${card.id}.svg`} width={120} height={112} alt="" draggable={false} />
    <h3>{card.label}</h3>
    <p>{descriptions[card.id]}</p>
    <div className={styles.action}><Button variant="cardAction" size="compact" fullWidth tabIndex={front ? 0 : -1} onClick={event => {
      if (dragged.current || swiping.current) { event.preventDefault(); return; }
      onNavigate?.(card.id);
    }}>{labelText(actions[card.id])}<ChevronsRight size={18} aria-hidden="true" /></Button></div>
  </motion.article>;
}
