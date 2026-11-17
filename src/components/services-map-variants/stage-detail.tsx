import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { labelText } from "../homepage-prototype/label-text";
import * as map from "./map-data";
import type { StageId } from "./map-data";
import styles from "./map-variants.module.css";

const firstSteps = ["მოგისმინონ", "იზრუნონ უსაფრთხოებაზე", "გაიგონ, რა გჭირდება", "აგიხსნან შემდეგი ნაბიჯი"];

/** Readable content of one stage, used by the zoom variant. */
export function StageDetail({ id, compact = false }: { id: StageId; compact?: boolean }) {
  if (id === "danger") return <div className={styles.detail}>
    <p className={styles.lead}>{map.start}</p>
    <h4 className={styles.detailHeading}>{map.dangerQuestion}</h4>
    <div className={styles.answerGrid}>
      <div className={styles.node} data-tone="danger">
        <span className={styles.answerTag}>{labelText(map.dangerYes.answer)}</span>
        <p>{map.dangerYes.text}</p>
        {!compact && <Button variant="call" size="compact"><Icon name="phone" />{labelText("ზარი 112-ზე")}</Button>}
      </div>
      <div className={styles.node} data-tone="green">
        <span className={styles.answerTag}>{labelText(map.dangerNo.answer)}</span>
        <p>{map.dangerNo.text}</p>
      </div>
    </div>
  </div>;
  if (id === "who") return <div className={styles.detail}>
    <h4 className={styles.detailHeading}>{map.whoTitle}</h4>
    <div className={styles.whoGrid}>
      {map.who.map(item => <div key={item.title} className={styles.node} data-tone={item.tone}>
        <strong>{item.title}</strong>
        {!compact && <p>{item.text}</p>}
      </div>)}
    </div>
    <p className={styles.note}>{map.whoNote}</p>
  </div>;
  if (id === "first") return <div className={styles.detail}>
    <p className={styles.lead}>{map.anyPath} —</p>
    <h4 className={styles.detailHeading}>პირველი პასუხი</h4>
    <ol className={styles.stepList}>
      {firstSteps.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}
    </ol>
  </div>;
  if (id === "help") return <div className={styles.detail}>
    <p className={styles.lead}>{map.assessment}</p>
    <h4 className={styles.detailHeading}>{map.helpTitle}</h4>
    <ul className={styles.chips}>
      {map.help.map(item => <li key={item.title} className={styles.chip} data-tone={item.tone}>{item.title}</li>)}
    </ul>
  </div>;
  return <div className={styles.detail}>
    <h4 className={styles.detailHeading}>{map.ongoing}</h4>
    <p className={styles.fallback}>{map.fallback}</p>
  </div>;
}
