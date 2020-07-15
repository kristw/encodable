import { ScaleOrdinal } from 'd3-scale';
import { CategoricalScaleInput } from './Scale';

export type NumberFormatter = (value: number | null | undefined) => string;
export type NumberFormatResolver = (format?: string) => NumberFormatter;

export type TimeFormatter = (value: Date | number | null | undefined) => string;
export type TimeFormatResolver = (format?: string) => TimeFormatter;

export type CategoricalColorScaleResolver = (params: {
  name?: string;
  namespace?: string;
}) => ScaleOrdinal<CategoricalScaleInput, string>;

/**
 * All fields are optional.
 */
export type EncodableOptions = Partial<{
  numberFormatResolver: NumberFormatResolver;
  timeFormatResolver: TimeFormatResolver;
  categoricalColorScaleResolver: CategoricalColorScaleResolver;
}>;
