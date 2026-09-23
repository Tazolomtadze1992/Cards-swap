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
  presentation?: "standard" | "confirmation";
};

function sheetStore(query: string) {
  return {
    subscribe(callback: () => void) {
      const media = window.matchMedia(query);
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    getSnapshot: () => window.matchMedia(query).matches,
  };
}

const standardSheet = sheetStore("(max-width: 1100px)");
const confirmationSheet = sheetStore("(max-width: 760px)");

// Service detail views keep the same content and switch presentation with the layout.
export function Modal(props: ModalProps) {
  const store = props.presentation === "confirmation" ? confirmationSheet : standardSheet;
  const sheet = useSyncExternalStore(store.subscribe, store.getSnapshot, () => false);
  return sheet ? <MobileSheet {...props} /> : <DesktopDialog {...props} />;
}

function DesktopDialog({ title, children, onClose, closeLabel = "დახურვა", presentation = "standard" }: ModalProps) {
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
  return <dialog ref={dialog} className={styles.dialog} data-presentation={presentation} aria-labelledby={titleId}
    onCancel={event => { event.preventDefault(); setClosing(true); }}
    onClick={event => {
      if (event.target !== event.currentTarget) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setClosing(true);
    }}>
    <header className={styles.dialogHeader}>
      {presentation === "confirmation" ? <div className={styles.confirmationHeading}>
        <Button variant="subtle" size="icon" aria-label={closeLabel} onClick={() => setClosing(true)}><Icon name="close" /></Button>
        <span className={styles.confirmationIcon} aria-hidden="true"><Icon name="alert" size="large" /></span>
        <h2 id={titleId} ref={heading} tabIndex={-1}>{title}</h2>
      </div> : <><div className={styles.dialogTitleRow}>
        <h2 id={titleId} ref={heading} tabIndex={-1}>{title}</h2>
        <Button variant="subtle" size="icon" aria-label={closeLabel} onClick={() => setClosing(true)}><Icon name="close" /></Button>
      </div><Separator /></>}
    </header>
    <div className={styles.dialogBody}>{children}</div>
  </dialog>;
}

function MobileSheet({ title, children, onClose, closeLabel = "დახურვა", presentation = "standard" }: ModalProps) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(true);
  const trigger = useRef<HTMLElement | null>(null);

  return <div className={styles.sheetPortalRoot} ref={setContainer}>
    <Drawer.Root open={open} autoFocus onOpenChange={setOpen} onAnimationEnd={isOpen => { if (!isOpen) onClose(); }} shouldScaleBackground={false}>
      <Drawer.Portal container={container}>
        <Drawer.Overlay className={styles.sheetOverlay} onClick={() => setOpen(false)} />
        <Drawer.Content className={styles.sheet} data-presentation={presentation}
          onOpenAutoFocus={() => { trigger.current = document.activeElement as HTMLElement | null; }}
          onCloseAutoFocus={event => { event.preventDefault(); trigger.current?.focus(); }}>
          <header className={styles.sheetHeader}>
            <Drawer.Handle className={styles.sheetHandle} />
            {presentation === "confirmation" ? <div className={styles.confirmationHeading}>
              <Button variant="subtle" size="icon" aria-label={closeLabel} data-vaul-no-drag onClick={() => setOpen(false)}><Icon name="close" /></Button>
              <span className={styles.confirmationIcon} aria-hidden="true"><Icon name="alert" size="large" /></span>
              <Drawer.Title>{title}</Drawer.Title>
            </div> : <><div className={styles.sheetTitleRow}>
              <Drawer.Title>{title}</Drawer.Title>
              <Button variant="subtle" size="icon" aria-label={closeLabel} data-vaul-no-drag onClick={() => setOpen(false)}><Icon name="close" /></Button>
            </div><Separator /></>}
          </header>
          <div className={styles.sheetBody} data-vaul-no-drag>{children}</div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  </div>;
}
