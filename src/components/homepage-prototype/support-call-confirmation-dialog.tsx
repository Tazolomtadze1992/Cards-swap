import { CallConfirmationDialog } from "./call-confirmation-dialog";

export function SupportCallConfirmationDialog({ onClose }: { onClose: () => void }) {
  return <CallConfirmationDialog
    title="ახლა რეკავ საგანმანათლებლო დაწესებულების მანდატურის სამსახურის ფსიქოსოციალური მომსახურების ცენტრში."
    prompt="დარწმუნდი რომ ნამდვილად გინდა დარეკვა"
    phone="0800000088"
    onClose={onClose}
  />;
}
