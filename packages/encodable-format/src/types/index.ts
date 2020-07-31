export type NumberFormatFunction = (value: number) => string;

export interface NumberFormatterConfig {
  formatFunc: NumberFormatFunction;
  id?: string;
  label?: string;
  description?: string;
  isInvalid?: boolean;
}

export interface NumberFormatter {
  (value: number | null | undefined): string;
  id?: string;
  label?: string;
  description?: string;
  isInvalid?: boolean;
}
