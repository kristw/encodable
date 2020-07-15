import {
  scaleLinear,
  scaleOrdinal,
  scaleTime,
  scaleLog,
  scaleThreshold,
  scaleQuantize,
  scaleQuantile,
} from 'd3-scale';
import {
  isTimeScale,
  isContinuousScaleConfig,
  isDiscretizingScaleConfig,
  isScaleConfigWithZero,
  isContinuousScale,
  isSchemeParams,
  isDiscretizingScale,
} from '../../src/typeGuards/Scale';
import { HasToString } from '../../src/types/Base';

describe('type guards', () => {
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
  describe('isContinuousScale(scale, type)', () => {
    it('returns true if type is one of the continuous scale types', () => {
      expect(isContinuousScale(scaleLinear(), 'linear')).toBeTruthy();
    });
    it('returns false otherwise', () => {
      expect(isContinuousScale(scaleOrdinal<HasToString, string>(), 'ordinal')).toBeFalsy();
    });
  });
  describe('isDiscretizingScale(scale, type)', () => {
    it('returns true if type is one of the discretizing scale types', () => {
      expect(
        isDiscretizingScale<number>(scaleThreshold<string | number | Date, number>(), 'threshold'),
      ).toBeTruthy();
      expect(isDiscretizingScale<number>(scaleQuantize<number>(), 'quantize')).toBeTruthy();
      expect(isDiscretizingScale<number>(scaleQuantile<number>(), 'quantile')).toBeTruthy();
    });
    it('returns false otherwise', () => {
      expect(isDiscretizingScale(scaleLinear(), 'linear')).toBeFalsy();
    });
  });
  describe('isTimeScale(scale, type)', () => {
    it('returns true if type is one of the time scale types', () => {
      expect(isTimeScale(scaleTime(), 'time')).toBeTruthy();
      expect(isTimeScale(scaleTime(), 'utc')).toBeTruthy();
    });
    it('returns false otherwise', () => {
      expect(isTimeScale(scaleLinear(), 'linear')).toBeFalsy();
      expect(isTimeScale(scaleLog(), 'log')).toBeFalsy();
    });
  });
  describe('isSchemeParams(scheme)', () => {
    it('returns true if it is a SchemeParams object', () => {
      expect(isSchemeParams({ name: 'my-palette ' })).toBeTruthy();
    });
    it('returns false for string', () => {
      expect(isSchemeParams('my-palette')).toBeFalsy();
    });
  });
});
