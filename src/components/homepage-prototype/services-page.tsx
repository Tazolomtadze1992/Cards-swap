"use client";

import { useState } from "react";
import { ServicesReferralDialog } from "./services-referral-dialog";
import { ServicesBarnahusDialog } from "./services-barnahus-dialog";
import { ServicesPeopleDialog } from "./services-people-dialog";
import { ServicesOverviewDialog } from "./services-overview-dialog";
import { ServicesContactDialog } from "./services-contact-dialog";
import { ServicesStartDialog } from "./services-start-dialog";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { SiteHeader } from "./site-header";
import { labelText } from "./label-text";
import { serviceTopics } from "./services-topics";
import styles from "./services.module.css";

export default function ServicesPagePrototype() {
  const [openTopic, setOpenTopic] = useState<(typeof serviceTopics)[number]["id"] | null>(null);
  return <div className={styles.page}>
    <SiteHeader activeItem="support" />
    <main className={styles.content}>
      <header className={styles.intro}><h1>გჭირდება დახმარება?</h1></header>
      <div className={styles.layout}>
        <ul className={styles.topics} aria-label="დახმარების თემები">
          {serviceTopics.map(topic => <li key={topic.id}>
            <button type="button" id={`service-${topic.id}`} className={styles.topic} aria-haspopup="dialog" onClick={() => setOpenTopic(topic.id)}>
              <span>{topic.title}</span><Icon name="chevronsRight" />
            </button>
          </li>)}
        </ul>
        <aside className={styles.emergency} aria-label="გადაუდებელი დახმარება">
          <p>თუ საფრთხე ახლავეა ან საჭიროა სამედიცინო დახმარება, გადადი უსაფრთხო ადგილას და დარეკე 112-ზე</p>
          <Button asChild variant="call" fullWidth><a href="tel:112">{labelText("ზარი 112-ზე")}</a></Button>
        </aside>
      </div>
    </main>
    {openTopic === "start" && <ServicesStartDialog onClose={() => setOpenTopic(null)} onShowContacts={() => setOpenTopic("contacts")} />}
    {openTopic === "referral" && <ServicesReferralDialog onClose={() => setOpenTopic(null)} />}
    {openTopic === "barnahus" && <ServicesBarnahusDialog onClose={() => setOpenTopic(null)} />}
    {openTopic === "contacts" && <ServicesContactDialog onClose={() => setOpenTopic(null)} />}
    {openTopic === "people" && <ServicesPeopleDialog onClose={() => setOpenTopic(null)} />}
    {openTopic === "overview" && <ServicesOverviewDialog onClose={() => setOpenTopic(null)} />}
  </div>;
}
