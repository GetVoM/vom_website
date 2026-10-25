import type { SVGProps } from "react";
import type { SectorIcon } from "@/lib/i18n/dictionaries/types";

type IconName =
  | SectorIcon
  | "arrow"
  | "check"
  | "plus"
  | "calculator"
  | "download"
  | "book"
  | "menu"
  | "close"
  | "box"
  | "receipt"
  | "users"
  | "wallet"
  | "star"
  | "layers"
  | "chevron"
  | "card";

const paths: Record<IconName, string> = {
  arrow: "M5 12h14M13 6l6 6-6 6",
  check: "M5 12.5l4.5 4.5L19 7",
  plus: "M12 5v14M5 12h14",
  calculator: "M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8 7h8M8 12h2M12 12h2M16 12h0M8 16h2M12 16h2M16 16h0",
  download: "M12 4v12M7 11l5 5 5-5M5 20h14",
  book: "M4 5a2 2 0 0 1 2-2h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2zM4 17a2 2 0 0 1 2-2h13",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  box: "M12 3l8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9",
  receipt: "M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6M9 16h4",
  users: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 20a6 6 0 0 1 12 0M16 4.5a3.5 3.5 0 0 1 0 6.5M17 14a6 6 0 0 1 4 6",
  wallet: "M3 7a2 2 0 0 1 2-2h13v3M3 7v10a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H5a2 2 0 0 1-2-1zM16 13h2",
  star: "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z",
  layers: "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 18l9 5 9-5",
  chevron: "M9 6l6 6-6 6",
  card: "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 10h18M7 15h4",
  utensils: "M7 3v8a2 2 0 0 0 2 2h0v8M9 3v5M5 3v5M17 3c-2 0-3 3-3 6s1 4 2 4v8",
  scissors: "M6 6a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM6 13a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM8 9.5L20 4M8 14.5L20 20M13 12h1",
  dumbbell: "M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10",
  scale: "M12 3v18M5 7h14M5 7l-3 6a3 3 0 0 0 6 0zM19 7l-3 6a3 3 0 0 0 6 0zM8 21h8",
  pen: "M3 21l4-1 11-11-3-3L4 17zM14 6l3 3M17 3l4 4",
  megaphone: "M3 11v2a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1zM17 9a4 4 0 0 1 0 6M7 14l1 6h3",
  truck: "M3 7h11v9H3zM14 10h4l3 3v3h-7zM6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  plane: "M3 13l8-2 4-8h2l-2 8 6 2v2l-6-1-2 6h-2l1-6-6 1z",
  car: "M5 11l2-5h10l2 5M4 11h16v6h-2a2 2 0 0 1-4 0H10a2 2 0 0 1-4 0H4zM7 14h2M15 14h2",
  cart: "M3 4h2l2 12h11l2-8H6M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM17 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  spray: "M9 8h6v13H9zM10 8V5h4v3M12 2v3M17 4l2-1M17 7h3M4 11h3M4 14h3",
  building: "M4 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16M14 9h5a1 1 0 0 1 1 1v11M3 21h18M7 8h3M7 12h3M7 16h3M17 13h1M17 17h1",
  chart: "M4 20V4M4 20h16M7 15l4-5 3 3 6-7",
  printer: "M7 8V3h10v5M5 8h14a2 2 0 0 1 2 2v6h-4v4H7v-4H3v-6a2 2 0 0 1 2-2zM7 16h10",
  baby: "M12 3a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0V7a4 4 0 0 1 4-4zM10 8h.5M13.5 8h.5M6 21a6 6 0 0 1 12 0",
};

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 20, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d={paths[name]} />
    </svg>
  );
}
