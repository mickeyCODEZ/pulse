import * as React from "react";

export interface DatePickerProps {
  /** Selected date. */
  value?: Date | null;
  onChange?: (date: Date) => void;
  style?: React.CSSProperties;
}

export function DatePicker(props: DatePickerProps): JSX.Element;
