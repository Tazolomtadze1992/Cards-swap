import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "../ui/icon";
import { labelText } from "./label-text";
import styles from "./site-header.module.css";

const navigationItems = [
  { id: "learning", label: "სწავლა და პრაქტიკა", href: "/prototypes/learning" },
  { id: "resources", label: "რესურსები", href: "/prototypes/resources" },
  { id: "glossary", label: "ლექსიკონი", href: "/prototypes/glossary" },
  { id: "faq", label: "ხშირად დასმული კითხვები", href: "/prototypes/faq" },
  { id: "support", label: "მხარდამჭერი სერვისები", href: "/prototypes/homepage#card-support" },
] as const;

type NavigationItem = (typeof navigationItems)[number]["id"];
type SiteHeaderProps = {
  activeItem?: NavigationItem;
  appearance?: "light" | "brand-surface";
};

export function SiteHeader({ activeItem, appearance = "light" }: SiteHeaderProps) {
  return <header className={styles.header} data-appearance={appearance}>
    <Link className={styles.logoLink} href="/prototypes/homepage" aria-label="მთავარ გვერდზე დაბრუნება">
      <Image className={styles.brandLogo} src="/assets/homepage/logo.png" width={186} height={31} alt="" priority />
      <span className={styles.lightLogo} aria-hidden="true">
        <Image src="/assets/logo-mark.png" width={33} height={31} alt="" priority />
        <Image src="/assets/logo-wordmark.png" width={147} height={31} alt="" priority />
      </span>
    </Link>
    <nav className={styles.navigation} aria-label="მთავარი ნავიგაცია">
      {navigationItems.map(item => <Link href={item.href} key={item.id} aria-current={activeItem === item.id ? "page" : undefined}>
        {labelText(item.label)}
      </Link>)}
    </nav>
    <Button asChild size="contact" variant={appearance === "brand-surface" ? "inverse" : "primary"}><Link href="/prototypes/homepage#homepage-faq">
      <Icon name="phone" size="small" />
      {labelText("კონტაქტი")}
    </Link></Button>
  </header>;
}
