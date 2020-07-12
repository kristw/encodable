import { scaleLinear, ScaleLinear } from 'd3-scale';
import applyInterpolate from '../../../src/parsers/scale/applyInterpolate';

describe('applyInterpolate()', () => {
  let scale: ScaleLinear<string, string>;

  beforeEach(() => {
    scale = scaleLinear<string>().domain([0, 10]).range(['#ff0000', '#000000']);
  });

  describe('with interpolate string', () => {
    it('rgb', () => {
      applyInterpolate(
        {
          type: 'linear',
          interpolate: 'rgb',
        },
        scale,
      );
      expect(scale(5)).toEqual('rgb(128, 0, 0)');
    });
    it('lab', () => {
      applyInterpolate(
        {
          type: 'linear',
          interpolate: 'lab',
        },
        scale,
      );
      expect(scale(5)).toEqual('rgb(122, 27, 11)');
    });
    it('hsl', () => {
      applyInterpolate(
        {
          type: 'linear',
          interpolate: 'hsl',
        },
        scale,
      );
      expect(scale(5)).toEqual('rgb(128, 0, 0)');
    });
  });
  describe('with interpolate config', () => {
    it('sets the correct interpolator', () => {
      applyInterpolate(
        {
          type: 'linear',
          interpolate: {
            type: 'rgb',
          },
        },
        scale,
      );
      expect(scale(5)).toEqual('rgb(128, 0, 0)');
    });
    it('applies gamma', () => {
      applyInterpolate(
        {
          type: 'linear',
          interpolate: {
            type: 'rgb',
            gamma: 0.9,
          },
        },
        scale,
      );
      expect(scale(5)).toEqual('rgb(118, 0, 0)');
    });
  });
});
