import * as React from "react";

export type SegmentOption = string | { value: string; label: string };

export interface SegmentedControlProps {
  options?: SegmentOption[];
  value?: string;
  onChange?: (value: string) => void;
  /** @default "md" */
  size?: "sm" | "md";
  style?: React.CSSProperties;
}

export function SegmentedControl(props: SegmentedControlProps): JSX.Element;
