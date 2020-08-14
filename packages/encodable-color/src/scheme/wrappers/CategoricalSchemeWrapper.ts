import { scaleOrdinal } from 'd3-scale';
import { CategoricalScheme } from '../../types';
import SchemeWrapper from './SchemeWrapper';

export default class CategoricalSchemeWrapper extends SchemeWrapper<CategoricalScheme> {
  get colors() {
    return this.scheme.colors;
  }

  getColors(numColors?: number) {
    const { length } = this.scheme.colors;
    if (typeof numColors === 'undefined' || numColors === length) {
      return this.scheme.colors;
    }
    if (numColors < length) {
      return this.scheme.colors.slice(0, numColors);
    }

    const times = Math.ceil(numColors / length);
    let output = this.scheme.colors.slice();
    for (let i = 0; i < times; i += 1) {
      output = output.concat(this.scheme.colors);
    }
    return output.slice(0, numColors);
  }

  createScaleOrdinal() {
    return scaleOrdinal(this.scheme.colors);
  }
}
