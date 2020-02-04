import { dateTimeToTimestamp } from 'vega-lite/build/src/datetime';
import { DateTime } from '../types/VegaLite';

export default function parseDateTime(dateTime: string | number | DateTime) {
  if (typeof dateTime === 'number' || typeof dateTime === 'string') {
    return new Date(dateTime);
  }

  return new Date(dateTimeToTimestamp(dateTime));
}
