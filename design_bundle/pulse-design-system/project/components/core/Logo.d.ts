import * as React from "react";

export interface LogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Mark size in px (wordmark scales from it). @default 28 */
  size?: number | string;
  /** Show the "Pulse" serif wordmark beside the mark. @default true */
  showWordmark?: boolean;
  /** Override color (defaults to --text-strong). */
  color?: string;
}

export function Logo(props: LogoProps): JSX.Element;
