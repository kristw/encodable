import { Value, DateTime, SchemeParams } from './VegaLite';
import { BaseScaleConfig } from './scale/BaseScaleConfig';
import { HasToString } from './Base';

type TimeInput = string | number | Date | DateTime | { valueOf(): number } | undefined | null;
type ContinuousInput = TimeInput | boolean;
type DiscreteInput = HasToString;

export type ExtendedBaseScaleConfig<T, Range, Domain> = BaseScaleConfig<T, Range, Domain> & {
  /**
   * name of the color scheme.
   */
  scheme?: string | SchemeParams;
};

// Make the specific scales pick
// from same base type to share property documentation
// (which is useful for auto-complete/intellisense)
// and add `type` property as discriminant of union type.
type CreateScaleConfig<
  T,
  Fields extends keyof ExtendedBaseScaleConfig<T, Output, Input>,
  Output,
  Input
> = Pick<
  ExtendedBaseScaleConfig<T, Output, Input>,
  'type' | 'domain' | 'range' | 'reverse' | Fields
>;

export type LinearScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'linear',
  'clamp' | 'interpolate' | 'nice' | 'padding' | 'round' | 'scheme' | 'zero',
  Output,
  ContinuousInput
>;

export type LogScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'log',
  'base' | 'clamp' | 'interpolate' | 'nice' | 'padding' | 'round' | 'scheme',
  Output,
  ContinuousInput
>;

export type PowScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'pow',
  'clamp' | 'exponent' | 'interpolate' | 'nice' | 'padding' | 'round' | 'scheme' | 'zero',
  Output,
  ContinuousInput
>;

export type SqrtScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'sqrt',
  'clamp' | 'interpolate' | 'nice' | 'padding' | 'round' | 'scheme' | 'zero',
  Output,
  ContinuousInput
>;

export type SymlogScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'symlog',
  'clamp' | 'constant' | 'interpolate' | 'nice' | 'padding' | 'round' | 'scheme' | 'zero',
  Output,
  ContinuousInput
>;

export type QuantileScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'quantile',
  'interpolate' | 'scheme',
  Output,
  ContinuousInput
>;

export type QuantizeScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'quantize',
  'interpolate' | 'nice' | 'scheme' | 'zero',
  Output,
  ContinuousInput
>;

export type ThresholdScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'threshold',
  'interpolate' | 'nice' | 'scheme',
  Output,
  ContinuousInput
>;

export type BinOrdinalScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'bin-ordinal',
  'interpolate' | 'scheme',
  Output,
  ContinuousInput
>;

export type OrdinalScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'ordinal',
  'interpolate' | 'scheme',
  Output,
  DiscreteInput
>;

export type PointScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'point',
  'align' | 'padding' | 'round',
  Output,
  DiscreteInput
>;

export type BandScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'band',
  'align' | 'padding' | 'paddingInner' | 'paddingOuter' | 'round',
  Output,
  DiscreteInput
>;

export type TimeScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'time',
  'clamp' | 'interpolate' | 'nice' | 'padding' | 'round' | 'scheme',
  Output,
  TimeInput
>;

export type UtcScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'utc',
  'clamp' | 'interpolate' | 'nice' | 'padding' | 'round' | 'scheme',
  Output,
  TimeInput
>;

export type ScaleConfig<Output extends Value = Value> =
  | LinearScaleConfig<Output>
  | LogScaleConfig<Output>
  | PowScaleConfig<Output>
  | SqrtScaleConfig<Output>
  | SymlogScaleConfig<Output>
  | TimeScaleConfig<Output>
  | UtcScaleConfig<Output>
  | QuantileScaleConfig<Output>
  | QuantizeScaleConfig<Output>
  | ThresholdScaleConfig<Output>
  | BinOrdinalScaleConfig<Output>
  | OrdinalScaleConfig<Output>
  | PointScaleConfig<Output>
  | BandScaleConfig<Output>;

export interface WithScale<Output extends Value = Value> {
  scale?: Partial<ScaleConfig<Output>>;
}
