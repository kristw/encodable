import { defaultTimeFormatResolver, defaultNumberFormatResolver } from '../../../src';

describe('defaultFormatResolver', () => {
  describe('timeFormat', () => {
    it('return a formatter', () => {
      expect(defaultTimeFormatResolver({ format: '%Y-%m-%d' })).toBeDefined();
    });
    it('handles local time', () => {
      expect(
        defaultTimeFormatResolver({ format: '%Y-%m-%d', formatInLocalTime: true }),
      ).toBeDefined();
      expect(defaultTimeFormatResolver({ formatInLocalTime: true })).toBeDefined();
    });
    it('handles default case', () => {
      expect(defaultTimeFormatResolver()).toBeDefined();
      expect(defaultTimeFormatResolver({})).toBeDefined();
    });
  });
  describe('numberFormat', () => {
    it('handles default case', () => {
      expect(defaultNumberFormatResolver()).toBeDefined();
    });
  });
});
