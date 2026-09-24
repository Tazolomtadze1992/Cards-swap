import Image from "next/image";
import styles from "./site-footer.module.css";

export function SiteFooter({ appearance = "default", showDisclaimer = false }: { appearance?: "default" | "inverse"; showDisclaimer?: boolean }) {
  return <footer className={`${styles.footer} ${appearance === "inverse" ? styles.inverse : ""} ${showDisclaimer ? "" : styles.logosOnly}`}>
    <div className={styles.partners}>
      <div className={styles.campaign}>
        {appearance === "inverse" ? (
          <Image className={styles.campaignLogo} src="/assets/footer/stop-violence-inverse.png" width={744} height={124} alt="შეაჩერე ძალადობა — იყავი მეგობრული" />
        ) : (
          <div className={styles.campaignLight}>
            <Image src="/assets/logo-mark.png" width={66} height={62} alt="" />
            <Image src="/assets/logo-wordmark.png" width={293} height={62} alt="შეაჩერე ძალადობა — იყავი მეგობრული" />
          </div>
        )}
      </div>
      <div className={styles.partner}>
        <Image className={styles.emblem} src="/assets/footer/education-ministry.png" width={252} height={220} alt="" />
        <p>განათლების, მეცნიერებისა და ახალგაზრდობის სამინისტრო</p>
      </div>
      <div className={`${styles.partner} ${styles.mandaturi}`}>
        <Image className={styles.emblem} src="/assets/footer/resource-officers.png" width={509} height={508} alt="" />
        <p>საგანმანათლებლო დაწესებულების მანდატურის სამსახური</p>
      </div>
      <div className={styles.council}>
        <Image
          className={styles.councilLogo}
          src={appearance === "inverse" ? "/assets/homepage/council-of-europe-logo.png" : "/assets/homepage/council-of-europe-logo-on-cream.png"}
          width={296}
          height={238}
          alt=""
        />
        <p>ევროპის საბჭო</p>
      </div>
    </div>
    {showDisclaimer && <div className={styles.content}>
      <p className={styles.georgian}>ეს ვებგვერდი შექმნილია ევროპის საბჭოსა და საგანმანათლებლო დაწესებულების მანდატურის სამსახურის თანამშრომლობის შედეგად. ის წარმოადგენს არაინსტიტუციურ ვებგვერდს. არსებულ პლატფორმაზე გამოთქმული მოსაზრებები წარმოადგენს ავტორების პასუხისმგებლობას და არ ასახავს ევროპის საბჭოს ოფიციალურ პოლიტიკას.</p>
      <p className={styles.english} lang="en">This site results from co-operation between the Council of Europe and the Office of Resource Officers of Educational Institutions. It is a non-institutional site. The opinions expressed in this work are the responsibility of the authors and do not necessarily reflect the official policy of the Council of Europe.</p>
    </div>}
  </footer>;
}
