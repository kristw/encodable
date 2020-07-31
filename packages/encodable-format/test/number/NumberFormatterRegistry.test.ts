import NumberFormatterRegistry from '../../src/number/NumberFormatterRegistry';
import { NumberFormats } from '../../src/number';

describe('NumberFormatterRegistry', () => {
  let registry: NumberFormatterRegistry;
  beforeEach(() => {
    registry = new NumberFormatterRegistry();
  });
  it('has SMART_NUMBER as default formatter out of the box', () => {
    expect(registry.getDefaultKey()).toBe(NumberFormats.SMART_NUMBER);
  });
  describe('.get(format)', () => {
    it('creates and returns a new formatter if does not exist', () => {
      const formatter = registry.get('.2f');
      expect(formatter(100)).toEqual('100.00');
    });
    it('returns an existing formatter if already exists', () => {
      const formatter = registry.get('.2f');
      const formatter2 = registry.get('.2f');
      expect(formatter).toBe(formatter2);
    });
    it('falls back to default format if format is not specified', () => {
      registry.setDefaultKey('.1f');
      const formatter = registry.get();
      expect(formatter(100)).toEqual('100.0');
    });
    it('falls back to default format if format is null', () => {
      registry.setDefaultKey('.1f');
      // @ts-ignore
      const formatter = registry.get(null);
      expect(formatter(100)).toEqual('100.0');
    });
    it('falls back to default format if format is undefined', () => {
      registry.setDefaultKey('.1f');
      const formatter = registry.get(undefined);
      expect(formatter(100)).toEqual('100.0');
    });
    it('falls back to default format if format is empty string', () => {
      registry.setDefaultKey('.1f');
      const formatter = registry.get('');
      expect(formatter(100)).toEqual('100.0');
    });
    it('removes leading and trailing spaces from format', () => {
      const formatter = registry.get(' .2f');
      expect(formatter(100)).toEqual('100.00');
      const formatter2 = registry.get('.2f ');
      expect(formatter2(100)).toEqual('100.00');
      const formatter3 = registry.get(' .2f ');
      expect(formatter3(100)).toEqual('100.00');
    });
  });
  describe('.format(format, value)', () => {
    it('return the value with the specified format', () => {
      expect(registry.format('.2f', 100)).toEqual('100.00');
      expect(registry.format(',d', 100)).toEqual('100');
    });
    it('falls back to the default formatter if the format is undefined', () => {
      expect(registry.format(undefined, 1000)).toEqual('1k');
    });
  });
});
