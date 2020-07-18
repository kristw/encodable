import { DateTime } from '../types/DateTime';

// eslint-disable-next-line import/prefer-default-export
export function isDateTime(o: string | number | boolean | DateTime): o is DateTime {
  return (
    !!o &&
    !(o instanceof Date) &&
    typeof o !== 'string' &&
    typeof o !== 'boolean' &&
    typeof o !== 'number' &&
    (('year' in o && o.year != null) ||
      ('quarter' in o && o.quarter != null) ||
      ('month' in o && o.month != null) ||
      ('date' in o && o.date != null) ||
      ('day' in o && o.day != null) ||
      ('hours' in o && o.hours != null) ||
      ('minutes' in o && o.minutes != null) ||
      ('seconds' in o && o.seconds != null) ||
      ('milliseconds' in o && o.milliseconds != null))
  );
}
