"use client";

import { useState } from "react";
import { CallConfirmationDialog } from "./call-confirmation-dialog";
import { Modal } from "../ui/modal";
import { ServiceContactCard } from "../services/service-contact-card";
import { serviceContacts } from "./services-contacts-data";
import styles from "./services.module.css";

export function ServicesContactDialog({ onClose, onRequestCall112, onRequestSupportCall }: { onClose: () => void; onRequestCall112: () => void; onRequestSupportCall: () => void }) {
  const [pendingCall, setPendingCall] = useState<{ title: string; phone: string } | null>(null);
  if (pendingCall) return <CallConfirmationDialog title={pendingCall.title} phone={pendingCall.phone} prompt="დარწმუნდი, რომ ნამდვილად გინდა დარეკვა." onClose={() => setPendingCall(null)} />;
  return <Modal title="სად დავრეკო ან ვის მივწერო?" onClose={onClose}>
      <p className={styles.dialogIntro}>თუ მარტო დარეკვა ან საუბარი გიჭირს, შეგიძლია სანდო უფროსს სთხოვო, შენთან ერთად დარეკოს. თუ საფრთხე ახლავეა, პირველ რიგში 112-ს დაუკავშირდი.</p>
      <div className={styles.contactCards}>
        {serviceContacts.map(contact => <ServiceContactCard key={contact.id} contact={contact} onRequestCall={phone => {
          if (phone.tel === "112") onRequestCall112();
          else if (phone.tel === "0800000088") onRequestSupportCall();
          else setPendingCall({ title: contact.confirmation, phone: phone.tel });
        }} onRequestCall112={onRequestCall112} onRequestSupportCall={onRequestSupportCall} />)}
      </div>
  </Modal>;
}
