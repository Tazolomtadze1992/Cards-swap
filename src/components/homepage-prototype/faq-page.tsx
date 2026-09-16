import { FaqList } from "./faq-list";
import { SiteHeader } from "./site-header";
import { faqItems } from "./faq-data";
import styles from "./homepage.module.css";

export default function FaqPagePrototype() {
  return <main className={styles.faqPage}>
    <SiteHeader activeItem="faq" />
    <div className={styles.faqPageContent}>
      <div className={styles.faqPageIntro}>
        <div className={styles.faqPageIllustration} aria-hidden="true">
          <span className={styles.faqPagePerson} />
          <span className={styles.faqPageQuestionMark} />
        </div>
        <h1>ხშირად დასმული კითხვები</h1>
      </div>
      <FaqList items={faqItems} name="faq-page" fullPage appearance="light" />
    </div>
  </main>;
}
