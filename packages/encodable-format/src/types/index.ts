interface FormatterMetadata {
  id?: string;
  label?: string;
  description?: string;
}

// Number

export type NumberFormatInput = number | null | undefined;

export type NumberFormatFunction = (value: number) => string;

export interface NumberFormatterMetadata extends FormatterMetadata {
  isInvalid?: boolean;
}

export interface NumberFormatter extends NumberFormatterMetadata {
  (value: NumberFormatInput): string;
}

// Time

export type TimeFormatInput = Date | number | null | undefined;

export type TimeFormatFunction = (value: Date) => string;

export interface TimeFormatterMetadata extends FormatterMetadata {
  useLocalTime?: boolean;
}

export interface TimeFormatter extends TimeFormatterMetadata {
  (value: TimeFormatInput): string;
}

// Time Range

export type TimeRangeFormatFunction = (values: TimeFormatInput[]) => string;

export interface TimeRangeFormatter extends TimeFormatterMetadata {
  (value: TimeFormatInput[]): string;
}
