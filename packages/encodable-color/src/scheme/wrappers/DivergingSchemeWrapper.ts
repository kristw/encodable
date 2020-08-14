import { scaleDiverging, ScaleLinear } from 'd3-scale';
import ContinuousSchemeWrapper from './ContinuousSchemeWrapper';
import { DivergingScheme } from '../../types';

export default class DivergingSchemeWrapper extends ContinuousSchemeWrapper<DivergingScheme> {
  getColors(numColors: number = 3, extent: number[] = [0, 1]): string[] {
    return super.getColors(numColors, extent);
  }

  createScaleLinear() {
    return (scaleDiverging(this.interpolator) as unknown) as ScaleLinear<string, string>;
  }
}
