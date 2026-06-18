import * as React from "react";

export interface LocationSwitcherProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Active city name. */
  city: string;
  /** Show the progressive cold-start status. @default false */
  loading?: boolean;
  /** Override the loading status text. */
  statusText?: string;
  /** @default "md" */
  size?: "md" | "lg";
  onClick?: () => void;
}

export function LocationSwitcher(props: LocationSwitcherProps): JSX.Element;
