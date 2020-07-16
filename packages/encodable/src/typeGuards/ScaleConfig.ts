import {
  ScaleConfig,
  LinearScaleConfig,
  PowScaleConfig,
  SqrtScaleConfig,
  SymlogScaleConfig,
  ContinuousScaleConfig,
  DiscretizingScaleConfig,
} from '../types/ScaleConfig';
import isPropertySupportedByScaleType from '../parsers/scale/isPropertySupportedByScaleType';
import {
  continuousScaleTypesSet,
  discretizingScaleTypesSet,
} from '../parsers/scale/scaleCategories';
import { Value } from '../types/VegaLite';

export function isContinuousScaleConfig<Output extends Value = Value>(
  config: ScaleConfig,
): config is ContinuousScaleConfig<Output> {
  return continuousScaleTypesSet.has(config.type);
}

export function isDiscretizingScaleConfig<Output extends Value = Value>(
  config: ScaleConfig,
): config is DiscretizingScaleConfig<Output> {
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
