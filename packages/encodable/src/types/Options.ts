import { ColorScheme, ColorSchemeType } from '@encodable/color';
import { NumberFormatter, TimeFormatter } from '@encodable/format';
import { ScaleOrdinal } from 'd3-scale';
import { StringLike } from './Core';

export type NumberFormatResolver = (format?: string) => NumberFormatter;

export type TimeFormatResolver = (params?: {
  format?: string;
  formatInLocalTime?: boolean;
}) => TimeFormatter;

export type CategoricalColorScaleResolver = (params?: {
  name?: string;
  namespace?: string;
}) => ScaleOrdinal<StringLike, string>;

export type ColorSchemeResolver = (params?: {
  name?: string;
  type?: ColorSchemeType;
}) => ColorScheme | undefined;

/**
 * All fields are optional.
 */
export type EncodableState = Partial<{
  numberFormatResolver: NumberFormatResolver;
  timeFormatResolver: TimeFormatResolver;
  categoricalColorScaleResolver: CategoricalColorScaleResolver;
  colorSchemeResolver: ColorSchemeResolver;
}>;
