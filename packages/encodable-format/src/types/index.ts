interface FormatterMetadata {
  id?: string;
  label?: string;
  description?: string;
}

// Number

export type NumberFormatFunction = (value: number) => string;

export interface NumberFormatterMetadata extends FormatterMetadata {
  isInvalid?: boolean;
}

export interface NumberFormatterConfig extends NumberFormatterMetadata {
  formatFunc: NumberFormatFunction;
}

export interface NumberFormatter extends NumberFormatterMetadata {
  (value: number | null | undefined): string;
}

// Time

export type TimeFormatFunction = (value: Date) => string;

export interface TimeFormatterMetadata extends FormatterMetadata {
  useLocalTime?: boolean;
}

export interface TimeFormatterConfig extends TimeFormatterMetadata {
  formatFunc: TimeFormatFunction;
}

export interface TimeFormatter extends TimeFormatterMetadata {
  (value: Date | number | null | undefined): string;
}

// Time Range

export type TimeRangeFormatFunction = (values: (Date | number | undefined | null)[]) => string;

export interface TimeRangeFormatter extends TimeFormatterMetadata {
  (value: (Date | number | null | undefined)[]): string;
}
