import * as React from "react";

export interface PriceTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Numeric or string price (e.g. 15 or "$15–40"). */
  price?: number | string;
  /** Render the "Free" marker. @default false */
  free?: boolean;
  /** Style for placement over imagery (glassy/contrast). @default false */
  overlay?: boolean;
}

export function PriceTag(props: PriceTagProps): JSX.Element;
