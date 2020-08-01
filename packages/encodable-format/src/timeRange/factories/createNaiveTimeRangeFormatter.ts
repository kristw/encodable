import createTimeRangeFormatter from '../createTimeRangeFormatter';
import { TimeFormatterMetadata } from '../../types';
import { formatTime, getTimeFormatter } from '../../time';

interface Config extends Omit<TimeFormatterMetadata, 'useLocalTime'> {
  format: string;
}

export default function createNaiveTimeRangeFormatter({ format, id, label, description }: Config) {
  return createTimeRangeFormatter(
    range => {
      const [start, end] = range.map(value => formatTime(format, value));
      return start === end ? start : [start, end].join(' — ');
    },
    {
      id: id ?? format,
      useLocalTime: getTimeFormatter(format).useLocalTime,
      label,
      description,
    },
  );
}
