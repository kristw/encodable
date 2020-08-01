import { utcFormat, timeFormat, timeFormatLocale, TimeLocaleDefinition } from 'd3-time-format';
import { LOCAL_TIME_PREFIX } from '../TimeFormats';
import createTimeFormatter from '../createTimeFormatter';
import { TimeFormatterMetadata } from '../../types';
import { addPrefix } from '../../utils/prefix';

interface Config extends TimeFormatterMetadata {
  format: string;
  locale?: TimeLocaleDefinition;
}

export default function createD3TimeFormatter({
  format,
  locale,
  useLocalTime = false,
  id,
  label,
  description,
}: Config) {
  let formatFunc;

  if (typeof locale === 'undefined') {
    const factory = useLocalTime ? timeFormat : utcFormat;
    formatFunc = factory(format);
  } else {
    const localeObject = timeFormatLocale(locale);
    formatFunc = useLocalTime ? localeObject.format(format) : localeObject.utcFormat(format);
  }

  return createTimeFormatter(formatFunc, {
    id: id ?? (useLocalTime ? addPrefix(LOCAL_TIME_PREFIX, format) : format),
    label,
    description,
    useLocalTime,
  });
}
