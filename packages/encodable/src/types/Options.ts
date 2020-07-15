export type NumberFormatter = (value: number | null | undefined) => string;
export type NumberFormatResolver = (format?: string) => NumberFormatter;

export type TimeFormatter = (value: Date | number | null | undefined) => string;
export type TimeFormatResolver = (format?: string) => TimeFormatter;

export type EncodableOptions = Partial<{
  numberFormatResolver: NumberFormatResolver;
  timeFormatResolver: TimeFormatResolver;
}>;
