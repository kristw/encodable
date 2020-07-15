import { Type, FormatType, FormatMixins } from '../../types/VegaLite';
import { Formatter } from '../../types/ChannelDef';
import createFormatter from './createFormatter';

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
  }

  return createFormatter({
    formatType: finalType,
    format,
  });
}
