import dateTimeToTimestamp from '../../src/parsers/dateTimeToTimestamp';
import { DateTime } from '../../lib';

describe('dateTimeToTimestamp()', () => {
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
