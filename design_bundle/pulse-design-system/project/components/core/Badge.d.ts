import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default "neutral" */
  tone?: "neutral" | "inverse" | "ok" | "warn" | "error";
  /** Render as a bare status dot (no label). @default false */
  dot?: boolean;
}

export function Badge(props: BadgeProps): JSX.Element;
