import { DateTime } from '../types';
import { isDateTime } from '../typeGuards/DateTime';
import parseDateTime from './parseDateTime';

/**
 * Only parse elements that are DateTime to Date.
 * Leave the rest alone.
 * @param array
 */
export default function parseDateTimeIn<T>(array: (DateTime | T)[]) {
  return array.map(d => (!(d instanceof Date) && isDateTime(d) ? parseDateTime(d) : d));
}
