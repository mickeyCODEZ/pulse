import * as React from "react";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Full name; initials are derived from it. */
  name?: string;
  /** Optional image URL. */
  src?: string;
  /** Diameter in px. @default 36 */
  size?: number;
}

export function Avatar(props: AvatarProps): JSX.Element;
