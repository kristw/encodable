import { ScaleTime } from 'd3-scale';
import { D3Scale, ContinuousD3Scale, DiscretizingD3Scale } from '../types/Scale';
import { Value, ScaleType } from '../types/VegaLite';
import {
  timeScaleTypesSet,
  continuousScaleTypesSet,
  discretizingScaleTypesSet,
} from '../parsers/scale/scaleCategories';

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
