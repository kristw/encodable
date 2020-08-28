import { ScaleTime } from 'd3-scale';
import {
  D3Scale,
  ContinuousD3Scale,
  DiscretizingD3Scale,
  DiscreteD3Scale,
} from '../types/scale/Scale';
import { ScaleType } from '../types/scale/ScaleType';
import {
  timeScaleTypesSet,
  continuousScaleTypesSet,
  discretizingScaleTypesSet,
  discreteScaleTypesSet,
} from '../parsers/scale/scaleCategories';
import { DefaultOutput } from '../types/Core';

export function isContinuousScale<Output extends DefaultOutput = DefaultOutput>(
  scale: D3Scale<Output>,
  scaleType: ScaleType,
): scale is ContinuousD3Scale<Output> {
  return scale && continuousScaleTypesSet.has(scaleType);
}

export function isDiscretizingScale<Output extends DefaultOutput = DefaultOutput>(
  scale: D3Scale<Output>,
  scaleType: ScaleType,
): scale is DiscretizingD3Scale<Output> {
  return scale && discretizingScaleTypesSet.has(scaleType);
}

export function isDiscreteScale<Output extends DefaultOutput = DefaultOutput>(
  scale: D3Scale<Output>,
  scaleType: ScaleType,
): scale is DiscreteD3Scale<Output> {
  return scale && discreteScaleTypesSet.has(scaleType);
}

export function isTimeScale<Output extends DefaultOutput = DefaultOutput>(
  scale: D3Scale<Output>,
  scaleType: ScaleType,
): scale is ScaleTime<Output, Output> {
  return scale && timeScaleTypesSet.has(scaleType);
}
