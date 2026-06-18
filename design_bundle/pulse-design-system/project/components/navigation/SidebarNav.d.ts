import * as React from "react";
import { NavItem } from "./BottomNav";

export interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items?: NavItem[];
  active?: string;
  onSelect?: (key: string) => void;
  /** Node pinned to the bottom of the rail (e.g. profile). */
  footer?: React.ReactNode;
}

export function SidebarNav(props: SidebarNavProps): JSX.Element;
