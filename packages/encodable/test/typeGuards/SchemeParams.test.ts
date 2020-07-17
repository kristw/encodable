import {
  isContinuousScaleConfig,
  isDiscretizingScaleConfig,
  isScaleConfigWithZero,
} from '../../src/typeGuards/ScaleConfig';

describe('type guards: ScaleConfig', () => {
  describe('isContinuousScaleConfig(scaleConfig)', () => {
    it('returns true if continuous', () => {
      expect(isContinuousScaleConfig({ type: 'linear' })).toBeTruthy();
    });
    it('returns false otherwise', () => {
      expect(isContinuousScaleConfig({ type: 'point' })).toBeFalsy();
    });
  });
  describe('isDiscretizingScaleConfig(scaleConfig)', () => {
    it('returns true if continuous', () => {
      expect(isDiscretizingScaleConfig({ type: 'quantile' })).toBeTruthy();
      expect(isDiscretizingScaleConfig({ type: 'quantize' })).toBeTruthy();
      expect(isDiscretizingScaleConfig({ type: 'bin-ordinal' })).toBeTruthy();
      expect(isDiscretizingScaleConfig({ type: 'threshold' })).toBeTruthy();
    });
    it('returns false otherwise', () => {
      expect(isDiscretizingScaleConfig({ type: 'point' })).toBeFalsy();
    });
  });
  describe('isScaleConfigWithZero(scaleConfig)', () => {
    it('returns true if support zero', () => {
      expect(isScaleConfigWithZero({ type: 'linear' })).toBeTruthy();
    });
    it('returns false otherwise', () => {
      expect(isScaleConfigWithZero({ type: 'log' })).toBeFalsy();
    });
  });
});
