import {
  getTimeFormatter,
  getTimeFormatterRegistry,
  LOCAL_TIME_PREFIX,
  addPrefix,
  TimeFormats,
} from '@encodable/format';
import { TimeFormatResolver } from '../../types';

const defaultTimeFormatResolver: TimeFormatResolver = ({ format, formatInLocalTime = false }) => {
  const formatString = formatInLocalTime
    ? addPrefix(
        LOCAL_TIME_PREFIX,
        format ?? getTimeFormatterRegistry().getDefaultKey() ?? TimeFormats.DATABASE_DATETIME,
      )
    : format;
  return getTimeFormatter(formatString);
};

export default defaultTimeFormatResolver;
