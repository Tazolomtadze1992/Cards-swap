import { ContentSection } from "../ui/reading-content";
import { mapSubtitle, mapTitle } from "./map-data";
import { MapVertical } from "./map-vertical";
import styles from "./map-variants.module.css";

/** "ბავშვთა დაცვის სისტემის მარტივი რუკა" section of the services start dialog. */
export function ServicesMap() {
  return <ContentSection width="full" className={styles.mapSection} aria-labelledby="services-map-title">
    <h3 id="services-map-title">{mapTitle}</h3>
    <p className={styles.mapSubtitle}>{mapSubtitle}</p>
    <MapVertical />
  </ContentSection>;
}
