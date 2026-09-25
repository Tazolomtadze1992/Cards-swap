import { serviceContacts } from "./services-contacts-data";
import { CallConfirmationDialog } from "./call-confirmation-dialog";

export function SupportCallConfirmationDialog({ onClose }: { onClose: () => void }) {
  return <CallConfirmationDialog
    title={serviceContacts.find(contact => contact.id === "7")!.confirmation}
    prompt="დარწმუნდი რომ ნამდვილად გინდა დარეკვა"
    phone="0800000088"
    onClose={onClose}
  />;
}
