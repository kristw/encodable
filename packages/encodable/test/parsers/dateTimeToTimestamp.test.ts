import mockConsole, { RestoreConsole } from 'jest-mock-console';
import dateTimeToTimestamp, {
  normalizeQuarter,
  normalizeDay,
  normalizeMonth,
  dateTimeParts,
} from '../../src/parsers/dateTimeToTimestamp';
import { DateTime } from '../../src/types/VegaLite';

describe('dateTimeToTimestamp()', () => {
  let restoreConsole: RestoreConsole;

  beforeEach(() => {
    restoreConsole = mockConsole();
  });

  afterEach(() => {
    restoreConsole();
  });

  describe('normalizeQuarter(q)', () => {
    it('returns normalized quarter (0-based)', () => {
      expect(normalizeQuarter(3)).toEqual(2);
      expect(normalizeQuarter('4')).toEqual(3);
    });
    it('warns if quarter is more than 4', () => {
      normalizeQuarter('5');
      // eslint-disable-next-line no-console
      expect(console.warn).toHaveBeenCalled();
    });
    it('throws invalid quarter', () => {
      expect(() => normalizeQuarter('haha')).toThrow('Invalid quarter: haha');
    });
  });

  describe('normalizeMonth(m)', () => {
    it('returns normalized month (0-based)', () => {
      expect(normalizeMonth(3)).toEqual(2);
      expect(normalizeMonth('4')).toEqual(3);
    });
    it('returns normalized month from string', () => {
      expect(normalizeMonth('march')).toEqual(2);
      expect(normalizeMonth('mar')).toEqual(2);
    });
    it('throws invalid quarter', () => {
      expect(() => normalizeMonth('haha')).toThrow('Invalid month: haha');
    });
  });

  describe('normalizeDay(m)', () => {
    it('returns normalized day of week', () => {
      expect(normalizeDay(3)).toEqual(3);
      expect(normalizeDay('4')).toEqual(4);
      expect(normalizeDay(14)).toEqual(0);
    });
    it('returns normalized day from string', () => {
      expect(normalizeDay('sunday')).toEqual(0);
      expect(normalizeDay('sun')).toEqual(0);
      expect(normalizeDay('tuesday')).toEqual(2);
      expect(normalizeDay('tue')).toEqual(2);
    });
    it('throws invalid quarter', () => {
      expect(() => normalizeDay('haha')).toThrow('Invalid day: haha');
    });
  });

  describe('dateTimeParts(d, normalize)', () => {
    describe('normalize=true', () => {
      it('ignores day if other fields are present', () => {
        expect(
          dateTimeParts(
            {
              year: 1970,
              month: 1, // January
              date: 1,
              day: 3,
            },
            true,
          ),
        ).toEqual([1970, 0, 1, 0, 0, 0, 0]);
      });

      it('sets year to 0 by default', () => {
        expect(
          dateTimeParts(
            {
              month: 1, // January
              date: 1,
            },
            true,
          ),
        ).toEqual([0, 0, 1, 0, 0, 0, 0]);
      });

      it('sets year to 2006 if only day is specified', () => {
        expect(
          dateTimeParts(
            {
              day: 3,
            },
            true,
          ),
        ).toEqual([2006, 0, 4, 0, 0, 0, 0]);
      });

      it('converts quarter to month', () => {
        expect(
          dateTimeParts(
            {
              year: 2001,
              quarter: 3,
            },
            true,
          ),
        ).toEqual([2001, 6, 1, 0, 0, 0, 0]);
      });

      it('passes hours, minutes, seconds, and milliseconds', () => {
        expect(
          dateTimeParts(
            {
              year: 2001,
              month: 3,
              date: 1,
              hours: 2,
              minutes: 3,
              seconds: 4,
              milliseconds: 5,
            },
            true,
          ),
        ).toEqual([2001, 2, 1, 2, 3, 4, 5]);
      });
    });
    describe('normalize=false', () => {
      it('does not normalize month', () => {
        expect(
          dateTimeParts(
            {
              year: 2000,
              month: 3,
            },
            false,
          ),
        ).toEqual([2000, 3, 1, 0, 0, 0, 0]);
      });
      it('does not normalize quarter', () => {
        expect(
          dateTimeParts(
            {
              year: 2000,
              quarter: 4,
            },
            false,
          ),
        ).toEqual([2000, 12, 1, 0, 0, 0, 0]);
      });
      it('does not normalize day', () => {
        expect(
          dateTimeParts(
            {
              day: 5,
            },
            false,
          ),
        ).toEqual([2006, 0, 6, 0, 0, 0, 0]);
      });
      it('does not change quarter string to number', () => {
        expect(
          dateTimeParts(
            {
              year: '2001',
              quarter: '3',
            },
            false,
          ),
        ).toEqual(['2001', '3*3', 1, 0, 0, 0, 0]);
      });
      it('does not change day string to number', () => {
        expect(
          dateTimeParts(
            {
              day: '5',
            },
            false,
          ),
        ).toEqual([2006, 0, '5+1', 0, 0, 0, 0]);
      });
    });
  });

  it('should return date as timestamp if specified with month number', () => {
    const d: DateTime = {
      year: 1970,
      month: 1, // January
      date: 1,
    };
    const expr = dateTimeToTimestamp(d);
    expect(expr).toBe(Number(new Date(1970, 0, 1, 0, 0, 0, 0)));
  });

  it('should return date as timestamp if specified with month name', () => {
    const d: DateTime = {
      year: 1970,
      month: 'January',
      date: 1,
    };
    const expr = dateTimeToTimestamp(d);
    expect(expr).toBe(Number(new Date(1970, 0, 1, 0, 0, 0, 0)));
  });

  it('should use UTC if specified', () => {
    const d: DateTime = {
      year: 2007,
      date: 1,
      utc: true,
    };
    const exprJSON = dateTimeToTimestamp(d);
    expect(exprJSON).toBe(Number(new Date(Date.UTC(2007, 0, 1, 0, 0, 0, 0))));
  });

  it('should support accidental use of strings', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const d: any = {
      year: '2007',
      month: '1',
      date: '1',
    };
    const exprJSON = dateTimeToTimestamp(d);
    expect(exprJSON).toBe(Number(new Date(2007, 0, 1, 0, 0, 0, 0)));
  });
});
