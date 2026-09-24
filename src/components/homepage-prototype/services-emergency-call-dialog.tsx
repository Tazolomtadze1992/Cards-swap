import { CallConfirmationDialog } from "./call-confirmation-dialog";

export function ServicesEmergencyCallDialog({ onClose }: { onClose: () => void }) {
  return <CallConfirmationDialog title="ახლა 112-ზე რეკავ." prompt="დარწმუნდი, რომ ნამდვილად გინდა დარეკვა." phone="112" onClose={onClose} />;
}
