import { interpolateRgb, piecewise, quantize } from 'd3-interpolate';
import { scaleSequential, scaleLinear, ScaleLinear } from 'd3-scale';
import { ColorInterpolator, SequentialScheme, DivergingScheme } from '../../types';
import SchemeWrapper from './SchemeWrapper';

export default class ContinuousSchemeWrapper<
  T extends SequentialScheme | DivergingScheme
> extends SchemeWrapper<T> {
  get colors() {
    if ('colors' in this.scheme) {
      return this.scheme.colors;
    }
    return this.getColors();
  }

  get interpolator() {
    if ('interpolator' in this.scheme) {
      return this.scheme.interpolator;
    }
    return piecewise(interpolateRgb, this.scheme.colors) as ColorInterpolator;
  }

  /**
   * Get colors from this scheme
   * @param numColors number of colors to return.
   * Will interpolate the current scheme to match the number of colors requested
   * @param extent The extent of the color range to use.
   * For example [0.2, 1] will rescale the color scheme
   * such that color values in the range [0, 0.2) are excluded from the scheme.
   */
  getColors(numColors: number = 2, extent: number[] = [0, 1]): string[] {
    if (
      'colors' in this.scheme &&
      numColors === this.scheme.colors.length &&
      extent[0] === 0 &&
      extent[1] === 1
    ) {
      return this.scheme.colors;
    }

    const { interpolator } = this;
    const adjustExtent = scaleLinear().range(extent).clamp(true);
    return quantize<string>(t => interpolator(adjustExtent(t)), numColors);
  }

  createScaleLinear() {
    // The manual casting is necessary until @types/d3-scale is corrected
    // In recent version of d3-scale the output from scaleSequential is compatible with linear scale
    // (It has .range(),  ...)
    return (scaleSequential(this.interpolator) as unknown) as ScaleLinear<string, string>;
  }
}
