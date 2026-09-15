import { Separator } from "../ui/separator";
import { FaqList } from "./faq-list";
import { Button } from "../ui/button";
import styles from "./homepage.module.css";
import { faqItems } from "./faq-data";
import { labelText } from "./label-text";
import { SiteHeader } from "./site-header";

export function PrototypeSwitcher({ homepage }: { homepage: boolean }) {
  return <><nav lang="en" className={styles.switcher} aria-label="Prototype views">
    <a href="/prototypes/cards" aria-current={!homepage ? "page" : undefined}>Cards only</a>
    <a href="/prototypes/homepage" aria-current={homepage ? "page" : undefined}>Full homepage</a>
  </nav><Separator /></>;
}

export function HomepageHero() {
  return <section className={styles.hero} aria-labelledby="hero-heading">
    <SiteHeader appearance="brand-surface" />
    <div className={styles.heroContent}>
      <h1 id="hero-heading">გაიგე მეტი, ივარჯიშე, იპოვე დახმარება.</h1>
      <p>გაიგე, როგორ დაიცვა თავი ონლაინ, ივარჯიშე რეალურ სიტუაციებში და საჭიროებისას იპოვე სანდო დახმარება.</p>
      <div className={styles.start}><Button asChild variant="inverse" size="prominent"><a href="/prototypes/learning">{labelText("სწავლის დაწყება")}</a></Button></div>
    </div>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img className={styles.heroPerson} src="/assets/homepage/hero-person.svg" width={273} height={240} alt="" />
  </section>;
}

export function HomepageFaq() {
  return <section className={styles.faq} id="homepage-faq" aria-labelledby="faq-heading">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/assets/cards/faq.svg" className={styles.faqIllustration} width={220.156} height={167.643} alt="" />
    <h2 id="faq-heading">ხშირად დასმული კითხვები</h2>
    <FaqList items={faqItems.slice(0, 6)} name="homepage-faq" />
    <div className={styles.viewAll}><Button asChild variant="overlay" size="prominent"><a href="/prototypes/faq">{labelText("ყველას ნახვა")}</a></Button></div>
  </section>;
}
