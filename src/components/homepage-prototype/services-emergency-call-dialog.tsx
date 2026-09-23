import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { labelText } from "./label-text";
import styles from "./services.module.css";

export function ServicesEmergencyCallDialog({ onClose }: { onClose: () => void }) {
  return <Modal title="ახლა 112-ზე რეკავ." presentation="confirmation" onClose={onClose}>
    <p className={styles.callConfirmationPrompt}>დარწმუნდი, რომ ნამდვილად გინდა დარეკვა.</p>
    <div className={styles.callConfirmationActions}>
      <Button asChild variant="danger"><a href="tel:112">{labelText("კი")}</a></Button>
      <Button variant="subtle" onClick={onClose}>{labelText("არა")}</Button>
    </div>
  </Modal>;
}
