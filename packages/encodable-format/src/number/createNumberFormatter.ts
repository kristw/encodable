import { NumberFormatter, NumberFormatFunction, NumberFormatterConfig } from '../../types';

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

export default function createNumberFormatter({
  id,
  label,
  description = '',
  formatFunc,
  isInvalid = false,
}: NumberFormatterConfig) {
  const format: NumberFormatter = (value: number | null | undefined) =>
    cleanAndFormat(value, formatFunc);

  format.id = id;
  format.label = label;
  format.description = description;
  format.isInvalid = isInvalid;

  return format;
}
