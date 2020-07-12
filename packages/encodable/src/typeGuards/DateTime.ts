import { DateTime } from '../types/VegaLite/DateTime';

// eslint-disable-next-line import/prefer-default-export, @typescript-eslint/no-explicit-any
export function isDateTime(o: any): o is DateTime {
  return (
    !!o &&
    (!!o.year ||
      !!o.quarter ||
      !!o.month ||
      !!o.date ||
      !!o.day ||
      !!o.hours ||
      !!o.minutes ||
      !!o.seconds ||
      !!o.milliseconds)
  );
}
