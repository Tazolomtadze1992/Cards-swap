"use client";

import { useRef, type ComponentProps } from "react";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "./input-group";
import { Icon } from "./icon";

type SearchFieldProps = Omit<ComponentProps<"input">, "ref" | "type" | "value" | "defaultValue" | "onChange" | "aria-label" | "className" | "style" | "children"> & {
  value: string;
  onValueChange: (value: string) => void;
  label: string;
  clearLabel: string;
  appearance?: "default" | "on-brand";
};

export function SearchField({ value, onValueChange, label, clearLabel, appearance = "default", ...props }: SearchFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  return <InputGroup role="search" aria-label={label} appearance={appearance}>
    <InputGroupInput {...props} ref={inputRef} type="search" aria-label={label} value={value} onChange={event => onValueChange(event.target.value)} />
    <InputGroupAddon aria-hidden="true">
      <Icon name="search" />
    </InputGroupAddon>
    {value && <InputGroupAddon align="inline-end">
      <InputGroupButton aria-label={clearLabel} disabled={props.disabled || props.readOnly} onClick={() => {
        onValueChange("");
        inputRef.current?.focus();
      }}><Icon name="close" size="small" /></InputGroupButton>
    </InputGroupAddon>}
  </InputGroup>;
}
