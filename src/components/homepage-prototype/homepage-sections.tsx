import { FaqList } from "./faq-list";
import { Button } from "../ui/button";
import styles from "./homepage.module.css";
import { homepageFaqItems } from "./faq-data";
import { labelText } from "./label-text";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function HomepageHero() {
  return <section className={styles.hero} data-header-surface="brand-surface" aria-labelledby="hero-heading">
    <SiteHeader appearance="brand-surface" activeItem="home" />
    <div className={styles.heroContent}>
      <h1 id="hero-heading">გაიგე მეტი, ივარჯიშე, იპოვე დახმარება.</h1>
      <p>გაიგე, როგორ დაიცვა თავი, ივარჯიშე რეალურ სიტუაციებში და საჭიროებისას იპოვე სანდო დახმარება.</p>
      <div className={styles.start}><Button asChild variant="inverse" size="prominent"><a href="/prototypes/learning">{labelText("სწავლის დაწყება")}</a></Button></div>
    </div>
    <div className={styles.heroCharacters} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.heroLeft} src="/assets/homepage/hero-left.svg" width={341} height={217} alt="" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.heroRight} src="/assets/homepage/hero-right.svg" width={570} height={240} alt="" />
    </div>
  </section>;
}

export function HomepageFaq() {
  return <section className={styles.faq} data-header-surface="brand-surface" id="homepage-faq" aria-labelledby="faq-heading">
    <div className={styles.faqIllustration} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/homepage/faq-illustration.svg" width={192.999} height={224.94} alt="" />
    </div>
    <h2 id="faq-heading">ხშირად დასმული კითხვები</h2>
    <FaqList items={homepageFaqItems} name="homepage-faq" />
    <div className={styles.viewAll}><Button asChild variant="inverse" size="prominent"><a href="/prototypes/faq">{labelText("ყველას ნახვა")}</a></Button></div>
    <SiteFooter appearance="inverse" showDisclaimer />
  </section>;
}
