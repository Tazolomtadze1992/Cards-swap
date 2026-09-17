import { HugeiconsIcon } from "@hugeicons/react";
import { forwardRef } from "react";
import styles from "./icon.module.css";
import {
  Add01Icon,
  ArrowDown01Icon,
  ArrowRight01Icon,
  ArrowRightDoubleIcon,
  ArrowUp01Icon,
  Book01Icon,
  BookOpen01Icon,
  Call02Icon,
  Copy01Icon,
  Delete02Icon,
  Download01Icon,
  FilterIcon,
  Folder01Icon,
  HelpCircleIcon,
  MinusSignIcon,
  Menu01Icon,
  PlayIcon,
  Search01Icon,
  Shield01Icon,
  Tick01Icon,
  VolumeHighIcon,
  VolumeOffIcon,
} from "@hugeicons/core-free-icons";

const icons = {
  check: Tick01Icon,
  arrowRight: ArrowRight01Icon,
  learning: BookOpen01Icon,
  resources: Folder01Icon,
  glossary: Book01Icon,
  faq: HelpCircleIcon,
  services: Shield01Icon,
  chevronDown: ArrowDown01Icon,
  chevronUp: ArrowUp01Icon,
  chevronsRight: ArrowRightDoubleIcon,
  copy: Copy01Icon,
  download: Download01Icon,
  filter: FilterIcon,
  minus: MinusSignIcon,
  menu: Menu01Icon,
  phone: Call02Icon,
  play: PlayIcon,
  plus: Add01Icon,
  search: Search01Icon,
  trash: Delete02Icon,
  volume: VolumeHighIcon,
  volumeOff: VolumeOffIcon,
} as const;

const sizes = { small: 16, compact: 16, default: 16, medium: 20, large: 32 } as const;

export type IconName = keyof typeof icons | "close";

export const Icon = forwardRef<SVGSVGElement, {
  name: IconName;
  size?: keyof typeof sizes;
}>(function Icon({ name, size = "default" }, ref) {
  if (name === "close") {
    // Match the header menu's open-state X: two 16px bars with 2.5px strokes.
    const pixelSize = size === "default" ? 20 : sizes[size];
    return <svg ref={ref} viewBox="0 0 20 20" width={pixelSize} height={pixelSize}
      style={{ width: pixelSize, height: pixelSize }} fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" className={styles.icon}
      aria-hidden="true" focusable="false" data-slot="icon">
      <path d="M4.343 4.343 15.657 15.657 M15.657 4.343 4.343 15.657" />
    </svg>;
  }
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
