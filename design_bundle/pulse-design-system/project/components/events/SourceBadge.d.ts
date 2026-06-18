import * as React from "react";

export interface SourceBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Sources found on; first is the primary "via", the rest become "also on …". */
  sources?: string[] | string;
}

export function SourceBadge(props: SourceBadgeProps): JSX.Element;
