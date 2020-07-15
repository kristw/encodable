import { FormatMixins } from '../../types/VegaLite';
import { Formatter } from '../../types/ChannelDef';
import fallbackFormatter from './fallbackFormatter';
import OptionsManager from '../../options/OptionsManager';

export default function createFormatter({ formatType, format }: FormatMixins): Formatter {
  if (formatType === 'time') {
    const formatter = OptionsManager.getTimeFormatResolver()(format);

    return (value: unknown) => formatter(value as Date | number | null | undefined);
  }
  if (formatType === 'number' || (typeof format !== 'undefined' && format.length > 0)) {
    const formatter = OptionsManager.getNumberFormatResolver()(format);

    return (value: unknown) => formatter(value as number | null | undefined);
  }

  return fallbackFormatter;
}
