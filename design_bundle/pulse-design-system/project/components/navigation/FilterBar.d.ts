import * as React from "react";

export type Filter = string | { key: string; label: string; icon?: React.ReactNode; count?: number };

export interface FilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  filters?: Filter[];
  /** Selected filter keys. */
  active?: string[];
  onToggle?: (key: string) => void;
  /** @default true */
  sticky?: boolean;
}

export function FilterBar(props: FilterBarProps): JSX.Element;
