import { scaleOrdinal } from 'd3-scale';
import { OptionsManager, CategoricalScaleInput } from '../../src';

const dummyFormatter = () => 'haha';
const dummyScaleResolver = () => scaleOrdinal<CategoricalScaleInput, string>(['haha']);

describe('OptionsManager', () => {
  afterEach(() => {
    // reset all resolvers
    OptionsManager.setNumberFormatResolver(undefined)
      .setTimeFormatResolver(undefined)
      .setCategoricalColorScaleResolver(undefined)
      .setColorSchemeResolver(undefined);
  });

  describe('.getNumberFormatResolver(resolver)', () => {
    it('returns a resolver', () => {
      const resolver = OptionsManager.getNumberFormatResolver();
      expect(resolver).toBeDefined();
      expect(typeof resolver('.2f')(200)).toBe('string');
    });
  });
  describe('.setNumberFormatResolver(resolver)', () => {
    it('sets a resolver', () => {
      OptionsManager.setNumberFormatResolver(() => dummyFormatter);
      const resolver = OptionsManager.getNumberFormatResolver();
      expect(resolver).toBeDefined();
      expect(resolver('.2f')(200)).toEqual('haha');
    });
    it('returns OptionsManager', () => {
      expect(OptionsManager.setNumberFormatResolver(() => dummyFormatter)).toBe(OptionsManager);
    });
  });
  describe('.getTimeFormatResolver(resolver)', () => {
    it('returns a resolver', () => {
      const resolver = OptionsManager.getTimeFormatResolver();
      expect(resolver).toBeDefined();
      expect(typeof resolver('%Y-%m')(new Date())).toBe('string');
    });
  });
  describe('.setTimeFormatResolver(resolver)', () => {
    it('sets a resolver', () => {
      OptionsManager.setTimeFormatResolver(() => dummyFormatter);
      const resolver = OptionsManager.getTimeFormatResolver();
      expect(resolver).toBeDefined();
      expect(resolver('%Y-%m')(new Date())).toEqual('haha');
    });
    it('returns OptionsManager', () => {
      expect(OptionsManager.setTimeFormatResolver(() => dummyFormatter)).toBe(OptionsManager);
    });
  });
  describe('.getColorScaleResolver()', () => {
    it('returns a resolver', () => {
      const resolver = OptionsManager.getColorSchemeResolver();
      expect(resolver).toBeDefined();
      expect(resolver({ name: '', type: 'sequential' })).toBeUndefined();
    });
  });
  describe('.setColorScaleResolver(resolver)', () => {
    it('sets a resolver', () => {
      OptionsManager.setColorSchemeResolver(() => ['#222', '#eee']);
      const resolver = OptionsManager.getColorSchemeResolver();
      expect(resolver).toBeDefined();
      expect(resolver({ name: '', type: 'sequential' })).toEqual(['#222', '#eee']);
    });
    it('returns OptionsManager', () => {
      expect(OptionsManager.setColorSchemeResolver(() => [])).toBe(OptionsManager);
    });
  });
  describe('.getCategoricalColorScaleResolver(resolver)', () => {
    it('returns a resolver', () => {
      const resolver = OptionsManager.getCategoricalColorScaleResolver();
      expect(resolver).toBeDefined();
      expect(typeof resolver({})('abc')).toBe('string');
    });
  });
  describe('.setCategoricalColorScaleResolver(resolver)', () => {
    it('sets a resolver', () => {
      OptionsManager.setCategoricalColorScaleResolver(dummyScaleResolver);
      const resolver = OptionsManager.getCategoricalColorScaleResolver();
      expect(resolver).toBeDefined();
      expect(resolver({})('abc')).toEqual('haha');
    });
    it('returns OptionsManager', () => {
      expect(OptionsManager.setCategoricalColorScaleResolver(dummyScaleResolver)).toBe(
        OptionsManager,
      );
    });
  });
});
