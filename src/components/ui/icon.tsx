import { HugeiconsIcon } from "@hugeicons/react";
import { forwardRef } from "react";
import styles from "./icon.module.css";
import {
  Add01Icon,
  ArrowDown01Icon,
  ArrowRightDoubleIcon,
  ArrowUp01Icon,
  Call02Icon,
  Cancel01Icon,
  Delete02Icon,
  Download04Icon,
  MinusSignIcon,
  PlayIcon,
  Search01Icon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";

const icons = {
  check: Tick01Icon,
  chevronDown: ArrowDown01Icon,
  chevronUp: ArrowUp01Icon,
  chevronsRight: ArrowRightDoubleIcon,
  close: Cancel01Icon,
  download: Download04Icon,
  minus: MinusSignIcon,
  phone: Call02Icon,
  play: PlayIcon,
  plus: Add01Icon,
  search: Search01Icon,
  trash: Delete02Icon,
} as const;

const sizes = { small: 16, compact: 16, default: 16, medium: 20, large: 32 } as const;

export type IconName = keyof typeof icons;

export const Icon = forwardRef<SVGSVGElement, {
  name: IconName;
  size?: keyof typeof sizes;
}>(function Icon({ name, size = "default" }, ref) {
  return <HugeiconsIcon
    ref={ref}
    icon={icons[name]}
    size={sizes[size]}
    color="currentColor"
    strokeWidth={2.5}
    className={styles.icon}
    aria-hidden="true"
    focusable="false"
    data-slot="icon"
  />;
});
