"use client";

import Image from "next/image";
import {
  ArrowRight,
  ChevronDown,
  Menu,
  Phone,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useState } from "react";
import styles from "./prototype.module.css";

type Direction = "10.00" | "10.10";

const navItems = [
  ["მთავარი", "#top"],
  ["სწავლა და პრაქტიკა", "#learn"],
  ["რესურსები", "#resources"],
  ["ლექსიკონი", "#glossary"],
  ["ხშირად დასმული კითხვები", "#faq"],
] as const;

const routes = [
  {
    title: "ისწავლე და ივარჯიშე",
    description: "გაეცანი თემებს, სცენარებსა და მოკლე ქვიზებს.",
    action: "დაწყება",
    icon: "/assets/card-course.svg",
    tone: "pink",
    href: "#learn",
  },
  {
    title: "დახმარება და სერვისები",
    description: "იპოვე სანდო დახმარება და საკონტაქტო გზები.",
    action: "დახმარება",
    icon: "/assets/card-support.svg",
    tone: "lavender",
    href: "#support",
  },
  {
    title: "თემების ნახვა",
    description: "კითხვები, სიტყვების გზამკვლევი და რესურსები.",
    action: "ლექსიკონი",
    icon: "/assets/card-topics.svg",
    tone: "peach",
    href: "#glossary",
  },
] as const;

const questions = [
  {
    question: "რა გავაკეთო, თუ ონლაინ რაღაც დისკომფორტს მიქმნის?",
    answer:
      "შეწყვიტე საუბარი ან გვერდის გამოყენება, შეინახე საჭირო მტკიცებულება და უთხარი სანდო ზრდასრულს. თუ თავს საფრთხეში გრძნობ, დახმარებას დაუყოვნებლივ მიმართე.",
  },
  {
    question: "როგორ დავბლოკო ან დავარეპორტო მომხმარებელი?",
    answer:
      "აპების უმეტესობაში პროფილის ან შეტყობინების მენიუში ნახავ დაბლოკვისა და დარეპორტების ფუნქციებს. ნაბიჯები პლატფორმის მიხედვით განსხვავდება.",
  },
  {
    question: "როგორ დავიცვა ჩემი ანგარიში?",
    answer:
      "გამოიყენე უნიკალური პაროლი, ჩართე ორფაქტორიანი დაცვა და არასდროს გაუზიარო სხვას ერთჯერადი კოდი ან პაროლი.",
  },
  {
    question: "როგორ მივიღო სანდო დახმარება?",
    answer:
      "დახმარების გვერდზე თავმოყრილი იქნება გადამოწმებული სერვისები, საკონტაქტო გზები და ინფორმაცია იმის შესახებ, რას უნდა ელოდო დაკავშირებისას.",
  },
  {
    question: "ინახება ჩემი პასუხები ან პროგრესი?",
    answer:
      "არა. ამ პროტოტიპის მიხედვით რეგისტრაცია საჭირო არ არის და პასუხები ან სწავლის პროგრესი არ ინახება.",
  },
] as const;

export function Prototype({ initialDirection }: { initialDirection: Direction }) {
  const [direction, setDirection] = useState<Direction>(initialDirection);
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  function changeDirection(next: Direction) {
    setDirection(next);
    const url = new URL(window.location.href);
    url.searchParams.set("direction", next);
    window.history.replaceState({}, "", url);
  }

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.35, ease: "easeOut" }}>
      <div className={styles.shell} data-direction={direction}>
        <Header open={menuOpen} onToggle={() => setMenuOpen((value) => !value)} />
        <main>
          <Hero direction={direction} />
          <Routes />
          <Faq direction={direction} />
        </main>
        <Footer />
        <aside className={styles.reviewer} aria-label="პროტოტიპის პარამეტრები">
          <label>
            <span>მიმართულება</span>
            <select
              value={direction}
              onChange={(event) => changeDirection(event.target.value as Direction)}
              aria-label="დიზაინის მიმართულების არჩევა"
            >
              <option value="10.00">10.00 · მშვიდი რეტრო</option>
              <option value="10.10">10.10 · კომპაქტური რეტრო</option>
              <option disabled>მესამე მიმართულება · მალე</option>
            </select>
          </label>
          <button
            type="button"
            className={styles.soundButton}
            onClick={() => setSoundOn((value) => !value)}
            aria-label={soundOn ? "ხმის გამორთვა" : "ხმის ჩართვა"}
            aria-pressed={soundOn}
            title={soundOn ? "ხმის გამორთვა" : "ხმის ჩართვა"}
          >
            {soundOn ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
          </button>
        </aside>
      </div>
    </MotionConfig>
  );
}

