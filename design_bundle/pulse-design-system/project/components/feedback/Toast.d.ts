import * as React from "react";

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  message: React.ReactNode;
  /** Optional action label (e.g. "Undo"). */
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function Toast(props: ToastProps): JSX.Element;
