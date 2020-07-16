import { getTimeFormatter, LOCAL_PREFIX } from '@superset-ui/time-format';
import { TimeFormatResolver } from '../../types/Options';

const defaultTimeFormatResolver: TimeFormatResolver = ({ format, formatInLocalTime = false }) => {
  const formatString = formatInLocalTime ? LOCAL_PREFIX + format : format;
  return getTimeFormatter(formatString);
};

export default defaultTimeFormatResolver;
