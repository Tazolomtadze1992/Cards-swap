import { FaqList } from "./faq-list";
import { Button } from "../ui/button";
import styles from "./homepage.module.css";
import { faqItems } from "./faq-data";
import { labelText } from "./label-text";
import { SiteHeader } from "./site-header";

export function HomepageHero() {
  return <section className={styles.hero} data-header-surface="brand-surface" aria-labelledby="hero-heading">
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
  return <section className={styles.faq} data-header-surface="brand-surface" id="homepage-faq" aria-labelledby="faq-heading">
    <div className={styles.faqIllustration} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/cards/faq-person.svg" className={styles.faqPerson} width={164.902} height={164.902} alt="" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/cards/faq-question-mark.svg" className={styles.faqQuestionMark} width={56.914} height={82.053} alt="" />
    </div>
    <h2 id="faq-heading">ხშირად დასმული კითხვები</h2>
    <FaqList items={faqItems.slice(0, 6)} name="homepage-faq" />
    <div className={styles.viewAll}><Button asChild variant="inverse" size="prominent"><a href="/prototypes/faq">{labelText("ყველას ნახვა")}</a></Button></div>
  </section>;
}
