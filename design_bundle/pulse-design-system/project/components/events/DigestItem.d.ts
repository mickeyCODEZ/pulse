import * as React from "react";
import { PulseEvent } from "./EventCard";

export interface DigestItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rank index (rendered as 01, 02 …). */
  index?: number;
  event: PulseEvent;
  onOpen?: (e?: any) => void;
}

export function DigestItem(props: DigestItemProps): JSX.Element;
