import * as React from "react";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode;
  body?: React.ReactNode;
  /** Action node (usually a Button). */
  action?: React.ReactNode;
  /** Glyph key. @default "map" */
  glyph?: "map" | "search" | "saved" | "quiet" | "error";
}

export function EmptyState(props: EmptyStateProps): JSX.Element;
