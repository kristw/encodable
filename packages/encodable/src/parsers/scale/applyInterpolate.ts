import {
  interpolateRgb,
  interpolateLab,
  interpolateHcl,
  interpolateHclLong,
  interpolateHsl,
  interpolateHslLong,
  interpolateCubehelix,
  interpolateCubehelixLong,
} from 'd3-interpolate';
import { InterpolatorFactory } from 'd3-scale';
import { Value, ScaleInterpolate, ScaleInterpolateParams } from '../../types/VegaLite';
import { ScaleConfig, D3Scale } from '../../types/Scale';

const interpolatorMap = {
  lab: interpolateLab,
  hcl: interpolateHcl,
  'hcl-long': interpolateHclLong,
  hsl: interpolateHsl,
  'hsl-long': interpolateHslLong,
  cubehelix: interpolateCubehelix,
  'cubehelix-long': interpolateCubehelixLong,
  rgb: interpolateRgb,
} as const;

function getInterpolator(interpolate: ScaleInterpolate | ScaleInterpolateParams) {
  switch (interpolate) {
    case 'lab':
    case 'hcl':
    case 'hcl-long':
    case 'hsl':
    case 'hsl-long':
    case 'cubehelix':
    case 'cubehelix-long':
    case 'rgb':
      return interpolatorMap[interpolate];
    default:
  }

  const { type, gamma } = interpolate;
  const interpolator = interpolatorMap[type];
  return typeof gamma === 'undefined' ? interpolator : interpolator.gamma(gamma);
}

export default function applyInterpolate<Output extends Value>(
  config: ScaleConfig<Output>,
  scale: D3Scale<Output>,
) {
  if (
    'interpolate' in config &&
    typeof config.interpolate !== 'undefined' &&
    'interpolate' in scale
  ) {
    scale.interpolate(
      (getInterpolator(config.interpolate) as unknown) as InterpolatorFactory<Output, Output>,
    );
  }
}
