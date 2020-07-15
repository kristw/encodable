import { OptionsManager } from '../../src';

const dummyFormatter = () => 'haha';

describe('OptionsManager', () => {
  afterEach(() => {
    // reset format resolvers
    OptionsManager.setNumberFormatResolver(undefined);
    OptionsManager.setTimeFormatResolver(undefined);
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
});
