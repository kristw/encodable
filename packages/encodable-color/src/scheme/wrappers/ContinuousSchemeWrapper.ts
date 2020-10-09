import { interpolateRgb, piecewise, quantize } from 'd3-interpolate';
import { scaleSequential, scaleLinear, ScaleLinear } from 'd3-scale';
import { ColorInterpolator, SequentialScheme, DivergingScheme } from '../../types';
import SchemeWrapper from './SchemeWrapper';

function isArrayOfArray(
  x: readonly string[] | readonly (readonly string[])[],
): x is readonly (readonly string[])[] {
  return Array.isArray(x[x.length - 1]);
}

export default class ContinuousSchemeWrapper<
  T extends SequentialScheme | DivergingScheme
> extends SchemeWrapper<T> {
  get colors() {
    if ('colors' in this.scheme && typeof this.scheme.colors !== 'undefined') {
      return this.scheme.colors;
    }
    return this.getColors();
  }

  get interpolator() {
    if ('interpolator' in this.scheme && typeof this.scheme.interpolator !== 'undefined') {
      return this.scheme.interpolator;
    }
    const colors = this.scheme.colors!;
    return piecewise(
      interpolateRgb,
      (isArrayOfArray(colors) ? colors[colors.length - 1] : colors).slice(),
    ) as ColorInterpolator;
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
      typeof this.scheme.colors !== 'undefined' &&
      extent[0] === 0 &&
      extent[1] === 1
    ) {
      const { colors } = this.scheme;
      if (isArrayOfArray(colors)) {
        if (typeof colors[numColors] !== 'undefined') {
          return colors[numColors].slice();
        }
      } else if (numColors === colors.length) {
        return colors.slice();
      }
    }

    const { interpolator } = this;
    const adjustExtent = scaleLinear().range(extent).clamp(true);
    return quantize<string>(t => interpolator(adjustExtent(t)!), numColors);
  }

  createScaleLinear() {
    // The manual casting is necessary until @types/d3-scale is corrected
    // In recent version of d3-scale the output from scaleSequential is compatible with linear scale
    // (It has .range(),  ...)
    return (scaleSequential(this.interpolator) as unknown) as ScaleLinear<string, string>;
  }
}
