import {
  TimeFormatter,
  TimeFormatFunction,
  TimeFormatterMetadata,
  TimeFormatInput,
} from '../types';

function cleanAndFormat(value: TimeFormatInput, formatFunc: TimeFormatFunction) {
  if (value === null || value === undefined) {
    return `${value}`;
  }

  return formatFunc(value instanceof Date ? value : new Date(value));
}

export default function createTimeFormatter(
  formatFunc: TimeFormatFunction,
  metadata?: TimeFormatterMetadata,
) {
  const format: TimeFormatter = value => cleanAndFormat(value, formatFunc);

  if (typeof metadata !== 'undefined') {
    const { id, label, description = '', useLocalTime = false } = metadata;
    format.id = id;
    format.label = label;
    format.description = description;
    format.useLocalTime = useLocalTime;
  }

  return format;
}
