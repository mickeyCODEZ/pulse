import * as React from "react";

export interface MapPinProps extends React.HTMLAttributes<HTMLButtonElement> {
  /** Price/label inside the pin. */
  label?: string;
  free?: boolean;
  selected?: boolean;
  /** Show the hidden-gem star. @default false */
  gem?: boolean;
  /** Render as a bare dot (low emphasis). @default false */
  dot?: boolean;
  onClick?: () => void;
}

export function MapPin(props: MapPinProps): JSX.Element;
