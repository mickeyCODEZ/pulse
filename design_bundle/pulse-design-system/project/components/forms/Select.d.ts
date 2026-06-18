import * as React from "react";

export type SelectOption = string | { value: string; label: string };

export interface SelectProps {
  label?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  options?: SelectOption[];
  /** @default "md" */
  size?: "sm" | "md";
  style?: React.CSSProperties;
}

export function Select(props: SelectProps): JSX.Element;
