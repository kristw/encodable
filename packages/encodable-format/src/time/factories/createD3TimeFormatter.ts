import { utcFormat, timeFormat, timeFormatLocale, TimeLocaleDefinition } from 'd3-time-format';
import { LOCAL_TIME_PREFIX } from '../TimeFormats';
import createTimeFormatter from '../createTimeFormatter';
import { TimeFormatterMetadata } from '../../types';
import addPrefix from '../../utils/addPrefix';

interface Config extends TimeFormatterMetadata {
  formatString: string;
  locale?: TimeLocaleDefinition;
}

export default function createD3TimeFormatter({
  formatString,
  locale,
  useLocalTime = false,
  id,
  label,
  description,
}: Config) {
  let formatFunc;

  if (typeof locale === 'undefined') {
    const format = useLocalTime ? timeFormat : utcFormat;
    formatFunc = format(formatString);
  } else {
    const localeObject = timeFormatLocale(locale);
    formatFunc = useLocalTime
      ? localeObject.format(formatString)
      : localeObject.utcFormat(formatString);
  }

  return createTimeFormatter({
    description,
    formatFunc,
    id: id ?? (useLocalTime ? addPrefix(LOCAL_TIME_PREFIX, formatString) : formatString),
    label,
    useLocalTime,
  });
}
