"use client";

// Review page for the "დახმარება გჭირდება - საიდან დაიწყო?" dialog with its map. The dialog is drawn as a static frame
// (same classes as the real modal) because a native modal sits in the top layer and would
// cover the rest of the page.
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { Separator } from "../ui/separator";
import { ServicesStartBody, servicesStartTitle } from "../homepage-prototype/services-start-dialog";
import modal from "../ui/modal.module.css";
import styles from "./map-variants.module.css";

export default function MapVariantsPage() {
  return <div className={styles.page}>
    <div className={`${modal.dialog} ${styles.frame}`} role="dialog" aria-labelledby="start-title">
      <header className={modal.dialogHeader}>
        <div className={modal.dialogTitleRow}>
          <h2 id="start-title">{servicesStartTitle}</h2>
          <Button variant="subtle" size="icon" aria-label="დახურვა"><Icon name="close" /></Button>
        </div>
        <Separator />
      </header>
      <div className={`${modal.dialogBody} ${styles.frameBody}`}>
        <ServicesStartBody onShowContacts={() => {}} onRequestCall112={() => {}} />
      </div>
    </div>
  </div>;
}
