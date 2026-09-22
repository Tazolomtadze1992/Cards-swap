"use client";

import { useEffect, useId, useRef, useState } from "react";
import { menuMotion, useSurfacePresence } from "../motion/surface-motion";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "../ui/icon";
import { labelText } from "./label-text";
import { SiteSearchDialog } from "./site-search-dialog";
import styles from "./site-header.module.css";

const navigationItems = [
  { id: "home", label: "მთავარი", href: "/prototypes/homepage" },
  { id: "learning", label: "სწავლა და პრაქტიკა", href: "/prototypes/learning" },
  { id: "resources", label: "რესურსები", href: "/prototypes/resources" },
  { id: "glossary", label: "ლექსიკონი", href: "/prototypes/glossary" },
  { id: "faq", label: "ხშირად დასმული კითხვები", href: "/prototypes/faq" },
  { id: "support", label: "მხარდამჭერი სერვისები", href: "/prototypes/services" },
] as const;

type NavigationItem = (typeof navigationItems)[number]["id"];
type SiteHeaderProps = {
  activeItem?: NavigationItem;
  appearance?: "light" | "brand-surface";
};

export function SiteHeader({ activeItem, appearance = "light" }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const menu = useSurfacePresence(menuOpen, menuMotion, "(max-width: 1400px)");
  const [hidden, setHidden] = useState(false);
  const [surface, setSurface] = useState(appearance);
  const [scrolled, setScrolled] = useState(false);
  const spacerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const navigationId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLSpanElement>(null);
  const navigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let previousY = Math.max(0, window.scrollY);
    let downwardTravel = 0;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = Math.max(0, Math.min(window.scrollY, document.documentElement.scrollHeight - window.innerHeight));
      const delta = y - previousY;
      // Scroll locking the open menu resets window.scrollY; preserve the page state.
      if (!menu.present) setScrolled(y > 0);
      const keyboardFocus = !!header.querySelector(":focus-visible");
      if (y < header.offsetHeight || menuOpen || searchOpen || keyboardFocus) {
        setHidden(false);
        downwardTravel = 0;
      } else if (delta < -2) {
        setHidden(false);
        downwardTravel = 0;
      } else if (delta > 0) {
        downwardTravel += delta;
        if (downwardTravel > 48) setHidden(true);
      }
      previousY = y;
      // Section geometry stays reliable even while the header is translated away.
      const sampleY = header.offsetHeight / 2;
      const brandSection = Array.from(document.querySelectorAll('[data-header-surface="brand-surface"]'))
        .find(section => {
          const rect = section.getBoundingClientRect();
          return rect.top <= sampleY && rect.bottom > sampleY;
        });
      if (!menu.present) {
        setSurface(brandSection ? "brand-surface" : "light");
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(() => {
      if (spacerRef.current) spacerRef.current.style.height = `${header.offsetHeight}px`;
      frameRef.current?.style.setProperty("--header-height", `${header.offsetHeight}px`);
      schedule();
    });
    observer.observe(header);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [menuOpen, menu.present, searchOpen]);

  useEffect(() => {
    const openSearch = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.altKey || event.shiftKey || event.key.toLowerCase() !== "k") return;
      event.preventDefault();
      setMenuOpen(false);
      setHidden(false);
      setSearchOpen(true);
    };
    document.addEventListener("keydown", openSearch);
    return () => document.removeEventListener("keydown", openSearch);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1251px)");
    const onChange = () => { if (desktop.matches) setMenuOpen(false); };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!menu.present) return;
    const scrollY = window.scrollY;
    const menuButton = menuButtonRef.current?.querySelector("button");
    const body = document.body;
    const previous = { position: body.style.position, top: body.style.top, width: body.style.width, overflow: body.style.overflow };
    const htmlOverflow = document.documentElement.style.overflow;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Keep background content out of the focus order and accessibility tree.
    const background: { element: HTMLElement; inert: boolean }[] = [];
    let branch: HTMLElement | null = frameRef.current;
    while (branch?.parentElement) {
      for (const sibling of branch.parentElement.children) {
        if (sibling !== branch && sibling instanceof HTMLElement) {
          background.push({ element: sibling, inert: sibling.inert });
          sibling.setAttribute("inert", "");
        }
      }
      branch = branch.parentElement;
      if (branch === body) break;
    }
    navigationRef.current?.querySelector("a")?.focus({ preventScroll: true });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
      }
      if (event.key === "Tab") {
        const items = Array.from(headerRef.current?.querySelectorAll<HTMLElement>('a[href], button:not(:disabled)') ?? [])
          .filter(element => element.getClientRects().length > 0);
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      background.forEach(({ element, inert }) => { element.toggleAttribute("inert", inert); });
      Object.assign(body.style, previous);
      document.documentElement.style.overflow = htmlOverflow;
      window.scrollTo({ top: scrollY, behavior: "instant" });
      menuButton?.focus({ preventScroll: true });
    };
  }, [menu.present]);

  const contact = <Button asChild size="contact" variant={surface === "brand-surface" ? "inverse" : "primary"}><Link href="/prototypes/homepage#homepage-faq" onClick={() => setMenuOpen(false)}>
    <Icon name="phone" size="small" />
    {labelText("კონტაქტი")}
  </Link></Button>;

  const logo = <Link className={styles.logoLink} href="/prototypes/homepage" aria-label="მთავარ გვერდზე დაბრუნება" onClick={() => setMenuOpen(false)}>
      <Image className={styles.logoOnLight} src="/assets/homepage/council-of-europe-logo-on-cream.png" width={296} height={238} alt="" priority />
      <Image className={styles.logoOnBrand} src="/assets/homepage/council-of-europe-logo.png" width={296} height={238} alt="" priority />
    </Link>;
  return <div ref={spacerRef} className={styles.spacer}>
    <div ref={frameRef} className={styles.frame} data-hidden={hidden && !menu.present && !searchOpen} data-appearance={surface} data-scrolled={scrolled} data-menu-open={menu.present}
      role={menu.present ? "dialog" : undefined} aria-modal={menu.present || undefined} aria-label={menu.present ? "მთავარი მენიუ" : undefined}>
    <header ref={headerRef} className={styles.header} data-appearance={surface} onFocusCapture={() => setHidden(false)}>
    {logo}
    <nav ref={node => { navigationRef.current = node; menu.attach(node); }} id={navigationId} className={styles.navigation} data-open={menu.present} aria-label="მთავარი ნავიგაცია">
      <div className={styles.navigationLinks}>{navigationItems.map(item => <Link href={item.href} key={item.id} aria-current={activeItem === item.id ? "page" : undefined} onClick={() => setMenuOpen(false)}>
        {menu.present ? item.label : labelText(item.label)}
      </Link>)}</div>
      <span className={styles.menuContact}>{contact}</span>
    </nav>
    <span className={styles.headerActions}>
      <span className={styles.headerSearch}><Button variant="subtle" size="icon" aria-label="ძიების გახსნა" aria-keyshortcuts="Control+K Meta+K" onClick={() => { setMenuOpen(false); setHidden(false); setSearchOpen(true); }}><Icon name="search" /></Button></span>
      <span className={styles.headerContact}>{contact}</span>
    </span>
    <span className={styles.menuButton} ref={menuButtonRef}><Button variant={surface === "brand-surface" ? "inverse" : "subtle"} size="icon" aria-label={menuOpen ? "მენიუს დახურვა" : "მენიუს გახსნა"} aria-expanded={menuOpen} aria-controls={navigationId} onClick={() => setMenuOpen(open => !open)}>
      <span className={styles.menuGlyph} data-open={menuOpen} aria-hidden="true"><span /><span /><span /></span>
    </Button></span>
  </header>
    </div>
    {searchOpen && <SiteSearchDialog onClose={() => setSearchOpen(false)} />}
  </div>;
}
