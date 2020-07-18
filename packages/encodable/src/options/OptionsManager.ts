import { getStore } from 'global-box';
import defaultNumberFormatResolver from '../parsers/format/defaultNumberFormatResolver';
import defaultTimeFormatResolver from '../parsers/format/defaultTimeFormatResolver';
import defaultColorSchemeResolver from '../parsers/scale/defaultColorSchemeResolver';
import defaultCategoricalColorScaleResolver from '../parsers/scale/defaultCategoricalColorScaleResolver';
import {
  EncodableOptions,
  NumberFormatResolver,
  TimeFormatResolver,
  CategoricalColorScaleResolver,
  ColorSchemeResolver,
} from '../types';

const CACHE_KEY = 'encodable:options';

let options: EncodableOptions;

function getOptions() {
  if (!options) {
    options = getStore().getOrCreate<EncodableOptions>(CACHE_KEY, () => ({}));
  }
  return options;
}

const OptionsManager = {
  getOptions,
  getNumberFormatResolver(): NumberFormatResolver {
    return getOptions().numberFormatResolver ?? defaultNumberFormatResolver;
  },
  setNumberFormatResolver(resolver: NumberFormatResolver | undefined) {
    getOptions().numberFormatResolver = resolver;
    return this;
  },
  getTimeFormatResolver(): TimeFormatResolver {
    return getOptions().timeFormatResolver ?? defaultTimeFormatResolver;
  },
  setTimeFormatResolver(resolver: TimeFormatResolver | undefined) {
    getOptions().timeFormatResolver = resolver;
    return this;
  },
  getCategoricalColorScaleResolver(): CategoricalColorScaleResolver {
    return getOptions().categoricalColorScaleResolver ?? defaultCategoricalColorScaleResolver;
  },
  setCategoricalColorScaleResolver(resolver: CategoricalColorScaleResolver | undefined) {
    getOptions().categoricalColorScaleResolver = resolver;
    return this;
  },
  getColorSchemeResolver(): ColorSchemeResolver {
    return getOptions().colorSchemeResolver ?? defaultColorSchemeResolver;
  },
  setColorSchemeResolver(resolver: ColorSchemeResolver | undefined) {
    getOptions().colorSchemeResolver = resolver;
    return this;
  },
};

export default OptionsManager;
