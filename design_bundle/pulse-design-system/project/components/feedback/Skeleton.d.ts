import * as React from "react";

export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  width?: string;
  height?: string;
  radius?: string;
}

export function Skeleton(props: SkeletonProps): JSX.Element;

export interface EventCardSkeletonProps {
  style?: React.CSSProperties;
}

export function EventCardSkeleton(props: EventCardSkeletonProps): JSX.Element;