function Header({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <header className={styles.header} id="top">
      <a className={styles.logo} href="#top" aria-label="მთავარ გვერდზე დაბრუნება">
        <Image src="/assets/logo-mark.png" width={43} height={43} alt="" priority />
        <Image
          src="/assets/logo-wordmark.png"
          width={165}
          height={45}
          alt="შეაჩერე ძალადობა"
          priority
        />
      </a>
      <nav className={styles.desktopNav} aria-label="მთავარი ნავიგაცია">
        {navItems.map(([label, href]) => (
          <a href={href} key={label}>
            {label}
          </a>
        ))}
      </nav>
      <a className={styles.contactButton} href="#support">
        <Phone size={20} strokeWidth={2.3} aria-hidden="true" />
        კონტაქტი
      </a>
      <button
        className={styles.menuButton}
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "მენიუს დახურვა" : "მენიუს გახსნა"}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className={styles.mobileNav}
            aria-label="მობილური ნავიგაცია"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            {navItems.map(([label, href]) => (
              <a href={href} key={label} onClick={onToggle}>
                {label}
              </a>
            ))}
            <a href="#support" onClick={onToggle}>
              დახმარება და კონტაქტი
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero({ direction }: { direction: Direction }) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroContent}>
        <motion.div
          className={styles.heroCopy}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 id="hero-title">გაიგე მეტი, ივარჯიშე, იპოვე დახმარება.</h1>
          <p className={styles.heroLead}>
            გაიგე, როგორ დაიცვა თავი ონლაინ, ივარჯიშე რეალურ სიტუაციებში და
            საჭიროებისას იპოვე სანდო დახმარება.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#learn">
              სწავლის დაწყება
              <ArrowRight size={19} aria-hidden="true" />
            </a>
            <a className={styles.secondaryButton} href="#support">
              დახმარება
            </a>
          </div>
          <p className={styles.privacyNote}>
            რეგისტრაცია საჭირო არ არის. პასუხები და პროგრესი არ ინახება.
          </p>
        </motion.div>
        <div className={styles.heroArt} aria-hidden="true">
          <motion.div
            className={styles.sun}
            animate={{ y: [0, -10, 0], rotate: [-1, 1, -1] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/assets/sun.svg"
              fill
              sizes="(max-width: 720px) 42vw, 260px"
              alt=""
              priority
            />
          </motion.div>
          <motion.div
            className={styles.flower}
            animate={{ rotate: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image src="/assets/flower.png" fill sizes="(max-width: 720px) 38vw, 230px" alt="" />
          </motion.div>
          {direction === "10.10" && (
            <motion.div
              className={styles.leaf}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, rotate: [0, 4, 0] }}
              transition={{ rotate: { duration: 4, repeat: Infinity } }}
            >
              <Image src="/assets/leaf.svg" fill sizes="80px" alt="" />
            </motion.div>
          )}
        </div>
      </div>
      <div className={styles.ground} aria-hidden="true">
        {[1, 2, 3, 4].map((number) => (
          <Image
            key={number}
            className={styles[`grass${number}`]}
            src={`/assets/grass-${number}.svg`}
            width={120}
            height={70}
            alt=""
          />
        ))}
      </div>
    </section>
  );
}

function Routes() {
  return (
    <section className={styles.routesSection} id="learn" aria-labelledby="routes-title">
      <div className={styles.sectionInner}>
        <div className={styles.sectionHeading}>
          <span>შენი არჩევანი</span>
          <h2 id="routes-title">აირჩიე საიდან დაიწყო</h2>
        </div>
        <div className={styles.routeGrid}>
          {routes.map((route, index) => (
            <motion.a
              className={`${styles.routeCard} ${styles[route.tone]}`}
              href={route.href}
              id={index === 1 ? "support" : index === 2 ? "glossary" : undefined}
              key={route.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <div className={styles.routeIcon}>
                <Image src={route.icon} fill sizes="76px" alt="" />
              </div>
              <div>
                <h3>{route.title}</h3>
                <p>{route.description}</p>
              </div>
              <span className={styles.cardAction}>
                {route.action}
                <ArrowRight size={18} aria-hidden="true" />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq({ direction }: { direction: Direction }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className={styles.faqSection} id="faq" aria-labelledby="faq-title">
      {direction === "10.00" ? (
        <div className={styles.rainbowScene} aria-hidden="true">
          <Image className={styles.cloudLeft} src="/assets/cloud.svg" width={160} height={82} alt="" />
          <Image className={styles.rainbow} src="/assets/rainbow.svg" width={390} height={190} alt="" />
          <Image className={styles.star} src="/assets/star.svg" width={62} height={62} alt="" />
        </div>
      ) : (
        <div className={styles.faqMark} aria-hidden="true">
          <span />
          <span />
        </div>
      )}
      <div className={styles.faqInner}>
        <div className={styles.faqIntro}>
          <span>მოკლე პასუხები</span>
          <h2 id="faq-title">ხშირად დასმული კითხვები</h2>
          <p>სწრაფად იპოვე პასუხი ან გადადი დახმარების გვერდზე.</p>
        </div>
        <div className={styles.accordion}>
          {questions.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div className={styles.faqItem} key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  aria-controls={`answer-${index}`}
                >
                  <span>{item.question}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ChevronDown aria-hidden="true" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`answer-${index}`}
                      className={styles.answer}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        <div className={styles.supportPrompt}>
          <div>
            <strong>ვერ იპოვე პასუხი?</strong>
            <span>ნახე სანდო დახმარების გზები და კონტაქტები.</span>
          </div>
          <a href="#support">დახმარების ნახვა</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className={styles.footer} id="resources">
      <div className={styles.footerInner}>
        <div>
          <strong>ბავშვთა ციფრული უსაფრთხოების ჰაბი</strong>
          <p>სწავლა, პრაქტიკა და სანდო დახმარება ერთ სივრცეში.</p>
        </div>
        <nav aria-label="ქვედა ნავიგაცია">
          <a href="#top">ჩვენ შესახებ</a>
          <a href="#support">კონტაქტი</a>
          <a href="#top">ხელმისაწვდომობა</a>
          <a href="#top">კონფიდენციალურობა</a>
        </nav>
      </div>
    </footer>
  );
}
