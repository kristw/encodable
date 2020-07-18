import {
  ScaleOrdinal,
  ScaleLinear,
  ScaleLogarithmic,
  ScalePower,
  ScaleTime,
  ScaleQuantile,
  ScaleQuantize,
  ScaleThreshold,
  ScalePoint,
  ScaleBand,
  ScaleSymLog,
} from 'd3-scale';
import { Value, ScaleType } from './VegaLite';
import { HasToString, ValueOf } from './Base';

/** Each ScaleCategory contains one or more ScaleType */
export type ScaleCategory = 'continuous' | 'discrete' | 'discretizing';

export type CategoricalScaleInput = HasToString;

export interface ScaleTypeToD3ScaleType<Output extends Value = Value> {
  [ScaleType.LINEAR]: ScaleLinear<Output, Output>;
  [ScaleType.LOG]: ScaleLogarithmic<Output, Output>;
  [ScaleType.POW]: ScalePower<Output, Output>;
  [ScaleType.SQRT]: ScalePower<Output, Output>;
  [ScaleType.SYMLOG]: ScaleSymLog<Output, Output>;
  [ScaleType.TIME]: ScaleTime<Output, Output>;
  [ScaleType.UTC]: ScaleTime<Output, Output>;
  [ScaleType.QUANTILE]: ScaleQuantile<Output>;
  [ScaleType.QUANTIZE]: ScaleQuantize<Output>;
  [ScaleType.THRESHOLD]: ScaleThreshold<number | string | Date, Output>;
  [ScaleType.BIN_ORDINAL]: ScaleOrdinal<CategoricalScaleInput, Output>;
  [ScaleType.ORDINAL]: ScaleOrdinal<CategoricalScaleInput, Output>;
  [ScaleType.POINT]: ScalePoint<CategoricalScaleInput>;
  [ScaleType.BAND]: ScaleBand<CategoricalScaleInput>;
}

export type PickD3Scale<
  T extends keyof ScaleTypeToD3ScaleType<Output>,
  Output extends Value = Value
> = ValueOf<Pick<ScaleTypeToD3ScaleType<Output>, T>>;

export type ContinuousD3Scale<Output extends Value = Value> =
  | ScaleLinear<Output, Output>
  | ScaleLogarithmic<Output, Output>
  | ScalePower<Output, Output>
  | ScaleTime<Output, Output>
  | ScaleSymLog<Output, Output>;

export type DiscretizingD3Scale<Output extends Value = Value> =
  | ScaleQuantile<Output>
  | ScaleQuantize<Output>
  | ScaleThreshold<number | string | Date, Output>
  | ScaleOrdinal<CategoricalScaleInput, Output>;

export type DiscreteD3Scale<Output extends Value = Value> =
  | ScaleOrdinal<CategoricalScaleInput, Output>
  | ScalePoint<CategoricalScaleInput>
  | ScaleBand<CategoricalScaleInput>;

export type D3Scale<Output extends Value = Value> = ValueOf<ScaleTypeToD3ScaleType<Output>>;

export type AllScale<Output extends Value = Value> = D3Scale<Output>;
