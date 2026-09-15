import { Icon } from "../ui/icon";
import styles from "./resource-media.module.css";

// Decorative indicator: the parent media trigger owns interaction and its label.
export function VideoPlayIndicator() {
  return <span className={styles.play} aria-hidden="true"><Icon name="play" /></span>;
}
