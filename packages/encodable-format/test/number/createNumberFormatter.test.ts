import createNumberFormatter from '../../src/number/createNumberFormatter';

describe('createNumberFormatter(config)', () => {
  describe('formatter is also a format function itself', () => {
    const formatter = createNumberFormatter(value => value.toFixed(3), {
      id: 'fixed_3',
    });
    it('returns formatted value', () => {
      expect(formatter(12345.67)).toEqual('12345.670');
    });
    it('formatter(value) is the same with formatter(value)', () => {
      const value = 12345.67;
      expect(formatter(value)).toEqual(formatter(value));
    });
  });
  describe('.format(value)', () => {
    const formatter = createNumberFormatter(value => value.toFixed(3));
    it('handles null', () => {
      expect(formatter(null)).toEqual('null');
    });
    it('handles undefined', () => {
      expect(formatter(undefined)).toEqual('undefined');
    });
    it('handles NaN', () => {
      expect(formatter(NaN)).toEqual('NaN');
    });
    it('handles positive and negative infinity', () => {
      expect(formatter(Number.POSITIVE_INFINITY)).toEqual('∞');
      expect(formatter(Number.NEGATIVE_INFINITY)).toEqual('-∞');
    });
    it('otherwise returns formatted value', () => {
      expect(formatter(12345.67)).toEqual('12345.670');
    });
  });
});
