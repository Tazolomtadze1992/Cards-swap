"use client";

import { filterMotion, keyboardInteraction, useSurfacePresence } from "../motion/surface-motion";
import { useId, useState, type ComponentProps } from "react";
import { useReducedMotion } from "motion/react";
import { TextMorph } from "torph/react";
import * as Popover from "@radix-ui/react-popover";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Select from "@radix-ui/react-select";
import { Icon } from "./icon";
import styles from "./filters.module.css";
import { Button } from "./button";

// Adapted from shadcn/ui's Radix Popover, Checkbox and Select (MIT):
// https://github.com/shadcn-ui/ui/tree/main/apps/v4/registry/new-york-v4/ui
// Retain Portal/Content, Root/Indicator and Trigger/Viewport/Item composition;
// all visual decisions belong to this prototype, with no imported theme/motion.
type Layout = "content" | "catalogue";
type Option<T> = { value: T; label: string };
type TriggerProps = Omit<ComponentProps<"button">, "className" | "style"> & { active?: boolean; layout?: Layout };

function FilterLabel({ text }: { text: string }) {
  const reduced = useReducedMotion();
  const still = Boolean(reduced || (typeof document !== "undefined" && keyboardInteraction()));
  // One engine owns both text continuity and intrinsic width; never queue a
  // whole-label exit before showing the new value.
  return <span aria-hidden="true">
    <TextMorph className={styles.triggerLabel} locale="ka" duration={280}
      ease="cubic-bezier(0.19, 1, 0.22, 1)" disabled={still}>
      {text}
    </TextMorph>
  </span>;
}

export function FilterTrigger({ active = false, layout = "content", children, ...props }: TriggerProps) {
  return <button {...props} type="button" className={styles.trigger} data-filter-trigger data-layout={layout} data-active={active}>
    <span className={styles.triggerContent}>{children}</span><Icon name="chevronDown" size="compact" />
  </button>;
}

export function MultiSelectFilter<T extends string | number>({ label, placeholder, selectedLabel, options, value, onValueChange, layout = "content" }: {
  label: string;
  placeholder: string;
  selectedLabel: string;
  options: readonly Option<T>[];
  value: readonly T[];
  onValueChange: (value: T[]) => void;
  layout?: Layout;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const { present: panelPresent, attach: panelRef } = useSurfacePresence(open, filterMotion);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  return <div ref={setContainer} className={styles.shell} data-layout={layout}>
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <FilterTrigger layout={layout} active={value.length > 0} aria-label={value.length ? `${selectedLabel} : ${value.length}` : placeholder}>
          <FilterLabel text={value.length ? `${selectedLabel} : ${value.length}` : placeholder} />
        </FilterTrigger>
      </Popover.Trigger>
      {/* Keep portals in the themed subtree so live typography tokens inherit. */}
      {panelPresent && <Popover.Portal forceMount container={container}>
        <Popover.Content forceMount ref={panelRef} className={styles.panel} data-layout={layout} data-filter-panel align="start" sideOffset={10} collisionPadding={20} aria-label={label}>
          {options.map((option, index) => <label className={styles.option} key={option.value} htmlFor={`${id}-${index}`}>
            <Checkbox.Root className={styles.checkbox} id={`${id}-${index}`} checked={value.includes(option.value)} onCheckedChange={checked => onValueChange(checked === true ? [...value, option.value] : value.filter(item => item !== option.value))}>
              <Checkbox.Indicator className={styles.checkIndicator}><Icon name="check" size="small" /></Checkbox.Indicator>
            </Checkbox.Root>
            <span>{option.label}</span>
          </label>)}
        </Popover.Content>
      </Popover.Portal>}
    </Popover.Root>
  </div>;
}

export function SelectFilter<T extends string>({ label, placeholder, selectedLabel, options, value, onValueChange, emptyValue, layout = "catalogue" }: {
  label: string;
  placeholder: string;
  selectedLabel: string;
  options: readonly Option<T>[];
  value: T;
  emptyValue: T;
  onValueChange: (value: T) => void;
  layout?: Layout;
}) {
  const [open, setOpen] = useState(false);
  const { present: panelPresent, attach: panelRef } = useSurfacePresence(open, filterMotion);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const selected = options.find(option => option.value === value);
  const active = value !== emptyValue;
  const selectedText = `${selectedLabel} : ${selected?.label ?? ""}`;
  return <div ref={setContainer} className={styles.shell} data-layout={layout}>
    <Select.Root open={open} onOpenChange={setOpen} value={value} onValueChange={next => { const option = options.find(item => item.value === next); if (option) onValueChange(option.value); }}>
      <Select.Trigger className={styles.trigger} data-filter-trigger data-layout={layout} data-active={active} aria-label={`${label}: ${selected?.label ?? placeholder}`}>
        <FilterLabel text={active ? selectedText : placeholder} />
        <span className={styles.triggerValueContext} aria-hidden="true"><Select.Value>{selectedText}</Select.Value></span>
        <Select.Icon asChild><Icon name="chevronDown" size="compact" /></Select.Icon>
      </Select.Trigger>
      <Select.Portal forceMount={panelPresent ? true : undefined} container={container}>
        <Select.Content forceMount={panelPresent ? true : undefined} ref={panelRef} className={styles.panel} data-layout={layout} data-filter-panel position="popper" align="start" sideOffset={10} collisionPadding={20}>
          <Select.ScrollUpButton className={styles.scrollButton}><Icon name="chevronUp" size="compact" /></Select.ScrollUpButton>
          <Select.Viewport>
            {options.map(option => <Select.Item className={styles.option} key={option.value} value={option.value} textValue={option.label}>
              <span className={styles.radio} aria-hidden="true"><Select.ItemIndicator className={styles.radioIndicator} /></span>
              <Select.ItemText>{option.label}</Select.ItemText>
            </Select.Item>)}
          </Select.Viewport>
          <Select.ScrollDownButton className={styles.scrollButton}><Icon name="chevronDown" size="compact" /></Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  </div>;
}

export function FilterReset({ children, ...props }: Omit<ComponentProps<"button">, "className" | "style">) {
  return <Button {...props} variant="reset" size="default" data-filter-reset>
    <Icon name="trash" size="small" />
    {children}
  </Button>;
}
