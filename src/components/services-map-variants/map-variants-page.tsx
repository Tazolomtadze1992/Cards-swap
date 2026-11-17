"use client";

// Review page for the "simple map of the child-protection system" inside the
// "დახმარება გჭირდება - საიდან დაიწყო?" dialog. The dialog is drawn as a static frame
// (same classes as the real modal) because a native modal sits in the top layer and would
// cover the variant switcher.
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { Separator } from "../ui/separator";
import { ContentSection } from "../ui/reading-content";
import { ServicesStartBody, servicesStartTitle } from "../homepage-prototype/services-start-dialog";
import { VariantSwitcher, useVariant } from "../prototype-tools/variant-switcher";
import modal from "../ui/modal.module.css";
import { mapSubtitle, mapTitle } from "./map-data";
import { MapHorizontal } from "./map-horizontal";
import { MapZoom } from "./map-zoom";
import { MapVertical } from "./map-vertical";
import styles from "./map-variants.module.css";

const variants = [
  { name: "Horizontal map", note: "The client's ask as-is: full map left → right, scrolls sideways, boxes grow on hover." },
  { name: "Zoom (Prezi)", note: "Overview of five stages; pick one and the camera flies in. Arrows walk the path." },
  { name: "Vertical map", note: "The same full map as 1, flowing top to bottom with the dialog's scroll; boxes grow on hover." },
] as const;

const maps = [MapHorizontal, MapZoom, MapVertical];

export default function MapVariantsPage({ initialVariant = 1 }: { initialVariant?: number }) {
  const [variant, setVariant] = useVariant(variants.length, initialVariant);
  const Map = maps[variant - 1];
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
        <ServicesStartBody onShowContacts={() => {}} onRequestCall112={() => {}} map={
          <ContentSection width="full" className={styles.mapSection} aria-labelledby="map-title">
            <h3 id="map-title">{mapTitle}</h3>
            <p className={styles.mapSubtitle}>{mapSubtitle}</p>
            <Map key={variant} />
          </ContentSection>
        } />
      </div>
    </div>
    <VariantSwitcher variants={variants} value={variant} onChange={setVariant} label="Map variants" />
  </div>;
}
