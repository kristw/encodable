// Modified from vega-lite version
// and remove unnecessary dependency

/* eslint-disable no-param-reassign */
/* eslint-disable no-negated-condition */
import { DateTime } from '../types/VegaLite';
import keys from '../utils/keys';

/**
 * Internal Object for defining datetime expressions.
 * This is an expression version of DateTime.
 * If both month and quarter are provided, month has higher precedence.
 * `day` cannot be combined with other date.
 */
interface DateTimeExpr {
  year?: string;
  quarter?: string;
  month?: string;
  date?: string;
  day?: string;
  hours?: string;
  minutes?: string;
  seconds?: string;
  milliseconds?: string;
  utc?: boolean;
}

function invalidTimeUnit(unitName: string, value: string | number) {
  return `Invalid ${unitName}: ${String(value)}.`;
}

/*
 * A designated year that starts on Sunday.
 */
const SUNDAY_YEAR = 2006;

const MONTHS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];
const SHORT_MONTHS = MONTHS.map(m => m.slice(0, 3));
const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const SHORT_DAYS = DAYS.map(d => d.slice(0, 3));

function isNumber(x: unknown): x is number {
  return typeof x === 'number';
}

/**
 * Returns whether the passed in value is a valid number.
 */
function isNumeric(value: number | string): boolean {
  if (isNumber(value)) {
    return true;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return !isNaN(value as any) && !isNaN(parseFloat(value));
}

export function normalizeQuarter(q: number | string): number {
  if (isNumeric(q)) {
    q = Number(q);
  }

  if (isNumber(q)) {
    if (q > 4) {
      // eslint-disable-next-line no-console
      console.warn(invalidTimeUnit('quarter', q));
    }
    // We accept 1-based quarter, so need to readjust to 0-based quarter
    return q - 1;
  }
  // Invalid quarter
  throw new Error(invalidTimeUnit('quarter', q));
}

export function normalizeMonth(m: string | number): number {
  if (isNumeric(m)) {
    m = Number(m);
  }

  if (isNumber(m)) {
    // We accept 1-based month, so need to readjust to 0-based month
    return m - 1;
  }
  const lowerM = m.toLowerCase();
  const monthIndex = MONTHS.indexOf(lowerM);
  if (monthIndex !== -1) {
    return monthIndex; // 0 for january, ...
  }
  const shortM = lowerM.slice(0, 3);
  const shortMonthIndex = SHORT_MONTHS.indexOf(shortM);
  if (shortMonthIndex !== -1) {
    return shortMonthIndex;
  }

  // Invalid month
  throw new Error(invalidTimeUnit('month', m));
}

export function normalizeDay(d: string | number): number {
  if (isNumeric(d)) {
    d = Number(d);
  }

  if (isNumber(d)) {
    // mod so that this can be both 0-based where 0 = sunday
    // and 1-based where 7=sunday
    return d % 7;
  }
  const lowerD = d.toLowerCase();
  const dayIndex = DAYS.indexOf(lowerD);
  if (dayIndex !== -1) {
    return dayIndex; // 0 for january, ...
  }
  const shortD = lowerD.slice(0, 3);
  const shortDayIndex = SHORT_DAYS.indexOf(shortD);
  if (shortDayIndex !== -1) {
    return shortDayIndex;
  }
  // Invalid day
  throw new Error(invalidTimeUnit('day', d));
}

/**
 * @param d the date.
 * @param normalize whether to normalize quarter, month, day. This should probably be true if d is a DateTime.
 * @returns array of date time parts [year, month, day, hours, minutes, seconds, milliseconds]
 */
export function dateTimeParts(d: DateTime | DateTimeExpr, normalize: boolean) {
  const parts: (string | number)[] = [];

  if (normalize && d.day !== undefined) {
    if (keys(d).length > 1) {
      d = { ...d };
      delete d.day;
    }
  }

  if (d.year !== undefined) {
    parts.push(d.year);
  } else if (d.day !== undefined) {
    // Set year to 2006 for working with day since January 1 2006 is a Sunday
    parts.push(SUNDAY_YEAR);
  } else {
    parts.push(0);
  }

  if (d.month !== undefined) {
    const month = normalize ? normalizeMonth(d.month) : d.month;
    parts.push(month);
  } else if (d.quarter !== undefined) {
    const quarter = normalize ? normalizeQuarter(d.quarter) : d.quarter;
    parts.push(isNumber(quarter) ? quarter * 3 : `${quarter}*3`);
  } else {
    parts.push(0); // months start at zero in JS
  }

  if (d.date !== undefined) {
    parts.push(d.date);
  } else if (d.day !== undefined) {
    // HACK: Day only works as a standalone unit
    // This is only correct because we always set year to 2006 for day
    const day = normalize ? normalizeDay(d.day) : d.day;
    parts.push(isNumber(day) ? day + 1 : `${day}+1`);
  } else {
    parts.push(1); // Date starts at 1 in JS
  }

  (['hours', 'minutes', 'seconds', 'milliseconds'] as const).forEach(timeUnit => {
    const unit = d[timeUnit];
    parts.push(typeof unit === 'undefined' ? 0 : unit);
  });

  return parts;
}

/**
 * @param d the date time.
 * @returns the timestamp.
 */
export default function dateTimeToTimestamp(d: DateTime) {
  const parts: (string | number)[] = dateTimeParts(d, true);

  if (d.utc) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Number(new Date(Date.UTC(...(parts as [any, any]))));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Number(new Date(...(parts as [any])));
}
