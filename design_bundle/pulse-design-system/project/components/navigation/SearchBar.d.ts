import * as React from "react";

export interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  style?: React.CSSProperties;
}

export function SearchBar(props: SearchBarProps): JSX.Element;
