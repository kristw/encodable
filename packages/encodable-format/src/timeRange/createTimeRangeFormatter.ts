import { TimeRangeFormatter, TimeRangeFormatFunction, TimeFormatterMetadata } from '../types';

export default function createTimeRangeFormatter(
  formatFunc: TimeRangeFormatFunction,
  metadata?: TimeFormatterMetadata,
) {
  const format: TimeRangeFormatter = value => formatFunc(value);

  if (typeof metadata !== 'undefined') {
    const { id, label, description = '', useLocalTime = false } = metadata;
    format.id = id;
    format.label = label;
    format.description = description;
    format.useLocalTime = useLocalTime;
  }

  return format;
}
