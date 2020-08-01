import { NumberFormatter, NumberFormatFunction, NumberFormatterMetadata } from '../types';

function cleanAndFormat(
  value: number | null | undefined,
  formatFunc: NumberFormatFunction,
): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return `${value}`;
  }
  if (value === Number.POSITIVE_INFINITY) {
    return '∞';
  }
  if (value === Number.NEGATIVE_INFINITY) {
    return '-∞';
  }

  return formatFunc(value);
}

export default function createNumberFormatter(
  formatFunc: NumberFormatFunction,
  metadata?: NumberFormatterMetadata,
) {
  const format: NumberFormatter = value => cleanAndFormat(value, formatFunc);

  if (typeof metadata !== 'undefined') {
    const { id, label, description = '', isInvalid = false } = metadata;
    format.id = id;
    format.label = label;
    format.description = description;
    format.isInvalid = isInvalid;
  }

  return format;
}
