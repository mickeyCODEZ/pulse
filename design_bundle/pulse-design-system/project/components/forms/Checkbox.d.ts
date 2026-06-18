import * as React from "react";

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (next: boolean) => void;
  /** Pill label (interest tag, dealbreaker). */
  label?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Checkbox(props: CheckboxProps): JSX.Element;
