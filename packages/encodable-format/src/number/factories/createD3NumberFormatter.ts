import { format as d3Format, formatLocale, FormatLocaleDefinition } from 'd3-format';
import { NumberFormatFunction, NumberFormatterMetadata } from '../../types';
import createNumberFormatter from '../createNumberFormatter';

interface Config extends NumberFormatterMetadata {
  format: string;
  locale?: FormatLocaleDefinition;
}

export default function createD3NumberFormatter({
  format,
  locale,
  id,
  label,
  description,
}: Config) {
  let formatFunc: NumberFormatFunction;
  let isInvalid = false;

  try {
    formatFunc =
      typeof locale === 'undefined' ? d3Format(format) : formatLocale(locale).format(format);
  } catch (error) {
    formatFunc = value => `${value} (Invalid format: ${format})`;
    isInvalid = true;
  }

  return createNumberFormatter(formatFunc, {
    id: id ?? format,
    label,
    description,
    isInvalid,
  });
}
