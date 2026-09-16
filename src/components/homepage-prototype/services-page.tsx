"use client";

import { useState } from "react";
import { ServicesReferralDialog } from "./services-referral-dialog";
import { ServicesBarnahusDialog } from "./services-barnahus-dialog";
import { ServicesPeopleDialog } from "./services-people-dialog";
import { ServicesOverviewDialog } from "./services-overview-dialog";
import { ServicesContactDialog } from "./services-contact-dialog";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { SiteHeader } from "./site-header";
import { labelText } from "./label-text";
import styles from "./services.module.css";

const topics = [
  "რა არის ბავშვთა დაცვის სისტემა?",
  "დახმარება მჭირდება - საიდან დავიწყო",
  "ვინ და როგორ გეხმარება?",
  "შეტყობინება, რეფერირება და დახმარების გეგმა",
  "ბარნაჰუსის მომსახურება",
  "სად დარეკო ან მიწერო?",
];

export default function ServicesPagePrototype() {
  const [openTopic, setOpenTopic] = useState<"contacts" | "overview" | "people" | "barnahus" | "referral" | null>(null);
  return <div className={styles.page}>
    <SiteHeader activeItem="support" />
    <main className={styles.content}>
      <header className={styles.intro}><h1>გჭირდება დახმარება?</h1></header>
      <div className={styles.layout}>
        <ul className={styles.topics} aria-label="დახმარების თემები">
          {topics.map((topic, index) => <li key={topic}>
            {index !== 1 ? <button type="button" className={styles.topic} aria-haspopup="dialog" onClick={() => setOpenTopic(index === 0 ? "overview" : index === 2 ? "people" : index === 3 ? "referral" : index === 4 ? "barnahus" : "contacts")}>
              <span>{topic}</span><Icon name="chevronsRight" />
            </button> : <div className={styles.topic}><span>{topic}</span><Icon name="chevronsRight" /></div>}
          </li>)}
        </ul>
        <aside className={styles.emergency} aria-label="გადაუდებელი დახმარება">
          <p>თუ საფრთხე ახლავეა ან საჭიროა სამედიცინო დახმარება, გადადი უსაფრთხო ადგილას და დარეკე 112-ზე</p>
          <Button asChild variant="call" fullWidth><a href="tel:112">{labelText("ზარი 112-ზე")}</a></Button>
        </aside>
      </div>
    </main>
    {openTopic === "referral" && <ServicesReferralDialog onClose={() => setOpenTopic(null)} />}
    {openTopic === "barnahus" && <ServicesBarnahusDialog onClose={() => setOpenTopic(null)} />}
    {openTopic === "contacts" && <ServicesContactDialog onClose={() => setOpenTopic(null)} />}
    {openTopic === "people" && <ServicesPeopleDialog onClose={() => setOpenTopic(null)} />}
    {openTopic === "overview" && <ServicesOverviewDialog onClose={() => setOpenTopic(null)} />}
  </div>;
}
