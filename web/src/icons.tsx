// Pulse icon set — Lucide geometry (ISC), 1.75 stroke, redrawn inline so they
// compose cleanly inside React. Typed TSX port of the design-system set.
import type { CSSProperties, ReactNode } from "react";

export interface IconProps {
  size?: number;
  sw?: number;
  style?: CSSProperties;
}

const S = ({
  size = 20,
  sw = 1.75,
  style,
  children,
}: IconProps & { children: ReactNode }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    aria-hidden="true"
  >
    {children}
  </svg>
);

type Icon = (props: IconProps) => JSX.Element;
const make =
  (children: ReactNode): Icon =>
  (props: IconProps) =>
    <S {...props}>{children}</S>;

export const Pin = make(
  <>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="2.6" />
  </>,
);
export const Search = make(
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </>,
);
export const Home = make(
  <>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
  </>,
);
export const Bookmark = make(<path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />);
export const Bell = make(
  <>
    <path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" />
    <path d="M10 20a2 2 0 0 0 4 0" />
  </>,
);
export const User = make(
  <>
    <circle cx="12" cy="8" r="4" />
    <path d="M5 21a7 7 0 0 1 14 0" />
  </>,
);
export const Sliders = make(
  <>
    <path d="M4 8h10" />
    <path d="M18 8h2" />
    <circle cx="16" cy="8" r="2" />
    <path d="M4 16h2" />
    <path d="M10 16h10" />
    <circle cx="8" cy="16" r="2" />
  </>,
);
export const Filter = make(<path d="M3 5h18l-7 8v6l-4-2v-4z" />);
export const X = make(<path d="M18 6 6 18M6 6l12 12" />);
export const Check = make(<path d="M20 6 9 17l-5-5" />);
export const Plus = make(<path d="M12 5v14M5 12h14" />);
export const Calendar = make(
  <>
    <path d="M7 3v3M17 3v3" />
    <rect x={4} y={5} width={16} height={16} rx={2} />
    <path d="M4 10h16" />
  </>,
);
export const Clock = make(
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 8v4.5l3 1.6" />
  </>,
);
export const Share = make(
  <>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="m8.6 13.5 6.8 4M15.4 6.5 8.6 10.5" />
  </>,
);
export const ChevronRight = make(<path d="m9 6 6 6-6 6" />);
export const ChevronLeft = make(<path d="m15 6-6 6 6 6" />);
export const ChevronDown = make(<path d="m6 9 6 6 6-6" />);
export const Star = make(
  <path d="M12 3l2.6 5.6 6 .7-4.4 4.1 1.1 5.9L12 16.6 6.7 19.4l1.1-5.9L3.4 9.3l6-.7z" />,
);
export const Sparkles = make(
  <>
    <path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6z" />
    <path d="M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z" />
  </>,
);
export const ArrowUpRight = make(<path d="M7 17 17 7M8 7h9v9" />);
export const ExternalLink = make(
  <>
    <path d="M14 4h6v6" />
    <path d="M20 4 11 13" />
    <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </>,
);
export const Navigation = make(<path d="M3 11 21 3l-8 18-2-7z" />);
export const MapIcon = make(
  <>
    <path d="m9 4 6 2 6-2v14l-6 2-6-2-6 2V6z" />
    <path d="M9 4v14M15 6v14" />
  </>,
);
export const More = make(
  <>
    <circle cx="5" cy="12" r="1" />
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
  </>,
);
export const Music = make(
  <>
    <path d="M9 18V5l11-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="17" cy="16" r="3" />
  </>,
);
export const Palette = make(
  <>
    <path d="M12 21a9 9 0 1 1 9-9c0 2-2 3-4 3h-2a2 2 0 0 0-1 3.7A1.5 1.5 0 0 1 12 21Z" />
    <circle cx="7.5" cy="11.5" r="1" />
    <circle cx="12" cy="8" r="1" />
    <circle cx="16" cy="11" r="1" />
  </>,
);
export const Film = make(
  <>
    <rect x={3} y={4} width={18} height={16} rx={2} />
    <path d="M3 9h4M17 9h4M3 15h4M17 15h4M8 4v16M16 4v16" />
  </>,
);
export const Utensils = make(
  <>
    <path d="M5 3v7a2 2 0 0 0 4 0V3M7 10v11" />
    <path d="M17 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4v9" />
  </>,
);
export const Mic = make(
  <>
    <rect x={9} y={3} width={6} height={11} rx={3} />
    <path d="M6 11a6 6 0 0 0 12 0M12 17v4" />
  </>,
);
export const Ticket = make(
  <>
    <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4Z" />
    <path d="M14 6v12" strokeDasharray="2 3" />
  </>,
);
export const Heart = make(
  <path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.4-7 10-7 10Z" />,
);
export const Globe = make(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
  </>,
);
export const Refresh = make(
  <>
    <path d="M21 12a9 9 0 1 1-3-6.7L21 8" />
    <path d="M21 3v5h-5" />
  </>,
);
export const Download = make(
  <>
    <path d="M12 4v11m0 0 4-4m-4 4-4-4" />
    <path d="M5 19h14" />
  </>,
);

export const Icons = {
  Pin, Search, Home, Bookmark, Bell, User, Sliders, Filter, X, Check, Plus,
  Calendar, Clock, Share, ChevronRight, ChevronLeft, ChevronDown, Star,
  Sparkles, ArrowUpRight, ExternalLink, Navigation, MapIcon, More, Music, Palette,
  Film, Utensils, Mic, Ticket, Heart, Globe, Refresh, Download,
};
