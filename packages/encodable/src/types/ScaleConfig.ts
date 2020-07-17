import { Value, DateTime, SchemeParams } from './VegaLite';
import { BaseScaleConfig } from './scale/BaseScaleConfig';
import { HasToString } from './Base';

// TODO: Consider including { valueOf(): number }
export type TimeInput = string | number | Date | DateTime;
export type ContinuousInput = TimeInput | boolean;
export type DiscreteInput = HasToString;

export type ExtendedBaseScaleConfig<T, Output, Input> = BaseScaleConfig<T, Output, Input> & {
  /**
   * Fix minimum value for the domain.
   * If set, this is always used instead of `domain[0]`.
   *
   * Also can be used in a situation
   * when you want to later set domain programmatically
   * after the scale was created.
   * Calling `scale.domain(newDomain)`
   * uses maximum value from the incoming domain
   * but still fix the minimum to this value,
   * so the final domain is `[domainMin, newDomain[1]]`
   */
  domainMin?: Input | null;

  /**
   * Fix maximum value for the domain.
   * If set, this is used instead of `domain[1]`.
   *
   * Also can be used in a situation
   * when you want to later set domain programmatically
   * after the scale was created.
   * Calling `scale.domain(newDomain)`
   * uses minimum value from the incoming domain
   * but still fix the maximum to this value,
   * so the final domain is `[newDomain[0], domainMax]`
   */
  domainMax?: Input | null;

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
  'domainMin' | 'domainMax' | 'clamp' | 'interpolate' | 'nice' | 'round' | 'scheme' | 'zero',
  Output,
  ContinuousInput
>;

export type LogScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'log',
  'domainMin' | 'domainMax' | 'base' | 'clamp' | 'interpolate' | 'nice' | 'round' | 'scheme',
  Output,
  ContinuousInput
>;

export type PowScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'pow',
  | 'domainMin'
  | 'domainMax'
  | 'clamp'
  | 'exponent'
  | 'interpolate'
  | 'nice'
  | 'round'
  | 'scheme'
  | 'zero',
  Output,
  ContinuousInput
>;

export type SqrtScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'sqrt',
  'domainMin' | 'domainMax' | 'clamp' | 'interpolate' | 'nice' | 'round' | 'scheme' | 'zero',
  Output,
  ContinuousInput
>;

export type SymlogScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'symlog',
  'domainMin' | 'domainMax' | 'clamp' | 'constant' | 'nice' | 'round' | 'scheme' | 'zero',
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
  'domainMin' | 'domainMax' | 'interpolate' | 'nice' | 'scheme' | 'zero',
  Output,
  ContinuousInput
>;

export type ThresholdScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'threshold',
  'domainMin' | 'domainMax' | 'interpolate' | 'nice' | 'scheme',
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
