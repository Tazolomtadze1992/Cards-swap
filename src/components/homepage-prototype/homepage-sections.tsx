import { Phone } from "lucide-react";
import styles from "./homepage.module.css";

export function PrototypeSwitcher({ homepage }: { homepage: boolean }) {
  return <nav className={styles.switcher} aria-label="Prototype views">
    <a href="/prototypes/cards" aria-current={!homepage ? "page" : undefined}>Cards only</a>
    <a href="/prototypes/homepage" aria-current={homepage ? "page" : undefined}>Full homepage</a>
  </nav>;
}

export function HomepageHero() {
  return <section className={styles.hero} aria-labelledby="hero-heading">
    <header className={styles.header}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.logo} src="/assets/homepage/logo.png" width={174} height={29} alt="ბავშვთა ციფრული უსაფრთხოება" />
      <nav className={styles.navigation} aria-label="მთავარი ნავიგაცია">
        <a href="#homepage-cards">სწავლა და პრაქტიკა</a>
        <a href="#card-resources">რესურსები</a>
        <span aria-disabled="true" title="მალე">ლექსიკონი</span>
        <a href="#card-support">მხარდამჭერი სერვისები</a>
        <a href="#homepage-faq">ხშირად დასმული კითხვები</a>
      </nav>
      <a className={styles.contact} href="#homepage-faq"><Phone size={16} aria-hidden="true" />კონტაქტი</a>
    </header>
    <div className={styles.heroContent}>
      <h1 id="hero-heading">გაიგე მეტი, ივარჯიშე, იპოვე დახმარება.</h1>
      <p>გაიგე, როგორ დაიცვა თავი ონლაინ, ივარჯიშე რეალურ სიტუაციებში და საჭიროებისას იპოვე სანდო დახმარება.</p>
      <a className={styles.start} href="#homepage-cards">სწავლის დაწყება</a>
    </div>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img className={styles.heroPerson} src="/assets/homepage/hero-person.svg" width={273} height={240} alt="" />
  </section>;
}

const questions = ["სანდო უფროსი", "მეგობარი და თანატოლი", "მასწავლებელი, ბაღი ან სკოლის ადმინისტრატორი", "მანდატური", "მეგობარი და თანატოლი"];
// Temporary Georgian copy for interaction review; replace with approved editorial content.
const answers = [
  "სანდო უფროსი არის ადამიანი, ვისთანაც თავს მშვიდად გრძნობ და შეგიძლია გულწრფელად ისაუბრო. თუ ონლაინ რამე გაწუხებს, გაუზიარე მას შენი გამოცდილება და ერთად მოიფიქრეთ შემდეგი ნაბიჯი.",
  "მეგობარს შეუძლია მოგისმინოს და გვერდით დაგიდგეს. თუ დახმარება გჭირდება, სთხოვე, შენთან ერთად დაელაპარაკოს სანდო უფროსს.",
  "თუ მომხდარი შენს სწავლაზე ან სკოლაში ურთიერთობებზე მოქმედებს, შეგიძლია მიმართო მასწავლებელს ან ადმინისტრაციას. აუხსენი, რა მოხდა და როგორი მხარდაჭერა გჭირდება.",
  "სკოლაში შეგიძლია მანდატურსაც გაუზიარო ის, რაც გაწუხებს. ის მოგისმენს და დაგეხმარება შესაბამისი მხარდაჭერის მოძებნაში.",
  "თუ მეგობარი გიზიარებს რთულ გამოცდილებას, მოუსმინე ყურადღებით და ნუ დაადანაშაულებ. შესთავაზე, ერთად მიმართოთ სანდო უფროსს.",
];

export function HomepageFaq() {
  return <section className={styles.faq} id="homepage-faq" aria-labelledby="faq-heading">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/assets/cards/faq.svg" className={styles.faqIllustration} width={220.156} height={167.643} alt="" />
    <h2 id="faq-heading">ხშირად დასმული კითხვები</h2>
    <div className={styles.questions}>
      {questions.map((question, index) => <details className={styles.question} key={index} name="homepage-faq">
        <summary>
        <span>{question}</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/homepage/plus.svg" width={24} height={24} alt="" />
        </summary>
        <p>{answers[index]}</p>
      </details>)}
    </div>
  </section>;
}
