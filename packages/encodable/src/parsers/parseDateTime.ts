import { DateTime } from '../types';
import dateTimeToTimestamp from './dateTimeToTimestamp';

export default function parseDateTime(dateTime: string | number | DateTime) {
  if (typeof dateTime === 'number' || typeof dateTime === 'string') {
    return new Date(dateTime);
  }

  return new Date(dateTimeToTimestamp(dateTime));
}
