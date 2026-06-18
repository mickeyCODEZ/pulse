import * as React from "react";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Invert to ink fill for emphasis. @default false */
  solid?: boolean;
  /** @default "md" */
  size?: "sm" | "md";
}

export function Tag(props: TagProps): JSX.Element;
