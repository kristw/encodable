import { InterpolatorFactory } from 'd3-scale';
import { DefaultOutput, D3Scale, ScaleConfig } from '../../types';
import createColorInterpolator from './createColorInterpolator';

export default function applyInterpolate<Output extends DefaultOutput>(
  config: ScaleConfig<Output>,
  scale: D3Scale<Output>,
) {
  if (
    'interpolate' in config &&
    typeof config.interpolate !== 'undefined' &&
    'interpolate' in scale
  ) {
    scale.interpolate(
      (createColorInterpolator(config.interpolate) as unknown) as InterpolatorFactory<
        Output,
        Output
      >,
    );
  }
}
