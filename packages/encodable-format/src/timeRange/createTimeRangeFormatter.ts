import { TimeRangeFormatter, TimeRangeFormatterConfig } from '../types';

export default function createTimeRangeFormatter({
  id,
  label,
  description = '',
  formatFunc,
  useLocalTime = false,
}: TimeRangeFormatterConfig) {
  const format: TimeRangeFormatter = value => formatFunc(value);

  format.id = id;
  format.label = label;
  format.description = description;
  format.useLocalTime = useLocalTime;

  return format;
}
