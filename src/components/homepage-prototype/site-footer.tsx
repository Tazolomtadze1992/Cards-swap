import styles from "./site-footer.module.css";

export function SiteFooter({ appearance = "default" }: { appearance?: "default" | "embedded" }) {
  const logoSrc = appearance === "embedded"
    ? "/assets/homepage/council-of-europe-logo.png"
    : "/assets/homepage/council-of-europe-logo-on-cream.png";

  return <footer className={styles.footer} data-appearance={appearance}>
    <div className={styles.content}>
      <p>ეს ვებგვერდი შექმნილია ევროპის საბჭოსა და საგანმანათლებლო დაწესებულების მანდატურის სამსახურის თანამშრომლობის შედეგად. ის წარმოადგენს არაინსტიტუციურ ვებგვერდს. არსებულ პლატფორმაზე გამოთქმული მოსაზრებები წარმოადგენს ავტორების პასუხისმგებლობას და არ ასახავს ევროპის საბჭოს ოფიციალურ პოლიტიკას.</p>
      <div className={styles.logo}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={296} height={238} alt="ევროპის საბჭო" />
      </div>
    </div>
  </footer>;
}
