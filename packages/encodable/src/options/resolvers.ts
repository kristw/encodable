import { getColorSchemeRegistry, getScale } from '@encodable/color';
import {
  getTimeFormatter,
  getTimeFormatterRegistry,
  LOCAL_TIME_PREFIX,
  addPrefix,
  getNumberFormatter,
} from '@encodable/format';
import {
  TimeFormatResolver,
  ColorSchemeResolver,
  CategoricalColorScaleResolver,
  NumberFormatResolver,
} from '../types';

export const defaultNumberFormatResolver: NumberFormatResolver = getNumberFormatter;

export const defaultTimeFormatResolver: TimeFormatResolver = ({
  format,
  formatInLocalTime = false,
} = {}) => {
  const formatString = formatInLocalTime
    ? addPrefix(LOCAL_TIME_PREFIX, format ?? getTimeFormatterRegistry().getDefaultKey()!)
    : format;
  return getTimeFormatter(formatString);
};

export const defaultColorSchemeResolver: ColorSchemeResolver = ({
  name,
  type = 'categorical',
} = {}) => getColorSchemeRegistry()[type].get(name);

export const defaultCategoricalColorScaleResolver: CategoricalColorScaleResolver = ({
  name,
  namespace,
} = {}) => getScale(name, namespace);
