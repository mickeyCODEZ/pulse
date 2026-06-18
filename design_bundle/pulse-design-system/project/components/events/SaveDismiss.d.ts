import * as React from "react";

export interface SaveDismissProps extends React.HTMLAttributes<HTMLDivElement> {
  saved?: boolean;
  onSave?: (e?: any) => void;
  onDismiss?: (e?: any) => void;
  /** Glassy styling for placement over imagery. @default false */
  overlay?: boolean;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
}

export function SaveDismiss(props: SaveDismissProps): JSX.Element;
