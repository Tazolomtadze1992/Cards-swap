import styles from "./site-footer.module.css";

export function SiteFooter() {
  return <footer className={styles.footer}>
    <div className={styles.content}>
      <p className={styles.georgian}>ეს ვებგვერდი შექმნილია ევროპის საბჭოსა და საგანმანათლებლო დაწესებულების მანდატურის სამსახურის თანამშრომლობის შედეგად. ის წარმოადგენს არაინსტიტუციურ ვებგვერდს. არსებულ პლატფორმაზე გამოთქმული მოსაზრებები წარმოადგენს ავტორების პასუხისმგებლობას და არ ასახავს ევროპის საბჭოს ოფიციალურ პოლიტიკას.</p>
      <p className={styles.english} lang="en">This site results from co-operation between the Council of Europe and the Office of Resource Officers of Educational Institutions. It is a non-institutional site. The opinions expressed in this work are the responsibility of the authors and do not necessarily reflect the official policy of the Council of Europe.</p>
    </div>
  </footer>;
}
