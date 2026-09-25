import { serviceContacts } from "./services-contacts-data";
import { CallConfirmationDialog } from "./call-confirmation-dialog";

export function ServicesEmergencyCallDialog({ onClose }: { onClose: () => void }) {
  return <CallConfirmationDialog title={serviceContacts[0].confirmation} prompt="დარწმუნდი, რომ ნამდვილად გინდა დარეკვა." phone="112" onClose={onClose} />;
}
