import styles from "./homepage.module.css";
import { faqItems, type FaqItem } from "./faq-data";
import { labelText } from "./label-text";
import { SiteHeader } from "./site-header";

export function PrototypeSwitcher({ homepage }: { homepage: boolean }) {
  return <nav lang="en" className={styles.switcher} aria-label="Prototype views">
    <a href="/prototypes/cards" aria-current={!homepage ? "page" : undefined}>Cards only</a>
    <a href="/prototypes/homepage" aria-current={homepage ? "page" : undefined}>Full homepage</a>
  </nav>;
}

export function HomepageHero() {
  return <section className={styles.hero} aria-labelledby="hero-heading">
    <SiteHeader appearance="brand-surface" />
    <div className={styles.heroContent}>
      <h1 id="hero-heading">გაიგე მეტი, ივარჯიშე, იპოვე დახმარება.</h1>
      <p>გაიგე, როგორ დაიცვა თავი ონლაინ, ივარჯიშე რეალურ სიტუაციებში და საჭიროებისას იპოვე სანდო დახმარება.</p>
      <a className={styles.start} href="/prototypes/learning">{labelText("სწავლის დაწყება")}</a>
    </div>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img className={styles.heroPerson} src="/assets/homepage/hero-person.svg" width={273} height={240} alt="" />
  </section>;
}

export function FaqList({ items, name, fullPage = false }: { items: FaqItem[]; name: string; fullPage?: boolean }) {
  return <div className={fullPage ? styles.fullQuestions : styles.questions}>
    {items.map(item => <details className={styles.question} key={item.question} name={name}>
      <summary>
        <span>
          <span className={styles.questionTextNatural}>{item.question}</span>
          <span className={styles.questionTextUpper}>{labelText(item.question)}</span>
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/homepage/plus.svg" width={24} height={24} alt="" />
      </summary>
      <p>{item.answer}</p>
    </details>)}
  </div>;
}

export function HomepageFaq() {
  return <section className={styles.faq} id="homepage-faq" aria-labelledby="faq-heading">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/assets/cards/faq.svg" className={styles.faqIllustration} width={220.156} height={167.643} alt="" />
    <h2 id="faq-heading">ხშირად დასმული კითხვები</h2>
    <FaqList items={faqItems.slice(0, 6)} name="homepage-faq" />
    <a className={styles.viewAll} href="/prototypes/faq">{labelText("ყველას ნახვა")}</a>
  </section>;
}
