"use client";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import styles from "./alphabet-filter.module.css";

// Adapted from shadcn/ui's Radix Toggle Group (MIT):
// https://ui.shadcn.com/docs/components/radix/toggle-group
// Root/Item composition with the prototype's alphabet visuals and tokens.
type AlphabetFilterProps = {
  options: readonly { value: string; label: string }[];
  value: string[];
  onValueChange: (value: string[]) => void;
  label: string;
  controls: string;
  appearance?: "default" | "on-brand";
  disabled?: boolean;
};

export function AlphabetFilter({ options, value, onValueChange, label, controls, appearance = "default", disabled = false }: AlphabetFilterProps) {
  return <ToggleGroup.Root type="multiple" value={value} onValueChange={onValueChange}
    aria-label={label} disabled={disabled} className={styles.alphabet} data-appearance={appearance} data-slot="alphabet-filter">
    {options.map(option => <ToggleGroup.Item key={option.value} value={option.value}
      className={styles.letter} aria-controls={controls}>{option.label}</ToggleGroup.Item>)}
  </ToggleGroup.Root>;
}
