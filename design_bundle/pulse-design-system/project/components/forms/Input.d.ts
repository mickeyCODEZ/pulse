import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Mono uppercase field label. */
  label?: string;
  /** Helper text below the field. */
  hint?: string;
  /** Leading icon node. */
  iconLeft?: React.ReactNode;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
}

export function Input(props: InputProps): JSX.Element;
