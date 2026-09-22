import styles from "./site-footer.module.css";

export function SiteFooter({ appearance = "default" }: { appearance?: "default" | "embedded" }) {
  return <footer className={styles.footer} data-appearance={appearance}>
    <div className={styles.content}>
      <p>ეს ვებგვერდი შექმნილია ევროპის საბჭოსა და საგანმანათლებლო დაწესებულების მანდატურის სამსახურის თანამშრომლობის შედეგად. ის წარმოადგენს არაინსტიტუციურ ვებგვერდს. არსებულ პლატფორმაზე გამოთქმული მოსაზრებები წარმოადგენს ავტორების პასუხისმგებლობას და არ ასახავს ევროპის საბჭოს ოფიციალურ პოლიტიკას.</p>
    </div>
  </footer>;
}
