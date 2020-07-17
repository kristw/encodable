import { Value, DateTime, SchemeParams } from './VegaLite';
import { BaseScaleConfig } from './scale/BaseScaleConfig';
import { HasToString } from './Base';

// TODO: Consider including { valueOf(): number }
export type TimeInput = string | number | Date | DateTime;
export type ContinuousInput = TimeInput | boolean;
export type DiscreteInput = HasToString;

export type Bounds<T> = [T | null | undefined, T | null | undefined];
export type ContinuousDomain = ContinuousInput[] | Bounds<ContinuousInput>;
export type TimeDomain = TimeInput[] | Bounds<TimeInput>;

export type ExtendedBaseScaleConfig<T, R, D> = BaseScaleConfig<T, R, D> & {
  /**
   * name of the color scheme.
   */
  scheme?: string | SchemeParams;
};

// Make the specific scales pick
// from same base type to share property documentation
// (which is useful for auto-complete/intellisense)
// and add `type` property as discriminant of union type.
type CreateScaleConfig<T, Fields extends keyof ExtendedBaseScaleConfig<T, R, D>, R, D> = Pick<
  ExtendedBaseScaleConfig<T, R, D>,
  'type' | 'domain' | 'range' | 'reverse' | Fields
>;

export type LinearScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'linear',
  'clamp' | 'interpolate' | 'nice' | 'round' | 'scheme' | 'zero',
  Output[],
  ContinuousDomain
>;

export type LogScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'log',
  'base' | 'clamp' | 'interpolate' | 'nice' | 'round' | 'scheme',
  Output[],
  ContinuousDomain
>;

export type PowScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'pow',
  'clamp' | 'exponent' | 'interpolate' | 'nice' | 'round' | 'scheme' | 'zero',
  Output[],
  ContinuousDomain
>;

export type SqrtScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'sqrt',
  'clamp' | 'interpolate' | 'nice' | 'round' | 'scheme' | 'zero',
  Output[],
  ContinuousDomain
>;

export type SymlogScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'symlog',
  'clamp' | 'constant' | 'nice' | 'round' | 'scheme' | 'zero',
  Output[],
  ContinuousDomain
>;

export type QuantileScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'quantile',
  'interpolate' | 'scheme',
  Output[],
  ContinuousDomain
>;

export type QuantizeScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'quantize',
  'interpolate' | 'nice' | 'scheme' | 'zero',
  Output[],
  ContinuousDomain
>;

export type ThresholdScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'threshold',
  'interpolate' | 'nice' | 'scheme',
  Output[],
  ContinuousDomain
>;

export type BinOrdinalScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'bin-ordinal',
  'interpolate' | 'scheme',
  Output[],
  ContinuousDomain
>;

export type OrdinalScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'ordinal',
  'interpolate' | 'scheme',
  Output[],
  DiscreteInput[]
>;

export type PointScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'point',
  'align' | 'padding' | 'round',
  Output[],
  DiscreteInput[]
>;

export type BandScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'band',
  'align' | 'padding' | 'paddingInner' | 'paddingOuter' | 'round',
  Output[],
  DiscreteInput[]
>;

export type TimeScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'time',
  'clamp' | 'interpolate' | 'nice' | 'padding' | 'round' | 'scheme',
  Output[],
  TimeDomain
>;

export type UtcScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'utc',
  'clamp' | 'interpolate' | 'nice' | 'padding' | 'round' | 'scheme',
  Output[],
  TimeDomain
>;

export type ContinuousScaleConfig<Output extends Value = Value> =
  | LinearScaleConfig<Output>
  | LogScaleConfig<Output>
  | PowScaleConfig<Output>
  | SqrtScaleConfig<Output>
  | SymlogScaleConfig<Output>
  | TimeScaleConfig<Output>
  | UtcScaleConfig<Output>;

export type DiscretizingScaleConfig<Output extends Value = Value> =
  | QuantileScaleConfig<Output>
  | QuantizeScaleConfig<Output>
  | ThresholdScaleConfig<Output>
  | BinOrdinalScaleConfig<Output>;

export type DiscreteScaleConfig<Output extends Value = Value> =
  | OrdinalScaleConfig<Output>
  | PointScaleConfig<Output>
  | BandScaleConfig<Output>;

export type ScaleConfig<Output extends Value = Value> =
  | ContinuousScaleConfig<Output>
  | DiscretizingScaleConfig<Output>
  | DiscreteScaleConfig<Output>;

export interface WithScale<Output extends Value = Value> {
  scale?: Partial<ScaleConfig<Output>>;
}
