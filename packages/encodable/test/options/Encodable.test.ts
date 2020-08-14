import { scaleOrdinal } from 'd3-scale';
import { ColorScheme } from '@encodable/color';
import { Encodable, StringLike } from '../../src';

const dummyFormatter = () => 'haha';
const dummyScaleResolver = () => scaleOrdinal<StringLike, string>(['haha']);

describe('Encodable', () => {
  afterEach(() => {
    // reset all resolvers
    Encodable.resetNumberFormatResolver()
      .resetTimeFormatResolver()
      .resetCategoricalColorScaleResolver()
      .resetColorSchemeResolver();
  });

  describe('.getNumberFormatResolver(resolver)', () => {
    it('returns a resolver', () => {
      const resolver = Encodable.getNumberFormatResolver();
      expect(resolver).toBeDefined();
      expect(typeof resolver('.2f')(200)).toBe('string');
    });
  });
  describe('.setNumberFormatResolver(resolver)', () => {
    it('sets a resolver', () => {
      Encodable.setNumberFormatResolver(() => dummyFormatter);
      const resolver = Encodable.getNumberFormatResolver();
      expect(resolver).toBeDefined();
      expect(resolver('.2f')(200)).toEqual('haha');
    });
    it('returns Encodable', () => {
      expect(Encodable.setNumberFormatResolver(() => dummyFormatter)).toBe(Encodable);
    });
  });
  describe('.resolveNumberFormat()', () => {
    it('returns a number formatter', () => {
      Encodable.setNumberFormatResolver(() => dummyFormatter);
      expect(Encodable.resolveNumberFormat('.2f')(200)).toEqual('haha');
    });
  });
  describe('.getTimeFormatResolver(resolver)', () => {
    it('returns a resolver', () => {
      const resolver = Encodable.getTimeFormatResolver();
      expect(resolver).toBeDefined();
      expect(typeof resolver({ format: '%Y-%m' })(new Date())).toBe('string');
    });
  });
  describe('.setTimeFormatResolver(resolver)', () => {
    it('sets a resolver', () => {
      Encodable.setTimeFormatResolver(() => dummyFormatter);
      const resolver = Encodable.getTimeFormatResolver();
      expect(resolver).toBeDefined();
      expect(resolver({ format: '%Y-%m' })(new Date())).toEqual('haha');
    });
    it('returns Encodable', () => {
      expect(Encodable.setTimeFormatResolver(() => dummyFormatter)).toBe(Encodable);
    });
  });
  describe('.resolveTimeFormat()', () => {
    it('returns a Time formatter', () => {
      Encodable.setTimeFormatResolver(() => dummyFormatter);
      expect(Encodable.resolveTimeFormat({ format: '%Y-%m' })(new Date())).toEqual('haha');
    });
  });
  describe('.getColorSchemeResolver()', () => {
    it('returns a resolver', () => {
      const resolver = Encodable.getColorSchemeResolver();
      expect(resolver).toBeDefined();
      expect(resolver({ name: '', type: 'sequential' })).toBeUndefined();
    });
  });
  describe('.setColorSchemeResolver(resolver)', () => {
    it('sets a resolver', () => {
      const output: ColorScheme = { type: 'categorical', id: 'dummy', colors: ['#222', '#eee'] };
      Encodable.setColorSchemeResolver(() => output);
      const resolver = Encodable.getColorSchemeResolver();
      expect(resolver).toBeDefined();
      expect(resolver({ name: '', type: 'sequential' })).toEqual(output);
    });
    it('returns Encodable', () => {
      const output: ColorScheme = { type: 'categorical', id: 'dummy', colors: ['#222', '#eee'] };
      expect(Encodable.setColorSchemeResolver(() => output)).toBe(Encodable);
    });
  });
  describe('.resolveColorScheme()', () => {
    it('returns a color scheme', () => {
      const output: ColorScheme = { type: 'categorical', id: 'dummy', colors: ['#222', '#eee'] };
      Encodable.setColorSchemeResolver(() => output);
      expect(Encodable.resolveColorScheme({ name: '', type: 'sequential' })).toEqual(output);
      Encodable.setColorSchemeResolver(undefined);
    });
  });
  describe('.getCategoricalColorScaleResolver(resolver)', () => {
    it('returns a resolver', () => {
      const resolver = Encodable.getCategoricalColorScaleResolver();
      expect(resolver).toBeDefined();
      expect(typeof resolver()('abc')).toBe('string');
    });
  });
  describe('.setCategoricalColorScaleResolver(resolver)', () => {
    it('sets a resolver', () => {
      Encodable.setCategoricalColorScaleResolver(dummyScaleResolver);
      const resolver = Encodable.getCategoricalColorScaleResolver();
      expect(resolver).toBeDefined();
      expect(resolver({})('abc')).toEqual('haha');
    });
    it('returns Encodable', () => {
      expect(Encodable.setCategoricalColorScaleResolver(dummyScaleResolver)).toBe(Encodable);
    });
  });
  describe('.resolveCategoricalColorScale()', () => {
    it('returns a scale', () => {
      expect(typeof Encodable.resolveCategoricalColorScale()('abc')).toBe('string');
    });
  });
});
