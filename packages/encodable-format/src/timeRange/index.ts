import { LOCAL_TIME_PREFIX } from '../time/TimeFormats';
import createTimeRangeFormatter from './createTimeRangeFormatter';
import { getTimeFormatterRegistry } from '../time';

export function getTimeRangeFormatter(formatId?: string) {
  return createTimeRangeFormatter({
    id: formatId || 'undefined',
    formatFunc: (range: (Date | number | null | undefined)[]) => {
      const format = getTimeFormatterRegistry().get(formatId);
      const [start, end] = range.map(value => format(value));
      return start === end ? start : [start, end].join(' — ');
    },
    useLocalTime: formatId?.startsWith(LOCAL_TIME_PREFIX),
  });
}

export function formatTimeRange(formatId: string | undefined, range: (Date | null | undefined)[]) {
  return getTimeRangeFormatter(formatId)(range);
}
