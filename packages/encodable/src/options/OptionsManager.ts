import { getStore } from 'global-box';
import defaultNumberFormatResolver from '../parsers/format/defaultNumberFormatResolver';
import defaultTimeFormatResolver from '../parsers/format/defaultTimeFormatResolver';
import defaultCategoricalColorScaleResolver from '../parsers/scale/defaultCategoricalColorScaleResolver';
import {
  EncodableOptions,
  NumberFormatResolver,
  TimeFormatResolver,
  CategoricalColorScaleResolver,
} from '../types/Options';

let options: EncodableOptions;

function getOptions() {
  if (!options) {
    options = getStore().getOrCreate<EncodableOptions>('encodable:options', () => ({}));
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
};

export default OptionsManager;
