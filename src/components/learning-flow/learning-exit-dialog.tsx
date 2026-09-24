import Link from "next/link";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { labelText } from "../homepage-prototype/label-text";
import styles from "./learning-flow.module.css";

export function LearningExitDialog({ onClose, href }: { onClose: () => void; href: string }) {
  return <Modal title="ნამდვილად გინდა შეწყვიტო?" presentation="confirmation" onClose={onClose}>
    <p className={styles.exitPrompt}>შენი პასუხები წაიშლება</p>
    <div className={styles.exitActions}>
      <Button asChild variant="danger"><Link href={href}>{labelText("კი")}</Link></Button>
      <Button variant="subtle" onClick={onClose}>{labelText("არა")}</Button>
    </div>
  </Modal>;
}
