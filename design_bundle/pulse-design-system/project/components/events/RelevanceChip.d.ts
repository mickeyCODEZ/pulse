import * as React from "react";

export interface RelevanceChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Matched reasons; joined with " · ". */
  reasons?: string[] | string;
  /** Optional score (0–100) shown after a divider. */
  score?: number;
  /** Tighter padding for compact cards. @default false */
  compact?: boolean;
}

export function RelevanceChip(props: RelevanceChipProps): JSX.Element;
