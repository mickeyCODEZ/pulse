import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Lift on hover; use for clickable cards. @default false */
  interactive?: boolean;
  /** Flip to the ink surface (Hidden-gems treatment). @default false */
  inverse?: boolean;
  /** CSS padding value. @default var(--space-5) */
  padding?: string;
  /** Elevation step 0–4. @default 1 */
  elevation?: 0 | 1 | 2 | 3 | 4;
}

export function Card(props: CardProps): JSX.Element;
