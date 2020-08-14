import { scaleOrdinal } from 'd3-scale';
import { ColorScheme } from '@encodable/color';
import { EncodableOptions, StringLike } from '../../src';

const dummyFormatter = () => 'haha';
const dummyScaleResolver = () => scaleOrdinal<StringLike, string>(['haha']);

describe('EncodableOptions', () => {
  afterEach(() => {
    // reset all resolvers
    EncodableOptions.setNumberFormatResolver(undefined)
      .setTimeFormatResolver(undefined)
      .setCategoricalColorScaleResolver(undefined)
      .setColorSchemeResolver(undefined);
  });

  describe('.getNumberFormatResolver(resolver)', () => {
    it('returns a resolver', () => {
      const resolver = EncodableOptions.getNumberFormatResolver();
      expect(resolver).toBeDefined();
      expect(typeof resolver('.2f')(200)).toBe('string');
    });
  });
  describe('.setNumberFormatResolver(resolver)', () => {
    it('sets a resolver', () => {
      EncodableOptions.setNumberFormatResolver(() => dummyFormatter);
      const resolver = EncodableOptions.getNumberFormatResolver();
      expect(resolver).toBeDefined();
      expect(resolver('.2f')(200)).toEqual('haha');
    });
    it('returns EncodableOptions', () => {
      expect(EncodableOptions.setNumberFormatResolver(() => dummyFormatter)).toBe(EncodableOptions);
    });
  });
  describe('.getTimeFormatResolver(resolver)', () => {
    it('returns a resolver', () => {
      const resolver = EncodableOptions.getTimeFormatResolver();
      expect(resolver).toBeDefined();
      expect(typeof resolver({ format: '%Y-%m' })(new Date())).toBe('string');
    });
  });
  describe('.setTimeFormatResolver(resolver)', () => {
    it('sets a resolver', () => {
      EncodableOptions.setTimeFormatResolver(() => dummyFormatter);
      const resolver = EncodableOptions.getTimeFormatResolver();
      expect(resolver).toBeDefined();
      expect(resolver({ format: '%Y-%m' })(new Date())).toEqual('haha');
    });
    it('returns EncodableOptions', () => {
      expect(EncodableOptions.setTimeFormatResolver(() => dummyFormatter)).toBe(EncodableOptions);
    });
  });
  describe('.getColorScaleResolver()', () => {
    it('returns a resolver', () => {
      const resolver = EncodableOptions.getColorSchemeResolver();
      expect(resolver).toBeDefined();
      expect(resolver({ name: '', type: 'sequential' })).toBeUndefined();
    });
  });
  describe('.setColorScaleResolver(resolver)', () => {
    it('sets a resolver', () => {
      const output: ColorScheme = { type: 'categorical', id: 'dummy', colors: ['#222', '#eee'] };
      EncodableOptions.setColorSchemeResolver(() => output);
      const resolver = EncodableOptions.getColorSchemeResolver();
      expect(resolver).toBeDefined();
      expect(resolver({ name: '', type: 'sequential' })).toEqual(output);
    });
    it('returns EncodableOptions', () => {
      const output: ColorScheme = { type: 'categorical', id: 'dummy', colors: ['#222', '#eee'] };
      expect(EncodableOptions.setColorSchemeResolver(() => output)).toBe(EncodableOptions);
    });
  });
  describe('.getCategoricalColorScaleResolver(resolver)', () => {
    it('returns a resolver', () => {
      const resolver = EncodableOptions.getCategoricalColorScaleResolver();
      expect(resolver).toBeDefined();
      expect(typeof resolver()('abc')).toBe('string');
    });
  });
  describe('.setCategoricalColorScaleResolver(resolver)', () => {
    it('sets a resolver', () => {
      EncodableOptions.setCategoricalColorScaleResolver(dummyScaleResolver);
      const resolver = EncodableOptions.getCategoricalColorScaleResolver();
      expect(resolver).toBeDefined();
      expect(resolver({})('abc')).toEqual('haha');
    });
    it('returns EncodableOptions', () => {
      expect(EncodableOptions.setCategoricalColorScaleResolver(dummyScaleResolver)).toBe(
        EncodableOptions,
      );
    });
  });
});
