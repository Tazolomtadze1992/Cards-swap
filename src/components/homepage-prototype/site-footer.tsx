import styles from "./site-footer.module.css";

export function SiteFooter() {
  return <footer className={styles.footer}>
    <div className={styles.content}>
      <div className={styles.disclaimer}>
        <p>ეს ვებგვერდი შექმნილია ევროპის საბჭოსა და საგანმანათლებლო დაწესებულების მანდატურის სამსახურის თანამშრომლობის შედეგად. არსებულ პლატფორმაზე გამოთქმული მოსაზრებები წარმოადგენს ავტორების პასუხისმგებლობას და არ ასახავს ევროპის საბჭოს ოფიციალურ პოლიტიკას.</p>
        <p lang="en">This site results from co-operation between the Council of Europe and the Office of Resource Officers of Educational Institutions. The opinions expressed in this work are the responsibility of the authors and do not necessarily reflect the official policy of the Council of Europe.</p>
      </div>
      <div className={styles.details}>
        <p className={styles.contactLine}>
          <span>ქ. თბილისი, მ. ალექსიძის II შესახვევი, N2</span>
          <span>ტელ: 2200 220 (3025), 08 000 000 88</span>
        </p>
        <p>© EMIS 2026 ყველა უფლება დაცულია</p>
      </div>
    </div>
  </footer>;
}
