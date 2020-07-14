import { getNumberFormatter } from '@superset-ui/number-format';
import { getTimeFormatter } from '@superset-ui/time-format';
import { Type, FormatType, FormatMixins } from '../../types/VegaLite';
import { Formatter } from '../../types/ChannelDef';
import fallbackFormatter from './fallbackFormatter';

export default function createFormatterFromFieldTypeAndFormat({
  formatType,
  type,
  format,
}: FormatMixins & {
  /** field type */
  type?: Type;
}): Formatter {
  let finalType: FormatType | undefined;
  if (typeof formatType !== 'undefined') {
    finalType = formatType;
  } else if (type === 'quantitative') {
    finalType = 'number';
  } else if (type === 'temporal') {
    finalType = 'time';
  } else if (typeof format !== 'undefined' && format.length > 0) {
    finalType = 'number';
  }

  if (finalType === 'number') {
    const formatter = getNumberFormatter(format);

    return (value: unknown) => formatter(value as number | null | undefined);
  }
  if (finalType === 'time') {
    const formatter = getTimeFormatter(format);

    return (value: unknown) => formatter(value as Date | number | null | undefined);
  }

  return fallbackFormatter;
}
