import { makeSingleton } from '@encodable/registry';
import TimeRangeFormatterRegistry from './TimeRangeFormatterRegistry';
import { TimeFormatInput } from '../types';

export const getTimeRangeFormatterRegistry = makeSingleton(
  () =>
    new TimeRangeFormatterRegistry({
      globalId: '@encodable/format:TimeRangeFormatterRegistry',
    }),
);

export function getTimeRangeFormatter(format?: string) {
  return getTimeRangeFormatterRegistry().get(format);
}

export function formatTimeRange(format: string | undefined, range: TimeFormatInput[]) {
  return getTimeRangeFormatter(format)(range);
}
