import {
  scaleLinear,
  scaleOrdinal,
  scaleTime,
  scaleLog,
  scaleThreshold,
  scaleQuantize,
  scaleQuantile,
} from 'd3-scale';
import { isTimeScale, isContinuousScale, isDiscretizingScale } from '../../src/typeGuards/Scale';
import { StringLike } from '../../src/types';

describe('type guards', () => {
  describe('isContinuousScale(scale, type)', () => {
    it('returns true if type is one of the continuous scale types', () => {
      expect(isContinuousScale(scaleLinear<number>(), 'linear')).toBeTruthy();
    });
    it('returns false otherwise', () => {
      expect(isContinuousScale(scaleOrdinal<StringLike, string>(), 'ordinal')).toBeFalsy();
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
      expect(isDiscretizingScale(scaleLinear<number>(), 'linear')).toBeFalsy();
    });
  });
  describe('isTimeScale(scale, type)', () => {
    it('returns true if type is one of the time scale types', () => {
      expect(isTimeScale(scaleTime<number>(), 'time')).toBeTruthy();
      expect(isTimeScale(scaleTime<number>(), 'utc')).toBeTruthy();
    });
    it('returns false otherwise', () => {
      expect(isTimeScale(scaleLinear<number>(), 'linear')).toBeFalsy();
      expect(isTimeScale(scaleLog<number>(), 'log')).toBeFalsy();
    });
  });
});
