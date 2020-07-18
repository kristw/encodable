import { ScaleOrdinal } from 'd3-scale';
import { CategoricalScaleInput } from './scale/Scale';

export type NumberFormatter = (value: number | null | undefined) => string;
export type NumberFormatResolver = (format?: string) => NumberFormatter;

export type TimeFormatter = (value: Date | number | null | undefined) => string;
export type TimeFormatResolver = (params: {
  format?: string;
  formatInLocalTime?: boolean;
}) => TimeFormatter;

export type CategoricalColorScaleResolver = (params: {
  name?: string;
  namespace?: string;
}) => ScaleOrdinal<CategoricalScaleInput, string>;

export type ColorSchemeResolver = (params: {
  name?: string;
  type?: 'sequential' | 'diverging' | 'categorical';
}) => string[] | undefined;

/**
 * All fields are optional.
 */
export type EncodableOptions = Partial<{
  numberFormatResolver: NumberFormatResolver;
  timeFormatResolver: TimeFormatResolver;
  categoricalColorScaleResolver: CategoricalColorScaleResolver;
  colorSchemeResolver: ColorSchemeResolver;
}>;
