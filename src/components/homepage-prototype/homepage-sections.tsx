import { Phone } from "lucide-react";
import styles from "./homepage.module.css";
import { faqItems, type FaqItem } from "./faq-data";

export function PrototypeSwitcher({ homepage }: { homepage: boolean }) {
  return <nav className={styles.switcher} aria-label="Prototype views">
    <a href="/prototypes/cards" aria-current={!homepage ? "page" : undefined}>Cards only</a>
    <a href="/prototypes/homepage" aria-current={homepage ? "page" : undefined}>Full homepage</a>
  </nav>;
}

export function SiteHeader({ faqPage = false, glossaryPage = false, resourcesPage = false, articlesPage = false, learningPage = false }: { faqPage?: boolean; glossaryPage?: boolean; resourcesPage?: boolean; articlesPage?: boolean; learningPage?: boolean }) {
  const innerPage = faqPage || glossaryPage || resourcesPage || articlesPage || learningPage;
  return <header className={styles.header}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.logo} src="/assets/homepage/logo.png" width={174} height={29} alt="ბავშვთა ციფრული უსაფრთხოება" />
      <nav className={styles.navigation} aria-label="მთავარი ნავიგაცია">
        {innerPage && <a href="/prototypes/homepage">მთავარი</a>}
        <a href="/prototypes/learning" aria-current={learningPage ? "page" : undefined}>სწავლა და პრაქტიკა</a>
        <a href="/prototypes/resources" aria-current={resourcesPage ? "page" : undefined}>რესურსები</a>
        <a href="/prototypes/glossary" aria-current={glossaryPage ? "page" : undefined}>ლექსიკონი</a>
        {!innerPage && <a href="#card-support">მხარდამჭერი სერვისები</a>}
        <a href="/prototypes/faq" aria-current={faqPage ? "page" : undefined}>ხშირად დასმული კითხვები</a>
      </nav>
      <a className={styles.contact} href={innerPage ? "/prototypes/homepage#homepage-faq" : "#homepage-faq"}><Phone size={16} aria-hidden="true" />კონტაქტი</a>
    </header>
}

export function HomepageHero() {
  return <section className={styles.hero} aria-labelledby="hero-heading">
    <SiteHeader />
    <div className={styles.heroContent}>
      <h1 id="hero-heading">გაიგე მეტი, ივარჯიშე, იპოვე დახმარება.</h1>
      <p>გაიგე, როგორ დაიცვა თავი ონლაინ, ივარჯიშე რეალურ სიტუაციებში და საჭიროებისას იპოვე სანდო დახმარება.</p>
      <a className={styles.start} href="/prototypes/learning">სწავლის დაწყება</a>
    </div>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img className={styles.heroPerson} src="/assets/homepage/hero-person.svg" width={273} height={240} alt="" />
  </section>;
}

export function FaqList({ items, name, fullPage = false }: { items: FaqItem[]; name: string; fullPage?: boolean }) {
  return <div className={fullPage ? styles.fullQuestions : styles.questions}>
    {items.map(item => <details className={styles.question} key={item.question} name={name}>
      <summary>
        <span>{item.question}</span>
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
    <a className={styles.viewAll} href="/prototypes/faq">ყველას ნახვა</a>
  </section>;
}
