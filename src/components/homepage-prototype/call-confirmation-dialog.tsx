import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { labelText } from "./label-text";
import styles from "./services.module.css";

export function CallConfirmationDialog({ title, prompt, phone, onClose }: {
  title: string;
  prompt: string;
  phone: string;
  onClose: () => void;
}) {
  return <Modal title={title} presentation="confirmation" onClose={onClose}>
    <p className={styles.callConfirmationPrompt}>{prompt}</p>
    <div className={styles.callConfirmationActions}>
      <Button asChild variant="danger"><a href={`tel:${phone}`}>{labelText("კი")}</a></Button>
      <Button variant="subtle" onClick={onClose}>{labelText("არა")}</Button>
    </div>
  </Modal>;
}
