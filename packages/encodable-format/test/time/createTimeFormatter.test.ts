import createTimeFormatter from '../../src/time/createTimeFormatter';
import { PREVIEW_TIME } from '../../src/time/previewTime';

describe('createTimeFormatter(config)', () => {
  describe('formatter is a format function itself', () => {
    const formatter = createTimeFormatter((value: Date) => `${value.getFullYear()}`, {
      id: 'year_only',
    });
    it('returns formatted value', () => {
      expect(formatter(PREVIEW_TIME)).toEqual('2017');
    });
    it('formatter(value) is the same with formatter(value)', () => {
      const value = PREVIEW_TIME;
      expect(formatter(value)).toEqual(formatter(value));
    });
    it('handles null', () => {
      expect(formatter(null)).toEqual('null');
    });
    it('handles undefined', () => {
      expect(formatter(undefined)).toEqual('undefined');
    });
    it('handles number, treating it as a timestamp', () => {
      expect(formatter(PREVIEW_TIME.getTime())).toEqual('2017');
    });
    it('otherwise returns formatted value', () => {
      expect(formatter(PREVIEW_TIME)).toEqual('2017');
    });
  });
});
