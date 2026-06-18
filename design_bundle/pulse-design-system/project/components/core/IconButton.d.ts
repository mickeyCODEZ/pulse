import * as React from "react";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** @default "ghost" */
  variant?: "ghost" | "outline" | "solid";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Pill instead of rounded-square. @default false */
  round?: boolean;
  /** Toggled/selected state (e.g. saved). @default false */
  active?: boolean;
  disabled?: boolean;
  /** Accessible label (icon-only control). */
  label?: string;
}

export function IconButton(props: IconButtonProps): JSX.Element;
