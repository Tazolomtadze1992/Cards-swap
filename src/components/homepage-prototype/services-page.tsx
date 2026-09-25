"use client";

import { useState } from "react";
import { ServicesReferralDialog } from "./services-referral-dialog";
import { ServicesBarnahusDialog } from "./services-barnahus-dialog";
import { ServicesPeopleDialog } from "./services-people-dialog";
import { ServicesOverviewDialog } from "./services-overview-dialog";
import { ServicesContactDialog } from "./services-contact-dialog";
import { ServicesStartDialog } from "./services-start-dialog";
import { SupportCallConfirmationDialog } from "./support-call-confirmation-dialog";
import { ServicesEmergencyCallDialog } from "./services-emergency-call-dialog";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { SiteHeader } from "./site-header";
import { labelText } from "./label-text";
import { serviceTopics } from "./services-topics";
import styles from "./services.module.css";

export default function ServicesPagePrototype() {
  const [openTopic, setOpenTopic] = useState<(typeof serviceTopics)[number]["id"] | "call-112" | "call-support" | null>(null);
  const [call112ReturnTopic, setCall112ReturnTopic] = useState<(typeof serviceTopics)[number]["id"] | null>(null);
  const requestCall112 = () => {
    setCall112ReturnTopic(openTopic === "call-112" || openTopic === "call-support" ? null : openTopic);
    setOpenTopic("call-112");
  };
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
          <Button variant="call" fullWidth onClick={requestCall112}>{labelText("ზარი 112-ზე")}</Button>
        </aside>
      </div>
    </main>
    {openTopic === "start" && <ServicesStartDialog onClose={() => setOpenTopic(null)} onShowContacts={() => setOpenTopic("contacts")} onRequestCall112={requestCall112} />}
    {openTopic === "referral" && <ServicesReferralDialog onClose={() => setOpenTopic(null)} />}
    {openTopic === "barnahus" && <ServicesBarnahusDialog onClose={() => setOpenTopic(null)} />}
    {openTopic === "contacts" && <ServicesContactDialog onClose={() => setOpenTopic(null)} onRequestCall112={requestCall112} onRequestSupportCall={() => setOpenTopic("call-support")} />}
    {openTopic === "people" && <ServicesPeopleDialog onClose={() => setOpenTopic(null)} />}
    {openTopic === "overview" && <ServicesOverviewDialog onClose={() => setOpenTopic(null)} />}
    {openTopic === "call-support" && <SupportCallConfirmationDialog onClose={() => setOpenTopic("contacts")} />}
    {openTopic === "call-112" && <ServicesEmergencyCallDialog onClose={() => setOpenTopic(call112ReturnTopic)} />}
  </div>;
}
