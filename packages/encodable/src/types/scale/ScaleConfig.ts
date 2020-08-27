import { BaseScaleConfig } from './BaseScaleConfig';
import { ValueOf } from '../internal/Base';
import { Value, StringLike, NumberLike } from '../Core';
import { NiceTime } from './Nice';
import { SchemeParams } from './SchemeParams';
import { DateTime } from '../DateTime';
import { DefaultThresholdInput } from './Scale';

type Numeric = number | NumberLike;

// TODO: Consider including { valueOf(): number }
export type TimeInput = string | number | Date | DateTime;
export type ContinuousInput = TimeInput | boolean;

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
  D,
  R,
  Fields extends keyof ExtendedBaseScaleConfig<T, D, R> = 'type'
> = Pick<ExtendedBaseScaleConfig<T, D, R>, 'type' | 'domain' | 'range' | 'reverse' | Fields>;

export type LinearScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'linear',
  ContinuousDomain,
  Output[],
  'clamp' | 'interpolate' | 'nice' | 'round' | 'scheme' | 'zero'
>;

export type LogScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'log',
  ContinuousDomain,
  Output[],
  'base' | 'clamp' | 'interpolate' | 'nice' | 'round' | 'scheme'
>;

export type PowScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'pow',
  ContinuousDomain,
  Output[],
  'clamp' | 'exponent' | 'interpolate' | 'nice' | 'round' | 'scheme' | 'zero'
>;

export type SqrtScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'sqrt',
  ContinuousDomain,
  Output[],
  'clamp' | 'interpolate' | 'nice' | 'round' | 'scheme' | 'zero'
>;

export type SymlogScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'symlog',
  ContinuousDomain,
  Output[],
  'clamp' | 'constant' | 'nice' | 'round' | 'scheme' | 'zero'
>;

export type QuantileScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'quantile',
  ContinuousDomain,
  Output[],
  'scheme'
>;

export type QuantizeScaleConfig<Output extends Value = Value> = CreateScaleConfig<
  'quantize',
  [ContinuousInput, ContinuousInput] | Bounds<ContinuousInput>,
  Output[],
  'nice' | 'scheme' | 'zero'
>;

export type ThresholdScaleConfig<
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput,
  Output extends Value = Value
> = CreateScaleConfig<'threshold', ThresholdInput[], Output[], 'scheme'>;

// export type BinOrdinalScaleConfig<Output extends Value = Value> = CreateScaleConfig<
//   'bin-ordinal',
//   Output[],
//   ContinuousDomain,
//   'scheme'
// >;

export type OrdinalScaleConfig<
  DiscreteInput extends StringLike = StringLike,
  Output extends Value = Value
> = CreateScaleConfig<'ordinal', DiscreteInput[], Output[], 'scheme' | 'unknown'>;

export type PointScaleConfig<DiscreteInput extends StringLike = StringLike> = CreateScaleConfig<
  'point',
  DiscreteInput[],
  [Numeric, Numeric],
  'align' | 'padding' | 'round'
>;

export type BandScaleConfig<DiscreteInput extends StringLike = StringLike> = CreateScaleConfig<
  'band',
  DiscreteInput[],
  [Numeric, Numeric],
  'align' | 'padding' | 'paddingInner' | 'paddingOuter' | 'round'
>;

interface TemporalScaleConfig<T, Output extends Value = Value>
  extends CreateScaleConfig<T, TimeDomain, Output[], 'clamp' | 'interpolate' | 'round' | 'scheme'> {
  /**
   * Extending the domain so that it starts and ends on nice round values. This method typically modifies the scale’s domain, and may only extend the bounds to the nearest round value. Nicing is useful if the domain is computed from data and may be irregular. For example, for a domain of _[0.201479…, 0.996679…]_, a nice domain might be _[0.2, 1.0]_.
   *
   * For quantitative scales such as linear, `nice` can be either a boolean flag or a number. If `nice` is a number, it will represent a desired tick count. This allows greater control over the step size used to extend the bounds, guaranteeing that the returned ticks will exactly cover the domain.
   *
   * For temporal fields with time and utc scales, the `nice` value can be a string indicating the desired time interval. Legal values are `"millisecond"`, `"second"`, `"minute"`, `"hour"`, `"day"`, `"week"`, `"month"`, and `"year"`. Alternatively, `time` and `utc` scales can accept an object-valued interval specifier of the form `{"interval": "month", "step": 3}`, which includes a desired number of interval steps. Here, the domain would snap to quarter (Jan, Apr, Jul, Oct) boundaries.
   *
   * __Default value:__ `true` for unbinned _quantitative_ fields; `false` otherwise.
   *
   */
  nice?: boolean | number | NiceTime | { interval: NiceTime; step: number };
}

export type TimeScaleConfig<Output extends Value = Value> = TemporalScaleConfig<'time', Output>;

export type UtcScaleConfig<Output extends Value = Value> = TemporalScaleConfig<'utc', Output>;

/**
 * Map scale type to D3Scale type
 * @type `Output`: Output type of all scales except point and band
 * @type `ThresholdInput`: Input type for threshold scale
 * @type `DiscreteInput`: Input type for ordinal, point and band scales
 */
export interface ScaleTypeToScaleConfig<
  Output extends Value = Value,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput
> {
  linear: LinearScaleConfig<Output>;
  log: LogScaleConfig<Output>;
  pow: PowScaleConfig<Output>;
  sqrt: SqrtScaleConfig<Output>;
  symlog: SymlogScaleConfig<Output>;
  time: TimeScaleConfig<Output>;
  utc: UtcScaleConfig<Output>;
  quantile: QuantileScaleConfig<Output>;
  quantize: QuantizeScaleConfig<Output>;
  threshold: ThresholdScaleConfig<ThresholdInput, Output>;
  // 'bin-ordinal': BinOrdinalScaleConfig<DiscreteInput, Output>;
  ordinal: OrdinalScaleConfig<DiscreteInput, Output>;
  point: PointScaleConfig<DiscreteInput>;
  band: BandScaleConfig<DiscreteInput>;
}

export type ScaleConfig<
  Output extends Value = Value,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput
> = ValueOf<ScaleTypeToScaleConfig<Output, DiscreteInput, ThresholdInput>>;

export type PickScaleConfig<
  T extends keyof ScaleTypeToScaleConfig<Output>,
  Output extends Value = Value,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput
> = ValueOf<Pick<ScaleTypeToScaleConfig<Output, DiscreteInput, ThresholdInput>, T>>;

export type ContinuousScaleConfig<
  Output extends Value = Value,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput
> = PickScaleConfig<
  'linear' | 'log' | 'pow' | 'sqrt' | 'symlog' | 'time' | 'utc',
  Output,
  DiscreteInput,
  ThresholdInput
>;

export type DiscretizingScaleConfig<
  Output extends Value = Value,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput
> = PickScaleConfig<
  'quantile' | 'quantize' | 'threshold', // | 'bin-ordinal',
  Output,
  DiscreteInput,
  ThresholdInput
>;

export type DiscreteScaleConfig<
  Output extends Value = Value,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput
> = PickScaleConfig<'ordinal' | 'point' | 'band', Output, DiscreteInput, ThresholdInput>;

export interface WithScale<
  Output extends Value = Value,
  DiscreteInput extends StringLike = StringLike,
  ThresholdInput extends DefaultThresholdInput = DefaultThresholdInput
> {
  scale?: Partial<ScaleConfig<Output, DiscreteInput, ThresholdInput>>;
}
