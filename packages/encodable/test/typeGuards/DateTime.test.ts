import { isDateTime } from '../../src/typeGuards/DateTime';

describe('type guards: DateTime', () => {
  describe('isDateTime', () => {
    it('correctly classifies non-DateTime types', () => {
      expect(isDateTime(true)).toEqual(false);
      expect(isDateTime(false)).toEqual(false);
      expect(isDateTime(0)).toEqual(false);
      expect(isDateTime(1)).toEqual(false);
      expect(isDateTime('abcdef')).toEqual(false);
    });

    it('correctly classifies DateTime object', () => {
      expect(isDateTime({ year: 1986 })).toEqual(true);
      expect(isDateTime({ quarter: 2 })).toEqual(true);
      expect(isDateTime({ month: 5 })).toEqual(true);
      expect(isDateTime({ date: 15 })).toEqual(true);
      expect(isDateTime({ day: 1 })).toEqual(true);
      expect(isDateTime({ hours: 6 })).toEqual(true);
      expect(isDateTime({ minutes: 16 })).toEqual(true);
      expect(isDateTime({ seconds: 59 })).toEqual(true);
      expect(isDateTime({ milliseconds: 106 })).toEqual(true);
    });

    it('correctly classifies unit with zero', () => {
      expect(isDateTime({ hours: 0 })).toEqual(true);
    });
  });
});
