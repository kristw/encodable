import { ScaleTime } from 'd3-scale';
import { D3Scale, ContinuousD3Scale, DiscretizingD3Scale } from '../types/Scale';
import {
  ScaleConfig,
  LinearScaleConfig,
  LogScaleConfig,
  PowScaleConfig,
  SqrtScaleConfig,
  SymlogScaleConfig,
  TimeScaleConfig,
  UtcScaleConfig,
  ThresholdScaleConfig,
  QuantileScaleConfig,
  QuantizeScaleConfig,
  BinOrdinalScaleConfig,
} from '../types/ScaleConfig';
import { Value, ScaleType, SchemeParams } from '../types/VegaLite';
import {
  timeScaleTypesSet,
  continuousScaleTypesSet,
  discretizingScaleTypesSet,
} from '../parsers/scale/scaleCategories';
import isPropertySupportedByScaleType from '../parsers/scale/isPropertySupportedByScaleType';

export function isContinuousScaleConfig<Output extends Value = Value>(
  config: ScaleConfig,
): config is
  | LinearScaleConfig<Output>
  | LogScaleConfig<Output>
  | PowScaleConfig<Output>
  | SqrtScaleConfig<Output>
  | SymlogScaleConfig<Output>
  | TimeScaleConfig<Output>
  | UtcScaleConfig<Output> {
  return continuousScaleTypesSet.has(config.type);
}

export function isDiscretizingScaleConfig<Output extends Value = Value>(
  config: ScaleConfig,
): config is
  | ThresholdScaleConfig<Output>
  | QuantileScaleConfig<Output>
  | QuantizeScaleConfig<Output>
  | BinOrdinalScaleConfig<Output> {
  return discretizingScaleTypesSet.has(config.type);
}

export function isScaleConfigWithZero<Output extends Value = Value>(
  config: ScaleConfig,
): config is
  | LinearScaleConfig<Output>
  | PowScaleConfig<Output>
  | SqrtScaleConfig<Output>
  | SymlogScaleConfig<Output> {
  return isPropertySupportedByScaleType('zero', config.type);
}

export function isContinuousScale<Output extends Value = Value>(
  scale: D3Scale<Output>,
  scaleType: ScaleType,
): scale is ContinuousD3Scale<Output> {
  return scale && continuousScaleTypesSet.has(scaleType);
}

export function isDiscretizingScale<Output extends Value = Value>(
  scale: D3Scale<Output>,
  scaleType: ScaleType,
): scale is DiscretizingD3Scale<Output> {
  return scale && discretizingScaleTypesSet.has(scaleType);
}

export function isTimeScale<Output extends Value = Value>(
  scale: D3Scale<Output>,
  scaleType: ScaleType,
): scale is ScaleTime<Output, Output> {
  return scale && timeScaleTypesSet.has(scaleType);
}

export function isSchemeParams(scheme: string | SchemeParams): scheme is SchemeParams {
  return Object.prototype.toString.call(scheme) !== '[object String]';
}
