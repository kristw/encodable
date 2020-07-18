import { Value, DateTime, SchemeParams } from './VegaLite';
import { BaseScaleConfig } from './scale/BaseScaleConfig';
import { HasToString } from './Base';

type Numeric = number | { valueOf(): number };

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
type CreateScaleConfig<
  T,
  R,
  D,
  Fields extends keyof ExtendedBaseScaleConfig<T, R, D> = 'type'
> = Pick<ExtendedBaseScaleConfig<T, R, D>, 'type' | 'domain' | 'range' | 'reverse' | Fields>;

export type LinearScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'linear',
  Output[],
  ContinuousDomain,
  'clamp' | 'interpolate' | 'nice' | 'round' | 'scheme' | 'zero'
>;

export type LogScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'log',
  Output[],
  ContinuousDomain,
  'base' | 'clamp' | 'interpolate' | 'nice' | 'round' | 'scheme'
>;

export type PowScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'pow',
  Output[],
  ContinuousDomain,
  'clamp' | 'exponent' | 'interpolate' | 'nice' | 'round' | 'scheme' | 'zero'
>;

export type SqrtScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'sqrt',
  Output[],
  ContinuousDomain,
  'clamp' | 'interpolate' | 'nice' | 'round' | 'scheme' | 'zero'
>;

export type SymlogScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'symlog',
  Output[],
  ContinuousDomain,
  'clamp' | 'constant' | 'nice' | 'round' | 'scheme' | 'zero'
>;

export type QuantileScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'quantile',
  Output[],
  ContinuousDomain,
  'interpolate' | 'scheme'
>;

export type QuantizeScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'quantize',
  Output[],
  [ContinuousInput, ContinuousInput] | Bounds<ContinuousInput>,
  'interpolate' | 'nice' | 'scheme' | 'zero'
>;

export type ThresholdScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'threshold',
  Output[],
  ContinuousDomain,
  'scheme'
>;

export type BinOrdinalScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'bin-ordinal',
  Output[],
  ContinuousDomain,
  'scheme'
>;

export type OrdinalScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'ordinal',
  Output[],
  DiscreteInput[],
  'scheme' | 'unknown'
>;

export type PointScaleConfig = CreateScaleConfig<
  'point',
  [Numeric, Numeric],
  DiscreteInput[],
  'align' | 'padding' | 'round'
>;

export type BandScaleConfig = CreateScaleConfig<
  'band',
  [Numeric, Numeric],
  DiscreteInput[],
  'align' | 'padding' | 'paddingInner' | 'paddingOuter' | 'round'
>;

export type TimeScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'time',
  Output[],
  TimeDomain,
  'clamp' | 'interpolate' | 'nice' | 'round' | 'scheme'
>;

export type UtcScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'utc',
  Output[],
  TimeDomain,
  'clamp' | 'interpolate' | 'nice' | 'round' | 'scheme'
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
  | PointScaleConfig
  | BandScaleConfig;

export type ScaleConfig<Output extends Value = Value> =
  | ContinuousScaleConfig<Output>
  | DiscretizingScaleConfig<Output>
  | DiscreteScaleConfig<Output>;

export interface WithScale<Output extends Value = Value> {
  scale?: Partial<ScaleConfig<Output>>;
}
