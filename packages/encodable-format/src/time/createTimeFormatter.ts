import { TimeFormatter, TimeFormatFunction, TimeFormatterConfig } from '../types';

function cleanAndFormat(value: Date | number | undefined | null, formatFunc: TimeFormatFunction) {
  if (value === null || value === undefined) {
    return `${value}`;
  }

  return formatFunc(value instanceof Date ? value : new Date(value));
}

export default function createTimeFormatter({
  id,
  label,
  description = '',
  formatFunc,
  useLocalTime = false,
}: TimeFormatterConfig) {
  const format: TimeFormatter = (value: Date | number | undefined | null) =>
    cleanAndFormat(value, formatFunc);

  format.id = id;
  format.label = label;
  format.description = description;
  format.useLocalTime = useLocalTime;

  return format;
}
