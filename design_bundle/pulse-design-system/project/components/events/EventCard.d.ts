import * as React from "react";

/** Shared event shape consumed across event components. */
export interface PulseEvent {
  title: string;
  category?: string;
  date?: string;
  venue?: string;
  distance?: string;
  price?: number | string;
  free?: boolean;
  /** Matched reasons, e.g. ["live music", "under $15"]. */
  relevance?: string[];
  /** Sources found on; first is primary, rest render as "also on …". */
  sources?: string[];
  /** Freshness label, e.g. "added 2h ago". */
  freshness?: string;
  /** High-relevance, low-popularity — applies the Hidden-gems treatment. */
  gem?: boolean;
  /** Optional relevance score (0–100). */
  score?: number;
  /** Override the duotone placeholder (e.g. real image as backgroundImage). */
  imageStyle?: React.CSSProperties;
}

/**
 * @startingPoint section="Events" subtitle="Image-forward ranked event card" viewport="780x520"
 */
export interface EventCardProps extends React.HTMLAttributes<HTMLElement> {
  event: PulseEvent;
  /** @default "feed" */
  variant?: "feed" | "compact";
  saved?: boolean;
  onSave?: (e?: any) => void;
  onDismiss?: (e?: any) => void;
  onOpen?: (e?: any) => void;
}

export function EventCard(props: EventCardProps): JSX.Element;
