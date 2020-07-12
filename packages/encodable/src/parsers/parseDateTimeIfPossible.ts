import { DateTime } from '../types/VegaLite';
import { isDateTime } from '../typeGuards/DateTime';
import parseDateTime from './parseDateTime';

export default function parseDateTimeIfPossible<T>(d: DateTime | T) {
  return !(d instanceof Date) && isDateTime(d) ? parseDateTime(d) : d;
}
