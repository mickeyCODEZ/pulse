import * as React from "react";

export interface FilterChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  icon?: React.ReactNode;
  /** Optional trailing count. */
  count?: number;
}

export function FilterChip(props: FilterChipProps): JSX.Element;
