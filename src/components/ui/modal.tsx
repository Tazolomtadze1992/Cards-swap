"use client";

import { useLayoutEffect, useId, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { animateNativeDialog, dialogMotion } from "../motion/surface-motion";
import { Drawer } from "vaul";
import { Button } from "./button";
import { Icon } from "./icon";
import { Separator } from "./separator";
import styles from "./modal.module.css";

type ModalProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
  closeLabel?: string;
};

const sheetQuery = "(max-width: 1100px)";
const subscribeToSheet = (callback: () => void) => {
  const media = window.matchMedia(sheetQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const isSheetViewport = () => window.matchMedia(sheetQuery).matches;

// Service detail views keep the same content and switch presentation with the layout.
export function Modal(props: ModalProps) {
  const sheet = useSyncExternalStore(subscribeToSheet, isSheetViewport, () => false);
  return sheet ? <MobileSheet {...props} /> : <DesktopDialog {...props} />;
}

function DesktopDialog({ title, children, onClose, closeLabel = "დახურვა" }: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const titleId = useId();
  const [closing, setClosing] = useState(false);
  const onCloseRef = useRef(onClose);
  useLayoutEffect(() => { onCloseRef.current = onClose; });
  useLayoutEffect(() => {
    const element = dialog.current;
    const trigger = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    element?.showModal();
    heading.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = overflow;
      trigger?.focus();
    };
  }, []);
  useLayoutEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const animation = animateNativeDialog(element, !closing, dialogMotion, !closing);
    let active = true;
    animation.finished.then(() => { if (active && closing) onCloseRef.current(); }, () => {});
    return () => { active = false; animation.cancel(); };
  }, [closing]);
  return <dialog ref={dialog} className={styles.dialog} aria-labelledby={titleId}
    onCancel={event => { event.preventDefault(); setClosing(true); }}
    onClick={event => {
      if (event.target !== event.currentTarget) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setClosing(true);
    }}>
    <header className={styles.dialogHeader}>
      <div className={styles.dialogTitleRow}>
        <h2 id={titleId} ref={heading} tabIndex={-1}>{title}</h2>
        <Button variant="subtle" size="icon" aria-label={closeLabel} onClick={() => setClosing(true)}><Icon name="close" /></Button>
      </div>
      <Separator />
    </header>
    <div className={styles.dialogBody}>{children}</div>
  </dialog>;
}

function MobileSheet({ title, children, onClose, closeLabel = "დახურვა" }: ModalProps) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(true);
  const trigger = useRef<HTMLElement | null>(null);

  return <div className={styles.sheetPortalRoot} ref={setContainer}>
    <Drawer.Root open={open} autoFocus onOpenChange={setOpen} onAnimationEnd={isOpen => { if (!isOpen) onClose(); }} shouldScaleBackground={false}>
      <Drawer.Portal container={container}>
        <Drawer.Overlay className={styles.sheetOverlay} onClick={() => setOpen(false)} />
        <Drawer.Content className={styles.sheet}
          onOpenAutoFocus={() => { trigger.current = document.activeElement as HTMLElement | null; }}
          onCloseAutoFocus={event => { event.preventDefault(); trigger.current?.focus(); }}>
          <header className={styles.sheetHeader}>
            <Drawer.Handle className={styles.sheetHandle} />
            <div className={styles.sheetTitleRow}>
              <Drawer.Title>{title}</Drawer.Title>
              <Button variant="subtle" size="icon" aria-label={closeLabel} data-vaul-no-drag onClick={() => setOpen(false)}><Icon name="close" /></Button>
            </div>
            <Separator />
          </header>
          <div className={styles.sheetBody} data-vaul-no-drag>{children}</div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  </div>;
}
