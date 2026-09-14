import { FaqList } from "./homepage-sections";
import { SiteHeader } from "./site-header";
import { faqItems } from "./faq-data";
import styles from "./homepage.module.css";

export default function FaqPagePrototype() {
  return <main className={styles.faqPage}>
    <SiteHeader activeItem="faq" appearance="brand-surface" />
    <div className={styles.faqPageContent}>
      <div className={styles.faqPageIntro}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/cards/faq.svg" className={styles.faqPageIllustration} width={136.236} height={103.739} alt="" />
        <h1>ხშირად დასმული კითხვები</h1>
      </div>
      <FaqList items={faqItems} name="faq-page" fullPage />
    </div>
  </main>;
}
