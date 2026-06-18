import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual emphasis.
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "ghost";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Stretch to fill the container width. @default false */
  block?: boolean;
  /** Icon node rendered before the label. */
  iconLeft?: React.ReactNode;
  /** Icon node rendered after the label. */
  iconRight?: React.ReactNode;
  disabled?: boolean;
  /** Show a spinner and block input (prevents double-submit). @default false */
  loading?: boolean;
}

export function Button(props: ButtonProps): JSX.Element;
