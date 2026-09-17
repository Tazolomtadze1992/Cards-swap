"use client";

import { Modal } from "../ui/modal";
import { ServiceContactCard } from "../services/service-contact-card";
import { serviceContacts } from "./services-contacts-data";
import styles from "./services.module.css";

export function ServicesContactDialog({ onClose }: { onClose: () => void }) {
  return <Modal title="სად დავრეკო ან ვის მივწერო?" onClose={onClose}>
      <p className={styles.dialogIntro}>თუ მარტო დარეკვა გიჭირს, შეგიძლია სანდო უფროსს სთხოვო, შენთან ერთად დარეკოს.</p>
      <div className={styles.contactCards}>
        {serviceContacts.map(contact => <ServiceContactCard key={contact.id} contact={contact} />)}
      </div>
  </Modal>;
}
