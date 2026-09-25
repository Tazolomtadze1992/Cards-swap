"use client";

import { Modal } from "../ui/modal";
import { ServiceContactCard } from "../services/service-contact-card";
import { serviceContacts } from "./services-contacts-data";
import styles from "./services.module.css";

export function ServicesContactDialog({ onClose, onRequestCall112, onRequestSupportCall }: { onClose: () => void; onRequestCall112: () => void; onRequestSupportCall: () => void }) {
  return <Modal title="სად დავრეკო ან ვის მივწერო?" onClose={onClose}>
      <p className={styles.dialogIntro}>თუ მარტო დარეკვა გიჭირს, შეგიძლია სანდო უფროსს სთხოვო, შენთან ერთად დარეკოს.</p>
      <div className={styles.contactCards}>
        {serviceContacts.map(contact => <ServiceContactCard key={contact.id} contact={contact} onRequestCall112={onRequestCall112} onRequestSupportCall={onRequestSupportCall} />)}
      </div>
  </Modal>;
}
