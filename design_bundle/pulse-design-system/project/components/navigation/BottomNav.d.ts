import * as React from "react";

export interface NavItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

export interface BottomNavProps extends React.HTMLAttributes<HTMLElement> {
  items?: NavItem[];
  active?: string;
  onSelect?: (key: string) => void;
}

export function BottomNav(props: BottomNavProps): JSX.Element;
