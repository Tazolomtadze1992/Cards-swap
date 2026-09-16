import styles from "./resource-media.module.css";

// Decorative indicator: the parent media trigger owns interaction and its label.
export function VideoPlayIndicator() {
  return <span className={styles.play} aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor" focusable="false"><path d="M8 5.25a1.25 1.25 0 0 1 1.91-1.06l11 6.75a1.25 1.25 0 0 1 0 2.12l-11 6.75A1.25 1.25 0 0 1 8 18.75V5.25Z" /></svg></span>;
}
